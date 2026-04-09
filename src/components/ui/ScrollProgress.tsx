import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(barRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[9996] h-[2px] bg-transparent">
      <div
        ref={barRef}
        className="h-full bg-accent origin-left"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
