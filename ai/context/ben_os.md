# Ben OS — Design Operating System

## Who I am

Product designer. I think in systems, build in code, and judge by feel.
I care about the moment a user's pupils dilate — the instant something
feels *alive* rather than merely functional.

## Design convictions

### 1. Craft is the strategy

If it doesn't feel expensive to use, the strategy failed.
Every pixel must earn its place; if it could exist in a Stripe dashboard
template, kill it.

### 2. Tension > decoration

Great UI creates tension — between dark and light, between stillness and
motion, between confidence and doubt. Decoration is noise.
Tension is signal.

### 3. The surface is alive

Backgrounds breathe. Numbers pulse. Cards cast light.
Static screens are dead screens; everything should imply an engine
running underneath.

### 4. Information density is a feature

Dense ≠ cluttered. Bloomberg terminals are dense and beautiful.
Respect the user's intelligence — show more, chrome less.

### 5. Dark > light

Dark interfaces create depth, draw focus to data, and feel premium.
Light mode is for spreadsheets.

### 6. Motion tells the truth

Animation isn't polish; it's communication.
Value going up should *feel* like going up.
A bust should *hit*.

### 7. Typography is hierarchy

One typeface, many weights. Let size and weight do the talking.
Decorative type is a crutch.

### 8. Colour means something

Every hue is mapped to meaning — green for vault safety, amber for
lightning energy, red-orange for risk. Never use colour for decoration.
Colour is a language.

## Quality bar

The reference set: **Apple × Pentagram × Bloomberg Terminal × Stripe**.
Premium editorial confidence meets information-dense live systems.

- Would Jony Ive approve the restraint?
- Would Paula Scher approve the typography?
- Would a Bloomberg trader approve the data density?
- Would a Stripe engineer approve the component architecture?

If any answer is no, iterate.

## What I won't ship

- Generic SaaS UI (card grids, pastel gradients, illustration mascots)
- Empty states that say "Nothing here yet!"
- Loading spinners with no skeleton
- Modals when a sheet or inline expansion works
- Colour without semantic meaning
- Hover effects that don't teach the user anything

## Technical values

- **Next.js App Router** — file-system routing, server components where they help
- **Tailwind CSS** — utility-first, design tokens via CSS custom properties
- **Zustand** — minimal, surgical state management
- **shadcn/ui** — owned components, not npm dependencies
- **TypeScript** — strict, exhaustive, no `any`
- **oklch colour** — perceptually uniform, wide-gamut
- Glass surfaces, vignettes, scanlines — the interface has *texture*

## Design tokens

Tokens are the single source of truth. If a value isn't a token, it's a
magic number — and magic numbers rot.

### Token cascade

```
Primitive  →  Semantic  →  Component
oklch(0.1 0.005 260)  →  --color-surface  →  --card-bg
```

Primitives are raw oklch values. Semantic tokens map to purpose
(`surface`, `foreground`, `accent`, `destructive`). Component tokens
bind semantics to specific UI (`card-bg`, `badge-text`, `odds-flash`).

### Naming convention

`{category}-{element}-{modifier}`

- `color-surface-elevated`
- `color-text-muted`
- `spacing-card-padding`
- `radius-panel`

### Rules

- All colour values in oklch. Hex is legacy. Named colours are banned.
- Every token lives as a CSS custom property on `:root`.
- Product-specific tokens (Storm, Cloudbet) extend the base set — they
  never override semantic tokens, they add to them.
- If you're typing a raw value in a component, you're wrong. Use a token.

---

## Accessibility

Accessibility is a design constraint that makes products better for
*everyone*. It is not a compliance checkbox, a v2 task, or a nice-to-have.

### Standards

- **WCAG 2.2 AA** as the minimum bar. No exceptions.
- Colour contrast: 4.5:1 for normal text, 3:1 for large text. oklch dark
  themes fail silently — test every combination.
- Focus indicators must be visible against dark backgrounds. Use
  `:focus-visible`, not `:focus`.
- Touch targets: 44×44px minimum, 8px spacing between adjacent targets.
- `prefers-reduced-motion: reduce` must be respected. Every animation
  needs a fallback that conveys the same information without movement.
- `prefers-color-scheme` and `color-scheme: dark light` for OS integration.

### Non-negotiables

- Every interactive element is keyboard-reachable via Tab.
- Every `onClick` on a non-button element gets `onKeyDown`, `role`, and
  `tabIndex`.
