# Automating The AI Edge (daily + weekly)

This repo is designed so that producing a report = **append one object** to
`reports/data/reports.js` (and optionally drop a PDF in `reports/pdf/`). That
makes it easy to drive on a schedule.

## The model

You can't make Claude run "every day" from inside a chat — Claude only runs when
a **session is triggered**. So scheduling needs a trigger that wakes a session.

### Option A — Scheduled Claude Code (web) session  *(recommended)*

Claude Code on the web supports scheduled/triggered sessions against a repo.
See https://code.claude.com/docs/en/claude-code-on-the-web.

Set up two schedules pointed at this repo:

| Schedule       | When                    | Prompt file              |
|----------------|-------------------------|--------------------------|
| Daily briefing | every day, ~08:00 local | `docs/prompts/daily.md`  |
| Weekly summary | Sundays, ~18:00 local   | `docs/prompts/weekly.md` |

Each run: research the last day/week, write a new report object, prepend it to
`reports/data/reports.js`, regenerate the PDF (`python3 build_report.py`), then
commit & push. The site updates automatically on next load.

### Option B — Manual one-shot

Run the prompt yourself when you want it (or wire it to `cron` + the Claude
Agent SDK headless mode). Zero standing infrastructure.

## Notes / gotchas

- **Search is freshest mid-morning.** News for "yesterday" is best indexed a few
  hours into the day, so a midnight run will miss things. Prefer ~08:00 local.
- **Verify the big numbers.** Funding/valuation/acquisition figures move fast and
  get misreported. The prompts instruct cross-checking and flagging shaky claims.
- **Keep the archive.** Don't overwrite old reports — prepend. The tab bar grows.
