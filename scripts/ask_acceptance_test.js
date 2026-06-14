#!/usr/bin/env node
/*
 * Ask retrieval — CI acceptance test. Reuses the EXACT retrieval logic from api/ask.js
 * (retrieveAndScore) against the live KB — no HTTP, no cookie, one source of truth. Pulls the
 * real questions from redpxl.ask_log (with their OLD top_score) and reports before -> after, so
 * the overhaul is proved on the actual questions that missed.
 *
 * Env: DATABASE_URL + OPENAI_API_KEY (both CI-side). Optionally pass extra questions as argv to
 * force-cover the acceptance cases, e.g.:
 *   node scripts/ask_acceptance_test.js "cro and aov" "best tool for product photos" "best ai video tool"
 * Prints a table to the log AND writes acceptance-results.md (uploaded as an artifact).
 */
const fs = require('fs');
const { neon } = require('@neondatabase/serverless');
const ask = require('../api/ask.js');

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) { console.error('DATABASE_URL not set — cannot run acceptance test.'); process.exit(2); }
  if (!process.env.OPENAI_API_KEY) { console.error('OPENAI_API_KEY not set — cannot embed questions.'); process.exit(2); }
  const sql = neon(url);

  // The real questions, newest distinct first, each with its last-logged (OLD) score.
  let qs = [];
  try {
    const rows = await sql.query(
      `SELECT DISTINCT ON (lower(btrim(question))) question, matched AS old_matched, top_score AS old_top, created
         FROM redpxl.ask_log
        ORDER BY lower(btrim(question)), created DESC`);
    rows.sort((a, b) => (a.created < b.created ? 1 : -1));
    qs = rows.slice(0, 12);
  } catch (e) { console.error('ask_log read failed:', e.message); }

  // explicit questions (argv) are appended so the acceptance cases are always covered
  for (const q of process.argv.slice(2)) qs.push({ question: q, old_matched: null, old_top: null });

  console.log(`MATCH_THRESHOLD = ${ask.MATCH_THRESHOLD}\n`);
  const lines = ['# Ask retrieval — acceptance results', '',
    `Match threshold: \`${ask.MATCH_THRESHOLD}\` (blended score = max(vector cosine, keyword fraction)).`, '',
    '| question | OLD score (matched) | NEW score (matched) | top retrieved (kind:id, score) |',
    '|---|---|---|---|'];

  for (const row of qs) {
    let r;
    try { r = await ask.retrieveAndScore(row.question, sql); }
    catch (e) { console.error(`retrieve failed for "${row.question}":`, e.message); continue; }
    const top = (r.contexts || []).slice(0, 3)
      .map(c => `${c.kind}:${c.ref_id} (${Number(c.combined).toFixed(2)})`).join('; ') || '(none)';
    const oldStr = row.old_top == null ? 'n/a' : `${Number(row.old_top).toFixed(2)} (${row.old_matched})`;
    const newStr = `${Number(r.topScore).toFixed(2)} (${r.matched})`;
    lines.push(`| ${row.question} | ${oldStr} | ${newStr} | ${top} |`);
    console.log(`Q: ${row.question}\n  OLD ${oldStr}  ->  NEW ${newStr}\n  top: ${top}\n`);
  }

  fs.writeFileSync('acceptance-results.md', lines.join('\n') + '\n');
  console.log('Wrote acceptance-results.md');
}

main().catch(e => { console.error(e); process.exit(1); });
