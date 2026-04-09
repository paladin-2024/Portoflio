# Portfolio 2026 — "Perfect" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all broken functionality, wire in real content, and elevate the visual design of the Nzabanita portfolio into a production-ready single-page site.

**Architecture:** Single-page scroll with anchor navigation. All sections live on `/`. Lenis handles smooth scroll, Framer Motion handles section entrance animations, GSAP handles skill bar fills only. Three.js HeroScene stays as-is; ProjectCard3D is replaced by image-forward tilt cards.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion, GSAP + ScrollTrigger, Lenis, React Three Fiber, Lucide React, React Hook Form + Zod, Formspree (fetch POST).

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `src/index.css` | Modify | CSS variables (full set), Google Fonts import, body font |
| `src/App.css` | Clear | Remove all Vite boilerplate |
| `src/main.tsx` | Modify | Initialize Lenis + GSAP ticker |
| `src/App.tsx` | Modify | Remove unused routes, keep Router for future use |
| `tailwind.config.js` | Modify | Add primary, accent, card tokens + Syne/DM Sans/JetBrains font families |
| `src/components/ui/navigation.tsx` | Modify | Anchor links, IntersectionObserver active state, font update |
| `src/components/ui/button.tsx` | Modify | Add `primary` variant support |
| `src/components/ui/Footer.tsx` | Create | Social links + copyright |
| `src/components/sections/Hero.tsx` | Modify | Font, social links, anchor scroll buttons |
| `src/components/sections/About.tsx` | Modify | Add id, remove GSAP dual-animation |
| `src/components/sections/Projects.tsx` | Modify | Real projects, image cards, live URLs |
| `src/components/sections/Skills.tsx` | Modify | Add id, accent color on bars |
| `src/components/sections/Contact.tsx` | Modify | Add id, Formspree fetch, remove phone |
| `src/pages/Home.tsx` | Modify | Add Footer |
| `public/assets/projects/` | Create | Copy 4 project screenshots |

---

## Task 1: Copy Project Screenshots to Public Assets

**Files:**
- Create: `public/assets/projects/cyberteks.png`
- Create: `public/assets/projects/paladincar.png`
- Create: `public/assets/projects/sonam.png`
- Create: `public/assets/projects/promptpal.png`

- [ ] **Step 1: Create assets directory and copy screenshots**

```bash
mkdir -p /home/nzabanita/StudioProjects/portfolio-2026/public/assets/projects

cp "/home/nzabanita/Pictures/Screenshots/Screenshot From 2026-04-06 14-27-07.png" \
  /home/nzabanita/StudioProjects/portfolio-2026/public/assets/projects/cyberteks.png

cp "/home/nzabanita/Pictures/Screenshots/Screenshot From 2026-04-06 14-30-12.png" \
  /home/nzabanita/StudioProjects/portfolio-2026/public/assets/projects/paladincar.png

cp "/home/nzabanita/Pictures/Screenshots/Screenshot From 2026-04-06 14-30-32.png" \
  /home/nzabanita/StudioProjects/portfolio-2026/public/assets/projects/sonam.png

cp "/home/nzabanita/Pictures/Screenshots/Screenshot From 2026-04-06 14-30-59.png" \
  /home/nzabanita/StudioProjects/portfolio-2026/public/assets/projects/promptpal.png
```

- [ ] **Step 2: Verify files exist**

```bash
ls -lh /home/nzabanita/StudioProjects/portfolio-2026/public/assets/projects/
```

Expected: 4 `.png` files listed with non-zero sizes.

- [ ] **Step 3: Commit**

```bash
cd /home/nzabanita/StudioProjects/portfolio-2026
git add public/assets/projects/
git commit -m "feat: add project screenshot assets"
```

---

## Task 2: CSS Variables + Fonts (index.css + tailwind.config.js + App.css)

**Files:**
- Modify: `src/index.css`
- Modify: `tailwind.config.js`
- Modify: `src/App.css`

- [ ] **Step 1: Replace `src/index.css` entirely**

