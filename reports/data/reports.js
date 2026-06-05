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

  /* ===================== DAILY — Fri Jun 5 ===================== */
  {
    id: "2026-06-05-daily",
    type: "daily",
    week: "Week of May 31 – Jun 6, 2026",
    title: "Daily Briefing — Friday, June 5",
    dateLabel: "Friday, June 5, 2026",
    sortDate: "2026-06-05",
    tldr: [
      "<b>NVIDIA shipped Nemotron 3 Ultra</b> — 550B MoE (55B active), hybrid Mamba-Transformer, <b>1M token context</b>, served at <b>~400 tok/s</b>. It's now the leading <b>US</b> open-weights model (Artificial Analysis Index <b>47.7</b>) — but still behind China's Kimi K2.6 at <b>53.9</b>. Open-weights “sovereignty” is now a real product axis.",
      "<b>OpenAI dropped GPT-Rosalind v2 + a Biodefense program</b> (Jun 3, scaled Jun 4). The domain-specialized life-sciences model uses <b>31% fewer tokens</b> than GPT-5.5 on genomics work while outperforming it — vertical models are quietly winning where the moat is data, not compute.",
      "<b>Cognition retired the Windsurf brand and shipped Devin Desktop</b> (Jun 2 → rolling out this week) — IDE becomes a <b>Kanban for agents</b>, with the open <b>Agent Client Protocol (ACP)</b> letting Codex, Claude, and OpenCode run in the same editor. Last week's call on consolidation is now overt M&A, not just licenses.",
      "<b>Anthropic monetized the channel.</b> The Jun 3 launch of the <b>Claude Partner Network Services Track</b> (3 tiers, 40K firms applied, 10K certifications) — Anthropic is becoming an enterprise platform with a Salesforce-style partner economy. The IPO narrative just got a recurring-revenue chapter.",
      "<b>EU clock — 58 days.</b> The Commission's final Code of Practice on AI-content labeling lands this month; <b>Article 50 transparency obligations bind on Aug 2, 2026</b>. If your output ever touches an EU user, the label work is now overdue, not upcoming."
    ],
    sections: [
      { h: "What changed today",
        blocks: [
          { sub: "Nemotron 3 Ultra: the US gets a credible open-weights flagship", tags:["model","tool"],
            p: "NVIDIA announced Nemotron 3 Ultra at Jensen's Computex keynote (Jun 1) and made it downloadable on <b>Jun 4</b> via Hugging Face, OpenRouter, and NIM. It's a <b>hybrid Mamba-Transformer MoE</b> (550B total / 55B active), <b>1M-token context</b>, commercial-use license. Artificial Analysis Intelligence Index = <b>47.7</b> — well ahead of Gemma 4 31B (39.2) and gpt-oss-120b (33.3); still behind Kimi K2.6 (<b>53.9</b>) and DeepSeek V4 Pro. Serving speed is the real headline: <b>~400 output tok/s</b> on BlackBox, 3–6× faster than comparable Chinese models.",
            why: "Two threads update at once. (1) <b>The China-leads-open-weights gap is narrowing but not closed</b> — the May 30 weekly's “DeepSeek 100×-cheaper output tokens” call still holds on price, but the US now has an open option that's defensible on speed and license. (2) <b>Mamba-Transformer hybrids went mainstream.</b> Pure-Transformer at 1M context bleeds throughput; Mamba layers make long-context viable economically. Expect every frontier lab to ship a hybrid architecture within the next two model generations.",
            doIt: "Before you commit to a US-jurisdiction open model for your stack (procurement, gov, EU customers), <b>benchmark Nemotron 3 Ultra against Llama and DeepSeek V4 on your exact task</b>, then weight by serving cost at your real token mix — speed × license × intelligence, not just Index. The fast tier is where most production cost accrues; a 3–6× speed delta dwarfs a 5-point intelligence delta on most workloads." },
          { sub: "GPT-Rosalind v2 + Biodefense — the vertical-model thesis lands", tags:["model","research","money"],
            p: "OpenAI posted “Introducing new capabilities to GPT-Rosalind” on <b>Jun 3</b>, opened the research preview to eligible orgs <b>worldwide</b>, and launched the <b>Rosalind Biodefense Program</b> (early-warning, outbreak modeling, diagnostics, MCMs) for US gov and allied public-health partners. The updated model fuses GPT-5.5's agentic coding with deep medicinal-chemistry/genomics specialization; on long-horizon quantitative biology it uses <b>31% fewer tokens than GPT-5.5</b> while outperforming it. Already in use at Amgen, Moderna, Allen Institute, Thermo Fisher.",
            why: "This is the first time a frontier lab has published clear, large numbers proving the <b>vertical-model dividend</b>: same family, fewer tokens, better answers — because the model carries the domain priors instead of you re-injecting them every call. Pair with Anthropic's Glasswing → critical infrastructure (Jun 2) and Microsoft's MAI-Code-1-Flash being default-routed in Copilot: <b>2026's pattern is one general frontier model per lab + a stable of specialists.</b> The biodefense framing also operationalizes the Trump EO's “covered frontier model” logic — Rosalind has clear cyber-bio uplift potential.",
            doIt: "If you own an LLM line item ≥$50K/yr, audit it for tasks where you could be calling a specialist instead of the frontier: medical, legal, finance, security, code. <b>The dominant cost lever for 2026 is not “cheapest token” — it's “fewest tokens to a correct answer.”</b> Test a domain model on your hardest 100-task eval set; if it wins on completion rate or tokens-per-task, switch tiers." },
          { sub: "Windsurf is dead, long live Devin Desktop — and ACP", tags:["tool","money"],
            p: "Cognition (which bought Windsurf for ~$250M) retired the Windsurf brand and relaunched the IDE as <b>Devin Desktop</b> on <b>Jun 2</b>, with rollout through this week. Three real shifts: (1) the default UI is the <b>Agent Command Center</b> — a Kanban of every agent you're running (local + cloud), sorted “in progress / blocked / ready for review”; (2) <b>Devin Local</b> (Rust rewrite of Cascade) ships now, with the old Cascade deprecated <b>Jul 1</b>; (3) the editor speaks the open <b>Agent Client Protocol (ACP)</b>, so Codex, Claude Agent, and OpenCode can run inside the same shell. Bundle price stays $20/mo.",
            why: "Last week's weekly called consolidation as “license, don't merge.” The Devin Desktop launch is the first big <b>overt</b> acquisition closing — and the product shape is the bigger signal: the IDE is no longer a code editor with an AI sidebar, it's a <b>multi-agent dispatcher</b>. ACP is the second tell — like MCP for tools, ACP standardizes how agents plug into editors. Cursor's all-in-house Composer 2.5 strategy now looks lonely against an emerging open protocol. <b>Operator implication:</b> the “one IDE per developer” assumption is over; you'll review work from 5–10 agents at once.",
            doIt: "Pull up your team's coding agent setup and ask: <b>where does work queue and get reviewed?</b> If the answer is “in chat” or “in PRs,” you're behind. Pilot a Kanban-style agent dashboard (Devin Desktop, or build one over your CI) — visibility into <i>which agent is stuck where</i> beats raw model quality once you have more than two agents running." },
          { sub: "Anthropic monetizes the channel — Services Track + Partner Hub", tags:["money","tool"],
            p: "On <b>Jun 3</b> Anthropic launched the <b>Services Track</b> of the Claude Partner Network with three tiers: <b>Select</b> (10+ certified, 2+ joint customers), <b>Preferred</b> (100+ certified, 15+ deployed, 3+ stories), <b>Global Premier</b> (1,000+ certified, 100+ joint customers across 3 regions, 15+ stories, named exec sponsors). Backed by the $100M training investment from March; <b>40,000+ firms have applied, 10,000+ consultants are now certified</b>. A new Partner Hub portal lets buyers find qualified firms by scope.",
            why: "This is Anthropic borrowing the <b>Salesforce / AWS playbook</b>: a product company multiplies revenue by enabling a services ecosystem (think Accenture's billions/yr on AWS). Three implications: (1) the S-1 narrative just gained durable, defensible recurring revenue beyond raw API tokens; (2) the existence of a Global Premier tier signals Anthropic expects multi-billion-dollar consulting practices on Claude alone within 24 months; (3) <b>“certified Claude practice”</b> becomes a vendor RFP checkbox, which raises switching costs for enterprise buyers. This is the unglamorous moat the GPT-5.5 + Bedrock GA story (Jun 2) doesn't have yet.",
            doIt: "If you sell AI services, get one engineer through Claude certification this month — it's still cheap status, the tier counts reset Jul 1 and again Oct 1 this year. If you <i>buy</i> AI services, add “certification tier” to vendor scorecards — Preferred+ means real bench depth, not someone who watched a YouTube tutorial." },
          { sub: "EU clock: Aug 2, 2026 transparency rules — and a final Code of Practice this month", tags:["policy"],
            p: "The EU Commission's draft transparency guidelines (Article 50) closed consultation on <b>Jun 3</b>; the <b>final Code of Practice on marking and labeling AI-generated content</b> publishes this month, and <b>obligations bind on Aug 2, 2026</b> — <b>58 days from today</b>. Scope: interactive AI disclosure (users must know they're talking to AI), emotion-recognition and biometric-categorization notice, and deepfake / synthetic-content labeling. Fines: up to <b>€35M or 7% of global turnover</b>.",
            why: "The Aug 2 deadline has been on calendars for a year, but two things changed this week: the omnibus did <b>not</b> push transparency back (high-risk obligations got delayed to Dec 2027 — transparency did not), and the final Code of Practice is the legally privileged interpretation. Connecting the dots with this week's other stories: Anthropic's NATO/ENISA partnerships, Microsoft's MAI rollout in EU, and OpenAI's global GPT-Rosalind opening all run through a regime that becomes binding in 8 weeks.",
            doIt: "Today, do two things. (1) <b>Map every customer-facing AI surface</b> against the four Article 50 categories and tag “EU exposure: yes/no.” (2) For each yes, decide on a labeling mechanism this week — visible UI marker for chat (“AI”), C2PA/SynthID watermark for generated images, transcript footer for voice. Don't wait for the Code's final text — labels are cheap, removing them is cheaper than retrofitting them under audit." }
        ]
      },
      { h: "Sharpen your edge",
        blocks: [
          { sub: "Learn pass^k — the one metric that separates a demo from a deployable agent",
            p: "Every team builds agents on <b>pass@k</b> (the probability the agent succeeds on at least one of k runs). Frontier models all look great on it. But the metric that predicts production reality is <b>pass^k</b> (“pass wedge k”): the probability the agent succeeds on <b>all</b> k runs. On τ-bench, GPT-4's pass@1 ≈ 61% — but its <b>pass^8 collapses to ~25%</b>. That ~36-point gap is exactly where users churn. Three moves to internalize:",
            list: [
              "<b>Track pass^k in your eval suite, not just pass@1.</b> Run each task <b>k=5 or k=8 times</b>, count only tasks that pass <b>every</b> run, gate CI on that number. The first time you do this, you will be embarrassed by your headline metric — that's the point.",
              "<b>Most pass^k loss comes from non-determinism in tool use, not the model.</b> A retry that succeeds because the model rolled a different chain-of-thought is a reliability bug, not a feature. Pin <code>temperature=0</code> in production paths, make tool calls <b>idempotent</b> (we taught this last Sunday — same idea), and add explicit re-tries with the same input so a transient flake doesn't double-bill or double-act.",
              "<b>Build a verifier into the loop.</b> The planner → worker → verifier pattern (Issue #2 weekly) is the single most effective pass^k booster — a hard rubric or test suite at the end of every run will catch the 1-in-8 hallucination that kills your customer trust. Frame it: <i>pass@k is for sales demos; pass^k is for paying customers.</i>"
            ] }
        ]
      }
    ],
    sources: "NVIDIA / Artificial Analysis / ChatForest / Decrypt (Nemotron 3 Ultra benchmarks, June 4 release) · OpenAI (Introducing new capabilities to GPT-Rosalind; Rosalind Biodefense) · pharmaphorum / TechTimes / techgenyz (GPT-Rosalind reporting) · ChatForest / NxCode / DEV (Windsurf → Devin Desktop; ACP; Devin Local) · Anthropic (Services Track and Partner Hub) · Yahoo Finance / PYMNTS / Channel Insider / StartupHub.ai (Partner Network detail) · Global Policy Watch (EU Article 50 draft guidelines) · European Commission (Code of Practice; consultation closed Jun 3) · arXiv / philschmid.de / Runloop / Sierra (τ-bench pass^k research). Index scores, valuations, and forward-looking timelines are directional."
  },

  /* ===================== DAILY — Thu Jun 4 ===================== */
  {
    id: "2026-06-04-daily",
    type: "daily",
    week: "Week of May 31 – Jun 6, 2026",
    title: "Daily Briefing — Thursday, June 4",
    dateLabel: "Thursday, June 4, 2026",
    sortDate: "2026-06-04",
    tldr: [
      "<b>The story this week: frontier AI got geopoliticized.</b> In 72 hours we got a US executive order asking labs to hand over pre-release models, Microsoft cutting the OpenAI cord with its own foundation models, Anthropic's IPO filing, China consolidating around DeepSeek, and Mythos shipping to NATO. Capability is no longer the differentiator — sovereignty, distribution, and trust are.",
      "<b>Trump's June 2 AI EO flips last week's narrative.</b> The order he <i>canceled</i> on May 25 returned, reframed as a <b>“voluntary” 30-day pre-release review</b> for any “covered frontier model.” Voluntary in name; coercive once your competitors opt in.",
      "<b>Microsoft Build: in-house foundation models.</b> <b>MAI-Thinking-1</b> (35B active / ~1T sparse MoE, 256K context, AIME 2026 = 94.5%) and <b>MAI-Code-1-Flash</b> (5B, now default-eligible in GitHub Copilot, +16 pts over Haiku 4.5 on SWE-Bench Pro). Trained without OpenAI data — Redmond is hedging.",
      "<b>Anthropic filed a confidential S-1 on June 1</b> at a reported ~$47B run-rate; <b>Project Glasswing expanded to 150 more orgs in 15+ countries</b> including <b>NATO and ENISA</b> — frontier AI is now state-grade security infrastructure.",
      "<b>DeepSeek's first-ever VC round</b> is closing at <b>~$7.4B</b> (Tencent, CATL, founder, NetEase, JD) at a <b>$52–59B</b> valuation — China's answer is a single national champion, not a portfolio."
    ],
    sections: [
      { h: "What changed today (and over the 72-hour bridge from Monday)",
        blocks: [
          { sub: "Trump's AI EO: “voluntary” pre-release review with mandatory implications", tags:["policy","model"],
            p: "On June 2 the White House issued <i>Promoting Advanced AI Innovation and Security</i> — the order Trump pulled on May 25 returned, but redesigned. Treasury + NSA + DHS get a <b>classified benchmarking process</b> to label any model with “advanced cyber capabilities” a <b>covered frontier model</b>. Labs that opt in submit those models for review <b>30 days before public release</b> and pick “trusted partners” for early access. Explicitly no licensing, no permitting — but the order also stands up an AI cybersecurity clearinghouse run out of Treasury/NSA/CISA.",
            why: "Tuesday's daily called the US federal picture “unsettled.” One week later, the federal picture is a <b>soft licensing regime in voluntary clothing</b>. Once OpenAI/Anthropic/Google sign on — which they will, because early-access wins them government contracts — every smaller lab faces an implicit choice: opt in or look reckless. This is also the <b>operational counterpart</b> to Anthropic's Glasswing: government wants the same dual-use security access private labs are now selling.",
            doIt: "If you ship anything that could plausibly be called a “covered frontier model” (any agent with strong code/security capability), start building the audit artifacts now: model card, eval suite, red-team report, training-data provenance — the same package required for the EU AI Act in Aug 2026. Build the artifact once, use it for both jurisdictions." },
          { sub: "Microsoft Build: the hyperscaler that no longer needs OpenAI's models", tags:["model","money"],
            p: "At Build (June 2), Microsoft's Superintelligence Team shipped <b>MAI-Thinking-1</b> (its first in-house reasoning model — 35B active params over a ~1T sparse MoE, 256K context, hits 97.0% AIME 2025 and 94.5% AIME 2026, matches Opus 4.6 on SWE-Bench Pro per Microsoft's blind testing) and <b>MAI-Code-1-Flash</b> (5B coding model, already rolling out as a default-eligible option in <b>GitHub Copilot</b>, claimed +16 pts over Claude Haiku 4.5 on SWE-Bench Pro). Both trained from scratch on “commercially licensed” data — no OpenAI distillation.",
            why: "Last week's weekly flagged the “license, don't merge” pattern as labs route around antitrust. The mirror move is now visible: a hyperscaler building <b>its own foundation stack so it doesn't depend on a single supplier</b>. Three implications: (1) the April Microsoft–OpenAI <b>exclusivity drop</b> wasn't a one-off, it was the starting gun; (2) Copilot is now a <b>model-agnostic product</b> — MAI-Code-1-Flash, Claude, GPT will compete inside the same picker; (3) <b>“built on clean data”</b> is the new enterprise selling point as IP lawsuits accumulate.",
            doIt: "If you build on top of GitHub Copilot, instrument <b>per-task model attribution</b> in your usage logs now — Microsoft's default routing will start sending small/cheap requests to MAI-Code-1-Flash silently, and you want to catch quality regressions before users do. Re-run your evals when the picker changes." },
          { sub: "Anthropic S-1 + Glasswing → NATO: AI as state infrastructure", tags:["money","research","policy"],
            p: "On June 1 Anthropic confidentially filed a draft S-1 with the SEC after the $65B / ~$965B Series H, reportedly on a ~$47B revenue run-rate (up from ~$10B annualized a year ago — fast-moving, directional). The same week, <b>Project Glasswing expanded by 150 orgs across 15+ countries</b> — newly named partners include <b>NATO, ENISA, Samsung, SK Hynix, SK Telecom, and Okta</b> — covering power, water, healthcare, comms, and hardware. Cumulative claim: <b>10,000+ high/critical vulns surfaced</b>.",
            why: "Two threads close in one move. (1) The IPO is the <b>first major frontier-lab listing</b> — once it prices, Anthropic's compute spend and gross margins become public, which permanently changes how the rest of the industry is benchmarked. (2) Mythos in NATO and ENISA means Anthropic is now part of <b>allied critical-infrastructure defense</b> — the same posture the Trump EO is formalizing. The export-control conversation about frontier AI just got real.",
            doIt: "Stop treating model choice as a pure cost/quality decision for any product touching critical infrastructure, government, or EU regulators. Add a third axis: <b>provenance and jurisdiction</b>. Document which model powers which feature and where its weights live — your enterprise buyers will ask within 12 months." },
          { sub: "DeepSeek's first VC round: China picks a champion", tags:["model","money"],
            p: "DeepSeek is closing its first-ever outside round at <b>~$7.4B</b> (Bloomberg, June 3) at a <b>$52–59B</b> post-money. Lineup: <b>founder Liang ¥20B of his own money</b>, <b>Tencent ¥10B</b>, <b>CATL ¥5B</b>, plus the National AI Industry Investment Fund, NetEase, JD.com.",
            why: "DeepSeek built V3/R1/V4 famously <i>without</i> outside capital. Taking ¥50B from a state-fund-aligned consortium is a strategic pivot: they need US-restricted compute, and the only way to get it at scale is to plug into the national champions. Compare to the US picture (multiple frontier labs, distributed cap table) vs. China (one open-weight standard-bearer, concentrated state-adjacent capital). The <b>price-pressure thread</b> from Saturday's daily (DeepSeek 100× cheaper output tokens) is now backed by tens of billions in compute funding — expect the price gap to widen, not close.",
            doIt: "If you've been delaying a DeepSeek V4 evaluation because “the company is fragile,” drop that thesis — capitalization is no longer the risk. The real risk for Western teams using DeepSeek is now <b>jurisdictional</b> (EU/US data flows, the Trump EO's covered-model logic if you fine-tune)." },
          { sub: "OpenAI ships GPT-5.5 + Codex on AWS Bedrock (GA)", tags:["tool","model"],
            p: "Also June 2: GPT-5.5, GPT-5.4, and Codex went GA on Amazon Bedrock after an April limited preview. Codex hit <b>5M+ weekly users</b> during the preview window (from 4M in April, +25%). Bedrock spend can be applied against existing AWS commits.",
            why: "Operationally significant: enterprises with AWS commits no longer have a procurement excuse for skipping OpenAI. Strategically, this completes the <b>“OpenAI is on every major cloud”</b> picture (Azure, AWS, Oracle), which is exactly the distribution leverage you'd expect right before an IPO. It also <b>recontextualizes Build</b>: Microsoft shipping in-house models the same day OpenAI ships on AWS Bedrock isn't a coincidence — it's both sides publicly de-coupling." }
        ]
      },
      { h: "Sharpen your edge",
        blocks: [
          { sub: "Learn the “covered frontier model” concept — it's the new regulatory chess piece",
            p: "The Trump EO doesn't define “covered frontier model” by parameter count or training FLOPs (the Biden EO's lever). It defines it by <b>capability</b> — specifically, advanced cyber capabilities measured by a classified benchmark. That's a meaningful shift: a small, fine-tuned, open-weight model could in principle qualify if it gets too good at finding vulnerabilities. Three things to internalize:",
            list: [
              "<b>Capability-based regulation = post-hoc.</b> You can't tell at training time whether your model will be covered. Build your eval pipeline so you can <i>measure</i> cyber-offensive capability the same way you measure benchmark scores — METASPLOIT-style task suites, CTF eval sets, vulnerability-discovery rates on a held-out corpus.",
              "<b>The “voluntary” framing is the same one that produced HIPAA Safe Harbor and SOC 2.</b> Voluntary frameworks become market floors within ~24 months because customers demand the badge. Plan to be compliant by mid-2027, not “if” it becomes mandatory.",
              "<b>The EU AI Act and this EO will converge.</b> Both require model cards, eval reports, red-team summaries, and training-data documentation. Build the artifact <b>once</b> as a single source of truth (a private model card + JSON eval results), and emit jurisdiction-specific exports from it. You'll save 6 months of duplicative compliance work."
            ] }
        ]
      }
    ],
    sources: "White House (Promoting Advanced AI Innovation and Security EO, Jun 2) · CNBC / JURIST / Lawfare / Ropes & Gray / Crowell & Moring (EO analysis) · Microsoft AI / GitHub Changelog (MAI-Thinking-1; MAI-Code-1-Flash; Build 2026) · CNBC (Microsoft AI models lessen reliance on OpenAI) · Anthropic (confidential S-1; Expanding Project Glasswing) · TechCrunch / NPR / Yahoo Finance (Anthropic IPO) · Cybersecurity Dive / SecurityWeek (Glasswing → NATO, ENISA, Samsung, Okta) · Bloomberg / SCMP / Tech Startups (DeepSeek ¥50B round) · AWS News Blog / OpenAI (GPT-5.5 + Codex GA on Bedrock). Run-rate, valuation, and benchmark figures are directional."
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
