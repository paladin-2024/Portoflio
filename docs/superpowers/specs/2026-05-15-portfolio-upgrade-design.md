# Portfolio Upgrade — Design Spec
**Date:** 2026-05-15
**Author:** Nzabanita Caleb
**Goal:** Elevate the portfolio to attract and convert clients across startups, SMEs, agencies, and dev teams.

---

## 1. Color System

### Dark Theme (default)
| Token | Value | Usage |
|---|---|---|
| `--background` | `#0a0908` | Page background |
| `--foreground` | `#F0EDE7` | Body text |
| `--muted` | `#161410` | Subtle backgrounds |
| `--muted-foreground` | `#8a8480` | Secondary text |
| `--border` | `#2a2520` | Dividers, card borders |
| `--card` | `#0f0d0a` | Card backgrounds |
| `--accent` | `#E95420` | Ubuntu orange — CTAs, highlights |

### Light Theme (toggle)
| Token | Value | Usage |
|---|---|---|
| `--background` | `#ffffff` | Page background |
| `--foreground` | `#0f0d0a` | Body text |
| `--muted` | `#f5f5f5` | Subtle backgrounds |
| `--muted-foreground` | `#6b6660` | Secondary text |
| `--border` | `#e8e8e8` | Dividers |
| `--card` | `#f5f5f5` | Card backgrounds |
| `--accent` | `#E95420` | Same orange — consistent across themes |

**Change:** Flip `defaultTheme` in `App.tsx` from `"light"` to `"dark"`.

---

## 2. Typography

| Role | Font | Weight | Notes |
|---|---|---|---|
| Headings / hero | Syne | 800 | Keep — distinctive and strong |
| Body text | Plus Jakarta Sans | 400 / 500 | Replace DM Sans — sharper, more professional |
| Labels / badges / terminal | JetBrains Mono | 400 | Keep — reinforces dev identity |

**Google Fonts import update:** Add `Plus+Jakarta+Sans:wght@400;500` and remove `DM+Sans`.

---

## 3. Navigation — Vertical Dot Side Nav

Replace the current horizontal top navbar with a vertical dot nav on the left rail.

**Desktop layout:**
- Fixed left rail, `56px` wide, full viewport height
- Top: `NC_` monogram (N in orange-bordered square)
- Middle: 5 dots (one per section — Hero, Work, Services, About, Contact)
  - Dots are `6px` circles, `rgba(240,237,231,0.2)` idle
  - Active dot: `#E95420`, scale 1.4×
  - Hover: show section label in a tooltip/text that slides in from the left rail
- Bottom: vertical "2026" text in muted mono, `writing-mode: vertical-rl`
- Rail has a `1px` right border: `rgba(240,237,231,0.07)`

**Mobile layout (< 768px):**
- Rail collapses to a floating hamburger button (top-left)
- Opens a full-height slide-in drawer with the nav links as large text rows
- Drawer closes on link click or tap outside

**Theme toggle:** Moved to the bottom of the rail (sun/moon icon). Clicking switches between dark and light.

**"Hire Me" CTA:** Removed from nav rail. Instead: persistent floating bottom-right button.

**Layout shift:** The 56px rail is `position: fixed` and does not push content. All section containers need `padding-left: 56px` on desktop (`md:pl-14`) to prevent content from sitting behind the rail. On mobile (< 768px) the rail is hidden — no padding needed.

---

## 4. Floating CTAs

### Floating "Book a Call" Button
- Position: fixed bottom-right, `24px` from edges
- Style: `background: #E95420`, white text, `font-family: JetBrains Mono`, `font-size: 9px`, `letter-spacing: 0.15em`, `text-transform: uppercase`, `2px` border-radius
- Link: `https://wa.me/256767579099?text=Hi%20Caleb%2C%20I%20found%20your%20portfolio%20and%20I%27d%20like%20to%20work%20with%20you.`
- Pulse glow: `box-shadow: 0 0 0 0 rgba(233,84,32,0.4)` → animate to `0 0 0 12px rgba(233,84,32,0)` on 2s loop
- **Hides** when the Contact section is in the viewport (via IntersectionObserver)

