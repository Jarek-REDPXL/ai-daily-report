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
     action      REQUIRED one-line "do this now" — the single concrete next step
                 (the gate fails any card without it)
     how         array of steps — exact tools/prompts/clicks
     thread_id   OPTIONAL slug — the storyline this card advances (groups cards
                 that tell one evolving story, e.g. "thread-platform-ai-defaults")
     confidence  "confirmed" | "emerging" | "speculative" (play MATURITY)
     corroboration_count  OPTIONAL int — how many INDEPENDENT sources back a
                 claim (separate from confidence). Set on claim/news cards; the
                 gate enforces it can't exceed the distinct source domains, so the
                 "Confirmed (3+) / Reported (2) / Single-source (1)" label can't
                 lie. Omit on tool/technique cards (one official link is fine).
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
    id: "card-webdev-ai-gateway-spend-limits",
    domains: ["web-dev"],
    title: "Put a hard dollar cap on any AI feature before you ship it",
    action: "Route your app's LLM calls through Cloudflare AI Gateway and add a spend limit scoped to model/team with a fallback route on over-limit.",
    summary: "Cloudflare AI Gateway's new spend limits track real dollar cost (from each model's token pricing) and either block or fail over to a cheaper model when a budget is hit — so a runaway loop or traffic spike can't quietly burn four figures.",
    why: "The #1 reason teams won't ship LLM features to production is the fear of an unbounded bill. A real ceiling turns 'we daren't ship AI' into 'it literally cannot cost more than $X' — and with the market now repricing loose AI spend, controlling unit economics is a feature, not an afterthought.",
    how: [
      "Proxy your OpenAI/Anthropic/etc. calls through an AI Gateway endpoint (point your base URL at the gateway).",
      "In the gateway settings (dashboard or API) add a <b>spend limit</b> and scope it by <code>model</code>, <code>provider</code>, or a custom attribute like <code>user</code>/<code>team</code>/<code>app</code> (e.g. $2,000/mo senior, $500/mo standard, or $50/day on one pricey model).",
      "Pick a window: daily/weekly/monthly, fixed (resets 1st of month / Monday / midnight) or rolling.",
      "Choose the over-limit behavior: <b>block</b> by default, or add a <b>Dynamic Route</b> to fail over to a cheaper fallback model so a hard cap doesn't break the workflow.",
      "Reconcile the gateway's cost math against your provider invoice for the first month before trusting the cap to the dollar."
    ],
    confidence: "emerging",
    status: "active",
    thread_id: "thread-govern-ai-spend",
    supersedes: [],
    related: ["card-ai-tooling-reusable-skills"],
    sources: [
      { label: "Cloudflare — AI Gateway spend limits", url: "https://blog.cloudflare.com/ai-gateway-spend-limits/" },
      { label: "Cloudflare Changelog — Control AI costs with spend limits", url: "https://developers.cloudflare.com/changelog/post/2026-06-05-spend-limits/" }
    ],
    tags: ["cloudflare", "llm", "cost-control"],
    created: "2026-06-08",
    updated: "2026-06-08"
  },

  {
    id: "card-growth-aeo-content-formats",
    domains: ["growth"],
    title: "Reformat a page so AI answer engines cite it",
    action: "Take one high-intent page, match its title to a query pattern, lead each section with a one-sentence answer, and add a list/table, original stats, and an FAQ block.",
    summary: "2026 research across 1M+ AI citations (HubSpot State of AEO + Wix Studio AI Search Lab) shows answer engines cite product/landing pages, blog posts and listicles most — and reward an intent-matched title plus original stats, a last-updated date, and FAQ schema. AEO is a formatting pass on pages you already have.",
    why: "AI search is now a real discovery channel and being <i>cited</i> in the answer is starting to matter more than classic backlinks. The lever isn't writing more — it's structuring what you have so a model can lift a clean, attributable chunk and name you as the source.",
    how: [
      "Pick one page that should be winning AI mentions (start with money pages, not the blog archive).",
      "Match the title to the intent engines reward: <code>What is X</code>, <code>X vs Y</code>, <code>How to X</code>, or <code>Best X</code>.",
      "Lead each section with a direct one-sentence answer, then expand — engines lift the first clean sentence.",
      "Convert dense prose into a list or comparison table (pre-chunked = easy to extract); comparison tables specifically win ChatGPT citations.",
      "Add original/first-party stats (your own benchmark or survey number) — proprietary data is what gets attributed to you.",
      "Add an FAQ block with FAQ schema, a visible last-updated date, and an author bio; then check if ChatGPT/Perplexity cite you for the target question and iterate."
    ],
    confidence: "emerging",
    status: "active",
    corroboration_count: 2,
    supersedes: [],
    related: [],
    sources: [
      { label: "HubSpot — Content formats answer engines favor [research]", url: "https://blog.hubspot.com/marketing/content-format-types-that-earn-citations" },
      { label: "Wix Studio AI Search Lab — content types most cited by LLMs (1M+ citations)", url: "https://www.wix.com/studio/ai-search-lab/research/content-types-most-cited-by-llms" },
      { label: "HubSpot — Why citations matter more than backlinks for AI", url: "https://blog.hubspot.com/marketing/citations-in-aeo" }
    ],
    tags: ["aeo", "seo", "ai-search"],
    created: "2026-06-08",
    updated: "2026-06-08"
  },

  {
    id: "card-graphic-font-pairing",
    domains: ["graphic"],
    title: "Test 9 font pairings in 30 seconds with ChatGPT",
    action: "Open ChatGPT's image generator and prompt it for a labeled 3x3 grid of heading+body font pairings for your brand vibe.",
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
    action: "Go to khroma.co, train it on ~50 colours you like, then copy the generated hex codes into your Figma styles or CSS.",
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
    action: "Add @view-transition { navigation: auto; } plus a shared view-transition-name on two pages, then click between them in Chrome.",
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
    thread_id: "thread-modern-css-primitives",
    supersedes: [],
    related: [],
    sources: [{ label: "MDN — View Transitions API", url: "https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API" }],
    tags: ["css", "ux"],
    created: "2026-06-07",
    updated: "2026-06-07"
  },

  {
    id: "card-webdesign-squircle-corners",
    domains: ["web-design"],
    title: "Give buttons and cards iOS-style squircle corners with one line of CSS",
    action: "On a button you already round, add corner-shape: squircle next to its border-radius and test in Chrome/Edge.",
    summary: "Chrome's new corner-shape property turns a normal border-radius into a true Apple-style super-ellipse 'squircle' — and falls back to plain rounding everywhere it isn't supported.",
    why: "Rounded rectangles are the most-repeated shape in any UI; the squircle reads as 'premium' (it's the curve Apple uses on every icon) for one extra declaration — and because unsupported browsers just show your existing rounded corner, it's pure progressive enhancement with zero downside.",
    how: [
      "On a button/card you already round, add the shape next to the radius: <code>.btn { border-radius: 28%; corner-shape: squircle; }</code>",
      "Keep a real <code>border-radius</code> — corner-shape only changes the shape of the curve, not its size, so with no radius there's nothing to reshape.",
      "Dial the curve with the math function if you want: <code>corner-shape: superellipse(1.5)</code> (lower n = rounder, higher = squarer).",
      "Test in Chrome/Edge; Safari and Firefox fall back to normal rounding automatically — no <code>@supports</code> guard needed."
    ],
    confidence: "emerging",
    status: "active",
    supersedes: [],
    related: ["card-web-view-transitions"],
    thread_id: "thread-modern-css-primitives",
    corroboration_count: 2,
    sources: [
      { label: "MDN — corner-shape", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/corner-shape" },
      { label: "Smashing Magazine — Beyond border-radius", url: "https://www.smashingmagazine.com/2026/03/beyond-border-radius-css-corner-shape-property-ui/" }
    ],
    tags: ["css", "ui"],
    created: "2026-06-07",
    updated: "2026-06-07"
  },

  {
    id: "card-webdev-v0-screenshot",
    domains: ["web-dev"],
    title: "Turn a screenshot into working UI code with v0",
    action: "Drop a UI screenshot into v0.dev, refine by prompt, and paste the generated React/Tailwind into your project.",
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
    action: "Paste an article into Claude, ask for 7 distinct-angle LinkedIn posts, then tighten the hooks on the 3 strongest.",
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
    id: "card-social-instagram-sends",
    domains: ["social"],
    title: "Design every Instagram post to get DM-shared — the 2026 ranking signal that matters",
    action: "Reframe your next post to be DM-forwardable (one screenshot-able tip + a 'send this to...' CTA) and track Sends in Insights.",
    summary: "Instagram now treats 'sends per reach' (private DM shares) as its strongest distribution signal; build posts people forward to a friend, not just ones they like.",
    why: "Likes and even comments are weak tells now — a private share is the algorithm's clearest evidence a post is worth showing to strangers. Most social briefs still optimise for likes/saves; the lever moved, so the brief should too.",
    how: [
      "Make the takeaway forwardable: one screenshot-able tip, a 'send this to the person who needs it' framing, or a stat/inside-joke someone would DM to a colleague.",
      "Put the hook in the first line/frame so it survives the feed scroll.",
      "Add a soft CTA to share to a specific person (e.g. 'tag the teammate who still uses border-radius').",
      "Track the <b>Sends</b> count in Insights — not just likes — and make more of whatever gets forwarded."
    ],
    confidence: "emerging",
    status: "active",
    supersedes: [],
    related: ["card-social-repurpose-claude"],
    sources: [{ label: "Sprout Social — How the Instagram algorithm works (2026)", url: "https://sproutsocial.com/insights/instagram-algorithm/" }],
    tags: ["instagram", "content"],
    created: "2026-06-07",
    updated: "2026-06-07"
  },

  {
    id: "card-paid-meta-advantage-plus",
    domains: ["paid"],
    title: "Launch a self-optimizing Meta prospecting campaign the new (unified) way",
    action: "In Ads Manager, create a Sales-objective campaign with the three Advantage+ levers on and keep one small manual ad set as a control.",
    summary: "Meta merged the old 'Manual' and 'Advantage+ Shopping' options into one flow: pick the Sales objective and the Advantage+ levers (budget, audience, placements) are on by default — that IS the old ASC, now auto-handling targeting, placements and creative selection for cold ecommerce traffic.",
    why: "You stop babysitting audiences and spend your time on creative (the real lever), while the algorithm finds buyers faster and often at a lower cost per purchase. Heads-up: any SOP that still says 'choose Advantage+ Shopping' points at a menu that no longer exists — juniors will silently build the wrong thing.",
    how: [
      "In Ads Manager, create a new campaign and choose the <b>Sales</b> objective (the old standalone 'Advantage+ Shopping' / ASC is gone — it's now Advantage+ Sales inside this unified flow).",
      "Leave the three Advantage+ levers ON — Advantage+ budget, Advantage+ audience, Advantage+ placements; that is the AI-driven setup.",
      "Upload a deep, varied creative pool — refresh creative, not audiences.",
      "Cap existing-customer spend in settings so budget skews to new buyers; keep one small manual ad set as a control for 2-3 weeks.",
      "Give it enough budget to clear the learning phase quickly (thresholds are reportedly easing for smaller budgets, but Meta's Help Center lags — treat any exact conversions/week number as directional)."
    ],
    confidence: "confirmed",
    status: "active",
    thread_id: "thread-platform-ai-defaults",
    corroboration_count: 2,
    supersedes: [],
    related: [],
    sources: [
      { label: "PPC Land — Meta's unified Advantage+ structure", url: "https://ppc.land/meta-launches-unified-api-structure-for-advantage-campaigns/" },
      { label: "Meta — About Advantage+ shopping/sales campaigns", url: "https://www.facebook.com/business/ads/advantage-plus-shopping-campaigns" }
    ],
    tags: ["meta-ads"],
    created: "2026-06-07",
    updated: "2026-06-07"
  },

  {
    id: "card-email-dmarc-bimi",
    domains: ["email"],
    title: "Land in the inbox — and show your logo next to every email",
    action: "Confirm SPF/DKIM pass, publish a DMARC record at p=none then tighten it, then add a BIMI record + VMC for your inbox logo.",
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
    action: "Write a workflow you repeat as a short markdown skill (name + when + steps), store it where your AI tool finds it, and trigger it by name.",
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
