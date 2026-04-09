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

          <div className="flex gap-5">
            <a href="https://github.com/paladin-2024" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-foreground transition-colors">
              <Code2 className="h-4 w-4" />
            </a>
            <a href="https://www.linkedin.com/in/nzabanita-caleb-83483030b" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground transition-colors">
              <Globe className="h-4 w-4" />
            </a>
            <a href="https://x.com/CNzabb" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X" className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="h-px bg-border mb-6" />

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
