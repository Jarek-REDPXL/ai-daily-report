-- RedPxl News — Phase 4 migration: ask-anything retrieval (RAG).
-- Idempotent. Apply once against Neon (after 003):
--   psql "$DATABASE_URL" -f db/migrations/004_ask_retrieval.sql
-- Requires pgvector (enabled in 002).

-- One embedded row per published card/report — the corpus /api/ask retrieves over.
-- Populated by scripts/collectors/embed_kb.py (idempotent on content_hash).
CREATE TABLE IF NOT EXISTS redpxl.kb_embeddings (
  kind          text NOT NULL CHECK (kind IN ('card','report')),
  ref_id        text NOT NULL,
  content       text NOT NULL,
  content_hash  text NOT NULL,
  embedding     vector(1536),
  updated_at    timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (kind, ref_id)
);
CREATE INDEX IF NOT EXISTS kb_embeddings_hnsw
  ON redpxl.kb_embeddings USING hnsw (embedding vector_cosine_ops);

-- Every question asked (analytics + the demand signal). Unanswered questions are
-- ALSO pushed to redpxl.feedback as kind='learn_next' so the daily routine picks
-- them up as next-run research priorities (closing the loop).
CREATE TABLE IF NOT EXISTS redpxl.ask_log (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question   text NOT NULL,
  matched    boolean NOT NULL DEFAULT false,
  top_score  numeric,
  created    timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS ask_log_created_idx ON redpxl.ask_log (created DESC);
