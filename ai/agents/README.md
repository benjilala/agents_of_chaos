# Agents of Chaos — Library

Every agent is a self-contained prompt. Copy-paste it into Cursor chat,
or use the runner: `./scripts/aoc-agent.sh <agent-name> "<problem>"`

## Skills & Upskills

All agents have been upskilled with techniques from:
- **[awesome-claude-prompts](https://github.com/langgptai/awesome-claude-prompts)** — XML tags, inner monologue, chain-of-thought, structured output, AIDA/CRISPE frameworks
- **[vercel-agent-skills](https://github.com/vercel-labs/agent-skills)** — React best practices (57 rules), web design guidelines (100+ rules), composition patterns
- **Claude-specific optimisations** — XML-tagged sections (~30% better Claude response quality), `<chain_of_thought>` pre-reasoning, `<grounding>` context loading
- **Cloudbet Brand Guidelines** — All agents are grounded in `ai/context/cloudbet_brand.md`. Voice (direct, assertive, no fluff), visual identity (premium, dark, confident), vocabulary ("players" not "users"), compliance (no guaranteed winnings, responsible gaming), and tone-by-context rules. Copy-facing agents (Copy Writer, Hype Writer) have deep brand voice integration; the Design Assassin audits brand compliance.

---

## Pipeline Agents (sequential — run in order for full specs)

| # | Agent | File | Trigger | Output |
|---|-------|------|---------|--------|
| 1 | **Strategist** | `strategist.md` | `/strategist` | Goals, user, constraints, dangerous assumption |
| 2 | **UX Architect** | `ux-architect.md` | `/ux` | Flows, IA, states, primary actions |
| 3 | **Visual Designer** | `visual-designer.md` | `/visual` | Layout, hierarchy, tokens, responsive, signature moments |
| 4 | **Betting Specialist** | `betting-specialist.md` | `/betting` | Markets, confidence, placement flow, odds display |
| 5 | **Live Systems** | `live-systems.md` | `/live-systems` | Real-time data, alive cues, tension, feed, motion |
| 6 | **Design Assassin** | `design-assassin.md` | `/assassin` | Ruthless critique, verdict |
| 7 | **Refiner** | `refiner.md` | `/refine` | Component breakdown, impl order, acceptance criteria |

## Specialist Agents (standalone — use for specific problems)

| Agent | File | Trigger | Output |
|-------|------|---------|--------|
| **Code Auditor** | `code-auditor.md` | `/audit` | Codebase gaps, dead code, inconsistencies |
| **Motion Designer** | `motion-designer.md` | `/motion` | Animation specs, easing curves, timing |
| **Copy Writer** | `copy-writer.md` | `/copy` | UI copy, microcopy, empty states, CTAs |
| **Accessibility** | `accessibility.md` | `/a11y` | WCAG audit, focus order, contrast, ARIA |
| **Mobile Specialist** | `mobile.md` | `/mobile` | Touch targets, gestures, viewport, performance |
| **State Architect** | `state-architect.md` | `/state` | Store design, data flow, cache strategy |
| **Component Doctor** | `component-doctor.md` | `/doctor` | Refactor recs, prop surgery, composition fixes |
| **Hype Writer** | `hype-writer.md` | `/hype` | Marketing copy, landing page, share cards |

## Compound Presets (multi-agent pipelines)

| Preset | Trigger | Agents |
|--------|---------|--------|
| **Full Pipeline** | `/chaos` | All 7 pipeline agents |
| **Quick Review** | `/review` | Strategist → Assassin → Refiner |
| **Visual Blast** | `/blast` | Visual Designer → Motion → Assassin |
| **Ship Check** | `/ship` | Code Auditor → A11y → Mobile → Assassin |
| **Copy Pass** | `/copypass` | Copy Writer → Hype Writer → Assassin |

---

## How to use

### In Cursor chat
Paste any trigger command followed by your problem:
```
/assassin Review the Live Command Centre — is it good enough to ship?
```

### Via script
```bash
./scripts/aoc-agent.sh assassin "Review the Live Command Centre"
./scripts/aoc-agent.sh chaos "Redesign the bracket page for mobile"
```

### Composing agents manually
Run agents in sequence, feeding each one the prior output:
```
/strategist Design a social share card for Storm the Cup
[paste strategist output]
/visual Continue from the strategy above. Design the visual direction.
[paste visual output]
/assassin Critique everything above.
```
