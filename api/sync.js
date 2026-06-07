// /api/sync.js — git → Neon mirror sync (runs on Vercel Cron, never in this container).
// STRICTLY ONE-WAY: git is the source of truth; this is the SOLE writer to
// redpxl.cards / redpxl.reports. Idempotent upsert of every card + report, then prune
// any mirror row whose id is no longer in the source. Reads the deploy-bundled
// reports/data/sync.json (built by scripts/build-data.js) — no HTTP, no auth issues.
// Auth: Authorization: Bearer <CRON_SECRET> (Vercel Cron + dashboard "Run" send it).
// Never logs or returns the connection string.
const { neon } = require('@neondatabase/serverless');
const data = require('../reports/data/sync.json');

// text[] columns get JS arrays bound with a ::text[] cast; jsonb columns get a
// JSON.stringify'd string bound with a ::jsonb cast; dates use ::date.
const CARD_UPSERT = `
  INSERT INTO redpxl.cards
    (id, domains, title, summary, why, how, confidence, status, sources, tags, supersedes, related, created, updated, corroboration_count, synced_at)
  VALUES
    ($1, $2::text[], $3, $4, $5, $6::text[], $7, $8, $9::jsonb, $10::text[], $11::text[], $12::text[], $13::date, $14::date, $15, now())
  ON CONFLICT (id) DO UPDATE SET
    domains=EXCLUDED.domains, title=EXCLUDED.title, summary=EXCLUDED.summary, why=EXCLUDED.why,
    how=EXCLUDED.how, confidence=EXCLUDED.confidence, status=EXCLUDED.status, sources=EXCLUDED.sources,
    tags=EXCLUDED.tags, supersedes=EXCLUDED.supersedes, related=EXCLUDED.related,
    created=EXCLUDED.created, updated=EXCLUDED.updated, corroboration_count=EXCLUDED.corroboration_count, synced_at=now()
`;

const REPORT_UPSERT = `
  INSERT INTO redpxl.reports
    (id, type, sort_date, week, title, date_label, domains, tldr, sections, sources, pdf, synced_at)
  VALUES
    ($1, $2, $3::date, $4, $5, $6, $7::text[], $8::jsonb, $9::jsonb, $10, $11, now())
  ON CONFLICT (id) DO UPDATE SET
    type=EXCLUDED.type, sort_date=EXCLUDED.sort_date, week=EXCLUDED.week, title=EXCLUDED.title,
    date_label=EXCLUDED.date_label, domains=EXCLUDED.domains, tldr=EXCLUDED.tldr,
    sections=EXCLUDED.sections, sources=EXCLUDED.sources, pdf=EXCLUDED.pdf, synced_at=now()
`;

module.exports = async (req, res) => {
  try {
    // ---- auth ----
    const secret = process.env.CRON_SECRET;
    const auth = req.headers.authorization || req.headers.Authorization || '';
    if (!secret || auth !== `Bearer ${secret}`) {
      res.status(401).json({ ok: false, error: 'unauthorized' });
      return;
    }

    const url = process.env.DATABASE_URL;
    if (!url) {
      res.status(500).json({ ok: false, error: 'DATABASE_URL not set' });
      return;
    }
    const sql = neon(url);

    const cards = Array.isArray(data.cards) ? data.cards : [];
    const reports = Array.isArray(data.reports) ? data.reports : [];

    // ---- upsert cards ----
    let cards_upserted = 0;
    for (const c of cards) {
      await sql.query(CARD_UPSERT, [
        c.id,
        c.domains || [],
        c.title,
        c.summary,
        c.why,
        c.how || [],
        c.confidence,
        c.status,
        JSON.stringify(c.sources || []),
        c.tags || [],
        c.supersedes || [],
        c.related || [],
        c.created,
        c.updated,
        (typeof c.corroboration_count === 'number' ? c.corroboration_count : null),
      ]);
      cards_upserted++;
    }

    // ---- upsert reports ----
    let reports_upserted = 0;
    for (const r of reports) {
      await sql.query(REPORT_UPSERT, [
        r.id,
        r.type,
        r.sortDate,
        r.week || null,
        r.title,
        r.dateLabel || null,
        r.domains || [],
        JSON.stringify(r.tldr || []),
        JSON.stringify(r.sections || []),
        r.sources || null,
        r.pdf || null,
      ]);
      reports_upserted++;
    }

    // ---- prune orphans (mirror must exactly match git) ----
    const cardIds = cards.map(c => c.id);
    const reportIds = reports.map(r => r.id);
    let cards_pruned = 0;
    let reports_pruned = 0;
    if (cardIds.length) {
      const del = await sql.query(
        'DELETE FROM redpxl.cards WHERE id <> ALL($1::text[]) RETURNING id', [cardIds]);
      cards_pruned = del.length;
    }
    if (reportIds.length) {
      const del = await sql.query(
        'DELETE FROM redpxl.reports WHERE id <> ALL($1::text[]) RETURNING id', [reportIds]);
      reports_pruned = del.length;
    }

    res.status(200).json({ ok: true, cards_upserted, reports_upserted, cards_pruned, reports_pruned });
  } catch (e) {
    // Surface only the message — never the connection string / full config.
    res.status(500).json({ ok: false, error: (e && e.message) ? e.message : String(e) });
  }
};
