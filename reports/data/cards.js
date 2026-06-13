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
    id: "card-webdesign-css-carousel",
    domains: ["web-design"],
    title: "Build an accessible image carousel in pure CSS — no JS library, no a11y debt",
    action: "On a scroll-snap list, add scroll-marker-group: after, then ::scroll-button(left/right) and li::scroll-marker rules — delete the carousel JS.",
    summary: "Chrome/Edge 135+ ship the CSS Overflow 5 carousel primitives: a plain scroll-snap container plus ::scroll-button() (prev/next), ::scroll-marker / scroll-marker-group (the dot nav), and :target-current (active dot) — a full carousel with zero JavaScript, and the browser supplies the ARIA roles, keyboard nav and focus order for free.",
    why: "Carousels are the component teams most often ship with a heavy JS library AND broken accessibility. Doing it natively deletes the dependency, the hydration cost, and the a11y bugs in one move — and it degrades cleanly (engines without support just render a scrollable scroll-snap strip).",
    how: [
      "Mark up a list of slides inside a scroll-snap container: <code>.carousel{ overflow-x:auto; scroll-snap-type:x mandatory; } .carousel li{ scroll-snap-align:center; }</code>.",
      "Turn on the dot nav: add <code>scroll-marker-group: after;</code> to <code>.carousel</code>, then <code>.carousel li::scroll-marker{ content:''; }</code> and style the active dot with <code>.carousel li::scroll-marker:target-current{ background:var(--accent); }</code>.",
      "Add prev/next buttons the browser wires up: <code>.carousel::scroll-button(left){ content:'⬅' / 'Scroll left'; }</code> and <code>::scroll-button(right){ content:'⮕' / 'Scroll right'; }</code> — the text after <code>/</code> is the accessible label, and a disabled button auto-hides at the ends.",
      "Delete the old JS carousel/init — keyboard arrows, focus order and a tablist screen-reader experience are handled by the engine.",
      "Treat the buttons/dots as progressive enhancement: in Firefox/Safari the markup is still a usable swipe/scroll carousel, so no fallback code is needed (optionally gate enhancements with <code>@supports selector(::scroll-marker)</code>)."
    ],
    confidence: "emerging",
    status: "active",
    thread_id: "thread-modern-css-primitives",
    supersedes: [],
    related: ["card-webdesign-sibling-index", "card-webdesign-gap-decorations", "card-webdesign-squircle-corners", "card-web-view-transitions"],
    sources: [
      { label: "Chrome for Developers — Carousels with CSS", url: "https://developer.chrome.com/blog/carousels-with-css" },
      { label: "MDN — ::scroll-marker-group", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/::scroll-marker-group" },
      { label: "SitePoint — Scroll-driven CSS in 2026: carousels without JavaScript", url: "https://www.sitepoint.com/scrolldriven-css-in-2026-building-carousels-without-javascript/" }
    ],
    tags: ["css", "carousel", "accessibility", "scroll-snap", "no-js"],
    created: "2026-06-13",
    updated: "2026-06-13"
  },

  {
    id: "card-paid-aimax-dsa-experiment",
    domains: ["paid"],
    title: "Use Google's DSA reprieve to prove AI Max on your account before the forced migration",
    action: "In Google Ads → Experiments, run AI Max for Search 50/50 against your live DSA campaign for 2–4 weeks and judge it on CPA/ROAS + wasted-query rate, not clicks.",
    summary: "Google delayed the automatic Dynamic Search Ads → AI Max migration from Sept 2026 to Feb 2027 and restores DSA creation on Jun 15, 2026 — a window to test AI Max as a controlled experiment instead of being auto-migrated blind.",
    why: "AI Max for Search is replacing DSA whether you like it or not, but the auto-migration is a black box. The operator edge is the same 'guarded manual control proves the AI's lift on YOUR account' move we apply to Meta Advantage+: migrate on evidence, with brand-term and irrelevant-query guardrails already dialed in, not on a deadline.",
    how: [
      "Confirm your DSA campaigns still run; from Jun 15 you can also create/edit DSAs normally during the testing window.",
      "In <b>Google Ads → Experiments</b>, create an experiment that runs <b>AI Max for Search</b> against your existing DSA campaign with a <b>50/50</b> budget split.",
      "Before launch, set the guardrails AI Max needs: tight <b>brand exclusions</b>, negative keyword lists, and URL/location/text controls so it can't spend on irrelevant or brand queries.",
      "Run <b>2–4 weeks</b>, then judge on <b>CPA/ROAS and the wasted-query rate</b> (pull the search-terms report) — not raw clicks or impressions, which AI Max will inflate.",
      "If it wins, use the voluntary migration tool now; if it loses, keep DSA and re-test before Jan 2027 (new-DSA creation ends Jan 2027; auto-migration begins Feb 2027).",
      "Audit any SOP/onboarding doc that says 'build a DSA' so juniors don't ship the wrong campaign type as the menus change."
    ],
    confidence: "emerging",
    status: "active",
    supersedes: [],
    related: ["card-paid-meta-advantage-plus"],
    sources: [
      { label: "Search Engine Land — Google delays DSA migration to AI Max", url: "https://searchengineland.com/google-delays-dynamic-search-ads-migration-to-ai-max-480049" },
      { label: "Search Engine Journal — Google extends DSA migration deadline", url: "https://www.searchenginejournal.com/google-extends-dynamic-search-ads-migration-deadline/579074/" },
      { label: "PPC Land — Google delays DSA-to-AI Max automigration to February 2027", url: "https://ppc.land/google-delays-dsa-to-ai-max-automigration-to-february-2027/" }
    ],
    tags: ["google-ads", "ai-max", "dynamic-search-ads", "experiments"],
    created: "2026-06-13",
    updated: "2026-06-13"
  },

  {
    id: "card-social-instagram-your-algorithm",
    domains: ["social"],
    title: "Make Instagram file your posts under one clear topic users can opt into",
    action: "Open Instagram's 'Your Algorithm' topic list to see how IG categorizes content, then name your post's topic in the first caption line + on-screen text + first 3 seconds.",
    summary: "Instagram expanded its 'Your Algorithm' controls to the main feed (Jun 12, 2026): an LLM turns each user's behavior into plain-language topics they can add or remove. Reach now depends on the model confidently filing your post under a topic users choose to see more of.",
    why: "When viewers can explicitly add 'more of this topic' (and remove yours), a muddy, off-niche post isn't just ignored — it gets 'show less'-ed out of the people who'd convert. Clear, consistent topical signaling is the new distribution lever, and it mirrors the durable rule: design your inputs for the signal the AI now ranks on.",
    how: [
      "On your own account, open <b>Your Algorithm</b> (Settings → the recommendation/topic controls) and read the topics Instagram has inferred — that's roughly how it's classifying content like yours.",
      "Pick <b>one</b> topic per post and name it explicitly: put the topic phrase in the <b>first line of the caption</b>, in <b>on-screen text</b>, and spoken/shown in the <b>first 3 seconds</b> of a Reel — give the model unambiguous signals to embed.",
      "Hold a <b>consistent niche</b> across posts so your account accrues a strong topic association users can opt into; quarantine off-topic personal posts to Stories.",
      "Add a 'send this to…' / save-worthy payoff so the post also earns the sends + saves signals that still drive distribution (pair with card-social-instagram-sends).",
      "Spot-check after a week: do your topics in Your Algorithm sharpen toward your niche? If they're scattered, your signaling is too mixed."
    ],
    confidence: "emerging",
    status: "active",
    supersedes: [],
    related: ["card-social-instagram-sends", "card-social-linkedin-ai-citations"],
    sources: [
      { label: "Search Engine Land — Instagram's Your Algorithm expands to the main feed", url: "https://searchengineland.com/instagram-your-algorithm-expands-main-feed-479922" },
      { label: "Social Media Today — Instagram extends Your Algorithm to the main feed", url: "https://www.socialmediatoday.com/news/instagram-extends-your-algorithm-to-the-main-feed/822576/" },
      { label: "Engadget — You can personalize your Instagram algorithm now", url: "https://www.engadget.com/2191695/you-can-personalize-your-instagram-algorithm-now/" }
    ],
    tags: ["instagram", "algorithm", "reach", "content-strategy"],
    created: "2026-06-13",
    updated: "2026-06-13"
  },

  {
    id: "card-webdev-vercel-workflow-nitro",
    domains: ["web-dev"],
    title: "Add durable, crash-proof background jobs to any full-stack app with two directives",
    action: "In a Nitro v3 app, npm i workflow, add modules: [\"workflow/nitro\"] to nitro.config, then mark a function \"use workflow\" and its sub-steps \"use step\".",
    summary: "Vercel's Workflow SDK now runs natively in Nitro v3 (Jun 13, 2026), so any Nitro/Vite full-stack app — not just Next.js — gets durable execution. A \"use workflow\" function checkpoints each \"use step\", so the job resumes from the last completed step after a crash/timeout, failed steps auto-retry, and sleep() suspends for seconds-to-days with no compute cost.",
    why: "The jobs that actually break in production are the long, multi-step ones — onboarding sequences, payment/fulfilment, AI pipelines that call-wait-call. Hand-rolled, a restart mid-sequence loses state or double-acts. Durable workflows make the reliable do→wait→do shape a two-directive primitive instead of a queue + state machine you maintain by hand.",
    how: [
      "Install: <code>npm i workflow</code>.",
      "Register the module in <code>nitro.config.ts</code>: <code>export default defineConfig({ modules: [\"workflow/nitro\"] })</code>.",
      "Orchestrator gets <code>\"use workflow\"</code>; each unit of work gets <code>\"use step\"</code>: <code>export async function onboard(email){ \"use workflow\"; const u = await createUser(email); await sleep(\"5s\"); await sendWelcome(u); }</code>",
      "Kick it off from a route: <code>import { start } from \"workflow/api\"</code> → <code>await start(onboard, [email])</code>.",
      "Make every step idempotent (a retried step must not double-act); throw <code>FatalError</code> for the genuinely unrecoverable case so it skips retries.",
      "Deploy to Vercel with <b>Fluid compute</b> enabled — that powers the efficient suspend/resume. (Nitro v3 integration is beta; works best on Vercel for now.)"
    ],
    confidence: "emerging",
    status: "active",
    supersedes: [],
    related: ["card-ai-tooling-claude-workflows", "card-webdev-ai-gateway-spend-limits"],
    sources: [
      { label: "Vercel Changelog — Workflow SDK now runs natively in Nitro v3", url: "https://vercel.com/changelog/workflow-sdk-now-runs-natively-in-nitro-v3" },
      { label: "Workflow SDK Docs — Getting started on Nitro", url: "https://workflow-sdk.dev/docs/getting-started/nitro" },
      { label: "Vercel Docs — Workflows", url: "https://vercel.com/docs/workflows" }
    ],
    tags: ["vercel", "nitro", "workflows", "durable-execution", "backend"],
    created: "2026-06-13",
    updated: "2026-06-13"
  },

  {
    id: "card-graphic-figma-capture-layers",
    domains: ["graphic"],
    title: "Capture any live webpage as editable Figma layers — not a screenshot",
    action: "Install the Figma Capture Chrome extension, open a page, click Capture page (or Select element), then paste into Figma Design as editable layers.",
    summary: "Figma's official Chrome extension (Jun 11, 2026) brings any live webpage onto the canvas as real frames, text, images and vectors — so you can restyle the type, recolour to a client's palette, and reuse the layout as a starting point instead of tracing a flat PNG.",
    why: "Design work means studying things that already exist — a competitor's pricing table, a dashboard empty state, a checkout you want to beat. A screenshot you can only trace over (or a slow manual rebuild) becomes real spacing, type scale and structure you can deconstruct and riff on in minutes. It's the 'pull real-world structure in as data, then riff' move applied to live UI.",
    how: [
      "Install the <b>Figma Capture</b> Chrome extension from the Chrome Web Store and sign in.",
      "Open the page you want to study and click the extension in the toolbar.",
      "Choose <b>Capture page</b> for the whole thing, or <b>Select element</b> → hover to highlight → click to grab one component.",
      "Switch to a Figma Design file and <b>paste</b> — it lands as editable layers.",
      "Work it: recolour to brand hexes (pair with Khroma — card-graphic-color-palette), swap fonts/copy, detach what you need, keep it as a reference frame beside your redesign.",
      "Treat it as a <b>starting point</b>, not a deliverable — tidy the layer tree and rebuild messy nodes as proper components."
    ],
    confidence: "confirmed",
    status: "active",
    supersedes: [],
    related: ["card-graphic-color-palette", "card-graphic-ideogram-json-layout"],
    sources: [
      { label: "Figma Learn — Capture web pages to layers with the Chrome extension", url: "https://help.figma.com/hc/en-us/articles/40826832449303-Capture-web-pages-to-layers-with-the-Figma-Chrome-extension" },
      { label: "Figma — Release notes (Jun 11, 2026)", url: "https://www.figma.com/release-notes/" },
      { label: "Chrome Web Store — Figma Capture", url: "https://chromewebstore.google.com/detail/figma-capture/hpfddkbihgmhfbbimeoipehenhijemph" }
    ],
    tags: ["figma", "chrome-extension", "layout", "ui"],
    created: "2026-06-13",
    updated: "2026-06-13"
  },

  {
    id: "card-email-micro-animation",
    domains: ["email"],
    title: "Add one purposeful micro-animation that survives Gmail's clip and Outlook",
    action: "Design the static email first, then layer ONE small GIF motion (CTA pulse / progress bar / product cycle) whose first frame is a standalone static fallback.",
    summary: "Motion in email earns attention only when it's intentional and engineered for the inbox. The durable recipe (Litmus): static-first design, then one small animated GIF for a single job, kept light and short — worst case in a client that strips animation is your deliberate first frame, not a broken layout.",
    why: "A subtle, well-placed motion lifts click-through on the element that matters without the fragility of AMP/interactive email (patchy client support). Because it's a GIF, it degrades gracefully everywhere — far safer than betting on interactive features most clients don't render.",
    how: [
      "Design the <b>static</b> email first and confirm it fully works with no motion — that frame is your fallback.",
      "Pick <b>one</b> element to animate with a clear function (CTA, progress bar, product variations, urgency cue).",
      "Export a tight GIF: make the <b>first frame</b> the standalone static version, and <b>stop the loop after 2–3 repeats</b>.",
      "Watch weight: keep total assets under ~<b>1–1.5MB</b> and know your baseline HTML size — <b>Gmail clips at ~102KB</b>, which can hide your footer/unsubscribe.",
      "Place it <b>above the fold</b>; <b>never</b> use flashing/strobing content (photosensitive-seizure risk).",
      "Render-test across Gmail/Outlook/Apple Mail (Litmus or Email on Acid) and confirm the static fallback looks intentional everywhere."
    ],
    confidence: "confirmed",
    status: "active",
    supersedes: [],
    related: ["card-email-omnisend-mcp"],
    sources: [
      { label: "Litmus — Micro Animations, Macro Impact: 10 use-cases you can try today", url: "https://www.litmus.com/blog/micro-animations-macro-impact-10-use-cases-you-can-try-today" }
    ],
    tags: ["email", "animation", "gif", "design"],
    created: "2026-06-13",
    updated: "2026-06-13"
  },

  {
    id: "card-ai-tooling-model-portability",
    domains: ["ai-tooling", "web-dev"],
    title: "Route AI calls through a gateway with a fallback model list so a yanked model can't take you down",
    action: "Put your LLM calls behind a gateway (OpenRouter / Vercel AI Gateway / Cloudflare) and declare a priority list of independent fallback models.",
    summary: "If your app calls a single model ID directly and that model is pulled, deprecated or rate-limited, your feature is down until someone ships a code change. A gateway turns that into config-level failover — declare a priority list and it tries the next model on error, so a vanished model degrades gracefully instead of breaking.",
    why: "The Jun 12 US government order to disable Claude Fable 5 and Mythos 5 for all customers is the lesson in one headline: the capability you rent can disappear on someone else's order. Model portability is the cheap insurance — uptime that doesn't depend on any one provider's availability.",
    how: [
      "Put LLM calls behind a <b>gateway/router</b> (OpenRouter, Vercel AI Gateway, or Cloudflare AI Gateway) instead of a single-provider SDK.",
      "With <b>OpenRouter</b>, pass a <code>models</code> array in priority order (up to 3) — on error it auto-tries the next, and you're billed for whichever ran.",
      "Pick <b>genuinely independent</b> fallbacks — a different provider for the backup (e.g. a Claude primary with an OpenAI or open-weight fallback) so a single-vendor outage can't take out both.",
      "Keep prompts model-portable (avoid one model's proprietary quirks) and log which model served each request so you can see when you're silently on the backup.",
      "Validate the backup clears your task's quality bar before relying on it, and alert on fallback so a 'temporary' downgrade doesn't become permanent.",
      "Pair with a hard spend cap (card-webdev-ai-gateway-spend-limits) so failover can't quietly route you to a pricier model unbudgeted."
    ],
    confidence: "emerging",
    status: "active",
    thread_id: "thread-govern-ai-spend",
    supersedes: [],
    related: ["card-webdev-ai-gateway-spend-limits", "card-ai-tooling-fable5-retention"],
    sources: [
      { label: "OpenRouter — Model Fallbacks (automatic failover)", url: "https://openrouter.ai/docs/guides/routing/model-fallbacks" },
      { label: "Vercel — AI Gateway", url: "https://vercel.com/docs/ai-gateway" },
      { label: "Anthropic — Statement on the US directive to suspend Fable 5 / Mythos 5", url: "https://www.anthropic.com/news/fable-mythos-access" }
    ],
    tags: ["llm", "resilience", "gateway", "openrouter", "failover"],
    created: "2026-06-13",
    updated: "2026-06-13"
  },

  {
    id: "card-webdesign-sibling-index",
    domains: ["web-design"],
    title: "Stagger a list animation (or build a math layout) with one line of CSS — no JS, no inline styles",
    action: "On the children of a list, add transition-delay: calc((sibling-index() - 1) * 60ms) and test in Chrome/Edge 137+.",
    summary: "CSS sibling-index() and sibling-count() let an element read its own 1-based position and the total count, so staggered reveals, center-out cascades and per-item ramps become pure CSS calc() — the timing recalculates itself when items change, no :nth-child() stacks and no per-node --i custom property from a JS loop.",
    why: "The staggered list reveal is one of the most-requested motion details on client sites, and today it's faked with brittle hand-written :nth-child() delays or extra markup from a framework loop. These functions delete both hacks — and because unsupported browsers just ignore them (everything animates together), it's pure progressive enhancement you can ship now.",
    how: [
      "Apply it to the <b>children</b>, not the container: <code>li { transition: opacity .3s, translate .3s; transition-delay: calc((sibling-index() - 1) * 60ms); }</code> with <code>@starting-style { li { opacity:0; translate:0 8px; } }</code> for an enter animation.",
      "Center-out cascade: delay by distance from the middle — <code>calc(abs(sibling-index() - (sibling-count() + 1) / 2) * 60ms)</code>.",
      "Per-item ramps work too (no animation needed): <code>opacity: calc(1 - (sibling-index() - 1) * 0.1)</code> for a fading list, or feed sibling-index() into <code>hsl()</code> / <code>rotate()</code> for radial menus.",
      "Optional clean baseline: wrap the enhancement in <code>@supports (top: sibling-index()) { ... }</code> so non-supporting browsers get a deliberate fallback.",
      "Keep it decorative — Chromium-only for now, so never rely on it for load-bearing layout until a 2nd engine ships."
    ],
    confidence: "emerging",
    status: "active",
    thread_id: "thread-modern-css-primitives",
    supersedes: [],
    related: ["card-webdesign-gap-decorations", "card-webdesign-squircle-corners", "card-web-view-transitions"],
    sources: [
      { label: "MDN — sibling-index()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/sibling-index" },
      { label: "MDN — sibling-count()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/sibling-count" },
      { label: "Smashing Magazine — Mathematical layouts with sibling-index() and sibling-count()", url: "https://www.smashingmagazine.com/2026/05/mathematical-layouts-sibling-index-sibling-count/" }
    ],
    tags: ["css", "animation", "ui"],
    created: "2026-06-11",
    updated: "2026-06-11"
  },

  {
    id: "card-ai-tooling-claude-workflows",
    domains: ["ai-tooling"],
    title: "Orchestrate a planner→worker→verifier agent team in Claude Code with /workflows",
    action: "In Claude Code, phrase a big decomposable job and include the word 'workflow', then watch it run with /workflows.",
    summary: "Claude Code's dynamic workflows (research preview, late May 2026) let you describe a large task with the word 'workflow' and Claude writes and runs an orchestration script that fans the work across subagents; a June update added nested subagents (up to 5 levels). It makes the reliable planner→worker→verifier→merge shape a built-in primitive.",
    why: "The biggest failure mode of agentic work isn't model IQ — it's overloading one session until its context turns to mush and it edits the wrong files. Fanning a job across scoped subagents with an independent verifier is how you stay correct on the jobs that actually eat time: full-repo audits, migrations, 'rename this across 40 files', or multi-angle PR review.",
    how: [
      "Take a big, decomposable job and phrase it as a workflow, e.g. <code>Audit this codebase for dead exports and unused deps — use a workflow: one agent maps the module graph, parallel agents check each package, a verifier confirms each finding is really unused before reporting.</code>",
      "Run it and watch with <code>/workflows</code> — it composes the orchestration script and runs the subagents with live progress.",
      "Bias toward <b>fan-out + verify</b>: independent workers for breadth, plus a skeptic agent prompted to <i>refute</i> each finding before it's accepted (kills plausible-but-wrong results).",
      "Make external actions idempotent and checkpoint each step so a retried agent never double-acts.",
      "Once a workflow earns its keep, save it as a reusable AI Skill (markdown runbook) so the team triggers it by name."
    ],
    confidence: "emerging",
    status: "active",
    supersedes: [],
    related: ["card-ai-tooling-reusable-skills", "card-webdev-copilot-cli-lsp"],
    sources: [
      { label: "Anthropic — Claude Code", url: "https://www.anthropic.com/product/claude-code" },
      { label: "Claude Code Docs — Skills", url: "https://code.claude.com/docs/en/skills" },
      { label: "InfoQ — Code with Claude: managed agents, proactive workflows", url: "https://www.infoq.com/news/2026/05/code-with-claude/" }
    ],
    tags: ["claude-code", "agents", "orchestration", "workflow"],
    created: "2026-06-11",
    updated: "2026-06-11"
  },

  {
    id: "card-growth-ai-visibility-check",
    domains: ["growth"],
    title: "Check today whether ChatGPT and Gemini actually mention your brand (free, no login)",
    action: "Paste your domain into Semrush's free AI Search Visibility Checker, read the 0–100 score, and grab the high-volume prompts where you're not mentioned.",
    summary: "AEO finally has a measurement layer. Semrush's free AI Search Visibility Checker takes just a domain (no sign-up) and returns an AI Visibility Score (0–100), which engines mention you (ChatGPT, SearchGPT, Gemini, Google AI, Perplexity), competitor comparison, the prompts that trigger your brand, and the high-volume prompts where you're invisible — a ready-made fix list. Ahrefs Brand Radar and Semrush's AI Toolkit do continuous tracking.",
    why: "AEO advice is only worth acting on if you can see whether it worked — and buyers increasingly start at an AI answer, where most brands are effectively invisible. This closes the loop: measure where you're absent, run the AEO formatting pass on exactly those pages, then re-measure.",
    how: [
      "Open <b>Semrush's free AI Search Visibility Checker</b>, enter your (or a client's) domain, and hit <b>Check Visibility</b>.",
      "Read the <b>0–100 score</b> + platform coverage to see which AI engines name you and which don't.",
      "Jump to the <b>'opportunities'</b> — high-volume prompts where competitors are named and you aren't; that's your prioritized target list.",
      "For each gap prompt, apply the AEO formatting pass (intent-matched title → one-sentence answer up top → list/table → original first-party stat → FAQ schema + last-updated date) on the most relevant money page.",
      "Re-run in ~2–4 weeks to confirm new mentions; for ongoing tracking use Ahrefs Brand Radar or Semrush's AI Toolkit, and sample the actual AI answers by hand to see how you're described."
    ],
    confidence: "emerging",
    status: "active",
    thread_id: "thread-answer-engine-optimization",
    supersedes: [],
    related: ["card-growth-aeo-content-formats", "card-social-linkedin-ai-citations"],
    sources: [
      { label: "Semrush — Free AI Search Visibility Checker", url: "https://www.semrush.com/free-tools/ai-search-visibility-checker/" },
      { label: "Semrush — AI Visibility features", url: "https://www.semrush.com/kb/1626-ai-visibility-features" },
      { label: "Ahrefs — Brand Radar", url: "https://ahrefs.com/brand-radar" }
    ],
    tags: ["aeo", "geo", "ai-search", "measurement"],
    created: "2026-06-11",
    updated: "2026-06-11"
  },

  {
    id: "card-webdev-copilot-cli-lsp",
    domains: ["web-dev"],
    title: "Give your terminal AI real code intelligence — wire a language server into Copilot CLI",
    action: "In Copilot CLI, install the LSP Setup skill, then say 'set up LSP for <your language>' and run /lsp to confirm.",
    summary: "GitHub Copilot CLI now drives Language Server Protocol servers, so the terminal agent gets IDE-grade semantics — go-to-definition into dependencies, find-all-references, project-wide rename, type resolution — instead of grepping and guessing.",
    why: "Agentic/terminal coding is where a lot of AI dev work happens now, and the worst failure mode is the agent hallucinating a symbol or editing the wrong call site because it never saw the code graph. A language server turns it from a fuzzy text-searcher into something that resolves your types — fewer wrong edits, reliable renames, and far less context burned reading files it didn't need.",
    how: [
      "Install the <b>LSP Setup skill</b> (a reusable markdown runbook): extract it to <code>~/.copilot/skills/</code> and restart Copilot CLI.",
      "Ask in plain English: <code>set up LSP for Java</code> or <code>enable code intelligence for Python</code> — the skill installs the right server (e.g. <code>npm i -g typescript typescript-language-server</code>, or <code>brew install jdtls</code> for Java) and writes config to <code>~/.copilot/lsp-config.json</code> (user) or <code>lsp.json</code> (repo). It covers 14 languages.",
      "Run <code>/lsp</code> to confirm the server is running.",
      "Test it: ask the agent to <i>find all references to</i> a symbol or <i>rename</i> it across the project, and watch it resolve into third-party libraries.",
      "Commit the repo-level <code>lsp.json</code> so every teammate's agent shares the same code intelligence."
    ],
    confidence: "emerging",
    status: "active",
    supersedes: [],
    related: ["card-ai-tooling-reusable-skills", "card-webdev-v0-screenshot"],
    sources: [
      { label: "GitHub Blog — Give Copilot CLI real code intelligence with language servers", url: "https://github.blog/ai-and-ml/github-copilot/give-github-copilot-cli-real-code-intelligence-with-language-servers/" },
      { label: "GitHub Docs — Using LSP servers with Copilot CLI", url: "https://docs.github.com/en/copilot/concepts/agents/copilot-cli/lsp-servers" }
    ],
    tags: ["github-copilot", "cli", "lsp", "ai-codegen"],
    created: "2026-06-10",
    updated: "2026-06-10"
  },

  {
    id: "card-social-linkedin-ai-citations",
    domains: ["social"],
    title: "Write LinkedIn articles that AI search engines cite (LinkedIn is the #2 source)",
    action: "Publish an original 500–2,000-word LinkedIn article answering one specific buyer question, lead with a one-sentence answer, and post consistently.",
    summary: "Semrush's analysis of 89K cited LinkedIn URLs found LinkedIn is the #2 most-cited domain in AI answers (behind Reddit); original, educational 500–2,000-word articles win citations far more than viral feed posts.",
    why: "Buyers increasingly ask ChatGPT/Perplexity 'who's good at X', and the answer is pulled from LinkedIn — so a LinkedIn presence is now a Generative Engine Optimization (GEO) surface: a discovery channel into AI answers you win with craft, not ad spend.",
    how: [
      "List the 3–5 questions a buyer would ask an AI in your space (\"best [service] for [use case]\", \"how to [outcome]\").",
      "For each, publish a LinkedIn <b>article</b> (not just a feed post) of <b>500–2,000 words</b> that answers it directly — lead with a clean one-sentence answer, then expand with original POV + your own data (~95% of cited content is original; reshares barely get cited).",
      "Post <b>consistently</b> — cited authors averaged 5+ posts in 4 weeks; you don't need virality, moderate relevant engagement (15–25 reactions) is enough.",
      "Reuse assets: paste a blog post or talk transcript into Claude, ask for a LinkedIn article in your voice, then add first-party numbers.",
      "Spot-check: ask ChatGPT/Perplexity your target question and see if you (or a competitor) get named; iterate."
    ],
    confidence: "emerging",
    status: "active",
    thread_id: "thread-answer-engine-optimization",
    corroboration_count: 2,
    supersedes: [],
    related: ["card-growth-aeo-content-formats", "card-social-repurpose-claude"],
    sources: [
      { label: "Semrush — We analyzed 89K LinkedIn URLs cited in AI search", url: "https://www.semrush.com/blog/linkedin-ai-visibility-study/" },
      { label: "PPC Land — How LinkedIn content earns AI-search citations (Semrush)", url: "https://ppc.land/semrush-maps-how-linkedin-content-earns-citations-in-ai-search-tools/" }
    ],
    tags: ["linkedin", "geo", "aeo", "ai-search"],
    created: "2026-06-10",
    updated: "2026-06-10"
  },

  {
    id: "card-ai-tooling-fable5-retention",
    domains: ["ai-tooling", "news"],
    title: "Check data retention before you route client data through Claude Fable 5",
    action: "Confirm which model your tool/Copilot uses; for confidential client data, prefer a ZDR-covered Claude model until your Fable 5 terms are confirmed in writing.",
    summary: "Claude Fable 5 (public Jun 2026) runs under a new 30-day data-retention policy — classifiers keep prompts/outputs 30 days (flagged items up to 2 years) and existing Zero-Data-Retention agreements do NOT apply to Fable 5 traffic; Microsoft restricted it internally over this.",
    why: "It's the 'two gates' rule live: a model can pass capability/cost (Fable 5 is top-tier, ~80.3% SWE-Bench) and fail data-provenance. If you or your tools send client-confidential material to Fable 5 expecting zero retention, that assumption is now wrong — and a hyperscaler (Microsoft) already pulled it internally.",
    how: [
      "Check which model your AI tool / Copilot / IDE is actually calling (Fable 5 may be a new default in some model pickers).",
      "For confidential client material, prefer a Claude model still covered by Zero Data Retention (or another ZDR/enterprise path) until terms are confirmed.",
      "Read Anthropic's Mythos-class retention page and verify — in writing — whether your enterprise agreement covers Fable 5 traffic.",
      "Bake this into your model router: tag each task by data sensitivity, not just capability and cost."
    ],
    confidence: "confirmed",
    status: "active",
    corroboration_count: 3,
    supersedes: [],
    related: ["card-webdev-ai-gateway-spend-limits"],
    sources: [
      { label: "The Verge — Microsoft restricts Claude Fable 5 internally over data retention", url: "https://www.theverge.com/report/947575/microsoft-claude-fable-5-restricted-internally" },
      { label: "Cybernews — Fable 5 data retention: no exceptions", url: "https://cybernews.com/ai-news/claude-fable-five-data-retention-collection/" },
      { label: "Anthropic — Data retention practices for Mythos-class models", url: "https://support.claude.com/en/articles/15425996-data-retention-practices-for-mythos-class-models" }
    ],
    tags: ["claude", "data-governance", "privacy", "compliance"],
    created: "2026-06-10",
    updated: "2026-06-10"
  },

  {
    id: "card-webdesign-gap-decorations",
    domains: ["web-design"],
    title: "Draw dividers between grid/flex items with one line of CSS — drop the pseudo-element hacks",
    action: "On a grid or flex container that already has a gap, add column-rule: 1px solid #ddd (and row-rule) and test in Chrome/Edge 149+.",
    summary: "Chrome 149's CSS Gap Decorations extend column-rule to Grid and Flexbox and add a new row-rule, so separators paint directly in the gap with the familiar width/style/color shorthand — no extra divs, pseudo-elements, or background-gradient tricks.",
    why: "Card/sidebar/dashboard/pricing-table separators are some of the most-repeated UI in any design system, and today they're faked with markup that breaks the moment items wrap or the count changes. This deletes that scar tissue — and because the rules are purely decorative, unsupported browsers just show an empty gap, so it's pure progressive enhancement you can ship to production now.",
    how: [
      "Confirm Chrome/Edge 149+ (<code>chrome://version</code>) — it's default-on in stable, no flag.",
      "On a grid/flex container that already has a <code>gap</code>, add the lines: <code>.cards { display:grid; grid-template-columns:repeat(3,1fr); gap:2rem; column-rule:1px solid #ddd; row-rule:1px solid #ddd; }</code>",
      "Want lines only between items (not trailing past a short last row)? Add <code>column-rule-visibility-items: visible</code> / <code>row-rule-visibility-items: visible</code>.",
      "Animate on hover (width/colour/inset are animatable): <code>.cards{transition:column-rule-color .3s} .cards:hover{column-rule-color:#3b82f6}</code>. No <code>@supports</code> guard needed.",
      "Keep it decorative — Chromium-only for now, so don't rely on it for load-bearing layout until Safari/Firefox follow."
    ],
    confidence: "emerging",
    status: "active",
    thread_id: "thread-modern-css-primitives",
    supersedes: [],
    related: ["card-webdesign-squircle-corners", "card-web-view-transitions"],
    sources: [
      { label: "Chrome for Developers — Gap decorations now in Chromium (149)", url: "https://developer.chrome.com/blog/gap-decorations-stable" },
      { label: "Chrome 149 release notes", url: "https://developer.chrome.com/release-notes/149" }
    ],
    tags: ["css", "ui", "layout"],
    created: "2026-06-09",
    updated: "2026-06-09"
  },

  {
    id: "card-graphic-ideogram-json-layout",
    domains: ["graphic"],
    title: "JSON-prompt Ideogram 4.0 to nail headlines, hex colours, and layout on the first try",
    action: "Generate at ideogram.ai with a JSON object that declares your text strings, brand hex palette, and each element's bounding box — not a sentence.",
    summary: "Ideogram 4.0 (open-weight, Jun 2026) was trained exclusively on structured JSON captions, so you prompt it like a design brief: typed text layers (spelled right, ~0.97 OCR), per-element bounding boxes on a 0–1000 grid, and a colour palette of up to 16 hex codes.",
    why: "It kills the two worst failure modes of AI image gen for real design work — garbled in-image text and 'it ignored my layout.' Declaring copy, position and brand hexes as data makes output repeatable and templatable: swap the text + palette fields over a fixed layout to mass-produce posters, packaging, signage or a card set.",
    how: [
      "Go to <b>ideogram.ai</b> (or the API at developer.ideogram.ai) and generate with a JSON object, not prose — prose underperforms because the model is trained on JSON.",
      "Use the schema: top-level <code>high_level_description</code>, a <code>style_description</code> with <code>color_palette</code> = your brand hexes (up to 16), and a <code>compositional_deconstruction.elements</code> array.",
      "Place each element with a typed entry, e.g. <code>{type:\"text\", bbox:[50,150,150,850], text:\"GOLDCREST\", desc:\"bold black serif caps, centered top\"}</code> — <code>bbox</code> is row-first <code>[y_min,x_min,y_max,x_max]</code>, 0–1000, origin top-left.",
      "Keep key order intact (<code>type</code> → <code>bbox</code> → <code>text</code>/<code>desc</code>); iterate by editing only the wrong field (nudge a bbox), not by re-describing the whole image.",
      "For commercial work use the web app/API (commercial tiers) — the open weights are non-commercial, so local/ComfyUI is for prototyping only."
    ],
    confidence: "emerging",
    status: "active",
    supersedes: [],
    related: ["card-graphic-font-pairing", "card-graphic-color-palette"],
    sources: [
      { label: "Ideogram — 4.0 (open-weight, JSON-prompted)", url: "https://ideogram.ai/blog/ideogram-4.0/" },
      { label: "Ideogram 4 — prompting schema (GitHub)", url: "https://github.com/ideogram-oss/ideogram4/blob/main/docs/prompting.md" }
    ],
    tags: ["ai-image", "typography", "ideogram"],
    created: "2026-06-09",
    updated: "2026-06-09"
  },

  {
    id: "card-email-omnisend-mcp",
    domains: ["email"],
    title: "Audit your whole email program in plain English by wiring Omnisend into Claude (MCP)",
    action: "Add Omnisend's MCP server (mcp.omnisend.com/mcp) to Claude as a custom connector, then ask it to rank campaigns by revenue and flag deliverability issues.",
    summary: "Omnisend shipped a hosted MCP server, so an AI client (Claude/ChatGPT) can read your live account — campaign performance, deliverability diagnostics, subject-line insights, automation revenue, form/subscriber data — and answer in natural language.",
    why: "It kills the export-to-spreadsheet loop that eats an email operator's morning: ask a question, get an answer grounded in your real numbers, and stand up zero-code lifecycle triggers (e.g. a daily Gmail draft summarising new subscribers) without touching Zapier. It's the 'controls collapse into AI defaults' move arriving in the ESP.",
    how: [
      "In Claude, open the left menu → <b>Customize → Connectors</b>.",
      "Click <b>+ → Add custom connector</b>, name it <code>Omnisend</code>, paste the server URL <code>https://mcp.omnisend.com/mcp</code>, click <b>Add</b>.",
      "Select the connector → <b>Connect</b>, then complete the Omnisend <b>OAuth</b> sign-in (no API key to copy/paste).",
      "In a new chat: \"Use the Omnisend connector — give me an account snapshot, rank last 30 days of campaigns by attributed revenue, and flag any with deliverability issues plus one fix each.\"",
      "Always review any AI-drafted send before it goes out. (The native one-click Claude connector is 'coming soon' — the custom-connector route works today.)"
    ],
    confidence: "emerging",
    status: "active",
    thread_id: "thread-platform-ai-defaults",
    supersedes: [],
    related: ["card-email-dmarc-bimi"],
    sources: [
      { label: "Omnisend — Connect MCP to AI tools", url: "https://support.omnisend.com/en/articles/15096086-connect-omnisend-mcp-to-ai-tools" },
      { label: "Omnisend MCP — product page", url: "https://www.omnisend.com/ai/mcp/" }
    ],
    tags: ["mcp", "omnisend", "deliverability"],
    created: "2026-06-09",
    updated: "2026-06-09"
  },

  {
    id: "card-webdev-rotate-ai-toolchain",
    domains: ["web-dev"],
    title: "Patch-and-rotate: lock down your AI coding toolchain after the Jun 2026 supply-chain hit",
    action: "Rotate any tokens that have been live in a Claude Code / Gemini CLI / VS Code session that touched untrusted repos, and confirm your Linux kernels are on the post-Feb-5 nf_tables patch.",
    summary: "Two same-day (Jun 8 2026) threats put the AI dev toolchain in the blast radius: password-stealing malware that fires when certain compromised Microsoft OSS repos are opened inside an agentic IDE, and a one-character Linux nf_tables bug (CVE-2026-23111) with a now-public local-root exploit.",
    why: "The threat model shifted: merely opening a poisoned repo in an agentic IDE (which can auto-run tasks, read env files, run setup scripts) is now enough to exfiltrate the secrets in your AI dev session — and an unpatched kernel turns any foothold into instant root. Treating 'open a repo' as code execution and rotating exposed keys is the cheap insurance.",
    how: [
      "Audit recent pulls/clones of Microsoft/Azure OSS repos (the Durable Task project was named among 70+ disabled repos).",
      "Rotate credentials, API keys and tokens that have been present in a Claude Code / Gemini CLI / VS Code session that touched untrusted code.",
      "Clone unknown repos into a sandbox/devcontainer with no live secrets before opening them in an agentic IDE.",
      "Run <code>uname -r</code> and check it against your distro's advisory for CVE-2026-23111 (Debian/Ubuntu/RHEL all patched after Feb 5); prioritise multi-tenant and container hosts.",
      "Apply the kernel update and reboot affected hosts."
    ],
    confidence: "confirmed",
    status: "active",
    corroboration_count: 2,
    supersedes: [],
    related: [],
    sources: [
      { label: "TechCrunch — Microsoft OSS tools hacked to steal AI-dev passwords", url: "https://techcrunch.com/2026/06/08/microsofts-open-source-tools-were-hacked-to-steal-passwords-of-ai-developers/" },
      { label: "The Hacker News — one-character Linux kernel root flaw (CVE-2026-23111)", url: "https://thehackernews.com/2026/06/one-character-linux-kernel-flaw-enables.html" }
    ],
    tags: ["security", "supply-chain", "linux"],
    created: "2026-06-09",
    updated: "2026-06-09"
  },

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
    thread_id: "thread-answer-engine-optimization",
    corroboration_count: 2,
    supersedes: [],
    related: ["card-social-linkedin-ai-citations"],
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
    related: ["card-graphic-font-pairing", "card-graphic-figma-capture-layers"],
    sources: [{ label: "Khroma — AI colour tool", url: "https://www.khroma.co" }],
    tags: ["colour", "khroma"],
    created: "2026-06-07",
    updated: "2026-06-13"
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
    action: "In Ads Manager, create a Sales-objective campaign with the three Advantage+ levers on, read its 0–100 Opportunity Score, and keep one small manual ad set as a control.",
    summary: "Meta merged the old 'Manual' and 'Advantage+ Shopping' options into one flow: pick the Sales objective and the Advantage+ levers (budget, audience, placements) are on by default — that IS the old ASC, now auto-handling targeting, placements and creative for cold traffic. Meta also shipped a 0–100 Opportunity Score (a setup-health grade) to all advertisers and halved the learning-phase bar to ~25 conversions/week.",
    why: "You stop babysitting audiences and spend your time on creative (the real lever), while the algorithm finds buyers faster and often at a lower cost per purchase. The Opportunity Score gives you a 10-second triage of how well a campaign is built, and the lower ~25-conv/week bar means smaller accounts can finally run the unified flow. Heads-up: any SOP that still says 'choose Advantage+ Shopping' points at a menu that no longer exists — juniors will silently build the wrong thing.",
    how: [
      "In Ads Manager, create a new campaign and choose the <b>Sales</b> objective (the old standalone 'Advantage+ Shopping' / ASC is gone — it's now Advantage+ Sales inside this unified flow).",
      "Leave the three Advantage+ levers ON — Advantage+ budget, Advantage+ audience, Advantage+ placements; that is the AI-driven setup.",
      "Add the <b>Opportunity Score</b> column (or open the campaign overview) and read the 0–100 grade — it scores creative variety, signal quality (Pixel/CAPI), audience breadth and conversion-event accuracy. Aim for <b>80+</b>; treat anything under ~60 as a structural fix-list, not a performance verdict.",
      "Upload a deep, varied creative pool — refresh creative, not audiences — and fix tracking with the Conversions API (both lift the score AND delivery).",
      "Cap existing-customer spend so budget skews to new buyers; keep one small manual ad set as a control for 2-3 weeks.",
      "Give it enough budget to clear the learning phase (now ~25 conversions/week, down from 50 — but Meta's Help Center lags, so treat the exact number as directional and confirm on the account)."
    ],
    confidence: "confirmed",
    status: "active",
    thread_id: "thread-platform-ai-defaults",
    corroboration_count: 3,
    supersedes: [],
    related: [],
    sources: [
      { label: "PPC Land — Meta's unified Advantage+ structure", url: "https://ppc.land/meta-launches-unified-api-structure-for-advantage-campaigns/" },
      { label: "Social Media Today — Meta launches Opportunity Score to all advertisers", url: "https://www.socialmediatoday.com/news/meta-launches-opportunity-score-all-advertisers/750231/" },
      { label: "Meta — About Advantage+ shopping/sales campaigns", url: "https://www.facebook.com/business/ads/advantage-plus-shopping-campaigns" }
    ],
    tags: ["meta-ads"],
    created: "2026-06-07",
    updated: "2026-06-10"
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