---

## 5. Hero Section

### Background — Cursor-Reactive Particle Constellation
- Replace the static background with a `<canvas>` element (`position: absolute; inset: 0; z-index: 0`)
- **500 particles** moving at `±0.4px/frame` (slow drift)
- **Lines** drawn between particles within `90px` of each other — `rgba(240,237,231,0.12)` opacity, `0.5px` width
- **Mouse repulsion:** particles within `80px` of cursor are pushed away with `force = (80 - dist) / 80 * 0.8`
- **Orange accent:** 12% of particles are `#E95420`; all particles within `120px` of cursor shift to orange temporarily
- Wrap in edges: particles that exit one side re-enter from the opposite
- Light theme: particle color shifts to `rgba(15,13,10,0.3)` and `#E95420` — same behavior

### Text & Layout (keep existing, apply upgrades)
- Scramble text animation stays — it works
- Terminal block stays — it works
- Replace DM Sans with Plus Jakarta Sans on the tagline
- "Available for Work" badge gets a subtle pulse animation on the green dot

### Three.js HeroScene
- **Do not activate** — the floating particle canvas achieves the "alive" goal without the GPU cost of Three.js. Three.js sphere stays unused.

---

## 6. Animation System — GSAP ScrollTrigger

Wire up a consistent reveal system across all sections. Replace the current ad-hoc Framer Motion `whileInView` where GSAP ScrollTrigger is more appropriate.

| Element | Animation |
|---|---|
| Section headings (h2) | Clip-path reveal: `clipPath: "inset(100% 0 0 0)"` → `"inset(0% 0 0 0)"`, duration 0.8s, ease `power3.out` |
| Section bleed labels (SERVICES. etc.) | Slide in from right: `x: 120` → `x: 0`, opacity 0→1 |
| Cards / grid items | Staggered `y: 40` → `y: 0`, `opacity: 0→1`, 80ms between items |
| Horizontal rule lines | `scaleX: 0` → `scaleX: 1`, `transformOrigin: "left"` |
| About photo | `filter: grayscale(1)` → `grayscale(0)` on scroll entry (not just hover) |
| Stats counters | Already GSAP — keep, just ensure ScrollTrigger `once: true` is set correctly |

**Lenis smooth scroll:** Initialize in `main.tsx`, pass to GSAP ScrollTrigger via `ScrollTrigger.scrollerProxy`.

```ts
// main.tsx addition
import Lenis from '@studio-freight/lenis'
const lenis = new Lenis()
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```

---

## 7. Projects Section — Horizontal Scroll Strip

Replace the `grid gap-8 md:grid-cols-2` layout with a draggable horizontal scroll container.

**Strip layout:**
- Full-width container with `overflow-x: scroll`, `scroll-snap-type: x mandatory`, hide scrollbar (`scrollbar-width: none`)
- Drag-to-scroll via mouse (`mousedown` / `mousemove` delta)
- Cards are `320px` wide on desktop, `85vw` on mobile
- `scroll-snap-align: start` per card

**Per card:**
- Top accent bar: `2px` solid, `#E95420` on first/featured card, `rgba(240,237,231,0.06)` on others
- Project screenshot (aspect-video, `object-fit: cover object-position: top`)
- Card number (e.g. `01 / FEATURED`)
- Project title (Syne 700)
- **Outcome metric** (e.g. `↑ 3× traffic post-launch`) in accent color — this is the key upgrade
- Tech tags
- "Live Site ↗" link

**Outcome metrics (placeholder — owner to verify):**
| Project | Metric |
|---|---|
| Cyberteks-IT | ↑ 3× organic traffic post-launch |
| PaladinCars | 500+ car listings indexed |
| PromptPal | Open-source · 100+ active users |
| SOHAM | NGO donation platform · live |
| Kantarichian | Recently shipped · 2026 |

**End card:** Dashed border card linking to GitHub (`https://github.com/paladin-2024`).

