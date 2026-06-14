/*
 * RedPxl News — dev-only UI audit (Playwright/Chromium). NEVER shipped; nothing here is a
 * runtime dependency of the static site. Output is gitignored to .ui-audit/.
 *
 * Setup (dev machine only — --no-save keeps the tracked root package.json clean):
 *   npm i playwright --no-save && npx playwright install chromium
 *   node scripts/ui_audit.mjs          (REDUCED=1 node scripts/ui_audit.mjs to emulate reduced-motion)
 *
 * It serves the STATIC repo root on localhost (a tiny file server that BYPASSES the Vercel auth
 * middleware, so the audit isn't blocked), then for each route × width asserts:
 *   - no horizontal overflow (documentElement.scrollWidth <= innerWidth + 1),
 *   - header / nav / main / footer landmarks present,
 *   - no uncaught JS exceptions (expected /api/* calls are aborted + ignored — those endpoints
 *     don't exist in a static serve, and app.js already handles their failure gracefully).
 * Screenshots land in .ui-audit/<route>-<width>.png and a pass/fail table prints + writes report.txt.
 * Exit code is non-zero if any check fails (so it can gate a loop).
 */
import { chromium } from 'playwright';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, '.ui-audit');
const PORT = 8099;
const WIDTHS = [360, 390, 768, 1024, 1280, 1440];
const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.woff2': 'font/woff2', '.webmanifest': 'application/manifest+json',
};

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent((req.url || '/').split('?')[0].split('#')[0]);
    if (p === '/' || p === '') p = '/index.html';
    const fp = path.join(ROOT, p);
    if (!fp.startsWith(ROOT) || !fs.existsSync(fp) || fs.statSync(fp).isDirectory()) {
      res.statusCode = 404; res.end('not found'); return;
    }
    res.setHeader('Content-Type', MIME[path.extname(fp)] || 'application/octet-stream');
    fs.createReadStream(fp).pipe(res);
  });
}

function readJSON(rel) {
  try { return JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8')); } catch { return null; }
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });

  // resolve a real card id + report id from the derived data (no hardcoding)
  const cardsIdx = readJSON('reports/data/cards-index.json') || [];
  const repIdx = readJSON('reports/data/index.json') || [];
  const cardId = (cardsIdx[0] || {}).id;
  const reportId = ((repIdx.find(r => r && r.type === 'daily')) || repIdx[0] || {}).id;

  const routes = [
    ['home', '/#/'],
    ['hub-design', '/#/hub/design'],
    ['hub-development', '/#/hub/development'],
    ['hub-marketing', '/#/hub/marketing'],
    ['hub-ai', '/#/hub/ai'],
    ['hub-news', '/#/hub/news'],
    ['tools', '/#/tools'],
    ['ask', '/#/ask'],
    ['inbox', '/#/inbox'],
    ['feed', reportId ? '/#/feed/' + reportId : '/#/feed'],
    ['card', cardId ? '/#/card/' + cardId : '/#/'],
    ['report', reportId ? '/#/feed/' + reportId : '/#/feed'],
  ];

  const server = serve();
  await new Promise(r => server.listen(PORT, r));
  const base = `http://localhost:${PORT}`;

  // REDUCED=1 emulates prefers-reduced-motion: reduce — verifies motion is disabled without
  // stranding content (scrollReveal skips .sr, the CSS forces sections visible).
  const REDUCED = !!process.env.REDUCED;
  const browser = await chromium.launch();
  const ctx = await browser.newContext(REDUCED ? { reducedMotion: 'reduce' } : {});
  const page = await ctx.newPage();
  if (REDUCED) console.log('(prefers-reduced-motion: reduce emulated)');
  await page.route('**/api/**', r => r.abort());   // static serve has no /api — whitelist (app.js handles it)

  const errors = [];
  page.on('pageerror', e => errors.push('pageerror: ' + (e && e.message ? e.message : e)));
  page.on('console', m => {
    if (m.type() !== 'error') return;
    const t = m.text();
    if (!/api\/|Failed to load resource|net::ERR|ERR_FAILED|favicon/i.test(t)) errors.push('console: ' + t);
  });

  const results = [];
  for (const [name, route] of routes) {
    errors.length = 0;                                   // per-route error capture (render + resizes)
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(base + route, { waitUntil: 'load' });
    await page.waitForTimeout(900);                      // let the SPA fetch + render
    for (const w of WIDTHS) {
      await page.setViewportSize({ width: w, height: 900 });
      await page.waitForTimeout(200);
      // scroll through to fire IntersectionObserver scroll-reveals, then back to top
      await page.evaluate(async () => {
        document.documentElement.style.scrollBehavior = 'auto';  // defeat CSS smooth-scroll so jumps land
        const h = document.body.scrollHeight;
        for (let y = 0; y <= h; y += 300) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 20)); }
        window.scrollTo(0, 0);
      });
      // IO callbacks are async — poll until reveals settle; count ONLY visible stranded sections
      // (a zero-size/empty child can't intersect and would be a false positive).
      let stuck = 0;
      for (let i = 0; i < 12; i++) {
        stuck = await page.evaluate(() => {
          let n = 0;
          document.querySelectorAll('.sr:not(.sr-in)').forEach(el => {
            const r = el.getBoundingClientRect(); if (r.width > 0 && r.height > 0) n++;
          });
          return n;
        });
        if (stuck === 0) break;
        await page.waitForTimeout(150);
      }
      const m = await page.evaluate(() => ({
        sw: document.documentElement.scrollWidth, iw: window.innerWidth,
        header: !!document.querySelector('header'), nav: !!document.querySelector('nav'),
        main: !!document.querySelector('main'), footer: !!document.querySelector('footer'),
      }));
      results.push({
        name, w, sw: m.sw, iw: m.iw,
        overflow: m.sw > m.iw + 1,
        landmarks: m.header && m.nav && m.main && m.footer,
        stuck,
        errs: errors.slice(),
      });
      await page.screenshot({ path: path.join(OUT, `${name}-${w}.png`), fullPage: true });
    }
  }
  await browser.close();
  server.close();

  let pass = 0, fail = 0;
  const rows = results.map(r => {
    const ok = !r.overflow && r.landmarks && r.stuck === 0 && r.errs.length === 0;
    ok ? pass++ : fail++;
    const flags = [
      r.overflow ? `OVERFLOW(${r.sw}>${r.iw})` : '',
      !r.landmarks ? 'MISSING-LANDMARK' : '',
      r.stuck ? `STUCK-HIDDEN(${r.stuck})` : '',
      r.errs.length ? `JS(${r.errs.length})` : '',
    ].filter(Boolean).join(' ');
    return `${ok ? 'PASS' : 'FAIL'}  ${r.name.padEnd(16)} ${String(r.w).padStart(5)}px  ${flags}`;
  });
  const summary = `\nUI AUDIT — route × width\n${rows.join('\n')}\n\n${pass} pass / ${fail} fail`;
  console.log(summary);
  for (const r of results) {
    if (r.overflow || !r.landmarks || r.stuck || r.errs.length) {
      console.log(`\n[${r.name} @ ${r.w}px] sw=${r.sw} iw=${r.iw} landmarks=${r.landmarks}`);
      r.errs.forEach(e => console.log('   ' + e));
    }
  }
  fs.writeFileSync(path.join(OUT, 'report.txt'), summary + '\n');
  process.exit(fail ? 1 : 0);
}

main().catch(e => { console.error(e); process.exit(2); });
