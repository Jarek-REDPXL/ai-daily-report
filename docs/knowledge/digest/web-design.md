# Digest — Web design (`web-design`)

> Domain scope: UI/UX, frontend craft, layout, interaction & motion, accessibility,
> design systems for the web. Shared mission + sourcing standard live in
> [`_house.md`](./_house.md); read that first, then this file.

## How to use this file (instructions for each run)
1. **Before writing:** read `_house.md` + the "Active threads" and "Durable
   lessons" below so today's entry advances the story and doesn't repeat.
2. **After writing:** update "Active threads" (add/advance/close), add any genuinely
   new "Durable lesson," and append one "Changelog" line.
3. Keep it under ~150 lines; retire quiet threads into "Durable lessons."

---

## Active threads (ongoing storylines to advance, not repeat)
<!-- one line each: thread → latest state + date. None yet — seed on first run. -->
- CSS `corner-shape` / `superellipse()` (squircles) → shipped Chromium (Chrome 139+, ~67% users May 2026), Safari/Firefox not yet; usable today as progressive enhancement (2026-06-07). Watch for Safari/Firefox support → Baseline.
- CSS Gap Decorations (`column-rule` extended to Grid/Flex + new `row-rule`) → shipped Chrome/Edge 149 stable (2026-06-02), default-on; decorative-only so pure progressive enhancement (empty gap where unsupported). Chromium-only; polyfill reportedly in development. Card: card-webdesign-gap-decorations. Watch for Safari/Firefox → Baseline. (2026-06-09)
- CSS `sibling-index()` / `sibling-count()` (element reads its own position + total) → stable Chromium (Chrome/Edge 137+); native staggered reveals, center-out cascades, per-item math in pure `calc()` — no `:nth-child()` stacks, no JS `--i` loop. Degrades to "no stagger" so progressive enhancement. Firefox in active dev, Safari/WebKit roadmap-not-shipped. Card: card-webdesign-sibling-index (modern-CSS-primitives thread). Watch for 2nd engine → Baseline. (2026-06-11)
- CSS Overflow 5 carousel primitives (`::scroll-button()`, `::scroll-marker`/`scroll-marker-group`, `:target-current`) → stable Chromium (Chrome/Edge 135+); a full accessible carousel (prev/next + dot nav) in pure CSS on a scroll-snap container, browser supplies tablist roles/keyboard/focus. Degrades to a plain scrollable scroll-snap strip in Firefox/Safari (not yet shipped, not Baseline) → pure progressive enhancement. Card: card-webdesign-css-carousel (modern-CSS-primitives thread). Watch for 2nd engine → Baseline. (2026-06-13)
- Native overlay trio = the **Baseline** branch of modern-CSS-primitives → Popover API (Baseline 2025) + invoker commands `command`/`commandfor` (Baseline after Safari 26.2, early 2026) + CSS anchor positioning `anchor-name`/`position-anchor`/`position-area`/`position-try-fallbacks` (Baseline after Firefox 147, Jan 2026). Together they replace a JS positioning library (Floating UI/Popper) + toggle JS for tooltips/dropdowns/menus — and because Baseline (Chrome/Edge/Safari/Firefox) you can DROP the dependency, not just progressively enhance. Card: card-webdesign-anchor-positioning-menus. Distinct from the Chromium-only primitives above. (2026-06-15)

## Durable lessons (the compounding edge — evergreen takeaways we've taught)
<!-- promote a thread's conclusion here once it's a stable, reusable principle. -->
- New CSS visual primitives (corner-shape, scroll-driven animation, anchor positioning) that **degrade gracefully** can ship the day they hit one engine — pure upside, no `@supports` gymnastics, because unsupported browsers fall back to the old rendering. Lead with these.
- **Baseline vs Chromium-only is the deploy decision, not the existence of the feature.** A *Chromium-only* primitive (carousel, sibling-index) ships today only as decorative progressive enhancement. A *Baseline* one (popover + invoker commands + anchor positioning) can **replace a JS dependency outright** for all users — flag which branch a feature is on before recommending "ship it."

## Changelog (one line per run — newest first)
<!-- YYYY-MM-DD: … -->
- 2026-06-15: Deep beat (web flagship, design half) — the native overlay trio (Popover API + invoker commands + CSS anchor positioning) is now Baseline cross-browser → delete Floating-UI/Popper + toggle JS for tooltips/dropdowns/menus. Card: card-webdesign-anchor-positioning-menus (Baseline branch of thread-modern-css-primitives). Sources: MDN, web.dev, InfoQ. Logged a prediction (a major UI library documents/ships a pure-CSS anchor mode).
- 2026-06-13 (Late Edition): Deep beat — CSS Overflow 5 carousel primitives (`::scroll-button()`/`::scroll-marker`/`scroll-marker-group`/`:target-current`, stable Chrome/Edge 135+): a full accessible carousel with no JS library and no a11y debt; degrades to a plain scroll-snap strip. Card: card-webdesign-css-carousel; joins `thread-modern-css-primitives`. Sources: Chrome for Developers, MDN, SitePoint. Logged a Baseline prediction (2nd engine ships).
- 2026-06-11: Deep beat — CSS `sibling-index()`/`sibling-count()` (stable Chromium, Chrome/Edge 137+): native list-staggering + math layouts without JS or inline styles. Card: card-webdesign-sibling-index; joins `thread-modern-css-primitives` (squircles, view-transitions, gap-decorations). Sources: MDN, Smashing Magazine, LogRocket. Logged a Baseline prediction (2nd engine ships).
- 2026-06-09: Deep beat — CSS Gap Decorations (`column-rule`/`row-rule` in Grid/Flex, Chrome 149 stable Jun 2). Card: card-webdesign-gap-decorations; joins the `thread-modern-css-primitives` storyline (squircles, view-transitions). Source: Chrome for Developers. Logged a Baseline prediction.
- 2026-06-07: Weekly Issue #3 — squircle `corner-shape` carried as a "keeper" + the design instance of "controls collapse into free platform defaults; lead with gracefully-degrading primitives."
- 2026-06-07: Deep beat — CSS `corner-shape` squircles (Chrome 139+, graceful fallback). Card: card-webdesign-squircle-corners. Source: MDN, Smashing Mag.
