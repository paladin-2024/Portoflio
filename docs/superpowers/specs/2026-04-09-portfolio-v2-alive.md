# Portfolio V2 — "Alive" Spec
**Date:** 2026-04-09

---

## Identity
- **Display name:** Nzabanita Caleb
- **Full name:** IKUZO NZABANITA Caleb
- **Title:** Software Engineer
- **Descriptors:** Backend Developer · AI & ML Enthusiast · Robotics Builder · Car Enthusiast · Creative Technologist
- **Location:** Kampala, Uganda
- **Email:** cnzabb@gmail.com
- **WhatsApp/Calls:** +256 767 579 099
- **GitHub:** https://github.com/paladin-2024
- **LinkedIn:** https://www.linkedin.com/in/nzabanita-caleb
- **Twitter/X:** https://x.com/CNzabb

---

## Aesthetic: Monochrome Brutalist Editorial

**Colors:** Strict black (`#0a0a0a`) and white (`#fafafa`). Electric yellow `#f0ff3a` = only accent, used sparingly on: available badge, active nav dot, hover links, CTA hover.

**Typography:**
- Syne 800/900 — display headings, bleeding section labels
- DM Sans 300–500 — body copy
- JetBrains Mono — labels, tags, numbers, mono accents

**Key visual motifs:**
- Oversized section labels bleeding off right/left edge (`overflow: visible`, parent `overflow-x: hidden`)
- Alternating black ↔ white sections for rhythm and contrast
- Grain texture overlay (subtle noise on all sections)
- Thin horizontal rule dividers between sections
- Numbered indicators (01, 02, 03...) for process steps
- Corner arrows and position markers

**"Alive" — GSAP integrations:**
1. Page preloader: "N." pulses and expands → site reveals
2. Custom cursor: small white/black dot + larger ring follower with lag
3. Scroll progress bar: thin accent line at top of viewport
4. Hero text scramble: chars cycle through random chars → settle on "Nzabanita Caleb"
5. ScrollTrigger on every section entrance
6. Animated counters on Stats (GSAP count-up)
7. Magnetic button effect on all CTAs
8. Infinite marquee ticker (GSAP or CSS)
9. Parallax on bleeding section labels (slower scroll speed than content)
10. Staggered line reveals on headings
11. Services card hover: background inverts (white→black or black→white)

---

## Section Order

```
Preloader → Hero → Marquee → Stats → Services → Projects → About → Skills → Process → Testimonials → Contact → Footer
```

---

## Section Specs

### Preloader
- Full screen black
- "N." in Syne 800, center, white
- GSAP timeline: scale up → fade out overlay → reveal site
- Duration: ~1.5s total

### Hero (complete redesign)
- Full viewport, dark bg
- Top-right: "● Available for Work" badge in accent yellow
- Center: subtitle in mono — "SOFTWARE ENGINEER · BACKEND · AI · ROBOTICS"
- Below subtitle: MASSIVE "Nzabanita Caleb" in Syne 900, `clamp(4rem, 14vw, 11rem)`, lineHeight 0.85
  - Text bleeds past left AND right edges slightly
  - GSAP scramble reveal: chars cycle random → settle
