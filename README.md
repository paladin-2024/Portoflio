# Nzabanita Portfolio 2026 🎨

A stunning, modern portfolio website with black/white minimalist design, 3D animations, and smooth scroll effects.

![Portfolio Preview](./public/preview.png)

## ✨ Features

- 🎨 **Black/White Design** - Minimalist aesthetic with dark/light theme toggle
- 🎭 **3D Animations** - Three.js interactive elements and project cards
- 📜 **GSAP Scroll Effects** - Smooth section animations on scroll
- ⚡ **React + Vite** - Lightning-fast development and production builds
- 📱 **Fully Responsive** - Mobile-first design that works everywhere
- ♿ **Accessible** - WCAG compliant with keyboard navigation
- 🚀 **Performance** - Optimized for 60fps animations and fast loading

## 🛠️ Tech Stack

- **Framework:** React 19 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui (custom)
- **3D Graphics:** Three.js + React Three Fiber + Drei
- **Animations:** GSAP + ScrollTrigger + Framer Motion
- **Smooth Scroll:** Lenis
- **Routing:** React Router DOM
- **Forms:** React Hook Form + Zod
- **Theme:** next-themes

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Navigate to project
cd portfolio-2026

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
# Create production build
pnpm build

# Preview production build
pnpm preview
```

## 📁 Project Structure

```
portfolio-2026/
├── src/
│   ├── components/
│   │   ├── ui/           # Reusable UI components
│   │   ├── sections/     # Page sections (Hero, About, etc.)
│   │   └── three/        # 3D components (Three.js)
│   ├── pages/            # Page components
│   ├── hooks/            # Custom React hooks
│   ├── context/          # React context providers
│   ├── lib/              # Utility functions
│   └── assets/           # Images, fonts, etc.
├── public/               # Static assets
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🎨 Customization

### Update Personal Info

Edit the content in these files:
- `src/components/sections/Hero.tsx` - Name and title
- `src/components/sections/About.tsx` - Timeline and bio
- `src/components/sections/Projects.tsx` - Project showcase
- `src/components/sections/Contact.tsx` - Contact information

### Change Colors

Modify CSS variables in `src/index.css`:

```css
:root {
  --background: #ffffff;
  --foreground: #0a0a0a;
  /* ... */
}
```

### Add More Projects

Update the `projects` array in `src/components/sections/Projects.tsx`:

```typescript
const projects = [
  {
    title: 'Your Project',
    description: 'Description',
    tags: ['React', 'TypeScript'],
  },
];
```

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build
pnpm build

# Deploy
netlify deploy --dir dist
```

### Manual Hosting

```bash
# Build
pnpm build

# Upload dist/ folder to your hosting provider
```

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm lint` | Run ESLint |

## 🤝 Contributing

This is a personal portfolio, but feel free to fork and customize for your own use!

## 📄 License

MIT License - feel free to use this as a template for your own portfolio.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component system
- [Three.js](https://threejs.org/) for 3D graphics
- [GSAP](https://greensock.com/gsap/) for scroll animations
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) for React + Three.js

---

Built with ❤️ by Nzabanita
# Portoflio
