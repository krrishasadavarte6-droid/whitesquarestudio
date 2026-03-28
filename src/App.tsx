import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AllGallery from './components/AllGallery';
import VideoSection from './components/VideoSection';

const Home = () => (
  <main>
    <Hero />
    <About />
    <Services />
    <Gallery />
    <VideoSection />
    <Contact />
  </main>
);

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<AllGallery />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
