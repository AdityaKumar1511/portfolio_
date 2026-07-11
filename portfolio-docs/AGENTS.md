# AGENTS.md — AI Agent Prompt Guide

This file contains ready-to-paste prompts for each phase of the build.
Open your AI coding agent (Claude Code, Cursor, Copilot Chat, etc.) and paste the relevant prompt.
Always read the output, test it, and paste the next prompt only after verifying.

---

## HOW TO USE

1. Open Claude Code or Cursor in your project root
2. Copy the prompt for the current phase
3. Paste it as your message
4. Let the agent implement
5. Run `npm run dev`, test in browser
6. Fix any errors before moving to next phase
7. Commit: `git commit -m "feat: phase X complete"`

---

## MASTER CONTEXT PROMPT
> Paste this FIRST in every new session before any phase prompt.

```
I'm building my personal portfolio website. The full spec is in:
- PRD.md        → what the site does and requirements
- ARCHITECTURE.md → tech stack, folder structure, data schemas
- DESIGN.md     → visual design, typography, colors, component specs
- TASKS.md      → ordered build checklist

My name is Aditya Kumar. I'm a CSE undergrad at NIT Patna.
GitHub: https://github.com/AdityaKumar1511
LinkedIn: https://linkedin.com/in/aditya-kumar-57a988374/

Stack: Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion, GSAP, Spline.
Read all four spec files before writing any code.
Follow the DESIGN.md color system exactly — use CSS variables, never hardcoded hex.
All content comes from /data/ JSON files — never hardcode strings in components.
```

---

## PHASE 0 PROMPT — Scaffold

```
Read PRD.md, ARCHITECTURE.md, and DESIGN.md.

Set up the project scaffold:
1. Create the exact folder structure from ARCHITECTURE.md
2. Set up globals.css with all CSS variables for dark AND light themes
3. Create a ThemeProvider that applies data-theme="dark"|"light" to <html>, 
   reads localStorage on mount, falls back to system preference
4. Set up next/font with Geist Sans and Geist Mono, apply to :root
5. Create /types/index.ts with Project, Skill, Achievement, Meta interfaces
   based on the schemas in ARCHITECTURE.md
6. Create all /data/*.json files with the structure from ARCHITECTURE.md 
   filled with my actual data:
   - meta.json: Aditya Kumar, NIT Patna, 2nd Year CSE
   - skills.json: React, Next.js, TypeScript, Tailwind, Node.js, 
     FastAPI, MongoDB, Python, XGBoost, Solidity, Wagmi, Git, Docker
   - projects.json: two entries — Arbitrage (Next.js, Supabase, Firecrawl, 
     Resend, Vercel — live crypto tracker) and NexusForge (Wagmi, 
     Chainlink VRF, IPFS, Firebase — blockchain escrow DAO)
7. Create lib/utils.ts with cn() helper using clsx and tailwind-merge
8. Verify npm run dev starts with no errors
```

---

## PHASE 1 PROMPT — Layout Shell

```
Read DESIGN.md sections: Navbar, Footer, Spacing System, Color System.

Implement the layout shell:

1. ScrollProgress.tsx
   - 2px fixed bar at very top, z-50
   - Fills from left to right as user scrolls
   - Color: var(--accent)
   - Use window.scrollY / (document.body.scrollHeight - window.innerHeight)

2. Navbar.tsx
   - Floating pill shape, fixed top-4, left-1/2, transform -translate-x-1/2
   - Contains: name/logo left, section links center (Projects, Skills, About, Contact), 
     ThemeToggle + "Resume" button right
   - glassmorphic: backdrop-blur-md, bg with 70% opacity, border border-[var(--border)]
   - Hidden (opacity 0, translateY -100%) until scrollY > 80
   - Hides on scroll DOWN, reappears on scroll UP
   - Use useScrollDirection hook
   - Framer Motion AnimatePresence for show/hide
   - Section links: smooth scroll to section IDs

3. ThemeToggle.tsx
   - Sun icon (light mode) / Moon icon (dark mode) from lucide-react
   - Toggles data-theme on html element
   - Persists to localStorage

4. Footer.tsx
   - Two rows per DESIGN.md spec
   - Row 1: "Aditya Kumar" left, "Open to internships" green pulsing dot right
   - Between rows: GitHub, LinkedIn, Email, Twitter links
   - Row 2: copyright left, "↑ Back to top" pill button right
   - Back to top: smooth scroll to top
   - Thin border-top separator

5. SideDotNav.tsx
   - Fixed right side, translateX hidden on < lg
   - One dot per section (hero, projects, skills, about, achievements, contact)
   - Active dot: var(--accent) color, slightly larger
   - Tooltip (section name) on hover
   - useActiveSection hook using IntersectionObserver

Add ScrollProgress and SideDotNav to layout.tsx.
Add Navbar and Footer to the main page shell with placeholder section divs.
```

