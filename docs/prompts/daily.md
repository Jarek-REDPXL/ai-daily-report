# Daily Briefing — Editorial Spec (RedPxl News)

Mission & standard: see docs/NORTH-STAR.md — read before writing.

## Mission
Compounding intelligence edge for the RedPxl team across our disciplines — using AI to stay ahead of everyone in our fields. This is a knowledge base, not a news feed: golden, usable judgment that compounds, never raw headlines. Shared standards live in docs/knowledge/digest/_house.md.

## Read team input FIRST (every run — but FAIL-SOFT, never blocks the run)
The team writes back — feedback (share / ask / learn_next) and per-card/report ratings. Try to read it before researching and let it steer the run, BUT the daily report is the priority: team input is an enhancement on top, never a precondition.
- **Attempt ONCE:** `GET /api/intake` with `Authorization: Bearer <CRON_SECRET>` — the CRON_SECRET the routine already holds (same secret as the sync cron). NEVER write the literal secret into this file or any repo file.
- **On ANY failure** (auth, network, endpoint down, bad/empty response): do NOT retry, do NOT abort. Log one line that input couldn't be read and **proceed with the normal briefing exactly as if there were no feedback.** Never let this step delay or stop the daily report.
- **If input WAS read:** prioritise requests — any `ask` / `learn_next` topics become first-class research targets for today's deep beats (cover them as run-it-today plays; the `learn_next` queue also collects questions the Ask box couldn't answer — those are pure demand signals, research them). Fold in the rating signal — highly-rated cards/sources → trust and reinforce (resurface, build on, keep their sources high in sources.md); low-rated ones → reconsider. Fold in the **outcomes** (`shipped`/`worked`/`didnt`) the intake returns — cards the team actually shipped or that worked are proven winners (reinforce, build the next play on them); `didnt` outcomes mean revisit or supersede the card.
- **Close the loop (best-effort):** if you acted on new items, `POST /api/intake` with `{ "ids": [...] }` (same Bearer auth) to mark them `reviewed` so they aren't re-processed. This too is fail-soft — a failed mark-reviewed must never block or fail the run; just continue.
- **Also read the persisted demand backlog:** `scripts/collectors/gaps-digest.md` (if present). CI rebuilds it each run directly from the DB — unmatched Ask-anything questions (`ask_no_match`) + low-rated cards/reports (`low_rating`), highest-weight first — so it carries the team's demand **even if the `/api/intake` read above failed**. Treat its open gaps as first-class research targets; when today's deep beats cover one, say so. Fail-soft: if the file is missing or empty, research the normal cadence.

