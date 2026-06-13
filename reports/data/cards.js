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
    title: "Build an image carousel in pure CSS — no JavaScript, accessible out of the box",
    action: "In Chrome/Edge 135+, take a row of slides that snap into place and add three CSS rules — scroll-marker-group, ::scroll-button() and ::scroll-marker — then delete your carousel JavaScript.",
    summary: "A carousel is the sliding row of images you click through with arrows and dots. Chrome and Edge 135+ can build the whole thing in CSS, with no JavaScript. You write a row of slides that clicks into place as you scroll, then three short rules add the prev/next arrows (<code>::scroll-button()</code>), the dot navigation (<code>::scroll-marker</code> / <code>scroll-marker-group</code>), and the highlight for the dot you're on (<code>:target-current</code>). The browser also supplies the screen-reader labels, arrow-key support and focus order for free — the parts teams usually get wrong.",
    why: "The carousel is the component teams most often ship with a heavy JavaScript library AND broken accessibility (it doesn't work for keyboard or screen-reader users). Doing it in plain CSS deletes the library, the extra code the browser must download and run, and the accessibility bugs in one move — and where it isn't supported yet, it still works as a simple swipeable strip.",
    how: [
      "Make a row of slides that clicks into place as you scroll — that alone IS the carousel: <code>.carousel{ overflow-x:auto; scroll-snap-type:x mandatory; } .carousel li{ scroll-snap-align:center; }</code>",
      "Add the dots: put <code>scroll-marker-group: after;</code> on <code>.carousel</code>, then <code>.carousel li::scroll-marker{ content:''; }</code> makes one dot per slide, and <code>.carousel li::scroll-marker:target-current{ background:var(--accent); }</code> highlights the dot for the slide you're on.",
      "Add prev/next arrows the browser wires up for you: <code>.carousel::scroll-button(left){ content:'⬅' / 'Scroll left'; }</code> and <code>::scroll-button(right){ content:'⮕' / 'Scroll right'; }</code>. The text after the <code>/</code> is the label a screen reader reads aloud, and each arrow hides itself automatically at the end of the row.",
      "Delete your old carousel JavaScript: arrow-key navigation, focus order and the screen-reader experience are now handled by the browser.",
      "No fallback code needed — in Safari/Firefox (which don't support the controls yet) the same markup is still a usable swipe/scroll strip. To be explicit, wrap the extras in <code>@supports selector(::scroll-marker){ ... }</code>."
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
    title: "Make background jobs survive crashes with two keywords — durable workflows in any Nitro v3 app",
    action: "In a Nitro v3 app: npm i workflow, add modules: [\"workflow/nitro\"] to nitro.config, then tag the main function \"use workflow\" and each step \"use step\".",
    summary: "A background job is multi-step work that runs after a click — send the welcome email, charge the card, call an AI model, wait, call again. Vercel's Workflow SDK now plugs into Nitro v3 (the server engine behind Nuxt and other full-stack frameworks, not just Next.js), so a function you tag <code>\"use workflow\"</code> saves its progress after every <code>\"use step\"</code>. If the server crashes or times out mid-job, it resumes from the last finished step instead of starting over; a failed step retries itself; and <code>sleep()</code> can pause the job for seconds or days without costing any compute while it waits.",
    why: "The jobs that actually break in production are the long, multi-step ones — onboarding sequences, payments, AI pipelines. Built by hand, a server restart in the middle loses the job or does it twice (double-charging someone). This makes the safe do-wait-do shape two keywords instead of a queue and state machine you babysit.",
    how: [
      "Install it: <code>npm i workflow</code>.",
      "Switch it on in <code>nitro.config.ts</code>: <code>export default defineConfig({ modules: [\"workflow/nitro\"] })</code>.",
      "Tag the orchestrator <code>\"use workflow\"</code> and each unit of work <code>\"use step\"</code> — the step boundaries are where progress is saved: <code>export async function onboard(email){ \"use workflow\"; const u = await createUser(email); await sleep(\"5s\"); await sendWelcome(u); }</code>",
      "Start it from a route: <code>import { start } from \"workflow/api\"</code> then <code>await start(onboard, [email])</code>.",
      "Make each step idempotent — safe to run twice — so a retry never double-acts; throw <code>FatalError</code> for the truly unrecoverable case so it stops retrying.",
      "Deploy to Vercel with <b>Fluid compute</b> on (that powers the cheap pause/resume). The Nitro v3 integration is beta and works best on Vercel for now — the principle (break long jobs into saved, retry-safe steps) holds anywhere."
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
    title: "Capture any live webpage as editable Figma layers — not a flat screenshot",
    action: "Install the Figma Capture Chrome extension, open a page, click Capture page (or Select element), then paste into Figma as editable layers.",
    summary: "Figma's official Chrome extension (Jun 11, 2026) pulls a live webpage onto your canvas as real, editable pieces — frames, text, images and vectors — instead of a flat screenshot. So you can restyle the type, recolour it to a client's palette, and reuse the layout as a starting point, rather than tracing over a picture.",
    why: "Design work means studying things that already exist — a rival's pricing table, a dashboard's empty state, a checkout you want to beat. A screenshot you can only trace (or a slow manual rebuild) becomes real spacing, type sizes and structure you can take apart and riff on in minutes.",
    how: [
      "Install the <b>Figma Capture</b> extension from the Chrome Web Store and sign in.",
      "Open the page you want to study and click the extension in the toolbar.",
      "Choose <b>Capture page</b> for the whole thing, or <b>Select element</b> then hover to highlight and click to grab just one component.",
      "Switch to a Figma Design file and <b>paste</b> — it arrives as editable layers.",
      "Work it: recolour to the brand's hex codes (pair with Khroma — card-graphic-color-palette), swap fonts/copy, detach what you need, and keep it as a reference frame next to your redesign.",
      "Treat it as a <b>starting point, not a deliverable</b> — tidy the layer list and rebuild messy parts as proper components. Don't ship someone else's design; use it to learn structure."
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
    action: "Design the static email first, then add ONE small GIF (a CTA pulse / progress bar / product cycle) whose first frame works as a standalone still.",
    summary: "Motion in email earns attention only when it's deliberate and built for the inbox's limits. The durable recipe (from Litmus): design the still version first, then add one small animated GIF for a single job. Worst case — a mail app that strips animation — your chosen first frame shows, not a broken layout.",
    why: "A subtle, well-placed motion lifts clicks on the element that matters, without the fragility of interactive/AMP email (which most apps don't render). Because it's just a GIF, it degrades gracefully everywhere — far safer than betting on features half your readers can't see.",
    how: [
      "Design the <b>static</b> email first and confirm it fully works with no motion — that frame is your safety net.",
      "Pick <b>one</b> element to animate with a clear job (CTA, progress bar, product variations, an urgency cue).",
      "Export a tight GIF: make the <b>first frame</b> the standalone still, and <b>stop the loop after 2–3 repeats</b> (don't loop forever).",
      "Watch the file size: keep total assets under ~<b>1–1.5MB</b>, and know your HTML size — <b>Gmail clips (hides the rest of) a message over ~102KB</b>, which can bury your footer and unsubscribe link.",
      "Put it near the top (motion below the first screen is wasted), and <b>never</b> use flashing/strobing (it's a seizure risk).",
      "Render-test in Gmail/Outlook/Apple Mail (Litmus or Email on Acid) and confirm the static fallback looks intentional everywhere."
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
    title: "Route AI calls through a gateway with a backup model list so one yanked model can't take you down",
    action: "Put your LLM calls behind a gateway (OpenRouter / Vercel AI Gateway / Cloudflare) and give it a priority list of backup models from different providers.",
    summary: "A gateway is a middleman your app calls instead of one AI provider directly. You hand it a ranked list of models; if the first is pulled, retired, or rate-limited (blocked for sending too many requests), it automatically tries the next. So a model vanishing becomes a config change, not an outage that needs a code deploy.",
    why: "On Jun 12 the US government ordered Anthropic to switch off Claude Fable 5 and Mythos 5 for every customer — the lesson in one headline: the AI capability you rent can disappear on someone else's order. A backup model list is cheap insurance: your feature stays up even when one provider doesn't.",
    how: [
      "Send your AI calls through a <b>gateway/router</b> — OpenRouter, Vercel AI Gateway, or Cloudflare AI Gateway — instead of one provider's SDK.",
      "With <b>OpenRouter</b>, pass a <code>models</code> array in priority order (up to 3); on an error it auto-tries the next, and you only pay for the one that actually ran.",
      "Pick <b>genuinely independent</b> backups — a different provider for the fallback (e.g. a Claude primary with an OpenAI or open-weight backup) so one company's outage can't take out both.",
      "Keep prompts portable (don't lean on one model's proprietary quirks) and log which model answered each request, so you can tell when you've silently dropped to the backup.",
      "Check the backup actually clears your quality bar before you trust it, and alert yourself when you fail over so a 'temporary' downgrade doesn't quietly become permanent.",
      "Pair it with a hard spend cap (card-webdev-ai-gateway-spend-limits) so a failover can't quietly route you to a pricier model off-budget."
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
    title: "Stagger a list's fade-in with one line of CSS — no JavaScript, no per-item classes",
    action: "On a list's items (not the wrapper), add transition-delay: calc((sibling-index() - 1) * 60ms) in Chrome/Edge 137+ so each item animates a beat after the one before.",
    summary: "Two new CSS functions — <code>sibling-index()</code> (an item's position in the list: 1, 2, 3…) and <code>sibling-count()</code> (how many items there are) — let an element do maths about where it sits. So a staggered reveal, where each item fades in just after the previous one, becomes one line of <code>calc()</code> instead of hand-numbered rules or a JavaScript loop that tags every item. Add or remove items and the timing re-figures itself.",
    why: "The staggered reveal is one of the most-requested motion touches on client sites, and today it's faked with brittle hand-written <code>:nth-child()</code> delays or extra code from a framework. These functions delete both hacks. Browsers that don't support them simply animate everything at once — so it's a safe upgrade you can ship today.",
    how: [
      "Put it on the items, not the wrapper: <code>li { transition: opacity .3s, translate .3s; transition-delay: calc((sibling-index() - 1) * 60ms); }</code> — each item waits 60ms longer than the one before it.",
      "For a fade-in on first paint, add a start state: <code>@starting-style { li { opacity:0; translate:0 8px; } }</code>.",
      "Want the animation to ripple out from the middle instead? Delay by distance from the centre: <code>calc(abs(sibling-index() - (sibling-count() + 1) / 2) * 60ms)</code>.",
      "It's not only timing — feed the index into any value: <code>opacity: calc(1 - (sibling-index() - 1) * 0.1)</code> for a fading list, or into <code>hsl()</code> / <code>rotate()</code> for a radial menu.",
      "Keep it decorative: it's Chrome/Edge 137+ only for now, so don't rely on it for layout that must hold everywhere. Optionally wrap it in <code>@supports (top: sibling-index()){ ... }</code> to give other browsers a deliberate fallback."
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
    updated: "2026-06-13"
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
    action: "In Copilot CLI, install the LSP Setup skill, say 'set up LSP for <your language>', then run /lsp to confirm.",
    summary: "A language server is the background brain an IDE uses to understand code — it powers go-to-definition, find-all-references, and project-wide rename. GitHub Copilot CLI (the terminal version of Copilot) can now use one, so the terminal agent actually resolves your types and symbols instead of searching text and guessing.",
    why: "A lot of AI coding now happens in the terminal, and the worst failure is the agent inventing a function name or editing the wrong spot because it never really 'saw' how your code connects. A language server turns it from a fuzzy text-searcher into something that knows your types — fewer wrong edits, reliable renames, and far less wasted reading of files it didn't need.",
    how: [
      "Install the <b>LSP Setup skill</b> (a reusable markdown runbook): unzip it into <code>~/.copilot/skills/</code> and restart Copilot CLI.",
      "Ask in plain English — <code>set up LSP for Java</code> or <code>enable code intelligence for Python</code>. The skill installs the right server (e.g. <code>npm i -g typescript typescript-language-server</code>, or <code>brew install jdtls</code> for Java) and writes config to <code>~/.copilot/lsp-config.json</code> (just you) or <code>lsp.json</code> (the repo). It covers 14 languages.",
      "Run <code>/lsp</code> to confirm the server is running.",
      "Test it: ask the agent to <i>find all references to</i> a symbol or <i>rename</i> it across the project, and watch it follow the trail into third-party libraries.",
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
    updated: "2026-06-13"
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
    title: "Draw divider lines between grid or flex items with one line of CSS — drop the spacer-div hacks",
    action: "On a grid or flex container that already has a gap, add column-rule: 1px solid #ddd (and row-rule) in Chrome/Edge 149+.",
    summary: "When you lay items out in a grid or flex row with a <code>gap</code> between them, you often want a thin divider line in that gap. Chrome 149 lets you paint it directly: <code>column-rule</code> (long used for multi-column text) now works on Grid and Flexbox, and a new <code>row-rule</code> does the horizontal version — same width/style/colour shorthand as a border. No extra divider <code>&lt;div&gt;</code>s, no <code>::before</code>/<code>::after</code> pseudo-element tricks, no fake background-gradient lines.",
    why: "Dividers between cards, sidebar items, dashboard tiles and pricing columns are some of the most-repeated UI in any design system — and the usual fakes break the moment items wrap to a new row or the count changes. This deletes that scar tissue. Because the lines are purely decorative, browsers without support just show a plain gap, so it's safe to ship to production now.",
    how: [
      "Confirm you're on Chrome/Edge 149+ (<code>chrome://version</code>) — it's on by default, no flag.",
      "On a grid/flex container that already has a <code>gap</code>, add the rules: <code>.cards { display:grid; grid-template-columns:repeat(3,1fr); gap:2rem; column-rule:1px solid #ddd; row-rule:1px solid #ddd; }</code>",
      "Want lines only between items (not dangling past a short last row)? Add <code>column-rule-visibility-items: visible</code> / <code>row-rule-visibility-items: visible</code>.",
      "It animates on hover: <code>.cards{transition:column-rule-color .3s} .cards:hover{column-rule-color:#3b82f6}</code> — no <code>@supports</code> guard needed.",
      "Keep it decorative: Chromium-only for now, so don't depend on it for layout that must look identical in Safari/Firefox until they follow."
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
    updated: "2026-06-13"
  },

  {
    id: "card-graphic-ideogram-json-layout",
    domains: ["graphic"],
    title: "JSON-prompt Ideogram 4.0 to nail headlines, brand colours and layout on the first try",
    action: "At ideogram.ai, generate with a JSON object that declares your exact text, brand hex palette, and each element's box position — not a sentence.",
    summary: "Ideogram 4.0 (an AI image generator, June 2026) was trained on JSON prompts — JSON is just structured data written as labelled fields, like a fill-in-the-blanks brief. So instead of a paragraph, you hand it: the exact words to put in the image (which come out spelled right, ~97% accurate), each element's position as a box on a 0–1000 grid, and a palette of up to 16 brand hex colours.",
    why: "It fixes the two worst problems with AI images for real design work — garbled in-image text, and 'it ignored my layout'. Declaring the copy, position and colours as data makes the result repeatable: swap just the text and palette over a fixed layout to mass-produce posters, packaging, signage or a card set.",
    how: [
      "Go to <b>ideogram.ai</b> (or the API at developer.ideogram.ai) and prompt with a JSON object, not prose — prose does worse because the model was trained on JSON.",
      "Use the schema: a top-level <code>high_level_description</code>, a <code>style_description</code> whose <code>color_palette</code> is your brand hexes (up to 16), and a <code>compositional_deconstruction.elements</code> array.",
      "Place each element with a typed entry, e.g. <code>{type:\"text\", bbox:[50,150,150,850], text:\"GOLDCREST\", desc:\"bold black serif caps, centered top\"}</code> — <code>bbox</code> (bounding box) is the rectangle it fills, written <code>[y_min,x_min,y_max,x_max]</code> on a 0–1000 grid measured from the top-left.",
      "Keep the key order (<code>type</code> then <code>bbox</code> then <code>text</code>/<code>desc</code>), and iterate by editing only the field that's wrong (nudge a box), not by re-describing the whole image.",
      "For client work use the web app/API (commercial tiers) — the free open weights are non-commercial, so the local/ComfyUI route is for prototyping only."
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
    updated: "2026-06-13"
  },

  {
    id: "card-email-omnisend-mcp",
    domains: ["email"],
    title: "Audit your whole email program in plain English — wire Omnisend into Claude (MCP)",
    action: "Add Omnisend's MCP server (mcp.omnisend.com/mcp) to Claude as a custom connector, then ask it to rank campaigns by revenue and flag deliverability problems.",
    summary: "MCP (Model Context Protocol) is a standard plug that lets an AI app read a live tool's data. Omnisend (an email/SMS platform) now offers one, so Claude or ChatGPT can look straight into your account — campaign results, deliverability checks, subject-line insights, automation revenue, subscriber data — and answer in plain English.",
    why: "It kills the export-to-spreadsheet ritual that eats an email operator's morning: ask a question, get an answer grounded in your real numbers, and set up no-code lifecycle triggers (like a daily summary of new subscribers) without touching Zapier.",
    how: [
      "In Claude, open the left menu then <b>Customize then Connectors</b>.",
      "Click <b>+ then Add custom connector</b>, name it <code>Omnisend</code>, paste the server URL <code>https://mcp.omnisend.com/mcp</code>, and click <b>Add</b>.",
      "Select the connector then <b>Connect</b>, and sign in through Omnisend's <b>OAuth</b> (a secure login handshake — no API key to copy/paste).",
      "In a new chat: \"Use the Omnisend connector — give me an account snapshot, rank the last 30 days of campaigns by attributed revenue, and flag any with deliverability issues plus one fix each.\"",
      "Always review any AI-drafted send before it goes out. The one-click native connector is 'coming soon'; the custom-connector route works today."
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
    updated: "2026-06-13"
  },

  {
    id: "card-webdev-rotate-ai-toolchain",
    domains: ["web-dev"],
    title: "Lock down your AI coding setup after the June 2026 supply-chain attacks — rotate keys, patch the kernel",
    action: "Rotate any tokens that were live in a Claude Code / Gemini CLI / VS Code session that opened untrusted repos, and confirm your Linux machines are on the post-Feb-5 kernel patch.",
    summary: "Two threats landed the same day (Jun 8, 2026), both hitting the AI dev toolchain. First: password-stealing malware that triggers when certain booby-trapped Microsoft open-source repos are opened inside an AI-agent IDE (one that can auto-run setup tasks). Second: a one-character bug in the Linux kernel's firewall code (CVE-2026-23111) with a public exploit that hands a logged-in user full root (admin) control.",
    why: "The risk model changed: just opening a poisoned repo in an agent IDE — which can auto-run scripts and read your secret files — can now steal the keys in your AI session, and an unpatched kernel turns any small foothold into instant full control. Treat 'open a repo' as 'run code', and rotating exposed keys is cheap insurance.",
    how: [
      "List recent pulls/clones of Microsoft/Azure open-source repos (the Durable Task project was among 70+ that were disabled).",
      "Rotate the credentials, API keys and tokens that were present in any Claude Code / Gemini CLI / VS Code session that touched untrusted code.",
      "From now on, clone unknown repos into a sandbox/devcontainer with no real secrets before opening them in an agent IDE.",
      "Check your kernel: run <code>uname -r</code> and compare against your distro's advisory for CVE-2026-23111 (Debian/Ubuntu/RHEL all patched after Feb 5); do multi-tenant and container hosts first.",
      "Apply the kernel update and reboot the affected machines."
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
    updated: "2026-06-13"
  },

  {
    id: "card-webdev-ai-gateway-spend-limits",
    domains: ["web-dev"],
    title: "Put a hard dollar cap on any AI feature before you ship it",
    action: "Route your app's AI calls through Cloudflare AI Gateway and set a spend limit (scoped to a model or team) with a cheaper-model fallback when it's hit.",
    summary: "Cloudflare AI Gateway is a middleman for your AI calls that now enforces spend limits — real dollar budgets worked out from each model's token price. Cross the budget and it either blocks further calls or fails over to a cheaper model, so a runaway loop or traffic spike can't quietly burn four figures overnight.",
    why: "The #1 reason teams won't ship AI features is fear of a surprise bill. A real ceiling turns 'we daren't ship AI' into 'it literally cannot cost more than $X' — and with the market now punishing loose AI spend, controlling cost-per-use is a feature, not an afterthought.",
    how: [
      "Send your OpenAI/Anthropic/etc. calls through an AI Gateway endpoint (point your API base URL at the gateway).",
      "In the gateway settings (dashboard or API), add a <b>spend limit</b> and scope it by <code>model</code>, <code>provider</code>, or a custom tag like <code>user</code>/<code>team</code>/<code>app</code> — e.g. $2,000/mo for seniors, $500/mo standard, or $50/day on one pricey model.",
      "Pick the window: daily / weekly / monthly, fixed (resets on the 1st, Monday, or midnight) or rolling.",
      "Choose what happens at the limit: <b>block</b> by default, or add a <b>Dynamic Route</b> that fails over to a cheaper model so the cap doesn't break the feature.",
      "For the first month, reconcile the gateway's cost figures against your provider invoice before trusting the cap to the exact dollar."
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
    updated: "2026-06-13"
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
    action: "Ask ChatGPT's image generator for a labelled 3x3 grid of heading-and-body font pairings for your brand vibe.",
    summary: "Have ChatGPT's image generator draw a labelled 3x3 grid of nine heading-and-body font pairings for any brand vibe — then steal the 2-3 that fit.",
    why: "Stop hand-mocking type one combo at a time — see nine credible directions instantly, with the font names labelled.",
    how: [
      "Open ChatGPT's image generator.",
      "Prompt: \"Create a 3x3 grid of 9 different font-pairing examples (heading + body) for a [brand vibe] brand, labeling each pair's font names\".",
      "Screenshot the 2-3 that fit, then regenerate for more variations.",
      "Confirm the fonts are licensed before you use them."
    ],
    confidence: "confirmed",
    status: "active",
    supersedes: [],
    related: ["card-graphic-color-palette"],
    sources: [{ label: "ChatGPT", url: "https://chatgpt.com" }],
    tags: ["typography", "chatgpt"],
    created: "2026-06-07",
    updated: "2026-06-13"
  },

  {
    id: "card-graphic-color-palette",
    domains: ["graphic", "web-design"],
    title: "Get an on-brand colour palette trained on your taste in 2 minutes",
    action: "Go to khroma.co, click ~50 colours you like to train it, then copy the generated hex codes into your Figma styles or CSS.",
    summary: "Khroma is a free AI colour tool. You teach it your taste by picking about 50 colours you like; then it generates endless on-brand colour combinations and gives you the exact hex codes (the <code>#RRGGBB</code> values) to copy straight into a design.",
    why: "Skip the colour-wheel guesswork and decision paralysis. You get palettes tuned to what you actually like, then lock the exact hex values into Figma or your CSS — minutes, not an afternoon.",
    how: [
      "Go to khroma.co and click ~50 colours you're drawn to. This trains the AI on your taste (a one-time setup).",
      "Browse the combinations it generates — preview them as type, posters, gradients, or over images.",
      "Favourite the ones that fit the brief, then open one to copy its hex codes.",
      "Paste the hex values straight into your Figma colour styles or CSS variables."
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
    action: "Add @view-transition { navigation: auto; } to your CSS, give one element the same view-transition-name on two pages, then click between them in Chrome.",
    summary: "A 'page transition' is the smooth animation when one screen slides or morphs into the next — the polish native apps have and most websites don't. Chrome's View Transitions API gives a plain multi-page site that effect in about five lines of CSS — no framework, no rebuild.",
    why: "Clients read it as 'premium' instantly, and you can ship it the same day. On browsers that don't support it, navigation just happens normally with no animation — so there's zero downside to adding it now.",
    how: [
      "Turn it on in your CSS: <code>@view-transition { navigation: auto; }</code> — that alone cross-fades between pages.",
      "To make one element morph across the change (e.g. a hero image growing into the next page), give it the same name on both pages: <code>.hero { view-transition-name: hero; }</code>.",
      "Open the site in Chrome or Edge and click between the two pages — the shared element animates from its old spot to its new one.",
      "Respect motion preferences: wrap any bigger movement in <code>@media (prefers-reduced-motion: reduce)</code> so it stays calm for people who ask for less motion, then ship."
    ],
    confidence: "confirmed",
    status: "active",
    thread_id: "thread-modern-css-primitives",
    supersedes: [],
    related: [],
    sources: [{ label: "MDN — View Transitions API", url: "https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API" }],
    tags: ["css", "ux"],
    created: "2026-06-07",
    updated: "2026-06-13"
  },

  {
    id: "card-webdesign-squircle-corners",
    domains: ["web-design"],
    title: "Give buttons and cards iOS-style 'squircle' corners with one line of CSS",
    action: "On a button you already round, add corner-shape: squircle next to its border-radius and test in Chrome/Edge.",
    summary: "A 'squircle' is the smooth, slightly-squared rounded corner Apple uses on every app icon — softer than a plain rounded rectangle. Chrome's new <code>corner-shape</code> property turns a normal <code>border-radius</code> into that shape with one extra line, and falls back to ordinary rounding anywhere it isn't supported.",
    why: "Rounded rectangles are the single most-repeated shape in any interface — buttons, cards, inputs. The squircle reads as 'premium' (it's the exact curve Apple uses) for one extra line of CSS. Unsupported browsers just show your existing rounded corner, so there's zero downside.",
    how: [
      "On a button or card you already round, add the shape next to the radius: <code>.btn { border-radius: 28%; corner-shape: squircle; }</code>",
      "Keep a real <code>border-radius</code> — <code>corner-shape</code> only changes the <i>shape</i> of the curve, not its size, so with no radius there's nothing to reshape.",
      "Want to dial how square it is? Use the maths version: <code>corner-shape: superellipse(1.5)</code> — lower number = rounder, higher = squarer.",
      "Test in Chrome/Edge. Safari and Firefox fall back to normal rounding automatically — no <code>@supports</code> guard needed."
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
    updated: "2026-06-13"
  },

  {
    id: "card-webdev-v0-screenshot",
    domains: ["web-dev"],
    title: "Turn a screenshot into working UI code with v0",
    action: "Drop a UI screenshot into v0.dev, refine it with a few prompts, then paste the generated React + Tailwind into your project.",
    summary: "v0 (by Vercel) turns a picture into front-end code. Drop in a screenshot or sketch and it generates editable React + Tailwind (a popular component framework plus styling toolkit) you can paste straight into a project — a running start instead of a blank file.",
    why: "Skip the boilerplate hour: go from 'here's the look' to working, tweakable components in minutes, then refine by prompt.",
    how: [
      "Go to v0.dev and start a new generation.",
      "Drop in a screenshot of the UI you want (or just describe the component).",
      "Refine with follow-up prompts — 'make it dark', 'tighten the spacing', 'add a mobile layout'.",
      "Copy the generated code into your project and wire it up to your real data."
    ],
    confidence: "emerging",
    status: "active",
    supersedes: [],
    related: [],
    sources: [{ label: "v0 by Vercel", url: "https://v0.dev" }],
    tags: ["ai-codegen", "react"],
    created: "2026-06-07",
    updated: "2026-06-13"
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
    action: "Confirm SPF and DKIM pass, publish a DMARC record (start at p=none, then tighten), then add a BIMI record + VMC to show your logo.",
    summary: "A one-time DNS setup that does two things: pushes you out of spam and puts your verified logo beside your emails in Gmail and Apple Mail. The pieces are email-authentication records — SPF and DKIM prove the mail is really from you, DMARC tells inboxes what to do if it isn't, and BIMI (plus a VMC certificate) is what unlocks the logo.",
    why: "Two wins from one afternoon: better inbox placement after the 2024 sender rules, and your logo in the inbox — free brand real estate most competitors haven't claimed.",
    how: [
      "Confirm SPF and DKIM are passing for your sending domain (use a free DMARC checker tool).",
      "Add a DMARC record set to <code>p=none</code> (monitor only), watch the reports for a week, then tighten to <code>p=quarantine</code> and finally <code>p=reject</code>.",
      "Make a square SVG of your logo (the BIMI format), publish the BIMI DNS record, and buy a VMC certificate — Gmail requires it to show the logo.",
      "Send yourself a test and confirm the logo shows and you land in the inbox, not spam."
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
    updated: "2026-06-13"
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
