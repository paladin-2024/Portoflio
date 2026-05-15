import { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../../context/theme-provider';

const sections = [
  { id: 'hero',     label: 'Home'     },
  { id: 'projects', label: 'Work'     },
  { id: 'services', label: 'Services' },
  { id: 'about',    label: 'About'    },
  { id: 'contact',  label: 'Contact'  },
];

export function Navigation() {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState('hero');
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const observers = sections.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(obs => obs?.disconnect());
  }, []);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setDrawerOpen(false);
  }

  function toggleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <>
      {/* ── Desktop: fixed left rail ── */}
      <nav
        className="hidden md:flex fixed left-0 top-0 bottom-0 w-14 flex-col items-center py-6 z-50 border-r border-border bg-background/80 backdrop-blur-sm"
      >
        {/* Logo mark */}
        <button
          onClick={() => scrollTo('hero')}
          aria-label="Home"
          className="mb-10 w-7 h-7 border border-accent flex items-center justify-center font-syne font-extrabold text-accent text-sm hover:bg-accent hover:text-white transition-colors duration-200"
        >
          N
        </button>

        {/* Section dots */}
        <div className="flex flex-col items-center gap-6 flex-1">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              aria-label={label}
              className="nav-dot-btn relative flex items-center justify-center"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  active === id
                    ? 'w-2 h-2 bg-accent'
                    : 'w-1.5 h-1.5 bg-foreground/20 hover:bg-foreground/50'
                }`}
              />
              <span className="nav-dot-label">{label}</span>
            </button>
          ))}
        </div>

        {/* Theme toggle + year */}
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="text-muted-foreground hover:text-accent transition-colors duration-200"
          >
            {theme === 'dark'
              ? <Sun className="h-3.5 w-3.5" />
              : <Moon className="h-3.5 w-3.5" />
            }
          </button>
          <span
            className="font-mono text-[8px] text-muted-foreground/40 tracking-widest select-none"
            style={{ writingMode: 'vertical-rl' }}
          >
            2026
          </span>
        </div>
      </nav>

      {/* ── Mobile: hamburger ── */}
      <button
        onClick={() => setDrawerOpen(true)}
        aria-label="Open menu"
        className="md:hidden fixed top-4 left-4 z-50 p-2 border border-border bg-background/90 backdrop-blur-sm text-foreground"
      >
        <Menu className="h-4 w-4" />
      </button>

      {/* ── Mobile: slide-in drawer ── */}
      {drawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="relative w-72 bg-background border-r border-border flex flex-col p-8 gap-8">
            <button
              onClick={() => setDrawerOpen(false)}
              aria-label="Close menu"
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            <span className="font-syne font-extrabold text-2xl text-foreground">
              NC<span className="text-accent">_</span>
            </span>

            <nav className="flex flex-col gap-6">
              {sections.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`text-left font-syne font-extrabold text-2xl transition-colors duration-200 ${
                    active === id
                      ? 'text-accent'
                      : 'text-foreground/50 hover:text-foreground'
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>

            <div className="mt-auto flex items-center gap-4">
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/40">
                2026
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
