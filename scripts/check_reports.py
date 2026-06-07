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
import subprocess
import sys
from datetime import date, timedelta

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REPORTS_JS = os.path.join(REPO, "reports", "data", "reports.js")
CARDS_JS = os.path.join(REPO, "reports", "data", "cards.js")
DOMAINS_JS = os.path.join(REPO, "scripts", "domains.js")

REQUIRED = ["id", "type", "week", "title", "dateLabel", "sortDate", "tldr", "sections", "domains"]

# cards (durable knowledge atoms) — domains validated separately below.
CARD_REQUIRED = ["id", "title", "summary", "why", "how", "confidence", "status",
                 "sources", "created", "updated"]
CARD_CONFIDENCE = {"confirmed", "emerging", "speculative"}
CARD_STATUS = {"active", "superseded"}


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
            # sources: structured array of {label?, url} — url required (no markdown/HTML strings)
            src = c.get("sources")
            if not isinstance(src, list) or not src:
                errors.append("%s sources must be a non-empty array of {label?, url}" % cw)
            else:
                for k, s in enumerate(src):
                    if not isinstance(s, dict) or not s.get("url"):
                        errors.append("%s sources[%d] must be an object with a non-empty url" % (cw, k))
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
            warnings.append("newest entry %s is not %s or the day before — "
                            "did today's report get added?" % (newest, ref.isoformat()))

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
