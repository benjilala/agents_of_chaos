# Storm the Cup — Product Doctrine

## What it is

**Storm the Cup** is a prediction game for the 2026 FIFA World Cup.
Players make bracket picks across tournament stages, build value through
correct predictions, and face a core tension at each checkpoint:
**ride** (keep everything at risk) or **vault** (protect a portion).

It is a *game of conviction, not a sportsbook*.

## Core loop

```
Pick → Watch → Checkpoint → RIDE or VAULT → Repeat
         ↑                        |
         └── Lightning multiplier ─┘ (perfect stage = bonus)
```

### The ride-or-vault moment

This is the soul of the product. After each tournament stage, the player
sees their balance and must choose:

- **RIDE** — carry the full amount into the next stage. Higher ceiling,
  total wipeout risk.
- **VAULT** — bank a percentage into an untouchable vault. Slower growth,
  guaranteed floor.

The UI must make this decision feel *agonising and thrilling*.
Not a radio button — a moment.

### Lightning multipliers

A perfect stage (all picks correct) triggers a Lightning Multiplier —
the value dramatically scales up with a visual explosion of energy.
This should feel like hitting a jackpot, not reading a notification.

## Design language

### Palette (oklch)

| Token               | Purpose                     |
|---------------------|-----------------------------|
| `storm-lightning`   | Amber/gold — energy, reward |
| `storm-vault`       | Green — safety, protection  |
| `storm-ride`        | Red-orange — risk, momentum |
| `storm-accent`      | Blue — primary actions, nav |
| `storm-perfect`     | Bright green — perfect run  |
| `storm-live`        | Green pulse — live matches  |
| `storm-surface`     | Near-black — card/panel bg  |

### Visual principles

- **Dark-first.** Background at `oklch(0.1 0.005 260)` with subtle
  colour nebulae (radial gradients at low opacity).
- **Glass surfaces.** Panels use `backdrop-blur` + low-opacity fills.
  Never opaque cards on dark backgrounds.
- **Texture.** Vignette overlay, film grain noise, faint scanlines.
  The screen should feel like a broadcast control room.
- **Breathe-glow animation.** Lightning-coloured box-shadow that
  pulses gently on active/important elements.
- **Pulse-live.** Green glow pulse on any element that represents
  a live match.

### Typography

- Geist Sans / Geist Mono
- `text-[10px]` for labels and metadata
- `text-[11px]` for badges and status indicators
- Standard Tailwind scale for content
- `font-semibold` for emphasis, `font-medium` for body
- `tracking-wide` on uppercase micro-labels

### Micro-interactions

| Trigger            | Animation                          |
|--------------------|------------------------------------|
| Odds move up       | Brief green text flash (value-up)  |
| Odds move down     | Brief red text flash (value-down)  |
| Stage complete     | Scale bounce (1→1.15→1)            |
| Bet placed         | Slide in from right                |
| Lightning awarded  | Breathe-glow + scale burst         |

## Information architecture

```
/storm-the-cup
  ├── (index)       → Tournament HQ: globe, live matches, leaderboard
  ├── /bracket      → Interactive bracket view
  ├── /live         → Live Command Centre (odds, chat, activity)
  ├── /match/:id    → Match detail (markets, odds history, crowd picks)
  ├── /run/:id      → Storm Run tracker (personal journey)
  ├── /vault        → Vault chamber (contributions, unlock decision)
  ├── /community    → Social feed, expert picks, copy-a-bracket
  ├── /u/:username  → Public profile, run history, win rate
  └── /share/:id    → Shareable card (OG image, deep link)
```

## Key data concepts

- **Crowd picks** — percentage-based consensus across users
- **Odds movement** — real-time line shifts visualised as sparklines
- **Whale bets** — large-amount bets flagged in the live feed
- **Viewer count** — simulated audience watching the same match
- **Match clock** — minute display for live matches

## Simulation note

This is a simulation. No real money, no real odds feeds, no real
platform connections. All data is generated synthetically.
A persistent disclaimer must be visible at all times.

## Emotional targets

| State          | The user should feel...                    |
|----------------|--------------------------------------------|
| Browsing       | Curiosity, density, "there's a lot here"   |
| Picking        | Confidence, deliberation                   |
| Watching live  | Tension, urgency, FOMO                     |
| Checkpoint     | Agony of choice, thrill                    |
| Lightning hit  | Euphoria, "holy shit" moment               |
| Busted         | Gut-punch, instant desire to restart       |
| Vault safe     | Relief, warmth, strategic satisfaction     |
| Leaderboard    | Competitive fire, social proof             |
