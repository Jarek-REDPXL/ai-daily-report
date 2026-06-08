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
| blog.google | ai-tooling | 58 | 2 | 2026-06-06 | Google/Gemini primary announcements | primary source |
| Anthropic (official) | ai-tooling | 61 | 3 | 2026-06-07 | Claude features, research, policy posts | primary source; "Building effective agents" behind weekly |
| OpenAI (official) | ai-tooling | 59 | 3 | 2026-06-07 | ChatGPT/model releases, memory | primary source |
| Bloomberg | ai-tooling | 55 | 2 | 2026-06-06 | markets, M&A, funding | paywalled; cross-check |
| CNBC | news | 54 | 2 | 2026-06-08 | markets/tech business, sell-offs, earnings | solid 2nd source; behind Jun 8 news beat (Asia AI sell-off + Broadcom) |
| The Information | ai-tooling | 55 | 1 | 2026-06-04 | scoops, deep tech-business | paywalled; high signal |
| Reuters | ai-tooling | 52 | 1 | 2026-06-04 | wire confirmation, policy | good 2nd source |
| arXiv | ai-tooling | 55 | 1 | 2026-06-04 | primary research papers | cite specific abstract |
| GitHub releases | ai-tooling | 53 | 1 | 2026-06-04 | shipped tools, open-weight drops | primary source |
| company IR / SEC filings | ai-tooling | 57 | 1 | 2026-06-04 | hard financials, S-1s | authoritative |
| earnings-call transcripts (YouTube) | ai-tooling | 50 | 1 | 2026-06-04 | exec guidance, capex/compute | cite video + timestamp |
| MDN Web Docs | web-design | 58 | 1 | 2026-06-07 | CSS properties/values, Baseline support | primary/authoritative |
| Smashing Magazine | web-design | 52 | 1 | 2026-06-07 | frontend technique deep-dives | practitioner, cross-check support % |
| PPC Land | paid | 52 | 1 | 2026-06-07 | ad-platform product/API changes | good Meta/Google changelog signal |
| Meta Business Help (official) | paid | 55 | 1 | 2026-06-07 | Advantage+ / ads policy | primary; Help Center lags real behavior |
| Google Ads blog (blog.google/ads) | paid | 55 | 1 | 2026-06-07 | Google Ads/AI Max announcements | primary source |
| Sprout Social | social | 53 | 2 | 2026-06-07 | platform algorithm/ranking guides | refreshed annually; solid baseline; behind weekly keeper |
| Khroma | graphic | 62 | 1 | 2026-06-07 | AI colour palette tool | behind 5★-rated card-graphic-color-palette — keep high |
| Ollama (ollama.com) | ai-tooling | 54 | 2 | 2026-06-07 | run open-weight models locally (free/private) | tool primary; behind Jun 1 daily + weekly keeper |
| Google NotebookLM | ai-tooling | 54 | 2 | 2026-06-07 | grounded, cited Q&A over your own docs | tool primary; behind Jun 4 daily + weekly keeper |
| Artificial Analysis | ai-tooling | 56 | 3 | 2026-06-07 | model price/speed/quality comparison | load-bearing for router/verdict-kit plays |
| Promptfoo | ai-tooling | 53 | 2 | 2026-06-07 | run an eval set across models, diff outputs | behind release-day verdict kit + router |
| OpenRouter | ai-tooling | 52 | 2 | 2026-06-07 | A/B models behind one API | behind two-gate picker + router |
| GitHub Docs (Copilot) | web-dev | 54 | 2 | 2026-06-07 | repo custom-instructions / Copilot config | primary; behind Jun 2 daily + weekly keeper |
| Cloudflare (blog + dev changelog) | web-dev | 55 | 1 | 2026-06-08 | AI Gateway/Workers product + cost-control changes | primary; behind Jun 8 spend-limits card |
| Axios | news | 52 | 1 | 2026-06-08 | funding/valuation, climate & deals desk | good non-paywalled 2nd source; behind Helion figure |
| company newsroom / IR (Helion etc.) | news | 50 | 1 | 2026-06-08 | primary funding/round confirmation | authoritative for the round; cross-check valuation vs press |
| HubSpot Blog (Marketing) | growth | 55 | 1 | 2026-06-08 | AEO/GEO, content strategy, original research | strong first-party research (State of AEO); behind Jun 8 AEO card |
| Wix Studio (AI Search Lab) | growth | 50 | 1 | 2026-06-08 | AI-citation datasets, AEO research | corroborating dataset; cross-check against HubSpot |

<!-- Seed roster began as ai-tooling; web-design/paid/social/graphic rows added as
     those domains started producing. news/growth rows added 2026-06-08 on their
     first beats. Add email row as it earns a beat. -->
