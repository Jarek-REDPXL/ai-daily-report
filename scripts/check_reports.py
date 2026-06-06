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

REQUIRED = ["id", "type", "week", "title", "dateLabel", "sortDate", "tldr", "sections"]

def load():
    node_script = (
        "const fs=require('fs');global.window={};"
        "eval(fs.readFileSync(process.argv[1],'utf8'));"
        "process.stdout.write(JSON.stringify(window.AI_EDGE_REPORTS||[]));"
    )
    try:
        out = subprocess.run(["node", "-e", node_script, REPORTS_JS],
                             capture_output=True, check=True)
    except FileNotFoundError:
        sys.exit("FAIL: `node` not found on PATH (needed to evaluate reports.js).")
    except subprocess.CalledProcessError as e:
        msg = (e.stderr or b"").decode("utf-8", "replace") or str(e)
        sys.exit("FAIL: reports.js is not valid JavaScript:\n" + msg)
    return json.loads(out.stdout.decode("utf-8", "replace"))

def main():
    errors = []
    warnings = []
    reports = load()

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
        if not isinstance(r.get("tldr", []), list) or len(r.get("tldr", [])) < 2:
            errors.append("%s tldr should be a list of >=2 items" % where)
        if not isinstance(r.get("sections", []), list) or not r.get("sections"):
            errors.append("%s sections should be a non-empty list" % where)
        ids.append(r.get("id"))

    # unique ids
    dupes = set(x for x in ids if ids.count(x) > 1)
    if dupes:
        errors.append("duplicate ids: %s" % ", ".join(sorted(map(str, dupes))))

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

    # knowledge files exist (the self-learning layer)
    for kf in ["docs/knowledge/digest.md", "docs/knowledge/predictions.md"]:
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

    print("OK: %d reports (%d daily, %d weekly), valid JS, unique ids, sorted, "
          "pdfs present." % (len(reports), n_daily, n_weekly))

if __name__ == "__main__":
    main()
