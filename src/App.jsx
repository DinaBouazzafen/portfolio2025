import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DesktopView from './views/DesktopView';
import MobileView from './views/MobileView';
import AboutPage from './pages/AboutPage';
import GraphicDesignPage from './pages/GraphicDesignPage';
import MotionDesignPage from './pages/MotionDesignPage';
import MultimediaPage from './pages/MultimediaPage';
import RandomPage from './pages/RandomPage';


function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isMobile ? <MobileView /> : <DesktopView />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/graphic-design" element={<GraphicDesignPage />} />
        <Route path="/motion-design" element={<MotionDesignPage />} />
        <Route path="/multimedia" element={<MultimediaPage />} />
        <Route path="/random" element={<RandomPage />} />
      </Routes>
    </Router>
  );
}

export default App;
