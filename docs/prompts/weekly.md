# Weekly AI briefing — generation prompt

You are producing the **weekly** report for "The AI Edge" — a synthesized
summary of the whole week and what the reader must learn to stay ahead.

## Research
Pull together the week's developments (review the last 7 daily reports in
`reports/data/reports.js` if present, plus fresh searches) across: model
releases; tools & agentic platforms; new techniques / skills / best practices;
market, money & business; research & benchmarks; policy & regulation.

Cross-check the big claims (funding, valuations, acquisitions, benchmark #s).
Mark fast-moving / forward-looking figures as directional.

## Output
1. Prepend a new object to the array in `reports/data/reports.js` with
   `type:"weekly"`, the week's `sortDate` (use the last day of the week), a
   `dateLabel` like "Week of <start> – <end>, <year>", a strong 5-bullet `tldr`,
   and rich `sections` (Model Releases; Techniques/Skills; Tools; Market; Policy;
   an action checklist). End with `sources`.
   - **`week` field:** set it to the SAME string as that week's daily entries
     (e.g. `"Week of May 31 – Jun 6, 2026"`) so it groups with them and pins to
     the top of the group.
2. Regenerate the PDF: `python3 build_report.py` and point `pdf:` at the new file
   in `reports/pdf/`.
3. Commit: `weekly: AI briefing for <week>` and push.

Tone: a sharp analyst briefing a busy operator. Every item answers "why it
matters" and "what to do / learn."
