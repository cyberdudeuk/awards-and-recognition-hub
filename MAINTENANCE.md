# Maintenance

One person maintains this Hub. The effort below is **modelled**, not measured.

| Activity | Cadence | Modelled time |
|---|---|---|
| Re-read organiser pages flagged by the staleness check | 7 to 180 days per source | ~50 h/year |
| Approve and release calendar change records | As dates are published | ~20 h/year |
| Triage issues and ideas | Weekly | ~20 h/year |
| Dependency and security updates (Dependabot, CodeQL) | Weekly | ~12 h/year |
| Release checks and visual inspection (1280, 853 and 390 px; light and dark) | Each release | ~12 h/year |
| **Total** | | **~114 h/year** |

## Owner actions automation cannot do

- Add the `NAME_SCAN_LIST` repository secret. Until it exists, the Pages workflow refuses to publish.
- Protect the `main` branch (`tools/protect_branch.sh`, which needs an admin token).
- Re-read any page that blocks automated checks. The Ethnicity Awards page did this on 22 November 2026.
- Retire the Hub, or hand it to a successor, using the *Build hub › Handover* page.

## Rollback

Every release is tagged. To roll back:

1. Revert `main` to the previous tag.
2. Let the Pages workflow republish.

The `gh-pages` branch history also keeps every published build.