---

## PHASE 2 PROMPT — Loading Screen

```
Create LoadingScreen.tsx:

- Only shown if the page hasn't loaded within 300ms
- Logic: useEffect sets a 300ms timer. If window.onload hasn't fired by then, 
  show the loading screen. Dismiss when load fires.
- Visual: dark background (var(--bg-primary)), centered "AK" initials
  - "A" slides in from left, "K" from right, they meet in center
  - Framer Motion for the letter animations
  - Subtle accent-colored underline appears after letters meet
- Exit animation: fade out + slight scale up (scale 1 → 1.05, opacity 1 → 0)
- Must not flash on fast connections (the 300ms delay prevents this)
- Add to app/layout.tsx

Important: use 'use client' directive. Handle SSR gracefully.
```

---

## PHASE 3 PROMPT — Hero Section

```
Read DESIGN.md Hero Section Design spec carefully.

Create Hero.tsx:

1. Full viewport height section (height: 100svh), overflow hidden, position relative

2. Spline Background:
   - Dynamic import: next/dynamic with ssr: false
   - Scene: use @splinetool/react-spline
   - Scene URL: https://prod.spline.design/a1f156f7-ef01-42d1-bf7b-5be1b7967b0a/scene.splinecode
   - Position: absolute, inset 0, w-full h-full
   - Wrap in div with style={{ filter: 'hue-rotate(220deg) saturate(1.4) brightness(0.85)' }}
   - Add vignette overlay: absolute inset-0, radial-gradient from transparent 
     at center to var(--bg-primary) at edges (80% opacity)
   - Pointer events: none on Spline wrapper so it doesn't capture scroll

3. Hero Content (relative z-10, centered):
   - Small label: "Full-Stack Developer · NIT Patna" 
     Style: text-muted, text-xs, tracking-[0.15em], uppercase, mb-4
   - Hero name: "Aditya Kumar"
     Split into individual letter spans, Framer Motion stagger reveal
     (each letter: opacity 0→1, y: 20→0, duration 0.4s, stagger 0.04s)
     Font: clamp(3rem, 8vw, 5.5rem), font-weight 600, tracking-tight
   - Tagline: "Building full-stack products and ML systems"
     Fade in after name (delay 0.6s), text-secondary, text-lg/xl
   - Anchor pills row: [Projects] [Skills] [About] [Contact]
     Ghost pills, gap-3, smooth scroll on click, mt-8
     Hover: accent border + text color
   - Scroll chevron: ChevronDown from lucide, mt-12, animate-bounce, 
     opacity fades to 0 after scrolling 100px

4. No background color needed — Spline fills it

Load hero data (name, tagline, role) from /data/meta.json.
```

---

## PHASE 4 PROMPT — Projects Carousel

