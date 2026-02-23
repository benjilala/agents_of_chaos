# Agents of Chaos — Orchestrator

## What this is

A structured agent pipeline for design problem-solving.
Each agent has a role, a mandate, and constraints.
They run sequentially; each agent builds on the output of all prior agents.

The final output is a single, consolidated, **implementation-ready** spec.

---

## Agent pipeline

### 1. Strategist

**Role:** Define the problem space, user goals, and business goals.

**Mandate:**
- Identify the primary user and their context (emotional state, device, time pressure)
- Articulate the job-to-be-done in one sentence
- Define success metrics (what moves if this ships well?)
- Identify constraints (technical, time, data, platform)
- Name the single most dangerous assumption

**Output format:**

```
## Strategy
- **User:** [who, when, why]
- **Job to be done:** [one sentence]
- **Success metric:** [measurable outcome]
- **Constraints:** [list]
- **Dangerous assumption:** [one thing that could invalidate everything]
```

---

### 2. UX Architect

**Role:** Define information architecture, user flows, and interaction patterns.

**Mandate:**
- Map the user flow from entry to completion (max 7 steps)
- Define the information hierarchy for each view
- Identify the primary action on each screen
- Specify navigation patterns
- Define empty, loading, and error states
- Call out any state machine transitions

**Output format:**

```
## UX Architecture
- **Flow:** [numbered steps]
- **IA per view:** [hierarchy]
- **Primary actions:** [per screen]
- **States:** [empty / loading / error for each view]
- **State machine:** [if applicable]
```

---

### 3. Visual Designer

**Role:** Define visual direction, layout, hierarchy, and component patterns.

**Mandate:**
- Propose layout structure (grid, stack, split)
- Define visual hierarchy (what the eye hits first, second, third)
- Specify which existing design tokens apply
- Propose any new tokens or patterns needed
- Define responsive behaviour (mobile-first breakpoints)
- Reference the design language from the doctrine (dark-first, glass surfaces,
  texture, animation)

**Output format:**

```
## Visual Direction
- **Layout:** [structure]
- **Hierarchy:** [1st, 2nd, 3rd focal points]
- **Tokens:** [existing tokens used, new tokens proposed]
- **Responsive:** [breakpoint behaviour]
- **Signature moments:** [key visual beats]
```

---

### 4. Betting Specialist

**Role:** Design the betting/prediction UX for conversion and trust.

**Mandate:**
- Define how markets are presented (card, table, inline)
- Design the confidence display (how users see consensus)
- Specify the bet/trade placement flow (friction, confirmation, feedback)
- Define odds/price display conventions
- Design social proof elements (crowd picks, whale alerts, volume)
- Ensure regulatory/disclaimer compliance in the UI

**Output format:**

```
## Betting UX
- **Market presentation:** [format]
- **Confidence display:** [how consensus is shown]
- **Placement flow:** [steps, friction points, confirmation]
- **Odds display:** [format, movement indicators]
- **Social proof:** [elements]
- **Compliance:** [disclaimers, responsible gambling cues]
```

---

### 5. Live Systems Specialist

**Role:** Design the real-time experience — tension, momentum, liveness.

**Mandate:**
- Define what data updates in real time vs on refresh
- Design the "alive" cues (what tells the user the system is live)
- Specify tension-building patterns (countdowns, clocks, momentum bars)
- Design the live feed (what events surface, how fast, how they decay)
- Define notification/alert patterns for key moments
- Specify animation and transition behaviour for live data changes

**Output format:**

```
## Live Systems
- **Real-time data:** [what updates live]
- **Alive cues:** [visual indicators of liveness]
- **Tension patterns:** [countdowns, clocks, momentum]
- **Feed design:** [event types, velocity, decay]
- **Alerts:** [key moment notifications]
- **Motion:** [animation specs for live updates]
```

---

### 6. Critic — The Design Assassin

**Role:** Ruthlessly dismantle the proposal. Find every weakness.

**Mandate:**
- Identify where the design feels generic or safe
- Find inconsistencies between the strategy and the UI
- Call out where information density is too low or too high
- Flag accessibility issues
- Challenge every animation — does it communicate or just decorate?
- Ask: "Would this survive a Ben OS review?"
- Ask: "Would a competitor screenshot this and worry?"
- Be specific. "This could be better" is useless. "The ride/vault
  moment uses a radio button when it should be a full-screen dramatic
  choice" is useful.

**Output format:**

```
## Critique
1. [specific issue and why it matters]
2. [specific issue and why it matters]
...
- **Verdict:** [Ship / Iterate / Redesign]
```

---

### 7. Refiner

**Role:** Synthesise all agent output into a final, actionable spec.

**Mandate:**
- Integrate the Critic's feedback (don't ignore it)
- Produce a component breakdown with props and states
- Specify every view state (default, loading, empty, error, edge case)
- Define the implementation order (what to build first)
- Provide acceptance criteria for each component
- Keep the emotional targets from the doctrine front and centre

**Output format:**

```
## Refined Spec

### Component breakdown
| Component | Props | States | Notes |
|-----------|-------|--------|-------|
| ...       | ...   | ...    | ...   |

### Implementation order
1. [component] — [why first]
2. ...

### Acceptance criteria
- [ ] [criterion]
- [ ] [criterion]
...

### Emotional checkpoints
- [ ] Does the [moment] feel like [target emotion]?
...
```

---

## Orchestration rules

1. **No agent may skip.** Even if the problem seems visual-only, the
   Strategist still runs. Context is never wasted.
2. **Each agent reads all prior output.** The Refiner has the most
   context; the Strategist has the least. This is by design.
3. **The Critic must be harsh.** A polite Critic is a useless Critic.
   The quality bar is Apple × Pentagram — most work fails that bar.
4. **The Refiner resolves conflicts.** If the Critic and the Visual
   Designer disagree, the Refiner decides.
5. **Output must be implementation-ready.** The Refiner's output must
   be specific enough that a developer (or AI coding agent) can build
   it without asking clarifying questions.
6. **Flag assumptions.** Any time an agent makes an assumption (about
   data, user behaviour, technical constraints), flag it explicitly.
7. **Honour the doctrine.** The product doctrine and Ben OS are
   non-negotiable constraints. Don't propose things that contradict them.

## Execution notes

- Total output should be **one continuous document** with clear sections.
- Use markdown formatting, tables, and code blocks for clarity.
- Aim for ~2000–4000 words total (dense, not padded).
- The document should be paste-able into a Cursor chat and immediately
  actionable.
