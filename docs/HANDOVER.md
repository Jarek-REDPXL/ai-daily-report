# RedPxl News — Project Handover

Last updated: 2026-06-06. This is the complete operating manual for the project:
what it is, how it runs, every moving part, how to change things, and what's next.

---

## 1. What this is (in one paragraph)

**RedPxl News** is a self-running, self-improving intelligence platform for the
RedPxl team across the disciplines the team works in — **web, graphic, email,
social, paid, growth**, plus **ai-tooling** (AI tools, skills & techniques applied
to all of the above). A private knowledge base (not just a news feed) that
researches these fields every morning, writes a daily briefing (and a weekly
synthesis on Mondays), grades its own past predictions, compounds what it learns in
an in-repo memory that is now **per-domain** (each discipline has its own threads +
lessons), quality-checks itself, and publishes to a live, password-protected,
on-brand site — with zero manual steps day to day.

- **Live URL:** https://redpxlnews.com  (team password required)
- **Repo:** https://github.com/Jarek-REDPXL/ai-daily-report  (private)
- **Host:** Vercel, project `ai-daily-report` under team `jarek-s-projects2` (Pro)
- **Generator:** Claude "AI NEWS" routine (Claude web/app), runs daily ~08:00 BST,
  free under the user's Max plan.

---

## 2. The end-to-end pipeline

```
Claude "AI NEWS" routine (daily ~08:00 BST, free under Max plan)
   │  reads its own memory, researches the web, writes the report,
   │  updates memory, runs the quality gate, commits
   ▼  git push to main
GitHub (private: Jarek-REDPXL/ai-daily-report)
   │  push triggers auto-deploy
   ▼
Vercel (Pro)  →  https://redpxlnews.com   (behind team password)
```

Everything is driven from one repo. The routine writes; GitHub stores + versions;
Vercel builds + serves. No PC needs to be on.

---

## 3. How content is structured (the data model)

**`reports/data/reports.js` is the single source of truth.** It's a JS file
assigning `window.AI_EDGE_REPORTS = [ ... ]` — an array of report objects, newest
first. The routine PREPENDS one new object per run; never overwrites older ones.

Each report object shape:
```
{
  id: "2026-06-06-daily",          // unique; "<sortDate>-daily" or "<sortDate>-weekly"
  type: "daily" | "weekly",
  week: "Week of Jun 1 – 7, 2026", // Monday–Sunday label
  title: "Daily Briefing — Saturday, June 6",
  dateLabel: "Saturday, June 6, 2026",
  sortDate: "2026-06-06",          // YYYY-MM-DD, drives ordering + week grouping
  domains: ["ai-tooling"],         // >=1 valid slug from scripts/domains.js (gate-checked)
  pdf: "reports/pdf/...pdf",       // weekly only
  tldr: ["<b>...</b> html string", ...],
  sections: [ { h, intro?, blocks?[], checklist?[] } ],
      // block = { sub?, tags?[], p?, list?[], table?{head,rows}, why?, doIt?, note? }
  sources: "html string of <a href> EXACT links joined by ' · '"
}
```

**Derived data (auto-generated — do NOT hand-edit):**
- `reports/data/index.json` — lightweight metadata (incl. `domains`) + a lowercased
  search blob `q` per report. **A bare array** — loaded once by the site for the
  sidebar/nav/search. (Deliberately array-shaped so app.js consumes it directly; the
  domains facet lives in the sidecar below rather than reshaping this into an object.)
- `reports/data/index.meta.json` — sidecar facet
  `{ domains: [{slug, count, label, fullLabel}] }` (labels sourced from
  scripts/domains.js). Powers the sidebar domain-filter chips; loaded by app.js with
  its own try/catch (if it's missing/empty, no chips render and the site behaves
  exactly as before).
- `reports/data/entries/<id>.json` — one full report per file. The site
  **lazy-loads** only the entry you open (cached). This is what makes it scale to
  years of reports without the browser downloading everything.

`scripts/build-data.js` regenerates index.json + entries/ from reports.js. It runs
**automatically** inside the quality gate (`scripts/check_reports.py`), so the
routine never needs a separate step. The site falls back to loading reports.js
directly if the JSON fetch ever fails (safety net).

