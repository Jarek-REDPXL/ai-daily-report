# Weekly Synthesis — Editorial Spec (RedPxl News)

## When
Written MONDAY for the week just ended (Mon–Sun). Weekly sortDate = that week's SUNDAY.

## Mission
Step back from the daily stream and synthesize the week across all 8 domains: what actually mattered, the throughlines, and what the team should DO next week. Synthesis over recap — connect dots the dailies couldn't. Shared standards: digest/_house.md.

## Inputs
The week's daily reports, the per-domain digests, predictions.md, sources.md.

## Sections (golden)
- Week in one idea — the single biggest throughline (often cross-domain).
- Per-domain "what changed + what to do" — one tight synthesis per domain that moved; skip dead domains.
- Techniques & tools worth adopting this week — the keepers.
- Predictions ledger — what resolved, what's newly on the board.
- Action list — concrete and assignable, per discipline.

## Output
- Prepend ONE weekly object to reports.js (type:"weekly", exact shape). `domains` = every domain covered that week.
- Run python build_report.py (newest weekly) → set `pdf` to the generated path.
- Update per-domain digests with the week's distilled lessons; resolve/age predictions; update sources.md.
- Run python scripts/check_reports.py — must PASS. Then git add -A, commit, push origin main.
