import type { Variants } from 'framer-motion';

export const easeOut = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: easeOut } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const clipReveal: Variants = {
  hidden: { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
  show:   { clipPath: 'inset(0% 0 0 0)', opacity: 1, transition: { duration: 0.75, ease: easeOut } },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.65, ease: easeOut } },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.65, ease: easeOut } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.55, ease: easeOut } },
};

export const stagger = (delay = 0.1): Variants => ({
  hidden: {},
  show:   { transition: { staggerChildren: delay, delayChildren: 0.1 } },
});