**Week convention:** weeks are **Monday–Sunday**. A weekly's `sortDate` = that
week's **Sunday**; it's authored on **Monday** for the week just ended. The sidebar
DERIVES the Mon–Sun group from each entry's `sortDate` (so grouping is correct even
if a stored `week` string is off). Layout per week group: week-date divider →
Weekly summary pinned on top → 7 days listed Sunday→Monday.

---

## 4. The files (what each one does)

### Site (no build step — vanilla HTML/CSS/JS)
- `index.html` — shell: topbar (logo + theme toggle), sidebar (search + archive
  nav), main report container, footer. No-flash theme init in `<head>`. Loads
  `assets/app.js` (which loads data itself).
- `assets/app.js` — the renderer. Loads index.json, lazy-loads entries, builds the
  sidebar (Mon–Sun grouping), renders reports, handles theme/search/pager/
  checklist/keyboard-nav/scroll-progress, with legacy fallback to reports.js. Also
  builds the **sidebar domain-filter chips** from `index.meta.json` (own try/catch;
  single-select, AND-composes with search, persists to `redpxl-domain`).
- `assets/styles.css` — the entire RedPxl design system (see §6), incl. the
  domain-filter chip styles.
- `assets/blacklogo.png` / `whitelogo.png` — RedPxl wordmark; black shows in light
  mode, white in dark mode (swapped via CSS on `data-theme`).

### Data
- `reports/data/reports.js` — source of truth (routine writes here).
- `reports/data/index.json`, `reports/data/entries/*.json`,
  `reports/data/index.meta.json` (domains facet) — generated, don't edit.
- `reports/pdf/*.pdf` — weekly PDFs (generated by build_report.py).

### Taxonomy
- `scripts/domains.js` — machine source of truth for valid domain slugs +
  labels (`DOMAINS`, `DOMAIN_LABELS`, `DOMAIN_LABELS_SHORT`, `PAID_PLATFORM_TAGS`);
  imported by build-data.js and parsed by the gate.
- `docs/DOMAINS.md` — human-readable taxonomy: the 7 slugs + labels + scopes + the
  paid platform tags (`google-ads`, `meta-ads`, `snap-ads`).

### The "brain" (self-learning memory, in-repo so the routine can read+write it)
- `docs/knowledge/digest/` — per-domain running judgment. `_house.md` holds the
  shared mission + sourcing standard (once, not 7×); each domain has its own file
  (`ai-tooling.md`, `web.md`, `graphic.md`, `email.md`, `social.md`, `paid.md`,
  `growth.md`) with that domain's active threads + durable lessons + changelog.
  Read `_house.md` + the relevant domain file(s) before writing; update after.
  (`docs/knowledge/digest.md` is now a thin pointer to this folder.)
- `docs/knowledge/sources.md` — source-scoring ledger (source · domain · score ·
  hits · last_useful · good_for · notes). Mine high scorers before researching;
  promote/decay after. See its header for the loop.
- `docs/knowledge/predictions.md` — every forward-looking call (domain-tagged) with
  outcomes logged when they resolve (✅ held / ❌ missed / ⚖️ partial). The
  accountability layer.
- Domain taxonomy: `docs/DOMAINS.md` (human-readable) + `scripts/domains.js` (the
  machine source of truth for valid slugs; the gate parses it).

### Prompts (the editorial spec the routine follows)
- `docs/prompts/daily.md` — daily briefing instructions (canonical): the 7-domain
  cadence (scan all 7 → deep-beat web + the 2 least-recently-covered non-web domains
  → promote anything urgent), per-domain sourcing, the source-scoring loop, the
  exact-clickable-link rule, self-learning loop, output format, quality gate step.
- `docs/prompts/weekly.md` — weekly synthesis instructions (Mon–Sun, written Monday;
  synthesizes across all 7 domains).

### Tooling
- `scripts/check_reports.py [YYYY-MM-DD]` — QUALITY GATE. Validates reports.js (valid
  JS, schema, unique ids, sorted newest-first, weekly PDFs exist; optional date arg
  checks "did today's entry get added"). Then auto-runs build-data.js. Must pass
  before any commit. Requires `node` on PATH.
- `scripts/build-data.js` — regenerates index.json + entries/ (run by the gate).
- `build_report.py [sortDate]` — data-driven weekly PDF generator. Reads the newest
  weekly (or a specific one by sortDate) straight from reports.js and writes
  `reports/pdf/weekly-ai-report-<sortDate>.pdf`. Never hand-edited per week.
  Requires `reportlab` + `node`.
