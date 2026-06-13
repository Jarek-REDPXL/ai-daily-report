# Digest — News (`news`)

> Domain scope: the AI/tech **landscape** the team operates inside — **markets**
> (index moves + the why, AI-relevant tickers, funding/M&A), **what companies are
> building** (model/product launches, major features, SEC filings = real spend &
> strategy), **what to expect** (forward-looking calls, logged in
> [`../predictions.md`](../predictions.md)), and **the AI space** (regulation, lab
> announcements, the macro narrative). Shared mission + sourcing standard live in
> [`_house.md`](./_house.md); read that first, then this file.
>
> **This is the trust-critical domain.** Markets reporting is where an unverified
> claim does the most damage. Every figure is cross-checked against a 2nd source
> and marked directional if fast-moving; every claim carries its corroboration
> count + confidence label (Confirmed ≥3 sources / Reported 1–2 / Single-source).

## How to use this file (instructions for each run)
1. **Before writing:** read `_house.md` + the "Active threads" and "Durable
   lessons" below so today's entry advances the story and doesn't repeat. Pull the
   harvested `news`/`ai-tooling` signals (markets + EDGAR collectors) first.
2. **After writing:** update "Active threads" (add/advance/close), add any genuinely
   new "Durable lesson," and append one "Changelog" line. Resolve any prediction
   whose window closed.
3. Keep it under ~150 lines; retire quiet threads into "Durable lessons."

---

## Active threads (ongoing storylines to advance, not repeat)
<!-- one line each: thread → latest state + date. None yet — seed on first run. -->
- **AI-trade repricing → V-shape:** Broadcom's soft AI-chip guide (~$16B vs ~$17.2B expected, stock −12%, reported Jun 3) plus higher-for-longer rate worries rotated money OUT of AI names; SOXX fell ~10% on the week of Jun 3–6, Nvidia briefly under $5T, AMD/Intel double-digit drops. **Snapped back early the week of Jun 8** — Intel/Micron up ~+10% intraday on reaffirmed hyperscaler capex (~$750B 2026); the rebound carried through mid-week. The "dip not regime change" call (due ~Jul 20) is now leaning **held**. Read it as a spend-scrutiny repricing, not a thesis break. **Correction (2026-06-13):** the pending-S&P-500 catalyst is **Marvell (MRVL), joining Jun 22** (S&P DJI confirmed Jun 5) — NOT Nvidia, which is a long-standing index member; the Jun-11 note conflated them. (corroborated CNBC/Intellectia/Motley Fool; Marvell date cross-checked Tech Times/Investing.com; intraday % directional) (2026-06-13)
- **The bottleneck is power/memory, not just chips:** even amid the equity sell-off, infra capital kept flooding in — Helion $465M Series G at $15.5B (fusion, Jun 4), PhysicsX $300M Series C at $2.4B, Nvidia–SK Hynix + Nvidia–LG memory/data-center pacts. **Anthropic locked ~$35B** of debt financing (Apollo/Blackstone SPV) to lease Google TPUs across 5 US data centers, with Google payment guarantees + Broadcom residual-value guarantees — labs, hyperscalers and chip designers now financially interlocked. The compute story is becoming an energy + balance-sheet story. (Bloomberg, The Information) (2026-06-11)
- **The agent grew up — autonomy reaches the brokerage:** Coinbase launched **Coinbase for Agents** (Jun 11) — Claude/ChatGPT execute crypto trades + pay for premium research via an MCP server, on the open **x402** rail (AWS/Anthropic/Circle/Near); ships with a sandbox-account option so the agent need not touch primary funds. Agentic-commerce sizing ~$8B 2026 (single projection, directional). The portable lesson is the safety scaffold (scoped sandbox + metered rail + MCP boundary), not crypto trading. (TechCrunch/CNBC/CoinDesk/SiliconANGLE, ≥3) (2026-06-11)
- **Capital rotating into physical AI:** Neura Robotics raised **up to $1.4B** Series C (~$7B valuation; Tether-led, with Nvidia/Amazon/Qualcomm/Bosch/Schaeffler/EIB) — said to be the largest full-stack robotics round; robotics raised $55.8B YTD 2026 (Dealroom). Private money flows toward embodied AI even as public AI equities sell off. (2026-06-10)
- **Frontier-model data governance → now an AVAILABILITY risk:** Anthropic's Claude Fable 5 (public Jun 9, ~80.3% SWE-Bench) launched under a new **30-day data-retention** policy (existing ZDR doesn't apply; Microsoft restricted it internally) — then on **Jun 12 (5:21pm ET) the US government issued an export-control directive** that forced Anthropic to **disable Fable 5 AND Mythos 5 for all customers** (suspension of foreign-national access, impractical to enforce per-user). Anthropic calls it a likely "misunderstanding" rooted in a narrow jailbreak finding (says the capability is widely available incl. GPT-5.5) and is working to restore access; other Claude models unaffected. The thread escalated from "check the retention terms" → "the model itself can be switched off overnight by a third party." Craft payoff: model portability via a gateway (card-ai-tooling-model-portability). Cards: card-ai-tooling-fable5-retention. (Confirmed ≥3: Anthropic, CNBC, Bloomberg, NBC, Fortune, Ars Technica.) Logged a restoration prediction. (2026-06-13)
- **Apple repriced as an AI company — leaning on a rival's model:** at WWDC (Jun 8) Apple unveiled a re-architected Siri/Apple Intelligence reportedly built with Google Gemini, but with no firm ship date → "sell the news," stock ~2% lower Jun 8, drifting ~3% Jun 9 (directional; Gemini detail reported, not Apple-confirmed). Watch for a concrete Siri ship date + whether the Gemini partnership is officially confirmed. (2026-06-09)
- **Regulators force open the AI-distribution chokepoints:** EU ordered Meta to restore free WhatsApp Business API access to rival AI chatbots within 5 working days or face fines up to 10% of global turnover — its first interim antitrust measure in 17 years; Meta will appeal. Watch the appeal + whether this sets precedent for other platform AI-access fights. (2026-06-09)

