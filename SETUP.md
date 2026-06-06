# The AI Edge — Setup & Operations

This is a **no-build** static site. Open `index.html` and it works. All content
lives in `reports/data/reports.js` (a `window.AI_EDGE_REPORTS` array — newest
first; prepend a new object to add a report).

## Run the site locally

```powershell
# any static server works
python -m http.server 8080
# then open http://localhost:8080
```

## How reports get generated — three options, and what each COSTS

All three do the same job (Claude researches the news and prepends a new entry to
`reports/data/reports.js`). They differ only in **who pays**:

| Option | Where it runs | Cost | PC must be on? |
| --- | --- | --- | --- |
| **A. Claude scheduled task ("routine")** | Claude cloud | **Included in your Max plan** (no extra charge) | No — runs in the cloud |
| **B. Local run** (`scripts/run-report.ps1`) | Your machine, Claude CLI | **Included in your Max plan** (uses your login) | Yes, at run time |
| **C. GitHub Action** (`.github/workflows/*`) | GitHub | **Costs extra** — bills the Anthropic API per token | No |

**You were right:** running it through your Max plan (Option A or B) costs nothing
beyond what you already pay. **Option C as shipped uses an API key, which is billed
separately** — so don't rely on it unless you switch it to a subscription token
(see note below). 

**Recommended:** keep using the **Claude scheduled task (A)** — it's free under
Max, runs in the cloud even when your computer is off, and is the most reliable.
Use the **local runner (B)** for on-demand / catch-up runs.

### B. Run it locally on demand (free under Max)

```powershell
# daily briefing
powershell -ExecutionPolicy Bypass -File scripts\run-report.ps1

# weekly briefing
powershell -ExecutionPolicy Bypass -File scripts\run-report.ps1 -Type weekly
```

This calls the Claude CLI signed in with your subscription, researches, edits
`reports/data/reports.js`, then commits & pushes.

#### Schedule the local runner for 08:00 daily (optional)

Use Windows Task Scheduler:

```powershell
$action  = New-ScheduledTaskAction -Execute "powershell.exe" `
  -Argument "-ExecutionPolicy Bypass -File `"$PWD\scripts\run-report.ps1`""
$trigger = New-ScheduledTaskTrigger -Daily -At 8:00am
Register-ScheduledTask -TaskName "AI Edge Daily" -Action $action -Trigger $trigger
```

> Note: the local schedule only fires when your PC is on at 08:00. The cloud
> routine (A) does not have that limitation.

### C. GitHub Actions (only if you want it server-side)

`.github/workflows/daily-report.yml` and `weekly-report.yml` run on a schedule.
As shipped they use `anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}`, which
**bills the API**. To make them free under your Max plan instead, generate a
subscription token with `claude setup-token` and swap the action input to
`claude_code_oauth_token` (tokens expire and must be refreshed periodically).

## Make the site live (private repo, free, auto-updating)

GitHub Pages can't host a **private** repo for free, so we use **Netlify** instead.
It connects to the private repo and **auto-deploys on every push** — so each time
the AI NEWS routine pushes a new report, the live site updates ~1 minute later,
with no PC needed. A `netlify.toml` in the repo root preconfigures everything
(no build step; just publishes the files).

One-time setup (~3 min):
1. Go to **https://app.netlify.com** → sign up / log in with **GitHub**.
2. **Add new site → Import an existing project → GitHub**.
3. Authorize Netlify, then pick **`Jarek-REDPXL/ai-daily-report`** (grant access
   to that private repo when prompted).
4. Netlify reads `netlify.toml` → build command empty, publish dir `.`. Click
   **Deploy**. Your live URL appears (e.g. `https://<name>.netlify.app`) — rename
   it under **Site settings → Change site name** if you like.
5. Done. Every routine push now redeploys automatically. The repo stays private;
   only the rendered site is served.

> Cloudflare Pages works the same way if you prefer it (connect repo, build
> command empty, output dir `/`).

> Alternative (GitHub Pages) — only if you make the repo **public**: repo →
> Settings → Pages → Source → "GitHub Actions", then re-enable the `push` trigger
> in `.github/workflows/deploy-pages.yml`.

## Editing content by hand

Add or edit a report directly in `reports/data/reports.js`. Prepend a new object
(newest first) and keep the existing shape (`id, type, week, title, dateLabel,
sortDate, tldr[], sections[], sources`). All entries in a week share the identical
`week` string so the sidebar groups them; the weekly is pinned above that week's
dailies.