- `scripts/run-report.ps1 [-Type daily|weekly]` — local fallback generator (uses
  the Claude CLI under the Max plan; needs the PC on).
- `functest.py` — Playwright smoke test of the rendered site (26 checks). DEV-ONLY,
  gitignored. Run with the local server on :8099.

### Access control
- `middleware.js` — Vercel Edge Middleware. Gates the WHOLE site server-side
  (incl. data files) behind a team password. Serves an on-brand RedPxl login page;
  on correct password sets a 30-day cookie holding a SHA-256 of the password.
  Password lives in env var `SITE_PASS` (never in code).

### Config / infra
- `vercel.json` — static no-build config (framework/buildCommand null, output root)
  + no-cache headers on reports data so new reports show immediately.
- `netlify.toml` — alternate-host config (not in use; Vercel is the host).
- `.github/workflows/*.yml` — daily/weekly/pages workflows, all SCHEDULE-DISABLED
  (manual-only). They're an optional API-billed backup; the Claude routine is the
  real generator. deploy-pages is off (GitHub Pages can't host a private repo free).

### Docs
- `SETUP.md` — setup + hosting + cost notes.
- `docs/AUTOMATION.md` — how the automation works + the routine prompt to paste.
- `docs/KNOWLEDGE-BASE-ROADMAP.md` — Phase 2 (Postgres) + Phase 3 (vector search).
- `docs/HANDOVER.md` — this file.

---

## 5. The "AI NEWS" routine (the autonomous generator)

Configured in the Claude web/app (Routines), NOT in this repo. Key settings:
- **Repository attached:** `Jarek-REDPXL/ai-daily-report` (this was THE critical
  fix — without it the run had no repo and stopped safely).
- **Trigger:** daily ~08:00 BST.
- **Model:** Opus 4.x (free under Max).
- **Permissions:** allow git push to the repo; web search; Bash. Runs unattended.

Its Instructions tell it to: read the per-domain knowledge files + recent reports →
research the last ~24h on the **7-domain cadence** (scan all 7 domains → deep-beat
**web** + the **2 least-recently-covered non-web domains** + promote anything urgent
a scan surfaces) → mine/update the **source-scoring loop** (`sources.md`) → prepend
one dated daily to reports.js with its `domains` array (one EVERY run, even quiet
days) → on Mondays also write the weekly + run build_report.py → update the
per-domain digests + predictions + sources → run check_reports.py (must pass) →
commit + push. The canonical, up-to-date version of this cadence lives in
`docs/prompts/daily.md`; the paste-able routine prompt is in
`docs/AUTOMATION.md` under "Routine prompt" — if you edit the workflow, copy from
there.

> If a gap of missing days ever appears: it means the routine skipped writing (the
> old failure mode) or couldn't push. The prompt now forbids skipping; if it
> recurs, check the routine's repo attachment + push permission, or use the local
> runner to backfill.

---

## 6. Design system (RedPxl Brand Identity 2026.04)

Built strictly to the brand guide (RedPxl_Brand_Identity_2026.pdf), including its
"Banned Patterns" list.
- **Palette:** Midnight `#0A0D12` (bg), Navy `#373F51`, Sky `#9EC9E4`, Ice
  `#F0F4FA` (light bg), **Red `#FF2F2B`** (accent — used sparingly).
- **Type:** Inter (primary), DM Sans (editorial italic accent), JetBrains Mono
  (labels). Base size 16px, line-height 1.7 for readability.
- **Default theme: DARK** (white logo on midnight). Toggle opts into light (black
  logo on ice). Storage key `redpxl-theme`. Sun/moon SVG icons, no emoji.
- **Mandatory textures (all implemented):** grain overlay (`body::before`), ambient
  red+sky glow (`body::after`), red accent bars (TL;DR, "why" callouts, active +
  weekly nav items), geometric corner accent (`main::before`), square red dot motif.
- **Domain-filter chips:** mono-label pills in the sidebar; active chip uses the red
  accent treatment (red-glow fill + the square red-dot motif + red count), inactive
  chips stay quiet. Works in both themes; respects `prefers-reduced-motion`.
- **Layout:** full-width content (no width caps), generous whitespace.
- **Motion:** one orchestrated staggered load reveal, unified easing tokens,
  restrained hover/press micro-interactions, rAF scroll progress, keyboard nav
  (← / → between editions, `/` focus search), all wrapped in `prefers-reduced-motion`.
- **Honors banned patterns:** no gradient text, no indigo, no `#000`/`#ccc`, no
  emoji, no pure-symmetrical rounded-card grids.

> NOTE: shadcn cannot be installed (it's React+Tailwind w/ a build step; this is a
> no-build site by design). The design applies shadcn/Apple/Samsung *principles*,
> not the library.

---

## 7. Access / password

- **How to log in:** visit https://redpxlnews.com → RedPxl login page → enter the
  team password → in for 30 days on that device.
- **Current password:** `TempPass-Change-Me-2026` (username field not used by the
  page form; it's just a password). THIS IS TEMPORARY — change it.
- **To change it:** Vercel → project `ai-daily-report` → Settings → Environment
  Variables → edit `SITE_PASS` → Save → redeploy (Deployments → Redeploy latest).
- It's the **free** Edge Middleware approach — the user explicitly refused Vercel's
  $150/mo paid "Password Protection". Vercel's own Deployment Protection is OFF so
  the middleware is the only gate. Security is real: content + data files all 401
  without the cookie (verified).

---

## 8. Common operations (cheat sheet)

Local dev (Windows; real Python at `%LOCALAPPDATA%\Programs\Python\Python312`):
```
# serve locally
python -m http.server 8099        # then open http://localhost:8099

# quality gate (also regenerates index.json + entries/)
python scripts/check_reports.py 2026-06-06

# rebuild a weekly PDF
python build_report.py 2026-05-31

# functional test (needs local server running)
python functest.py

# pull what the routine pushed
git pull --ff-only origin main
```
Deploy = `git push origin main` (Vercel auto-deploys in ~1 min). Verify a deploy:
`npx vercel ls` (authenticated as jaroslawkonarski0709-7566).

> Windows gotcha: when running Python scripts that shell out to `node`, set
> `PYTHONUTF8=1` — output contains `–`, `—`, `≈` etc. and cp1252 chokes otherwise.
> The scripts already decode node output as UTF-8 explicitly.

---

## 9. Roadmap / what's next

`docs/KNOWLEDGE-BASE-ROADMAP.md` has the detail. Summary:
- **Phase 1 (DONE):** split data + lazy-load + auto-regen. Scales to years.
- **Domain expansion (DONE):** the platform now covers all 7 team disciplines —
  `domains` field on every report (gate-validated), per-domain ledgers, the
  source-scoring ledger, the 7-domain daily cadence, and the sidebar domain filter.
- **Phase 2 (when needed):** Postgres (Vercel Postgres / Supabase, free tier) for
  cross-year full-text + structured filtering (by ticker/company/topic) + an API.
- **Phase 3 (the big one):** semantic / vector search (pgvector) — "ask it
  anything across years" with cited answers, optionally exposed as an MCP server so
  Claude Code can query the knowledge base. ~a few $/month. Build once there's
  enough dense, well-sourced history to make recall valuable.

Other open follow-ups:
- Change the team password from the temp value (see §7).
- Optionally feed the RedPxl brand *voice* rules (guide pp. 8–9) into the report
  prompts if you want the writing tuned to brand voice.
- The exact-source-link rule applies going forward; older reports keep their
  original (mostly text) sources — URLs for those were never stored, and we don't
  fabricate links.

---

## 10. Key decisions & gotchas (so the next person doesn't relearn them)

- **reports.js is the source of truth.** Everything else derives from it; you can
  always rebuild. Never edit index.json/entries/ by hand.
- **Routine must attach the repo** or it can't write (it will stop safely, not
  guess). Same class of issue applies to Vercel↔GitHub and the Claude GitHub App:
  each needs explicit access to the private repo.
- **Vercel free Hobby auto-deploys private repos** — the user is on Pro, but
  auto-deploy itself never required Pro. The $150 password add-on was refused;
  middleware does it free.
- **Vercel strips `WWW-Authenticate`** from middleware responses → the native
  browser password popup never appears. That's why we serve an HTML login page.
- **GitHub Pages can't host a private repo free** → Pages deploy was disabled;
  Vercel is the host.
- **Line endings:** repo gets CRLF warnings on Windows; harmless.
- **Memory:** Claude's persistent project memory (separate from the repo) holds
  operational notes at the user's memory dir — `ai-edge-operational-setup.md`,
  `ai-edge-knowledge-digest.md`, `python-real-path.md`.
```