---

## 8. Testimonials — Metrics Strip + Named Cards

### Top: Stat Strip (4 numbers)
```
10+          5+           24h          3+
Projects     Clients      Response     Years Exp
```
Full-width, 4 equal columns, dark card bg, accent numbers.

### Below: 3 Quote Cards (horizontal on desktop, stacked on mobile)
| # | Role | Company | Avatar Initial | Avatar Color |
|---|---|---|---|---|
| 01 | Founder | Jonglei Fish Hub | J | `#E95420` |
| 02 | CEO | Cyberteks-IT | C | `#2a6099` |
| 03 | Founder | Kantarichian | K | `#1a6b3c` |

Each card:
- Avatar circle (32px, colored bg, white initial letter)
- Name: Role — Company
- Quote text (see attribution below)
- 5-star rating (★★★★★ in `#E95420`)
- Thin horizontal rule + attribution line

**Quote attribution:**
| Company | Quote |
|---|---|
| Jonglei Fish Hub | "Caleb built our entire platform from scratch in record time. Clean architecture, great communication, and he genuinely understood what our business needed. Not just a developer — a problem solver." |
| Cyberteks-IT | "Working with Nzabanita on Cyberteks was one of the best technical decisions we made. He brought depth and ideas we hadn't even considered. The site performs brilliantly." |
| Kantarichian | "The work was stunning — I honestly didn't expect a product this polished in such a short time. Caleb exceeded every expectation." |

---

## 9. Remaining Sections (keep, animate)

- **Stats:** Keep as-is. Add Lenis-aware ScrollTrigger.
- **Services:** Keep 2×2 grid. Apply clip-path heading reveal + stagger card animation.
- **About:** Keep layout. Upgrade photo grayscale → color on scroll. Apply clip-path to heading.
- **Skills:** Keep terminal + code editor layout. Apply stagger to tech rows.
- **Process:** Keep editorial list. Apply stagger to rows.
- **Contact:** Keep dark section. Apply heading clip-path reveal.
- **Footer:** Keep. Apply DM Sans → Plus Jakarta Sans.

---

## 10. Meta / SEO

Add to `index.html` `<head>`:
```html
<meta name="description" content="Nzabanita Caleb — Software Engineer in Kampala, Uganda. Backend, full-stack, AI & mobile development." />
<meta property="og:title" content="Nzabanita Caleb — Software Engineer" />
<meta property="og:description" content="Backend systems, full-stack web apps, AI integration & mobile apps. Available for freelance." />
<meta property="og:image" content="/assets/profile.jpg" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
```

---

## 11. Files Changed (summary)

| File | Change |
|---|---|
| `src/index.css` | New color tokens, Plus Jakarta Sans import, remove DM Sans |
| `src/main.tsx` | Lenis init + GSAP ScrollTrigger wiring |
| `src/App.tsx` | `defaultTheme="dark"`, replace `<Navigation>` with `<SideNav>` |
| `src/components/ui/navigation.tsx` | Rewrite as vertical dot side nav |
| `src/components/ui/FloatingCTA.tsx` | New — WhatsApp floating button with pulse + IntersectionObserver |
| `src/components/ui/ParticleCanvas.tsx` | New — cursor-reactive particle constellation |
| `src/components/sections/Hero.tsx` | Add `<ParticleCanvas>`, apply Plus Jakarta Sans |
| `src/components/sections/Projects.tsx` | Rewrite as horizontal scroll strip with drag + outcome metrics |
| `src/components/sections/Testimonials.tsx` | Rewrite with stat strip + 3 named cards |
| `src/components/sections/Services.tsx` | Add GSAP ScrollTrigger animations |
| `src/components/sections/About.tsx` | Scroll-triggered grayscale→color, GSAP heading |
| `public/index.html` | OG meta tags |

---

## Out of Scope

- Case study detail pages (separate project)
- Cal.com booking integration (separate project)
- React Three Fiber / HeroScene (not needed — canvas particles achieve the goal)
- Backend / form changes (Web3Forms stays)
