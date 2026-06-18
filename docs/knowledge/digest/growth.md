# Digest — Marketing & growth strategy (`growth`)

> Domain scope: funnels, positioning, analytics, experimentation, GTM and growth
> loops. Shared mission + sourcing standard live in [`_house.md`](./_house.md);
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
- **AEO / answer-engine citations as a discovery channel:** 2026 research (HubSpot State of AEO + Wix Studio AI Search Lab, 1M+ citations) quantified which formats get cited — product/landing 68.5%, blog ~67%, listicles 66%, comparison ~63% (comparison wins ChatGPT specifically). Citations starting to matter more than backlinks for AI visibility. **Measurement half now live (2026-06-11):** AEO is measurable — Semrush free AI Search Visibility Checker (no login, 0–100 score across ChatGPT/SearchGPT/Gemini/Google AI/Perplexity + gap-prompt list), plus continuous tracking in Semrush AI Toolkit / Ahrefs Brand Radar. Loop closed: measure absence → AEO formatting pass → re-measure. Card: card-growth-ai-visibility-check. Watch whether Google folds AEO signals into classic Search and whether AEO tooling consolidates. **Machine-legibility leg added (2026-06-14):** schema markup (JSON-LD) is the third leg — 2026 research (AirOps State of AI Search) found clean-structure + schema pages earn ~2.8× the AI-citation rate, and FAQ schema is on only ~10.5% of AI-cited pages (open lane). `FAQPage`/`HowTo` map to how LLMs extract answers. Card: card-growth-schema-aeo. Caveat: Google scaled back FAQ *rich results* in classic Search (2023) — payoff is AI-answer legibility, not a search snippet. Watch whether schema becomes a default AEO-tool output. (2026-06-14)

- **Marketing-ops automation with n8n (answering a team request):** n8n (free self-host / Cloud) = a visual node builder with a first-class **AI Agent** node (Chat Model + Memory + Tools: web search/HTTP/sub-workflows/your APIs). The 'templates vs custom?' answer: **start from the template gallery** (thousands, incl. 'Build your first AI agent'), customize, build fully custom only when nothing fits. 2026 best practice: start simple (nested if/then = failure points), break big flows into small sub-workflows, prefer chained model calls over a monolith (~30–50% cheaper), never send unmasked PII to third-party models, keep a human-review node on money/customer actions. Card: card-growth-n8n-ai-agent-workflows (tagged growth + ai-tooling). Watch whether a mainstream platform (Zapier/Make) standardizes an equivalent visual AI-Agent node with pluggable tools+memory. (2026-06-18)

## Durable lessons (the compounding edge — evergreen takeaways we've taught)
<!-- promote a thread's conclusion here once it's a stable, reusable principle. -->
- **Automate from a template, then keep flows small:** the fastest path to a working automation is to import a close template and customize it — not build from blank — and the maintainable shape is many small sub-workflows over one fragile all-in-one. For AI agents specifically, chained model calls beat a single monolithic agent on both cost and debuggability.
- **AEO is a formatting pass, not new content:** answer engines lift clean, attributable chunks — so the win is structuring pages you already have (intent-matched title → one-sentence answer up top → list/table → original first-party stat → FAQ schema + last-updated date), starting with high-intent money pages. Original/proprietary data is what gets attributed to *you*.
- **Optimize, then measure, then re-optimize:** treat AEO like any growth loop — a free AI-visibility check tells you which prompts you're absent from; that gap list (not a guess) is the work queue; re-measure to confirm the formatting pass landed mentions. Don't ship AEO advice you can't verify.
- **Make the page machine-legible, not just well-written:** schema markup (JSON-LD) spells out for AI crawlers exactly what a page says and what each Q&A means, removing ambiguity — structured pages get cited markedly more. It's eligibility/legibility, not a guarantee: the page still needs a genuinely good, attributable first-party answer underneath.

## Changelog (one line per run — newest first)
<!-- YYYY-MM-DD: … -->
- 2026-06-18: Deep beat (longest-gone non-web; answers a team learn_next on n8n) — the run-it-today n8n playbook: start from a template, build ONE AI Agent node (Chat Model + Memory + 1–2 Tools), keep flows small, go custom only when nothing fits. Card: card-growth-n8n-ai-agent-workflows; added the "automate from a template, keep flows small" durable lesson; logged a prediction. Sources: n8n (AI Agents, intro tutorial, template gallery, first-agent template).
- 2026-06-14: Deep beat — schema markup (FAQPage JSON-LD) as the machine-legibility leg of AEO (~2.8× citation lift; FAQ schema on only ~10.5% of cited pages). Card: card-growth-schema-aeo; advanced the answer-engine-optimization thread (now optimize → measure → mark-up) + added the "make the page machine-legible" durable lesson; logged a prediction. Sources: AirOps, HubSpot, Google Search Central.
- 2026-06-11: Deep beat — AEO measurement layer (Semrush free AI Search Visibility Checker, no login + Ahrefs Brand Radar / Semrush AI Toolkit) → card-growth-ai-visibility-check; advanced the AEO thread (added measurement half) + the "optimize→measure→re-optimize" durable lesson; resolved the Jun 8 "AEO goes mainstream-measurable" prediction (✅, noting tooling largely predated the call). Sources: Semrush, Ahrefs.
- 2026-06-08: First `growth` beat — AEO content-format research (HubSpot/Wix, 1M+ citations) → card-growth-aeo-content-formats + seeded the AEO-citations thread + the "formatting pass, not new content" durable lesson; logged 1 prediction.
