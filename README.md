# The AI Edge ⚡

A **living, local briefing site** + PDF archive on everything happening in the AI industry — model releases, tools, prompting techniques & "skills", market/money moves, and policy. Built to keep you **informed and ahead**, not just to read.

- **Daily** reports: what changed in the last 24h.
- **Weekly** report: a synthesized summary of the whole week + what to learn.

## View the site

No build step. Either:

```bash
# Option 1 — just open it
open index.html          # macOS  (xdg-open on Linux, start on Windows)

# Option 2 — serve it (recommended; PDFs + tabs behave best over http)
python3 -m http.server 8099
# then visit http://localhost:8099
```

The site renders **entirely** from `reports/data/reports.js`:

- A **left sidebar archive** groups every report **by week**. Each week shows its
  pinned **weekly summary** plus each **day's** entry.
- Click any day or week to read it; **← Newer / Older →** step through the timeline.
- A **filter box** searches all reports; each report deep-links via `#id`.
- **Dark mode** and an **interactive action checklist** (saved in your browser)
  are built in. The weekly report has a **Download PDF** button.

The newest report opens by default, so every morning you just open the site.

## Add a new report

1. **Prepend** one object to the array in `reports/data/reports.js` (newest first).
   Set `type` (`"daily"` or `"weekly"`), a `week` label (used for sidebar
   grouping — keep it identical for all entries in the same week), `title`,
   `dateLabel`, `sortDate` (`YYYY-MM-DD`), a `tldr`, and `sections`. The file
   header documents every field.
2. (Optional) Drop the matching PDF in `reports/pdf/` and point `pdf:` at it.
3. Refresh the page. Done — the sidebar and timeline update automatically.

This is exactly what the scheduled automation does for you each morning.

## Regenerate the PDF

```bash
python3 build_report.py        # writes reports/pdf/weekly-ai-report-<date>.pdf
```

(Requires `reportlab`: `pip install reportlab`.)

## Structure

```
index.html              # homepage shell
assets/
  styles.css            # theme + layout
  app.js                # renders the site from the data file
reports/
  data/reports.js       # all report content lives here
  pdf/                  # downloadable PDFs
build_report.py         # PDF generator for the weekly briefing
docs/AUTOMATION.md      # how to make this run daily/weekly on a schedule
```

## Get it running (setup + automation)

See **[`SETUP.md`](SETUP.md)** — three short stages: push to a private repo,
turn on the automatic **daily + weekly** reports (via GitHub Actions, runs on
GitHub's servers so your machine can be off), and optionally host the site online.

Background on the design is in [`docs/AUTOMATION.md`](docs/AUTOMATION.md).

---
*Figures for fast-moving deals are directional, not guaranteed. Each report lists its sources.*

<!-- auto-deploy pipeline verified 2026-06-06 -->
