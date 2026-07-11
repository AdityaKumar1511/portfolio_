# DESIGN SPEC — Portfolio Visual Language

## Philosophy

**Vibrant, dark-first, human.** Not corporate. Not AI-generated. Every spacing decision, font choice, and color should feel like it was made by someone who cares about craft. The site should feel like a premium developer tool meets a cinematic portfolio — alive, not static.

---

## Typography

### Font Stack
```css
--font-sans: 'Geist', system-ui, sans-serif;       /* body, UI */
--font-mono: 'Geist Mono', 'Fira Code', monospace; /* terminal, code, tech pills */
```

Load via `next/font/google` or `next/font/local` (Vercel's Geist is available via `geist` npm package).

### Type Scale
```
Hero name:        clamp(3rem, 8vw, 6rem)   font-weight: 600  letter-spacing: -0.03em
Section headings: clamp(1.75rem, 4vw, 3rem) font-weight: 500
Card titles:      1.125rem                  font-weight: 500
Body:             1rem (16px)               font-weight: 400  line-height: 1.7
Captions/pills:   0.75rem                   font-weight: 500  letter-spacing: 0.06em
```

**Rules:**
- Never use `font-weight: 700` or `800` — it looks heavy and cheap. Max is `600` for hero only.
- Generous line-height (`1.7`) on all body text — it's the single biggest readability win.
- Letter spacing: tight on headings (`-0.02em`), wide on small caps/labels (`0.08em`).

---

## Color System

### Dark Mode (default)
```
Background:   #0A0A0A   — near black, not pure black (pure black looks cheap)
Surface:      #111111   — cards, navbar
Surface-2:    #1A1A1A   — hover states, inputs
Border:       #262626   — subtle separators
Border-strong:#3F3F46   — emphasized borders

Text-primary:  #FAFAFA  — main content
Text-secondary:#A3A3A3  — supporting text
Text-muted:    #525252  — placeholders, meta

Accent:        #818CF8  — indigo-400 — CTAs, active states, glows, terminal prompt
Accent-glow:   rgba(129, 140, 248, 0.12)
```

### Light Mode
```
Background:   #FAFAFA
Surface:      #FFFFFF
Surface-2:    #F4F4F5
Border:       #E4E4E7
Border-strong:#D4D4D8

Text-primary:  #09090B
Text-secondary:#71717A
Text-muted:    #A1A1AA

Accent:        #6366F1  — indigo-500 (slightly darker for light bg contrast)
Accent-glow:   rgba(99, 102, 241, 0.10)
```

### Vibrant Highlights (use sparingly — 1 per section max)
```
Mint:    #6EE7B7  — success states, "open to work" dot
Rose:    #FB7185  — error states, optional accent on achievements
Amber:   #FCD34D  — star ratings, optional awards highlight
```

---

## Spacing System

Use Tailwind's default 4px base unit religiously. Key spacings:

```
Section padding (y):   py-24 md:py-32         (96–128px)
Section padding (x):   px-6 md:px-12 lg:px-24
Card padding:          p-6 (24px)
Card gap in grids:     gap-4 md:gap-6
Component internal:    space-y-3 or space-y-4
Pill padding:          px-3 py-1
Icon size (inline):    w-4 h-4 (16px)
Icon size (standalone): w-5 h-5 (20px)
```

**Rule:** When in doubt, add more whitespace. Cramped = cheap. Breathing room = premium.

---

## Component Design Tokens

### Cards
```css
border-radius: 1rem (16px)    /* rounded-2xl */
border: 1px solid var(--border)
background: var(--surface)
transition: border-color 200ms, box-shadow 200ms

/* Hover */
border-color: var(--border-strong)
box-shadow: 0 0 0 1px var(--accent-glow), 0 20px 40px rgba(0,0,0,0.3)
```

### Buttons — Primary (CTA)
```css
background: var(--accent)
color: white
border-radius: 9999px   /* pill */
padding: 10px 24px
font-size: 14px
font-weight: 500
transition: opacity 150ms, transform 150ms

/* Hover */
opacity: 0.9
transform: translateY(-1px)
```

### Buttons — Ghost
```css
background: transparent
border: 1px solid var(--border)
border-radius: 9999px
color: var(--text-secondary)

/* Hover */
border-color: var(--border-strong)
color: var(--text-primary)
```

### Tech Pills
```css
font-family: var(--font-mono)
font-size: 11px
padding: 3px 10px
border-radius: 9999px
background: var(--surface-2)
border: 1px solid var(--border)
color: var(--text-secondary)
letter-spacing: 0.04em
```

### Navbar
```css
position: fixed; top: 16px; left: 50%; transform: translateX(-50%);
width: fit-content; max-width: 90vw;
background: rgba(var(--bg-secondary-rgb), 0.7);
backdrop-filter: blur(16px) saturate(180%);
border: 1px solid var(--border);
border-radius: 9999px;
padding: 10px 24px;
box-shadow: 0 4px 24px rgba(0,0,0,0.12);
```

---

## Hero Section Design

```
Layout: Full viewport height (100svh). Content centered vertically.
Background: Spline 3D scene fills entire section, absolute positioned.
  - Apply CSS filter: hue-rotate() to shift Spline colors to match accent
  - Overlay: radial gradient from transparent center to bg-primary edges (vignette)
  - This grounds the 3D scene and makes text readable

Content stack (centered):
  [small label]      "Full-Stack Developer · NIT Patna"   — text-muted, tracking-widest, uppercase, 11px
  [hero name]        "Aditya Kumar"                        — clamp(3rem, 8vw, 6rem), animated
  [tagline]          "Building products that matter"       — text-secondary, 1.125rem
  [anchor pills]     [Projects] [Skills] [Blog] [Contact]  — ghost pills, gap-3, mt-8
  [scroll hint]      ↓ animated chevron                    — mt-12, subtle bounce

Anchor pills behavior:
  - Click → smooth scroll to section (CSS scroll-behavior: smooth on html)
  - Hover → accent border + text color transition
  - No underline. No shadow. Just clean pill borders.
```

---

## Projects Section

```
Section heading: left-aligned "Selected Work" with a thin accent line
Subtitle: "A few things I've built recently"

Carousel:
  Track:  display: flex; overflow-x: hidden; scroll-snap-type: x mandatory
  Cards:  min-width: 80vw (mobile) / 58vw (tablet) / 46vw (desktop)
          scroll-snap-align: center
  Peek:   adjacent cards peek at ~8–10% on each side → overflow: visible on parent
          but clip with a mask: linear-gradient(to right, transparent, black 8%, black 92%, transparent)

Arrow buttons:
  - Position: absolute, vertically centered on carousel, outside card edges
  - Style: 44px circle, surface bg, border, chevron icon
  - Disabled state: 30% opacity when at first/last card
  - Hover: accent border

Card design:
  Width × Height: 46vw × 60vh (desktop) — tall and cinematic
  Border-radius: 20px
  overflow: hidden

  [THUMBNAIL]
    - Fills entire card
    - object-fit: cover
    - On hover: scale(1.04) with 400ms ease transition

  [GRADIENT OVERLAY]
    - position: absolute, bottom 0, full width
    - height: 65% of card
    - background: linear-gradient(to top, rgba(0,0,0,0.95), transparent)
    - padding: 24px

  [CONTENT inside overlay, from bottom]
    Tech pills row        — 11px mono, faded (0.7 opacity)
    Impact stat           — accent color, 12px, font-mono, mb-2
    One-line description  — text-secondary, 13px, mb-1
    Project name          — text-primary, 20px, font-weight 500, mb-3
    Links row             — [Live Demo ↗] [GitHub ↗] ghost mini buttons
```

---

## Terminal Design

```
BUTTON (sticky corner):
  Position: fixed, bottom: 24px, right: 24px, z-index: 50
  Size: 52px × 52px (large enough to notice)
  Shape: rounded-xl (not full circle)
  Content: ">_" in Geist Mono, 16px
  Background: var(--accent) with subtle glow box-shadow
  Animation: slow pulsing ring (keyframe: scale 1 → 1.2 → 1, 2s infinite)
  Tooltip on hover: "Open Terminal"

MODAL:
  Backdrop: fixed inset-0, bg black/90, z-50
  Window: centered, 680px wide, 420px tall (80vw × 70vh on mobile)
  Border-radius: 12px
  Border: 1px solid var(--border)
  Background: #0D0D0D (darker than page bg)

  Header bar:
    - 3 colored dots (red/yellow/green) — decorative
    - Title: "portfolio — zsh" in center, text-muted
    - Close ✕ button right

  Body:
    - font: Geist Mono, 13px, line-height 1.6
    - Scrollable output area (past commands + responses)
    - Input line: "[ ~ ] > " in accent color + blinking cursor

  Available commands (define in terminal.json):
    whoami        → bio one-liner
    ls projects   → list project names
    cat <slug>    → project details
    cat skills    → tech stack
    open github   → opens github in new tab
    open linkedin → opens linkedin in new tab
    resume        → downloads resume
    help          → lists all commands
    clear         → clears terminal
    exit          → closes modal
    <easter egg>  → define 1–2 secret commands that say something fun
```

---

## Scroll Animations — What to Use

| Section | Animation | Tool |
|---------|-----------|------|
| Hero name | Stagger char reveal on load | Framer Motion |
| Each section heading | Slide up + fade in on enter | Framer Motion `whileInView` |
| Skills grid items | Stagger pop-in | Framer Motion |
| About section | **GSAP ScrollTrigger pin** — text animates as you scroll through it | GSAP |
| Achievements cards | Stagger slide from left | Framer Motion |
| Project card hover | scale thumbnail + shadow lift | CSS |
| Navbar appear | Slide down from top | Framer Motion AnimatePresence |
| Scroll progress bar | scaleX from 0 to 1 | Vanilla JS / CSS |

**Do NOT add animation to:** Footer, contact form inputs, tech pills on static sections, the resume download button. Keep functional elements clean.

---

## Responsive Breakpoints

```
Mobile:     default (< 640px)    — single column, 24px side padding
Tablet:     sm: (640px+)         — 2-col grids begin
            md: (768px+)         — full navbar visible
Large:      lg: (1024px+)        — 3-col grids, side dot nav appears
XL:         xl: (1280px+)        — wider spacing, larger type
2XL:        2xl: (1400px max-w)  — content caps out, no wider
```

---

## What Makes This NOT Look AI-Generated

1. **Imperfect spacing** — section heights vary, don't all snap to exactly 100vh
2. **Real photos** — actual project screenshots, not placeholder gradients
3. **Personality in copy** — "I built this when I was annoyed by X" beats "A full-stack application that..."
4. **One opinionated accent color** — commitment signals taste
5. **Subtle inconsistencies** — the terminal button is slightly quirky on purpose
6. **Loading screen personality** — show initials "AK" assembling, not a generic spinner
