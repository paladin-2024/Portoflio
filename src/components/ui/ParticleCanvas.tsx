import { useEffect, useRef } from 'react';
import { useTheme } from '../../context/theme-provider';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number; orange: boolean;
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const baseAlpha = isDark ? 'rgba(240,237,231,' : 'rgba(15,13,10,';
    const ORANGE = '#E95420';
    const PARTICLE_COUNT = 100;
    const CONNECT_DIST = 100;
    const REPEL_DIST = 80;
    const ORANGE_GLOW_DIST = 120;

    let animId: number;
    let W = 0, H = 0;
    let particles: Particle[] = [];
    const mouse = { x: -9999, y: -9999 };
    let frame = 0;

    function resize() {
      W = canvas!.width = canvas!.offsetWidth;
      H = canvas!.height = canvas!.offsetHeight;
      init();
    }

    function init() {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
        orange: Math.random() < 0.12,
      }));
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);

      for (const p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REPEL_DIST && dist > 0) {
          const force = (REPEL_DIST - dist) / REPEL_DIST * 0.8;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        const nearMouse = dist < ORANGE_GLOW_DIST;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = (p.orange || nearMouse) ? ORANGE : `${baseAlpha}0.45)`;
        ctx!.fill();
      }

      // Draw connection lines every other frame to halve the O(n²) cost
      frame++;
      if (frame % 2 === 0) {
        const CONNECT_DIST_SQ = CONNECT_DIST * CONNECT_DIST;
        ctx!.lineWidth = 0.5;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dSq = dx * dx + dy * dy;
            if (dSq < CONNECT_DIST_SQ) {
              const d = Math.sqrt(dSq);
              ctx!.beginPath();
              ctx!.moveTo(particles[i].x, particles[i].y);
              ctx!.lineTo(particles[j].x, particles[j].y);
              ctx!.strokeStyle = `${baseAlpha}${(1 - d / CONNECT_DIST) * 0.1})`;
              ctx!.stroke();
            }
          }
        }
      }

      animId = requestAnimationFrame(draw);
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }
    function onMouseLeave() { mouse.x = -9999; mouse.y = -9999; }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    draw();

    window.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