- Below name: two CTA buttons (View Work / Let's Talk)
- Below CTAs: three social icon links
- Bottom-right corner: animated rotating text ring "SCROLL DOWN ↓ SCROLL DOWN ↓" around arrow icon
- Bottom-left: "Based in Kampala, Uganda · 2026"
- HeroScene (Three.js sphere) stays as background

### Marquee Ticker (between Hero and Stats)
- Infinite horizontal scroll, right-to-left
- Content: "BACKEND DEVELOPMENT · REACT · NODE.JS · ROBOTICS · AI/ML · THREE.JS · MOBILE APPS · POSTGRESQL · DOCKER · GSAP · OPEN SOURCE ·"
- Two rows in opposite directions for depth
- Speed: medium (GSAP or pure CSS animation)
- Border top and bottom thin lines
- Alternating text color (black bg, white text)

### Stats (inverted black section)
- 4 stat blocks in a row (responsive: 2×2 on mobile)
- Animated number counters (GSAP count-up on scroll enter)
- Stats:
  - `10+` Projects Delivered
  - `3+` Years Experience
  - `5+` Happy Clients
  - `2` Robotics Builds
- Each number in Syne 900 very large (~6rem), label in mono small caps below
- Thin vertical rule dividers between stats

### Services (white section)
- 4 cards in a 2×2 grid
- Each card: number (01-04), icon (Lucide), title, short description
- Hover: entire card inverts bg (white→black, text white)
- Services:
  1. **Backend Development** — Scalable APIs, microservices, databases, server architecture with Node.js, PostgreSQL & MongoDB
  2. **Full-Stack Web Apps** — End-to-end web applications with React, Next.js, TypeScript and modern tooling
  3. **AI & Machine Learning** — Intelligent systems, ML model integration, data pipelines and AI-powered features
  4. **Mobile Development** — Cross-platform mobile apps with React Native, Firebase and offline-first architecture
- Section label "SERVICES." bleeds off right, behind cards

### Projects (redesigned layout)
- Section label "PROJECTS." bleeds off right
- 1 featured project (full-width): Cyberteks-IT or PromptPal
- 3 cards below in a row
- Each card: index number (01, 02...), image, title, tags, live link
- Featured card: larger image, role tag, year

### About (redesigned)
- Left col (40%): B&W filtered photo (`public/assets/profile.jpg`), slightly grainy
- Right col (60%):
  - Small mono label "WHO I AM"
  - Big Syne heading "Nzabanita Caleb."
  - Bio paragraph (2-3 sentences): Software engineer based in Kampala, Uganda. Passionate about building robust backend systems, exploring AI/ML, tinkering with robotics, and appreciating fine automobiles. Currently building the digital infrastructure of tomorrow from East Africa.
  - Descriptor tags: Backend Dev · AI Enthusiast · Robotics · Car Enthusiast · ML Explorer
  - Timeline (vertical line left, dots at each entry)
  - "Download CV" button — links to `/cv/nzabanita-caleb-cv.pdf`
- REMOVE: duplicate "Tech I Use" tag cloud (it's in Skills)

### Skills
- Keep existing 3D floating tech bubbles
- "Technologies." heading bleeds off right

### Process (6 steps, numbered)
- Section label "HOW I WORK." bleeds off right
- 6 steps in a horizontal scroll or 2-column grid:
  1. **01 · Discovery** — Deep-dive into requirements, stakeholder interviews, business goals, technical constraints and feasibility study
  2. **02 · Architecture** — System design, database schema, API contracts, tech stack decisions, security planning and scalability mapping
  3. **03 · Prototyping** — Wireframes, proof-of-concept builds, rapid iteration on core flows, early technical validation
  4. **04 · Development** — Agile sprints, test-driven development, code reviews, CI/CD pipelines, documentation as we go
  5. **05 · Testing & QA** — Unit, integration and end-to-end testing, performance benchmarking, security audits, cross-device QA
  6. **06 · Deployment & Growth** — Production release, monitoring dashboards, post-launch support, performance optimisation and feature iteration
- Each step: large number in mono, thin rule, title, description
- GSAP: numbers count up on scroll, steps stagger in

### Testimonials
- Section label "WHAT THEY SAY." bleeds off right
- Dark inverted section
- 3 quotes in a row (responsive: stack on mobile)
- Each: large open-quote mark, quote text, author name, role/company
- Placeholder quotes (realistic, client fills later):
  1. "Caleb built our entire platform from scratch in record time. His backend architecture was clean, scalable and exactly what we needed. Genuinely impressive work." — Client, Jonglei Fish Hub
  2. "Working with Nzabanita on Cyberteks was one of the best decisions we made. He understands both the technical and business side — rare combination." — Team Lead, Cyberteks-IT
  3. "He doesn't just write code, he thinks in systems. PromptPal's backend is solid because Caleb made it that way. Highly recommend." — Founder, PromptPal
- GSAP: quotes slide in staggered from bottom

### Contact (inverted black section)
- Section label "LET'S BUILD." bleeds off right
- 2-column: left info, right form
- Left info:
  - Email: cnzabb@gmail.com (clickable mailto)
  - WhatsApp: +256 767 579 099 (clickable wa.me link)
  - Calls: +256 767 579 099
  - Location: Kampala, Uganda
  - Social links
- Right: form (name, email, message, send — Formspree)

### Footer (richer)
- Top row: "Nzabanita Caleb." logo left, nav links center, socials right
- Thin horizontal rule
- Bottom row: copyright left, "Designed & Built by Nzabanita Caleb" right
- Subtle: current year auto-updates

---

## Files to Create
| File | Purpose |
|------|---------|
| `src/components/ui/Preloader.tsx` | Page load animation |
| `src/components/ui/Cursor.tsx` | Custom cursor + follower |
| `src/components/ui/ScrollProgress.tsx` | Thin progress bar top |
| `src/components/ui/Marquee.tsx` | Infinite scrolling ticker |
| `src/components/sections/Stats.tsx` | Animated counters |
| `src/components/sections/Services.tsx` | 4 service cards |
| `src/components/sections/Process.tsx` | 6-step process |
| `src/components/sections/Testimonials.tsx` | Client quotes |

## Files to Modify
| File | Changes |
|------|---------|
| `src/App.tsx` | Add Preloader, Cursor, ScrollProgress, grain overlay |
| `src/pages/Home.tsx` | Add all new sections in order |
| `src/components/sections/Hero.tsx` | Full redesign: scramble, bleeding text, badge, corner elements |
| `src/components/sections/About.tsx` | Photo, bio, descriptors, CV button, remove dupe tags |
| `src/components/sections/Projects.tsx` | Featured layout |
| `src/components/sections/Contact.tsx` | Add WhatsApp, calls, richer info |
| `src/components/ui/Footer.tsx` | Full nav + contacts + auto year |
| `src/index.css` | Grain texture, cursor:none on body, scroll vars |

## Files to Delete
| File | Reason |
|------|--------|
| `src/hooks/useScrollAnimation.ts` | Unused |
| `src/components/three/ProjectCard3D.tsx` | Unused |
| `src/assets/react.svg` | Vite boilerplate |
| `src/assets/vite.svg` | Vite boilerplate |
