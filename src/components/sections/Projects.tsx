import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import { easeOut } from '../../lib/animations';

const projects = [
  {
    num: '01 / FEATURED',
    title: 'Cyberteks-IT',
    shortDesc: 'Future-Ready ICT Solutions for Every Business.',
    desc: 'Full platform covering CCTV installation, remote IT support, and ICT skills training across Africa. Built from scratch with a custom CMS, contact system, and service booking flow.',
    metric: '↑ 3× organic traffic post-launch',
    highlights: [
      'Custom CMS for service pages and blog',
      'Contact & booking system wired to email',
      'Three.js hero with 3D interactive scene',
      'SEO-optimised — tripled organic traffic after launch',
    ],
    tags: ['React.js', 'Tailwind', 'Three.js', 'MongoDB', 'Node.js'],
    image: '/assets/projects/cyberteks.png',
    url: 'https://www.cyberteks-it.com/',
    featured: true,
  },
  {
    num: '02',
    title: 'PaladinCars',
    shortDesc: 'Super Luxury Fast Cars For Everyday Use.',
    desc: 'Premium car discovery and listing platform with search, filters, and a smooth browsing experience. Fully typed with TypeScript and backed by Firebase real-time database.',
    metric: '500+ car listings indexed',
    highlights: [
      'Real-time Firebase listings with live search',
      'TypeScript throughout — zero runtime type errors',
      'Responsive card layout with filter sidebar',
      '500+ car listings indexed at launch',
    ],
    tags: ['React', 'Firebase', 'TypeScript'],
    image: '/assets/projects/paladincar.png',
    url: 'https://paladincar.netlify.app/',
    featured: false,
  },
  {
    num: '03',
    title: 'PromptPal',
    shortDesc: 'Discover & Share AI-Powered Prompts.',
    desc: 'Open-source prompt community for developers. Browse, submit and upvote prompts for GPT, Claude, and other AI models. Progressive Web App with offline support.',
    metric: 'Open-source · 100+ active users',
    highlights: [
      'PWA with offline caching via service workers',
      'GSAP-powered micro-animations throughout',
      'MongoDB + REST API backend',
      '100+ active community users at launch',
    ],
    tags: ['React', 'PWA', 'GSAP', 'MongoDB', 'ShadCN'],
    image: '/assets/projects/promptpal.png',
    url: 'https://prompt-pal-amber.vercel.app/',
    featured: false,
  },
  {
    num: '04',
    title: 'Kantariciah Foundation',
    shortDesc: 'Community-Based Organization, Budaka District, Uganda.',
    desc: 'Platform for a CBO empowering families in Budaka District, Uganda through education, healthcare, economic development and youth skills since 2015. Includes program listings, impact stats, and donation flow.',
    metric: '500+ lives impacted · CBO since 2015',
    highlights: [
      'Program showcase with impact statistics',
      'Donation flow and volunteer sign-up',
      'Fully responsive across all devices',
      'Delivered in record time — client-validated design',
    ],
    tags: ['React', 'TypeScript', 'TailwindCSS'],
    image: '/assets/projects/kantariciah.png',
    url: 'https://kantariciah.org',
    featured: false,
  },
];

export function Projects() {
  const stripRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [dragging, setDragging] = useState(false);
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);

  function openModal(project: typeof projects[0]) {
    setSelected(project);
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    setSelected(null);
    document.body.style.overflow = '';
  }

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

  function handleCardClick(project: typeof projects[0]) {
    if (!dragging) openModal(project);
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
          <span className="section-bleed-label absolute -top-4 left-0 pointer-events-none select-none" aria-hidden="true">
            WORK.
          </span>
          <div className="relative z-10">
            <p className="font-mono text-[13px] uppercase tracking-[0.35em] text-muted-foreground mb-3">
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
            onClick={() => handleCardClick(project)}
            className="shrink-0 bg-card flex flex-col group"
            style={{
              width: 'clamp(240px, 28vw, 300px)',
              scrollSnapAlign: 'start',
              borderTop: `2px solid ${project.featured ? 'var(--accent)' : 'rgba(240,237,231,0.06)'}`,
              cursor: dragging ? 'grabbing' : 'pointer',
            }}
          >
            {/* Image */}
            <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                draggable={false}
              />
              {/* View details overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                <span className="font-mono text-[12px] uppercase tracking-widest text-black bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 py-1.5">
                  View Details
                </span>
              </div>
            </div>

            {/* Minimal content */}
            <div className="flex flex-col flex-1 p-5">
              <p className="font-mono text-[11px] text-muted-foreground tracking-[0.2em] mb-2">{project.num}</p>
              <h3 className="font-syne font-bold text-foreground text-base mb-3">{project.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1">{project.shortDesc}</p>
              <div className="flex flex-wrap gap-1">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[7px] uppercase tracking-wider px-1.5 py-0.5 border border-border text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="font-mono text-[7px] text-muted-foreground/50 px-1 py-0.5">
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {/* End card — GitHub */}
        <div
          className="shrink-0 flex flex-col items-center justify-center bg-card border border-dashed border-border/50"
          style={{ width: 'clamp(180px, 20vw, 240px)', scrollSnapAlign: 'start' }}
        >
          <p className="font-mono text-[12px] uppercase tracking-widest text-muted-foreground/50 mb-3 text-center px-6">
            More work on GitHub
          </p>
          <a
            href="https://github.com/paladin-2024"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[12px] uppercase tracking-wider text-accent hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            paladin-2024 →
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground/30 text-center mt-4">
        click a project · drag to explore
      </p>

      {/* ── Project detail modal ── */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/90 z-[200] backdrop-blur-md"
            />

            {/* Modal panel */}
            <motion.div
              initial={{ opacity: 0, y: 48, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 32, scale: 0.97 }}
              transition={{ duration: 0.4, ease: easeOut }}
              className="fixed z-[201] inset-x-4 md:inset-x-auto md:w-[660px] md:left-1/2 md:-translate-x-1/2 top-[5vh] bottom-[5vh] overflow-y-auto bg-card border border-border"
            >
              {/* Close */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Image */}
              <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="w-full h-full object-cover object-top"
                />
                {selected.featured && (
                  <span className="absolute top-4 left-4 font-mono text-[11px] uppercase tracking-widest bg-accent text-white px-2.5 py-1">
                    Featured
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-8">
                <p className="font-mono text-[11px] text-muted-foreground tracking-[0.25em] mb-2">{selected.num}</p>
                <h3
                  className="font-syne font-extrabold text-foreground mb-2"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', lineHeight: 1 }}
                >
                  {selected.title}
                </h3>
                <p className="font-mono text-[13px] text-accent uppercase tracking-wider mb-6">{selected.metric}</p>

                <p className="text-sm text-muted-foreground leading-relaxed mb-8">{selected.desc}</p>

                {/* Highlights */}
                <div className="mb-8">
                  <p className="font-mono text-[12px] uppercase tracking-wider text-muted-foreground/50 mb-3">Highlights</p>
                  <ul className="space-y-2">
                    {selected.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-accent mt-0.5 shrink-0">—</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {selected.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[11px] uppercase tracking-wider px-2 py-1 border border-border text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Live site link */}
                {selected.url !== '#' && (
                  <a
                    href={selected.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-wider text-foreground hover:text-accent transition-colors border border-border px-4 py-2.5 hover:border-accent"
                  >
                    Visit Live Site <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
