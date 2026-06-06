# RedPxl News — Domain Taxonomy

The canonical list of content **domains**. Every report object carries a
`domains: [...]` array (≥1 slug). This file is the human-readable reference; the
machine source of truth is [`scripts/domains.js`](../scripts/domains.js) — keep
them aligned (the quality gate parses `domains.js`, so that file wins on conflict).

## Domains (exact slugs)

| Slug | Label | Scope (one line) |
|------|-------|------------------|
| `web` | Web design & development | Sites, apps, UX/UI, front/back-end build, performance, CMS/dev tooling. |
| `graphic` | Graphic design & brand | Visual identity, logos, layout, typography, brand systems and assets. |
| `email` | Email & retention | Lifecycle/CRM, newsletters, automation flows, deliverability, retention metrics. |
| `social` | Social media (organic) | Organic content, community, platform-native formats, creators, engagement. |
| `paid` | Paid ads | Paid acquisition across ad platforms — strategy, creative, bidding, measurement. |
| `growth` | Marketing & growth strategy | Funnels, positioning, analytics, experimentation, GTM and growth loops. |
| `ai-tooling` | AI tools, skills & techniques | AI models/agents/tools, new skills & techniques, and how to adopt them. |

## Paid platform tags (block-level, NOT domains)

Platform granularity for the `paid` domain lives in **block-level `tags`**, never
as a separate domain. Use these exact tag slugs:

| Tag | Platform |
|-----|----------|
| `google-ads` | Google Ads |
| `meta-ads` | Meta (Facebook/Instagram) Ads |
| `snap-ads` | Snapchat Ads |

## Notes

- A report may span multiple domains (e.g. `["paid", "growth"]`).
- Adding/renaming a domain = edit `scripts/domains.js` first, then this file, then
  backfill existing reports so the gate stays green.

## The card layer (durable knowledge atoms)

Domains tag two kinds of content now:

- **Reports** (`reports/data/reports.js`) — the daily/weekly INTAKE feed.
- **Cards** (`reports/data/cards.js`, `window.AI_EDGE_CARDS`) — the compounding
  LIBRARY of durable plays the routine maintains. Each card carries `domains:[≥1
  valid slug]` and a stable id, and is updated in place (one canonical card per
  play) rather than re-buried in the next daily.

Card shape (gate-validated): `{ id, domains:[...], title, summary, why, how:[steps],
confidence:"confirmed|emerging|speculative", status:"active|superseded",
supersedes:[ids], related:[ids], sources, tags:[...], created, updated }`.

Derived by `scripts/build-data.js` (do NOT hand-edit): one lazy-loadable file per
domain at `reports/data/cards/<domain>.json`, plus a `cards` facet (count per
domain) in `reports/data/index.meta.json` alongside the `domains` facet. The routine
CREATEs or UPDATEs a card whenever a deep beat surfaces a durable play
(see `docs/prompts/daily.md` → "Card extraction").
