import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, Terminal } from 'lucide-react';
import { Button } from '../ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fadeUp, stagger } from '../../lib/animations';

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  { year: '2026', title: 'Software Engineer',       company: 'Freelance, Kampala, Uganda' },
  { year: '2025', title: 'Software Engineering',    company: 'University Studies' },
  { year: '2024', title: 'Web & Backend Dev',       company: 'Self-taught & Open Source' },
  { year: '2023', title: 'Started Coding',          company: 'The Journey Begins' },
];

const descriptors = [
  'Backend Dev',
  'AI Enthusiast',
  'ML Explorer',
  'Robotics Builder',
  'Car Enthusiast',
  'Linux / Ubuntu',
  'Open Source',
];

export function About() {
  const imgRef = useRef<HTMLImageElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    const h = headingRef.current;
    if (!img || !h) return;

    const tImg = ScrollTrigger.create({ trigger: img, start: 'top 75%', once: true,
      onEnter: () => gsap.fromTo(img, { filter: 'grayscale(1) contrast(1.1)' }, { filter: 'grayscale(0) contrast(1)', duration: 1.2, ease: 'power2.out' }) });
    const tH = ScrollTrigger.create({ trigger: h, start: 'top 85%', once: true,
      onEnter: () => gsap.fromTo(h, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 0.9, ease: 'power3.out' }) });

    return () => { tImg.kill(); tH.kill(); };
  }, []);

  return (
    <section id="about" className="py-24 bg-background overflow-x-hidden">
      {/* Top rule */}
      <div className="h-px bg-border mb-24 mx-6 md:mx-16" />

      <div className="container mx-auto px-6 md:px-16 max-w-[1600px]">
        <div className="grid lg:grid-cols-[2fr_3fr] gap-12 md:gap-24 items-start">

          {/* Left — Photo */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative overflow-hidden aspect-[3/4] max-w-sm border border-border">
              <img
                ref={imgRef}
                src="/assets/profile.jpg"
                alt="Nzabanita Caleb"
                className="w-full h-full object-cover"
                style={{ filter: 'grayscale(1) contrast(1.1)' }}
              />
              {/* Grain overlay */}
              <div
                className="absolute inset-0 opacity-25 mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  backgroundSize: '128px',
                }}
              />
              {/* Orange corner accent */}
              <div className="absolute bottom-0 left-0 w-12 h-1 bg-accent" />
            </div>

            {/* Ubuntu tag under photo */}
            <div className="flex items-center gap-2 mt-4">
              <Terminal className="h-3 w-3 text-accent" />
              <span className="font-mono text-[12px] uppercase tracking-widest text-muted-foreground">
                Daily driver: Ubuntu 24.04 LTS
              </span>
            </div>
            <p className="font-mono text-[12px] uppercase tracking-widest text-muted-foreground/50 mt-1 ml-5">
              Kampala, Uganda · 2026
            </p>
          </motion.div>

          {/* Right — Content */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-mono text-[13px] uppercase tracking-[0.35em] text-muted-foreground mb-4">
              Who I Am
            </p>
            <h2
              ref={headingRef}
              className="font-notch text-foreground mb-6"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.8rem)', lineHeight: 0.92 }}
            >
              Nzabanita<br />Caleb.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4 max-w-lg">
              I'm a Software Engineer based in Kampala, Uganda, building robust backend systems,
              AI-powered products and full-stack web applications. I care about performance,
              clean architecture and software that actually solves problems.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4 max-w-lg">
              Off the screen, I live on Ubuntu, my daily driver for years, no dual-boot.
              I explore robotics, tinker with ML models and appreciate fine engineering,
              both in software and on four wheels.
            </p>

            {/* Descriptor tags */}
            <div className="flex flex-wrap gap-2 mb-10">
              {descriptors.map((d) => (
                <span
                  key={d}
                  className={`font-mono text-[12px] uppercase tracking-wider px-3 py-1.5 border transition-colors duration-200 ${
                    d === 'Linux / Ubuntu'
                      ? 'border-accent text-accent bg-accent/5'
                      : 'border-border text-muted-foreground hover:border-accent hover:text-foreground'
                  }`}
                >
                  {d}
                </span>
              ))}
            </div>

            {/* Timeline */}
            <motion.div
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
              className="space-y-0 mb-10"
            >
              {timeline.map((entry, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex gap-6 py-4 border-t border-border last:border-b group hover:bg-foreground/3 dark:hover:bg-white/3 transition-colors px-2 -mx-2"
                >
                  <span className="font-mono text-[13px] text-muted-foreground/40 shrink-0 pt-0.5">
                    {entry.year}
                  </span>
                  <div>
                    <p className="font-syne font-bold text-foreground text-sm group-hover:text-accent transition-colors">{entry.title}</p>
                    <p className="font-mono text-[13px] text-muted-foreground mt-0.5">{entry.company}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CV button */}
            <a href="/cv/nzabanita-caleb-cv.pdf" download>
              <Button variant="outline" size="lg" className="gap-2 font-mono text-[13px] uppercase tracking-widest ubuntu-glow">
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
