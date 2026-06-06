# Automating The AI Edge (daily + weekly)

The site renders entirely from `reports/data/reports.js`. Producing a report =
**prepend one object** to that array (+ a PDF for weeklies). The system is built
to run itself and **get smarter over time**.

## The live pipeline (current)

```
Claude "AI NEWS" routine  (daily 08:00, free under the Max plan)
        │  reads prompts + knowledge, researches, writes, self-checks
        ▼  git push to main
GitHub (private: Jarek-REDPXL/ai-daily-report)
        │  auto-deploy on push
        ▼
Vercel  →  https://redpxlnews.com   (team-password protected, always current)
```

The routine has the repo attached and these instructions (see "Routine prompt"
below). It runs unattended; nothing on your computer needs to be on.

## What each run does

1. **Reads the project's memory first** (this is the self-learning part):
   - `docs/knowledge/digest/_house.md` (shared mission/sourcing) + the per-domain
     digests `docs/knowledge/digest/<domain>.md` — active threads + durable lessons
   - `docs/knowledge/sources.md` — source-scoring ledger
   - `docs/knowledge/predictions.md` — open/resolved forward calls (domain-tagged)
   - recent entries in `reports/data/reports.js`
2. Researches the last ~24h (web search, cross-checked, figures flagged directional).
3. Follows `docs/prompts/daily.md` (and `weekly.md` on Mondays, for the week just
   ended) to write the report.
4. **Prepends** one dated object to `reports/data/reports.js` (newest first; never
   overwrites). One dated entry **every** run — even quiet days get a short one.
5. **Updates the knowledge files** in the same commit (advance threads, resolve
   predictions, distil new lessons). This is what makes it compound.
6. On Mondays (covering the prior Mon–Sun week): `python3 build_report.py`
   (data-driven — reads the newest weekly from reports.js and writes
   `reports/pdf/weekly-ai-report-<sortDate>.pdf`; no hand-editing) and sets the
   weekly's `pdf` field. Weeks are Monday–Sunday; the weekly's sortDate = the
   week's Sunday.
7. **Quality gate:** `python3 scripts/check_reports.py` must pass (valid JS,
   schema, unique ids, sorted, PDFs present) before committing.
8. Commits + pushes → Vercel deploys → live site current within ~1 minute.

## The self-learning loop (why it improves)

In-repo files give the autonomous run a memory it can read AND write:
- **`docs/knowledge/digest/`** — per-domain running judgment: `_house.md` (shared
  mission/sourcing) + one file per domain (`ai-tooling.md`, `web.md`, …) with that
  domain's threads + evergreen lessons. Each run builds on the relevant file(s).
- **`docs/knowledge/sources.md`** — source-scoring ledger; high scorers get mined
  first, sources behind validated items get promoted, stale ones decay.
- **`docs/knowledge/predictions.md`** — every forward-looking call (domain-tagged),
  with outcomes logged when they resolve. Public accountability = the edge a news
  feed can't fake.

Because these live in the repo (not in any one chat), every scheduled run inherits
everything learned so far and adds to it.

## Quality + reliability tooling

- `scripts/check_reports.py [YYYY-MM-DD]` — pre-commit gate. Optional date arg
  enables the "did today's entry get added?" freshness check.
- `build_report.py` — data-driven weekly PDF (reads reports.js; relative paths;
  works on any machine with `node` + `reportlab`).
- `functest.py` (dev-only, gitignored) — Playwright smoke test of the rendered site.

## Routine prompt (paste into the "AI NEWS" routine instructions)

> Every run, produce the RedPxl News daily briefing IN THIS REPOSITORY and publish it.
>
> READ first (the project's memory): docs/knowledge/digest/_house.md, the per-domain digests in docs/knowledge/digest/ for the domains you'll deep-beat today, docs/knowledge/predictions.md, docs/knowledge/sources.md, and recent entries in reports/data/reports.js.
> Follow docs/prompts/daily.md EXACTLY. Scan all 7 domains; deep-beat web + the 2 non-web domains least-recently covered (check recent reports' domains arrays) + promote anything urgent a scan surfaces. Research the last ~24h with web search; mine high-scoring sources from sources.md first and sample new ones; every source must be an exact clickable link.
> PREPEND one daily object to reports/data/reports.js (newest first, exact shape, never overwrite, valid JS). One dated entry every run, even quiet days. Set the domains array to today's substantive domains (valid slugs only).
> If MONDAY, also follow docs/prompts/weekly.md for the week just ended (Mon–Sun; weekly sortDate = that Sunday), then run python build_report.py and set the weekly's pdf field.
> UPDATE the per-domain digests you touched, predictions.md (resolve due calls, log new ones), and sources.md (promote/decay sources).
> Run python scripts/check_reports.py — it must pass. Then git add -A, commit, push origin main.
> Bar: golden value, kill 95% — what changed, why it matters to our disciplines, what to do or learn. Teach concepts. End each daily with a "Sharpen your edge" tip.

## Manual / local fallback

If the routine ever can't run, generate locally (free under Max, needs your PC on):
```powershell
powershell -ExecutionPolicy Bypass -File scripts\run-report.ps1            # daily
powershell -ExecutionPolicy Bypass -File scripts\run-report.ps1 -Type weekly
```

## Notes / gotchas

- **Search is freshest mid-morning** — an 08:00 run indexes "yesterday" well.
- **Verify big numbers.** Funding/valuation/benchmark figures move fast; the
  prompts require cross-checking and flagging directional.
- **Prepend, never overwrite.** The archive grows; the quality gate enforces it.
