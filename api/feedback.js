// /api/feedback.js — team write-back (runs on Vercel; STAYS BEHIND the site password
// gate — NOT in the middleware exclusion, so only logged-in team members reach it).
// Writes one row into redpxl.feedback. Defense-in-depth: honeypot + server-side
// validation + length bounds. All input is treated as DATA (parameterized SQL; the
// front-end renders nothing from it). Never logs/returns the connection string.
const { neon } = require('@neondatabase/serverless');

const KINDS = new Set(['share', 'ask', 'learn_next']);

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') { res.status(405).json({ ok: false, error: 'method not allowed' }); return; }

    let body = req.body;
    if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = null; } }
    if (!body || typeof body !== 'object') { res.status(400).json({ ok: false, error: 'invalid body' }); return; }

    // honeypot — humans never fill it; a filled value means a bot.
    if (typeof body.hp === 'string' && body.hp.trim() !== '') { res.status(400).json({ ok: false, error: 'rejected' }); return; }

    const kind = KINDS.has(body.kind) ? body.kind : 'share';
    const message = (typeof body.body === 'string' ? body.body : '').trim();
    if (message.length < 1 || message.length > 2000) { res.status(400).json({ ok: false, error: 'message required (1-2000 chars)' }); return; }
    const craft = (typeof body.craft === 'string' ? body.craft : '').trim();
    if (craft.length > 80) { res.status(400).json({ ok: false, error: 'craft too long' }); return; }
    const submitter = (typeof body.submitter === 'string' ? body.submitter : '').trim();
    if (submitter.length > 80) { res.status(400).json({ ok: false, error: 'name too long' }); return; }

    const url = process.env.DATABASE_URL;
    if (!url) { res.status(500).json({ ok: false, error: 'DATABASE_URL not set' }); return; }
    const sql = neon(url);
    await sql.query(
      `INSERT INTO redpxl.feedback (submitter, craft, kind, body) VALUES ($1, $2, $3, $4)`,
      [submitter || null, craft || null, kind, message]
    );
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: (e && e.message) ? e.message : String(e) });
  }
};
