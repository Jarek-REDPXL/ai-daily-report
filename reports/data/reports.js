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

   NOTE (history rework): every item is graded against one bar — a
   practical, AI-powered, run-it-today play with a clear payoff and at
   least one REAL, verified source/tool link. News, specs, funding, and
   "X happened" with no takeaway are cut. Days that were pure news are
   condensed to a short honest note rather than padded — history is kept,
   but nothing is dressed up as advice it wasn't.
   ============================================================ */
window.AI_EDGE_REPORTS = [

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
      "<b>A policy- and corporate-news day, kept short on purpose.</b> Jun 4's headlines — a US AI Act discussion draft, an executive order, lab IPO filings — matter for context but aren't run-it-today plays for a craft.",
      "Nothing here cleared the bar of a practical, link-backed technique, so we condensed instead of dressing up news as advice."
    ],
    sections: [
      { h: "Why this entry is short",
        blocks: [
          { p: "The day was dominated by AI regulation and corporate manoeuvring (federal-vs-state law, frontier-model review rules, IPO paperwork). Worth tracking, but there's no non-technical, do-it-today move inside it. For the durable plays from this stretch, see the persistent-memory technique (Jun 6) and the release-day eval kit (Jun 5)." }
        ]
      }
    ],
    sources: "No run-it-today play survived re-grading for this date; entry condensed to keep the history honest."
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
    domains: ["ai-tooling"],
    tldr: [
      "<b>A regulation-and-launch day, condensed.</b> Jun 2 brought an executive order, a hyperscaler's in-house models, and cloud-marketplace availability — adoption news, not a craft technique.",
      "Nothing here is a non-technical, do-it-today play with a verifiable link, so it's kept short rather than padded."
    ],
    sections: [
      { h: "Why this entry is short",
        blocks: [
          { p: "Policy framing and corporate distribution moves dominated the day. They shift the landscape but don't hand you a runnable play. The durable techniques from this week are the eval kit (Jun 5) and the persistent-memory loop (Jun 6)." }
        ]
      }
    ],
    sources: "No run-it-today play survived re-grading for this date; entry condensed to keep the history honest."
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
      "<b>Model-launch and IPO headlines, condensed.</b> Jun 1 was a new open-weight model with big benchmark claims and an IPO filing — news, not a play.",
      "The one durable habit it points at — never trust a vendor benchmark until it reproduces on your own tasks — is built into the eval kit (Jun 5) and the standing eval set (May 18), so it isn't repeated here."
    ],
    sections: [
      { h: "Why this entry is short",
        blocks: [
          { p: "A launch with pre-release benchmark claims is a hypothesis, not a result. The runnable response is to have your own eval set ready (see May 18) and run it the day weights land (see Jun 5) — there's no separate do-it-today move on this date." }
        ]
      }
    ],
    sources: "No standalone play survived re-grading; see the eval-kit entries (May 18, Jun 5) for the durable habit this day pointed at."
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
      "<b>Mostly product news, condensed.</b> May 31 was about agents getting payment rails and a consumer agent shipping — adoption news, not a craft technique.",
      "The one engineering nugget (durable/idempotent execution) is real but a developer-infra topic, not a non-technical run-it-today play — so it's noted, not dressed up."
    ],
    sections: [
      { h: "Why this entry is short",
        blocks: [
          { p: "Agent payment rails and a 'personal agent' launch were the day's headlines — adoption, not technique. For what's worth keeping from this week, see the weekly digest above (element-level citations + the verifier pattern)." }
        ]
      }
    ],
    sources: "No run-it-today play survived re-grading for this date; see Weekly Issue #2 for the techniques worth keeping."
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
      "<b>A model-availability and uptake day, condensed.</b> May 29 was a fast/cheap model going GA plus enterprise and government rollouts — news, not a technique.",
      "The actionable nugget — benchmark a cheap model on your highest-volume task — lives in the model router (May 30), so it isn't repeated here."
    ],
    sections: [
      { h: "Why this entry is short",
        blocks: [
          { p: "A new model reaching general availability is a reason to re-run your eval, not a standalone play. The runnable version is the one-page model router (May 30) and the standing eval set (May 18)." }
        ]
      }
    ],
    sources: "No standalone play survived re-grading; see the model router (May 30) for the move this day pointed at."
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
      "<b>A flagship-launch day, condensed.</b> May 28 was a new top-tier model plus a valuation milestone — news, not a run-it-today play.",
      "Its genuinely useful idea (plan first, then run codebase-scale work) is captured as a technique in Weekly Issue #1, so it isn't repeated here."
    ],
    sections: [
      { h: "Why this entry is short",
        blocks: [
          { p: "A model release and a valuation headline don't translate into a non-technical play on their own. The durable version — force a planning phase before generation — is in Weekly Issue #1 (May 18–24)." }
        ]
      }
    ],
    sources: "No standalone play survived re-grading; see Weekly Issue #1 for the planning technique this day pointed at."
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
      "<b>A funding and corporate-news day, condensed.</b> May 27 was a record raise, an office opening, and an analyst placement — none of it a craft technique.",
      "Nothing here is a non-technical, do-it-today play with a verifiable link, so it's kept short rather than padded."
    ],
    sections: [
      { h: "Why this entry is short",
        blocks: [
          { p: "Funding scale and vendor positioning are context, not a runnable move. For the durable techniques from this period, see the two weekly digests." }
        ]
      }
    ],
    sources: "No run-it-today play survived re-grading for this date; entry condensed to keep the history honest."
  },

  /* ===================== DAILY — Tue May 26 ===================== */
  {
    id: "2026-05-26-daily",
    type: "daily",
    week: "Week of May 25 – 31, 2026",
    title: "Daily Briefing — Tuesday, May 26",
    dateLabel: "Tuesday, May 26, 2026",
    sortDate: "2026-05-26",
    domains: ["ai-tooling"],
    tldr: [
      "<b>An enterprise-platform launch day, condensed.</b> May 26 was a new enterprise agent platform, a multimodal model, and a security preview — product news, not a technique.",
      "Nothing here is a non-technical, do-it-today play with a verifiable link, so it's kept short rather than padded."
    ],
    sections: [
      { h: "Why this entry is short",
        blocks: [
          { p: "Platform announcements shift what's available but don't hand you a runnable play. The durable techniques from this period live in the two weekly digests." }
        ]
      }
    ],
    sources: "No run-it-today play survived re-grading for this date; entry condensed to keep the history honest."
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
      "<b>A pricing-and-power day, condensed.</b> May 25 was a permanent price cut, profitability/IPO chatter, a utility merger, and a pulled executive order — market and policy news.",
      "The one durable response — re-run your cost math when prices move — is the model router (May 30), so it isn't repeated here."
    ],
    sections: [
      { h: "Why this entry is short",
        blocks: [
          { p: "A cheaper model is a reason to re-check your routing, not a standalone play. The runnable version is the one-page model router (May 30) and the two-gate picker (Jun 3)." }
        ]
      }
    ],
    sources: "No standalone play survived re-grading; see the model router (May 30) for the move this day pointed at."
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
    domains: ["ai-tooling"],
    tldr: [
      "<b>A pricing-and-access day, condensed.</b> May 24 was a permanent price cut, a coding tool reaching browser/mobile, and a security-model rumor — news, not a technique.",
      "The durable response — re-run cost math when prices move — is the model router (May 30), so it isn't repeated here."
    ],
    sections: [
      { h: "Why this entry is short",
        blocks: [
          { p: "Cheaper tokens and a new surface for a coding tool are reasons to re-check routing, not standalone plays. The runnable version is the model router (May 30)." }
        ]
      }
    ],
    sources: "No standalone play survived re-grading; see the model router (May 30) for the move this day pointed at."
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
      "<b>A research-milestone and money day, condensed.</b> May 23 was an AI math result, IPO/profit news, and a governance reversal — notable, but not a craft play.",
      "Nothing here is a non-technical, do-it-today move with a verifiable link, so it's kept short rather than padded."
    ],
    sections: [
      { h: "Why this entry is short",
        blocks: [
          { p: "A research milestone and funding news are signals to watch, not runnable plays. For the durable techniques from this week, see Weekly Issue #1." }
        ]
      }
    ],
    sources: "No run-it-today play survived re-grading for this date; entry condensed to keep the history honest."
  },

  /* ===================== DAILY — Fri May 22 ===================== */
  {
    id: "2026-05-22-daily",
    type: "daily",
    week: "Week of May 18 – 24, 2026",
    title: "Daily Briefing — Friday, May 22",
    dateLabel: "Friday, May 22, 2026",
    sortDate: "2026-05-22",
    domains: ["ai-tooling"],
    tldr: [
      "<b>A supply-chain-breach and model-launch day, condensed.</b> May 22 was a poisoned IDE extension, more cheap multimodal models, and funding rounds — security and market news.",
      "The hygiene takeaway (pin/verify extensions, rotate tokens) is good practice but not an AI-powered play, so it's noted rather than dressed up."
    ],
    sections: [
      { h: "Why this entry is short",
        blocks: [
          { p: "A breach is a reminder to treat your editor as production infrastructure, and new cheap models are a reason to re-run your eval — neither is a standalone AI play. The runnable version of the model angle is the router (May 30)." }
        ]
      }
    ],
    sources: "No run-it-today AI play survived re-grading; see the model router (May 30) for the model-choice angle."
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
      "<b>A talent-and-capital day, condensed.</b> May 21 was a high-profile hire, a funding round, and strategy framing — industry news, not a craft technique.",
      "Nothing here is a non-technical, do-it-today play with a verifiable link, so it's kept short rather than padded."
    ],
    sections: [
      { h: "Why this entry is short",
        blocks: [
          { p: "Where talent and capital concentrate is a useful signal, not a runnable move. For the durable techniques from this week, see Weekly Issue #1." }
        ]
      }
    ],
    sources: "No run-it-today play survived re-grading for this date; entry condensed to keep the history honest."
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
      "<b>A predictions-and-platform-turbulence day, condensed.</b> May 20 was forward-looking forecasts and some launch-week instability — commentary, not a craft technique.",
      "The practical takeaway (keep an abstraction layer between your tools and any one model) is captured in the model router (May 30), so it isn't repeated here."
    ],
    sections: [
      { h: "Why this entry is short",
        blocks: [
          { p: "Forecasts and platform wobble are context, not runnable plays. The durable move — don't hard-couple a workflow to one vendor's lineup — is built into the model router (May 30)." }
        ]
      }
    ],
    sources: "No standalone play survived re-grading; see the model router (May 30) for the vendor-independence move."
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
