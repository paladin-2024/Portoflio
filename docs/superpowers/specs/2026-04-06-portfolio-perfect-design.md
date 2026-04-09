# Portfolio 2026 — "Perfect" Rebuild Spec
**Date:** 2026-04-06
**Author:** Nzabanita + Claude

---

## Overview

A single-page scrolling portfolio for Nzabanita — Full Stack Developer & Creative Technologist. The page uses strict black/white minimalism with one electric accent color, Three.js 3D scenes, Lenis smooth scroll, and GSAP + Framer Motion animations. All broken functionality is fixed and real content is wired in.

---

## 1. Architecture

**Single-page, anchor-scroll layout.** All sections live on `/`. Navigation links are anchor links (`#hero`, `#about`, `#projects`, `#skills`, `#contact`). React Router is kept for future multi-page expansion but the nav uses `<a href="#section">` instead of `<Link to="/section">`. Each section element gets an `id` attribute.

**Sections (top to bottom):**
1. Hero
2. About
3. Projects
4. Skills
5. Contact
6. Footer (new)

---

## 2. Aesthetic Direction

**Concept: "Monochrome Architecture"** — Editorial precision meets creative technologist energy. Think high-contrast Swiss grid with one electric accent that sparks life.

### Typography
- **Display/Hero:** `Syne` (weight 800) — ultra-bold, geometric, distinctive. Fills the hero viewport.
- **Body/UI:** `DM Sans` — clean, slightly characterful, excellent readability.
- **Tags/Labels/Mono:** `JetBrains Mono` — for tech tags, nav items, small labels.
- Google Fonts import: Syne 400–800, DM Sans 300–500, JetBrains Mono 400–500.

### Colors
```css
/* Light mode */
--background: #ffffff;
--foreground: #0a0a0a;
--muted: #f5f5f5;
--muted-foreground: #737373;
--border: #e5e5e5;
--input: #e5e5e5;
--ring: #0a0a0a;
--primary: #0a0a0a;
--primary-foreground: #ffffff;
--secondary: #f5f5f5;
--secondary-foreground: #0a0a0a;
--accent: #f0ff3a;           /* Electric yellow — ONE accent across site */
--accent-foreground: #0a0a0a;
--card: #ffffff;
--card-foreground: #0a0a0a;
--destructive: #ef4444;
--destructive-foreground: #ffffff;

/* Dark mode */
--background: #0a0a0a;
--foreground: #fafafa;
--muted: #1a1a1a;
--muted-foreground: #a3a3a3;
--border: #262626;
--input: #262626;
--ring: #fafafa;
--primary: #fafafa;
--primary-foreground: #0a0a0a;
--secondary: #1a1a1a;
--secondary-foreground: #fafafa;
--accent: #f0ff3a;           /* Same yellow pops on dark too */
--accent-foreground: #0a0a0a;
--card: #111111;
--card-foreground: #fafafa;
```

The accent `#f0ff3a` is used sparingly: CTA buttons, active nav dot, hover highlights, skill bar fills. Everything else is black and white.

### Motion
- **Lenis** for buttery smooth scroll (initialized in `main.tsx`).
- **Framer Motion** for section entrance animations (stagger 40ms, ease-out, translate-Y + opacity).
- **GSAP ScrollTrigger** for text reveal and skill bars only (remove from sections already using Framer Motion — no dual animation conflict).
- **Three.js** HeroScene (existing) + ProjectCard3D tilt effect (existing, improved).
- All animations respect `prefers-reduced-motion`.
- Duration: entrance 0.6s, hover 200ms, button 150ms.

---

## 3. Component Changes

### `index.css`
- Replace CSS variable block with the full set above (primary, accent, card, etc.).
- Replace font-family with `'DM Sans', system-ui, sans-serif` for body.
- Add Google Fonts import for Syne, DM Sans, JetBrains Mono.
- Keep custom scrollbar, smooth scroll.

### `App.css`
- **Delete all content.** Vite boilerplate only, nothing used.

### `main.tsx`
- Initialize Lenis and connect to GSAP's ticker:
```ts
const lenis = new Lenis()
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```

### `navigation.tsx`
- Change `navItems` hrefs to anchor links: `#hero`, `#about`, `#projects`, `#skills`, `#contact`.
- Change `<Link to={item.href}>` to `<a href={item.href}>`.
- Add smooth scroll handler: `e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })`.
- Active state: track scroll position to highlight current section (IntersectionObserver on sections).
- Logo uses `font-syne font-extrabold`.
- Add accent dot on the active nav item (small `#f0ff3a` dot below label).

### `Hero.tsx`
- Add `id="hero"` to section.
- Make name "Nzabanita" use `font-syne text-[clamp(4rem,12vw,10rem)] font-extrabold`.
- Add social links row below CTA buttons: GitHub, LinkedIn, Twitter/X icons from Lucide.
  - GitHub: `https://github.com/paladin-2024`
  - LinkedIn: `https://www.linkedin.com/in/nzabanita-caleb` (formatted from "in/nzabanita caleb")
  - Twitter/X: `https://x.com/CNzabb`
- "View My Work" button scrolls to `#projects`.
- "Contact Me" button scrolls to `#contact`.
- Button `variant="primary"` → button styled with `bg-primary text-primary-foreground` (now defined).

### `About.tsx`
- Add `id="about"` to section.
- Remove `data-animate` GSAP attributes — use Framer Motion `whileInView` only (no dual animation).
- Richer bio text replacing placeholder.

