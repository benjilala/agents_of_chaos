#!/usr/bin/env bash
set -euo pipefail

# Agents of Chaos runner: generates a run brief for Cursor/AI IDEs.
# Usage:
#   ./scripts/aoc-run.sh "storm" "Redesign the Live Command Centre for mobile"
#   ./scripts/aoc-run.sh "magic" "Improve order book clarity for pro users"
#   ./scripts/aoc-run.sh "storm" "$(cat brief.txt)"

DOCTRINE="${1:-storm}"   # storm | magic | both
PROBLEM="${2:-}"

if [[ -z "${PROBLEM}" ]]; then
  echo "Error: Missing problem statement."
  echo "Usage: $0 <storm|magic|both> \"<problem statement>\""
  exit 1
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
AI_DIR="${ROOT_DIR}/ai"
RUNS_DIR="${AI_DIR}/runs"

BEN_OS="${AI_DIR}/context/ben_os.md"
STORM_DOC="${AI_DIR}/context/storm_doctrine.md"
MAGIC_DOC="${AI_DIR}/context/magic_doctrine.md"
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
out="${RUNS_DIR}/${ts}-${DOCTRINE}-${slug}.md"

doctrine_block=""
case "${DOCTRINE}" in
  storm)
    [[ -f "${STORM_DOC}" ]] && doctrine_block="- ${STORM_DOC}\n"
    ;;
  magic)
    [[ -f "${MAGIC_DOC}" ]] && doctrine_block="- ${MAGIC_DOC}\n"
    ;;
  both)
    [[ -f "${STORM_DOC}" ]] && doctrine_block="- ${STORM_DOC}\n"
    [[ -f "${MAGIC_DOC}" ]] && doctrine_block+="- ${MAGIC_DOC}\n"
    ;;
  *)
    echo "Invalid doctrine: ${DOCTRINE}. Use storm|magic|both."
    exit 1
    ;;
esac

cat > "${out}" <<EOF
# Agents of Chaos Run

**Doctrine:** ${DOCTRINE}
**Created:** ${ts}

## Load context
- ${BEN_OS}
$(echo -e "${doctrine_block}")
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
- Must amplify **Storm energy** (or Magic Markets trust signals)
- Must avoid generic SaaS UI
- Must produce something we could build this sprint
EOF

echo "✅ Agents of Chaos run brief generated:"
echo "   ${out}"
echo ""
echo "Next:"
echo "1) Open this file in Cursor."
echo "2) Ask Cursor to execute it (or paste the 'Instructions to the AI' section into chat)."
