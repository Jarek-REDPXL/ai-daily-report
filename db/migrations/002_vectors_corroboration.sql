-- RedPxl News — Phase 2 migration: vectors (cluster + corroborate) + corroboration.
-- Idempotent. Apply once against Neon (after 001):
--   psql "$DATABASE_URL" -f db/migrations/002_vectors_corroboration.sql
-- Requires the pgvector extension (available on Neon).

CREATE EXTENSION IF NOT EXISTS vector;

-- Embedding for each harvested signal (text-embedding-3-small = 1536 dims). The
-- clustering step (scripts/cluster.py) fills these, groups near-dupes by cosine
-- similarity, and writes cluster_id + score (columns already on the table from 001).
ALTER TABLE redpxl.signals ADD COLUMN IF NOT EXISTS embedding vector(1536);

-- HNSW index for fast cosine nearest-neighbour (clustering + Phase 4 retrieval).
CREATE INDEX IF NOT EXISTS signals_embedding_hnsw
  ON redpxl.signals USING hnsw (embedding vector_cosine_ops);

-- Corroboration on cards: how many INDEPENDENT sources back this card's claim.
-- Separate from `confidence` (which is play MATURITY: confirmed/emerging/speculative).
-- The gate enforces corroboration_count <= distinct source hostnames — the label
-- can't lie. NULL = not a claim card (tool/technique cards stay single-source-OK).
ALTER TABLE redpxl.cards ADD COLUMN IF NOT EXISTS corroboration_count int;
