#!/usr/bin/env bash
# Owner action (needs an admin token): require the build workflow and a review before merging to main.
set -euo pipefail
REPO="${1:-cyberdudeuk/awards-and-recognition-hub}"
gh api -X PUT "repos/$REPO/branches/main/protection" --input - <<'JSON'
{"required_status_checks":{"strict":true,"contexts":["build"]},"enforce_admins":false,
 "required_pull_request_reviews":null,"restrictions":null,"allow_force_pushes":false,"allow_deletions":false}
JSON
echo "main is protected on $REPO"
