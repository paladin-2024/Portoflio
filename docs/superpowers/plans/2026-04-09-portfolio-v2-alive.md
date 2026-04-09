# Portfolio V2 "Alive" — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the portfolio into a living, breathing Monochrome Brutalist Editorial experience — custom cursor, preloader, GSAP scroll animations, bleeding oversized text, new sections (Stats, Services, Process, Testimonials), real personal info, and a fully alive feel.

**Architecture:** Single-page scroll. GSAP ScrollTrigger powers all section animations. Framer Motion for component-level micro-interactions. Lenis for smooth scroll. New sections inserted between existing ones. All sections respect dark/light theme.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind v4, GSAP + ScrollTrigger, Framer Motion, Lenis, React Three Fiber, Lucide React, DM Sans + Syne + JetBrains Mono.

**Personal info constants:**
- Name: Nzabanita Caleb (display) / IKUZO NZABANITA Caleb (full)
- Title: Software Engineer
- Email: cnzabb@gmail.com
- WhatsApp/Calls: +256 767 579 099
- GitHub: https://github.com/paladin-2024
- LinkedIn: https://www.linkedin.com/in/nzabanita-caleb
- Twitter: https://x.com/CNzabb

---

## Task 1: Cleanup Dead Files + Add Grain Texture to index.css

**Files:**
- Delete: `src/hooks/useScrollAnimation.ts`
- Delete: `src/components/three/ProjectCard3D.tsx`
- Delete: `src/assets/react.svg`, `src/assets/vite.svg`
- Modify: `src/index.css`
- Modify: `index.html`

- [ ] **Step 1: Delete unused files**
```bash
rm /home/nzabanita/StudioProjects/portfolio-2026/src/hooks/useScrollAnimation.ts
rm /home/nzabanita/StudioProjects/portfolio-2026/src/components/three/ProjectCard3D.tsx
rm /home/nzabanita/StudioProjects/portfolio-2026/src/assets/react.svg
rm /home/nzabanita/StudioProjects/portfolio-2026/src/assets/vite.svg
```

- [ ] **Step 2: Add grain texture + cursor hide + bleed helpers to `src/index.css`**

Append to end of existing `src/index.css`:
```css
/* Hide default cursor — custom cursor takes over */
*, *::before, *::after {
  cursor: none !important;
}

/* Grain overlay — applied via ::after on body */
body::after {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 128px 128px;
}

/* Bleeding text helper — parent must have overflow-x: hidden */
.bleed-right {
  white-space: nowrap;
  overflow: visible;
  width: max-content;
}

/* Section label bleed — decorative */
.section-bleed-label {
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: clamp(4rem, 12vw, 10rem);
  line-height: 0.9;
  white-space: nowrap;
  color: transparent;
  -webkit-text-stroke: 1px var(--border);
  pointer-events: none;
  user-select: none;
}

.dark .section-bleed-label {
  -webkit-text-stroke: 1px rgba(255,255,255,0.08);
}
```

- [ ] **Step 3: Update `index.html` title and meta**
```html
<!-- Replace existing <title> and add meta tags in <head> -->
<title>Nzabanita Caleb — Software Engineer</title>
<meta name="description" content="Software Engineer based in Kampala, Uganda. Backend development, AI/ML, robotics, and full-stack web applications." />
<meta property="og:title" content="Nzabanita Caleb — Software Engineer" />
<meta property="og:description" content="Building the digital infrastructure of tomorrow from East Africa." />
```

- [ ] **Step 4: Commit**
```bash
cd /home/nzabanita/StudioProjects/portfolio-2026
git add -A
git commit -m "chore: cleanup unused files, add grain texture, update meta"
```

---

## Task 2: Preloader Component

**Files:**
- Create: `src/components/ui/Preloader.tsx`

- [ ] **Step 1: Create `src/components/ui/Preloader.tsx`**

```tsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ onComplete });

    tl.fromTo(
      letterRef.current,
      { opacity: 0, scale: 0.6, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    )
    .to(letterRef.current, {
      scale: 1.08,
      duration: 0.3,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: 1,
    })
    .to(progressRef.current, {
      scaleX: 1,
      duration: 0.5,
      ease: 'power2.inOut',
      transformOrigin: 'left center',
    }, '-=0.2')
    .to(containerRef.current, {
      yPercent: -100,
      duration: 0.7,
      ease: 'power4.inOut',
      delay: 0.1,
    });

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-foreground"
    >
      <span
        ref={letterRef}
        className="font-syne font-extrabold text-background opacity-0"
        style={{ fontSize: 'clamp(5rem, 15vw, 10rem)', lineHeight: 1 }}
      >
        N.
      </span>
      <div className="mt-8 w-48 h-px bg-background/20 overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-accent"
          style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**
```bash
git add src/components/ui/Preloader.tsx
git commit -m "feat: add animated preloader component"
```

---

## Task 3: Custom Cursor

**Files:**
- Create: `src/components/ui/Cursor.tsx`

- [ ] **Step 1: Create `src/components/ui/Cursor.tsx`**

```tsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current!;
    const ring = ringRef.current!;

    const onMove = (e: MouseEvent) => {
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power3.out',
      });
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.35,
        ease: 'power3.out',
      });
    };

    const onEnterLink = () => {
      gsap.to(ring, { scale: 2, opacity: 0.5, duration: 0.3 });
      gsap.to(dot, { scale: 0, duration: 0.3 });
    };

    const onLeaveLink = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    window.addEventListener('mousemove', onMove);

    const links = document.querySelectorAll('a, button, [role="button"]');
    links.forEach((el) => {
      el.addEventListener('mouseenter', onEnterLink);
      el.addEventListener('mouseleave', onLeaveLink);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      links.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterLink);
        el.removeEventListener('mouseleave', onLeaveLink);
      });
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[9998] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground"
        style={{ top: 0, left: 0 }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed z-[9997] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/50"
        style={{ top: 0, left: 0 }}
      />
    </>
  );
}
```

- [ ] **Step 2: Commit**
```bash
git add src/components/ui/Cursor.tsx
git commit -m "feat: add custom cursor with dot and ring follower"
```

---

## Task 4: Scroll Progress Bar

**Files:**
- Create: `src/components/ui/ScrollProgress.tsx`

- [ ] **Step 1: Create `src/components/ui/ScrollProgress.tsx`**

```tsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(barRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[9996] h-[2px] bg-transparent">
      <div
        ref={barRef}
        className="h-full bg-accent origin-left"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
```

- [ ] **Step 2: Commit**
```bash
git add src/components/ui/ScrollProgress.tsx
git commit -m "feat: add scroll progress bar with GSAP scrub"
```

---

## Task 5: Marquee Ticker

**Files:**
- Create: `src/components/ui/Marquee.tsx`

- [ ] **Step 1: Create `src/components/ui/Marquee.tsx`**

```tsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface MarqueeProps {
  items: string[];
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
}

export function Marquee({ items, direction = 'left', speed = 40, className = '' }: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const text = items.join(' · ') + ' · ';

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div
        ref={trackRef}
        className="inline-flex"
        style={{
          animation: `marquee-${direction} ${speed}s linear infinite`,
        }}
      >
        <span className="inline-block pr-0">{text}{text}{text}</span>
      </div>
    </div>
  );
}
```

Also append to `src/index.css`:
```css
@keyframes marquee-left {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-33.333%); }
}
@keyframes marquee-right {
  0%   { transform: translateX(-33.333%); }
  100% { transform: translateX(0); }
}
```

- [ ] **Step 2: Commit**
```bash
git add src/components/ui/Marquee.tsx
git commit -m "feat: add infinite marquee ticker component"
```

---

## Task 6: Hero — Complete Redesign

**Files:**
- Modify: `src/components/sections/Hero.tsx`

- [ ] **Step 1: Replace `src/components/sections/Hero.tsx` entirely**

```tsx
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Button } from '../ui/button';
import { HeroScene } from '../three/HeroScene';
import { ArrowDown, Code2, Globe, X } from 'lucide-react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';

