import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './index.css';
import App from './App.tsx';

gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis smooth scroll — lerp mode feels lighter than duration/easing
const lenis = new Lenis({
  lerp: 0.1,
  smoothWheel: true,
});

// Wire Lenis into GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
