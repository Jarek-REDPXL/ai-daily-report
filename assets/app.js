/* The AI Edge — renderer. Builds the archive + reports from window.AI_EDGE_REPORTS. */
(function () {
  const ALL = (window.AI_EDGE_REPORTS || []).slice()
    .sort((a, b) => (a.sortDate < b.sortDate ? 1 : (a.sortDate > b.sortDate ? -1 : (a.type === "weekly" ? -1 : 1))));

  const container = document.getElementById("report-container");
  const nav = document.getElementById("archive-nav");
  const latestPill = document.getElementById("latest-pill");
  const countEl = document.getElementById("report-count");
  const searchEl = document.getElementById("search");
  const sidebar = document.getElementById("sidebar");
  const scrim = document.getElementById("scrim");

  if (!ALL.length) {
    container.innerHTML = '<div class="loading">No reports yet. Add one to <code>reports/data/reports.js</code>.</div>';
    latestPill.textContent = "No reports";
    return;
  }

  // ---- theme ----
  const tt = document.getElementById("theme-toggle");
  if (localStorage.getItem("aiedge-theme") === "dark") { document.documentElement.setAttribute("data-theme", "dark"); tt.textContent = "☀️"; }
  tt.addEventListener("click", () => {
    const dark = document.documentElement.getAttribute("data-theme") === "dark";
    document.documentElement.toggleAttribute("data-theme", !dark);
    if (dark) { document.documentElement.removeAttribute("data-theme"); }
    else { document.documentElement.setAttribute("data-theme", "dark"); }
    tt.textContent = dark ? "🌙" : "☀️";
    localStorage.setItem("aiedge-theme", dark ? "light" : "dark");
  });

  // ---- mobile sidebar ----
  function setSidebar(open){ sidebar.classList.toggle("open", open); scrim.classList.toggle("open", open); }
  document.getElementById("menu-btn").addEventListener("click", () => setSidebar(!sidebar.classList.contains("open")));
  scrim.addEventListener("click", () => setSidebar(false));

  // ---- scroll progress ----
  const bar = document.getElementById("progressbar");
  window.addEventListener("scroll", () => {
    const h = document.documentElement;
    bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100 || 0) + "%";
  });

  // ---- build sidebar grouped by week (weekly entry first within each week) ----
  const weeks = [];
  const byWeek = {};
  ALL.forEach(r => {
    const w = r.week || r.dateLabel;
    if (!byWeek[w]) { byWeek[w] = []; weeks.push(w); }
    byWeek[w].push(r);
  });

  function navItemHTML(r) {
    const typeCls = r.type === "weekly" ? "weekly" : "daily";
    return `<button class="nav-item ${typeCls}" data-id="${r.id}">
        <span class="ni-type ${typeCls}">${r.type === "weekly" ? "Week" : "Day"}</span>
        <span class="ni-title">${navTitle(r)}</span>
      </button>`;
  }
  function navTitle(r) {
    if (r.type === "weekly") return "Weekly summary";
    // e.g. "Friday, May 29, 2026" -> "Fri · May 29"
    const m = r.dateLabel.match(/^(\w{3})\w*,\s*(\w+ \d+)/);
    return m ? `${m[1]} · ${m[2]}` : r.dateLabel;
  }

  function buildNav(filter) {
    nav.innerHTML = "";
    const f = (filter || "").trim().toLowerCase();
    weeks.forEach(w => {
      const items = byWeek[w].filter(r => !f || matches(r, f));
      if (!items.length) return;
      const grp = document.createElement("div");
      grp.className = "week-group";
      grp.innerHTML = `<div class="week-label">${w}</div>` + items.map(navItemHTML).join("");
      nav.appendChild(grp);
    });
    nav.querySelectorAll(".nav-item").forEach(b => b.addEventListener("click", () => {
      show(b.dataset.id); setSidebar(false);
    }));
    markActive();
  }

  function matches(r, f) {
    const hay = (r.title + " " + r.dateLabel + " " + (r.tldr || []).join(" ") +
      " " + JSON.stringify(r.sections || "")).toLowerCase();
    return hay.includes(f);
  }

  searchEl.addEventListener("input", () => buildNav(searchEl.value));

  // ---- rendering a report ----
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

  // Split a section heading like "1 · Model Releases" into number + title so we
  // can give the number an oversized editorial treatment. Falls back gracefully.
  function sectionHead(h) {
    const m = String(h).match(/^\s*(\d+)\s*[·.\-)]\s*(.+)$/);
    if (m) {
      const num = m[1].padStart(2, "0");
      return `<h3 class="numbered"><span class="sec-num">${num}</span><span class="sec-title">${m[2]}</span></h3>`;
    }
    return `<h3><span class="sec-title">${h}</span></h3>`;
  }

  function render(r) {
    const idx = ALL.indexOf(r);
    const newer = ALL[idx - 1], older = ALL[idx + 1];
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

  let current = null;
  function show(id) {
    const r = ALL.find(x => x.id === id) || ALL[0];
    current = r;
    render(r);
    markActive();
    if (location.hash.slice(1) !== r.id) history.replaceState(null, "", "#" + r.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function markActive() {
    nav.querySelectorAll(".nav-item").forEach(b => b.classList.toggle("active", current && b.dataset.id === current.id));
  }

  window.addEventListener("hashchange", () => { const id = location.hash.slice(1); if (id && id !== (current && current.id)) show(id); });

  // ---- init ----
  latestPill.textContent = "Latest: " + ALL[0].dateLabel.replace(/,? 2026$/, "");
  const days = ALL.filter(r => r.type === "daily").length, wks = ALL.filter(r => r.type === "weekly").length;
  countEl.textContent = `${days} daily · ${wks} weekly · ${ALL.length} total`;
  buildNav("");
  show(location.hash.slice(1) || ALL[0].id);
})();
