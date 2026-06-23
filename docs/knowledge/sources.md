# RedPxl News — Source-Scoring Ledger

> **A self-improving map of where the golden information actually comes from.**
> It makes sourcing compound instead of restarting each run.
>
> **The loop:**
> - **Before researching:** mine the high scorers for your target domain(s) first,
>   AND sample 1–2 new/low-data sources so the roster keeps widening.
> - **After writing:** **promote** (raise score, +1 hit, update `last_useful`) any
>   source that sat behind a *synthesized item* or a *validated prediction*;
>   **decay** (lower score) sources that went stale or didn't pan out.
> - Scores are 0–100, **start at 50**. Rough bands: 70+ = lead with it; 40–69 =
>   useful, cross-check; <40 = on probation / drop. `domain` uses a valid slug
>   from [`DOMAINS.md`](../DOMAINS.md) (or `all` if cross-cutting).
> - Keep every cited source as an exact link in the report itself; this ledger
>   tracks the *source*, not individual URLs.

| source | domain | score | hits | last_useful | good_for | notes |
|--------|--------|-------|------|-------------|----------|-------|
| buildfastwithai | ai-tooling | 55 | 3 | 2026-06-06 | daily roundups, new tools/skills | high-volume; cross-check figures |
| The Neuron | ai-tooling | 52 | 2 | 2026-06-06 | newsletter signal, what's trending | |
| llm-stats.com | ai-tooling | 55 | 2 | 2026-06-06 | model benchmark/price comparison | good for model-router calls |
| digitalapplied tracker | ai-tooling | 50 | 2 | 2026-06-06 | release/figures tracker | figures directional unless confirmed |
| blog.google | ai-tooling | 60 | 3 | 2026-06-09 | Google/Gemini primary announcements | primary source; behind Gemini 3.5 Live Translate (Jun 9) |
| Anthropic (official) | ai-tooling | 66 | 7 | 2026-06-18 | Claude features, research, policy posts | primary source; behind Jun 10 Fable-5 retention, Jun 11 /workflows + Jun 13 Fable-5/Mythos-5 government-suspension statement; reusable-Skills/workflows plays rated 5★, cross-linked from Jun 18 Firefly + n8n cards (PROMOTE per advisory) |
| OpenAI (official) | ai-tooling | 59 | 3 | 2026-06-07 | ChatGPT/model releases, memory | primary source |
| Bloomberg | ai-tooling | 60 | 6 | 2026-06-16 | markets, M&A, funding, infra financing, IPOs | paywalled; cross-check; behind Jun 11 Anthropic $35B TPU deal, Jun 13 Fable-5/Mythos-5 order, Jun 13 SpaceX IPO + Jun 16 Cursor deal / Nvidia $25B bond |
| CNBC | news | 64 | 10 | 2026-06-23 | markets/tech business, sell-offs, earnings, funding, IPOs | solid 2nd source; behind Jun 8 sell-off, Jun 11 chip-rebound, Jun 13 SpaceX IPO, Jun 16 greenshoe, Jun 18 Intel/Apple chip claim (unconfirmed) + Cramer note + Jun 20 Korea chip-bonus inflation read + Jun 23 global tech rout (SpaceX bond/Alphabet exits) |
| The Information | ai-tooling | 56 | 2 | 2026-06-11 | scoops, deep tech-business, infra deals | paywalled; high signal; behind Jun 11 Anthropic data-center leases scoop |
| Reuters | ai-tooling | 58 | 4 | 2026-06-20 | wire confirmation, policy, M&A | good 2nd source; behind EU–Meta WhatsApp order (Jun 9), Jun 16 SpaceX–Anysphere/Cursor $60B + Jun 19 Norway AI-in-schools near-ban |
| arXiv | ai-tooling | 55 | 1 | 2026-06-04 | primary research papers | cite specific abstract |
| GitHub releases | ai-tooling | 53 | 1 | 2026-06-04 | shipped tools, open-weight drops | primary source |
| company IR / SEC filings | ai-tooling | 57 | 1 | 2026-06-04 | hard financials, S-1s | authoritative |
| earnings-call transcripts (YouTube) | ai-tooling | 50 | 1 | 2026-06-04 | exec guidance, capex/compute | cite video + timestamp |
| MDN Web Docs | web-design | 62 | 4 | 2026-06-15 | CSS properties/values, Baseline support | primary/authoritative; behind Jun 11 sibling-index() + Jun 13 carousel + Jun 15 anchor-positioning/Popover overlay-trio beat |
| Smashing Magazine | web-design | 54 | 2 | 2026-06-11 | frontend technique deep-dives | practitioner, cross-check support %; behind Jun 11 sibling-index math-layouts piece |
| PPC Land | paid | 58 | 5 | 2026-06-17 | ad-platform product/API changes; AI-search/GEO research | good Meta/Google changelog signal; behind Semrush LinkedIn study (Jun 10) + Jun 13 DSA→AI Max delay + Jun 17 X Ads Manager GTM/CAPI beat; PROMOTE per advisory |
| Meta Business Help (official) | paid | 56 | 2 | 2026-06-10 | Advantage+ / ads policy / Opportunity Score | primary; Help Center lags real behavior |
| Social Media Today | paid | 58 | 5 | 2026-06-20 | ad-platform + social product changes | behind Jun 10 Meta Opportunity Score, Jun 13 Instagram "Your Algorithm", Jun 17 X Ads Manager GTM/CAPI, Jun 18 Pinterest scan + Jun 20 Meta Edits analytics/AI-restyle beat; PROMOTE per ratings advisory; cross-check |
| Semrush (blog/research) | social | 54 | 2 | 2026-06-11 | AI-search/GEO citation studies, SEO data, AI-visibility tooling | behind Jun 10 LinkedIn-AI-citations card + Jun 11 free AI Search Visibility Checker (growth); first-party dataset |
| Google Ads blog (blog.google/ads) | paid | 55 | 1 | 2026-06-07 | Google Ads/AI Max announcements | primary source |
| Sprout Social | social | 53 | 2 | 2026-06-07 | platform algorithm/ranking guides | refreshed annually; solid baseline; behind weekly keeper |
| Khroma | graphic | 67 | 2 | 2026-06-18 | AI colour palette tool | behind card-graphic-color-palette — team rated 5★ (re-confirmed Jun 13 + Jun 18 intake); reinforced via Figma-capture + Firefly brand-batch card cross-links; keep high |
| Ollama (ollama.com) | ai-tooling | 54 | 2 | 2026-06-07 | run open-weight models locally (free/private) | tool primary; behind Jun 1 daily + weekly keeper |
| Google NotebookLM | ai-tooling | 54 | 2 | 2026-06-07 | grounded, cited Q&A over your own docs | tool primary; behind Jun 4 daily + weekly keeper |
| Artificial Analysis | ai-tooling | 58 | 4 | 2026-06-19 | model price/speed/quality comparison + open-weights index | load-bearing for router/verdict-kit plays; behind Jun 19 GLM-5.2 open-weights-leader beat |
| Promptfoo | ai-tooling | 53 | 2 | 2026-06-07 | run an eval set across models, diff outputs | behind release-day verdict kit + router |
| OpenRouter | ai-tooling | 56 | 4 | 2026-06-19 | A/B models behind one API; model-fallback/failover routing; per-model pricing/specs | behind two-gate picker, router + Jun 13 model-portability card + Jun 19 GLM-5.2 routing/pricing |
| GitHub Docs (Copilot) | web-dev | 57 | 3 | 2026-06-10 | repo custom-instructions / Copilot config / CLI LSP setup | primary; behind Jun 2 daily + Jun 10 Copilot-CLI-LSP card |
| GitHub Blog (github.blog) | web-dev | 53 | 1 | 2026-06-10 | Copilot/dev product launches + how-to | primary; behind Jun 10 Copilot CLI language-server card |
| Cloudflare (blog + dev changelog) | web-dev | 58 | 2 | 2026-06-18 | AI Gateway/Workers product + cost-control + Agents SDK/agent-platform changes | primary; behind Jun 8 spend-limits card + Jun 17 Agents SDK / Flue durable-agent beat |
| Axios | news | 52 | 1 | 2026-06-08 | funding/valuation, climate & deals desk | good non-paywalled 2nd source; behind Helion figure |
| company newsroom / IR (Helion etc.) | news | 50 | 1 | 2026-06-08 | primary funding/round confirmation | authoritative for the round; cross-check valuation vs press |
| HubSpot Blog (Marketing) | growth | 58 | 3 | 2026-06-19 | AEO/GEO, content strategy, schema playbooks, original research | strong first-party research (State of AEO); behind Jun 8 AEO content-formats + Jun 14 schema-for-AEO cards + Jun 19 AEO schema-playbook scan |
| Wix Studio (AI Search Lab) | growth | 50 | 1 | 2026-06-08 | AI-citation datasets, AEO research | corroborating dataset; cross-check against HubSpot |
| Chrome for Developers (developer.chrome.com) | web-design | 61 | 3 | 2026-06-21 | Chrome release notes + web-platform explainers | primary/authoritative; behind Jun 9 gap-decorations + Jun 13 CSS-carousel (Overflow 5) + Jun 21 scroll-triggered animations cards |
| Ideogram (official blog + GitHub docs) | graphic | 52 | 1 | 2026-06-09 | image-model releases, prompting schema | tool primary; behind Jun 9 Ideogram-4.0 JSON-layout card |
| Omnisend (Help Center + product/blog) | email | 52 | 1 | 2026-06-09 | ESP MCP setup, lifecycle/deliverability how-to | tool primary; behind Jun 9 Omnisend-MCP card |
| TechCrunch | news | 57 | 5 | 2026-06-20 | tech-business, security, funding/M&A, agentic products | non-paywalled; behind Jun 9 MS OSS supply-chain, Jun 11 Coinbase-for-Agents, Jun 16 ChatGPT<50% / Cursor, Jun 18 Waymo / Baseten / Snap-Dotmo + Jun 18 Apple Brazil app stores / Elastic–Deductive AI |
| The Hacker News | web-dev | 50 | 1 | 2026-06-09 | CVEs, exploits, supply-chain security | good security signal; cross-check CVSS/patch dates with vendor advisory |
| The Verge | news | 54 | 2 | 2026-06-19 | tech-business, AI policy/product, scoops | non-paywalled; behind Jun 10 Microsoft–Fable-5 restriction + Jun 18 Adobe Firefly AI-assistants-in-apps beta |
| TipRanks | news | 49 | 1 | 2026-06-10 | daily markets/ticker moves + the why | useful for intraday direction; treat exact percentages as directional, cross-check |
| LogRocket Blog | web-design | 50 | 1 | 2026-06-11 | frontend/CSS technique deep-dives, JS | practitioner; behind Jun 11 native-CSS-stagger sibling-index piece; cross-check support % |
| InfoQ | ai-tooling | 51 | 2 | 2026-06-15 | dev-tooling/agent product coverage, conf reporting | behind Jun 11 /workflows beat + Jun 15 HTML invoker-commands Baseline (web-design) |
| Ahrefs (Brand Radar) | growth | 50 | 1 | 2026-06-11 | AI-visibility / brand-mention tracking across LLMs | tool primary; behind Jun 11 AI-visibility-check card |
| CoinDesk | news | 50 | 1 | 2026-06-11 | crypto/agentic-payments, fintech product | behind Jun 11 Coinbase-for-Agents; cross-check figures |
| SiliconANGLE | news | 50 | 1 | 2026-06-11 | enterprise tech/AI product launches | non-paywalled; behind Jun 11 Coinbase-for-Agents |
| Motley Fool | news | 49 | 1 | 2026-06-11 | markets context/ticker analysis | directional; useful for the "why" behind a move, cross-check exact figures |
| Vercel (changelog + docs) | web-dev | 58 | 3 | 2026-06-23 | framework/runtime product changes, Workflow/AI Gateway, Functions WebSockets | primary; behind Jun 13 Workflow-SDK-on-Nitro-v3 card + Jun 16 30-min Functions / inflight-cancellation beat + Jun 23 WebSocket-public-beta realtime beat (changelog + docs + KB) |
| workflow-sdk.dev (docs) | web-dev | 50 | 1 | 2026-06-13 | Workflow SDK directives/setup ("use workflow"/"use step") | tool docs; behind Jun 13 durable-workflows card |
| Figma (release notes + Learn + Dev Mode MCP) | graphic | 60 | 3 | 2026-06-21 | Figma product releases + how-to (AI, capture, MCP design-to-code, Weave AI video) | primary; behind Jun 13 capture-to-layers (graphic) + Jun 16/17 Dev Mode MCP design↔code beat (web-design) + Jun 21 Runway Aleph 2.0 in Weave beat |
| Runway (runwayml.com) | graphic | 50 | 1 | 2026-06-21 | AI video model releases (Aleph 2.0), capabilities/specs | tool primary; behind Jun 21 Runway-Aleph-in-Figma-Weave card; confirm commercial-use + pricing per plan |
| Litmus | email | 56 | 2 | 2026-06-16 | email design/motion technique, deliverability, client rendering | practitioner authority; behind Jun 13 micro-animation card + Jun 16 inbox-placement audit |
| Ars Technica | news | 50 | 1 | 2026-06-13 | tech-policy/AI deep coverage | non-paywalled; behind Jun 13 Fable-5/Mythos-5 government shutdown |
| Search Engine Land | paid | 52 | 2 | 2026-06-20 | Google Ads/AI + platform product changes | behind Jun 13 DSA→AI Max delay, Instagram "Your Algorithm" + Jun 20 Google conversion-based customer-lists auto-enroll/classify beat; practitioner, cross-check |
| Search Engine Journal | paid | 57 | 4 | 2026-06-21 | Google Ads/SEO product changes, AI-search/AEO (Bing Citation Share, llms.txt data) | behind Jun 13 DSA migration-deadline extension + Jun 16 Google bidding-changes + Jun 19 Bing AI Citation Share scan + Jun 21 SEO-Pulse (Citation Share ships / llms.txt doubt) growth beat; practitioner, cross-check |
| Ahrefs (blog/research) | growth | 52 | 1 | 2026-06-21 | first-party AEO/SEO datasets (llms.txt 137k-domain study, AI-citation research) | strong first-party data; behind Jun 21 "97% of llms.txt go unread" growth beat; distinct from the Brand Radar tool row |
| Search Engine Roundtable | paid | 52 | 2 | 2026-06-20 | Google Ads/SEO product-change recaps, search-forum signal | behind Jun 16 Google bidding-changes + Jun 20 conversion-based customer-lists beat; bot-blocks WebFetch — verify via search snippet |
| Google Ads Help (official) | paid | 50 | 1 | 2026-06-20 | official Google Ads feature docs + exact setup/opt-out toggles | primary; behind Jun 20 conversion-based customer-lists toggle (Account settings → Customer match) |
| SitePoint | web-design | 50 | 1 | 2026-06-13 | frontend/CSS technique tutorials | behind Jun 13 CSS-carousel beat; practitioner, cross-check support % |
| Engadget | news | 53 | 3 | 2026-06-23 | consumer-tech/AI product + platform changes | behind Jun 13 Instagram "Your Algorithm" + Jun 19 Norway AI-in-schools / Apple Brazil app-stores corroboration + Jun 23 OpenAI Daybreak (single-source, directional); non-paywalled |
| CNN Business | news | 50 | 1 | 2026-06-13 | markets/business breaking | behind Jun 13 SpaceX record IPO; non-paywalled 2nd source |
| Al Jazeera | news | 49 | 1 | 2026-06-13 | markets/business 2nd source | behind Jun 13 SpaceX IPO; cross-check exact figures |
| The Next Web | news | 49 | 1 | 2026-06-13 | tech/AI policy + product | behind Jun 13 Fable-5/Mythos-5 shutdown coverage; non-paywalled |
| Pyodide (blog + docs) | web-dev | 53 | 1 | 2026-06-14 | Python-in-browser (WebAssembly) releases, micropip/Wasm-wheels how-to | tool primary; behind Jun 14 browser-Python card |
| Simon Willison (simonwillison.net) | web-dev | 54 | 1 | 2026-06-14 | hands-on AI/dev tooling write-ups, primary-source links | high-signal practitioner; behind Jun 14 Pyodide WASM-wheels beat |
| developers.google.com (Search Central) | growth | 52 | 1 | 2026-06-14 | structured-data/schema specs (FAQPage, HowTo) | primary/authoritative; behind Jun 14 schema-for-AEO card |
| AirOps | growth | 50 | 1 | 2026-06-14 | AI-search/AEO research + schema implementation data | first-party dataset (State of AI Search, 2.8× citation stat); cross-check |
| Recraft (recraft.ai) | graphic | 53 | 1 | 2026-06-14 | AI image/vector model — native SVG logos/icons | tool primary; behind Jun 14 editable-SVG card |
| Abduzeedo | graphic | 49 | 1 | 2026-06-14 | design-tool coverage, technique showcases | practitioner; behind Jun 14 Recraft-V4 native-SVG card; cross-check |
| MindStudio (blog) | graphic | 48 | 1 | 2026-06-14 | AI design-tool how-to guides | secondary how-to; behind Jun 14 Recraft SVG card; cross-check |
| Baymard Institute | cro | 60 | 3 | 2026-06-21 | checkout/cart-abandonment research, usability guidelines | authoritative primary research; backs the card-cro-* library (guest-checkout rated 5★) + Jun 15 CRO/AOV beat + Jun 21 threshold-margin beat; PROMOTE per ratings advisory |
| Capital One Shopping (research) | cro | 51 | 2 | 2026-06-21 | ecommerce/free-shipping consumer statistics | aggregated stats; behind Jun 15 + Jun 21 free-shipping-threshold card; cross-check the underlying sources |
| Deloitte (Insights) | cro | 53 | 2 | 2026-06-21 | retail-industry outlook, exec surveys (margins, shipping, pricing) | authoritative survey (2026 Retail Outlook, n=330); behind Jun 15 "reset year" threshold call + Jun 21 margin-method beat |
| web.dev (Baseline/blog) | web-design | 52 | 1 | 2026-06-15 | Baseline status + web-platform monthly explainers | primary/authoritative (Google); behind Jun 15 Popover/anchor-positioning Baseline overlay beat |
| support.claude.com (Help Center) | ai-tooling | 56 | 2 | 2026-06-15 | Claude plan/billing/retention terms, Agent SDK setup | authoritative for plan mechanics; behind Jun 10 Fable-5 retention + Jun 15 Agent SDK billing-split beat; PROMOTE per advisory |
| The New Stack | ai-tooling | 50 | 1 | 2026-06-15 | dev-tooling/agent product + business coverage | non-paywalled; behind Jun 15 Agent SDK billing-split corroboration; cross-check |
| XDA Developers | ai-tooling | 49 | 1 | 2026-06-15 | consumer/dev tech product + AI-tooling coverage | non-paywalled 2nd source; behind Jun 15 Agent SDK billing-split beat |
| Chronos Agency | email | 50 | 1 | 2026-06-16 | deliverability / sender-requirement guides (Gmail/Yahoo/MS) | behind Jun 16 inbox-placement beat (2026 0.10%/0.30% thresholds, rejection codes); practitioner, cross-check |
| Sensor Tower | news | 50 | 1 | 2026-06-16 | app-usage market-share data (AI assistants, apps) | behind Jun 16 ChatGPT<50% reading; app-usage NOT web-traffic — always label the metric; one tracker, directional |
| Yahoo Finance | news | 52 | 2 | 2026-06-23 | markets/wire 2nd source (Reuters syndication), app-tracker writeups, index/ticker moves | behind Jun 16 Cursor + ChatGPT-share corroboration + Jun 23 Kospi-crash primary (loaded page: -8.11%, SK Hynix/Samsung, the why); non-paywalled, cross-check primary |
| Meta Newsroom (about.fb.com) | social | 50 | 1 | 2026-06-16 | Meta/Threads/Instagram primary product + metrics announcements | primary; behind Jun 16 Threads 500M MAU / 'Your Algo'; first-party, cross-check MAU framing |
| Canva (newsroom + connectors) | graphic | 53 | 1 | 2026-06-17 | Canva product/connector launches (Brand Kit in AI assistants: Perplexity/Claude/ChatGPT/Gemini, Magic Layers) | primary; behind Jun 17 Canva-Brand-Kit-AI card; first-party, cross-check rollout/tier gating |
| 9to5Mac | graphic | 50 | 1 | 2026-06-17 | Apple + creative/AI tool product coverage | non-paywalled; behind Jun 17 Canva-Perplexity connector (graphic); cross-check |
| Storyboard18 | graphic | 49 | 1 | 2026-06-17 | brand-marketing + creative-tool launches | 2nd source; behind Jun 17 Canva-Perplexity connector; cross-check |
| Social Samosa | social | 52 | 2 | 2026-06-20 | social/ad-platform product + brand-marketing news | non-paywalled; behind Jun 17 X Ads Manager GTM, Canva-Perplexity connector + Jun 20 Meta Edits analytics/restyle beat; PROMOTE per advisory; cross-check |
| X Business (help/docs) | social | 50 | 1 | 2026-06-17 | X conversion tracking / Pixel + CAPI / Ads Manager setup docs | primary; behind Jun 17 X conversion-tracking card |
| Flue (flueframework.com) | web-dev | 50 | 1 | 2026-06-18 | open-source durable-agent framework (Astro team) — docs, blog, quickstart | tool primary; behind Jun 18 Flue/Cloudflare durable-agent card; beta, pin versions |
| Adobe (blog + Firefly product/help) | graphic | 55 | 2 | 2026-06-19 | Firefly releases, Custom Models, partner models (Nano Banana), Boards/GenStudio + in-app AI-assistant news | primary; behind Jun 18 Firefly brand-batch-creative beat + Jun 18 Firefly-assistant-in-Photoshop/Premiere beta (news scan); note beta/enterprise tiers + credits |
| n8n (site + docs + templates) | growth | 52 | 1 | 2026-06-18 | visual automation + AI Agent node, template gallery, advanced-AI tutorials | tool primary; behind Jun 18 n8n AI-agent-workflows card; docs are source of truth, practitioner posts directional |
| Digital Applied (blog) | cro | 53 | 2 | 2026-06-21 | ecommerce CRO/AOV playbooks (post-purchase upsell, free-shipping margin method) | practitioner; behind Jun 18 post-purchase-upsell + Jun 21 contribution-margin threshold beat (cites Deloitte/Baymard); vendor stats directional, prefer Baymard anchors |
| Growth Suite | cro | 50 | 1 | 2026-06-21 | Shopify AOV/upsell playbooks (free-shipping threshold, mobile vs desktop) | practitioner; behind Jun 21 mobile-vs-desktop threshold split (mobile AOV ~20–30% lower); vendor figures directional |
| AfterSell | cro | 49 | 1 | 2026-06-18 | Shopify post-purchase/checkout upsell tooling + AOV roundups | tool/practitioner; behind Jun 18 post-purchase-upsell card; vendor AOV figures not independently audited — directional |
| nerdy.dev (Adam Argyle) | web-design | 51 | 1 | 2026-06-19 | CSS/web-platform technique posts (live custom props, modern CSS, motion) | high-signal practitioner (ex-Chrome DevRel); behind Jun 19 'Prop For That' beat; primary for the lib |
| CSS-Tricks | web-design | 53 | 2 | 2026-06-21 | frontend/CSS technique articles + editorial | practitioner authority; behind Jun 19 Prop For That + Jun 21 scroll-triggered animations first-look; considered/dropped ariaNotify() (not Baseline); cross-check support |
| utilitybend | web-design | 50 | 1 | 2026-06-21 | frontend/CSS technique posts (modern CSS, motion) | practitioner; independent 3rd source on Jun 21 scroll-triggered animations; cross-check support % |
| apidog (blog) | ai-tooling | 49 | 1 | 2026-06-19 | API/AI-tool setup how-to (Claude Code env, model endpoints) | secondary how-to; behind Jun 19 GLM-5.2 Claude-Code env setup; cross-check exact vars vs official docs |
| CryptoBriefing | ai-tooling | 48 | 1 | 2026-06-19 | AI model/benchmark + crypto-adjacent business coverage | 2nd source; behind Jun 19 GLM-5.2 benchmark/cost corroboration; figures directional |
| emailexpert | email | 50 | 1 | 2026-06-19 | email deliverability/industry news + provider-change coverage | behind Jun 19 Gmail Postmaster Deliverability-analysis beat (lists the 7 verdict codes); cross-check vs Google API ref |
| DMARC Report (dmarcreport.com) | email | 49 | 1 | 2026-06-19 | email auth/deliverability (DMARC/Postmaster) guides | behind Jun 19 Postmaster Deliverability-analysis beat; practitioner, cross-check |
| Suped | email | 51 | 2 | 2026-06-23 | deliverability tooling + Postmaster Tools v2 how-to/access; DMARC tag reference | behind Jun 19 Postmaster v2 access steps + spam bands + Jun 23 DMARCbis tag reference (np / deprecated pct·rf·ri); practitioner |
| Node.js (blog: releases + security) | web-dev | 56 | 1 | 2026-06-19 | Node release notes + security advisories (CVEs, versions, severities) | primary/authoritative; behind Jun 19 HIGH-severity security-patch card |
| IETF / RFC Editor | email | 52 | 1 | 2026-06-23 | email-auth + protocol standards (DMARC/DMARCbis, SPF, DKIM) | authoritative primary; behind Jun 23 RFC 9989 DMARCbis np-tag beat (obsoletes RFC 7489/9091) |
| Validity | email | 50 | 1 | 2026-06-23 | deliverability/auth explainers (DMARCbis, sender reputation), Everest tooling | behind Jun 23 DMARCbis np-tag beat; practitioner/vendor, cross-check vs RFC |
| dmarcwise | email | 49 | 1 | 2026-06-23 | DMARC/DMARCbis implementation guides (np, t=y, DNS Tree Walk) | behind Jun 23 DMARCbis np-tag beat; practitioner, cross-check vs RFC |
| Claude Code Docs (code.claude.com) | ai-tooling | 56 | 1 | 2026-06-23 | Claude Code feature docs (scheduled tasks /loop, /goal, hooks, skills) | primary/authoritative; behind Jun 23 /loop + /goal loop-engineering beat; PROMOTE per ratings advisory (backs rated-5★ Claude-workflows cards) |
| Lenny's Newsletter | ai-tooling | 50 | 1 | 2026-06-23 | practitioner AI-workflow/product essays (loop engineering, Codex/Claude Code how-to) | behind Jun 14 Codex /goal + Jun 23 Claude Code loop-engineering beat; high-signal practitioner, cross-check product specifics vs docs |
| ChatPRD (Claire Vo) | ai-tooling | 49 | 1 | 2026-06-23 | "How I AI" agent-workflow walkthroughs (loop types, Routines/Automations) | behind Jun 23 loop-engineering beat; practitioner, cross-check exact commands vs official docs |
| Korea Times | news | 50 | 1 | 2026-06-23 | Korean markets/business (Kospi, Samsung/SK Hynix, foreign flows) | non-paywalled primary for KR session; behind Jun 23 Kospi-crash close (-9.99%, foreign net-sell ₩5.79T); cross-check intraday vs close |
| EU Council (Consilium) | news | 51 | 1 | 2026-06-23 | EU policy/regulation primary (customs, trade, digital rules) | authoritative primary; behind Jun 23 €3 small-parcel customs duty (live Jul 1 2026) |

<!-- Seed roster began as ai-tooling; web-design/paid/social/graphic rows added as
     those domains started producing. news/growth rows added 2026-06-08 on their
     first beats. email row + Chrome/Ideogram/Omnisend/security rows added 2026-06-09. -->
