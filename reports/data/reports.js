/* ============================================================
   The AI Edge — report data
   Each report is one object in this array. The site renders
   everything from here and groups entries by `week` in the
   sidebar. Add a new report = prepend one object (newest first).

   Fields:
     id        unique string
     type      "daily" | "weekly"
     week      grouping label, e.g. "Week of May 24 – 30, 2026"
     title     heading shown on the report
     dateLabel human date / range under the title
     sortDate  "YYYY-MM-DD" (drives ordering; newest first)
     pdf       optional path to a downloadable PDF
     tldr      array of HTML strings (the 60-second version)
     sections  array of { h, intro?, blocks?[], checklist?[] }
                 block = { sub?, tags?[], p?, list?[], table?, why?, doIt?, note? }
     sources   HTML string of REAL <a> links (attributes use single quotes
                 so they sit safely inside double-quoted JS strings)

   NOTE (history rework): every dated entry carries >=1 practical,
   AI-powered, RUN-IT-TODAY play — operator voice, non-technical, with
   exact steps/tools/prompts, a clear payoff, and at least one REAL,
   web-verified link. Plays are framed as durable techniques relevant to
   the period, not as "news that day." News, specs, funding, and
   "X happened" with no takeaway are cut. No fabricated links.
   ============================================================ */
