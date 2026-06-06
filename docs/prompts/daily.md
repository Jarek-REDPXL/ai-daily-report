# Daily Briefing — Editorial Spec (RedPxl News)

## Mission
Compounding intelligence edge for the RedPxl team across our disciplines — using AI to stay ahead of everyone in our fields. This is a knowledge base, not a news feed: golden, usable judgment that compounds, never raw headlines. Shared standards live in docs/knowledge/digest/_house.md.

## Domains (canonical — scripts/domains.js / docs/DOMAINS.md)
web (FLAGSHIP), graphic, email, social, paid, growth, ai-tooling.
Paid platform granularity is BLOCK-level tags, not domains: google-ads, meta-ads, snap-ads.

## Daily cadence — breadth without dilution
- SCAN all 7 domains every run: one tight line each, surfaced ONLY if something genuinely moved. Per-domain silence is allowed; never skip the whole run.
- DEEP-BEAT exactly 3 domains:
  1. web — always (flagship).
  2. The 2 NON-web domains gone longest without a deep beat. Determine by scanning the `domains` arrays of the last ~10 reports and picking the 2 least-recently-present non-web domains. Self-balances even if a day was missed.
  - PROMOTE: if a scan surfaces something genuinely actionable in an unscheduled domain, cover it properly and add it to today's deep set.
- A deep beat = real research + golden block(s): what changed, why it matters to this discipline, the technique/do-it, exact link(s); plus any new prediction and a digest update for that domain.
- The report's `domains` array = every domain that earned a SUBSTANTIVE block today. One-line scans that surfaced nothing do NOT earn a tag.

## Card extraction (the compounding library — do this on every deep beat)
The daily is the INTAKE feed; cards are the durable LIBRARY of plays the team keeps. Whenever a deep beat surfaces a durable play/technique/tool (not just news — something a teammate would DO), capture it as a card in `reports/data/cards.js` (`window.AI_EDGE_CARDS`):
- **One canonical card per play. Update in place, never duplicate.** Before creating, search cards.js for an existing card on the same play. If it exists, UPDATE it: bump `updated` to today, adjust `confidence` as evidence grows (speculative → emerging → confirmed), add the new exact source to `sources`, and refine `how`/`why`. If it's genuinely new, CREATE one.
- If a new play REPLACES an older one, set the old card's `status:"superseded"` and list its id in the new card's `supersedes:[...]`; cross-link peers via `related:[...]`.
- Card shape (gate-validated): `{ id (stable slug, e.g. "card-paid-meta-advantage-plus"), domains:[≥1 valid slug], title, summary, why, how:[steps], confidence:"confirmed|emerging|speculative", status:"active|superseded", supersedes:[ids], related:[ids], sources (exact links joined by ' · '), tags:[...], created, updated }`.
- Cards do NOT replace the daily entry — write both: the daily covers the news; the card distils the reusable play. Not every deep beat yields a card (only durable plays do), but most should advance at least one.

## Sourcing (non-negotiable)
1. EVERY source is an exact clickable link. No bare-text sources. If you can't link it, don't cite it — never fabricate links.
2. Source widely, per domain:
   - web: framework release notes, GitHub releases/changelogs, RFCs, spec/MDN updates, strong conf/YouTube deep-dives, practitioner blogs.
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
- This is load-bearing: it's how the system learns its best sources over time.

## Self-learning loop
- BEFORE: read digest/_house.md, the per-domain digests for today's deep domains, predictions.md (entries tagged for today's domains + any now resolvable), and sources.md.
- AFTER: update the per-domain digest(s) for the deep domains (advance/retire threads, add durable lessons, append a dated changelog line); resolve predictions whose window closed (✅/❌/⚖️); log new falsifiable calls with due windows and the source behind them; update sources.md.

## The bar: golden value, kill 95%
Publish only what clears all three: (1) what changed, (2) why it matters to THIS discipline / our work, (3) the technique / do-it / link. "A thing happened" gets cut. Teach concepts the team can use Monday. A quiet day is a short, sharp briefing — never padding.

## Web flagship — the quality standard (worked example)
A model `web` block, tags:["web"]: sub = "Chrome ships cross-document View Transitions". What changed: native page-to-page transitions without a JS framework. Why it matters: client sites get app-like polish with near-zero bundle cost — a real differentiator on builds we ship. Do-it: opt in with the view-transition CSS + a one-line meta; start on a hero-to-detail navigation; link the exact spec/release note. This depth and "so-what-for-us" framing is the bar every domain emulates.

## Output
- Prepend ONE dated daily object to reports/data/reports.js (newest first, exact existing shape, never overwrite, valid JS). One entry EVERY run, even quiet days.
- Set `domains: [...]` = today's substantive domains (≥1, valid slugs — gate-enforced).
- `sections`: one section per substantive domain; use block `tags` for paid platforms.
- `tldr`: the 3–6 sharpest items across domains. End with a "Sharpen your edge" tip.
- `week` = Mon–Sun label; `sortDate` = today (YYYY-MM-DD); `sources` = exact links joined by ' · '.
- If MONDAY: also produce the weekly per docs/prompts/weekly.md, run python build_report.py, set the weekly's pdf field.
- Run python scripts/check_reports.py — must PASS. Then git add -A, commit, push origin main.
