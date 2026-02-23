#!/usr/bin/env bash
set -eo pipefail

# ─────────────────────────────────────────────
# Agents of Chaos — Agent Runner
# Usage: ./scripts/aoc-agent.sh <agent|preset> "<problem>"
# ─────────────────────────────────────────────

SCRIPT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
AGENTS_DIR="${SCRIPT_DIR}/ai/agents"
CONTEXT_DIR="${SCRIPT_DIR}/ai/context"
RUNS_DIR="${SCRIPT_DIR}/ai/runs"

mkdir -p "${RUNS_DIR}"

# ─── Resolve agent name → file ───────────────

agent_file() {
  case "$1" in
    strategist)   echo "strategist.md" ;;
    ux)           echo "ux-architect.md" ;;
    visual)       echo "visual-designer.md" ;;
    betting)      echo "betting-specialist.md" ;;
    live-systems) echo "live-systems.md" ;;
    assassin)     echo "design-assassin.md" ;;
    refine)       echo "refiner.md" ;;
    audit)        echo "code-auditor.md" ;;
    motion)       echo "motion-designer.md" ;;
    copy)         echo "copy-writer.md" ;;
    a11y)         echo "accessibility.md" ;;
    mobile)       echo "mobile.md" ;;
    state)        echo "state-architect.md" ;;
    doctor)       echo "component-doctor.md" ;;
    hype)         echo "hype-writer.md" ;;
    *) echo "" ;;
  esac
}

# ─── Resolve presets ─────────────────────────

resolve_preset() {
  case "$1" in
    chaos)    echo "strategist ux visual betting live-systems assassin refine" ;;
    review)   echo "strategist assassin refine" ;;
    blast)    echo "visual motion assassin" ;;
    ship)     echo "audit a11y mobile assassin" ;;
    copypass) echo "copy hype assassin" ;;
    *) echo "" ;;
  esac
}

# ─── Help ────────────────────────────────────

show_help() {
  cat <<'HELP'

  Agents of Chaos — Agent Runner
  ═══════════════════════════════

  USAGE:
    ./scripts/aoc-agent.sh <agent|preset> "<problem>"

  PIPELINE AGENTS:
    strategist    Define the problem space
    ux            User flows and information architecture
    visual        Visual direction and design tokens
    betting       Betting/prediction UX
    live-systems  Real-time experience design
    assassin      Ruthless design critique
    refine        Final implementation spec

  SPECIALIST AGENTS:
    audit         Code auditor
    motion        Animation and motion specs
    copy          UI copy and microcopy
    a11y          Accessibility audit
    mobile        Mobile specialist review
    state         State management architecture
    doctor        Component refactoring
    hype          Marketing and launch copy

  PRESETS (multi-agent pipelines):
    chaos         Full pipeline (all 7 agents)
    review        Quick review (strategist → assassin → refine)
    blast         Visual blast (visual → motion → assassin)
    ship          Ship check (audit → a11y → mobile → assassin)
    copypass      Copy pass (copy → hype → assassin)

  EXAMPLES:
    ./scripts/aoc-agent.sh assassin "Review the Live Command Centre"
    ./scripts/aoc-agent.sh chaos "Redesign the bracket page"
    ./scripts/aoc-agent.sh ship "Check the checkpoint overlay"

HELP
}

if [[ $# -lt 1 || "$1" == "--help" || "$1" == "-h" ]]; then
  show_help
  exit 0
fi

AGENT_KEY="$1"
PROBLEM="${2:-}"

# ─── Resolve agents to run ───────────────────

AGENTS_TO_RUN=""

preset_agents=$(resolve_preset "$AGENT_KEY")
if [[ -n "$preset_agents" ]]; then
  AGENTS_TO_RUN="$preset_agents"
  echo "  ⚡ Preset: ${AGENT_KEY}"
  echo "  → Running: ${AGENTS_TO_RUN}"
else
  single_file=$(agent_file "$AGENT_KEY")
  if [[ -n "$single_file" ]]; then
    AGENTS_TO_RUN="$AGENT_KEY"
  else
    echo "  ✗ Unknown agent or preset: ${AGENT_KEY}"
    echo "  Run with --help to see available agents."
    exit 1
  fi
fi

# ─── Build the brief ─────────────────────────

ts=$(date +%Y%m%d-%H%M%S)
slug=$(echo "$PROBLEM" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | head -c 60)
out="${RUNS_DIR}/${ts}-${AGENT_KEY}-${slug}.md"

{
  echo "# Agents of Chaos Run"
  echo ""
  echo "**Agent(s):** ${AGENTS_TO_RUN}"
  echo "**Created:** ${ts}"
  echo ""

  if [[ -n "$PROBLEM" ]]; then
    echo "## Problem statement"
    echo "${PROBLEM}"
    echo ""
  fi

  echo "## Context files"
  echo ""
  echo "Read these before responding:"
  echo "- \`ai/context/ben_os.md\`"
  echo "- \`ai/context/cloudbet_brand.md\`"
  echo ""

  echo "## Agent prompts"
  echo ""

  for agent in ${AGENTS_TO_RUN}; do
    file=$(agent_file "$agent")
    if [[ -n "$file" && -f "${AGENTS_DIR}/${file}" ]]; then
      echo "---"
      echo ""
      cat "${AGENTS_DIR}/${file}"
      echo ""
    else
      echo "⚠️ Agent file not found: ${agent}"
    fi
  done

  echo "---"
  echo ""
  echo "## Instructions"
  echo ""
  echo "Execute the agent(s) above in order. For each agent:"
  echo "1. Read the context files"
  echo "2. Read the problem statement"
  echo "3. Follow the agent's mandate and output format exactly"
  echo "4. Each subsequent agent builds on all prior agent output"
  echo ""
  echo "## Acceptance bar"
  echo "- Must feel like **Apple × Pentagram × Bloomberg Terminal × Stripe**"
  echo "- Must honour the product doctrine"
  echo "- Must be implementation-ready"
  echo "- Must avoid generic SaaS UI"

} > "${out}"

echo ""
echo "  ✓ Brief written to: ${out}"
echo ""
echo "  Paste this into Cursor chat, or run:"
echo "  cursor ${out}"
echo ""
