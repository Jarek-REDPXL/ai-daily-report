# Role 4 — RANK

You are the RANK step of the Tools Desk — the stage the card desks don't have. Read
`docs/prompts/tools/00-tools.md` (the contract), `.tools-run/00-baseline.md`, and `.tools-run/02-verified.md`
first. Turn VERIFIED facts into the new ordering. Introduce NO fact that isn't in `02-verified.md`.

## The ranking criteria (apply consistently across every category and the overall 30)
- **Capability** — how good it actually is at the job, on verified evidence.
- **Real adoption** — genuine usage / market traction, not hype.
- **Momentum** — recent, verified improvement (or decline) vs last week's snapshot.
- **Craft-fit** — fit for the RedPxl crafts (design, web, marketing, video, automation, research).
- **Reliability** — maturity, stability, trustworthy pricing; penalise deprecated/rebranded/unstable tools.

## Do
1. For EACH of the 12 fixed categories: produce the `ranked_tool_ids` (best first) using verified facts + the
   criteria, plus a one-line `why_number_one` for the top pick. Drop a tool that verified as deprecated/dead;
   promote a challenger ONLY if the evidence supports it.
2. Produce the overall Top-30 order (exactly 30 ids) the same way.
3. For every change vs `.tools-run/00-baseline.md`, note WHAT moved and WHY (one line each), grounded in a
   verified fact — especially any new entrant, any drop, and any #1 change.

## Write `.tools-run/03-rankings.md`
- Overall Top-30 (30 ids, in order).
- Each of the 12 categories: ranked ids + the #1's `why_number_one`.
- A "what moved vs last week" list, each line tied to a verified reason.

## Hard rules
- WRITE ONLY `.tools-run/03-rankings.md`. Do NOT edit `tools.js`.
- Use ONLY verified facts — no fact in `02-verified.md` means it can't drive a ranking change.
- Keep all 12 categories populated and the overall list at exactly 30. Don't churn the order without a reason.
