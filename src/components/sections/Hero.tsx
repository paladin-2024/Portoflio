import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Code2, Globe, X } from 'lucide-react';
import { ParticleCanvas } from '../ui/ParticleCanvas';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';

function scrambleText(el: HTMLElement, finalText: string, duration = 1.6) {
  let frame = 0;
  const totalFrames = Math.round(duration * 60);
  const chars = finalText.split('');
  const tick = () => {
    el.textContent = chars
      .map((char, i) => {
        if (char === ' ' || char === '&' || char === '\n') return char;
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

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

const terminalLines = [
  { type: 'prompt', text: 'nzabanita@ubuntu:~$', cmd: ' neofetch' },
  { type: 'output',  text: 'OS:       Ubuntu 24.04.2 LTS (Noble Numbat)' },
  { type: 'output',  text: 'Host:     Kampala, Uganda' },
  { type: 'output',  text: 'Role:     Software Engineer' },
  { type: 'output',  text: 'Stack:    Flutter · Spring Boot · Django · Node.js · MongoDB' },
  { type: 'output',  text: 'Focus:    Backend · Mobile · AI/ML · Robotics' },
  { type: 'comment', text: '# Available for work · cnzabb@gmail.com' },
];

export function Hero() {
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const text1 = isMobile ? 'Software Eng.' : 'Software Engineer';
    const text2 = isMobile ? '& Backend Dev.' : '& Backend Developer.';
    // Set placeholder chars to match final text length so layout doesn't jump
    if (line1Ref.current) line1Ref.current.textContent = text1.split('').map(() => '█').join('');
    if (line2Ref.current) line2Ref.current.textContent = text2.split('').map(() => '█').join('');
    const t1 = setTimeout(() => {
      if (line1Ref.current) scrambleText(line1Ref.current, text1, 1.2);
    }, 1800);
    const t2 = setTimeout(() => {
      if (line2Ref.current) scrambleText(line2Ref.current, text2, 1.4);
    }, 2100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full bg-background overflow-hidden"
      style={{ minHeight: '100dvh' }}
    >
      {/* ── Particle background ── */}
      <ParticleCanvas />

      {/* ── Left rule ─── */}
      <div className="absolute left-6 md:left-16 top-0 bottom-0 w-px bg-border z-10" />

      {/* ── Top bar ─────────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-16 pt-16 md:pt-20 pl-10 md:pl-24">
        {/* Running-on tag */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-accent" />
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
            Running Ubuntu 24.04 LTS
          </span>
        </motion.div>

        {/* Available badge — WhatsApp link */}
        <motion.a
          href="https://wa.me/256767579099?text=Hi%20Caleb%2C%20I%20found%20your%20portfolio%20and%20I%27d%20like%20to%20work%20with%20you."
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="available-badge"
          style={{
            fontSize: '11px',
            fontWeight: 800,
            padding: '8px 16px',
            letterSpacing: '0.12em',
            gap: '8px',
            cursor: 'pointer',
          }}
        >
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/60 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
          </span>
          Available for Work
        </motion.a>
      </div>

      {/* ── Main hero grid ────────────────────────────────── */}
      <div
        className="relative z-10 flex flex-col justify-between pl-10 md:pl-24 pr-6 md:pr-16"
        style={{ minHeight: '100dvh', paddingTop: '28vh', paddingBottom: '10vh' }}
      >
        {/* Big heading — matches reference exactly */}
        <div className="overflow-visible">
          <h1
            className="font-syne font-extrabold text-foreground leading-[0.87] tracking-tight"
            style={{ fontSize: 'clamp(3.8rem, 11vw, 10.5rem)' }}
          >
            <span ref={line1Ref} className="block" style={{ whiteSpace: 'nowrap' }}>
              {'Software Engineer'.split('').map(() => '█').join('')}
            </span>
            <span ref={line2Ref} className="block" style={{ whiteSpace: 'nowrap' }}>
              {'& Backend Developer.'.split('').map(() => '█').join('')}
            </span>
          </h1>
        </div>

        {/* Bottom row — two columns */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mt-auto pt-12">
          {/* Left: tagline + socials */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="font-syne italic text-muted-foreground mb-6"
              style={{ fontSize: 'clamp(0.8rem, 1.5vw, 1rem)' }}
            >
              nzabanita, software engineer
            </p>

            <div className="flex items-center gap-6">
              <button
                onClick={() => scrollTo('projects')}
                className="btn-brutal-filled font-mono text-[10px] tracking-widest uppercase px-7 py-3"
              >
                View Work
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="btn-brutal font-mono text-[10px] tracking-widest uppercase px-7 py-3"
              >
                Let's Talk
              </button>
            </div>

            <div className="flex gap-5 mt-6">
              {[
                { href: 'https://github.com/paladin-2024',                       label: 'GitHub',    icon: <Code2 className="h-3.5 w-3.5" /> },
                { href: 'https://www.linkedin.com/in/nzabanita-caleb-83483030b', label: 'LinkedIn',  icon: <Globe className="h-3.5 w-3.5" /> },
                { href: 'https://x.com/CNzabb',                                  label: 'Twitter/X', icon: <X    className="h-3.5 w-3.5" /> },
              ].map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-accent transition-colors duration-200 font-mono text-[9px] uppercase tracking-widest"
                >
                  {icon}
                  <span className="hidden sm:inline">{label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: terminal block */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="terminal max-w-sm w-full ubuntu-glow"
          >
            {terminalLines.map((line, i) => (
              <div key={i} className="leading-6">
                {line.type === 'prompt' && (
                  <span>
                    <span className="terminal-prompt">{line.text}</span>
                    <span className="terminal-output">{line.cmd}</span>
                  </span>
                )}
                {line.type === 'output' && (
                  <span className="terminal-output">{line.text}</span>
                )}
                {line.type === 'comment' && (
                  <span className="terminal-comment">{line.text}</span>
                )}
              </div>
            ))}
            <div className="mt-2 flex items-center gap-1">
              <span className="terminal-prompt">nzabanita@ubuntu:~$</span>
              <span className="inline-block w-2 h-4 bg-accent animate-pulse ml-1" />
            </div>
          </motion.div>
        </div>

        {/* Scroll down */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 0.4 }}
          onClick={() => scrollTo('stats')}
          className="absolute bottom-8 right-8 md:right-16 flex flex-col items-center gap-2 bg-transparent border-none group"
          aria-label="Scroll down"
        >
          <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-muted-foreground/40 group-hover:text-accent transition-colors [writing-mode:vertical-rl]">
            Scroll
          </span>
          <ArrowDown className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-accent animate-bounce transition-colors" />
        </motion.button>
      </div>
    </section>
  );
}
