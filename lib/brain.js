// lib/brain.js — Node read helpers for the Brain's memory tables (Neon).
// The couple of reads the API needs; the full read/write interface lives Python-side
// in scripts/collectors/brain.py (used by the collectors/CI desks). Shared module on
// purpose (NOT under /api), so Vercel never exposes it as an endpoint — API functions
// import it: const { getLatestMetrics, getOpenGaps } = require('../lib/brain');
// Same neon(process.env.DATABASE_URL) pattern as api/ask.js / api/sync.js. FAIL-SOFT:
// no DATABASE_URL / DB error -> reads return null / []. Never logs the connection string.
const { neon } = require('@neondatabase/serverless');

function _sql() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  return neon(url);
}

// The most recent daily baseline row, or null.
async function getLatestMetrics() {
  const sql = _sql();
  if (!sql) return null;
  try {
    const rows = await sql.query(
      'SELECT captured, signals_total, cards_total, reports_total, feedback_total, ratings_total, extra ' +
      'FROM redpxl.metrics ORDER BY captured DESC LIMIT 1');
    return rows[0] || null;
  } catch (e) {
    return null;
  }
}

// Open gaps (what's missing), highest-weight first.
async function getOpenGaps(limit = 50) {
  const sql = _sql();
  if (!sql) return [];
  try {
    return await sql.query(
      "SELECT id, source, topic, detail, weight, status, created " +
      "FROM redpxl.gaps WHERE status = 'open' " +
      "ORDER BY weight DESC NULLS LAST, created DESC LIMIT $1", [limit]);
  } catch (e) {
    return [];
  }
}

module.exports = { getLatestMetrics, getOpenGaps };