window.AI_EDGE_REPORTS = [

  /* ============== DAILY — Mon Jun 15 ============== */
  {
    id: "2026-06-15-daily",
    type: "daily",
    week: "Week of Jun 15 – 21, 2026",
    title: "Daily Briefing — Monday, June 15",
    dateLabel: "Monday, June 15, 2026",
    sortDate: "2026-06-15",
    domains: ["web-design", "cro", "ai-tooling"],
    tldr: [
      "<b>Web design play of the day: delete your tooltip/dropdown/menu JavaScript — the trio that replaces it is now Baseline in every browser.</b> Three native features finally line up across Chrome, Safari AND Firefox: the <b>Popover API</b> (show/hide an overlay with one HTML attribute), <b>invoker commands</b> (<code>command</code>/<code>commandfor</code> on a button — open/close with zero JS), and <b>CSS anchor positioning</b> (tether the overlay to its trigger and flip it when it would overflow, in pure CSS). That's the whole job a library like Floating UI/Popper used to do — now with no dependency, and it works for all users, not just Chrome. (Honest: the last piece reached Baseline early 2026, so this is a cross-browser status upgrade, not a 24-hour scoop.)",
      "<b>CRO &amp; AOV — the team asked 'what's the ONE thing to focus on?' Here it is, grounded.</b> For <b>conversions</b>: kill the surprise. Unexpected extra costs at checkout are the #1 reason ready buyers walk — ~<b>48%</b> of those who abandon say so (Baymard) — so show shipping/tax in the cart, not the final screen. For <b>order value</b>: one free-shipping threshold set <b>~15–25% above your current AOV</b>, with a live 'you're $12 away' bar — shoppers add items to qualify, and orders with free delivery run ~30% larger. Do those two before anything fancier.",
      "<b>CRO timing twist (2026): re-peg that threshold THIS year — it's a reset year.</b> Deloitte's 2026 retail survey found <b>67% of retail execs plan to raise their free-shipping threshold</b> to defend margins against carrier and tariff cost shocks. If yours is still last year's number, it's probably too low (giving away margin) or stale vs your real AOV. Pull your AOV, re-peg, and re-check the shipping-cost margin.",
      "<b>AI tooling — claim your Agent SDK credit TODAY (Jun 15) or your automations can stop.</b> As of today, Claude <b>Agent SDK</b>, <code>claude -p</code>, and <b>Claude Code GitHub Actions</b> no longer draw on your normal Claude plan — they move to a separate monthly credit ($20 Pro / $100 Max 5x / $200 Max 20x), metered at full API rates, and it's a <b>one-time opt-in you must claim</b>. Past the credit, jobs only continue if you've enabled usage credits — otherwise they halt until the credit refreshes. Claim it, then put a hard dollar cap in front of it.",
      "<b>Also today (Monday): Weekly Issue #4 is live</b> — the week of Jun 8–14 in one idea (<i>subtract the middle layer</i>), the keepers worth adopting, and an assignable action list per discipline.",
      "<b>Sharpen your edge:</b> today's throughline is <i>own less, but keep one guard</i> — let the browser run the menu instead of a JS library, let a threshold do your upselling instead of a popup, let the platform default run your agents — but keep the guardrail that stops a silent failure: a graceful fallback, a margin check, a spend cap. The subtraction is the win; the guard is what makes it safe to ship."
    ],
    sections: [
      { h: "Web design — run it today: build tooltips, dropdowns & menus with zero JS (Popover API + invoker commands + anchor positioning — now Baseline)",
        blocks: [
          { sub: "The native trio that replaces Floating UI/Popper is finally Baseline across Chrome, Safari AND Firefox — so you can ship it to every user, not just Chromium", tags:["technique"],
            p: "What's the play: the overlay UI every site needs — a tooltip, a dropdown, a context menu, a popover card — is normally shipped with a positioning library (Floating UI / Popper) plus a chunk of toggle JavaScript, and it's a recurring source of bugs (it opens off-screen, traps focus, ignores the keyboard). Three native web-platform pieces now do the whole job, and — unlike the Chromium-only CSS primitives we covered last week (the carousel, sibling-index) — all three are <b>Baseline</b>, meaning Chrome, Edge, Safari and Firefox all support them. (1) The <b>Popover API</b>: add the <code>popover</code> attribute to any element and the browser gives you a top-layer overlay with light-dismiss (click outside / Esc), correct stacking, and the accessibility wiring for free (Baseline since 2025). (2) <b>Invoker commands</b>: put <code>commandfor=\"menu\" command=\"toggle-popover\"</code> on a plain <code>&lt;button&gt;</code> and it opens/closes the popover with <b>no JavaScript at all</b> (Baseline once Safari 26.2 shipped, early 2026). (3) <b>CSS anchor positioning</b>: name the trigger as an anchor and pin the overlay to it in pure CSS — and have it automatically flip to the other side when it would overflow the screen (Baseline once Firefox 147 shipped, Jan 2026). Why it matters for our builds: this deletes a JS dependency, its hydration cost, and a whole class of a11y/positioning bugs — and because it's Baseline, you're not gambling on browser support or writing a fallback. It's the cross-browser counterpoint to last week's Chromium-only primitives: this one you can put on a client's production site today, for everyone.",
            doIt: "(1) Markup, no JS: <code>&lt;button commandfor='menu' command='toggle-popover'&gt;Menu&lt;/button&gt;</code> then <code>&lt;div id='menu' popover&gt;…&lt;/div&gt;</code> — that alone gives you a working, dismissible menu. (2) Tether it in CSS: on the button set <code>anchor-name: --menu-btn;</code> and on the popover set <code>position-anchor: --menu-btn; position-area: bottom span-right;</code> (drop it below, aligned to the trigger). (3) Stop it going off-screen: add <code>position-try-fallbacks: flip-block, flip-inline;</code> so the browser flips it above/left when there's no room — the thing Floating UI existed to do. (4) For a tooltip, swap the button command for the new <code>interesttarget</code>/hover-and-focus pattern, or keep <code>command</code> for click-to-open. (5) Delete the old Floating-UI/Popper init and the toggle handler. (6) Sanity-check keyboard + screen-reader behaviour — the browser supplies the basics, but still tab through it.",
            note: "Honest caveats: this is a Baseline <i>status</i> upgrade (the pieces landed across 2025–early 2026), surfaced today because it's the highest-value web-design play that's now safe cross-browser — not a 24-hour scoop. Anchor positioning's overflow-fallback property is still settling in syntax across engines, so test the flip behaviour. Very old browsers (pre-2025) won't support it — if you must serve those, keep a minimal fallback, but for an evergreen modern audience you can drop the library outright. Card: card-webdesign-anchor-positioning-menus (joins thread-modern-css-primitives). Logged a prediction (a major UI library documents/ships a pure-CSS anchor mode). Sources: MDN, web.dev, InfoQ." }
        ]
      },
      { h: "CRO &amp; AOV — run it today: the one highest-leverage fix for each (answering the team's question)",
        intro: "Closing an open team gap (Ask-anything: 'the best one thing to focus on for CRO and AOV'). The honest answer: find YOUR biggest leak first — but across thousands of stores the data points to the same two levers, so start here while you measure.",
        blocks: [
          { sub: "CRO — the #1 lever: kill the surprise cost. Unexpected extra fees at checkout are the single biggest reason ready buyers abandon (~48%, Baymard)", tags:["technique"],
            p: "What the data says: cart abandonment averages ~<b>70%</b> across 50 studies (Baymard), and among shoppers who abandon for a stated reason, the <b>#1 reason — at ~48% — is 'extra costs too high' (shipping, tax, fees) revealed too late</b>. That makes it the highest-leverage conversion fix there is: if the first time someone sees the real total is the final screen, a big chunk of people who meant to buy bail. Showing the true cost early loses only the few who'd never have paid it — and keeps everyone else. Why it matters for our work: teams burn weeks A/B-testing button colours (no universal winner) while leaving the biggest, best-documented leak wide open. Fix the surprise first; it's the cheapest large win in the funnel.",
            doIt: "(1) Add a <b>shipping + tax estimate to the cart</b> (a postcode field, or a clear 'from' price) — never a blank 'calculated at checkout'. (2) Surface any handling/surcharge the moment it applies, not at the payment step. (3) If you have a free-shipping threshold, show it in the cart with the gap ('add $12 for free shipping'). (4) <b>Use AI to find your own leak fast:</b> paste your checkout's field list / a screen recording into ChatGPT or Claude and ask it to audit against Baymard's checkout principles and rank the friction; then watch your analytics for the step with the biggest drop — it's usually right after a surprise cost appears. Card: card-cro-show-total-cost-early.",
            note: "Grounded in Baymard's cart-abandonment dataset (the ~48% / ~70% figures are theirs). The 'best one thing' is genuinely store-specific — these are the odds-on favourites, not a substitute for looking at your own funnel." },
          { sub: "AOV — the #1 lever: one free-shipping threshold pegged ~15–25% above your current AOV, with a live progress bar", tags:["technique"],
            p: "What the data says: free shipping is the incentive shoppers want most — ~<b>81%</b> say it makes them more likely to buy, ~<b>51%</b> say they add items specifically to qualify, and orders that include free delivery run roughly <b>30% larger</b> (Capital One Shopping). A threshold turns that into an AOV lever via the 'goal-gradient' effect (people push harder as a reward gets closer) — but only if the bar is <b>reachable</b>: set it <b>~15–25% above your current AOV</b> (e.g. AOV $65 → threshold ~$75–$85). Too high and it deflates; too low and you give away margin. The mechanism is well-supported; the exact number is yours to test. Why it matters: it's the cheapest extra revenue there is — from customers already buying — and it pairs directly with the CRO fix above (the same progress bar that nudges basket size also removes the shipping objection).",
            doIt: "(1) Pull your real <b>AOV</b> (last 90 days). (2) Set the threshold <b>~15–25% above</b> it. (3) Show a <b>live progress bar</b> in the cart/mini-cart: 'You're $12 away from free shipping', with one relevant low-cost add-on suggested right beside it. (4) <b>AI step:</b> export your order-value distribution and ask Claude/ChatGPT to find the threshold that captures the largest cluster of orders 'one nudge' away, and to draft the progress-bar + cart copy. (5) Watch <b>AOV, conversion AND shipping-cost margin</b> together for 3–4 weeks before locking it. Card: card-cro-free-shipping-threshold.",
            note: "2026 timing twist — re-peg this NOW. Deloitte's 2026 Retail Outlook (survey of 330 execs) found <b>67% plan to raise their free-shipping threshold this year</b> to defend margins against carrier-cost and trade-policy shocks; the average threshold sits ~$64 and many are quietly pushing it 10–20% higher. So if your number is a year old, re-peg it to current AOV and re-run the margin math — don't leave it where it was. Treat the 15–25% / ~30% figures as well-supported starting points to validate on your store, not guarantees." }
        ]
      },
      { h: "AI tooling — run it today: claim your Agent SDK credit before today's billing split, then cap it",
        blocks: [
          { sub: "As of Jun 15, Agent SDK / claude -p / Claude Code GitHub Actions stop drawing on your Claude plan and move to a separate, opt-in monthly credit metered at full API rates — claim it or programmatic runs can halt", tags:["anthropic","claude-code"],
            p: "What changed (today, Jun 15, 2026): Anthropic split Claude billing into two pools. <b>Interactive use</b> — the Claude Code terminal/IDE, Coworking, and chat on web/desktop/mobile — keeps drawing on your normal plan as before. But <b>programmatic use</b> — the <b>Agent SDK</b>, the <code>claude -p</code> headless command, third-party apps built on the Agent SDK, and the <b>Claude Code GitHub Actions integration</b> — no longer counts toward your plan limits. It now draws on a <b>separate monthly Agent SDK credit</b> ($20 on Pro, $100 on Max 5x, $200 on Max 20x), metered at <b>standard API rates</b>. Two gotchas: (1) it's a <b>one-time opt-in you have to claim</b> in your Claude account — it isn't switched on automatically; (2) once the monthly credit runs out, extra usage only continues if you've <b>enabled usage credits</b> (pay-as-you-go at API rates) — otherwise the requests <b>stop</b> until the credit refreshes. Why it matters for us: anything we run on automation — a scheduled agent, a CI job, a GitHub Action that calls Claude (this very briefing pipeline is the shape) — could silently stop on a teammate's account today if the credit isn't claimed or the budget isn't set. It's the same 'govern the AI default' discipline we keep teaching, now with a real deadline.",
            doIt: "(1) <b>Today:</b> open your Claude account billing and <b>claim the Agent SDK credit</b> (one-time; then it refreshes each cycle). (2) Decide whether to <b>enable usage credits</b> so jobs don't hard-stop when the monthly credit is gone — and if you do, treat it as real API spend. (3) Put a <b>hard dollar cap</b> in front of any agent/CI workload so a runaway loop can't quietly bill at full API rates — route through a gateway with a spend limit (card-webdev-ai-gateway-spend-limits) and set per-model/per-day budgets. (4) Audit which of your automations call the Agent SDK / <code>claude -p</code> / Claude Code Actions and confirm each runs on an account that's claimed the credit. (5) Keep your toolchain swap-ready (card-ai-tooling-model-portability) so a billing change never single-points your pipeline.",
            note: "Grounded in Anthropic's official Help Center article ('Use the Claude Agent SDK with your Claude plan'), corroborated across The New Stack and XDA. The interactive TUI and claude.ai are explicitly unaffected — this is about programmatic/headless usage only. Card: card-ai-tooling-agent-sdk-credit. Logged a prediction (an in-product Agent SDK spend dashboard/cap follows). Sources: Claude Help Center, The New Stack, XDA." }
        ]
      }
    ],
    sources: "<a href='https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning/Using' target='_blank' rel='noopener'>MDN — Using CSS anchor positioning</a> · <a href='https://web.dev/blog/popover-baseline' target='_blank' rel='noopener'>web.dev — The Popover API is Baseline Newly available</a> · <a href='https://web.dev/blog/web-platform-01-2026' target='_blank' rel='noopener'>web.dev — New to the web platform in January 2026 (anchor positioning Baseline)</a> · <a href='https://www.infoq.com/news/2026/01/html-invoker-commands/' target='_blank' rel='noopener'>InfoQ — HTML Invoker Commands achieve Baseline support</a> · <a href='https://baymard.com/lists/cart-abandonment-rate' target='_blank' rel='noopener'>Baymard Institute — Cart Abandonment Rate (top reasons)</a> · <a href='https://baymard.com/checkout-usability' target='_blank' rel='noopener'>Baymard Institute — Checkout Usability research</a> · <a href='https://www.deloitte.com/us/en/insights/industry/retail-distribution/retail-distribution-industry-outlook.html' target='_blank' rel='noopener'>Deloitte — 2026 Retail Industry Outlook (free-shipping threshold reset)</a> · <a href='https://capitaloneshopping.com/research/free-shipping-statistics/' target='_blank' rel='noopener'>Capital One Shopping — Free Shipping Statistics 2026</a> · <a href='https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan' target='_blank' rel='noopener'>Anthropic Help Center — Use the Claude Agent SDK with your Claude plan</a> · <a href='https://thenewstack.io/anthropic-agent-sdk-credits/' target='_blank' rel='noopener'>The New Stack — Anthropic Agent SDK credits</a> · <a href='https://www.xda-developers.com/anthropics-claude-subscriptions-no-longer-include-agent-sdk-and-claude-p-usage/' target='_blank' rel='noopener'>XDA — Claude subscriptions no longer include Agent SDK / claude -p usage</a>"
  },

  /* ===================== WEEKLY SUMMARY — Issue #4 ===================== */
  {
    id: "2026-06-14-weekly",
    type: "weekly",
    week: "Week of Jun 8 – 14, 2026",
    title: "Weekly Briefing — Issue #4",
    dateLabel: "Week of Jun 8 – Jun 14, 2026",
    sortDate: "2026-06-14",
    domains: ["web-design", "web-dev", "graphic", "email", "social", "paid", "growth", "ai-tooling", "news"],
    pdf: "reports/pdf/weekly-ai-report-2026-06-14.pdf",
    tldr: [
      "<b>The week in one idea: subtract the middle layer.</b> Almost every play this week <i>removed</i> something you used to need — a JS library, a backend server, a desktop tool, an export-to-spreadsheet loop, a runaway AI bill. The browser, the platform default, and the user's own machine quietly absorbed the work. The operator move: take the subtraction, but keep one guard.",
      "<b>Design + Dev — the browser ate the JavaScript (and the backend).</b> In one week: dividers in grid/flex (<code>row-rule</code>), staggered motion (<code>sibling-index()</code>), page transitions (View Transitions), an accessible carousel (CSS Overflow 5), and <b>real Python in the browser with no server</b> (Pyodide + WASM wheels on PyPI). Most are Chromium-only and degrade cleanly — ship as progressive enhancement.",
      "<b>AI tooling — the bill came under the microscope.</b> Cloudflare shipped dollar <b>spend caps</b> for AI calls; Claude <b>Fable 5</b> went GA but with a 30-day retention catch (ZDR doesn't apply); Claude Code <b>/workflows</b> made multi-agent orchestration a built-in; and the <b>Agent SDK billing split</b> lands Jun 15. Theme: govern AI spend and provenance, don't just consume it.",
      "<b>Marketing — answer engines are now a measurable channel.</b> AEO got its missing half: Semrush's <b>free AI Search Visibility Checker</b> scores whether ChatGPT/Gemini cite you; new research pinned the formats that win citations (and FAQ schema as an under-used edge); LinkedIn is the <b>#2 most-cited domain</b> in AI answers (original 500–2,000-word articles win). Paid: Google's DSA→AI Max migration slipped to Feb 2027 (a window to test), Meta's Opportunity Score went universal.",
      "<b>News — the AI trade got graded, then bounced.</b> A Broadcom guidance miss rotated money out of AI chips (Jun 3–8), then names snapped back (Jun 11) on reaffirmed ~$750B hyperscaler capex; <b>SpaceX</b> ran the largest IPO in history (Musk → first trillionaire); and the <b>Fable 5 / Mythos 5</b> government suspension hardened. The durable read: capital is grading AI <i>spend</i>, not AI <i>ambition</i> — and power/compute is still the moat.",
      "<b>Sharpen your edge:</b> the connective thread to last week's 'controls collapse' — this week you also got to <i>remove</i> cost and dependencies, not just hand work to a default. Every subtraction below ships with a guard: a graceful CSS fallback, a spend cap, a data-retention check, a sandbox account. Take the simplification; keep the guardrail."
    ],
    sections: [
      { h: "The week in one idea: subtract the middle layer",
        blocks: [
          { sub: "The wins this week were removals, not additions",
            p: "Line the week's plays up and they rhyme: a CSS rule replaced a JS carousel library and a tooltip library; the browser itself ran Python so there was no backend to host (Pyodide + WASM wheels on PyPI); an MCP connector replaced the export-to-spreadsheet loop in your ESP; a single threshold replaced a manual upsell; a spend cap replaced the fear of a runaway bill. The middle layer — the dependency, the server, the manual workflow, the agency step — kept getting deleted because the browser, the platform default, or the user's own device absorbed it.",
            note: "Synthesis, not recap: five-plus dailies this week told one story from different crafts — the cheapest, most durable win right now is a subtraction." },
          { sub: "But every subtraction shipped with a guard",
            p: "The discipline is the twin of the simplification. Push Python to the browser — but lazy-load it so you don't tax the page. Drop the tooltip library — but only because the native trio is now Baseline (test the keyboard). Let the platform default run your ads/agents — but keep a manual control, a spend cap, and a data-provenance check. The same week the market punished loose AI spend and Anthropic split Agent SDK billing, the move that wins is the one we keep repeating: take the default, keep one guardrail that catches a silent failure.",
            doIt: "This week's homework, one line each: ship one Baseline native overlay and delete its JS (design); lazy-load one in-browser tool instead of a backend (dev); claim + cap your Agent SDK credit before Jun 15 (AI); run the free AI-visibility check and fix the top gap page (growth); re-peg one free-shipping threshold to current AOV (cro/marketing)." }
        ]
      },
      { h: "What changed, and what to do — by domain",
        intro: "One tight synthesis per domain that moved this week. The throughline (subtract + guard) shows up differently in each.",
        blocks: [
          { sub: "Web design — the browser replaced the JS library, five times", tags:["web-design"],
            p: "A remarkable run of native primitives landed or matured: Gap Decorations (<code>column-rule</code>/<code>row-rule</code> in grid &amp; flex, Chrome 149), <code>sibling-index()</code>/<code>sibling-count()</code> for staggered motion and math layouts, the View Transitions API for app-like page changes, and CSS Overflow 5 carousel primitives — plus the Popover + invoker-commands + anchor-positioning trio that is now Baseline cross-browser. Each deletes a library or a hack.",
            doIt: "Adopt the gracefully-degrading ones now as progressive enhancement (most are Chromium-only and fall back cleanly). Lead with the <b>Baseline</b> trio for production overlays (tooltips/menus) since it's safe for all users; keep the Chromium-only ones (carousel, sibling-index) decorative until a 2nd engine ships.",
            note: "Keeper principle reaffirmed: a gracefully-degrading CSS primitive can ship the day it hits one engine; a Baseline one can replace a JS dependency outright." },
          { sub: "Web dev — own less server: push compute to the edge and the browser", tags:["web-dev"],
            p: "The dev plays all moved work off your infrastructure: <b>Pyodide 314</b> + WASM wheels on PyPI run real Python (and its libraries) in a browser tab with no backend and no per-call API bill; <b>Copilot CLI + LSP</b> gave the terminal agent real code intelligence so it stops guessing; Vercel's Workflow SDK runs durably on Nitro v3. The security flip side: 'opening' a poisoned repo inside an AI IDE is now code execution — patch kernels, rotate tokens.",
            doIt: "Reach for an in-browser tool (Pyodide) before standing up a backend for client-side calculators/explorers — lazy-load it on click. Wire LSP into your terminal agent. And treat your AI coding toolchain as attack surface: rotate any tokens exposed to untrusted repos.",
            note: "Two independent dev cards this week (browser-Python, Copilot LSP) share one root: remove the layer that was only there to compensate for a missing capability." },
          { sub: "AI tooling — govern the spend and the provenance", tags:["ai-tooling"],
            p: "The AI plays were about control, not capability: Cloudflare AI Gateway <b>spend limits</b> (a hard dollar cap), Claude Code <b>/workflows</b> (planner→worker→verifier as a built-in primitive), and the <b>Fable 5</b> GA with a 30-day retention catch (existing ZDR agreements don't apply; Microsoft restricted it internally). The <b>Agent SDK billing split</b> (Jun 15) makes cost governance a dated, required action.",
            doIt: "Stand up the two-gate habit: a spend cap in front of every AI feature, and a data-provenance check before routing client-confidential data to any new model/default. Claim + cap the Agent SDK credit today. Keep a model router so a billing or retention change never single-points your pipeline.",
            note: "This is last week's 'controls collapse → govern the system' continuing — but the week's sharpest edge was specifically about <i>money and data terms</i>, the two things that age your stack overnight." },
          { sub: "Growth — answer engines became a measurable channel", tags:["growth"],
            p: "AEO stopped being vibes: Semrush's <b>free AI Search Visibility Checker</b> (no login) scores whether ChatGPT/Gemini/Perplexity cite you and lists the prompts where you're invisible; HubSpot/Wix research pinned which formats win citations; FAQ/structured-data schema emerged as an under-used legibility edge (~2.8× citation rate for well-structured pages). This resolved our open call that AEO would go mainstream-measurable (✅).",
            doIt: "Run the free check on a client domain, take the top 'invisible' prompt, and apply the formatting pass (intent title → one-sentence answer → list/table → original stat → FAQ schema + last-updated). Re-measure in 2–4 weeks.",
            note: "Measure → fix → re-measure is now a real loop, not a leap of faith — the half that was missing in earlier AEO advice." },
          { sub: "Social + Paid — design your inputs for the signal the AI now ranks on", tags:["social","paid","meta-ads","google-ads"],
            p: "Social: <b>LinkedIn</b> is the #2 most-cited domain in AI answers (original 500–2,000-word articles, posted consistently, beat viral feed posts), and Instagram's <b>'Your Algorithm'</b> topic controls reached the main feed — so a clean, consistent topic signal is the new reach lever. Paid: Meta's <b>Opportunity Score</b> went universal (a 0–100 setup-health grade) and the Advantage+ learning bar halved to ~25 conv/week; Google delayed the <b>DSA→AI Max</b> forced migration to Feb 2027 — a window to test AI Max as a guarded experiment, not get auto-migrated blind.",
            doIt: "Social: publish one 500–2,000-word LinkedIn article answering a buyer's AI question; name one clear topic per Instagram post. Paid: triage accounts by Opportunity Score (fix anything under ~60), and run AI Max 50/50 against your live DSA in Experiments with brand exclusions pre-set before Feb 2027.",
            note: "Same move as the AEO story: the platform automates the optimization; your edge is setting the inputs and the guardrails so its automation lands on your terms." },
          { sub: "Graphic — make AI output editable and on-brand by declaring it as data", tags:["graphic"],
            p: "Two plays killed the worst failure modes of AI design assets: <b>Ideogram 4.0</b> takes a structured JSON brief (typed text layers, per-element bounding boxes, hex palette) so in-image text comes out spelled right and laid out where you put it; <b>Recraft V4 Vector</b> outputs true editable SVG (not a flat PNG) you drop into Figma and recolour to brand tokens.",
            doIt: "For any AI logo/icon/layout headed for client work, prompt as a brief (declare copy, position, brand hexes) and demand a vector/editable output — then do a designer's pass for path cleanliness and licensing.",
            note: "The graphic version of the week's theme: stop fighting the tool's defaults — hand it structured intent and get back something you can actually edit." },
          { sub: "Email — query your live program in plain English, and own the inbox", tags:["email"],
            p: "Omnisend shipped a hosted <b>MCP server</b> — connect it to Claude and audit campaigns/deliverability against your real account without exports; and the durable <b>DMARC + BIMI</b> setup (one afternoon of DNS) improves inbox placement and puts your verified logo beside every send.",
            doIt: "Connect the Omnisend MCP and ask for a 30-day revenue + deliverability audit with one fix each; separately, publish DMARC (move toward p=reject) and a BIMI record with a VMC.",
            note: "MCP is the 'subtract the middle layer' move for marketers — the spreadsheet export loop disappears." }
        ]
      },
      { h: "Techniques & tools worth adopting this week — the keepers",
        intro: "The survivors after killing 95%. Each is a run-it-today play with a real link.",
        blocks: [
          { sub: "The shortlist", tags:["technique"],
            table: { head: ["Keeper", "What it buys you", "Start here"],
              rows: [
                ["Native overlay trio (Baseline)", "Tooltips/menus/dropdowns with no JS library, for ALL browsers", "popover + commandfor + anchor-name"],
                ["Pyodide in the browser", "Real Python tools with no backend or API bill; data never leaves the device", "One CDN script + micropip, lazy-loaded"],
                ["Cloudflare AI Gateway spend caps", "A hard dollar ceiling so an AI feature can't run away", "Proxy LLM calls → set spend limit"],
                ["Claude Code /workflows", "Planner→worker→verifier multi-agent runs as a built-in", "Phrase a big job + 'use a workflow'"],
                ["Free AI Search Visibility Checker", "See whether ChatGPT/Gemini cite you + where you're invisible", "Semrush free tool, no login"],
                ["Free-shipping threshold + bar", "Lift AOV by nudging basket size (re-peg for 2026)", "~15–25% above current AOV"]
              ] } }
        ]
      },
      { h: "Predictions ledger — resolved & newly on the board",
        blocks: [
          { sub: "Resolved this week",
            list: [
              "✅ <b>[growth] AEO goes mainstream-measurable</b> (made Jun 8) — Semrush shipped a free AI Search Visibility Checker (0–100 across ChatGPT/Gemini/Perplexity, no login) plus the AI Toolkit; Ahrefs has Brand Radar. (Honest note: some of this tooling predated the call, so it resolved early.)",
              "⚖️ <b>[ai-tooling] MiniMax M3's SWE-Bench Pro 59 claim</b> (made Jun 6) — no independent reproduction surfaced by the due date; the durable lesson held: treat unverified benchmark claims as hypotheses with a verification date."
            ] },
          { sub: "Newly on the board (logged this week, still open)",
            list: [
              "<b>[web-dev]</b> The PyPI WebAssembly-wheel ecosystem passes ~100 packages (from 28 on Jun 13) — due ~end of Q3 2026.",
              "<b>[web-design]</b> The CSS Overflow 5 carousel pseudo-elements ship in a 2nd engine (Firefox/Safari), and <code>sibling-index()</code> likewise — both on the path to Baseline — due ~end of 2026.",
              "<b>[paid]</b> Google's revised DSA→AI Max timeline holds (new-DSA creation ends Jan 2027, auto-migration begins Feb 2027) — due ~Feb 2027.",
              "<b>[social]</b> Plain-language topic controls spread to a 2nd major feed (YouTube/Threads/TikTok) or Instagram exposes inferred topics to creators — due ~end of 2026.",
              "<b>[news]</b> The Fable 5 / Mythos 5 government suspension is resolved — Anthropic restores access to at least one model as the directive lifts/clarifies — due ~Jul 11 2026.",
              "<b>[graphic]</b> A 2nd major image model ships native vector/SVG output (following Recraft V4) — due ~end of 2026.",
              "<b>[growth]</b> Schema/structured-data generation becomes a default feature of a major AEO tool (output, not just measurement) — due ~end of Q3 2026."
            ] }
        ]
      },
      { h: "This week's action list",
        intro: "Concrete and assignable, per discipline.",
        checklist: [
          "Design — Replace one tooltip/menu's JS with the Baseline native trio (popover + commandfor + anchor positioning) and test the keyboard.",
          "Dev — Prototype one client-side tool in the browser with Pyodide instead of a backend; lazy-load it on click.",
          "Dev — Put a Cloudflare AI Gateway spend cap in front of any LLM feature before it ships.",
          "AI/all — Claim your Agent SDK credit today (Jun 15), decide on usage-credit overflow, and cap it.",
          "AI/all — Keep a model router + 5-task frozen eval so a billing/retention change never single-points your pipeline.",
          "Growth — Run the free AI Search Visibility Checker on a client domain; fix the top 'invisible' page with the AEO formatting pass + FAQ schema.",
          "CRO — Show shipping/tax in the cart (kill the surprise) and re-peg the free-shipping threshold to ~15–25% above current AOV.",
          "Social — Publish one 500–2,000-word LinkedIn article answering a buyer's AI question; name one topic per Instagram post.",
          "Paid — Triage accounts by Meta Opportunity Score (fix under ~60); run AI Max 50/50 vs live DSA in Experiments before Feb 2027.",
          "Graphic/Email — Prompt AI design as a JSON/vector brief for editable output; connect the Omnisend MCP and run a 30-day audit."
        ]
      }
    ],
    sources: "<a href='https://web.dev/blog/popover-baseline' target='_blank' rel='noopener'>web.dev — Popover API Baseline</a> · <a href='https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning/Using' target='_blank' rel='noopener'>MDN — CSS anchor positioning</a> · <a href='https://blog.pyodide.org/posts/314-release/' target='_blank' rel='noopener'>Pyodide — 314.0 (WASM wheels on PyPI)</a> · <a href='https://blog.cloudflare.com/ai-gateway-spend-limits/' target='_blank' rel='noopener'>Cloudflare — AI Gateway spend limits</a> · <a href='https://support.claude.com/en/articles/15036540-use-the-claude-agent-sdk-with-your-claude-plan' target='_blank' rel='noopener'>Anthropic — Agent SDK with your Claude plan (Jun 15 billing)</a> · <a href='https://www.anthropic.com/news/fable-mythos-access' target='_blank' rel='noopener'>Anthropic — Fable 5 / Mythos 5 access statement</a> · <a href='https://www.semrush.com/free-tools/ai-search-visibility-checker/' target='_blank' rel='noopener'>Semrush — free AI Search Visibility Checker</a> · <a href='https://www.semrush.com/blog/linkedin-ai-visibility-study/' target='_blank' rel='noopener'>Semrush — LinkedIn AI-citation study</a> · <a href='https://blog.hubspot.com/marketing/schema-markup-aeo' target='_blank' rel='noopener'>HubSpot — Schema markup for AEO</a> · <a href='https://www.searchenginejournal.com/google-extends-dynamic-search-ads-migration-deadline/579074/' target='_blank' rel='noopener'>Search Engine Journal — Google extends DSA migration deadline (→AI Max, Feb 2027)</a> ·<a href='https://baymard.com/lists/cart-abandonment-rate' target='_blank' rel='noopener'>Baymard — cart abandonment (CRO)</a> · <a href='https://www.cnbc.com/2026/06/12/elon-musk-trillionaire-spacex.html' target='_blank' rel='noopener'>CNBC — SpaceX record IPO / Musk first trillionaire</a>"
  },

  /* ============== DAILY — Sun Jun 14 ============== */
  {
    id: "2026-06-14-daily",
    type: "daily",
    week: "Week of Jun 8 – 14, 2026",
    title: "Daily Briefing — Sunday, June 14",
    dateLabel: "Sunday, June 14, 2026",
    sortDate: "2026-06-14",
    domains: ["web-dev", "graphic", "growth"],
    tldr: [
      "<b>Web dev play of the day: run real Python in the browser with zero backend — and now install almost any package straight from PyPI.</b> Pyodide 314.0 (Jun 13) lets package authors publish <b>WebAssembly wheels to PyPI</b>, so <code>micropip.install('pandas')</code> pulls real libraries into a browser tab at runtime — no server, no API bill, and the user's data never leaves their machine. Perfect for a client-side calculator, CSV explorer, or PDF/image tool. One CDN script tag and you're running.",
      "<b>Graphic play: stop generating logos and icons you can't edit — get native, editable SVG from AI.</b> Every other AI image tool hands you a flat PNG; <b>Recraft V4's Vector models</b> output true SVG with clean, editable paths you drop straight into Figma or Illustrator, recolour to your brand, and scale from favicon to billboard. The fix for the #1 problem with AI brand assets: they usually arrive as uneditable pixels.",
      "<b>Growth play: add FAQ schema to your top money pages so AI answer engines can quote you — structured pages get ~2.8× the AI-citation rate.</b> Schema markup is invisible JSON-LD code that spells out, in machine-readable form, exactly what your page says. FAQ schema sits on only ~10.5% of AI-cited pages, so it's an open lane: paste a <code>FAQPage</code> block into a high-intent page, validate it, and you've made yourself legible to ChatGPT/Perplexity/Google AI.",
      "<b>Sharpen your edge:</b> today's throughline is <i>own less server, own more of the edge</i> — push the computation to the user's browser (Pyodide), ship assets that stay editable instead of baked (SVG), and make your pages machine-legible so the AI does the distribution (schema). The cheapest, most durable wins right now are the ones that need no backend and no re-work later."
    ],
    sections: [
      { h: "Web dev — run it today: real Python in the browser, no backend (Pyodide 314.0 + WASM wheels on PyPI)",
        blocks: [
          { sub: "Pyodide 314.0 (Jun 13, 2026) lets any package ship a WebAssembly wheel to PyPI — so micropip pulls real Python libraries into a browser tab at runtime, no server to host or pay for", tags:["technique"],
            p: "What changed: <b>Pyodide</b> is CPython compiled to <b>WebAssembly</b> (Wasm) — the standard that lets non-JavaScript code run at near-native speed inside any modern browser tab — so Python runs client-side with no server. The <b>314.0 release (Jun 13, 2026, which tracks Python 3.14)</b> closes the ecosystem's biggest gap: combined with a PyPI change (PEP 783, landed Apr 21), <b>package authors can now publish Wasm 'wheels' (pre-built installable packages) straight to PyPI</b> under the <code>pyemscripten_2026_0</code> tag — 28 packages already do — so <code>micropip.install('somepkg')</code> fetches them at runtime. Before this, Pyodide's maintainers had to hand-build and host ~300 packages themselves, a bottleneck; now any C/Rust-extension library can ship its own browser build like it ships Linux/Mac/Windows ones. Why it matters for our builds: you can ship an interactive tool — a pricing/ROI calculator, a CSV or data explorer, a client-side image/PDF processor — that runs <b>entirely in the browser</b>. No backend to stand up, host, or pay for; no per-call API cost; and the user's data <b>never leaves their machine</b>, which is a genuine selling point for client tools that touch sensitive inputs (financials, uploads, PII). It's the 'free/no-build by default' move: reach for Python's mature libraries instead of re-implementing them in JavaScript.",
            doIt: "(1) Drop one CDN script tag in your page: <code>&lt;script src='https://cdn.jsdelivr.net/pyodide/v314.0.0/full/pyodide.js'&gt;&lt;/script&gt;</code>. (2) Boot it once: <code>const pyodide = await loadPyodide();</code>. (3) Install a package at runtime: <code>await pyodide.loadPackage('micropip'); const micropip = pyodide.pyimport('micropip'); await micropip.install('snowballstemmer');</code> (swap in any PyPI package that ships a pure-Python or Wasm wheel). (4) Run Python and read the result back into JS: <code>const out = await pyodide.runPythonAsync(\"import statistics; statistics.mean([2,4,6])\");</code>. (5) <b>Lazy-load it</b> — don't boot Pyodide on page load; trigger <code>loadPyodide()</code> on the click that opens the tool, so the runtime download only hits users who actually use it. (6) Verify your exact package installs in the Pyodide REPL at pyodide.org before you wire up the UI.",
            note: "Honest caveat: the first load downloads the Python runtime (several MB) plus any packages — fine for an interactive tool the user opted into, wrong for your marketing homepage's critical path; lazy-load on click and show a 'loading…' state. The runtime works across modern browsers, not Chromium-only. The PyPI-Wasm-wheel ecosystem is young (28 packages on Jun 13) — the long-bundled scientific stack (numpy, pandas) already works via micropip; check your specific extension package first. Card: card-webdev-pyodide-browser-python. Logged a prediction (Wasm-wheel package count grows). Sources: Pyodide release blog, Pyodide docs, Simon Willison." }
        ]
      },
      { h: "Graphic — run it today: generate editable SVG logos & icons with AI (Recraft V4 Vector → Figma)",
        blocks: [
          { sub: "A durable play resurfaced for a quiet graphic day: Recraft V4's Vector models output true, editable SVG (not a flat PNG) — the only major AI image model doing native SVG rather than raster-to-vector tracing", tags:["technique"],
            p: "The play: the #1 problem with AI-generated logos and icons is that they arrive as <b>pixels</b> — a flat PNG you can't recolour cleanly, can't resize without blur, and can't hand to a developer. <b>Recraft V4's Vector models</b> fix that: they generate native <b>SVG</b> (Scalable Vector Graphics — math-defined shapes that stay razor-sharp at any size and stay editable), with clean Bézier paths you open directly in <b>Figma, Illustrator or Sketch</b> and edit path-by-path. Recraft is currently the only major AI image tool producing production-ready SVG natively, instead of auto-tracing a raster image into a messy approximation. Why it matters for our craft: this is the difference between a one-off picture and a real brand asset — an icon set that scales from a 16px favicon to a billboard, recolours to the client's exact brand tokens, and drops into the design system without a redraw. It pairs with the structured-prompt and palette plays we already use (give it your hex palette, prompt as a brief).",
            doIt: "(1) Open <b>recraft.ai</b> and pick a <b>V4 Vector</b> model (Vector / Vector Pro). (2) Prompt like a brief, not a sentence: <code>minimalist single-line icon of a paper plane, flat, one accent colour #2563EB on transparent, consistent 2px stroke</code>. (3) Generate, then <b>download as SVG</b>. (4) Drag the SVG into <b>Figma</b> — it lands as editable vector layers; recolour to your brand tokens and tweak stroke/shape. (5) Build a <b>consistent set</b> by reusing the exact same style clause across prompts (same stroke weight, fill rule, corner style) so 12 icons read as one family. (6) Keep a human in the loop — pick the 2–3 that fit, fix kinks in the paths, and confirm the result is on-brand before shipping.",
            note: "Honest caveats: confirm commercial-use rights on your Recraft plan before using output in client work; AI vector output still needs a designer's pass for true brand fit and path cleanliness; for typographic/text-in-image pieces, Ideogram's JSON layout play is the better tool (card-graphic-ideogram-json-layout). This is a durable technique surfaced because the graphic beat was quiet today — not breaking news. Card: card-graphic-recraft-svg-vector. Logged a prediction (a 2nd major model ships native vector). Sources: Recraft, abduzeedo, MindStudio." }
        ]
      },
      { h: "Growth — run it today: add FAQ schema so AI answer engines can quote your pages",
        blocks: [
          { sub: "Structured pages (clean headings + schema markup) earn ~2.8× the AI-citation rate of poorly-structured ones — and FAQ schema sits on only ~10.5% of AI-cited pages, so it's an open lane", tags:["technique"],
            p: "What changed: as buyers shift to asking AI assistants instead of scrolling search results, the question is whether ChatGPT/Perplexity/Google AI can cleanly lift an answer <i>from your page</i>. <b>Schema markup</b> — invisible <b>JSON-LD</b> code (a small structured block in your page's HTML) that states, in machine-readable form, exactly what the page is and what each Q&A says — is how you remove the ambiguity. 2026 research (AirOps' State of AI Search) found pages with clean structure plus schema earn <b>~2.8× higher AI-citation rates</b> than poorly-structured ones, and pages using three or more schema types are ~13% more likely to be cited. Crucially, <b>FAQ schema appears on only ~10.5% of AI-cited pages</b> — under-used, so it's a low-effort edge. Why it matters for our craft: this is the third leg of the answer-engine-optimization play we've been building — we covered the <b>content-format pass</b> (card-growth-aeo-content-formats) and the free <b>visibility check</b> (card-growth-ai-visibility-check); this is the <b>machine-legibility</b> leg. <code>FAQPage</code> and <code>HowTo</code> schema map directly to how an LLM extracts and attributes an answer.",
            doIt: "(1) Pick one <b>high-intent money page</b> that already answers real buyer questions (pricing, comparison, 'how does X work'). (2) Generate a <code>FAQPage</code> JSON-LD block — use Google's <b>Structured Data Markup Helper</b>, or on WordPress the Rank Math / All in One SEO FAQ block (no code). (3) Paste the JSON-LD into the page <code>&lt;head&gt;</code> (JSON-LD is Google's recommended format because it sits apart from your layout and won't break it). (4) Add <code>Organization</code> + <code>Author</code> schema too for trust/E-E-A-T signals. (5) <b>Validate</b> with Google's <b>Rich Results Test</b> and the <b>Schema.org Validator</b> — fix any errors before shipping. (6) Re-run your AI-visibility check (card-growth-ai-visibility-check) in ~2–4 weeks to confirm new mentions, and templatise the winning markup across similar pages.",
            note: "Honest caveats: schema makes you <b>legible and eligible</b>, not guaranteed — the page still needs a genuinely good, attributable first-party answer (the content-format pass). Note Google scaled back FAQ <i>rich results</i> in classic blue-link Search back in 2023, so the payoff here is <b>AEO / AI-answer legibility</b>, not a guaranteed search-snippet; don't promise clients a rich snippet. Card: card-growth-schema-aeo (advances the answer-engine-optimization thread). Logged a prediction. Sources: AirOps, HubSpot, Google Search Central." }
        ]
      }
    ],
    sources: "<a href='https://blog.pyodide.org/posts/314-release/' target='_blank' rel='noopener'>Pyodide — 314.0 release (WASM wheels on PyPI)</a> · <a href='https://pyodide.org/en/stable/usage/quickstart.html' target='_blank' rel='noopener'>Pyodide Docs — Getting started / quickstart</a> · <a href='https://simonwillison.net/2026/Jun/13/publishing-wasm-wheels/' target='_blank' rel='noopener'>Simon Willison — Publishing WASM wheels to PyPI for use with Pyodide</a> · <a href='https://www.recraft.ai/ai-models/ideogram' target='_blank' rel='noopener'>Recraft — AI models (V4 Vector)</a> · <a href='https://abduzeedo.com/recraft-v4-brings-design-taste-and-native-svg-ai-generation' target='_blank' rel='noopener'>Abduzeedo — Recraft V4 brings design taste and native SVG</a> · <a href='https://www.mindstudio.ai/blog/what-is-recraft-v4-vector-generate-svg-logos-icons-ai' target='_blank' rel='noopener'>MindStudio — Generate native SVG logos & icons with Recraft V4 Vector</a> · <a href='https://www.airops.com/blog/schema-markup-aeo' target='_blank' rel='noopener'>AirOps — How to implement schema markup for AEO</a> · <a href='https://blog.hubspot.com/marketing/schema-markup-aeo' target='_blank' rel='noopener'>HubSpot — Schema markup for AEO</a> · <a href='https://developers.google.com/search/docs/appearance/structured-data/faqpage' target='_blank' rel='noopener'>Google Search Central — FAQPage structured data</a>"
  },

  /* ============== DAILY — Sat Jun 13 ============== */
  {
    id: "2026-06-13-daily",
    type: "daily",
    week: "Week of Jun 8 – 14, 2026",
    title: "Daily Briefing — Saturday, June 13",
    dateLabel: "Saturday, June 13, 2026",
    sortDate: "2026-06-13",
    domains: ["web-design", "paid", "social", "news"],
    tldr: [
      "<b>Web design play of the day: ship an accessible image carousel in pure CSS — no JS library, no a11y debt.</b> Chrome/Edge 135+ ship the CSS Overflow 5 carousel primitives: a plain scroll-snap list plus <code>::scroll-button(left/right)</code> (prev/next), <code>::scroll-marker</code> + <code>scroll-marker-group</code> (the dot nav) and <code>:target-current</code> (active dot). The browser supplies the ARIA roles, keyboard nav and focus order for free, and it degrades to a usable scroll-snap strip in Firefox/Safari — so delete the carousel JS today. Chromium-only for now (not yet Baseline).",
      "<b>Paid — Google just bought you a runway: the DSA → AI Max forced migration slipped from Sept 2026 to Feb 2027, and DSA creation returns Jun 15.</b> Don't get auto-migrated blind. Use the window to run <b>AI Max for Search 50/50 against your live DSA in Experiments</b> for 2–4 weeks, with brand exclusions + negatives pre-set, and judge it on <b>CPA/ROAS and wasted-query rate</b> (not clicks). Migrate on proof, not on a deadline.",
      "<b>Social — Instagram put a steering wheel on the feed: 'Your Algorithm' now reaches the main feed.</b> An LLM turns each user's behavior into plain-language topics they can <i>add or remove</i> (live Jun 12). Reach now hinges on the model confidently filing your post under a topic people opt into — so name <b>one</b> topic per post in the first caption line, the on-screen text, and the first 3 seconds, and hold a consistent niche. Off-topic posts don't just get ignored, they get 'show less'-ed.",
      "<b>News — the largest IPO in history landed: SpaceX went public Jun 12, raising ~$75B and closing at a ~$2.2T market cap, making Elon Musk the world's first trillionaire.</b> Shares priced at $135, opened $150 and closed $161.11 (+19.34%); SpaceX is now the 6th-largest US public company. Risk-on for the AI/space megacap trade — but treat single-day prints as directional and watch whether the valuation holds past the debut pop.",
      "<b>News — the Fable 5 / Mythos 5 shutdown hardened.</b> As of Jun 13 both models remain disabled for all customers under the Jun 12 US export-control order; Anthropic called the directive <b>disproportionate</b> and warned it would <b>halt all frontier-model deployments</b> if applied industry-wide — the recall came just three days after Fable 5 launched. The continuity lesson stands: never hard-wire one model (card-ai-tooling-model-portability).",
      "<b>Sharpen your edge:</b> today's throughline is <i>own the layer the platform is automating</i> — let the browser render the carousel and the screen-reader semantics, let Google's AI run the search match (but prove it in an experiment first), let Instagram's model classify your post (but hand it one unambiguous topic). The platforms are absorbing the manual work; your edge is setting the inputs and the guardrails so their automation lands on your terms."
    ],
    sections: [
      { h: "Web design — run it today: an accessible carousel in pure CSS (CSS Overflow 5 — scroll buttons + markers)",
        blocks: [
          { sub: "Chrome/Edge 135+ ship ::scroll-button(), ::scroll-marker / scroll-marker-group and :target-current — a full carousel with no JS, and the browser hands you the accessibility for free", tags:["technique"],
            p: "What's the play: the carousel is the component teams most reliably ship with a heavy JavaScript library <i>and</i> broken accessibility. The CSS Overflow Level 5 primitives — stable in <b>Chrome/Edge 135+</b> — let you build the whole thing in CSS on top of a plain scroll-snap container: <code>::scroll-button(left)</code>/<code>::scroll-button(right)</code> are real browser-generated prev/next buttons that scroll ~85% of the track and auto-disable at the ends; <code>::scroll-marker</code> with <code>scroll-marker-group</code> generates the dot navigation; and <code>:target-current</code> styles the active dot. Why it matters for our builds: doing it natively deletes the dependency, the hydration cost <i>and</i> the a11y bugs in one move — the engine reports the control as a tablist, wires up arrow-key navigation and correct focus order, and exposes accessible labels you set inline. It joins the same gracefully-degrading modern-CSS-primitives story as squircles, gap decorations and sibling-index(): an engine without support just renders a scrollable scroll-snap strip, so there's no fallback code to write.",
            doIt: "(1) Scroll-snap container: <code>.carousel{ overflow-x:auto; scroll-snap-type:x mandatory; } .carousel li{ scroll-snap-align:center; }</code>. (2) Dot nav: add <code>scroll-marker-group:after;</code> to <code>.carousel</code>, then <code>.carousel li::scroll-marker{ content:''; }</code> and <code>.carousel li::scroll-marker:target-current{ background:var(--accent); }</code> for the active dot. (3) Prev/next: <code>.carousel::scroll-button(left){ content:'⬅' / 'Scroll left'; }</code> and <code>::scroll-button(right){ content:'⮕' / 'Scroll right'; }</code> — the string after <code>/</code> is the accessible label. (4) Remove the old JS carousel init entirely. (5) Optionally gate enhancements with <code>@supports selector(::scroll-marker){ … }</code> if you want an explicit baseline, though it's not required.",
            note: "Honest caveat: Chromium-only right now (Chrome/Edge 135+) — Firefox and Safari have not shipped the carousel pseudo-elements, and it's not yet Baseline. Because it degrades to a plain scrollable carousel, use it as progressive enhancement today; don't make the buttons/dots load-bearing for non-Chromium users. Card: card-webdesign-css-carousel (thread-modern-css-primitives). Logged a Baseline prediction (2nd engine ships)." }
        ]
      },
      { h: "Paid — run it today: prove AI Max on your own account before Google's forced migration (google-ads)",
        blocks: [
          { sub: "Google delayed the DSA → AI Max auto-migration from Sept 2026 to Feb 2027 and restores DSA creation Jun 15 — a window to test AI Max as a controlled experiment, not get auto-migrated blind", tags:["google-ads"],
            p: "What changed (Jun 2026): Google Ads Liaison Ginny Marvin confirmed the automatic transition of Dynamic Search Ads to <b>AI Max for Search</b> is pushed from <b>September 2026 to February 2027</b>, in response to advertiser feedback and to avoid forcing account changes during Q4. The ability to <b>create new DSAs is restored on Jun 15, 2026</b>; new-DSA creation then ends Jan 2027, with automatic migration of anything left beginning Feb 2027. Why it matters for us: AI Max is replacing DSA regardless — but the auto-migration is a black box, and AI Max's broader matching can spend on brand and irrelevant queries if it's not fenced. The reprieve is a chance to apply the same operator move we use on Meta Advantage+: a guarded, side-by-side test that proves the AI's lift on <i>your</i> account so you migrate on evidence with guardrails already dialed in, not on a deadline.",
            doIt: "(1) Confirm your DSA campaigns still run; from Jun 15 you can create/edit DSAs during the test window. (2) In <b>Google Ads → Experiments</b>, run <b>AI Max for Search</b> against your existing DSA at a <b>50/50</b> budget split. (3) Pre-set the guardrails AI Max needs: tight <b>brand exclusions</b>, negative-keyword lists, and URL/location/text controls so it can't burn budget on brand or off-topic queries. (4) Run <b>2–4 weeks</b>, then judge on <b>CPA/ROAS and the wasted-query rate</b> from the search-terms report — not the clicks/impressions AI Max will inflate. (5) If it wins, use the voluntary migration tool now; if it loses, keep DSA and re-test before Jan 2027. (6) Audit any SOP/onboarding doc that says 'build a DSA' so juniors don't ship the wrong campaign type as the menus shift.",
            note: "The dates are Google-stated and have already moved once (Sept 2026 → Feb 2027), so treat the timeline as directional and re-confirm in-product. Don't read the delay as a reprieve from AI Max itself — it's a reprieve to prepare. Card: card-paid-aimax-dsa-experiment (advances the AI-Max/controls-collapse thread). Logged a prediction (timeline holds at Feb 2027). Sources: Search Engine Land, Search Engine Journal, PPC Land." }
        ]
      },
      { h: "Social — run it today: hand Instagram one clear topic so it files (and surfaces) your posts (instagram)",
        blocks: [
          { sub: "'Your Algorithm' reached the main feed (Jun 12) — an LLM turns behavior into plain-language topics users add or remove, so confident topical signaling is the new reach lever", tags:["technique"],
            p: "What changed (Jun 12, 2026): Instagram expanded its <b>Your Algorithm</b> controls — first on Reels (Oct 2025), then Explore — to the <b>main feed</b>. A large language model translates each user's engagement into <b>plain-language topics</b> they can see, <b>add</b> ('show me more of this') or <b>remove</b> ('less of this'); head Adam Mosseri framed it as giving back agency the recommendation system had taken. Why it matters for our craft: distribution now runs partly on explicit, user-chosen topic preferences, not just implicit signals. When a viewer can add 'more of [topic]', a post the model has confidently filed under that topic rides along — and an off-niche or muddy post can be actively 'show less'-ed out of exactly the audience that would convert. The winning move mirrors what we taught for Instagram's sends signal and LinkedIn GEO: <b>design your inputs for the signal the model now ranks on</b>, here a clean, consistent topic association.",
            doIt: "(1) On your own account, open <b>Your Algorithm</b> (Settings → recommendation/topic controls) and read the topics Instagram inferred — that's roughly how it classifies content like yours. (2) Choose <b>one</b> topic per post and state it explicitly: in the <b>first line of the caption</b>, in <b>on-screen text</b>, and shown/spoken in the <b>first 3 seconds</b> of a Reel, so the model gets unambiguous signals to embed. (3) Hold a <b>consistent niche</b> across posts to build a strong topic association users can opt into; push off-topic personal posts to Stories. (4) Add a 'send this to…'/save-worthy payoff so you also earn the sends + saves that still drive distribution (pair with card-social-instagram-sends). (5) After a week, recheck Your Algorithm — are your inferred topics sharpening toward your niche? Scattered topics mean your signaling is too mixed.",
            note: "Caveat: the topic controls are a viewer-side personalization surface, not a publisher dashboard — you're inferring how the model reads you from your own account, not a guaranteed reach setting. The durable principle (clear, consistent topical signaling) holds regardless of UI specifics. Card: card-social-instagram-your-algorithm (advances the Instagram-ranking thread). Logged a prediction. Sources: Search Engine Land, Social Media Today, Engadget." }
        ]
      },
      { h: "News — the landscape: the biggest IPO ever, and the Fable 5 shutdown hardens",
        intro: "Trust-critical domain — figures cross-checked against a 2nd source and marked directional where fast-moving.",
        blocks: [
          { sub: "SpaceX's record IPO makes Musk the first trillionaire — risk-on for the AI/space megacap trade, but a debut pop is not a valuation", tags:["markets"],
            p: "What happened: <b>SpaceX went public on Jun 12, 2026</b> in the <b>largest IPO in history</b> — shares priced at <b>$135</b>, opened at <b>$150</b>, and closed at <b>$161.11</b> (up ~<b>19.3%</b> on the day), giving the company a market cap around <b>$2.2 trillion</b> and making it the <b>6th-largest US public company</b> on day one. The raise was roughly <b>$75B</b>, and the debut pushed Elon Musk's net worth past <b>$1 trillion</b> — the world's first trillionaire. Why it matters to us: it's a loud risk-on signal for the AI/space megacap complex the same week the AI-chip names were repricing — capital is still chasing the biggest frontier-infrastructure bets. For client work, it reinforces the climate read, not a trade: enthusiasm for marquee AI/space names is intact, but scrutiny of <i>economics</i> is the throughline, so keep leading AI pitches with cost-per-outcome.",
            note: "Confirmed (≥3 independent): CNBC, Bloomberg, CNN and Al Jazeera/TechCrunch corroborate the largest-IPO framing, the trillionaire milestone and the close. Exact intraday prints ($150 open / $161.11 close / +19.3%) are dated snapshots — directional; the durable facts are 'largest IPO ever + first trillionaire + ~$2.2T debut cap'. A debut pop isn't a settled valuation — watch whether it holds." },
          { sub: "Fable 5 / Mythos 5 stay dark — Anthropic calls the order disproportionate and warns it would freeze all frontier deployments industry-wide", tags:["landscape"],
            p: "Where it stands (Jun 13): both <b>Claude Fable 5 and Mythos 5 remain disabled for all customers</b> under the <b>Jun 12</b> US government export-control directive (suspending foreign-national access, impractical to enforce per-user, so Anthropic switched both off to comply); all other Claude models are unaffected. New detail advancing the thread: Anthropic publicly called the directive <b>disproportionate</b> and warned that, if the same logic were applied across the industry, it would <b>halt all frontier-model deployments</b> — and stressed the recall came just <b>three days after Fable 5 launched</b>. Anthropic maintains the order likely rests on a 'misunderstanding' over a narrow jailbreak finding (a capability it says is widely available, incl. GPT-5.5) and says it's working to restore access. Why it matters to us: the availability-risk thread is now concrete precedent — a frontier model you build on can be switched off overnight by a third party. The craft payoff is unchanged: route AI calls through a gateway with a fallback model list (card-ai-tooling-model-portability).",
            note: "Confirmed (≥3): Anthropic's own statement plus Bloomberg, The Verge, Ars Technica and The Next Web. The jailbreak rationale and 'disproportionate' characterisation are Anthropic's framing of the government's reasoning, not a public official finding — treat the 'why' as reported and the situation as fast-moving (open restoration prediction, due ~Jul 11). Also logged from the harvest: Jeff Bezos's Prometheus raised ~$12B for an 'artificial general engineer' (Reported, 2 sources) — physical-AI capital keeps flowing." }
        ]
      }
    ],
    sources: "<a href='https://developer.chrome.com/blog/carousels-with-css' target='_blank' rel='noopener'>Chrome for Developers — Carousels with CSS</a> · <a href='https://developer.mozilla.org/en-US/docs/Web/CSS/::scroll-marker-group' target='_blank' rel='noopener'>MDN — ::scroll-marker-group</a> · <a href='https://www.sitepoint.com/scrolldriven-css-in-2026-building-carousels-without-javascript/' target='_blank' rel='noopener'>SitePoint — Scroll-driven CSS in 2026: carousels without JavaScript</a> · <a href='https://searchengineland.com/google-delays-dynamic-search-ads-migration-to-ai-max-480049' target='_blank' rel='noopener'>Search Engine Land — Google delays DSA migration to AI Max (Feb 2027)</a> · <a href='https://www.searchenginejournal.com/google-extends-dynamic-search-ads-migration-deadline/579074/' target='_blank' rel='noopener'>Search Engine Journal — Google extends DSA migration deadline</a> · <a href='https://ppc.land/google-delays-dsa-to-ai-max-automigration-to-february-2027/' target='_blank' rel='noopener'>PPC Land — DSA-to-AI Max automigration delayed to February 2027</a> · <a href='https://searchengineland.com/instagram-your-algorithm-expands-main-feed-479922' target='_blank' rel='noopener'>Search Engine Land — Instagram's Your Algorithm expands to the main feed</a> · <a href='https://www.socialmediatoday.com/news/instagram-extends-your-algorithm-to-the-main-feed/822576/' target='_blank' rel='noopener'>Social Media Today — Instagram extends Your Algorithm to the main feed</a> · <a href='https://www.engadget.com/2191695/you-can-personalize-your-instagram-algorithm-now/' target='_blank' rel='noopener'>Engadget — You can personalize your Instagram algorithm now</a> · <a href='https://www.cnbc.com/2026/06/13/from-10percent-chance-of-success-to-2-trillion-spacexs-historic-ipo.html' target='_blank' rel='noopener'>CNBC — From 10% chance of success to $2 trillion: SpaceX's historic IPO</a> · <a href='https://www.bloomberg.com/news/articles/2026-06-12/what-to-know-about-spacex-s-record-breaking-ipo' target='_blank' rel='noopener'>Bloomberg — What to know about SpaceX's record-breaking IPO</a> · <a href='https://www.cnn.com/2026/06/12/business/live-news/spacex-goes-public-ipo' target='_blank' rel='noopener'>CNN Business — SpaceX shares debut after biggest IPO in history</a> · <a href='https://www.aljazeera.com/economy/2026/6/12/spacex-ipo-debuts-in-us-markets-musk-becomes-worlds-first-trillionaire' target='_blank' rel='noopener'>Al Jazeera — SpaceX IPO debuts; Musk becomes world's first trillionaire</a> · <a href='https://www.anthropic.com/news/fable-mythos-access' target='_blank' rel='noopener'>Anthropic — Statement on the US government directive to suspend access to Fable 5 and Mythos 5</a> · <a href='https://thenextweb.com/news/anthropic-fable-mythos-us-government-suspension' target='_blank' rel='noopener'>The Next Web — US government orders Anthropic to kill Fable 5 and Mythos 5</a> · <a href='https://techcrunch.com/2026/06/11/jeff-bezoss-prometheus-raises-12b-to-build-an-artificial-general-engineer-for-the-physical-world/' target='_blank' rel='noopener'>TechCrunch — Bezos's Prometheus raises $12B</a>"
  },

  /* ===================== DAILY — Fri Jun 12 ===================== */
  {
    id: "2026-06-12-daily",
    type: "daily",
    week: "Week of Jun 8 – 14, 2026",
    title: "Daily Briefing — Friday, June 12",
    dateLabel: "Friday, June 12, 2026",
    sortDate: "2026-06-12",
    domains: ["web-design", "web-dev", "email"],
    tldr: [
      "<b>A short catch-up edition for a day we missed.</b> No fabricated news — three durable, genuinely-true plays worth running whenever you ship them, each with a real working link.",
      "<b>Web design — give a plain multi-page site app-like page transitions in ~5 lines of CSS.</b> Chrome's View Transitions API cross-fades (or morphs a shared element) between pages with no framework, and quietly does nothing where unsupported — safe to add today.",
      "<b>Web dev — put a hard dollar cap on any AI feature before you ship it.</b> Route your AI calls through a gateway and set a spend limit; cross the budget and it blocks or fails over to a cheaper model, so a runaway loop can't quietly burn four figures.",
      "<b>Email — land in the inbox and show your logo next to every send.</b> A one-time DNS setup (DMARC enforcement + BIMI) improves inbox placement and puts your verified logo beside your emails in Gmail and Apple Mail.",
      "<b>Sharpen your edge:</b> a quiet day isn't an empty one — the durable plays are always worth a second pass. Pick the one that touches today's work and ship it."
    ],
    sections: [
      { h: "Web design — run it today: app-like page transitions in ~5 lines of CSS",
        blocks: [
          { sub: "Chrome's View Transitions API animates page-to-page navigation with no framework", tags:["technique"],
            p: "A 'page transition' is the smooth animation when one screen slides or morphs into the next — the polish native apps have and most websites don't. Chrome's View Transitions API gives a plain multi-page site that effect in about five lines of CSS. Where it isn't supported, navigation just happens normally, so there's zero downside to adding it now.",
            doIt: "Turn it on in CSS with <code>@view-transition { navigation: auto; }</code> (that alone cross-fades pages). To morph one element across the change, give it the same <code>view-transition-name</code> on both pages. Wrap any bigger motion in <code>@media (prefers-reduced-motion: reduce)</code>, then ship.",
            note: "Durable play resurfaced for the catch-up — see the card card-web-view-transitions. Support varies by browser; it degrades cleanly to a normal navigation." }
        ]
      },
      { h: "Web dev — run it today: a hard dollar cap on any AI feature",
        blocks: [
          { sub: "Route LLM calls through an AI gateway and set a spend limit so a runaway loop can't burn four figures", tags:["technique"],
            p: "The #1 reason teams won't ship AI features is fear of a surprise bill. An AI gateway is a middleman for your AI calls; Cloudflare's now enforces spend limits — real dollar budgets worked out from each model's token price. Cross the budget and it either blocks further calls or fails over to a cheaper model.",
            doIt: "Point your OpenAI/Anthropic calls at an AI Gateway endpoint, add a <b>spend limit</b> scoped by model/team (e.g. $50/day on one pricey model), pick the window, and choose the over-limit behaviour (block, or fail over to a cheaper model). Reconcile the gateway's cost figures against your provider invoice for the first month.",
            note: "Durable play resurfaced for the catch-up — see the card card-webdev-ai-gateway-spend-limits." }
        ]
      },
      { h: "Email — run it today: land in the inbox and show your logo",
        blocks: [
          { sub: "A one-time DNS setup (DMARC + BIMI) that improves placement and shows your verified logo in Gmail and Apple Mail", tags:["technique"],
            p: "These are email-authentication records: SPF and DKIM prove a message is really from you, DMARC tells inboxes what to do if it isn't, and BIMI (plus a VMC certificate) unlocks your logo beside the email. Two wins from one afternoon — better inbox placement after the 2024 sender rules, and free brand real estate most competitors haven't claimed.",
            doIt: "Confirm SPF/DKIM pass, publish a DMARC record at <code>p=none</code> then tighten to <code>p=quarantine</code> and <code>p=reject</code>, then publish a BIMI record with a square SVG logo + a VMC certificate. Send yourself a test to confirm the logo shows and you land in the inbox.",
            note: "Durable play resurfaced for the catch-up — see the card card-email-dmarc-bimi." }
        ]
      }
    ],
    sources: "<a href='https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API' target='_blank' rel='noopener'>MDN — View Transitions API</a> · <a href='https://blog.cloudflare.com/ai-gateway-spend-limits/' target='_blank' rel='noopener'>Cloudflare — AI Gateway spend limits</a> · <a href='https://developers.cloudflare.com/changelog/post/2026-06-05-spend-limits/' target='_blank' rel='noopener'>Cloudflare Changelog — Control AI costs with spend limits</a> · <a href='https://support.google.com/mail/answer/81126' target='_blank' rel='noopener'>Google — Email sender guidelines</a> · <a href='https://bimigroup.org/' target='_blank' rel='noopener'>BIMI Group</a>"
  },

  /* ===================== DAILY — Thu Jun 11 ===================== */
  {
    id: "2026-06-11-daily",
    type: "daily",
    week: "Week of Jun 8 – 14, 2026",
    title: "Daily Briefing — Thursday, June 11",
    dateLabel: "Thursday, June 11, 2026",
    sortDate: "2026-06-11",
    domains: ["web-design", "ai-tooling", "growth", "news"],
    tldr: [
      "<b>Design play of the day: stagger a list animation — or build a math-driven layout — with zero JavaScript and zero inline styles.</b> CSS <code>sibling-index()</code> and <code>sibling-count()</code> let an element read its own position and the total count, so a staggered reveal is one line: <code>transition-delay: calc((sibling-index() - 1) * 60ms)</code>. Add items, the timing recalculates itself — no per-item classes, no JS loop. Chromium-only for now (Chrome/Edge 137+), and it degrades to 'no stagger', so it's safe progressive enhancement today.",
      "<b>AI tooling — stop pasting one mega-prompt: orchestrate a planner→worker→verifier team in Claude Code.</b> Claude Code's <b>dynamic <code>/workflows</code></b> (research preview, late May) lets you describe a big job and include the word <i>workflow</i> — Claude writes and runs an orchestration script that fans the task across subagents (great for codebase audits, migrations, multi-file refactors). June added <b>nested subagents</b> (up to 5 levels). It's the reliable multi-agent shape we keep teaching, now a built-in primitive.",
      "<b>Growth — find out today whether ChatGPT and Gemini actually mention your brand (free, no login).</b> AEO has a measurement layer now: paste your domain into <b>Semrush's free AI Search Visibility Checker</b> and get a 0–100 score, which AI engines mention you, and the high-volume prompts where you're <i>invisible</i> — a ready-made fix list. (Ahrefs Brand Radar / Semrush AI Toolkit go deeper.) This resolves our open call that AEO would go mainstream-measurable.",
      "<b>News — the AI-chip rout found a floor, fast.</b> After the Jun 3–6 sell-off (SOXX ~−10%, Nvidia briefly under $5T), AI-chip names <b>rebounded early the week of Jun 8</b> (Intel/Micron up sharply intraday) as hyperscalers reaffirmed ~$750B of 2026 capex. Our 'dip, not regime change' call (due Jul 20) is now leaning <i>held</i> — directional, the durable read is the V-shape + the why.",
      "<b>News — the agent economy crossed into your brokerage.</b> Coinbase launched <b>Coinbase for Agents</b> (Jun 11): Claude/ChatGPT can execute crypto trades and pay for premium research via an MCP server, using the open <b>x402</b> protocol (built with AWS, Anthropic, Circle, Near). Crucially it ships with the safety pattern we preach — point the agent at a <i>sandbox account</i>, not your main one. And Anthropic locked <b>$35B</b> in TPU/data-center financing (Google backstop, Broadcom residual guarantees) — compute is still the moat.",
      "<b>Sharpen your edge:</b> today's throughline is <i>let the system compute the structure, but you set the bounds</i> — CSS that counts its own siblings, an AI that writes its own multi-agent plan, a tool that tells you where you're invisible. The same week markets graded loose AI spend and an agent got a trading account, the discipline that wins is the one we keep repeating: scope it (a sandbox, a spend cap, a control), then let it run."
    ],
    sections: [
      { h: "Web design — run it today: stagger animations & math layouts with sibling-index() / sibling-count()",
        blocks: [
          { sub: "CSS sibling-index() and sibling-count() let an element know its position and the total — staggered reveals and per-item math, no JS, no inline styles", tags:["technique"],
            p: "What changed: <b><code>sibling-index()</code></b> (returns an element's 1-based position among its siblings) and <b><code>sibling-count()</code></b> (the total number of siblings) are now usable in stable Chromium (<b>Chrome/Edge 137+</b>). They're real CSS integer functions you can drop into any <code>calc()</code>, so an element can finally style itself based on <i>where it sits in a list</i> — without a framework loop writing <code>style='--i:3'</code> onto every node, and without a stack of <code>:nth-child()</code> rules. Why it matters for our builds: the staggered list reveal (menu items, cards, nav links cascading in) is one of the most-requested motion details on client sites, and today it's faked either with hand-written <code>:nth-child(1..n)</code> delays (brittle — breaks the moment the count changes) or a JS loop that injects a custom property per item (extra markup, hydration cost). These two functions delete both hacks: the timing is computed from the live DOM, so you add or remove items and the cascade just re-derives itself. It also unlocks genuinely new tricks — center-out animations, radial/arc menus, opacity or scale ramps down a list — all in pure CSS.",
            doIt: "Staggered reveal in one line — on the <i>children</i>, not the container: <code>li { transition: opacity .3s, translate .3s; transition-delay: calc((sibling-index() - 1) * 60ms); } @starting-style { li { opacity:0; translate:0 8px; } }</code> — item 1 starts at 0ms, item 2 at 60ms, and so on, recalculating automatically as items change. Want a center-out cascade? Delay by distance from the middle: <code>calc(abs(sibling-index() - (sibling-count() + 1) / 2) * 60ms)</code>. Per-item ramps work too: <code>opacity: calc(1 - (sibling-index() - 1) * 0.1)</code> for a fading list. Because unsupported browsers just ignore the functions (everything animates together, or shows full opacity), it's pure progressive enhancement — but if you want a clean baseline, guard the enhancement with <code>@supports (top: sibling-index()) { ... }</code>.",
            note: "Honest caveat: Chromium-only right now (Chrome/Edge 137+) — not yet Baseline; Firefox is in active development, Safari/WebKit has it on the roadmap but unshipped. Use it strictly as decorative motion/enhancement, never as load-bearing layout, until a 2nd engine ships (logged as a prediction). Card: card-webdesign-sibling-index — joins the modern-CSS-primitives thread." }
        ]
      },
      { h: "AI tooling — run it today: orchestrate a planner→worker→verifier team with Claude Code /workflows",
        blocks: [
          { sub: "Claude Code's dynamic /workflows turns 'describe the job + the word workflow' into a multi-agent run — and June added nested subagents", tags:["technique"],
            p: "What changed: Claude Code shipped <b>dynamic workflows</b> (research preview, late May 2026) — you describe a large task and include the word <b>workflow</b>, and Claude writes <i>and runs</i> an orchestration script that fans the work across multiple subagents, with the <code>/workflows</code> command managing the runs and showing live progress. A June update added <b>nested subagents</b> (a subagent can spawn its own, up to 5 levels deep). Why it matters for us: the single biggest failure mode of agentic work isn't the model's IQ — it's stuffing one session with a sprawling task until its context turns to mush and it starts editing the wrong files. The durable fix we've taught is the <b>planner → worker → verifier → merge</b> shape: one agent plans, parallel workers execute scoped pieces, a verifier checks, then results merge. <code>/workflows</code> makes that shape a built-in primitive instead of something you hand-wire — ideal for the jobs that actually eat our time: a full-repo audit, a framework migration, a 'rename this pattern across 40 files', or 'review this PR from three independent angles and only surface what two of them agree on.'",
            doIt: "(1) In Claude Code, take a big, decomposable job and phrase it as a workflow: <code>Audit this codebase for dead exports and unused deps — use a workflow: one agent maps the module graph, parallel agents check each package, a verifier confirms each finding is really unused before reporting.</code> (2) Watch it with <code>/workflows</code> — it composes the orchestration script and runs the subagents with visible progress. (3) Bias the design toward <b>fan-out + verify</b>: independent workers for breadth, a skeptic agent that tries to <i>refute</i> each finding before it's accepted (kills plausible-but-wrong results). (4) Keep external actions idempotent and checkpoint each step so a retried agent doesn't double-act. (5) Save the recipe: once a workflow earns its keep, capture it as a reusable AI Skill (markdown runbook) so the team triggers it by name.",
            note: "Research preview — expect rough edges and usage that meters separately from interactive sessions (Agent SDK / Actions metering split lands Jun 15). The principle is portable even if you're not on Claude Code: planner→worker→verifier→merge, never one session doing everything. Card: card-ai-tooling-claude-workflows — related to the reusable-skills play." }
        ]
      },
      { h: "Growth — run it today: measure whether AI engines actually cite your brand (free)",
        blocks: [
          { sub: "AEO now has a measurement layer — Semrush's free AI Search Visibility Checker (no login) scores you across ChatGPT/Gemini/Perplexity and shows the prompts where you're invisible", tags:["technique"],
            p: "What changed: the answer-engine-optimization story we've tracked in growth just got its missing half — <b>measurement</b>. You can now check, in about a minute and for free, whether the AI engines name your brand. <b>Semrush's free AI Search Visibility Checker</b> takes just a domain (no sign-up) and returns an <b>AI Visibility Score (0–100)</b>, total mentions, which platforms mention you (ChatGPT, SearchGPT, Gemini, Google AI, Perplexity), competitor comparison, the <b>top prompts</b> that trigger your brand — and, most usefully, the high-volume industry prompts where you're <i>not</i> mentioned. Deeper, paid tools do continuous tracking: <b>Semrush's AI Visibility Index / AI Toolkit</b> (built on a database of 200M+ LLM prompts) and <b>Ahrefs Brand Radar</b> track mention share, citations and share-of-voice across the major assistants. Why it matters for us: AEO advice is only worth acting on if you can see whether it worked — and buyers increasingly start with an AI answer, where studies show a large majority of brands are effectively invisible. This closes the loop: measure where you're absent, then run the AEO formatting pass on exactly those pages, then re-measure. It also resolves a call we logged Jun 8 — AEO has gone mainstream-measurable.",
            doIt: "(1) Run the free check: open <b>Semrush's AI Search Visibility Checker</b>, enter your (or a client's) domain, hit <b>Check Visibility</b>, and read the 0–100 score + platform coverage. (2) Jump to the <b>'opportunities'</b> — the high-volume prompts where competitors are named and you aren't; that's your prioritized target list. (3) For each gap prompt, apply the AEO formatting pass (intent-matched title → one-sentence answer up top → list/table → an original first-party stat → FAQ schema + last-updated date) on the most relevant money page (see card-growth-aeo-content-formats). (4) Re-run the check in ~2–4 weeks to confirm new mentions; for ongoing work, stand up continuous tracking in Ahrefs Brand Radar or Semrush's AI Toolkit. (5) Treat the score as directional — sample the actual AI answers by hand to see how you're described, not just whether.",
            note: "Free-tool numbers are a sampled snapshot, not a full audit — cross-check by literally asking ChatGPT/Perplexity your target questions. Card: card-growth-ai-visibility-check — threaded with the answer-engine-optimization storyline (this is the 'measure' half to the AEO-formatting 'optimize' half)." }
        ]
      },
      { h: "News — the landscape: the chip rout snaps back, the agent economy gets a brokerage account, and Anthropic locks $35B of compute",
        intro: "Trust-critical domain — figures cross-checked against a 2nd source and marked directional where fast-moving.",
        blocks: [
          { sub: "The AI-chip sell-off found a floor fast — a V-shape, not a regime change (so far)", tags:["markets"],
            p: "What happened: after the <b>Jun 3–6 rout</b> — the iShares Semiconductor ETF (SOXX) fell roughly <b>10%</b> on the week, Nvidia briefly dropped under a <b>$5T</b> market cap, AMD/Intel shed double digits — AI-chip names <b>rebounded early the week of Jun 8</b>, with Intel and Micron up sharply intraday (each ~+10% on a single session) as investors refocused on reaffirmed hyperscaler capital plans (~$750B of 2026 capex) and Nvidia's pending S&P 500 inclusion. Why it matters to us: this is the same thread we've carried since Jun 8 — the market is grading AI <i>spend</i>, not AI <i>ambition</i> — and the snapback says the 'spend' worry was a repricing, not a thesis break. Our open call (the sell-off is a dip, not a regime change; due ~Jul 20) is now leaning <b>held</b>. The practical read for client work is unchanged and reinforced: lead every AI pitch with cost-per-outcome and a spend ceiling — buyers are in scrutiny mode, but they're not abandoning the build.",
            note: "Directional — intraday percentages move hour to hour and age fast (SOXX ~−10% week of Jun 3–6 and the early-week rebound corroborated across CNBC, Intellectia and Motley Fool; single-stock daily moves are snapshots). The durable fact is the V-shape + the why (a spend-scrutiny repricing that hyperscaler-capex reassurance reversed)." },
          { sub: "Coinbase for Agents: your AI assistant can now trade and pay — point it at a sandbox, not your main account", tags:["landscape"],
            p: "What happened (Jun 11): <b>Coinbase launched 'Coinbase for Agents'</b> — a standalone tool that lets AI assistants like <b>Claude and ChatGPT</b> execute crypto trades and pay for services with financial autonomy, working through an <b>MCP server</b>. You can connect it to your main account or, importantly, have it operate in a <b>separate sandbox account</b> so the agent never touches your primary funds. It rides the open <b>x402 payment protocol</b> (built with AWS, Anthropic, Circle and Near), which lets an agent pay for premium research APIs and on-demand compute with no login or subscription. Why it matters: this is our 'the agent grew up — autonomy gained money' thread crossing from demo into a mainstream consumer brokerage. The pattern to copy isn't 'let an AI trade your crypto' (not our craft) — it's the <b>safety scaffold</b>: a scoped sandbox, an open metered-payment rail, MCP as the access boundary. That's the same 'corporate card, not a blank check' discipline we apply to any spending agent.",
            note: "Confirmed across TechCrunch, CNBC, CoinDesk and SiliconANGLE (≥3 independent). The agentic-commerce sizing (~$8B in 2026) is a single projection — treat as directional. Not investment advice; flagged as a capability/landscape signal, not a trade." },
          { sub: "Anthropic locks $35B of TPU/data-center financing — compute is still the moat", tags:["landscape"],
            p: "What happened: <b>Anthropic</b> secured roughly <b>$35B</b> in debt financing to lease Google's custom <b>TPUs</b> across <b>five US data centers</b> (New York, Texas, Louisiana, Indiana). Apollo and Blackstone arranged the private-credit package via a special-purpose vehicle that buys the TPUs and leases them back; <b>Google provides payment guarantees</b> on the leased capacity and <b>Broadcom adds residual-value guarantees</b> on the chips — a layered backstop that de-risks the lenders. Why it matters to us: even with public AI equities just whipsawing, the hard money keeps flowing into <b>compute + power</b> — the binding constraint, not model cleverness. The structure (a lab leasing a hyperscaler's silicon, guaranteed by that hyperscaler and the chip designer) shows how tightly the leaders are now financially interlocked. It's a climate signal for where capability — and therefore the next wave of tooling and client demand — will concentrate.",
            note: "Corroborated across Bloomberg and The Information (with Business Standard summarizing); the exact $35B and the tranche structure are as reported by those outlets. Advances the 'compute/power = the moat' thread." }
        ]
      }
    ],
    sources: "<a href='https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/sibling-index' target='_blank' rel='noopener'>MDN — sibling-index()</a> · <a href='https://developer.mozilla.org/en-US/docs/Web/CSS/sibling-count' target='_blank' rel='noopener'>MDN — sibling-count()</a> · <a href='https://www.smashingmagazine.com/2026/05/mathematical-layouts-sibling-index-sibling-count/' target='_blank' rel='noopener'>Smashing Magazine — Mathematical layouts with sibling-index() and sibling-count()</a> · <a href='https://blog.logrocket.com/native-css-stagger-sibling-index/' target='_blank' rel='noopener'>LogRocket — Native CSS stagger animations with sibling-index()</a> · <a href='https://www.anthropic.com/product/claude-code' target='_blank' rel='noopener'>Anthropic — Claude Code</a> · <a href='https://code.claude.com/docs/en/skills' target='_blank' rel='noopener'>Claude Code Docs — Skills</a> · <a href='https://www.infoq.com/news/2026/05/code-with-claude/' target='_blank' rel='noopener'>InfoQ — Code with Claude: managed agents, proactive workflows</a> · <a href='https://www.semrush.com/free-tools/ai-search-visibility-checker/' target='_blank' rel='noopener'>Semrush — Free AI Search Visibility Checker</a> · <a href='https://www.semrush.com/kb/1626-ai-visibility-features' target='_blank' rel='noopener'>Semrush — AI Visibility features</a> · <a href='https://ahrefs.com/brand-radar' target='_blank' rel='noopener'>Ahrefs — Brand Radar</a> · <a href='https://intellectia.ai/blog/semiconductor-stocks-selloff-june-2026' target='_blank' rel='noopener'>Intellectia — June 2026 semiconductor sell-off</a> · <a href='https://www.fool.com/investing/2026/06/10/3-beaten-down-ai-chip-stocks-worth-a-closer-look-a/' target='_blank' rel='noopener'>Motley Fool — Beaten-down AI chip stocks after the sell-off (Jun 10)</a> · <a href='https://techcrunch.com/2026/06/11/coinbase-debuts-mcp-for-agent-trading/' target='_blank' rel='noopener'>TechCrunch — Coinbase debuts MCP for agent trading</a> · <a href='https://www.cnbc.com/2026/06/11/coinbase-launches-tool-to-let-ai-agents-manage-trading-and-payments.html' target='_blank' rel='noopener'>CNBC — Coinbase launches tool to let AI agents trade and pay</a> · <a href='https://www.coindesk.com/tech/2026/06/11/coinbase-launches-ai-agent-accounts-that-can-trade-and-spend-on-your-behalf' target='_blank' rel='noopener'>CoinDesk — Coinbase AI agent accounts</a> · <a href='https://siliconangle.com/2026/06/11/coinbase-agents-lets-ai-assistants-trade-crypto-move-money/' target='_blank' rel='noopener'>SiliconANGLE — Coinbase for Agents</a> · <a href='https://www.bloomberg.com/news/articles/2026-06-09/google-s-backstops-underpin-35-billion-chip-deal-for-anthropic' target='_blank' rel='noopener'>Bloomberg — Google backstops underpin $35B chip deal for Anthropic</a> · <a href='https://www.theinformation.com/articles/anthropic-pursues-first-data-center-leases-seeks-financial-backing-google' target='_blank' rel='noopener'>The Information — Anthropic pursues first data-center leases, Google backing</a>"
  },

  /* ===================== DAILY — Wed Jun 10 ===================== */
  {
    id: "2026-06-10-daily",
    type: "daily",
    week: "Week of Jun 8 – 14, 2026",
    title: "Daily Briefing — Wednesday, June 10",
    dateLabel: "Wednesday, June 10, 2026",
    sortDate: "2026-06-10",
    domains: ["web-dev", "paid", "social", "news"],
    tldr: [
      "<b>Dev play of the day: give your terminal AI real code intelligence.</b> GitHub Copilot CLI now drives <b>language servers (LSP)</b> — so the agent gets IDE-grade semantics (go-to-definition into dependencies, find-all-references, project-wide rename, type resolution) instead of grepping and guessing. Setup is itself an AI Skill: install the <b>LSP Setup skill</b>, say <code>\"set up LSP for Python\"</code>, run <code>/lsp</code>. Fewer hallucinated symbols, reliable renames, far less context burned.",
      "<b>Paid — read Meta's Opportunity Score before you touch a setting.</b> Meta rolled its <b>0–100 Opportunity Score</b> to all advertisers: a structural-health grade (creative variety, signal quality, audience breadth, conversion-event accuracy) that lets you triage an account in 10 seconds. And it <b>halved the Advantage+ learning-phase bar to ~25 conversions/week</b> (from 50) — so smaller accounts can finally run the unified flow. It grades setup, not results — keep judging on cost-per-purchase.",
      "<b>Social — write LinkedIn so AI search engines cite you.</b> Semrush analyzed <b>89K LinkedIn URLs cited in AI answers</b> (ChatGPT Search, Google AI Mode, Perplexity): LinkedIn is the <b>#2 most-cited domain</b> (behind Reddit), and the winners are <b>original 500–2,000-word articles</b>, posted consistently — not viral feed posts. LinkedIn is now a GEO surface; ~95% of cited content is original.",
      "<b>News — the AI-trade repricing rolls on.</b> AI-chip stocks kept sliding Jun 10 (MU −4%+, AMD −3.5%, NVDA/INTC −2%+) on higher-for-longer rate fears + geopolitics — the market is grading AI <i>spend</i>, not ambition. Yet private capital is rotating into <b>physical AI</b>: Neura Robotics raised <b>up to $1.4B</b> (Tether-led, with Nvidia/Amazon/Qualcomm) at a reported ~$7B valuation.",
      "<b>News — Claude Fable 5 is public, with a retention catch.</b> Anthropic's most capable model (~80.3% SWE-Bench) is now GA in GitHub Copilot, Bedrock and Databricks — but Fable-5-class models run under a <b>new 30-day data-retention policy</b> and <b>existing Zero-Data-Retention agreements don't apply</b>. Microsoft restricted it for employees over exactly this. Check which model your tools call before sending client-confidential data.",
      "<b>Sharpen your edge:</b> today's throughline is <i>verify the substrate before you trust the system</i> — give the agent the real code graph (LSP) so it stops guessing; read the setup score before optimizing; confirm a model's data terms before you feed it secrets. Capability is necessary; provenance and ground-truth are what make it safe to ship."
    ],
    sections: [
      { h: "Web dev — run it today: give your terminal AI real code intelligence (Copilot CLI + LSP)",
        blocks: [
          { sub: "GitHub Copilot CLI can now drive language servers — ask it to 'set up LSP for <language>' and it stops guessing", tags:["technique"],
            p: "What changed (Jun 2026): GitHub shipped a <b>Language Server Protocol (LSP)</b> integration for <b>Copilot CLI</b>, its terminal coding agent. Until now an agent in the terminal navigated your code by grep and heuristics — reading whole files into context and guessing at types. With a language server wired in, the agent gets the same precise, semantic understanding your IDE has: <b>go-to-definition</b> (including into third-party libraries), <b>find-all-references</b>, <b>project-wide rename</b>, type resolution across dependencies, and hover docs — returned as compact <i>structured</i> results instead of dumping entire files into the conversation. Setup is itself an <b>AI Skill</b>: GitHub ships an \"LSP Setup skill\" (a reusable markdown runbook with YAML frontmatter) that installs and configures the server for you, covering <b>14 languages</b>. Why it matters for our builds: agentic/terminal coding is where a lot of AI dev work now happens (CI fixes, refactors, headless agents), and the #1 failure mode is the agent hallucinating a symbol or editing the wrong call site because it never really \"saw\" the code graph. LSP turns the agent from a fuzzy text-searcher into something that actually resolves your types — fewer wrong edits, reliable renames, and far less context burned reading files it didn't need.",
            doIt: "(1) Install the <b>LSP Setup skill</b>: extract it to <code>~/.copilot/skills/</code> and restart Copilot CLI. (2) Ask in plain English — <code>set up LSP for Java</code> or <code>enable code intelligence for Python</code> — and the skill installs the right server (e.g. <code>npm i -g typescript typescript-language-server</code>, or <code>brew install jdtls</code> for Java) and writes config to <code>~/.copilot/lsp-config.json</code> (user) or <code>lsp.json</code> (repo). (3) Run <code>/lsp</code> to confirm the server is up. (4) Test it: ask the agent to \"find all references to <i>X</i>\" or \"rename <i>X</i> across the project\" and watch it resolve into your dependencies. (5) Commit the repo-level <code>lsp.json</code> so every teammate's agent shares the same code intelligence.",
            note: "It's the agentic-IDE version of a play we already keep — setup-as-a-Skill (a markdown runbook the AI loads on demand). Watch for Claude Code / Gemini CLI / Cursor to standardize an equivalent LSP hook (logged as a prediction). Card: card-webdev-copilot-cli-lsp." }
        ]
      },
      { h: "Paid — run it today: read Meta's Opportunity Score before you touch a single setting",
        blocks: [
          { sub: "Meta's 0–100 Opportunity Score is now in Ads Manager for everyone — and Advantage+ now qualifies at ~25 conversions/week, not 50", tags:["meta-ads"],
            p: "What changed: Meta rolled out the <b>Opportunity Score</b> to all advertisers — a <b>0–100</b> grade on each campaign in Ads Manager for how closely your setup follows Meta's best practices across four dimensions: <b>creative variety</b>, <b>signal quality</b> (Pixel / Conversions API), <b>audience breadth</b>, and <b>conversion-event accuracy</b>. Crucially it's a <i>structural health check, not a performance verdict</i> — a 95 means well-built, not profitable. Separately, Meta <b>halved the learning-phase bar</b> for Advantage+ Shopping/Sales: campaigns now qualify at <b>~25 conversions/week</b>, down from 50 — which makes the unified Advantage+ flow viable for far smaller budgets (this resolves the \"thresholds reportedly easing\" note we'd carried as directional since Jun 7). Why it matters for us: it's a 10-second triage before a call — open the account, sort by Opportunity Score, and the low scorers tell you exactly what's structurally broken (fragmented audiences, thin creative, a misconfigured Pixel) before you waste time eyeballing ROAS. And the lower conversion bar means clients you previously told \"you don't have the volume for Advantage+\" can now run it.",
            doIt: "(1) In Ads Manager, add the <b>Opportunity Score</b> column (or open a campaign's overview) and triage — anything <b>under ~60</b> has real structural gaps; aim for <b>80+</b>. (2) Raise it the documented way: turn on Advantage+ audience, placements and creative; upload a <b>deep, varied creative pool</b>; fix tracking with the <b>Conversions API</b>. (3) Treat the score as a setup checklist, NOT a KPI — keep judging delivery on cost-per-purchase, and keep one small manual ad set as your control to prove the AI's lift. (4) For smaller accounts, re-evaluate Advantage+ Sales now that ~25 conv/week clears the learning phase.",
            note: "Opportunity Score grades best-practice alignment, not results — a high score with weak creative still loses money. Treat the exact 25/week figure as directional; Meta's Help Center lags real behavior, so confirm on the account. Card updated: card-paid-meta-advantage-plus." }
        ]
      },
      { h: "Social — run it today: write LinkedIn so AI search engines cite you",
        blocks: [
          { sub: "Semrush analyzed 89K LinkedIn URLs cited by AI — LinkedIn is the #2 most-cited domain, and original 500–2,000-word articles win", tags:["technique"],
            p: "What changed: a new <b>Semrush</b> study (325,000 prompts across <b>ChatGPT Search, Google AI Mode and Perplexity</b>, Jan–Feb 2026) found <b>LinkedIn is the #2 most-cited domain in AI answers</b>, behind only Reddit — roughly <b>11% of AI responses cite a LinkedIn URL</b> (ChatGPT Search 14.3%, Google AI Mode 13.5%, Perplexity 5.3%). It reverse-engineers what gets cited: <b>articles dominate</b> (50–66% of cited LinkedIn content; feed posts 15–28%), with <b>500–2,000-word</b> articles cited most; <b>educational/advice</b> content is 54–64% of citations; cited posts had only <b>moderate engagement</b> (15–25 reactions — relevance beats virality); ~<b>75%</b> of cited authors post frequently (5+ posts / 4 weeks); and ~<b>95% of cited content is original</b> (reshares are just 5%). Why it matters for us: buyers increasingly ask ChatGPT/Perplexity \"who's good at X\" — and the answer is being pulled from LinkedIn. That makes LinkedIn a <b>Generative Engine Optimization (GEO)</b> surface, not a vanity feed: a client's or partner's LinkedIn presence is now a discovery channel into AI answers, and it's winnable with craft, not ad spend.",
            doIt: "(1) List the 3–5 questions a buyer would ask an AI in your space (\"best [service] for [use case]\", \"how to [outcome]\"). (2) For each, publish a LinkedIn <b>article</b> (not just a feed post) of <b>500–2,000 words</b> that answers it directly — lead with a clean one-sentence answer, then expand with original POV + your own data. (3) Post <b>consistently</b> — cited authors averaged 5+ posts in 4 weeks; you don't need virality, moderate relevant engagement is enough. (4) Reuse assets: paste a blog post or talk transcript into Claude and ask for a LinkedIn article in your voice (see the repurpose-with-Claude card), then add first-party numbers. (5) Spot-check: ask ChatGPT/Perplexity your target question and see whether you (or a competitor) get named — iterate.",
            note: "This is the social half of the AEO/GEO story we've tracked in growth — same principle (structure original, authoritative answers so a model can lift and attribute them), now on LinkedIn. Card: card-social-linkedin-ai-citations (threaded with the AEO content-formats card)." }
        ]
      },
      { h: "News — the landscape: the AI-trade repricing rolls on, robots get $1.4B, and Fable 5 ships with a retention catch",
        intro: "Trust-critical domain — figures cross-checked against a 2nd source and marked directional where fast-moving.",
        blocks: [
          { sub: "AI-chip stocks keep sliding — the 'grade the spend' regime, not a one-day dip", tags:["markets"],
            p: "What happened (Jun 10): the AI-chip complex kept falling — premarket, <b>MU −4%+, AMD −3.5%, NVDA and INTC −2%+</b> — extending last week's drop (the Nasdaq shed ~4% on a hot jobs report that revived \"higher-for-longer\" rate fears), with added pressure from US–Iran geopolitical headlines. Jensen Huang reiterated that AI-chip demand stays strong \"for years.\" Why it matters to us: this is the same thread we flagged Jun 8 — the market is now <b>grading AI spend, not AI ambition</b>. Our open call (the sell-off is a dip, not a regime change; due ~Jul 20) is still live and still under pressure. The practical read for client work: lead every AI pitch with cost-per-outcome and a spend ceiling (see the AI-gateway spend-limit card) — buyers are in scrutiny mode.",
            note: "Directional — intraday percentages move hour to hour and age fast (premarket Jun 10 via TipRanks; last week's Nasdaq −4% via Yahoo Finance). The durable fact is the direction + the why (rates + caution), corroborated across sources." },
          { sub: "Capital is rotating into embodied AI: Neura Robotics raises up to $1.4B", tags:["landscape"],
            p: "What happened: German humanoid-robotics maker <b>Neura Robotics</b> announced a Series C of <b>up to $1.4B</b> at a reported ~$7B valuation — said to be the largest round ever for a full-stack robotics company — led by <b>Tether</b> with <b>Nvidia, Amazon, Qualcomm, Bosch, Schaeffler</b> and the European Investment Bank participating (the full amount is milestone-contingent). Robotics startups have raised <b>$55.8B in 2026 YTD</b> (Dealroom), nearly double last year's record. Why it matters: even as public AI equities sell off, private capital is pouring into <b>physical AI</b> — the money is rotating from \"LLMs\" toward embodied/robotics and the power + compute to run it. A signal for where the next wave of tooling and client demand shows up, not a trade.",
            note: "Confirmed across CNBC, Tech.eu and Neura's own release; the ~$7B valuation is from a single anonymous source — treat as reported. \"Up to $1.4B\" is milestone-contingent, not all upfront." },
          { sub: "Claude Fable 5 is public — but it carries 30-day data retention, and Microsoft restricted it internally", tags:["landscape"],
            p: "What happened: Anthropic released <b>Claude Fable 5</b> publicly (Jun 9) — its most capable model, ~80.3% on SWE-Bench — now generally available in GitHub Copilot, AWS Bedrock and Databricks. The catch for teams handling sensitive data: Fable-5-class models run under a <b>new 30-day data-retention policy</b> (classifiers retain prompts/outputs for 30 days, flagged items up to two years), and <b>existing Zero-Data-Retention (ZDR) agreements do NOT apply to Fable 5 traffic.</b> Microsoft has <b>restricted Fable 5 for its own employees</b> — it's pulled from the internal Copilot model picker while legal reviews the change, while other Claude models that still run under ZDR remain available. Why it matters to us: this is the \"two gates\" rule in the wild — a model can pass the capability/cost gate (Fable 5 is excellent) and fail the data-provenance gate. If you or your tools route client-confidential material through Fable 5 expecting zero retention, that assumption is now wrong.",
            doIt: "Before pointing any client-data workflow at Fable 5: (1) check which model your tool / Copilot / IDE is actually calling (Fable 5 may be a new default in some pickers); (2) for confidential client material, prefer a Claude model still covered by ZDR (or another ZDR/enterprise path) until terms are confirmed; (3) read Anthropic's Mythos-class retention page and confirm your enterprise agreement's coverage in writing.",
            note: "Reported via The Verge/Reuters (Microsoft restriction) + Cybernews + Anthropic's own Help Center (retention terms) — corroborated. Card: card-ai-tooling-fable5-retention." }
        ]
      }
    ],
    sources: "<a href='https://github.blog/ai-and-ml/github-copilot/give-github-copilot-cli-real-code-intelligence-with-language-servers/' target='_blank' rel='noopener'>GitHub Blog — Give Copilot CLI real code intelligence with language servers</a> · <a href='https://docs.github.com/en/copilot/concepts/agents/copilot-cli/lsp-servers' target='_blank' rel='noopener'>GitHub Docs — Using LSP servers with Copilot CLI</a> · <a href='https://www.socialmediatoday.com/news/meta-launches-opportunity-score-all-advertisers/750231/' target='_blank' rel='noopener'>Social Media Today — Meta launches Opportunity Score to all advertisers</a> · <a href='https://socialbee.com/blog/facebook-updates/' target='_blank' rel='noopener'>SocialBee — 2026 Meta &amp; Facebook updates (Advantage+ 25-conversion threshold)</a> · <a href='https://www.semrush.com/blog/linkedin-ai-visibility-study/' target='_blank' rel='noopener'>Semrush — We analyzed 89K LinkedIn URLs cited in AI search</a> · <a href='https://ppc.land/semrush-maps-how-linkedin-content-earns-citations-in-ai-search-tools/' target='_blank' rel='noopener'>PPC Land — How LinkedIn content earns AI-search citations (Semrush)</a> · <a href='https://www.tipranks.com/news/why-ai-chip-stocks-nvda-mu-amd-intc-are-falling-today-june-10-2026' target='_blank' rel='noopener'>TipRanks — Why AI chip stocks NVDA/MU/AMD/INTC are falling (Jun 10, 2026)</a> · <a href='https://www.cnbc.com/2026/06/10/neura-robotics-funding-ai-humanoid-robots.html' target='_blank' rel='noopener'>CNBC — Neura Robotics raises up to $1.4B from Nvidia, Amazon and others</a> · <a href='https://tech.eu/2026/06/10/neura-robotics-secures-up-to-14b-series-c-to-scale-physical-ai-and-cognitive-robotics-platform/' target='_blank' rel='noopener'>Tech.eu — Neura Robotics secures up to $1.4B Series C</a> · <a href='https://www.theverge.com/report/947575/microsoft-claude-fable-5-restricted-internally' target='_blank' rel='noopener'>The Verge — Microsoft restricts Claude Fable 5 internally over data retention</a> · <a href='https://techcrunch.com/2026/06/09/anthropic-released-claude-fable-5-its-most-powerful-model-publicly-days-after-warning-ai-is-getting-too-dangerous/' target='_blank' rel='noopener'>TechCrunch — Anthropic releases Claude Fable 5 publicly</a> · <a href='https://support.claude.com/en/articles/15425996-data-retention-practices-for-mythos-class-models' target='_blank' rel='noopener'>Anthropic — Data retention practices for Mythos-class models</a> · <a href='https://cybernews.com/ai-news/claude-fable-five-data-retention-collection/' target='_blank' rel='noopener'>Cybernews — Fable 5 data retention: no exceptions</a>"
  },

  /* ===================== DAILY — Tue Jun 9 ===================== */
  {
    id: "2026-06-09-daily",
    type: "daily",
    week: "Week of Jun 8 – 14, 2026",
    title: "Daily Briefing — Tuesday, June 9",
    dateLabel: "Tuesday, June 9, 2026",
    sortDate: "2026-06-09",
    domains: ["web-design", "graphic", "email", "web-dev", "news"],
    tldr: [
      "<b>Design play of the day: draw dividers between grid/flex items with one line of CSS — no more pseudo-element hacks.</b> Chrome 149 (stable, Jun 2) shipped <b>CSS Gap Decorations</b>: the old <code>column-rule</code> now works inside Grid and Flexbox, and there's a new <code>row-rule</code> — both paint lines <i>in the gap</i> with the familiar <code>width style color</code> shorthand. It's decorative, so it's pure progressive enhancement: unsupported browsers just show an empty gap. Ship it to production today.",
      "<b>Graphic — stop fighting AI typo-soup: prompt Ideogram 4.0 with JSON, not a sentence.</b> Ideogram's new open-weight 4.0 (Jun 3) was trained on structured JSON captions, so you declare your headline copy, exact <b>hex palette</b> (up to 16), and each element's <b>bounding box</b> as data — and the in-image text actually comes out spelled right (~0.97 OCR). Templatable: swap the <code>text</code> + colours, keep the layout.",
      "<b>Email — wire Omnisend into Claude as an MCP connector and audit your whole program in plain English.</b> Omnisend shipped a hosted MCP server (<code>mcp.omnisend.com/mcp</code>); add it to Claude as a custom connector and ask \"rank my last 30 days of campaigns by revenue and flag the three with the worst deliverability\" against your live account — no exports, no spreadsheet. Connect it in ~5 minutes.",
      "<b>Dev — patch-and-rotate Tuesday: your AI coding toolchain is the attack surface.</b> Two same-day (Jun 8) threats hit dev teams directly: password-stealing malware that fires when certain compromised Microsoft OSS repos are <i>opened inside Claude Code / Gemini CLI / VS Code</i>, and a one-character Linux <code>nf_tables</code> kernel bug (CVE-2026-23111) with a now-public local-root exploit. Confirm your kernels are on the post-Feb-5 patch and rotate any tokens used in AI coding apps.",
      "<b>News — Apple's WWDC \"sell the news,\" and the EU pries WhatsApp open.</b> Apple slid ~2–3% after unveiling a new Gemini-assisted Siri/Apple Intelligence architecture with no firm ship date (directional). The EU ordered Meta to restore free WhatsApp Business API access to <i>rival</i> AI chatbots within 5 working days (or face fines up to 10% of global turnover) — the bloc's first interim antitrust measure in 17 years. And Google shipped Gemini 3.5 Live Translate (near-real-time speech-to-speech, 70+ languages).",
      "<b>Sharpen your edge:</b> today's throughline is <i>declare your intent as data, then let the system run</i> — a JSON design brief, an MCP query over your live numbers, a CSS rule that degrades on its own. The same discipline that makes those compound is what keeps you safe: know exactly what your AI tools can touch, and rotate the keys when they're breached."
    ],
    sections: [
      { h: "Web design — run it today: grid & flex dividers in one line of CSS",
        blocks: [
          { sub: "Chrome 149 shipped CSS Gap Decorations — column-rule/row-rule now work in Grid & Flexbox", tags:["technique"],
            p: "What changed (Jun 2, stable): Chrome and Edge 149 shipped <b>CSS Gap Decorations</b>. The <code>column-rule</code> property — which for years only worked in multi-column layouts — now paints lines inside a <b>Grid</b> or <b>Flexbox</b> gap, and there's a brand-new <code>row-rule</code> for horizontal lines. Both take the same one-line shorthand you already know from columns: <code>width style color</code> (e.g. <code>1px solid #ddd</code>). Why it matters for our builds: every design system carries the same scar tissue — separators between cards, a sidebar/content split, rows in a dashboard or pricing table — today faked with extra <code>&lt;div&gt;</code>s, <code>::before</code>/<code>::after</code> pseudo-elements, or background-gradient tricks that shatter the moment items wrap or the count changes. This deletes all of it. And because the rules are purely decorative, it's pure progressive enhancement: browsers that don't support it just render an empty gap, so there's zero-risk to ship it to production now.",
            doIt: "On any grid/flex container that already has a <code>gap</code>, add the lines directly: <code>.cards { display:grid; grid-template-columns:repeat(3,1fr); gap:2rem; column-rule:1px solid #ddd; row-rule:1px solid #ddd; }</code>. Want lines <i>only between</i> items (not trailing past the last one when a row is short)? Add <code>column-rule-visibility-items: visible</code> / <code>row-rule-visibility-items: visible</code>. Width, colour and inset all animate, so a hover flourish is one transition: <code>.cards{transition:column-rule-color .3s} .cards:hover{column-rule-color:#3b82f6}</code>. No <code>@supports</code> guard needed.",
            note: "Honest caveat: as of now this is Chromium-only (Chrome/Edge 149) — not yet Baseline-wide. Use it strictly as decorative enhancement, never as a load-bearing layout element, until Safari/Firefox follow. A polyfill is reportedly in development." }
        ]
      },
      { h: "Graphic — run it today: JSON-prompt your layouts in Ideogram 4.0",
        blocks: [
          { sub: "Ideogram 4.0 is trained on structured JSON — declare the headline, the hex palette and each element's box", tags:["technique"],
            p: "What changed (Jun 3): Ideogram shipped <b>4.0</b>, its first <b>open-weight</b> (9.3B-param) text-to-image model. The headline for designers isn't \"prettier pictures\" — it's that the model was <b>trained exclusively on structured JSON captions</b>, so you prompt it like a design brief, not a sentence. You hand it a JSON object with: typed <b>text layers</b> (the literal string to render + a separate styling description — so multi-line in-image text actually comes out spelled right, ~0.97 OCR accuracy, best of any open-weight model); per-element <b>bounding boxes</b> on a 0–1000 grid (<code>[y_min, x_min, y_max, x_max]</code>, origin top-left) so the headline, subhead and logo land exactly where you place them; and <b>colour-palette conditioning</b> — up to 16 hex codes globally, 5 per element. Why it matters: it kills the two most annoying failure modes of AI image gen for real design work — garbled in-image text and \"it ignored my layout.\" Declare the copy, the position and the brand hexes as data and it's repeatable: swap the <code>text</code> + <code>color_palette</code> fields and you've got a templated pipeline for posters, packaging, signage or a 50-card set.",
            doIt: "Generate at <b>ideogram.ai</b> (or the API at developer.ideogram.ai) with a JSON object, not prose. Use the trained schema: a top-level <code>high_level_description</code>, a <code>style_description</code> (with <code>color_palette</code> = your brand hexes), and a <code>compositional_deconstruction</code> whose <code>elements</code> array carries each <code>{type:\"text\", bbox:[…], text:\"GOLDCREST\", desc:\"bold serif caps, centered top\"}</code>. Keep the key order intact (<code>type</code> → <code>bbox</code> → <code>text</code>/<code>desc</code>) — out-of-order keys degrade quality. Iterate by editing only the wrong field (nudge a <code>bbox</code>), not by re-describing the whole image. To produce a series, script the <code>text</code> + <code>color_palette</code> swaps over one fixed layout.",
            note: "Licence caveat for client work: the open weights are <b>non-commercial</b>, so the local/ComfyUI route is for prototyping only — run commercial output through the ideogram.ai web app or API (commercial tiers). The web-app JSON workflow is the safe run-it-today path." }
        ]
      },
      { h: "Email — run it today: query your live email program in plain English via MCP",
        blocks: [
          { sub: "Omnisend shipped a hosted MCP server — connect it to Claude and audit campaigns/deliverability without exports", tags:["technique"],
            p: "What changed (Jun 4): Omnisend shipped a hosted <b>MCP</b> (Model Context Protocol) server at <code>https://mcp.omnisend.com/mcp</code>. Point an MCP-capable AI client (Claude or ChatGPT) at it and the model can read your <i>live</i> Omnisend data — campaign performance, deliverability diagnostics, subject-line insights, automation-revenue breakdowns, form/subscriber data — and answer in natural language. Why it matters: this kills the export-to-spreadsheet loop that eats an email operator's morning. Instead of clicking through dashboards, you ask \"rank my last 30 days of campaigns by attributed revenue and flag the three with the worst deliverability, with one fix each\" and get an answer grounded in your real account. You can also stand up a zero-code lifecycle trigger (\"summarise each day's new form subscribers into a Gmail draft\") without touching Zapier. It's the same \"controls collapse into AI defaults\" move we've tracked in paid and dev — now in the ESP.",
            doIt: "Connect it in ~5 minutes: (1) in Claude, open the left menu → <b>Customize → Connectors</b>; (2) click <b>+ → Add custom connector</b>, name it <code>Omnisend</code>, paste <code>https://mcp.omnisend.com/mcp</code>, click <b>Add</b>; (3) select it → <b>Connect</b> and complete the Omnisend <b>OAuth</b> sign-in (no API key to copy); (4) in a new chat: \"Use the Omnisend connector — give me an account snapshot, rank last 30 days of campaigns by revenue, and flag any with deliverability issues plus one fix each.\" Always review AI-drafted sends before they go.",
            note: "The <i>native</i> one-click Claude connector is \"coming soon\" — the runnable path today is the custom-connector method above. Watch for Klaviyo / Mailchimp / HubSpot to ship their own ESP MCPs next (logged as a prediction)." }
        ]
      },
      { h: "Web dev — run it today: patch-and-rotate your AI coding toolchain",
        intro: "A scan promoted to a beat: two same-day (Jun 8) threats land squarely on dev teams, and both have a concrete action.",
        blocks: [
          { sub: "Compromised Microsoft OSS repos drop password-stealers when opened inside AI coding tools", tags:["security"],
            p: "What happened: researchers (Cloudsmith, OpenSourceMalware) flagged a <b>re-compromise</b> of Microsoft open-source projects — 70+ repos were disabled — where password-stealing malware fires when an affected repo is <b>opened inside an AI coding environment</b> (Claude Code, Gemini CLI, VS Code). Why it matters to us: the threat model has shifted. \"Don't run untrusted code\" used to mean executing it; now merely <i>opening</i> a poisoned repo in an agentic IDE — which may auto-run tasks, read env files, or execute setup scripts — is enough to exfiltrate the tokens and secrets sitting in your AI dev session. Our AI toolchain is now part of the attack surface.",
            doIt: "Today: (1) audit recent pulls/clones of Microsoft/Azure OSS repos (the Durable Task project was named); (2) <b>rotate</b> any credentials, API keys or tokens that have been present in a Claude Code / Gemini CLI / VS Code session that touched untrusted repos; (3) treat \"open a repo in an agentic IDE\" as code execution — clone unknown repos into a sandbox/devcontainer with no live secrets first." },
          { sub: "A one-character Linux kernel bug (CVE-2026-23111) now has a public local-root exploit", tags:["security"],
            p: "What happened: a single errant character in the Linux kernel's <code>nf_tables</code> netfilter code (CVE-2026-23111, CVSS ~7.8) allows a local attacker to escalate to <b>root</b>. It was patched upstream on Feb 5, but on Jun 8 a fully weaponised, reportedly &gt;99%-reliable exploit was published — which sharply raises the urgency for anything still unpatched, especially multi-tenant and container hosts. Why it matters: if you run your own VPS, build runners, or container infra, an unpatched kernel is now a one-step local-root for anyone who lands a foothold.",
            doIt: "Confirm your distro kernels are on the <b>post-Feb-5</b> patch level (Debian, Ubuntu and RHEL all issued advisories) and prioritise multi-tenant/container hosts; a quick <code>uname -r</code> + your distro's security tracker tells you if you're exposed.",
            note: "Directional on the exploit reliability figure (the vendor's own claim); the durable facts are the patched-Feb-5 fix and the Jun-8 public exploit — both corroborated across security press." }
        ]
      },
      { h: "News — the landscape: WWDC \"sell the news,\" the EU pries WhatsApp open",
        intro: "Trust-critical domain — figures cross-checked against a 2nd source and marked directional where fast-moving.",
        blocks: [
          { sub: "Apple slides after a Siri-AI reveal with no ship date — and a Gemini assist", tags:["markets"],
            p: "What happened: at WWDC (Jun 8) Apple unveiled a re-architected <b>Siri / Apple Intelligence</b> — reportedly built in collaboration with <b>Google's Gemini</b> models — but without a firm consumer ship date, and the stock did the classic \"sell the news,\" sliding ~2% on Jun 8 and drifting toward ~3% lower on Jun 9. Why it matters to us: Apple is now being priced as an AI company (P/E re-rated well above its historical norm), and the tell for anyone building on Apple platforms is strategic — Apple is willing to lean on a direct competitor's model to close its AI gap. That reshapes which on-device vs cloud AI capabilities you can assume in client work over the next year.",
            note: "Directional: the intraday percentages move across the two sessions and age fast (sourced ~1.9% Jun 8 via Yahoo Finance coverage, &gt;3% Jun 9 via GuruFocus). The \"Gemini powers Siri\" detail is reported (Bloomberg/Business Standard) but not stated in writing by Apple — treat as reported, not confirmed." },
          { sub: "EU orders Meta to reopen WhatsApp to rival AI chatbots — its first interim antitrust measure in 17 years", tags:["landscape"],
            p: "What happened: EU regulators ordered Meta to <b>restore free WhatsApp Business API access to competing AI chatbots</b> (the order names rivals including Poke/The Interaction Company and France's Agentik) within <b>5 working days</b>, or face fines up to <b>10% of global annual turnover</b>, while it probes whether Meta abused its market power by blocking them. Meta says it will appeal. Why it matters: WhatsApp is a primary customer-comms channel in much of the world; if third-party AI assistants get guaranteed API access, building or recommending an AI chat agent on WhatsApp becomes materially less platform-risky — a real opening for marketing/CX work.",
            doIt: "If a client's CX or lifecycle plan has been waiting on \"can we even run an AI assistant on WhatsApp without Meta cutting us off?\", flag this as the regulatory wind shifting in your favour — but scope it as <i>emerging</i> until the appeal resolves.",
            note: "Reported via Reuters (carried on Yahoo Finance) + PYMNTS; the 5-working-day window and 10%-turnover ceiling are the EU's stated terms." },
          { sub: "Also shipped: Google's Gemini 3.5 Live Translate (near-real-time speech-to-speech, 70+ languages)", tags:["landscape"],
            p: "What shipped: Google released <b>Gemini 3.5 Live Translate</b> — continuous speech-to-speech translation that auto-detects 70+ languages, available now in the Gemini Live API + AI Studio (public preview), the Google Translate apps, and Meet (enterprise preview), with SynthID watermarking. Why it matters: real-time multilingual is now an API call, which lowers the bar for multilingual creator content, localized support, and live-event workflows — a capability to keep in the back pocket for any team shipping to non-English audiences.",
            note: "Confirmed via Google's official blog.google announcement." }
        ]
      }
    ],
    sources: "<a href='https://developer.chrome.com/blog/gap-decorations-stable' target='_blank' rel='noopener'>Chrome for Developers — Gap decorations now in Chromium (149)</a> · <a href='https://developer.chrome.com/release-notes/149' target='_blank' rel='noopener'>Chrome 149 release notes</a> · <a href='https://developer.chrome.com/blog/gap-decorations' target='_blank' rel='noopener'>Chrome — A new way to style gaps in CSS</a> · <a href='https://ideogram.ai/blog/ideogram-4.0/' target='_blank' rel='noopener'>Ideogram — 4.0 (open-weight, JSON-prompted)</a> · <a href='https://github.com/ideogram-oss/ideogram4/blob/main/docs/prompting.md' target='_blank' rel='noopener'>Ideogram 4 — prompting schema (GitHub)</a> · <a href='https://support.omnisend.com/en/articles/15096086-connect-omnisend-mcp-to-ai-tools' target='_blank' rel='noopener'>Omnisend — Connect MCP to AI tools</a> · <a href='https://www.omnisend.com/ai/mcp/' target='_blank' rel='noopener'>Omnisend MCP — product page</a> · <a href='https://techcrunch.com/2026/06/08/microsofts-open-source-tools-were-hacked-to-steal-passwords-of-ai-developers/' target='_blank' rel='noopener'>TechCrunch — Microsoft OSS tools hacked to steal AI-dev passwords</a> · <a href='https://thehackernews.com/2026/06/one-character-linux-kernel-flaw-enables.html' target='_blank' rel='noopener'>The Hacker News — one-character Linux kernel root flaw (CVE-2026-23111)</a> · <a href='https://www.foreignpolicyjournal.com/2026/06/09/apple-nasdaq-aapl-stock-price-drops-nearly-2-after-wwdc-ai-siri-and-apple-intelligence-reveal/' target='_blank' rel='noopener'>Apple stock drops after WWDC Siri AI reveal</a> · <a href='https://finance.yahoo.com/sectors/technology/articles/eu-regulators-order-meta-allow-152148284.html' target='_blank' rel='noopener'>Reuters/Yahoo — EU orders Meta to allow rival AI bots on WhatsApp</a> · <a href='https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-live-3-5-translate/' target='_blank' rel='noopener'>Google — Gemini 3.5 Live Translate</a>"
  },

  /* ===================== DAILY — Mon Jun 8 ===================== */
  {
    id: "2026-06-08-daily",
    type: "daily",
    week: "Week of Jun 8 – 14, 2026",
    title: "Daily Briefing — Monday, June 8",
    dateLabel: "Monday, June 8, 2026",
    sortDate: "2026-06-08",
    domains: ["web-dev", "news", "growth"],
    tldr: [
      "<b>Dev play of the day: put a hard dollar cap on your AI bill.</b> Cloudflare's AI Gateway just shipped <b>spend limits</b> — set a real budget per model, app, team or user, and when it's hit, requests either stop or quietly fail over to a cheaper fallback model so nobody's workflow breaks. Open beta, every plan, ~20 minutes to wire up.",
      "<b>News — the market is repricing the AI trade.</b> A soft AI-chip forecast from Broadcom (it guided ~$16B vs the ~$17.2B Street wanted, stock −12%) triggered a rotation out of AI names: on Jun 8 in Asia, SoftBank fell ~6%, Samsung ~10%, SK Hynix ~8%, dragging the Kospi down as much as 8%. The takeaway for us isn't to trade it — it's that <i>AI spend is now under a microscope</i>, which is exactly why today's dev play matters.",
      "<b>Growth — new research says AI answer engines cite some formats far more than others.</b> Two 2026 datasets (HubSpot's State of AEO + Wix Studio's AI Search Lab, 1M+ citations) found only three formats clear a 65% citation rate: product/landing pages (68.5%), blog posts (~67%) and listicles (66%) — and pages win citations when they pair an intent-matched title (<i>What is X / X vs Y / How to X / Best X</i>) with original stats, a visible last-updated date, and an FAQ. Reformat one money page today.",
      "<b>Also building (news):</b> fusion startup <b>Helion</b> raised a $465M Series G at a $15.5B valuation (nearly 3× its last round) to commercialize fusion this decade — the clearest sign yet that the bottleneck behind the AI trade is <i>power</i>, not just chips.",
      "<b>Sharpen your edge:</b> the throughline across all three — the market is now grading AI <i>spend</i>, not just AI <i>ambition</i>. Govern your own before a platform (or a budget review) does it for you: cap the bill, and make every page you publish earn its citation."
    ],
    sections: [
      { h: "Web dev — run it today: a hard dollar cap on your AI spend",
        blocks: [
          { sub: "Cloudflare AI Gateway now enforces budgets in dollars, not just request counts", tags:["technique"],
            p: "What changed (Jun 5): Cloudflare's <b>AI Gateway</b> added <b>spend limits</b> — cost-based budgets that track real cumulative dollar spend (computed from each model's token pricing) and act when you cross the line. This is different from rate limiting: rate limits cap <i>how many</i> requests; spend limits cap <i>how much money</i>. Why it matters for our builds: the #1 fear shipping anything LLM-backed — a chatbot, a RAG feature, an agent — is a runaway loop or a traffic spike quietly burning four figures overnight. A real ceiling turns 'we daren't ship AI to production' into 'ship it, it can't cost more than $X.' It lands the same week the market is punishing loose AI spend (see the news beat) — controlling your unit economics is suddenly a feature, not an afterthought.",
            doIt: "Wire it up in ~20 minutes: (1) route your app's LLM calls through an AI Gateway endpoint (you proxy your OpenAI/Anthropic/etc. calls through Cloudflare); (2) in the gateway's settings (dashboard or API) add a <b>spend limit</b> and scope it — by <code>model</code>, <code>provider</code>, or a custom attribute like <code>user</code>/<code>team</code>/<code>app</code> (e.g. <code>$2,000/mo</code> for senior engineers, <code>$500/mo</code> for everyone else, or <code>$50/day</code> on one expensive model); (3) pick a window — daily/weekly/monthly, fixed (resets 1st of month / Monday / midnight) or rolling; (4) choose the over-limit behavior: <b>block</b> by default, or use a <b>Dynamic Route</b> to fail over to a cheaper fallback model so a hard cap doesn't kill the workflow. Start with a generous monthly cap on your highest-cost model and tighten from real numbers.",
            note: "It's open beta on all plans as of Jun 5. Treat the cost figures as Cloudflare's own pricing math — reconcile against your provider's invoice for the first month before you trust the cap to the dollar." }
        ]
      },
      { h: "News — the AI trade gets repriced; the bottleneck is power",
        intro: "Trust-critical domain — figures cross-checked against a 2nd source and marked directional where fast-moving.",
        blocks: [
          { sub: "A soft Broadcom forecast rotated money out of AI names", tags:["markets"],
            p: "What happened: Broadcom's Q2 FY26 print was strong on paper — revenue ~$22.2B, up ~48% YoY on AI demand — but its forward <b>AI-semiconductor</b> guide of ~$16B came in under the ~$17.2B analysts wanted, and the stock fell ~12% after hours (reported Jun 3). That miss-on-expectations, plus 'higher-for-longer' rate worries after a hot U.S. jobs print, sparked a rotation <i>out</i> of AI-linked equities. By Jun 8 in Asia it had spread: SoftBank −~6%, Samsung Electronics −~10%, SK Hynix −~8%, with chip-heavy Korea's Kospi down as much as ~8% (those two names are 40%+ of the index). Why it matters to us: not as a trading tip — as a <b>climate signal</b>. The era of 'spend anything on AI and the market cheers' is pausing; budgets, unit economics and provable ROI are back in fashion. That reframes how clients will scrutinize the AI features we build and pitch this quarter.",
            note: "Directional: intraday index/stock moves shift hour to hour. The durable fact is the rotation and the why (a guidance miss + rates), corroborated across CNBC and the Broadcom earnings coverage — not any single percentage." },
          { sub: "Where the money still flooded in: power for compute (Helion's $465M)", tags:["funding"],
            p: "Counter-signal, same week: fusion-energy startup <b>Helion</b> raised a <b>$465M Series G at a $15.5B post-money valuation</b> (nearly 3× its prior round; ~$1.5B raised to date), led by Thrive Capital, to push toward commercial fusion this decade — its Polaris prototype became the first privately funded machine to run on deuterium-tritium fuel. Read alongside the week's other infra bets (PhysicsX's $300M Series C at $2.4B for AI-designed hardware; Nvidia–SK Hynix and Nvidia–LG memory/data-center pacts), the throughline is clear: investors are cooling on AI <i>application</i> valuations while still pouring into the <b>physical bottleneck — power and memory</b>. The compute story is becoming an energy story.",
            doIt: "Operator takeaway: when you scope an AI feature for a client this quarter, lead with <b>cost-per-outcome and a spend ceiling</b> (see today's Cloudflare play), not raw capability — that's the framing a repricing market now rewards, and it's what will get budget approved." }
        ]
      },
      { h: "Growth — run it today: format a page so AI answer engines actually cite it",
        blocks: [
          { sub: "New research on 1M+ AI citations shows which formats win — and the recipe to copy", tags:["technique"],
            p: "What changed: two independent 2026 studies — HubSpot's <i>State of AEO 2026</i> and Wix Studio's <i>AI Search Lab</i>, analyzing 1M+ AI citations between them — quantified which on-page formats answer engines (AI Overviews, Gemini, ChatGPT, Perplexity) cite most. Only three formats clear a ~65% average citation rate: <b>product/landing pages (68.5%)</b>, <b>blog posts (~67%)</b>, and <b>listicles (66%)</b>; comparison pages sit just behind (~63%) but win <b>ChatGPT</b> specifically. Why it matters: AI search is now a real discovery channel, and citations — being named as the source inside the AI answer — are starting to matter more than classic backlinks for visibility. The lever isn't 'write more,' it's <b>structure what you have so a model can lift a clean, attributable chunk.</b>",
            doIt: "Pick one page that should be winning AI mentions and reformat it in ~30 minutes: (1) match the <b>title to the query intent</b> the engines reward — <code>What is X</code>, <code>X vs Y</code>, <code>How to X</code>, or <code>Best X</code>; (2) lead each section with a <b>direct one-sentence answer</b>, then expand (engines lift the first clean sentence); (3) convert dense prose into a <b>list or comparison table</b> — pre-chunked, easy to extract; (4) add <b>original/first-party stats</b> (your own benchmark or survey number) — proprietary data is what gets attributed to <i>you</i>; (5) add an <b>FAQ block with FAQ schema</b>, a visible <b>last-updated date</b>, and an <b>author bio</b>. Then check whether ChatGPT/Perplexity cite you for the target question, and iterate.",
            note: "Match format to the query's intent, the strongest predictor in the Wix data: <b>informational</b> questions cite <b>articles</b> ~2.7× more, while <b>commercial</b> ('best…', comparison) questions cite <b>listicles</b> for ~40% of citations. AEO isn't a separate site — it's a formatting pass on pages you already have; start with your highest-intent money pages, not the blog archive." }
        ]
      }
    ],
    sources: "<a href='https://blog.cloudflare.com/ai-gateway-spend-limits/' target='_blank' rel='noopener'>Cloudflare — AI Gateway spend limits</a> · <a href='https://developers.cloudflare.com/changelog/post/2026-06-05-spend-limits/' target='_blank' rel='noopener'>Cloudflare Changelog — Control AI costs with spend limits</a> · <a href='https://www.cnbc.com/2026/06/08/softbank-samsung-tech-ai-stocks-asia-fall.html' target='_blank' rel='noopener'>CNBC — Asia tech sell-off, SoftBank down</a> · <a href='https://www.cnbc.com/2026/06/03/broadcom-avgo-earnings-report-q2-2026.html' target='_blank' rel='noopener'>CNBC — Broadcom Q2 2026 earnings</a> · <a href='https://www.helionenergy.com/newsroom/helion-raises-465-million-series-g-funding-round-to-meet-surging-global-demand-for-power' target='_blank' rel='noopener'>Helion — $465M Series G</a> · <a href='https://www.axios.com/pro/climate-deals/2026/06/04/helion-465-million-fusion-thrive' target='_blank' rel='noopener'>Axios — Helion $15.5B valuation</a> · <a href='https://blog.hubspot.com/marketing/content-format-types-that-earn-citations' target='_blank' rel='noopener'>HubSpot — Content formats answer engines favor [research]</a> · <a href='https://www.wix.com/studio/ai-search-lab/research/content-types-most-cited-by-llms' target='_blank' rel='noopener'>Wix Studio AI Search Lab — content types most cited by LLMs</a> · <a href='https://blog.hubspot.com/marketing/citations-in-aeo' target='_blank' rel='noopener'>HubSpot — Why citations matter more than backlinks for AI</a>"
  },

  /* ===================== WEEKLY SUMMARY — Issue #3 ===================== */
  {
    id: "2026-06-07-weekly",
    type: "weekly",
    week: "Week of Jun 1 – 7, 2026",
    title: "Weekly Briefing — Issue #3",
    dateLabel: "Week of Jun 1 – Jun 7, 2026",
    sortDate: "2026-06-07",
    domains: ["ai-tooling", "web-dev", "web-design", "paid", "social"],
    pdf: "reports/pdf/weekly-ai-report-2026-06-07.pdf",
    tldr: [
      "<b>The week in one idea: the controls collapsed into AI defaults — across model vendors, ad platforms, and the browser — so the edge moved from <i>operating</i> the controls to <i>governing</i> the system.</b> Every domain that moved this week told the same story: the manual lever is being retired; the win is setting the system up once and keeping one guarded control to prove the AI's lift.",
      "<b>AI/all — build your personal AI operating system:</b> a two-gate model router, a 5-task frozen eval you can run on any new model in an hour, a persistent-memory loop, a private local model (Ollama), and grounded doc Q&A (NotebookLM). Five dailies this week were really one system — stand it up.",
      "<b>Paid — your SOPs are out of date this week.</b> Meta merged Manual + Advantage+ into one <i>Sales</i> flow (ASC is gone) and Google auto-links your YouTube channel after <b>Jun 10</b> unless you opt out. Two assignable actions below.",
      "<b>Design + Dev — two free, zero-risk upgrades:</b> Apple-smooth squircle corners in one line of CSS (<code>corner-shape</code>), and teach Copilot your conventions once with <code>.github/copilot-instructions.md</code>.",
      "<b>Social — the ranking lever moved:</b> Instagram now distributes on <b>sends per reach</b> (private DM shares), not likes. Brief for the forward, measure Sends.",
      "<b>Sharpen your edge:</b> the connective thread — never hand the AI the wheel without a control. A manual ad set, a frozen eval, a reviewed memory merge, a graceful CSS fallback: each one is how you trust the default without being trapped by it."
    ],
    sections: [
      { h: "The week in one idea: the controls collapsed into AI defaults",
        blocks: [
          { sub: "Stop operating the levers — start governing the system",
            p: "Pull the week's moves together and they rhyme. Meta retired the standalone Advantage+ Shopping campaign and made AI-on the default Sales flow. Google is auto-linking YouTube and pushing AI Max into more formats. Model vendors shipped persistent memory (ChatGPT 'dreaming') and ~100×-cheaper open weights so the model itself is becoming a commodity default. Even the browser shipped a 'premium' visual default (squircle corners) for one line of CSS. The manual lever — building the audience by hand, picking the one model, re-prompting your conventions every time — is being retired across crafts.",
            note: "Synthesis, not recap: the five dailies this week weren't five unrelated tips. They were one shift seen from five disciplines." },
          { sub: "So the operator edge moved up a level",
            p: "When the platform does the optimizing, operating the controls is no longer the skill — <b>governing the system is.</b> That means: choose and judge the model (router + standing eval), give it memory and your conventions, design your inputs for the signal the AI now ranks on (the DM share, a deep creative pool), and — the non-negotiable — keep <b>one guarded manual control</b> to prove the AI's lift on YOUR work before you trust it. Set it up once; verify; then let it run.",
            doIt: "This week's homework, in one sentence each: stand up a model router + frozen eval (AI), add a repo conventions file (dev), ship one squircle (design), fix your Meta SOPs + the Jun 10 YouTube check (paid), rewrite one brief for sends (social). Details below." }
        ]
      },
      { h: "What changed, and what to do — by domain",
        intro: "One tight synthesis per domain that actually moved this week. Quiet domains (graphic, email, growth) are skipped on purpose.",
        blocks: [
          { sub: "AI tooling — five dailies that are really one system", tags:["ai-tooling"],
            p: "The week's AI plays compound into a personal operating system, not a pile of tips: <b>Ollama</b> for free/private work your data can't leave the laptop for; a <b>two-gate model picker</b> (capability/cost, then data/jurisdiction); a <b>release-day verdict kit</b> — 5 frozen real tasks you re-run on any new model to get a yes/no in an hour; a <b>persistent-memory loop</b> (distill each session to JSON, re-inject next time) so you stop re-explaining yourself; and <b>NotebookLM</b> for grounded, cited Q&A over your own documents.",
            doIt: "Pick the two with the highest leverage and do them this week: (1) write your <b>model router</b> — one row per recurring task, the cheapest model that passes a quick eval, re-checked monthly; (2) freeze <b>5 of your real tasks</b> as a scored set so the next model launch is a one-hour decision, not a week of vibes. The rest (memory loop, Ollama, NotebookLM) layer on top.",
            note: "Why it compounds: models keep getting cheaper and more interchangeable, so the durable value isn't picking today's winner — it's the harness that lets you swap winners safely." },
          { sub: "Web dev — teach Copilot your conventions once", tags:["web-dev"],
            p: "The same 'govern the default' move shows up in code: instead of correcting the AI's framework, naming, and test style in every file, you encode the rules once and the assistant follows them on every request.",
            doIt: "Add <code>.github/copilot-instructions.md</code> at your repo root with plain-English rules (framework/versions, naming, test library, hard always/never lines). Commit it; Copilot Chat attaches it to every request in that repo. Keep it short and concrete — vague rules get ignored.",
            note: "This is the dev version of the persistent-memory play: state your context once, reuse it forever." },
          { sub: "Web design — Apple-smooth corners, free and zero-risk", tags:["web-design"],
            p: "Chromium shipped the CSS <code>corner-shape</code> property (Chrome 139+, ~67% of users), so the iOS 'squircle' super-ellipse is now native CSS — no clip-path/SVG hack. Because <code>border-radius</code> still sets the size and unsupported browsers fall back to normal rounding, it's pure progressive enhancement.",
            doIt: "On any button/card you already round, add the keyword next to the radius: <code>.btn { border-radius: 28%; corner-shape: squircle; }</code>. Dial it precisely with <code>corner-shape: superellipse(1.5)</code>. No <code>@supports</code> guard needed — Safari/Firefox degrade gracefully.",
            note: "The keeper principle: gracefully-degrading CSS primitives can ship the day they hit one engine — lead with them." },
          { sub: "Paid — your playbook is out of date as of this week", tags:["paid","meta-ads","google-ads"],
            p: "Two platform changes break existing SOPs. <b>Meta</b> merged Manual + Advantage+ into one unified creation flow; standalone 'Advantage+ Shopping' (ASC) is gone, renamed Advantage+ <b>Sales</b> with AI on by default and legacy APIs deprecating. <b>Google</b> expanded AI Max to Shopping + travel and will <b>auto-link your YouTube channel to Google Ads after Jun 10 unless you opt out.</b>",
            doIt: "(1) Audit every SOP/onboarding doc that says 'create an Advantage+ Shopping campaign' — the new path is Sales objective with the three Advantage+ levers left on; keep one small manual ad set as a 2–3 week control to prove lift. (2) Before <b>Jun 10</b>: Google Ads → Tools → Linked accounts → review the pending YouTube link and confirm or unlink.",
            note: "Treat Meta's exact learning-phase / ROAS numbers as directional — the Help Center lags real behavior; prove it on your account." },
          { sub: "Social — distribution follows the private share now", tags:["social"],
            p: "Instagram unified its top-line metric to 'Views' and the strongest distribution signal is now <b>sends per reach</b> — how often people DM your post to a friend. A private forward is louder evidence the post is worth showing to strangers than a like or even a comment.",
            doIt: "Rewrite the brief for the forward: a single screenshot-able takeaway, a 'send this to the person who needs it' framing, the hook in the first line/frame, and a soft CTA to share to a specific person. Then judge posts by the <b>Sends</b> count in Insights, not likes.",
            note: "Saves still win for evergreen/utility content — but for reach, a send beats a save beats a like." }
        ]
      },
      { h: "Techniques & tools worth adopting this week — the keepers",
        intro: "The survivors after killing 95%. Each is a run-it-today play with a real link.",
        blocks: [
          { sub: "The shortlist", tags:["technique"],
            table: { head: ["Keeper", "What it buys you", "Start here"],
              rows: [
                ["Model router + 5-task frozen eval", "Judge any new model in an hour; pay frontier prices only where they earn it", "Artificial Analysis / Promptfoo"],
                ["Persistent-memory loop", "Stop re-explaining your context every session", "Distill to JSON, re-inject next chat"],
                ["Ollama (local model)", "Free, private AI for text you can't paste into a cloud chatbot", "ollama run llama3.2"],
                ["NotebookLM", "Grounded, cited Q&A over your own docs — far less hallucination", "Upload sources, ask in plain English"],
                ["Copilot conventions file", "Suggestions that already follow your stack and rules", ".github/copilot-instructions.md"],
                ["corner-shape squircle", "Apple-smooth corners, one line, zero risk", "border-radius + corner-shape: squircle"]
              ] } }
        ]
      },
      { h: "Predictions ledger — resolved & newly on the board",
        blocks: [
          { sub: "Resolved this week",
            list: [
              "✅ <b>[ai-tooling] 'Compute/power is THE bottleneck'</b> (made May 30) — reaffirmed Jun 4 by ByteDance ~$70B infra and Anthropic ~$200B cloud/chip commitments.",
              "⚖️ <b>[ai-tooling] The jobs-narrative reversal would settle</b> (made May 30) — partial: instead of settling it escalated into open labor conflict across multiple jurisdictions."
            ] },
          { sub: "Newly on the board (logged this week, still open)",
            list: [
              "<b>[web-design]</b> CSS <code>corner-shape</code> ships in a 2nd engine (Safari/Firefox), putting squircles on the path to Baseline — due ~end of 2026.",
              "<b>[paid]</b> Meta removes the ability to create a fully-manual (Advantage+-off) Sales campaign, making the unified flow mandatory — due ~end of 2026.",
              "<b>[social]</b> Instagram surfaces 'Sends' as a default top-line metric in post Insights — due ~end of Q3 2026.",
              "<b>[ai-tooling]</b> MiniMax M3's SWE-Bench Pro 59 claim reproduces (or not) once weights ship — due ~Jun 11; and a Claude Sonnet 4.8 refresh reprices the mid-tier — due ~2–4 weeks.",
              "<b>[ai-tooling] NEW weekly call:</b> by end of Q3 2026, at least two more major ad/creative platforms will retire a standalone manual campaign type in favor of an AI-default flow (the 'controls collapse' trend continues) — falsifiable by Sep 30."
            ] }
        ]
      },
      { h: "This week's action list",
        intro: "Concrete and assignable, per discipline.",
        checklist: [
          "AI/all — Write a one-page model router (task → cheapest model that passes a quick eval) and re-check it monthly.",
          "AI/all — Freeze 5 of your real tasks as a scored eval set so the next model launch is a one-hour yes/no.",
          "AI/all — Start the persistent-memory loop: distill each session to JSON and re-inject it next time.",
          "AI/private — Install Ollama and run a local model for anything you can't paste into a cloud chatbot.",
          "Dev — Add .github/copilot-instructions.md with your stack, naming, test style, and hard always/never rules.",
          "Design — Ship corner-shape: squircle on one button/card as progressive enhancement (keep the border-radius).",
          "Paid — Audit SOPs to Meta's unified Advantage+ Sales flow and keep one manual control ad set to prove lift.",
          "Paid — Before Jun 10: review/confirm the Google Ads → YouTube auto-link (or unlink).",
          "Social — Rewrite one brief to optimize for sends-per-reach and report Sends in Insights, not likes."
        ]
      }
    ],
    sources: "<a href='https://ollama.com/' target='_blank' rel='noopener'>Ollama — run open models locally</a> · <a href='https://artificialanalysis.ai/' target='_blank' rel='noopener'>Artificial Analysis (price/speed/quality)</a> · <a href='https://www.promptfoo.dev/' target='_blank' rel='noopener'>Promptfoo (eval across models)</a> · <a href='https://notebooklm.google/' target='_blank' rel='noopener'>Google NotebookLM</a> · <a href='https://docs.github.com/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot' target='_blank' rel='noopener'>GitHub — Copilot repository custom instructions</a> · <a href='https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/corner-shape' target='_blank' rel='noopener'>MDN — corner-shape</a> · <a href='https://www.smashingmagazine.com/2026/03/beyond-border-radius-css-corner-shape-property-ui/' target='_blank' rel='noopener'>Smashing — corner-shape for UI</a> · <a href='https://ppc.land/meta-launches-unified-api-structure-for-advantage-campaigns/' target='_blank' rel='noopener'>PPC Land — Meta unified Advantage+</a> · <a href='https://blog.google/products/ads-commerce/ai-max-new-features/' target='_blank' rel='noopener'>Google — AI Max</a> · <a href='https://sproutsocial.com/insights/instagram-algorithm/' target='_blank' rel='noopener'>Sprout Social — Instagram algorithm 2026</a> · <a href='https://www.anthropic.com/engineering/building-effective-agents' target='_blank' rel='noopener'>Anthropic — Building effective agents</a>"
  },

  /* ===================== DAILY — Sun Jun 7 ===================== */
  {
    id: "2026-06-07-daily",
    type: "daily",
    week: "Week of Jun 1 – 7, 2026",
    title: "Daily Briefing — Sunday, June 7",
    dateLabel: "Sunday, June 7, 2026",
    sortDate: "2026-06-07",
    domains: ["web-design", "paid", "social"],
    tldr: [
      "<b>Web play of the day: real iOS-style squircle corners in one line of CSS.</b> Chrome's <code>corner-shape</code> property finally lets you replace the slightly-boxy <code>border-radius</code> look with Apple-smooth super-ellipse corners — and it falls back to normal rounding everywhere else, so you can ship it today with zero risk.",
      "<b>Paid: Meta quietly retired the standalone 'Advantage+ Shopping' campaign.</b> Manual and Advantage+ are now one unified flow under the <i>Sales</i> objective with AI on by default — if your playbook still says 'create an ASC campaign,' it's out of date. Exact new steps below.",
      "<b>Social: Instagram's #1 ranking signal in 2026 is the DM share (sends-per-reach).</b> Likes are noise; if people forward your Reel to a friend, Instagram treats it as proof it's worth pushing to strangers. Design the post for the send, not the like.",
      "<b>Also moved (paid):</b> Google's AI Max expanded to Shopping + travel and Google Ads will auto-link your YouTube channel after Jun 10 unless you opt out — worth a 2-minute check.",
      "<b>Sharpen your edge:</b> when you ship the squircle CSS, keep <code>border-radius</code> on the element too — <code>corner-shape</code> only changes the <i>shape</i> of the curve, not its size, so without a radius there's nothing to reshape."
    ],
    sections: [
      { h: "Web design — run it today: Apple-style squircle corners in one line",
        blocks: [
          { sub: "Replace the boxy border-radius look with true super-ellipse corners", tags:["technique"],
            p: "What changed: Chromium shipped the CSS <code>corner-shape</code> property (Chrome 139+, ~67% of users as of May 2026), so the iOS app-icon 'squircle' — the smooth super-ellipse Apple uses everywhere — is now native CSS instead of a <code>clip-path</code>/SVG hack. Why it matters for our builds: rounded rectangles are the single most-repeated shape in any UI (buttons, cards, modals, avatars), and the squircle reads as 'premium' the way Apple's do — for one extra line. Because <code>border-radius</code> still controls the size and unsupported browsers just render a normal rounded corner, it's pure progressive enhancement: zero risk to ship now.",
            doIt: "On any button/card you already round, add the shape keyword next to the radius: <code>.btn { border-radius: 28%; corner-shape: squircle; }</code>. Want to dial the curve precisely? Use the math function — <code>corner-shape: superellipse(1.5)</code> is a softer squircle, higher <code>n</code> = squarer, lower = rounder. Keep a real <code>border-radius</code> on the element (the shape needs a size to act on). Test in Chrome/Edge; Safari/Firefox fall back to your normal rounding automatically — no <code>@supports</code> guard needed.",
            note: "Don't strip your existing border-radius when you add this — corner-shape with no radius does nothing." }
        ]
      },
      { h: "Paid — what changed this week",
        blocks: [
          { sub: "Meta merged manual + Advantage+ into one flow — 'create an ASC campaign' is dead", tags:["meta-ads"],
            p: "What changed: in its Feb 2026 Ads Manager overhaul Meta merged the separate 'Manual' and 'Advantage+ Shopping' options into a single unified campaign-creation flow, with AI-driven optimization on by default; the old standalone Advantage+ Shopping Campaign (ASC) was renamed Advantage+ <i>Sales</i> and its legacy APIs are being deprecated. Why it matters: any SOP, screenshot, or onboarding doc that says 'choose Advantage+ Shopping' now points at a menu that no longer exists — and juniors will silently build the wrong thing.",
            doIt: "New cold-traffic ecommerce setup: (1) New campaign → <b>Sales</b> objective; (2) leave the three Advantage+ levers ON — Advantage+ budget, Advantage+ audience, Advantage+ placements (that <i>is</i> the old ASC, now the default); (3) feed it a deep, varied creative pool and iterate on creative, not audiences; (4) cap existing-customer spend in settings so budget skews to new buyers; (5) keep one small manual ad set as a 2–3 week control. Meta's global tests showed Advantage+ Sales at ~32% higher ROAS / ~17% lower CPA vs manual-only — but prove it on your account before reallocating.",
            note: "Learning-phase thresholds are reportedly easing for smaller budgets, but Meta's Help Center lags real behaviour — treat any exact conversions-per-week number as directional, not gospel." },
          { sub: "Google AI Max expands + auto-links your YouTube after Jun 10", tags:["google-ads"],
            p: "What changed (Google Marketing Live 2026): AI Max — the AI-driven Search add-on — is expanding to Shopping and travel formats with a new 'AI Brief' to steer messaging, and Google will <b>auto-link your YouTube channel to your Google Ads account after Jun 10, 2026 unless you act</b>. Why it matters: the auto-link unlocks organic video metrics and lets you build remarketing audiences from past viewers — useful, but it's an opt-out, so decide on purpose rather than by default.",
            doIt: "Two-minute check: in Google Ads → Tools → Linked accounts, review the pending YouTube link before Jun 10 and confirm it's the right channel (or unlink). If you run Search at scale, switch on AI Max for one campaign as a test and compare CPA against your current setup before rolling it out." }
        ]
      },
      { h: "Social — the technique: design for the DM share, not the like",
        blocks: [
          { sub: "Instagram's strongest 2026 ranking signal is sends-per-reach (private shares)", tags:["technique"],
            p: "What changed: Instagram has unified its primary metric to 'Views' across Reels, Stories, photos and carousels — and the signal that most drives whether a post escapes your followers is now <b>sends per reach</b>: how often people DM your content to a friend. Likes and even comments are weaker tells; a private share is the algorithm's clearest evidence the post is worth showing to strangers. Why it matters: most of our social briefs still optimise for likes/saves. The lever moved — so should the brief.",
            doIt: "Build the share trigger into the post on purpose: (1) make the takeaway <i>forwardable</i> — a single screenshot-able tip, a 'send this to the person who needs it' framing, an inside-joke or stat someone would DM to a colleague; (2) put the hook in the first line/frame so it survives the feed; (3) add a soft CTA to share to a specific person ('tag the teammate who still uses border-radius'); (4) check the <b>Sends</b> count in Insights, not just likes, and make more of whatever gets forwarded.",
            note: "Saves still matter for evergreen/utility content, but for reach, a send beats a save beats a like." }
        ]
      }
    ],
    sources: "<a href='https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/corner-shape' target='_blank' rel='noopener'>MDN — corner-shape</a> · <a href='https://www.smashingmagazine.com/2026/03/beyond-border-radius-css-corner-shape-property-ui/' target='_blank' rel='noopener'>Smashing — corner-shape for UI</a> · <a href='https://ppc.land/meta-launches-unified-api-structure-for-advantage-campaigns/' target='_blank' rel='noopener'>PPC Land — Meta unified Advantage+</a> · <a href='https://blog.google/products/ads-commerce/ai-max-new-features/' target='_blank' rel='noopener'>Google — AI Max</a> · <a href='https://sproutsocial.com/insights/instagram-algorithm/' target='_blank' rel='noopener'>Sprout Social — Instagram algorithm 2026</a>"
  },

  /* ===================== DAILY — Sat Jun 6 ===================== */
  {
    id: "2026-06-06-daily",
    type: "daily",
    week: "Week of Jun 1 – 7, 2026",
    title: "Daily Briefing — Saturday, June 6",
    dateLabel: "Saturday, June 6, 2026",
    sortDate: "2026-06-06",
    domains: ["ai-tooling"],
    tldr: [
      "<b>Play of the day: give your AI a memory that survives across chats.</b> ChatGPT and Claude now run background memory 'dreaming' for you — but you can run the same trick by hand in about 20 minutes and stop re-explaining your context every session.",
      "Everything else on Jun 6 (lab funding, a policy proposal, model launches) was industry news, so it's cut. The one durable, run-it-today technique is below, with the exact prompt."
    ],
    sections: [
      { h: "Run it today: a memory that persists across sessions",
        blocks: [
          { sub: "Stop re-explaining yourself to ChatGPT / Claude every time", tags:["skill"],
            p: "Payoff: continuity without re-pasting your background each chat — answers that already know your tools, your style, and where you left off. OpenAI shipped this as built-in memory and 'dreaming' (<a href='https://openai.com/index/chatgpt-memory-dreaming/' target='_blank' rel='noopener'>OpenAI — ChatGPT memory</a>); you don't have to wait for it, and you can run the same loop in any tool today.",
            doIt: "Three steps, ~20 minutes. (1) Spin up a workspace per ongoing effort so chats and files share one memory (<a href='https://help.openai.com/en/articles/10169521-using-projects-in-chatgpt' target='_blank' rel='noopener'>ChatGPT Projects</a>, or a Claude Project). (2) At the end of a session, paste the distillation prompt below and save its JSON. (3) At the start of the next session, paste that JSON back in first. That's the whole technique.",
            list: [
              "<b>The distillation prompt (copy verbatim):</b> <code>Curate my long-term memory. From this conversation output STRICT JSON with keys: preferences (my habits, tools, formatting, no-go's — only if repeated), projects (name + 1-line status + next step), open_questions, corrections (mistakes you made + the fixed behavior), drop (anything from earlier memory I contradicted). Rules: never invent; if a field has no evidence return []. Be terse.</code>",
              "<b>Inject the JSON, not the transcript,</b> next session — you get the continuity without burning your context window.",
              "<b>Merge, don't overwrite:</b> each cycle, ask it to fold the new JSON into the old one, applying <code>drop</code> first. The curation loop is the point, not the storage.",
              "<b>Keep names / employers / health / finances out of auto-merge</b> — review those by hand. Treat memory edits like a database change: reviewable and reversible."
            ] }
        ]
      }
    ],
    sources: "<a href='https://openai.com/index/chatgpt-memory-dreaming/' target='_blank' rel='noopener'>OpenAI — ChatGPT memory ('dreaming')</a> · <a href='https://help.openai.com/en/articles/10169521-using-projects-in-chatgpt' target='_blank' rel='noopener'>OpenAI — Projects in ChatGPT</a> · <a href='https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents' target='_blank' rel='noopener'>Anthropic — Effective context engineering</a>"
  },

  /* ===================== DAILY — Fri Jun 5 ===================== */
  {
    id: "2026-06-05-daily",
    type: "daily",
    week: "Week of Jun 1 – 7, 2026",
    title: "Daily Briefing — Friday, June 5",
    dateLabel: "Friday, June 5, 2026",
    sortDate: "2026-06-05",
    domains: ["ai-tooling"],
    tldr: [
      "<b>Play: a release-day verdict kit.</b> New models drop almost weekly. The teams that win aren't the ones reading every leak — they're the ones who can drop a new model into a frozen test and get a yes/no in an hour.",
      "Jun 5 was a genuinely quiet news day (the week's big moves landed Jun 1–4). The durable takeaway is the kit below — it pairs with the standing eval set (May 18) and the model router (May 30)."
    ],
    sections: [
      { h: "Run it today: judge any new model in an hour",
        blocks: [
          { sub: "Turn 'should we switch?' from a vibe into a same-day decision", tags:["practice"],
            p: "Payoff: when a new model drops, you swap one config line, run your frozen tests, and know by lunch whether it beats your current default — instead of re-architecting on a rumor.",
            doIt: "Keep 5 of your real tasks as a fixed, scored set (build it once — see May 18). The day a model ships: (1) point your harness at the new model; (2) re-run the 5 tasks; (3) score against the same rubric; (4) sanity-check live price and speed on <a href='https://artificialanalysis.ai/' target='_blank' rel='noopener'>Artificial Analysis</a>; (5) switch only if it wins on quality-per-dollar for that task class. <a href='https://www.promptfoo.dev/' target='_blank' rel='noopener'>Promptfoo</a> runs the whole set side-by-side and diffs the outputs for you.",
            note: "Rule of thumb: never reprice your stack on a vendor benchmark before it reproduces on your own tasks." }
        ]
      }
    ],
    sources: "<a href='https://www.promptfoo.dev/' target='_blank' rel='noopener'>Promptfoo (run an eval set across models)</a> · <a href='https://artificialanalysis.ai/' target='_blank' rel='noopener'>Artificial Analysis (price / speed / quality)</a>"
  },

  /* ===================== DAILY — Thu Jun 4 ===================== */
  {
    id: "2026-06-04-daily",
    type: "daily",
    week: "Week of Jun 1 – 7, 2026",
    title: "Daily Briefing — Thursday, June 4",
    dateLabel: "Thursday, June 4, 2026",
    sortDate: "2026-06-04",
    domains: ["ai-tooling"],
    tldr: [
      "<b>Play: turn your own documents into a grounded, cited Q&A source with NotebookLM.</b> Stop scrolling PDFs and reports — upload them and ask questions answered only from your sources, with citations you can click.",
      "The day's headlines (an AI Act draft, an executive order, IPO filings) were policy and corporate news — cut. The durable, run-it-today move is the research assistant below."
    ],
    sections: [
      { h: "Run it today: a private research assistant grounded in your docs",
        blocks: [
          { sub: "Ask your documents questions instead of re-reading them", tags:["skill","tool"],
            p: "Payoff: fast, trustworthy answers pulled only from material you uploaded — no open-web hallucination — with inline citations back to the exact passage. Ideal for contracts, research bundles, meeting notes, or a competitor's whitepapers.",
            doIt: "Open <a href='https://notebooklm.google/' target='_blank' rel='noopener'>NotebookLM</a> (free, Google account). Create a notebook and upload your sources (PDFs, Google Docs, pasted text, a website or YouTube URL). Ask in plain language — <code>What are the renewal terms?</code> or <code>Summarize the risks across all three docs</code> — and every claim links to its source. Use the Audio Overview to turn the set into a podcast-style briefing.",
            note: "Because it answers only from your sources, it's far less likely to make things up than a general chatbot." }
        ]
      }
    ],
    sources: "<a href='https://notebooklm.google/' target='_blank' rel='noopener'>Google NotebookLM</a>"
  },

  /* ===================== DAILY — Wed Jun 3 ===================== */
  {
    id: "2026-06-03-daily",
    type: "daily",
    week: "Week of Jun 1 – 7, 2026",
    title: "Daily Briefing — Wednesday, June 3",
    dateLabel: "Wednesday, June 3, 2026",
    sortDate: "2026-06-03",
    domains: ["ai-tooling"],
    tldr: [
      "<b>Play: add a second gate to how you pick an AI model.</b> Most teams pick on quality and price. Add a privacy/jurisdiction gate so a model that aces your eval can still be blocked where it shouldn't touch customer data.",
      "The day's actual news (a large China-lab funding round) was market noise — cut. The durable, non-technical move is the two-gate check below."
    ],
    sections: [
      { h: "Run it today: a two-gate model picker",
        blocks: [
          { sub: "Separate 'can it do the job' from 'should it, here'", tags:["practice"],
            p: "Payoff: you get to use the cheapest capable model for most work without accidentally piping regulated or client-confidential data somewhere you can't defend. One decision, written down, instead of an accidental one.",
            doIt: "Write two gates into your model-router doc. <b>Gate 1 — capability/cost:</b> does it pass your eval at an acceptable price? (compare on <a href='https://artificialanalysis.ai/' target='_blank' rel='noopener'>Artificial Analysis</a> / <a href='https://openrouter.ai/' target='_blank' rel='noopener'>OpenRouter</a>). <b>Gate 2 — data/jurisdiction:</b> where does the request run, where do the weights live, and is this data OK to send there? A model can pass Gate 1 and fail Gate 2 for a given feature — route accordingly (cheap model for public/low-stakes, a vetted provider for sensitive).",
            note: "Make it explicit per task class, not per app — that's the granularity that actually holds up." }
        ]
      }
    ],
    sources: "<a href='https://artificialanalysis.ai/' target='_blank' rel='noopener'>Artificial Analysis (model comparison)</a> · <a href='https://openrouter.ai/' target='_blank' rel='noopener'>OpenRouter (providers behind one API)</a>"
  },

  /* ===================== DAILY — Tue Jun 2 ===================== */
  {
    id: "2026-06-02-daily",
    type: "daily",
    week: "Week of Jun 1 – 7, 2026",
    title: "Daily Briefing — Tuesday, June 2",
    dateLabel: "Tuesday, June 2, 2026",
    sortDate: "2026-06-02",
    domains: ["ai-tooling", "web-dev"],
    tldr: [
      "<b>Play: make GitHub Copilot follow your conventions automatically with a custom-instructions file.</b> One small file in your repo and every suggestion respects your stack, style, and rules — no more re-explaining in each prompt.",
      "The day's headlines (an executive order, a hyperscaler's in-house models, cloud-marketplace availability) were adoption news — cut. The durable dev play is below."
    ],
    sections: [
      { h: "Run it today: teach Copilot your project's rules once",
        blocks: [
          { sub: "Stop fixing the same Copilot mistakes in every file", tags:["tool","skill"],
            p: "Payoff: suggestions that already use your framework, naming, test style, and 'never do X' rules — fewer rewrites and more consistency across the team.",
            doIt: "Create <code>.github/copilot-instructions.md</code> at your repo root. Write plain-English rules: language/framework versions, naming conventions, your testing library, formatting, and hard always/never rules (e.g. <code>always use async/await, never callbacks</code>; <code>validate all inputs with zod</code>). Commit it. Copilot Chat now attaches it to every request in that repo — expand the References on a reply to confirm it loaded. Docs: <a href='https://docs.github.com/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot' target='_blank' rel='noopener'>GitHub — repository custom instructions</a>.",
            note: "Keep it short and concrete; vague rules get ignored. Path-specific rules go in .github/instructions/." }
        ]
      }
    ],
    sources: "<a href='https://docs.github.com/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot' target='_blank' rel='noopener'>GitHub Docs — Repository custom instructions</a>"
  },

  /* ===================== DAILY — Mon Jun 1 ===================== */
  {
    id: "2026-06-01-daily",
    type: "daily",
    week: "Week of Jun 1 – 7, 2026",
    title: "Daily Briefing — Monday, June 1",
    dateLabel: "Monday, June 1, 2026",
    sortDate: "2026-06-01",
    domains: ["ai-tooling"],
    tldr: [
      "<b>Play: run a capable open model on your own machine — free and private — with Ollama.</b> Zero token cost, works offline, and your data never leaves your laptop. Perfect for the open-weight era.",
      "The day's open-weight launch and IPO headlines were news; the durable, run-it-today move is getting a local model running below."
    ],
    sections: [
      { h: "Run it today: a private, free LLM on your laptop",
        blocks: [
          { sub: "Use AI on confidential text without sending it to anyone", tags:["tool"],
            p: "Payoff: no API bill, no rate limits, and full privacy for the work you can't paste into a cloud chatbot — contracts, client data, internal docs. Good enough for summarizing, drafting, classifying, and code help on a modern laptop.",
            doIt: "Install <a href='https://ollama.com/' target='_blank' rel='noopener'>Ollama</a> (Mac/Windows/Linux, free). In a terminal run <code>ollama run llama3.2</code> (or <code>qwen2.5</code>, <code>gemma3</code>) — it downloads once, then runs locally. Chat in the terminal, or point any app at the built-in local API at <code>localhost:11434</code>. Pick a small model (1–8B) for speed; a bigger one if you have the RAM.",
            note: "Match model size to your RAM (an 8B model needs ~8GB free). For the hardest 10% of tasks, still reach for a frontier model — see the model router (May 30)." }
        ]
      }
    ],
    sources: "<a href='https://ollama.com/' target='_blank' rel='noopener'>Ollama — run open models locally</a>"
  },

  /* ===================== WEEKLY SUMMARY — Issue #2 ===================== */
  {
    id: "2026-05-31-weekly",
    type: "weekly",
    week: "Week of May 25 – 31, 2026",
    title: "Weekly Briefing — Issue #2",
    dateLabel: "Week of May 25 – May 31, 2026",
    sortDate: "2026-05-31",
    domains: ["ai-tooling"],
    pdf: "reports/pdf/weekly-ai-report-2026-05-31.pdf",
    tldr: [
      "<b>Two techniques from this week are worth keeping — the rest was news.</b> Agent 'wallets', funding rounds, and org-chart moves dominated headlines; what survives as run-it-today craft is below.",
      "<b>Keep #1 — element-level citations:</b> kill made-up sources in any research/RAG workflow with one prompt line (or a native citations feature).",
      "<b>Keep #2 — planner → worker → verifier:</b> the reliable shape for getting an AI to check its own work before you trust it."
    ],
    sections: [
      { h: "Techniques worth keeping",
        blocks: [
          { sub: "Kill hallucinated sources with element-level citations", tags:["skill"],
            p: "Payoff: research and RAG answers you can actually trust, because every claim points at an exact span you can click — not a vague 'according to the docs'.",
            doIt: "Two ways. In any chat, add this line to your prompt: <code>For every claim, cite the exact source span (document + page/line). If you can't locate a span, label the claim 'unverified' instead of asserting it.</code> For production, use a feature that returns spans natively (<a href='https://platform.claude.com/docs/en/build-with-claude/citations' target='_blank' rel='noopener'>Anthropic — Citations</a>) so the pointers are guaranteed valid, not model-guessed." },
          { sub: "Planner → worker → verifier (make the AI check itself)", tags:["practice"],
            p: "Payoff: fewer confidently-wrong outputs. One model plans, specialized workers each do one job, and an explicit verifier checks the result against a hard bar (a test, a rubric) before it reaches you.",
            doIt: "Don't let one chat do everything — that's where quality drops. Split the job: ask for a plan first, run the steps, then run a separate pass — <code>now critique this against [rubric/tests] and list what fails</code>. Pattern and tradeoffs: <a href='https://www.anthropic.com/engineering/building-effective-agents' target='_blank' rel='noopener'>Anthropic — Building effective agents</a>." }
        ]
      },
      { h: "This week's action list",
        checklist: [
          "Add the element-level citation line to your default research prompt.",
          "On your most important AI task, add a separate verifier pass before you trust the output.",
          "If you build RAG, evaluate a native citations feature so source pointers are guaranteed valid, not guessed."
        ]
      }
    ],
    sources: "<a href='https://platform.claude.com/docs/en/build-with-claude/citations' target='_blank' rel='noopener'>Anthropic — Citations</a> · <a href='https://www.anthropic.com/engineering/building-effective-agents' target='_blank' rel='noopener'>Anthropic — Building effective agents</a>"
  },

  /* ===================== DAILY — Sun May 31 ===================== */
  {
    id: "2026-05-31-daily",
    type: "daily",
    week: "Week of May 25 – 31, 2026",
    title: "Daily Briefing — Sunday, May 31",
    dateLabel: "Sunday, May 31, 2026",
    sortDate: "2026-05-31",
    domains: ["ai-tooling"],
    tldr: [
      "<b>Play: automate one recurring chore end-to-end with a no-code AI workflow in Zapier.</b> Let an AI step read, decide, and act across your apps so the task runs itself — no engineer required.",
      "The day's headlines (agent payment rails, a consumer-agent launch) were adoption news; the durable, run-it-today automation play is below."
    ],
    sections: [
      { h: "Run it today: hand a recurring chore to an AI workflow",
        blocks: [
          { sub: "Turn 'I do this every day' into 'it does itself'", tags:["tool","practice"],
            p: "Payoff: reclaim the 15-minute tasks you repeat daily — triage inbound email, summarize form responses into Slack, label and route tickets — with an AI step doing the judgment in the middle.",
            doIt: "In <a href='https://zapier.com/ai' target='_blank' rel='noopener'>Zapier</a> (free tier), build a Zap: pick a Trigger (new email, new form entry, new row), add an AI step (a ChatGPT or Claude action) with a clear instruction like <code>Summarize this in 2 bullets and classify as urgent or normal</code>, then an Action (post to Slack, append to a sheet, draft a reply). Test on one real item, then switch it on.",
            note: "Start with a low-stakes, reversible task; keep a human-approval step for anything that sends externally." }
        ]
      }
    ],
    sources: "<a href='https://zapier.com/ai' target='_blank' rel='noopener'>Zapier — AI automation</a>"
  },

  /* ===================== DAILY — Sat May 30 ===================== */
  {
    id: "2026-05-30-daily",
    type: "daily",
    week: "Week of May 25 – 31, 2026",
    title: "Daily Briefing — Saturday, May 30",
    dateLabel: "Saturday, May 30, 2026",
    sortDate: "2026-05-30",
    domains: ["ai-tooling"],
    tldr: [
      "<b>Play: build a one-page model router.</b> The real story of the month wasn't capability, it was cost — frontier vs cheap models can differ ~100× on the tokens that dominate your bill. A one-page routing map captures most of the savings.",
      "The day's funding and jobs headlines were news — cut. The durable move is the router below."
    ],
    sections: [
      { h: "Run it today: a one-page model router",
        blocks: [
          { sub: "Pay frontier prices only where they actually earn it", tags:["practice"],
            p: "Payoff: often 5–50× lower spend on high-volume work with no quality drop a user can feel — because most tasks don't need your most expensive model.",
            doIt: "List your recurring AI tasks in one column. For each, assign the cheapest model that passes a quick eval: a fast/cheap model for high-volume, low-stakes work; a frontier model only where quality clearly justifies the price. Compare price/speed/quality on <a href='https://artificialanalysis.ai/' target='_blank' rel='noopener'>Artificial Analysis</a>, A/B models behind one API with <a href='https://openrouter.ai/' target='_blank' rel='noopener'>OpenRouter</a>, and score with <a href='https://www.promptfoo.dev/' target='_blank' rel='noopener'>Promptfoo</a>. Re-check monthly — prices and rankings move weekly.",
            note: "Pairs with the standing eval set (May 18) and the two-gate picker (Jun 3)." }
        ]
      }
    ],
    sources: "<a href='https://artificialanalysis.ai/' target='_blank' rel='noopener'>Artificial Analysis</a> · <a href='https://openrouter.ai/' target='_blank' rel='noopener'>OpenRouter</a> · <a href='https://www.promptfoo.dev/' target='_blank' rel='noopener'>Promptfoo</a>"
  },

  /* ===================== DAILY — Fri May 29 ===================== */
  {
    id: "2026-05-29-daily",
    type: "daily",
    week: "Week of May 25 – 31, 2026",
    title: "Daily Briefing — Friday, May 29",
    dateLabel: "Friday, May 29, 2026",
    sortDate: "2026-05-29",
    domains: ["ai-tooling"],
    tldr: [
      "<b>Play: drop a long document or recording into Google AI Studio and ask Gemini about all of it at once.</b> A huge context window, free in the browser — no setup, no chunking, no RAG.",
      "The day's model-GA and uptake headlines were news; the durable, run-it-today long-context move is below."
    ],
    sections: [
      { h: "Run it today: analyze something huge in one shot",
        blocks: [
          { sub: "Stop chunking — paste the whole thing", tags:["tool","skill"],
            p: "Payoff: summarize a 200-page report, compare five contracts, or pull every action item from a 2-hour meeting recording in a single prompt — free, because Gemini's context window holds it all.",
            doIt: "Go to <a href='https://aistudio.google.com/' target='_blank' rel='noopener'>Google AI Studio</a> (free, Google account). Start a new prompt, attach your files (PDFs, long text, audio or video), pick a Gemini model, and ask: <code>List every commitment made and who owns it</code> or <code>What changed between v1 and v2 of this contract?</code>. Turn the temperature down for factual extraction.",
            note: "It's the free, no-code way to see what a giant context window does for your real documents before you build anything." }
        ]
      }
    ],
    sources: "<a href='https://aistudio.google.com/' target='_blank' rel='noopener'>Google AI Studio</a>"
  },

  /* ===================== DAILY — Thu May 28 ===================== */
  {
    id: "2026-05-28-daily",
    type: "daily",
    week: "Week of May 25 – 31, 2026",
    title: "Daily Briefing — Thursday, May 28",
    dateLabel: "Thursday, May 28, 2026",
    sortDate: "2026-05-28",
    domains: ["ai-tooling"],
    tldr: [
      "<b>Play: stop staring at a blank prompt — let the Console write and improve it for you.</b> Anthropic's prompt generator drafts a structured prompt for your task; the prompt improver upgrades one you already have.",
      "The day's flagship-launch and valuation headlines were news; the durable, run-it-today prompting move is below."
    ],
    sections: [
      { h: "Run it today: a better prompt in two clicks",
        blocks: [
          { sub: "Beat the blank-page problem (and weak prompts)", tags:["skill","tool"],
            p: "Payoff: a well-structured, best-practice prompt in seconds instead of trial-and-error — clearer instructions, examples, and reasoning steps that measurably lift output quality.",
            doIt: "Open the <a href='https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompt-generator' target='_blank' rel='noopener'>Claude Console prompting tools</a>. Use the <b>prompt generator</b>: describe your task (<code>classify support tickets by urgency and topic</code>) and it outputs a full prompt template with variables. Already have a prompt that underperforms? Paste it into the <b>prompt improver</b>, add a note on what's wrong (<code>summaries are too basic for experts</code>), and it rewrites with chain-of-thought and clean structure.",
            note: "The resulting structure ports to other chatbots too — generate once, reuse anywhere." }
        ]
      }
    ],
    sources: "<a href='https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompt-generator' target='_blank' rel='noopener'>Anthropic — Console prompting tools (generator + improver)</a>"
  },

  /* ===================== DAILY — Wed May 27 ===================== */
  {
    id: "2026-05-27-daily",
    type: "daily",
    week: "Week of May 25 – 31, 2026",
    title: "Daily Briefing — Wednesday, May 27",
    dateLabel: "Wednesday, May 27, 2026",
    sortDate: "2026-05-27",
    domains: ["ai-tooling"],
    tldr: [
      "<b>Play: build a custom GPT for a task you repeat, so the setup is baked in.</b> Package your instructions, reference files, and tone once — then just open it and go.",
      "The day's funding, office-opening, and analyst-placement headlines were news; the durable, run-it-today move is below."
    ],
    sections: [
      { h: "Run it today: a reusable assistant for one job",
        blocks: [
          { sub: "Stop re-pasting the same setup every session", tags:["tool","skill"],
            p: "Payoff: a one-click expert — your brand-voice writer, your spec reviewer, your SQL helper — that already knows the rules and reference docs, and that you can share with teammates.",
            doIt: "In ChatGPT (Plus/Team), open the GPT builder and click Configure. Fill in instructions (role + rules + output format), upload your reference files under Knowledge, and add a few conversation starters. Test in the preview pane, then save. Reopen it any time instead of rebuilding context. Guide: <a href='https://help.openai.com/en/articles/8554397-creating-and-editing-gpts' target='_blank' rel='noopener'>OpenAI — Creating and editing GPTs</a>.",
            note: "Put your non-negotiables (<code>always cite the source doc</code>, <code>never invent figures</code>) in the instructions — they stick across every chat." }
        ]
      }
    ],
    sources: "<a href='https://help.openai.com/en/articles/8554397-creating-and-editing-gpts' target='_blank' rel='noopener'>OpenAI — Creating and editing GPTs</a>"
  },

  /* ===================== DAILY — Tue May 26 ===================== */
  {
    id: "2026-05-26-daily",
    type: "daily",
    week: "Week of May 25 – 31, 2026",
    title: "Daily Briefing — Tuesday, May 26",
    dateLabel: "Tuesday, May 26, 2026",
    sortDate: "2026-05-26",
    domains: ["ai-tooling", "graphic"],
    tldr: [
      "<b>Play: generate on-brand mockups, icons, and social images with ChatGPT's image tool — and edit them in plain English.</b> Concept art and asset drafts in minutes, no design suite.",
      "The day's enterprise-platform and multimodal launches were news; the durable, run-it-today design move is below."
    ],
    sections: [
      { h: "Run it today: design assets from a sentence",
        blocks: [
          { sub: "Draft visuals without opening Photoshop", tags:["tool"],
            p: "Payoff: fast first-draft mockups, hero images, icons, and ad variations — with legible text in the image and transparent backgrounds on request — that you can hand off or polish.",
            doIt: "In ChatGPT, ask for an image: <code>A clean flat-style icon set for a budgeting app, 6 icons, consistent line weight, transparent background</code>. To revise, just describe the change (<code>make the palette warmer</code>, <code>add the headline FALL SALE</code>) or select a region and edit only that part. Iterate, then download. How-to: <a href='https://help.openai.com/en/articles/11084440-images-in-chatgpt' target='_blank' rel='noopener'>OpenAI — Images in ChatGPT</a>.",
            note: "Spin up cheap variations for A/B options; always confirm you have rights to any referenced style before commercial use." }
        ]
      }
    ],
    sources: "<a href='https://help.openai.com/en/articles/11084440-images-in-chatgpt' target='_blank' rel='noopener'>OpenAI — Images in ChatGPT</a>"
  },

  /* ===================== DAILY — Mon May 25 ===================== */
  {
    id: "2026-05-25-daily",
    type: "daily",
    week: "Week of May 25 – 31, 2026",
    title: "Daily Briefing — Monday, May 25",
    dateLabel: "Monday, May 25, 2026",
    sortDate: "2026-05-25",
    domains: ["ai-tooling"],
    tldr: [
      "<b>Play: run non-urgent bulk AI jobs at ~50% off with the Batch API.</b> Translating, classifying, or summarizing thousands of items? Submit them as one batch and pay half.",
      "The day's price-cut, profitability, and power-merger headlines were news; the durable, run-it-today cost move is below."
    ],
    sections: [
      { h: "Run it today: halve the cost of bulk AI work",
        blocks: [
          { sub: "Pay full price only when you need the answer now", tags:["money","tool"],
            p: "Payoff: a 50% discount on large, non-interactive jobs — tag 10,000 reviews, translate a product catalog, generate metadata for a media library — with most batches finishing within an hour.",
            doIt: "Instead of looping one-at-a-time API calls, submit them together via the <a href='https://platform.claude.com/docs/en/build-with-claude/batch-processing' target='_blank' rel='noopener'>Message Batches API</a> (OpenAI has an equivalent Batch API). Bundle your requests into one batch, submit, poll for completion, then collect the results. Use it for anything where 'within an hour' is fine — evals, moderation, bulk content, data enrichment.",
            note: "Keep real-time calls for user-facing work; route everything async to batch and the savings compound." }
        ]
      }
    ],
    sources: "<a href='https://platform.claude.com/docs/en/build-with-claude/batch-processing' target='_blank' rel='noopener'>Anthropic — Message Batches (50% off bulk jobs)</a>"
  },

  /* ===================== WEEKLY SUMMARY — Issue #1 ===================== */
  {
    id: "2026-05-24-weekly",
    type: "weekly",
    week: "Week of May 18 – 24, 2026",
    title: "Weekly Briefing — Issue #1",
    dateLabel: "Week of May 18 – 24, 2026",
    sortDate: "2026-05-24",
    domains: ["ai-tooling"],
    pdf: "reports/pdf/weekly-ai-report-2026-05-24.pdf",
    tldr: [
      "<b>The durable lesson of the week: learn the agent runtime, not the headline model.</b> Three techniques still pay off today — writing Skills, curating context, and forcing a planning phase.",
      "<b>Highest-leverage move:</b> turn one repetitive workflow into a reusable 'Skill' — a markdown runbook your AI follows — instead of re-prompting it every time.",
      "Model launches and funding were news; the techniques below are what compound."
    ],
    sections: [
      { h: "Techniques worth keeping",
        blocks: [
          { sub: "Write a Skill: a runbook your AI follows, so you stop re-prompting", tags:["skill"],
            p: "Payoff: encode a procedure once; the AI loads it and follows it every time — same quality without you re-explaining. It's an onboarding doc for an agent.",
            doIt: "Pick one recurring task. Write a short markdown file: when to use it, the exact steps, which tool to use when, when to stop, and 2–5 examples of the output you want. Drop it in as a Skill (<a href='https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview' target='_blank' rel='noopener'>Anthropic — Agent Skills</a>; in Claude Code, <a href='https://code.claude.com/docs/en/skills' target='_blank' rel='noopener'>Claude Code · Skills</a>). Structure it with clear sections — models follow delineated structure far more reliably." },
          { sub: "Context engineering beats prompt engineering", tags:["practice"],
            p: "Payoff: better answers from stronger models by giving them exactly what they need, not everything you have. Treat the context window as finite and precious.",
            doIt: "Before a big task, curate the inputs: the 2–3 docs that matter, the relevant code, the goal — and leave the rest out. More context isn't better; the right context is. Primer: <a href='https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents' target='_blank' rel='noopener'>Anthropic — Effective context engineering</a>." },
          { sub: "Force a planning phase before generation", tags:["practice"],
            p: "Payoff: practitioners report complex-coding success jumping from roughly a third to two-thirds just by making the model plan first and splitting work across single-job sub-agents.",
            doIt: "Add to your prompt: <code>First write a step-by-step plan and wait for my approval before doing anything.</code> For big jobs, give each sub-task its own session/sub-agent so one chat isn't polluted doing everything. Patterns: <a href='https://www.anthropic.com/engineering/building-effective-agents' target='_blank' rel='noopener'>Anthropic — Building effective agents</a>." }
        ]
      },
      { h: "This week's action list",
        checklist: [
          "Convert one recurring workflow into a Skill (markdown runbook + 2–5 examples).",
          "Add a 'plan first, wait for approval' line to your agent prompts; split big jobs into sub-agents.",
          "Wire up 1–2 MCP servers to your AI tool (see the May 19 play).",
          "Curate context deliberately on your next big task — the right inputs, not all of them."
        ]
      }
    ],
    sources: "<a href='https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview' target='_blank' rel='noopener'>Anthropic — Agent Skills</a> · <a href='https://code.claude.com/docs/en/skills' target='_blank' rel='noopener'>Claude Code · Skills</a> · <a href='https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents' target='_blank' rel='noopener'>Anthropic — Effective context engineering</a> · <a href='https://www.anthropic.com/engineering/building-effective-agents' target='_blank' rel='noopener'>Anthropic — Building effective agents</a> · <a href='https://modelcontextprotocol.io/' target='_blank' rel='noopener'>Model Context Protocol</a>"
  },

  /* ===================== DAILY — Sun May 24 ===================== */
  {
    id: "2026-05-24-daily",
    type: "daily",
    week: "Week of May 18 – 24, 2026",
    title: "Daily Briefing — Sunday, May 24",
    dateLabel: "Sunday, May 24, 2026",
    sortDate: "2026-05-24",
    domains: ["ai-tooling", "web-dev"],
    tldr: [
      "<b>Play: paste a screenshot and get the code — or the fix.</b> Hand a UI mockup, an error screen, or a broken chart to a vision model and let it write the markup or diagnose the bug.",
      "The day's price-cut and tool-availability headlines were news; the durable, run-it-today vision move is below."
    ],
    sections: [
      { h: "Run it today: turn a picture into working code",
        blocks: [
          { sub: "Skip the typing — show, don't tell", tags:["tool","skill"],
            p: "Payoff: a screenshot of a design becomes HTML/CSS in one step; a screenshot of a stack trace or broken chart becomes a diagnosis and a fix — faster than describing it in words.",
            doIt: "In Claude or ChatGPT, drag in the image and ask: <code>Rebuild this screen as a responsive Tailwind component</code> or <code>Here's the error — what's wrong and how do I fix it?</code>. For repeatable use, send images via the API. Capabilities and limits: <a href='https://platform.claude.com/docs/en/build-with-claude/vision' target='_blank' rel='noopener'>Anthropic — Vision</a>.",
            note: "Great for converting a Figma export or a whiteboard photo into a first-pass build you then refine." }
        ]
      }
    ],
    sources: "<a href='https://platform.claude.com/docs/en/build-with-claude/vision' target='_blank' rel='noopener'>Anthropic — Vision (image input)</a>"
  },

  /* ===================== DAILY — Sat May 23 ===================== */
  {
    id: "2026-05-23-daily",
    type: "daily",
    week: "Week of May 18 – 24, 2026",
    title: "Daily Briefing — Saturday, May 23",
    dateLabel: "Saturday, May 23, 2026",
    sortDate: "2026-05-23",
    domains: ["ai-tooling"],
    tldr: [
      "<b>Play: do research with Perplexity, not a plain chatbot — every answer comes with clickable sources.</b> Get a synthesized answer plus the citations to verify it, in one step.",
      "The day's research-milestone and IPO headlines were news; the durable, run-it-today research move is below."
    ],
    sections: [
      { h: "Run it today: research that shows its work",
        blocks: [
          { sub: "Answers you can actually check", tags:["tool","skill"],
            p: "Payoff: a fast, current, synthesized answer to a real question — market sizing, a how-to, a comparison — with numbered citations so you can confirm each claim instead of trusting a confident guess.",
            doIt: "Go to <a href='https://www.perplexity.ai/' target='_blank' rel='noopener'>Perplexity</a> (free). Ask a specific question, then read the cited sources before you rely on it. Use Focus to scope the search (e.g. academic), and ask follow-ups to drill in. Treat the citations as the deliverable — open them.",
            note: "For anything you'll publish or decide on, verify at least the load-bearing numbers against their linked sources." }
        ]
      }
    ],
    sources: "<a href='https://www.perplexity.ai/' target='_blank' rel='noopener'>Perplexity — cited answer engine</a>"
  },

  /* ===================== DAILY — Fri May 22 ===================== */
  {
    id: "2026-05-22-daily",
    type: "daily",
    week: "Week of May 18 – 24, 2026",
    title: "Daily Briefing — Friday, May 22",
    dateLabel: "Friday, May 22, 2026",
    sortDate: "2026-05-22",
    domains: ["ai-tooling", "web-dev"],
    tldr: [
      "<b>Play: run an AI-assisted security pass on your code before you ship.</b> A free scanner plus a focused LLM review catches the obvious holes a poisoned dependency or rushed PR introduces.",
      "The day's supply-chain-breach and model-launch headlines were news; the durable, run-it-today security move is below."
    ],
    sections: [
      { h: "Run it today: a security review on your diff",
        blocks: [
          { sub: "Catch the leak before it ships", tags:["tool","practice"],
            p: "Payoff: fewer hard-coded secrets, injection bugs, and risky dependency calls reaching production — a cheap safety net for solo devs and small teams without a dedicated security person.",
            doIt: "Two layers. (1) Run <a href='https://semgrep.dev/' target='_blank' rel='noopener'>Semgrep</a> (free) on your repo to scan for known vulnerable patterns, secrets, and dependency issues. (2) Paste your diff into Claude/ChatGPT with: <code>Review this diff only for security issues — injection, auth, secrets, unsafe deps. List concrete risks and fixes; say 'none found' if clean.</code> Fix what either flags.",
            note: "Especially worth it right after adding a new dependency or IDE extension — treat third-party code as untrusted." }
        ]
      }
    ],
    sources: "<a href='https://semgrep.dev/' target='_blank' rel='noopener'>Semgrep — code security scanning</a>"
  },

  /* ===================== DAILY — Thu May 21 ===================== */
  {
    id: "2026-05-21-daily",
    type: "daily",
    week: "Week of May 18 – 24, 2026",
    title: "Daily Briefing — Thursday, May 21",
    dateLabel: "Thursday, May 21, 2026",
    sortDate: "2026-05-21",
    domains: ["ai-tooling"],
    tldr: [
      "<b>Play: level up your AI mental models with Andrej Karpathy's free deep-dives — then use AI to study them.</b> An hour with his explainers teaches you more than a week of headlines.",
      "The day's talent-and-capital headlines were news; the durable, run-it-today learning move is below."
    ],
    sections: [
      { h: "Run it today: actually understand how LLMs work",
        blocks: [
          { sub: "Invest an hour in the fundamentals", tags:["skill","practice"],
            p: "Payoff: judgment that compounds with every new model — once you understand tokens, context, and training, you stop chasing hype and start using AI well. The best free resource comes from the field's clearest teacher.",
            doIt: "Watch Karpathy's free explainers (start with 'Intro to Large Language Models', then 'Deep Dive into LLMs') linked from <a href='https://karpathy.ai/' target='_blank' rel='noopener'>karpathy.ai</a> and his YouTube. To lock it in, paste the video transcript into a chatbot and ask it to quiz you, or to re-explain any part <code>like I'm a marketer, not an engineer</code>.",
            note: "Skills that survive model upgrades — orchestration, evals, judgment — beat memorizing this week's leaderboard." }
        ]
      }
    ],
    sources: "<a href='https://karpathy.ai/' target='_blank' rel='noopener'>Andrej Karpathy — free AI explainers</a>"
  },

  /* ===================== DAILY — Wed May 20 ===================== */
  {
    id: "2026-05-20-daily",
    type: "daily",
    week: "Week of May 18 – 24, 2026",
    title: "Daily Briefing — Wednesday, May 20",
    dateLabel: "Wednesday, May 20, 2026",
    sortDate: "2026-05-20",
    domains: ["ai-tooling"],
    tldr: [
      "<b>Play: write prompts that survive a model switch.</b> Platforms add and drop models weekly — a well-structured prompt ports across ChatGPT, Claude, and Gemini so you're never locked in.",
      "The day's predictions and platform-turbulence headlines were news; the durable, run-it-today prompting move is below."
    ],
    sections: [
      { h: "Run it today: a prompt that works anywhere",
        blocks: [
          { sub: "Don't hard-couple your work to one model", tags:["skill","practice"],
            p: "Payoff: when a model gets removed, repriced, or beaten, you paste the same prompt into the next one and it just works — no rewrite, no lock-in.",
            doIt: "Structure every important prompt the same way: a clear role, the task, the rules/constraints, the context (marked with headers or XML-style tags), and the exact output format — plus 1–2 examples. This structure is portable across providers. Reference: <a href='https://platform.openai.com/docs/guides/prompt-engineering' target='_blank' rel='noopener'>OpenAI — Prompt engineering guide</a> (the same principles apply to Claude and Gemini).",
            note: "Keep your best prompts in a plain-text file so you can drop them into whichever model wins this month." }
        ]
      }
    ],
    sources: "<a href='https://platform.openai.com/docs/guides/prompt-engineering' target='_blank' rel='noopener'>OpenAI — Prompt engineering guide</a>"
  },

  /* ===================== DAILY — Tue May 19 ===================== */
  {
    id: "2026-05-19-daily",
    type: "daily",
    week: "Week of May 18 – 24, 2026",
    title: "Daily Briefing — Tuesday, May 19",
    dateLabel: "Tuesday, May 19, 2026",
    sortDate: "2026-05-19",
    domains: ["ai-tooling"],
    tldr: [
      "<b>Play: wire one MCP server into your AI tool so it acts on your real data.</b> The pattern of the week was that every lab now ships a runtime, not just a model — and the durable skill is connecting your AI to your tools.",
      "The keynote announcements were news; the run-it-today move is the MCP connection below."
    ],
    sections: [
      { h: "Run it today: connect your AI to your tools with MCP",
        blocks: [
          { sub: "Stop copy-pasting between your AI and your apps", tags:["tool","skill"],
            p: "Payoff: your assistant can read a Google Drive doc, open a GitHub PR, or pull a Slack thread directly — instead of you ferrying text back and forth. MCP is 'a USB-C port for AI apps': connect once, use everywhere.",
            doIt: "Pick one tool you touch daily (GitHub, Drive, Slack, a database). Add its MCP server to your AI client (Claude, Cursor, and VS Code all support MCP). Start read-only / scoped, confirm it fetches real data, then let it take one low-risk action. Directory and how-to: <a href='https://modelcontextprotocol.io/' target='_blank' rel='noopener'>modelcontextprotocol.io</a>; in Claude Code: <a href='https://code.claude.com/docs/en/mcp' target='_blank' rel='noopener'>Claude Code · MCP</a>.",
            note: "For sensitive data, scope permissions tightly and prefer local/VPC execution over sending data to a vendor cloud." }
        ]
      }
    ],
    sources: "<a href='https://modelcontextprotocol.io/' target='_blank' rel='noopener'>Model Context Protocol</a> · <a href='https://code.claude.com/docs/en/mcp' target='_blank' rel='noopener'>Claude Code · MCP</a>"
  },

  /* ===================== DAILY — Mon May 18 ===================== */
  {
    id: "2026-05-18-daily",
    type: "daily",
    week: "Week of May 18 – 24, 2026",
    title: "Daily Briefing — Monday, May 18",
    dateLabel: "Monday, May 18, 2026",
    sortDate: "2026-05-18",
    domains: ["ai-tooling"],
    tldr: [
      "<b>Play: build a standing eval set — a few real tasks you score by hand.</b> Before a big launch week, the cheapest edge isn't reading every teaser; it's having a fixed test so you can judge any new model objectively the day it ships.",
      "The day's infrastructure-deal headline was news; the durable move is the golden-task set below — the foundation the May 30 router and Jun 5 release kit build on."
    ],
    sections: [
      { h: "Run it today: a golden-task eval set",
        blocks: [
          { sub: "Replace 'this new model feels better' with a number", tags:["practice"],
            p: "Payoff: an objective, repeatable yes/no on any model — coding, writing, extraction — instead of vibes you can't defend to your team or your budget.",
            doIt: "Pick 2–3 tasks you actually do (e.g. 'refactor this file', 'summarize this contract', 'extract these fields'). For each, write the input and what a great answer looks like (a short rubric or expected output). Save them. Now any model gets the same test and a comparable score. <a href='https://www.promptfoo.dev/' target='_blank' rel='noopener'>Promptfoo</a> runs the set across models and diffs the outputs; sanity-check price and speed on <a href='https://artificialanalysis.ai/' target='_blank' rel='noopener'>Artificial Analysis</a>.",
            note: "Re-run it whenever a new model ships — that's the May 30 router and the Jun 5 release-day kit in action." }
        ]
      }
    ],
    sources: "<a href='https://www.promptfoo.dev/' target='_blank' rel='noopener'>Promptfoo</a> · <a href='https://artificialanalysis.ai/' target='_blank' rel='noopener'>Artificial Analysis</a>"
  }

];
