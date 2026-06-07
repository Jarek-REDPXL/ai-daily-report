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
      const d = m && Array.isArray(m.domains) ? m.domains : [];
      return d.filter(x => x && x.slug);
    } catch (e) { return []; }
  }
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
    container.innerHTML = html;

    Array.prototype.forEach.call(container.children, (el, i) => el.style.setProperty("--i", Math.min(i, 8)));

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
  function cardTileHTML(c) {
    const conf = c.confidence ? `<span class="kc-conf ${c.confidence}">${c.confidence}</span>` : "";
    const sup = c.status === "superseded" ? `<span class="kc-conf superseded">superseded</span>` : "";
    const doms = (c.domains || []).map(d => `<span class="kc-dom">${esc(d)}</span>`).join("");
    return `<a class="kcard" href="#/card/${encodeURIComponent(c.id)}">
        <div class="kc-top">${conf}${sup}<span class="kc-updated">${esc(c.updated || "")}</span></div>
        <h4 class="kc-title">${esc(c.title)}</h4>
        <p class="kc-summary">${esc(c.summary)}</p>
        <div class="kc-doms">${doms}</div>
      </a>`;
  }
  function hubCount(hub) {
    const set = new Set(HUBS[hub].domains);
    // distinct cards whose domains intersect the hub's domain set
    return cardsIndex.filter(c => (c.domains || []).some(d => set.has(d))).length;
  }

  function renderHome() {
    const dailies = META.filter(r => r.type === "daily").slice(0, 7);
    const changed = dailies.map(r =>
      `<a class="pulse-item" href="#/feed/${encodeURIComponent(r.id)}">
        <span class="pulse-date">${esc(r.dateLabel.replace(/,? 2026$/, ""))}</span>
        <span class="pulse-title">${esc(r.title)}</span>
        ${(r.domains || []).map(d => `<span class="pulse-dom">${esc(d)}</span>`).join("")}
      </a>`).join("") || `<p class="empty">No intake yet.</p>`;

    const tiles = HUB_ORDER.map(h => {
      const n = hubCount(h);
      return `<a class="hub-tile hub-${h}" href="#/hub/${h}">
          <span class="ht-label">${HUBS[h].label}</span>
          <span class="ht-scope">${esc(HUBS[h].scope)}</span>
          <span class="ht-count">${n} card${n === 1 ? "" : "s"}</span>
        </a>`;
    }).join("");

    const recent = cardsIndex.slice().sort(byUpdated).slice(0, 6);
    const recentHTML = recent.length
      ? `<div class="kcard-grid">${recent.map(cardTileHTML).join("")}</div>`
      : `<p class="empty">No cards yet — they appear as the routine distils durable plays.</p>`;

    viewEl.innerHTML = `
      <section class="home-hero">
        <div class="hh-kicker"><span class="kicker-rule"></span>Knowledge Center</div>
        <h1 class="hh-title">The pulse</h1>
        <p class="hh-sub">What changed across the crafts, and the plays worth keeping.</p>
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
      </section>`;
    Array.prototype.forEach.call(viewEl.children, (el, i) => el.style.setProperty("--i", Math.min(i, 6)));
    window.scrollTo({ top: 0 });
  }

  function renderHub(hub) {
    if (!HUBS[hub]) { location.hash = "#/"; return; }
    const set = new Set(HUBS[hub].domains);
    const cards = cardsIndex.filter(c => (c.domains || []).some(d => set.has(d))).sort(byUpdated);
    const body = cards.length
      ? `<div class="kcard-grid">${cards.map(cardTileHTML).join("")}</div>`
      : `<p class="empty">No cards in this hub yet — they fill in as the routine runs.</p>`;
    viewEl.innerHTML = `
      <section class="hub-header">
        <div class="hh-kicker"><span class="kicker-rule"></span>Hub</div>
        <h1 class="hh-title">${esc(HUBS[hub].label)}</h1>
        <p class="hh-sub">${esc(HUBS[hub].scope)} <span class="hub-domnote">Domains: ${HUBS[hub].domains.map(esc).join(", ")}</span></p>
      </section>
      <section class="home-block"><div class="hb-head"><h2>${cards.length} card${cards.length === 1 ? "" : "s"}</h2></div>${body}</section>`;
    Array.prototype.forEach.call(viewEl.children, (el, i) => el.style.setProperty("--i", Math.min(i, 6)));
    window.scrollTo({ top: 0 });
  }

  function cardLinkById(id) {
    const c = cardsIndex.find(x => x.id === id);
    const label = c ? c.title : id;
    return `<a href="#/card/${encodeURIComponent(id)}">${esc(label)}</a>`;
  }
  async function renderCard(id) {
    viewEl.innerHTML = '<div class="loading">Loading…</div>';
    const c = id ? await getCard(id) : null;
    if (document.body.dataset.view !== "card") return; // superseded by another nav
    if (!c) { viewEl.innerHTML = `<section class="card-view"><p class="empty">Card not found. <a href="#/">Back to home</a></p></section>`; return; }
    const how = (c.how || []).map(s => `<li>${s}</li>`).join("");
    const doms = (c.domains || []).map(d => `<span class="kc-dom">${esc(d)}</span>`).join("");
    const tagsHTML = (c.tags || []).map(t => `<span class="tag ${esc(t)}">${esc(t)}</span>`).join("");
    const rel = (c.related || []).filter(Boolean);
    const sup = (c.supersedes || []).filter(Boolean);
    viewEl.innerHTML = `
      <article class="card-view">
        <div class="cv-back"><a href="#/">← Home</a></div>
        <div class="hh-kicker"><span class="kicker-rule"></span>Knowledge Card</div>
        <h1 class="cv-title">${esc(c.title)}</h1>
        <div class="cv-meta">
          <span class="kc-conf ${esc(c.confidence)}">${esc(c.confidence)}</span>
          <span class="cv-status ${esc(c.status)}">${esc(c.status)}</span>
          <span class="cv-doms">${doms}</span>
          <span class="cv-dates">created ${esc(c.created || "")} · updated ${esc(c.updated || "")}</span>
        </div>
        <p class="cv-summary">${c.summary || ""}</p>
        ${c.why ? `<div class="why"><b>Why it matters:</b> ${c.why}</div>` : ""}
        ${how ? `<div class="cv-how"><h3>How to run it</h3><ol>${how}</ol></div>` : ""}
        ${tagsHTML ? `<div class="cv-tags">${tagsHTML}</div>` : ""}
        ${sup.length ? `<div class="cv-links"><b>Supersedes:</b> ${sup.map(cardLinkById).join(" · ")}</div>` : ""}
        ${rel.length ? `<div class="cv-links"><b>Related:</b> ${rel.map(cardLinkById).join(" · ")}</div>` : ""}
        ${c.sources ? `<div class="sources"><h3>Sources</h3><p>${c.sources}</p></div>` : ""}
      </article>`;
    Array.prototype.forEach.call(viewEl.children, (el, i) => el.style.setProperty("--i", Math.min(i, 6)));
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
