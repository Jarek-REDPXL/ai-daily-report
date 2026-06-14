# Digest — Web development (`web-dev`)

> Domain scope: build & code, frameworks, performance, architecture, tooling,
> APIs, CMS & deployment for the web. Shared mission + sourcing standard live in
> [`_house.md`](./_house.md); read that first, then this file.

## How to use this file (instructions for each run)
1. **Before writing:** read `_house.md` + the "Active threads" and "Durable
   lessons" below so today's entry advances the story and doesn't repeat.
2. **After writing:** update "Active threads" (add/advance/close), add any genuinely
   new "Durable lesson," and append one "Changelog" line.
3. Keep it under ~150 lines; retire quiet threads into "Durable lessons."

---

## Active threads (ongoing storylines to advance, not repeat)
<!-- one line each: thread → latest state + date. None yet — seed on first run. -->
- AI coding assistants → repo-level conventions files becoming the norm: GitHub Copilot reads `.github/copilot-instructions.md` (and path-scoped `.github/instructions/`) on every request in a repo (2026-06-02). Watch whether other assistants standardize an equivalent.
- **Terminal/agentic coding gets IDE-grade semantics:** GitHub Copilot CLI shipped a Language Server Protocol (LSP) integration — the agent does go-to-definition (into deps), find-all-references, project-wide rename and type resolution instead of grep/guess; setup ships as an "LSP Setup skill" (markdown runbook, 14 languages). Card: card-webdev-copilot-cli-lsp. Watch for Claude Code / Gemini CLI / Cursor to standardize an equivalent LSP hook. (2026-06-10)
- Governing LLM-feature COST in production: Cloudflare AI Gateway shipped dollar-denominated **spend limits** (block or fail-over-to-cheaper-model) on 2026-06-05 — the first mainstream proxy with a real hard cap. Lands the same week the market is repricing AI spend (`news`). Watch whether other gateways (OpenRouter, Vercel AI, Portkey) ship equivalents — cross-links to `thread-govern-ai-spend`. **Extended 2026-06-13:** the Fable 5/Mythos 5 government shutdown reframes the gateway from a *cost* tool to a *continuity* tool — a fallback model list (OpenRouter `models` array, etc.) means a yanked/down model fails over without a redeploy. Card: card-ai-tooling-model-portability.
- **Durable execution becomes a framework primitive:** Vercel's Workflow SDK now runs natively in **Nitro v3** (beta, 2026-06-13) — `"use workflow"` + `"use step"` directives give any Nitro/Vite full-stack app checkpointed, resumable steps (survive crash/timeout/retry; `sleep()` suspends free). Works best deployed on Vercel Fluid compute for now. Card: card-webdev-vercel-workflow-nitro. Watch for GA + non-Vercel runtime support, and for other meta-frameworks (Nuxt/SvelteKit) to standardize a durable-step directive.
- **The AI coding toolchain is now an attack surface:** Jun 8 2026 saw a re-compromise of Microsoft OSS repos (70+ disabled) dropping password-stealers when a poisoned repo is *opened inside* Claude Code / Gemini CLI / VS Code, plus a public local-root exploit for Linux nf_tables CVE-2026-23111 (patched Feb 5). Card: card-webdev-rotate-ai-toolchain. Watch for more agentic-IDE supply-chain incidents → "open a repo = code execution" becomes standard hygiene. (2026-06-09)
- **No-backend web — push computation to the browser:** Pyodide 314.0 (Jun 13 2026, tracks Python 3.14) + a PyPI change (PEP 783, landed Apr 21) lets package authors publish WebAssembly wheels straight to PyPI under the `pyemscripten_2026_0` tag (28 packages at launch), so `micropip.install('pkg')` pulls real Python libraries into a browser tab at runtime — no server, no API cost, data stays on the user's machine. Card: card-webdev-pyodide-browser-python (thread-no-backend-web). Watch the Wasm-wheel package count grow and whether numpy/pandas-class extensions standardise on self-published Wasm wheels. (2026-06-14)

## Durable lessons (the compounding edge — evergreen takeaways we've taught)
<!-- promote a thread's conclusion here once it's a stable, reusable principle. -->
- **State your conventions to the AI once, not per file:** a committed repo instructions file (`.github/copilot-instructions.md`) makes every suggestion follow your stack/naming/test style — the dev version of a persistent-memory loop. Keep rules short and concrete; vague rules get ignored.
- **Never ship an LLM feature without a hard cost ceiling:** route calls through a gateway and set a dollar spend limit with a fallback model, so a runaway loop or traffic spike can't quietly burn four figures. Unit-economics control is what makes "ship AI to prod" safe.
- **Treat opening a repo in an agentic IDE as code execution:** an agentic editor can auto-run tasks, read env files and run setup scripts, so a poisoned repo exfiltrates the secrets in your session before you run anything. Clone unknown code into a sandbox/devcontainer with no live secrets, and rotate keys after exposure.
- **Default to no backend when the work fits the browser:** a calculator, data explorer, or file processor can run client-side (WebAssembly — Pyodide for Python, Wasm builds for C/Rust) instead of as a hosted service. You delete the server, the API bill, and a privacy liability in one move (the user's data never leaves their machine). Lazy-load the heavy runtime on the click that needs it, never on page load.

## Changelog (one line per run — newest first)
<!-- YYYY-MM-DD: … -->
- 2026-06-14: Deep beat (flagship web, alternating to dev) — Pyodide 314.0 + WASM wheels on PyPI: run real Python in the browser with no backend, install packages at runtime via micropip. Card: card-webdev-pyodide-browser-python; seeded the thread-no-backend-web thread + durable lesson; logged a prediction (Wasm-wheel package count grows past 100 by Q3-end). Sources: Pyodide release blog + docs, Simon Willison.
- 2026-06-13: Deep beat (flagship web, alternating to dev) — Vercel Workflow SDK runs natively in Nitro v3 (durable, resumable steps via "use workflow"/"use step" in any Nitro/Vite app; beta, Vercel Fluid compute). Card: card-webdev-vercel-workflow-nitro; logged a prediction (Nitro v3 integration reaches GA by Q3-end). Also extended the cost-governance thread → continuity (gateway fallback after the Fable 5 shutdown; card-ai-tooling-model-portability). Sources: Vercel Changelog/Docs, workflow-sdk.dev.
- 2026-06-10: Deep beat (flagship web, alternating to dev) — GitHub Copilot CLI gains LSP/language-server code intelligence (go-to-def, find-refs, rename, type resolution; setup = an "LSP Setup skill", 14 languages). Card: card-webdev-copilot-cli-lsp; advanced the assistant-tooling thread; logged a prediction (another major AI coding CLI ships LSP by Q3-end). Sources: GitHub Blog, GitHub Docs.
- 2026-06-09: Scan-promoted security beat — Microsoft OSS supply-chain re-compromise (steals creds when repos opened in AI coding tools) + Linux nf_tables CVE-2026-23111 public local-root exploit. Card: card-webdev-rotate-ai-toolchain; seeded the AI-toolchain-attack-surface thread + durable lesson. Sources: TechCrunch, The Hacker News.
- 2026-06-08: Cloudflare AI Gateway **spend limits** (Jun 5) → card-webdev-ai-gateway-spend-limits + new cost-governance thread/lesson; tied into the cross-domain `thread-govern-ai-spend` (market repricing AI spend).
- 2026-06-07: Weekly Issue #3 (Week of Jun 1–7) — folded the Jun 2 Copilot-conventions play into the "govern the AI default" throughline; seeded the assistant-conventions thread + durable lesson.
