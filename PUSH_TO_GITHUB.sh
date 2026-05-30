#!/usr/bin/env bash
# One-time setup: push The AI Edge to a PRIVATE GitHub repo under your account.
#
# Why this script exists: the environment that generated this repo had no
# GitHub credentials and the GitHub API was firewalled, so it could not create
# the remote repo for you. Run this on your own machine (where you're logged in).
set -e

ACCOUNT="redpxl"
REPO="ai-daily-report"

echo "==> Creating private repo $ACCOUNT/$REPO and pushing..."

if command -v gh >/dev/null 2>&1; then
  # Preferred path: GitHub CLI creates the private repo AND pushes.
  gh repo create "$ACCOUNT/$REPO" --private --source=. --remote=origin --push
  echo "==> Done. Repo is private and pushed."
else
  echo "GitHub CLI (gh) not found."
  echo "1) Create an EMPTY private repo at: https://github.com/new"
  echo "   name: $REPO   visibility: Private   (do NOT add a README/license)"
  echo "2) Then run:"
  echo "     git remote remove origin 2>/dev/null || true"
  echo "     git remote add origin https://github.com/$ACCOUNT/$REPO.git"
  echo "     git push -u origin main"
fi

echo
echo "==> Next: open SETUP.md and do Stage 2 to turn on the daily/weekly automation."
