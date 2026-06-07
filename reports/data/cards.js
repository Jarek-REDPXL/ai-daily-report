/* ============================================================
   RedPxl News — CARDS (durable knowledge atoms)
   A card is a PRACTICAL, AI-POWERED, RUN-IT-TODAY play for a craft —
   advanced but non-technical, step-by-step with exact tools/prompts/clicks
   and a clear payoff. Voice = a sharp operator sharing a trick, never
   news/specs/encyclopedia. EVERY card carries >=1 REAL working link.
   See docs/NORTH-STAR.md (THE STANDARD) before adding or editing cards.

   Card shape:
     id          stable slug, e.g. "card-graphic-font-pairing"
     domains     array of >=1 valid slug from scripts/domains.js (gate-checked)
     title       the play, as an action you can take today
     summary     1-2 sentences: what it is / the fast way
     why         the payoff + POV (why run it)
     how         array of steps — exact tools/prompts/clicks
     confidence  "confirmed" | "emerging" | "speculative"
     status      "active" | "superseded"
     supersedes  array of card ids this replaces (or [])
     related     array of related card ids (or [])
     sources     array of { label?, url } — REAL links (url required). NOT markdown
                 or HTML strings. The card view renders them as clickable anchors.
     tags        array of extra tags (e.g. tool/platform tags) (or [])
     created     "YYYY-MM-DD"
     updated     "YYYY-MM-DD"
   ============================================================ */
