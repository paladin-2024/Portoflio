import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    num: '01 / FEATURED',
    title: 'Cyberteks-IT',
    desc: 'Future-Ready ICT Solutions for Every Business. CCTV, remote IT support, and ICT skills training across Africa.',
    metric: '↑ 3× organic traffic post-launch',
    tags: ['React.js', 'Tailwind', 'Three.js', 'MongoDB', 'Node.js'],
    image: '/assets/projects/cyberteks.png',
    url: 'https://www.cyberteks-it.com/',
    featured: true,
  },
  {
    num: '02',
    title: 'PaladinCars',
    desc: 'Super Luxury Fast Cars For Everyday Use. Premium car discovery and listing platform.',
    metric: '500+ car listings indexed',
    tags: ['React', 'Firebase', 'TypeScript'],
    image: '/assets/projects/paladincar.png',
    url: 'https://paladincar.netlify.app/',
    featured: false,
  },
  {
    num: '03',
    title: 'PromptPal',
    desc: 'Discover & Share AI-Powered Prompts. Open-source prompt community for developers.',
    metric: 'Open-source · 100+ active users',
    tags: ['React', 'PWA', 'GSAP', 'MongoDB', 'ShadCN'],
    image: '/assets/projects/promptpal.png',
    url: 'https://prompt-pal-amber.vercel.app/',
    featured: false,
  },
  {
    num: '04',
    title: 'SOHAM',
    desc: 'Smile of Hope African Ministries. Community outreach, programs, and donation platform.',
    metric: 'NGO donation platform · live',
    tags: ['React', 'TailwindCSS'],
    image: '/assets/projects/sonam.png',
    url: 'https://soham-five.vercel.app/',
    featured: false,
  },
  {
    num: '05',
    title: 'Kantariciah Foundation',
    desc: 'Community-Based Organization empowering families in Budaka District, Uganda through education, healthcare, economic development and youth skills since 2015.',
    metric: '500+ lives impacted · CBO since 2015',
    tags: ['React', 'TypeScript', 'TailwindCSS'],
    image: '/assets/projects/kantariciah.png',
    url: '#',
    featured: false,
  },
];

export function Projects() {
  const stripRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [dragging, setDragging] = useState(false);

  function onMouseDown(e: React.MouseEvent) {
    if (!stripRef.current) return;
    isDragging.current = true;
    setDragging(true);
    startX.current = e.pageX - stripRef.current.offsetLeft;
    scrollLeft.current = stripRef.current.scrollLeft;
  }
  function onMouseLeave() { isDragging.current = false; setDragging(false); }
  function onMouseUp() { isDragging.current = false; setDragging(false); }
  function onMouseMove(e: React.MouseEvent) {
    if (!isDragging.current || !stripRef.current) return;
    e.preventDefault();
    const x = e.pageX - stripRef.current.offsetLeft;
    stripRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.2;
  }

  return (
    <section id="projects" className="py-24 bg-background overflow-hidden">
      {/* Header */}
      <div className="px-6 md:px-16 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <span
            className="section-bleed-label absolute -top-4 left-0 pointer-events-none select-none"
            aria-hidden="true"
          >
            WORK.
          </span>
          <div className="relative z-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground mb-3">
              My Work
            </p>
            <h2
              className="font-syne font-extrabold text-foreground"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 0.9 }}
            >
              Featured Projects.
            </h2>
          </div>
        </motion.div>
      </div>

      {/* Horizontal scroll strip */}
      <div
        ref={stripRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        className="flex gap-px overflow-x-auto pb-4"
        style={{
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          cursor: dragging ? 'grabbing' : 'grab',
          WebkitOverflowScrolling: 'touch',
          background: 'var(--border)',
        }}
      >
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="shrink-0 bg-card flex flex-col"
            style={{
              width: 'clamp(260px, 30vw, 340px)',
              scrollSnapAlign: 'start',
              borderTop: `2px solid ${project.featured ? 'var(--accent)' : 'rgba(240,237,231,0.06)'}`,
            }}
          >
            {/* Image */}
            <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                loading="lazy"
                draggable={false}
              />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300" />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-6">
              <p className="font-mono text-[8px] text-muted-foreground tracking-[0.2em] mb-3">{project.num}</p>
              <h3 className="font-syne font-bold text-foreground text-lg mb-2">{project.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3 flex-1">{project.desc}</p>

              {/* Outcome metric */}
              <p className="font-mono text-[10px] text-accent uppercase tracking-wider mb-4">{project.metric}</p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[8px] uppercase tracking-wider px-2 py-1 border border-border text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {project.url !== '#' && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-foreground hover:text-accent transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  Live Site <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </motion.div>
        ))}

        {/* End card — GitHub */}
        <div
          className="shrink-0 flex flex-col items-center justify-center bg-card border border-dashed border-border/50"
          style={{ width: 'clamp(200px, 22vw, 260px)', scrollSnapAlign: 'start' }}
        >
          <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/50 mb-3 text-center px-6">
            More work on GitHub
          </p>
          <a
            href="https://github.com/paladin-2024"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[9px] uppercase tracking-wider text-accent hover:underline"
          >
            paladin-2024 →
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <p className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground/30 text-center mt-4">
        drag to explore
      </p>
    </section>
  );
}
