# Card Expansion — Editorial Spec (RedPxl News)

Mission & standard: read **docs/NORTH-STAR.md** (THE STANDARD + the 10/10 bar) and
**docs/prompts/daily.md** (card schema, voice, card-extraction mechanics) BEFORE writing.
This pass mines the accumulated signal store into NEW durable cards — depth over volume.

Invoked by `.github/workflows/expand-cards.yml` with two parameters:
- **{domain}** — a single craft slug, or `all` (then do EACH of the 8 craft domains in turn).
- **{max_per_domain}** — the CAP of new cards per domain (a ceiling, never a target).

The 8 CRAFT domains (the only valid targets here): `web-design`, `web-dev`, `graphic`,
`email`, `social`, `paid`, `growth`, `ai-tooling`. **Never `news`** — news lives in the
feed and produces 0 cards.

## What to read first
1. `scripts/collectors/signals-digest-full.md` — the deep, clustered, corroborated signal
   threads per craft domain (the raw material). Use the `{domain}` section(s).
2. `reports/data/cards.js` (`window.AI_EDGE_CARDS`) — EVERY existing card. You must not
   duplicate or lightly reword any of these.
3. `docs/NORTH-STAR.md` + `docs/prompts/daily.md` — the bar and the schema.

## The task
For `{domain}` (or each of the 8 craft domains if `all`), author **UP TO {max_per_domain}
NEW cards**, APPENDED to `reports/data/cards.js` (`window.AI_EDGE_CARDS`). Prepend nothing,
overwrite nothing, touch no existing card, report, or the news domain.

## Non-negotiable rules
1. **Clear the 10/10 bar on every card** (NORTH-STAR): plain language a sharp 12-year-old
   follows (every term glossed in the same breath), exactly ONE do-it-today `action`, `why`
   = the stakes in 1–2 plain sentences, `how` = concrete numbered steps with named tools,
   operator voice — but never dumb down the expertise.
2. **Never duplicate.** Search `cards.js` first; if a play (or a light reword of it) already
   exists, do NOT re-create it. Improve-in-place is a daily-routine job, not this pass.
3. **Do NOT pad to the number.** {max_per_domain} is a ceiling. If the signals only support
   fewer genuinely golden, run-it-today plays, write fewer — and say so in your summary.
   Depth over volume, always.
4. **Real http(s) sources only** — every card needs >=1 real working link drawn from the
   signal thread (or verified by web search). NEVER invent a link.
5. **Corroboration discipline.** Lead with Confirmed/Reported threads. For a claim card set
   `corroboration_count` to the number of INDEPENDENT sources you actually cite (the gate
   caps it at your distinct source hostnames). A single-source thread is a lead to verify,
   not a fact to publish.
6. **Valid card schema** so `scripts/check_reports.py` passes — exactly as in daily.md:
   `{ id (stable slug), domains:[>=1 craft slug], title, summary, action (REQUIRED),
   why, how:[steps], confidence:"confirmed|emerging|speculative", status:"active|superseded",
   supersedes:[ids], related:[ids], sources:[{label?, url}], tags:[...], created, updated }`.
   Set `created` and `updated` to today (UTC). Stable, unique `id` (e.g. `card-<domain>-<slug>`);
   `supersedes`/`related` must reference existing card ids only.

## CI overrides (only these differ from daily.md's closing steps)
- Do NOT run `scripts/check_reports.py` yourself — a later workflow step runs the gate
  (it regenerates derived files and validates both reports.js and cards.js).
- Do NOT `git commit` or `git push` — a later workflow step does that.

## Report back
End with a short summary: per domain, how many NEW cards you wrote (and, where you wrote
fewer than {max_per_domain}, one line on why the signals didn't support more).
