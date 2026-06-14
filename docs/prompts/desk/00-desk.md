# Content Desk — Contract (shared by every role)

A reusable, multi-agent card-generation loop driven by a JOB SPEC. Each role runs as its
OWN claude-code-action step (clean context) and passes work to the next via files in
`.desk-run/` (gitignored). This file is the contract every role obeys.

## The job spec
Every run targets one job: `docs/prompts/desk/jobs/<job>.md`. It defines: target domains,
`min_count`, the source bar, the framing, and (for research) candidate angles. READ THE JOB
SPEC FIRST — it overrides any default here.

## The line (run in order, each its own step)
1. SCOPE    (`01-scope.md`)    → `.desk-run/00-baseline.md`  — what already exists (no dupes)
2. RESEARCH (`02-research.md`) → `.desk-run/01-dossier.md`   — live, fully-sourced material
3. VERIFY   (`03-verify.md`)   → `.desk-run/02-verified.md`  — independent fact + URL check
4. WRITE    (`04-write.md`)    → `reports/data/cards.js` + `.desk-run/03-changelog.md`
5. AUDIT    (`05-audit.md`)    → `.desk-run/04-verdict.md`   — skeptical diff review

## The loop rule
If the audit verdict is CHANGES-REQUESTED, WRITE runs ONCE more (reading the verdict and
fixing exactly the issues listed), then AUDIT runs once more. Maximum **one** revise — no
further loops. If it still isn't PASS, the run fails and main is left untouched.

## The publish gate (ALL must hold to publish)
- `CHECK_LINKS=1 python scripts/check_reports.py` PASSES (0 dead links, schema valid), AND
- the final verdict's first line is exactly `VERDICT: PASS`.
Only then does a deterministic step commit (as "AI Edge Bot") and push to main. On any
failure (gate red OR final verdict CHANGES-REQUESTED OR a role errored) the job FAILS and
NOTHING is committed.

## Hard rules (every role)
- Never change the cards.js schema; never hand-edit derived files (build-data owns those).
- Real, working http(s) sources only — never fabricate a link or a number.
- Each role writes ONLY its own `.desk-run/` artifact — EXCEPT WRITE, which also edits
  `reports/data/cards.js`.
- Depth over volume; honest confidence flags; stop-and-report rather than guess.