### `Projects.tsx`
- Add `id="projects"` to section.
- Replace project data with real 4 projects:
  ```ts
  const projects = [
    {
      title: 'Cyberteks-IT',
      description: 'Future-Ready ICT Solutions for Every Business — security, support, and training.',
      tags: ['Next.js', 'Tailwind', 'Three.js'],
      image: '/assets/projects/cyberteks.png',
      url: 'https://www.cyberteks-it.com/',
    },
    {
      title: 'PaladimCars',
      description: 'Super Luxury Fast Cars For Everyday Use — premium car discovery platform.',
      tags: ['React', 'Firebase', 'TypeScript'],
      image: '/assets/projects/paladincar.png',
      url: 'https://paladincar.netlify.app/',
    },
    {
      title: 'SONAM',
      description: 'Smile of Hope African Ministries — community outreach and donation platform.',
      tags: ['React', 'Node.js', 'MongoDB'],
      image: '/assets/projects/sonam.png',
      url: 'https://soham-five.vercel.app/',
    },
    {
      title: 'PromptPal',
      description: 'Discover & Share AI-Powered Prompts — open-source prompt community.',
      tags: ['React', 'PWA', 'GSAP'],
      image: '/assets/projects/promptpal.png',
      url: 'https://prompt-pal-amber.vercel.app/',
    },
  ]
  ```
- Replace `ProjectCard3D` canvas cards with **image-forward cards**: screenshot thumbnail on top, tilt on hover (CSS `perspective` + `rotateX/Y` via Framer Motion `useMotionValue`), title/description/tags below.
- "Live Demo" button links to `url` (opens in new tab).
- Remove "View Details" button (no detail page exists yet).

### `Skills.tsx`
- Add `id="skills"` to section.
- Skill bars fill with `bg-accent` (`#f0ff3a`) instead of black/white — the one place accent color appears as a fill.

### `Contact.tsx`
- Add `id="contact"` to section.
- Remove placeholder phone number entirely.
- Wire Formspree: `action="https://formspree.io/f/{FORM_ID}"` — user must create a free Formspree account and paste their form ID (placeholder `YOUR_FORM_ID` left in code with a clear comment).
- `onSubmit` uses `fetch` to POST to Formspree endpoint instead of `setTimeout`.
- Keep validation (react-hook-form + zod).

### **New** `Footer.tsx`
- Simple 2-column footer: left = name + tagline, right = social icons.
- Social links: GitHub, LinkedIn, Twitter/X (same as Hero).
- Copyright line: `© 2026 Nzabanita. Built with React + Three.js.`
- Uses `font-jetbrains` for the copyright line.

### `button.tsx`
- Add `primary` as an alias for `default` variant (or rename to support `variant="primary"`).
- Ensure `default` maps to `bg-primary text-primary-foreground hover:bg-primary/90`.

### `ProjectCard3D.tsx`
- Keep for future use but no longer the primary card in Projects section.
- Optionally repurpose as a decorative hover element on the About section.

### `assets/`
- Copy 4 project screenshots to `public/assets/projects/`: `cyberteks.png`, `paladincar.png`, `sonam.png`, `promptpal.png`.
- Source files from user-provided paths in `/home/nzabanita/Pictures/Screenshots/`.
- Remove `src/assets/react.svg`, `src/assets/vite.svg` (Vite boilerplate).

---

## 4. Navigation Fix Summary

| Before | After |
|--------|-------|
| `<Link to="/projects">` | `<a href="#projects">` |
| Route `/projects` → blank | `id="projects"` on section |
| Active = pathname match | Active = IntersectionObserver |
| No smooth scroll | Lenis + scrollIntoView |

---

## 5. Contact Form Flow

1. User fills name, email, message.
2. Submit → `fetch('https://formspree.io/f/{FORM_ID}', { method: 'POST', body: FormData })`.
3. On success → show "Message Sent!" state for 3s.
4. On error → show "Something went wrong. Try again." with `text-destructive`.
5. Comment in code: `// Replace YOUR_FORM_ID with your Formspree form ID from formspree.io`.

---

## 6. Lenis Setup

```ts
// main.tsx
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'

const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```

---

## 7. Files Changed

| File | Action |
|------|--------|
| `src/index.css` | Replace CSS vars, add fonts |
| `src/App.css` | Clear (delete content) |
| `src/main.tsx` | Add Lenis init |
| `src/App.tsx` | Remove unused routes |
| `src/components/ui/navigation.tsx` | Anchor links + active state |
| `src/components/ui/button.tsx` | Add `primary` variant |
| `src/components/sections/Hero.tsx` | Font, social links, anchors |
| `src/components/sections/About.tsx` | id, remove dual animation |
| `src/components/sections/Projects.tsx` | Real projects, image cards |
| `src/components/sections/Skills.tsx` | id, accent color bars |
| `src/components/sections/Contact.tsx` | id, Formspree, remove phone |
| `src/components/ui/Footer.tsx` | **New** — social + copyright |
| `src/pages/Home.tsx` | Add Footer |
| `public/assets/projects/*.png` | **New** — 4 project screenshots |

---

## 8. Out of Scope

- No new pages (404, project detail) — single page only for now.
- No backend — Formspree handles contact.
- No analytics or tracking.
- No CI/CD or Vercel config — deployment is manual.
