import { motion } from 'framer-motion';
import { fadeUp, scaleIn, stagger } from '../../lib/animations';

const stats = [
  { value: '10+', label: 'Projects\nDelivered' },
  { value: '5+',  label: 'Happy\nClients'    },
  { value: '24h', label: 'Response\nTime'    },
  { value: '3+',  label: 'Years\nExperience' },
];

const testimonials = [
  {
    initial: 'J',
    color: '#E95420',
    role: 'Founder',
    company: 'Jonglei Fish Hub',
    quote: 'Caleb built our entire platform from scratch in record time. Clean architecture, great communication, and he genuinely understood what our business needed. Not just a developer — a problem solver.',
  },
  {
    initial: 'C',
    color: '#2a6099',
    role: 'CEO',
    company: 'Cyberteks-IT',
    quote: "Working with Nzabanita on Cyberteks was one of the best technical decisions we made. He brought depth and ideas we hadn't even considered. The site performs brilliantly.",
  },
  {
    initial: 'K',
    color: '#1a6b3c',
    role: 'Founder',
    company: 'Kantariciah Foundation',
    quote: "The work was stunning — I honestly didn't expect a product this polished in such a short time. Caleb exceeded every expectation.",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-foreground overflow-x-hidden">
      <div className="container mx-auto px-6 md:px-16 max-w-[1600px]">

        {/* Header */}
        <div className="relative mb-16 overflow-hidden">
          <span
            className="font-syne font-extrabold absolute top-0 right-0 translate-x-1/4 select-none pointer-events-none whitespace-nowrap"
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
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-[13px] uppercase tracking-[0.35em] text-background/40 mb-3 relative z-10"
          >
            Social Proof
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-syne font-extrabold text-background relative z-10"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 0.9 }}
          >
            What They Say.
          </motion.h2>
        </div>

        {/* Stat strip */}
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 md:grid-cols-4 divide-x divide-background/10 border border-background/10 mb-1"
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              className="flex flex-col items-start p-6 md:p-8"
            >
              <span
                className="font-syne font-extrabold text-accent leading-none mb-2"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
              >
                {s.value}
              </span>
              <span className="font-mono text-[12px] uppercase tracking-wider text-background/40 whitespace-pre-line leading-relaxed">
                {s.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Quote cards */}
        <motion.div
          variants={stagger(0.13)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-background/10 border border-background/10 border-t-0"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="p-8 group hover:bg-background/5 transition-colors duration-300"
            >
              {/* Avatar + stars */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-syne font-extrabold text-white text-sm shrink-0"
                    style={{ background: t.color }}
                  >
                    {t.initial}
                  </div>
                  <div>
                    <p className="font-syne font-bold text-background text-sm">{t.role}</p>
                    <p className="font-mono text-[12px] uppercase tracking-wider text-accent">{t.company}</p>
                  </div>
                </div>
                <span className="text-accent text-xs tracking-widest">★★★★★</span>
              </div>

              {/* Quote */}
              <p className="text-background/70 text-sm leading-relaxed group-hover:text-background/90 transition-colors italic">
                "{t.quote}"
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
