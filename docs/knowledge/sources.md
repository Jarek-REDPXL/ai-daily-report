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
| Anthropic (official) | ai-tooling | 65 | 6 | 2026-06-13 | Claude features, research, policy posts | primary source; behind Jun 10 Fable-5 retention, Jun 11 /workflows + Jun 13 Fable-5/Mythos-5 government-suspension statement |
| OpenAI (official) | ai-tooling | 59 | 3 | 2026-06-07 | ChatGPT/model releases, memory | primary source |
| Bloomberg | ai-tooling | 60 | 6 | 2026-06-16 | markets, M&A, funding, infra financing, IPOs | paywalled; cross-check; behind Jun 11 Anthropic $35B TPU deal, Jun 13 Fable-5/Mythos-5 order, Jun 13 SpaceX IPO + Jun 16 Cursor deal / Nvidia $25B bond |
| CNBC | news | 61 | 7 | 2026-06-16 | markets/tech business, sell-offs, earnings, funding, IPOs | solid 2nd source; behind Jun 8 sell-off, Jun 11 chip-rebound/Coinbase, Jun 13 Fable-5/Mythos-5 shutdown, Jun 13 SpaceX record IPO + Jun 16 IPO $85.7B greenshoe / Salesforce-Fin |
| The Information | ai-tooling | 56 | 2 | 2026-06-11 | scoops, deep tech-business, infra deals | paywalled; high signal; behind Jun 11 Anthropic data-center leases scoop |
| Reuters | ai-tooling | 54 | 2 | 2026-06-09 | wire confirmation, policy | good 2nd source; behind EU–Meta WhatsApp order (Jun 9) |
| arXiv | ai-tooling | 55 | 1 | 2026-06-04 | primary research papers | cite specific abstract |
| GitHub releases | ai-tooling | 53 | 1 | 2026-06-04 | shipped tools, open-weight drops | primary source |
| company IR / SEC filings | ai-tooling | 57 | 1 | 2026-06-04 | hard financials, S-1s | authoritative |
| earnings-call transcripts (YouTube) | ai-tooling | 50 | 1 | 2026-06-04 | exec guidance, capex/compute | cite video + timestamp |
| MDN Web Docs | web-design | 62 | 4 | 2026-06-15 | CSS properties/values, Baseline support | primary/authoritative; behind Jun 11 sibling-index() + Jun 13 carousel + Jun 15 anchor-positioning/Popover overlay-trio beat |
| Smashing Magazine | web-design | 54 | 2 | 2026-06-11 | frontend technique deep-dives | practitioner, cross-check support %; behind Jun 11 sibling-index math-layouts piece |
| PPC Land | paid | 58 | 5 | 2026-06-17 | ad-platform product/API changes; AI-search/GEO research | good Meta/Google changelog signal; behind Semrush LinkedIn study (Jun 10) + Jun 13 DSA→AI Max delay + Jun 17 X Ads Manager GTM/CAPI beat; PROMOTE per advisory |
| Meta Business Help (official) | paid | 56 | 2 | 2026-06-10 | Advantage+ / ads policy / Opportunity Score | primary; Help Center lags real behavior |
| Social Media Today | paid | 55 | 3 | 2026-06-17 | ad-platform + social product changes | behind Jun 10 Meta Opportunity Score + Jun 13 Instagram "Your Algorithm" + Jun 17 X Ads Manager GTM/CAPI beat (social); PROMOTE per ratings advisory; practitioner news, cross-check |
| Semrush (blog/research) | social | 54 | 2 | 2026-06-11 | AI-search/GEO citation studies, SEO data, AI-visibility tooling | behind Jun 10 LinkedIn-AI-citations card + Jun 11 free AI Search Visibility Checker (growth); first-party dataset |
| Google Ads blog (blog.google/ads) | paid | 55 | 1 | 2026-06-07 | Google Ads/AI Max announcements | primary source |
| Sprout Social | social | 53 | 2 | 2026-06-07 | platform algorithm/ranking guides | refreshed annually; solid baseline; behind weekly keeper |
| Khroma | graphic | 66 | 1 | 2026-06-13 | AI colour palette tool | behind card-graphic-color-palette — team rated 5★ (re-confirmed Jun 13 intake); reinforced via Figma-capture card cross-link; keep high |
| Ollama (ollama.com) | ai-tooling | 54 | 2 | 2026-06-07 | run open-weight models locally (free/private) | tool primary; behind Jun 1 daily + weekly keeper |
| Google NotebookLM | ai-tooling | 54 | 2 | 2026-06-07 | grounded, cited Q&A over your own docs | tool primary; behind Jun 4 daily + weekly keeper |
| Artificial Analysis | ai-tooling | 56 | 3 | 2026-06-07 | model price/speed/quality comparison | load-bearing for router/verdict-kit plays |
| Promptfoo | ai-tooling | 53 | 2 | 2026-06-07 | run an eval set across models, diff outputs | behind release-day verdict kit + router |
| OpenRouter | ai-tooling | 54 | 3 | 2026-06-13 | A/B models behind one API; model-fallback/failover routing | behind two-gate picker, router + Jun 13 model-portability card (models-array fallback) |
| GitHub Docs (Copilot) | web-dev | 57 | 3 | 2026-06-10 | repo custom-instructions / Copilot config / CLI LSP setup | primary; behind Jun 2 daily + Jun 10 Copilot-CLI-LSP card |
| GitHub Blog (github.blog) | web-dev | 53 | 1 | 2026-06-10 | Copilot/dev product launches + how-to | primary; behind Jun 10 Copilot CLI language-server card |
| Cloudflare (blog + dev changelog) | web-dev | 55 | 1 | 2026-06-08 | AI Gateway/Workers product + cost-control changes | primary; behind Jun 8 spend-limits card |
| Axios | news | 52 | 1 | 2026-06-08 | funding/valuation, climate & deals desk | good non-paywalled 2nd source; behind Helion figure |
| company newsroom / IR (Helion etc.) | news | 50 | 1 | 2026-06-08 | primary funding/round confirmation | authoritative for the round; cross-check valuation vs press |
| HubSpot Blog (Marketing) | growth | 57 | 2 | 2026-06-14 | AEO/GEO, content strategy, original research | strong first-party research (State of AEO); behind Jun 8 AEO content-formats + Jun 14 schema-for-AEO cards |
| Wix Studio (AI Search Lab) | growth | 50 | 1 | 2026-06-08 | AI-citation datasets, AEO research | corroborating dataset; cross-check against HubSpot |
| Chrome for Developers (developer.chrome.com) | web-design | 58 | 2 | 2026-06-13 | Chrome release notes + web-platform explainers | primary/authoritative; behind Jun 9 gap-decorations + Jun 13 CSS-carousel (Overflow 5) cards |
| Ideogram (official blog + GitHub docs) | graphic | 52 | 1 | 2026-06-09 | image-model releases, prompting schema | tool primary; behind Jun 9 Ideogram-4.0 JSON-layout card |
| Omnisend (Help Center + product/blog) | email | 52 | 1 | 2026-06-09 | ESP MCP setup, lifecycle/deliverability how-to | tool primary; behind Jun 9 Omnisend-MCP card |
| TechCrunch | news | 53 | 3 | 2026-06-16 | tech-business, security, funding/M&A, agentic products | non-paywalled; behind Jun 9 MS OSS supply-chain, Jun 11 Coinbase-for-Agents + Jun 16 ChatGPT<50% / Cursor / Salesforce-Fin / Threads 500M |
| The Hacker News | web-dev | 50 | 1 | 2026-06-09 | CVEs, exploits, supply-chain security | good security signal; cross-check CVSS/patch dates with vendor advisory |
| The Verge | news | 52 | 1 | 2026-06-10 | tech-business, AI policy/product, scoops | non-paywalled; behind Jun 10 Microsoft–Fable-5 restriction |
| TipRanks | news | 49 | 1 | 2026-06-10 | daily markets/ticker moves + the why | useful for intraday direction; treat exact percentages as directional, cross-check |
| LogRocket Blog | web-design | 50 | 1 | 2026-06-11 | frontend/CSS technique deep-dives, JS | practitioner; behind Jun 11 native-CSS-stagger sibling-index piece; cross-check support % |
| InfoQ | ai-tooling | 51 | 2 | 2026-06-15 | dev-tooling/agent product coverage, conf reporting | behind Jun 11 /workflows beat + Jun 15 HTML invoker-commands Baseline (web-design) |
| Ahrefs (Brand Radar) | growth | 50 | 1 | 2026-06-11 | AI-visibility / brand-mention tracking across LLMs | tool primary; behind Jun 11 AI-visibility-check card |
| CoinDesk | news | 50 | 1 | 2026-06-11 | crypto/agentic-payments, fintech product | behind Jun 11 Coinbase-for-Agents; cross-check figures |
| SiliconANGLE | news | 50 | 1 | 2026-06-11 | enterprise tech/AI product launches | non-paywalled; behind Jun 11 Coinbase-for-Agents |
| Motley Fool | news | 49 | 1 | 2026-06-11 | markets context/ticker analysis | directional; useful for the "why" behind a move, cross-check exact figures |
| Vercel (changelog + docs) | web-dev | 56 | 2 | 2026-06-16 | framework/runtime product changes, Workflow/AI Gateway | primary; behind Jun 13 Workflow-SDK-on-Nitro-v3 card + Jun 16 30-min Functions / inflight-cancellation beat |
| workflow-sdk.dev (docs) | web-dev | 50 | 1 | 2026-06-13 | Workflow SDK directives/setup ("use workflow"/"use step") | tool docs; behind Jun 13 durable-workflows card |
| Figma (release notes + Learn + Dev Mode MCP) | graphic | 58 | 2 | 2026-06-17 | Figma product releases + how-to (AI, capture, MCP design-to-code) | primary; behind Jun 13 capture-to-layers (graphic) + Jun 16/17 Dev Mode MCP design↔code beat (web-design) |
| Litmus | email | 56 | 2 | 2026-06-16 | email design/motion technique, deliverability, client rendering | practitioner authority; behind Jun 13 micro-animation card + Jun 16 inbox-placement audit |
| Ars Technica | news | 50 | 1 | 2026-06-13 | tech-policy/AI deep coverage | non-paywalled; behind Jun 13 Fable-5/Mythos-5 government shutdown |
| Search Engine Land | paid | 50 | 1 | 2026-06-13 | Google Ads/AI + platform product changes | behind Jun 13 DSA→AI Max delay + Instagram "Your Algorithm" main-feed beat (social); practitioner, cross-check |
| Search Engine Journal | paid | 53 | 2 | 2026-06-16 | Google Ads/SEO product changes, AI-search | behind Jun 13 DSA migration-deadline extension + Jun 16 Google bidding-changes + Microsoft Product Explorer beat; practitioner, cross-check |
| Search Engine Roundtable | paid | 50 | 1 | 2026-06-16 | Google Ads/SEO product-change recaps, search-forum signal | behind Jun 16 Google bidding-changes beat (cross-checked SEJ); bot-blocks WebFetch — verify via search snippet |
| SitePoint | web-design | 50 | 1 | 2026-06-13 | frontend/CSS technique tutorials | behind Jun 13 CSS-carousel beat; practitioner, cross-check support % |
| Engadget | news | 50 | 1 | 2026-06-13 | consumer-tech/AI product + platform changes | behind Jun 13 Instagram "Your Algorithm" beat (social); non-paywalled |
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
| Baymard Institute | cro | 58 | 2 | 2026-06-15 | checkout/cart-abandonment research, usability guidelines | authoritative primary research; backs the card-cro-* library (guest-checkout rated 5★) + Jun 15 CRO/AOV beat; PROMOTE per ratings advisory |
| Capital One Shopping (research) | cro | 50 | 1 | 2026-06-15 | ecommerce/free-shipping consumer statistics | aggregated stats; behind Jun 15 free-shipping-threshold card; cross-check the underlying sources |
| Deloitte (Insights) | cro | 52 | 1 | 2026-06-15 | retail-industry outlook, exec surveys (margins, shipping, pricing) | authoritative survey (2026 Retail Outlook, n=330); behind Jun 15 "reset year" threshold call |
| web.dev (Baseline/blog) | web-design | 52 | 1 | 2026-06-15 | Baseline status + web-platform monthly explainers | primary/authoritative (Google); behind Jun 15 Popover/anchor-positioning Baseline overlay beat |
| support.claude.com (Help Center) | ai-tooling | 56 | 2 | 2026-06-15 | Claude plan/billing/retention terms, Agent SDK setup | authoritative for plan mechanics; behind Jun 10 Fable-5 retention + Jun 15 Agent SDK billing-split beat; PROMOTE per advisory |
| The New Stack | ai-tooling | 50 | 1 | 2026-06-15 | dev-tooling/agent product + business coverage | non-paywalled; behind Jun 15 Agent SDK billing-split corroboration; cross-check |
| XDA Developers | ai-tooling | 49 | 1 | 2026-06-15 | consumer/dev tech product + AI-tooling coverage | non-paywalled 2nd source; behind Jun 15 Agent SDK billing-split beat |
| Chronos Agency | email | 50 | 1 | 2026-06-16 | deliverability / sender-requirement guides (Gmail/Yahoo/MS) | behind Jun 16 inbox-placement beat (2026 0.10%/0.30% thresholds, rejection codes); practitioner, cross-check |
| Sensor Tower | news | 50 | 1 | 2026-06-16 | app-usage market-share data (AI assistants, apps) | behind Jun 16 ChatGPT<50% reading; app-usage NOT web-traffic — always label the metric; one tracker, directional |
| Yahoo Finance | news | 50 | 1 | 2026-06-16 | markets/wire 2nd source (Reuters syndication), app-tracker writeups | behind Jun 16 Cursor + ChatGPT-share corroboration; non-paywalled, cross-check primary |
| Meta Newsroom (about.fb.com) | social | 50 | 1 | 2026-06-16 | Meta/Threads/Instagram primary product + metrics announcements | primary; behind Jun 16 Threads 500M MAU / 'Your Algo'; first-party, cross-check MAU framing |
| Canva (newsroom + connectors) | graphic | 53 | 1 | 2026-06-17 | Canva product/connector launches (Brand Kit in AI assistants: Perplexity/Claude/ChatGPT/Gemini, Magic Layers) | primary; behind Jun 17 Canva-Brand-Kit-AI card; first-party, cross-check rollout/tier gating |
| 9to5Mac | graphic | 50 | 1 | 2026-06-17 | Apple + creative/AI tool product coverage | non-paywalled; behind Jun 17 Canva-Perplexity connector (graphic); cross-check |
| Storyboard18 | graphic | 49 | 1 | 2026-06-17 | brand-marketing + creative-tool launches | 2nd source; behind Jun 17 Canva-Perplexity connector; cross-check |
| Social Samosa | social | 50 | 1 | 2026-06-17 | social/ad-platform product + brand-marketing news | non-paywalled; behind Jun 17 X Ads Manager GTM beat + Canva-Perplexity connector; cross-check |
| X Business (help/docs) | social | 50 | 1 | 2026-06-17 | X conversion tracking / Pixel + CAPI / Ads Manager setup docs | primary; behind Jun 17 X conversion-tracking card |

<!-- Seed roster began as ai-tooling; web-design/paid/social/graphic rows added as
     those domains started producing. news/growth rows added 2026-06-08 on their
     first beats. email row + Chrome/Ideogram/Omnisend/security rows added 2026-06-09. -->
