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
      "<b>Anthropic published a coordinated-pause proposal on June 4</b> (“When AI builds itself”) — the kicker: <b>Claude now authors >80% of code contributions to its own codebase</b>, and Anthropic engineers absorb ~8× more merged code daily than two years ago. Altman's response: “build the bomb, then sell people the shelter.” The IPO-track frontier lab just publicly raised the recursive-self-improvement alarm.",
      "<b>The bipartisan “Great American AI Act” discussion draft dropped (June 4)</b> — Obernolte (R-CA) + Trahan (D-MA), 269 pages. <b>3-year preemption of state laws that regulate model DEVELOPMENT</b> (deployment laws are NOT preempted), mandatory safety frameworks + semi-annual third-party audits + incident reports for labs >$500M revenue, codifies Commerce's CAISI. This directly invalidates last week's “plan around state laws” advice.",
      "<b>OpenAI shipped ChatGPT Dreaming V3</b> (June 4) — the background memory-synthesis pattern we taught two weeks ago (Anthropic's “dreaming,” Harvey's reported 6× task-completion lift) is now the default architecture in ChatGPT, with a <b>~5× compute cut</b> that enables Free-tier rollout next.",
      "<b>MiniMax M3 (June 1, weights still pending)</b> — claimed <b>SWE-Bench Pro 59</b>, <b>1M-token context</b> via a new sparse-attention variant (MSA), priced at ~5–10% of GPT-5.5. A second Chinese open-weight lab landing in frontier-class tier — the price-pressure thread is now a tier, not a model.",
      "<b>Capital is quietly rerouting out of LLM-only bets.</b> <b>Generalist AI</b> raised <b>$400M at $2B</b> (Nvidia, Bezos, Fei-Fei Li) for robot foundation models; <b>Flourish</b> raised <b>$500M at $2.5B</b> (Bezos ~$50M, Lux, GV) chasing the brain's <b>~20-watt</b> energy budget via connectomics. Embodied AI + neuromorphic efficiency are where the next “frontier” money is going."
    ],
    sections: [
      { h: "What changed (the 48-hour bridge from Thursday)",
        blocks: [
          { sub: "Anthropic calls for a coordinated pause — and accidentally reveals where it actually is", tags:["policy","research","model"],
            p: "On June 4 the Anthropic Institute (Jack Clark + Marina Favaro) published <b>“When AI builds itself”</b> arguing for a coordinated, multi-lab, multi-country slowdown if frontier labs approach <b>“full recursive self-improvement.”</b> The hard datapoint inside the post: <b>Claude now writes >80% of code contributions to its own codebase</b>, and Anthropic engineers are merging roughly <b>8× more code per day</b> than two years ago. Sam Altman dismissed the post as marketing — <i>“build the bomb then sell people a shelter.”</i>",
            why: "Three days after filing an S-1 at a reported ~$47B run-rate, the frontier lab most likely to IPO first publicly declared we are in striking distance of self-improving AI. That is not a safety-team blog post — it is a signal to investors, regulators, and competitors simultaneously. The implicit boast (“our model writes most of our model”) is also the strongest public claim yet that <b>AI is now meaningfully accelerating AI R&D</b> — exactly the substrate Trump's June 2 EO and the new Obernolte–Trahan draft (below) are racing to govern.",
            doIt: "Run the same measurement on yourself. What % of your team's merged code is AI-authored this month? What % of design docs? What % of test cases? Track the trend monthly — it is the single best leading indicator of when your hiring plan and quality-gate process need rewriting. Teams that don't measure this will over-hire by ~6 months and ship more bugs." },

          { sub: "Great American AI Act flips Wednesday's policy thesis: federal ceiling on state DEV laws", tags:["policy"],
            p: "Reps Jay Obernolte (R-CA) and Lori Trahan (D-MA) released a <b>269-page discussion draft</b> on June 4. Three moves matter: (1) <b>3-year preemption</b> of state laws <i>specifically regulating the development</i> of frontier AI models — but <b>use and deployment laws are NOT preempted</b>; (2) frontier developers above <b>$500M annual revenue</b> must publish <b>safety frameworks</b>, file <b>critical-incident reports</b>, and submit to <b>semi-annual third-party audits</b>; (3) codifies the Commerce Department's <b>Center for AI Standards and Innovation (CAISI)</b> as the federal locus.",
            why: "Last week's weekly told you to “plan around state laws — the federal picture is unsettled.” One week later, Congress drafted a federal ceiling that would <b>freeze California's frontier transparency act and Colorado's AI Act on the development side</b>. Pair this with the Trump EO: the Executive Branch gets the <b>covered-model early-access lever</b>, Congress gets the <b>safety-framework + audit lever</b>, and states are told to wait. Even as a draft, this is the most coherent US federal AI regime to date — and it is genuinely bipartisan, which means it is <i>not</i> a posture bill.",
            doIt: "Two roadmap changes. (1) If you're under $500M revenue, the audit/incident requirements don't bind you — but your enterprise buyers will ask within 90 days. Build the artifact <b>once</b> (model card + eval suite + incident runbook + red-team summary) and emit jurisdiction-specific exports for EU AI Act + Trump EO + CAISI. (2) Watch the <b>“development” vs “deployment”</b> line carefully — your <i>fine-tuning pipeline</i> may sit on the preempted dev side, while your <i>customer product</i> stays under state law. That is a new internal compliance boundary to draw on the org chart this quarter." },

          { sub: "ChatGPT Dreaming V3: the technique we taught two weeks ago is now the default", tags:["model","skill","tool"],
            p: "On June 4 OpenAI rolled out <b>Dreaming V3</b> to ChatGPT Plus/Pro (US first, Free tier next). A background process synthesizes a hierarchical memory state from your conversations <i>continuously</i>, replacing the old “saved memories” list as the primary store. The two key numbers: <b>~5× less compute</b> to serve memory features (which is why Free can get it), plus a visible <b>“memory summary” page</b> for inspection and editing.",
            why: "Two weeks ago the May 30 weekly taught this concept under its original name (Anthropic's “dreaming,” May 6) and flagged Harvey's reported <b>6× task-completion lift</b> after enabling it. It is now <b>the default architecture in both leading consumer chat products</b>. Session-scoped chat is the legacy paradigm; <b>persistent, asynchronously-curated memory</b> is the new floor. Two implications: any user-facing AI product without persistent memory just lost a leg of competitive parity — the gap will widen weekly. And the <b>compute economics flipped</b>: 5× cheaper means memory becomes free-tier table stakes, not a Pro upsell — so any pricing model that monetizes memory directly is on borrowed time.",
            doIt: "Build it into your own agent <b>this week</b> — no special infra required. See today's Sharpen for a drop-in template. The Harvey 6× is mostly an artifact of the <i>pattern</i>, not the provider." },

          { sub: "MiniMax M3: open-weight, 1M-context, frontier-class — at ~5–10% of GPT-5.5 pricing", tags:["model","money"],
            p: "MiniMax launched <b>M3</b> on June 1 (weights + technical report scheduled within ~10 days; <b>treat the benchmark claims as directional until independent reproduction</b>, ~June 11). Claims: <b>SWE-Bench Pro 59</b> (ahead of GPT-5.5 and Gemini 3.1 Pro, just behind Opus 4.7), <b>1M-token context</b>, native multimodality, OpenRouter pricing at roughly <b>5–10%</b> of frontier proprietary tokens. The architecture novelty is <b>MiniMax Sparse Attention (MSA)</b> — attention computed only over selected segments, dodging quadratic scaling.",
            why: "Saturday's price-spread thread (DeepSeek 100× cheaper output) just got reinforced by a <i>second</i> Chinese open-weight lab landing in frontier-class tier. The pressure is no longer one model — it is a tier. And <b>1M context as a commodity</b> kills a lot of RAG complexity for medium-sized codebases and document sets: if your retrieval pipeline exists primarily to compress context, MSA-style sparse attention is the architectural shift that eats it.",
            doIt: "When the M3 weights ship (~June 11), run your hardest <b>long-context</b> eval against M3 vs DeepSeek V4-Pro vs Opus 4.8 on three real tasks: (1) refactor across a ~500K-token monorepo, (2) synthesize from a 200-page contract bundle, (3) review a 50-file PR. The winner becomes your default for that <i>task class</i> — model selection per task class, not per app, is now the right granularity." },

          { sub: "Where the capital actually went this week: embodied AI + 20-watt brains", tags:["money","research"],
            p: "Two of this week's biggest non-frontier-lab rounds were not LLM bets. <b>Generalist AI</b>: <b>$400M at $2B</b> (Radical led; Nvidia NVentures, Bezos Expeditions, Fei-Fei Li, Naval, Eric Yuan in) for <b>embodied foundation models</b> — GEN-0 (Nov '25) reportedly “brought robots into the pretraining era,” GEN-1 (April '26) added dexterous manipulation. <b>Flourish</b>: <b>$500M at $2.5B</b> (Bezos ~$50M, Lux, GV, Catalio; cofounded by Internet Explorer creator and CTRL-labs founder Thomas Reardon) building <b>Cortex AI</b> aimed at the <b>brain's ~20-watt energy budget</b> versus the ~600W+ of a single training chip, via connectomics.",
            why: "Last week's weekly named compute + power as the moat. This week's funding placed <i>opposite</i> bets on that thesis: <b>(a)</b> move AI out of the data center into the physical world (Generalist) so revenue scales with deployed units, not GPUs; <b>(b)</b> re-architect the substrate so frontier capability stops needing the data center at all (Flourish). Either bet, if it pays, breaks the “whoever has the biggest cluster wins” narrative. The fact that the <i>same investor</i> (Bezos) is on both rounds tells you the smart money treats them as <b>complementary hedges</b> against frontier-lab compute lock-in — not competing theses.",
            doIt: "Add a column to your model-router spreadsheet for the next 12 months labelled <b>“physical-world / embodied”</b>. Even if you're software-only today, Bedrock AgentCore and OpenAI's ACP will start exposing physical-action APIs by 2027 — having a mental map of who's building the robot-side stack is how you don't get blindsided when an agent in your product needs to dispatch a real-world job." }
        ]
      },
      { h: "Sharpen your edge",
        blocks: [
          { sub: "Build “dreaming” into your agent this week — before everyone has it",
            p: "OpenAI and Anthropic just normalized the pattern. Here is the minimum viable version you can ship in a day, no special infra. After each session, fire a distillation prompt against the transcript and persist a JSON blob (Postgres / Redis / S3 — your call). On the next session, inject the blob instead of the raw transcript. That is the entire technique.",
            list: [
              "<b>The distillation prompt:</b> <code>You are curating long-term memory for an AI assistant. From the conversation below, output STRICT JSON with these keys: stable_preferences (user habits, tools, formatting, no-go topics — only if reaffirmed or repeated), current_projects (name + 1-line status + next step + due date if mentioned), open_questions (asked but not resolved), recurring_mistakes (errors we made — and the corrected behavior to remember), drop_list (anything from prior memory the user contradicted or marked stale). Rules: do not invent. If a field has no evidence, return []. Quote the conversation span that justifies each entry. Be terse.</code>",
              "<b>Inject the blob, not the transcript</b> at the start of the next session — you get continuity without burning the token budget.",
              "<b>Merge, do not overwrite.</b> Each cycle, ask the model to merge the new blob into the prior blob, applying the <code>drop_list</code> first. This curation loop is what produced the Harvey 6× — the storage layer alone won't.",
              "<b>Ship a “memory summary” view</b> in your UI. OpenAI ships it; your competitors will. Users who can see and edit their AI's memory trust it more, and your support volume drops because they fix wrong context themselves.",
              "<b>The trap to avoid:</b> never auto-merge sensitive fields (names, employers, health, finances) without a user-correction loop. Treat memory edits like database migrations — reviewable, reversible, audit-logged. This is exactly the surface area that will get audited under the Great American AI Act's incident-reporting rule for any lab over $500M."
            ] }
        ]
      }
    ],
    sources: "Anthropic Institute (“When AI builds itself,” Jun 4 — Jack Clark + Marina Favaro) · Al Jazeera / Quartz / Business Standard / Crypto Briefing (Anthropic pause proposal; Altman “bomb / shelter” response) · Roll Call / Axios / Nextgov / Public Citizen / ITI / Bloomberg Law (Great American AI Act discussion draft, Obernolte–Trahan, Jun 4) · OpenAI / Windows News / gHacks / TechTimes (ChatGPT Dreaming V3 rollout, ~5× compute cut, memory summary page) · VentureBeat / The Decoder / Kingy AI / Codersera (MiniMax M3; SWE-Bench Pro 59 claim; 1M context; MSA attention) · The Robot Report / SiliconANGLE / Bloomberg / Bezos Expeditions (Generalist AI $400M at $2B) · SiliconANGLE / TechFundingNews / The Next Web (Flourish $500M at $2.5B; Cortex AI; ~20-watt brain target) · Crunchbase News (Jun 5 weekly funding roundup). Benchmark, valuation, and run-rate figures are directional until independently verified."
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
      "<b>A quieter day — the week's big moves (Trump EO, Microsoft Build, the AI Act draft, Anthropic's S-1) all landed Jun 1–4; Friday was the market digesting them.</b>",
      "<b>Colorado's AI Act takes effect June 30</b> — and the new federal “Great American AI Act” draft would freeze it on the development side. The state-vs-federal collision is now the thing to watch.",
      "<b>A Claude Sonnet 4.8 leak keeps gaining credibility</b> — treat as rumor until Anthropic confirms, but a mid-tier refresh would reset the price/performance map again.",
      "<b>NVIDIA signaled a push to “reinvent the Windows PC”</b> around on-device AI — the on-device/edge thread continues."
    ],
    sections: [
      { h: "What changed today",
        blocks: [
          { sub: "Slow news day — and that's worth naming", tags:["practice"],
            p: "After a packed Jun 1–4 (Anthropic's S-1, Trump's AI EO, Microsoft's in-house MAI models, the Great American AI Act draft, MiniMax M3), Friday was mostly second-day analysis rather than new launches. No major model shipped.",
            why: "Most of the value on a quiet day is consolidation: the smart move is to act on the week's big shifts, not chase a thin headline.",
            doIt: "Use quiet days to do the homework the busy days created — today that means reading the actual Great American AI Act provisions if you're >$500M revenue, or benchmarking a cheap model while nothing new is competing for your attention." },
          { sub: "The state-vs-federal regulation collision sharpens", tags:["policy"],
            p: "Colorado's AI Act is set to take effect <b>June 30</b>; California's frontier-transparency rules are live. The Obernolte–Trahan federal draft (Jun 4) would preempt state laws that regulate model <i>development</i> for three years — but explicitly not <i>deployment</i>. Friday was largely legal teams parsing which of their obligations survive.",
            why: "This is the practical fault line for anyone building on AI in the US: your fine-tuning/training pipeline may fall on the (preempted) development side while your shipped product stays under state deployment law.",
            doIt: "Draw the development-vs-deployment boundary on your own stack now, so you know which obligations are federal-ceiling'd and which remain state-by-state." },
          { sub: "Rumor watch: Claude Sonnet 4.8 + NVIDIA's Windows PC play", tags:["model","tool"],
            p: "A <b>Claude Sonnet 4.8</b> leak gained traction (unconfirmed). Separately, NVIDIA signaled an initiative to “reinvent the Windows PC” around local AI acceleration.",
            why: "A Sonnet refresh would reprice the mid-tier (the workhorse for most production traffic); NVIDIA's PC push is another data point that inference is migrating toward the edge.",
            note: "Both are directional — leak + signal, not shipped product. Don't re-architect on a rumor; just keep your eval harness ready to re-run when Sonnet 4.8 actually lands." }
        ]
      },
      { h: "Sharpen your edge",
        blocks: [
          { sub: "Keep a “re-run on release” eval kit ready",
            p: "Weeks like this one show models reprice fast and often. The teams that benefit aren't the ones who read every leak — they're the ones who can drop a new model into a standing eval the day it ships and get a verdict in an hour. Maintain 3–5 of your real tasks as a fixed, scored eval set so any new model (Sonnet 4.8, MiniMax M3 weights, DeepSeek V4) gets an objective, same-day yes/no instead of vibes." }
        ]
      }
    ],
    sources: "buildfastwithai (Jun 5 roundup) · NeuralBuddies (Jun 5 recap) · Roll Call / Axios (Great American AI Act; Colorado AI Act effective Jun 30) · The Decoder (Sonnet 4.8 leak chatter) · NVIDIA. Quiet-day briefing; unconfirmed items flagged as directional."
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
      "<b>DeepSeek's first-ever outside funding broke cover</b> — ~<b>$7.4B</b> (≈¥50B) at a <b>$52–59B</b> valuation, with founder Liang Wenfeng reportedly putting in ~40% himself, alongside Tencent and CATL.",
      "<b>China is consolidating around one open-weight champion</b> rather than a portfolio of labs — and explicitly prioritizing research/AGI over near-term commercialization.",
      "<b>Microsoft Build Day 2</b> continued the in-house-model push from the day before (MAI-Thinking-1 / MAI-Code-1-Flash)."
    ],
    sections: [
      { h: "What changed today",
        blocks: [
          { sub: "DeepSeek raises ~$7.4B — and picks a side", tags:["model","money"],
            p: "Bloomberg/CNBC reported (Jun 3) DeepSeek is closing its first outside round at <b>~$7.4B</b> (≈¥50B), valuing it at <b>$52–59B</b>. Backers: founder Liang Wenfeng (~40% of the round himself), <b>Tencent</b>, battery giant <b>CATL</b>, the state-backed National AI Industry Investment Fund, NetEase, and JD. Management told investors it will prioritize <b>groundbreaking research and AGI</b> over short-term revenue, and keep models open-weight.",
            why: "DeepSeek built V3/R1/V4 without outside capital. Taking state-fund-aligned money is a strategic pivot: to scale under US compute restrictions, it's plugging into China's national champions. The contrast with the US (many labs, distributed cap tables) is now stark — China is backing <b>one</b> open-weight standard-bearer with tens of billions. Saturday's “DeepSeek 100× cheaper output” price-pressure thread is now funded to widen, not close.",
            doIt: "If you'd parked a DeepSeek V4 eval over “company fragility,” drop that thesis — capitalization is no longer the risk. The remaining risk for Western teams is <b>jurisdictional</b> (EU/US data flows; the Trump EO's covered-model logic if you fine-tune). Evaluate on merits; gate on jurisdiction." },
          { sub: "Microsoft Build, Day 2: the in-house stack continues", tags:["model","tool"],
            p: "Build's second day kept the spotlight on Microsoft's own foundation models (MAI-Thinking-1, MAI-Code-1-Flash now default-eligible in GitHub Copilot) and the broader “model-agnostic Copilot” direction.",
            why: "Reinforces Tuesday's read: the hyperscaler is decoupling from a single model supplier. Copilot is becoming a picker, not a pipe to one lab." }
        ]
      },
      { h: "Sharpen your edge",
        blocks: [
          { sub: "Separate ‘can I use this model’ from ‘should I, here’",
            p: "DeepSeek's raise is a clean example of why model selection now needs two independent gates. <b>Gate 1 (capability/cost):</b> does it pass your eval at an acceptable price? <b>Gate 2 (jurisdiction/provenance):</b> where do the weights live, where does data flow, and does any regulation (EU AI Act, Trump EO covered-model rules) attach if you fine-tune? A model can ace Gate 1 and still fail Gate 2 for a given product. Write both gates into your model-router doc so the decision is explicit, not accidental." }
        ]
      }
    ],
    sources: "Bloomberg / CNBC / Tech Startups / American Bazaar (DeepSeek ~$7.4B first round, $52–59B valuation, Tencent + CATL + founder) · Microsoft Build Day 2 coverage. Valuation/figures reported same-week; treat as directional."
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
      "<b>Trump signed the AI executive order</b> he'd canceled on May 25 — reframed as a <b>“voluntary” 30-day pre-release review</b> for “covered frontier models,” with no licensing but a new Treasury/NSA/CISA security clearinghouse.",
      "<b>Microsoft Build: in-house foundation models.</b> <b>MAI-Thinking-1</b> (reasoning) and <b>MAI-Code-1-Flash</b> (5B, default-eligible in GitHub Copilot) — trained without OpenAI data. Redmond is hedging its OpenAI dependence.",
      "<b>OpenAI shipped GPT-5.5 + Codex GA on AWS Bedrock</b> — OpenAI is now on every major cloud (Azure, AWS, Oracle) right before its IPO path."
    ],
    sections: [
      { h: "What changed today",
        blocks: [
          { sub: "Trump's AI EO: “voluntary” review with coercive gravity", tags:["policy","model"],
            p: "On Jun 2 the White House issued <i>Promoting Advanced AI Innovation and Security</i> — the order pulled on May 25, redesigned. Treasury + NSA + DHS get a classified process to label models with “advanced cyber capabilities” as <b>covered frontier models</b>; labs that opt in submit them for review <b>30 days before public release</b> and choose “trusted partners” for early access. Explicitly <b>no licensing or permitting</b>, plus an AI cybersecurity clearinghouse via Treasury/NSA/CISA.",
            why: "Last week's “US federal picture is unsettled” call flipped fast: this is a <b>soft licensing regime in voluntary clothing</b>. Once the big three opt in (early access wins government contracts), smaller labs face an implicit “opt in or look reckless.” It's also the public-sector mirror of Anthropic's Glasswing — government wants the same dual-use security access labs are selling.",
            doIt: "If you ship anything plausibly a “covered frontier model” (any agent strong at code/security), start the audit artifacts now: model card, eval suite, red-team report, training-data provenance — the same package the EU AI Act needs by Aug 2026. Build once, file twice." },
          { sub: "Microsoft Build: the hyperscaler that no longer needs OpenAI's models", tags:["model","money"],
            p: "At Build (Jun 2) Microsoft shipped its first in-house models — <b>MAI-Thinking-1</b> (reasoning) and <b>MAI-Code-1-Flash</b> (5B coding model, rolling out as a default-eligible option in <b>GitHub Copilot</b>), both trained on commercially-licensed data, no OpenAI distillation.",
            why: "The April Microsoft–OpenAI exclusivity drop wasn't a one-off — it was the starting gun. Copilot is now a <b>model-agnostic product</b>, and “built on clean data” is becoming an enterprise selling point as IP suits pile up.",
            doIt: "If you build on Copilot, instrument <b>per-task model attribution</b> in your logs now — default routing will start silently sending cheap requests to MAI-Code-1-Flash, and you want to catch quality regressions before users do." },
          { sub: "OpenAI GPT-5.5 + Codex GA on AWS Bedrock", tags:["tool","model"],
            p: "Also Jun 2: GPT-5.5, GPT-5.4, and Codex went GA on Amazon Bedrock (spend applies against AWS commits). Codex reportedly passed 5M weekly users.",
            why: "Enterprises with AWS commits lose their last procurement excuse to skip OpenAI. Shipping on AWS the same day Microsoft ships in-house models is both sides publicly de-coupling — right before OpenAI's IPO." }
        ]
      },
      { h: "Sharpen your edge",
        blocks: [
          { sub: "Learn “covered frontier model” — the new regulatory chess piece",
            p: "The EO defines scope by <b>capability</b> (advanced cyber ability, classified benchmark), not parameter count or FLOPs. That means a small fine-tuned open-weight model could qualify if it gets too good at finding vulnerabilities — you can't know at training time. Build your eval pipeline so you can <i>measure</i> cyber-offensive capability (CTF/vuln-discovery task suites) the way you measure benchmarks. And treat “voluntary” as a future market floor: voluntary frameworks (HIPAA Safe Harbor, SOC 2) become customer-demanded badges within ~24 months. Plan to be compliant by mid-2027." }
        ]
      }
    ],
    sources: "White House (Promoting Advanced AI Innovation and Security EO, Jun 2) · CNBC / NBC News / A&O Shearman (EO analysis) · Microsoft AI / GitHub Changelog (MAI-Thinking-1, MAI-Code-1-Flash, Build 2026) · GuruFocus (Trump EO + MAI-Code-1-Flash) · AWS News Blog / OpenAI (GPT-5.5 + Codex GA on Bedrock). Figures directional."
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
      "<b>MiniMax M3 launched</b> — an <b>open-weight</b> model claiming <b>SWE-Bench Pro 59</b> (ahead of GPT-5.5 & Gemini 3.1 Pro), a <b>1M-token context</b>, and native multimodality, at ~5–10% of frontier pricing. A second Chinese lab in frontier-class tier.",
      "<b>Anthropic confidentially filed its S-1</b> (IPO path) at a reported ~$47B revenue run-rate — ~5× year-over-year.",
      "<b>GitHub Copilot's token-based billing kicked in</b> June 1, drawing developer backlash over cost increases."
    ],
    sections: [
      { h: "What changed today",
        blocks: [
          { sub: "MiniMax M3: open-weight, 1M-context, frontier-class — at a fraction of the price", tags:["model","money"],
            p: "MiniMax (Shanghai) launched <b>M3</b> on Jun 1 (weights + technical report to follow within ~10 days — <b>treat benchmarks as directional until independent reproduction</b>). Claims: <b>SWE-Bench Pro 59</b> (ahead of GPT-5.5 and Gemini 3.1 Pro), <b>1M-token context</b> (5× M2.7), native image/video understanding, and OpenRouter pricing around <b>5–10%</b> of frontier proprietary tokens. The novelty is <b>MiniMax Sparse Attention (MSA)</b> — ~15.6× faster decode and ~9.7× faster prefill at 1M context vs M2.",
            why: "Saturday's price-spread thread (DeepSeek 100× cheaper output) just got a <i>second</i> Chinese open-weight entrant in frontier-class tier — it's now a tier, not a model. And <b>1M context as a commodity</b> erodes a lot of RAG complexity: if your retrieval pipeline mainly exists to compress context, sparse-attention long-context models are the architectural shift that eats it.",
            doIt: "When M3 weights ship (~Jun 11), run your hardest <b>long-context</b> tasks against M3 vs DeepSeek V4-Pro vs Opus 4.8: a ~500K-token monorepo refactor, a 200-page document synthesis, a 50-file PR review. Pick the winner <b>per task class</b>, not per app." },
          { sub: "Anthropic files its S-1", tags:["money","policy"],
            p: "Anthropic confidentially filed a draft S-1 with the SEC (Jun 1) after the $65B Series H, on a reported ~$47B revenue run-rate (up from ~$10B a year ago — fast-moving, directional).",
            why: "This is the <b>first major frontier-lab IPO path</b>. Once it prices, Anthropic's compute spend and gross margins become public — permanently changing how the whole industry is benchmarked.",
            doIt: "Watch for the eventual public financials: they'll be the first real, audited look at frontier-lab unit economics — gold for anyone modeling AI build-vs-buy costs." },
          { sub: "GitHub Copilot's token billing lands", tags:["tool","money"],
            p: "Copilot's shift to token-based “AI Credits” took effect Jun 1, with developers reporting sharp cost increases versus the old flat fee.",
            why: "Continues last week's cost-reckoning thread: unmetered agentic coding is being repriced toward usage. The winners measure cost-per-task, not seats.",
            doIt: "Instrument per-workflow AI spend now, and route cheap/high-volume tasks to a Flash-class or open-weight model so a billing change doesn't blindside your budget." }
        ]
      },
      { h: "Sharpen your edge",
        blocks: [
          { sub: "Treat unverified benchmark claims as hypotheses, not facts",
            p: "M3's SWE-Bench Pro 59 is a vendor claim before the weights and report are out. The disciplined move: log such claims as <b>hypotheses with a verification date</b> (here, ~Jun 11 when weights land), then confirm against your own eval before changing any default. This habit — never repricing your stack on a pre-release number — is what separates teams that ride the cheap-model wave from teams that get burned by a benchmark that didn't reproduce." }
        ]
      }
    ],
    sources: "DataNorth / WinBuzzer / MLQ.ai / TechTimes / Codersera (MiniMax M3; SWE-Bench Pro 59 claim; 1M context; MSA) · The Neuron (Jun 1 recap) · CNBC / TechCrunch (Anthropic confidential S-1; ~$47B run-rate) · buildfastwithai (Jun 1 roundup; Copilot token billing). Benchmark and run-rate figures directional until independently verified."
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
    week: "Week of May 25 – 31, 2026",
    title: "Daily Briefing — Sunday, May 31",
    dateLabel: "Sunday, May 31, 2026",
    sortDate: "2026-05-31",
    domains: ["ai-tooling"],
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
    week: "Week of May 25 – 31, 2026",
    title: "Daily Briefing — Friday, May 29",
    dateLabel: "Friday, May 29, 2026",
    sortDate: "2026-05-29",
    domains: ["ai-tooling"],
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
    week: "Week of May 25 – 31, 2026",
    title: "Daily Briefing — Thursday, May 28",
    dateLabel: "Thursday, May 28, 2026",
    sortDate: "2026-05-28",
    domains: ["ai-tooling"],
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
    week: "Week of May 25 – 31, 2026",
    title: "Daily Briefing — Wednesday, May 27",
    dateLabel: "Wednesday, May 27, 2026",
    sortDate: "2026-05-27",
    domains: ["ai-tooling"],
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
    week: "Week of May 25 – 31, 2026",
    title: "Daily Briefing — Tuesday, May 26",
    dateLabel: "Tuesday, May 26, 2026",
    sortDate: "2026-05-26",
    domains: ["ai-tooling"],
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
    week: "Week of May 25 – 31, 2026",
    title: "Daily Briefing — Monday, May 25",
    dateLabel: "Monday, May 25, 2026",
    sortDate: "2026-05-25",
    domains: ["ai-tooling"],
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
      "<b>The week in one idea: the industry pivoted to “the agent.”</b> At Google I/O and across the labs, the unit of work shifted from a chat turn to a supervised <i>fleet of agents</i> — model + runtime + a consumer agent, shipped together.",
      "<b>Google I/O 2026 (May 19) went all-in on agents</b> (~100 announcements): <b>Gemini 3.5 Flash</b> (frontier-ish at Flash price/speed), <b>Omni</b> (any-input→any-output), <b>Antigravity 2.0</b> (agent-first dev platform), Managed Agents in the API, and <b>Spark</b> — a 24/7 personal agent.",
      "<b>Anthropic answered with enterprise infrastructure:</b> self-hosted sandboxes (run agents inside your own VPC) and MCP Tunnels for private tool access — the data-residency story enterprises were blocked on.",
      "<b>DeepSeek made its 75% V4-Pro price cut permanent (May 24)</b> — frontier-class open-weight reasoning at ~¼ the cost of comparable US tokens; brutal downward pressure on inference pricing.",
      "<b>Learn this week:</b> writing <b>Skills</b> (markdown runbooks for agents), <b>context engineering</b> over prompt engineering, and <b>sub-agent + planning</b> orchestration — the durable leverage as models get stronger."
    ],
    sections: [
      {
        h: "1 · The week in one idea",
        blocks: [
          { sub: "From “a better chatbot” to “a supervised fleet of agents”",
            p: "The throughline of the week — anchored by Google I/O on May 19 — was that every major lab now ships an <i>agent stack</i>, not just a model: a frontier model, a <b>runtime</b> to run it autonomously (sandboxes, managed agents, tunnels), and increasingly a <b>consumer agent</b> (Spark). The job is moving from line-by-line prompting to <b>orchestration + verification</b>." },
          { sub: "What to watch from here",
            list: [
              "<b>Consumer agents go mainstream:</b> Gemini Spark is the most direct challenge to ChatGPT yet — expect a wider rollout within weeks.",
              "<b>Compute stays THE bottleneck:</b> the Blackstone–Google ~$5B TPU JV (May 18) is one more sign capital + power gate the frontier.",
              "<b>Open-weight price pressure intensifies:</b> DeepSeek's permanent cut resets build-vs-buy math for high-volume workloads."
            ] }
        ]
      },
      {
        h: "2 · Model & Capability Landscape — what to use for what",
        intro: "I/O reframed the competition around <b>price/speed + distribution</b>, not just top-of-benchmark. The practical map this week:",
        blocks: [
          { table: {
            head: ["When you need…", "Reach for", "Why"],
            rows: [
              ["High-volume / latency-sensitive / cheap", "Gemini 3.5 Flash", "Frontier-ish quality at Flash price/speed (~⅓ the cost of comparable frontier models); powers Spark"],
              ["Consumer “just do it for me”", "Gemini Spark", "Ambient 24/7 personal agent that reasons across your connected apps"],
              ["Any-input → any-output multimodal", "Gemini Omni", "Generates across modalities (SynthID-watermarked output)"],
              ["Cheapest tokens / self-host leaning", "DeepSeek V4-Pro", "75% cut now permanent — ~¼ the cost of equivalent US tokens"],
              ["Agent-first dev workflow", "Google Antigravity 2.0 · Anthropic sandboxes", "Multi-agent orchestration + VPC-local execution for sensitive data"]
            ]
          },
          note: "Leaderboard scores vary by source — treat as directional. The week's story isn't a new #1; it's that the <b>runtime</b> around the model is now the battleground." }
        ]
      },
      {
        h: "3 · Techniques & Skills to Learn (your leverage)",
        intro: "Study this section — it's where the compounding edge is as models get stronger.",
        blocks: [
          { sub: "“Skills” — the highest-leverage thing to learn now", tags:["skill"],
            p: "A <b>Skill</b> is a markdown file an agent loads for a specific task — an onboarding doc / runbook for an AI. Encode the procedure once; the agent follows it instead of you re-prompting. (Google also shipped <b>Science Skills</b> at I/O — the pattern is going mainstream.)",
            list: [
              "<b>Write a runbook, not a question.</b> Anticipate failure modes, say which tool to use when, and specify <b>when to stop</b>.",
              "<b>Structure with sections + tags</b> (<code>## instructions</code>, <code>## tool_guidance</code>, <code>## output</code>) — models follow delineated structure far more reliably.",
              "<b>Include 2–5 canonical few-shot examples</b> of the exact behavior wanted."
            ] },
          { sub: "Context engineering > prompt engineering", tags:["practice"],
            p: "Treat <b>context as a finite, precious resource.</b> Smarter models need <i>less</i> prescriptive prompting but <i>better</i> context curation — give the agent exactly what it needs, when it needs it, not everything." },
          { sub: "Sub-agents + a forced planning phase", tags:["practice"],
            p: "Force a <b>planning phase before generation</b> (practitioners report complex-coding success jumping from ~⅓ to ~⅔ just by planning first), and use specialized <b>sub-agents</b> with single jobs — one session doing everything causes context pollution." }
        ]
      },
      {
        h: "4 · Tools & Agentic Platforms",
        blocks: [
          { tags:["tool"], list: [
            "<b>Google Antigravity 2.0</b> — agent-first dev platform (desktop app, CLI, SDK, Managed Agents) with multi-agent orchestration.",
            "<b>Anthropic self-hosted sandboxes</b> (public beta) — run agents inside your own VPC (Cloudflare/Daytona/Modal/Vercel day one) + <b>MCP Tunnels</b> for private tool access.",
            "<b>MCP (Model Context Protocol)</b> — the standard way to connect agents to GitHub, Slack, Drive, etc. Wire up 1–2 MCP servers to your coding agent this week.",
            "<b>Gemini creative integrations</b> — Adobe (Firefly), Canva (Magic Layers), CapCut now inside Gemini."
          ],
          doIt: "Pick one repetitive weekly workflow and turn it into a Skill + sub-agent. Best ROI move right now." }
        ]
      },
      {
        h: "5 · Market, Money & Business",
        blocks: [
          { table: {
            head: ["Move", "Detail", "Signal"],
            rows: [
              ["Compute land-grab", "Blackstone–Google ~$5B TPU joint venture (May 18)", "Capital + power remain the gating moat"],
              ["Open-weight pricing", "DeepSeek V4-Pro 75% cut made permanent (May 24)", "Downward pressure on inference cost is structural, not promotional"],
              ["Distribution as moat", "Google pushing agents to billions of devices via Gemini/Android", "Reach, not just benchmarks, decides consumer-agent winners"]
            ]
          },
          note: "Fast-moving figures are directional. The durable pattern: capability is becoming table stakes; <b>distribution + runtime + price</b> decide outcomes." }
        ]
      },
      {
        h: "6 · This Week's Action List",
        checklist: [
          "Convert one recurring workflow into a <b>Skill</b> (markdown runbook + few-shot examples).",
          "Add a <b>planning phase</b> to your agent prompts; split big jobs into <b>sub-agents</b>.",
          "Wire up <b>1–2 MCP servers</b> to your coding agent.",
          "Pilot <b>Gemini Spark</b> (or ChatGPT agent mode) on one real personal workflow.",
          "Re-run your inference cost math against DeepSeek V4-Pro's now-permanent price.",
          "For sensitive data, evaluate <b>VPC-local agent execution</b> (Anthropic sandboxes) over vendor-cloud."
        ]
      }
    ],
    sources: "blog.google (I/O 2026: Gemini 3.5 Flash, Omni, Spark, Antigravity, Science Skills) · CNBC · Anthropic (self-hosted sandboxes; MCP Tunnels) · DeepSeek · digitalapplied tracker · buildfastwithai daily roundups (May 18–24) · llm-stats.com (figures directional where noted)."
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
    week: "Week of May 18 – 24, 2026",
    title: "Daily Briefing — Saturday, May 23",
    dateLabel: "Saturday, May 23, 2026",
    sortDate: "2026-05-23",
    domains: ["ai-tooling"],
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
    week: "Week of May 18 – 24, 2026",
    title: "Daily Briefing — Friday, May 22",
    dateLabel: "Friday, May 22, 2026",
    sortDate: "2026-05-22",
    domains: ["ai-tooling"],
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
    week: "Week of May 18 – 24, 2026",
    title: "Daily Briefing — Thursday, May 21",
    dateLabel: "Thursday, May 21, 2026",
    sortDate: "2026-05-21",
    domains: ["ai-tooling"],
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
    week: "Week of May 18 – 24, 2026",
    title: "Daily Briefing — Wednesday, May 20",
    dateLabel: "Wednesday, May 20, 2026",
    sortDate: "2026-05-20",
    domains: ["ai-tooling"],
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
    week: "Week of May 18 – 24, 2026",
    title: "Daily Briefing — Tuesday, May 19",
    dateLabel: "Tuesday, May 19, 2026",
    sortDate: "2026-05-19",
    domains: ["ai-tooling"],
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
      "<b>The pre-I/O positioning week opened with infrastructure.</b> <b>Blackstone and Google announced a ~$5B TPU joint venture</b> — capital + power locking in ahead of the model news.",
      "<b>Cursor shipped Composer 2.5</b> (built on Moonshot's Kimi K2.5) — agentic coding competition kept widening beyond the frontier labs.",
      "<b>The market set up for Google I/O (May 19):</b> expectations centered on agents, cheaper/faster Gemini, and a consumer personal agent."
    ],
    sections: [
      { h: "What changed today",
        blocks: [
          { sub: "Compute land-grab before the keynotes", tags:["money"],
            p: "Blackstone and Google announced a ~$5B TPU joint venture — financial capital pairing with a hyperscaler's silicon to lock in AI compute capacity.",
            why: "The week's model news would grab headlines, but the durable story is upstream: whoever secures compute + power sets the pace. Infra deals are a leading indicator of who ships next." },
          { sub: "Agentic coding competition widens", tags:["tool","model"],
            p: "Cursor shipped Composer 2.5 (built on Moonshot's Kimi K2.5), pushing IDE-native agentic coding forward — another sign the coding-agent race isn't just an Anthropic/OpenAI/Google story.",
            doIt: "If you code daily, keep a standing eval of 2–3 real tasks so you can objectively compare a new coding model (Composer, Claude Code, Copilot) the day it ships." }
        ]
      },
      { h: "Sharpen your edge",
        blocks: [
          { sub: "Read infra deals as a leading indicator",
            p: "Before a big launch week, watch the compute/power deals, not just the model teasers. A ~$5B TPU JV tells you who can afford to train and serve the next frontier model — often a better predictor of the next 6–12 months than any single benchmark. Keep a running note of who's securing compute; it's the cheapest forecast you'll ever get." }
        ]
      }
    ],
    sources: "blog.google · Bloomberg (Blackstone–Google TPU JV) · Cursor (Composer 2.5) · digitalapplied tracker (figures directional where noted)."
  }

];
