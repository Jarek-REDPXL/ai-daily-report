# RedPxl News — 95+ Masterplan: Activation Guide

The five-phase upgrade (ingestion funnel → corroboration → smart cards → ask-anything
→ compounding loops) is **fully merged to `main` and green through the gate**. Every
new capability is **fail-soft**: it's live in code but stays dormant until you add the
secret/migration it needs — nothing here can break the existing daily/weekly publish.

This doc is the checklist to turn each piece ON. Do them in order; each is independent.

---

## 0. One-time: provision secrets

| Secret | Where | Powers | Required for |
|---|---|---|---|
| `DATABASE_URL` | **GitHub** repo secrets (already in Vercel) | persist signals, clustering, KB embeddings, curation | Phases 1–5 server side |
| `OPENAI_API_KEY` | **GitHub** + **Vercel** env | embeddings (cluster, KB, Ask question) | Phases 2, 4 |
| `ANTHROPIC_API_KEY` | **Vercel** env (already a repo secret) | the grounded answer in `/api/ask` | Phase 4 |
| `FINNHUB_API_KEY` | **GitHub** repo secrets | markets/news collector | Phase 1 (news markets) |
| `GITHUB_TOKEN` | auto-provided in Actions | GitHub collector rate limit | Phase 1 (optional) |

> Billing note: embeddings are `text-embedding-3-small` (~pennies/month). `/api/ask`
> answers bill `ANTHROPIC_API_KEY` (the paid API) at low, team-gated volume — this is
> separate from and does not affect the Max-billed GitHub Actions routine. The
> AUTH GUARDRAIL (never put `ANTHROPIC_API_KEY` in the Actions job env) is unchanged.

## 1. One-time: run the DB migrations (Neon)

Apply in order (each is idempotent — safe to re-run):
```bash
psql "$DATABASE_URL" -f db/migrations/001_signals.sql            # Phase 1: signals staging
psql "$DATABASE_URL" -f db/migrations/002_vectors_corroboration.sql  # Phase 2: pgvector + corroboration
psql "$DATABASE_URL" -f db/migrations/003_smart_cards.sql        # Phase 3: action + thread_id
psql "$DATABASE_URL" -f db/migrations/004_ask_retrieval.sql      # Phase 4: kb_embeddings + ask_log
psql "$DATABASE_URL" -f db/migrations/005_outcomes.sql           # Phase 5: outcomes
```
`db/schema.sql` holds the full current schema for reference. Phase 2/4 need the
`vector` extension (pgvector) — available on Neon, enabled by 002.

---

## What each phase does once activated

### Phase 1 — Ingestion funnel + News domain  *(active now; richer with secrets)*
- The daily workflow now runs `scripts/collectors/ingest.py` before Claude: harvests
  ~1,200+ items from 61 verified feeds + HN + arXiv + GitHub + Product Hunt + EDGAR
  (+ Finnhub with the key) into a ranked `harvest-digest.md` the routine reads first.
  With `DATABASE_URL` it also persists to `redpxl.signals`.
- New **News** hub/domain is live on the site (markets + the AI landscape).
- Grow the registry: edit `scripts/collectors/feeds.json`, then
  `python scripts/collectors/ingest.py --validate` drops dead feeds.

### Phase 2 — Cluster + corroborate + trust gate  *(gate active; clustering needs keys)*
- `cluster.py` (needs `OPENAI_API_KEY` + `DATABASE_URL`) embeds the harvest, groups
  near-duplicate stories, and emits `clusters-digest.md` with **Confirmed/Reported/
  Single-source** labels. Without keys the routine falls back to the harvest digest.
- **Trust gate is ON now** (`CHECK_LINKS=1` in both workflows): every published link
  must resolve — a definitive 404/410 fails the run. `corroboration_count` on cards
  is gate-capped at the distinct source-domain count.

### Phase 3 — Smart cards  *(active now)*
- Cards now require a one-line `action` ("do this now"), support `thread_id`
  storylines and `corroboration_count`. The card view renders the corroboration
  badge, the action callout, and "Same thread" links. No secrets needed.

### Phase 4 — Ask-anything (RAG)  *(needs keys + migrations)*
- `embed_kb.py` (daily step) embeds published cards/reports into `kb_embeddings`.
- `/api/ask` (the **Ask** nav tab) answers grounded only in the base, with
  citations; misses go to the `learn_next` queue. Needs `OPENAI_API_KEY` +
  `ANTHROPIC_API_KEY` + `DATABASE_URL` in **Vercel**.
- Optional MCP server in `mcp/` (see `mcp/README.md`) exposes get_latest/search/ask
  to Claude Desktop.

### Phase 5 — Compounding loops  *(active; richer with secrets)*
- YouTube transcripts collector (7 verified channels in `channels.json`).
- `curate_sources.py` turns team ratings + corroboration into a `sources-suggestions.md`
  advisory the routine applies to `sources.md`.
- **Outcome loop**: one-tap "We shipped this / It worked / Didn't work" on every
  card (`/api/outcome`); aggregates flow back through `/api/intake` so the routine
  reinforces proven winners.

---

## Verify it's working
- **Ingestion**: daily run log shows `harvest: N unique signals`. With `DATABASE_URL`,
  `SELECT count(*) FROM redpxl.signals;` grows.
- **Clustering**: log shows `cluster: wrote N clusters`; `clusters-digest.md` exists.
- **Trust gate**: gate step prints `link-check: N urls, 0 dead`.
- **Ask**: visit `#/ask`, ask about a known card → grounded answer + citation. Ask
  about something absent → "not covered yet" and a new `learn_next` row appears.
- **Outcomes**: tap an outcome on a card → row in `redpxl.outcomes`; appears in
  `/api/intake` aggregates next run.

Everything degrades cleanly: pull any one secret and that capability simply skips —
the daily/weekly briefing still publishes.
