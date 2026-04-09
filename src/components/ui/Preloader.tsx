import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ onComplete });

    tl.fromTo(
      letterRef.current,
      { opacity: 0, scale: 0.6, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    )
    .to(letterRef.current, {
      scale: 1.08,
      duration: 0.3,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: 1,
    })
    .to(progressRef.current, {
      scaleX: 1,
      duration: 0.5,
      ease: 'power2.inOut',
      transformOrigin: 'left center',
    }, '-=0.2')
    .to(containerRef.current, {
      yPercent: -100,
      duration: 0.7,
      ease: 'power4.inOut',
      delay: 0.1,
    });

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-foreground"
    >
      <span
        ref={letterRef}
        className="font-syne font-extrabold text-background opacity-0"
        style={{ fontSize: 'clamp(5rem, 15vw, 10rem)', lineHeight: 1 }}
      >
        N.
      </span>
      <div className="mt-8 w-48 h-px bg-background/20 overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-accent"
          style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }}
        />
      </div>
    </div>
  );
}