```
Read DESIGN.md Projects Section and ProjectCard anatomy carefully.
Read /data/projects.json for the data structure.

Create Projects.tsx and ProjectCard.tsx:

1. Projects.tsx (section shell):
   - Section heading: "Selected Work" left-aligned, large, with thin accent line below
   - Subtitle: text-secondary, smaller
   - Carousel container: position relative, overflow hidden
   - Apply gradient mask on left/right edges using:
     WebkitMaskImage: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)
   - Arrow buttons: absolute, vertically centered (top-1/2 -translate-y-1/2)
     Left arrow: left-3. Right arrow: right-3.
     Style: 44px circle, bg surface, border, ChevronLeft/ChevronRight icon
     Disabled (opacity 30%) at first/last card
   - Dot indicators: row of small dots below carousel, active dot filled with accent
   - Track current card index in useState

2. Carousel Track:
   - display: flex, overflow-x: scroll, scroll-snap-type: x mandatory
   - scrollbar-width: none (hide scrollbar)
   - gap between cards: 16px (1rem)
   - padding: 0 10% (this creates the peek effect on sides)

3. ProjectCard.tsx:
   - min-width: 80vw (mobile), min-width: 58vw (md:), min-width: 46vw (lg:)
   - height: 60vh minimum, max 520px
   - border-radius: 20px, overflow: hidden, position: relative
   - flex-shrink: 0
   - scroll-snap-align: center
   
   THUMBNAIL:
   - Next.js Image, fill, object-cover
   - Hover: scale(1.04) with transition-transform duration-500
   
   GRADIENT OVERLAY (absolute, bottom 0, full width):
   - height: 70%
   - background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)
   - padding: 24px, display flex flex-col justify-end gap-2
   
   CONTENT (inside overlay, bottom-up order in flex-col):
   - Links row: two ghost mini-buttons "Live Demo ↗" and "GitHub ↗"
     Style: text-xs, border border-white/20, px-3 py-1.5, rounded-full, 
     text-white/80, hover:text-white hover:border-white/50
   - Impact stat: var(--accent) color, font-mono, text-xs
   - Description: text-white/70, text-sm
   - Project name: text-white, text-xl, font-medium
   - Tech pills: row of pills, font-mono text-[10px], 
     bg-white/10 border-white/20, text-white/60
   
4. Arrow button logic:
   - currentIndex state
   - Arrow click: scrolls track div by cardWidth + gap using scrollBy()
   - Also update currentIndex for dots
   - useRef on track div

All data from projects.json. No hardcoded strings.
```

---

## PHASE 5 PROMPT — Skills Section

```
Create Skills.tsx:

- Section heading: "Tech Stack" with subtitle "Tools I reach for"
- Load from /data/skills.json (object with category keys)
- For each category, render a card:
  - Card: surface bg, border, rounded-2xl, p-6
  - Category name: small label, text-muted, uppercase, tracking-wide, mb-3
  - Pills grid: flex-wrap gap-2
  - Each pill: TechPill component (font-mono, bg surface-2, border, text-secondary)
- Grid layout: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4
- Framer Motion: 
  - Container: staggerChildren 0.05s
  - Each card: opacity 0→1, y: 20→0, whileInView, once: true
```

---

## PHASE 6 PROMPT — About Section with GSAP Pin

```
Read DESIGN.md About Section spec.

Create About.tsx with GSAP scroll-pinned animation:

1. Layout: two columns on lg+ (text left, image right), stacked on mobile
2. Image: Next.js Image, rounded-2xl, border, shadow
   - placeholder image for now: /public/profile.jpg
   - Add actual photo here when available

3. Text content (4 paragraphs — write natural, first-person copy about Aditya):
   - Para 1: What got me into CS and why I love building things
   - Para 2: My current focus (full-stack + AI/ML, projects like Arbitrage, NexusForge)
   - Para 3: What I'm looking for (internships, collaboration, open source)
   - Para 4: Outside of code (competitive programming on Codeforces/LeetCode, 
     cinematic design aesthetics)

4. GSAP ScrollTrigger pin:
   - Install check: gsap and @gsap/react should already be installed
   - Use useGSAP hook from @gsap/react
   - Pin the section while each paragraph fades in sequentially
   - Each paragraph starts opacity:0, y:30 and animates in as scrub progresses
   - Unpin after all paragraphs are visible
   - Make sure to kill ScrollTrigger instances on unmount

5. Social links row: GitHub icon, LinkedIn icon, Email icon — lucide-react icons

Important: GSAP ScrollTrigger pin on mobile can break layouts.
Add: enabled: window.innerWidth >= 1024 check before pinning.
```

