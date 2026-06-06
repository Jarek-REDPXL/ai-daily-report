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

const REPO = path.resolve(__dirname, "..");
const SRC = path.join(REPO, "reports", "data", "reports.js");
const OUT_INDEX = path.join(REPO, "reports", "data", "index.json");
const OUT_DIR = path.join(REPO, "reports", "data", "entries");

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
  const parts = [r.title, r.dateLabel, (r.tldr || []).join(" "), JSON.stringify(r.sections || "")];
  return parts.join(" ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").toLowerCase();
}
const index = all.map(r => ({
  id: r.id, type: r.type, sortDate: r.sortDate,
  week: r.week, dateLabel: r.dateLabel, title: r.title,
  pdf: r.pdf || null, q: searchBlob(r),
}));
fs.writeFileSync(OUT_INDEX, JSON.stringify(index, null, 0));

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

console.log("build-data: wrote index.json (" + index.length + ") + " + keep.size + " entry files");