window.AI_EDGE_CARDS = [

  {
    id: "card-graphic-font-pairing",
    domains: ["graphic"],
    title: "Test 9 font pairings in 30 seconds with ChatGPT",
    summary: "Have ChatGPT's image generator lay out a labeled 3x3 grid of heading+body font pairings for any brand vibe, then steal the 2-3 that fit.",
    why: "Stop hand-mocking type — see nine credible directions instantly.",
    how: [
      "Open ChatGPT's image generator.",
      "Prompt: \"Create a 3x3 grid of 9 different font-pairing examples (heading + body) for a [brand vibe] brand, labeling each pair's font names\".",
      "Screenshot the 2-3 that fit, regenerate variations.",
      "Confirm the fonts are licensed before use."
    ],
    confidence: "confirmed",
    status: "active",
    supersedes: [],
    related: ["card-graphic-color-palette"],
    sources: [{ label: "ChatGPT", url: "https://chatgpt.com" }],
    tags: ["typography", "chatgpt"],
    created: "2026-06-07",
    updated: "2026-06-07"
  },

  {
    id: "card-graphic-color-palette",
    domains: ["graphic", "web-design"],
    title: "Get an on-brand colour palette trained on your taste in 2 minutes",
    summary: "Khroma is an AI colour tool you train on colours you like, then it spits out endless on-brand combinations with copy-ready hex codes.",
    why: "Skip the colour wheel and decision paralysis — get palettes tuned to what you actually like, then lock the exact hex values into the design.",
    how: [
      "Go to khroma.co and pick ~50 colours you're drawn to (this trains the AI on your taste).",
      "Browse the generated combinations in the type / poster / gradient / image views.",
      "Favourite the ones that fit the brief, then open one to copy its hex codes.",
      "Drop the hex values straight into your Figma styles or CSS variables."
    ],
    confidence: "confirmed",
    status: "active",
    supersedes: [],
    related: ["card-graphic-font-pairing"],
    sources: [{ label: "Khroma — AI colour tool", url: "https://www.khroma.co" }],
    tags: ["colour", "khroma"],
    created: "2026-06-07",
    updated: "2026-06-07"
  },

  {
    id: "card-web-view-transitions",
    domains: ["web-dev", "web-design"],
    title: "Add app-like page transitions to a client site this afternoon",
    summary: "Chrome's View Transitions API gives a plain multi-page site smooth, app-like navigation in about five lines of CSS — no framework, no rebuild.",
    why: "Clients feel 'premium' instantly and you ship it the same day; it quietly no-ops where unsupported, so there's zero downside to adding it now.",
    how: [
      "Add the opt-in rule to your CSS: <code>@view-transition { navigation: auto; }</code>",
      "Give the element that should morph the same name on both pages, e.g. <code>.hero { view-transition-name: hero; }</code>",
      "Open the site in Chrome or Edge and click between the two pages — the shared element animates across.",
      "Wrap any heavier motion in <code>@media (prefers-reduced-motion: reduce)</code> and ship."
    ],
    confidence: "confirmed",
    status: "active",
    supersedes: [],
    related: [],
    sources: [{ label: "MDN — View Transitions API", url: "https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API" }],
    tags: ["css", "ux"],
    created: "2026-06-07",
    updated: "2026-06-07"
  },

  {
    id: "card-webdev-v0-screenshot",
    domains: ["web-dev"],
    title: "Turn a screenshot into working UI code with v0",
    summary: "Drop a reference screenshot (or a sketch) into v0 and get editable React + Tailwind you can paste into a project — a running start instead of a blank file.",
    why: "Skip the boilerplate hour: go from 'here's the look' to working, tweakable components in minutes, then refine by prompt.",
    how: [
      "Go to v0.dev and start a new generation.",
      "Drop in a screenshot of the UI you want (or describe the component).",
      "Iterate with follow-up prompts ('make it dark', 'tighten spacing', 'add a mobile layout').",
      "Copy the generated code into your project and wire it to real data."
    ],
    confidence: "emerging",
    status: "active",
    supersedes: [],
    related: [],
    sources: [{ label: "v0 by Vercel", url: "https://v0.dev" }],
    tags: ["ai-codegen", "react"],
    created: "2026-06-07",
    updated: "2026-06-07"
  },

  {
    id: "card-social-repurpose-claude",
    domains: ["social"],
    title: "Turn one blog post into a week of LinkedIn posts with Claude",
    summary: "Paste an article into Claude and have it spin out a week of native, distinct-angle social posts in a couple of minutes — then just edit the best.",
    why: "Stop starting from a blank page every day — get a week of platform-native content from one thing you already wrote.",
    how: [
      "Paste your article (or a talk transcript) into Claude.",
      "Prompt: \"Turn this into 7 LinkedIn posts, each a different angle — lesson, contrarian take, short story, surprising stat, how-to, a question, a list. Native tone, no hashtag spam.\"",
      "Keep the 3 strongest and tighten the first line (the hook) on each.",
      "Schedule them across the week."
    ],
    confidence: "confirmed",
    status: "active",
    supersedes: [],
    related: [],
    sources: [{ label: "Claude", url: "https://claude.ai" }],
    tags: ["content", "claude"],
    created: "2026-06-07",
    updated: "2026-06-07"
  },

  {
    id: "card-paid-meta-advantage-plus",
    domains: ["paid"],
    title: "Launch a self-optimizing Meta prospecting campaign in 20 minutes",
    summary: "Meta's Advantage+ Shopping (ASC) auto-handles audiences, placements and creative selection in one campaign — usually beating hand-built ad sets for cold ecommerce traffic.",
    why: "You stop babysitting audiences and spend your time on creative (the real lever), while the algorithm finds buyers faster and often at a lower cost per purchase.",
    how: [
      "In Ads Manager, create a new Advantage+ Shopping campaign for one market.",
      "Set a budget big enough for ~50 purchases/week so it exits the learning phase quickly.",
      "Upload a deep, varied creative pool — refresh creative, not audiences.",
      "Cap existing-customer spend in settings so budget skews to new buyers; keep one small manual campaign as a control for 2-3 weeks."
    ],
    confidence: "emerging",
    status: "active",
    supersedes: [],
    related: [],
    sources: [{ label: "Meta — About Advantage+ shopping campaigns", url: "https://www.facebook.com/business/help/2724374746554905" }],
    tags: ["meta-ads"],
    created: "2026-06-07",
    updated: "2026-06-07"
  },

  {
    id: "card-email-dmarc-bimi",
    domains: ["email"],
    title: "Land in the inbox — and show your logo next to every email",
    summary: "A one-time DNS setup (DMARC enforcement + BIMI) that pushes you out of spam and displays your verified brand logo beside your sends in Gmail and Apple Mail.",
    why: "Two wins from one afternoon: better inbox placement after the 2024 sender rules, and your logo in the inbox — free brand real estate most competitors haven't claimed.",
    how: [
      "Confirm SPF and DKIM are passing for your sending domain (use a free DMARC checker).",
      "Add a DMARC record at <code>p=none</code>, watch the reports for a week, then tighten to <code>p=quarantine</code> then <code>p=reject</code>.",
      "Create a square SVG of your logo (BIMI format) and publish the BIMI DNS record; add a VMC certificate for Gmail's logo slot.",
      "Send yourself a test and confirm the logo shows and you land in the inbox."
    ],
    confidence: "confirmed",
    status: "active",
    supersedes: [],
    related: [],
    sources: [
      { label: "Google — Email sender guidelines", url: "https://support.google.com/mail/answer/81126" },
      { label: "BIMI Group", url: "https://bimigroup.org/" }
    ],
    tags: ["deliverability"],
    created: "2026-06-07",
    updated: "2026-06-07"
  },

  {
    id: "card-ai-tooling-reusable-skills",
    domains: ["ai-tooling"],
    title: "Save a workflow you repeat as a reusable AI Skill you trigger with one line",
    summary: "Capture a multi-step task you keep re-explaining (audit an ad account, scaffold a microsite) as a written 'skill' the AI loads on demand and runs the same way every time.",
    why: "Stop paying the re-prompting tax — turn a one-off prompt win into a team asset that runs consistently and gets sharper with every use.",
    how: [
      "Pick a workflow you repeat and write the exact steps + any templates as a short markdown 'skill' (name, when to use it, the steps).",
      "Store it where your AI tool can find it (a Claude Project, a skills folder, or your prompt library).",
      "Trigger it by name instead of re-typing the whole process.",
      "After each run, tighten the steps — the skill should improve, not stay static."
    ],
    confidence: "confirmed",
    status: "active",
    supersedes: [],
    related: [],
    sources: [{ label: "Anthropic — tool use & agents", url: "https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview" }],
    tags: ["workflow", "agents"],
    created: "2026-06-07",
    updated: "2026-06-07"
  }

];
