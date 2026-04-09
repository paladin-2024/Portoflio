import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/theme-provider';
import { Navigation } from './components/ui/navigation';
import { Preloader } from './components/ui/Preloader';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { Home } from './pages/Home';
import './App.css';

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
<ScrollProgress />
      <Router>
        <div className="min-h-screen bg-background text-foreground">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
