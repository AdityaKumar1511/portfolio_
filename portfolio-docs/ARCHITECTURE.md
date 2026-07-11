# ARCHITECTURE — Portfolio Technical Spec

## Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | Next.js 14 App Router | SSG for speed, file-based routing, `next/font`, `next/image` |
| Language | TypeScript (strict) | Autocomplete on JSON data, fewer runtime bugs |
| Styling | Tailwind CSS v3 + CSS Variables | Utility-first + theming without CSS-in-JS overhead |
| Animation | Framer Motion + GSAP ScrollTrigger | Framer for component transitions, GSAP for scroll-pinned timeline |
| 3D / WebGL | Spline (iframe/react-spline) | No Three.js setup — Spline scene embedded via `@splinetool/react-spline` |
| Fonts | Geist Sans + Geist Mono (via `next/font`) | Fast, variable, no FOUT |
| Icons | Lucide React | Tree-shakeable, consistent |
| Hosting | Vercel | Zero-config Next.js, Edge CDN, Analytics free tier |

---

## Directory Structure

```
portfolio/
├── app/
│   ├── layout.tsx              # Root layout: fonts, ThemeProvider, Terminal
│   ├── page.tsx                # Main page — assembles all sections
│   └── globals.css             # CSS variables for theming
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Floating glassmorphic navbar (appears on scroll)
│   │   ├── Footer.tsx          # Two-row footer
│   │   ├── ScrollProgress.tsx  # Thin top bar that fills on scroll
│   │   └── SideDotNav.tsx      # Right-edge section dots (desktop only)
│   ├── sections/
│   │   ├── Hero.tsx            # Spline bg + name + anchor pills
│   │   ├── Projects.tsx        # Horizontal carousel shell
│   │   ├── Skills.tsx          # Categorized grid
│   │   ├── About.tsx           # Story + photo
│   │   ├── Achievements.tsx    # Hackathons, CP, certs
│   │   ├── Blog.tsx            # Static post teasers
│   │   └── Contact.tsx         # Email + form + socials
│   ├── ui/
│   │   ├── ProjectCard.tsx     # Single carousel card
│   │   ├── TechPill.tsx        # Small tag chip
│   │   ├── ThemeToggle.tsx     # Sun/moon icon button
│   │   └── LoadingScreen.tsx   # Animated loading overlay
│   └── terminal/
│       ├── TerminalButton.tsx  # Sticky corner FAB
│       ├── TerminalModal.tsx   # Full overlay terminal UI
│       └── terminalCommands.ts # Command handler logic
├── data/
│   ├── projects.json
│   ├── skills.json
│   ├── achievements.json
│   ├── meta.json
│   └── terminal.json
├── hooks/
│   ├── useTheme.ts
│   ├── useScrollDirection.ts   # For show/hide navbar
│   └── useActiveSection.ts     # For side dot nav highlight
├── lib/
│   └── utils.ts                # cn(), formatDate(), etc.
├── public/
│   ├── resume.pdf
│   ├── og-image.png
│   └── projects/               # Thumbnail images (WebP, 800×500)
└── types/
    └── index.ts                # Project, Skill, Achievement interfaces
```

---

## Theming System

### CSS Variables (globals.css)

```css
:root {
  --bg-primary: #FAFAFA;
  --bg-secondary: #FFFFFF;
  --surface: #F3F4F6;
  --border: #E5E7EB;
  --text-primary: #0A0A0A;
  --text-secondary: #6B7280;
  --text-muted: #9CA3AF;
  --accent: #6366F1;         /* indigo — change to your chosen accent */
  --accent-glow: rgba(99, 102, 241, 0.15);
}

[data-theme="dark"] {
  --bg-primary: #0A0A0A;
  --bg-secondary: #111111;
  --surface: #1A1A1A;
  --border: #262626;
  --text-primary: #FAFAFA;
  --text-secondary: #A3A3A3;
  --text-muted: #525252;
  --accent: #818CF8;
  --accent-glow: rgba(129, 140, 248, 0.15);
}
```

All components use only these variables — never hardcoded hex. This makes theme switching instantaneous.

---

## Section Architecture

### Hero

```
<section id="hero" className="relative h-screen overflow-hidden">
  <SplineBackground />          {/* async loaded, absolute fill */}
  <div className="relative z-10 flex flex-col items-center justify-center h-full">
    <AnimatedName />             {/* Framer Motion char-by-char reveal */}
    <RoleTyping />               {/* typewriter effect with useInterval */}
    <HeroAnchorPills />          {/* smooth-scroll links */}
    <ScrollIndicator />          {/* animated chevron down */}
  </div>
</section>
```

Spline scene: use the community file `a1f156f7-ef01-42d1-bf7b-5be1b7967b0a` as reference. Load via `@splinetool/react-spline` with `next/dynamic` (ssr: false). Apply a CSS `hue-rotate` or custom Spline material override to shift colors to your accent palette.

```tsx
// Color shift approach:
<div style={{ filter: 'hue-rotate(240deg) saturate(1.2)' }}>
  <Spline scene="..." />
</div>
```

### Projects Carousel

