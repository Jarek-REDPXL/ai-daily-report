// /api/ask.js — ask-anything retrieval (Phase 4 RAG). Runs on Vercel; STAYS
// BEHIND the site password gate (NOT in the middleware exclusion), so only
// logged-in team members reach it — the gate cookie IS its auth.
//
// HYBRID retrieval (overhaul): pgvector cosine search UNION a keyword pass over the
// source text, merged + deduped, re-ranked by a blended score (combined = max(vector,
// keyword)), trimmed to the best few. A literal-term question ("cro and aov") hard-hits
// cards containing those tokens even when the vector score is mediocre. matched is set
// against the BLENDED score (recalibrated above the old ~0.33 vector noise floor).
//   - matched   -> answer GROUNDED ONLY in the retrieved cards/reports/tools, with citations.
//   - no match  -> answer "we don't cover this yet", log the question, AND record a real gap
//                  (redpxl.gaps, deduped) so a desk writes the missing card. Anti-hallucination
//                  by construction: synthesis uses ONLY retrieved context, never general knowledge.
//
// Env: DATABASE_URL · OPENAI_API_KEY (embed) · ANTHROPIC_API_KEY (answer).
// Never logs/returns the connection string or any key.
const { neon } = require('@neondatabase/serverless');

const EMBED_MODEL = process.env.EMBED_MODEL || 'text-embedding-3-small';
const ANSWER_MODEL = process.env.ASK_MODEL || 'claude-haiku-4-5-20251001';
const VECTOR_K = 20;          // vector candidates pulled before re-rank
const KEYWORD_K = 30;         // keyword candidates pulled before re-rank
const RERANK_TOP = 5;         // best N kept after the blended re-rank
// Blended-score match bar. Recalibrated for the hybrid corpus: well above the old 0.33
// vector noise floor, but low enough that a genuine keyword hit (a CRO card scoring ~0.5
// on the literal tokens) and a real semantic tool match both pass, while true blanks fail.
const MATCH_THRESHOLD = 0.45;
const ANSWER_MIN = 0.30;      // only feed reasonably-relevant context to the model

// Minimal stopword set — drop only glue words, keep craft/topic terms (image, video, cro…).
const STOPWORDS = new Set(['the', 'a', 'an', 'and', 'or', 'of', 'for', 'to', 'in', 'on', 'at',
  'is', 'are', 'was', 'were', 'be', 'how', 'do', 'does', 'did', 'what', 'which', 'who', 'when',
  'where', 'why', 'we', 'i', 'you', 'it', 'our', 'my', 'your', 'can', 'with', 'that', 'this',
  'these', 'those', 'me', 'us', 'about', 'into', 'from', 'by', 'as', 'should']);

function tokenize(q) {
  return Array.from(new Set(
    String(q || '').toLowerCase().split(/[^a-z0-9]+/)
      .filter(t => t.length >= 3 && !STOPWORDS.has(t))
  ));
}

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

// ---------------------------------------------------------------------------
//  Hybrid retrieve + blended re-rank. Reused by the handler AND the CI
//  acceptance test (scripts/ask_acceptance_test.js) — ONE source of truth.
//  Returns { ok, error?, matched, topScore, contexts:[{kind,ref_id,content,vscore,kscore,combined}] }.
// ---------------------------------------------------------------------------
async function retrieveAndScore(question, sql) {
  const emb = await embedQuestion(question);
  if (!emb) return { ok: false, error: 'embedding unavailable', matched: false, topScore: 0, contexts: [] };
  const vec = '[' + emb.map(x => Number(x).toFixed(6)).join(',') + ']';

  // 1) vector candidates (cosine = 1 - distance)
  const vrows = await sql.query(
    `SELECT kind, ref_id, content, 1 - (embedding <=> $1::vector) AS vscore
       FROM redpxl.kb_embeddings
      WHERE embedding IS NOT NULL
      ORDER BY embedding <=> $1::vector
      LIMIT $2`, [vec, VECTOR_K]);

  // 2) keyword candidates — ILIKE over the same source text (literal-term safety net)
  const tokens = tokenize(question);
  let krows = [];
  if (tokens.length) {
    const patterns = tokens.map(t => '%' + t + '%');
    krows = await sql.query(
      `SELECT kind, ref_id, content
         FROM redpxl.kb_embeddings
        WHERE content ILIKE ANY($1::text[])
        LIMIT $2`, [patterns, KEYWORD_K]);
  }

  // 3) merge + dedupe by (kind, ref_id); blended score = max(vector, keyword-fraction)
  const byKey = new Map();
  const keyOf = r => r.kind + ':' + r.ref_id;
  for (const r of vrows) {
    byKey.set(keyOf(r), { kind: r.kind, ref_id: r.ref_id, content: r.content, vscore: Number(r.vscore) || 0 });
  }
  for (const r of krows) {
    if (!byKey.has(keyOf(r))) {
      byKey.set(keyOf(r), { kind: r.kind, ref_id: r.ref_id, content: r.content, vscore: 0 });
    }
  }
  const scored = Array.from(byKey.values()).map(c => {
    const lc = (c.content || '').toLowerCase();
    const hit = tokens.length ? tokens.filter(t => lc.includes(t)).length / tokens.length : 0;
    const combined = Math.max(c.vscore, hit);
    return { ...c, kscore: hit, combined };
  });
  scored.sort((a, b) => b.combined - a.combined);

  const contexts = scored.slice(0, RERANK_TOP);
  const topScore = contexts.length ? contexts[0].combined : 0;
  return { ok: true, matched: topScore >= MATCH_THRESHOLD, topScore, contexts };
}

