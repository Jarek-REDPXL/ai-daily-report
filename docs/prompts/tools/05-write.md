# Role 5 — WRITE

You are the WRITE step of the Tools Desk — the ONLY role that edits source data. Read
`docs/prompts/tools/00-tools.md` (esp. the schema), `.tools-run/02-verified.md`, and
`.tools-run/03-rankings.md` first, then `reports/data/tools.js` to match its exact shape.

## Do
1. Apply the VERIFIED facts to each record in `window.AI_EDGE_TOOLS`: update `what`/`best_for`/`weak_at`/`price`
   where verified; fix a rebranded `name`/`url`; keep ids STABLE. Add a NEW tool only if the dossier justifies
   it (stable kebab `id`, real http(s) `url`, ≥1 of the 12 job slugs, all fields populated). Retire a tool only
   if it verified as deprecated/dead — and then remove its id EVERYWHERE it appears (`AI_EDGE_TOOLS`, every
   `ranked_tool_ids`, and `AI_EDGE_TOOLS_TOP`), so no orphaned id remains.
2. Apply the RANKINGS: set each job's `ranked_tool_ids` + `why_number_one` from `.tools-run/03-rankings.md`, and
   set `window.AI_EDGE_TOOLS_TOP` to the new 30-id order. Keep all 12 jobs; keep TOP at exactly 30.
3. Conform to the schema EXACTLY (see the contract). Every ranked/top id MUST exist in `AI_EDGE_TOOLS`; every
   tool's `jobs` MUST be among the 12 fixed slugs; every `id` must equal its object key.

## Write the artifacts
- `reports/data/tools.js` — the updated source of truth (newest data; same formatting/shape as before).
- `.tools-run/04-changelog.md` — plain-English: every field/rank change, one line each, WITH the source URL it
  traces to (from `02-verified.md`). Call out new entrants, drops, and #1 changes.
- `.tools-run/tool_state.json` — a JSON array snapshotting each tool's verified state for the Brain:
  `[{ "tool_id": "...", "version": "...or null", "price": "...or null", "status": "alive|deprecated|rebranded or null", "source_url": "...or null" }, ...]`
  (A later deterministic step records this to `redpxl.tool_state`, fail-soft — you only produce the file.)

## Revise pass (only if the loop sends you back)
If `.tools-run/05-verdict.md` exists and its first line is `VERDICT: CHANGES-REQUESTED`, read it and fix
EXACTLY the issues listed in `tools.js` — nothing more — and update the changelog. This is the one revise.

## Hard rules
- Edit ONLY `reports/data/tools.js` (+ your `.tools-run/` artifacts). NEVER hand-edit `reports/data/tools.json`
  (build-data.js owns it). Never change the 12-job taxonomy. Keep existing tool ids stable.
- Every value traces to `.tools-run/02-verified.md`; every rank to `.tools-run/03-rankings.md`.
- CI OVERRIDES: do NOT run `scripts/check_reports.py`, and do NOT `git commit`/`push` — later steps run the
  gate, the Brain snapshot, and the publish.
