// /api/outcome.js — per-card outcome tracking (Phase 5; the deepest loop). Runs
// on Vercel; STAYS BEHIND the site password gate (NOT in the middleware
// exclusion). One-tap "we shipped this / it worked / didn't work" so the system
// learns from RESULTS, not just clicks. UPSERT keyed on (client_token, card_id)
// so re-tapping updates. Parameterized DATA; never logs/returns the conn string.
const { neon } = require('@neondatabase/serverless');

const OUTCOMES = new Set(['shipped', 'worked', 'didnt']);

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') { res.status(405).json({ ok: false, error: 'method not allowed' }); return; }

    let body = req.body;
    if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = null; } }
    if (!body || typeof body !== 'object') { res.status(400).json({ ok: false, error: 'invalid body' }); return; }

    if (typeof body.hp === 'string' && body.hp.trim() !== '') { res.status(400).json({ ok: false, error: 'rejected' }); return; }

    const cardId = (typeof body.card_id === 'string' ? body.card_id : '').trim();
    if (!cardId || cardId.length > 200) { res.status(400).json({ ok: false, error: 'bad card_id' }); return; }
    const outcome = body.outcome;
    if (!OUTCOMES.has(outcome)) { res.status(400).json({ ok: false, error: 'outcome must be shipped|worked|didnt' }); return; }
    const note = (typeof body.note === 'string' ? body.note : '').trim();
    if (note.length > 280) { res.status(400).json({ ok: false, error: 'note too long' }); return; }
    const clientToken = (typeof body.client_token === 'string' ? body.client_token : '').trim();
    if (!clientToken || clientToken.length > 200) { res.status(400).json({ ok: false, error: 'client_token required' }); return; }
    const rater = (typeof body.rater === 'string' ? body.rater : '').trim();
    if (rater.length > 80) { res.status(400).json({ ok: false, error: 'rater too long' }); return; }

    const url = process.env.DATABASE_URL;
    if (!url) { res.status(500).json({ ok: false, error: 'DATABASE_URL not set' }); return; }
    const sql = neon(url);

    await sql.query(
      `INSERT INTO redpxl.outcomes (card_id, outcome, note, rater, client_token)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (client_token, card_id) WHERE client_token IS NOT NULL
       DO UPDATE SET outcome = EXCLUDED.outcome, note = EXCLUDED.note, rater = EXCLUDED.rater, created = now()`,
      [cardId, outcome, note || null, rater || null, clientToken]
    );
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: (e && e.message) ? e.message : String(e) });
  }
};
