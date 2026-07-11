# portfolio-docs/

These files are your complete portfolio build system. Give them to any AI coding agent.

## Files

| File | Purpose |
|------|---------|
| `PRD.md` | What the site is, goals, page structure, performance targets |
| `ARCHITECTURE.md` | Tech stack, folder structure, data schemas, component specs |
| `DESIGN.md` | Typography, colors, spacing, every component's visual design |
| `TASKS.md` | Ordered build checklist — what to do and in what order |
| `AGENTS.md` | Copy-paste prompts for each build phase |

## Quickstart

1. Create a new Next.js project:
   ```bash
   npx create-next-app@latest portfolio --typescript --tailwind --app
   cd portfolio
   ```

2. Copy this entire `portfolio-docs/` folder into the project root

3. Open Claude Code (or Cursor):
   ```bash
   claude  # or cursor .
   ```

4. Paste the **MASTER CONTEXT PROMPT** from `AGENTS.md` first

5. Then paste **PHASE 0 PROMPT** and work through each phase in order

## Build order

Phase 0 → Scaffold  
Phase 1 → Layout shell (navbar, footer, progress bar)  
Phase 2 → Loading screen  
Phase 3 → Hero + Spline  
Phase 4 → Projects carousel ← most complex, budget the most time  
Phase 5 → Skills  
Phase 6 → About + GSAP  
Phase 7 → Achievements + Blog + Contact  
Phase 8 → Terminal  
Phase 9 → Polish + Performance  
Phase 10 → Deploy to Vercel  

## Before you start

Replace these placeholders in the JSON files (after scaffold):
- Email address in `meta.json`
- Formspree form ID in Contact section
- Project thumbnail images in `/public/projects/`
- Profile photo at `/public/profile.jpg`
- Resume PDF at `/public/resume.pdf`
- Custom domain in meta tags
