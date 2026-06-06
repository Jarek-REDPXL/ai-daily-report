/* RedPxl News — renderer.
   Loads a lightweight index.json (metadata + search blob), then lazy-loads each
   full report from reports/data/entries/<id>.json on demand (cached). Falls back
   to the legacy single-file window.AI_EDGE_REPORTS if the fetch path fails, so the
   site never hard-breaks. */
(function () {
  const container = document.getElementById("report-container");
  const nav = document.getElementById("archive-nav");
  const latestPill = document.getElementById("latest-pill");
  const countEl = document.getElementById("report-count");
  const searchEl = document.getElementById("search");
  const sidebar = document.getElementById("sidebar");
  const scrim = document.getElementById("scrim");

  let META = [];                 // lightweight metadata array (newest-first)
  const cache = {};              // id -> full report object (lazy)
  let legacy = null;             // window.AI_EDGE_REPORTS if we fall back

  // ---- domain filter state (purely additive; off unless the facet loads) ----
  // Chip labels come from the facet (index.meta.json), which is built from
  // scripts/domains.js — the single source of truth. Nothing is mirrored here.
  let domainFacet = [];          // [{slug,count,label,fullLabel}] from index.meta.json (empty = no chips)
  let domainFilter = null;       // selected slug, or null for "All"

  const sortFn = (a, b) => (a.sortDate < b.sortDate ? 1 : (a.sortDate > b.sortDate ? -1 : (a.type === "weekly" ? -1 : 1)));

  // Sidecar facet load — own try/catch so any failure leaves the site exactly as
  // it is today (no chips, base rendering untouched). Never throws.
  async function loadDomainFacet() {
    try {
      const res = await fetch("reports/data/index.meta.json", { cache: "no-cache" });
      if (!res.ok) throw new Error("meta " + res.status);
      const m = await res.json();
      const d = m && Array.isArray(m.domains) ? m.domains : [];
      return d.filter(x => x && x.slug);
    } catch (e) {
      return [];
    }
  }

  // ---------- data loading (with legacy fallback) ----------
  async function loadIndex() {
    try {
      const res = await fetch("reports/data/index.json", { cache: "no-cache" });
      if (!res.ok) throw new Error("index " + res.status);
      const idx = await res.json();
      if (Array.isArray(idx) && idx.length) return idx.slice().sort(sortFn);
      throw new Error("empty index");
    } catch (e) {
      // fallback: load the legacy single file and derive metadata from it
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

  // ---- theme (RedPxl defaults to DARK; toggle opts into light) ----
  const tt = document.getElementById("theme-toggle");
  tt.addEventListener("click", () => {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    if (isLight) { document.documentElement.removeAttribute("data-theme"); localStorage.setItem("redpxl-theme", "dark"); }
    else { document.documentElement.setAttribute("data-theme", "light"); localStorage.setItem("redpxl-theme", "light"); }
  });

  // ---- mobile sidebar ----
  function setSidebar(open){ sidebar.classList.toggle("open", open); scrim.classList.toggle("open", open); }
  document.getElementById("menu-btn").addEventListener("click", () => setSidebar(!sidebar.classList.contains("open")));
  scrim.addEventListener("click", () => setSidebar(false));

  // ---- scroll progress (rAF-throttled) ----
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

  // ---- Mon–Sun week label derived from sortDate ----
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
      // visible set = matches search AND selected domain (domain off => no constraint)
      const items = byWeek[w].filter(r =>
        (!f || (r.q || "").includes(f)) &&
        (!domainFilter || (r.domains || []).includes(domainFilter)));
      if (!items.length) return; // hide weeks with no matching entries
      const grp = document.createElement("div");
      grp.className = "week-group";
      grp.innerHTML = `<div class="week-label">${w}</div>` + items.map(navItemHTML).join("");
      nav.appendChild(grp);
    });
    nav.querySelectorAll(".nav-item").forEach(b => b.addEventListener("click", () => { show(b.dataset.id); setSidebar(false); }));
    markActive();
  }
  searchEl.addEventListener("input", () => buildNav(searchEl.value));

  // ---- domain filter chips (only built when the facet loaded) ----
  function setDomain(slug) {
    domainFilter = slug || null;
    try {
      if (domainFilter) localStorage.setItem("redpxl-domain", domainFilter);
      else localStorage.removeItem("redpxl-domain");
    } catch (e) { /* storage may be unavailable; filter still works in-session */ }
    markChips();
    buildNav(searchEl.value);
  }
  function markChips() {
    nav.parentNode && nav.parentNode.querySelectorAll(".dchip").forEach(c => {
      c.classList.toggle("active", (c.dataset.domain || null) === (domainFilter || null));
    });
  }
  function renderChips() {
    if (!domainFacet.length) return; // fail-safe: no facet => no chips, behave as today
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
    nav.parentNode.insertBefore(wrap, nav); // sits above the archive nav, below the search
    wrap.querySelectorAll(".dchip").forEach(c => c.addEventListener("click", () => {
      const slug = c.dataset.domain || null;
      setDomain(slug === domainFilter ? null : slug); // re-click active or "All" clears
    }));
    markChips();
  }

  // ---- rendering ----
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
      if (btn.dataset.go) btn.addEventListener("click", () => show(btn.dataset.go));
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
    if (location.hash.slice(1) !== meta.id) history.replaceState(null, "", "#" + meta.id);
    container.innerHTML = '<div class="loading">Loading…</div>';
    const full = await getEntry(meta.id);
    if (currentId !== meta.id) return; // a newer navigation superseded this one
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
  window.addEventListener("hashchange", () => { const id = location.hash.slice(1); if (id && id !== currentId) show(id); });

  // ---- keyboard nav ----
  document.addEventListener("keydown", (e) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
    if (e.key === "/" && !typing) { e.preventDefault(); searchEl.focus(); return; }
    if (e.key === "Escape" && document.activeElement === searchEl) { searchEl.blur(); return; }
    if (typing) return;
    const idx = META.findIndex(x => x.id === currentId);
    if (e.key === "ArrowLeft" && META[idx - 1]) { e.preventDefault(); show(META[idx - 1].id); }
    else if (e.key === "ArrowRight" && META[idx + 1]) { e.preventDefault(); show(META[idx + 1].id); }
  });

  // ---- init ----
  (async function init() {
    // Load the index and the (optional) domain facet together; the facet has its
    // own try/catch and can never block the index or base rendering.
    const [meta, facet] = await Promise.all([loadIndex(), loadDomainFacet()]);
    META = meta;
    domainFacet = facet;
    if (!META.length) {
      container.innerHTML = '<div class="loading">No reports yet.</div>';
      latestPill.textContent = "No reports"; return;
    }
    groupWeeks();
    latestPill.textContent = "Latest: " + META[0].dateLabel.replace(/,? 2026$/, "");
    const days = META.filter(r => r.type === "daily").length, wks = META.filter(r => r.type === "weekly").length;
    countEl.textContent = `${days} daily · ${wks} weekly · ${META.length} total`;
    // restore persisted domain selection, but only if it's a domain actually present
    try {
      const saved = localStorage.getItem("redpxl-domain");
      if (saved && domainFacet.some(d => d.slug === saved)) domainFilter = saved;
    } catch (e) { /* storage unavailable — ignore */ }
    renderChips();
    buildNav("");
    show(location.hash.slice(1) || META[0].id);
  })();
})();
