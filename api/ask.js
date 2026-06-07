// /api/ask.js — ask-anything retrieval (Phase 4 RAG). Runs on Vercel; STAYS
// BEHIND the site password gate (NOT in the middleware exclusion), so only
// logged-in team members reach it — the gate cookie IS its auth.
//
// Flow: embed the question (OpenAI) -> cosine search redpxl.kb_embeddings
// (pgvector) -> if nothing clears the relevance threshold, answer "I don't know"
// and log the question to redpxl.feedback as kind='learn_next' (the demand signal
// the daily routine researches next) -> else answer GROUNDED ONLY in the retrieved
// cards/reports, with citations. Anti-hallucination by construction.
//
// Env: DATABASE_URL · OPENAI_API_KEY (embed) · ANTHROPIC_API_KEY (answer).
// Never logs/returns the connection string or any key.
const { neon } = require('@neondatabase/serverless');

const EMBED_MODEL = process.env.EMBED_MODEL || 'text-embedding-3-small';
const ANSWER_MODEL = process.env.ASK_MODEL || 'claude-haiku-4-5-20251001';
const TOP_K = 8;
const MATCH_THRESHOLD = 0.34;   // cosine similarity floor for "we have something"

async function embedQuestion(q) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;
  const r = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: EMBED_MODEL, input: q.slice(0, 8000) }),
  });
  if (!r.ok) return null;
  const data = await r.json();
  return (data.data && data.data[0] && data.data[0].embedding) || null;
}

async function answerWith(question, contexts) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null;
  const ctx = contexts.map((c, i) =>
    `[${i + 1}] (${c.kind} ${c.ref_id})\n${c.content}`).join('\n\n');
  const system =
    'You are RedPxl News\'s in-house knowledge assistant. Answer the question ' +
    'using ONLY the numbered context items below (the team\'s own curated cards and ' +
    'reports). Be concise and practical, in the operator voice. Cite the items you ' +
    'use inline as [1], [2], etc. If the context does not contain the answer, say ' +
    'plainly that the knowledge base does not cover it yet — do NOT use outside ' +
    'knowledge.\n\nCONTEXT:\n' + ctx;
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: ANSWER_MODEL, max_tokens: 700, system,
      messages: [{ role: 'user', content: question }],
    }),
  });
  if (!r.ok) return null;
  const data = await r.json();
  return (data.content && data.content[0] && data.content[0].text) || null;
}

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') { res.status(405).json({ ok: false, error: 'method not allowed' }); return; }
    let body = req.body;
    if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = null; } }
    const question = (body && typeof body.question === 'string' ? body.question : '').trim();
    if (question.length < 3 || question.length > 500) {
      res.status(400).json({ ok: false, error: 'question must be 3-500 chars' }); return;
    }

    const url = process.env.DATABASE_URL;
    if (!url) { res.status(500).json({ ok: false, error: 'DATABASE_URL not set' }); return; }
    const sql = neon(url);

    const emb = await embedQuestion(question);
    if (!emb) { res.status(503).json({ ok: false, error: 'retrieval unavailable (embedding)' }); return; }
    const vec = '[' + emb.map(x => Number(x).toFixed(6)).join(',') + ']';

    // cosine similarity = 1 - cosine distance (<=> operator)
    const rows = await sql.query(
      `SELECT kind, ref_id, content, 1 - (embedding <=> $1::vector) AS score
         FROM redpxl.kb_embeddings
        WHERE embedding IS NOT NULL
        ORDER BY embedding <=> $1::vector
        LIMIT $2`, [vec, TOP_K]);

    const top = rows.length ? Number(rows[0].score) : 0;
    const matched = top >= MATCH_THRESHOLD;

    // log every question (analytics + demand signal)
    await sql.query(
      'INSERT INTO redpxl.ask_log (question, matched, top_score) VALUES ($1, $2, $3)',
      [question.slice(0, 500), matched, top]);

    if (!matched) {
      // push to the learn_next queue so the routine researches it next run
      await sql.query(
        `INSERT INTO redpxl.feedback (submitter, kind, body) VALUES ($1, 'learn_next', $2)`,
        ['ask-anything', question.slice(0, 500)]);
      res.status(200).json({
        ok: true, matched: false, answer: null, citations: [],
        message: "The knowledge base doesn't cover that yet — I've added it to the team's learn-next queue.",
      });
      return;
    }

    // keep the relevant context (within a band of the top score)
    const contexts = rows.filter(r => Number(r.score) >= Math.max(MATCH_THRESHOLD, top - 0.12));

    // titles + routes for citations
    const cardIds = contexts.filter(c => c.kind === 'card').map(c => c.ref_id);
    const reportIds = contexts.filter(c => c.kind === 'report').map(c => c.ref_id);
    const titles = {};
    if (cardIds.length) {
      const t = await sql.query('SELECT id, title FROM redpxl.cards WHERE id = ANY($1::text[])', [cardIds]);
      for (const row of t) titles['card:' + row.id] = row.title;
    }
    if (reportIds.length) {
      const t = await sql.query('SELECT id, title FROM redpxl.reports WHERE id = ANY($1::text[])', [reportIds]);
      for (const row of t) titles['report:' + row.id] = row.title;
    }

    const answer = await answerWith(question, contexts);
    if (!answer) { res.status(503).json({ ok: false, error: 'answer model unavailable' }); return; }

    const citations = contexts.map((c, i) => ({
      n: i + 1, kind: c.kind, id: c.ref_id,
      title: titles[c.kind + ':' + c.ref_id] || c.ref_id,
      hash: c.kind === 'card' ? '#/card/' + c.ref_id : '#/feed/' + c.ref_id,
      score: Math.round(Number(c.score) * 100) / 100,
    }));

    res.status(200).json({ ok: true, matched: true, answer, citations });
  } catch (e) {
    res.status(500).json({ ok: false, error: (e && e.message) ? e.message : String(e) });
  }
};
