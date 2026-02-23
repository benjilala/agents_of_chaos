# Agents of Chaos

A library of 15 AI design agents with structured prompts, GTA 5-style profile portraits, and a Next.js dashboard for managing and composing agent pipelines.

## What's inside

| Directory | Contents |
|-----------|----------|
| `ai/agents/` | 15 agent definitions (Markdown with XML-tagged prompts) |
| `ai/context/` | Grounding documents (Ben OS, Storm Doctrine, Magic Doctrine) |
| `scripts/` | Bash runners for triggering agents from terminal |
| `public/agents/` | GTA 5-style profile images (15 portraits) |
| `lib/agents/` | TypeScript registry with structured agent data |
| `store/` | Zustand store for agent activation and upskilling |
| `components/agents/` | React UI components (cards, sheets, dialogs) |
| `app/agents/` | Next.js page for the dashboard |
| `.agents/skills/` | Installed Vercel agent skills |

## Agents

### Pipeline (run in sequence)

| # | Agent | Trigger | Specialty |
|---|-------|---------|-----------|
| 1 | Strategist | `/strategist` | Problem Framing |
| 2 | UX Architect | `/ux` | Information Architecture |
| 3 | Visual Designer | `/visual` | Visual Systems |
| 4 | Betting Specialist | `/betting` | Prediction Markets |
| 5 | Live Systems | `/live-systems` | Real-time UX |
| 6 | Design Assassin | `/assassin` | Design Critique |
| 7 | Refiner | `/refine` | Spec Synthesis |

### Specialists (standalone)

| Agent | Trigger | Specialty |
|-------|---------|-----------|
| Code Auditor | `/audit` | Code Quality |
| Motion Designer | `/motion` | Animation & Timing |
| Copy Writer | `/copy` | UI Copy & Voice |
| Accessibility | `/a11y` | Inclusive Design |
| Mobile Specialist | `/mobile` | Mobile UX |
| State Architect | `/state` | State Management |
| Component Doctor | `/doctor` | Component Health |
| Hype Writer | `/hype` | Marketing Copy |

## Skills

All agents upskilled with techniques from:
- **[awesome-claude-prompts](https://github.com/langgptai/awesome-claude-prompts)** — XML tags, inner monologue, chain-of-thought, AIDA/CRISPE frameworks
- **[vercel-agent-skills](https://github.com/vercel-labs/agent-skills)** — React best practices (57 rules), web design guidelines (100+ rules), composition patterns

## Usage

### In Cursor / AI IDE chat

Paste the trigger command followed by your problem:

```
/assassin Review the Live Command Centre — is it good enough to ship?
```

### Via script

```bash
./scripts/aoc-agent.sh assassin "Review the Live Command Centre"
./scripts/aoc-agent.sh chaos "Redesign the bracket page for mobile"
```

### Dashboard UI

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the agent dashboard.

## Presets

| Preset | Agents |
|--------|--------|
| Full Pipeline | All 7 pipeline agents |
| Quick Review | Strategist → Assassin → Refiner |
| Visual Blast | Visual Designer → Motion → Assassin |
| Ship Check | Code Auditor → A11y → Mobile → Assassin |
| Copy Pass | Copy Writer → Hype Writer → Assassin |
