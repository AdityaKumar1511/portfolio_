# TASKS — Build Order & Checklist

Follow this order strictly. Each phase must be complete and working before the next begins.

---

## Phase 0 — Project Scaffold (30 min)

- [ ] `npx create-next-app@latest portfolio --typescript --tailwind --app --src-dir=no`
- [ ] Install dependencies:
  ```bash
  npm install framer-motion gsap @gsap/react lucide-react geist
  npm install @splinetool/react-spline
  npm install clsx tailwind-merge
  ```
- [ ] Create folder structure exactly as in ARCHITECTURE.md
- [ ] Set up `globals.css` with all CSS variables (dark + light)
- [ ] Set up `ThemeProvider` component using `data-theme` attribute on `<html>`
- [ ] Set up `next/font` for Geist Sans + Geist Mono
- [ ] Create all JSON data files in `/data/` with placeholder content
- [ ] Create TypeScript interfaces in `/types/index.ts`
- [ ] Set up `lib/utils.ts` with `cn()` helper (clsx + tailwind-merge)
- [ ] Verify: `npm run dev` starts with no errors, blank dark page loads

---

## Phase 1 — Layout Shell (1 hr)

- [ ] `app/layout.tsx` — wraps everything in ThemeProvider, renders Terminal globally
- [ ] `ScrollProgress.tsx` — 2px fixed bar at top, fills on scroll
- [ ] `Navbar.tsx` — floating pill navbar, hidden until scroll > 80px, hides on scroll-down, shows on scroll-up
- [ ] `Footer.tsx` — two-row footer per DESIGN.md spec
- [ ] `SideDotNav.tsx` — right-edge dots, desktop only (hidden on < lg)
- [ ] `ThemeToggle.tsx` — sun/moon icon, persists to localStorage
- [ ] Verify: navbar appears/disappears correctly, theme toggle works, footer renders

---

## Phase 2 — Loading Screen (30 min)

- [ ] `LoadingScreen.tsx`:
  - Show only if page not loaded within 300ms
  - Display "AK" initials assembling (two spans sliding together)
  - Auto-dismiss on `window.onload`
  - Framer Motion exit: fade + scale up
  - Must not flash on fast connections
- [ ] Add to `app/layout.tsx` with `useState` controlling visibility
- [ ] Verify: visible on throttled connection (DevTools → Slow 3G), invisible on fast

---

## Phase 3 — Hero Section (2 hr)

- [ ] `Hero.tsx` structure: full-height section, Spline bg, centered content
- [ ] Spline scene:
  - Load via `next/dynamic({ ssr: false })`
  - Reference scene URL from community file (see ARCHITECTURE.md)
  - Wrap in div with CSS `filter: hue-rotate(240deg) saturate(1.3)` to shift colors
  - Add vignette overlay (radial gradient from transparent to bg-primary)
- [ ] Hero name animation: Framer Motion split each character, staggerChildren 0.05s
- [ ] Role text: typewriter effect cycling through 2–3 roles
- [ ] Anchor pills: smooth scroll on click using `document.getElementById().scrollIntoView()`
- [ ] Scroll chevron: CSS bounce animation, fades out on scroll
- [ ] Resume download button in hero
- [ ] Verify: Spline loads asynchronously (text visible immediately), animation smooth at 60fps

---

## Phase 4 — Projects Carousel (3 hr)

- [ ] `Projects.tsx` — section shell, heading, carousel track, arrow buttons
- [ ] `ProjectCard.tsx` — per DESIGN.md card spec (thumbnail + gradient overlay + content)
- [ ] Carousel mechanics:
  - CSS `scroll-snap-type: x mandatory` on track
  - `scroll-snap-align: center` on cards
  - Card widths: `80vw` mobile / `58vw` md / `46vw` lg
  - Adjacent cards peek: use `mask-image` gradient on track container OR padding hack
  - Arrow buttons: `scrollBy` with `behavior: smooth`
  - Track touch/swipe: works natively via scroll-snap
  - Keyboard arrows: `onKeyDown` listener when section focused
- [ ] Dot indicators below carousel (filled dot = active card)
- [ ] Card hover: thumbnail scale(1.04), content shifts up slightly
- [ ] Populate from `projects.json` — map over array, no hardcoded content
- [ ] Verify: peeks correctly on mobile, tablet, desktop; arrows disable at ends; touch swipe works

---

## Phase 5 — Skills Section (1 hr)

- [ ] `Skills.tsx` — section heading + categorized grid
- [ ] Each category is a card with a header and pill grid
- [ ] Framer Motion: stagger pop-in on `whileInView` (once: true)
- [ ] Populate from `skills.json`
- [ ] Verify: grid looks clean at all breakpoints

