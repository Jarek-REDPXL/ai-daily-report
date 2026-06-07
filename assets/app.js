/* RedPxl News — knowledge center shell.
   Hash-based client-side routing over multiple views:
     #/            home pulse
     #/feed[/<id>] the report reader (intake feed) — preserved exactly as before
     #/hub/<hub>   a craft hub (design|development|marketing|ai)
     #/card/<id>   a single knowledge card
   No hash / unknown → home. The reader (search + domain chips + Mon–Sun archive +
   report container + pager/keyboard-nav) is unchanged; it now lives under #/feed. */
(function () {
  const container = document.getElementById("report-container");
  const nav = document.getElementById("archive-nav");
  const latestPill = document.getElementById("latest-pill");
  const countEl = document.getElementById("report-count");
  const searchEl = document.getElementById("search");
  const sidebar = document.getElementById("sidebar");
  const scrim = document.getElementById("scrim");

  let META = [];                 // lightweight report metadata array (newest-first)
  const cache = {};              // id -> full report object (lazy)
  let legacy = null;             // window.AI_EDGE_REPORTS if we fall back

  // ---- domain filter state (purely additive; off unless the facet loads) ----
  let domainFacet = [];          // [{slug,count,label,fullLabel}] from index.meta.json
  let domainFilter = null;       // selected slug, or null for "All"
  let domainLabelMap = {};       // slug -> {label,fullLabel} for ALL domains (incl. empty)

  // motion: staggered entrance for tiles/list-items on render. Uses the same
  // CSS `reveal` keyframe as the section reveal (always ends visible — never the
  // "stuck hidden until scroll" failure mode). Reduced-motion forces them visible.
  function revealTiles(root) {
    if (!root) return;
    root.querySelectorAll(".kcard, .hub-tile, .rel-tile, .pulse-item").forEach((el, i) => {
      el.style.setProperty("--i", Math.min(i, 10));
      el.classList.add("rise");
    });
  }

  // ---- cards (durable knowledge atoms) ----
  let cardsIndex = [];           // slim cards [{id,title,summary,domains,confidence,status,updated}]
  const cardCache = {};          // id -> full card
  let legacyCards = null;        // window.AI_EDGE_CARDS fallback

  // Hubs roll the 8 domains up into 4 craft areas. Loaded from reports/data/hubs.json
  // (emitted from scripts/domains.js — the single source of truth). Never mirrored
  // here; empty until loaded, and the views degrade gracefully if it's missing.
  let HUBS = {};
  let HUB_ORDER = [];

  const sortFn = (a, b) => (a.sortDate < b.sortDate ? 1 : (a.sortDate > b.sortDate ? -1 : (a.type === "weekly" ? -1 : 1)));
  const byUpdated = (a, b) => ((a.updated || "") < (b.updated || "") ? 1 : ((a.updated || "") > (b.updated || "") ? -1 : 0));
  const esc = s => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // =========================================================================
  //  Data loading (each with its own safety net)
  // =========================================================================
  async function loadIndex() {
    try {
      const res = await fetch("reports/data/index.json", { cache: "no-cache" });
      if (!res.ok) throw new Error("index " + res.status);
      const idx = await res.json();
      if (Array.isArray(idx) && idx.length) return idx.slice().sort(sortFn);
      throw new Error("empty index");
    } catch (e) {
      legacy = await loadLegacy();
      if (legacy && legacy.length) {
        legacy.forEach(r => { cache[r.id] = r; });
        return legacy.slice().sort(sortFn).map(r => ({
          id: r.id, type: r.type, sortDate: r.sortDate, week: r.week,
          dateLabel: r.dateLabel, title: r.title, pdf: r.pdf || null,
          domains: r.domains || [],
          q: (r.title + " " + r.dateLabel + " " + (r.tldr || []).join(" ") + " " + JSON.stringify(r.sections || "")).replace(/<[^>]+>/g, " ").toLowerCase()
        }));
      }
      return [];
    }
  }
  function loadLegacy() {
    if (window.AI_EDGE_REPORTS) return Promise.resolve(window.AI_EDGE_REPORTS);
    return new Promise(resolve => {
      const s = document.createElement("script");
      s.src = "reports/data/reports.js";
      s.onload = () => resolve(window.AI_EDGE_REPORTS || []);
      s.onerror = () => resolve([]);
      document.head.appendChild(s);
    });
  }
  async function getEntry(id) {
    if (cache[id]) return cache[id];
    try {
      const res = await fetch("reports/data/entries/" + id + ".json", { cache: "no-cache" });
      if (!res.ok) throw new Error("entry " + res.status);
      const r = await res.json();
      cache[id] = r; return r;
    } catch (e) {
      legacy = legacy || await loadLegacy();
      const r = (legacy || []).find(x => x.id === id);
      if (r) { cache[id] = r; return r; }
      return null;
    }
  }
  async function loadDomainFacet() {
    try {
      const res = await fetch("reports/data/index.meta.json", { cache: "no-cache" });
      if (!res.ok) throw new Error("meta " + res.status);
      const m = await res.json();
      if (m && m.domainLabels) domainLabelMap = m.domainLabels;   // labels for all domains
      const d = m && Array.isArray(m.domains) ? m.domains : [];
      return d.filter(x => x && x.slug);
    } catch (e) { return []; }
  }
  const domShort = d => (domainLabelMap[d] && domainLabelMap[d].label) || d;
  const domFull = d => (domainLabelMap[d] && domainLabelMap[d].fullLabel) || d;
  async function loadCardsIndex() {
    try {
      const res = await fetch("reports/data/cards-index.json", { cache: "no-cache" });
      if (!res.ok) throw new Error("cards-index " + res.status);
      const arr = await res.json();
      return Array.isArray(arr) ? arr : [];
    } catch (e) { return []; }
  }
  async function loadHubs() {
    // returns [{key,label,scope,domains}] (ordered) or [] — own try/catch, never throws
    try {
      const res = await fetch("reports/data/hubs.json", { cache: "no-cache" });
      if (!res.ok) throw new Error("hubs " + res.status);
      const arr = await res.json();
      return Array.isArray(arr) ? arr.filter(h => h && h.key) : [];
    } catch (e) { return []; }
  }
  function loadLegacyCards() {
    if (window.AI_EDGE_CARDS) return Promise.resolve(window.AI_EDGE_CARDS);
    return new Promise(resolve => {
      const s = document.createElement("script");
      s.src = "reports/data/cards.js";
      s.onload = () => resolve(window.AI_EDGE_CARDS || []);
      s.onerror = () => resolve([]);
      document.head.appendChild(s);
    });
  }
  async function getCard(id) {
    if (cardCache[id]) return cardCache[id];
    const slim = cardsIndex.find(c => c.id === id);
    const dom = slim && slim.domains && slim.domains[0];
    if (dom) {
      try {
        const res = await fetch("reports/data/cards/" + dom + ".json", { cache: "no-cache" });
        if (res.ok) {
          const arr = await res.json();
          arr.forEach(c => { cardCache[c.id] = c; });
          if (cardCache[id]) return cardCache[id];
        }
      } catch (e) { /* fall through to legacy */ }
    }
    legacyCards = legacyCards || await loadLegacyCards();
    const c = (legacyCards || []).find(x => x.id === id);
    if (c) { cardCache[id] = c; return c; }
    return null;
  }

  // =========================================================================
  //  Top nav (route switcher) — injected so index.html stays minimal
  // =========================================================================
  const NAVLINKS = [
    { label: "Home", hash: "#/", on: v => v.view === "home" },
    { label: "Design", hash: "#/hub/design", on: v => v.view === "hub" && v.hub === "design" },
    { label: "Development", hash: "#/hub/development", on: v => v.view === "hub" && v.hub === "development" },
    { label: "Marketing", hash: "#/hub/marketing", on: v => v.view === "hub" && v.hub === "marketing" },
    { label: "AI", hash: "#/hub/ai", on: v => v.view === "hub" && v.hub === "ai" },
    { label: "Feed", hash: "#/feed", on: v => v.view === "feed" },
  ];
  let topnav = null, viewEl = null;
  function buildShell() {
    const topbar = document.querySelector(".topbar");
    if (topbar) {
      topnav = document.createElement("nav");
      topnav.className = "topnav";
      topnav.setAttribute("aria-label", "Sections");
      topnav.innerHTML = NAVLINKS.map(l =>
        `<a class="topnav-link" data-hash="${l.hash}" href="${l.hash}">${l.label}</a>`).join("");
      topbar.appendChild(topnav);
    }
    const layout = document.querySelector(".layout");
    viewEl = document.createElement("main");
    viewEl.className = "view-page";
    viewEl.id = "view";
    if (layout && layout.parentNode) layout.parentNode.insertBefore(viewEl, layout.nextSibling);
  }
  function markNav(route) {
    if (!topnav) return;
    topnav.querySelectorAll(".topnav-link").forEach(a => {
      const l = NAVLINKS.find(x => x.hash === a.dataset.hash);
      a.classList.toggle("active", !!(l && l.on(route)));
    });
  }

  // =========================================================================
  //  THE FEED (intake reader) — preserved exactly; only hash writes changed
  // =========================================================================
  const tt = document.getElementById("theme-toggle");
  tt.addEventListener("click", () => {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    if (isLight) { document.documentElement.removeAttribute("data-theme"); localStorage.setItem("redpxl-theme", "dark"); }
    else { document.documentElement.setAttribute("data-theme", "light"); localStorage.setItem("redpxl-theme", "light"); }
  });

  function setSidebar(open){ sidebar.classList.toggle("open", open); scrim.classList.toggle("open", open); }
  document.getElementById("menu-btn").addEventListener("click", () => setSidebar(!sidebar.classList.contains("open")));
  scrim.addEventListener("click", () => setSidebar(false));

  const bar = document.getElementById("progressbar");
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      const h = document.documentElement;
      bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100 || 0) + "%";
      ticking = false;
    });
  }, { passive: true });

  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  function weekLabel(sortDate) {
    const [y, m, d] = String(sortDate).split("-").map(Number);
    const dt = new Date(Date.UTC(y, m - 1, d));
    const dow = (dt.getUTCDay() + 6) % 7;
    const mon = new Date(dt); mon.setUTCDate(dt.getUTCDate() - dow);
    const sun = new Date(mon); sun.setUTCDate(mon.getUTCDate() + 6);
    const m1 = mon.getUTCMonth(), m2 = sun.getUTCMonth();
    return "Week of " + MONTHS[m1] + " " + mon.getUTCDate() + " – " + (m1 === m2 ? "" : MONTHS[m2] + " ") + sun.getUTCDate() + ", " + sun.getUTCFullYear();
  }

  let weeks = [], byWeek = {};
  function groupWeeks() {
    weeks = []; byWeek = {};
    META.forEach(r => {
      const w = weekLabel(r.sortDate);
      if (!byWeek[w]) { byWeek[w] = []; weeks.push(w); }
      byWeek[w].push(r);
    });
  }

  function navTitle(r) {
    if (r.type === "weekly") return "Weekly summary";
    const m = r.dateLabel.match(/^(\w{3})\w*,\s*(\w+ \d+)/);
    return m ? `${m[1]} · ${m[2]}` : r.dateLabel;
  }
  function navItemHTML(r) {
    const c = r.type === "weekly" ? "weekly" : "daily";
    return `<button class="nav-item ${c}" data-id="${r.id}">
        <span class="ni-type ${c}">${r.type === "weekly" ? "Week" : "Day"}</span>
        <span class="ni-title">${navTitle(r)}</span>
      </button>`;
  }
  function buildNav(filter) {
    nav.innerHTML = "";
    const f = (filter || "").trim().toLowerCase();
    weeks.forEach(w => {
      const items = byWeek[w].filter(r =>
        (!f || (r.q || "").includes(f)) &&
        (!domainFilter || (r.domains || []).includes(domainFilter)));
      if (!items.length) return;
      const grp = document.createElement("div");
      grp.className = "week-group";
      grp.innerHTML = `<div class="week-label">${w}</div>` + items.map(navItemHTML).join("");
      nav.appendChild(grp);
    });
    nav.querySelectorAll(".nav-item").forEach(b => b.addEventListener("click", () => {
      setSidebar(false);
      location.hash = "#/feed/" + b.dataset.id;   // route owns navigation
    }));
    markActive();
  }
  searchEl.addEventListener("input", () => buildNav(searchEl.value));

  function setDomain(slug) {
    domainFilter = slug || null;
    try {
      if (domainFilter) localStorage.setItem("redpxl-domain", domainFilter);
      else localStorage.removeItem("redpxl-domain");
    } catch (e) {}
    markChips();
    buildNav(searchEl.value);
  }
  function markChips() {
    nav.parentNode && nav.parentNode.querySelectorAll(".dchip").forEach(c => {
      c.classList.toggle("active", (c.dataset.domain || null) === (domainFilter || null));
    });
  }
  function renderChips() {
    if (!domainFacet.length) return;
    const wrap = document.createElement("div");
    wrap.className = "domain-filter";
    wrap.setAttribute("role", "group");
    wrap.setAttribute("aria-label", "Filter editions by domain");
    let html = `<span class="domain-filter-label">Domains</span>`;
    html += `<button class="dchip" data-domain="">All</button>`;
    domainFacet.forEach(d => {
      const label = d.label || d.slug;
      const full = d.fullLabel || label;
      html += `<button class="dchip" data-domain="${d.slug}" title="${full}">${label} <span class="dchip-count">${d.count}</span></button>`;
    });
    wrap.innerHTML = html;
    nav.parentNode.insertBefore(wrap, nav);
    wrap.querySelectorAll(".dchip").forEach(c => c.addEventListener("click", () => {
      const slug = c.dataset.domain || null;
      setDomain(slug === domainFilter ? null : slug);
    }));
    markChips();
  }

  const tags = a => (!a || !a.length) ? "" : `<span class="tags">${a.map(t => `<span class="tag ${t}">${t}</span>`).join("")}</span>`;
  const list = a => `<ul>${a.map(li => `<li>${li}</li>`).join("")}</ul>`;
  const table = t => `<div class="tbl-wrap"><table><thead><tr>${t.head.map(h => `<th>${h}</th>`).join("")}</tr></thead>` +
    `<tbody>${t.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;

  function renderBlock(b) {
    let h = '<div class="block">';
    if (b.sub) h += `<h4>${b.sub}${tags(b.tags)}</h4>`;
    else if (b.tags) h += tags(b.tags);
    if (b.p) h += `<p>${b.p}</p>`;
    if (b.list) h += list(b.list);
    if (b.table) h += table(b.table);
    if (b.why) h += `<div class="why"><b>Why it matters:</b> ${b.why}</div>`;
    if (b.doIt) h += `<div class="do"><b>Do this:</b> ${b.doIt}</div>`;
    if (b.note) h += `<p class="note">${b.note}</p>`;
    return h + "</div>";
  }
  function sectionHead(h) {
    const m = String(h).match(/^\s*(\d+)\s*[·.\-)]\s*(.+)$/);
    if (m) return `<h3 class="numbered"><span class="sec-num">${m[1].padStart(2, "0")}</span><span class="sec-title">${m[2]}</span></h3>`;
    return `<h3><span class="sec-title">${h}</span></h3>`;
  }

  function render(r) {
    const idx = META.findIndex(x => x.id === r.id);
    const newer = META[idx - 1], older = META[idx + 1];
    const editionLabel = r.type === "weekly" ? "Weekly Edition" : "Daily Briefing";

    let html = `<article class="masthead">
        <div class="kicker ${r.type}"><span class="kicker-rule"></span>${editionLabel}</div>
        <h2>${r.title}</h2>
        <div class="dateline">
          <span class="dateline-date">${r.dateLabel}</span>
          ${r.pdf ? `<a class="btn" href="${r.pdf}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"/></svg> Download PDF</a>` : ``}
        </div>
      </article>`;

    html += `<nav class="report-nav" aria-label="Edition navigation">
        <button data-go="${newer ? newer.id : ""}" ${newer ? "" : "disabled"}><span class="rn-arrow">←</span> Newer</button>
        <button data-go="${older ? older.id : ""}" ${older ? "" : "disabled"}>Older <span class="rn-arrow">→</span></button>
      </nav>`;

    if (r.tldr) html += `<aside class="tldr"><h3>${r.type === "weekly" ? "The 60-Second Version" : "Today in 30 Seconds"}</h3><ul>${r.tldr.map(t => `<li>${t}</li>`).join("")}</ul></aside>`;

    (r.sections || []).forEach(s => {
      html += `<section class="section">${sectionHead(s.h)}`;
      if (s.intro) html += `<p class="intro">${s.intro}</p>`;
      (s.blocks || []).forEach(b => html += renderBlock(b));
      if (s.checklist) html += `<ul class="checklist">${s.checklist.map((c, i) =>
        `<li><input type="checkbox" id="ck-${r.id}-${i}" data-ck="${r.id}-${i}"><label for="ck-${r.id}-${i}">${c}</label></li>`).join("")}</ul>`;
      html += `</section>`;
    });

    if (r.sources) html += `<div class="sources"><h3>Sources</h3><p>${r.sources}</p></div>`;
    html += ratingControlHTML("report", r.id);
    container.innerHTML = html;

    Array.prototype.forEach.call(container.children, (el, i) => el.style.setProperty("--i", Math.min(i, 8)));
    wireRating(container, "report", r.id);
    revealTiles(container);

    container.querySelectorAll(".report-nav button[data-go]").forEach(btn => {
      if (btn.dataset.go) btn.addEventListener("click", () => { location.hash = "#/feed/" + btn.dataset.go; });
    });
    container.querySelectorAll(".checklist input").forEach(cb => {
      const key = "aiedge-ck-" + cb.dataset.ck;
      if (localStorage.getItem(key) === "1") { cb.checked = true; cb.closest("li").classList.add("done"); }
      cb.addEventListener("change", () => {
        cb.closest("li").classList.toggle("done", cb.checked);
        localStorage.setItem(key, cb.checked ? "1" : "0");
      });
    });
  }

  let currentId = null;
  async function show(id) {
    const meta = META.find(x => x.id === id) || META[0];
    if (!meta) return;
    currentId = meta.id;
    markActive();
    container.innerHTML = '<div class="loading">Loading…</div>';
    const full = await getEntry(meta.id);
    if (currentId !== meta.id) return;
    if (!full) { container.innerHTML = '<div class="loading">Could not load this report.</div>'; return; }
    render(full);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function markActive() {
    let activeEl = null;
    nav.querySelectorAll(".nav-item").forEach(b => {
      const on = b.dataset.id === currentId;
      b.classList.toggle("active", on);
      if (on) activeEl = b;
    });
    if (activeEl && activeEl.scrollIntoView) {
      const r = activeEl.getBoundingClientRect(), sb = sidebar.getBoundingClientRect();
      if (r.top < sb.top + 70 || r.bottom > sb.bottom - 10) activeEl.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }

  document.addEventListener("keydown", (e) => {
    if (document.body.dataset.view !== "feed") return;     // arrows/search only in feed
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
    if (e.key === "/" && !typing) { e.preventDefault(); searchEl.focus(); return; }
    if (e.key === "Escape" && document.activeElement === searchEl) { searchEl.blur(); return; }
    if (typing) return;
    const idx = META.findIndex(x => x.id === currentId);
    if (e.key === "ArrowLeft" && META[idx - 1]) { e.preventDefault(); location.hash = "#/feed/" + META[idx - 1].id; }
    else if (e.key === "ArrowRight" && META[idx + 1]) { e.preventDefault(); location.hash = "#/feed/" + META[idx + 1].id; }
  });

  // =========================================================================
  //  HOME / HUB / CARD views
  // =========================================================================
  // ---- freshness (client-side; "updated Xd ago" + stale cue) ----
  function freshness(dateStr) {
    if (!dateStr) return { text: "", stale: false };
    const d = new Date(dateStr + "T00:00:00Z");
    if (isNaN(d.getTime())) return { text: "", stale: false };
    const n = Math.floor((Date.now() - d.getTime()) / 86400000);
    let text = n <= 0 ? "updated today"
      : n === 1 ? "updated 1d ago"
      : n < 30 ? "updated " + n + "d ago"
      : n < 365 ? "updated " + Math.floor(n / 30) + "mo ago"
      : "updated " + Math.floor(n / 365) + "y ago";
    return { text, stale: n > 60 };
  }
  // card's primary hub = first hub (canonical order) whose domains intersect it
  function primaryHub(domains) {
    const ds = new Set(domains || []);
    return HUB_ORDER.find(h => (HUBS[h].domains || []).some(d => ds.has(d))) || null;
  }
  function slim(id) { return cardsIndex.find(x => x.id === id) || null; }

  // ---- shared card tile (home / hub / related) ----
  function cardTileHTML(c) {
    const f = freshness(c.updated);
    const conf = c.confidence ? `<span class="kc-conf ${esc(c.confidence)}">${esc(c.confidence)}</span>` : "";
    const sup = c.status === "superseded" ? `<span class="kc-conf superseded">superseded</span>` : "";
    const doms = (c.domains || []).map(d => `<span class="kc-dom">${esc(domShort(d))}</span>`).join("");
    return `<a class="kcard" href="#/card/${encodeURIComponent(c.id)}">
        <span class="kc-dot" aria-hidden="true"></span>
        <div class="kc-top">${conf}${sup}<span class="kc-fresh${f.stale ? " stale" : ""}">${esc(f.text)}</span></div>
        <h4 class="kc-title">${esc(c.title)}</h4>
        <p class="kc-summary">${esc(c.summary)}</p>
        <div class="kc-doms">${doms}</div>
      </a>`;
  }
  // ---- compact tile for related / evolution groups ----
  function relTileHTML(s) {
    if (!s) return "";
    const f = freshness(s.updated);
    const conf = s.confidence ? `<span class="kc-conf ${esc(s.confidence)}">${esc(s.confidence)}</span>` : "";
    return `<a class="rel-tile" href="#/card/${encodeURIComponent(s.id)}">
        <div class="kc-top">${conf}<span class="kc-fresh${f.stale ? " stale" : ""}">${esc(f.text)}</span></div>
        <span class="rel-title">${esc(s.title)}</span>
      </a>`;
  }
  function pulseItemHTML(r) {
    return `<a class="pulse-item" href="#/feed/${encodeURIComponent(r.id)}">
        <span class="pulse-date">${esc(r.dateLabel.replace(/,? 2026$/, ""))}</span>
        <span class="pulse-title">${esc(r.title)}</span>
        <span class="pulse-doms">${(r.domains || []).map(d => `<span class="pulse-dom">${esc(domShort(d))}</span>`).join("")}</span>
      </a>`;
  }
  function hubCount(hub) {
    const set = new Set(HUBS[hub].domains);
    return cardsIndex.filter(c => (c.domains || []).some(d => set.has(d))).length;
  }

  // =========================================================================
  //  WRITE-BACK: client token (shared), POST helper, feedback form, rating control
  //  All user input is treated as DATA — sent to the gated API, never rendered as
  //  HTML. Nothing here ever builds DOM from user-supplied strings.
  // =========================================================================
  function clientToken() {
    try {
      let t = localStorage.getItem("redpxl-token");
      if (!t) {
        t = (window.crypto && crypto.randomUUID) ? crypto.randomUUID()
          : "t-" + Math.random().toString(36).slice(2) + Date.now().toString(36);
        localStorage.setItem("redpxl-token", t);
      }
      return t;
    } catch (e) { return ""; }
  }
  function savedRating(type, id) {
    try { const v = localStorage.getItem("redpxl-rating:" + type + ":" + id); return v ? parseInt(v, 10) : 0; }
    catch (e) { return 0; }
  }
  function storeRating(type, id, score) {
    try { localStorage.setItem("redpxl-rating:" + type + ":" + id, String(score)); } catch (e) {}
  }
  async function postJSON(path, payload) {
    const r = await fetch(path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    let data = null; try { data = await r.json(); } catch (e) {}
    if (!r.ok || !data || !data.ok) throw new Error((data && data.error) || ("HTTP " + r.status));
    return data;
  }

  // ---- feedback form (homepage) ----
  function feedbackFormHTML() {
    return `<section class="home-block contribute" id="contribute">
      <div class="hb-head"><h2>Contribute</h2></div>
      <p class="contribute-sub">Share a win, ask for a play, or tell the system what to learn next — it feeds the next run.</p>
      <form class="cform" autocomplete="off" novalidate>
        <div class="cform-kinds" role="group" aria-label="Type of note">
          <button type="button" class="kind-btn active" data-kind="share">Share a win</button>
          <button type="button" class="kind-btn" data-kind="ask">Ask for a play</button>
          <button type="button" class="kind-btn" data-kind="learn_next">Learn next</button>
        </div>
        <label class="cform-label" for="cf-body">Your message</label>
        <textarea id="cf-body" class="cform-body" maxlength="2000" rows="4" required
          placeholder="e.g. We ran the Advantage+ play and CPA dropped 18% — or: we need a fast way to batch-edit product photos."></textarea>
        <div class="cform-row">
          <input class="cform-craft" maxlength="80" aria-label="Craft or topic (optional)" placeholder="Craft / topic (optional)">
          <input class="cform-name" maxlength="80" aria-label="Your name (optional)" placeholder="Your name (optional)">
        </div>
        <input class="cform-hp" type="text" name="company" tabindex="-1" autocomplete="off" aria-hidden="true">
        <div class="cform-foot">
          <button type="submit" class="cform-submit" disabled>Send</button>
          <span class="cform-msg" role="status" aria-live="polite"></span>
        </div>
      </form>
      <div class="cform-thanks" hidden>
        <div class="cform-thanks-row"><span class="ag-dot" aria-hidden="true"></span>Thanks — your note landed. The next run will see it.</div>
        <button type="button" class="cform-again">Send another</button>
      </div>
    </section>`;
  }
  function wireFeedbackForm(root) {
    const form = root.querySelector(".cform");
    if (!form) return;
    const thanks = root.querySelector(".cform-thanks");
    const bodyEl = form.querySelector(".cform-body");
    const msg = form.querySelector(".cform-msg");
    const submit = form.querySelector(".cform-submit");
    let kind = "share";

    form.querySelectorAll(".kind-btn").forEach(btn => btn.addEventListener("click", () => {
      kind = btn.dataset.kind;
      form.querySelectorAll(".kind-btn").forEach(b => b.classList.toggle("active", b === btn));
    }));
    // disable Send until the message has content
    const syncDisabled = () => { submit.disabled = (bodyEl.value || "").trim().length < 1; };
    bodyEl.addEventListener("input", syncDisabled);
    syncDisabled();

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const body = (bodyEl.value || "").trim();
      msg.className = "cform-msg"; msg.textContent = "";
      if (body.length < 1) { msg.textContent = "Add a message first."; msg.classList.add("err"); bodyEl.focus(); return; }
      submit.disabled = true; submit.textContent = "Sending…";
      try {
        await postJSON("/api/feedback", {
          kind, body,
          craft: (form.querySelector(".cform-craft").value || "").trim(),
          submitter: (form.querySelector(".cform-name").value || "").trim(),
          hp: form.querySelector(".cform-hp").value || ""
        });
        // success → show thank-you; keep the form in the DOM for "Send another"
        form.hidden = true;
        thanks.hidden = false;
        submit.textContent = "Send";
      } catch (err) {
        submit.disabled = false; submit.textContent = "Send";
        msg.textContent = "Couldn't send — please try again."; msg.classList.add("err");
      }
    });

    // "Send another" → restore a FRESH form without a page reload
    thanks.querySelector(".cform-again").addEventListener("click", () => {
      form.reset();
      kind = "share";
      form.querySelectorAll(".kind-btn").forEach(b => b.classList.toggle("active", b.dataset.kind === "share"));
      msg.className = "cform-msg"; msg.textContent = "";
      syncDisabled();
      thanks.hidden = true;
      form.hidden = false;
      bodyEl.focus();
    });
  }

  // ---- rating control (card view + feed editions) ----
  function ratingControlHTML(type, id) {
    const prior = savedRating(type, id);
    const dots = [1, 2, 3, 4, 5].map(n =>
      `<button type="button" class="rate-dot${prior && n <= prior ? " on" : ""}" data-score="${n}" aria-label="Rate ${n} of 5"></button>`).join("");
    return `<div class="rate" data-type="${esc(type)}" data-id="${esc(id)}">
      <div class="rate-row">
        <span class="rate-label">${prior ? "You rated this" : "Rate this play"}</span>
        <div class="rate-dots" role="group" aria-label="Rating, 1 to 5">${dots}</div>
        <span class="rate-state">${prior ? prior + "/5" : ""}</span>
      </div>
      <div class="rate-expand" hidden>
        <input type="text" class="rate-comment" maxlength="280" aria-label="Optional comment" placeholder="Optional — one line on why">
        <button type="button" class="rate-submit btn-sm">Submit</button>
      </div>
      <p class="rate-msg" role="status" aria-live="polite" hidden></p>
    </div>`;
  }
  function wireRating(root, type, id) {
    const el = root.querySelector(".rate");
    if (!el) return;
    const dots = Array.prototype.slice.call(el.querySelectorAll(".rate-dot"));
    const expand = el.querySelector(".rate-expand");
    const commentEl = el.querySelector(".rate-comment");
    const submit = el.querySelector(".rate-submit");
    const label = el.querySelector(".rate-label");
    const state = el.querySelector(".rate-state");
    const msg = el.querySelector(".rate-msg");
    let selected = savedRating(type, id);
    const paint = n => dots.forEach(d => d.classList.toggle("on", parseInt(d.dataset.score, 10) <= n));
    if (selected) { paint(selected); el.classList.add("rated"); }
    dots.forEach(d => d.addEventListener("click", () => {
      selected = parseInt(d.dataset.score, 10);
      paint(selected);
      // micro-animation: pop the just-clicked square (reduced-motion disables it)
      d.classList.remove("pop");
      requestAnimationFrame(() => d.classList.add("pop"));
      expand.hidden = false;
      commentEl.focus();
    }));
    submit.addEventListener("click", async () => {
      if (!selected) return;
      submit.disabled = true; submit.textContent = "Saving…"; msg.hidden = true; msg.className = "rate-msg";
      try {
        await postJSON("/api/rating", {
          target_type: type, target_id: id, score: selected,
          comment: (commentEl.value || "").trim(),
          client_token: clientToken(), hp: ""
        });
        storeRating(type, id, selected);
        label.textContent = "You rated this";
        state.textContent = selected + "/5";
        el.classList.add("rated");
        expand.hidden = true;
        submit.disabled = false; submit.textContent = "Submit";
      } catch (err) {
        submit.disabled = false; submit.textContent = "Submit";
        msg.hidden = false; msg.textContent = "Couldn't save — try again."; msg.classList.add("err");
      }
    });
  }

  function renderHome() {
    const dailies = META.filter(r => r.type === "daily").slice(0, 6);
    const changed = dailies.map(pulseItemHTML).join("") || `<p class="empty">No intake yet.</p>`;

    const tiles = HUB_ORDER.map(h => {
      const n = hubCount(h);
      return `<a class="hub-tile hub-${h}" href="#/hub/${h}">
          <span class="ht-dot" aria-hidden="true"></span>
          <span class="ht-label">${esc(HUBS[h].label)}</span>
          <span class="ht-scope">${esc(HUBS[h].scope)}</span>
          <span class="ht-count">${n} card${n === 1 ? "" : "s"}</span>
        </a>`;
    }).join("");

    const recent = cardsIndex.slice().sort(byUpdated).slice(0, 6);
    const recentHTML = recent.length
      ? `<div class="kcard-grid">${recent.map(cardTileHTML).join("")}</div>`
      : `<p class="empty">No cards yet — they appear as the routine distils durable plays.</p>`;

    const lastUpd = cardsIndex.reduce((m, c) => (c.updated > m ? c.updated : m), "");
    const lastF = freshness(lastUpd);
    const glance = `${cardsIndex.length} card${cardsIndex.length === 1 ? "" : "s"} across ${HUB_ORDER.length} hubs`
      + (lastF.text ? ` · library ${lastF.text}` : "");

    viewEl.innerHTML = `
      <section class="home-hero">
        <div class="hh-kicker"><span class="kicker-rule"></span>Knowledge Center</div>
        <h1 class="hh-title">The pulse</h1>
        <p class="hh-sub">What changed across the crafts, and the plays worth keeping.</p>
        <div class="at-glance"><span class="ag-dot" aria-hidden="true"></span>${esc(glance)}</div>
      </section>

      <section class="home-block">
        <div class="hb-head"><h2>What changed</h2><a class="hb-more" href="#/feed">Open the feed →</a></div>
        <div class="pulse-list">${changed}</div>
      </section>

      <section class="home-block">
        <div class="hb-head"><h2>Hubs</h2></div>
        <div class="hub-tiles">${tiles}</div>
      </section>

      <section class="home-block">
        <div class="hb-head"><h2>Recent cards</h2></div>
        ${recentHTML}
      </section>

      ${feedbackFormHTML()}`;
    Array.prototype.forEach.call(viewEl.children, (el, i) => el.style.setProperty("--i", Math.min(i, 6)));
    wireFeedbackForm(viewEl);
    revealTiles(viewEl);
    window.scrollTo({ top: 0 });
  }

  function renderHub(hub) {
    if (!HUBS[hub]) { location.hash = "#/"; return; }
    const H = HUBS[hub];
    const set = new Set(H.domains);
    const distinct = cardsIndex.filter(c => (c.domains || []).some(d => set.has(d)));

    // per-domain sub-sections in the hub's canonical domain order
    const subs = H.domains.map(d => {
      const cs = cardsIndex.filter(c => (c.domains || []).includes(d)).sort(byUpdated);
      const body = cs.length
        ? `<div class="kcard-grid">${cs.map(cardTileHTML).join("")}</div>`
        : `<p class="empty subtle">Building as the routine runs.</p>`;
      return `<section class="hub-sub">
          <div class="hub-sub-head"><span class="hub-sub-dot" aria-hidden="true"></span>
            <h3>${esc(domFull(d))}</h3><span class="hub-sub-count">${cs.length}</span></div>
          ${body}
        </section>`;
    }).join("");

    // recent intake into this hub (ties the library to the live stream)
    const recent = META.filter(r => r.type === "daily" && (r.domains || []).some(d => set.has(d))).slice(0, 4);
    const recentHTML = recent.length
      ? `<div class="pulse-list">${recent.map(pulseItemHTML).join("")}</div>`
      : `<p class="empty subtle">No recent intake tagged to this hub yet.</p>`;

    viewEl.innerHTML = `
      <section class="hub-header">
        <div class="cv-back"><a href="#/">← Home</a></div>
        <div class="hh-kicker"><span class="kicker-rule"></span>Hub</div>
        <h1 class="hh-title">${esc(H.label)}</h1>
        <p class="hh-sub">${esc(H.scope)}</p>
        <div class="at-glance"><span class="ag-dot" aria-hidden="true"></span>${distinct.length} card${distinct.length === 1 ? "" : "s"} · ${H.domains.length} domain${H.domains.length === 1 ? "" : "s"}</div>
      </section>
      <div class="hub-subs">${subs}</div>
      <section class="home-block">
        <div class="hb-head"><h2>Recent in ${esc(H.label)}</h2><a class="hb-more" href="#/feed">Open the feed →</a></div>
        ${recentHTML}
      </section>`;
    Array.prototype.forEach.call(viewEl.children, (el, i) => el.style.setProperty("--i", Math.min(i, 6)));
    revealTiles(viewEl);
    window.scrollTo({ top: 0 });
  }

  async function renderCard(id) {
    viewEl.innerHTML = '<div class="loading">Loading…</div>';
    const c = id ? await getCard(id) : null;
    if (document.body.dataset.view !== "card") return; // superseded by another nav
    if (!c) { viewEl.innerHTML = `<section class="card-view"><p class="empty">Card not found. <a href="#/">Back to home</a></p></section>`; return; }

    const f = freshness(c.updated);
    const how = (c.how || []).map(s => `<li>${s}</li>`).join("");
    const doms = (c.domains || []).map(d => `<span class="kc-dom" title="${esc(domFull(d))}">${esc(domShort(d))}</span>`).join("");
    const tagsHTML = (c.tags || []).map(t => `<span class="cv-tag">${esc(t)}</span>`).join("");
    // card sources are a structured [{label,url}] array → clickable anchors (no markdown/HTML strings)
    const srcAnchors = (Array.isArray(c.sources) ? c.sources : []).filter(s => s && s.url).map(s => {
      let host = ""; try { host = new URL(s.url).hostname.replace(/^www\./, ""); } catch (e) { host = s.url; }
      return `<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.label || host)}</a>`;
    }).join(" · ");

    // evolution: what this replaces, and what replaced it (reverse lookup via index)
    const replaces = (c.supersedes || []).map(slim).filter(Boolean);
    const replacedBy = cardsIndex.filter(x => (x.supersedes || []).includes(c.id));
    const related = (c.related || []).map(slim).filter(Boolean);
    const evoGroup = (label, cls, arr) => arr.length
      ? `<div class="evo-group ${cls}"><span class="evo-label">${label}</span><div class="rel-tiles">${arr.map(relTileHTML).join("")}</div></div>` : "";

    const ph = primaryHub(c.domains || []);
    const back = ph ? `<a href="#/hub/${ph}">← ${esc(HUBS[ph].label)} hub</a>` : `<a href="#/">← Home</a>`;

    viewEl.innerHTML = `
      <article class="card-view">
        <div class="cv-back">${back}</div>
        <div class="hh-kicker"><span class="kicker-rule"></span>Knowledge Card</div>
        <h1 class="cv-title">${esc(c.title)}</h1>
        <div class="cv-meta">
          <span class="cv-conf ${esc(c.confidence)}">${esc(c.confidence)}</span>
          <span class="cv-status ${esc(c.status)}">${esc(c.status)}</span>
          <span class="cv-doms">${doms}</span>
          <span class="cv-fresh${f.stale ? " stale" : ""}">${esc(f.text)}${c.created ? " · created " + esc(c.created) : ""}</span>
        </div>
        <p class="cv-summary">${c.summary || ""}</p>
        ${c.why ? `<div class="why"><b>Why it matters:</b> ${c.why}</div>` : ""}
        ${how ? `<div class="cv-how"><h3>How to run it</h3><ol>${how}</ol></div>` : ""}
        ${tagsHTML ? `<div class="cv-tags">${tagsHTML}</div>` : ""}
        ${(replaces.length || replacedBy.length || related.length) ? `<div class="cv-evo">
          ${evoGroup("Replaces", "replaces", replaces)}
          ${evoGroup("Replaced by", "replaced-by", replacedBy)}
          ${evoGroup("Related", "related", related)}
        </div>` : ""}
        ${srcAnchors ? `<div class="sources"><h3>Sources</h3><p>${srcAnchors}</p></div>` : ""}
        ${ratingControlHTML("card", c.id)}
      </article>`;
    Array.prototype.forEach.call(viewEl.children, (el, i) => el.style.setProperty("--i", Math.min(i, 6)));
    wireRating(viewEl, "card", c.id);
    revealTiles(viewEl);
    window.scrollTo({ top: 0 });
  }

  // =========================================================================
  //  Router
  // =========================================================================
  function parseHash() {
    let h = location.hash.slice(1);
    if (!h || h === "/") return { view: "home" };
    if (h[0] !== "/") return { view: "feed", id: h };       // legacy bare-id deep link
    const parts = h.replace(/^\/+/, "").split("/");
    const head = parts[0];
    if (head === "feed") return { view: "feed", id: parts[1] ? decodeURIComponent(parts.slice(1).join("/")) : null };
    if (head === "hub") return { view: "hub", hub: (parts[1] || "").toLowerCase() };
    if (head === "card") return { view: "card", id: parts[1] ? decodeURIComponent(parts.slice(1).join("/")) : null };
    return { view: "home" };
  }
  let ready = false;
  function router() {
    if (!ready) return;
    const route = parseHash();
    document.body.dataset.view = route.view;
    markNav(route);
    if (route.view === "feed") {
      if (route.id) show(route.id);
      else if (!currentId) show(META[0] && META[0].id);
    } else if (route.view === "hub") {
      renderHub(route.hub);
    } else if (route.view === "card") {
      renderCard(route.id);
    } else {
      renderHome();
    }
  }
  window.addEventListener("hashchange", router);

  // =========================================================================
  //  Init
  // =========================================================================
  buildShell();
  (async function init() {
    const [meta, facet, cidx, hubs] = await Promise.all([loadIndex(), loadDomainFacet(), loadCardsIndex(), loadHubs()]);
    META = meta;
    domainFacet = facet;
    cardsIndex = cidx;
    HUB_ORDER = hubs.map(h => h.key);
    HUBS = {};
    hubs.forEach(h => { HUBS[h.key] = { label: h.label, scope: h.scope, domains: h.domains || [] }; });
    if (!META.length) {
      document.body.dataset.view = "feed";
      container.innerHTML = '<div class="loading">No reports yet.</div>';
      latestPill.textContent = "No reports";
    } else {
      groupWeeks();
      latestPill.textContent = "Latest: " + META[0].dateLabel.replace(/,? 2026$/, "");
      const days = META.filter(r => r.type === "daily").length, wks = META.filter(r => r.type === "weekly").length;
      countEl.textContent = `${days} daily · ${wks} weekly · ${META.length} total · ${cardsIndex.length} cards`;
      try {
        const saved = localStorage.getItem("redpxl-domain");
        if (saved && domainFacet.some(d => d.slug === saved)) domainFilter = saved;
      } catch (e) {}
      renderChips();
      buildNav("");
    }
    ready = true;
    router();   // resolve the initial hash
  })();
})();
