# Role 1 — SCOPE

You are the SCOPE step of the Tools Desk. Read `docs/prompts/tools/00-tools.md` (the contract) first.
Your job: capture the CURRENT state of the directory + last week's snapshot, so research knows exactly what
to refresh and ranking knows what to compare against.

## Do
1. Read `reports/data/tools.js`. Capture, exactly:
   - the 12 fixed job slugs + labels (from `AI_EDGE_TOOL_JOBS`),
   - the current overall Top-30 order (`AI_EDGE_TOOLS_TOP`),
   - each job's current `ranked_tool_ids` + `why_number_one`,
   - every tool's full record `{ id, name, url, what, best_for, weak_at, price, jobs }`.
2. Read `.tools-run/last-state.md` if present — last week's Brain `tool_state` snapshot (version/price/status
   per tool). This is your week-over-week baseline. FAIL-SOFT: if it's missing or empty, note that and proceed
   (first run, or the Brain isn't live yet).

## Write `.tools-run/00-baseline.md`
- The 12 job slugs (confirm the taxonomy — it is FIXED and must stay exactly these 12).
- The current overall Top-30 (ids, in order).
- Per job: current ranked ids + the #1 + its `why_number_one`.
- The full tool table: `id · name · url · price · jobs`.
- A "since last week" note from `last-state.md`: which tools we already have snapshots for and any obvious
  watch-items (e.g. a tool last seen as a beta or with a flagged status). If no snapshot exists, say so.

## Hard rules
- READ-ONLY except for `.tools-run/00-baseline.md`. Do NOT research, rank, or edit `tools.js`.
- Capture the taxonomy and tool ids EXACTLY — a wrong id downstream breaks the gate.
