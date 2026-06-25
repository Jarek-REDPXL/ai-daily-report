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
    id: "card-webdesign-figma-motion",
    domains: ["web-design"],
    title: "Animate a design on the Figma canvas — then copy the CSS/React easing straight from Dev Mode (no After Effects)",
    action: "Switch one frame to Figma Motion mode, keyframe a single micro-interaction (a button hover or modal entrance) on the timeline, then open Dev Mode → Motion and copy the animation out as CSS.",
    summary: "Figma Motion (announced at Config 2026, Jun 24 2026) adds a real animation timeline as a fourth canvas mode next to Design / Draw / Dev. You keyframe position, scale, rotation and opacity, drop fade/move/scale presets, define custom easing as reusable Motion variables, scrub to preview, and export MP4/WebM/GIF/SVG — and in Dev Mode a Motion tab exposes every timing value and easing curve so a dev can copy the animation as CSS, JSON, or framework-ready React (motion.dev).",
    why: "Micro-interactions (hovers, modal entrances, page transitions) normally mean rebuilding the design in After Effects/Principle/Framer and then hand-translating the result to code — with the classic 'what easing did the designer actually mean?' guesswork at handoff. Motion collapses that: you animate where you already design, and the developer reads the exact curve and copies production code from the same file, killing the translation step.",
    how: [
      "Open a file you have edit access to and select the frame to animate; switch it to <b>Motion</b> mode (the new mode beside Design/Draw/Dev) — the timeline appears alongside the canvas.",
      "Fast start: apply a preset (<b>fade</b>, <b>move</b>, or <b>scale</b>); stack several on the timeline to play together, or drag to sequence them.",
      "Refine: move the playhead and keyframe <b>position / scale / rotation / opacity</b> independently, or let <b>auto-keyframing</b> record edits as you scrub; drag layers on the timeline to adjust timing.",
      "Reuse easing: define a custom easing curve as a <b>Motion variable</b> so every animation referencing it updates at once.",
      "Preview by scrubbing the timeline; leave time-based comments to flag a specific moment for teammates.",
      "Hand off: open <b>Dev Mode → Motion</b> and copy the animation as <b>CSS</b>, JSON, or React (motion.dev), or export the clip as MP4/WebM/GIF/SVG. Validate the exported easing/keyframes against your real front-end before shipping."
    ],
    confidence: "emerging",
    corroboration_count: 3,
    status: "active",
    supersedes: [],
    related: ["card-webdesign-figma-mcp-design-to-code", "card-webdesign-scroll-triggered-animations", "card-graphic-figma-capture-layers"],
    sources: [
      { label: "Figma Blog — Introducing Figma Motion: Your canvas now has a timeline", url: "https://www.figma.com/blog/introducing-figma-motion/" },
      { label: "Figma Blog — Config 2026: New materials, new tools and a more expressive canvas", url: "https://www.figma.com/blog/config-2026-recap/" },
      { label: "TechCrunch — Figma adds code layers, support for animations, more AI features", url: "https://techcrunch.com/2026/06/24/figma-adds-code-layers-support-for-animations-more-ai-features-in-new-update/" },
      { label: "The Next Web — Figma Config 2026: code layers, AI skills, plugins, animations", url: "https://thenextweb.com/news/figma-config-code-layers-ai-skills-plugins-animations" }
    ],
    tags: ["figma", "motion", "animation", "timeline", "dev-mode", "prototyping"],
    created: "2026-06-25",
    updated: "2026-06-25"
  },

  {
    id: "card-social-facebook-creator-assistant",
    domains: ["social"],
    title: "Ask Facebook's free Creator Assistant why your best Reel won — then have it pitch 3 fresh angles off live trends",
    action: "Open your Facebook creator dashboard (US/Canada/India) and ask Creator Assistant 'why did [my top Reel] outperform?', then 'give me 3 content angles off what's trending in my niche' — and turn the answer into this week's posts.",
    summary: "Meta's Creator Assistant is a free conversational AI built into the Facebook creator dashboard (launched Jun 4 2026; Meta doubled down on Jun 24 2026 with a standalone Creator Studio app built around the same assistant). It answers questions against your OWN account data — why a post popped, when to post, how your audience shifted, what your comments are saying — and brainstorms content ideas off live Facebook trends (trending audio, cultural moments, top-performing styles).",
    why: "It's a free, first-party organic-growth coach that sees your actual performance — so it beats generic best-time charts or a blank ChatGPT prompt that knows nothing about your account. The move that compounds: stop guessing why something worked, ask the model that has your numbers, and convert one diagnosed win into a week of variations.",
    how: [
      "Confirm eligibility: you need a creator account in the <b>US, Canada, or India</b> (current rollout); open the <b>Facebook mobile app → creator dashboard</b> and look for the assistant (no separate download).",
      "Diagnose a winner: ask <i>'Why did [this specific Reel] outperform the rest?'</i> and pull out the repeatable variable (hook, length, audio, topic).",
      "Read your audience: ask <i>'How has my audience changed over time?'</i> and <i>'What are people saying in my comments?'</i> to spot a new segment or sentiment to lean into.",
      "Time it: ask <i>'When should I post?'</i> — it answers from your own engagement patterns, not a generic chart.",
      "Brainstorm off trends: ask for fresh angles tied to what's trending on Facebook for your niche; capture 3.",
      "Iterate conversationally: follow up ('give me 3 hook variations for that angle') to turn one insight into a week of posts. Pair with Edits for the A/B + brand PDF (card-social-edits-creator-analytics)."
    ],
    confidence: "confirmed",
    corroboration_count: 3,
    status: "active",
    supersedes: [],
    related: ["card-social-edits-creator-analytics", "card-social-instagram-your-algorithm", "card-social-repurpose-claude"],
    sources: [
      { label: "Meta Newsroom — Introducing Creator Assistant, plus more languages for AI translations on Facebook (Jun 4 2026)", url: "https://about.fb.com/news/2026/06/creator-assistant-more-languages-for-ai-translations-on-facebook/" },
      { label: "TechCrunch — Meta rolls out a new AI creator assistant on Facebook (Jun 4 2026)", url: "https://techcrunch.com/2026/06/04/meta-rolls-out-a-new-ai-creator-assistant-on-facebook/" },
      { label: "TechCrunch — Facebook rolls out an AI companion app for creators (Jun 24 2026)", url: "https://techcrunch.com/2026/06/24/facebook-rolls-out-an-ai-companion-app-for-creators/" },
      { label: "Social Media Today — Meta brings back Facebook Creator Studio", url: "https://www.socialmediatoday.com/news/meta-brings-back-facebook-creator-studio/823716/" }
    ],
    tags: ["facebook", "meta", "creators", "ai-assistant", "organic", "reels"],
    created: "2026-06-25",
    updated: "2026-06-25"
  },

  {
    id: "card-paid-meta-multimedia-creative",
    domains: ["paid"],
    title: "Pack ONE Meta ad with up to 10 mixed image + video assets across aspect ratios — let Advantage+ pick the winner per placement",
    action: "In Ads Manager, build ONE ad and upload up to 10 genuinely different assets (mix video + images; include 9:16 and 1:1/4:5), keep Advantage+ creative on, and let delivery serve the best variation per user/placement.",
    summary: "Meta's refreshed multimedia-ads guidance (reported Jun 24 2026, from Meta's own 'multi-media ads' help doc) says to stop splitting creative into a separate ad per placement: load up to 10 images and videos — including multiple aspect ratios — into a single ad and let Advantage+ delivery optimize which variation each user sees. Meta's line: the more creative options you give it, the more chances it has to optimize.",
    why: "Building one ad per aspect ratio splinters the learning signal and bloats the account. Consolidating diverse assets into one ad concentrates the conversion signal and hands Meta's delivery a richer combination space — and it moves the lever back to the thing operators actually control: creative volume and variety, not audience micro-targeting.",
    how: [
      "In Ads Manager, create/open an ad and choose the Advantage+ / multimedia creative setup.",
      "At the ad (creative) level, upload <b>up to 10 assets into the one ad</b> — deliberately mix at least one video with several images.",
      "Include <b>multiple aspect ratios in that single ad</b>: 9:16 (vertical — most inventory) plus 1:1 or 4:5 for feed.",
      "Make the assets <b>conceptually distinct, not minor variants</b> — e.g. a UGC clip, a product demo, a testimonial, a text-led explainer, a lifestyle shot. Five genuinely different angles beat fifty near-duplicates.",
      "Keep Advantage+ creative delivery ON so Meta auto-selects the best variation per placement/user; design within placement safe zones so key visuals survive cropping.",
      "If any asset is AI-generated, set Meta's <b>AI-content disclosure</b> before launch; refresh assets every 2–4 weeks, watching CPM/reach as the fatigue signal."
    ],
    confidence: "emerging",
    corroboration_count: 2,
    thread_id: "thread-platform-ai-defaults",
    status: "active",
    supersedes: [],
    related: ["card-paid-meta-advantage-plus", "card-paid-ai-ad-creative", "card-graphic-firefly-brand-batch-creatives"],
    sources: [
      { label: "Meta for Business Help — About multi-media ads and customizing your ad creative", url: "https://www.facebook.com/business/help/1530327025203003" },
      { label: "Social Media Today — Meta outlines best practices for AI-generated multimedia ads (Jun 24 2026)", url: "https://www.socialmediatoday.com/news/meta-outlines-best-practices-for-ai-generated-multimedia-ads/823720/" },
      { label: "AdMove — Meta Advantage+ Creative best practices for 2026", url: "https://www.admove.ai/blog/meta-advantage-creative-best-practices-for-2026" }
    ],
    tags: ["meta-ads", "advantage-plus", "creative", "multimedia", "aspect-ratio", "andromeda"],
    created: "2026-06-25",
    updated: "2026-06-25"
  },

  {
    id: "card-webdev-vercel-websockets",
    domains: ["web-dev"],
    title: "Ship realtime (chat, presence, AI streaming) from your existing Vercel Functions — no separate backend",
    action: "Add one `api/ws.ts` that exports an HTTP server wrapping a `WebSocketServer`, deploy, and connect from the client with `new WebSocket('wss://your-domain.com/api/ws')`.",
    summary: "Vercel moved WebSocket support for Functions into public beta (Jun 22 2026): a Function can hold a two-way WebSocket open using standard libraries (ws, Socket.IO, Hono, Express) with no extra config — the connection pins to one Fluid-compute instance and bills on Active CPU, so an idle open socket costs almost nothing. Closes the years-old gap that forced a second always-on box (Render/Railway/a dedicated Socket.IO server) onto every realtime build.",
    why: "Realtime — live chat, presence cursors, collaborative editing, token-by-token AI streaming — was the #1 reason to bolt an always-on backend onto an otherwise-static client build. Keeping it all on Vercel deletes a moving part out of every realtime quote, and idle-time pricing means a chat widget open all day doesn't bleed compute the way a long-lived container does.",
    how: [
      "Confirm Fluid compute is on: default for projects created on/after Apr 23 2025; for older projects, Settings → Functions → Fluid compute → Enable.",
      "Install the lib: <code>npm i ws</code> (or <code>npm i socket.io socket.io-client</code>).",
      "Create <code>api/ws.ts</code> that builds an HTTP server and exports it: <code>const server = http.createServer(); const wss = new WebSocketServer({ server }); wss.on('connection', ws => ws.on('message', d => ws.send(d))); export default server;</code>.",
      "Add client reconnect logic — connections close at the function's max duration, so wrap the <code>new WebSocket(...)</code> in a <code>connect()</code> that re-fires on <code>close</code> with exponential backoff (cap ~30s).",
      "Move shared state out of memory: instances aren't sticky and a new deploy spins fresh ones, so put rooms/presence/pub-sub in Redis from the Vercel Marketplace, not in-process variables.",
      "Deploy and test with <code>wscat -c wss://your-domain.com/api/ws</code>; for Next.js use the experimental <code>experimental_upgradeWebSocket()</code> from <code>@vercel/functions</code> in an <code>app/api/ws/route.ts</code> GET handler."
    ],
    confidence: "emerging",
    status: "active",
    supersedes: [],
    related: ["card-webdev-vercel-cancelable-jobs", "card-webdev-vercel-workflow-nitro"],
    sources: [
      { label: "Vercel Changelog — WebSocket support is now in Public Beta", url: "https://vercel.com/changelog/websocket-support-is-now-in-public-beta" },
      { label: "Vercel Docs — WebSockets on Functions", url: "https://vercel.com/docs/functions/websockets" },
      { label: "Vercel KB — Do Vercel Functions support WebSocket connections?", url: "https://vercel.com/kb/guide/do-vercel-serverless-functions-support-websocket-connections" }
    ],
    tags: ["vercel", "websockets", "realtime", "serverless", "fluid-compute"],
    created: "2026-06-23",
    updated: "2026-06-23"
  },

  {
    id: "card-email-dmarcbis-np",
    domains: ["email"],
    title: "Close the phantom-subdomain spoofing hole in one DNS edit — add DMARCbis's np=reject tag",
    action: "In your `_dmarc` TXT record (org domain, with an enforcing p= policy), append `np=reject` and remove any deprecated `pct=`/`rf=`/`ri=` tags.",
    summary: "DMARC is now a full IETF standard — RFC 9989 (2026, the 'DMARCbis' upgrade) obsoletes the 2015 RFC 7489. The headline operator change is the np= tag (Non-existent-subdomain Policy): np=reject makes inboxes reject mail from subdomains that don't exist in your DNS — the exact marketing-typo.yourbrand.com phantoms spoofers ride to borrow your reputation. It also retires pct/rf/ri (use t=y for testing).",
    why: "Gmail, Yahoo and Microsoft reject non-compliant bulk mail at the SMTP level in 2026, so deliverability and subscriber LTV ride on airtight auth. A spoofer abusing a subdomain you never created can torch your domain reputation and bin your real campaigns — np=reject closes that hole in one record edit, and it's prerequisite-grade before any BIMI logo play.",
    how: [
      "Pull your current record: <code>dig TXT _dmarc.yourbrand.com +short</code> (or a free DMARC lookup) and copy the existing string.",
      "Confirm your base policy is enforcing — np only takes effect at the organizational domain, so make sure you already have <code>p=quarantine</code> or <code>p=reject</code> (still on p=none? keep monitoring first, but you can safely add np now).",
      "Add the tag: append <code>np=reject</code> — e.g. <code>v=DMARC1; p=quarantine; np=reject; rua=mailto:reports@yourbrand.com; fo=1</code> (rejects non-existent-subdomain mail while real sending subdomains stay under p/sp).",
      "Remove deprecated tags: delete any <code>pct=</code>, <code>rf=</code> or <code>ri=</code>; if you used pct= for a staged rollout, switch to <code>t=y</code> (testing mode).",
      "Publish and validate the record through a DMARC checker so it parses cleanly.",
      "Watch your <code>rua</code> aggregate reports for 3–7 days to confirm legitimate subdomain mail still authenticates before tightening p further."
    ],
    confidence: "confirmed",
    corroboration_count: 4,
    status: "active",
    supersedes: [],
    related: ["card-email-dmarc-bimi", "card-email-postmaster-deliverability-analysis", "card-email-inbox-placement-audit"],
    sources: [
      { label: "IETF — RFC 9989 (DMARCbis)", url: "https://www.rfc-editor.org/info/rfc9989" },
      { label: "Validity — DMARC's New Upgrade Explained", url: "https://www.validity.com/blog/setting-the-standard-dmarcs-new-upgrade-explained/" },
      { label: "dmarcwise — DMARCbis explained", url: "https://dmarcwise.io/blog/upcoming-dmarc-bis" },
      { label: "Suped — List of DMARC tags and their meanings", url: "https://www.suped.com/learn/dmarc/list-of-dmarc-tags-and-their-meanings" }
    ],
    tags: ["deliverability", "dmarc", "authentication", "spoofing", "dns"],
    created: "2026-06-23",
    updated: "2026-06-23"
  },

  {
    id: "card-ai-tooling-claude-loop-goal",
    domains: ["ai-tooling"],
    title: "Define an agent loop once and let Claude Code run it unattended with /loop and /goal",
    action: "In Claude Code, run `/goal <task> until <provable done-when condition> or stop after N turns` for a work-until-done loop, or `/loop 5m <check>` for a recurring poll.",
    summary: "Two commands already shipping in Claude Code turn babysitting into automation: /loop re-runs a prompt on a schedule (a cron interval like 5m, or self-paced when you give none), and /goal keeps a session working across turns until a SEPARATE cheap evaluator model (defaults to Haiku) confirms your 'done when' condition holds. This is the runnable substrate behind the Jun 17 2026 'loop engineering' technique (Claire Vo / ChatPRD, echoed by Addy Osmani's four loop types: heartbeat, cron, hook, goal).",
    why: "The team burns real hours babysitting deploys, chasing stale PRs and re-running test/lint cycles by hand — exactly the toil these loops absorb. A /goal loop with a cheap separate evaluator turns 'implement this design doc until the acceptance tests pass' into a walk-away task, with zero new tools or infra.",
    how: [
      "Confirm you're current: <code>claude --version</code> — /loop needs v2.1.72+, /goal needs v2.1.139+; accept the workspace-trust dialog (/goal runs through hooks).",
      "Quick poll loop: <code>/loop 5m check if the deploy finished and tell me what happened</code> — Claude converts 5m to cron and returns a job ID (Esc to stop while it waits).",
      "Self-paced loop: <code>/loop check whether CI passed and address any review comments</code> (no interval) — Claude picks a 1-min-to-1-hr delay per iteration and can end itself once provably done.",
      "Work-until-done goal: <code>/goal all tests in test/auth pass and the lint step is clean or stop after 20 turns</code> — a fast model checks the condition after each turn and feeds any 'no' back as guidance (bare <code>/goal</code> shows turns/tokens; <code>/goal clear</code> aborts).",
      "Make a reusable default loop: create <code>.claude/loop.md</code> with maintenance instructions ('check the release PR; if CI is red, pull the failing log, diagnose, push a minimal fix') so a bare <code>/loop</code> runs it.",
      "Manage jobs in plain English ('what scheduled tasks do I have?' / 'cancel the deploy check'); for schedule-sensitive runs pick a minute that isn't :00/:30 to dodge the jitter offset."
    ],
    confidence: "emerging",
    corroboration_count: 3,
    thread_id: "thread-multi-agent-orchestration",
    status: "active",
    supersedes: [],
    related: ["card-ai-tooling-codex-goal", "card-ai-tooling-claude-workflows"],
    sources: [
      { label: "Claude Code Docs — Run prompts on a schedule (/loop)", url: "https://code.claude.com/docs/en/scheduled-tasks" },
      { label: "Claude Code Docs — Keep Claude working toward a goal (/goal)", url: "https://code.claude.com/docs/en/goal" },
      { label: "Lenny's Newsletter — How to design AI agent loops", url: "https://www.lennysnewsletter.com/p/how-to-design-ai-agent-loops-schedules" },
      { label: "ChatPRD — How I AI: designing AI agent loops", url: "https://www.chatprd.ai/how-i-ai/how-i-ai-designing-ai-agent-loops-in-claude-code-and-codex" }
    ],
    tags: ["claude-code", "agents", "automation", "loops", "autonomous"],
    created: "2026-06-23",
    updated: "2026-06-23"
  },

  {
    id: "card-webdesign-scroll-triggered-animations",
    domains: ["web-design"],
    title: "Fire reveal-on-scroll animations from pure CSS — no IntersectionObserver, no JavaScript",
    action: "On the element you want to reveal, add `timeline-trigger: --reveal view() entry 100% exit 0%;` and `animation-trigger: --reveal play-forwards;` so its keyframe animation plays once when it scrolls into view.",
    summary: "Chrome shipped scroll-TRIGGERED animations (Chrome 145/146, 2026) — the counterpart to scroll-driven animation. Scroll-driven scrubs an animation to your scroll position; scroll-triggered plays a normal, timed @keyframes animation ONCE when an element crosses a viewport threshold (CSS's own version of IntersectionObserver). Two new properties do it: timeline-trigger defines when it fires, animation-trigger binds your animation to that trigger. Action keywords: play-forwards, play-backwards, play-once, pause, reset, replay, none.",
    why: "Reveal-on-scroll is on nearly every marketing site, and today it costs a JS bundle plus a class of bugs (observers that never disconnect, animations re-firing on every scroll jiggle). Moving it into the stylesheet makes it declarative and designer-editable — and an unsupported browser just shows the element in its final state, so it degrades cleanly.",
    how: [
      "Write the keyframes + animation as normal: <code>@keyframes fade-up { from { opacity:0; translate:0 1rem } to { opacity:1; translate:0 0 } }</code> and on the element <code>animation: fade-up .35s ease both;</code>.",
      "Define the trigger: <code>timeline-trigger: --reveal view() entry 100% exit 0%;</code> — the <code>view()</code> timeline + entry/exit range decides exactly when it fires.",
      "Bind the animation to it: <code>animation-trigger: --reveal play-forwards;</code> — now it runs once on entry instead of immediately on load.",
      "Pick the behaviour with the action keyword: <code>play-once</code> for a one-time reveal, <code>play-forwards</code>/<code>play-backwards</code> for enter/leave pairs, plus <code>pause</code>/<code>reset</code>/<code>replay</code>.",
      "Keep a fallback for non-Chromium: gate the JS path with <code>@supports not (animation-trigger: --x play-forwards)</code> and keep your existing <code>IntersectionObserver</code> reveal for Firefox/Safari — or just let elements render in their final state there.",
      "Try it on one section (a testimonials row or feature grid) before removing your animation library."
    ],
    confidence: "emerging",
    thread_id: "thread-modern-css-primitives",
    status: "active",
    supersedes: [],
    related: ["card-webdesign-sibling-index", "card-webdesign-css-carousel", "card-webdesign-prop-for-that"],
    sources: [
      { label: "Chrome for Developers — CSS scroll-triggered animations are coming!", url: "https://developer.chrome.com/blog/scroll-triggered-animations" },
      { label: "CSS-Tricks — A First Look at Scroll-Triggered Animations", url: "https://css-tricks.com/css-scroll-triggered-animations-first-look/" },
      { label: "utilitybend — CSS Animation Triggers: playing animations on scroll without scrubbing", url: "https://utilitybend.com/blog/css-animation-triggers-playing-animations-on-scroll-without-scrubbing-its-a-match" }
    ],
    tags: ["css", "animation", "scroll", "progressive-enhancement"],
    created: "2026-06-21",
    updated: "2026-06-21"
  },

  {
    id: "card-graphic-runway-aleph-figma-weave",
    domains: ["graphic"],
    title: "Re-direct footage you already shot — change the angle, swap the background, restyle from a reference — inside Figma, no reshoot",
    action: "Drop your clip onto the Figma Weave canvas, add a reference image or type the change (new camera angle / environment / look), preview, then commit.",
    summary: "Figma put Runway's Aleph 2.0 video model into Figma Weave (Jun 18 2026): frame-level video direction on the design canvas. It edits clips up to 30 seconds, takes a reference image to apply a look while preserving everything you didn't ask to change, and carries a keyframe edit through every frame a subject appears in — so you can change camera angle, add a character, or transform the environment without a reshoot.",
    why: "Video is table-stakes for brand and social, and the expensive part is re-shooting for every variant, ratio, or client note. Re-directing the clip you already have — in the same Figma file as the rest of the creative — turns 'another angle / different background / on-brand restyle' from a production day into a canvas edit the designer can do.",
    how: [
      "Open Figma Weave and drop your existing clip (or a generated one) onto the canvas.",
      "Restyle from a reference: add a reference image and prompt the look — Aleph 2.0 applies it while keeping untouched elements intact (match a campaign's grade/palette).",
      "Re-direct the scene: prompt a new camera angle, a swapped environment, or an added element instead of scheduling a reshoot.",
      "Use keyframe edits when a change needs to track a subject across the shot — set it once and let it carry through frames.",
      "Preview each change in the connected workflow before committing; iterate on the parts that miss.",
      "Check cost first: Figma says pricing is moving to scale with input length — confirm current credits/pricing before batch-running client variants, and review outputs for artifacts + likeness/rights when people are involved."
    ],
    confidence: "emerging",
    corroboration_count: 2,
    status: "active",
    supersedes: [],
    related: ["card-graphic-firefly-brand-batch-creatives"],
    sources: [
      { label: "Figma Blog — Direct Every Frame with Runway Aleph 2.0, Now in Figma Weave", url: "https://www.figma.com/blog/direct-every-frame-with-runway-aleph-2/" },
      { label: "Runway — Aleph 2.0", url: "https://runwayml.com/product/aleph-2" }
    ],
    tags: ["video", "ai-video", "figma", "runway", "brand"],
    created: "2026-06-21",
    updated: "2026-06-21"
  },

  {
    id: "card-webdev-cloudflare-temporary-accounts",
    domains: ["web-dev"],
    title: "Let your AI coding agent deploy to Cloudflare with a disposable account — no long-lived API token",
    action: "Have your agent run `wrangler deploy --temporary` for prototypes — it deploys the Worker + bindings to an isolated account it can iterate on for 60 minutes, then you claim only what's worth keeping (everything else auto-deletes).",
    summary: "Cloudflare's Temporary Accounts for AI agents (Jun 19 2026): an agent that runs Wrangler with no credentials is prompted to rerun with --temporary, deploying the Worker and its associated resources (D1/KV/R2) to a fresh isolated preview account with short-lived creds. A human claims it within 60 minutes to keep it; otherwise it auto-deletes.",
    why: "The old way to let an agent deploy was to hand it a long-lived API token or production credential — exactly what you don't want sitting in an autonomous tool's context. Disposable accounts make least-privilege the default: the agent never touches your real account, and abandoned experiments clean themselves up instead of becoming orphaned Workers and leaked keys.",
    how: [
      "Deploy with the flag: <code>wrangler deploy --temporary</code> — no prior login, no API token required (Wrangler even prompts the agent to add the flag when it has no creds).",
      "Read the output: Wrangler returns the live preview URL plus short-lived credentials; the agent can keep redeploying for the 60-minute window.",
      "Review the result at the preview URL — treat the temporary account as a sandbox before committing.",
      "Claim only what's worth keeping: open the claim link, sign in/up, and convert the temporary account (Worker + D1/KV/R2 bindings) into a permanent account you own.",
      "Let the rest expire: anything unclaimed within 60 minutes auto-deletes — no cleanup, no orphaned resources, no leaked keys.",
      "Make it policy: default agents to <code>--temporary</code> for prototypes; reserve real, scoped tokens for the few things that ship to production."
    ],
    confidence: "confirmed",
    thread_id: "thread-ai-toolchain-attack-surface",
    status: "active",
    supersedes: [],
    related: ["card-webdev-rotate-ai-toolchain", "card-webdev-ai-gateway-spend-limits", "card-webdev-flue-cloudflare-agent"],
    sources: [
      { label: "Cloudflare Blog — Temporary Cloudflare Accounts for AI agents", url: "https://blog.cloudflare.com/temporary-accounts/" },
      { label: "Cloudflare Developer Changelog — Temporary accounts for AI agent deployments (Jun 19 2026)", url: "https://developers.cloudflare.com/changelog/post/2026-06-19-temporary-accounts-for-agents/" }
    ],
    tags: ["cloudflare", "workers", "wrangler", "ai-agents", "least-privilege", "security"],
    created: "2026-06-20",
    updated: "2026-06-20"
  },

  {
    id: "card-paid-google-conversion-customer-lists",
    domains: ["paid"],
    title: "Audit and classify your Customer Match audiences before Google auto-enrolls and auto-labels them (deadline Aug 18)",
    action: "Open Tools → Shared Library → Audience Manager, review every conversion-based customer list, set your own customer-type classifications now, and decide per-account whether to keep or switch off conversion-based customer lists before Aug 18 2026.",
    summary: "Google Ads is auto-enabling conversion-based customer lists for advertisers already running Enhanced Conversions + Customer Match (data processing starts Aug 18 2026), and from August will start auto-classifying list customer-types. A wrong auto-label can quietly skew Smart Bidding and targeting, so set your own classifications and opt-in/out choice before the platform sets them for you.",
    why: "This pushes every advertiser onto first-party-data audiences by default — useful, but it removes a layer of control. If Google mislabels a list's customer type, that classification feeds bidding and targeting and can mis-steer spend without anyone noticing. The operator edge with AI/automatic platform defaults is the same as always: get in front of the default instead of reacting to it.",
    how: [
      "Audit now: open <b>Tools → Shared Library → Audience Manager</b> and review every conversion-based / Customer Match list — flag which are about to be auto-created or relabeled.",
      "Set your own classifications on those lists before August, so Google adopts your labels instead of guessing the customer type.",
      "Decide on the auto-enrollment per account: Account settings (Admin) → <b>Customer match → Conversion-based customer lists</b> → check/uncheck <b>'Turn on conversion-based customer lists'</b> and Save — opt out before Aug 18 if you don't want auto-built lists.",
      "Re-check downstream: confirm Smart Bidding / targeting on affected campaigns still reflects the segments you intend.",
      "Confirm the plumbing: Enhanced Conversions must be firing correctly for these lists to be accurate — verify in Conversions before relying on them."
    ],
    confidence: "emerging",
    corroboration_count: 2,
    status: "active",
    supersedes: [],
    related: ["card-paid-meta-advantage-plus", "card-paid-google-bidding-recalibration"],
    sources: [
      { label: "Search Engine Land — Google Ads automatically enrols advertisers in conversion-based customer lists", url: "https://searchengineland.com/google-ads-automatically-enrols-advertisers-in-conversion-based-customer-lists-480693" },
      { label: "Search Engine Roundtable — Google Ads turning on conversion-based customer lists", url: "https://www.seroundtable.com/google-ads-conversion-based-customer-lists-41529.html" },
      { label: "Google Ads Help — Set up conversion-based customer lists", url: "https://support.google.com/google-ads/answer/13471685?hl=en" }
    ],
    tags: ["google-ads", "customer-match", "first-party-data", "audiences", "privacy", "smart-bidding"],
    created: "2026-06-20",
    updated: "2026-06-20"
  },

  {
    id: "card-social-edits-creator-analytics",
    domains: ["social"],
    title: "Use Meta's free Edits app as a Reels research-and-pitch desk — best-time-to-post, 3-Reel A/B, brand-ready PDF",
    action: "In Edits, check your audience-insights peak window and post your best cut into it, then use side-by-side compare on your last 3 Reels to find the winning hook and export that comparison to a PDF for brand pitches.",
    summary: "Meta's free Edits app (CapCut-style, wired into Instagram Reels; update Jun 17 2026) added audience insights (when followers are online), side-by-side comparison of up to 3 Reels, one-tap PDF export of that data for brands/partners, text-prompt AI restyle of clips, and longer exports (up to 15 min on iOS).",
    why: "It collapses a multi-tool routine — edit in one app, pull analytics in another, screenshot results into a deck — into one free app that lives next to where the content posts. For anyone running organic Reels or pitching influencer/UGC work, 'best-time-to-post + side-by-side A/B + clean PDF' is a real workflow upgrade, and it reinforces the core move: design and time content for the signal the platform ranks, then prove the channel with the platform's own numbers.",
    how: [
      "Install Edits (free, iOS/Android) and connect your Instagram account.",
      "Check audience insights to find your followers' peak-active window, and post your best cut into that slot instead of guessing.",
      "Run a real A/B: pick your last three Reels (or three variants of one idea) and use side-by-side compare to see which hook/length/format won — then make more of the winner.",
      "Export the comparison to a PDF for brand pitches or internal reporting instead of stitching screenshots.",
      "Try AI restyle on a clip via a text prompt for fast variations — check it's available in your region and mind the regeneration limit.",
      "Use the 15-min iOS export for longer-form vertical cuts where it fits."
    ],
    confidence: "confirmed",
    corroboration_count: 2,
    status: "active",
    supersedes: [],
    related: ["card-social-instagram-your-algorithm", "card-social-repurpose-claude", "card-social-instagram-sends"],
    sources: [
      { label: "Social Media Today — Meta adds expanded analytics and AI restyle options to Edits", url: "https://www.socialmediatoday.com/news/meta-adds-expanded-analytics-and-ai-restyle-options-to-edits/823228/" },
      { label: "Social Samosa — Meta adds AI restyle tools & audience insights to Edits", url: "https://www.socialsamosa.com/news-2/meta-ai-restyle-tools-audience-insights-edits-app-12050187" },
      { label: "TechCrunch — Meta's Edits app is getting an AI assistant and a desktop version", url: "https://techcrunch.com/2026/06/11/metas-edits-app-is-getting-an-ai-assistant-and-a-desktop-version/" }
    ],
    tags: ["instagram", "reels", "meta", "edits", "analytics", "ai-video", "creators"],
    created: "2026-06-20",
    updated: "2026-06-20"
  },

  {
    id: "card-webdesign-prop-for-that",
    domains: ["web-design"],
    title: "Move slider-fill, form-validity and pointer effects out of JS and into CSS with 'Prop For That'",
    action: "Import 'prop-for-that/auto' once, add data-props-for=\"range\" to a slider, and fill its track in pure CSS with linear-gradient(... calc(var(--live-value-pct) * 100%) ...).",
    summary: "Adam Argyle's 'Prop For That' (Jun 13 2026) turns runtime browser data — input values, form validity, pointer/scroll position, media progress, image-extracted colors — into live --live-* CSS custom properties via a single data-props-for attribute, so reactivity that normally needs a per-frame JS loop lives in your stylesheet instead.",
    why: "A whole class of UI (filling range tracks, gating a button on validity, pointer-follow/scroll effects) normally means hand-written requestAnimationFrame loops and event listeners just to keep a CSS variable updated. Pushing that into declarative --live-* props means fewer listener bugs, less glue code, designer-ownable interaction, and effects that degrade to a sensible static state when a signal is missing.",
    how: [
      "Import once — bundler: <code>import 'prop-for-that/auto'</code>; or no-build CDN: <code>import 'https://esm.sh/prop-for-that/auto'</code>.",
      "Tag the element — slider: <code>&lt;input type=\"range\" data-props-for=\"range\" min=\"0\" max=\"100\" value=\"40\"&gt;</code>.",
      "Style with the generated prop — fill the track with no JS: <code>background: linear-gradient(to right in oklab, var(--theme) calc(var(--live-value-pct) * 100%), var(--track) 0)</code>.",
      "Form UX — add <code>data-props-for=\"form-state\"</code> and gate a submit button or success styling on <code>--live-all-valid</code> (dirty/touched/pristine states are exposed too).",
      "Pointer / scroll / media — use the <code>pointer</code>, <code>scroll</code>, <code>time</code> props for window/element coordinates, video progress/FPS, or image average/accent colors.",
      "Guard Chromium-only signals (network status, battery, geolocation) with a fallback in var()'s second arg, e.g. <code>var(--live-pointer-x, 0)</code>, so the CSS degrades gracefully."
    ],
    confidence: "emerging",
    corroboration_count: 2,
    status: "active",
    supersedes: [],
    related: ["card-webdesign-sibling-index", "card-webdesign-gap-decorations"],
    sources: [
      { label: "nerdy.dev — Prop For That (Adam Argyle, Jun 13 2026)", url: "https://nerdy.dev/prop-for-that" },
      { label: "CSS-Tricks — Prop For That", url: "https://css-tricks.com/prop-for-that/" }
    ],
    tags: ["css", "custom-properties", "style-queries", "interaction", "forms", "library"],
    created: "2026-06-19",
    updated: "2026-06-19"
  },

  {
    id: "card-ai-tooling-glm-5-2-route",
    domains: ["ai-tooling"],
    title: "Route your bulk, long-running coding/agent jobs to open-weights GLM-5.2 in Claude Code at ~1/6th the cost",
    action: "Set ANTHROPIC_BASE_URL to the Z.ai coding endpoint + your key, map ANTHROPIC_DEFAULT_SONNET_MODEL=\"glm-5.2[1m]\", and send one real refactor/test-gen ticket to GLM-5.2 before routing your high-volume work to it.",
    summary: "Z.ai's GLM-5.2 (shipped Jun 16–17 2026) is the new #1 open-weights model on the Artificial Analysis Intelligence Index — MIT-licensed, ~1M-token context — and reportedly matches or beats GPT-5.5 on several long-horizon coding benchmarks at roughly a sixth of the token cost. It drops into Claude Code / Cline / Cursor with two env vars, so it's a 'model router' move: bulk/long jobs to GLM-5.2, hardest agentic work stays on Opus/GPT-5.5.",
    why: "Token cost is the tax on running agents at volume. A near-frontier open model that plugs into the harness the team already uses turns 'too expensive to run on everything' into 'cheap enough to leave running' — and the ~1M context fits whole-repo refactors and big-brief synthesis.",
    how: [
      "Get a key: a Z.ai GLM Coding Plan at z.ai, OR pay-as-you-go via OpenRouter (model id <code>z-ai/glm-5.2</code>, OpenAI-compatible).",
      "Point Claude Code at it (it reads env, not .env): <code>ANTHROPIC_BASE_URL=\"https://api.z.ai/api/coding/paas/v4\"</code>, <code>ANTHROPIC_API_KEY=\"&lt;key&gt;\"</code>, and <code>ANTHROPIC_DEFAULT_SONNET_MODEL=\"glm-5.2[1m]\"</code> / <code>ANTHROPIC_DEFAULT_OPUS_MODEL=\"glm-5.2[1m]\"</code> ([1m] unlocks full context).",
      "Long-run guardrails: raise <code>API_TIMEOUT_MS</code> and the auto-compact window so long agent loops don't truncate or time out.",
      "OpenRouter alternative: <code>ANTHROPIC_BASE_URL=\"https://openrouter.ai/api\"</code>, <code>ANTHROPIC_AUTH_TOKEN=&lt;key&gt;</code>, <code>ANTHROPIC_MODEL=z-ai/glm-5.2</code>.",
      "Validate on one real ticket and eye the diff against your usual model before trusting it on the critical path.",
      "Triage: bulk refactors / test generation / batch fixes / big-context synthesis → GLM-5.2; hardest agentic/terminal tasks → keep Opus/GPT-5.5. For sensitive work, self-host the MIT weights (zai-org/GLM-5.2) or use a Western host (Fireworks, Baseten, DeepInfra) — the hosted Z.ai API routes through China-based infra."
    ],
    confidence: "emerging",
    corroboration_count: 3,
    thread_id: "thread-open-weight-price-pressure",
    status: "active",
    supersedes: [],
    related: ["card-ai-tooling-model-portability", "card-ai-tooling-local-coding-agent"],
    sources: [
      { label: "Artificial Analysis — GLM-5.2 is the new leading open-weights model", url: "https://artificialanalysis.ai/articles/glm-5-2-is-the-new-leading-open-weights-model-on-the-artificial-analysis-intelligence-index" },
      { label: "OpenRouter — GLM-5.2 API pricing & benchmarks", url: "https://openrouter.ai/z-ai/glm-5.2" },
      { label: "apidog — How to use GLM-5.2 with Claude Code, Cline, and Cursor", url: "https://apidog.com/blog/glm-5-2-claude-code-cline-cursor/" }
    ],
    tags: ["glm-5-2", "open-weights", "claude-code", "openrouter", "model-router", "cost"],
    created: "2026-06-19",
    updated: "2026-06-19"
  },

  {
    id: "card-email-postmaster-deliverability-analysis",
    domains: ["email"],
    title: "Read Gmail's new plain-English deliverability verdict in Postmaster Tools v2, then map it straight to a fix",
    action: "Open postmaster.google.com/v2/sender_compliance, read the new 'Deliverability analysis' verdict for your domain, and act on the code — sunset non-openers for USER_FEEDBACK_NEGATIVE, fix auth + one-click unsubscribe for SENDER_NOT_COMPLIANT.",
    summary: "Google quietly added a 'Deliverability analysis' panel to Postmaster Tools v2 (early Jun 2026) that states, in one sentence, whether Gmail users actually WANT your mail — backed by verdict codes (USER_FEEDBACK_POSITIVE/LOW/NEGATIVE, SPAM_RATE_HIGH, SENDER_NOT_COMPLIANT, SMTP_ERRORS_HIGH, MESSAGE_VOLUME_LOW). It grades engagement/wantedness, not just whether your auth passes.",
    why: "It's Gmail's own first-party verdict on your domain — free, and it maps cleanly to an action — versus a third-party seed-list test that only estimates placement from outside. With Gmail/Yahoo/Microsoft now permanently rejecting rule-breakers, a 'users don't want this' verdict is lost revenue, not a soft warning. Rollout is staggered, so checking yours now is the edge.",
    how: [
      "Go to <code>postmaster.google.com/v2/sender_compliance</code> and sign in with a Google account that controls your sending domain's DNS.",
      "If the domain isn't added: add the domain you authenticate with (the DKIM/SPF d= domain), publish the verification TXT record, Verify, and allow ~24h for data.",
      "Open the Compliance Status dashboard, find the 'Deliverability analysis' panel, and read the one-sentence verdict + recommended action.",
      "Map the verdict to a fix: SENDER_NOT_COMPLIANT → fix SPF/DKIM/DMARC From-alignment, TLS, one-click unsubscribe (RFC 8058 List-Unsubscribe-Post); SPAM_RATE_HIGH / USER_FEEDBACK_NEGATIVE → cut complaints, tighten audience.",
      "Check the spam-rate band: under 0.10% healthy, 0.10–0.29% watch, 0.30%+ fix now. Drifting? Run a sunset flow (suppress 90–180-day non-openers) before the next big send.",
      "Re-check in ~7 days to confirm the verdict moved (e.g. USER_FEEDBACK_NEGATIVE → POSITIVE)."
    ],
    confidence: "emerging",
    corroboration_count: 2,
    status: "active",
    supersedes: [],
    related: ["card-email-inbox-placement-audit", "card-email-dmarc-bimi"],
    sources: [
      { label: "emailexpert — Gmail will now tell you, in plain language, whether users want your email (Jun 11 2026)", url: "https://emailexpert.com/gmail-will-now-tell-you-in-plain-language-whether-users-want-your-email/" },
      { label: "DMARC Report — Google Postmaster Tools introduces Deliverability analysis (Jun 16 2026)", url: "https://dmarcreport.com/blog/google-postmaster-tools-deliverability-analysis-feature-email-senders-guide" },
      { label: "Suped — What is Google Postmaster Tools v2 and how do I access it", url: "https://www.suped.com/learn/email-deliverability/what-is-google-postmaster-tools-v2-and-how-do-i-access-it" }
    ],
    tags: ["deliverability", "gmail", "postmaster-tools", "sender-reputation", "spam-rate"],
    created: "2026-06-19",
    updated: "2026-06-19"
  },

  {
    id: "card-webdev-node-security-patch",
    domains: ["web-dev"],
    title: "Patch Node.js now — a HIGH-severity TLS auth-bypass + WebCrypto DoS shipped Jun 18 2026",
    action: "Run node -v, then upgrade to the matching patched line (v24.17.0 LTS / v26.3.1 / v22.23.0), redeploy every service that terminates TLS or uses WebCrypto, and confirm with node -v.",
    summary: "Node.js shipped coordinated security releases across all active lines on Jun 18 2026 (v26.3.1 Current, v24.17.0 LTS, v22.23.0) fixing two HIGH-severity bugs — a WebCrypto AES integer overflow that remotely aborts the process (DoS, CVE-2026-48933) and a TLS hostname-normalization mismatch that can bypass wildcard-cert authentication (CVE-2026-48618) — plus MEDIUM TLS/HTTP-2/proxy fixes.",
    why: "Any service that terminates TLS or uses WebCrypto is in scope — most production Node apps and a lot of edge/serverless functions. A wildcard-cert auth bypass is a path to MITM, and the DoS is trivially weaponizable; this is a five-minute fix with a real downside if skipped.",
    how: [
      "Check what you're on: <code>node -v</code>, plus CI/base images (<code>node:24</code> tags, Lambda layers, Dockerfiles).",
      "Upgrade to the matching line: LTS → <code>nvm install 24.17.0 &amp;&amp; nvm alias default 24.17.0</code>; Current → v26.3.1; maintenance → v22.23.0; bump the Docker base tag and rebuild.",
      "Redeploy every service that terminates TLS or uses WebCrypto/HTTP-2 (APIs, SSR servers, proxies, edge functions).",
      "Verify: <code>node -v</code> reports the patched version and your TLS endpoints still handshake.",
      "Automate the next one: enable Dependabot/Renovate on your engines + base images and subscribe to the Node.js security feed."
    ],
    confidence: "confirmed",
    status: "active",
    supersedes: [],
    related: [],
    sources: [
      { label: "Node.js Blog — June 2026 Security Releases", url: "https://nodejs.org/en/blog/vulnerability/june-2026-security-releases" },
      { label: "Node.js — v24.17.0 (LTS) release notes", url: "https://nodejs.org/en/blog/release/v24.17.0" }
    ],
    tags: ["nodejs", "security", "cve", "tls", "webcrypto", "patch"],
    created: "2026-06-19",
    updated: "2026-06-19"
  },

  {
    id: "card-webdesign-figma-mcp-design-to-code",
    domains: ["web-design"],
    title: "Turn a Figma frame into code — and push code back to canvas — with the Dev Mode MCP server",
    action: "Enable Figma's Dev Mode MCP server, connect Claude Code or Cursor, select ONE frame, and prompt 'implement the selected frame, reuse my existing components and variables.'",
    summary: "Figma's Dev Mode MCP server hands your AI coding tool (Claude Code, Cursor, VS Code) the real design data — node tree, variables/design tokens, layout constraints, assets — instead of a screenshot, so generated code matches your components. A Jun 16 2026 Figma post shows the workflow maturing both ways: design→code, and code→canvas (pull a built screen back in as editable Figma layers via Figma Make).",
    why: "Screenshot-to-code guesses at spacing and tokens; the MCP server passes the structured design (variables, components, layout) so the agent reuses your actual design system instead of one-off CSS. The new code↔canvas round-trip kills the design/code drift that eats teams — a dev's change can come back as editable layers, and a designer's frame becomes real code in one prompt.",
    how: [
      "On a Figma plan that includes Dev Mode, open a design file → Figma menu → Preferences → check 'Enable Dev Mode MCP Server' (starts a local MCP server).",
      "Connect your AI tool: in Claude Code add the Figma MCP server (Figma Learn has the exact 'Claude Code and Figma' setup steps); in Cursor/VS Code add it under MCP settings. Confirm the figma tools appear.",
      "Design→code: select ONE frame or component in Figma, then prompt the agent 'implement the selected frame; reuse my existing components, variables and tokens' — keep the selection small for accuracy.",
      "Code→canvas: in Figma Make, prompt 'bring this preview back into Figma as design layers' (or 'push this dashboard into Figma, reuse existing components and variables') to round-trip a built screen into editable frames.",
      "Review the output diff — MCP gives structure, not pixel-perfection; spot-check spacing, tokens and a11y before committing.",
      "Run it on one real client component first to feel the speed-up, then fold it into your design-system workflow."
    ],
    confidence: "confirmed",
    status: "active",
    supersedes: [],
    related: ["card-graphic-figma-capture-layers", "card-webdesign-ai-ready-design-system", "card-graphic-canva-brand-kit-ai"],
    sources: [
      { label: "Figma Blog — 4 ways we're using our MCP server at Figma (Jun 16 2026)", url: "https://www.figma.com/blog/4-ways-were-using-our-mcp-server-at-figma/" },
      { label: "Figma Learn — Claude Code and Figma: Set up the MCP server", url: "https://help.figma.com/hc/en-us/articles/39888612464151-Claude-Code-and-Figma-Set-up-the-MCP-server" },
      { label: "Figma Blog — Introducing our Dev Mode MCP server", url: "https://www.figma.com/blog/introducing-figmas-dev-mode-mcp-server/" }
    ],
    tags: ["figma", "mcp", "design-to-code", "dev-mode", "claude-code", "cursor"],
    created: "2026-06-17",
    updated: "2026-06-17"
  },

  {
    id: "card-webdev-flue-cloudflare-agent",
    domains: ["web-dev"],
    title: "Deploy a durable AI agent that survives crashes and lives in Slack/GitHub — with Cloudflare's Agents SDK + Flue",
    action: "Scaffold a Flue agent (npm i @flue/runtime; npm i -D @flue/cli; npx flue init), wire a Slack/GitHub channel, wrap long work in runFiber() for crash recovery, and deploy to Cloudflare.",
    summary: "On Jun 17 2026 Cloudflare shipped its Agents SDK (a runtime giving agents compute, state, storage and durable-execution primitives) and the Astro team released Flue 1.0 Beta, the first open-source framework on it. Flue gives you durable execution (runFiber() checkpoints + recovers), channels (Slack/GitHub/Linear/Discord), a code sandbox, a durable filesystem and dynamic workflows — a durable agent with the plumbing wired in, no lock-in.",
    why: "Most agent prototypes lose the job on a crash, timeout or redeploy, and you hand-build the queue, recovery and channel integration yourself. Flue gives a durable agent that resumes where it stopped and is reachable in the tools the team already uses — so a client support/ops/content agent is a few clicks to the edge instead of a backend project.",
    how: [
      "Scaffold: <code>npm install @flue/runtime</code>, <code>npm install -D @flue/cli</code>, then <code>npx flue init</code> (or point your coding agent at <code>https://flueframework.com/start.md</code> to bootstrap).",
      "Define the agent declaratively ('describe what it knows', not script every step) and give it one tool to start.",
      "Wire a channel — connect Slack or GitHub so the agent is reachable where the team works.",
      "Make work durable: wrap long/multi-step tasks in <code>runFiber()</code> so they checkpoint (<code>stash()</code>) and recover (<code>onFiberRecovered()</code>) after a crash.",
      "Sandbox any LLM-generated code via <code>@cloudflare/codemode</code> (its own Worker isolate) instead of running it inline.",
      "Deploy to Cloudflare (agents scale as needed), then route model calls through a gateway with a dollar cap + fallback model so a looping agent can't run away (card-webdev-ai-gateway-spend-limits)."
    ],
    confidence: "emerging",
    corroboration_count: 2,
    thread_id: "thread-durable-execution",
    status: "active",
    supersedes: [],
    related: ["card-webdev-vercel-cancelable-jobs", "card-webdev-vercel-workflow-nitro", "card-ai-tooling-model-portability"],
    sources: [
      { label: "Cloudflare Blog — Agent harnesses and frameworks, starting with Flue (Jun 17 2026)", url: "https://blog.cloudflare.com/agents-platform-flue-sdk/" },
      { label: "Flue — 1.0 Beta announcement", url: "https://flueframework.com/blog/flue-1-0-beta/" },
      { label: "Flue Docs — Deploy to Cloudflare", url: "https://flueframework.com/docs/ecosystem/deploy/cloudflare/" }
    ],
    tags: ["cloudflare", "flue", "agents", "durable-execution", "astro", "edge"],
    created: "2026-06-18",
    updated: "2026-06-18"
  },

  {
    id: "card-graphic-firefly-brand-batch-creatives",
    domains: ["graphic"],
    title: "Generate on-brand ad creatives that keep the product's real details — train Firefly on your brand, generate in Boards with Nano Banana 2",
    action: "Train a Firefly Custom Model on your best on-brand creatives, then in Firefly Boards pick the Nano Banana 2 (Gemini 3.1) model, upload the real product image, and prompt it to place the product in a scene — driven by a reusable Claude brief.",
    summary: "The slow manual loop (drop a product into Firefly, prompt, pick 1 of 10, build the scene separately, composite in Photoshop, and the AI still loses small product details) collapses into a pipeline: a brand-trained Firefly Custom Model (public beta, Mar 19 2026) makes output on-brand by default; Firefly Boards' Nano Banana 2 partner model keeps product consistency and does targeted edits while preserving the scene; and a reusable Claude brief turns a client brief into a structured prompt set.",
    why: "AI ad-creative usually means re-describing the brand every time and re-hallucinating the product, so you composite by hand and the small details drift. Training the brand once + using a reference-aware model that holds product fidelity turns '30 minutes per image' into 'brief in → a collection of on-brand, product-accurate options out' — AI that saves time instead of making cleanup work.",
    how: [
      "Train the brand model: in Adobe Firefly → Custom Models (public beta), upload a representative set of your best on-brand creatives; the model stays private and preserves your stroke weight, palette, lighting and product/character features.",
      "Build the brief once in Claude: a Claude Project holding your design principles, prompted to 'turn this client brief into 5 ad-creative prompts — each with subject, scene, lighting, composition, what to KEEP from the product reference, negative constraints, and placement aspect ratio.'",
      "Generate in Firefly Boards: select the Nano Banana 2 (Gemini 3.1) partner model, upload the real product image(s), paste a prompt, and generate a grid.",
      "Fix details with targeted-edit prompts ('keep the bottle label exactly, change the background to a sunlit kitchen') instead of re-compositing.",
      "Pick winners and finish in Photoshop (partner models + generative fill available there) for last-mile retouching.",
      "Scale it: move the proven brief into Firefly Services / GenStudio to batch-generate on-brand variations per channel (enterprise/API). Save the brief + model as the team standard."
    ],
    confidence: "emerging",
    status: "active",
    supersedes: [],
    related: ["card-graphic-canva-brand-kit-ai", "card-ai-tooling-reusable-skills", "card-graphic-color-palette"],
    sources: [
      { label: "Adobe Blog — Firefly expands with new AI capabilities + Custom Models (Mar 19 2026)", url: "https://blog.adobe.com/en/publish/2026/03/19/adobe-firefly-expands-video-image-creation-with-new-ai-capabilities-custom-models" },
      { label: "Adobe Firefly — Nano Banana (Gemini) partner model", url: "https://www.adobe.com/products/firefly/partner-models/google-gemini-nano-banana.html" },
      { label: "Adobe Firefly — Custom Models", url: "https://business.adobe.com/products/firefly-business/custom-models.html" },
      { label: "Adobe Help — Partner models to generate images in Firefly Boards", url: "https://helpx.adobe.com/firefly/web/create-mood-boards/firefly-boards/use-non-adobe-models-to-generate-images.html" }
    ],
    tags: ["adobe-firefly", "custom-models", "nano-banana", "ad-creative", "meta-ads", "google-ads", "brand"],
    created: "2026-06-18",
    updated: "2026-06-18"
  },

  {
    id: "card-growth-n8n-ai-agent-workflows",
    domains: ["growth", "ai-tooling"],
    title: "Automate marketing ops with n8n — start from a template, build ONE AI Agent node with 1–2 tools, keep flows small",
    action: "Self-host n8n (or start a Cloud trial), import the 'Build your first AI agent' template, attach a Chat Model + Simple Memory + one tool (e.g. SerpApi or an HTTP call to your CRM), and test it with a Chat Trigger.",
    summary: "n8n is a visual, node-based automation builder (free to self-host, or n8n Cloud) with a first-class AI Agent node: give it a Chat Model (OpenAI/Anthropic/Gemini), a Memory store and Tools (web search, HTTP, sub-workflows, your APIs) and it reasons step-by-step to do real work. The 'templates vs custom?' answer: start from the template gallery, customize, build fully custom only when nothing fits.",
    why: "n8n is the connective tissue that turns the team's AI tools into automated marketing ops — lead capture → enrich → score → route, content repurposing, scheduled report builds — without a backend or a dev. Starting from templates and keeping flows small is what makes them maintainable instead of a fragile all-in-one that breaks halfway through.",
    how: [
      "Pick how to run it: self-host n8n (free, open source) or start an n8n Cloud trial.",
      "Start from a template, not a blank canvas: import 'Build your first AI agent' from the template gallery (n8n.io/workflows/6270).",
      "Wire the AI Agent node: attach a Chat Model (your OpenAI/Anthropic key), add Simple Memory, and give it ONE tool to start (SerpApi web search or an HTTP call to your CRM).",
      "Test with a Chat Trigger: send a simple prompt and watch the node-by-node execution to see exactly what it called.",
      "Keep it small: as the flow grows, extract steps into sub-workflows and call them — easier to debug, cheaper to run (prefer chained model calls over one monolith).",
      "Add a guardrail: for customer-facing or money-touching actions, insert a manual-approval/human-review node before the action fires; never send unmasked PII to third-party models. Save the working flow as a reusable template."
    ],
    confidence: "confirmed",
    status: "active",
    supersedes: [],
    related: ["card-ai-tooling-reusable-skills", "card-ai-tooling-claude-workflows"],
    sources: [
      { label: "n8n — Build Custom AI Agents", url: "https://n8n.io/ai-agents/" },
      { label: "n8n Docs — Build an AI workflow (intro tutorial)", url: "https://docs.n8n.io/advanced-ai/intro-tutorial/" },
      { label: "n8n — Build your first AI agent (template)", url: "https://n8n.io/workflows/6270-build-your-first-ai-agent/" }
    ],
    tags: ["n8n", "automation", "ai-agents", "no-code", "workflows", "marketing-ops"],
    created: "2026-06-18",
    updated: "2026-06-18"
  },

  {
    id: "card-cro-post-purchase-upsell",
    domains: ["cro"],
    title: "Stack a ONE-click post-purchase upsell on the order you just won — near-zero conversion risk",
    action: "Add a Shopify post-purchase upsell app (AfterSell, Zipify OCU, Gro) that uses the native post-purchase checkout extension, and offer ONE complementary item the buyer accepts in one tap — no payment re-entry.",
    summary: "After checkout completes, on the confirmation page, offer one complementary add-on the buyer can accept in a single tap because payment is already on file. The original order is already secured, so a declined upsell costs nothing — it can only add upside. The whole game is one-tap accept with no payment re-entry.",
    why: "It's a high-leverage, low-risk AOV lever that stacks on the free-shipping threshold: the threshold lifts the cart before checkout (goal-gradient), the post-purchase upsell lifts the order after it (the buyer is already committed), so they don't cannibalize. Directional data: ~8–18% AOV lift (Finaloop 9.74% avg; Focus Digital 14.6% post-purchase conversion across 1,847 stores) — but requiring payment re-entry cuts conversion ~78% (GemPages), so the mechanic matters more than the offer.",
    how: [
      "Install a post-purchase upsell app that uses Shopify's native post-purchase checkout extension so 'accept' is one tap with no re-auth — AfterSell, Zipify OneClickUpsell (OCU), or Gro.",
      "Offer exactly ONE complementary item priced ~30–50% of cart value (a true add-on to what they bought) — avoid multiple choices (decision fatigue).",
      "Guarantee one-tap accept (the extension applies the change via Shopify's applyChangeset — the buyer never re-enters payment).",
      "Cover the wallet gap: Apple Pay / Google Pay / Klarna orders skip the on-page offer, so pair it with a post-purchase upsell email.",
      "Pick the offer with AI: ask Claude/ChatGPT to mine your order data for the most-bought-together complement and draft the offer copy.",
      "Measure for 2–4 weeks — track AOV, take-rate AND margin together; a discounted upsell that erodes margin can be a net loss."
    ],
    confidence: "emerging",
    status: "active",
    supersedes: [],
    related: ["card-cro-free-shipping-threshold", "card-cro-show-total-cost-early", "card-cro-guest-checkout"],
    sources: [
      { label: "Digital Applied — Post-Purchase Upsell 2026 AOV Playbook", url: "https://www.digitalapplied.com/blog/post-purchase-upsell-thank-you-page-2026-ecommerce-playbook" },
      { label: "AfterSell — Best Shopify checkout upsell apps to boost AOV (2026)", url: "https://www.aftersell.com/blog/best-9-shopify-checkout-upsell-apps-to-boost-aov-in-2026-aftersell" },
      { label: "Shopify App Store — AfterSell Post-Purchase Upsell", url: "https://apps.shopify.com/aftersell" }
    ],
    tags: ["aov", "upsell", "post-purchase", "shopify", "checkout"],
    created: "2026-06-18",
    updated: "2026-06-18"
  },

  {
    id: "card-graphic-canva-brand-kit-ai",
    domains: ["graphic"],
    title: "Make AI design on-brand from the first draft — connect your Canva Brand Kit to your AI assistant",
    action: "Set up your Brand Kit in Canva (colors, fonts, logo, voice), connect Canva to Claude/ChatGPT/Perplexity, and prompt for a deck or social set 'using my Canva Brand Kit' — you get editable, on-brand assets, not generic AI art.",
    summary: "Canva now plugs into the major AI assistants: the new Perplexity Computer connector (announced ~Jun 4 2026) turns research/briefs into editable Canva presentations, social campaigns, infographics and brand kits across 11 languages, joining the Claude (Apr) and ChatGPT/Gemini Brand Kit connectors. Set your Brand Kit once and generated designs apply your colors, fonts and voice from the outset — and stay fully editable in Canva.",
    why: "The usual knock on AI design is 'random outputs that ignore the brand.' Pinning generation to your Brand Kit fixes that at the source: the first draft already uses your palette, type and voice and lands as editable Canva layers your team can finish — so AI speeds up on-brand production instead of creating off-brand cleanup work.",
    how: [
      "In Canva, build/confirm your Brand Kit — brand colors (hex), fonts, logo and (where available) brand voice: Brand Hub → Brand Kit. (Brand Kit needs Canva Pro/Teams.)",
      "Connect Canva to your assistant: in Perplexity (Pro/Max/Enterprise) add the Canva connector in Perplexity Computer; in Claude or ChatGPT enable the Canva app/connector.",
      "Do the research/brief in the assistant (meeting notes, data, live web context), then prompt: 'Turn this into an on-brand [deck / 5 social posts / infographic] using my Canva Brand Kit.'",
      "Open the result in Canva — it arrives as editable assets; refine copy/layout, swap images, finalize.",
      "Got a flat AI-generated image to edit? Use Magic Layers (now in Gemini & ChatGPT) to convert it into a layered, editable Canva design.",
      "Save winners as reusable Canva templates so the next on-brand asset is one prompt away."
    ],
    confidence: "confirmed",
    corroboration_count: 3,
    status: "active",
    supersedes: [],
    related: ["card-graphic-color-palette", "card-graphic-recraft-svg-vector", "card-webdesign-figma-mcp-design-to-code"],
    sources: [
      { label: "9to5Mac — Canva launches Perplexity Computer connector (Jun 4 2026)", url: "https://9to5mac.com/2026/06/04/canva-launches-perplexity-computer-connector/" },
      { label: "Storyboard18 — Canva integrates with Perplexity Computer to turn AI research into editable creative", url: "https://www.storyboard18.com/brand-marketing/canva-integrates-with-perplexity-computer-to-turn-ai-research-into-editable-creative-assets-100265.htm" },
      { label: "Social Samosa — Canva launches connector for Perplexity Computer", url: "https://www.socialsamosa.com/industry-updates/canva-connector-perplexity-computer-editable-design-12005527" },
      { label: "Canva / BusinessWire — Canva Brings On-Brand Designs Directly into AI Assistants", url: "https://www.businesswire.com/news/home/20260205384226/en/Canva-Brings-On-Brand-Designs-Directly-into-AI-Assistants" }
    ],
    tags: ["canva", "brand-kit", "ai-assistant", "perplexity", "on-brand", "magic-layers"],
    created: "2026-06-17",
    updated: "2026-06-17"
  },

  {
    id: "card-social-x-conversion-tracking",
    domains: ["social"],
    title: "Prove your X presence drives sales — wire up no-code conversion tracking via GTM",
    action: "In X's rebuilt Ads Manager, use the new Google Tag Manager integration to deploy the X Pixel + Conversion API with no code, then watch the real-time diagnostics dashboard to confirm events fire.",
    summary: "X rebuilt its Ads Manager (announced Jun 16 2026) with three things that matter for measuring X: a Google Tag Manager integration that sets up the Pixel + Conversion API (CAPI) through a guided no-code flow, all CAPI resources consolidated in Events Manager, and a real-time conversion diagnostics dashboard to spot and fix broken events. You no longer need a developer on standby to track what your X activity converts.",
    why: "Most teams can't prove X is worth the effort because conversion tracking never got set up — it needed dev time. No-code GTM setup plus a live health dashboard removes that excuse, so you can finally attribute signups/sales to your X content and campaigns, cut what doesn't convert, and defend (or drop) the channel with data instead of vibes.",
    how: [
      "Open X Ads Manager → Events Manager (the rebuilt one) and start the Google Tag Manager integration.",
      "Connect your GTM container through the guided flow — it deploys the X Pixel + Conversion API (CAPI) without hand-coding tags.",
      "Define your key conversion events (purchase, signup, lead) and map them to the right pages/actions.",
      "Open the real-time conversion diagnostics dashboard, trigger a test event, and confirm both Pixel and CAPI events show as healthy.",
      "Fix anything flagged (event deduplication, missing parameters) using the consolidated CAPI tools now in Events Manager.",
      "Once events are clean, judge your X presence on conversions — not likes — and reallocate effort accordingly."
    ],
    confidence: "confirmed",
    corroboration_count: 3,
    status: "active",
    supersedes: [],
    related: ["card-social-instagram-your-algorithm", "card-social-linkedin-ai-citations"],
    sources: [
      { label: "Social Media Today — X adds Google Tag Manager integration", url: "https://www.socialmediatoday.com/news/x-adds-google-tag-manager-integration/823100/" },
      { label: "Social Samosa — X Ads Manager introduces Google Tag Manager integration", url: "https://www.socialsamosa.com/news-2/x-ads-manager-google-tag-manager-integration-campaign-set-up-12046633" },
      { label: "PPC Land — X adds GTM integration and live diagnostics to its rebuilt Ads Manager", url: "https://ppc.land/x-adds-gtm-integration-and-live-diagnostics-to-its-rebuilt-ads-manager/" },
      { label: "X Business — Conversion tracking for websites", url: "https://business.x.com/en/help/campaign-measurement-and-analytics/conversion-tracking-for-websites" }
    ],
    tags: ["x", "twitter", "conversion-tracking", "gtm", "capi", "measurement"],
    created: "2026-06-17",
    updated: "2026-06-17"
  },

  {
    id: "card-webdev-vercel-cancelable-jobs",
    domains: ["web-dev"],
    title: "Run a 30-minute AI job on Vercel — and cancel it mid-flight",
    action: "Bump one long route to maxDuration: 1800 on Fluid Compute, then thread an AbortController.signal through its steps so you can abort the job the instant the user cancels.",
    summary: "Vercel Functions now run up to 30 minutes (1,800s, up from 800s) on Fluid Compute, and the Workflow SDK added inflight cancellation built on the standard AbortController — the cancel signal survives suspensions/replays and crosses step boundaries. Together: long-running serverless jobs (report builds, multi-model pipelines, scrapes) that you can also stop mid-flight, with no queue/worker infra.",
    why: "The long jobs you used to push onto a worker now run serverless — and the cancel signal is what makes that safe: race a durable timeout against a slow model, cancel siblings after the first success, or kill the pipeline when the user leaves, without leaking compute (Fluid bills active CPU only). The off-switch is the half that stops a runaway from burning spend.",
    how: [
      "On a Pro/Enterprise team, enable Fluid Compute (Project → Settings → Functions).",
      "Install the beta SDK: <code>npm i workflow@beta</code>.",
      "Raise the limit: Next.js App Router → <code>export const maxDuration = 1800;</code> in the route; other frameworks → <code>{ \"functions\": { \"api/long-task.py\": { \"maxDuration\": 1800 } } }</code> in <code>vercel.json</code>.",
      "Make it cancelable: create an <code>AbortController</code>, pass <code>controller.signal</code> into each step / <code>fetch</code>, and call <code>controller.abort()</code> on the losing branch of a <code>Promise.race</code> (work vs a <code>sleep('30s')</code> timeout).",
      "Deploy, trigger a run, confirm the cancel propagates in Dashboard → Observability → Workflows.",
      "Put a hard dollar cap in front of model calls inside the job (see card-webdev-ai-gateway-spend-limits)."
    ],
    confidence: "emerging",
    status: "active",
    supersedes: [],
    related: ["card-webdev-vercel-workflow-nitro", "card-webdev-ai-gateway-spend-limits", "card-ai-tooling-model-portability"],
    sources: [
      { label: "Vercel Changelog — Workflow SDK now supports inflight cancellation", url: "https://vercel.com/changelog/workflow-sdk-now-supports-inflight-cancellation" },
      { label: "Vercel Changelog — Functions can now run up to 30 minutes", url: "https://vercel.com/changelog/vercel-functions-can-now-run-up-to-30-minutes" },
      { label: "Vercel Docs — Workflows", url: "https://vercel.com/docs/workflows" }
    ],
    tags: ["vercel", "workflows", "durable-execution", "abortcontroller", "backend"],
    created: "2026-06-16",
    updated: "2026-06-16"
  },

  {
    id: "card-email-inbox-placement-audit",
    domains: ["email"],
    title: "Audit inbox PLACEMENT, not 'delivery rate' — the metric quietly costing revenue",
    action: "Run a seed/spam-list test on one live, high-revenue campaign and read folder placement per provider before you send — fix anything under ~85% inbox rate first.",
    summary: "An ESP 'delivery rate' only means the provider accepted the message — not that it reached the inbox; a 98% delivery rate can hide a ~60% inbox-placement rate. With Gmail/Yahoo/Microsoft now permanently rejecting rule-breakers (spam-complaint ceiling 0.30%, target <0.10%), measure inbox placement rate (IPR) with a seed test and fix failing auth/reputation before send.",
    why: "Clients pay for revenue, and revenue tracks inbox placement, not delivery. A campaign whose IPR has slid to 70% loses 3-in-10 emails of pipeline while the dashboard says 'delivered' — an invisible leak. Measuring it turns the leak into a billable win and a recurring deliverability retainer.",
    how: [
      "Pick one live, high-revenue campaign (top automation or next broadcast); use the real final creative, not a stripped test.",
      "Run a seed/spam-list test (Litmus: Test tab → 'View and create spam tests', or ESP Sync the draft) — it checks ~11 providers (Gmail, Yahoo, Office 365, Outlook, AOL, GMX…).",
      "Read folder placement per provider: Primary = pass, Promotions/Tabs = partial, Spam = reputation problem, Missing = blocked at gateway.",
      "Compute IPR = (inbox ÷ delivered) × 100; flag any major provider under ~85%.",
      "Check the auth row (SPF, DKIM, DMARC, one-click List-Unsubscribe RFC 8058, TLS, BIMI) — red here is the first fix; it's what triggers permanent rejection (see card-email-dmarc-bimi).",
      "Cross-check live reputation in Google Postmaster Tools (spam <0.10%) and Microsoft SNDS; prune low-engagement/invalid addresses, re-test until IPR clears, then ship.",
      "Deliver a one-page 'Inbox Placement Scorecard' to the client — that's the upsell."
    ],
    confidence: "confirmed",
    status: "active",
    supersedes: [],
    related: ["card-email-dmarc-bimi", "card-email-omnisend-mcp"],
    sources: [
      { label: "Litmus — Deliverability Myth: Why You Need to Measure Inbox Placement", url: "https://www.litmus.com/blog/deliverability-myth-why-you-need-measure-inbox-placement" },
      { label: "Litmus — Make It to the Inbox with Litmus' Spam Testing", url: "https://www.litmus.com/blog/make-it-to-the-inbox-not-the-spam-folder-with-litmus-spam-testing" },
      { label: "Chronos Agency — Gmail & Yahoo Sender Requirements 2026", url: "https://chronos.agency/blog/gmail-yahoo-email-sender-requirements-2026/" }
    ],
    tags: ["email", "deliverability", "inbox-placement", "audit"],
    created: "2026-06-16",
    updated: "2026-06-16"
  },

  {
    id: "card-paid-google-bidding-recalibration",
    domains: ["paid"],
    title: "Re-baseline your budget-limited Google Ads targets before the Aug 17 recalibration",
    action: "Filter for 'Limited by budget' tCPA/tROAS campaigns, compare each set target to its trailing 30–90-day actuals, and pull stale/aspirational targets toward reality before Aug 17.",
    summary: "Google is recalibrating how budget-constrained Smart Bidding (tCPA/tROAS) campaigns optimize toward targets — account notices ~Jul 6, rollout starts Aug 17 with a short calibration wobble. Alongside: Promotion Mode (beta) to schedule a temporary ROAS-loosen + extra budget for sales spikes, and Smart Bidding Exploration now global for Search + feed-less PMax (plus a Shopping beta).",
    why: "The recalibration will quietly move spend and CPA/ROAS on every budget-capped campaign during the window — if a client's targets are stale or aspirational, you'll see efficiency swing and could misread a normal wobble as a bug (or let a loose target overspend). Re-baselining now means the AI optimizes against a sane goal.",
    how: [
      "Find the exposed campaigns: Campaigns table → add the 'Budget' status column or filter <code>Status: Limited by budget</code>; flag every Search/PMax/Shopping campaign showing it.",
      "For each, record current Target CPA / Target ROAS (Settings → Bidding) and pull trailing 30–90-day actual CPA/ROAS (Columns → Conv., Cost/conv., Conv. value/cost).",
      "Re-baseline before Aug 17: if the set target is far from trailing actuals, move it toward an achievable number.",
      "Set a notifications watch (bell icon) for the bidding-target notice ~Jul 6; screenshot it for the account log.",
      "Enable Smart Bidding Exploration where you want volume (Search / feed-less PMax); check eligibility for the Shopping beta.",
      "Pre-stage Promotion Mode on top promo campaigns so it's ready to schedule for the next sale instead of a manual override.",
      "Diary an Aug 17–Sep 7 'calibration watch': annotate accounts, hold big manual bid edits ~2 weeks, judge on a rolling 14-day window."
    ],
    confidence: "emerging",
    corroboration_count: 2,
    status: "active",
    supersedes: [],
    related: ["card-paid-aimax-dsa-experiment", "card-paid-meta-advantage-plus"],
    sources: [
      { label: "Search Engine Journal — Google Ads: 3 bidding updates PPC managers need to know", url: "https://www.searchenginejournal.com/google-ads-three-bidding-budgeting-updates/579292/" },
      { label: "Search Engine Roundtable — Promotion Mode beta, Smart Bidding Exploration, bidding-target change", url: "https://www.seroundtable.com/google-ads-promotion-mode-smart-bidding-bidding-target-41501.html" }
    ],
    tags: ["google-ads", "smart-bidding", "tcpa", "troas", "promotion-mode"],
    created: "2026-06-16",
    updated: "2026-06-16"
  },

  {
    id: "card-webdesign-anchor-positioning-menus",
    domains: ["web-design"],
    title: "Build tooltips, dropdowns & menus with zero JS — the native trio is now Baseline",
    action: "Replace one tooltip/menu's JavaScript with the Popover API + invoker commands + CSS anchor positioning, then delete the Floating-UI/Popper dependency.",
    summary: "The overlay UI you used to ship with a positioning library (Floating UI/Popper) plus toggle JS is now three native, cross-browser features: the Popover API (top-layer overlay + light-dismiss), invoker commands (open/close from a button with no JS), and CSS anchor positioning (tether to the trigger and flip on overflow in pure CSS). All three are Baseline (Chrome, Edge, Safari, Firefox), so it's safe for production — unlike the Chromium-only CSS primitives.",
    why: "It deletes a JS dependency, its hydration cost, and a whole class of positioning + accessibility bugs — and because it's Baseline it works for all users, with no fallback to write. The cheapest, most durable overlay you can ship.",
    how: [
      "Markup, no JS: <code>&lt;button commandfor='menu' command='toggle-popover'&gt;Menu&lt;/button&gt;</code> then <code>&lt;div id='menu' popover&gt;…&lt;/div&gt;</code> — a working, dismissible menu.",
      "Tether in CSS: on the button <code>anchor-name: --menu-btn;</code>, on the popover <code>position-anchor: --menu-btn; position-area: bottom span-right;</code>.",
      "Stop it overflowing: add <code>position-try-fallbacks: flip-block, flip-inline;</code> so the browser flips it when there's no room (the job Floating UI did).",
      "For a tooltip, use the hover/focus invoker (<code>interesttarget</code>) instead of click-to-open; for click menus keep <code>command</code>.",
      "Delete the old Floating-UI/Popper init + toggle handler, then tab through it to confirm keyboard/screen-reader behaviour."
    ],
    thread_id: "thread-modern-css-primitives",
    confidence: "confirmed",
    status: "active",
    supersedes: [],
    related: ["card-webdesign-css-carousel", "card-webdesign-sibling-index", "card-web-view-transitions"],
    sources: [
      { label: "MDN — Using CSS anchor positioning", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning/Using" },
      { label: "web.dev — The Popover API is Baseline", url: "https://web.dev/blog/popover-baseline" },
      { label: "web.dev — New to the web platform Jan 2026 (anchor positioning Baseline)", url: "https://web.dev/blog/web-platform-01-2026" },
      { label: "InfoQ — HTML Invoker Commands achieve Baseline support", url: "https://www.infoq.com/news/2026/01/html-invoker-commands/" }
    ],
    tags: ["css", "popover", "anchor-positioning", "baseline", "no-js"],
    created: "2026-06-15",
    updated: "2026-06-15"
  },
  {
    id: "card-ai-tooling-agent-sdk-credit",
    domains: ["ai-tooling", "web-dev"],
    title: "Claim your Claude Agent SDK credit before the Jun 15 billing split — then cap it",
    action: "Open your Claude account billing, claim the one-time Agent SDK credit today, decide on usage-credit overflow, and put a hard dollar cap in front of any agent/CI workload.",
    summary: "From Jun 15, 2026, Claude Agent SDK, the claude -p headless command, third-party Agent-SDK apps, and the Claude Code GitHub Actions integration stop drawing on your normal Claude plan. They move to a separate monthly credit ($20 Pro / $100 Max 5x / $200 Max 20x), metered at full API rates. It's a one-time opt-in you must claim; past the credit, jobs only continue if you've enabled usage credits — otherwise they halt until the credit refreshes. Interactive use (the Claude Code TUI/IDE, Coworking, chat) is unaffected.",
    why: "Anything you run on automation — a scheduled agent, a CI job, a GitHub Action that calls Claude — can silently stop on a teammate's account if the credit isn't claimed, or quietly bill at full API rates if it is. Claiming + capping is the 'govern the AI default' move with a hard deadline.",
    how: [
      "Today: claim the Agent SDK credit in your Claude account billing (one-time; then it refreshes each cycle).",
      "Decide whether to enable usage credits so jobs don't hard-stop when the monthly credit runs out — and treat that as real API spend if you do.",
      "Put a hard dollar cap in front of agent/CI workloads — route through a gateway with a spend limit (card-webdev-ai-gateway-spend-limits) and set per-model/per-day budgets.",
      "Audit which automations call the Agent SDK / claude -p / Claude Code Actions and confirm each runs on an account that has claimed the credit.",
      "Keep your toolchain swap-ready (card-ai-tooling-model-portability) so a billing change never single-points your pipeline."
    ],
    confidence: "confirmed",
    corroboration_count: 3,
    status: "active",
    supersedes: [],
    related: ["card-webdev-ai-gateway-spend-limits", "card-ai-tooling-model-portability"],
    sources: [
      { label: "Anthropic Help Center — Use the Claude Agent SDK with your Claude plan", url: "https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan" },
      { label: "The New Stack — Anthropic Agent SDK credits", url: "https://thenewstack.io/anthropic-agent-sdk-credits/" },
      { label: "XDA — Claude subscriptions no longer include Agent SDK / claude -p usage", url: "https://www.xda-developers.com/anthropics-claude-subscriptions-no-longer-include-agent-sdk-and-claude-p-usage/" }
    ],
    tags: ["anthropic", "claude-code", "agent-sdk", "billing", "cost-control"],
    created: "2026-06-15",
    updated: "2026-06-15"
  },

  {
    id: "card-webdev-pyodide-browser-python",
    domains: ["web-dev"],
    title: "Run real Python in the browser with no backend — install packages straight from PyPI",
    action: "Add the Pyodide CDN script tag to a page, then call await loadPyodide() and micropip.install('yourpackage') to run a real Python library client-side — no server.",
    summary: "Pyodide is CPython compiled to WebAssembly, so Python runs inside a browser tab with no server. The 314.0 release (Jun 13, 2026) means package authors can publish <code>WebAssembly wheels</code> (ready-to-install builds) straight to PyPI, so <code>micropip.install('somepkg')</code> now pulls real libraries at runtime. Use it to ship a calculator, CSV/data explorer, or image/PDF tool that runs entirely on the user's machine.",
    why: "A whole class of small tools (calculators, data explorers, file processors) gets built and hosted as a backend you have to pay for and maintain. Running them client-side in Python deletes the server and the API bill — and the user's data never leaves their browser, which is a real selling point for client tools that touch financials, uploads, or personal data.",
    how: [
      "Add one CDN script tag to your page: <code>&lt;script src='https://cdn.jsdelivr.net/pyodide/v314.0.0/full/pyodide.js'&gt;&lt;/script&gt;</code>",
      "Boot the runtime once: <code>const pyodide = await loadPyodide();</code>",
      "Install a package at runtime: <code>await pyodide.loadPackage('micropip'); const micropip = pyodide.pyimport('micropip'); await micropip.install('snowballstemmer');</code> (swap in any PyPI package that ships a pure-Python or WebAssembly wheel)",
      "Run Python and read the result back into JavaScript: <code>const out = await pyodide.runPythonAsync(\"import statistics; statistics.mean([2,4,6])\");</code>",
      "Lazy-load it: trigger <code>loadPyodide()</code> on the click that opens the tool, not on page load, so only users who use the tool download the runtime (several MB).",
      "Confirm your exact package installs in the Pyodide REPL at pyodide.org before wiring up the UI."
    ],
    confidence: "emerging",
    corroboration_count: 2,
    status: "active",
    thread_id: "thread-no-backend-web",
    supersedes: [],
    related: ["card-webdev-bun-image", "card-webdev-astro6-csp"],
    sources: [
      { label: "Pyodide — 314.0 release (WASM wheels on PyPI)", url: "https://blog.pyodide.org/posts/314-release/" },
      { label: "Pyodide Docs — Getting started / quickstart", url: "https://pyodide.org/en/stable/usage/quickstart.html" },
      { label: "Simon Willison — Publishing WASM wheels to PyPI for Pyodide", url: "https://simonwillison.net/2026/Jun/13/publishing-wasm-wheels/" }
    ],
    tags: ["pyodide", "webassembly", "python", "no-backend"],
    created: "2026-06-14",
    updated: "2026-06-14"
  },

  {
    id: "card-graphic-recraft-svg-vector",
    domains: ["graphic"],
    title: "Generate editable SVG logos & icons with AI — not flat PNGs you can't touch",
    action: "In Recraft, pick a V4 Vector model, prompt your icon as a brief, download it as SVG, and drop it straight into Figma to recolour and resize.",
    summary: "Most AI image tools hand you a flat PNG you can't edit. <b>Recraft V4's Vector models</b> output true SVG (math-defined shapes that stay sharp at any size) with clean, editable paths you open directly in Figma or Illustrator — the only major AI image model doing native SVG rather than tracing a raster image into a messy approximation.",
    why: "The #1 problem with AI logos and icons is that they arrive as pixels: you can't recolour them cleanly, scale them without blur, or hand them to a developer. Native SVG turns a one-off picture into a real brand asset — an icon set that scales from 16px favicon to billboard, recolours to exact brand tokens, and drops into the design system without a redraw.",
    how: [
      "Open recraft.ai and pick a <b>V4 Vector</b> model (Vector or Vector Pro).",
      "Prompt like a brief, not a sentence: <code>minimalist single-line icon of a paper plane, flat, one accent colour #2563EB on transparent, consistent 2px stroke</code>.",
      "Generate, then download as <b>SVG</b>.",
      "Drag the SVG into Figma — it lands as editable vector layers; recolour to your brand tokens and adjust stroke/shape.",
      "Build a consistent set by reusing the exact same style clause across prompts (same stroke weight, fill rule, corner style) so the icons read as one family.",
      "Keep a human in the loop: pick the 2–3 that fit, clean up the paths, and confirm on-brand before shipping."
    ],
    confidence: "confirmed",
    status: "active",
    thread_id: "thread-structured-design-gen",
    supersedes: [],
    related: ["card-graphic-ideogram-json-layout", "card-graphic-color-palette", "card-graphic-font-pairing", "card-webdesign-ai-ready-design-system"],
    sources: [
      { label: "Recraft — AI models (V4 Vector)", url: "https://www.recraft.ai/ai-models/ideogram" },
      { label: "Abduzeedo — Recraft V4 brings design taste and native SVG", url: "https://abduzeedo.com/recraft-v4-brings-design-taste-and-native-svg-ai-generation" },
      { label: "MindStudio — Generate native SVG logos & icons with Recraft V4 Vector", url: "https://www.mindstudio.ai/blog/what-is-recraft-v4-vector-generate-svg-logos-icons-ai" }
    ],
    tags: ["recraft", "svg", "logos", "icons", "figma", "brand"],
    created: "2026-06-14",
    updated: "2026-06-14"
  },

  {
    id: "card-growth-schema-aeo",
    domains: ["growth"],
    title: "Add FAQ schema so AI answer engines can quote your pages",
    action: "Add a FAQPage JSON-LD block to one high-intent money page, validate it with Google's Rich Results Test, and re-check your AI visibility in a few weeks.",
    summary: "Schema markup is invisible JSON-LD code that tells AI crawlers exactly what your page says. 2026 research found pages with clean structure plus schema earn ~2.8× the AI-citation rate of poorly-structured ones, and FAQ schema is on only ~10.5% of AI-cited pages — an under-used, low-effort edge. This is the machine-legibility leg of the answer-engine-optimization play.",
    why: "Buyers increasingly ask an AI assistant instead of scrolling search results, so the question is whether ChatGPT/Perplexity/Google AI can cleanly lift an answer from your page and attribute it to you. <code>FAQPage</code> and <code>HowTo</code> schema map directly to how an LLM extracts answers — it's a cheap way to become the source it quotes.",
    how: [
      "Pick one high-intent money page that already answers real buyer questions (pricing, comparison, 'how does X work').",
      "Generate a <code>FAQPage</code> JSON-LD block — Google's Structured Data Markup Helper, or on WordPress the Rank Math / All in One SEO FAQ block (no code).",
      "Paste the JSON-LD into the page <code>&lt;head&gt;</code> (Google recommends JSON-LD because it sits apart from your layout and won't break it).",
      "Add <code>Organization</code> + <code>Author</code> schema for trust/E-E-A-T signals.",
      "Validate with Google's Rich Results Test and the Schema.org Validator; fix errors before shipping.",
      "Re-run an AI-visibility check (see card-growth-ai-visibility-check) in ~2–4 weeks, then templatise the winning markup across similar pages."
    ],
    confidence: "emerging",
    corroboration_count: 2,
    status: "active",
    thread_id: "thread-answer-engine-optimization",
    supersedes: [],
    related: ["card-growth-aeo-content-formats", "card-growth-ai-visibility-check"],
    sources: [
      { label: "AirOps — How to implement schema markup for AEO", url: "https://www.airops.com/blog/schema-markup-aeo" },
      { label: "HubSpot — Schema markup for AEO", url: "https://blog.hubspot.com/marketing/schema-markup-aeo" },
      { label: "Google Search Central — FAQPage structured data", url: "https://developers.google.com/search/docs/appearance/structured-data/faqpage" }
    ],
    tags: ["aeo", "schema", "json-ld", "faqpage", "seo"],
    created: "2026-06-14",
    updated: "2026-06-14"
  },

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
    title: "Use Google's DSA reprieve to prove AI Max on your own account before the forced switch",
    action: "In Google Ads then Experiments, run AI Max for Search 50/50 against your live DSA campaign for 2–4 weeks and judge it on CPA/ROAS and wasted-query rate, not clicks.",
    summary: "Google is replacing Dynamic Search Ads (DSA — campaigns that auto-target searches from your site's content) with its newer AI Max for Search. It just pushed the automatic switch from Sept 2026 to Feb 2027 and brings back DSA creation on Jun 15, 2026 — a window to test AI Max as a controlled experiment instead of being migrated blind.",
    why: "AI Max is coming whether you like it or not, but the auto-switch is a black box. The operator edge is the same 'keep one guarded manual control to prove the AI's lift on YOUR account' move we use for Meta Advantage+: migrate on evidence, with guardrails already set, not on a deadline.",
    how: [
      "Confirm your DSA campaigns still run; from Jun 15 you can also create/edit DSAs during the test window.",
      "In <b>Google Ads then Experiments</b>, create an experiment that runs <b>AI Max for Search</b> against your existing DSA with a <b>50/50</b> budget split.",
      "Before launch, set the guardrails AI Max needs: tight <b>brand exclusions</b>, negative-keyword lists, and URL/location/text controls so it can't spend on irrelevant or brand searches.",
      "Run <b>2–4 weeks</b>, then judge on <b>CPA</b> (cost per action), <b>ROAS</b> (return on ad spend) and the <b>wasted-query rate</b> from the search-terms report — not raw clicks/impressions, which AI Max will inflate.",
      "If it wins, use the voluntary migration tool now; if it loses, keep DSA and re-test before Jan 2027 (new-DSA creation ends Jan 2027; auto-migration begins Feb 2027).",
      "Audit any SOP that says 'build a DSA' so juniors don't ship the wrong campaign type as the menus change."
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
    title: "Make Instagram file each post under one clear topic people can opt into",
    action: "Open Instagram's 'Your Algorithm' topic list to see how it labels content, then name your post's topic in the first caption line, the on-screen text, and the first 3 seconds.",
    summary: "Instagram's 'Your Algorithm' controls reached the main feed (Jun 12, 2026): an AI reads each person's behaviour, turns it into plain-language topics, and lets them add or remove topics. So your reach now depends on the AI confidently filing your post under a topic that people have chosen to see more of.",
    why: "When viewers can say 'more of this topic' (and 'less of yours'), a muddy off-topic post isn't just ignored — it gets pushed away from the people who'd actually buy. Clear, consistent topic signals are the new distribution lever.",
    how: [
      "On your own account, open <b>Your Algorithm</b> (Settings then the recommendation/topic controls) and read the topics Instagram has guessed — that's roughly how it's labelling content like yours.",
      "Pick <b>one</b> topic per post and say it plainly: put the topic phrase in the <b>first line of the caption</b>, in <b>on-screen text</b>, and in the <b>first 3 seconds</b> of a Reel — give the AI unmistakable signals.",
      "Hold a <b>consistent niche</b> across posts so your account builds a strong topic association people can opt into; keep off-topic personal posts in Stories.",
      "Give every post a 'send this to…' or save-worthy payoff so it also earns the shares and saves that still drive reach (pair with card-social-instagram-sends).",
      "Check after a week: are the topics in Your Algorithm sharpening toward your niche? If they're scattered, your signals are too mixed."
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
    domains: ["web-design"],
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
    tags: ["figma", "chrome-extension", "layout", "ui", "ux"],
    created: "2026-06-13",
    updated: "2026-06-18"
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
    title: "Orchestrate a planner-worker-checker agent team in Claude Code with /workflows",
    action: "In Claude Code, describe a big, splittable job and include the word 'workflow', then watch it run with /workflows.",
    summary: "Claude Code's dynamic workflows (research preview, late May 2026) let you describe a large job and include the word 'workflow'; Claude then writes and runs a script that splits the work across helper agents (subagents). A June update lets those agents nest up to 5 levels deep. It turns the reliable plan, do-in-parallel, verify, merge shape into a built-in feature.",
    why: "The biggest failure of AI agent work isn't smarts — it's overloading one chat until its memory turns to mush and it edits the wrong files. Splitting a job across focused sub-agents with an independent checker is how you stay correct on the work that actually eats time: whole-repo audits, migrations, 'rename this across 40 files', or multi-angle PR review.",
    how: [
      "Take a big, splittable job and phrase it as a workflow, e.g. <code>Audit this codebase for dead exports and unused deps — use a workflow: one agent maps the module graph, parallel agents check each package, a verifier confirms each finding is really unused before reporting.</code>",
      "Run it and watch with <code>/workflows</code> — it builds the orchestration script and runs the sub-agents with live progress.",
      "Lean on <b>fan-out + verify</b>: independent workers for breadth, plus a skeptic agent told to <i>refute</i> each finding before it's accepted (this kills plausible-but-wrong results).",
      "Make any external action idempotent (safe to repeat) and save progress at each step so a retried agent never double-acts.",
      "Once a workflow proves its worth, save it as a reusable AI Skill (a markdown runbook) so the team triggers it by name (card-ai-tooling-reusable-skills)."
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
    updated: "2026-06-13"
  },

  {
    id: "card-growth-ai-visibility-check",
    domains: ["growth"],
    title: "Check today whether ChatGPT and Gemini actually mention your brand (free, no login)",
    action: "Paste your domain into Semrush's free AI Search Visibility Checker, read the 0–100 score, grab the high-volume prompts where you're not mentioned — and check your AI Citation Share in Bing Webmaster Tools. Skip llms.txt: 97% of files go unread.",
    summary: "AEO (Answer Engine Optimization — getting named in AI answers) is measurable for free. Semrush's AI Search Visibility Checker takes just your domain (no sign-up) and returns a 0–100 score across ChatGPT/SearchGPT/Gemini/Google AI/Perplexity, competitor comparison, the prompts that trigger your brand, and the popular prompts where you're invisible (your fix-list). NEW (Jun 19 2026): Bing Webmaster Tools shipped an AI Citation Share report (preview, global) — the % of AI citations your site wins for a grounding query vs competitors (Bing/Copilot only). And NEW data (Ahrefs, 137k domains, Jun 15 2026) shows llms.txt is not a visibility lever: 97% of files got zero requests; spend the time on structure instead.",
    why: "AEO advice is only worth acting on if you can see whether it worked — and buyers increasingly start at an AI answer, where most brands don't show up. This closes the loop: measure where you're absent, fix exactly those pages, then re-measure. Part of that is NOT wasting the hour on llms.txt — the data says crawlers ignore it.",
    how: [
      "Open <b>Semrush's free AI Search Visibility Checker</b>, enter your (or a client's) domain, and hit <b>Check Visibility</b>.",
      "Read the <b>0–100 score</b> and platform coverage to see which AI engines name you and which don't.",
      "Turn on <b>AI Citation Share</b> in <b>Bing Webmaster Tools → AI Performance</b> (preview) — read your share of AI citations per grounding query and the competitor comparison (Bing/Copilot only; Google Search Console still has no citation metric).",
      "Jump to the <b>opportunities</b> — popular prompts where competitors get named and you don't; that's your prioritized target list.",
      "For each gap, run the AEO formatting pass on the most relevant money page (intent-matched title, a one-sentence answer up top, a list/table, an original first-party stat, and FAQ schema + a last-updated date).",
      "Don't invest in <b>llms.txt</b> for visibility (97% of files go unread — Ahrefs); leave any existing file in place but reallocate the effort to clean HTML structure + internal links.",
      "Re-run in ~2–4 weeks to confirm new mentions; for ongoing tracking use Ahrefs Brand Radar or Semrush's AI Toolkit, and read a few real AI answers by hand to see how you're described."
    ],
    confidence: "emerging",
    thread_id: "thread-answer-engine-optimization",
    status: "active",
    supersedes: [],
    related: ["card-growth-aeo-content-formats", "card-growth-schema-aeo", "card-social-linkedin-ai-citations"],
    sources: [
      { label: "Semrush — Free AI Search Visibility Checker", url: "https://www.semrush.com/free-tools/ai-search-visibility-checker/" },
      { label: "Search Engine Journal — SEO Pulse: AI Citation Share ships, new data doubts llms.txt", url: "https://www.searchenginejournal.com/seo-pulse-ai-citation-share-ships-new-data-doubts-llms-txt/579942/" },
      { label: "Ahrefs — We analyzed 137K sites: 97% of llms.txt files never get read", url: "https://ahrefs.com/blog/llmstxt-study/" },
      { label: "Ahrefs — Brand Radar", url: "https://ahrefs.com/brand-radar" }
    ],
    tags: ["aeo", "geo", "ai-search", "measurement", "llms-txt", "bing"],
    created: "2026-06-11",
    updated: "2026-06-21"
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
    title: "Write LinkedIn articles that AI search engines quote (LinkedIn is their #2 source)",
    action: "Publish an original 500–2,000-word LinkedIn article answering one specific buyer question, lead with a one-sentence answer, and post consistently.",
    summary: "When ChatGPT or Perplexity answer a question, they name sources — and Semrush's study of 89,000 cited LinkedIn links found LinkedIn is the #2 most-quoted site (behind Reddit). Original, educational articles of 500–2,000 words win those citations far more than viral feed posts.",
    why: "Buyers increasingly ask an AI 'who's good at X', and the answer is pulled from LinkedIn. That makes a LinkedIn presence a discovery channel into AI answers — one you win with craft, not ad spend.",
    how: [
      "List the 3–5 questions a buyer would ask an AI in your space (\"best [service] for [use case]\", \"how to [outcome]\").",
      "For each, publish a LinkedIn <b>article</b> (not just a feed post) of <b>500–2,000 words</b> that answers it directly — open with a clean one-sentence answer, then expand with your own POV and data (~95% of quoted content is original; reshares barely get quoted).",
      "Post <b>consistently</b> — quoted authors averaged 5+ posts in 4 weeks. You don't need to go viral; moderate, relevant engagement (15–25 reactions) is enough.",
      "Reuse what you have: paste a blog post or talk transcript into Claude, ask for a LinkedIn article in your voice, then add your first-party numbers.",
      "Spot-check: ask ChatGPT/Perplexity your target question and see whether you (or a competitor) get named; iterate."
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
    updated: "2026-06-13"
  },

  {
    id: "card-ai-tooling-fable5-retention",
    domains: ["ai-tooling", "news"],
    title: "Check data retention before you route client data through Claude Fable 5",
    action: "Confirm which model your tool/Copilot uses; for confidential client data, prefer a Zero-Data-Retention Claude model until your Fable 5 terms are confirmed in writing.",
    summary: "Claude Fable 5 (public Jun 2026) runs under a new data-retention rule: automated classifiers keep prompts and outputs for 30 days (flagged items up to 2 years), and — importantly — existing Zero-Data-Retention (ZDR) agreements, which normally mean 'we keep nothing', do NOT apply to Fable 5 traffic. Microsoft restricted it internally over exactly this.",
    why: "It's the 'two gates' rule in action: a model can pass on capability/cost (Fable 5 is top-tier, ~80.3% on the SWE-Bench coding test) and still fail on data-handling. If you or your tools send client-confidential material to Fable 5 expecting nothing is stored, that assumption is now wrong — and a hyperscaler already pulled it internally.",
    how: [
      "Check which model your AI tool / Copilot / IDE is actually calling (Fable 5 may be a new default in some model pickers).",
      "For confidential client material, prefer a Claude model still covered by Zero Data Retention (or another enterprise no-retention path) until terms are confirmed.",
      "Read Anthropic's retention page for these models and confirm — in writing — whether your enterprise agreement covers Fable 5 traffic.",
      "Bake it into your model router: tag each task by data sensitivity, not just capability and cost."
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
    updated: "2026-06-13"
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
    action: "Take one high-intent page, match its title to a common question pattern, lead each section with a one-sentence answer, and add a list/table, an original stat, and an FAQ block.",
    summary: "2026 research across 1M+ AI citations (HubSpot's State of AEO + Wix Studio's AI Search Lab) shows answer engines quote product/landing pages, blog posts and listicles the most — and reward a title that matches how people ask, plus original stats, a visible last-updated date, and FAQ schema (a bit of code that labels your Q&As so machines can read them). AEO is mostly a formatting pass on pages you already have.",
    why: "AI search is now a real discovery channel, and being <i>cited</i> in the answer is starting to matter more than classic backlinks. The lever isn't writing more — it's structuring what you have so a model can lift a clean, attributable chunk and name you.",
    how: [
      "Pick one page that should be winning AI mentions (start with money pages, not the blog archive).",
      "Match the title to how people ask: <code>What is X</code>, <code>X vs Y</code>, <code>How to X</code>, or <code>Best X</code>.",
      "Lead each section with a direct one-sentence answer, then expand — engines lift the first clean sentence.",
      "Turn dense prose into a list or comparison table (pre-chunked = easy to lift); comparison tables especially win ChatGPT citations.",
      "Add an original/first-party stat (your own benchmark or survey number) — proprietary data is what gets attributed to you.",
      "Add an FAQ block with FAQ schema, a visible last-updated date, and an author bio; then check whether ChatGPT/Perplexity cite you for the target question, and iterate."
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
    updated: "2026-06-13"
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
    action: "Paste an article into Claude, ask for 7 distinct-angle LinkedIn posts, then tighten the opening hook on the 3 strongest.",
    summary: "Paste an article into Claude and have it spin out a week of native, different-angle LinkedIn posts in a couple of minutes — then just edit the best ones.",
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
    updated: "2026-06-13"
  },

  {
    id: "card-social-instagram-sends",
    domains: ["social"],
    title: "Design every Instagram post to get DM-shared — the 2026 ranking signal that matters",
    action: "Reframe your next post to be DM-forwardable — one screenshot-able tip plus a 'send this to…' line — and track Sends in Insights.",
    summary: "Instagram's strongest reach signal is now 'sends per reach' — how often people forward your post to a friend in DMs. So build posts people pass along, not just ones they like.",
    why: "Likes and even comments are weak tells now. A private share is the clearest proof to the algorithm that a post is worth showing to strangers. Most briefs still chase likes/saves — the lever moved, so the brief should too.",
    how: [
      "Make the takeaway forwardable: one screenshot-able tip, a 'send this to the person who needs it' framing, or a stat/inside-joke someone would DM to a colleague.",
      "Put the hook in the first line or frame so it survives the scroll.",
      "Add a soft nudge to share with a specific person (e.g. 'tag the teammate who still uses border-radius').",
      "Track the <b>Sends</b> count in Insights — not just likes — and make more of whatever gets forwarded."
    ],
    confidence: "emerging",
    status: "active",
    supersedes: [],
    related: ["card-social-repurpose-claude"],
    sources: [{ label: "Sprout Social — How the Instagram algorithm works (2026)", url: "https://sproutsocial.com/insights/instagram-algorithm/" }],
    tags: ["instagram", "content"],
    created: "2026-06-07",
    updated: "2026-06-13"
  },

  {
    id: "card-paid-meta-advantage-plus",
    domains: ["paid"],
    title: "Launch a self-optimizing Meta prospecting campaign the new (unified) way",
    action: "In Ads Manager, create a Sales-objective campaign with the three Advantage+ levers on, read its 0–100 Opportunity Score, and keep one small manual ad set as a control.",
    summary: "Meta merged the old 'Manual' and 'Advantage+ Shopping' campaign options into one flow: choose the Sales objective and the three Advantage+ levers (budget, audience, placements) are on by default — that IS the old auto-optimizing setup, now finding buyers and picking placements/creative for you on cold traffic. Meta also added an Opportunity Score (a 0–100 grade of how well your campaign is built) for everyone, and halved the 'learning phase' bar (the conversions a campaign needs before delivery settles) to about 25 per week.",
    why: "You stop babysitting audiences and spend your time on creative (the real lever), while the algorithm finds buyers faster and often cheaper. The Opportunity Score is a 10-second read on how well a campaign is set up, and the lower ~25-conversions/week bar means smaller accounts can finally run this. Heads-up: any SOP that still says 'choose Advantage+ Shopping' points at a menu that's gone — juniors will silently build the wrong thing.",
    how: [
      "In Ads Manager, create a campaign and choose the <b>Sales</b> objective (the old standalone 'Advantage+ Shopping' / ASC is gone — it's now Advantage+ Sales inside this one flow).",
      "Leave the three Advantage+ levers ON — budget, audience, placements; that's the AI-driven setup.",
      "Add the <b>Opportunity Score</b> column (or open the campaign overview) and read the 0–100 grade — it scores creative variety, signal quality (your Pixel/Conversions API tracking), audience breadth and conversion-event accuracy. Aim for <b>80+</b>; treat under ~60 as a build-quality fix-list, not a performance verdict.",
      "Upload a deep, varied set of creatives — refresh creative, not audiences — and fix tracking with the Conversions API (both raise the score AND delivery).",
      "Cap existing-customer spend so budget skews to new buyers; keep one small manual ad set as a control for 2–3 weeks to prove the lift.",
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
    updated: "2026-06-13"
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
    action: "Write a workflow you repeat as a short markdown 'skill' (name + when to use + steps), store it where your AI tool looks, and trigger it by name.",
    summary: "An AI 'skill' is a short markdown file — a name, when to use it, and the steps — that your AI tool loads on demand. Capture a multi-step task you keep re-explaining (audit an ad account, scaffold a microsite) as one, and the AI runs it the same way every time.",
    why: "Stop paying the re-prompting tax — turn a one-off prompt win into a team asset that runs consistently and gets sharper with every use.",
    how: [
      "Pick a workflow you repeat and write the exact steps (plus any templates) as a short markdown 'skill': a name, when to use it, the steps.",
      "Store it where your AI tool looks — a Claude Project, a skills folder, or your prompt library.",
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
    updated: "2026-06-13"
  },

  {
    id: "card-webdesign-contrast-color",
    domains: ["web-design"],
    title: "Let CSS pick a guaranteed-readable text colour with contrast-color()",
    action: "On any element whose background is a variable or brand token, set color: contrast-color(var(--bg)) and let the browser choose black or white for legible text.",
    summary: "<code>contrast-color()</code> is a CSS function: hand it a background colour and it returns black or white — whichever reads more clearly on top. So text on a colour you don't know ahead of time (a user-picked theme, a brand token, a data-driven chip) stays legible without you computing anything. It went cross-browser in 2026 (part of Interop), shipping in Chrome 147+ and the latest Safari/Firefox.",
    why: "Dynamic and themeable backgrounds are where readable text quietly breaks — a colour swaps in and the label vanishes against it. This deletes the little JavaScript brightness-calculator (or hand-maintained light/dark variants) teams bolt on, and makes 'text is always readable' a one-line rule the browser enforces.",
    how: [
      "Use it directly on the element: <code>.badge { background: var(--brand); color: contrast-color(var(--brand)); }</code> — change the background and the text re-picks itself.",
      "Feature-detect for older browsers and give a deliberate fallback: <code>@supports (color: contrast-color(red)) { .badge { color: contrast-color(var(--brand)); } }</code>, with a hand-chosen colour outside the block.",
      "Know the limit: it only returns black or white, and only guarantees a readable pair on clearly light or dark backgrounds — mid-tone colours (mid grey, medium blue) can still fail, so keep those off the auto path.",
      "Don't treat it as full accessibility: it targets the WCAG AA minimum, so verify anything critical in a contrast checker.",
      "Wire it to your tokens: feed brand hexes (e.g. from card-graphic-color-palette) straight in, so every themed surface gets legible text for free."
    ],
    confidence: "confirmed",
    status: "active",
    thread_id: "thread-modern-css-primitives",
    supersedes: [],
    related: ["card-webdesign-gap-decorations", "card-webdesign-sibling-index", "card-graphic-color-palette"],
    sources: [
      { label: "MDN — contrast-color()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/contrast-color" },
      { label: "WebKit — How to have the browser pick a contrasting color in CSS", url: "https://webkit.org/blog/16929/contrast-color/" },
      { label: "una.im — Automated accessible text with contrast-color()", url: "https://una.im/contrast-color" },
      { label: "Smashing Magazine — Self-correcting color systems with contrast-color()", url: "https://www.smashingmagazine.com/2026/05/building-self-correcting-color-systems-contrast-color/" }
    ],
    tags: ["css", "accessibility", "color", "contrast"],
    created: "2026-06-14",
    updated: "2026-06-14"
  },

  {
    id: "card-webdesign-ai-ready-design-system",
    domains: ["web-design", "graphic"],
    title: "Make your design system AI-ready so v0 and Figma Make stop drifting off-brand",
    action: "Write a short spec of naming rules, component states and do's/don'ts, feed it to your AI prototyping tool, then audit the output for drift with the free FigmaLint plugin.",
    summary: "AI prototyping tools (Vercel's v0, Figma Make) drift away from your real components even when a library is linked — they invent slightly-wrong buttons and spacing. The fix (Smashing Magazine): treat your design decisions as data the AI reads — a structured spec of names, states, principles and worked examples — plus an audit pass that catches detached instances and hard-coded values before they spread.",
    why: "AI now does a big share of the mechanical UI build, but without explicit constraints it guesses your priorities and the inconsistencies compound across a project. A small, current spec turns the AI from a confident drifter into something that actually follows your system.",
    how: [
      "Write a short structured spec (markdown, or your tokens file): component names, the states each must have (default / hover / focus / disabled / error), 5–8 design principles, and explicit do's and don'ts — the AI doesn't infer priorities, you state them.",
      "Make naming consistent across Figma and code (same token and component names) so the AI can map one to the other instead of guessing.",
      "Give it examples, not just rules: paste 2–3 'good' components and 2–3 'bad' ones so it has a visible target.",
      "Keep one reference file current and point the AI at it — design decisions are infrastructure; update the file whenever a decision changes so it never reads stale screens.",
      "After each generation, run the free <b>FigmaLint</b> plugin to flag detached instances, missing states, hard-coded values and unbound tokens — fix those before the prototype gets reused."
    ],
    confidence: "emerging",
    status: "active",
    supersedes: [],
    related: ["card-webdev-v0-screenshot", "card-graphic-figma-capture-layers", "card-graphic-color-palette"],
    sources: [
      { label: "Smashing Magazine — How To Make Your Design System AI-Ready", url: "https://www.smashingmagazine.com/2026/06/how-make-design-system-ai-ready/" },
      { label: "LogRocket — Figma AI in 2026: everything it can (and can't) do", url: "https://blog.logrocket.com/ux-design/figma-ai-2026-quick-overview/" }
    ],
    tags: ["design-system", "ai-prototyping", "figma", "v0", "tokens"],
    created: "2026-06-14",
    updated: "2026-06-14"
  },

  {
    id: "card-webdev-bun-image",
    domains: ["web-dev"],
    title: "Resize and convert images in your backend with zero installs using Bun.Image",
    action: "On Bun 1.3.14+, replace your sharp pipeline with Bun.file(path).image().resize(...).webp().write(...) — no native module to install.",
    summary: "Bun 1.3.14 ships <code>Bun.Image</code>, a built-in image API. Decode, resize, crop, rotate and convert between JPEG / PNG / WebP (plus HEIC / AVIF / TIFF on macOS and Windows) with a chainable pipeline — a drop-in alternative to the <code>sharp</code> library, but with nothing to npm-install and no native build step.",
    why: "<code>sharp</code> (the usual Node image library) is a heavy native dependency that breaks across OS/CPU combos and slows installs and deploys. If you're on Bun, this deletes that dependency entirely — and reports clock it ~30% faster at resizing and far faster at reading image metadata.",
    how: [
      "Be on Bun 1.3.14 or newer (<code>bun upgrade</code>).",
      "Chain the pipeline in one line: <code>await Bun.file(\"photo.jpg\").image().resize(1024, 1024, { fit: \"inside\" }).webp({ quality: 85 }).write(\"thumb.webp\")</code> — decode, transform, encode, write.",
      "Reach for the same transforms you'd use in sharp: <code>.resize(w,h,{fit,withoutEnlargement})</code>, <code>.rotate(90|180|270)</code>, <code>.flip()/.flop()</code>, <code>.modulate({brightness,saturation})</code>.",
      "Convert format by choosing the encoder — <code>.webp()</code>, <code>.jpeg()</code>, <code>.png()</code> — and serve WebP to cut bytes on the wire.",
      "Mind the platform gap: HEIC/AVIF/TIFF decode on macOS/Windows, so confirm your Linux deploy target supports the formats you need before relying on them in production."
    ],
    confidence: "confirmed",
    status: "active",
    supersedes: [],
    related: ["card-webdev-vercel-workflow-nitro"],
    sources: [
      { label: "Bun Blog — Bun v1.3.14 (Bun.Image)", url: "https://bun.com/blog/bun-v1.3.14" },
      { label: "Geeky Gadgets — How Bun 1.3.14 speeds up image resizing", url: "https://www.geeky-gadgets.com/bun-image-api-replaces-sharp/" }
    ],
    tags: ["bun", "images", "backend", "performance", "webp"],
    created: "2026-06-14",
    updated: "2026-06-14"
  },

  {
    id: "card-webdev-astro6-csp",
    domains: ["web-dev"],
    title: "Turn on a real Content Security Policy in Astro 6 with one config flag",
    action: "In astro.config.mjs add security: { csp: true } and rebuild — Astro hashes every script and style and emits the CSP header for you.",
    summary: "A Content Security Policy (CSP) is a browser rule that blocks injected/malicious scripts — strong protection against XSS (cross-site scripting attacks). It's historically painful because you must hash or allow-list every script and style by hand. Astro 6 makes it built-in and stable: one flag and Astro generates the hashes and headers automatically, for static and server-rendered pages alike.",
    why: "CSP is one of the highest-leverage security headers, and most sites skip it because maintaining the hash list by hand is miserable and breaks on every change. Astro 6 removes the excuse: real XSS hardening on a client site for one line, with no ongoing maintenance.",
    how: [
      "On Astro 6, add to <code>astro.config.mjs</code>: <code>export default defineConfig({ security: { csp: true } })</code> — that auto-hashes all scripts/styles and emits the policy.",
      "Build and load the site; check the response headers (or the generated <code>&lt;meta&gt;</code>) for <code>Content-Security-Policy</code> and confirm the console shows nothing blocked.",
      "Need to allow a CDN, analytics or fonts? Switch to the object form: <code>security: { csp: { directives: [\"default-src 'self'\", \"img-src 'self' https://images.cdn.example.com\"] } }</code>.",
      "Bump the hash strength if you want stricter: <code>csp: { algorithm: 'SHA-512' }</code>.",
      "Test every page type (static pages plus any server-rendered routes / islands) before shipping — a too-tight policy silently blocks a script and breaks interactivity."
    ],
    confidence: "confirmed",
    status: "active",
    supersedes: [],
    related: ["card-webdev-rotate-ai-toolchain"],
    sources: [
      { label: "Astro Blog — Astro 6.0 (built-in CSP)", url: "https://astro.build/blog/astro-6/" },
      { label: "Trevor Lasn — Content Security Policy headers for Astro", url: "https://www.trevorlasn.com/blog/csp-headers-astro" }
    ],
    tags: ["astro", "security", "csp", "headers"],
    created: "2026-06-14",
    updated: "2026-06-14"
  },

  {
    id: "card-email-dark-mode",
    domains: ["email"],
    title: "Make your emails dark-mode-proof so the logo and text don't vanish",
    action: "Put your logo on a small rounded colour chip (not a bare transparent PNG), swap pure #000/#fff for softer tones, then send a test with dark mode ON across Gmail, Apple Mail and Outlook.",
    summary: "Many inboxes (Apple Mail, Outlook, some Gmail) repaint emails in dark mode and partially invert your colours. A dark logo on a transparent PNG then disappears against the dark background, and pure-black text on a now-dark card turns unreadable. The fix is a handful of deliberate choices made before you send — not a hope that it renders.",
    why: "A large share of opens happen in dark mode, and a vanished logo or invisible text on those opens quietly kills your click-through with no error to warn you. Design for it once and every future send is protected.",
    how: [
      "Give the logo a guaranteed backdrop: place it on a small rounded coloured rectangle (a 'chip') so it has contrast in both modes — a bare transparent PNG with dark artwork disappears on dark backgrounds.",
      "Avoid pure extremes: replace <code>#000000</code> / <code>#FFFFFF</code> with near-black/near-white (e.g. <code>#1a1a1a</code> / <code>#f5f5f5</code>) so clients invert them more gracefully; keep body text at a 4.5:1 contrast ratio.",
      "Add the dark-mode hooks: the <code>&lt;meta name=\"color-scheme\" content=\"light dark\"&gt;</code> tag plus <code>@media (prefers-color-scheme: dark)</code> overrides, and supply dark-friendly versions of key images and buttons.",
      "Test every send with dark mode ON: preview in Email on Acid or Litmus, and also eyeball it on a real phone in dark mode — check the logo, button fills, borders and any fine lines.",
      "Re-check anything with transparency or thin strokes specifically — those are the elements that flip from fine to invisible between clients."
    ],
    confidence: "confirmed",
    status: "active",
    supersedes: [],
    related: ["card-email-micro-animation", "card-email-dmarc-bimi"],
    sources: [
      { label: "Email on Acid — Master dark mode for email design and coding", url: "https://www.emailonacid.com/blog/article/email-development/dark-mode-for-email/" },
      { label: "crafting.email — Fix an email logo that disappears in dark mode", url: "https://crafting.email/dark-mode-email-logo-fix/" }
    ],
    tags: ["email", "dark-mode", "design", "deliverability"],
    created: "2026-06-14",
    updated: "2026-06-14"
  },

  {
    id: "card-paid-chatgpt-ads-feed",
    domains: ["paid"],
    title: "Get your products into ChatGPT Ads by reusing your Google Shopping feed",
    action: "In ChatGPT Ads Manager, open the Feeds section and connect the same product feed you already send to Google Shopping — it auto-builds one ad per SKU.",
    summary: "ChatGPT now shows shopping ads, and its Ads Manager has a Feeds section: connect a product feed and ChatGPT auto-generates a sponsored placement for each item from your titles, images, prices and attributes. Crucially you can reuse the structured catalog you already send to Google Shopping, so there's almost no new setup.",
    why: "Buyers increasingly start purchase research inside ChatGPT, and OpenAI says feed-based ads have been among the strongest-performing formats in its beta. Getting your catalog onto a brand-new shopping surface while it's still uncrowded is cheap first-mover reach.",
    how: [
      "In <b>ChatGPT Ads Manager</b>, go to the <b>Feeds</b> section (product-feed management moved there on Jun 2, 2026).",
      "Connect the same structured product feed you send to <b>Google Shopping</b> (title, image, price, attributes) — no need to build a new one.",
      "Provide the required ~100-product sample to start; once connected, the system supports up to ~1,000,000 SKUs per advertiser.",
      "Let it auto-generate an ad per SKU, then <b>review the drafts</b> — confirm titles and images map to the right products before going live.",
      "Start with your best-margin or best-converting SKUs, benchmark performance against your Google Shopping numbers, and scale the feed once you see which products land."
    ],
    confidence: "emerging",
    status: "active",
    thread_id: "thread-ai-ad-surfaces",
    corroboration_count: 3,
    supersedes: [],
    related: ["card-paid-aimax-dsa-experiment"],
    sources: [
      { label: "OpenAI — New ways to buy ChatGPT ads", url: "https://openai.com/index/new-ways-to-buy-chatgpt-ads/" },
      { label: "OpenAI Help — Create campaigns from product feeds", url: "https://help.openai.com/en/articles/20001268-create-campaigns-from-product-feeds" },
      { label: "Search Engine Land — OpenAI launches product feed ads in Ads Manager beta", url: "https://searchengineland.com/openai-launches-product-feed-ads-in-ads-manager-beta-479900" }
    ],
    tags: ["chatgpt-ads", "openai", "shopping", "product-feed", "ecommerce"],
    created: "2026-06-14",
    updated: "2026-06-14"
  },

  {
    id: "card-paid-server-side-tracking",
    domains: ["paid"],
    title: "Recover the conversions browsers now hide — switch on server-side tracking",
    action: "Stand up a server-side Google Tag Manager container and send Meta's Conversions API events from your server, deduplicated against the browser pixel with a shared event_id.",
    summary: "Browser pixels (the snippets that report conversions to Meta and Google) are increasingly blocked by ad-blockers, Apple's tracking prevention and cookie limits — so your ad platforms under-count sales and optimise on bad data. Server-side tracking sends those events from your own server instead, recovering the lost signal. In 2026 it's table stakes, not a nice-to-have.",
    why: "When the platform can't see conversions, its AI bidding (which every modern campaign relies on) optimises blind: CPA looks worse than reality and you scale the wrong ads. Restoring the conversion signal is one of the highest-leverage fixes in paid media right now.",
    how: [
      "Stand up a <b>server-side Google Tag Manager</b> container (Google's hosted option or your own Cloud Run) and route your web events through it.",
      "Turn on <b>Meta's Conversions API (CAPI)</b> to send key events (Purchase, Lead, AddToCart) straight from your server, and pass the <b>same event_id</b> as the browser pixel so Meta de-duplicates instead of double-counting.",
      "Do the same for Google with server-side tags / enhanced conversions so Google Ads gets the recovered signal too.",
      "Pass strong, permitted identifiers — hashed email, click IDs like <code>fbclid</code>/<code>gclid</code> — to lift match quality; the match rate is what makes CAPI worth the effort.",
      "Verify in Meta's <b>Events Manager</b> (Event Match Quality + deduplication) and in GA4 / Tag Assistant that each event arrives <b>once</b>, not twice, before trusting the numbers."
    ],
    confidence: "confirmed",
    status: "active",
    supersedes: [],
    related: ["card-paid-meta-advantage-plus"],
    sources: [
      { label: "Meta — Conversions API (Marketing API docs)", url: "https://developers.facebook.com/docs/marketing-api/conversions-api" },
      { label: "Google — Server-side tagging (Tag Manager)", url: "https://developers.google.com/tag-platform/tag-manager/server-side" }
    ],
    tags: ["tracking", "conversions-api", "server-side", "gtm", "measurement", "meta-ads", "google-ads"],
    created: "2026-06-14",
    updated: "2026-06-14"
  },

  {
    id: "card-paid-ai-ad-creative",
    domains: ["paid", "social"],
    title: "Spin up Meta-volume ad creative with a brand-trained 3-step AI pipeline",
    action: "Build a Claude Project trained on your brand (deep-research doc + reviews + brand guide + top ads), then generate copy in that Project and images via Nano Banana 2 Pro in Gemini.",
    summary: "Meta's algorithm now needs a high volume of fresh creative, which burns out small design teams. A 3-step system (from Social Media Examiner): (1) build a brand knowledge base with AI deep research, (2) train a Claude Project on it, (3) generate copy and image/video concepts from that Project — with a human finishing every asset so the volume stays on-brand.",
    why: "Ad fatigue is real and the platforms reward volume, but quality collapses if you just mass-produce. Anchoring every generation to a brand-trained Project keeps the output on-message instead of generic AI slop — so you feed the algorithm's appetite without diluting the brand.",
    how: [
      "<b>Step 1 — research:</b> use ChatGPT or Gemini deep research to build an external profile of the brand; verify it by pasting into Claude and having it ask clarifying questions, then add proprietary customer insights the AI can't know.",
      "<b>Step 2 — train:</b> create a <b>Claude Project</b> and load the verified research doc, exported customer reviews/testimonials, a ~10-page internal brand doc (values + what makes a strong ad), and your top 10 past ads analysed for what drove performance.",
      "<b>Step 3 — generate:</b> ask the trained Project for ad copy and image concepts in your brand voice.",
      "For <b>images</b>: turn the concepts into prompts in Claude, generate visuals with <b>Nano Banana 2 Pro</b> (in Gemini), then layer the copy on manually.",
      "For <b>video</b>: have Claude draft a timestamped script from the brief, and treat every AI output as a first draft a human creative finishes — never ship it raw."
    ],
    confidence: "emerging",
    status: "active",
    corroboration_count: 2,
    supersedes: [],
    related: ["card-graphic-ideogram-json-layout", "card-social-repurpose-claude"],
    sources: [
      { label: "Social Media Examiner — AI for Better Ad Creative: 3 Steps to Better Results", url: "https://www.socialmediaexaminer.com/ai-for-better-ad-creative-3-steps-to-better-results/" },
      { label: "Google Ads & Commerce — Ads Decoded: leveraging AI creative", url: "https://blog.google/products/ads-commerce/ads-decoded-podcast-ai-creative/" }
    ],
    tags: ["ad-creative", "claude", "gemini", "nano-banana", "meta-ads", "ai-image"],
    created: "2026-06-14",
    updated: "2026-06-14"
  },

  {
    id: "card-social-gemini-omni-avatar",
    domains: ["social", "growth"],
    title: "Make talking-head clips at scale by cloning yourself with Gemini Omni",
    action: "In the Gemini app under Settings then Avatar, enrol your face and voice once, then type @me in a prompt to generate a short video of yourself delivering any script.",
    summary: "Gemini Omni's avatar feature makes a video clone of you. You enrol once — record your face and read numbers aloud (Google's anti-deepfake step) — then summon yourself with <code>@me</code> in any Gemini prompt to generate a ~10-second clip of 'you' saying a script. Every clip carries an invisible SynthID watermark.",
    why: "Short talking-head video is the format that builds trust and reach, but filming every variation is the bottleneck. This lets one person produce many on-message clips — ad hooks, FAQ answers, localized intros — without setting up a camera each time. Volume without a studio.",
    how: [
      "In the Gemini app, go to <b>Settings then Avatar</b> and run the guided enrolment: look into the camera, move your head, and read the numbers aloud so it maps your face and voice.",
      "Generate a clip by writing your script with <code>@me</code> (or <code>@yourname</code>) in the Gemini prompt box, then pick your avatar from the pop-up.",
      "Keep each beat under the ~10-second cap; storyboard a longer video as several short clips and stitch them.",
      "Use it where you need many variations: multiple ad hooks, localized openers, or on-camera answers to your top customer questions.",
      "Disclose AI use where required; note every clip carries a SynthID watermark, and access needs the free YouTube Shorts route or an AI Plus / Pro / Ultra plan."
    ],
    confidence: "emerging",
    status: "active",
    supersedes: [],
    related: ["card-social-repurpose-claude", "card-paid-ai-ad-creative"],
    sources: [
      { label: "Google — Introducing Gemini Omni", url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-omni/" },
      { label: "Android Authority — I made an AI clone of myself with Gemini Avatar: how you can too", url: "https://www.androidauthority.com/gemini-avatar-hands-on-how-to-use-3673898/" }
    ],
    tags: ["gemini", "avatar", "video", "ugc", "content"],
    created: "2026-06-14",
    updated: "2026-06-14"
  },

  {
    id: "card-ai-tooling-browser-use",
    domains: ["ai-tooling"],
    title: "Hand a repetitive web chore to an AI agent with browser-use",
    action: "pip install browser-use, set your model API key, then write one Agent(task=\"...\") line describing the job in plain English and run it.",
    summary: "browser-use is an open-source Python tool that drives a real browser for an AI agent. Instead of scripting every click, you describe the task in plain English ('log into X, open Reports, export the CSV') and the agent reads the page, decides what to click, handles hiccups, and adapts — a loop that mimics how a person browses.",
    why: "Every team has soul-killing web chores: pulling numbers from a dashboard with no API, filling the same form, checking competitor prices. browser-use turns those into a one-paragraph instruction — hours back, without a brittle hand-written scraper that snaps the next time the layout changes.",
    how: [
      "Install it (needs Python 3.11+): <code>pip install browser-use</code>, then install the browser it drives.",
      "Set your LLM key (an OpenAI / Anthropic / Gemini key) in your environment — the model is the agent's brain.",
      "Write the task: <code>from browser_use import Agent</code>, then <code>agent = Agent(task=\"Go to &lt;site&gt;, log in, open Reports, export last month as CSV\", llm=...)</code> and <code>await agent.run()</code>.",
      "Watch the first runs — it narrates each step; tighten the wording wherever it hesitates or clicks the wrong thing.",
      "Start on low-stakes, repeatable jobs (research, data pulls). For anything touching real accounts, run in a throwaway browser profile and keep credentials in env vars, never in the prompt."
    ],
    confidence: "emerging",
    status: "active",
    supersedes: [],
    related: ["card-ai-tooling-claude-workflows", "card-ai-tooling-reusable-skills"],
    sources: [
      { label: "browser-use — GitHub", url: "https://github.com/browser-use/browser-use" },
      { label: "Apidog — Build AI-powered browser automation with Python", url: "https://apidog.com/blog/browser-use-ai-agent/" }
    ],
    tags: ["agents", "automation", "python", "browser-use", "web-automation"],
    created: "2026-06-14",
    updated: "2026-06-14"
  },

  {
    id: "card-ai-tooling-codex-goal",
    domains: ["ai-tooling"],
    title: "Let Codex grind through a big refactor overnight with /goal",
    action: "Enable goals = true in ~/.codex/config.toml under [features], then start a /goal with a detailed 'done when' spec and leave it to plan, act, test and iterate on its own.",
    summary: "Codex's <code>/goal</code> (CLI 0.128.0, 2026) is a long-horizon autonomous loop: you set one goal with clear 'done when' criteria and Codex runs plan → act → test → review → iterate continuously — pausing, resuming and writing notes — until it's met or it gives up. People have left it running for hours (one 14-hour driver project) while away from the keyboard.",
    why: "The tasks that eat senior time are long and mechanical: framework migrations, adding hundreds of tests, repo-wide refactors. /goal is built to chew those for hours unattended, so you reclaim the evening and review a finished branch in the morning — but only if the goal is written well.",
    how: [
      "Switch it on: add <code>goals = true</code> to the <code>[features]</code> section of <code>~/.codex/config.toml</code>.",
      "Write a tight goal with explicit <code>done_when</code> criteria — e.g. 'Migrate this project from Pydantic v1 to v2 and make all tests pass'; specification quality, not patience, decides success (strong goals can run hundreds of words of criteria).",
      "Refine before launching: have Codex restate the goal a couple of times and fill gaps, so it can't drift mid-run.",
      "Run it on a branch with a real test suite as the guardrail — the tests are what let it self-check and keep going safely.",
      "Review the diff and the developer notes it leaves in the morning; never merge an overnight run without reading it."
    ],
    confidence: "emerging",
    status: "active",
    supersedes: [],
    related: ["card-ai-tooling-claude-workflows", "card-webdev-copilot-cli-lsp"],
    sources: [
      { label: "MindStudio — Codex /goal: the 'Ralph Loop' that ran 14 hours", url: "https://www.mindstudio.ai/blog/codex-goal-ralph-loop-14-hour-autonomous-task" },
      { label: "Lenny's Newsletter — Codex Goals: turn 4-hour tasks into set-it-and-forget-it workflows", url: "https://www.lennysnewsletter.com/p/the-codex-feature-that-works-while" }
    ],
    tags: ["codex", "openai", "agents", "autonomous", "refactor"],
    created: "2026-06-14",
    updated: "2026-06-14"
  },

  {
    id: "card-ai-tooling-local-coding-agent",
    domains: ["ai-tooling", "web-dev"],
    title: "Run a coding agent fully on your Mac so client code never leaves the laptop",
    action: "Build llama.cpp with Metal, serve a local GGUF model with llama-server, then point a coding-agent CLI (e.g. Pi) at http://127.0.0.1:8080/v1.",
    summary: "You can run an AI coding agent entirely offline on Apple Silicon: <b>llama.cpp</b> (a local model runner) serves an open model with Metal GPU acceleration, and a CLI agent talks to it over a local URL. No prompts, code or secrets leave your machine — the answer when an NDA or company policy bans sending client code to a cloud model.",
    why: "The fastest AI coding tools send your code to someone else's servers, which is a non-starter for regulated or NDA'd work. A local agent keeps everything on the laptop, so you still get agentic help on the exact repos you're not allowed to upload.",
    how: [
      "Build the runner: <code>brew install cmake git</code>, clone <code>github.com/ggml-org/llama.cpp</code>, then <code>cmake -B build -DGGML_METAL=ON && cmake --build build --config Release -j</code> to enable Apple-GPU acceleration.",
      "Download an open coding model in <b>GGUF</b> format (a quantised, laptop-sized model file) from Hugging Face — a ~16GB quant runs on a well-specced Mac.",
      "Serve it locally: <code>llama-server -m &lt;model&gt;.gguf -ngl 999 -fa on -c 65536 --host 127.0.0.1 --port 8080</code> — that exposes an OpenAI-compatible endpoint.",
      "Point a CLI agent at it — e.g. add a local provider to Pi's <code>~/.pi/agent/models.json</code> with <code>baseUrl: http://127.0.0.1:8080/v1</code>, then run <code>pi</code>.",
      "Expect lower raw quality than a frontier cloud model: reserve the local agent for privacy-critical repos and keep a cloud agent (behind the gateway in card-ai-tooling-model-portability) for everything else."
    ],
    confidence: "emerging",
    status: "active",
    supersedes: [],
    related: ["card-ai-tooling-model-portability", "card-webdev-copilot-cli-lsp"],
    sources: [
      { label: "ikyle.me — How to set up a local coding agent on macOS", url: "https://ikyle.me/blog/2026/how-to-setup-a-local-coding-agent-on-macos" },
      { label: "llama.cpp — GitHub", url: "https://github.com/ggml-org/llama.cpp" }
    ],
    tags: ["local-llm", "privacy", "llama-cpp", "coding-agent", "offline", "apple-silicon"],
    created: "2026-06-14",
    updated: "2026-06-14"
  },
  {
    id: "card-cro-show-total-cost-early",
    domains: ["cro", "web-design"],
    title: "Show the full price before checkout — kill the surprise-fee abandon",
    action: "Put shipping, tax and any fees in the cart (or the first checkout step) — never reveal them only on the final screen.",
    summary: "An 'unexpected extra cost' at the end of checkout is the single biggest reason people who meant to buy walk away. Baymard's research puts overall cart abandonment around 70%, with 'extra costs too high (shipping, tax, fees)' the #1 stated reason at ~48%.",
    why: "If the first time someone sees the real total is the last step, a chunk of ready-to-buy shoppers bail. Showing the true cost early loses only the few who'd never pay it anyway and keeps everyone else — the highest-leverage checkout fix there is.",
    how: [
      "Add a shipping estimate (and tax where you can) to the cart — a postcode/ZIP field, or a clear 'from' price, not a blank 'calculated later'.",
      "Surface any fee (handling, surcharge) the moment it applies, not on the payment step.",
      "If you offer free shipping over a threshold, say so in the cart with how far away they are (see the free-shipping card).",
      "Re-check your own funnel: the step with the biggest drop is usually right after the surprise cost appears."
    ],
    confidence: "confirmed",
    status: "active",
    supersedes: [],
    related: [],
    sources: [
      { label: "Baymard Institute — Cart Abandonment Rate (top reasons)", url: "https://baymard.com/lists/cart-abandonment-rate" }
    ],
    tags: ["checkout", "pricing", "abandonment"],
    created: "2026-06-14",
    updated: "2026-06-14"
  },
  {
    id: "card-cro-guest-checkout",
    domains: ["cro", "web-design"],
    title: "Let people check out as a guest — don't force an account",
    action: "Add a prominent 'continue as guest' option and offer account creation AFTER the order is placed.",
    summary: "Forcing shoppers to register before buying is one of the top checkout killers — Baymard finds ~26% of people who abandon do so because the site made them create an account.",
    why: "A first-time buyer doesn't want a password just to give you money. Guest checkout removes that wall; you can still invite them to save their details in one tap once they've already paid.",
    how: [
      "Make 'guest checkout' at least as visible as 'sign in' — not a hidden link.",
      "Collect only what fulfils the order; offer 'create an account?' on the thank-you page, pre-filled from what they just typed.",
      "For returning users, support email-link or express-wallet sign-in so they skip typing."
    ],
    confidence: "confirmed",
    status: "active",
    supersedes: [],
    related: [],
    sources: [
      { label: "Baymard Institute — Cart Abandonment Rate (forced account creation)", url: "https://baymard.com/lists/cart-abandonment-rate" }
    ],
    tags: ["checkout", "forms"],
    created: "2026-06-14",
    updated: "2026-06-14"
  },
  {
    id: "card-cro-shorten-checkout",
    domains: ["cro", "web-design"],
    title: "Cut your checkout to one clear flow of about 8 fields",
    action: "Reduce the checkout to roughly 12–14 visible elements / 7–8 form fields and strip everything optional off the main path.",
    summary: "Baymard's large checkout study finds the ideal flow is about 12–14 form elements (~7–8 fields), but the average real checkout has ~11.8 fields — close to double. Bringing a checkout up to that usability standard is associated with a ~35% conversion lift.",
    why: "Every extra field is friction and another place to bounce, and most checkouts ask for things they don't need on the critical path. Trimming to the established ideal is one of the few changes with a quantified, large upside.",
    how: [
      "List every field and ask of each: 'does the order fail right now without this?' If not, cut it or move it post-purchase.",
      "Combine where you can — one full-name field; auto-derive city/region from postcode.",
      "Default billing address = shipping, with a single checkbox to differ.",
      "Aim for one screen or a short, clearly-stepped flow, and show progress."
    ],
    confidence: "confirmed",
    status: "active",
    supersedes: [],
    related: [],
    sources: [
      { label: "Baymard Institute — Checkout Usability research", url: "https://baymard.com/checkout-usability" }
    ],
    tags: ["checkout", "forms"],
    created: "2026-06-14",
    updated: "2026-06-14"
  },
  {
    id: "card-cro-minimise-form-fields",
    domains: ["cro", "web-dev"],
    title: "Make the checkout form fill itself — autocomplete + address lookup",
    action: "Add correct autocomplete attributes and an address lookup so the browser and wallets fill the form in a tap.",
    summary: "Half of hitting Baymard's ~7–8-field ideal is letting the browser do the typing: proper HTML autocomplete tokens plus an address-autocomplete cut manual entry sharply, especially on mobile.",
    why: "A field the user doesn't have to type is a field they can't abandon on. Autofill turns a ten-field address block into one tap — it's the implementation half of 'shorten the checkout'.",
    how: [
      "Tag every input with the right token: <code>autocomplete=\"email\"</code>, <code>\"given-name\"</code>, <code>\"postal-code\"</code>, <code>\"cc-number\"</code>, etc.",
      "Use <code>inputmode=\"numeric\"</code> for number fields and <code>autocomplete=\"one-time-code\"</code> for OTPs so phones show the right keyboard.",
      "Add an address autocomplete (a postal/maps API) that fills city/region/postcode from one line.",
      "Let express wallets (next card) populate name, address and payment in one step."
    ],
    confidence: "confirmed",
    status: "active",
    supersedes: [],
    related: [],
    sources: [
      { label: "Baymard Institute — Checkout Usability research", url: "https://baymard.com/checkout-usability" }
    ],
    tags: ["checkout", "forms", "autofill"],
    created: "2026-06-14",
    updated: "2026-06-14"
  },
  {
    id: "card-cro-express-wallets",
    domains: ["cro", "web-dev"],
    title: "Offer one-tap wallets (Apple Pay / Google Pay / Shop Pay)",
    action: "Add the express wallets your market uses at the top of checkout so returning shoppers can pay in one authenticated tap.",
    summary: "Express wallets collect name, address and payment in a single tap — removing most of the checkout form. Baymard's checkout research shows payment friction is a real abandonment driver, and wallets remove it for a large share of mobile buyers.",
    why: "The fastest checkout is the one with no typing. For repeat and mobile shoppers a wallet button can replace the entire form. The exact conversion lift is account-specific, so add it AND measure it.",
    how: [
      "Enable Apple Pay + Google Pay (and Shop Pay / PayPal if you're on those platforms) — most checkout stacks just toggle them on.",
      "Put the express buttons at the TOP of checkout (and on the cart/PDP), with the normal form as a fallback below an 'or' divider.",
      "Confirm the wallet returns a usable shipping address + email for fulfilment.",
      "Measure the lift on your own funnel before assuming a number."
    ],
    confidence: "confirmed",
    status: "active",
    supersedes: [],
    related: [],
    sources: [
      { label: "Baymard Institute — Checkout Usability research", url: "https://baymard.com/checkout-usability" }
    ],
    tags: ["checkout", "payments", "mobile"],
    created: "2026-06-14",
    updated: "2026-06-14"
  },
  {
    id: "card-cro-trust-at-payment",
    domains: ["cro", "web-design"],
    title: "Earn trust at the payment step — with cues people actually recognise",
    action: "At the card step show recognisable trust cues (accepted-card logos, a plain security line); don't rely on an obscure 'secure' badge.",
    summary: "Baymard finds ~18% of abandoners leave because they 'didn't trust the site with their credit-card information'. The fix is cues shoppers recognise — and Baymard's testing shows a familiar mark builds trust while an unknown custom badge can do nothing, or even hurt.",
    why: "The payment step is where doubt peaks. Recognisable signals (the card networks you take, a clear note on security and returns) calm it. Which exact badge 'works' is genuinely test-don't-trust — recognisability matters more than the logo itself.",
    how: [
      "Put accepted-card and wallet logos right at the payment field.",
      "Add a one-line, plain reassurance near the pay button (what's protected, your return promise).",
      "Keep the whole flow visibly your brand on HTTPS — avoid a jarring third-party redirect for card entry where you can.",
      "A/B test specific trust badges on your own traffic rather than copying a competitor's."
    ],
    confidence: "confirmed",
    status: "active",
    supersedes: [],
    related: [],
    sources: [
      { label: "Baymard Institute — Cart Abandonment Rate (trust / card security)", url: "https://baymard.com/lists/cart-abandonment-rate" }
    ],
    tags: ["checkout", "trust", "payments"],
    created: "2026-06-14",
    updated: "2026-06-14"
  },
  {
    id: "card-cro-speed-is-revenue",
    domains: ["cro", "web-dev"],
    title: "Treat speed as revenue — hold Core Web Vitals",
    action: "Measure and hold Core Web Vitals (LCP < 2.5s, INP < 200ms, CLS < 0.1) on your key pages, mobile first.",
    summary: "Speed moves money. Google and Deloitte's 'Milliseconds Make Millions' found a 0.1-second mobile speed improvement lifted retail conversions by +8.4% and average order value by +9.2%; Google also reports ~53% of mobile visits are abandoned when a page takes over 3 seconds.",
    why: "Every 100ms of delay quietly taxes conversion and order value before the shopper even sees your offer. Core Web Vitals are the measurable, Google-defined targets that proxy that experience — hit them and you stop leaking sales to latency.",
    how: [
      "Measure real-user CWV (PageSpeed Insights / CrUX / your own RUM), not just lab scores; fix the slowest real pages first.",
      "LCP: right-size and preload the hero image; cut render-blocking CSS/JS.",
      "INP: break up long JavaScript tasks and defer non-critical work.",
      "CLS: set width/height on images and reserve space for embeds/ads.",
      "Re-measure after each change and watch conversion and AOV move with it."
    ],
    confidence: "confirmed",
    status: "active",
    corroboration_count: 2,
    supersedes: [],
    related: [],
    sources: [
      { label: "web.dev — Web Vitals (Google)", url: "https://web.dev/articles/vitals" },
      { label: "Deloitte — Milliseconds Make Millions", url: "https://www.deloitte.com/ie/en/services/consulting/research/milliseconds-make-millions.html" }
    ],
    tags: ["performance", "core-web-vitals", "speed"],
    created: "2026-06-14",
    updated: "2026-06-14"
  },
  {
    id: "card-cro-cta-tap-target-reality",
    domains: ["cro", "web-design"],
    title: "Make your CTA easy to hit and read — then test the rest (CTA myths, corrected)",
    action: "Size primary buttons to the platform tap-target minimum, give text at least 4.5:1 contrast, use verb-led copy — THEN A/B test colour and wording on your own traffic.",
    summary: "What's actually established about buttons is the unglamorous part: a minimum tap size (WCAG 2.2 ≥24×24px; Apple's guideline is 44pt; Android's Material is 48dp), text contrast of at least 4.5:1 (WCAG), Fitts's law (bigger, closer targets are faster to hit), and clear copy. What is NOT established is folklore like 'a red (or green) button always wins' or a magic size beyond the minimum — that's context-dependent, so test it.",
    why: "Teams burn time arguing button colour (no universal answer) while shipping CTAs that fail the things that DO matter — too small to tap, too low-contrast to read. Nail the established minimums first; treat colour and wording as hypotheses to test, not rules to copy from a case study.",
    how: [
      "Hit the tap-target floor: at least WCAG 2.2's 24px, ideally the 44pt / 48dp platform guidance, with enough spacing that neighbours aren't mis-tapped.",
      "Check contrast: button text at least 4.5:1 against its background (WCAG AA).",
      "Write the label as an action ('Add to cart', 'Start free trial'), never 'Submit'.",
      "Place the primary action where the thumb and eye expect it (Fitts's law) and make it the clear visual priority.",
      "ONLY THEN test colour, size and wording on YOUR traffic — don't import a case-study 'winner'."
    ],
    confidence: "confirmed",
    status: "active",
    corroboration_count: 2,
    supersedes: [],
    related: [],
    sources: [
      { label: "W3C — WCAG 2.2 Target Size (Minimum)", url: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html" },
      { label: "W3C — WCAG Contrast (Minimum), 4.5:1", url: "https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html" },
      { label: "Apple — Human Interface Guidelines (Layout / tap targets)", url: "https://developer.apple.com/design/human-interface-guidelines/layout" }
    ],
    tags: ["cta", "accessibility", "mobile", "myth-correction"],
    created: "2026-06-14",
    updated: "2026-06-14"
  },
  {
    id: "card-cro-mobile-checkout-first",
    domains: ["cro", "web-dev"],
    title: "Build the checkout mobile-first — most buyers (and bounces) are on phones",
    action: "Make the checkout single-column with big tap targets, the right keyboards, autofill and wallets — and test it on a real phone.",
    summary: "Mobile traffic dominates but converts below desktop, and many checkouts are still designed desktop-first. Baymard's checkout research catalogues the mobile fixes; the tap-target sizes are governed by WCAG and platform minimums.",
    why: "A checkout that's fine on a laptop can be unusable on a phone — tiny targets, the wrong keyboard, multi-column forms. Since most shoppers (and most abandons) are mobile, the phone is the baseline, not an afterthought.",
    how: [
      "One column, large tap targets (see the CTA card), generous spacing.",
      "Right keyboard per field via <code>inputmode</code> + <code>autocomplete</code>; offer express wallets at the top.",
      "No tiny 'promo code' traps or hard-to-dismiss popups on the critical path.",
      "Test on a real mid-range phone on a throttled connection — not just desktop responsive mode."
    ],
    confidence: "confirmed",
    status: "active",
    corroboration_count: 2,
    supersedes: [],
    related: [],
    sources: [
      { label: "Baymard Institute — Checkout Usability research", url: "https://baymard.com/checkout-usability" },
      { label: "W3C — WCAG 2.2 Target Size (Minimum)", url: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html" }
    ],
    tags: ["mobile", "checkout", "accessibility"],
    created: "2026-06-14",
    updated: "2026-06-14"
  },
  {
    id: "card-cro-free-shipping-threshold",
    domains: ["cro", "web-design"],
    title: "Add a free-shipping threshold + progress bar to lift average order value",
    action: "Set the threshold by margin, not a round number: keep candidate thresholds only where (Threshold − AOV) × gross-margin% covers the shipping you'd absorb — then set a separate, lower mobile threshold and show a 'you're $X away' bar.",
    summary: "Shipping cost is the top checkout objection (Baymard), and free shipping is the incentive shoppers want most — ~81% say it makes them more likely to buy and ~51% add items specifically to qualify (Capital One Shopping), so a threshold turns it into an AOV lever via the 'goal-gradient' effect (people push harder as a reward gets closer). The PROGRESS BAR is the highest-ROI single AOV widget; the threshold is just the target it points at. Pick the number by contribution margin, not the '~15–25% above AOV' folklore — and because mobile AOV runs ~20–30% lower than desktop, set mobile its own lower bar. Pair with showing the full price early (card-cro-show-total-cost-early). HONEST FLAG: the specific percentages are well-supported starting points to TEST, not guarantees.",
    why: "Free shipping removes the #1 objection AND nudges basket size — but a threshold that lifts AOV while you eat shipping can be a NET LOSS, and a single blended bar sets a goal most mobile shoppers (your largest traffic) can't reach. The mechanism (goal-gradient) is settled; the right number is a margin calculation and a device segmentation, not a vibe.",
    how: [
      "Pull the inputs split by device: last-90-day AOV, gross-margin %, and real average shipping cost per order (mobile vs desktop).",
      "Run the margin test, not the round number: for a candidate threshold, compute <code>(Threshold − AOV) × gross-margin%</code> and keep only thresholds where that covers the shipping you'd absorb on a nudged order.",
      "Set a separate mobile threshold ~20–30% below your desktop number (mobile AOV runs ~20–30% lower), so phone shoppers see a goal they can actually hit.",
      "Show a live progress bar in cart / mini-cart: 'You're $12 away from free shipping', with one relevant low-cost add-on beside it — that widget is the lift.",
      "AI step: export your order-value distribution and ask Claude/ChatGPT for the threshold that captures the most 'one-nudge-away' orders at or above your margin floor, per device, and to draft the bar copy.",
      "Measure AOV, conversion AND shipping-cost margin for 3–4 weeks before locking the number — treat the percentages as a hypothesis, not a setting.",
      "Re-peg it in 2026: Deloitte's retail survey found 67% of execs plan to RAISE their free-shipping threshold this year to defend margins against carrier/tariff costs — if yours is a year old, re-check it against current AOV and re-run the margin math."
    ],
    confidence: "emerging",
    status: "active",
    supersedes: [],
    related: ["card-cro-show-total-cost-early", "card-cro-cross-sell-bundles", "card-cro-post-purchase-upsell"],
    sources: [
      { label: "Digital Applied — Free Shipping Threshold Strategy 2026 (contribution-margin method)", url: "https://www.digitalapplied.com/blog/free-shipping-threshold-strategy-2026-ecommerce-playbook" },
      { label: "Growth Suite — Free Shipping Threshold Strategy to Increase AOV (mobile vs desktop)", url: "https://www.growthsuite.net/resources/shopify-upsell-cross-sell/increase-average-order-value/free-shipping-threshold" },
      { label: "Baymard Institute — Cart Abandonment Rate (shipping cost / free shipping)", url: "https://baymard.com/lists/cart-abandonment-rate" },
      { label: "Capital One Shopping — Free Shipping Statistics 2026", url: "https://capitaloneshopping.com/research/free-shipping-statistics/" },
      { label: "Deloitte — 2026 Retail Industry Outlook (free-shipping threshold reset)", url: "https://www.deloitte.com/us/en/insights/industry/retail-distribution/retail-distribution-industry-outlook.html" }
    ],
    tags: ["aov", "shipping", "cart", "margin", "mobile"],
    created: "2026-06-14",
    updated: "2026-06-21"
  },
  {
    id: "card-cro-price-anchoring",
    domains: ["cro", "web-design"],
    title: "Anchor the price — show the reference number first",
    action: "Display the genuine original/higher price next to the current price, and lead tiered pricing with the premium plan as the anchor.",
    summary: "Anchoring is a well-established cognitive bias (Tversky & Kahneman, 1974): the first number people see frames how they judge the next one, so a credible higher reference makes the target price read as better value. HONEST: the EFFECT is settled psychology; whether a SPECIFIC tactic lifts YOUR revenue is account-specific — test it.",
    why: "Price perception is relative, not absolute. A credible anchor reframes '$49' from 'expensive' to 'a deal'. The bias is robust in the literature; the application — which anchor, and how — is where you experiment.",
    how: [
      "On discounts, show the real original price next to the current one — never fake it (false anchors erode trust and can be illegal).",
      "In tiered pricing, present or highlight the highest tier first so the mid-tier reads as the sensible pick.",
      "Use a defensible reference (RRP, your old price, a competitor set), not an invented one.",
      "A/B test the framing on your traffic — the effect's existence is settled, its size on your page is not."
    ],
    confidence: "emerging",
    status: "active",
    supersedes: [],
    related: [],
    sources: [
      { label: "Tversky & Kahneman (1974), Science — Judgment under Uncertainty (anchoring)", url: "https://www.science.org/doi/10.1126/science.185.4157.1124" }
    ],
    tags: ["pricing", "psychology", "aov"],
    created: "2026-06-14",
    updated: "2026-06-14"
  },
  {
    id: "card-cro-pdp-reviews",
    domains: ["cro", "web-design"],
    title: "Put real reviews on every product page — the first five do the heavy lifting",
    action: "Show the star rating + review count near the product title, prioritise getting the first ~5 reviews per product, mark verified buyers, and keep the negatives.",
    summary: "Northwestern's Spiegel Research Center found a product page with around 5 reviews converts ~270% higher than one with zero — and most of that lift comes from the FIRST handful (≈5 reviews ≈ 4× the purchase likelihood vs none). The effect is bigger on higher-priced / higher-consideration items (~+380% vs ~+190% for low-priced), and a 'verified buyer' badge raises purchase odds ~15%.",
    why: "Reviews are the social proof shoppers look for before buying, and the data here is unusually clear: you don't need hundreds — going from zero to a handful is where the conversion jump happens. So the priority isn't 'collect thousands', it's 'get the first five onto every product, and make them credible'.",
    how: [
      "Show the star rating + review count right by the product title, and reflect it on listing/category pages.",
      "Prioritise getting the first ~5 reviews on each product — post-purchase email/SMS asks, or seeding new SKUs with sampling; that's where most of the lift is.",
      "Mark 'verified buyer' on genuine purchasers (it lifts purchase odds ~15%).",
      "Don't scrub negative reviews — an all-perfect score reads as fake; a few critical reviews (with your replies) build credibility.",
      "Push hardest for reviews on your higher-priced / higher-consideration products — they benefit most."
    ],
    confidence: "confirmed",
    status: "active",
    supersedes: [],
    related: [],
    sources: [
      { label: "Northwestern Medill Spiegel Research Center — How Online Reviews Influence Sales", url: "https://spiegel.medill.northwestern.edu/how-online-reviews-influence-sales" }
    ],
    tags: ["pdp", "reviews", "social-proof"],
    created: "2026-06-14",
    updated: "2026-06-14"
  },
  {
    id: "card-cro-cross-sell-bundles",
    domains: ["cro", "web-design"],
    title: "Lift average order value with relevant cross-sells and bundles — placed so they don't break the buy",
    action: "Add a 'frequently bought together' / bundle-and-save block after add-to-cart (not in the middle of checkout), recommending genuinely related items.",
    summary: "Showing relevant add-ons and bundles is a sound way to grow average order value — the shopper has already decided to buy, so a useful, related suggestion can grow the basket. HONEST: there is no trustworthy public 'lift %' for this — the widely-quoted figures don't trace to a credible primary source — so treat it as a mechanism to TEST on your own store, not a guaranteed number.",
    why: "The cheapest extra revenue comes from a customer who's already buying. But irrelevant or pushy cross-sells add friction and can hurt conversion — Baymard's checkout research warns against cluttering the checkout path — so the win is RELEVANT suggestions placed where they don't get in the way of paying.",
    how: [
      "Cross-sell AFTER add-to-cart, or on the cart/PDP — keep the checkout path itself clean (Baymard).",
      "Recommend genuinely related items ('frequently bought together', accessories, consumables), not random products.",
      "Offer a 'bundle and save' only where the discount is real and the items make sense together.",
      "Make recommendations threshold-aware — nudge items that also help clear the free-shipping bar.",
      "Measure AOV AND conversion together on your own store, and keep only what lifts AOV without denting conversion — there's no reliable public number to copy."
    ],
    confidence: "emerging",
    status: "active",
    supersedes: [],
    related: ["card-cro-free-shipping-threshold"],
    sources: [
      { label: "Baymard Institute — Checkout Usability (cross-sells & the checkout path)", url: "https://baymard.com/checkout-usability" }
    ],
    tags: ["aov", "cross-sell", "bundles"],
    created: "2026-06-14",
    updated: "2026-06-14"
  },
  {
    id: "card-news-power-is-the-constraint",
    domains: ["news"],
    title: "Plan AI capacity around power and chip packaging — not just GPUs — because that's the real bottleneck now",
    action: "Before you bank on cheap, unlimited AI capacity, treat electricity and advanced chip packaging as the limiting factors — build a fallback plan (a second provider/model) for the periods when supply is tight and prices spike.",
    summary: "As of mid-2026 the thing holding back AI isn't 'are there enough chips designed' — it's the boring physical stuff around them. Gartner expects data-center power demand to jump 27% in 2026, to 132 GW (a gigawatt is a billion watts — roughly a large city's worth of electricity), up from 104 GW in 2025; the IEA projects data centers worldwide going from ~415 TWh of electricity in 2024 to ~945 TWh by 2030 (a terawatt-hour is a billion kilowatt-hours — your home uses maybe 10,000 kWh a year). On the chip side, the squeeze isn't the memory people often blame — analysts at SemiAnalysis point to 'CoWoS' advanced packaging at TSMC (the step that stitches the chip and its memory onto one module) as the real choke point.",
    why: "If your business plan assumes AI compute will keep getting cheaper and more available in a straight line, these two limits — grid power and packaging capacity — are why it won't, smoothly. They cause the supply crunches and price spikes that strand teams who designed for endless cheap capacity. Knowing the bottleneck is physical (power plants and packaging lines take years to build), not a quick software fix, tells you to design for scarcity, not abundance.",
    how: [
      "Don't architect around 'compute will be cheap and infinite' — assume capacity tightens in waves. Keep your AI features able to fall back to a smaller/cheaper model when your main one is throttled or pricey.",
      "Sign up with at least two providers (e.g. one frontier lab plus a hosted open-weight option) so a single provider's capacity crunch doesn't take you offline — pair with card-ai-tooling-model-portability.",
      "When you read 'AI shortage' headlines, check which limit it's about: chip design, advanced packaging (CoWoS), or electricity/grid — they ease on very different timelines (packaging in quarters, new power in years).",
      "For your own usage, watch your provider's status and price pages; budget for the spike, not the average (pair with card-webdev-ai-gateway-spend-limits to cap spend automatically).",
      "Date your assumptions: re-check these numbers each year — 'as of mid-2026, power is the binding constraint' is a snapshot, not a permanent law."
    ],
    confidence: "confirmed",
    status: "active",
    corroboration_count: 2,
    supersedes: [],
    related: ["card-ai-tooling-model-portability", "card-webdev-ai-gateway-spend-limits"],
    sources: [
      { label: "Gartner — Data center electricity demand to grow 26% in 2026", url: "https://www.gartner.com/en/newsroom/press-releases/2026-06-10-gartner-says-data-center-electricity-demand-to-grow-26-percent-in-2026" },
      { label: "IEA — Energy and AI: energy demand from AI", url: "https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai" },
      { label: "SemiAnalysis — Nvidia's Blackwell reworked shipment (CoWoS packaging, rack density)", url: "https://newsletter.semianalysis.com/p/nvidias-blackwell-reworked-shipment" }
    ],
    tags: ["compute", "infrastructure", "power", "chips", "landscape"],
    created: "2026-06-14",
    updated: "2026-06-14"
  },
  {
    id: "card-news-inference-cost-curve",
    domains: ["news"],
    title: "Re-price your AI build every few months — running a model keeps getting ~10× cheaper a year",
    action: "Put a recurring reminder (quarterly) to recheck model prices and re-run the 'is this AI feature affordable yet?' math — things you ruled out as too expensive may now be cheap enough to ship.",
    summary: "The cost to run an AI model (called 'inference' — what you pay each time it answers, usually priced per million tokens, where a token is roughly ¾ of a word) keeps falling fast. Venture firm a16z measured it at about 10× cheaper per year for the same quality — one example dropped from $60 per million tokens in late 2021 to about $0.06 for an equal-skill model, ~1,000× in three years. Research group Epoch found the same trend but bumpier: across models, prices fell anywhere from 9× to 900× per year, median ~50×, with the fastest drops kicking in after early 2024. HONEST: both groups warn this pace may slow, so treat it as a strong recent trend, not a guarantee.",
    why: "Because of this drop, the 'we can't afford to run that on every request' verdict you reached last year is often wrong this year. Teams that re-check pricing on a schedule ship AI features their competitors still think are too expensive. The catch: the savings are uneven across tasks, so you have to check YOUR actual workload, not a headline average.",
    how: [
      "List the AI features you shelved as 'too expensive' — those are your re-pricing candidates.",
      "Every quarter, pull current per-million-token prices for the models you'd use (input and output are priced separately; output usually costs more) and redo the cost-per-request math for your real traffic.",
      "Check whether a cheaper, newer model now matches the quality you needed — the 10×/yr figure is for EQUAL quality, so the same job often moves to a much cheaper tier.",
      "Don't assume the trend holds forever — both a16z and Epoch flag it may slow; keep a cost ceiling so a pricing surprise can't blow your budget (card-webdev-ai-gateway-spend-limits).",
      "Date it: 'as of mid-2026, ~10×/yr and recently accelerating' — re-verify the rate, don't extrapolate it blindly."
    ],
    confidence: "confirmed",
    status: "active",
    corroboration_count: 2,
    supersedes: [],
    related: ["card-webdev-ai-gateway-spend-limits", "card-news-power-is-the-constraint"],
    sources: [
      { label: "a16z — LLMflation: LLM inference cost is dropping ~10× per year", url: "https://a16z.com/llmflation-llm-inference-cost/" },
      { label: "Epoch AI — LLM inference price trends", url: "https://epoch.ai/data-insights/llm-inference-price-trends" }
    ],
    tags: ["cost", "inference", "pricing", "landscape"],
    created: "2026-06-14",
    updated: "2026-06-14"
  },
  {
    id: "card-news-smb-adoption-shallow",
    domains: ["news"],
    title: "Most companies barely use AI yet — go deep in one workflow to lap competitors who only dabble",
    action: "Pick ONE business function (e.g. sales-and-marketing) and wire AI deeply into its daily workflow, instead of sprinkling a chatbot across everything — that's where the early lead is.",
    summary: "Despite the hype, US government data shows adoption is real but shallow. The Federal Reserve found about 18% of firms had adopted AI as of end-2025 (though 78% of the workforce is at firms that have, so big companies dominate). The Census Bureau's survey (collected Nov 2025–Jan 2026) found the same ~18% of firms using AI, and that 57% of users apply it in three or fewer business functions — most common in sales-and-marketing (52%) and strategy (45%). Reassuringly, only ~2% of firms reported AI reducing employment, and 66% use it purely to help staff do tasks, not replace them.",
    why: "This is the opportunity: the field is wide open and most who've started are only dabbling. A small operator who picks one workflow and goes genuinely deep — not a token chatbot, but AI woven into how the work actually gets done — can out-execute bigger rivals who've spread themselves thin. 'Everyone's using AI' is, for now, not true.",
    how: [
      "Choose ONE high-volume function where AI already shows traction — sales-and-marketing (52% of adopters) or strategy/planning (45%) are the proven entry points.",
      "Map that function's real daily steps, then insert AI at the specific points that eat the most time — not a generic 'we have a chatbot now'.",
      "Aim for depth: the data shows most users touch ≤3 functions shallowly; your edge is doing one of them properly end-to-end.",
      "Frame it as augmentation (66% of firms do) — it lands better with your team and matches what's actually working, since job-cutting from AI is still rare (~2% of firms).",
      "Re-check yearly: this is 'US, as of early 2026' — adoption will deepen, so bank the head start while the field is still shallow."
    ],
    confidence: "confirmed",
    status: "active",
    corroboration_count: 2,
    supersedes: [],
    related: [],
    sources: [
      { label: "Federal Reserve (FEDS Notes, Apr 2026) — Monitoring AI adoption in the U.S. economy", url: "https://www.federalreserve.gov/econres/notes/feds-notes/monitoring-ai-adoption-in-the-u-s-economy-20260403.html" },
      { label: "U.S. Census Bureau (CES-WP-26-25) — AI use and integration across firms", url: "https://www.census.gov/library/working-papers/2026/adrm/CES-WP-26-25.html" }
    ],
    tags: ["adoption", "smb", "strategy", "landscape"],
    created: "2026-06-14",
    updated: "2026-06-14"
  },
  {
    id: "card-news-open-vs-closed-gap",
    domains: ["news"],
    title: "Default to open-weight models for most work — they trail the closed frontier by only ~3 months",
    action: "For routine tasks, try a top open-weight model (one you can download and run/host yourself) first; reserve the priciest closed model for the genuinely hardest jobs where the small quality gap actually matters.",
    summary: "'Open-weight' means the model's trained parameters are published, so you can download, self-host, or use cheap hosting instead of one company's API. Research group Epoch finds frontier open-weight models lag the very best closed models by about 3 months on average (a measured range of roughly 1–5 months) — close enough that for most work the open option is plenty. The nuance: at the absolute top, the gap recently widened — Stanford's AI Index reports the best closed model led the best open one by 3.3% as of March 2026, up from 0.5% in August 2024. So open is great for the bulk of tasks, while the closed frontier keeps a thin lead on the hardest.",
    why: "Treating 'closed and expensive' as the only serious option overpays for most tasks and locks you to one vendor. Open-weight models you can host give you cost control, privacy (data needn't leave your environment), and a fallback if a provider raises prices or cuts access — at a quality cost that, for everyday work, is small. But don't claim open has 'caught up' at the very top; the data says it hasn't, quite.",
    how: [
      "For routine jobs (drafting, summarizing, classifying, most coding help), test a leading open-weight model first — the ~3-month lag rarely changes the outcome.",
      "Run open-weight either via cheap hosted endpoints or self-hosted for sensitive data (pair with card-ai-tooling-local-coding-agent for a fully offline setup).",
      "Keep one top closed model on hand for the hardest reasoning/quality-critical tasks where that thin top-end lead (a few %) actually pays off.",
      "Route by difficulty, not habit: tag tasks 'routine' vs 'hard' and send each to the cheapest model that clears the bar.",
      "Re-check each release — Epoch notes the gap 'sometimes closes completely' and may even be overstated; this is a moving snapshot ('as of mid-2026'), not a fixed rank."
    ],
    confidence: "emerging",
    status: "active",
    corroboration_count: 2,
    supersedes: [],
    related: ["card-ai-tooling-local-coding-agent", "card-ai-tooling-model-portability"],
    sources: [
      { label: "Epoch AI — Open-weight vs closed-weight models (~3-month lag)", url: "https://epoch.ai/data-insights/open-weights-vs-closed-weights-models" },
      { label: "Stanford HAI — 2026 AI Index, Technical Performance (top closed vs open gap)", url: "https://hai.stanford.edu/ai-index/2026-ai-index-report/technical-performance" }
    ],
    tags: ["open-weights", "models", "strategy", "landscape"],
    created: "2026-06-14",
    updated: "2026-06-14"
  },
  {
    id: "card-news-capability-acceleration",
    domains: ["news"],
    title: "Re-test your hardest AI workflows every release — reasoning is improving faster than it used to",
    action: "Keep a small file of your 5–10 toughest real tasks and re-run them on each new model release; the jobs an AI failed six months ago may now pass.",
    summary: "AI capability isn't just rising — it sped up. Research group Epoch found the best score on its Capabilities Index grew almost twice as fast over the last two years as the two before, an ~90% acceleration around April 2024, which it credits to 'reasoning models' (models trained to think step by step before answering) and reinforcement learning. You can see it on a hard science-question test called GPQA Diamond: GPT-4 scored 39% in late 2023; by mid-2026 top models hit ~92%. HONEST limit: the hardest math is NOT solved — on the toughest benchmark (FrontierMath) frontier models sit near ~40%, so real headroom remains on genuinely hard reasoning.",
    why: "Because the curve bent upward, a 'we tried AI for that and it couldn't' verdict goes stale fast — faster than most teams re-check. The ones who re-test on every release catch the moment a previously-impossible workflow becomes reliable, and ship it first. Equally, the FrontierMath gap is the honest counterweight: don't assume it can now do EVERYTHING hard — the toughest reasoning still trips it up.",
    how: [
      "Write down 5–10 of YOUR genuinely hard tasks (the ones models have failed or done shakily) with a clear pass/fail you can judge.",
      "On each major model release, re-run that exact set — same prompts — and note which flipped from fail to pass.",
      "Watch the reasoning models specifically (the step-by-step 'thinking' variants) — that's where the recent jump concentrated.",
      "Stay skeptical on the hardest stuff: top models are still ~40% on FrontierMath-level problems, so verify hard-reasoning output, don't trust it blind.",
      "Date your test results ('as of mid-2026, model X passed 7/10') so you can see the trajectory on YOUR work, not just headline benchmarks."
    ],
    confidence: "emerging",
    status: "active",
    corroboration_count: 2,
    supersedes: [],
    related: [],
    sources: [
      { label: "Epoch AI — AI capabilities progress has sped up", url: "https://epoch.ai/data-insights/ai-capabilities-progress-has-sped-up" },
      { label: "GPQA paper (OpenReview) — GPT-4 baseline 39% on GPQA Diamond", url: "https://openreview.net/pdf?id=Ti67584b98" },
      { label: "Epoch AI — FrontierMath Tier 4 (the hardest math, far from solved)", url: "https://epoch.ai/benchmarks/frontiermath-tier-4" }
    ],
    tags: ["capability", "reasoning", "benchmarks", "landscape"],
    created: "2026-06-14",
    updated: "2026-06-14"
  },
  {
    id: "card-news-agent-reliability-map",
    domains: ["news"],
    title: "Treat 'AI can do hours-long tasks' as a 50/50 claim — add a human check before it ships",
    action: "When you hand an AI agent a long, multi-step job, build in a human review gate before anything goes live — the impressive 'works for hours' numbers are measured at only 50% success, not production-grade.",
    summary: "An 'agent' is an AI that takes many steps on its own — using tools, browsing, writing and running code — instead of giving one answer. Research lab METR measures how long a task an agent can finish, and how often. As of early 2026 a top model could handle tasks taking a skilled human around 5 hours — but that's at 50% reliability, i.e. it succeeds about half the time. METR also found this 'time horizon' is doubling roughly every ~3 months (88.6 days for recent models) — fast — while stressing its own confidence ranges are 'still very wide'. Push for 80% reliability and the doable task length drops sharply.",
    why: "The headline 'AI now does hours-long work' is true and misleading at once: a coin-flip success rate is fine for a draft you'll review, and dangerous for anything that ships unchecked. Knowing the number is a 50%-reliability figure tells you exactly where the human belongs — at the end, as a gate — and stops you from trusting a long autonomous run you didn't verify.",
    how: [
      "For any multi-step agent task, decide up front: is a ~50% first-try success acceptable? If not, you need a checkpoint.",
      "Put a human (or a separate checking step) between the agent's output and anything irreversible — money moving, code deploying, emails sending.",
      "Keep agent runs short and reviewable rather than one giant unattended job — shorter tasks succeed more often.",
      "When a vendor cites 'completes N-hour tasks', ask the reliability number: 50% and 80% can mean very different task lengths.",
      "Re-check each release — the doubling is fast (~3 months), so where the human gate sits will move; treat this as 'as of early-to-mid 2026'."
    ],
    confidence: "emerging",
    status: "active",
    corroboration_count: 1,
    supersedes: [],
    related: ["card-ai-tooling-codex-goal", "card-ai-tooling-browser-use"],
    sources: [
      { label: "METR — Time Horizon 1.1 (2026): ~5h tasks at 50% reliability, ~3-month doubling", url: "https://metr.org/blog/2026-1-29-time-horizon-1-1/" },
      { label: "METR — Measuring AI ability to complete long tasks (methodology, 50%/80%)", url: "https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/" }
    ],
    tags: ["agents", "reliability", "automation", "landscape"],
    created: "2026-06-14",
    updated: "2026-06-14"
  },
  {
    id: "card-news-eu-ai-act-2026",
    domains: ["news"],
    title: "If you touch the EU market, check the AI Act's high-risk rules now — they apply Aug 2, 2026",
    action: "Before Aug 2, 2026, list any AI you build or use that could be 'high-risk' under the EU AI Act (hiring, credit, education, etc.) and confirm who's responsible for compliance — you or your vendor.",
    summary: "The EU AI Act is Europe's law governing AI, phasing in by date. Rules for 'general-purpose AI' models took effect 2 Aug 2025. The big next step: most of the high-risk obligations start applying 2 Aug 2026 — 'high-risk' meaning AI used in sensitive areas like hiring, credit scoring, education, or essential services, which then carries duties around data quality, transparency, human oversight and record-keeping. Models already on the market before Aug 2025 get until 2 Aug 2027 to comply. A final voluntary Code of Practice for general-purpose AI was published 10 Jul 2025.",
    why: "This is a hard legal deadline, not a trend — if your product or workflow uses AI in a high-risk area and touches EU users, the obligations land on a fixed date with real penalties behind them. The operator move is to find out NOW whether you're in scope and who carries the duty (you as the deployer, or the model provider), rather than discovering it after Aug 2026.",
    how: [
      "Inventory every AI feature you build or rely on; flag any used in EU-sensitive areas (hiring, credit, education, healthcare, essential services) as possibly high-risk.",
      "For each flagged use, check the official implementation timeline and confirm whether the 2 Aug 2026 obligations apply to you.",
      "Pin down responsibility in writing: ask vendors which AI Act duties THEY cover vs what falls on you as the deployer.",
      "If you only use general-purpose models, note those rules are already in force (since Aug 2025) and the 10 Jul 2025 Code of Practice is the practical guide.",
      "Scope it honestly: this is EU-specific — if you have no EU users it may not bind you, but verify rather than assume, and re-check as guidance updates."
    ],
    confidence: "confirmed",
    status: "active",
    corroboration_count: 2,
    supersedes: [],
    related: ["card-ai-tooling-fable5-retention"],
    sources: [
      { label: "EU AI Act — Official implementation timeline", url: "https://artificialintelligenceact.eu/implementation-timeline/" },
      { label: "Latham & Watkins — EU AI Act GPAI obligations in force; final Code of Practice", url: "https://www.lw.com/en/insights/eu-ai-act-gpai-model-obligations-in-force-and-final-gpai-code-of-practice-in-place" }
    ],
    tags: ["regulation", "eu-ai-act", "compliance", "landscape"],
    created: "2026-06-14",
    updated: "2026-06-14"
  },
  {
    id: "card-news-frontier-cluster",
    domains: ["news"],
    title: "Don't chase 'the best AI model' — the top few are a tight cluster, so pick on price and fit",
    action: "Stop re-tooling around whichever model tops the leaderboard this week; pick the top-tier model that best fits your price, latency and platform, since the leaders are within a few points of each other.",
    summary: "There's no single runaway 'best' AI right now. On the Artificial Analysis Intelligence Index (a composite score across many tests), the top three as of mid-2026 sat within about 5 points of each other and spanned two different labs — a tight cluster, not one king. The exact numbers reshuffle with each release, but the durable shape is what matters: several models are close enough that, for almost any real task, the difference between #1 and #3 is smaller than the difference your prompt, data, and workflow make.",
    why: "Teams burn real time and money re-building around each new 'we're #1' announcement. When the leaders are this close, that chasing buys almost nothing — the better return is choosing on the things that actually differ: price, speed, context limits, privacy terms, and how well it plugs into your stack. The leaderboard crown moves monthly; those practical factors are where your edge is.",
    how: [
      "Shortlist 2–3 top-cluster models rather than fixating on the single current #1 — they're within a few points.",
      "Decide on what differs: per-token price, response speed, context window, data-retention terms (see card-ai-tooling-fable5-retention), and ecosystem fit.",
      "Run YOUR real tasks through the shortlist — your workflow usually separates them more than the benchmark does.",
      "Keep switching cheap: route through a gateway with a backup model list so you can move when the cluster reshuffles (card-ai-tooling-model-portability).",
      "Treat any ranking as a dated snapshot ('as of mid-2026') — re-check the cluster occasionally, but don't re-architect for every reshuffle."
    ],
    confidence: "emerging",
    status: "active",
    corroboration_count: 1,
    supersedes: [],
    related: ["card-ai-tooling-model-portability", "card-ai-tooling-fable5-retention"],
    sources: [
      { label: "Artificial Analysis — Intelligence Index (frontier model leaderboard)", url: "https://artificialanalysis.ai/evaluations/artificial-analysis-intelligence-index" }
    ],
    tags: ["models", "frontier", "strategy", "landscape"],
    created: "2026-06-14",
    updated: "2026-06-14"
  }
];