## Read harvested signals FIRST (the ingestion funnel — breadth in, filter before synthesis)
Before this step runs, `scripts/collectors/ingest.py` harvests hundreds of items from the curated registry (RSS, Hacker News, arXiv, GitHub, Product Hunt, markets/EDGAR, YouTube transcripts), then `cluster.py` groups near-duplicate stories and ranks them by corroboration. **Read `scripts/collectors/clusters-digest.md` FIRST** (ranked, corroborated clusters); if it's absent, read `harvest-digest.md` (the unclustered shortlist). Either way, before any web search. (`harvest.json` holds the full set if you need it.)
- The harvest is BREADTH; your job is the FILTER. Skim it, pick the few leads per deep-beat domain that are genuinely real, corroborated, and matter to our crafts — then web-search those to go deeper and verify.
- Corroboration = trust, and the cluster digest scores it for you: **Confirmed (≥3 independent sources) / Reported (2) / Single-source (1)**. Lead with Confirmed; a Single-source item is a lead to verify, not a fact to publish. When a card makes a corroborated claim, set its `corroboration_count` to the number of independent sources you actually cite (the gate checks it can't exceed your distinct source domains).
- This is an ENHANCEMENT, fail-soft: if `harvest-digest.md` is missing or thin, do NOT abort — research normally via web search. Never let ingestion block the run.

## Domains (canonical — scripts/domains.js / docs/DOMAINS.md)
web-design (FLAGSHIP), web-dev (FLAGSHIP), graphic, email, social, paid, growth, ai-tooling, news.
(Web is the flagship craft, split into the design and dev halves — see the cadence below.)
`news` = the landscape we operate in: markets (index moves + the why, AI-relevant tickers, funding/M&A), what companies are building (launches, model releases, SEC filings), what to expect (forward calls logged in predictions.md), and the AI space (regulation, lab announcements). Trust-critical: cross-check every figure against a 2nd source, mark fast-moving numbers directional.
Paid platform granularity is BLOCK-level tags, not domains: google-ads, meta-ads, snap-ads.

## Daily cadence — breadth without dilution
- SCAN all 9 domains every run: one tight line each, surfaced ONLY if something genuinely moved. Per-domain silence is allowed; never skip the whole run.
- DEEP-BEAT exactly 3 domains:
  1. EXACTLY ONE web slug — the least-recently-covered of {`web-design`, `web-dev`}. Web is the flagship craft and gets a beat EVERY day; the two halves ALTERNATE (so if today is web-dev, tomorrow leans web-design). A single item that genuinely serves both can be tagged with both, but still only "spends" the one guaranteed web slot.
  2. The 2 NON-web domains gone longest without a deep beat. Determine by scanning the `domains` arrays of the last ~10 reports and picking the 2 least-recently-present non-web domains (treat web-design + web-dev as the web pair, excluded here). Self-balances even if a day was missed.
  - PROMOTE: if a scan surfaces something genuinely actionable in an unscheduled domain, cover it properly and add it to today's deep set.
- A deep beat = real research + golden block(s): what changed, why it matters to this discipline, the technique/do-it, exact link(s); plus any new prediction and a digest update for that domain.
- The report's `domains` array = every domain that earned a SUBSTANTIVE block today (valid slugs incl. `web-design`/`web-dev`). One-line scans that surfaced nothing do NOT earn a tag.

## Card extraction (the compounding library — the real product)
Cards are the point of this system (see docs/NORTH-STAR.md). The daily is just the INTAKE; the LIBRARY of cards is what makes the team faster. On every deep beat, ask: "is there a play here a teammate could RUN TODAY?" If yes, capture it as a card in `reports/data/cards.js` (`window.AI_EDGE_CARDS`).

**THE BAR for a card (non-negotiable — kill 95%):**
- A card is a **PRACTICAL, AI-POWERED, RUN-IT-TODAY play for a craft** — advanced but non-technical, step-by-step with **exact tools / prompts / clicks** and a clear payoff.
- **Voice = a sharp operator sharing a trick with a POV** — never news, specs, or encyclopedia. Title = an action ("Test 9 font pairings in 30 seconds with ChatGPT"), not an event ("Chrome ships X").
- Frame as **"a fast way,"** not "the best / the trending" — no unbacked superlatives.
- **Every card has >=1 REAL working source/tool link.** If you cannot verify a real URL, DROP the item — NEVER fabricate a link (gate-enforced).
- Leaner beats padded. If it isn't runnable today, it's not a card.

**THE 10/10 BAR — every card, every day, satisfies ALL of these (this raises clarity/depth/grounding; it does NOT change the schema/format/mechanics specified below — same fields, enums, >=1 real source):**
- **Voice (one line):** explain a pro move to a smart 12-year-old — plain words, short sentences, every term glossed in the same breath, always end on the exact thing to do — but NEVER dumb down the expertise. Simple words, expert substance.
1. **Plain-language** — a sharp 12-year-old can follow it. Short sentences. No jargon without a plain-words gloss in the same breath. Concrete over abstract. Simple words, expert substance — never water down the actual play.
2. **One unmistakable action** — the `action` field is a single do-it-today instruction.
3. **Grounded, zero hallucination** — every claim traces to a real source on the card; >=1 working http(s) source; never invent impressive-sounding "facts."
4. **`why` = the stakes** — 1–2 plain sentences on why this matters to the operator now.
5. **`how` = concrete numbered steps** with named tools/examples.
6. **Operator voice** — direct, practical, "here's the play," no fluff, no hype.
7. **Depth over volume** — only genuinely golden, corroborated items; never pad to a number.

**Worked example — this is the bar:**
> **Title:** Test 9 font pairings in 30 seconds with ChatGPT
> **Why:** stop hand-mocking type — see nine credible directions instantly.
> **How:** 1) open ChatGPT's image generator; 2) prompt "Create a 3x3 grid of 9 different font-pairing examples (heading + body) for a [brand vibe] brand, labeling each pair's font names"; 3) screenshot the 2-3 that fit, regenerate variations; 4) confirm the fonts are licensed before use.
> **Source:** chatgpt.com

