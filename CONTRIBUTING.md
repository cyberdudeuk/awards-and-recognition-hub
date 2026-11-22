# Contributing

Thank you for helping. Start with an issue form:

- **Idea or wishlist item:** `feature_request.yml`
- **Bug:** `bug_report.yml`
- **Content correction:** `content_correction.yml`
- **Date change:** `date_change.yml`
- **Anything else:** `contact.yml`

Issues are public, so never include personal details, nominee names or contact details.

## Changing the Hub

1. **Edit the sources, never the built page.**
   - Data goes in `data/portal-data.json`.
   - Text goes in `src/content.js`.
   - Behaviour goes in `src/app/NN-*.js`. New work goes in a new numbered part placed before `99-init.js`.
2. **Every defect gets a check in the same change.**
   - Add a self-check in `runChecks` (`src/app/00-core.js`).
   - Add a deliberate-break entry in `NEG`, so the check is proven to fail.
   - Record the defect in `DEFECTS`.
3. **Calendar changes need a change record** in `changes`, with:
   - a source and a verification date
   - an approver role
   - the release
   - a calendar UID that never changes once published
4. **Use roles, not names.** No email addresses anywhere. `tools/policy_scan.py` fails the build if one appears.
5. **Run the checks** listed in the README. CI runs the same ones, and a change merges only when all of them pass.

## Style

Plain English and sentence case, in UK English. Every fact carries a provenance code and a source. Every new term of art goes in the glossary.
