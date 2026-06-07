// /api/db-health.js — Vercel serverless function (runs ON VERCEL, never in this repo's
// container). Smallest possible proof that a deployed function can read DATABASE_URL
// and query the Neon `redpxl` schema. Returns ONLY counts — it never returns or logs
// the connection string.
const { neon } = require('@neondatabase/serverless');

module.exports = async (req, res) => {
  try {
    const url = process.env.DATABASE_URL;
    if (!url) {
      res.status(500).json({ ok: false, error: 'DATABASE_URL not set' });
      return;
    }
    const sql = neon(url);
    const rows = await sql`
      SELECT (SELECT count(*)::int FROM redpxl.cards)   AS cards,
             (SELECT count(*)::int FROM redpxl.reports) AS reports
    `;
    const { cards, reports } = rows[0];
    res.status(200).json({ ok: true, cards, reports });
  } catch (e) {
    // Surface only the error message — never the connection string / full config.
    res.status(500).json({ ok: false, error: (e && e.message) ? e.message : String(e) });
  }
};
