# RedPxl News — Architecture (the machine)

The map every later phase builds against. RedPxl News is a self-running knowledge base:
it harvests the world, distils run-it-today **cards**, publishes a daily/weekly **feed**,
ranks the best **tools**, learns from team **feedback**, and steers itself. This doc
describes the **Brain** (its memory), the **Desk** model (how work gets done), the desks
that exist or are planned, and the **loop** that ties them together.

> Status: the Brain tables + read/write interface land in **Phase 0** (additive only —
> `db/migrations/006_brain.sql`). Desks are wired in later phases; this is the contract.

---

## 1. The Brain (Neon `redpxl` schema)

Two layers of memory:

**Content (already live)** — the published product + team signal:
- `cards`, `reports` — the knowledge library + the daily/weekly feed (git is the source of
  truth; `api/sync.js` mirrors them into Neon).
- `signals` — the raw harvest buffer (collectors write here; `cluster.py` enriches it).
- `kb_embeddings`, `ask_log` — RAG corpus + question log behind `/api/ask`.
- `feedback`, `ratings`, `outcomes` (+ `rating_summary`, `outcome_summary` views) — team
  write-back: shares/asks/learn-next, per-card/report ratings, shipped/worked/didn't.

**Memory (Phase 0 — new, additive)** — the system's record of itself + what matters:

| Table | One row = | Purpose |
|---|---|---|
| `run_log` | one pipeline/desk run | what ran, when, status, summary, artifacts, audit verdict — the system's own work log |
| `metrics` | one day | daily baseline (signals/cards/reports/feedback/ratings totals + `extra`) — the zero-point a regression/learning loop reads |
| `themes` | one recurring cluster | durable harvest themes (slug, label, domains, signal_count, last_seen) the system keeps seeing |
| `gaps` | one missing thing | demand signal (`ask_no_match` / `low_rating` / `manual`, topic, weight, status) to prioritize |
| `tool_state` | one tool, one day | version/price/status history for the Tools Desk |
| `ideas` | one proposal | candidate new artifacts (`guide` / `page` / `tool_category`) with evidence + status |

All Phase-0 tables are `CREATE TABLE IF NOT EXISTS` and drop/alter nothing.

### The Brain interface
One small library per side, each function does one job; both use `DATABASE_URL` and are
fail-soft (no DB → reads return empty, writes return None/False; never crashes a run):

- **Python** — `scripts/collectors/brain.py` (collectors + CI desks):
  - reads: `getOpenGaps(limit)`, `getTopThemes(n)`, `getLatestMetrics()`, `getToolState(tool_id)`
  - writes: `logRun(...)`, `captureMetrics(...)`, `upsertTheme(...)`, `addGap(...)`,
    `recordToolState(...)`, `proposeIdea(...)`
- **Node** — `lib/brain.js` (the API reads it needs): `getLatestMetrics()`, `getOpenGaps(limit)`.

---

## 2. The Desk model

A **desk** is one unit of autonomous work, run in CI (where `DATABASE_URL` + the Max-plan
token live) and never trusted blindly. Every desk follows the same five beats:

1. **Scope** — read the Brain (open gaps, top themes, latest metrics) to decide what to do.
2. **Research** — pull material (the signal store / digests / the live web).
3. **Verify** — corroborate before writing (independent sources; adversarial check).
4. **Write** — produce the artifact to THE STANDARD (`docs/NORTH-STAR.md`), gate-validated.
5. **Audit** — record the run (`logRun`), update memory (themes/gaps/metrics), and (later)
   an adversarial self-audit verdict.

The quality gate (`scripts/check_reports.py`) is the immune system: nothing publishes
unless it passes, and link-checking (`CHECK_LINKS=1`) kills dead/fabricated sources.

---

## 3. Desks (existing + planned)

**Existing pipelines (today, GitHub Actions):**
- **Daily** (`daily-report.yml`) — harvest → cluster → Claude writes the daily + updates
  cards/digests → gate → embed → commit.
- **Weekly** (`weekly-report.yml`) — Monday synthesis + PDF.
- **Card Expansion** (`expand-cards.yml`, manual) — `signals_digest.py` mines the full
  signal store → Claude mines NEW cards per `docs/prompts/expand.md` → gate → commit.

**Planned desks (later phases, this is the contract they build against):**
- **Tools Desk** — re-rank the Tools directory from evidence; snapshot `tool_state`.
- **Metrics/Heartbeat Desk** — `captureMetrics` daily; alert on a missed run or regression.
- **Gap Desk** — turn `ask_no_match` misses + low ratings into `gaps`, feed next runs.
- **Ideas Desk** — propose new guides/pages/tool categories (`ideas`) from recurring themes.

---

## 4. The loop

```
        ┌─────────── steer (gaps, themes, metrics → next run's scope) ───────────┐
        ▼                                                                          │
   HARVEST ──► GENERATE ──► (gate) ──► PUBLISH ──► FEEDBACK ──► LEARN ─────────────┘
   collectors   desks write    quality   feed +     ratings /     Brain: themes,
   → signals    cards/feed/     gate      tools +    outcomes /    gaps, metrics,
                tools           passes    Ask        ask misses    run_log, ideas
```

Harvest fills `signals`; desks generate cards/feed/tools; the gate guards quality;
publishing exposes them (feed, Tools, Ask); the team's feedback + Ask misses become
`gaps`; the Brain records what ran and what matters; and that memory **steers** the next
run's scope. Each turn of the loop should leave the base measurably better.

---

## 5. Non-negotiables (carried across the machine)
- One writer to `main`; the quality gate passes before every publish.
- Real, clickable sources only — never fabricate a link.
- Additive + gate-validated; never break the live site; brand discipline honored.
- Stop-and-report rather than guess.