---

## Phase 6 — About Section (1.5 hr)

- [ ] `About.tsx` — two-column on desktop (text left, photo right), stacked on mobile
- [ ] Photo: Next.js `<Image>`, rounded-2xl, subtle border
- [ ] GSAP ScrollTrigger pin: pin the section while text lines animate in sequentially
  ```js
  gsap.timeline({ scrollTrigger: { trigger: ref, pin: true, scrub: 1 }})
    .from('.about-line', { opacity: 0, y: 20, stagger: 0.1 })
  ```
- [ ] Social links row at bottom of about text
- [ ] Verify: pin works correctly, doesn't break mobile scroll

---

## Phase 7 — Achievements Section (1 hr)

- [ ] `Achievements.tsx` — grid of achievement cards
- [ ] Three sub-categories: Hackathons / Competitive Programming / Open Source
- [ ] Framer Motion: stagger slide from left on enter
- [ ] Populate from `achievements.json`
- [ ] Verify: all categories render, responsive

---

## Phase 8 — Blog Teaser (30 min)

- [ ] `Blog.tsx` — 2–3 static post cards with title, date, read time, external link
- [ ] "Read on Hashnode →" or "View all posts →" link
- [ ] Populate from hardcoded array (or `blog.json` if you prefer)
- [ ] Verify: links open in new tab

---

## Phase 9 — Contact Section (1 hr)

- [ ] `Contact.tsx` — heading, email visible, social links, optional form
- [ ] Form: name, email, message — use Formspree action (no backend needed)
  ```html
  <form action="https://formspree.io/f/YOUR_ID" method="POST">
  ```
- [ ] Or EmailJS for client-side sending without page reload
- [ ] Social icon links: GitHub, LinkedIn, Twitter
- [ ] Verify: form submits, email is copyable

---

## Phase 10 — Terminal (2 hr)

- [ ] `TerminalButton.tsx` — fixed corner FAB with pulse animation
- [ ] `TerminalModal.tsx` — overlay with header bar, output area, input line
- [ ] `terminalCommands.ts` — command parser and response map
- [ ] Commands per DESIGN.md spec + at least 1 easter egg
- [ ] Open/close with Framer Motion (scale + opacity)
- [ ] Close on Escape key or clicking backdrop
- [ ] Verify: all commands work, input feels snappy, scrolls output properly

---

## Phase 11 — Side Dot Nav (30 min)

- [ ] `SideDotNav.tsx` — fixed right side, dots for each section
- [ ] `useActiveSection` hook: IntersectionObserver on all section IDs
- [ ] Active dot: accent color + larger size
- [ ] Tooltip on hover: section name
- [ ] Hidden on < lg breakpoint
- [ ] Verify: highlight updates correctly as you scroll

---

## Phase 12 — Polish & Performance (2 hr)

- [ ] All images converted to `.webp` format, correct sizes
- [ ] `<Image priority>` on hero assets only
- [ ] Dynamic imports for Spline, GSAP, heavy components
- [ ] OG meta tags in `app/layout.tsx`:
  ```tsx
  export const metadata = {
    title: 'Aditya Kumar — Portfolio',
    description: '...',
    openGraph: { images: ['/og-image.png'] }
  }
  ```
- [ ] Favicon + Apple touch icon in `/public`
- [ ] `robots.txt` and `sitemap.xml` (Next.js 14 auto-generates sitemap via `app/sitemap.ts`)
- [ ] Vercel Analytics: `npm install @vercel/analytics` + `<Analytics />` in layout
- [ ] Run Lighthouse — fix anything under 90 on Performance
- [ ] Test on: iPhone SE (375px), Galaxy S24, iPad, 1080p, 1440p, 4K
- [ ] Test on: Chrome, Safari, Firefox
- [ ] Test dark/light mode on each device
- [ ] Fix any hydration warnings in console

---

## Phase 13 — Deploy

- [ ] Push to GitHub
- [ ] Connect repo to Vercel
- [ ] Set custom domain (aditya.dev / adityakumar.tech)
- [ ] Verify SSL active
- [ ] Share the URL

---

## Content Checklist (fill before Phase 12)

- [ ] Real project thumbnails (800×500px WebP) for all projects in `projects.json`
- [ ] Resume PDF uploaded to `/public/resume.pdf`
- [ ] OG image created (1200×630px) in `/public/og-image.png`
- [ ] Profile photo (400×400px minimum) for About section
- [ ] All project links tested (live URLs working, repos public)
- [ ] Real email address in `meta.json` and contact section
- [ ] Formspree form ID obtained from formspree.io
