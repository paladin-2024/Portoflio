import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { CodeEditorWindow } from '../ui/CodeEditorWindow';

/* ─── Tech data ────────────────────────────────────────────── */
const techs = [
  { name: 'React',        abbr: 'Re',  color: '#61DAFB' },
  { name: 'TypeScript',   abbr: 'TS',  color: '#3178C6' },
  { name: 'JavaScript',   abbr: 'JS',  color: '#F7DF1E' },
  { name: 'Node.js',      abbr: 'No',  color: '#339933' },
  { name: 'Three.js',     abbr: '3J',  color: '#ffffff' },
  { name: 'Tailwind',     abbr: 'Tw',  color: '#06B6D4' },
  { name: 'PostgreSQL',   abbr: 'PG',  color: '#4169E1' },
  { name: 'MongoDB',      abbr: 'Mo',  color: '#47A248' },
  { name: 'React Native', abbr: 'RN',  color: '#61DAFB' },
  { name: 'Firebase',     abbr: 'Fb',  color: '#FFCA28' },
  { name: 'GraphQL',      abbr: 'GQ',  color: '#E10098' },
  { name: 'Docker',       abbr: 'Do',  color: '#2496ED' },
  { name: 'Git',          abbr: 'Gi',  color: '#F05032' },
  { name: 'Linux',        abbr: 'Lx',  color: '#E95420' },
];

const POSITIONS: [number, number, number][] = [
  [-6.5,  1.4,  0.0], [-4.5,  1.8, -0.4], [-2.2,  1.2,  0.5],
  [ 0.0,  2.0, -0.2], [ 2.2,  1.5,  0.3], [ 4.5,  1.9, -0.5],
  [ 6.5,  1.3,  0.2], [-5.5, -1.2,  0.3], [-3.2, -1.7, -0.3],
  [-1.0, -1.0,  0.6], [ 1.2, -1.8, -0.4], [ 3.2, -1.1,  0.2],
  [ 5.5, -1.6, -0.2], [ 7.0, -1.3,  0.4],
];

