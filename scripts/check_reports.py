#!/usr/bin/env python3
"""
Quality gate for The AI Edge — run before every commit:

    python3 scripts/check_reports.py

Verifies reports/data/reports.js is safe to publish:
  - valid JavaScript (evaluates via node)
  - every entry has the required fields and correct types
  - ids are unique
  - entries are sorted newest-first by sortDate
  - the newest entry is dated today or yesterday (catches "forgot to add today")
  - each weekly's `pdf` path, if set, exists on disk

Exit 0 = pass. Non-zero = fail (prints what's wrong). Requires `node` on PATH.
Optional arg: a date override YYYY-MM-DD for the "today" freshness check
(the routine may pass the run date, since this script can't trust the clock).
"""
import json
import os
import re
import subprocess
import sys
import urllib.error
import urllib.parse
import urllib.request
from datetime import date, timedelta

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REPORTS_JS = os.path.join(REPO, "reports", "data", "reports.js")
CARDS_JS = os.path.join(REPO, "reports", "data", "cards.js")
TOOLS_JS = os.path.join(REPO, "reports", "data", "tools.js")
DOMAINS_JS = os.path.join(REPO, "scripts", "domains.js")

REQUIRED = ["id", "type", "week", "title", "dateLabel", "sortDate", "tldr", "sections", "domains"]

# cards (durable knowledge atoms) — domains validated separately below.
CARD_REQUIRED = ["id", "title", "summary", "why", "how", "action", "confidence",
                 "status", "sources", "created", "updated"]
CARD_CONFIDENCE = {"confirmed", "emerging", "speculative"}
CARD_STATUS = {"active", "superseded"}

# Tools directory (standalone reference; NOT a domain/hub). The 12 fixed job slugs.
EXPECTED_TOOL_JOB_SLUGS = {
    "automation", "video-creation", "video-editing", "research", "planning-sitemaps",
    "graphic-design", "web-design", "web-development", "email-retention", "social-media",
    "paid-ads", "copywriting-cro",
}


def _host(url):
    try:
        return urllib.parse.urlsplit(url).netloc.lower().replace("www.", "")
    except Exception:
        return ""


# Trust gate (Phase 2): verify every published link resolves — kills dead and
# fabricated URLs. Opt-in via `--check-links` or CHECK_LINKS=1 (the workflows set
# it). Definitive 404/410 = FAIL (fabricated/dead); other errors (403 bot-block,
# 5xx, timeouts) = WARN only, so transient network blips never block a publish.
_DEAD_CODES = {404, 410}
# Browser-like UA: many sites (Google support, etc.) serve a 404/403 to obvious
# bots, which would be a false "dead link". A real UA avoids that false positive.
_LINK_UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
            "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")


def _href_set_from_html(s):
    return set(re.findall(r'href=["\'](https?://[^"\']+)["\']', s or "", re.IGNORECASE))


def _link_status(url):
    """Return (ok, code_or_msg). ok=False ONLY when a GET itself returns a dead
    code — HEAD is unreliable (many sites 404/405 a HEAD they'd 200 on GET), so a
    HEAD failure just falls through to GET before we conclude anything."""
    headers = {
        "User-Agent": _LINK_UA,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
    }
    last = "unknown"
    for method in ("HEAD", "GET"):
        try:
            req = urllib.request.Request(url, method=method, headers=headers)
            with urllib.request.urlopen(req, timeout=15) as r:
                return True, r.status
        except urllib.error.HTTPError as e:
            last = e.code
            if method == "GET":
                # only a GET dead code is definitive; other codes are warn-only
                return (False, e.code) if e.code in _DEAD_CODES else (True, e.code)
        except Exception as e:  # noqa: BLE001 — network/timeout → don't fail the run
            last = "neterr:%s" % e
            if method == "GET":
                return True, last
    return True, last


