-- RedPxl News — Phase 3 migration: smart-card fields.
-- Idempotent. Apply once against Neon (after 002):
--   psql "$DATABASE_URL" -f db/migrations/003_smart_cards.sql

-- One-line "do this now" (gate-required on cards going forward) + the storyline
-- this card advances (groups cards that tell one evolving story).
ALTER TABLE redpxl.cards ADD COLUMN IF NOT EXISTS action text;
ALTER TABLE redpxl.cards ADD COLUMN IF NOT EXISTS thread_id text;
CREATE INDEX IF NOT EXISTS cards_thread_idx ON redpxl.cards (thread_id) WHERE thread_id IS NOT NULL;
