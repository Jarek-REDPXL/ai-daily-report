#!/usr/bin/env node
/*
 * RedPxl News — MCP server (Phase 4, optional).
 *
 * Exposes the team's curated knowledge base to any MCP client (Claude Desktop,
 * Cowork) so you can ask "what's the latest on X?" and get answers from OUR base,
 * not the open web. Three tools:
 *   - get_latest : the most recent reports (title, date, domains)
 *   - search     : semantic search over cards + reports (pgvector)
 *   - ask        : grounded RAG answer with citations (same logic as /api/ask)
 *
 * Runs locally over stdio. Env: DATABASE_URL (required), OPENAI_API_KEY (search/
 * ask), ANTHROPIC_API_KEY (ask). Reuses the same Neon tables the site populates.
 *
 * Setup:  cd mcp && npm install
 * Claude Desktop config (claude_desktop_config.json):
 *   { "mcpServers": { "redpxl-news": {
 *       "command": "node", "args": ["ABSOLUTE/PATH/TO/mcp/server.js"],
 *       "env": { "DATABASE_URL": "...", "OPENAI_API_KEY": "...", "ANTHROPIC_API_KEY": "..." } } } }
 */
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { neon } from '@neondatabase/serverless';

const EMBED_MODEL = process.env.EMBED_MODEL || 'text-embedding-3-small';
const ANSWER_MODEL = process.env.ASK_MODEL || 'claude-haiku-4-5-20251001';
const MATCH_THRESHOLD = 0.34;

function db() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL not set');
  return neon(url);
}

async function embed(text) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error('OPENAI_API_KEY not set');
  const r = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: EMBED_MODEL, input: text.slice(0, 8000) }),
  });
  if (!r.ok) throw new Error('embedding failed: ' + r.status);
  const d = await r.json();
  return d.data[0].embedding;
}

async function retrieve(sql, question, k = 8) {
  const emb = await embed(question);
  const vec = '[' + emb.map(x => Number(x).toFixed(6)).join(',') + ']';
  return sql.query(
    `SELECT kind, ref_id, content, 1 - (embedding <=> $1::vector) AS score
       FROM redpxl.kb_embeddings WHERE embedding IS NOT NULL
      ORDER BY embedding <=> $1::vector LIMIT $2`, [vec, k]);
}

const server = new McpServer({ name: 'redpxl-news', version: '1.0.0' });

server.tool('get_latest',
  'The most recent RedPxl News reports (title, date, domains).',
  { limit: z.number().min(1).max(30).optional() },
  async ({ limit }) => {
    const sql = db();
    const rows = await sql.query(
      'SELECT id, type, sort_date, title, domains FROM redpxl.reports ORDER BY sort_date DESC LIMIT $1',
      [limit || 10]);
    const text = rows.map(r => `- [${r.sort_date}] (${r.type}) ${r.title} — ${(r.domains || []).join(', ')}`).join('\n');
    return { content: [{ type: 'text', text: text || 'No reports.' }] };
  });

server.tool('search',
  'Semantic search over the RedPxl News cards + reports. Returns the best matches.',
  { query: z.string().min(2), limit: z.number().min(1).max(20).optional() },
  async ({ query, limit }) => {
    const sql = db();
    const rows = await retrieve(sql, query, limit || 8);
    const text = rows.map(r =>
      `- (${r.kind} ${r.ref_id}, score ${Number(r.score).toFixed(2)}) ${r.content.slice(0, 160)}…`).join('\n');
    return { content: [{ type: 'text', text: text || 'No matches.' }] };
  });

server.tool('ask',
  'Ask a question; get an answer grounded ONLY in the RedPxl News knowledge base, with citations.',
  { question: z.string().min(3).max(500) },
  async ({ question }) => {
    const sql = db();
    const rows = await retrieve(sql, question, 8);
    const top = rows.length ? Number(rows[0].score) : 0;
    if (top < MATCH_THRESHOLD) {
      return { content: [{ type: 'text', text: "The knowledge base doesn't cover that yet." }] };
    }
    const ctx = rows.filter(r => Number(r.score) >= Math.max(MATCH_THRESHOLD, top - 0.12));
    const key = process.env.ANTHROPIC_API_KEY;
    if (!key) {
      return { content: [{ type: 'text', text: ctx.map((c, i) => `[${i + 1}] ${c.content.slice(0, 300)}`).join('\n\n') }] };
    }
    const ctxText = ctx.map((c, i) => `[${i + 1}] (${c.kind} ${c.ref_id})\n${c.content}`).join('\n\n');
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({
        model: ANSWER_MODEL, max_tokens: 700,
        system: 'Answer ONLY from the numbered context (RedPxl News\'s own cards/reports). Cite as [1],[2]. If not covered, say so.\n\n' + ctxText,
        messages: [{ role: 'user', content: question }],
      }),
    });
    const d = await r.json();
    const answer = (d.content && d.content[0] && d.content[0].text) || 'No answer.';
    return { content: [{ type: 'text', text: answer }] };
  });

await server.connect(new StdioServerTransport());