def check_links(cards, reports, errors, warnings, tools=None):
    urls = set()
    for c in (cards or []):
        for s in (c.get("sources") or []):
            u = s.get("url") if isinstance(s, dict) else None
            if isinstance(u, str) and u.startswith(("http://", "https://")):
                urls.add(u.strip())
    for r in reports:
        if isinstance(r.get("sources"), str):
            urls |= _href_set_from_html(r["sources"])
    if tools:
        for t in (tools.get("tools") or {}).values():
            u = t.get("url")
            if isinstance(u, str) and u.startswith(("http://", "https://")):
                urls.add(u.strip())
    dead, warned = 0, 0
    for u in sorted(urls):
        ok, code = _link_status(u)
        if not ok:
            errors.append("dead link (HTTP %s): %s" % (code, u))
            dead += 1
        elif isinstance(code, str) or (isinstance(code, int) and code >= 400):
            warnings.append("link not 2xx/3xx (%s): %s" % (code, u))
            warned += 1
    print("link-check: %d urls, %d dead, %d warned" % (len(urls), dead, warned))


def valid_domains():
    """Read the canonical slug list from scripts/domains.js (single source of
    truth) via node, so this gate and build-data.js never drift."""
    node_script = "process.stdout.write(JSON.stringify(require(process.argv[1]).DOMAINS||[]));"
    try:
        out = subprocess.run(["node", "-e", node_script, DOMAINS_JS],
                             capture_output=True, check=True)
        slugs = json.loads(out.stdout.decode("utf-8", "replace"))
        if slugs:
            return set(slugs)
    except Exception:
        pass
    sys.exit("FAIL: could not load valid domain slugs from scripts/domains.js")

def load_hubs():
    """Read the HUBS map from scripts/domains.js (single source of truth) so the
    gate can validate hub→domain mappings against the canonical slugs."""
    node_script = "process.stdout.write(JSON.stringify(require(process.argv[1]).HUBS||{}));"
    try:
        out = subprocess.run(["node", "-e", node_script, DOMAINS_JS],
                             capture_output=True, check=True)
        return json.loads(out.stdout.decode("utf-8", "replace"))
    except Exception:
        return {}

def _eval_global(js_path, global_name, label):
    node_script = (
        "const fs=require('fs');global.window={};"
        "eval(fs.readFileSync(process.argv[1],'utf8'));"
        "process.stdout.write(JSON.stringify(window.%s||[]));" % global_name
    )
    try:
        out = subprocess.run(["node", "-e", node_script, js_path],
                             capture_output=True, check=True)
    except FileNotFoundError:
        sys.exit("FAIL: `node` not found on PATH (needed to evaluate %s)." % label)
    except subprocess.CalledProcessError as e:
        msg = (e.stderr or b"").decode("utf-8", "replace") or str(e)
        sys.exit("FAIL: %s is not valid JavaScript:\n%s" % (label, msg))
    return json.loads(out.stdout.decode("utf-8", "replace"))

def load():
    return _eval_global(REPORTS_JS, "AI_EDGE_REPORTS", "reports.js")

def load_cards():
    if not os.path.exists(CARDS_JS):
        return None
    return _eval_global(CARDS_JS, "AI_EDGE_CARDS", "cards.js")

def load_tools():
    """Tools directory (standalone reference) — eval tools.js and return
    {tools, jobs, top}, or None if the file is absent (treated as a warn, like cards)."""
    if not os.path.exists(TOOLS_JS):
        return None
    node_script = (
        "const fs=require('fs');global.window={};"
        "eval(fs.readFileSync(process.argv[1],'utf8'));"
        "process.stdout.write(JSON.stringify({tools:window.AI_EDGE_TOOLS||{},"
        "jobs:window.AI_EDGE_TOOL_JOBS||[],top:window.AI_EDGE_TOOLS_TOP||[]}));"
    )
    try:
        out = subprocess.run(["node", "-e", node_script, TOOLS_JS],
                             capture_output=True, check=True)
    except FileNotFoundError:
        sys.exit("FAIL: `node` not found on PATH (needed to evaluate tools.js).")
    except subprocess.CalledProcessError as e:
        msg = (e.stderr or b"").decode("utf-8", "replace") or str(e)
        sys.exit("FAIL: tools.js is not valid JavaScript:\n%s" % msg)
    return json.loads(out.stdout.decode("utf-8", "replace"))

