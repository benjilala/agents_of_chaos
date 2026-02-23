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

## Working style with AI

- Show me, don't ask me. Build a version, then critique it together.
- Make assumptions, keep moving, flag them at the end.
- Be opinionated. I want a collaborator, not a waiter.
- If something is ugly, say so. Don't protect my feelings.

