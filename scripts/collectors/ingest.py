#!/usr/bin/env python3
"""
RedPxl News — ingestion orchestrator (Phase 1).

Runs every collector FAIL-SOFT, dedupes the harvest by content_hash, and UPSERTs
into redpxl.signals. The daily routine then reasons over the harvested signal
first and web-searches to go deeper. A dead collector logs one line and is
skipped — ingestion NEVER blocks the publish run.

Usage:
    python scripts/collectors/ingest.py            # harvest + write to Neon
    python scripts/collectors/ingest.py --dry-run  # harvest + print, no DB write
    python scripts/collectors/ingest.py --validate # check which feeds resolve

Env: DATABASE_URL (Neon, required to write) · FINNHUB_API_KEY (markets, optional)
     · GITHUB_TOKEN (optional, lifts GitHub rate limit).
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import rss            # noqa: E402
import hackernews     # noqa: E402
import arxiv_src      # noqa: E402
import github_src     # noqa: E402
import producthunt    # noqa: E402
import markets        # noqa: E402
from common import log  # noqa: E402

COLLECTORS = [
    ("rss", rss.collect),
    ("hackernews", hackernews.collect),
    ("arxiv", arxiv_src.collect),
    ("github", github_src.collect),
    ("producthunt", producthunt.collect),
    ("markets", markets.collect),
]

UPSERT = """
INSERT INTO redpxl.signals
  (source, url, title, published_at, domain_guess, excerpt, engagement, raw, content_hash)
VALUES
  (%(source)s, %(url)s, %(title)s, %(published_at)s, %(domain_guess)s,
   %(excerpt)s, %(engagement)s, %(raw)s, %(content_hash)s)
ON CONFLICT (content_hash) DO UPDATE SET
  engagement = GREATEST(redpxl.signals.engagement, EXCLUDED.engagement),
  fetched_at = now()
"""


def harvest():
    """Run all collectors fail-soft; return deduped signals."""
    seen, out = set(), []
    for name, fn in COLLECTORS:
        try:
            for sig in fn():
                h = sig["content_hash"]
                if h in seen:
                    continue
                seen.add(h)
                out.append(sig)
        except Exception as e:  # noqa: BLE001 — one bad collector never blocks the rest
            log("collector '%s' crashed (%s) — skipped" % (name, e))
    log("harvest: %d unique signals from %d collectors" % (out and len(out) or 0, len(COLLECTORS)))
    return out


HERE = os.path.dirname(os.path.abspath(__file__))
DIGEST_MD = os.path.join(HERE, "harvest-digest.md")     # prompt-friendly, gitignored
DIGEST_JSON = os.path.join(HERE, "harvest.json")        # full harvest, gitignored
PER_DOMAIN = 18                                          # top items per domain in the digest


def write_digest(signals):
    """Emit a bounded, domain-grouped harvest the Claude step reads BEFORE
    researching (breadth at ingest → the routine filters to what matters). This
    is the Phase-1 funnel input; Phase 2's clustering collapses it further."""
    by_domain = {}
    for s in signals:
        by_domain.setdefault(s.get("domain_guess") or "unsorted", []).append(s)

    def rank(s):
        return (s.get("engagement", 0), s.get("published_at") or "")

    lines = ["# Harvested signals — read FIRST, then research the leads that matter",
             "",
             "_%d signals across %d domains. Breadth at ingest; YOU filter to the few that are real, corroborated, and matter. Cross-check before publishing._" % (len(signals), len(by_domain)),
             ""]
    for dom in sorted(by_domain):
        items = sorted(by_domain[dom], key=rank, reverse=True)[:PER_DOMAIN]
        lines.append("## %s (%d)" % (dom, len(by_domain[dom])))
        for s in items:
            eng = (" · %d" % s["engagement"]) if s.get("engagement") else ""
            lines.append("- [%s](%s) — %s%s" % (s["title"], s["url"], s["source"], eng))
        lines.append("")
    try:
        with open(DIGEST_MD, "w", encoding="utf-8") as f:
            f.write("\n".join(lines))
        with open(DIGEST_JSON, "w", encoding="utf-8") as f:
            json.dump(signals, f, ensure_ascii=False)
        log("wrote digest (%s) + full harvest (%s)" % (DIGEST_MD, DIGEST_JSON))
    except Exception as e:  # noqa: BLE001
        log("digest write failed (%s)" % e)


def write(signals):
    url = os.environ.get("DATABASE_URL")
    if not url:
        log("DATABASE_URL not set — skipping DB write (harvest still ran).")
        return 0
    try:
        import psycopg
        from psycopg.types.json import Jsonb
    except ImportError:
        log("psycopg not installed — cannot write. `pip install 'psycopg[binary]'`.")
        return 0
    rows = [dict(s, raw=Jsonb(s.get("raw") or {})) for s in signals]
    try:
        with psycopg.connect(url, connect_timeout=20) as conn:
            with conn.cursor() as cur:
                cur.executemany(UPSERT, rows)
            conn.commit()
        log("wrote %d signals to redpxl.signals" % len(rows))
        return len(rows)
    except Exception as e:  # noqa: BLE001 — DB hiccup must not fail the publish run
        log("DB write failed (%s) — continuing fail-soft." % e)
        return 0


def main():
    if "--validate" in sys.argv:
        rss.validate()
        return
    signals = harvest()
    write_digest(signals)   # always emit the local digest for the routine to read
    if "--dry-run" in sys.argv:
        for s in signals[:60]:
            print("%-11s | %-22s | %s" % (s.get("domain_guess") or "-",
                                          s["source"][:22], s["title"][:70]))
        log("dry-run: %d signals (showing up to 60)" % len(signals))
        return
    write(signals)


if __name__ == "__main__":
    main()
