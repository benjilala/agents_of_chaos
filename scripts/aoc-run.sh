#!/usr/bin/env bash
set -euo pipefail

# Agents of Chaos runner: generates a run brief for Cursor/AI IDEs.
# Usage:
#   ./scripts/aoc-run.sh "Redesign the Live Command Centre for mobile"
#   ./scripts/aoc-run.sh "$(cat brief.txt)"

PROBLEM="${1:-}"

if [[ -z "${PROBLEM}" ]]; then
  echo "Error: Missing problem statement."
  echo "Usage: $0 \"<problem statement>\""
  exit 1
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
AI_DIR="${ROOT_DIR}/ai"
RUNS_DIR="${AI_DIR}/runs"

BEN_OS="${AI_DIR}/context/ben_os.md"
BRAND="${AI_DIR}/context/cloudbet_brand.md"
ORCH="${AI_DIR}/orchestrator.md"

missing=0
for f in "${BEN_OS}" "${ORCH}"; do
  if [[ ! -f "$f" ]]; then
    echo "Missing required file: $f"
    missing=1
  fi
done
if [[ "$missing" -eq 1 ]]; then
  exit 1
fi

mkdir -p "${RUNS_DIR}"

ts="$(date +"%Y%m%d-%H%M%S")"
slug="$(echo "${PROBLEM}" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g' | sed -E 's/^-|-$//g' | cut -c1-70)"
out="${RUNS_DIR}/${ts}-${slug}.md"

cat > "${out}" <<EOF
# Agents of Chaos Run

**Created:** ${ts}

## Load context
- ${BEN_OS}
- ${BRAND}
- ${ORCH}

## Problem statement
${PROBLEM}

## Instructions to the AI (Cursor)
You are running the **Agents of Chaos** orchestrator.

1) Read the context files listed above.
2) Execute agents in this order:
   - strategist
   - ux_architect
   - visual_designer
   - betting_specialist
   - live_systems
   - critic (Design Assassin)
   - refiner
3) Produce a single consolidated output with these sections:
   - Strategy (goals, user, business)
   - UX architecture (flows, IA)
   - Visual direction (layout, hierarchy, style)
   - Betting UX (markets, confidence, conversion)
   - Live systems (tension, momentum, "alive" cues)
   - Critique (ruthless)
   - Refined spec (final actionable plan)
4) Make the output implementation-ready (component breakdown, states, empty/loading/error).
5) If anything is unclear, make best assumptions and keep moving.

## Acceptance bar
- Must feel like **Apple × Pentagram**
- Must avoid generic SaaS UI
- Must produce something we could build this sprint
EOF

echo "✅ Agents of Chaos run brief generated:"
echo "   ${out}"
echo ""
echo "Next:"
echo "1) Open this file in Cursor."
echo "2) Ask Cursor to execute it (or paste the 'Instructions to the AI' section into chat)."
