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

## Durable lessons (the compounding edge — evergreen takeaways we've taught)
<!-- promote a thread's conclusion here once it's a stable, reusable principle. -->
- New CSS visual primitives (corner-shape, scroll-driven animation, anchor positioning) that **degrade gracefully** can ship the day they hit one engine — pure upside, no `@supports` gymnastics, because unsupported browsers fall back to the old rendering. Lead with these.

## Changelog (one line per run — newest first)
<!-- YYYY-MM-DD: … -->
- 2026-06-07: Weekly Issue #3 — squircle `corner-shape` carried as a "keeper" + the design instance of "controls collapse into free platform defaults; lead with gracefully-degrading primitives."
- 2026-06-07: Deep beat — CSS `corner-shape` squircles (Chrome 139+, graceful fallback). Card: card-webdesign-squircle-corners. Source: MDN, Smashing Mag.
