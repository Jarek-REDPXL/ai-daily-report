# RedPxl News — Knowledge-Base Roadmap

RedPxl News is a **team knowledge base** (years of compounding AI/tech/markets
intelligence), not just a news feed. This doc tracks the architecture phases so it
scales and stays low-cost as it grows.

## Where we are

**Phase 1 — DONE (2026-06-06).** Data is split for scale:
- `reports/data/reports.js` — canonical write target (the routine keeps prepending here, unchanged).
- `reports/data/index.json` — lightweight metadata + search blob (loaded once).
- `reports/data/entries/<id>.json` — one full report per file (lazy-loaded on open).
- `scripts/build-data.js` derives index + entries from reports.js; the quality gate
  (`scripts/check_reports.py`) runs it automatically, so the routine needs no new step.
- The site (`assets/app.js`) loads index.json, then fetches only the entry you open
  (cached), with automatic fallback to reports.js if a fetch fails.

Result: the browser no longer downloads every report on every visit → scales to
years of data. **Git remains the free, versioned database** (full history forever).

## Phase 2 — Database (add only when we need DB-only powers)

Trigger: when we want full-text search across years, structured filtering
(by ticker / company / topic / date range), or an API for other tools. Not before —
a DB we don't query is just cost + maintenance.

Recommended: **Vercel Postgres** or **Supabase** (both have usable free tiers).
- Schema: `reports(id, type, sort_date, week, title, date_label, pdf, body jsonb)`
  plus `sources(report_id, url, publisher, title)` for clickable, queryable sources,
  and `predictions(report_id, claim, status, due, resolved_date)`.
- Keep reports.js as the write target; a small sync step upserts into Postgres on
  each run (or a nightly job reads the entries/ files). The site can stay static
  and read a generated JSON, or call a read-only API.
- Estimated cost: **$0** on free tier at our volume for a long time.

## Phase 3 — Semantic search (the "ask it anything" brain)

This is what turns the archive into a compounding intelligence tool: ask it
natural-language questions across years —
"everything we've logged on agentic payments", "all our NVDA predictions and how
they resolved", "what skills launched in Q2 and how to use them".

Design:
- **Embeddings:** on each run, embed every new report (and its blocks) → store
  vectors. Models: OpenAI `text-embedding-3-small` (~$0.02 / 1M tokens) or a free
  local/open model. At ~1–2 reports/day this is **pennies/month**.
- **Vector store:** Supabase `pgvector` (free tier) or a hosted vector DB
  (Pinecone has a free tier). pgvector keeps it all in one Postgres = simplest.
- **Query path:** a small serverless function (Vercel function) embeds the question,
  does a similarity search, and returns the top report snippets — optionally fed to
  Claude to synthesize an answer with citations (every answer links exact sources).
- **UI:** an "Ask" box on the site (behind the team password) that hits that
  function. Could also expose it as an MCP server so Claude Code can query the
  knowledge base directly.

Estimated ongoing cost: **a few dollars/month** at our volume (embeddings + a
serverless function). Build when there's enough history to make recall valuable
(≈ once we have a few months of dense, well-sourced reports).

## Guiding principles
- **reports.js stays the source of truth** — every layer derives from it, so we can
  always rebuild and never lose data.
- **Add infrastructure only when a real need appears** — each phase has a clear trigger.
- **Every fact stays sourced** — exact clickable links now; queryable sources table
  in Phase 2; cited answers in Phase 3.