def main():
    errors = []
    warnings = []
    reports = load()
    valid = valid_domains()

    if not reports:
        sys.exit("FAIL: no reports found in reports.js")

    # required fields + types
    ids = []
    for i, r in enumerate(reports):
        where = "entry[%d] id=%r" % (i, r.get("id", "?"))
        for f in REQUIRED:
            if f not in r or r[f] in (None, "", [], {}):
                errors.append("%s missing/empty field: %s" % (where, f))
        if r.get("type") not in ("daily", "weekly"):
            errors.append("%s type must be 'daily' or 'weekly'" % where)
        # domains: non-empty array of valid slugs
        doms = r.get("domains")
        if not isinstance(doms, list) or not doms:
            errors.append("%s domains must be a non-empty array" % where)
        else:
            bad = [d for d in doms if d not in valid]
            if bad:
                errors.append("%s invalid domain slug(s): %s (valid: %s)"
                              % (where, ", ".join(map(str, bad)), ", ".join(sorted(valid))))
        if not isinstance(r.get("tldr", []), list) or len(r.get("tldr", [])) < 2:
            errors.append("%s tldr should be a list of >=2 items" % where)
        if not isinstance(r.get("sections", []), list) or not r.get("sections"):
            errors.append("%s sections should be a non-empty list" % where)
        ids.append(r.get("id"))

    # unique ids
    dupes = set(x for x in ids if ids.count(x) > 1)
    if dupes:
        errors.append("duplicate ids: %s" % ", ".join(sorted(map(str, dupes))))

    # ---- CARDS (durable knowledge atoms) — validate cards.js if present ----
    cards = load_cards()
    n_cards = 0
    if cards is not None:
        n_cards = len(cards)
        card_ids = [c.get("id") for c in cards]
        card_id_set = set(card_ids)
        for i, c in enumerate(cards):
            cw = "card[%d] id=%r" % (i, c.get("id", "?"))
            for f in CARD_REQUIRED:
                if f not in c or c[f] in (None, "", [], {}):
                    errors.append("%s missing/empty field: %s" % (cw, f))
            cdoms = c.get("domains")
            if not isinstance(cdoms, list) or not cdoms:
                errors.append("%s domains must be a non-empty array" % cw)
            else:
                cbad = [d for d in cdoms if d not in valid]
                if cbad:
                    errors.append("%s invalid domain slug(s): %s (valid: %s)"
                                  % (cw, ", ".join(map(str, cbad)), ", ".join(sorted(valid))))
            if c.get("confidence") not in CARD_CONFIDENCE:
                errors.append("%s confidence must be one of %s" % (cw, sorted(CARD_CONFIDENCE)))
            if c.get("status") not in CARD_STATUS:
                errors.append("%s status must be one of %s" % (cw, sorted(CARD_STATUS)))
            # sources: structured array of {label?, url} — EVERY card needs >=1 real,
            # non-empty http(s) url (no markdown/HTML strings, no fabricated/empty links).
            src = c.get("sources")
            hosts = set()
            if not isinstance(src, list) or not src:
                errors.append("%s sources must be a non-empty array of {label?, url} (>=1 real link)" % cw)
            else:
                real = 0
                for k, s in enumerate(src):
                    url = s.get("url") if isinstance(s, dict) else None
                    if not (isinstance(url, str) and url.strip().lower().startswith(("http://", "https://"))):
                        errors.append("%s sources[%d] must be an object with a real http(s) url" % (cw, k))
                    else:
                        real += 1
                        hosts.add(_host(url))
                if real < 1:
                    errors.append("%s must have >=1 real source url" % cw)
            # corroboration_count (Phase 2, optional) = how many INDEPENDENT sources
            # back this card's claim. Separate from `confidence` (play maturity). The
            # label can't lie: it must be a positive int <= distinct source hostnames.
            # thread_id (Phase 3, optional) = the storyline this card advances.
            tid = c.get("thread_id")
            if tid is not None and not (isinstance(tid, str) and tid.strip()):
                errors.append("%s thread_id must be a non-empty string when present" % cw)
            cc = c.get("corroboration_count")
            if cc is not None:
                if not isinstance(cc, int) or isinstance(cc, bool) or cc < 1:
                    errors.append("%s corroboration_count must be a positive integer" % cw)
                elif cc > len(hosts):
                    errors.append("%s corroboration_count=%d exceeds distinct source domains (%d) — the label can't lie"
                                  % (cw, cc, len(hosts)))
            for ref_field in ("supersedes", "related"):
                refs = c.get(ref_field) or []
                if not isinstance(refs, list):
                    errors.append("%s %s must be an array" % (cw, ref_field))
                    continue
                missing = [r for r in refs if r not in card_id_set]
                if missing:
                    errors.append("%s %s references unknown card id(s): %s"
                                  % (cw, ref_field, ", ".join(map(str, missing))))
        cdupes = set(x for x in card_ids if card_ids.count(x) > 1)
        if cdupes:
            errors.append("duplicate card ids: %s" % ", ".join(sorted(map(str, cdupes))))
    else:
        warnings.append("cards.js not found — card layer not validated")

    # ---- HUBS — each hub's domains must be valid slugs (drift guard) ----
    hubs = load_hubs()
    if hubs:
        for hub, spec in hubs.items():
            hdoms = spec.get("domains") if isinstance(spec, dict) else None
            if not isinstance(hdoms, list) or not hdoms:
                errors.append("hub %r has no domains" % hub)
                continue
            hbad = [d for d in hdoms if d not in valid]
            if hbad:
                errors.append("hub %r invalid domain slug(s): %s (valid: %s)"
                              % (hub, ", ".join(map(str, hbad)), ", ".join(sorted(valid))))
    else:
        warnings.append("no HUBS defined in scripts/domains.js — hub mapping not validated")

    # ---- TOOLS (standalone reference; NOT a domain/hub) — validate if present ----
    tools_data = load_tools()
    if tools_data is None:
        warnings.append("tools.js not found — tools directory not validated")
    else:
        tools = tools_data.get("tools") or {}
        tjobs = tools_data.get("jobs") or []
        ttop = tools_data.get("top") or []
        tool_ids = set()
        if not isinstance(tools, dict) or not tools:
            errors.append("AI_EDGE_TOOLS must be a non-empty object")
        else:
            inner_ids = []
            for key, t in tools.items():
                tw = "tool %r" % key
                if not isinstance(t, dict):
                    errors.append("%s must be an object" % tw)
                    continue
                for f in ("id", "name", "what"):
                    if not t.get(f):
                        errors.append("%s missing/empty field: %s" % (tw, f))
                if t.get("id") and t.get("id") != key:
                    errors.append("%s id %r does not match its key" % (tw, t.get("id")))
                u = t.get("url")
                if not (isinstance(u, str) and u.strip().lower().startswith(("http://", "https://"))):
                    errors.append("%s missing/invalid url — a real http(s) official site is required" % tw)
                tjs = t.get("jobs")
                if tjs is None:
                    tjs = []
                if not isinstance(tjs, list):
                    errors.append("%s jobs must be an array of job slugs" % tw)
                else:
                    badj = [s for s in tjs if s not in EXPECTED_TOOL_JOB_SLUGS]
                    if badj:
                        errors.append("%s jobs has invalid slug(s): %s" % (tw, ", ".join(map(str, badj))))
                tool_ids.add(key)
                inner_ids.append(t.get("id"))
            tdupes = set(x for x in inner_ids if x and inner_ids.count(x) > 1)
            if tdupes:
                errors.append("duplicate tool ids: %s" % ", ".join(sorted(map(str, tdupes))))
        # jobs: must use the 12 fixed slugs; ranked ids must exist
        if not isinstance(tjobs, list) or not tjobs:
            errors.append("AI_EDGE_TOOL_JOBS must be a non-empty array")
        else:
            seen_slugs = set()
            for i, j in enumerate(tjobs):
                slug = j.get("slug") if isinstance(j, dict) else None
                jw = "tool job[%d] slug=%r" % (i, slug)
                if not isinstance(j, dict):
                    errors.append("%s must be an object" % jw)
                    continue
                if slug not in EXPECTED_TOOL_JOB_SLUGS:
                    errors.append("%s is not one of the 12 fixed tool-job slugs" % jw)
                if slug in seen_slugs:
                    errors.append("duplicate tool job slug: %s" % slug)
                seen_slugs.add(slug)
                if not j.get("label"):
                    errors.append("%s missing label" % jw)
                rids = j.get("ranked_tool_ids")
                if rids is None:
                    rids = []
                if not isinstance(rids, list):
                    errors.append("%s ranked_tool_ids must be an array" % jw)
                else:
                    bad = [r for r in rids if r not in tool_ids]
                    if bad:
                        errors.append("%s references unknown tool id(s): %s" % (jw, ", ".join(map(str, bad))))
                    if rids and not (isinstance(j.get("why_number_one"), str) and j.get("why_number_one").strip()):
                        warnings.append("%s has ranked tools but no why_number_one" % jw)
        # overall top list
        if not isinstance(ttop, list):
            errors.append("AI_EDGE_TOOLS_TOP must be an array")
        else:
            badtop = [r for r in ttop if r not in tool_ids]
            if badtop:
                errors.append("AI_EDGE_TOOLS_TOP references unknown tool id(s): %s" % ", ".join(map(str, badtop)))

    # sorted newest-first by sortDate
    dates = [r.get("sortDate", "") for r in reports]
    if dates != sorted(dates, reverse=True):
        errors.append("entries are not sorted newest-first by sortDate")

    # freshness: newest entry should be today or yesterday
    ref = None
    if len(sys.argv) > 1:
        try:
            y, m, d = map(int, sys.argv[1].split("-"))
            ref = date(y, m, d)
        except Exception:
            warnings.append("ignored bad date arg %r" % sys.argv[1])
    if ref is not None:
        newest = max(dates)
        allowed = {ref.isoformat(), (ref - timedelta(days=1)).isoformat()}
        if newest not in allowed:
            # Date-arg path (the scheduled daily passes the run date): a stale newest
            # entry means the run produced no fresh content. HARD FAIL (was WARN) so the
            # engine fails loudly instead of silently shipping nothing — the workflow's
            # failure-alert step then surfaces it. NOTE: the window still allows
            # "yesterday", so this catches a >=2-day gap, not a single same-day miss.
            errors.append("freshness: newest entry %s is not %s or the day before — "
                          "today's report is missing/stale (run produced no fresh entry)"
                          % (newest, ref.isoformat()))

    # weekly pdf paths exist
    for r in reports:
        if r.get("type") == "weekly" and r.get("pdf"):
            p = os.path.join(REPO, r["pdf"])
            if not os.path.exists(p):
                errors.append("weekly %s pdf missing on disk: %s" % (r.get("id"), r["pdf"]))

    # knowledge files exist (the self-learning layer) — now per-domain digests
    # under docs/knowledge/digest/ plus the shared house file + predictions ledger.
    kfiles = ["docs/knowledge/digest/_house.md", "docs/knowledge/predictions.md"]
    kfiles += ["docs/knowledge/digest/%s.md" % d for d in sorted(valid)]
    for kf in kfiles:
        if not os.path.exists(os.path.join(REPO, kf)):
            warnings.append("knowledge file missing: %s" % kf)

    n_daily = sum(1 for r in reports if r.get("type") == "daily")
    n_weekly = sum(1 for r in reports if r.get("type") == "weekly")

    # Trust gate: link-resolves check (opt-in — slow, needs network).
    if "--check-links" in sys.argv or os.environ.get("CHECK_LINKS") == "1":
        check_links(cards, reports, errors, warnings, tools_data)

    for w in warnings:
        print("WARN: " + w)
    if errors:
        print("\n".join("FAIL: " + e for e in errors))
        print("\n%d error(s). reports.js is NOT safe to publish." % len(errors))
        sys.exit(1)

    # Regenerate the browser-facing derived data (index.json + entries/<id>.json)
    # from the validated reports.js, so the routine never needs a separate step.
    try:
        subprocess.run(["node", os.path.join(REPO, "scripts", "build-data.js")],
                       check=True, capture_output=True)
        print("OK: regenerated index.json + entries/ from reports.js")
    except Exception as e:
        msg = getattr(e, "stderr", b"")
        if isinstance(msg, bytes):
            msg = msg.decode("utf-8", "replace")
        print("WARN: build-data.js did not run (%s) — derived files may be stale" % (msg or e))

    print("OK: %d reports (%d daily, %d weekly) + %d cards, valid JS, unique ids, "
          "sorted, pdfs present." % (len(reports), n_daily, n_weekly, n_cards))

if __name__ == "__main__":
    main()
