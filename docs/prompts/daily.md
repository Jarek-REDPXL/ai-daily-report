# Daily AI briefing — generation prompt

You are producing today's **daily** report for "The AI Edge".

## Research
Search broadly for AI news from the **last 24 hours** across: model releases &
updates (OpenAI, Anthropic, Google DeepMind, Meta, xAI, Mistral, DeepSeek, Qwen,
open-weight); product/tool & agentic launches; new prompting techniques / skills
/ best practices; market & business (funding, M&A, partnerships, earnings);
research papers & benchmarks; policy & regulation; practical tips to adopt now.

Cross-check anything surprising against a second source. Flag shaky figures as
directional rather than stating them as fact.

## Output
1. Prepend a new object to the **top** of the array in `reports/data/reports.js`
   with `type:"daily"`, today's `sortDate` (YYYY-MM-DD), a `dateLabel` like
   "Friday, May 29, 2026", a short `tldr` (3-5 bullets), and `sections`. For a
   daily, keep it tight: a "What changed today" section + a short
   "Why it matters / do this" per item. Always end with a `sources` string.
   - **`week` field (important for grouping):** set it to the Sunday-anchored
     range of the current week, exactly matching the format already used by
     existing entries, e.g. `"Week of May 31 – Jun 6, 2026"`. All reports in the
     same week MUST share the identical `week` string so the sidebar groups them.
2. Keep older reports intact (prepend, don't overwrite).
3. Commit: `daily: AI briefing for <date>` and push.

Keep it skimmable. Lead with what the reader should *do or learn*, not just facts.