## Durable lessons (the compounding edge — evergreen takeaways we've taught)
<!-- promote a thread's conclusion here once it's a stable, reusable principle. -->
- Markets coverage earns trust only when it's corroborated and dated — lead with
  what 3+ independent sources agree on; flag single-source numbers as such and
  cross-check any figure before publishing.
- **Report the rotation, not the tick:** intraday index/stock percentages move hour to hour and age badly. The durable, publishable fact is the *direction + the why* (a guidance miss, a rates shift) corroborated across sources — quote exact percentages as directional, dated snapshots.
- **For our team, a markets move is a climate signal, not a trade:** translate it into how clients will scrutinize the AI work we pitch (e.g. a repricing of AI spend → lead with cost-per-outcome and a spend ceiling).

## Changelog (one line per run — newest first)
<!-- YYYY-MM-DD: … -->
- 2026-06-13: Promoted news beat — US government export-control directive (Jun 12 5:21pm ET) forces Anthropic to disable Fable 5 + Mythos 5 for ALL customers (Anthropic: likely "misunderstanding" over a narrow jailbreak; capability widely available incl. GPT-5.5; working to restore). Escalated the frontier-model-governance thread (data-retention → availability risk). Craft payoff card extracted: card-ai-tooling-model-portability (gateway failover). Markets: V-shape held mid-week; corrected the index catalyst to Marvell (S&P 500 Jun 22), not Nvidia. Logged a restoration prediction. Sources: Anthropic, CNBC, Bloomberg, NBC, Fortune, Ars Technica, Tech Times, Intellectia.
- 2026-06-11: Promoted news beat — AI-chip rout snapped back (V-shape: SOXX ~−10% Jun 3–6 → Intel/Micron ~+10% intraday week of Jun 8 on ~$750B hyperscaler capex); Coinbase for Agents launches (Claude/ChatGPT trade + pay via MCP/x402, sandbox option); Anthropic locks ~$35B TPU/data-center financing (Google backstop + Broadcom residual guarantees). Advanced the repricing + compute-moat threads, added the agent-economy thread; "dip not regime change" call now leaning held. No news *card* (landscape = intake; the day's craft diamonds were web-design/ai-tooling/growth). Sources: CNBC, Intellectia, Motley Fool, TechCrunch, CoinDesk, SiliconANGLE, Bloomberg, The Information.
- 2026-06-10: Promoted news beat — AI-chip selloff persists (MU/AMD/NVDA/INTC down Jun 10, rates + geopolitics); Neura Robotics up to $1.4B (capital rotating to physical AI); Claude Fable 5 public but with 30-day retention (ZDR void) → Microsoft restricts internally. Advanced 2 threads + added the Fable-5/data-governance thread; card-ai-tooling-fable5-retention; logged a prediction (Anthropic ZDR carve-out / restriction spreads ~8wk). Sources: TipRanks, Yahoo Finance, CNBC, Tech.eu, The Verge, TechCrunch, Anthropic Help Center, Cybernews.
- 2026-06-09: WWDC "sell the news" — Apple slides ~2–3% on a Gemini-assisted Siri reveal with no ship date (directional); EU forces Meta to reopen WhatsApp to rival AI chatbots (5 working days / 10%-turnover ceiling); Google ships Gemini 3.5 Live Translate. Added two threads (Apple-as-AI-company, regulators-force-open-distribution); logged 2 predictions. No news *card* (landscape = intake; day's diamonds were web-design/graphic/email/web-dev).
- 2026-06-08: First substantive `news` beat — AI-trade repricing (Broadcom-triggered Asia sell-off, Jun 8) + the power/memory funding counter-signal (Helion $465M/$15.5B). Seeded two threads + two durable lessons; logged 2 predictions. No news *card* (markets = intake, not a run-it-today craft play — the day's diamonds were web-dev + growth).
- 2026-06-07: Domain seeded (Phase 1 of the 95+ masterplan). News = markets + what
  companies are building + what to expect + the AI space; its own 5th hub.
