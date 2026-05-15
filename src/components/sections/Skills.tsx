import { motion } from 'framer-motion';
import { CodeEditorWindow } from '../ui/CodeEditorWindow';
import { fadeUp, scaleIn, stagger } from '../../lib/animations';

/* ─── Tech data grouped by category ────────────────────────── */
const categories = [
  {
    label: 'Frontend',
    techs: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'GSAP', 'Three.js'],
  },
  {
    label: 'Mobile Dev',
    techs: ['Flutter', 'Dart', 'Firebase', 'MongoDB', 'FlutterFlow', 'Android SDK'],
  },
  {
    label: 'Backend',
    techs: ['Node.js', 'Express', 'Spring Boot', 'Django', 'Python', 'MongoDB', 'GraphQL', 'REST APIs'],
  },
  {
    label: 'Robotics & Hardware',
    techs: ['Arduino / C++', 'Raspberry Pi', 'ESP32', 'ESP8266', 'MicroPython', 'Sensors & Actuators'],
  },
  {
    label: 'Tools & OS',
    techs: ['Linux / Ubuntu', 'Docker', 'Git', 'Bash', 'Neovim', 'tmux'],
  },
];

/* ─── Neofetch data ─────────────────────────────────────────── */
const neofetch = [
  { label: 'OS',       value: 'Ubuntu 24.04.2 LTS x86_64' },
  { label: 'Kernel',   value: 'Linux 6.8.0-generic' },
  { label: 'Shell',    value: 'zsh 5.9' },
  { label: 'Editor',   value: 'Neovim + VS Code' },
  { label: 'WM',       value: 'GNOME 46' },
  { label: 'Terminal', value: 'Alacritty' },
  { label: 'Daily',    value: 'Ubuntu, no dual-boot, ever' },
  { label: 'Stack',    value: 'TS · JS · Python · Bash' },
  { label: 'Tools',    value: 'Docker · Git · tmux · htop' },
];

export function Skills() {
  let counter = 0;

  return (
    <section id="skills" className="py-24 overflow-x-hidden" style={{ background: '#0f0d0a' }}>
      <div className="container mx-auto px-6 md:px-16 max-w-[1600px]">

        {/* Header */}
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <motion.div variants={fadeUp}>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40 mb-3">
              My Stack
            </p>
            <h2
              className="font-syne font-extrabold text-white"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 0.9 }}
            >
              Technologies.
            </h2>
          </motion.div>
          <motion.p variants={fadeUp} className="max-w-xs text-sm text-white/40 md:text-right leading-relaxed">
            Built on Linux. Deployed with Docker.<br />Monitored with htop.
          </motion.p>
        </motion.div>

        {/* ── Tech grid ─────────────────────────────────────────── */}
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-px mb-px"
          style={{ background: 'rgba(240,237,231,0.06)' }}
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.label}
              variants={scaleIn}
              style={{ background: '#0f0d0a' }}
            >
              {/* Top accent bar — orange on Mobile Dev, hairline on others */}
              <div
                style={{
                  height: 2,
                  background: cat.label === 'Mobile Dev' ? '#E95420' : 'rgba(240,237,231,0.06)',
                }}
              />
              {/* Category label */}
              <div
                className="px-6 py-4 border-b"
                style={{ borderColor: 'rgba(240,237,231,0.06)' }}
              >
                <span
                  className="font-mono text-[9px] uppercase tracking-[0.35em]"
                  style={{ color: cat.label === 'Mobile Dev' ? '#E95420' : 'rgba(240,237,231,0.3)' }}
                >
                  {cat.label}
                </span>
              </div>

              {/* Tech rows */}
              {cat.techs.map((tech) => {
                const num = String(++counter).padStart(2, '0');
                return (
                  <div
                    key={tech}
                    className="group flex items-center gap-5 px-6 py-4 border-b transition-colors duration-200"
                    style={{
                      borderColor: 'rgba(240,237,231,0.06)',
                    }}
                  >
                    <span
                      className="font-mono text-[10px] shrink-0 transition-colors duration-200"
                      style={{ color: 'rgba(240,237,231,0.2)' }}
                    >
                      {num}
                    </span>
                    <span
                      className="font-syne font-bold text-[15px] uppercase tracking-wide transition-colors duration-200"
                      style={{ color: 'rgba(240,237,231,0.75)' }}
                    >
                      {tech}
                    </span>
                    {/* Orange tick on hover */}
                    <span
                      className="ml-auto w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{ background: '#E95420' }}
                    />
                  </div>
                );
              })}
            </motion.div>
          ))}
        </motion.div>

        {/* ── Bottom panels: neofetch + code editor ─────────────── */}
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="grid md:grid-cols-2 gap-px mt-px"
          style={{ background: 'rgba(240,237,231,0.06)' }}
        >

          {/* Left: neofetch */}
          <motion.div
            variants={fadeUp}
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
                <span key={c} className="inline-block w-5 h-3" style={{ background: c }} />
              ))}
            </div>
          </motion.div>

          {/* Right: IDE code editor window */}
          <motion.div
            variants={fadeUp}
            style={{ background: '#0a0908', minHeight: 340 }}
          >
            <CodeEditorWindow />
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
