import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: 'Caleb built our entire platform from scratch in record time. Clean architecture, great communication, and he genuinely understood what our business needed. Not just a developer — a problem solver.',
    name: 'Client',
    role: 'Jonglei Fish Hub',
    index: '01',
  },
  {
    quote: "Working with Nzabanita on Cyberteks was one of the best technical decisions we made. He brought depth and ideas we hadn't even considered. The site performs brilliantly.",
    name: 'Team Lead',
    role: 'Cyberteks-IT',
    index: '02',
  },
  {
    quote: "He doesn't just write code — he thinks in systems. PromptPal's backend is rock-solid and scales well because Caleb architected it properly from day one.",
    name: 'Founder',
    role: 'PromptPal',
    index: '03',
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-foreground dark:bg-foreground overflow-x-hidden">
      <div className="container mx-auto px-6 md:px-16 max-w-[1600px]">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="relative">
            <span
              className="font-syne font-extrabold absolute -top-4 left-0 pointer-events-none select-none whitespace-nowrap"
              style={{
                fontSize: 'clamp(4rem, 12vw, 10rem)',
                lineHeight: 0.9,
                color: 'transparent',
                WebkitTextStroke: '1px rgba(244,241,236,0.06)',
              }}
              aria-hidden="true"
            >
              CLIENTS.
            </span>
            <div className="relative z-10">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="font-mono text-[10px] uppercase tracking-[0.35em] text-background/40 mb-3"
              >
                Social Proof
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-syne font-extrabold text-background"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 0.9 }}
              >
                What They Say.
              </motion.h2>
            </div>
          </div>
          <p className="max-w-xs text-sm text-background/50 md:text-right leading-relaxed">
            Real words from real collaborators.
            Testimonials updated as they come in.
          </p>
        </div>

        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-background/10">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 group hover:bg-background/5 transition-colors duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <span
                  className="font-syne font-extrabold text-background/12 leading-none"
                  style={{ fontSize: '5rem', lineHeight: 0.75 }}
                >
                  "
                </span>
                <span className="font-mono text-[9px] text-background/25">{t.index}</span>
              </div>

              <p className="text-background/75 text-sm leading-relaxed mb-8 group-hover:text-background/90 transition-colors">
                {t.quote}
              </p>

              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-background/10" />
                <div className="text-right">
                  <p className="font-syne font-bold text-background text-sm">{t.name}</p>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-accent mt-0.5">
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
