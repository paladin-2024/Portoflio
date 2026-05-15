import { useEffect, useRef } from 'react';
import { MessageCircle } from 'lucide-react';

export function FloatingCTA() {
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const contact = document.getElementById('contact');
    if (!contact || !btnRef.current) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!btnRef.current) return;
        btnRef.current.style.opacity = entry.isIntersecting ? '0' : '1';
        btnRef.current.style.pointerEvents = entry.isIntersecting ? 'none' : 'auto';
      },
      { threshold: 0.1 }
    );
    obs.observe(contact);
    return () => obs.disconnect();
  }, []);

  return (
    <a
      ref={btnRef}
      href="https://wa.me/256767579099?text=Hi%20Caleb%2C%20I%20found%20your%20portfolio%20and%20I%27d%20like%20to%20work%20with%20you."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Book a call on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-accent text-white font-mono text-[9px] uppercase tracking-[0.15em] px-4 py-3 transition-opacity duration-300"
      style={{
        borderRadius: '2px',
        animation: 'ctaPulse 2s ease-in-out infinite',
      }}
    >
      <MessageCircle className="h-3.5 w-3.5 shrink-0" />
      Book a Call
    </a>
  );
}