- Modals and overlays trap focus. Focus returns to the trigger on close.
- Live data updates use `aria-live` regions.
- Semantic HTML over ARIA. A `<button>` is always better than
  `<div role="button">`.
- Test at 200% zoom, dark mode, high contrast, and screen reader.

---

## Component philosophy

Components are the atomic units of the system. They must be small, honest,
and composable.

### Principles

- **Single responsibility.** If you can't describe a component in five
  words, it does too much. Split it.
- **Composition over configuration.** Three focused components beat one
  component with fifteen boolean props. Prefer compound components
  (`<Card><Card.Header /><Card.Body /></Card>`) over prop sprawl.
- **Props tell the truth.** No hidden state, no magic defaults, no
  `isLarge && !isCompact` contradictions. Use explicit variant enums.
- **Five states, always.** Every component defines: default, loading,
  empty, error, edge case. If you can't name the empty state, you
  haven't thought it through.
- **Server by default.** Components are server components unless they
  need browser APIs, event handlers, or hooks. `"use client"` is an
  opt-in, not a default.
- **Direct imports.** Import from source, not barrel files.
  `from './CheckpointOverlay'` not `from './storm'`. Barrel files
  prevent tree-shaking and bloat bundles.
- **Owned, not rented.** shadcn/ui components are copied into the
  project and owned. No opaque npm dependencies for UI primitives.

---

## Responsive strategy

Mobile is the primary context. Most users are on their phone during a
live match, on a bus, with one thumb.

### Breakpoints

| Breakpoint | Width | Context |
|------------|-------|---------|
| Mobile | <640px | Primary — design here first |
| Tablet | 640–1024px | Secondary — reflow, don't hide |
| Desktop | >1024px | Full density — information-rich |

### Rules

- Design mobile-first at 390px. Test at 320px.
- Sheets over modals on mobile. Bottom sheets feel native; centered
  modals feel desktop.
- Primary CTAs live in the thumb zone (bottom-center of screen).
- Horizontal scroll is acceptable for carousels. Not for content.
- Safe area insets (`env(safe-area-inset-*)`) respected on notch devices.
- Set `touch-action` explicitly to prevent unwanted browser gestures.
- The mobile experience must feel as premium as desktop. A downgrade
  is a failure.

---

## Performance

Performance is UX. A slow interface is a broken interface — no amount of
visual polish redeems a 4-second load.

### Budgets

| Metric | Target | Context |
|--------|--------|---------|
| First Contentful Paint | <1.5s | On 4G connection |
| JS first load | <200KB | Compressed, after splitting |
| Time to Interactive | <3s | On mid-range Android |

### Rules

- **Server components first.** Less JavaScript shipped to the client.
- **Dynamic imports** (`next/dynamic`) for heavy components not needed
  on initial render.
- **Passive event listeners** for all scroll, touch, and wheel handlers.
  Never block the main thread.
- **`content-visibility: auto`** for off-screen sections and long lists.
- **Images:** `next/image`, WebP/AVIF, lazy loading. No unoptimised
  PNGs in production.
- **Compositor-friendly animation only.** `transform` and `opacity`.
  Never animate `width`, `height`, `top`, `left`, or `margin`.
- If the bundle is growing, audit it. `npx @next/bundle-analyzer` is
  not optional.

---

## State design

Every view has five states. Designing only the happy path is designing
half the product.

| State | Requirement |
|-------|-------------|
| **Default** | The populated, working view. The one everyone designs first. |
| **Loading** | Skeleton UI that mirrors the layout. Never a spinner alone. Copy if the wait exceeds 1 second. |
| **Empty** | A narrative and a next action. The user is the star, the story is what they'll do, the solution is the CTA. Never "Nothing here yet." |
| **Error** | Human, specific, actionable. "Connection lost — your picks are safe, we're reconnecting" not "Error: connection failed." |
| **Edge case** | 0 items, 1 item, 10,000 items. 3-character names and 25-character names. Slow network. No JavaScript. |

### Rules

- Loading skeletons match the shape of real content. No generic grey boxes.
- Empty states are opportunities, not dead ends.
- Error states never blame the user.
- Every async operation needs loading, success, and error handling. If your
  fetch has no error boundary, it's incomplete.
- Test every state. If you haven't seen the empty state in the browser,
  you haven't tested the component.

---

## Working style with AI

- Show me, don't ask me. Build a version, then critique it together.
- Make assumptions, keep moving, flag them at the end.
- Be opinionated. I want a collaborator, not a waiter.
- If something is ugly, say so. Don't protect my feelings.

