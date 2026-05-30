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
     sources   HTML string
   ============================================================ */
window.AI_EDGE_REPORTS = [

  /* ===================== WEEKLY SUMMARY ===================== */
  {
    id: "2026-05-30-weekly",
    type: "weekly",
    week: "Week of May 24 – 30, 2026",
    title: "Weekly Briefing — Issue #1",
    dateLabel: "Week of May 24 – May 30, 2026",
    sortDate: "2026-05-30",
    pdf: "reports/pdf/weekly-ai-report-2026-05-30.pdf",
    tldr: [
      "<b>Anthropic released Claude Opus 4.8</b> (May 28) with <b>Dynamic Workflows</b> — one agent can plan and run up to <b>1,000 parallel subagents</b>, do codebase-scale migrations, then self-verify. Fast mode is 3× cheaper.",
      "<b>Anthropic became the world's most valuable AI startup</b> — a <b>$65B Series H</b> at ~<b>$965B</b> (May 27), passing OpenAI and nearing $1T.",
      "<b>Google I/O 2026</b> (May 19) went all-in on agents: <b>Gemini 3.5 Flash</b>, plus <b>Spark</b> (a 24/7 personal agent) and <b>Antigravity</b>, an agent-first dev platform.",
      "<b>The industry pivoted to “the agent.”</b> Three major labs changed their default model within a month. The battleground is autonomous, long-running, multi-agent work — not chat.",
      "<b>Learn this week:</b> context engineering, sub-agent orchestration, and writing <b>Skills</b> (markdown runbooks for agents)."
    ],
    sections: [
      {
        h: "1 · Model Releases & Updates",
        blocks: [
          { sub: "Claude Opus 4.8 + Dynamic Workflows", tags:["model","tool"],
            p: "Anthropic shipped Opus 4.8 on <b>May 28</b>, just 41 days after 4.7.",
            list: [
              "<b>Dynamic Workflows (research preview):</b> Claude plans a large task, spins up <b>hundreds of parallel subagents</b> (capped at 1,000) in one session, runs them longer, then <b>verifies its own outputs</b>. Demoed codebase-scale migrations across 100,000s of lines — kickoff to merge — using the test suite as the bar.",
              "<b>Effort controls:</b> a new control next to the model selector dials how much reasoning effort Claude spends.",
              "<b>Cheaper fast mode:</b> ~2.5× speed, now <b>3× cheaper</b> than on prior models. Pricing unchanged (~$5 / $25 per 1M tokens).",
              "GA in GitHub Copilot day one; positioned with better honesty / less deception."
            ],
            why: "This is the clearest sign yet that the unit of work is shifting from “a chat turn” to “a supervised fleet of agents.” Your job becomes <i>orchestration + verification</i>, not line-by-line prompting.",
            doIt: "In Claude Code, try a real migration/refactor with planning enabled and watch the decomposition into subagents. Use <b>low effort</b> for routine edits, <b>high</b> for architecture."
          },
          { sub: "GPT-5.5 Instant becomes ChatGPT's default", tags:["model"],
            p: "On May 5, OpenAI made <b>GPT-5.5 Instant</b> the default across every ChatGPT tier, replacing GPT-5.3. Reported to cut hallucinated claims by 50%+ in some high-stakes scenarios.",
            doIt: "Re-test saved prompts/automations against the new default — behavior and refusal boundaries shift on model swaps."
          },
          { sub: "Google's Gemini: 3.5 Flash + Spark + Omni", tags:["model"],
            p: "At I/O (May 19) Google launched <b>Gemini 3.5 Flash</b> (beats 3.1 Pro on coding/agentic/multimodal, ~4× faster output, ~⅓ the price of comparable frontier models), <b>Omni</b> (any-input→any-output multimodal), and <b>Spark</b> — a 24/7 personal agent that acts across your digital life. 3.5 Pro arrives next month.",
            why: "Google is using distribution (billions of devices) to make agents ambient, and competing on <i>price/speed</i> rather than chasing the top of the benchmark. Spark is the most direct consumer-agent challenge to ChatGPT yet."
          },
          { sub: "DeepSeek makes its price cut permanent", tags:["model","money"],
            p: "DeepSeek made its <b>75% price cut on V4-Pro permanent</b> (May 24) — frontier-class Chinese reasoning at roughly a quarter the cost of equivalent OpenAI/Anthropic tokens.",
            why: "Open-weight + ultra-cheap keeps brutal downward pressure on inference pricing. Factor it into any build-vs-buy math."
          },
          { sub: "Where the models stand (selected benchmarks)", tags:["research"],
            table: {
              head: ["Benchmark / area", "Leader", "Note"],
              rows: [
                ["Scientific reasoning (GPQA Diamond)", "Gemini 3.1 Pro — 94.3%", "Top scientific reasoner"],
                ["SWE-bench Pro (coding)", "GLM-5.1 (Z.AI) — 58.4%", "First <b>open-weight</b> model to hit #1 (Apr 7), since contested"],
                ["Reasoning leaderboards", "Claude Opus 4.8 (93), Qwen3.7 Max (92)", "Best open-weight: DeepSeek V4 Pro (87)"],
                ["Research / grounded synthesis", "GPT-5.5 Pro", "Retrieval + attribution + multi-doc synthesis"]
              ]
            },
            note: "Leaderboard scores vary by source and methodology — treat as directional. “Claude Mythos Preview” tops some boards but is a restricted preview."
          }
        ]
      },
      {
        h: "2 · New Techniques, Skills & Best Practices",
        intro: "This is the section to actually study — it's where your day-to-day leverage comes from.",
        blocks: [
          { sub: "“Skills” — the highest-leverage thing to learn now", tags:["skill"],
            p: "A <b>Skill</b> is a markdown file an agent loads for a specific task — an <b>onboarding doc / runbook for an AI</b>. Encode the procedure once; the agent follows it instead of you re-prompting. (Google also shipped <b>Science Skills</b> at I/O — the pattern is going mainstream.)",
            list: [
              "<b>Write a runbook, not a question.</b> Anticipate failure modes, define which tool to use when, and specify <b>when to stop</b>.",
              "<b>Structure with sections + tags:</b> XML/Markdown headers like <code>&lt;background&gt;</code>, <code>## instructions</code>, <code>## tool_guidance</code>, <code>## output</code>. Models follow delineated structure far more reliably.",
              "<b>Include 2–5 canonical few-shot examples</b> of the exact behavior wanted. Few-shot is still top-tier even with frontier models.",
              "<b>Be explicit about memory:</b> state what to remember across steps and what to discard."
            ]
          },
          { sub: "Context engineering > prompt engineering", tags:["practice"],
            p: "The 2026 consensus (Anthropic engineering): treat <b>context as a finite, precious resource</b>. Smarter models need <i>less</i> prescriptive prompting but <i>better</i> context curation. Don't dump everything in — give the agent exactly what it needs, when it needs it."
          },
          { sub: "Sub-agents, planning & “dreaming”", tags:["practice"],
            list: [
              "<b>Force a planning phase before generation.</b> Practitioners report success on complex coding tasks jumping from ~1/3 to ~2/3 just by planning first.",
              "<b>Use specialized sub-agents</b> with single, well-defined jobs. One session doing everything causes “context pollution” and worse output.",
              "<b>Anthropic's “dreaming” (May 6):</b> a scheduled, asynchronous memory-curation process — agents review past sessions, merge duplicate memories, drop stale ones, and surface recurring mistakes/preferences. Legal AI platform Harvey reported a <b>6×</b> improvement in task completion after enabling it."
            ]
          },
          { sub: "The core prompting toolkit (keep these sharp)",
            list: [
              "<b>Chain-of-Thought</b> — reason step-by-step before answering.",
              "<b>Self-Consistency</b> — sample multiple reasoning paths, take the majority; ~2–3× accuracy over plain CoT on hard problems.",
              "<b>ReAct</b> — interleave reasoning + tool actions; the backbone of most agents.",
              "<b>Few-shot + role prompting</b> — still reliable accuracy boosters."
            ]
          }
        ]
      },
      {
        h: "3 · Tools & Agentic Platforms",
        blocks: [
          { tags:["tool"], list: [
            "<b>Google Antigravity</b> — agent-first dev platform (desktop app, <code>agy</code> CLI, SDK, Managed Agents). <b>Multi-agent orchestration</b> from day one.",
            "<b>Gemini Enterprise</b> — unified platform to build/orchestrate/govern agents, with partner agents from Salesforce, ServiceNow, Oracle, Adobe, Workday.",
            "<b>Anthropic Managed Agents</b> — added public-beta self-hosted sandboxes and a research-preview “MCP tunnels” feature (May 19).",
            "<b>MCP (Model Context Protocol)</b> is the standard way to connect agents to GitHub, Slack, Drive, Asana, etc. Wire up 1–2 MCP servers to your coding agent this week.",
            "<b>Claude Code vs Cursor:</b> Claude Code = terminal-native, autonomous multi-step + full-codebase work; Cursor = inline editing + autocomplete. Most shipping teams use <b>both</b>."
          ],
          doIt: "Pick one repetitive weekly workflow and turn it into a Skill + sub-agent. Best ROI move right now." }
        ]
      },
      {
        h: "4 · Market, Money & Business",
        blocks: [
          { table: {
            head: ["Event", "Details", "Why it matters"],
            rows: [
              ["Anthropic Series H", "$65B raised; ~$965B valuation; passed OpenAI, nears $1T (led by Altimeter, Dragoneer, Greenoaks, Sequoia)", "Capital consolidating around frontier-lab leaders"],
              ["Anthropic financials", "On track for first quarterly operating profit; ~$10.9B Q2 revenue projected (+130% QoQ)", "The leading labs are starting to look like real businesses"],
              ["Compute mega-contracts", "Anthropic reportedly paying ~$1.25B/month for GPU compute through 2029 (~$45B); ~$200B committed to cloud + chips", "Compute is THE bottleneck and cost center"],
              ["Cognition", "Raised $1B at $26B valuation", "Agentic dev tooling is a top funding magnet"],
              ["OpenAI", "Raised $122B; preparing a confidential S-1 (IPO path)", "The capital arms race keeps escalating"],
              ["NextEra × Dominion", "$67B utility merger — largest in US history — driven by AI power demand", "AI's real-world constraint is now electricity"],
              ["Apple (reported)", "May let users pick 3rd-party providers (Google, Anthropic) for Apple Intelligence in OS 27", "Apple conceding the model layer; distribution play"]
            ]
          },
          note: "Big picture: Q1 2026 venture funding hit record highs (~$300B+ globally), heavily AI-driven. Several mega-figures (SpaceX/xAI structuring, the $1.25B/mo compute deal's counterparty, OpenAI's $122B) are fast-moving and were reported across the week — treat as directional and expect revisions." }
        ]
      },
      {
        h: "5 · Policy & Regulation",
        blocks: [
          { sub: "EU AI Act “omnibus” political agreement (May 7)", tags:["policy"],
            p: "First major amendments since adoption:",
            list: [
              "High-risk (Annex III) obligations <b>delayed</b> from Aug 2026 → <b>Dec 2027</b>.",
              "Two <b>new prohibitions</b>: AI generating non-consensual intimate imagery and CSAM.",
              "Synthetic-content marking delayed to Dec 2026; transparency rules still arrive <b>Aug 2026</b>."
            ]
          },
          { sub: "US: the executive order that didn't get signed", tags:["policy"],
            p: "President Trump <b>canceled</b> a planned AI executive order (reported May 25), with sources citing direct calls from tech leaders arguing it risked America's competitive edge. State laws still landing regardless: California's frontier-AI transparency act (Jan 1, 2026) and Colorado AI Act (Jun 30, 2026).",
            doIt: "EU-facing teams: the <b>Aug 2026</b> transparency rules (label AI-generated content) are the near-term deadline. US teams: track state-level laws — the federal picture is unsettled."
          }
        ]
      },
      {
        h: "6 · This Week's Action List",
        checklist: [
          "Try Claude Opus 4.8 on a real multi-step task; learn the <b>effort control</b>.",
          "Convert one recurring workflow into a <b>Skill</b> (markdown runbook + few-shot examples).",
          "Add a <b>planning phase</b> to agent prompts; split big jobs into <b>sub-agents</b>.",
          "Wire up <b>1–2 MCP servers</b> to your coding agent.",
          "Re-test critical prompts against GPT-5.5 / Gemini Spark defaults.",
          "Re-run your inference cost math against DeepSeek V4-Pro's permanent price cut.",
          "If EU-facing: plan for <b>Aug 2026</b> synthetic-content transparency labeling."
        ]
      }
    ],
    sources: "Anthropic · CNBC (Anthropic tops OpenAI; Google I/O) · TechCrunch · VentureBeat · The New Stack · MarkTechPost · GitHub Changelog · blog.google (I/O 2026; Spark, Antigravity, Omni, Science Skills) · Google Cloud blog (Gemini Enterprise) · 9to5Google / Tom's Guide · Crunchbase News · SD Times · MarketingProfs · YourStory / MindStudio (dreaming; Harvey 6×) · buildfastwithai daily roundups · llm-stats.com / Vellum / BenchLM · Global Policy Watch & White & Case (EU AI Act) · Axios (US EO)."
  },

  /* ===================== DAILY — Fri May 29 ===================== */
  {
    id: "2026-05-29-daily",
    type: "daily",
    week: "Week of May 24 – 30, 2026",
    title: "Daily Briefing — Friday, May 29",
    dateLabel: "Friday, May 29, 2026",
    sortDate: "2026-05-29",
    tldr: [
      "<b>Gemini 3.5 Flash is now generally available</b> (Antigravity + Gemini API) — flagship-level intelligence at Flash speed/price; beats 3.1 Pro on coding & agentic benchmarks.",
      "<b>Google Flow Agent</b> can now take on <b>multi-step</b> tasks, not just single prompts.",
      "<b>Anthropic reportedly committed $200B+</b> to cloud + chips (largely with Google Cloud) — the compute land-grab continues.",
      "Governments line up for frontier AI: <b>Japan's major banks</b> (MUFG, SMBC, Mizuho) to get Claude Mythos within ~2 weeks; <b>US HHS</b> will use ChatGPT to scan 50 states' audits for fraud."
    ],
    sections: [
      { h: "What changed today",
        blocks: [
          { sub: "Gemini 3.5 Flash → GA", tags:["model"],
            p: "Generally available via Google Antigravity and the Gemini API; delivers intelligence rivaling flagships at Flash speed, and outperforms Gemini 3.1 Pro on hard coding and agentic benchmarks.",
            doIt: "If you run high-volume or latency-sensitive workloads, benchmark 3.5 Flash against your current model — the price/speed may change your default." },
          { sub: "Google Flow Agent goes multi-step", tags:["tool"],
            p: "Flow can now plan and execute multi-step tasks rather than one prompt at a time — another lab making “agent” the default unit of work." },
          { sub: "Compute & infrastructure", tags:["money"],
            p: "Anthropic reportedly committed over <b>$200B</b> toward cloud infrastructure and chips, largely with Google Cloud. AMD began production of its 2nm “Venice” EPYC CPUs.",
            why: "The frontier is increasingly gated by who can secure compute and power — watch infra deals as a leading indicator of who ships next." },
          { sub: "Enterprise & government uptake", tags:["money"],
            p: "Japan's government + MUFG/SMBC/Mizuho gain access to Anthropic's Claude Mythos within ~2 weeks; the US Dept. of Health & Human Services will use ChatGPT to analyze annual audit reports from all 50 states to target fraud, waste, and abuse." }
        ]
      }
    ],
    sources: "blog.google · OpenAI · Anthropic · llm-stats.com · crescendo.ai · imfounder.com (figures reported same-day; treat infra commitments as directional)."
  },

  /* ===================== DAILY — Thu May 28 ===================== */
  {
    id: "2026-05-28-daily",
    type: "daily",
    week: "Week of May 24 – 30, 2026",
    title: "Daily Briefing — Thursday, May 28",
    dateLabel: "Thursday, May 28, 2026",
    sortDate: "2026-05-28",
    tldr: [
      "<b>Claude Opus 4.8 shipped</b> — Dynamic Workflows (up to 1,000 parallel subagents + self-verification), effort controls, and fast mode 3× cheaper. GA in GitHub Copilot day one.",
      "<b>Anthropic confirmed as the world's most valuable AI startup</b> at ~$965B (CNBC), nearing $1T.",
      "The big theme: codebase-scale autonomous work is now a headline feature, not a demo."
    ],
    sections: [
      { h: "What changed today",
        blocks: [
          { sub: "Claude Opus 4.8 + Dynamic Workflows", tags:["model","tool"],
            p: "Anthropic released Opus 4.8 (41 days after 4.7). Dynamic Workflows lets one agent plan a task, run hundreds of parallel subagents (capped at 1,000) in a single session, then verify its own outputs — demoed on codebase-scale migrations across 100,000s of lines. New effort controls; fast mode 3× cheaper; same pricing (~$5/$25 per 1M tokens).",
            why: "The unit of work is shifting from a chat turn to a supervised fleet of agents.",
            doIt: "Try a real migration/refactor in Claude Code with planning on; learn the effort control (low for routine, high for architecture)." },
          { sub: "Valuation milestone", tags:["money"],
            p: "CNBC confirmed Anthropic has passed OpenAI to become the most valuable AI startup (~$965B post-money on the $65B Series H), nearing a $1T valuation." }
        ]
      }
    ],
    sources: "Anthropic (Introducing Claude Opus 4.8) · CNBC · TechCrunch · VentureBeat · The New Stack · GitHub Changelog · MarkTechPost."
  },

  /* ===================== DAILY — Wed May 27 ===================== */
  {
    id: "2026-05-27-daily",
    type: "daily",
    week: "Week of May 24 – 30, 2026",
    title: "Daily Briefing — Wednesday, May 27",
    dateLabel: "Wednesday, May 27, 2026",
    sortDate: "2026-05-27",
    tldr: [
      "<b>Anthropic announced its $65B Series H at a $965B valuation</b> (led by Altimeter, Dragoneer, Greenoaks, Sequoia) — overtaking OpenAI.",
      "<b>Anthropic opened a Milan office</b> for European enterprise/research/devs.",
      "<b>OpenAI named a Leader in enterprise coding agents by Gartner.</b>"
    ],
    sections: [
      { h: "What changed today",
        blocks: [
          { sub: "Anthropic's record raise", tags:["money"],
            p: "$65B Series H at a $965B valuation, making Anthropic worth more than OpenAI. The company also teased Claude Mythos Preview (advanced cybersecurity capabilities) for a select set of companies.",
            why: "Funding of this scale buys the compute that decides who stays at the frontier." },
          { sub: "European expansion", tags:["tool"],
            p: "A new Milan office signals a serious enterprise push into Europe (alongside the EU's tightening transparency rules)." },
          { sub: "OpenAI ↔ Gartner", tags:["tool"],
            p: "OpenAI named a Leader in enterprise coding agents — useful external validation if you're choosing a vendor for agentic coding.",
            doIt: "If procuring agentic coding tools, pull the latest Gartner placement into your vendor comparison." }
        ]
      }
    ],
    sources: "Anthropic · CNBC · OpenAI · buildfastwithai (May 27 roundup)."
  },

  /* ===================== DAILY — Tue May 26 ===================== */
  {
    id: "2026-05-26-daily",
    type: "daily",
    week: "Week of May 24 – 30, 2026",
    title: "Daily Briefing — Tuesday, May 26",
    dateLabel: "Tuesday, May 26, 2026",
    sortDate: "2026-05-26",
    tldr: [
      "<b>Gemini Enterprise</b> launched at Google Cloud Next '26 — a unified platform to build/orchestrate/govern agents, with partner agents from Salesforce, ServiceNow, Oracle, Adobe, Workday.",
      "<b>Gemini Omni</b> debuted — any-input→any-output multimodal generation, starting with video.",
      "<b>Anthropic's Project Glasswing</b>: select orgs (AWS, Apple, Cisco, Google, JPMorgan, Microsoft) got Claude Mythos Preview to find/fix vulnerabilities — thousands of zero-days surfaced in testing."
    ],
    sections: [
      { h: "What changed today",
        blocks: [
          { sub: "Gemini Enterprise", tags:["tool"],
            p: "An end-to-end enterprise agent platform (evolution of Vertex AI) + a knowledge-worker app + an open partner ecosystem.",
            why: "Google is packaging agents for regulated enterprises with governance built in — the part big companies actually block on.",
            doIt: "If you're in a large org, check whether your existing SaaS (Salesforce/ServiceNow/etc.) agents now plug into this." },
          { sub: "Gemini Omni", tags:["model"],
            p: "A multimodal leap: generate any output from any input, beginning with video — pushing the frontier on world-understanding + editing." },
          { sub: "Project Glasswing (security)", tags:["research"],
            p: "Anthropic gave select organizations access to Claude Mythos Preview to find and fix critical software vulnerabilities; the preview reportedly identified thousands of zero-day vulnerabilities within weeks.",
            why: "Frontier models are becoming credible security researchers — a dual-use shift defenders should track closely." }
        ]
      }
    ],
    sources: "Google Cloud blog · blog.google · Anthropic · buildfastwithai (May 26 roundup) · digitalapplied tracker."
  },

  /* ===================== DAILY — Mon May 25 ===================== */
  {
    id: "2026-05-25-daily",
    type: "daily",
    week: "Week of May 24 – 30, 2026",
    title: "Daily Briefing — Monday, May 25",
    dateLabel: "Monday, May 25, 2026",
    sortDate: "2026-05-25",
    tldr: [
      "<b>DeepSeek's 75% price cut on V4-Pro is now permanent</b> — frontier-class reasoning at ~¼ the cost of OpenAI/Anthropic tokens.",
      "<b>Anthropic on track for its first quarterly operating profit</b>; ~$10.9B projected Q2 revenue (+130% QoQ). <b>OpenAI</b> preparing a confidential S-1.",
      "<b>NextEra–Dominion $67B utility merger</b> — largest in US history — explicitly to power AI workloads. <b>Trump canceled</b> a planned AI executive order."
    ],
    sections: [
      { h: "What changed today",
        blocks: [
          { sub: "DeepSeek goes permanently cheap", tags:["model","money"],
            p: "The temporary 75% discount on V4-Pro is now permanent — roughly a quarter the cost of equivalent OpenAI/Anthropic tokens.",
            doIt: "Re-run build-vs-buy and inference-cost math; an open-weight, ultra-cheap option changes the calculus for high-volume tasks." },
          { sub: "The money is getting real", tags:["money"],
            p: "Anthropic projects its first-ever quarterly operating profit (~$10.9B Q2 revenue, +130% QoQ). OpenAI is preparing a confidential S-1 (IPO path). Reported compute commitments run to ~$1.25B/month through 2029.",
            why: "The leading labs are transitioning from cash-burning research shops to scaled businesses — and to public-market scrutiny." },
          { sub: "AI's physical constraint: power", tags:["money"],
            p: "NextEra Energy announced a $67B acquisition of Dominion Energy — the largest US utility merger ever — with AI-driven power demand as the stated rationale.",
            why: "Electricity and grid capacity are now first-order constraints on AI scaling, not a footnote." },
          { sub: "US AI executive order pulled", tags:["policy"],
            p: "President Trump canceled the signing of a planned AI executive order, reportedly after direct lobbying from tech leaders who argued it risked America's competitive edge.",
            doIt: "Don't bank on near-term US federal AI rules; plan around state laws (CA, CO) and the EU timeline instead." }
        ]
      }
    ],
    sources: "buildfastwithai (May 25 roundup) · The Information · Axios · crescendo.ai · agilebrandguide.com (several figures reported same-day; treat as directional)."
  }

];
