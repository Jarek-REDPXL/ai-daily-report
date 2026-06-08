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
