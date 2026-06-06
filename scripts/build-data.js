#!/usr/bin/env node
/*
 * RedPxl News — data builder.
 * reports/data/reports.js stays the canonical write target (the routine keeps
 * prepending to it, unchanged). This script DERIVES the browser-facing data:
 *   reports/data/index.json        — lightweight metadata array (sidebar/nav)
 *   reports/data/entries/<id>.json — one full report per file (lazy-loaded)
 * The site loads index.json (small) then fetches only the entry you open, so it
 * scales to years of reports without the browser downloading everything.
 *
 * Run:  node scripts/build-data.js   (also run automatically by check_reports.py)
 */
const fs = require("fs");
const path = require("path");
const { DOMAINS, DOMAIN_LABELS, DOMAIN_LABELS_SHORT } = require("./domains.js"); // single source of truth for slugs + labels

const REPO = path.resolve(__dirname, "..");
const SRC = path.join(REPO, "reports", "data", "reports.js");
const CARDS_SRC = path.join(REPO, "reports", "data", "cards.js");
const OUT_INDEX = path.join(REPO, "reports", "data", "index.json");
const OUT_META = path.join(REPO, "reports", "data", "index.meta.json");
const OUT_DIR = path.join(REPO, "reports", "data", "entries");
const OUT_CARDS_DIR = path.join(REPO, "reports", "data", "cards");

global.window = {};
eval(fs.readFileSync(SRC, "utf8"));
const all = (global.window.AI_EDGE_REPORTS || []).slice();
if (!all.length) { console.error("build-data: no reports found"); process.exit(2); }

// newest-first; within same date, weekly before daily
all.sort((a, b) => (a.sortDate < b.sortDate ? 1 : (a.sortDate > b.sortDate ? -1 : (a.type === "weekly" ? -1 : 1))));

fs.mkdirSync(OUT_DIR, { recursive: true });

// metadata the sidebar + masthead need + a compact lowercased search blob `q`
// (so filtering still works without loading every full entry). Strips HTML tags.
function searchBlob(r) {
  const parts = [r.title, r.dateLabel, (r.tldr || []).join(" "),
                 (r.domains || []).join(" "), JSON.stringify(r.sections || "")];
  return parts.join(" ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").toLowerCase();
}
// index.json stays a BARE ARRAY of records (the shape app.js consumes directly,
// which keeps lazy-loading intact). `domains` is now part of each record + the
// search blob `q`, so it's available without touching app.js.
const index = all.map(r => ({
  id: r.id, type: r.type, sortDate: r.sortDate,
  week: r.week, dateLabel: r.dateLabel, title: r.title,
  domains: r.domains || [], pdf: r.pdf || null, q: searchBlob(r),
}));
fs.writeFileSync(OUT_INDEX, JSON.stringify(index, null, 0));

// ---- CARDS (durable knowledge atoms) ----
// cards.js is a second source of truth (window.AI_EDGE_CARDS). We derive one
// lazy-loadable file per domain (a card with N domains appears in each), plus a
// per-domain count facet. Guarded so build-data still works if cards.js is absent.
let cards = [];
if (fs.existsSync(CARDS_SRC)) {
  global.window = {};
  eval(fs.readFileSync(CARDS_SRC, "utf8"));
  cards = (global.window.AI_EDGE_CARDS || []).slice();
}
// newest-updated first within each domain file (handy for the future hubs)
cards.sort((a, b) => ((a.updated || "") < (b.updated || "") ? 1 : ((a.updated || "") > (b.updated || "") ? -1 : 0)));

function facetFor(countMap) {
  return DOMAINS.filter(d => countMap[d]).map(d => ({
    slug: d, count: countMap[d],
    label: DOMAIN_LABELS_SHORT[d] || d,   // short chip text (domains.js is sole source)
    fullLabel: DOMAIN_LABELS[d] || d,     // full label for tooltips
  }));
}

// Sidecar facet for the sidebar filter: which valid domains are present and how
// many reports carry each (only non-zero domains, in canonical slug order). Kept
// OUT of index.json so app.js's array-shaped reader stays untouched. The `cards`
// facet mirrors the same shape for the upcoming hubs (count per domain). Adding
// the `cards` key is ignored by the current app.js (it reads `domains` only).
const reportCounts = {};
for (const r of all) for (const d of (r.domains || [])) reportCounts[d] = (reportCounts[d] || 0) + 1;
const cardCounts = {};
for (const c of cards) for (const d of (c.domains || [])) cardCounts[d] = (cardCounts[d] || 0) + 1;
const domainsFacet = facetFor(reportCounts);
const cardsFacet = facetFor(cardCounts);
fs.writeFileSync(OUT_META, JSON.stringify({ domains: domainsFacet, cards: cardsFacet }, null, 0));

// one lazy-loadable file per domain that has cards; prune domains that no longer do
fs.mkdirSync(OUT_CARDS_DIR, { recursive: true });
const keepCards = new Set();
for (const d of DOMAINS) {
  const inDomain = cards.filter(c => (c.domains || []).includes(d));
  if (!inDomain.length) continue;
  keepCards.add(d + ".json");
  fs.writeFileSync(path.join(OUT_CARDS_DIR, d + ".json"), JSON.stringify(inDomain, null, 0));
}
for (const f of fs.readdirSync(OUT_CARDS_DIR)) {
  if (f.endsWith(".json") && !keepCards.has(f)) fs.unlinkSync(path.join(OUT_CARDS_DIR, f));
}

// one file per full report
const keep = new Set();
for (const r of all) {
  keep.add(r.id + ".json");
  fs.writeFileSync(path.join(OUT_DIR, r.id + ".json"), JSON.stringify(r, null, 0));
}
// prune entry files that no longer exist in reports.js
for (const f of fs.readdirSync(OUT_DIR)) {
  if (f.endsWith(".json") && !keep.has(f)) fs.unlinkSync(path.join(OUT_DIR, f));
}

console.log("build-data: wrote index.json (" + index.length + ") + index.meta.json ("
  + domainsFacet.length + " domains, " + cardsFacet.length + " card-domains) + "
  + keep.size + " entry files + " + keepCards.size + " card files ("
  + cards.length + " cards)");
