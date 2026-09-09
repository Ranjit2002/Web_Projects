import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import TechStack from './components/TechStack.jsx';
import DeepDives from './components/DeepDives.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import { CheckCircle2, X } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [deepDiveTab, setDeepDiveTab] = useState('github');
  const [toastMessage, setToastMessage] = useState('');

  // ScrollSpy to update active navigation item
  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'deep-dives', 'projects', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  const handleDeepDiveSelect = (tabKey) => {
    setDeepDiveTab(tabKey);
    const element = document.getElementById('deep-dives');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#08080a] text-zinc-200 overflow-x-hidden">
      {/* Dynamic Mouse / Ambient Spotlights */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.12),transparent_70%)]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(245,158,11,0.06),transparent_70%)]" />
      </div>

      {/* Main App Layout */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      <main className="relative z-10">
        <Hero />
        <About onSelectDeepDive={handleDeepDiveSelect} />
        <TechStack />
        <DeepDives selectedTab={deepDiveTab} setSelectedTab={setDeepDiveTab} />
        <Projects />
        <Contact onShowToast={showToast} />
      </main>

      <Footer />

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce transition-all duration-300">
          <div className="flex items-center gap-3 px-5 py-3.5 bg-zinc-950/95 border border-amber-400/60 rounded-2xl shadow-[0_0_30px_rgba(251,191,36,0.3)] backdrop-blur-2xl text-white">
            <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
            <span className="text-sm font-medium">{toastMessage}</span>
            <button
              onClick={() => setToastMessage('')}
              className="p-1 hover:text-amber-400 text-zinc-400 transition-colors ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
