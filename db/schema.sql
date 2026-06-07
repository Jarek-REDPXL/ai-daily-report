CREATE SCHEMA IF NOT EXISTS redpxl;
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE redpxl.cards (
  id text PRIMARY KEY,
  domains text[] NOT NULL,
  title text NOT NULL,
  summary text NOT NULL,
  why text NOT NULL,
  how text[] NOT NULL,
  confidence text NOT NULL CHECK (confidence IN ('confirmed','emerging','speculative')),
  status text NOT NULL CHECK (status IN ('active','superseded')),
  sources jsonb NOT NULL,
  tags text[] NOT NULL DEFAULT '{}',
  supersedes text[] NOT NULL DEFAULT '{}',
  related text[] NOT NULL DEFAULT '{}',
  created date NOT NULL,
  updated date NOT NULL,
  corroboration_count int,          -- Phase 2: independent sources behind a claim (NULL = not a claim card)
  action text,                      -- Phase 3: one-line "do this now"
  thread_id text,                   -- Phase 3: storyline this card advances
  content_hash text,
  synced_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX cards_domains_gin ON redpxl.cards USING gin (domains);
CREATE INDEX cards_tags_gin ON redpxl.cards USING gin (tags);
CREATE INDEX cards_status_idx ON redpxl.cards (status);
CREATE INDEX cards_updated_idx ON redpxl.cards (updated DESC);

CREATE TABLE redpxl.reports (
  id text PRIMARY KEY,
  type text NOT NULL CHECK (type IN ('daily','weekly')),
  sort_date date NOT NULL,
  week text,
  title text NOT NULL,
  date_label text,
  domains text[] NOT NULL,
  tldr jsonb NOT NULL,
  sections jsonb NOT NULL,
  sources text,
  pdf text,
  content_hash text,
  synced_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX reports_sortdate_idx ON redpxl.reports (sort_date DESC);
CREATE INDEX reports_type_idx ON redpxl.reports (type);
CREATE INDEX reports_domains_gin ON redpxl.reports USING gin (domains);

CREATE TABLE redpxl.feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submitter text,
  craft text,
  kind text NOT NULL DEFAULT 'share' CHECK (kind IN ('share','ask','learn_next')),
  body text NOT NULL,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new','reviewed','actioned','archived')),
  actioned_at timestamptz,
  created timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX feedback_created_idx ON redpxl.feedback (created DESC);
CREATE INDEX feedback_status_idx ON redpxl.feedback (status);
CREATE INDEX feedback_craft_idx ON redpxl.feedback (craft);

CREATE TABLE redpxl.ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id text REFERENCES redpxl.cards(id) ON DELETE CASCADE,
  report_id text REFERENCES redpxl.reports(id) ON DELETE CASCADE,
  score smallint NOT NULL CHECK (score BETWEEN 1 AND 5),
  comment text,
  rater text,
  client_token text,
  created timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT ratings_one_target CHECK (
    (card_id IS NOT NULL)::int + (report_id IS NOT NULL)::int = 1
  )
);
CREATE INDEX ratings_card_idx ON redpxl.ratings (card_id) WHERE card_id IS NOT NULL;
CREATE INDEX ratings_report_idx ON redpxl.ratings (report_id) WHERE report_id IS NOT NULL;
CREATE INDEX ratings_created_idx ON redpxl.ratings (created DESC);
CREATE UNIQUE INDEX ratings_token_card_uniq ON redpxl.ratings (client_token, card_id) WHERE client_token IS NOT NULL AND card_id IS NOT NULL;
CREATE UNIQUE INDEX ratings_token_report_uniq ON redpxl.ratings (client_token, report_id) WHERE client_token IS NOT NULL AND report_id IS NOT NULL;

CREATE VIEW redpxl.rating_summary AS
  SELECT 'card' AS target_type, card_id AS target_id, count(*) AS n, round(avg(score),2) AS avg_score
    FROM redpxl.ratings WHERE card_id IS NOT NULL GROUP BY card_id
  UNION ALL
  SELECT 'report' AS target_type, report_id AS target_id, count(*) AS n, round(avg(score),2) AS avg_score
    FROM redpxl.ratings WHERE report_id IS NOT NULL GROUP BY report_id;

-- ── Phase 1: ingestion staging (see db/migrations/001_signals.sql) ───────────
-- Collectors write the harvest here every run; the daily routine reasons over it.
CREATE TABLE IF NOT EXISTS redpxl.signals (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source        text NOT NULL,
  url           text NOT NULL,
  title         text NOT NULL,
  published_at  timestamptz,
  domain_guess  text,
  excerpt       text,
  engagement    integer NOT NULL DEFAULT 0,
  raw           jsonb,
  content_hash  text NOT NULL,
  fetched_at    timestamptz NOT NULL DEFAULT now(),
  run_date      date NOT NULL DEFAULT (now() AT TIME ZONE 'utc')::date,
  cluster_id    uuid,
  score         numeric
);
CREATE UNIQUE INDEX IF NOT EXISTS signals_content_hash_uniq ON redpxl.signals (content_hash);
CREATE INDEX IF NOT EXISTS signals_run_date_idx  ON redpxl.signals (run_date DESC);
CREATE INDEX IF NOT EXISTS signals_domain_idx    ON redpxl.signals (domain_guess);
CREATE INDEX IF NOT EXISTS signals_published_idx ON redpxl.signals (published_at DESC);
CREATE INDEX IF NOT EXISTS signals_cluster_idx   ON redpxl.signals (cluster_id);
