# The AI Edge — Running Knowledge Digest

> **This file is the project's long-term memory.** Every daily run READS it before
> writing (to stay consistent and build on prior insight) and UPDATES it after
> writing (to record what was learned). It is how the briefing compounds instead
> of starting from zero each day. Keep it tight — distilled judgment, not a news
> archive. Prune anything stale or superseded.

## How to use this file (instructions for each run)
1. **Before writing today's report:** read the "Active threads" and "Durable
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

## Recurring high-quality sources (cross-check, don't single-source)
buildfastwithai (daily roundups) · The Neuron · crescendo.ai · llm-stats.com · digitalapplied tracker · CNBC · Axios · The Information · blog.google · Anthropic / OpenAI / Microsoft AI official · arXiv. Always cross-check funding/valuation/benchmark figures against a 2nd source; mark fast-moving ones directional.

## Changelog (one line per run — newest first)
- 2026-06-06: restructured archive to Monday–Sunday weeks; weekly now written on Monday for the prior full week. Issue #1 = Week of May 18–24 (Google I/O), Issue #2 = Week of May 25–31. Added Mon May 18 daily. Sidebar derives week grouping from sortDate.
- 2026-06-06: digest seeded from May 19 – Jun 6 reports (backfill + autonomous runs).