async function answerWith(question, contexts) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null;
  const ctx = contexts.map((c, i) =>
    `[${i + 1}] (${c.kind} ${c.ref_id})\n${c.content}`).join('\n\n');
  const system =
    'You are RedPxl News\'s in-house knowledge assistant. Answer the question using ONLY ' +
    'the numbered context items below (the team\'s own curated cards, reports, and tools). Be ' +
    'concise and practical, in the operator voice. Cite the items you use inline as [1], [2], ' +
    'etc. If the context does not contain the answer, say plainly that the knowledge base does ' +
    'not cover it yet — do NOT use outside knowledge.\n\nCONTEXT:\n' + ctx;
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

// A genuine no-match IS a real gap → record it (deduped) so a desk writes the missing card.
// FAIL-SOFT: if the gaps table isn't live yet, swallow the error — never break the response.
async function recordGap(sql, question) {
  try {
    const dup = await sql.query(
      `SELECT 1 FROM redpxl.gaps
        WHERE source = 'ask_no_match' AND status = 'open'
          AND lower(btrim(topic)) = lower(btrim($1)) LIMIT 1`, [question.slice(0, 200)]);
    if (dup.length) return;
    await sql.query(
      `INSERT INTO redpxl.gaps (source, topic, detail, weight)
       VALUES ('ask_no_match', $1, $2, 1)`,
      [question.slice(0, 200), 'Asked via Ask-anything; hybrid retrieval found nothing relevant — the knowledge base does not cover this yet.']);
  } catch (e) { /* gaps table not live — fail-soft */ }
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

    const result = await retrieveAndScore(question, sql);
    if (!result.ok) { res.status(503).json({ ok: false, error: 'retrieval unavailable (embedding)' }); return; }
    const { matched, topScore, contexts } = result;

    // log every question (analytics + the demand signal gaps_sync also mines)
    await sql.query(
      'INSERT INTO redpxl.ask_log (question, matched, top_score) VALUES ($1, $2, $3)',
      [question.slice(0, 500), matched, topScore]);

    if (!matched) {
      await recordGap(sql, question);   // honest no-match -> a real, deduped gap
      res.status(200).json({
        ok: true, matched: false, answer: null, citations: [],
        message: "The knowledge base doesn't cover that yet — I've logged it as a gap for the team to write next.",
      });
      return;
    }

    // contexts actually fed to the model (reasonably relevant ones)
    const used = contexts.filter(c => c.combined >= ANSWER_MIN).slice(0, RERANK_TOP);

    // titles for citations: cards/reports from their tables; tools from the embedded text.
    const cardIds = used.filter(c => c.kind === 'card').map(c => c.ref_id);
    const reportIds = used.filter(c => c.kind === 'report').map(c => c.ref_id);
    const titles = {};
    if (cardIds.length) {
      const t = await sql.query('SELECT id, title FROM redpxl.cards WHERE id = ANY($1::text[])', [cardIds]);
      for (const row of t) titles['card:' + row.id] = row.title;
    }
    if (reportIds.length) {
      const t = await sql.query('SELECT id, title FROM redpxl.reports WHERE id = ANY($1::text[])', [reportIds]);
      for (const row of t) titles['report:' + row.id] = row.title;
    }
    const titleFor = c => c.kind === 'tool'
      ? ((c.content || '').split(' — ')[0] || c.ref_id).trim()
      : (titles[c.kind + ':' + c.ref_id] || c.ref_id);
    const hashFor = c => c.kind === 'card' ? '#/card/' + c.ref_id
      : c.kind === 'report' ? '#/feed/' + c.ref_id : '#/tools';

    const answer = await answerWith(question, used);
    if (!answer) { res.status(503).json({ ok: false, error: 'answer model unavailable' }); return; }

    const citations = used.map((c, i) => ({
      n: i + 1, kind: c.kind, id: c.ref_id,
      title: titleFor(c), hash: hashFor(c),
      score: Math.round(Number(c.combined) * 100) / 100,
    }));

    res.status(200).json({ ok: true, matched: true, answer, citations });
  } catch (e) {
    res.status(500).json({ ok: false, error: (e && e.message) ? e.message : String(e) });
  }
};

// Reuse points for the CI acceptance test (no HTTP/cookie needed).
module.exports.retrieveAndScore = retrieveAndScore;
module.exports.tokenize = tokenize;
module.exports.MATCH_THRESHOLD = MATCH_THRESHOLD;
