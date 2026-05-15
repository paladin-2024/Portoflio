import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/theme-provider';
import { Navigation } from './components/ui/navigation';
import { Preloader } from './components/ui/Preloader';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { FloatingCTA } from './components/ui/FloatingCTA';
import { Home } from './pages/Home';
import './App.css';

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <ScrollProgress />
      <Router>
        <div className="min-h-screen bg-background text-foreground">
          <Navigation />
          {/* md:pl-14 offsets the 56px fixed side nav on desktop */}
          <div className="md:pl-14">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
          <FloatingCTA />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