---

## PHASE 7 PROMPT — Achievements + Blog + Contact

```
Implement three sections:

1. ACHIEVEMENTS (Achievements.tsx):
   Load from /data/achievements.json. Create the JSON file with this structure:
   { "hackathons": [...], "competitive": [...], "openSource": [...] }
   Each item: { title, description, date, link, badge }
   
   - Three subsections with tab or accordion switcher
   - Cards per subsection with stagger animation
   - Notable: ISRO BAH 2026 (SkyLens, Team CodeBlooded), HackArena 2.0
   - CP: LeetCode 282+ solved, Codeforces ~614 rating
   - Open source: GSSoC contributor

2. BLOG (Blog.tsx):
   - Hardcode 2-3 placeholder posts (title, date, platform, link)
   - Will link to external Hashnode/Dev.to posts
   - Simple card: title, date badge, "Read on Hashnode ↗" link
   - "All posts →" footer link
   - Section heading: "Writing"

3. CONTACT (Contact.tsx):
   - Heading: "Get in touch"
   - Subtext: friendly, not robotic — "I check email daily. No ghosts."
   - Large email display: aditya@... — copyable, accent color on hover
   - Formspree form: name, email, message textarea, submit button
     Use action="https://formspree.io/f/PLACEHOLDER" — user will replace
   - Social links row: GitHub, LinkedIn icons
   - All from meta.json

Framer Motion whileInView on all three sections (once: true).
```

---

## PHASE 8 PROMPT — Terminal

```
Read DESIGN.md Terminal Design spec carefully.

Implement the Terminal system:

1. TerminalButton.tsx (fixed corner FAB):
   - Position: fixed, bottom-6, right-6, z-50
   - Size: w-13 h-13 (52px) — if not in Tailwind scale, use inline style
   - Shape: rounded-xl (not circular)
   - Content: ">_" text, font-mono, font-bold, text-base
   - Background: var(--accent), text white
   - Box shadow: 0 0 20px var(--accent-glow)
   - Pulsing ring: keyframe animation scaling a pseudo-ring from 1x to 1.3x, 
     opacity 1→0, 2s infinite — implement with Tailwind @keyframes or CSS
   - Tooltip: "Open Terminal [T]" on hover
   - Keyboard shortcut: pressing T anywhere opens terminal (keydown listener)

2. TerminalModal.tsx:
   - Framer Motion: AnimatePresence, scale 0.95→1 + opacity 0→1 on enter
   - Backdrop: fixed inset-0 bg-black/85 z-50, click to close
   - Window: centered, w-[min(680px,90vw)], h-[min(420px,80vh)]
   - Border-radius: 12px, bg: #0D0D0D, border: var(--border)
   - Header: 3 colored dots (w-3 h-3 rounded-full: #FF5F57 #FFBD2E #28C840) 
     + title "portfolio — zsh" centered + ✕ close button
   - Output area: flex-1, overflow-y-auto, p-4, font-mono text-sm, 
     text-[var(--text-secondary)], space-y-1
   - Input line: flex row, "[ ~ ] >" in accent color, text input no border no bg
   - Auto-focus input on open
   - Close on Escape key
   - Output scrolls to bottom on new command

3. terminalCommands.ts:
   Return type: { output: string | string[], action?: () => void }
   
   Commands (load descriptions from meta.json and projects.json):
   whoami      → "Aditya Kumar — 2nd year CSE @ NIT Patna. Full-stack dev + ML builder."
   ls          → lists: projects/ skills/ achievements/ contact
   ls projects → list all project names from projects.json
   cat <slug>  → show project details (name, tech, impact, links)
   cat skills  → show skills by category
   open github → action: window.open(githubUrl)
   open linkedin → action: window.open(linkedinUrl)
   resume      → action: trigger resume PDF download
   help        → list all commands with descriptions
   clear       → clear output array
   exit        → close modal
   
   Easter eggs (surprise):
   sudo rm -rf / → "Nice try. But this isn't your laptop."
   rm -rf *      → "Haha, no. Go touch grass."
   git blame     → "Aditya Kumar  —  100% of commits"
   
4. Global state: use a simple context or zustand atom for isTerminalOpen
   TerminalButton sets it to true, TerminalModal close sets false.
   
Add TerminalButton and TerminalModal to app/layout.tsx (outside main content).
```

