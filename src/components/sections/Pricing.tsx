import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { fadeUp, stagger } from '../../lib/animations';

const plans = [
  {
    name: 'Starter',
    tag: 'Get online fast.',
    price: '$200',
    local: '750k UGX',
    note: 'starting from',
    features: [
      'Up to 5-page responsive website',
      'SEO optimisation (meta, sitemap, schema)',
      'Contact form & social integration',
      'Mobile-friendly design',
      '7-day delivery',
    ],
    cta: 'Get Started',
    href: '#contact',
    featured: false,
  },
  {
    name: 'Pro',
    tag: 'Build something real.',
    price: '$500',
    local: '1.5M UGX',
    note: 'starting from',
    features: [
      'Dynamic platform with custom CMS',
      'Simple mobile app (Android or iOS)',
      'REST API backend + database',
      'SEO + performance optimisation',
      '30-day post-launch support',
    ],
    cta: 'Start a Project',
    href: '#contact',
    featured: true,
  },
  {
    name: 'Custom',
    tag: 'The full picture.',
    price: "Let's talk",
    local: null,
    note: 'scope-based',
    features: [
      'Full-stack web + mobile system',
      'Admin dashboard & web portal',
      'Custom API & cloud architecture',
      'AI / ML integration available',
      'Ongoing maintenance & SLA',
    ],
    cta: 'Discuss Scope',
    href: '#contact',
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-background overflow-x-hidden">
      <div className="container mx-auto px-6 md:px-16 max-w-6xl">

        {/* Header */}
        <div className="relative mb-16 overflow-hidden">
          <span
            className="section-bleed-label absolute -top-4 left-0 pointer-events-none select-none"
            aria-hidden="true"
          >
            RATES.
          </span>
          <div className="relative z-10">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-[13px] uppercase tracking-[0.35em] text-muted-foreground mb-3"
            >
              Simple Pricing
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-notch text-foreground"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 0.9 }}
            >
              Pick a Plan.
            </motion.h2>
          </div>
        </div>

        {/* Cards */}
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-3 gap-px bg-border"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={fadeUp}
              className="relative flex flex-col bg-card p-8"
              style={{
                borderTop: `2px solid ${plan.featured ? 'var(--accent)' : 'transparent'}`,
              }}
            >
              {/* Popular badge */}
              {plan.featured && (
                <span className="absolute top-0 right-8 -translate-y-1/2 font-mono text-[10px] uppercase tracking-widest bg-accent text-white px-2.5 py-1">
                  Most Popular
                </span>
              )}

              {/* Name + tag */}
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-1">
                {plan.name}
              </p>
              <p className="font-syne text-foreground/60 text-sm mb-6">{plan.tag}</p>

              {/* Price */}
              <div className="mb-8 pb-8 border-b border-border">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                  {plan.note}
                </p>
                <p
                  className="font-notch text-foreground leading-none"
                  style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)' }}
                >
                  {plan.price}
                </p>
                {plan.local && (
                  <p className="font-mono text-[12px] text-muted-foreground mt-1">
                    {plan.local}
                  </p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 flex-1 mb-10">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <Check
                      className="shrink-0 mt-0.5"
                      style={{ width: '14px', height: '14px', color: 'var(--accent)' }}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={plan.href}
                className={`font-mono text-[13px] uppercase tracking-wider text-center py-3 px-6 border transition-colors duration-200 ${
                  plan.featured
                    ? 'bg-accent text-white border-accent hover:bg-accent/90'
                    : 'border-border text-foreground hover:border-accent hover:text-accent'
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground/40 text-center mt-8"
        >
          All prices are estimates · Final quote after scope discussion · Payment in UGX or USD
        </motion.p>

      </div>
    </section>
  );
}
