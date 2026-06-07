# RedPxl News — Domain Taxonomy

The canonical list of content **domains**. Every report object carries a
`domains: [...]` array (≥1 slug). This file is the human-readable reference; the
machine source of truth is [`scripts/domains.js`](../scripts/domains.js) — keep
them aligned (the quality gate parses `domains.js`, so that file wins on conflict).

## Domains (exact slugs)

| Slug | Label | Scope (one line) |
|------|-------|------------------|
| `web-design` | Web design (UI/UX & frontend craft) | UI/UX, interaction & motion, accessibility, type/layout, design systems for the web. |
| `web-dev` | Web development (build, code, performance) | Build & code, frameworks, performance, architecture, tooling, APIs, CMS/deployment. |
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

## Hubs (how domains roll up for the site)

The site groups the 8 domains into 4 **hubs** — the navigable craft areas a
teammate browses. This is the single reference for the mapping (UI is built against
it):

| Hub | Domains |
|-----|---------|
| **Design** | `web-design`, `graphic` |
| **Development** | `web-dev` |
| **Marketing** | `email`, `social`, `paid`, `growth` |
| **AI** | `ai-tooling` |

Cards and reports can be multi-tagged, so a cross-craft item (e.g. a card tagged
`["web-dev","web-design"]`) legitimately appears in more than one hub. Domains stay
the atomic unit; hubs are just the rollup for navigation.

## Notes

- A report may span multiple domains (e.g. `["paid", "growth"]`).
- Adding/renaming a domain = edit `scripts/domains.js` first, then this file, then
  backfill existing reports so the gate stays green.

## The card layer (durable knowledge atoms)

Domains tag two kinds of content now:

- **Reports** (`reports/data/reports.js`) — the daily/weekly INTAKE feed.
- **Cards** (`reports/data/cards.js`, `window.AI_EDGE_CARDS`) — the compounding
  LIBRARY and the real product. Each card is a **practical, AI-powered,
  run-it-today play for a craft** — operator voice, exact tools/prompts/clicks, a
  clear payoff, and **>=1 real working link** (never fabricated). Each carries
  `domains:[≥1 valid slug]` and a stable id, and is updated in place (one canonical
  card per play). Full bar: THE STANDARD in `docs/NORTH-STAR.md`.

Card shape (gate-validated): `{ id, domains:[...], title, summary, why, how:[steps],
confidence:"confirmed|emerging|speculative", status:"active|superseded",
supersedes:[ids], related:[ids], sources:[{label?, url}], tags:[...], created, updated }`.

Derived by `scripts/build-data.js` (do NOT hand-edit): one lazy-loadable file per
domain at `reports/data/cards/<domain>.json`, plus a `cards` facet (count per
domain) in `reports/data/index.meta.json` alongside the `domains` facet. The routine
CREATEs or UPDATEs a card whenever a deep beat surfaces a durable play
(see `docs/prompts/daily.md` → "Card extraction").
