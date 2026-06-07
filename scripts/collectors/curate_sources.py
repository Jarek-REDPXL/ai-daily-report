#!/usr/bin/env python3
"""
RedPxl News — source self-curation advisory (Phase 5).

Closes the learning loop on sourcing: a source that backs a HIGHLY-RATED or
well-CORROBORATED card has earned trust (promote it); a source that never backs a
card decays. sources.md stays a human-curated markdown ledger, so this script
doesn't rewrite it — it emits a fail-soft ADVISORY (sources-suggestions.md) the
daily routine reads when it updates sources.md. Signal automated, judgment human.

FAIL-SOFT: no DATABASE_URL / psycopg → logs and exits 0.

Usage:  python scripts/collectors/curate_sources.py
Env:    DATABASE_URL (required)
"""
import os
import sys
import urllib.parse

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from common import log  # noqa: E402

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "sources-suggestions.md")


def _host(url):
    try:
        return urllib.parse.urlsplit(url).netloc.lower().replace("www.", "")
    except Exception:
        return ""


def main():
    url = os.environ.get("DATABASE_URL")
    if not url:
        log("curate_sources: DATABASE_URL not set — skipping advisory.")
        return
    try:
        import psycopg
    except ImportError:
        log("curate_sources: psycopg not installed — skipping.")
        return
    try:
        with psycopg.connect(url, connect_timeout=20) as conn:
            with conn.cursor() as cur:
                cur.execute(
                    "SELECT c.id, c.sources, c.corroboration_count, "
                    "       COALESCE(rs.avg_score, 0), COALESCE(rs.n, 0) "
                    "FROM redpxl.cards c "
                    "LEFT JOIN redpxl.rating_summary rs "
                    "       ON rs.target_type='card' AND rs.target_id=c.id "
                    "WHERE c.status='active'")
                rows = cur.fetchall()
    except Exception as e:  # noqa: BLE001
        log("curate_sources: DB read failed (%s) — skipping." % e)
        return

    promote, demote = {}, {}   # host -> list of reasons
    for cid, sources, corrob, avg, n in rows:
        hosts = set()
        for s in (sources or []):
            if isinstance(s, dict) and s.get("url"):
                h = _host(s["url"])
                if h:
                    hosts.add(h)
        avg = float(avg or 0)
        for h in hosts:
            if (n and avg >= 4.0):
                promote.setdefault(h, []).append("backs %s (rated %.1f, n=%d)" % (cid, avg, n))
            elif corrob and int(corrob) >= 3:
                promote.setdefault(h, []).append("backs well-corroborated %s (%d sources)" % (cid, int(corrob)))
            if (n and avg > 0 and avg <= 2.0):
                demote.setdefault(h, []).append("backs low-rated %s (rated %.1f, n=%d)" % (cid, avg, n))

    lines = ["# Source-curation advisory (auto — read when updating sources.md)",
             "",
             "_Generated from team ratings + card corroboration. PROMOTE = raise the "
             "source's score in sources.md (+1 hit, refresh last_useful); RECONSIDER "
             "= it backed a low-rated card, lower its score or supersede the card. "
             "Sources never appearing here that also never make a card should decay._",
             ""]
    lines.append("## Promote")
    if promote:
        for h in sorted(promote):
            lines.append("- **%s** — %s" % (h, "; ".join(promote[h][:3])))
    else:
        lines.append("- (none yet — needs rated/corroborated cards)")
    lines.append("")
    lines.append("## Reconsider")
    if demote:
        for h in sorted(demote):
            lines.append("- **%s** — %s" % (h, "; ".join(demote[h][:3])))
    else:
        lines.append("- (none)")
    lines.append("")
    try:
        with open(OUT, "w", encoding="utf-8") as f:
            f.write("\n".join(lines))
        log("curate_sources: wrote %s (%d promote, %d reconsider)" % (OUT, len(promote), len(demote)))
    except Exception as e:  # noqa: BLE001
        log("curate_sources: write failed (%s)" % e)


if __name__ == "__main__":
    main()
