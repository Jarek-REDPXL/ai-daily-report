# JOB SPEC — news-landscape

The first Content Desk job: durable, oriented cards about the AI landscape for the `news` hub.
Every role reads this AFTER `docs/prompts/desk/00-desk.md` and obeys it where it overrides defaults.

## Targets
- `target_domains`: `["news"]`
- `min_count`: 8 NEW cards (a floor to AIM for on verified material — NOT a quota to pad to; if
  fewer angles survive VERIFY, write the solid ones and say so).

## Source bar
- Reputable outlets (e.g. Reuters, Bloomberg, FT, The Verge, Ars Technica, Stratechery-grade
  analysis) AND, preferably, the PRIMARY announcement: the lab's/company's own blog, model card,
  pricing page, research paper, or official docs.
- Every number must trace to a credible primary or first-party source URL. No generic SEO blogs,
  no aggregators quoting aggregators, no unsourced "industry says" figures. If a widely-repeated
  number has no traceable primary source, drop it or frame the card as an honest trend without it.

## Framing — DURABLE orientation, not breaking news
These cards should still read true and useful weeks from now. Write them as a smart-but-busy
reader's orientation to *where the AI landscape is heading and what to do about it*, not as
day-of headlines. Date claims explicitly ("as of mid-2026, …") so they age honestly. Each card
still ends on a concrete action the reader/operator can take. Honest confidence: most landscape
calls are `emerging`, not `confirmed` — reserve `confirmed` for facts with a hard primary source
(a shipped model, a published price), and use `speculative` for genuine forecasts.

## Candidate angles (research these; cover the ones the baseline shows are open)
1. **The major labs** — the current frontier-model lineup across the big labs (who shipped what,
   roughly when) and what it means for which tool to reach for.
2. **Cost trajectory** — the steep, ongoing fall in per-token / per-task inference cost and what
   that unlocks for builders and small teams.
3. **The shift to agents** — models that take multi-step actions (tool use, browsing, coding) vs.
   single-shot chat, and where that's actually reliable today vs. not.
4. **Compute & infrastructure** — the chip/datacenter/energy constraint shaping who can train and
   serve frontier models, in plain terms.
5. **Open vs. closed** — where capable open-weight models now sit relative to the closed frontier,
   and when each is the right call.
6. **Adoption — agencies & SMBs** — how smaller operators are actually putting AI to work (and the
   common ways it goes wrong), grounded in real reporting.
7. **Capability trajectory** — what genuinely improved recently (reasoning, long context,
   multimodal) vs. what's still hype, with sources.
8. **Safety, retention & regulation** — the governance/safety/data-retention landscape operators
   need to track, and the practical step it implies.

Pick the angles with the strongest verifiable evidence first. Depth over breadth — eight
well-sourced, durable cards beat twelve thin ones.
