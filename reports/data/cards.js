/* ============================================================
   RedPxl News — CARDS (durable knowledge atoms)
   Each card is one object in this array. Cards are the compounding
   LIBRARY of plays the team maintains — distinct from reports.js,
   which is the daily INTAKE feed. The routine creates a new card or
   updates the existing canonical one whenever a durable play emerges;
   one canonical card per play (update in place, never duplicate).

   Card shape:
     id          stable slug, e.g. "card-paid-meta-advantage-plus"
     domains     array of >=1 valid slug from scripts/domains.js (gate-checked)
     title       the play, in a sentence
     summary     1-2 sentences: what it is
     why         why it matters to us
     how         array of steps (strings; may contain minimal HTML)
     confidence  "confirmed" | "emerging" | "speculative"
     status      "active" | "superseded"
     supersedes  array of card ids this replaces (or [])
     related     array of related card ids (or [])
     sources     HTML string of <a href> EXACT links joined by " · "
     tags        array of extra tags (e.g. platform tags) (or [])
     created     "YYYY-MM-DD"
     updated     "YYYY-MM-DD"
   ============================================================ */
window.AI_EDGE_CARDS = [

  {
    id: "card-web-view-transitions",
    domains: ["web-dev", "web-design"],
    title: "Use the View Transitions API for app-like page navigation",
    summary: "The browser-native View Transitions API animates between pages/states with CSS, giving app-like polish without a SPA framework.",
    why: "Client builds get smooth, premium navigation at near-zero JS cost — a real differentiator on the sites we ship, and it degrades gracefully where unsupported.",
    how: [
      "Opt in with the <code>@view-transition { navigation: auto; }</code> CSS rule for cross-document transitions.",
      "Tag the elements that should morph with <code>view-transition-name</code> (e.g. a hero image → detail image).",
      "Start with one high-impact flow (list → detail), then expand; always test the no-support fallback (instant nav).",
      "Wrap any custom animation in <code>prefers-reduced-motion</code>."
    ],
    confidence: "confirmed",
    status: "active",
    supersedes: [],
    related: [],
    sources: "<a href=\"https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API\" target=\"_blank\" rel=\"noopener\">MDN — View Transitions API</a>",
    tags: ["css", "ux"],
    created: "2026-06-07",
    updated: "2026-06-07"
  },

  {
    id: "card-paid-meta-advantage-plus",
    domains: ["paid"],
    title: "Default new Meta prospecting to Advantage+ Shopping, not manual ABO",
    summary: "Meta's Advantage+ Shopping Campaigns (ASC) automate audience, placement and creative selection into one consolidated campaign, often outperforming hand-built manual prospecting for ecommerce cold traffic.",
    why: "Less manual audience-building, faster exit from the learning phase, and usually a lower cold-traffic CPA — frees time for creative testing, which is where the real lever is.",
    how: [
      "Spin up one ASC campaign per market with a healthy budget (enough for ~50 conversions/week to exit learning).",
      "Feed it a deep, varied creative pool (Meta picks winners); refresh creative, not audiences.",
      "Cap existing-customer spend in the ASC settings so budget skews to genuine prospecting.",
      "Hold a small manual campaign as a control for 2–3 weeks before fully migrating budget."
    ],
    confidence: "emerging",
    status: "active",
    supersedes: [],
    related: [],
    sources: "<a href=\"https://www.facebook.com/business/help/2724374746554905\" target=\"_blank\" rel=\"noopener\">Meta — About Advantage+ shopping campaigns</a>",
    tags: ["meta-ads"],
    created: "2026-06-07",
    updated: "2026-06-07"
  },

  {
    id: "card-email-dmarc-bimi",
    domains: ["email"],
    title: "Enforce DMARC and add BIMI to lift deliverability and show your logo",
    summary: "Move DMARC to an enforcing policy (p=quarantine/reject) on top of aligned SPF + DKIM, then publish a BIMI record so supporting inboxes display your verified brand logo next to the sender.",
    why: "After Gmail/Yahoo's 2024 bulk-sender rules, authentication is table stakes for inbox placement; BIMI adds visible brand trust in the inbox, which lifts open rates.",
    how: [
      "Confirm SPF and DKIM pass and align for your sending domain.",
      "Start DMARC at <code>p=none</code> with rua reporting, read the reports, then move to <code>p=quarantine</code> → <code>p=reject</code>.",
      "Publish a square SVG (BIMI profile) at the BIMI record; add a VMC (verified mark certificate) for Gmail logo display.",
      "Monitor deliverability and spam-rate (keep it under Google's 0.3% threshold)."
    ],
    confidence: "confirmed",
    status: "active",
    supersedes: [],
    related: [],
    sources: "<a href=\"https://support.google.com/mail/answer/81126\" target=\"_blank\" rel=\"noopener\">Google — Email sender guidelines</a>",
    tags: ["deliverability"],
    created: "2026-06-07",
    updated: "2026-06-07"
  },

  {
    id: "card-ai-tooling-reusable-skills",
    domains: ["ai-tooling"],
    title: "Capture repeatable workflows as reusable Skills (markdown runbooks)",
    summary: "Write durable, versioned markdown 'skills' that an agent loads on demand, so a multi-step workflow runs the same way every time instead of being re-prompted from scratch.",
    why: "Turns a one-off prompt win into a compounding team asset that survives model upgrades — orchestration and judgment captured once, reused by everyone (and by stronger future models).",
    how: [
      "Identify a workflow you repeat (e.g. 'scaffold a client microsite', 'audit an ad account').",
      "Write it as a markdown skill: a clear name + description (when to use) + precise steps and templates.",
      "Keep it generic and parameterised; store it where the agent can discover it.",
      "Refine the skill after each run — it should get sharper, not stay static."
    ],
    confidence: "confirmed",
    status: "active",
    supersedes: [],
    related: [],
    sources: "<a href=\"https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview\" target=\"_blank\" rel=\"noopener\">Anthropic — Tool use overview</a>",
    tags: ["workflow", "agents"],
    created: "2026-06-07",
    updated: "2026-06-07"
  }

];
