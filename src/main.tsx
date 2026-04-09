import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import './index.css';
import App from './App.tsx';

// Initialize Lenis smooth scroll — responsive, not sluggish
const lenis = new Lenis({
  duration: 0.7,
  easing: (t) => 1 - Math.pow(1 - t, 3),
});

// Connect Lenis to GSAP ticker
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
