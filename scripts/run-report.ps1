<#
  run-report.ps1 — generate a daily or weekly AI Edge briefing LOCALLY.

  Uses the Claude Code CLI signed in with your Claude subscription (Max),
  so it does NOT spend Anthropic API credits — it counts against your plan.

  Usage:
    powershell -ExecutionPolicy Bypass -File scripts\run-report.ps1            # daily
    powershell -ExecutionPolicy Bypass -File scripts\run-report.ps1 -Type weekly

  It tells Claude to research, prepend a new entry to reports/data/reports.js,
  regenerate the PDF where relevant, then commit & push.
#>
param(
  [ValidateSet('daily','weekly')]
  [string]$Type = 'daily'
)

$ErrorActionPreference = 'Stop'
$repo = Split-Path -Parent $PSScriptRoot
Set-Location $repo

$promptFile = "docs/prompts/$Type.md"
if (-not (Test-Path $promptFile)) { throw "Missing prompt file: $promptFile" }

$instruction = @"
Follow the instructions in $promptFile to produce the $Type report for "The AI Edge".

Hard requirements:
- Use web search to gather real, recent AI news; cross-check surprising figures
  against a second source and mark forward-looking numbers as directional.
- PREPEND one new report object to the array in reports/data/reports.js (newest
  first). Do NOT delete or overwrite existing reports. Match the exact object
  shape used by existing entries so the site renders it.
- Build on prior reports already in the file (advance threads, don't repeat).
- Validate reports/data/reports.js is still valid JavaScript after editing.
- Then git add -A, commit, and push to origin main yourself.
"@

Write-Host "Generating $Type report locally via Claude CLI (Max plan, no API cost)..." -ForegroundColor Cyan

claude -p $instruction `
  --permission-mode acceptEdits `
  --allowedTools "Bash,Read,Write,Edit,WebSearch,WebFetch"

Write-Host "Done. Check git log and reload the site." -ForegroundColor Green
