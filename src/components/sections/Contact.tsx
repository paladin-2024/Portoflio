import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MessageCircle, Phone, MapPin, Code2, Globe, X } from 'lucide-react';
import { Button } from '../ui/button';

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('sent');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 bg-foreground overflow-x-hidden">
      <div className="container mx-auto px-6 md:px-16 max-w-6xl">
        {/* Header */}
        <div className="relative mb-16 overflow-hidden">
          <span
            className="font-syne font-extrabold absolute top-0 right-0 translate-x-1/4 select-none pointer-events-none whitespace-nowrap"
            style={{
              fontSize: 'clamp(4rem, 12vw, 10rem)',
              lineHeight: 0.9,
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,255,255,0.06)',
            }}
            aria-hidden="true"
          >
            BUILD.
          </span>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-xs uppercase tracking-[0.3em] text-background/40 mb-4 relative z-10"
          >
            Get In Touch
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-syne font-extrabold text-background relative z-10"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            Let's Build.
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left — Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-background/70 leading-relaxed mb-10 max-w-md">
              Have a project in mind, need a backend built, or want to explore AI integration?
              Reach out. I'm available for freelance work, collaborations and interesting problems.
            </p>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-background/10">
                  <Mail className="h-5 w-5 text-background" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-background/40">Email</p>
                  <a href="mailto:cnzabb@gmail.com" className="text-background hover:text-accent transition-colors">
                    cnzabb@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-background/10">
                  <MessageCircle className="h-5 w-5 text-background" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-background/40">WhatsApp</p>
                  <a
                    href="https://wa.me/256767579099"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-background hover:text-accent transition-colors"
                  >
                    +256 767 579 099
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-background/10">
                  <Phone className="h-5 w-5 text-background" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-background/40">Calls</p>
                  <a href="tel:+256767579099" className="text-background hover:text-accent transition-colors">
                    +256 767 579 099
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-background/10">
                  <MapPin className="h-5 w-5 text-background" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-background/40">Location</p>
                  <p className="text-background">Kampala, Uganda</p>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-background/10">
              <p className="text-[10px] font-mono uppercase tracking-wider text-background/40 mb-4">Socials</p>
              <div className="flex gap-5">
                <a href="https://github.com/paladin-2024" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-background/50 hover:text-background transition-colors">
                  <Code2 className="h-5 w-5" />
                </a>
                <a href="https://www.linkedin.com/in/nzabanita-caleb-83483030b" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-background/50 hover:text-background transition-colors">
                  <Globe className="h-5 w-5" />
                </a>
                <a href="https://x.com/CNzabb" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X" className="text-background/50 hover:text-background transition-colors">
                  <X className="h-5 w-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {status === 'sent' ? (
              <div className="flex flex-col items-start justify-center h-full py-16">
                <span className="text-accent font-mono text-xs uppercase tracking-wider mb-4">Message sent</span>
                <h3 className="font-syne font-extrabold text-background text-3xl mb-4">Got it.</h3>
                <p className="text-background/60 text-sm">I'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block font-mono text-[10px] uppercase tracking-wider text-background/40 mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-background/5 border border-background/20 text-background placeholder-background/30 px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-mono text-[10px] uppercase tracking-wider text-background/40 mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-background/5 border border-background/20 text-background placeholder-background/30 px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block font-mono text-[10px] uppercase tracking-wider text-background/40 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-background/5 border border-background/20 text-background placeholder-background/30 px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                {status === 'error' && (
                  <p className="text-sm text-red-400 font-mono">Something went wrong. Try emailing directly at cnzabb@gmail.com</p>
                )}
                <Button
                  type="submit"
                  variant="outline"
                  size="lg"
                  disabled={status === 'sending'}
                  className="gap-2 border-background/30 text-background hover:bg-background hover:text-foreground"
                >
                  <Send className="h-4 w-4" />
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
