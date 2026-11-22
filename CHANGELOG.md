# Release log

The full log, with notes for every release since v2026.10.17.1, lives in `data/portal-data.json` (`releases`). The Hub shows it under *Build hub › Release log*.

## v2026.11.22.18 (22 November 2026)

- **Renamed.** The Recognition Opportunities Portal is now the Awards and Recognition Hub. Identifiers are unchanged (ADR-11).
- **Sources re-read.** All 17 organiser sources were read again: 16 confirmed. The Ethnicity Awards page sits behind a bot check and is marked not re-verified.
- **New deadline.** The Civil Service AI & Data Challenge 2026 to 2027 closes on 10 December 2026 (CR-008).
- **Corrections.**
  - AiG: the page now gives 16 October.
  - KAVS: the announcement date is no longer stated on the nomination page.
  - Honours: the 12-to-18-month timescale is on the GOV.UK honours page.
- **New self-checks**, each with a deliberate-break test:
  - K62: old name
  - K63: release codes
  - K12: break test added
- **Defects fixed**, each with a check:
  - D40: old name in the masthead
  - D41: hand-pasted release codes
  - D42: false late-reminder warning
  - D43: email-shaped placeholder
  - D44: inline handler blocked by the CSP
  - D45: calendar subscription file not published
  - D46: phone-width overflow on two pages
  - D47: low-contrast hero buttons in dark mode
  - D48: small link targets
  - D49: squeezed route titles
  - D50: notes split into one line per link
- **Repository.** Source moved to a public repository, with CI, Pages, a policy scan, llms.txt, JSON-LD and `artefact:*` metadata.
