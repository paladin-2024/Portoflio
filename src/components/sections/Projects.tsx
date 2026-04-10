import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';

const projects = [
  {
    title: 'Cyberteks-IT',
    description: 'Future-Ready ICT Solutions for Every Business. CCTV, remote IT support, and ICT skills training across Africa.',
    tags: ['React.js', 'Tailwind', 'Three.js','MongoDB','Node.JS'],
    image: '/assets/projects/cyberteks.png',
    url: 'https://www.cyberteks-it.com/',
  },
  {
    title: 'PaladinCars',
    description: 'Super Luxury Fast Cars For Everyday Use. Premium car discovery and listing platform.',
    tags: ['React', 'Firebase', 'TypeScript'],
    image: '/assets/projects/paladincar.png',
    url: 'https://paladincar.netlify.app/',
  },
  {
    title: 'SOHAM',
    description: 'Smile of Hope African Ministries. Community outreach, programs, and donation platform.',
    tags: ['React', 'TailwindCSS'],
    image: '/assets/projects/sonam.png',
    url: 'https://soham-five.vercel.app/',
  },
  {
    title: 'PromptPal',
    description: 'Discover & Share AI-Powered Prompts. Open-source prompt community for developers.',
    tags: ['React', 'PWA', 'GSAP','MongoDB', 'ShadCN'],
    image: '/assets/projects/promptpal.png',
    url: 'https://prompt-pal-amber.vercel.app/',
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
        className="group rounded-xl overflow-hidden border border-border bg-card hover:border-accent transition-colors duration-300"
      >
        {/* Image */}
        <div className="relative overflow-hidden aspect-video">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-syne font-bold text-xl text-card-foreground mb-2">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 bg-muted rounded text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
          >
            Live Demo <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
            My Work
          </p>
          <h2 className="font-syne font-extrabold text-4xl md:text-5xl text-foreground">
            Featured Projects
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground mt-4">
            A selection of recent work, from ICT platforms to AI tools
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Button
            size="lg"
            variant="outline"
            onClick={() => window.open('https://github.com/paladin-2024', '_blank')}
          >
            View More on GitHub
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
