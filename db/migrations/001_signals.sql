-- RedPxl News — Phase 1 migration: the ingestion staging table.
-- Idempotent (safe to re-run). Apply once against Neon:
--   psql "$DATABASE_URL" -f db/migrations/001_signals.sql
-- The full current schema also lives in db/schema.sql (kept in sync).
--
-- redpxl.signals is the harvest buffer: collectors (RSS, HN, arXiv, GitHub,
-- Product Hunt, markets/EDGAR, …) write normalized records here every run; the
-- daily routine reasons over the harvested signal, then web-searches to go deeper.
-- Phase 2 adds the `embedding` (pgvector) + `cluster_id` enrichment on top.

CREATE SCHEMA IF NOT EXISTS redpxl;

CREATE TABLE IF NOT EXISTS redpxl.signals (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source        text NOT NULL,                 -- collector/source key (e.g. 'hn', 'arxiv', feed slug)
  url           text NOT NULL,                 -- canonical item link
  title         text NOT NULL,
  published_at  timestamptz,                   -- item publish time (null if unknown)
  domain_guess  text,                          -- best-guess RedPxl domain slug (may be null)
  excerpt       text,                          -- short summary/snippet (bounded)
  engagement    integer NOT NULL DEFAULT 0,    -- HN points / GitHub stars / etc. (ranking signal)
  raw           jsonb,                          -- collector-specific extras (tags, authors, ticker, …)
  content_hash  text NOT NULL,                 -- dedupe key: normalized(url + title)
  fetched_at    timestamptz NOT NULL DEFAULT now(),
  run_date      date NOT NULL DEFAULT (now() AT TIME ZONE 'utc')::date,
  cluster_id    uuid,                          -- set by the Phase 2 clustering step
  score         numeric                        -- set by the Phase 2 ranking step
);

-- Dedupe across runs: one row per distinct piece of content. Collectors UPSERT on
-- this so a story re-seen on a later run refreshes engagement instead of duplicating.
CREATE UNIQUE INDEX IF NOT EXISTS signals_content_hash_uniq ON redpxl.signals (content_hash);
CREATE INDEX IF NOT EXISTS signals_run_date_idx   ON redpxl.signals (run_date DESC);
CREATE INDEX IF NOT EXISTS signals_domain_idx     ON redpxl.signals (domain_guess);
CREATE INDEX IF NOT EXISTS signals_published_idx  ON redpxl.signals (published_at DESC);
CREATE INDEX IF NOT EXISTS signals_cluster_idx    ON redpxl.signals (cluster_id);
