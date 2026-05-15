import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Server, Globe, Brain, Smartphone, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fadeUp, stagger } from '../../lib/animations';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: '01',
    icon: Server,
    title: 'Backend Development',
    desc: 'Scalable APIs, microservices, databases and server architecture. Node.js, Spring Boot, Django, MongoDB, Redis. Built for performance and reliability.',
    tags: ['Node.js', 'Spring Boot', 'Django', 'MongoDB', 'Redis'],
  },
  {
    num: '02',
    icon: Globe,
    title: 'Full-Stack Web Apps',
    desc: 'End-to-end web applications from database to UI. React, Next.js, TypeScript, Tailwind. Clean code, tested, deployed.',
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
  },
  {
    num: '03',
    icon: Brain,
    title: 'AI & Machine Learning',
    desc: 'Intelligent systems and ML model integration. Data pipelines, AI-powered features, natural language processing and automation.',
    tags: ['Python', 'TensorFlow', 'LangChain', 'APIs'],
  },
  {
    num: '04',
    icon: Smartphone,
    title: 'Mobile Development',
    desc: 'Cross-platform mobile apps with Flutter and Firebase. Beautiful, performant apps backed by MongoDB — from idea to Play Store and App Store.',
    tags: ['Flutter', 'Firebase', 'MongoDB', 'Dart'],
  },
];

export function Services() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bleedRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const h = headingRef.current;
    const b = bleedRef.current;
    if (!h || !b) return;

    const tH = ScrollTrigger.create({ trigger: h, start: 'top 85%', once: true,
      onEnter: () => gsap.fromTo(h, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 0.9, ease: 'power3.out' }) });
    const tB = ScrollTrigger.create({ trigger: b, start: 'top 85%', once: true,
      onEnter: () => gsap.fromTo(b, { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }) });

    return () => { tH.kill(); tB.kill(); };
  }, []);

  return (
    <section id="services" className="py-24 bg-background overflow-x-hidden">
      <div className="container mx-auto px-6 md:px-16 max-w-[1600px]">

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="relative">
            {/* Bleed label behind heading */}
            <span
              ref={bleedRef}
              className="section-bleed-label pointer-events-none select-none absolute -top-4 left-0 opacity-100"
              aria-hidden="true"
              style={{ zIndex: 0 }}
            >
              SERVICES.
            </span>
            <div className="relative z-10">
              <p className="font-mono text-[13px] uppercase tracking-[0.35em] text-muted-foreground mb-3">
                What I Offer
              </p>
              <h2
                ref={headingRef}
                className="font-notch text-foreground"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 0.9 }}
              >
                Services.
              </h2>
            </div>
          </div>

          <p className="max-w-xs text-sm text-muted-foreground leading-relaxed md:text-right">
            Focused on what matters. Systems that scale,
            code that lasts, products that ship.
          </p>
        </div>

        {/* Cards grid */}
        <motion.div
          variants={stagger(0.13)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border border border-border"
        >
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.num}
                variants={fadeUp}
                className="group relative p-8 md:p-10 bg-background hover:bg-foreground transition-colors duration-300 overflow-hidden"
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-8">
                  <span className="font-mono text-[12px] text-muted-foreground group-hover:text-background/40 transition-colors">
                    {svc.num}
                  </span>
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-muted-foreground group-hover:text-background/60 transition-colors" />
                    <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-accent transition-colors opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 duration-200" />
                  </div>
                </div>

                <h3
                  className="font-syne font-extrabold text-foreground group-hover:text-background transition-colors mb-4"
                  style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)', lineHeight: 1.05 }}
                >
                  {svc.title}
                </h3>

                <p className="text-sm text-muted-foreground group-hover:text-background/60 transition-colors leading-relaxed mb-8">
                  {svc.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {svc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[12px] uppercase tracking-wider px-2.5 py-1 border border-border group-hover:border-background/20 text-muted-foreground group-hover:text-background/50 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Accent corner on hover */}
                <div className="absolute bottom-0 left-0 w-12 h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
