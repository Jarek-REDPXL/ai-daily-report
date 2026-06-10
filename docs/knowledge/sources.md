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
| Anthropic (official) | ai-tooling | 62 | 4 | 2026-06-10 | Claude features, research, policy posts | primary source; Mythos-class retention Help Center behind Jun 10 Fable-5 card |
| OpenAI (official) | ai-tooling | 59 | 3 | 2026-06-07 | ChatGPT/model releases, memory | primary source |
| Bloomberg | ai-tooling | 55 | 2 | 2026-06-06 | markets, M&A, funding | paywalled; cross-check |
| CNBC | news | 56 | 3 | 2026-06-10 | markets/tech business, sell-offs, earnings, funding | solid 2nd source; behind Jun 8 sell-off + Jun 10 Neura $1.4B round |
| The Information | ai-tooling | 55 | 1 | 2026-06-04 | scoops, deep tech-business | paywalled; high signal |
| Reuters | ai-tooling | 54 | 2 | 2026-06-09 | wire confirmation, policy | good 2nd source; behind EU–Meta WhatsApp order (Jun 9) |
| arXiv | ai-tooling | 55 | 1 | 2026-06-04 | primary research papers | cite specific abstract |
| GitHub releases | ai-tooling | 53 | 1 | 2026-06-04 | shipped tools, open-weight drops | primary source |
| company IR / SEC filings | ai-tooling | 57 | 1 | 2026-06-04 | hard financials, S-1s | authoritative |
| earnings-call transcripts (YouTube) | ai-tooling | 50 | 1 | 2026-06-04 | exec guidance, capex/compute | cite video + timestamp |
| MDN Web Docs | web-design | 58 | 1 | 2026-06-07 | CSS properties/values, Baseline support | primary/authoritative |
| Smashing Magazine | web-design | 52 | 1 | 2026-06-07 | frontend technique deep-dives | practitioner, cross-check support % |
| PPC Land | paid | 55 | 3 | 2026-06-10 | ad-platform product/API changes; AI-search/GEO research | good Meta/Google changelog signal; also carried Semrush LinkedIn-citation study (Jun 10) |
| Meta Business Help (official) | paid | 56 | 2 | 2026-06-10 | Advantage+ / ads policy / Opportunity Score | primary; Help Center lags real behavior |
| Social Media Today | paid | 52 | 1 | 2026-06-10 | ad-platform + social product changes | behind Jun 10 Meta Opportunity Score beat; practitioner news, cross-check |
| Semrush (blog/research) | social | 52 | 1 | 2026-06-10 | AI-search/GEO citation studies, SEO data | behind Jun 10 LinkedIn-AI-citations card (89K-URL study); first-party dataset |
| Google Ads blog (blog.google/ads) | paid | 55 | 1 | 2026-06-07 | Google Ads/AI Max announcements | primary source |
| Sprout Social | social | 53 | 2 | 2026-06-07 | platform algorithm/ranking guides | refreshed annually; solid baseline; behind weekly keeper |
| Khroma | graphic | 64 | 1 | 2026-06-07 | AI colour palette tool | behind card-graphic-color-palette — team rated that card 5★ (Jun 10 intake); reinforce, keep high |
| Ollama (ollama.com) | ai-tooling | 54 | 2 | 2026-06-07 | run open-weight models locally (free/private) | tool primary; behind Jun 1 daily + weekly keeper |
| Google NotebookLM | ai-tooling | 54 | 2 | 2026-06-07 | grounded, cited Q&A over your own docs | tool primary; behind Jun 4 daily + weekly keeper |
| Artificial Analysis | ai-tooling | 56 | 3 | 2026-06-07 | model price/speed/quality comparison | load-bearing for router/verdict-kit plays |
| Promptfoo | ai-tooling | 53 | 2 | 2026-06-07 | run an eval set across models, diff outputs | behind release-day verdict kit + router |
| OpenRouter | ai-tooling | 52 | 2 | 2026-06-07 | A/B models behind one API | behind two-gate picker + router |
| GitHub Docs (Copilot) | web-dev | 57 | 3 | 2026-06-10 | repo custom-instructions / Copilot config / CLI LSP setup | primary; behind Jun 2 daily + Jun 10 Copilot-CLI-LSP card |
| GitHub Blog (github.blog) | web-dev | 53 | 1 | 2026-06-10 | Copilot/dev product launches + how-to | primary; behind Jun 10 Copilot CLI language-server card |
| Cloudflare (blog + dev changelog) | web-dev | 55 | 1 | 2026-06-08 | AI Gateway/Workers product + cost-control changes | primary; behind Jun 8 spend-limits card |
| Axios | news | 52 | 1 | 2026-06-08 | funding/valuation, climate & deals desk | good non-paywalled 2nd source; behind Helion figure |
| company newsroom / IR (Helion etc.) | news | 50 | 1 | 2026-06-08 | primary funding/round confirmation | authoritative for the round; cross-check valuation vs press |
| HubSpot Blog (Marketing) | growth | 55 | 1 | 2026-06-08 | AEO/GEO, content strategy, original research | strong first-party research (State of AEO); behind Jun 8 AEO card |
| Wix Studio (AI Search Lab) | growth | 50 | 1 | 2026-06-08 | AI-citation datasets, AEO research | corroborating dataset; cross-check against HubSpot |
| Chrome for Developers (developer.chrome.com) | web-design | 56 | 1 | 2026-06-09 | Chrome release notes + web-platform explainers | primary/authoritative; behind Jun 9 gap-decorations card |
| Ideogram (official blog + GitHub docs) | graphic | 52 | 1 | 2026-06-09 | image-model releases, prompting schema | tool primary; behind Jun 9 Ideogram-4.0 JSON-layout card |
| Omnisend (Help Center + product/blog) | email | 52 | 1 | 2026-06-09 | ESP MCP setup, lifecycle/deliverability how-to | tool primary; behind Jun 9 Omnisend-MCP card |
| TechCrunch | news | 50 | 1 | 2026-06-09 | tech-business, security, funding/M&A | non-paywalled; behind Jun 9 MS OSS supply-chain item |
| The Hacker News | web-dev | 50 | 1 | 2026-06-09 | CVEs, exploits, supply-chain security | good security signal; cross-check CVSS/patch dates with vendor advisory |
| The Verge | news | 52 | 1 | 2026-06-10 | tech-business, AI policy/product, scoops | non-paywalled; behind Jun 10 Microsoft–Fable-5 restriction |
| TipRanks | news | 49 | 1 | 2026-06-10 | daily markets/ticker moves + the why | useful for intraday direction; treat exact percentages as directional, cross-check |

<!-- Seed roster began as ai-tooling; web-design/paid/social/graphic rows added as
     those domains started producing. news/growth rows added 2026-06-08 on their
     first beats. email row + Chrome/Ideogram/Omnisend/security rows added 2026-06-09. -->