---

## PHASE 9 PROMPT — Polish & Performance

```
Final polish pass. Read ARCHITECTURE.md Performance Requirements.

1. Images:
   - Ensure all <img> tags are replaced with Next.js <Image>
   - Add priority prop to hero image/Spline wrapper area
   - Add appropriate sizes prop to all images

2. Dynamic imports audit:
   - Spline: already dynamic
   - GSAP: ensure imported only in useEffect or via @gsap/react
   - Any component > 50KB: check with next build --debug

3. Meta tags (app/layout.tsx):
   export const metadata = {
     title: 'Aditya Kumar — Portfolio',
     description: 'Full-stack developer and ML builder. CSE undergrad at NIT Patna.',
     keywords: ['Aditya Kumar', 'NIT Patna', 'portfolio', 'developer'],
     openGraph: {
       title: 'Aditya Kumar — Portfolio',
       description: '...',
       images: [{ url: '/og-image.png', width: 1200, height: 630 }],
       url: 'https://YOUR_DOMAIN'
     },
     twitter: { card: 'summary_large_image' }
   }

4. Smooth scroll: add to globals.css:
   html { scroll-behavior: smooth; }
   Add scroll-padding-top: 80px to account for fixed navbar

5. Selection color: 
   ::selection { background: var(--accent-glow); color: var(--accent); }

6. Scrollbar styling (webkit):
   ::-webkit-scrollbar { width: 4px; }
   ::-webkit-scrollbar-track { background: transparent; }
   ::-webkit-scrollbar-thumb { background: var(--border-strong); border-radius: 2px; }

7. Focus styles — ensure keyboard navigation is visible:
   *:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

8. Add Vercel Analytics:
   npm install @vercel/analytics
   Import Analytics from @vercel/analytics/next in layout.tsx

9. Create public/robots.txt:
   User-agent: *
   Allow: /
   Sitemap: https://YOUR_DOMAIN/sitemap.xml

10. Run: npm run build
    Fix ALL TypeScript errors and ESLint warnings before shipping.
    
11. Test checklist:
    - [ ] No console errors
    - [ ] Theme toggle persists on refresh
    - [ ] All project links open correctly
    - [ ] Resume downloads on click
    - [ ] Terminal opens with T key and closes with Escape
    - [ ] Carousel works with touch on mobile
    - [ ] Navbar hides/shows on scroll direction change
    - [ ] Loading screen does not flash on fast connections
    - [ ] GSAP pin in About works and doesn't break mobile
```

---

## TROUBLESHOOTING PROMPTS

### If Spline doesn't load:
```
The Spline scene isn't loading. Check:
1. Is @splinetool/react-spline installed?
2. Is it wrapped in next/dynamic with ssr: false?
3. Try the scene URL: load it in browser directly first
4. If still failing, replace with a Three.js particle background using:
   - A simple canvas with 100 floating dots connected by lines
   - Color: var(--accent) at 30% opacity
   - Subtle mouse parallax
This is the fallback if Spline has CORS or loading issues.
```

### If GSAP ScrollTrigger breaks layout:
```
The GSAP pin in About.tsx is breaking the page layout/scroll.
Fix by:
1. Ensure ScrollTrigger.refresh() is called after images load
2. Add invalidateOnRefresh: true to scrollTrigger config
3. On mobile (< 1024px), disable pin entirely — just use Framer Motion whileInView
4. Ensure the pinned section has explicit height set
```

### If carousel peek isn't working:
```
The project carousel isn't showing adjacent card peeks.
Debug:
1. The track container must have overflow-x: scroll (not hidden)
2. The PARENT of the track needs overflow: hidden 
3. Use CSS mask-image on the parent, NOT clip
4. Card width must be < 100% (try 80vw) so there's room to peek
5. Add padding: 0 10% to the track (not the parent)
```
