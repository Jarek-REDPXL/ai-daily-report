# Digest — Graphic design & brand (`graphic`)

> Domain scope: visual identity, logos, layout, typography, brand systems and
> assets. Shared mission + sourcing standard live in [`_house.md`](./_house.md);
> read that first, then this file.

## How to use this file (instructions for each run)
1. **Before writing:** read `_house.md` + the "Active threads" and "Durable
   lessons" below so today's entry advances the story and doesn't repeat.
2. **After writing:** update "Active threads" (add/advance/close), add any genuinely
   new "Durable lesson," and append one "Changelog" line.
3. Keep it under ~150 lines; retire quiet threads into "Durable lessons."

---

## Active threads (ongoing storylines to advance, not repeat)
<!-- one line each: thread → latest state + date. None yet — seed on first run. -->
- AI image gen moves from prose prompts → **structured/JSON briefs**: Ideogram 4.0 (open-weight, Jun 3 2026) trained exclusively on JSON captions — typed text layers (~0.97 OCR), per-element bounding boxes (0–1000 grid), 16-hex palette conditioning. Card: card-graphic-ideogram-json-layout. Watch whether other major image models (Firefly, Imagen, Recraft, Midjourney) add explicit layout/bbox/palette controls. (2026-06-09)
- **Pull real-world UI in as editable layers, then riff:** Figma's official Chrome extension (2026-06-11, beta/paid) captures any live webpage to the canvas as real frames/text/images/vectors — deconstruct a competitor's layout/type, recolour to a client palette, jump-start a redesign or Figma Make prototype. Card: card-graphic-figma-capture-layers. Note the team rated card-graphic-color-palette (Khroma) 5★ — reinforce the palette→layout workflow. Watch for the flagged "generate from a capture using design systems" to ship.
- **AI assets that stay editable, not baked:** Recraft V4's Vector models output native, editable SVG (clean Bézier paths) — the only major AI image model doing native SVG rather than raster-to-vector tracing — so AI logos/icons drop into Figma/Illustrator, recolour to brand tokens, and scale from favicon to billboard. Card: card-graphic-recraft-svg-vector (durable play surfaced on a quiet graphic day, 2026-06-14). Watch whether a 2nd major model (Midjourney, Firefly, Imagen, ChatGPT images) ships native vector output.

## Durable lessons (the compounding edge — evergreen takeaways we've taught)
<!-- promote a thread's conclusion here once it's a stable, reusable principle. -->
- **For design output, prompt the model as a structured brief, not a sentence:** declaring copy strings, exact hex palette, and element positions as data is what makes AI image gen repeatable, templatable, and free of garbled in-image text — the difference between a one-off picture and a production pipeline.
- **Demand editable formats from AI, not flat pixels:** an AI logo/icon delivered as a PNG is a dead end — you can't recolour, rescale cleanly, or hand it to a dev. Reach for tools that output native SVG (vector) so the asset stays editable in Figma/Illustrator and becomes a real brand component, not a screenshot.

## Changelog (one line per run — newest first)
<!-- YYYY-MM-DD: … -->
- 2026-06-14: Deep beat (quiet-day durable play) — Recraft V4 Vector outputs native editable SVG logos/icons (drop into Figma, recolour to brand, scale infinitely). Card: card-graphic-recraft-svg-vector; added the "demand editable formats" durable lesson; logged a prediction (2nd major model ships native vector by end-2026). Sources: Recraft, Abduzeedo, MindStudio. Honest note: confirm commercial-use rights per plan; framed as durable technique, not breaking news.
- 2026-06-13: Deep beat — Figma Chrome extension captures any live webpage as editable Figma layers (deconstruct/restyle real UI; beta/paid). Card: card-graphic-figma-capture-layers, cross-linked to the 5★ Khroma palette card (intake reinforcement). Source: Figma release notes + Figma Learn + Chrome Web Store.
- 2026-06-09: First substantive `graphic` beat since 05-26 — Ideogram 4.0 JSON-prompting (declare headline/hex/bbox as data). Card: card-graphic-ideogram-json-layout. Seeded the structured-prompt thread + durable lesson. Source: Ideogram official blog + GitHub schema. Honest caveat: open weights are non-commercial (use web app/API for client work).
