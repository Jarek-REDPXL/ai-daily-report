-- RedPxl News — Phase 0 migration: the Brain's memory (ADDITIVE ONLY).
-- Idempotent (safe to re-run). Apply once against Neon — paste into the SQL console,
-- or:  psql "$DATABASE_URL" -f db/migrations/006_brain.sql
--
-- Creates six new tables in the redpxl schema so the system can remember its own
-- work (run_log), its baseline over time (metrics), recurring harvest clusters
-- (themes), what's missing (gaps), tool history (tool_state), and candidate new
-- artifacts (ideas). DROPS/ALTERS NOTHING — every existing table is untouched.
-- The full current schema also lives in db/schema.sql (kept in sync).

CREATE SCHEMA IF NOT EXISTS redpxl;
CREATE EXTENSION IF NOT EXISTS pgcrypto;   -- gen_random_uuid()

-- One row per pipeline/desk run — the system's record of its own work.
CREATE TABLE IF NOT EXISTS redpxl.run_log (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  desk          text NOT NULL,                                   -- 'daily' | 'expand' | 'tools' | ...
  started       timestamptz NOT NULL DEFAULT now(),
  finished      timestamptz,
  status        text NOT NULL DEFAULT 'running' CHECK (status IN ('running','ok','failed','skipped')),
  summary       text,
  artifacts     jsonb,                                           -- counts / ids / paths the run produced
  audit_verdict text                                             -- optional adversarial-audit result
);
CREATE INDEX IF NOT EXISTS run_log_desk_idx    ON redpxl.run_log (desk, started DESC);
CREATE INDEX IF NOT EXISTS run_log_started_idx ON redpxl.run_log (started DESC);

-- Daily baseline snapshot — the zero-point a regression/learning loop reads from.
CREATE TABLE IF NOT EXISTS redpxl.metrics (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  captured       date NOT NULL DEFAULT (now() AT TIME ZONE 'utc')::date,
  signals_total  integer,
  cards_total    integer,
  reports_total  integer,
  feedback_total integer,
  ratings_total  integer,
  extra          jsonb
);
CREATE UNIQUE INDEX IF NOT EXISTS metrics_captured_uniq ON redpxl.metrics (captured);  -- one baseline per day (upsert)
CREATE INDEX IF NOT EXISTS metrics_captured_idx ON redpxl.metrics (captured DESC);

-- Recurring harvest clusters — durable themes the system keeps seeing.
CREATE TABLE IF NOT EXISTS redpxl.themes (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         text NOT NULL,
  label        text,
  domains      text[] NOT NULL DEFAULT '{}',
  signal_count integer NOT NULL DEFAULT 0,
  last_seen    timestamptz,
  notes        text
);
CREATE UNIQUE INDEX IF NOT EXISTS themes_slug_uniq ON redpxl.themes (slug);  -- upsert by slug
CREATE INDEX IF NOT EXISTS themes_signal_count_idx ON redpxl.themes (signal_count DESC);

-- What's missing / to prioritize — demand signal the routine can act on.
CREATE TABLE IF NOT EXISTS redpxl.gaps (
  id      uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source  text NOT NULL CHECK (source IN ('ask_no_match','low_rating','manual')),
  topic   text NOT NULL,
  detail  text,
  weight  numeric,
  status  text NOT NULL DEFAULT 'open' CHECK (status IN ('open','planned','done','dismissed')),
  created timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS gaps_status_idx  ON redpxl.gaps (status);
CREATE INDEX IF NOT EXISTS gaps_weight_idx  ON redpxl.gaps (weight DESC);
CREATE INDEX IF NOT EXISTS gaps_created_idx ON redpxl.gaps (created DESC);

-- Tool history for the Tools Desk — one snapshot per tool per day.
CREATE TABLE IF NOT EXISTS redpxl.tool_state (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id    text NOT NULL,
  captured   date NOT NULL DEFAULT (now() AT TIME ZONE 'utc')::date,
  version    text,
  price      text,
  status     text,
  source_url text
);
CREATE UNIQUE INDEX IF NOT EXISTS tool_state_tool_day_uniq ON redpxl.tool_state (tool_id, captured);  -- one snapshot/tool/day (upsert)
CREATE INDEX IF NOT EXISTS tool_state_tool_idx ON redpxl.tool_state (tool_id, captured DESC);

-- Candidate new artifacts the system proposes (a guide, a page, a tool category).
CREATE TABLE IF NOT EXISTS redpxl.ideas (
  id        uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind      text NOT NULL CHECK (kind IN ('guide','page','tool_category')),
  title     text NOT NULL,
  rationale text,
  evidence  jsonb,
  status    text NOT NULL DEFAULT 'proposed' CHECK (status IN ('proposed','accepted','rejected','shipped')),
  created   timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS ideas_status_idx ON redpxl.ideas (status);
CREATE INDEX IF NOT EXISTS ideas_kind_idx   ON redpxl.ideas (kind);
