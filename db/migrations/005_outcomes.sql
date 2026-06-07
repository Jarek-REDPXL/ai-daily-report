-- RedPxl News — Phase 5 migration: outcome tracking (the deepest loop).
-- Idempotent. Apply once against Neon (after 004):
--   psql "$DATABASE_URL" -f db/migrations/005_outcomes.sql
-- One-tap "we shipped this / it worked / didn't work" on cards, so the system
-- eventually learns from RESULTS, not just clicks.

CREATE TABLE IF NOT EXISTS redpxl.outcomes (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id      text NOT NULL REFERENCES redpxl.cards(id) ON DELETE CASCADE,
  outcome      text NOT NULL CHECK (outcome IN ('shipped','worked','didnt')),
  note         text,
  rater        text,
  client_token text,
  created      timestamptz NOT NULL DEFAULT now()
);
-- one outcome per person per card (re-tapping updates)
CREATE UNIQUE INDEX IF NOT EXISTS outcomes_token_card_uniq
  ON redpxl.outcomes (client_token, card_id) WHERE client_token IS NOT NULL;
CREATE INDEX IF NOT EXISTS outcomes_card_idx ON redpxl.outcomes (card_id);

CREATE OR REPLACE VIEW redpxl.outcome_summary AS
  SELECT card_id, outcome, count(*) AS n
    FROM redpxl.outcomes GROUP BY card_id, outcome;
