import { Hero } from '../components/sections/Hero';
import { Stats } from '../components/sections/Stats';
import { Services } from '../components/sections/Services';
import { Projects } from '../components/sections/Projects';
import { About } from '../components/sections/About';
import { Skills } from '../components/sections/Skills';
import { Process } from '../components/sections/Process';
import { Testimonials } from '../components/sections/Testimonials';
import { Contact } from '../components/sections/Contact';
import { Footer } from '../components/ui/Footer';
import { Marquee } from '../components/ui/Marquee';

const marqueeItems = [
  'Backend Development', 'React', 'Node.js', 'Robotics',
  'AI / ML', 'Spring Boot', 'Flutter', 'MongoDB',
  'Docker', 'TypeScript', 'Django', 'Open Source',
];

export function Home() {
  return (
    <main>
      <Hero />
      <div className="border-y border-border bg-black py-4 overflow-x-hidden">
        <Marquee
          items={marqueeItems}
          direction="left"
          speed={35}
          className="font-mono text-xs uppercase tracking-[0.2em] text-white opacity-60"
        />
        <Marquee
          items={[...marqueeItems].reverse()}
          direction="right"
          speed={45}
          className="font-mono text-xs uppercase tracking-[0.2em] text-white opacity-30 mt-2"
        />
      </div>
      <Stats />
      <Services />
      <Projects />
      <About />
      <Skills />
      <Process />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