function scrambleText(el: HTMLElement, finalText: string, duration = 1.2) {
  let frame = 0;
  const totalFrames = Math.round(duration * 60);
  const chars = finalText.split('');

  const tick = () => {
    el.textContent = chars
      .map((char, i) => {
        if (char === ' ') return ' ';
        if (frame / totalFrames > i / chars.length) return char;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      })
      .join('');

    frame++;
    if (frame <= totalFrames) requestAnimationFrame(tick);
    else el.textContent = finalText;
  };

  tick();
}

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export function Hero() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (nameRef.current) scrambleText(nameRef.current, 'Nzabanita Caleb', 1.4);
    }, 1600);
    return () => clearTimeout(delay);
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-screen w-full overflow-x-hidden bg-white dark:bg-black"
    >
      <HeroScene />

      {/* Available badge — top right */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute top-20 right-6 md:right-10 z-20 flex items-center gap-2 px-3 py-1.5 border border-accent/60 rounded-full bg-accent/10"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
          Available for Work
        </span>
      </motion.div>

      {/* Main content */}
      <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] text-muted-foreground mb-4"
        >
          Software Engineer · Backend · AI/ML · Robotics
        </motion.p>

        <h1
          ref={nameRef}
          className="font-syne font-extrabold text-foreground bleed-right mb-8"
          style={{
            fontSize: 'clamp(3.8rem, 13vw, 11rem)',
            lineHeight: 0.88,
            letterSpacing: '-0.02em',
          }}
        >
          {'Nzabanita Caleb'.split('').map(() => '█').join('')}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 0.6 }}
          className="max-w-lg text-base md:text-lg text-muted-foreground mb-10 leading-relaxed"
        >
          Building robust digital systems from East Africa —
          backend infrastructure, AI-powered products, robotics experiments
          and the occasional automotive appreciation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          className="flex flex-wrap gap-4 mb-10"
        >
          <Button size="lg" variant="primary" onClick={() => scrollToSection('projects')}>
            View My Work
          </Button>
          <Button size="lg" variant="outline" onClick={() => scrollToSection('contact')}>
            Let's Talk
          </Button>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="flex gap-6"
        >
          {[
            { href: 'https://github.com/paladin-2024', label: 'GitHub', icon: <Code2 className="h-4 w-4" /> },
            { href: 'https://www.linkedin.com/in/nzabanita-caleb', label: 'LinkedIn', icon: <Globe className="h-4 w-4" /> },
            { href: 'https://x.com/CNzabb', label: 'Twitter/X', icon: <X className="h-4 w-4" /> },
          ].map(({ href, label, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              {icon}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Bottom-left: location */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.5 }}
        className="absolute bottom-10 left-6 md:left-16 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50"
      >
        Based in Kampala, Uganda · 2026
      </motion.p>

      {/* Bottom-right: scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.5 }}
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 right-6 md:right-10 flex flex-col items-center gap-2 border-none bg-transparent"
        aria-label="Scroll down"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground/50 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <ArrowDown className="h-4 w-4 animate-bounce text-muted-foreground/50" />
      </motion.button>
    </section>
  );
}
```

- [ ] **Step 2: Commit**
```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: hero complete redesign with scramble text, available badge, editorial layout"
```

---

## Task 7: Stats Section

**Files:**
- Create: `src/components/sections/Stats.tsx`

- [ ] **Step 1: Create `src/components/sections/Stats.tsx`**

```tsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 10, suffix: '+', label: 'Projects\nDelivered' },
  { value: 3,  suffix: '+', label: 'Years\nExperience' },
  { value: 5,  suffix: '+', label: 'Happy\nClients' },
  { value: 2,  suffix: '',  label: 'Robotics\nBuilds' },
];

function StatCounter({ value, suffix, label }: typeof stats[0]) {
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: numRef.current,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(obj, {
          val: value,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            if (numRef.current) numRef.current.textContent = Math.round(obj.val).toString();
          },
        });
      },
      once: true,
    });
  }, [value]);

  return (
    <div className="flex flex-col items-center md:items-start text-center md:text-left px-8 first:pl-0 last:pr-0 border-r border-border last:border-r-0">
      <div className="flex items-end gap-1">
        <span
          ref={numRef}
          className="font-syne font-extrabold text-background dark:text-foreground leading-none"
          style={{ fontSize: 'clamp(3.5rem, 7vw, 6rem)' }}
        >
          0
        </span>
        <span
          className="font-syne font-extrabold text-accent mb-2"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
        >
          {suffix}
        </span>
      </div>
      <p className="font-mono text-[10px] uppercase tracking-widest text-background/60 dark:text-foreground/50 whitespace-pre-line mt-2 leading-relaxed">
        {label}
      </p>
    </div>
  );
}

export function Stats() {
  return (
    <section className="py-20 bg-foreground dark:bg-foreground overflow-x-hidden">
      <div className="container mx-auto px-6 md:px-16 max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 md:gap-0">
          {stats.map((stat) => (
            <StatCounter key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**
```bash
git add src/components/sections/Stats.tsx
git commit -m "feat: stats section with GSAP animated counters"
```

---

## Task 8: Services Section

**Files:**
- Create: `src/components/sections/Services.tsx`

- [ ] **Step 1: Create `src/components/sections/Services.tsx`**

```tsx
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Server, Globe, Brain, Smartphone } from 'lucide-react';

const services = [
  {
    num: '01',
    icon: Server,
    title: 'Backend Development',
    desc: 'Scalable APIs, microservices, databases and server architecture. Node.js, PostgreSQL, MongoDB, Redis. Built for performance and reliability.',
  },
  {
    num: '02',
    icon: Globe,
    title: 'Full-Stack Web Apps',
    desc: 'End-to-end web applications from database to UI. React, Next.js, TypeScript, Tailwind. Clean code, tested, deployed.',
  },
  {
    num: '03',
    icon: Brain,
    title: 'AI & Machine Learning',
    desc: 'Intelligent systems and ML model integration. Data pipelines, AI-powered features, natural language processing and automation.',
  },
  {
    num: '04',
    icon: Smartphone,
    title: 'Mobile Development',
    desc: 'Cross-platform mobile apps with React Native, Firebase and offline-first architecture. From idea to App Store.',
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-background overflow-x-hidden">
      <div className="container mx-auto px-6 md:px-16 max-w-6xl">
        {/* Bleed label */}
        <div className="relative mb-16 overflow-x-hidden">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
              What I Offer
            </p>
          </motion.div>
          <span
            className="section-bleed-label absolute top-0 right-0 translate-x-1/4 select-none pointer-events-none"
            aria-hidden
          >
            SERVICES.
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-syne font-extrabold text-foreground relative z-10"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            Services.
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-border">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group bg-background p-8 md:p-10 hover:bg-foreground transition-colors duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="font-mono text-xs text-muted-foreground group-hover:text-background/50 transition-colors">
                    {svc.num}
                  </span>
                  <Icon className="h-5 w-5 text-muted-foreground group-hover:text-background/70 transition-colors" />
                </div>
                <h3 className="font-syne font-bold text-xl text-foreground group-hover:text-background transition-colors mb-3">
                  {svc.title}
                </h3>
                <p className="text-sm text-muted-foreground group-hover:text-background/60 transition-colors leading-relaxed">
                  {svc.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**
```bash
git add src/components/sections/Services.tsx
git commit -m "feat: services section with hover invert cards"
```

---

## Task 9: Process Section (6 Steps)

**Files:**
- Create: `src/components/sections/Process.tsx`

- [ ] **Step 1: Create `src/components/sections/Process.tsx`**

```tsx
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    title: 'Discovery',
    desc: 'Deep-dive into requirements, stakeholder interviews, business goals, technical constraints and feasibility study. Understanding before building.',
  },
  {
    num: '02',
    title: 'Architecture',
    desc: 'System design, database schema, API contracts, tech stack decisions, security planning and scalability mapping. The blueprint before the bricks.',
  },
  {
    num: '03',
    title: 'Prototyping',
    desc: 'Wireframes, proof-of-concept builds, rapid iteration on core flows and early technical validation. Fast feedback loops.',
  },
  {
    num: '04',
    title: 'Development',
    desc: 'Agile sprints, test-driven development, code reviews, CI/CD pipelines and documentation as we go. Clean code by default.',
  },
  {
    num: '05',
    title: 'Testing & QA',
    desc: 'Unit, integration and end-to-end testing, performance benchmarking, security audits and cross-device QA. Ship with confidence.',
  },
  {
    num: '06',
    title: 'Deploy & Grow',
    desc: 'Production release, monitoring dashboards, post-launch support, performance optimisation and feature iteration. The work continues.',
  },
];

export function Process() {
  return (
    <section id="process" className="py-24 bg-muted dark:bg-muted overflow-x-hidden">
      <div className="container mx-auto px-6 md:px-16 max-w-6xl">
        {/* Header */}
        <div className="relative mb-16 overflow-x-hidden">
          <span
            className="section-bleed-label absolute top-0 right-0 translate-x-1/4 select-none pointer-events-none"
            aria-hidden
          >
            PROCESS.
          </span>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4"
          >
            How I Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-syne font-extrabold text-foreground relative z-10"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            The Process.
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="space-y-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group flex gap-8 md:gap-16 py-8 border-t border-border last:border-b hover:bg-background/50 dark:hover:bg-background/10 transition-colors px-4 -mx-4"
            >
              <span className="font-mono text-xs text-muted-foreground/50 pt-1 shrink-0 w-8">
                {step.num}
              </span>
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-16 flex-1">
                <h3 className="font-syne font-bold text-xl text-foreground md:w-48 shrink-0">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**
```bash
git add src/components/sections/Process.tsx
git commit -m "feat: process section with 6 software engineering steps"
```

---

## Task 10: Testimonials Section

**Files:**
- Create: `src/components/sections/Testimonials.tsx`

- [ ] **Step 1: Create `src/components/sections/Testimonials.tsx`**

```tsx
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: 'Caleb built our entire platform from scratch in record time. Clean architecture, great communication, and he genuinely understood what our business needed. Not just a developer — a problem solver.',
    name: 'Client',
    role: 'Jonglei Fish Hub',
  },
  {
    quote: 'Working with Nzabanita on Cyberteks was one of the best technical decisions we made. He brought depth and ideas we hadn\'t even considered. The site performs brilliantly.',
    name: 'Team Lead',
    role: 'Cyberteks-IT',
  },
  {
    quote: 'He doesn\'t just write code — he thinks in systems. PromptPal\'s backend is rock-solid and scales well because Caleb architected it properly from day one.',
    name: 'Founder',
    role: 'PromptPal',
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-foreground dark:bg-foreground overflow-x-hidden">
      <div className="container mx-auto px-6 md:px-16 max-w-6xl">
        {/* Header */}
        <div className="relative mb-16 overflow-x-hidden">
          <span
            className="font-syne font-extrabold absolute top-0 right-0 translate-x-1/4 select-none pointer-events-none whitespace-nowrap"
            style={{
              fontSize: 'clamp(4rem, 12vw, 10rem)',
              lineHeight: 0.9,
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,255,255,0.06)',
            }}
            aria-hidden
          >
            CLIENTS.
          </span>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-xs uppercase tracking-[0.3em] text-background/40 mb-4"
          >
            Social Proof
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-syne font-extrabold text-background relative z-10"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            What They Say.
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-background/10">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="bg-foreground p-8"
            >
              <span
                className="font-syne font-extrabold text-background/15 block mb-4"
                style={{ fontSize: '4rem', lineHeight: 0.8 }}
              >
                "
              </span>
              <p className="text-background/80 text-sm leading-relaxed mb-8">
                {t.quote}
              </p>
              <div className="border-t border-background/10 pt-4">
                <p className="font-syne font-bold text-background text-sm">{t.name}</p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-background/40 mt-0.5">
                  {t.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**
```bash
git add src/components/sections/Testimonials.tsx
git commit -m "feat: testimonials section with inverted dark layout"
```

---

## Task 11: About Section Redesign (Photo + Bio + CV)

**Files:**
- Modify: `src/components/sections/About.tsx`

- [ ] **Step 1: Replace `src/components/sections/About.tsx`**

```tsx
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { Button } from '../ui/button';

const timeline = [
  { year: '2026', title: 'Software Engineer', company: 'Freelance — Kampala, Uganda' },
  { year: '2025', title: 'Software Engineering', company: 'University Studies' },
  { year: '2024', title: 'Web & Backend Development', company: 'Self-taught & Open Source' },
  { year: '2023', title: 'Started Coding', company: 'The Journey Begins' },
];

const descriptors = [
  'Backend Dev',
  'AI Enthusiast',
  'ML Explorer',
  'Robotics Builder',
  'Car Enthusiast',
  'Open Source',
];

export function About() {
  return (
    <section id="about" className="py-24 bg-background overflow-x-hidden">
      <div className="container mx-auto px-6 md:px-16 max-w-6xl">
        <div className="grid lg:grid-cols-[2fr_3fr] gap-12 md:gap-20 items-start">
          {/* Left — Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-none aspect-[3/4] max-w-sm">
              <img
                src="/assets/profile.jpg"
                alt="Nzabanita Caleb"
                className="w-full h-full object-cover grayscale contrast-110"
              />
              {/* Grain overlay on photo */}
              <div
                className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  backgroundSize: '128px',
                }}
              />
              {/* Thin border accent */}
              <div className="absolute inset-0 border border-foreground/10" />
            </div>
            {/* Location tag below photo */}
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-4">
              Kampala, Uganda — 2026
            </p>
          </motion.div>

          {/* Right — Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Who I Am
            </p>
            <h2
              className="font-syne font-extrabold text-foreground mb-6"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', lineHeight: 0.95 }}
            >
              Nzabanita<br />Caleb.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              I'm a Software Engineer based in Kampala, Uganda — building robust backend systems,
              AI-powered products and full-stack web applications. I care about performance,
              clean architecture and software that actually solves problems.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Off the screen, I'm exploring robotics, tinkering with ML models and appreciating
              fine engineering on four wheels. Currently available for freelance and collaborative work.
            </p>

            {/* Descriptor tags */}
            <div className="flex flex-wrap gap-2 mb-10">
              {descriptors.map((d) => (
                <span
                  key={d}
                  className="font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 border border-border text-muted-foreground hover:border-accent hover:text-foreground transition-colors"
                >
                  {d}
                </span>
              ))}
            </div>

            {/* Timeline */}
            <div className="space-y-0 mb-10">
              {timeline.map((entry, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-6 py-4 border-t border-border last:border-b"
                >
                  <span className="font-mono text-xs text-muted-foreground/50 shrink-0 pt-0.5">
                    {entry.year}
                  </span>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{entry.title}</p>
                    <p className="font-mono text-xs text-muted-foreground mt-0.5">{entry.company}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CV button */}
            <a href="/cv/nzabanita-caleb-cv.pdf" download>
              <Button variant="outline" size="lg" className="gap-2">
                <Download className="h-4 w-4" />
                Download CV
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**
```bash
git add src/components/sections/About.tsx
git commit -m "feat: about redesign with photo, bio, descriptors, timeline, CV download"
```

---

## Task 12: Contact — Add WhatsApp + Calls + Richer Info

**Files:**
- Modify: `src/components/sections/Contact.tsx`

- [ ] **Step 1: Update contact info block in `src/components/sections/Contact.tsx`**

Replace the Card content block (lines with Mail, MapPin, Phone icons) with:

```tsx
<Card className="p-6 space-y-5 bg-card border-border">
  <div className="flex items-center gap-4">
    <div className="p-2.5 bg-muted rounded-lg">
      <Mail className="h-5 w-5 text-foreground" />
    </div>
    <div>
      <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Email</p>
      <a href="mailto:cnzabb@gmail.com" className="text-foreground hover:text-accent transition-colors">
        cnzabb@gmail.com
      </a>
    </div>
  </div>

  <div className="flex items-center gap-4">
    <div className="p-2.5 bg-muted rounded-lg">
      <MessageCircle className="h-5 w-5 text-foreground" />
    </div>
    <div>
      <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">WhatsApp</p>
      <a
        href="https://wa.me/256767579099"
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground hover:text-accent transition-colors"
      >
        +256 767 579 099
      </a>
    </div>
  </div>

  <div className="flex items-center gap-4">
    <div className="p-2.5 bg-muted rounded-lg">
      <Phone className="h-5 w-5 text-foreground" />
    </div>
    <div>
      <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Calls</p>
      <a href="tel:+256767579099" className="text-foreground hover:text-accent transition-colors">
        +256 767 579 099
      </a>
    </div>
  </div>

  <div className="flex items-center gap-4">
    <div className="p-2.5 bg-muted rounded-lg">
      <MapPin className="h-5 w-5 text-foreground" />
    </div>
    <div>
      <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Location</p>
      <p className="text-foreground">Kampala, Uganda</p>
    </div>
  </div>

  <div className="pt-2 border-t border-border">
    <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Socials</p>
    <div className="flex gap-4">
      <a href="https://github.com/paladin-2024" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-foreground transition-colors">
        <Code2 className="h-5 w-5" />
      </a>
      <a href="https://www.linkedin.com/in/nzabanita-caleb" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground transition-colors">
        <Globe className="h-5 w-5" />
      </a>
      <a href="https://x.com/CNzabb" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X" className="text-muted-foreground hover:text-foreground transition-colors">
        <X className="h-5 w-5" />
      </a>
    </div>
  </div>
</Card>
```

Also update heading section label to "LET'S BUILD." bleed and add `MessageCircle, Phone` to imports.

- [ ] **Step 2: Commit**
```bash
git add src/components/sections/Contact.tsx
git commit -m "feat: contact section with WhatsApp, calls, email updated"
```

---

## Task 13: Footer Redesign

**Files:**
- Modify: `src/components/ui/Footer.tsx`

- [ ] **Step 1: Replace `src/components/ui/Footer.tsx`**

```tsx
import { Code2, Globe, X } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

function scrollTo(href: string) {
  const id = href.replace('#', '');
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-6 md:px-16 max-w-6xl py-12">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }}
            className="font-syne text-2xl font-extrabold text-foreground hover:opacity-70 transition-opacity"
          >
            Nzabanita Caleb<span className="text-accent">.</span>
          </a>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex gap-5">
            <a href="https://github.com/paladin-2024" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-foreground transition-colors">
              <Code2 className="h-4 w-4" />
            </a>
            <a href="https://www.linkedin.com/in/nzabanita-caleb" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground transition-colors">
              <Globe className="h-4 w-4" />
            </a>
            <a href="https://x.com/CNzabb" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X" className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border mb-6" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-muted-foreground">
            © {year} IKUZO NZABANITA Caleb. All rights reserved.
          </p>
          <p className="font-mono text-[10px] text-muted-foreground">
            Designed & Built by Nzabanita Caleb · Kampala, Uganda
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**
```bash
git add src/components/ui/Footer.tsx
git commit -m "feat: footer redesign with full nav, socials, auto year"
```

---

## Task 14: Wire Everything Together — App.tsx + Home.tsx

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/pages/Home.tsx`

- [ ] **Step 1: Replace `src/App.tsx`**

```tsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/theme-provider';
import { Navigation } from './components/ui/navigation';
import { Cursor } from './components/ui/Cursor';
import { Preloader } from './components/ui/Preloader';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { Home } from './pages/Home';
import './App.css';

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <Cursor />
      <ScrollProgress />
      <Router>
        <div className="min-h-screen bg-background text-foreground">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
```

- [ ] **Step 2: Replace `src/pages/Home.tsx`**

```tsx
import { Hero } from '../components/sections/Hero';
import { Stats } from '../components/sections/Stats';
import { Services } from '../components/sections/Services';
import { Projects } from '../components/sections/Projects';
import { About } from '../components/sections/About';
import { Skills } from '../components/sections/Skills';
import { Process } from '../components/sections/Process';
import { Testimonials } from '../components/sections/Testimonials';
import { Contact } from '../components/sections/Contact';
import { Footer } from '../components/ui/Footer';
import { Marquee } from '../components/ui/Marquee';

const marqueeItems = [
  'Backend Development', 'React', 'Node.js', 'Robotics',
  'AI / ML', 'Three.js', 'Mobile Apps', 'PostgreSQL',
  'Docker', 'TypeScript', 'GSAP', 'Open Source',
];

export function Home() {
  return (
    <main>
      <Hero />
      {/* Marquee between Hero and Stats */}
      <div className="border-y border-border bg-foreground dark:bg-foreground py-4 overflow-x-hidden">
        <Marquee items={marqueeItems} direction="left" speed={35}
          className="font-mono text-xs uppercase tracking-[0.2em] text-background dark:text-background opacity-60"
        />
        <Marquee items={[...marqueeItems].reverse()} direction="right" speed={45}
          className="font-mono text-xs uppercase tracking-[0.2em] text-background dark:text-background opacity-30 mt-2"
        />
      </div>
      <Stats />
      <Services />
      <Projects />
      <About />
      <Skills />
      <Process />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 3: Commit**
```bash
git add src/App.tsx src/pages/Home.tsx
git commit -m "feat: wire preloader, cursor, scroll progress, all sections into app"
```

---

## Task 15: Final Build Verification

- [ ] **Step 1: Run TypeScript build**
```bash
cd /home/nzabanita/StudioProjects/portfolio-2026
pnpm build 2>&1
```
Expected: `✓ built` with no errors (warnings about chunk size are OK).

- [ ] **Step 2: Fix any TypeScript errors found**

- [ ] **Step 3: Commit fix if needed**
```bash
git add -A && git commit -m "fix: resolve TypeScript build errors"
```
