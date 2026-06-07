// /api/intake.js — routine read/consume endpoint (automation, no cookie).
// EXCLUDED from the middleware gate, so it SELF-ENFORCES auth: Authorization:
// Bearer <CRON_SECRET> (same secret as the sync cron). The daily routine reads NEW
// feedback + rating aggregates here, acts on them, then POSTs to mark them reviewed.
//   GET  -> { ok, feedback:[new], ratings:[aggregates] }
//   POST { ids:[uuid,...] } -> sets those feedback rows to status='reviewed'
// Never logs/returns the connection string; CRON_SECRET never leaves the server.
const { neon } = require('@neondatabase/serverless');

module.exports = async (req, res) => {
  try {
    const secret = process.env.CRON_SECRET;
    const auth = req.headers.authorization || req.headers.Authorization || '';
    if (!secret || auth !== `Bearer ${secret}`) {
      res.status(401).json({ ok: false, error: 'unauthorized' });
      return;
    }

    const url = process.env.DATABASE_URL;
    if (!url) { res.status(500).json({ ok: false, error: 'DATABASE_URL not set' }); return; }
    const sql = neon(url);

    if (req.method === 'GET') {
      const feedback = await sql.query(
        `SELECT id, created, kind, craft, submitter, body
           FROM redpxl.feedback
          WHERE status = 'new'
          ORDER BY created DESC
          LIMIT 200`
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
      return;
    }

    if (req.method === 'POST') {
      let body = req.body;
      if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = null; } }
      const ids = body && Array.isArray(body.ids) ? body.ids.filter(x => typeof x === 'string' && x) : null;
      if (!ids || !ids.length) { res.status(400).json({ ok: false, error: 'ids[] required' }); return; }
      const del = await sql.query(
        `UPDATE redpxl.feedback SET status = 'reviewed', actioned_at = now()
          WHERE id = ANY($1::uuid[]) AND status = 'new'
          RETURNING id`, [ids]);
      res.status(200).json({ ok: true, reviewed: del.length });
      return;
    }

    res.status(405).json({ ok: false, error: 'method not allowed' });
  } catch (e) {
    res.status(500).json({ ok: false, error: (e && e.message) ? e.message : String(e) });
  }
};
