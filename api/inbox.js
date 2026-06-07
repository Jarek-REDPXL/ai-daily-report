// /api/inbox.js — browser read for the team Inbox view (#/inbox).
// GATED: this route is NOT in the middleware exclusion, so the site-password cookie
// (checked by middleware before this runs) is the auth — only logged-in team members
// reach it. No server secret is exposed to client JS. Returns recent feedback
// (new-first) + rating aggregates with titles. Never logs/returns the connection string.
const { neon } = require('@neondatabase/serverless');

module.exports = async (req, res) => {
  try {
    if (req.method !== 'GET') { res.status(405).json({ ok: false, error: 'method not allowed' }); return; }
    const url = process.env.DATABASE_URL;
    if (!url) { res.status(500).json({ ok: false, error: 'DATABASE_URL not set' }); return; }
    const sql = neon(url);

    const feedback = await sql.query(
      `SELECT id, created, kind, craft, submitter, body, status
         FROM redpxl.feedback
        ORDER BY (status = 'new') DESC, created DESC
        LIMIT 100`
    );
    const ratings = await sql.query(
      `SELECT rs.target_type, rs.target_id, rs.n, rs.avg_score,
              COALESCE(c.title, r.title) AS title
         FROM redpxl.rating_summary rs
         LEFT JOIN redpxl.cards   c ON rs.target_type = 'card'   AND c.id = rs.target_id
         LEFT JOIN redpxl.reports r ON rs.target_type = 'report' AND r.id = rs.target_id
        ORDER BY rs.avg_score DESC, rs.n DESC`
    );
    res.status(200).json({ ok: true, feedback, ratings });
  } catch (e) {
    res.status(500).json({ ok: false, error: (e && e.message) ? e.message : String(e) });
  }
};
