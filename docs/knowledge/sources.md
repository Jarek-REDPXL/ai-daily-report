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
| Bloomberg | ai-tooling | 59 | 5 | 2026-06-13 | markets, M&A, funding, infra financing, IPOs | paywalled; cross-check; behind Jun 11 Anthropic $35B TPU deal, Jun 13 Fable-5/Mythos-5 order + Jun 13 SpaceX IPO |
| CNBC | news | 60 | 6 | 2026-06-13 | markets/tech business, sell-offs, earnings, funding, IPOs | solid 2nd source; behind Jun 8 sell-off, Jun 11 chip-rebound/Coinbase, Jun 13 Fable-5/Mythos-5 shutdown + Jun 13 SpaceX record IPO |
| The Information | ai-tooling | 56 | 2 | 2026-06-11 | scoops, deep tech-business, infra deals | paywalled; high signal; behind Jun 11 Anthropic data-center leases scoop |
| Reuters | ai-tooling | 54 | 2 | 2026-06-09 | wire confirmation, policy | good 2nd source; behind EU–Meta WhatsApp order (Jun 9) |
| arXiv | ai-tooling | 55 | 1 | 2026-06-04 | primary research papers | cite specific abstract |
| GitHub releases | ai-tooling | 53 | 1 | 2026-06-04 | shipped tools, open-weight drops | primary source |
| company IR / SEC filings | ai-tooling | 57 | 1 | 2026-06-04 | hard financials, S-1s | authoritative |
| earnings-call transcripts (YouTube) | ai-tooling | 50 | 1 | 2026-06-04 | exec guidance, capex/compute | cite video + timestamp |
| MDN Web Docs | web-design | 61 | 3 | 2026-06-13 | CSS properties/values, Baseline support | primary/authoritative; behind Jun 11 sibling-index()/sibling-count() + Jun 13 ::scroll-marker-group carousel beat |
| Smashing Magazine | web-design | 54 | 2 | 2026-06-11 | frontend technique deep-dives | practitioner, cross-check support %; behind Jun 11 sibling-index math-layouts piece |
| PPC Land | paid | 56 | 4 | 2026-06-13 | ad-platform product/API changes; AI-search/GEO research | good Meta/Google changelog signal; behind Semrush LinkedIn study (Jun 10) + Jun 13 DSA→AI Max Feb-2027 delay |
| Meta Business Help (official) | paid | 56 | 2 | 2026-06-10 | Advantage+ / ads policy / Opportunity Score | primary; Help Center lags real behavior |
| Social Media Today | paid | 53 | 2 | 2026-06-13 | ad-platform + social product changes | behind Jun 10 Meta Opportunity Score + Jun 13 Instagram "Your Algorithm" main-feed beat (social); practitioner news, cross-check |
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
| HubSpot Blog (Marketing) | growth | 55 | 1 | 2026-06-08 | AEO/GEO, content strategy, original research | strong first-party research (State of AEO); behind Jun 8 AEO card |
| Wix Studio (AI Search Lab) | growth | 50 | 1 | 2026-06-08 | AI-citation datasets, AEO research | corroborating dataset; cross-check against HubSpot |
| Chrome for Developers (developer.chrome.com) | web-design | 58 | 2 | 2026-06-13 | Chrome release notes + web-platform explainers | primary/authoritative; behind Jun 9 gap-decorations + Jun 13 CSS-carousel (Overflow 5) cards |
| Ideogram (official blog + GitHub docs) | graphic | 52 | 1 | 2026-06-09 | image-model releases, prompting schema | tool primary; behind Jun 9 Ideogram-4.0 JSON-layout card |
| Omnisend (Help Center + product/blog) | email | 52 | 1 | 2026-06-09 | ESP MCP setup, lifecycle/deliverability how-to | tool primary; behind Jun 9 Omnisend-MCP card |
| TechCrunch | news | 51 | 2 | 2026-06-11 | tech-business, security, funding/M&A, agentic products | non-paywalled; behind Jun 9 MS OSS supply-chain + Jun 11 Coinbase-for-Agents |
| The Hacker News | web-dev | 50 | 1 | 2026-06-09 | CVEs, exploits, supply-chain security | good security signal; cross-check CVSS/patch dates with vendor advisory |
| The Verge | news | 52 | 1 | 2026-06-10 | tech-business, AI policy/product, scoops | non-paywalled; behind Jun 10 Microsoft–Fable-5 restriction |
| TipRanks | news | 49 | 1 | 2026-06-10 | daily markets/ticker moves + the why | useful for intraday direction; treat exact percentages as directional, cross-check |
| LogRocket Blog | web-design | 50 | 1 | 2026-06-11 | frontend/CSS technique deep-dives, JS | practitioner; behind Jun 11 native-CSS-stagger sibling-index piece; cross-check support % |
| InfoQ | ai-tooling | 50 | 1 | 2026-06-11 | dev-tooling/agent product coverage, conf reporting | behind Jun 11 Claude Code /workflows beat (Code with Claude coverage) |
| Ahrefs (Brand Radar) | growth | 50 | 1 | 2026-06-11 | AI-visibility / brand-mention tracking across LLMs | tool primary; behind Jun 11 AI-visibility-check card |
| CoinDesk | news | 50 | 1 | 2026-06-11 | crypto/agentic-payments, fintech product | behind Jun 11 Coinbase-for-Agents; cross-check figures |
| SiliconANGLE | news | 50 | 1 | 2026-06-11 | enterprise tech/AI product launches | non-paywalled; behind Jun 11 Coinbase-for-Agents |
| Motley Fool | news | 49 | 1 | 2026-06-11 | markets context/ticker analysis | directional; useful for the "why" behind a move, cross-check exact figures |
| Vercel (changelog + docs) | web-dev | 53 | 1 | 2026-06-13 | framework/runtime product changes, Workflow/AI Gateway | primary; behind Jun 13 Workflow-SDK-on-Nitro-v3 card |
| workflow-sdk.dev (docs) | web-dev | 50 | 1 | 2026-06-13 | Workflow SDK directives/setup ("use workflow"/"use step") | tool docs; behind Jun 13 durable-workflows card |
| Figma (release notes + Learn) | graphic | 55 | 1 | 2026-06-13 | Figma product releases + how-to (AI, capture, design QA) | primary; behind Jun 13 capture-webpage-to-layers card |
| Litmus | email | 53 | 1 | 2026-06-13 | email design/motion technique, deliverability, client rendering | practitioner authority; behind Jun 13 micro-animation card |
| Ars Technica | news | 50 | 1 | 2026-06-13 | tech-policy/AI deep coverage | non-paywalled; behind Jun 13 Fable-5/Mythos-5 government shutdown |
| Search Engine Land | paid | 50 | 1 | 2026-06-13 | Google Ads/AI + platform product changes | behind Jun 13 DSA→AI Max delay + Instagram "Your Algorithm" main-feed beat (social); practitioner, cross-check |
| Search Engine Journal | paid | 50 | 1 | 2026-06-13 | Google Ads/SEO product changes, AI-search | behind Jun 13 DSA migration-deadline extension; practitioner, cross-check |
| SitePoint | web-design | 50 | 1 | 2026-06-13 | frontend/CSS technique tutorials | behind Jun 13 CSS-carousel beat; practitioner, cross-check support % |
| Engadget | news | 50 | 1 | 2026-06-13 | consumer-tech/AI product + platform changes | behind Jun 13 Instagram "Your Algorithm" beat (social); non-paywalled |
| CNN Business | news | 50 | 1 | 2026-06-13 | markets/business breaking | behind Jun 13 SpaceX record IPO; non-paywalled 2nd source |
| Al Jazeera | news | 49 | 1 | 2026-06-13 | markets/business 2nd source | behind Jun 13 SpaceX IPO; cross-check exact figures |
| The Next Web | news | 49 | 1 | 2026-06-13 | tech/AI policy + product | behind Jun 13 Fable-5/Mythos-5 shutdown coverage; non-paywalled |

<!-- Seed roster began as ai-tooling; web-design/paid/social/graphic rows added as
     those domains started producing. news/growth rows added 2026-06-08 on their
     first beats. email row + Chrome/Ideogram/Omnisend/security rows added 2026-06-09. -->
