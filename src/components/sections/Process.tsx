import { motion } from 'framer-motion';
import { slideLeft, stagger } from '../../lib/animations';

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
    <section id="process" className="py-24 bg-muted/40 dark:bg-black/40 overflow-x-hidden">
      <div className="container mx-auto px-6 md:px-16 max-w-[1600px]">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="relative">
            <span
              className="section-bleed-label absolute -top-4 left-0 opacity-100 pointer-events-none select-none"
              aria-hidden="true"
            >
              PROCESS.
            </span>
            <div className="relative z-10">
              <p className="font-mono text-[13px] uppercase tracking-[0.35em] text-muted-foreground mb-3">
                How I Work
              </p>
              <h2
                className="font-notch text-foreground"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 0.9 }}
              >
                The Process.
              </h2>
            </div>
          </div>
          <p className="max-w-xs text-sm text-muted-foreground md:text-right">
            Six phases. No shortcuts. Every project gets the full treatment.
          </p>
        </div>

        {/* Steps — editorial list */}
        <motion.div
          variants={stagger(0.09)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {steps.map((step) => (
            <motion.div
              key={step.num}
              variants={slideLeft}
              className="group grid grid-cols-[3rem_1fr] md:grid-cols-[3rem_14rem_1fr] items-start gap-4 md:gap-10 py-7 border-t border-border last:border-b hover:bg-foreground/3 dark:hover:bg-white/3 transition-colors duration-200 px-2 -mx-2"
            >
              {/* Number */}
              <span className="font-mono text-[13px] text-muted-foreground/40 pt-0.5">
                {step.num}
              </span>

              {/* Title */}
              <h3
                className="font-syne font-bold text-foreground group-hover:text-accent transition-colors duration-200"
                style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}
              >
                {step.title}
              </h3>

              {/* Description — hidden on mobile, shown on md+ */}
              <p className="hidden md:block text-sm text-muted-foreground leading-relaxed col-span-1">
                {step.desc}
              </p>

              {/* Mobile description */}
              <p className="md:hidden text-sm text-muted-foreground leading-relaxed col-start-2 -mt-2">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
