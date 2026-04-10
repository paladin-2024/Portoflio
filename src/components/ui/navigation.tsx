import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/theme-provider';
import { cn } from '../../lib/utils';

const navItems = [
  { href: '#hero',     label: 'Home',     num: '00' },
  { href: '#projects', label: 'Work',     num: '01' },
  { href: '#about',    label: 'About',    num: '02' },
  { href: '#services', label: 'Services', num: '03' },
  { href: '#contact',  label: 'Contact',  num: '04' },
];

function scrollToSection(href: string) {
  const id = href.replace('#', '');
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export function Navigation() {
  const [isOpen, setIsOpen]           = useState(false);
  const [scrolled, setScrolled]       = useState(false);
  const [activeSection, setActive]    = useState('hero');
  const { theme, setTheme }           = useTheme();

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  useEffect(() => {
    const ids = navItems.map((i) => i.href.replace('#', ''));
    const obs: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      o.observe(el);
      obs.push(o);
    });
    return () => obs.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-background/90 backdrop-blur-md border-b border-border md:bg-background md:backdrop-blur-none'
            : 'bg-background/70 backdrop-blur-md md:bg-transparent md:backdrop-blur-none'
        )}
      >
        <div className="mx-auto px-6 md:px-16 max-w-[1600px]">
          <div className="flex items-center justify-between h-14">

            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}
              className="font-syne text-3xl font-black tracking-tight text-foreground hover:text-accent transition-colors duration-200"
            >
              N<span className="text-accent">.</span>
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => {
                const id      = item.href.replace('#', '');
                const isActive = activeSection === id;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                    className={cn(
                      'group relative flex items-center gap-1.5 font-mono font-bold text-[13px] uppercase tracking-widest transition-colors duration-200',
                      isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <span className="text-[10px] text-muted-foreground/40 group-hover:text-accent transition-colors">
                      {item.num}
                    </span>
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute -bottom-[17px] left-0 right-0 h-[1px] bg-accent"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle theme"
                className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                {theme === 'dark'
                  ? <Sun className="h-3.5 w-3.5" />
                  : <Moon className="h-3.5 w-3.5" />}
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                className="md:hidden flex flex-col gap-1 p-1.5 text-foreground"
              >
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="block w-5 h-px bg-current origin-center"
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  animate={isOpen ? { opacity: 0, x: -4 } : { opacity: 1, x: 0 }}
                  className="block w-5 h-px bg-current"
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="block w-5 h-px bg-current origin-center"
                  transition={{ duration: 0.2 }}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-foreground flex flex-col justify-center px-8"
          >
            <div className="space-y-1">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  className="border-b border-background/10 py-5"
                >
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href);
                      setIsOpen(false);
                    }}
                    className="flex items-center justify-between group"
                  >
                    <span className="font-syne font-extrabold text-background group-hover:text-accent transition-colors"
                      style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)' }}
                    >
                      {item.label}
                    </span>
                    <span className="font-mono text-xs text-background/30">{item.num}</span>
                  </a>
                </motion.div>
              ))}
            </div>

            <div className="absolute bottom-10 left-8 right-8 flex justify-between items-center">
              <span className="font-mono text-[10px] uppercase tracking-widest text-background/30">
                Nzabanita Caleb · {new Date().getFullYear()}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-background/30">
                Kampala, UG
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
