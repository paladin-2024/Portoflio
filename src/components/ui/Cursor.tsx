import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current!;
    const ring = ringRef.current!;

    const onMove = (e: MouseEvent) => {
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power3.out',
      });
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.35,
        ease: 'power3.out',
      });
    };

    const onEnterLink = () => {
      gsap.to(ring, { scale: 2, opacity: 0.5, duration: 0.3 });
      gsap.to(dot, { scale: 0, duration: 0.3 });
    };

    const onLeaveLink = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    window.addEventListener('mousemove', onMove);

    const links = document.querySelectorAll('a, button, [role="button"]');
    links.forEach((el) => {
      el.addEventListener('mouseenter', onEnterLink);
      el.addEventListener('mouseleave', onLeaveLink);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      links.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterLink);
        el.removeEventListener('mouseleave', onLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[9998] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground"
        style={{ top: 0, left: 0 }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed z-[9997] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/50"
        style={{ top: 0, left: 0 }}
      />
    </>
  );
}
