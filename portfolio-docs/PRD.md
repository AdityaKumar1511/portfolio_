# PRD — Personal Portfolio Website
**Owner:** Aditya Kumar  
**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · GSAP  
**Target:** Internship recruiters, open-source maintainers, fellow developers  
**Deadline signal:** Ship before third year starts

---

## 1. Purpose

A personal portfolio website that functions as a living résumé, project showcase, and personality expression. It must feel like a premium product, not a template. Every interaction should feel intentional. The site must be fast, responsive, and memorable.

---

## 2. Core Goals

| Priority | Goal |
|----------|------|
| P0 | Projects visible and impressive within 5 seconds of landing |
| P0 | Fully responsive on every device and OS |
| P0 | Lighthouse performance score ≥ 90 |
| P1 | Dark / light mode with smooth transition |
| P1 | Animations feel organic, not AI-generated |
| P1 | JSON-driven content so any section can be updated without touching components |
| P2 | Terminal easter egg accessible from any page |
| P2 | Loading screen if initial bundle takes > 800ms |

---

## 3. Non-Goals

- No CMS integration (Notion, Sanity) — keep it static JSON for now
- No auth, no database, no user accounts
- No blog engine in v1 (placeholder section only, links to external Hashnode/Dev.to)
- No e-commerce or payment flows

---

## 4. Pages & Routes

```
/                    → Main single-page portfolio (all sections)
/projects/[slug]     → Individual project case study (optional v2)
```

All primary content lives on `/`. Each section is a full-viewport or near-full-viewport panel.

---

## 5. Section Map (in order)

1. **Loading screen** — shown only if hydration + Spline takes > 800ms
2. **Hero** — name, role, hero anchor pills, Spline 3D background
3. **Projects carousel** — horizontal sliding cards, JSON-driven
4. **Skills** — categorized tech stack grid
5. **About** — story + photo
6. **Achievements** — hackathons, CP, open source
7. **Blog teaser** — 2–3 latest posts (static links)
8. **Contact** — email, social links, form
9. **Footer** — brand, status, socials, back-to-top
10. **Terminal** — sticky floating button → modal terminal overlay (any page)

---

## 6. Performance Requirements

- First Contentful Paint < 1.2s on 4G
- No layout shift (CLS < 0.05)
- All images: Next.js `<Image>` with `priority` on hero assets, lazy elsewhere
- Spline scene loaded async — hero text renders immediately, 3D fills in
- GSAP and Framer Motion loaded only client-side (dynamic imports)
- Fonts: variable fonts only, loaded via `next/font` (no external requests)
- No unused CSS — Tailwind purge enabled

---

## 7. Responsiveness Contract

- **Mobile (< 640px):** Single column, touch-friendly tap targets ≥ 44px, carousel swipeable
- **Tablet (640–1024px):** Two-column grids, floating nav visible
- **Desktop (> 1024px):** Full layout with side dot nav visible
- **4K / ultrawide:** Max content width 1400px, centered
- Test matrix: Chrome/Safari/Firefox on iOS, Android, macOS, Windows

---

## 8. Theme System

Two modes: `dark` (default) and `light`. Toggle persists to `localStorage`. System preference respected on first visit.

```
Dark:  bg #0A0A0A · surface #111111 · border #222222 · accent #6EE7B7 (mint) OR #818CF8 (indigo)
Light: bg #FAFAFA · surface #FFFFFF · border #E5E5E5 · accent same
```

Accent color: single vibrant color used consistently for hover states, active pills, CTA buttons, and the terminal prompt character. Pick ONE and commit.

---

## 9. Content Data Files

All editable content lives in `/data/`:

```
/data/projects.json     → project cards
/data/skills.json       → tech stack categories
/data/achievements.json → hackathons, ratings, certs
/data/meta.json         → name, tagline, email, social links, resume URL
/data/terminal.json     → terminal command definitions
```

No content should be hardcoded in components.

---

## 10. Success Metrics

- [ ] A recruiter can reach the live demo of any project in < 3 clicks
- [ ] Resume download works from hero AND footer
- [ ] Site renders correctly on iPhone SE, Galaxy S24, iPad, 1080p, 4K
- [ ] No console errors or warnings in production
- [ ] Terminal easter egg delights at least one person who finds it
