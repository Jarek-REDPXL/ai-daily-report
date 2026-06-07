// /api/rating.js — per-card / per-report rating (runs on Vercel; STAYS BEHIND the
// site password gate — NOT in the middleware exclusion). UPSERT keyed on the partial
// unique index (client_token, card_id|report_id) so re-rating UPDATES instead of
// duplicating. Defense-in-depth: honeypot + server-side validation + bounds. All
// input is parameterized DATA. Never logs/returns the connection string.
const { neon } = require('@neondatabase/serverless');

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') { res.status(405).json({ ok: false, error: 'method not allowed' }); return; }

    let body = req.body;
    if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = null; } }
    if (!body || typeof body !== 'object') { res.status(400).json({ ok: false, error: 'invalid body' }); return; }

    if (typeof body.hp === 'string' && body.hp.trim() !== '') { res.status(400).json({ ok: false, error: 'rejected' }); return; }

    const targetType = body.target_type;
    if (targetType !== 'card' && targetType !== 'report') { res.status(400).json({ ok: false, error: 'bad target_type' }); return; }
    const targetId = (typeof body.target_id === 'string' ? body.target_id : '').trim();
    if (!targetId || targetId.length > 200) { res.status(400).json({ ok: false, error: 'bad target_id' }); return; }
    const score = Number(body.score);
    if (!Number.isInteger(score) || score < 1 || score > 5) { res.status(400).json({ ok: false, error: 'score must be 1-5' }); return; }
    const comment = (typeof body.comment === 'string' ? body.comment : '').trim();
    if (comment.length > 280) { res.status(400).json({ ok: false, error: 'comment too long' }); return; }
    const clientToken = (typeof body.client_token === 'string' ? body.client_token : '').trim();
    if (!clientToken || clientToken.length > 200) { res.status(400).json({ ok: false, error: 'client_token required' }); return; }
    const rater = (typeof body.rater === 'string' ? body.rater : '').trim();
    if (rater.length > 80) { res.status(400).json({ ok: false, error: 'rater too long' }); return; }

    const url = process.env.DATABASE_URL;
    if (!url) { res.status(500).json({ ok: false, error: 'DATABASE_URL not set' }); return; }
    const sql = neon(url);

    // Map target_type -> card_id XOR report_id; UPSERT on the matching partial unique
    // index (the ON CONFLICT predicate matches the index's WHERE so re-rating updates).
    if (targetType === 'card') {
      await sql.query(
        `INSERT INTO redpxl.ratings (card_id, score, comment, rater, client_token)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (client_token, card_id) WHERE client_token IS NOT NULL AND card_id IS NOT NULL
         DO UPDATE SET score = EXCLUDED.score, comment = EXCLUDED.comment, rater = EXCLUDED.rater`,
        [targetId, score, comment || null, rater || null, clientToken]
      );
    } else {
      await sql.query(
        `INSERT INTO redpxl.ratings (report_id, score, comment, rater, client_token)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (client_token, report_id) WHERE client_token IS NOT NULL AND report_id IS NOT NULL
         DO UPDATE SET score = EXCLUDED.score, comment = EXCLUDED.comment, rater = EXCLUDED.rater`,
        [targetId, score, comment || null, rater || null, clientToken]
      );
    }
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: (e && e.message) ? e.message : String(e) });
  }
};
