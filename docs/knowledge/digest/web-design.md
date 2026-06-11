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

## Durable lessons (the compounding edge — evergreen takeaways we've taught)
<!-- promote a thread's conclusion here once it's a stable, reusable principle. -->
- New CSS visual primitives (corner-shape, scroll-driven animation, anchor positioning) that **degrade gracefully** can ship the day they hit one engine — pure upside, no `@supports` gymnastics, because unsupported browsers fall back to the old rendering. Lead with these.

## Changelog (one line per run — newest first)
<!-- YYYY-MM-DD: … -->
- 2026-06-11: Deep beat — CSS `sibling-index()`/`sibling-count()` (stable Chromium, Chrome/Edge 137+): native list-staggering + math layouts without JS or inline styles. Card: card-webdesign-sibling-index; joins `thread-modern-css-primitives` (squircles, view-transitions, gap-decorations). Sources: MDN, Smashing Magazine, LogRocket. Logged a Baseline prediction (2nd engine ships).
- 2026-06-09: Deep beat — CSS Gap Decorations (`column-rule`/`row-rule` in Grid/Flex, Chrome 149 stable Jun 2). Card: card-webdesign-gap-decorations; joins the `thread-modern-css-primitives` storyline (squircles, view-transitions). Source: Chrome for Developers. Logged a Baseline prediction.
- 2026-06-07: Weekly Issue #3 — squircle `corner-shape` carried as a "keeper" + the design instance of "controls collapse into free platform defaults; lead with gracefully-degrading primitives."
- 2026-06-07: Deep beat — CSS `corner-shape` squircles (Chrome 139+, graceful fallback). Card: card-webdesign-squircle-corners. Source: MDN, Smashing Mag.