**Mechanics:**
- **One canonical card per play. Update in place, never duplicate.** Before creating, search cards.js for an existing card on the same play. If it exists, UPDATE it: bump `updated`, adjust `confidence` (speculative → emerging → confirmed), add the new real source, refine `how`/`why`. Else CREATE one.
- If a new play REPLACES an older one, set the old card's `status:"superseded"` and list its id in the new card's `supersedes:[...]`; cross-link peers via `related:[...]`.
- Card shape (gate-validated): `{ id (stable slug), domains:[≥1 valid slug], title, summary, action (REQUIRED one-line "do this now"), why, how:[steps], confidence:"confirmed|emerging|speculative" (play maturity), corroboration_count (OPTIONAL int on claim cards — # independent sources; gate enforces ≤ distinct source domains), thread_id (OPTIONAL slug — the storyline this advances), status:"active|superseded", supersedes:[ids], related:[ids], sources:[{label?, url}], tags:[...], created, updated }`.
- **`action` is required** — the single concrete next step a teammate runs (distinct from the multi-step `how`). No card without a "do this."
- For **news/claim cards**, set `corroboration_count` to the number of INDEPENDENT sources you actually cite (from the cluster digest) and include that many real `sources`. Use `thread_id` to link cards that advance one ongoing story.
- **`sources` is a STRUCTURED array of `{label, url}` REAL links** (url required, http(s)) — NEVER markdown or an HTML string. The card view renders clickable anchors. (Report `sources` stay HTML strings — different field.)
- Cards do NOT replace the daily entry — write both when a deep beat yields a play.

## What the deep beats hunt now (the shift)
Hunt for **runnable plays**, not events. Each deep beat should be scanning for: a **new AI tool/feature/skill** the team could use today, a **trending technique** worth stealing, or a **clever workflow** for the craft — and turning it into a recipe with exact steps + a real link. Good leads sound like: "a new Claude skill that's burning results — here's how to run it," "the new way to make realistic AI video ads — the exact tools + steps," "a faster way to X in Figma/Ads Manager/your ESP." The test for what survives: **can a teammate run it today?** If it's just "a thing happened," it's intake at most — it does not become a card.

## Sourcing (non-negotiable)
1. EVERY source is an exact clickable link. No bare-text sources. If you can't link it, don't cite it — never fabricate links.
2. Source widely, per domain:
   - web-design: UI/UX patterns, interaction & motion, accessibility, type/layout, design-system + frontend-craft sources, showcases for TECHNIQUE.
   - web-dev: framework release notes, GitHub releases/changelogs, RFCs, spec/MDN/Baseline updates, performance & architecture, strong conf/YouTube deep-dives, practitioner blogs.
   - graphic: Adobe/Figma + other tool releases, design-system/type/brand sources, showcases for TECHNIQUE not just visuals.
   - email: ESP changelogs (Klaviyo et al.), deliverability/auth (DMARC/BIMI), lifecycle & retention case studies with real numbers.
   - social: platform product/algorithm changes, new formats, credible creator-economy analysis.
   - paid: official Google Ads / Meta / Snap changelogs, measurement/privacy shifts, practitioner communities — tag each block with its platform.
   - growth: CRO, GA4/measurement, positioning/copy, pricing & funnel case studies.
   - ai-tooling: new models/agents/capabilities, prompting techniques, new skills & ways of working — judged by usefulness to the disciplines above.
   - Across all: YouTube transcripts and credible social posts are in-scope when they're the primary source.

