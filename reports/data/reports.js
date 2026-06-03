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

  /* ===================== DAILY — Wed Jun 3 ===================== */
  {
    id: "2026-06-03-daily",
    type: "daily",
    week: "Week of May 31 – Jun 6, 2026",
    title: "Daily Briefing — Wednesday, June 3",
    dateLabel: "Wednesday, June 3, 2026",
    sortDate: "2026-06-03",
    tldr: [
      "<b>Microsoft just declared independence from OpenAI.</b> At Build (Jun 2–3) it shipped <b>Project Polaris</b> — its own MoE coding model that replaces GPT-4 as Copilot's default by <b>August</b> — plus <b>Windows Agent Framework v1.0 (MIT-licensed)</b>, <b>Azure Agent Mesh</b>, and the <b>Agent Control Specification</b>. The OS is now an agent platform.",
      "<b>Anthropic confidentially filed an S-1 (Jun 1)</b> — beating OpenAI to the IPO door at a ~$965B post-money. The trillion-dollar AI listing is now a question of months, not years.",
      "<b>Trump signed a narrowed AI executive order (Jun 2)</b>: a <i>voluntary</i> 30-day government review of frontier models, plus an AI cybersecurity clearinghouse. No licensing, no mandates. Read the fine print before you assume nothing changed.",
      "<b>MiniMax M3 (Jun 1) is the new open-weight frontier:</b> 1M-context, native multimodal, <b>tops open-weight SWE-Bench Pro at 59%</b>, beats GPT-5.5 / Gemini 3.1 Pro on coding. The architecture trick — <b>MiniMax Sparse Attention</b> — uses ~1/20 the compute and runs input ~9× faster.",
      "<b>Learn today:</b> policy-as-code for agents (the Agent Control Spec pattern) and how to survive silent model swaps under your feet."
    ],
    sections: [
      { h: "What changed today",
        blocks: [
          { sub: "Microsoft owns the agent stack — and cuts the OpenAI cord", tags:["tool","model","money"],
            p: "Build 2026 was the most consequential vendor event of the year so far. <b>Project Polaris</b> — Microsoft's in-house mixture-of-experts coding model — replaces GPT-4 as the default in GitHub Copilot by <b>August 2026</b>, with a 3-month opt-back-to-GPT-4 fallback. <b>Windows Agent Framework v1.0</b> (shipped April 2) is now <b>MIT-licensed</b> and explicitly model-agnostic — it runs Claude, Gemini, MAI, or anything else, across local Windows, Windows 365 Cloud PCs, and Azure Arc edges. <b>Azure Agent Mesh</b> (GA Q4 2026) federates execution across those targets. <b>Aion 1.0 Plan</b> — a 14B reasoning + tool-calling model with 32K context — ships in-box with Windows for local inference. And the <b>Agent Control Specification</b> is an open YAML policy spec for input/LLM/state/tool/output checkpoints, with day-one plugins for LangChain, OpenAI Agents SDK, Anthropic Agents SDK, AutoGen, CrewAI, Semantic Kernel, and MCP.",
            why: "This is a strategic pivot, not a product launch. Microsoft is hedging across every layer: it has its own model (Polaris/MAI), it open-sources the runtime so Claude/Gemini run natively on Windows anyway, and it standardizes the <i>governance</i> layer so it owns the control plane whichever model wins. \"Operating system as agent host\" is the bet — and it's specifically designed to survive an OpenAI breakup. Last week's thread (frontier capital pooling around a few names) just got more complex: the value is moving into the runtime + governance layer, where Microsoft, AWS, and Google are all racing.",
            doIt: "Three concrete moves: (1) If you ship via GitHub Copilot, plan an evaluator sweep <b>before August</b> — your prompts have been tuned to GPT-4 quirks and Polaris will behave differently. (2) Read the <b>Agent Control Specification</b> repo on github.com/microsoft and adopt its YAML policy shape even if you stay on LangChain or a custom stack — it's the closest thing to a portable agent-policy standard. (3) If you build on Windows, prototype against <b>Aion 1.0 Plan</b> for offline / privacy-sensitive paths." },
          { sub: "Anthropic beats OpenAI to the IPO door", tags:["money"],
            p: "Anthropic <b>confidentially submitted a draft S-1 to the SEC on June 1</b>, following last week's $65B Series H that lifted post-money to ~$965B. Revenue run-rate is reportedly ~$47B as of May (vs ~$10B a year prior — directional but corroborated). OpenAI is rumored to be targeting a Q4 2026 listing near $1T.",
            why: "Filing first is a tactical land-grab: Anthropic captures the \"pure-play AI IPO\" narrative, sets the comparable, and locks in capital before OpenAI can. The bigger signal — combined with Microsoft's Polaris move today — is that the OpenAI-centric universe is decomposing in real time. Capital, distribution, and models are all routing around Sam.",
            doIt: "If you've been treating OpenAI as a default substrate, write down what would break if pricing, model behavior, or terms changed mid-quarter. Then pick a second-source model and ship one workload on it this week — even at a small percentage of traffic. Optionality is the cheapest insurance you can buy right now." },
          { sub: "Trump's narrowed AI executive order — read it before you celebrate or panic", tags:["policy"],
            p: "Signed Tuesday: a <b>voluntary</b> regime where labs can engage the government to classify a model as a \"covered frontier model\" and offer <b>up to 30 days</b> of pre-release access to selected federal partners. Down from a planned 90 days. The order <b>explicitly forbids</b> creating any licensing, preclearance, or permitting requirement. It also directs federal agencies to build benchmarks for model cyber capability and stand up an <b>AI Cybersecurity Clearinghouse</b> for vulnerability sharing.",
            why: "It looks toothless — and structurally it is — but it does two real things. First, it normalizes pre-release government review as a US industry posture (matters when the next administration tightens the screws). Second, it pulls cyber benchmarks into federal procurement, which is a back door to <i>de facto</i> standards: if your model wants government contracts, it'll be measured by them. Pair this with last week's read on the EU AI Act August 2 transparency deadline — the US has moved from regulation-by-rule to regulation-by-benchmark.",
            doIt: "If you build at frontier scale, get on the cyber-evaluation list now while terms are soft. If you don't, the practical to-do is to start citing cyber-eval scores in your security review docs — buyers will start asking within 90 days." },
          { sub: "MiniMax M3 — the open-weight frontier reset", tags:["model","research"],
            p: "China's MiniMax dropped <b>M3</b> on June 1: open-weight (weights + tech report on HF/GitHub within ~10 days), 1M-token context, native multimodal, and a new architecture called <b>MiniMax Sparse Attention (MSA)</b> that only attends to relevant data blocks — reportedly ~1/20 the compute and >9× faster on input processing. On <b>SWE-Bench Pro</b> it scores <b>59.0%</b>, beating GPT-5.5 and Gemini 3.1 Pro and approaching Claude Opus 4.7. It tops the open-weight coding leaderboard.",
            why: "Two compounding edges in one release. First, the benchmark: open-weight just caught the second-tier frontier on coding, which is the most commercially valuable axis. Second, the architecture: sparse attention has been theoretical for years; MSA is the first 1M-context production model where the math actually shakes out. If MSA-style attention generalizes, the next 12 months get cheaper at long context across the board — and \"give the model your whole repo / case file / customer history\" becomes a default pattern, not a luxury. This continues the thread we've tracked since DeepSeek's price cut: the open-weight tier keeps eating the proprietary middle.",
            doIt: "If you have a real >100K-context use case (codebase Q&A, contract review, multi-doc research), benchmark M3 against your incumbent this week — wait for HF weights if you self-host, hit the API today. Mark MSA as a concept to track: papers will start appearing within a quarter." },
          { sub: "Anthropic Mythos expands via Glasswing", tags:["research"],
            p: "Anthropic extended access to its cyber-capable <b>Mythos</b> model to ~150 more organizations across 15+ countries via <b>Project Glasswing</b>, reaching power, water, healthcare, communications, and hardware sectors. Last weekend's report flagged 10,000+ high/critical vulnerabilities surfaced in the first 30 days.",
            why: "Dual-use is now operational. The same model is offensive enough to find criticality bugs at scale <i>and</i> defensive enough to be trusted inside utility operators. The market that opens here — AI-native vulnerability discovery as a managed service — is going to consolidate fast.",
            doIt: "If you operate or audit critical infrastructure, the conversation with your CISO this week should be: are we on Glasswing or an equivalent? If you're a security vendor, your next 6 months are about coexistence with these models, not competition." }
        ]
      },
      { h: "Sharpen your edge",
        blocks: [
          { sub: "Policy-as-code for your agents — adopt the pattern before the standard hardens",
            p: "The Agent Control Spec's real insight is that <b>agent permissions should be a versioned YAML artifact</b> — not scattered across prompt strings, code, and config. Steal the pattern today, even if you don't use the spec:",
            list: [
              "Define one <code>agent-policy.yaml</code> per agent with five sections: <b>input</b> (allowed prompt sources + content filters), <b>llm</b> (model + max effort/tokens), <b>state</b> (what persists, where, retention), <b>tools</b> (allowlist + per-tool spend/rate caps), <b>output</b> (PII filters, citation requirements).",
              "Make it the <b>only</b> source of truth for permissions — your code reads from it, your reviewer reviews it, your auditor diffs it across deploys.",
              "Add a <b>kill switch</b>: a single boolean that drops the agent into read-only / approve-everything mode.",
              "Bonus tie-in to yesterday's payments thread: encode your <b>x402 spend caps and idempotency requirements</b> in the same YAML, so finance reviews a file instead of a screenshot."
            ],
            note: "Why this matters: the moment your agent crosses to production, the question \"what is this thing allowed to do?\" must have a one-line answer. Right now, for most teams, it doesn't. Fix it before someone in compliance asks." },
          { sub: "Bonus tip — survive a silent model swap",
            p: "Copilot users will get auto-migrated from GPT-4 to Polaris this summer. The same kind of swap will hit you on every managed platform eventually. Protect yourself: pin every production prompt to a <b>frozen eval set</b> of 20–50 golden cases with pass/fail criteria, run it on every model version bump, and gate rollout on the diff. Five minutes of CI vs. a week of \"why did the agent get weirder?\" — choose accordingly." }
        ]
      }
    ],
    sources: "Microsoft Build 2026 (devblogs.microsoft.com, news.microsoft.com) · TechCrunch (Agent Control Spec) · ChatForest / aitoolsrecap (Build recap) · CNBC + TechCrunch + Anthropic (S-1 filing) · whitehouse.gov + NPR + CNBC (Trump EO Jun 2) · MiniMax research blog + the-decoder + The Information (M3) · Investing.com (Mythos/Glasswing expansion). Revenue and SWE-Bench figures are directional."
  },

  /* ===================== WEEKLY SUMMARY — Issue #2 ===================== */
  {
    id: "2026-05-31-weekly",
    type: "weekly",
    week: "Week of May 31 – Jun 6, 2026",
    title: "Weekly Briefing — Issue #2",
    dateLabel: "Week of May 25 – May 31, 2026",
    sortDate: "2026-05-31",
    pdf: "reports/pdf/weekly-ai-report-2026-05-31.pdf",
    tldr: [
      "<b>The week in one idea: the agent grew up.</b> Autonomy's two missing pieces landed at once — <b>money</b> (agents can now transact) and the dawning <b>reliability/governance</b> reckoning. The race moved from <i>can the model do it</i> to <i>can we operationalize and monetize it</i>.",
      "<b>Agents got wallets.</b> AWS <b>Bedrock AgentCore Payments</b> (with Coinbase + Stripe) + OpenAI's <b>Agentic Commerce Protocol</b> + AWS/Visa blueprints turned “agentic commerce” from slideware into rails: stablecoin micropayments with spending guardrails.",
      "<b>…and a reliability problem.</b> Surveys put <b>&lt;2%</b> of enterprises running agents at full production scale; the blocker is integration + durable execution, not model IQ.",
      "<b>The map consolidated.</b> Four labs made four acqui-hires/licenses in five days; <b>Andrej Karpathy joined Anthropic</b>; Anthropic's run-rate reportedly went ~$14B→~$30B in ~12 weeks. Capability, capital, and talent are pooling around a few names.",
      "<b>Learn this week:</b> agentic-payment guardrails (x402), <b>durable/idempotent execution</b>, planner→worker→verifier orchestration, and demanding <b>element-level citations</b> to kill attribution hallucination."
    ],
    sections: [
      {
        h: "1 · The week in one idea",
        blocks: [
          { sub: "From “can it think” to “can it transact and be trusted”",
            p: "Issue #1's thesis was that the industry pivoted to <i>the agent</i> — from chat turns to fleets of subagents. This week the agent got <b>operationalized and monetized</b>. The two things that had been missing both arrived: agents can now <b>pay</b> (AWS AgentCore Payments, OpenAI's Agentic Commerce Protocol), and the field openly admitted they mostly can't yet <b>run reliably in production</b> (&lt;2% at full scale). The frontier is no longer just intelligence — it's <b>commerce + control</b>." },
          { sub: "Did last week's calls hold?",
            list: [
              "<b>Held:</b> we called Gemini Spark the sharpest consumer-agent challenge to ChatGPT — it <b>went live May 29</b> for US AI Ultra users.",
              "<b>Held:</b> “compute is THE bottleneck” — reaffirmed by ByteDance's reported ~$70B infra plan and Anthropic's ~$200B cloud/chip commitments.",
              "<b>Escalated:</b> the May 30 jobs-narrative reversal hardened into open labor conflict across four jurisdictions this week (see Policy)."
            ] }
        ]
      },
      {
        h: "2 · Model & Capability Landscape — what to use for what",
        intro: "Late-May release cadence slowed; the labs shifted from shipping models to <b>productizing agents</b>. The practical map:",
        blocks: [
          { table: {
            head: ["When you need…", "Reach for", "Why"],
            rows: [
              ["Hard reasoning, codebase-scale refactor, self-checking", "Claude Opus 4.8", "Dynamic Workflows + effort control; reported ~4× less likely than 4.7 to pass its own buggy code"],
              ["High-volume / latency-sensitive / cheap", "Gemini 3.5 Flash", "Flagship-ish quality at Flash price/speed; now powers Spark"],
              ["Consumer “just do it for me”", "Gemini Spark / ChatGPT agent mode", "Ambient, background, cross-app — Spark just shipped"],
              ["Selling / shopping / ads inside chat", "ChatGPT (ACP) + Ads Manager", "Agentic Commerce Protocol makes ChatGPT a storefront and ad surface"],
              ["Cheapest tokens / self-host leaning", "DeepSeek V4 · Qwen 3.7-Max (API)", "Open-weight price pressure continues; Qwen 3.7-Max is API-only, not open"]
            ]
          },
          note: "Benchmarks vary by source — directional. The week's story isn't a new #1; it's that capability is now table stakes and <b>integration + reliability</b> decide winners." }
        ]
      },
      {
        h: "3 · Techniques & Skills to Learn (your leverage)",
        intro: "Study this section — it's where the compounding edge is.",
        blocks: [
          { sub: "Agentic payments & spend guardrails (learn “x402”)", tags:["skill","tool"],
            p: "<b>x402</b> revives HTTP's dormant “402 Payment Required” for machine-to-machine commerce: an agent hits a paid endpoint, gets a price, settles (often in stablecoin), and proceeds — no human in the billing loop. Powerful and dangerous.",
            list: [
              "Give every spending agent a <b>corporate card, not a blank check</b>: hard total budget, per-transaction cap, and an <b>allowlist</b> of payable endpoints.",
              "Require <b>human approval above a threshold</b> (e.g., any single charge &gt; $X).",
              "Attach <b>idempotency keys</b> to every payment so a crash-and-retry can't double-charge.",
              "Log every transaction with the triggering reasoning step for audit."
            ] },
          { sub: "Durable, resumable agents (why demos die in prod)", tags:["skill"],
            p: "The top reason production agents survive and demos don't is <b>durable execution</b> — treat agents like workflow engines, not scripts.",
            list: [
              "<b>Persist each step's result</b> to durable storage before starting the next.",
              "Make every external action <b>idempotent</b> (safe to retry).",
              "On restart, <b>replay from the last checkpoint</b>, never from scratch."
            ] },
          { sub: "Planner → Worker → Verifier orchestration", tags:["practice"],
            p: "The reliable multi-agent shape: a <b>planner</b> decomposes, specialized <b>workers</b> (single, well-defined jobs) execute, an explicit <b>verifier</b> checks against a hard bar (a test suite, a rubric), then results <b>merge</b>. Opus 4.8's self-verification and new research (MAS-Orchestra / MASBENCH) are formalizing exactly this loop. Don't let one session do everything — that causes context pollution and worse output." },
          { sub: "Kill attribution hallucination with element-level citations", tags:["skill"],
            p: "New benchmarks (e.g., CiteVQA) push models to return <b>fine-grained, element-level</b> citations — page+line or bounding box — not just a source name. Copy this into any RAG/research agent:",
            list: [
              "<code>For every claim, cite the exact source span (document + page + line / element). If you cannot locate a span, label the claim “unverified” instead of asserting it.</code>"
            ] }
        ]
      },
      {
        h: "4 · Tools Worth Your Time",
        blocks: [
          { tags:["tool"], list: [
            "<b>Adopt/learn now:</b> AWS <b>Bedrock AgentCore Payments</b> (preview) — wire one paid API behind a budgeted, allowlisted wallet in a <i>sandbox</i> first.",
            "<b>Adopt if you sell online:</b> OpenAI's <b>Agentic Commerce Protocol</b> — turns ChatGPT into a storefront; start treating discovery as “agent optimization,” not just SEO.",
            "<b>Skip the infra pain:</b> <b>Managed Agents in the Gemini API</b> deliver the Antigravity harness without you standing up infrastructure.",
            "<b>Watch:</b> <b>ChatGPT Ads Manager</b> (new monetization + a new attention game) and the <b>AWS/Visa</b> agent-commerce blueprints.",
            "<b>Don't over-rotate</b> on frameworks that merely promise “reliability” — verify durable execution + observability yourself. &lt;2% reach production for a reason."
          ],
          doIt: "Put one paid API your agents already call behind a budgeted, allowlisted wallet in a sandbox — you'll meet the new failure modes before they hit your real card." }
        ]
      },
      {
        h: "5 · Market, Money & The Strategic Read",
        blocks: [
          { table: {
            head: ["Move", "Detail", "Signal"],
            rows: [
              ["Consolidation wave", "4 labs, 4 deals in ~5 days — Anthropic→Stainless, DeepMind→Contextual AI (Douwe Kiela +20 researchers), Meta→Dreamer, Mistral→Emmi AI — mostly structured as licenses / acqui-hires to dodge antitrust", "Buying a capability now beats building it; M&A disguised as licensing"],
              ["Talent magnet", "Andrej Karpathy joined Anthropic's pre-training team — to use Claude to accelerate pretraining research", "Elite talent pooling at the perceived leader"],
              ["Revenue velocity", "Anthropic run-rate reportedly ~$14B (Feb) → ~$30B (Apr); OpenAI launched a reported ~$4B enterprise consulting arm", "Labs monetizing services, not just tokens"],
              ["Compute land-grab", "ByteDance reportedly plans up to ~$70B AI infra; Anthropic ~$200B cloud/chips", "Compute + power remain the gating moat"]
            ]
          },
          note: "Funding / valuation / infra figures are fast-moving — directional. The pattern is durable: capability, capital, and talent are concentrating." },
          { sub: "What it signals for the next 6–12 months",
            p: "Winners will be decided less by the next benchmark and more by who can <b>secure compute</b>, <b>buy missing capabilities cheaply</b> (license/acqui-hire instead of multi-year builds), and <b>operationalize agents</b> — payments + reliability — for paying enterprises. The “license, don't merge” pattern also signals labs expect antitrust scrutiny and are routing around it." }
        ]
      },
      {
        h: "6 · Policy & Risk (only what affects what you build)",
        blocks: [
          { sub: "EU AI Act omnibus — still the binding clock", tags:["policy"],
            list: [
              "High-risk (Annex III) obligations <b>delayed</b> to <b>Dec 2027</b>; product-regulated high-risk to Aug 2028.",
              "Two <b>new prohibitions</b>: AI-generated non-consensual intimate imagery and CSAM.",
              "Synthetic-content / transparency labeling still arrives <b>Aug 2026</b> — that's the near deadline."
            ] },
          { sub: "The new front: labor & legitimacy", tags:["policy"],
            p: "Worker pushback went structural this week — strikes, gamed AI rankings, courts barring AI-justified layoffs, calls for worker say. Governance of <i>how</i> AI is rolled out is now a compliance + reputational risk, not just an HR question." },
          { sub: "Agentic payments = a new liability surface", tags:["policy"],
            p: "Once agents spend money, ask: who's liable when one overspends, gets defrauded, or pays a sanctioned party? KYC/AML checks, hard spend caps, and immutable audit logs move from nice-to-have to build requirement." }
        ]
      },
      {
        h: "7 · This Week's Action List",
        checklist: [
          "Put one paid API behind a <b>budgeted, allowlisted agent wallet</b> in a sandbox; learn <b>x402</b>.",
          "Add <b>durable execution</b> to your top agent: checkpoint state + idempotency keys (also blocks double-payments).",
          "Insert an explicit <b>verifier sub-agent</b> (planner → workers → verifier → merge; tests as the bar).",
          "If you sell online, evaluate OpenAI's <b>Agentic Commerce Protocol</b> and start thinking <b>agent optimization</b>, not just SEO.",
          "Re-test consumer workflows on <b>Gemini Spark</b> vs ChatGPT agent mode.",
          "Demand <b>element-level citations</b> in every RAG/research prompt.",
          "EU-facing: map your AI-generated outputs for the <b>Aug 2026</b> transparency labeling deadline.",
          "Co-design internal AI rollouts with affected teams; report <b>augmentation</b>, not headcount."
        ]
      }
    ],
    sources: "AWS ML Blog (Bedrock AgentCore Payments, with Coinbase + Stripe) · OpenAI (Agentic Commerce Protocol; AWS partnership) · Axios (ChatGPT Ads; Karpathy) · TechCrunch / CNBC (Karpathy → Anthropic) · VentureBeat (agent reliability rebuild; AWS/Visa blueprints) · StartupHub.ai (four-lab consolidation) · Crunchbase News (funding / run-rate) · unrot.co & crescendo.ai (May 30–31 roundups: Gemini Spark live, ByteDance infra, OpenAI consulting, labor conflicts) · Global Policy Watch / Inside Privacy (EU AI Act omnibus) · arXiv (MAS-Orchestra / MASBENCH; CiteVQA). Fast-moving funding/infra figures are directional."
  },

  /* ===================== DAILY — Sun May 31 ===================== */
  {
    id: "2026-05-31-daily",
    type: "daily",
    week: "Week of May 31 – Jun 6, 2026",
    title: "Daily Briefing — Sunday, May 31",
    dateLabel: "Sunday, May 31, 2026",
    sortDate: "2026-05-31",
    tldr: [
      "<b>Agents just got wallets.</b> AWS launched <b>Bedrock AgentCore Payments</b> (preview, built with Coinbase + Stripe) — agents autonomously pay for APIs, MCP servers, even other agents via <b>stablecoin micropayments</b> with budget guardrails. It lands alongside OpenAI's <b>Agentic Commerce Protocol</b> + ChatGPT Ads Manager. The agent economy now has rails.",
      "<b>Gemini Spark went live</b> (May 29) for US AI Ultra subscribers — last Sunday's call that Spark is the most direct consumer-agent challenge to ChatGPT is now testable.",
      "<b>The AI-and-work fight broke into the open</b> across four jurisdictions in one week (Wikipedia strike, Amazon staff gaming an internal AI ranking, Chinese courts barring AI-justified layoffs, a UK push for worker say).",
      "<b>Reality check:</b> &lt;2% of enterprises run agents at full production scale — the blocker is reliability and integration, not model IQ."
    ],
    sections: [
      { h: "What changed today",
        blocks: [
          { sub: "Agents that transact", tags:["tool","money","model"],
            p: "AWS opened a preview of <b>Bedrock AgentCore Payments</b>, built with <b>Coinbase and Stripe</b>: agents can instantly pay for web content, APIs, MCP servers, and even other agents, with <b>stablecoin support</b> that makes sub-cent microtransactions viable and <b>configurable spending guardrails</b> (budgets, per-transaction limits). It arrives the same week OpenAI's <b>Agentic Commerce Protocol</b> and self-serve <b>ChatGPT Ads Manager</b> expanded, and AWS + Visa published agent-coordination blueprints.",
            why: "Money was autonomy's last missing loop. Once an agent can pay, it can chain paid tools, data, and sub-agents with no human in the billing path — and your customer increasingly becomes <i>another agent</i>. The threat model shifts from <i>what can it say</i> to <i>what can it spend</i>.",
            doIt: "Before giving any agent a wallet, set three limits like a corporate card: a hard total budget, a per-transaction cap, and an <b>allowlist</b> of payable endpoints — plus human approval above a threshold. Learn the term <b>x402</b> (HTTP's old “402 Payment Required”, reborn for machine-to-machine payments)." },
          { sub: "Gemini Spark ships — prediction check", tags:["model","tool"],
            p: "A week after I/O, <b>Gemini Spark</b> quietly went live (May 29) for US Google AI Ultra subscribers — a personal agent that reasons across your connected apps, acts on your behalf, and runs in the background.",
            why: "Last Sunday we called Spark the most direct consumer-agent challenge to ChatGPT. It's now live, so the real question opens: does Google's ambient distribution beat ChatGPT's mindshare?",
            doIt: "Ultra subscriber? Give Spark one recurring job (inbox triage + draft replies) and race it against ChatGPT's agent mode; note exactly where each breaks — that gap is your edge for now." },
          { sub: "The work fight goes public", tags:["policy","money"],
            p: "In one week the AI-and-labor conflict surfaced across four jurisdictions: Wikipedia editors organizing a strike over Wikimedia layoffs, Amazon staff reportedly gaming an internal AI performance ranking into uselessness, Chinese courts enforcing rules that bar AI-justified layoffs, and a UK thinktank pushing for workers to get a say in AI rollouts.",
            why: "Saturday's data showed no unemployment wave yet — but the friction is moving to <i>legitimacy</i>: how AI gets imposed. The binding constraint on deployment is becoming organizational and political, not technical.",
            doIt: "Rolling out AI internally? Co-design with the affected team and report augmentation metrics, not headcount cuts — top-down mandates are now visibly producing backlash and gaming." },
          { sub: "The reliability reality check", tags:["research","tool"],
            p: "Even as agents get wallets, industry surveys put <b>fewer than 2%</b> of enterprises running agents at full production scale, with <b>46%</b> naming integration with existing systems as the top blocker. The emerging consensus: reliability is a <i>systems-engineering</i> problem — long-running agents must survive crashes, persist state, recover, and stay governed.",
            why: "Capability isn't the bottleneck; <b>durable execution</b> is. That's the chasm between a slick demo and something you'd trust with a budget (see today's first item)." }
        ]
      },
      { h: "Sharpen your edge",
        blocks: [
          { sub: "Make your agents resumable, not just smart",
            p: "The single biggest reason production agents survive and demos don't is <b>durable execution</b>. Three moves: (1) <b>persist each step's result</b> to durable storage before starting the next; (2) make every external action <b>idempotent</b> — attach an idempotency key so a retry can't double-charge or double-send; (3) on restart, <b>replay from the last checkpoint</b>, not from scratch. Bonus, now that agents can spend money (today's lead): idempotency keys are exactly what stop a crashed-then-retried agent from paying twice." }
        ]
      }
    ],
    sources: "AWS ML Blog (Bedrock AgentCore Payments) · OpenAI (Agentic Commerce Protocol) · Axios (ChatGPT Ads) · VentureBeat (agent reliability; AWS/Visa) · unrot.co + crescendo.ai (May 30–31 roundups: Gemini Spark live, labor conflicts). Fast-moving items flagged directional."
  },

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

  /* ===================== DAILY — Sat May 30 ===================== */
  {
    id: "2026-05-30-daily",
    type: "daily",
    week: "Week of May 24 – 30, 2026",
    title: "Daily Briefing — Saturday, May 30",
    dateLabel: "Saturday, May 30, 2026",
    sortDate: "2026-05-30",
    tldr: [
      "<b>The real story this week was cost, not capability.</b> May 2026 is when AI shifted from “what can models do” to “what does deployment actually cost” — and the bills are landing.",
      "<b>Both CEOs walked back the jobs apocalypse.</b> Sam Altman said he was “pretty wrong” about AI quickly wiping out entry-level white-collar work; Dario Amodei reframed his 50% claim toward augmentation. Yale and Brookings found no meaningful AI unemployment wave through March.",
      "<b>Enterprises are hitting AI budget walls.</b> Microsoft pulled ~5,000 engineers off Claude Code on cost; Uber burned its entire ~$3.4B 2026 AI budget by April; GitHub Copilot is moving to usage-based billing.",
      "<b>The price spread is staggering:</b> DeepSeek V4-Flash output (~$0.28/M) vs GPT-5.5 (~$30/M) — roughly 100× on the tokens that dominate production bills."
    ],
    sections: [
      { h: "What changed today",
        blocks: [
          { sub: "The jobs narrative reverses", tags:["policy","money"],
            p: "Sam Altman admitted he was “pretty wrong” that AI would quickly eliminate entry-level white-collar jobs; Dario Amodei softened his earlier “50% of white-collar work” claim toward augmentation (citing a 276,000-seat KPMG deployment). Yale's Budget Lab and Brookings separately found no meaningful unemployment rise in high-AI-exposure roles through March 2026.",
            why: "The honest read: AI is changing how work gets done faster than it removes workers. Plan for augmentation and rising expectations, not mass layoffs.",
            doIt: "Stop waiting for an “AI jobs apocalypse” to act — assume your role gets more productive and raise your own bar now." },
          { sub: "Enterprises hit the cost wall", tags:["money"],
            p: "Microsoft redirected ~5,000 engineers from Claude Code to GitHub Copilot CLI over per-seat cost ($500–$2,000/engineer/month); Uber reportedly exhausted its ~$3.4B 2026 AI budget by April; GitHub Copilot is shifting all plans to usage-based “AI Credits.”",
            why: "Unmetered agentic coding is expensive at scale. The winners measure cost-per-task, not seats.",
            doIt: "Instrument your AI spend per workflow now, and pick the cheapest model that passes your evals for each task." },
          { sub: "The 100× price spread", tags:["model","money"],
            p: "On output tokens — where most production cost accrues — DeepSeek V4-Flash (~$0.28/M) undercuts frontier US models like GPT-5.5 (~$30/M) by roughly 100×.",
            why: "Model choice is now a budget decision as much as a quality one." },
          { sub: "Glasswing: AI as security researcher", tags:["research"],
            p: "Anthropic's first Project Glasswing update reported Claude Mythos Preview plus ~50 partners surfaced 10,000+ high/critical vulnerabilities across 1,000+ open-source projects in ~30 days (1,726 confirmed valid true positives).",
            why: "Frontier models are now credible offensive AND defensive security tools — a dual-use shift defenders must track." }
        ]
      },
      { h: "Sharpen your edge",
        blocks: [
          { sub: "Build a one-page “model router”",
            p: "List your recurring AI tasks, then assign each the cheapest model that passes a quick eval: a fast cheap model (DeepSeek V4-Flash, Gemini 3.5 Flash) for high-volume/low-stakes work, a frontier model only where quality justifies 50–100× the price. Re-check monthly — prices and rankings move weekly." }
        ]
      }
    ],
    sources: "buildfastwithai (May 30 roundup) · Anthropic (Project Glasswing) · CNBC · The Information · Yale Budget Lab · Brookings (figures reported same-day; treat as directional)."
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
  },

  /* ===================== DAILY — Sun May 24 ===================== */
  {
    id: "2026-05-24-daily",
    type: "daily",
    week: "Week of May 24 – 30, 2026",
    title: "Daily Briefing — Sunday, May 24",
    dateLabel: "Sunday, May 24, 2026",
    sortDate: "2026-05-24",
    tldr: [
      "<b>DeepSeek made its 75% V4-Pro price cut permanent</b> — frontier-class reasoning at ~¼ the cost of comparable US tokens.",
      "<b>Claude Code escaped the terminal</b> — now usable from any browser and on iPhone.",
      "<b>“Claude Mythos” launch code surfaced on GitHub</b>, hinting at a sooner-than-expected release of Anthropic's advanced security model."
    ],
    sections: [
      { h: "What changed today",
        blocks: [
          { sub: "DeepSeek's price cut goes permanent", tags:["model","money"],
            p: "DeepSeek confirmed the temporary 75% discount on V4-Pro is now permanent — roughly a quarter the cost of equivalent OpenAI/Anthropic tokens.",
            doIt: "Re-run your build-vs-buy and inference-cost math; an ultra-cheap open-weight option changes the calculus for high-volume tasks." },
          { sub: "Claude Code on web + mobile", tags:["tool"],
            p: "Anthropic shipped Claude Code to the browser and iPhone for the first time, moving agentic coding beyond the terminal.",
            why: "Shrinking the surface area expands who can run agents — and from where.",
            doIt: "Kick off a task from your phone and review the diff later; treat agents as async coworkers." },
          { sub: "Claude Mythos signals", tags:["research","policy"],
            p: "Launch code for Claude Mythos surfaced on GitHub, suggesting an earlier release; reporting also noted US intelligence agencies keep using Claude even after Anthropic was flagged as a national-security concern over Mythos's cyber capabilities.",
            why: "The most capable security models are becoming geopolitically sensitive, dual-use assets." }
        ]
      }
    ],
    sources: "buildfastwithai (May 24 roundup) · DeepSeek · Anthropic · GitHub (figures directional where noted)."
  },

  /* ===================== DAILY — Sat May 23 ===================== */
  {
    id: "2026-05-23-daily",
    type: "daily",
    week: "Week of May 17 – 23, 2026",
    title: "Daily Briefing — Saturday, May 23",
    dateLabel: "Saturday, May 23, 2026",
    sortDate: "2026-05-23",
    tldr: [
      "<b>OpenAI's internal model disproved an 80-year-old math conjecture</b> (the Erdős unit-distance problem) with a 125-page proof — Fields medalist Tim Gowers called it “a milestone in AI mathematics.”",
      "<b>OpenAI filed for IPO;</b> Anthropic reported its first-ever profit (~$10.9B revenue), and a SpaceX S-1 revealed a ~$1.25B/month Anthropic compute deal.",
      "<b>Governance whiplash:</b> the White House scrapped its AI safety executive order after calls from Zuckerberg, Musk, and Sacks; leaked audio showed Meta tracking employees to train AI the same day it cut ~8,000 staff."
    ],
    sections: [
      { h: "What changed today",
        blocks: [
          { sub: "AI does original mathematics", tags:["research"],
            p: "An internal OpenAI reasoning model autonomously disproved the Erdős unit-distance conjecture using algebraic number theory (a 125-page proof). Mathematician Tim Gowers called it a milestone.",
            why: "Models are crossing from “solving known problems” to “producing new knowledge” — the leading indicator everyone watches.",
            doIt: "If you do quantitative or research work, start testing frontier models on genuinely open problems, not just textbook tasks." },
          { sub: "The money turns real", tags:["money"],
            p: "OpenAI filed for IPO; Anthropic reported its first operating profit on ~$10.9B revenue; a SpaceX S-1 disclosed a ~$1.25B/month compute commitment to Anthropic.",
            why: "Labs are becoming scaled, public-market businesses — and compute contracts are now balance-sheet-sized." },
          { sub: "Policy & trust whiplash", tags:["policy"],
            p: "The Trump White House canceled a planned AI safety executive order (a 90-day model-review framework) after direct lobbying from Zuckerberg, Musk, and Sacks. Separately, leaked audio showed Meta had tracked employees' Gmail, coding, and tools to train AI — the same day it laid off ~8,000.",
            why: "Don't bank on near-term US federal AI rules; plan around state law (CA, CO) and the EU timeline." }
        ]
      }
    ],
    sources: "buildfastwithai (May 23 roundup) · OpenAI · Anthropic · CNBC · The Information (several figures reported same-day; treat as directional)."
  },

  /* ===================== DAILY — Fri May 22 ===================== */
  {
    id: "2026-05-22-daily",
    type: "daily",
    week: "Week of May 17 – 23, 2026",
    title: "Daily Briefing — Friday, May 22",
    dateLabel: "Friday, May 22, 2026",
    sortDate: "2026-05-22",
    tldr: [
      "<b>A trojanized “Nx Console” VS Code extension</b> harvested credentials across AI firms — ~3,800 internal repos stolen while the malicious build was live just ~18 minutes.",
      "<b>Cheap, fast multimodal piled up:</b> Gemini 3.5 Flash GA ($1.50/$9 per 1M, 76.2% Terminal-Bench), a Gemini 3.1 Flash-Lite preview, and NVIDIA's open Nemotron 3 Nano Omni (30B MoE, ~9× throughput).",
      "<b>Money kept moving:</b> SAP to acquire Prior Labs (>$1.18B over 4 yrs), Legora's $550M Series D at $5.55B, and a new $300M BMW i Ventures agentic-AI fund."
    ],
    sections: [
      { h: "What changed today",
        blocks: [
          { sub: "Supply-chain breach via a dev extension", tags:["policy","tool"],
            p: "A trojanized Nx Console VS Code extension harvested developer credentials across multiple AI firms — ~3,800 internal repos exfiltrated despite the malicious build being live only ~18 minutes.",
            why: "Agentic dev tooling massively expands the attack surface; a single poisoned extension can drain an org.",
            doIt: "Pin and verify IDE extensions, rotate tokens, and treat your editor as production infrastructure." },
          { sub: "The fast-and-cheap tier fills out", tags:["model"],
            p: "Gemini 3.5 Flash hit GA ($1.50/$9 per 1M tokens, ~1M context, 76.2% Terminal-Bench 2.1, beating 3.1 Pro on coding/agents); Google previewed 3.1 Flash-Lite; NVIDIA released open-weight Nemotron 3 Nano Omni (30B MoE, ~9× throughput).",
            why: "“Good enough, fast, cheap” is becoming the default production tier — reserve frontier models for the hard 10%.",
            doIt: "Benchmark a Flash-class model on your highest-volume task this week." },
          { sub: "Funding flows to applied AI", tags:["money"],
            p: "SAP agreed to acquire Prior Labs (>$1.18B over four years) to build a structured-business-data lab; legal-AI Legora raised $550M (Series D) at $5.55B; BMW i Ventures launched a $300M fund for agentic, physical, and industrial AI." }
        ]
      }
    ],
    sources: "llm-stats.com · crescendo.ai · digitalapplied tracker · company announcements (figures directional where noted)."
  },

  /* ===================== DAILY — Thu May 21 ===================== */
  {
    id: "2026-05-21-daily",
    type: "daily",
    week: "Week of May 17 – 23, 2026",
    title: "Daily Briefing — Thursday, May 21",
    dateLabel: "Thursday, May 21, 2026",
    sortDate: "2026-05-21",
    tldr: [
      "<b>Andrej Karpathy joined Anthropic</b> to rebuild its pretraining research team — arguably the highest-profile AI talent move of the year.",
      "<b>Anthropic was closing a ~$30B round at a $900B+ valuation</b>, as execs across Google/OpenAI/Anthropic call the frontier race “neck-and-neck.”",
      "<b>The strategic frame (Axios):</b> Google's plan to win leans on cheap, fast models deployed across products used by billions."
    ],
    sections: [
      { h: "What changed today",
        blocks: [
          { sub: "Karpathy → Anthropic", tags:["research"],
            p: "Andrej Karpathy — OpenAI co-founder, former Tesla Autopilot lead, and the field's most beloved educator — joined Anthropic to rebuild its pretraining research team from the inside.",
            why: "Pretraining talent is the scarcest resource at the frontier; where it concentrates signals who leads next.",
            doIt: "Follow what Karpathy publishes and teaches — his explanations are among the fastest ways to level up your own mental models." },
          { sub: "The capital race", tags:["money"],
            p: "Anthropic was reported closing a ~$30B round at a $900B+ valuation (figures varied by source and moved fast through the month — treat as directional). Leaders increasingly call the frontier effectively neck-and-neck, differing mainly on cost, speed, and compute tradeoffs." },
          { sub: "Google's deployment bet", tags:["tool"],
            p: "Axios framed Google's strategy as staying at the frontier while prioritizing models cheap and fast enough to ship to billions of users — distribution as the moat." }
        ]
      }
    ],
    sources: "Axios · CNBC · The Information · llm-stats.com (valuations reported same-day; treat as directional)."
  },

  /* ===================== DAILY — Wed May 20 ===================== */
  {
    id: "2026-05-20-daily",
    type: "daily",
    week: "Week of May 17 – 23, 2026",
    title: "Daily Briefing — Wednesday, May 20",
    dateLabel: "Wednesday, May 20, 2026",
    sortDate: "2026-05-20",
    tldr: [
      "<b>Jack Clark's Oxford lecture</b>: Anthropic's co-founder predicted a Nobel-worthy AI-assisted discovery within 12 months and a 60%+ chance of recursive self-improvement by end of 2028 — while naming a non-zero tail risk.",
      "<b>Google I/O after-shocks:</b> Antigravity 2.0 had launch-day issues (IDE restored May 23); GitHub Copilot Chat purged Gemini and several GPT models from its web surface."
    ],
    sections: [
      { h: "What changed today",
        blocks: [
          { sub: "Big predictions, stated plainly", tags:["research","policy"],
            p: "At Oxford, Jack Clark forecast a Nobel-level discovery with AI within 12 months and a 60%+ probability that AI helps train its successor (recursive self-improvement) by end of 2028 — alongside an explicit acknowledgment of tail risk.",
            why: "The people closest to the frontier are planning for very fast capability gains; calibrate your own timeline accordingly.",
            doIt: "Build skills that compound with stronger models (orchestration, evals, judgment) rather than skills they replace." },
          { sub: "Launch turbulence", tags:["tool"],
            p: "Google's Antigravity 2.0 shipped with day-one problems (the IDE was restored May 23); GitHub Copilot Chat removed all Gemini models plus GPT-5.2 Codex and GPT-5.4 nano from its web surface (VS Code/JetBrains unaffected).",
            why: "Platform model availability changes weekly — don't hard-couple a workflow to one vendor's lineup.",
            doIt: "Keep an abstraction layer between your tools and any single model." }
        ]
      }
    ],
    sources: "buildfastwithai (May 20 roundup) · Anthropic · GitHub Changelog · Google (forward-looking claims are directional)."
  },

  /* ===================== DAILY — Tue May 19 ===================== */
  {
    id: "2026-05-19-daily",
    type: "daily",
    week: "Week of May 17 – 23, 2026",
    title: "Daily Briefing — Tuesday, May 19",
    dateLabel: "Tuesday, May 19, 2026",
    sortDate: "2026-05-19",
    tldr: [
      "<b>Google I/O 2026 went all-in on agents</b> (~100 announcements): Gemini 3.5 Flash, Omni Flash, Antigravity 2.0, Managed Agents in the API, and <b>Spark</b>, a general-purpose personal agent in the Gemini app.",
      "<b>Anthropic answered with infrastructure:</b> self-hosted sandboxes (run agents inside your own VPC; Cloudflare/Daytona/Modal/Vercel on day one) and MCP Tunnels for private tool access.",
      "<b>Creative suites came to Gemini:</b> Adobe, Canva, and CapCut integrations; Blackstone–Google announced a ~$5B TPU joint venture (May 18)."
    ],
    sections: [
      { h: "What changed today",
        blocks: [
          { sub: "Google I/O: the agent platform", tags:["model","tool"],
            p: "Google shipped Gemini 3.5 Flash (GA, frontier-ish at Flash price), Omni Flash (any-input → any-output, SynthID-watermarked), Antigravity 2.0 (desktop + CLI + SDK), Managed Agents (remote Linux execution in the Gemini API), and Spark, a general personal agent that reasons across your connected apps.",
            why: "Google is packaging the whole agent stack — model, runtime, and a consumer agent — for its billions of users.",
            doIt: "If you live in Google's ecosystem, pilot Spark and Managed Agents on one real workflow before defaulting elsewhere." },
          { sub: "Anthropic's enterprise counter", tags:["tool"],
            p: "Anthropic launched self-hosted sandboxes (agents execute inside the customer's VPC; Cloudflare, Daytona, Modal, and Vercel as day-one providers) and a research preview of MCP Tunnels (outbound-only access to private MCP servers).",
            why: "The enterprise blocker is data residency and control — Anthropic is selling exactly that.",
            doIt: "For sensitive workloads, evaluate VPC-local agent execution instead of sending data to a vendor cloud." },
          { sub: "Ecosystem & compute", tags:["money"],
            p: "Adobe (Firefly agent), Canva (Magic Layers), and CapCut are integrating into Gemini; Blackstone and Google announced a ~$5B TPU joint venture (May 18) — more evidence that compute and capital are the real battleground." }
        ]
      },
      { h: "Sharpen your edge",
        blocks: [
          { sub: "Learn the agent runtime, not just the model",
            p: "This week's pattern is unmistakable: every lab now ships a <i>runtime</i> (sandboxes, managed agents, tunnels), not just a model. The durable skill is wiring agents to your real tools and data safely — MCP servers, scoped permissions, VPC execution. Pick one workflow and stand up a minimal, permissioned agent end-to-end; those reps will outlast any single model release." }
        ]
      }
    ],
    sources: "blog.google (I/O 2026) · CNBC · Anthropic · digitalapplied tracker (figures directional where noted)."
  }

];
