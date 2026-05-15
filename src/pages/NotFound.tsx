import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen bg-background flex flex-col items-start justify-center px-6 md:px-16 pl-10 md:pl-24 overflow-hidden">
      {/* Ghost bleed number */}
      <span
        className="font-notch absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 select-none pointer-events-none"
        style={{
          fontSize: 'clamp(14rem, 40vw, 32rem)',
          lineHeight: 1,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(0,0,0,0.05)',
        }}
        aria-hidden="true"
      >
        404
      </span>

      {/* Left rule */}
      <div className="absolute left-6 md:left-16 top-0 bottom-0 w-px bg-border" />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="font-mono text-xs uppercase tracking-[0.35em] text-muted-foreground mb-4"
      >
        Error 404
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="font-notch text-foreground leading-[0.9] mb-6"
        style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
      >
        Page not<br />found.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-muted-foreground text-sm max-w-sm mb-10 leading-relaxed"
      >
        That URL doesn't exist. Head back to the portfolio.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="flex gap-4"
      >
        <button
          onClick={() => navigate('/')}
          className="btn-brutal-filled font-mono text-[13px] tracking-widest uppercase px-7 py-3"
        >
          Go Home
        </button>
        <button
          onClick={() => navigate(-1)}
          className="btn-brutal font-mono text-[13px] tracking-widest uppercase px-7 py-3"
        >
          Go Back
        </button>
      </motion.div>
    </section>
  );
}
