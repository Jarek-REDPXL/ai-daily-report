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
Vercel  →  https://ai-daily-report-beta.vercel.app   (public, always current)
```

The routine has the repo attached and these instructions (see "Routine prompt"
below). It runs unattended; nothing on your computer needs to be on.

## What each run does

1. **Reads the project's memory first** (this is the self-learning part):
   - `docs/knowledge/digest.md` — active threads + durable lessons
   - `docs/knowledge/predictions.md` — open/resolved forward calls
   - recent entries in `reports/data/reports.js`
2. Researches the last ~24h (web search, cross-checked, figures flagged directional).
3. Follows `docs/prompts/daily.md` (and `weekly.md` on Sundays) to write the report.
4. **Prepends** one dated object to `reports/data/reports.js` (newest first; never
   overwrites). One dated entry **every** run — even quiet days get a short one.
5. **Updates the knowledge files** in the same commit (advance threads, resolve
   predictions, distil new lessons). This is what makes it compound.
6. On Sundays: `python3 build_report.py` (data-driven — reads the newest weekly
   from reports.js and writes `reports/pdf/weekly-ai-report-<sortDate>.pdf`; no
   hand-editing) and sets the weekly's `pdf` field.
7. **Quality gate:** `python3 scripts/check_reports.py` must pass (valid JS,
   schema, unique ids, sorted, PDFs present) before committing.
8. Commits + pushes → Vercel deploys → live site current within ~1 minute.

## The self-learning loop (why it improves)

Two in-repo files give the autonomous run a memory it can read AND write:
- **`docs/knowledge/digest.md`** — the running distilled judgment (threads +
  evergreen lessons). Each run builds on it and prunes it.
- **`docs/knowledge/predictions.md`** — every forward-looking call, with outcomes
  logged when they resolve. Public accountability = the edge a news feed can't fake.

Because these live in the repo (not in any one chat), every scheduled run inherits
everything learned so far and adds to it.

## Quality + reliability tooling

- `scripts/check_reports.py [YYYY-MM-DD]` — pre-commit gate. Optional date arg
  enables the "did today's entry get added?" freshness check.
- `build_report.py` — data-driven weekly PDF (reads reports.js; relative paths;
  works on any machine with `node` + `reportlab`).
- `functest.py` (dev-only, gitignored) — Playwright smoke test of the rendered site.

## Routine prompt (paste into the "AI NEWS" routine instructions)

> Every run, produce "The AI Edge" briefing IN THIS REPOSITORY and publish it.
> 1. READ docs/knowledge/digest.md + docs/knowledge/predictions.md + the recent
>    entries in reports/data/reports.js (the project's memory).
> 2. Follow docs/prompts/daily.md exactly to create TODAY's daily report; research
>    the last ~24h with web search, cross-check surprising figures, mark
>    fast-moving numbers directional.
> 3. PREPEND one new daily object to reports/data/reports.js (newest first; exact
>    existing shape; never overwrite; keep valid JS). One dated entry every run,
>    even on quiet days.
> 4. If today is SUNDAY, also follow docs/prompts/weekly.md, then run
>    `python3 build_report.py` and set the weekly's pdf field.
> 5. UPDATE docs/knowledge/digest.md + docs/knowledge/predictions.md (advance
>    threads, resolve predictions, add new lessons/calls).
> 6. Run `python3 scripts/check_reports.py` — it must pass.
> 7. git add -A, commit, and push to origin main yourself.
> Bar: golden value, not boring facts — what happened, why it matters, what to do
> or learn. Teach new concepts. End each daily with a "Sharpen your edge" tip.

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
