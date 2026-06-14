# Tools Desk — Contract (shared by every role)

A weekly, multi-agent pipeline that keeps `reports/data/tools.js` — the overall Top-30 AND each
of the 12 FIXED job categories — accurate, current, and fully sourced. It REUSES the Content Desk
pattern (`docs/prompts/desk`): one role per claude-code-action step (clean context), handing off via
files in `.tools-run/` (gitignored), with a bounded audit loop. This file is the contract every role
obeys. The Tools Desk is SEPARATE from the card desks and only ever writes `tools.js`.

## The line (run in order, each its own step)
1. SCOPE    (`01-scope.md`)    → `.tools-run/00-baseline.md`   — current tools + last week's snapshot
2. RESEARCH (`02-research.md`) → `.tools-run/01-dossier.md`    — each tool's current reality + challengers
3. VERIFY   (`03-verify.md`)   → `.tools-run/02-verified.md`   — independent fact + URL check
4. RANK     (`04-rank.md`)     → `.tools-run/03-rankings.md`   — Top-30 + per-job order from verified facts
5. WRITE    (`05-write.md`)    → `reports/data/tools.js` + `.tools-run/04-changelog.md` + `.tools-run/tool_state.json`
6. AUDIT    (`06-audit.md`)    → `.tools-run/05-verdict.md`    — skeptical diff review

## The loop rule
If the audit verdict is CHANGES-REQUESTED, WRITE runs ONCE more (reading the verdict, fixing only the
listed issues), then AUDIT runs once more. Maximum **one** revise. If it still isn't PASS, the run fails
and main is left untouched.

## The publish gate (ALL must hold to publish)
- `CHECK_LINKS=1 python scripts/check_reports.py` PASSES (0 dead links, `tools.js` schema valid), AND
- the final verdict's first line is exactly `VERDICT: PASS`.
Only then does a deterministic step commit (as "AI Edge Bot") and push to main. On any failure (a role
errors, gate red, or final verdict CHANGES-REQUESTED) the job FAILS and NOTHING is committed.

## The 12 FIXED job categories (NEVER change this taxonomy)
`automation` · `video-creation` · `video-editing` · `research` · `planning-sitemaps` · `graphic-design` ·
`web-design` · `web-development` · `email-retention` · `social-media` · `paid-ads` · `copywriting-cro`
A run updates CONTENT and RANKING only — it never adds, removes, renames, or re-slugs a category.

## tools.js schema (conform EXACTLY — gate-enforced)
Three globals:
- `window.AI_EDGE_TOOLS` — object map `id → { id, name, url, what, best_for, weak_at, price, jobs:[slug,...] }`.
  Gate-required & non-empty: `id` (must equal its key), `name`, `what`; `url` must be a real http(s) official
  site (link-checked under CHECK_LINKS=1); every entry in `jobs` must be one of the 12 fixed slugs; tool ids
  unique. (`best_for`, `weak_at`, `price` are part of the shape — keep them populated.)
- `window.AI_EDGE_TOOL_JOBS` — array of all 12 `{ slug, label, ranked_tool_ids:[id,...], why_number_one }`.
  Every `slug` ∈ the 12; no duplicate slugs; every ranked id must EXIST in `AI_EDGE_TOOLS`; keep `why_number_one`.
- `window.AI_EDGE_TOOLS_TOP` — array of the overall Top-30 tool ids (all must exist in `AI_EDGE_TOOLS`).

## Hard rules (every role)
- NEVER change the 12-job taxonomy; keep all 12 jobs populated and the overall list at exactly 30.
- Conform to the `tools.js` schema exactly; tool ids are STABLE (never rename an existing tool's id).
- Real, working http(s) urls only — never fabricate a link, version, price, or status.
- NEVER hand-edit derived files (`build-data.js` regenerates `reports/data/tools.json` from `tools.js`).
- Each role writes ONLY its own `.tools-run/` artifact — EXCEPT WRITE, which also edits `reports/data/tools.js`.
- Depth over noise; every change traces to a verified source; stop-and-report rather than guess.
- Brain reads/writes are FAIL-SOFT (no-op if `006_brain.sql` isn't applied yet) — never let them break a run.