## Source-scoring loop (learn where the diamonds are)
- BEFORE researching each deep domain: read docs/knowledge/sources.md. Mine that domain's high-scoring sources first; also sample 1–2 lower-scored or brand-new sources for discovery.
- AFTER writing: update sources.md — bump (+) sources behind anything that made today's cut, add new ones at score 50, decay (−) stale/noisy ones, refresh last_useful.
- ALSO read `scripts/collectors/sources-suggestions.md` if present (auto-generated from team ratings + card corroboration): PROMOTE the sources it lists (they back highly-rated/corroborated cards), RECONSIDER the ones it flags. This automates the rating→source-trust signal; apply it as you update sources.md.
- This is load-bearing: it's how the system learns its best sources over time.

## Self-learning loop
- BEFORE: read digest/_house.md, the per-domain digests for today's deep domains, predictions.md (entries tagged for today's domains + any now resolvable), and sources.md.
- AFTER: update the per-domain digest(s) for the deep domains (advance/retire threads, add durable lessons, append a dated changelog line); resolve predictions whose window closed (✅/❌/⚖️); log new falsifiable calls with due windows and the source behind them; update sources.md.

## The bar: golden value, kill 95%
Publish only what clears all three: (1) what changed, (2) why it matters to THIS discipline / our work, (3) the technique / do-it / link. "A thing happened" gets cut. Teach concepts the team can use Monday. A quiet day is a short, sharp briefing — never padding.

## NO EMPTY DAYS (the twin of kill-95%)
Kill-95% sets the ceiling; this sets the floor. **Every run must surface at least one genuinely useful, run-it-today play** — at least one real card-worthy diamond. If the obvious sources are quiet, **WIDEN THE NET** instead of giving up: YouTube transcripts (talks, demos, tutorials), practitioner communities (Reddit, Discord, HN, niche Slacks), changelogs, newsletters, indie tools, niche blogs — keep hunting until you find a real play with a real working link. **Quiet is never empty.** Never pad with junk to fill space (that fails kill-95%), but never stop at "nothing today" either — the diamond is always out there; go deeper to find it.

## Web flagship — the quality standard (worked example)
Web is the flagship craft, split into the **web-design** and **web-dev** halves (it gets a beat every day, alternating focus). A model web block, domains include `web-dev` (and `web-design` when the design payoff is real): sub = "Chrome ships cross-document View Transitions". What changed: native page-to-page transitions without a JS framework. Why it matters: client sites get app-like polish with near-zero bundle cost — a real differentiator on builds we ship. Do-it: opt in with the view-transition CSS + a one-line meta; start on a hero-to-detail navigation; link the exact spec/release note. This depth and "so-what-for-us" framing is the bar every domain emulates.

## Output
- Prepend ONE dated daily object to reports/data/reports.js (newest first, exact existing shape, never overwrite, valid JS). One entry EVERY run, even quiet days.
- Set `domains: [...]` = today's substantive domains (≥1, valid slugs — gate-enforced).
- `sections`: one section per substantive domain; use block `tags` for paid platforms.
- `tldr`: the 3–6 sharpest items across domains. End with a "Sharpen your edge" tip.
- `week` = Mon–Sun label; `sortDate` = today (YYYY-MM-DD); `sources` = exact links joined by ' · '.
- If MONDAY: also produce the weekly per docs/prompts/weekly.md, run python build_report.py, set the weekly's pdf field.
- Run python scripts/check_reports.py — must PASS. Then git add -A, commit, push origin main.
