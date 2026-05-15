import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 10, suffix: '+', label: 'Projects\nDelivered',  sub: 'shipped to production' },
  { value: 3,  suffix: '+', label: 'Years\nExperience',    sub: 'building real systems' },
  { value: 5,  suffix: '+', label: 'Happy\nClients',       sub: 'across East Africa' },
  { value: 2,  suffix: '',  label: 'Robotics\nBuilds',     sub: 'hardware + firmware' },
];

interface StatProps {
  value: number;
  suffix: string;
  label: string;
  sub: string;
  index: number;
}

function Stat({ value, suffix, label, sub, index }: StatProps) {
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: numRef.current,
      start: 'top 88%',
      onEnter: () => {
        gsap.to(obj, {
          val: value,
          duration: 2,
          ease: 'power3.out',
          onUpdate: () => {
            if (numRef.current) numRef.current.textContent = Math.round(obj.val).toString();
          },
        });
      },
      once: true,
    });
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col justify-between p-8 md:p-10 border-b md:border-b-0 md:border-r border-white/[0.08] last:border-0 group hover:bg-white/[0.03] transition-colors duration-300"
    >
      {/* Index */}
      <span className="font-mono text-[12px] text-white/20 uppercase tracking-widest mb-4">
        0{index + 1}
      </span>

      {/* Number */}
      <div className="flex items-end gap-0.5 mb-3">
        <span
          ref={numRef}
          className="font-syne font-extrabold text-white leading-none"
          style={{ fontSize: 'clamp(4rem, 7.5vw, 7rem)' }}
        >
          0
        </span>
        <span
          className="font-syne font-extrabold text-accent leading-none mb-1"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
        >
          {suffix}
        </span>
      </div>

      {/* Label */}
      <p className="font-syne font-bold text-white/90 text-lg leading-tight whitespace-pre-line mb-1">
        {label}
      </p>
      <p className="font-mono text-[12px] uppercase tracking-wider text-white/30">
        {sub}
      </p>

      {/* Accent line on hover */}
      <div className="absolute bottom-0 left-8 right-8 h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </motion.div>
  );
}

export function Stats() {
  return (
    <section id="stats" className="bg-black overflow-x-hidden">
      <div className="h-px bg-white/[0.08]" />
      <div className="container mx-auto max-w-[1600px]">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <Stat key={stat.label} {...stat} index={i} />
          ))}
        </div>
      </div>
      <div className="h-px bg-white/[0.08]" />
    </section>
  );
}
