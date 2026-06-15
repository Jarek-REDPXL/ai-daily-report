# Digest — CRO & AOV (`cro`)

> Domain scope: conversion-rate optimization and average-order-value — checkout
> & cart UX, friction removal, pricing/anchoring, free-shipping thresholds,
> cross-sell/bundles, social proof, speed-as-revenue, and the testing discipline
> behind all of it. Cross-listed in BOTH the design and development hubs. Shared
> mission + sourcing standard live in [`_house.md`](./_house.md); read that first,
> then this file.

## How to use this file (instructions for each run)
1. **Before writing:** read `_house.md` + the "Active threads" and "Durable
   lessons" below so today's entry advances the story and doesn't repeat. Note
   the standing card library (card-cro-*) so you UPDATE in place, not duplicate.
2. **After writing:** update "Active threads" (add/advance/close), add any genuinely
   new "Durable lesson," and append one "Changelog" line.
3. Keep it under ~150 lines; retire quiet threads into "Durable lessons."

---

## Active threads (ongoing storylines to advance, not repeat)
<!-- one line each: thread → latest state + date. -->
- **The two highest-leverage levers** → CRO: kill the surprise cost (unexpected fees are Baymard's #1 abandonment reason, ~48%; cart abandonment ~70%) — show shipping/tax in the cart (card-cro-show-total-cost-early). AOV: one free-shipping threshold ~15–25% above current AOV + a live progress bar (goal-gradient; orders with free delivery run ~30% larger, ~51% add items to qualify — Capital One Shopping) (card-cro-free-shipping-threshold). These are the odds-on favourites, NOT a substitute for finding the store's own biggest leak. (2026-06-15)
- **2026 is a free-shipping "reset year"** → Deloitte's 2026 Retail Outlook (survey of 330 execs): 67% plan to RAISE their free-shipping threshold to defend margins against carrier + trade-policy cost shocks; average threshold ~$64 and climbing. Re-peg thresholds to current AOV this year rather than leaving last year's number. Watch for a follow-up dataset confirming the median rose YoY. (2026-06-15)

## Durable lessons (the compounding edge — evergreen takeaways we've taught)
<!-- promote a thread's conclusion here once it's a stable, reusable principle. -->
- **There is no universal "one thing" — there's YOUR biggest leak.** Across thousands of stores the data points to surprise costs (CRO) and a missing/reachable free-shipping threshold (AOV), so start there; but the real discipline is funnel analysis (find the step with the biggest drop) before importing anyone's case-study "winner."
- **Mechanism is settled; the number is yours to test.** Goal-gradient (thresholds lift basket size), anchoring (Tversky & Kahneman), social proof (Spiegel ~5-reviews jump), speed→revenue (Deloitte "milliseconds make millions") are well-supported effects. The *size* of the effect on *your* traffic is account-specific — A/B test it, don't copy a percentage.
- **AI is a CRO accelerant, not the play:** use Claude/ChatGPT to audit your checkout against Baymard's principles, compute the optimal threshold from your AOV distribution, and draft cart/progress-bar copy — but verify on your own analytics.
- **Watch the margin, not just AOV/CVR.** A threshold or free-shipping offer that lifts AOV while eroding shipping-cost margin can be a net loss — measure all three together for 3–4 weeks before locking a number.

## Changelog (one line per run — newest first)
<!-- YYYY-MM-DD: … -->
- 2026-06-15: First `cro` deep beat (and first cro.md) — answered the team's open Ask-anything gap ("the best one thing to focus on for CRO and AOV"): CRO = kill the surprise cost (~48% Baymard), AOV = one reachable free-shipping threshold ~15–25% above AOV + progress bar, with the 2026 "reset year" twist (Deloitte: 67% raising thresholds). Updated card-cro-free-shipping-threshold in place (added Capital One + Deloitte sources, AI step, re-peg guidance, cross-link to card-cro-show-total-cost-early). Logged a prediction (median ecommerce free-shipping threshold rises YoY). Sources: Baymard, Capital One Shopping, Deloitte. Note: a rich card-cro-* library already existed (seeded 2026-06-14) — this beat synthesized it rather than duplicating.
