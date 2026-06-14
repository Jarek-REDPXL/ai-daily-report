#!/usr/bin/env python3
"""
RedPxl News — daily metrics snapshot (the substrate measurement the system lacked).

Writes ONE row/day to redpxl.metrics via the Brain (brain.captureMetrics): the system's size +
whatever signal real use generates, so health/growth becomes a curve you can look at instead of
a guess.
  signals_total, cards_total, reports_total, feedback_total, ratings_total
  + extra: { outcomes_total, open_gaps }
cards_total / reports_total are counted from the gate-regenerated derived files (always current
after the quality gate); the rest from the DB. One row per UTC day — the metrics table's unique
index on `captured` dedupes a same-day re-run (it upserts).

FAIL-SOFT: no DATABASE_URL / psycopg / DB error -> logs and exits 0 (captureMetrics no-ops, and
the file counts still record). Run this AFTER the quality gate so the derived files are fresh.

Usage:  python scripts/collectors/metrics_snapshot.py
Env:    DATABASE_URL (for the DB counts; the file counts work without it)
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from common import log  # noqa: E402
import brain  # noqa: E402

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


def _count_json_array(path):
    try:
        with open(path, encoding="utf-8") as f:
            data = json.load(f)
        return len(data) if isinstance(data, list) else None
    except Exception as e:  # noqa: BLE001 — fail-soft
        log("metrics: couldn't count %s (%s)" % (path, e))
        return None


def _db_counts(url):
    """Return {signals_total,feedback_total,ratings_total,outcomes_total,open_gaps} — fail-soft."""
    try:
        import psycopg
    except ImportError:
        log("metrics: psycopg not installed — DB counts skipped.")
        return {}
    queries = {
        "signals_total":  "SELECT count(*) FROM redpxl.signals",
        "feedback_total": "SELECT count(*) FROM redpxl.feedback",
        "ratings_total":  "SELECT count(*) FROM redpxl.ratings",
        "outcomes_total": "SELECT count(*) FROM redpxl.outcomes",
        "open_gaps":      "SELECT count(*) FROM redpxl.gaps WHERE status = 'open'",
    }
    counts = {}
    try:
        with psycopg.connect(url, connect_timeout=20) as conn:
            for key, q in queries.items():
                try:
                    with conn.cursor() as cur:
                        cur.execute(q)
                        counts[key] = int(cur.fetchone()[0])
                except Exception as e:  # noqa: BLE001 — a missing table shouldn't sink the rest
                    log("metrics: %s failed (%s)" % (key, e))
    except Exception as e:  # noqa: BLE001
        log("metrics: DB connect failed (%s) — DB counts skipped." % e)
    return counts


def main():
    cards_total = _count_json_array(os.path.join(REPO, "reports", "data", "cards-index.json"))
    reports_total = _count_json_array(os.path.join(REPO, "reports", "data", "index.json"))

    url = os.environ.get("DATABASE_URL")
    if not url:
        log("metrics: DATABASE_URL not set — recording file counts only (DB counts null).")
    db = _db_counts(url) if url else {}

    extra = {}
    if "outcomes_total" in db:
        extra["outcomes_total"] = db["outcomes_total"]
    if "open_gaps" in db:
        extra["open_gaps"] = db["open_gaps"]

    ok = brain.captureMetrics(
        signals_total=db.get("signals_total"),
        cards_total=cards_total,
        reports_total=reports_total,
        feedback_total=db.get("feedback_total"),
        ratings_total=db.get("ratings_total"),
        extra=extra or None,
    )
    log("metrics: cards=%s reports=%s signals=%s feedback=%s ratings=%s extra=%s -> %s" % (
        cards_total, reports_total, db.get("signals_total"), db.get("feedback_total"),
        db.get("ratings_total"), extra, "captured" if ok else "no-op (fail-soft)"))


if __name__ == "__main__":
    main()
