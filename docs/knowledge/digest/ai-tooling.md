# Digest — AI tools, skills & techniques (`ai-tooling`)

> Domain scope: AI models/agents/tools, new Claude features/skills/connectors,
> new skills & techniques (with how-to), research, and — for now — finance/markets
> & policy as they bear on AI/tech. Shared mission + sourcing standard live in
> [`_house.md`](./_house.md); read that first, then this file.

## How to use this file (instructions for each run)
1. **Before writing:** read `_house.md` + the "Active threads" and "Durable
   lessons" below so today's entry advances the story and doesn't repeat.
2. **After writing:** update "Active threads" (add/advance/close), add any genuinely
   new "Durable lesson," and append to the "Changelog" with one line.
3. Keep it under ~150 lines. When a thread goes quiet for 2+ weeks, move its
   one-line conclusion into "Durable lessons" and delete the thread.

---

## Active threads (ongoing storylines to advance, not repeat)
<!-- one line each: thread → latest state + date. Update/close as they evolve. -->
- **The agent grew up** → autonomy gained money (agentic payments: AWS AgentCore Payments, OpenAI ACP) + a reliability reckoning (<2% of enterprises at full prod scale). (as of Jun 6)
- **Recursive self-improvement goes public** → Anthropic's "When AI builds itself" (Jun 4): Claude authors >80% of its own codebase contributions; coordinated-pause proposal. (Jun 6)
- **US federal AI regime forming** → Trump EO Jun 2 ("voluntary" 30-day pre-release review for "covered frontier models") + bipartisan Great American AI Act draft Jun 4 (3-yr preemption of state DEV laws, audits >$500M rev). State-vs-federal collision is the watch-item. (Jun 6)
- **Open-weight price pressure → a tier, not a model** → DeepSeek V4 (~100× cheaper output) + MiniMax M3 (open-weight, 1M context, SWE-Bench Pro 59 claim). (Jun 6)
- **Compute/power = the moat** → ByteDance ~$70B infra, Anthropic ~$200B cloud/chips; capital + talent (Karpathy→Anthropic) concentrating at perceived leaders. (Jun 6)
- **Memory/"dreaming" is now table stakes** → ChatGPT Dreaming V3 (Jun 4) made async memory-synthesis the default in consumer chat (~5× cheaper). (Jun 6)
- **Hyperscalers decoupling from single model suppliers** → Microsoft in-house MAI models (Jun 2); Copilot model-agnostic. (Jun 6)
- **Capital rotating beyond LLMs** → embodied AI (Generalist $400M) + neuromorphic efficiency (Flourish $500M). (Jun 6)
- **Multi-agent orchestration becomes a built-in primitive** → Claude Code dynamic `/workflows` (research preview, late May) writes+runs an orchestration script across subagents from a plain-English "...workflow" request; June added nested subagents (5 levels). The planner→worker→verifier→merge shape is now product, not hand-wiring. Card: card-ai-tooling-claude-workflows. Watch for a 2nd major coding agent (Cursor/Gemini CLI/Copilot) to ship a comparable primitive. (2026-06-11)

## Durable lessons (the compounding edge — evergreen takeaways we've taught)
<!-- promote a thread's conclusion here once it's a stable, reusable principle. -->
- **Model choice = two independent gates:** (1) capability/cost (passes your eval at acceptable price?), (2) jurisdiction/provenance (where do weights live, what regulation attaches if you fine-tune?). A model can pass one and fail the other.
- **Keep a "model router":** map each recurring task to the cheapest model that passes a standing eval of 3–5 of your real tasks; re-check monthly — rankings/prices move weekly.
- **Treat unverified benchmark claims as hypotheses with a verification date,** never reprice your stack on a pre-release number.
- **Durable execution beats model IQ in prod:** checkpoint each step, make external actions idempotent, replay from last checkpoint. (Also stops a retried agent double-paying.)
- **Give spending agents a corporate card, not a blank check:** hard budget + per-tx cap + endpoint allowlist + human approval above a threshold + idempotency keys + audit log. (x402)
- **Build compliance artifacts once** (model card + eval suite + red-team + incident runbook), emit per-jurisdiction exports (EU AI Act, US EO/CAISI).
- **Planner → worker → verifier → merge** is the reliable multi-agent shape; never let one session do everything (context pollution).
- **The durable skills compound with stronger models:** orchestration, evals, judgment, context engineering, writing Skills (markdown runbooks).
- **Controls collapse → govern the system, don't operate it (weekly synthesis, Jun 1–7):** vendors/platforms keep retiring manual levers for AI-on defaults. The edge is the harness around the default — router + standing eval to pick/judge models, a persistent-memory loop and a conventions file so context is stated once, grounded Q&A over your own docs — plus one guarded manual control to prove the AI's lift before trusting it. The five Jun 1–7 dailies (Ollama, two-gate picker, release-day verdict kit, memory loop, NotebookLM) are one personal AI operating system, not five tips.

## Changelog (one line per run — newest first)
- 2026-06-15: Deep beat — Claude **Agent SDK billing split landed** (Jun 15): Agent SDK, `claude -p`, third-party Agent-SDK apps + **Claude Code GitHub Actions** stop drawing on the Claude plan → separate monthly credit ($20 Pro / $100 Max 5x / $200 Max 20x), metered at full API rates, **one-time opt-in you must claim**; past the credit, jobs halt unless usage credits are enabled (interactive TUI/IDE + claude.ai unaffected). Run-it-today: claim the credit + put a spend cap in front of any agent/CI workload. Card: card-ai-tooling-agent-sdk-credit (ties to card-webdev-ai-gateway-spend-limits + card-ai-tooling-model-portability). The "govern AI spend, not just consume it" instance of the controls-collapse lesson, now with a hard deadline. Sources: Claude Help Center, The New Stack, XDA. Logged a prediction (in-product Agent SDK spend dashboard/cap follows).
- 2026-06-11: Deep beat — Claude Code dynamic `/workflows` multi-agent orchestration (research preview late May + nested subagents in June) turns the planner→worker→verifier→merge lesson into a built-in primitive. Card: card-ai-tooling-claude-workflows; added the multi-agent-orchestration thread; logged a prediction (2nd coding agent ships a comparable workflow primitive). Sources: Anthropic Claude Code, Claude Code Docs, InfoQ. Note: Agent SDK/Actions metering split lands Jun 15.
- 2026-06-07: Weekly Issue #3 (Week of Jun 1–7) — synthesized the week's AI plays into one "personal AI operating system" + the cross-domain "controls collapse → govern the system" throughline; logged weekly prediction (≥2 more platforms retire manual campaign types by Sep 30). PDF: weekly-ai-report-2026-06-07.pdf.
- 2026-06-06: restructured archive to Monday–Sunday weeks; weekly now written on Monday for the prior full week. Issue #1 = Week of May 18–24 (Google I/O), Issue #2 = Week of May 25–31. Added Mon May 18 daily. Sidebar derives week grouping from sortDate.
- 2026-06-06: digest seeded from May 19 – Jun 6 reports (backfill + autonomous runs).
- 2026-06-06: ledger split into per-domain digests under docs/knowledge/digest/; this file inherited the AI/tech/markets threads, lessons, and changelog. Shared mission + sourcing moved to _house.md.
