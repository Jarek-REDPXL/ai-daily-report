# Digest — Email & retention (`email`)

> Domain scope: lifecycle/CRM, newsletters, automation flows, deliverability,
> retention metrics. Shared mission + sourcing standard live in
> [`_house.md`](./_house.md); read that first, then this file.

## How to use this file (instructions for each run)
1. **Before writing:** read `_house.md` + the "Active threads" and "Durable
   lessons" below so today's entry advances the story and doesn't repeat.
2. **After writing:** update "Active threads" (add/advance/close), add any genuinely
   new "Durable lesson," and append one "Changelog" line.
3. Keep it under ~150 lines; retire quiet threads into "Durable lessons."

---

## Active threads (ongoing storylines to advance, not repeat)
<!-- one line each: thread → latest state + date. None yet — seed on first run. -->
- ESPs ship **MCP servers** → query/operate your email program from an AI client in natural language: Omnisend launched a hosted MCP (`mcp.omnisend.com/mcp`, Jun 4 2026) — connect via Claude custom connector (OAuth) for campaign/deliverability/automation-revenue/form queries + zero-code lifecycle triggers. Native Claude connector "coming soon." Card: card-email-omnisend-mcp. Watch for Klaviyo/Mailchimp/HubSpot MCPs. **Advanced 2026-06-13:** Omnisend's June updates added in-app **Reports AI** (beta, OpenAI-powered chat that answers "how did my last campaign perform?" over sales/campaign/automation data) + a Canva integration — the "audit by conversation" pattern is now native, not just MCP. (2026-06-09)
- **Inbox-safe motion = static-first GIF, not interactive email:** the durable email-motion technique (Litmus) is to design the still version first, then layer one small purposeful GIF (CTA pulse / progress bar / product cycle) whose first frame is the standalone fallback. Constraints: total assets <~1–1.5MB, Gmail clips at ~102KB, stop after 2–3 loops, no strobing, above the fold. Card: card-email-micro-animation. (2026-06-13)
- **Measure inbox PLACEMENT, not 'delivery rate':** an ESP delivery rate only means the provider *accepted* the message — a 98% delivery rate can hide a ~60% inbox-placement rate (IPR). With Gmail/Yahoo/Microsoft now *permanently rejecting* rule-breakers (SPF `5.7.27`, MS `550 5.7.515`; spam-complaint ceiling 0.30%, target <0.10%, bounce <2%, one-click List-Unsubscribe per RFC 8058), the placement gap = lost revenue, not a spam-folder slap. Run-it-today: seed/spam-list test one live campaign → read folder placement per provider → fix auth/reputation before send → deliver an 'Inbox Placement Scorecard'. Card: card-email-inbox-placement-audit. Watch whether an ESP surfaces IPR as a default report metric. (2026-06-16)

## Durable lessons (the compounding edge — evergreen takeaways we've taught)
<!-- promote a thread's conclusion here once it's a stable, reusable principle. -->
- **The ESP audit is becoming a conversation:** when your email platform exposes an MCP, the durable skill shifts from clicking through dashboards/exports to asking sharp questions of your live data (rank by revenue, flag deliverability, summarise new subscribers) — same "controls collapse into AI defaults" pattern seen in paid/dev. Always human-review AI-drafted sends.

## Changelog (one line per run — newest first)
<!-- YYYY-MM-DD: … -->
- 2026-06-16: Deep beat (longest-gone non-web) — inbox-placement audit: measure IPR (inbox ÷ delivered) with a seed/spam test instead of trusting 'delivery rate'; timely because Gmail/Yahoo/MS now permanently reject (0.10%/0.30% spam thresholds, RFC 8058 one-click). Card: card-email-inbox-placement-audit; added a deliverability thread; logged a prediction (an ESP surfaces IPR as a default metric by end-Q3). Sources: Litmus ×2, Chronos Agency.
- 2026-06-13: Deep beat — inbox-safe micro-animation recipe (static-first GIF, <1.5MB, stop after 2–3 loops, mind Gmail's 102KB clip, no strobing). Card: card-email-micro-animation. Advanced the ESP-AI thread (Omnisend June updates: in-app Reports AI beta + Canva sync). Added a durable lesson. Source: Litmus micro-animation guide; Omnisend June 2026 updates.
- 2026-06-09: First substantive `email` beat — Omnisend MCP → connect to Claude as a custom connector and audit the program in plain English. Card: card-email-omnisend-mcp (thread-platform-ai-defaults). Seeded the ESP-MCP thread + durable lesson. Source: Omnisend Help Center + product page. Logged a prediction (another major ESP ships an MCP by Q3).