```
<section id="projects">
  <CarouselTrack>                {/* overflow-hidden container */}
    {projects.map(p => (
      <ProjectCard key={p.slug} project={p} />
      // card width: 80vw mobile / 60vw tablet / 48vw desktop
      // 10% of adjacent cards peek on each side
    ))}
  </CarouselTrack>
  <LeftArrow />
  <RightArrow />
</section>
```

Carousel behavior:
- CSS `scroll-snap-type: x mandatory` on track + `scroll-snap-align: center` on cards
- Arrow buttons call `scrollBy({ left: ±cardWidth, behavior: 'smooth' })`
- Touch/swipe supported natively via scroll-snap (no library needed)
- Keyboard: left/right arrows when section is focused

### ProjectCard anatomy

```
<div className="card relative rounded-2xl overflow-hidden">
  <img src={thumbnail} />                    {/* fills card */}
  <div className="gradient-overlay">         {/* black gradient from bottom */}
    <h3>{name}</h3>
    <p>{description}</p>
    <div className="pills">{tech.map(TechPill)}</div>
    <div className="stats">{impactStat}</div>
    <div className="links">
      <a href={liveUrl}>Live Demo ↗</a>
      <a href={repoUrl}>GitHub ↗</a>
    </div>
  </div>
</div>
```

Gradient overlay CSS:
```css
background: linear-gradient(
  to top,
  rgba(0,0,0,0.95) 0%,
  rgba(0,0,0,0.7) 40%,
  rgba(0,0,0,0.0) 100%
);
```

### Floating Navbar

- Fixed position, starts hidden (`opacity-0 translate-y-[-100%]`)
- Appears when `scrollY > 80px` via `useScrollDirection` hook
- Hides on scroll-down, reappears on scroll-up
- Backdrop: `backdrop-blur-md bg-[var(--bg-secondary)]/70 border border-[var(--border)]`
- Contains: Logo/name left · Section links center · Theme toggle + Resume right

### Terminal

- **Button:** Fixed bottom-right corner, `z-50`. Size: 48×48px. Icon: `>_` in monospace. Pulsing accent ring animation to draw attention.
- **Modal:** Full-screen overlay (dark, 95% opacity). Centered terminal window. Green prompt. Supports: `help`, `whoami`, `ls projects`, `cat skills`, `cat resume`, `open github`, `open linkedin`, `clear`, `exit`
- All commands defined in `terminal.json` — no hardcoding in component logic

### Loading Screen

```tsx
// LoadingScreen.tsx
// Shows only when:
// 1. document.readyState !== 'complete' AND
// 2. time elapsed > 300ms (prevents flash on fast connections)

// Animation: minimal — name initials or a progress bar
// Duration: auto-dismisses when window.onload fires
// Exit: Framer Motion exit animation (fade + scale up)
```

---

## Animation Strategy

| Element | Library | Technique |
|---------|---------|-----------|
| Hero name reveal | Framer Motion | `staggerChildren` char animation |
| Section enter | Framer Motion | `whileInView` with `once: true` |
| Scroll-pinned about section | GSAP ScrollTrigger | `pin: true`, scrub timeline |
| Project card hover | CSS + Framer Motion | scale(1.02), shadow lift |
| Navbar appear/hide | Framer Motion | AnimatePresence |
| Terminal open/close | Framer Motion | scale + opacity |
| Theme toggle | CSS transition | `transition: background 300ms, color 300ms` |
| Scroll progress | Vanilla JS | `scaleX` transform on a fixed div |

**Rule:** If an animation doesn't make content clearer or the experience more satisfying, remove it. No animation for animation's sake.

---

## Data Schema

### projects.json
```json
[
  {
    "slug": "arbitrage",
    "name": "Arbitrage",
    "description": "Live crypto price tracker with email alerts",
    "thumbnail": "/projects/arbitrage.webp",
    "tech": ["Next.js", "Supabase", "Firecrawl", "Resend"],
    "impact": "Tracks 50+ assets in real-time",
    "liveUrl": "https://arbitrage.vercel.app",
    "repoUrl": "https://github.com/AdityaKumar1511/arbitrage",
    "featured": true,
    "category": "Web"
  }
]
```

### skills.json
```json
{
  "Frontend": ["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js"],
  "Backend": ["Node.js", "FastAPI", "PostgreSQL", "MongoDB", "Docker"],
  "AI/ML": ["Python", "XGBoost", "scikit-learn", "LangChain"],
  "Blockchain": ["Solidity", "Wagmi", "Hardhat", "IPFS"],
  "Tools": ["Git", "Linux", "GitHub Actions", "Vercel", "Figma"]
}
```

### meta.json
```json
{
  "name": "Aditya Kumar",
  "tagline": "Building full-stack products and ML systems",
  "role": "Full-Stack Developer & ML Enthusiast",
  "college": "NIT Patna",
  "year": "2nd Year CSE",
  "email": "your@email.com",
  "github": "https://github.com/AdityaKumar1511",
  "linkedin": "https://linkedin.com/in/aditya-kumar-57a988374/",
  "resumeUrl": "/resume.pdf",
  "openToWork": true,
  "statusText": "Open to internships"
}
```

---

## Deployment

```
Vercel project settings:
- Framework: Next.js
- Node version: 20.x
- Build command: next build
- Output: .next (default)

Environment variables: none required for v1

Custom domain: aditya.dev OR adityakumar.tech
→ Free via GitHub Student Developer Pack (.tech domain)
```
