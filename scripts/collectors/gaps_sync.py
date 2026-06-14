#!/usr/bin/env python3
"""
RedPxl News — feedback -> Brain gaps sync (Phase 1: close the feedback loop).

Turns the team's two strongest demand signals into structured rows in the Brain
`gaps` table (db/migrations/006_brain.sql), so future generation can aim at what's
missing:
  - ask_no_match : Ask-anything questions the knowledge base couldn't answer
                   (redpxl.ask_log WHERE matched = false)
  - low_rating   : cards/reports the team rated poorly
                   (redpxl.rating_summary — low average over enough votes)

Writes via scripts/collectors/brain.py (addGap), deduped against existing OPEN
gaps so a recurring signal never piles up duplicates. Then emits a fail-soft
digest (gaps-digest.md) the daily routine reads — the persisted demand backlog,
which carries the signal even when the live /api/intake read is unavailable.

FAIL-SOFT: no DATABASE_URL / psycopg / DB error -> logs and exits 0. Requires the
006_brain.sql migration live in Neon; until then the gap writes no-op (fail-soft)
and the digest simply lists nothing.

Usage:  python scripts/collectors/gaps_sync.py
Env:    DATABASE_URL (required)
"""
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from common import log  # noqa: E402
import brain  # noqa: E402

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "gaps-digest.md")

# Tunables (ceilings, not targets) — keep the backlog focused, never floody.
ASK_LOOKBACK_DAYS = 60      # how far back to mine unmatched Ask questions
LOW_AVG_MAX = 2.5           # rating average at/under this counts as "low"
LOW_MIN_VOTES = 2           # need at least this many votes before acting on a low score
MAX_NEW_PER_RUN = 25        # cap new gaps added in a single run
DIGEST_LIMIT = 40           # how many open gaps to surface in the digest


def _norm(s):
    """Stable dedup key for a topic string."""
    return re.sub(r"\s+", " ", (s or "").strip().lower())[:200]


def main():
    url = os.environ.get("DATABASE_URL")
    if not url:
        log("gaps_sync: DATABASE_URL not set — skipping (fail-soft).")
        return
    try:
        import psycopg
    except ImportError:
        log("gaps_sync: psycopg not installed — skipping.")
        return

    # --- read the two source signals (direct, read-only) ---------------------
    asks, lows = [], []
    try:
        with psycopg.connect(url, connect_timeout=20) as conn:
            with conn.cursor() as cur:
                cur.execute(
                    "SELECT min(question) AS q, count(*) AS n, max(top_score) AS best "
                    "FROM redpxl.ask_log "
                    "WHERE matched = false "
                    "  AND created >= now() - make_interval(days => %s) "
                    "GROUP BY lower(btrim(question)) "
                    "ORDER BY n DESC, max(created) DESC "
                    "LIMIT 100",
                    (ASK_LOOKBACK_DAYS,))
                asks = cur.fetchall()
            with conn.cursor() as cur:
                cur.execute(
                    "SELECT rs.target_type, rs.target_id, rs.n, rs.avg_score, "
                    "       COALESCE(c.title, r.title) AS title "
                    "FROM redpxl.rating_summary rs "
                    "LEFT JOIN redpxl.cards   c ON rs.target_type = 'card'   AND c.id = rs.target_id "
                    "LEFT JOIN redpxl.reports r ON rs.target_type = 'report' AND r.id = rs.target_id "
                    "WHERE rs.avg_score <= %s AND rs.n >= %s "
                    "ORDER BY rs.avg_score ASC, rs.n DESC "
                    "LIMIT 100",
                    (LOW_AVG_MAX, LOW_MIN_VOTES))
                lows = cur.fetchall()
    except Exception as e:  # noqa: BLE001 — fail-soft
        log("gaps_sync: source read failed (%s) — skipping." % e)
        return

    # --- existing OPEN gaps for dedup (so recurring signals don't pile up) ----
    existing = set()
    for g in (brain.getOpenGaps(limit=500) or []):
        existing.add((g.get("source"), _norm(g.get("topic"))))

    added = 0

    # ask_no_match: weight = how often the question was asked (demand strength).
    for q, n, best in asks:
        if added >= MAX_NEW_PER_RUN:
            break
        topic = (q or "").strip()[:200]
        if not topic:
            continue
        key = ("ask_no_match", _norm(topic))
        if key in existing:
            continue
        best_txt = ("%.2f" % float(best)) if best is not None else "n/a"
        detail = ("Asked %d via Ask-anything; best KB match %s (below the relevance "
                  "threshold) — the knowledge base doesn't cover this yet."
                  % (int(n), best_txt))
        if brain.addGap("ask_no_match", topic, detail=detail, weight=float(n)):
            existing.add(key)
            added += 1

    # low_rating: weight = (3 - avg) * n  (worse + more-rated ranks higher).
    for ttype, tid, n, avg, title in lows:
        if added >= MAX_NEW_PER_RUN:
            break
        topic = (title or tid or "").strip()[:200]
        if not topic:
            continue
        key = ("low_rating", _norm(topic))
        if key in existing:
            continue
        avgf = float(avg or 0)
        detail = ("Team rated this %s %.1f/5 over %d ratings (%s %s) — revisit, sharpen, "
                  "or supersede it." % (ttype, avgf, int(n), ttype, tid))
        weight = round((3.0 - avgf) * int(n), 2)
        if brain.addGap("low_rating", topic, detail=detail, weight=weight):
            existing.add(key)
            added += 1

    # --- emit the digest the daily routine reads -----------------------------
    _write_digest()
    log("gaps_sync: added %d new gap(s); digest written." % added)


def _write_digest():
    open_gaps = brain.getOpenGaps(limit=DIGEST_LIMIT) or []
    lines = [
        "# Open knowledge gaps (auto — the team's unmet demand; read before researching)",
        "",
        "_Built each run from the DB: unmatched Ask-anything questions (`ask_no_match`) and "
        "low-rated cards/reports (`low_rating`). Highest-weight first. Treat these as "
        "first-class research targets — when today's work covers one, say so. Fail-soft: "
        "if this list is empty, just research the normal cadence._",
        "",
    ]
    if open_gaps:
        for g in open_gaps:
            w = g.get("weight")
            wtxt = (" _(weight %s)_" % w) if w is not None else ""
            src = g.get("source") or "?"
            topic = (g.get("topic") or "").strip()
            detail = (g.get("detail") or "").strip()
            lines.append("- **[%s]** %s%s" % (src, topic, wtxt))
            if detail:
                lines.append("  - %s" % detail)
    else:
        lines.append("- (no open gaps — research the normal cadence)")
    lines.append("")
    try:
        with open(OUT, "w", encoding="utf-8") as f:
            f.write("\n".join(lines))
    except Exception as e:  # noqa: BLE001
        log("gaps_sync: digest write failed (%s)" % e)


if __name__ == "__main__":
    main()
