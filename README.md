# Awards and Recognition Hub

**Verified award dates, fair ways to recognise people and teams, and tools to send recognition where people work.**

[Open the Hub](https://cyberdudeuk.github.io/awards-and-recognition-hub/) · [Contact form](https://github.com/cyberdudeuk/awards-and-recognition-hub/issues/new?template=contact.yml) · [Report a problem](https://github.com/cyberdudeuk/awards-and-recognition-hub/issues/new?template=bug_report.yml) · [Suggest an idea](https://github.com/cyberdudeuk/awards-and-recognition-hub/issues/new?template=feature_request.yml)

Formerly the **Recognition Opportunities Portal**. Page addresses, saved settings and calendar subscriptions carried over unchanged (ADR-11).

> **Status.** Public-good work, built and run by its service owner and published from a personal GitHub account.
> It is **not an official GOV.UK service**. It does not speak for any department, and no award organiser endorses it.
> Organisers own their dates and rules, so always check their page before you nominate.

| | |
|---|---|
| Release | v2026.11.22.18 (22 November 2026) |
| Sources verified | 22 November 2026. 16 of 17 organiser pages were confirmed. The Ethnicity Awards page could not be read because of a bot check |
| Build profile | Public sector › personal public-good work › UK-wide › central-government audience |
| Grade | **G4.** People rely on it to decide whether and how to nominate colleagues, so it carries a DPIA, a security review and accountability controls |
| Licences | Content: [Open Government Licence v3.0](LICENSE-CONTENT.md). Code: [MIT](LICENSE). Fonts: SIL OFL 1.1 ([fonts/](fonts/)) |
| Upkeep | One person, about **114 hours a year** (modelled). See [MAINTENANCE.md](MAINTENANCE.md) |

## What it does

- **Calendar.** Verified deadlines, ceremonies and preparation reminders for 14 award routes, exported as iCalendar (RFC 5545) with bounded reminders.
- **Routes and finder.** Which award fits which kind of work, with eligibility, evidence and a provenance code on every fact:

  | Code | Meaning |
  |---|---|
  | V | Verified |
  | P | From the supplied pack |
  | O | Operating rule |
  | S | Confirmed by the service owner |
  | L | Press report |
  | U or C | Unconfirmed |

- **Recognition methods.** Fair everyday recognition, the boundary between pay and recognition, and proportionality.
- **Workflows.** Nominate, publish and re-verify. People always send; the Hub never submits anything.
- **Ask and search.** One ranking runs over the whole Hub. No AI model runs on the page. Ask can hand a grounded prompt to your own assistant.
- **Assurance.** 63 self-checks run in the page, and each one is proven by a deliberate-break test (77 negatives). The Hub also carries a defect register, an adversarial view, a DPIA, an ATRS decision and a standards register.

## How it is built

One data file is the single source of truth. A small build assembles one self-contained page with no runtime dependency on any other host.

```
data/portal-data.json   events, registry, change records, releases (single source of truth)
src/shell.html          markup and styles, with placeholders
src/content.js          static content (global C)
src/app/NN-*.js         app parts, assembled in file-name order inside one scope; 99-init.js always runs last
build.py                assembles _site/: CSP hashes, QR and barcode, JSON-LD, llms.txt, open data
tools/                  lint, policy scan, source and staleness checks, digest, calendar export
tests/                  smoke + negatives, widths, axe-core, search evaluation, unit tests
```

```bash
pip install -r requirements.txt && python -m playwright install chromium
npm ci
python build.py                          # NAME_SCAN_LIST unset: the page reports K20 "scan not run"
npm run lint                             # ESLint on the assembled bundle; warnings fail
python tools/policy_scan.py --selftest && python tools/policy_scan.py
ALLOW_UNSCANNED=1 python tests/smoke.py 1280 light
python tests/widths.py && python tests/a11y.py && python tests/eval_search.py && python tests/unit_tools.py
python tools/visual_inspect.py                  # screenshots of every page, 1280/853/390 px, light and dark
```

**Private inputs never enter this repository.** The source tracker, packs and the list of removed identifiers stay private. CI receives the list only as the `NAME_SCAN_LIST` secret. The Pages workflow refuses to publish without it (`REQUIRE_SCAN=1`).

## Transparency: schedule, roadmap and backlog

- **Backlog:** [Issues](https://github.com/cyberdudeuk/awards-and-recognition-hub/issues). Ideas, bugs, content corrections and date changes each have a form.
- **Roadmap:** the Hub's *Build hub › Roadmap* page, plus [milestones](https://github.com/cyberdudeuk/awards-and-recognition-hub/milestones).
- **Update schedule:**

  | When | What happens |
  |---|---|
  | Weekly (Monday) | Source reachability check and deadline digest |
  | Daily | Staleness check against each source's re-verification cadence |
  | Hourly, working hours | Uptime check |
  | Within a cadence | Organiser dates are re-read by a person, at most 7 to 180 days apart per source |

- **Releases:** the [release log](CHANGELOG.md) and GitHub releases. Each release attaches its calendar pack.

## Contact

Use the [contact form](https://github.com/cyberdudeuk/awards-and-recognition-hub/issues/new?template=contact.yml). It is a GitHub issue form, so **what you write is public**: leave out personal details. If you cannot use it, ask a colleague to raise it for you. No email address is published anywhere in this project.

## Cite

See [CITATION.cff](CITATION.cff).