```css
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=JetBrains+Mono:wght@400;500&display=swap');

@import 'tailwindcss';

:root {
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
  --accent: #f0ff3a;
  --accent-foreground: #0a0a0a;
  --card: #ffffff;
  --card-foreground: #0a0a0a;
  --destructive: #ef4444;
  --destructive-foreground: #ffffff;
}

.dark {
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
  --accent: #f0ff3a;
  --accent-foreground: #0a0a0a;
  --card: #111111;
  --card-foreground: #fafafa;
  --destructive: #ef4444;
  --destructive-foreground: #ffffff;
}

* {
  border-color: var(--border);
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--background);
  color: var(--foreground);
  font-family: 'DM Sans', system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: var(--background);
}

::-webkit-scrollbar-thumb {
  background: var(--muted-foreground);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--foreground);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: Replace `tailwind.config.js` entirely**

```js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        secondary: 'var(--secondary)',
        'secondary-foreground': 'var(--secondary-foreground)',
        accent: 'var(--accent)',
        'accent-foreground': 'var(--accent-foreground)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        destructive: 'var(--destructive)',
        'destructive-foreground': 'var(--destructive-foreground)',
      },
      fontFamily: {
        syne: ['Syne', 'system-ui', 'sans-serif'],
        sans: ['DM Sans', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(24px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 3: Clear `src/App.css`**

Replace the entire file with an empty string (just a newline):

```css
/* App-level styles — intentionally empty */
```

- [ ] **Step 4: Commit**

```bash
cd /home/nzabanita/StudioProjects/portfolio-2026
git add src/index.css tailwind.config.js src/App.css
git commit -m "feat: replace CSS variables, add font system, clear App.css boilerplate"
```

---

## Task 3: Initialize Lenis Smooth Scroll (main.tsx)

**Files:**
- Modify: `src/main.tsx`

- [ ] **Step 1: Replace `src/main.tsx`**

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import './index.css';
import App from './App.tsx';

// Initialize Lenis smooth scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

// Connect Lenis to GSAP ticker
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

- [ ] **Step 2: Verify dev server starts without errors**

```bash
cd /home/nzabanita/StudioProjects/portfolio-2026
pnpm dev
```

Expected: Server starts on `http://localhost:5173`, no TypeScript errors in terminal.

- [ ] **Step 3: Commit**

```bash
git add src/main.tsx
git commit -m "feat: initialize Lenis smooth scroll with GSAP ticker"
```

---

## Task 4: Fix Button Component (button.tsx)

**Files:**
- Modify: `src/components/ui/button.tsx`

- [ ] **Step 1: Replace `src/components/ui/button.tsx`**

```tsx
import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
          {
            'bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.98]':
              variant === 'default' || variant === 'primary',
            'bg-secondary text-secondary-foreground hover:bg-muted active:scale-[0.98]':
              variant === 'secondary',
            'border border-input bg-background hover:bg-muted hover:text-foreground active:scale-[0.98]':
              variant === 'outline',
            'hover:bg-muted hover:text-foreground active:scale-[0.98]':
              variant === 'ghost',
            'h-9 px-3 text-sm': size === 'sm',
            'h-10 px-4 text-base': size === 'md',
            'h-12 px-8 text-lg': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/button.tsx
git commit -m "fix: add primary variant to Button, fix missing CSS token references"
```

---

## Task 5: Fix Navigation — Anchor Links + Active State (navigation.tsx)

**Files:**
- Modify: `src/components/ui/navigation.tsx`

- [ ] **Step 1: Replace `src/components/ui/navigation.tsx`**

```tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { Button } from './button';
import { useTheme } from '../../context/theme-provider';
import { cn } from '../../lib/utils';

const navItems = [
  { href: '#hero', label: 'Home' },
  { href: '#projects', label: 'Projects' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

function scrollToSection(href: string) {
  const id = href.replace('#', '');
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}
            className="font-syne text-2xl font-extrabold tracking-tight hover:opacity-80 transition-opacity"
          >
            Nzabanita<span className="text-accent">.</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const id = item.href.replace('#', '');
              const isActive = activeSection === id;
              return (
                <div key={item.href} className="relative flex flex-col items-center">
                  <a
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(item.href); setIsOpen(false); }}
                    className={cn(
                      'font-mono text-xs uppercase tracking-widest transition-colors hover:text-foreground pb-1',
                      isActive ? 'text-foreground' : 'text-muted-foreground'
                    )}
                  >
                    {item.label}
                  </a>
                  {isActive && (
                    <motion.div
                      layoutId="nav-dot"
                      className="absolute -bottom-1 w-1 h-1 rounded-full bg-accent"
                    />
                  )}
                </div>
              );
            })}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
              className="ml-4"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-background border-b border-border"
        >
          <div className="px-4 py-4 space-y-4">
            {navItems.map((item) => {
              const id = item.href.replace('#', '');
              const isActive = activeSection === id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.href); setIsOpen(false); }}
                  className={cn(
                    'block font-mono text-xs uppercase tracking-widest transition-colors',
                    isActive ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ui/navigation.tsx
git commit -m "fix: convert navigation to anchor links with IntersectionObserver active state"
```

---

## Task 6: Hero Section — Font, Social Links, Anchor Buttons

**Files:**
- Modify: `src/components/sections/Hero.tsx`

- [ ] **Step 1: Replace `src/components/sections/Hero.tsx`**

```tsx
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { HeroScene } from '../three/HeroScene';
import { ArrowDown, Github, Linkedin, Twitter } from 'lucide-react';

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export function Hero() {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-white dark:bg-black">
      <HeroScene />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <motion.p
            className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Full Stack Developer · Creative Technologist
          </motion.p>

          <motion.h1
            className="mb-6 font-syne font-extrabold tracking-tight text-black dark:text-white"
            style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)', lineHeight: 0.9 }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Nzabanita
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex gap-4 justify-center mb-8"
          >
            <Button
              size="lg"
              variant="primary"
              onClick={() => scrollToSection('projects')}
            >
              View My Work
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('contact')}
            >
              Contact Me
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex gap-6 justify-center"
          >
            <a
              href="https://github.com/paladin-2024"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 inline-block"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/nzabanita-caleb"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 inline-block"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://x.com/CNzabb"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter / X"
              className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 inline-block"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </motion.div>
        </motion.div>

        <motion.button
          className="absolute bottom-10 cursor-pointer bg-transparent border-none"
          onClick={() => scrollToSection('about')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          aria-label="Scroll down"
        >
          <ArrowDown className="h-5 w-5 animate-bounce text-muted-foreground" />
        </motion.button>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: hero section with Syne font, social links, anchor scroll buttons"
```

---

## Task 7: About Section — id + Remove Dual Animation

**Files:**
- Modify: `src/components/sections/About.tsx`

- [ ] **Step 1: Replace `src/components/sections/About.tsx`**

```tsx
import { motion } from 'framer-motion';
import { Card } from '../ui/card';

const timeline = [
  { year: '2026', title: 'Full Stack Developer', company: 'Freelance — Kampala, Uganda' },
  { year: '2025', title: 'Software Engineering', company: 'University Studies' },
  { year: '2024', title: 'Web Development', company: 'Self-taught & Open Source' },
  { year: '2023', title: 'Started Coding', company: 'Journey Begins' },
];

const skills = [
  'React', 'TypeScript', 'Node.js', 'Three.js',
  'Tailwind', 'GSAP', 'PostgreSQL', 'MongoDB',
  'React Native', 'Firebase', 'GraphQL', 'Docker',
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export function About() {
  return (
    <section id="about" className="py-24 bg-muted dark:bg-muted">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
            Who I Am
          </p>
          <h2 className="font-syne font-extrabold text-4xl md:text-5xl text-foreground">
            About Me
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground mt-4">
            I'm a passionate developer based in Kampala, Uganda — building beautiful,
            functional digital experiences with modern technologies and clean code.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="mb-8 font-syne text-2xl font-bold text-foreground">
              Journey
            </h3>
            <div className="space-y-4">
              {timeline.map((entry, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <Card className="p-5 hover:shadow-md transition-shadow bg-card border-border">
                    <div className="flex items-start gap-4">
                      <div className="font-mono text-xl font-bold text-muted-foreground/40 min-w-[3.5rem]">
                        {entry.year}
                      </div>
                      <div>
                        <h4 className="font-semibold text-card-foreground">
                          {entry.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {entry.company}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="mb-8 font-syne text-2xl font-bold text-foreground">
              Tech I Use
            </h3>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-wrap gap-2"
            >
              {skills.map((skill) => (
                <motion.div key={skill} variants={item}>
                  <span className="font-mono text-xs uppercase tracking-wider px-3 py-1.5 border border-border rounded-full text-muted-foreground hover:border-accent hover:text-foreground transition-colors cursor-default">
                    {skill}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-10">
              <h4 className="font-syne text-xl font-bold text-foreground mb-3">
                What I Do
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                I specialize in building modern web applications with React, TypeScript,
                and Node.js. I love working with 3D graphics, smooth animations, and creating
                immersive user experiences that stand out — from e-commerce platforms to
                community-driven apps.
              </p>
            </div>
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
git commit -m "feat: about section with id, single animation system, richer content"
```

---

## Task 8: Projects Section — Real Projects + Image Cards

**Files:**
- Modify: `src/components/sections/Projects.tsx`

- [ ] **Step 1: Replace `src/components/sections/Projects.tsx`**

```tsx
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';

const projects = [
  {
    title: 'Cyberteks-IT',
    description: 'Future-Ready ICT Solutions for Every Business — CCTV, remote IT support, and ICT skills training across Africa.',
    tags: ['Next.js', 'Tailwind', 'Three.js'],
    image: '/assets/projects/cyberteks.png',
    url: 'https://www.cyberteks-it.com/',
  },
  {
    title: 'PaladimCars',
    description: 'Super Luxury Fast Cars For Everyday Use — premium car discovery and listing platform.',
    tags: ['React', 'Firebase', 'TypeScript'],
    image: '/assets/projects/paladincar.png',
    url: 'https://paladincar.netlify.app/',
  },
  {
    title: 'SONAM',
    description: 'Smile of Hope African Ministries — community outreach, programs, and donation platform.',
    tags: ['React', 'Node.js', 'MongoDB'],
    image: '/assets/projects/sonam.png',
    url: 'https://soham-five.vercel.app/',
  },
  {
    title: 'PromptPal',
    description: 'Discover & Share AI-Powered Prompts — open-source prompt community for developers.',
    tags: ['React', 'PWA', 'GSAP'],
    image: '/assets/projects/promptpal.png',
    url: 'https://prompt-pal-amber.vercel.app/',
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
        className="group rounded-xl overflow-hidden border border-border bg-card hover:border-accent transition-colors duration-300"
      >
        {/* Image */}
        <div className="relative overflow-hidden aspect-video">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-syne font-bold text-xl text-card-foreground mb-2">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 bg-muted rounded text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
          >
            Live Demo <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
            My Work
          </p>
          <h2 className="font-syne font-extrabold text-4xl md:text-5xl text-foreground">
            Featured Projects
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground mt-4">
            A selection of recent work — from ICT platforms to AI tools
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Button
            size="lg"
            variant="outline"
            onClick={() => window.open('https://github.com/paladin-2024', '_blank')}
          >
            View More on GitHub
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Projects.tsx
git commit -m "feat: real project cards with tilt effect, screenshots, live URLs"
```

---

## Task 9: Skills Section — id + Accent Color Bars

**Files:**
- Modify: `src/components/sections/Skills.tsx`

- [ ] **Step 1: Replace `src/components/sections/Skills.tsx`**

```tsx
import { motion } from 'framer-motion';

const skillCategories = [
  {
    name: 'Frontend',
    skills: [
      { name: 'React', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Three.js', level: 85 },
      { name: 'Tailwind CSS', level: 95 },
    ],
  },
  {
    name: 'Backend',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'PostgreSQL', level: 85 },
      { name: 'MongoDB', level: 88 },
      { name: 'GraphQL', level: 80 },
    ],
  },
  {
    name: 'Tools & Other',
    skills: [
      { name: 'Git', level: 92 },
      { name: 'Docker', level: 75 },
      { name: 'React Native', level: 82 },
      { name: 'Figma', level: 85 },
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 bg-muted dark:bg-muted">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
            Expertise
          </p>
          <h2 className="font-syne font-extrabold text-4xl md:text-5xl text-foreground">
            Skills
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground mt-4">
            Technologies and tools I work with daily
          </p>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-3">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="mb-6 font-syne font-bold text-xl text-foreground">
                {category.name}
              </h3>
              <div className="space-y-5">
                {category.skills.map((skill, j) => (
                  <div key={skill.name}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="font-medium text-foreground">{skill.name}</span>
                      <span className="font-mono text-xs text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-border rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: i * 0.15 + j * 0.05, ease: 'easeOut' }}
                        viewport={{ once: true }}
                        className="h-full bg-accent rounded-full"
                      />
                    </div>
                  </div>
                ))}
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
git add src/components/sections/Skills.tsx
git commit -m "feat: skills section with id, accent color bars, cleaner typography"
```

---

## Task 10: Contact Section — Formspree + Remove Placeholder Phone

**Files:**
- Modify: `src/components/sections/Contact.tsx`

- [ ] **Step 1: Replace `src/components/sections/Contact.tsx`**

```tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';
import { Mail, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactForm = z.infer<typeof contactSchema>;

// Replace YOUR_FORM_ID with your Formspree form ID from https://formspree.io
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitStatus('success');
        reset();
        setTimeout(() => setSubmitStatus('idle'), 4000);
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
            Let's Talk
          </p>
          <h2 className="font-syne font-extrabold text-4xl md:text-5xl text-foreground">
            Get In Touch
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground mt-4">
            Have a project in mind? Let's work together.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="font-syne text-2xl font-bold text-foreground">
              Contact Information
            </h3>
            <p className="text-muted-foreground">
              Fill out the form or reach out directly through any of these channels.
            </p>

            <Card className="p-6 space-y-5 bg-card border-border">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-muted rounded-lg">
                  <Mail className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Email</p>
                  <a
                    href="mailto:hello@nzabanita.com"
                    className="text-foreground hover:text-accent transition-colors"
                  >
                    hello@nzabanita.com
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
                    <Github className="h-5 w-5" />
                  </a>
                  <a href="https://www.linkedin.com/in/nzabanita-caleb" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="https://x.com/CNzabb" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              <div>
                <Input
                  {...register('name')}
                  placeholder="Your Name"
                  className="w-full"
                  aria-label="Name"
                />
                {errors.name && (
                  <p className="mt-1.5 text-sm text-destructive" role="alert">{errors.name.message}</p>
                )}
              </div>

              <div>
                <Input
                  {...register('email')}
                  type="email"
                  placeholder="Your Email"
                  className="w-full"
                  aria-label="Email"
                />
                {errors.email && (
                  <p className="mt-1.5 text-sm text-destructive" role="alert">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Textarea
                  {...register('message')}
                  placeholder="Your Message"
                  rows={5}
                  className="w-full"
                  aria-label="Message"
                />
                {errors.message && (
                  <p className="mt-1.5 text-sm text-destructive" role="alert">{errors.message.message}</p>
                )}
              </div>

              {submitStatus === 'error' && (
                <p className="text-sm text-destructive" role="alert">
                  Something went wrong. Please try again.
                </p>
              )}

              <Button
                type="submit"
                size="lg"
                variant="primary"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : submitStatus === 'success' ? (
                  'Message Sent!'
                ) : (
                  <>
                    Send Message <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/Contact.tsx
git commit -m "feat: contact section with Formspree, remove phone placeholder, social links"
```

---

## Task 11: Create Footer Component

**Files:**
- Create: `src/components/ui/Footer.tsx`

- [ ] **Step 1: Create `src/components/ui/Footer.tsx`**

```tsx
import { Github, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-syne text-xl font-extrabold text-foreground">
              Nzabanita<span className="text-accent">.</span>
            </span>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mt-1">
              Full Stack Developer · Creative Technologist
            </p>
          </div>

          <div className="flex gap-5">
            <a
              href="https://github.com/paladin-2024"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/nzabanita-caleb"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://x.com/CNzabb"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter / X"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>

          <p className="font-mono text-xs text-muted-foreground">
            © 2026 Nzabanita. Built with React + Three.js.
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
git commit -m "feat: add Footer with social links and copyright"
```

---

## Task 12: Wire Footer into Home Page + Clean Up App.tsx

**Files:**
- Modify: `src/pages/Home.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Replace `src/pages/Home.tsx`**

```tsx
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Projects } from '../components/sections/Projects';
import { Skills } from '../components/sections/Skills';
import { Contact } from '../components/sections/Contact';
import { Footer } from '../components/ui/Footer';

export function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Replace `src/App.tsx`**

```tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/theme-provider';
import { Navigation } from './components/ui/navigation';
import { Home } from './pages/Home';
import './App.css';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
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

- [ ] **Step 3: Commit**

```bash
git add src/pages/Home.tsx src/App.tsx
git commit -m "feat: add Footer to Home page, clean up App.tsx token classes"
```

---

## Task 13: Final Verification

- [ ] **Step 1: Run dev server and manually check**

```bash
cd /home/nzabanita/StudioProjects/portfolio-2026
pnpm dev
```

Open `http://localhost:5173` and verify:
- [ ] Nav links scroll to correct sections (Home, Projects, About, Skills, Contact)
- [ ] Active nav dot moves as you scroll
- [ ] Hero shows "Nzabanita" in large Syne font
- [ ] Hero social links open correct URLs
- [ ] Project cards show screenshots with tilt on hover
- [ ] Live Demo links open correct URLs in new tab
- [ ] Skill bars animate with yellow accent color
- [ ] Contact form shows validation errors for empty fields
- [ ] Footer shows social links and copyright
- [ ] Dark/light theme toggle works
- [ ] No console errors

- [ ] **Step 2: Run TypeScript check**

```bash
pnpm build
```

Expected: Build completes with no TypeScript errors.

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "chore: final verification pass — portfolio complete"
```

---

## Post-Implementation Note

**Formspree setup (manual step for user):**
1. Go to https://formspree.io and create a free account
2. Create a new form and copy the form ID (looks like `xyzabcde`)
3. Open `src/components/sections/Contact.tsx`
4. Replace `YOUR_FORM_ID` in `FORMSPREE_ENDPOINT` with your actual form ID
5. Submit a test message to verify emails arrive