function makeBubbleTexture(abbr: string, brandColor: string): THREE.CanvasTexture {
  const S = 512;
  const canvas = document.createElement('canvas');
  canvas.width = S; canvas.height = S;
  const ctx = canvas.getContext('2d')!;
  const base = ctx.createRadialGradient(S * 0.38, S * 0.32, S * 0.04, S / 2, S / 2, S / 2);
  base.addColorStop(0.0, '#3c3c3c');
  base.addColorStop(0.5, '#1a1a1a');
  base.addColorStop(1.0, '#070707');
  ctx.beginPath();
  ctx.arc(S / 2, S / 2, S / 2 - 2, 0, Math.PI * 2);
  ctx.fillStyle = base; ctx.fill();
  ctx.beginPath();
  ctx.arc(S / 2, S / 2, S / 2 - 6, 0, Math.PI * 2);
  ctx.strokeStyle = brandColor + '66'; ctx.lineWidth = 12; ctx.stroke();
  const hl = ctx.createRadialGradient(S * 0.33, S * 0.28, 0, S * 0.38, S * 0.35, S * 0.3);
  hl.addColorStop(0, 'rgba(255,255,255,0.28)');
  hl.addColorStop(1, 'rgba(255,255,255,0.00)');
  ctx.beginPath();
  ctx.arc(S / 2, S / 2, S / 2 - 2, 0, Math.PI * 2);
  ctx.fillStyle = hl; ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${Math.round(S * 0.25)}px "JetBrains Mono", monospace`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0,0,0,0.7)'; ctx.shadowBlur = 14;
  ctx.fillText(abbr, S / 2, S / 2);
  return new THREE.CanvasTexture(canvas);
}

interface BubbleProps {
  position: [number, number, number];
  abbr: string;
  color: string;
  phase: number;
}

function Bubble({ position, abbr, color, phase }: BubbleProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useMemo(() => makeBubbleTexture(abbr, color), [abbr, color]);
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(t * 0.6 + phase) * 0.14;
    meshRef.current.rotation.y = t * 0.12 + phase;
  });
  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.72, 64, 64]} />
      <meshPhysicalMaterial
        map={texture}
        roughness={0.12}
        metalness={0.7}
        reflectivity={0.9}
        clearcoat={0.5}
        clearcoatRoughness={0.08}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]}   intensity={1.5} color="#ffffff" />
      <directionalLight position={[-5, -3, -5]} intensity={0.3} color="#E95420" />
      <pointLight      position={[0, 0, 6]}     intensity={0.6} color="#ffffff" />
      {techs.map((tech, i) => (
        <Bubble
          key={tech.name}
          position={POSITIONS[i]}
          abbr={tech.abbr}
          color={tech.color}
          phase={(i / techs.length) * Math.PI * 2}
        />
      ))}
    </>
  );
}

/* ─── Neofetch data (no template literal tricks) ─────────────── */
const neofetch = [
  { label: 'OS',        value: 'Ubuntu 24.04.2 LTS x86_64' },
  { label: 'Kernel',    value: 'Linux 6.8.0-generic' },
  { label: 'Shell',     value: 'zsh 5.9' },
  { label: 'Editor',    value: 'Neovim + VS Code' },
  { label: 'WM',        value: 'GNOME 46' },
  { label: 'Terminal',  value: 'Alacritty' },
  { label: 'Daily',     value: 'Ubuntu, no dual-boot, ever' },
  { label: 'Stack',     value: 'TS · JS · Python · Bash' },
  { label: 'Tools',     value: 'Docker · Git · tmux · htop' },
];


export function Skills() {
  return (
    <section id="skills" className="py-24 overflow-x-hidden" style={{ background: '#0f0d0a' }}>
      <div className="container mx-auto px-6 md:px-16 max-w-[1600px]">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40 mb-3">
              My Stack
            </p>
            <h2
              className="font-syne font-extrabold text-white"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 0.9 }}
            >
              Technologies.
            </h2>
          </div>
          <p className="max-w-xs text-sm text-white/40 md:text-right leading-relaxed">
            Built on Linux. Deployed with Docker.<br />Monitored with htop.
          </p>
        </div>

        {/* 3D Canvas — always dark background */}
        <div
          className="relative w-full rounded-none"
          style={{ height: '460px', background: '#0f0d0a' }}
        >
          {/* Vignette overlay — subtle, not blocking */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 40%, rgba(15,13,10,0.7) 100%)',
            }}
          />

          <Canvas
            camera={{ position: [0, 0, 10], fov: 70 }}
            gl={{ antialias: true, alpha: false }}
            style={{ width: '100%', height: '100%', background: '#0f0d0a' }}
          >
            <Scene />
          </Canvas>

          {/* Tech name strip */}
          <div className="absolute bottom-3 left-0 right-0 z-20 pointer-events-none flex flex-wrap justify-center gap-x-4 gap-y-1 px-4">
            {techs.map((tech) => (
              <span
                key={tech.name}
                className="font-mono text-[9px] uppercase tracking-wider"
                style={{ color: 'rgba(240,237,231,0.35)' }}
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>

        {/* Terminal blocks — two columns below canvas */}
        <div className="grid md:grid-cols-2 gap-px mt-px" style={{ background: '#1a1612' }}>

          {/* Left: neofetch */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="terminal"
          >
            <div className="mb-3">
              <span style={{ color: '#E95420', fontWeight: 700 }}>nzabanita</span>
              <span style={{ color: 'rgba(240,237,231,0.5)' }}>@</span>
              <span style={{ color: '#E95420', fontWeight: 700 }}>ubuntu</span>
              <span style={{ color: 'rgba(240,237,231,0.5)' }}>  ~  neofetch</span>
            </div>
            <div className="border-t border-white/10 pt-3 space-y-1">
              {neofetch.map(({ label, value }) => (
                <div key={label} className="flex gap-3">
                  <span className="font-bold shrink-0 w-20" style={{ color: '#E95420' }}>
                    {label}
                  </span>
                  <span className="terminal-output">{value}</span>
                </div>
              ))}
            </div>
            {/* Color blocks */}
            <div className="flex gap-1 mt-4">
              {['#0f0d0a','#E95420','#339933','#61DAFB','#3178C6','#F7DF1E','#E10098','#F0EDE7'].map((c) => (
                <span
                  key={c}
                  className="inline-block w-5 h-3"
                  style={{ background: c }}
                />
              ))}
            </div>
          </motion.div>

          {/* Right: IDE code editor window */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ background: '#0a0908', minHeight: 340 }}
          >
            <CodeEditorWindow />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
