import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturedShowcase from './components/FeaturedShowcase';
import BlindArena from './components/BlindArena';
import ResultProfile from './components/ResultProfile';
import RecommendationList from './components/RecommendationList';
import { calculateProfileAndRecommendations } from './utils/scoringEngine';
import { audioEngine } from './audio/audioEngine';
import KupingTuneLogo from './components/KupingTuneLogo';
import { Headphones } from 'lucide-react';

function App() {
  const [activeView, setActiveView] = useState('hero'); // 'hero' | 'test' | 'result' | 'catalog'
  const [resultData, setResultData] = useState(null);

  // Background audio preloading during idle time on initial app load
  useEffect(() => {
    const triggerPreload = () => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => {
          audioEngine.preload();
        }, { timeout: 2500 });
      } else {
        setTimeout(() => {
          audioEngine.preload();
        }, 1200);
      }
    };

    triggerPreload();
  }, []);

  const defaultCatalogData = calculateProfileAndRecommendations({
    1: 'indifferent',
    2: 'indifferent',
    3: 'indifferent',
    4: 'indifferent',
    5: 'indifferent'
  });

  const handleStartTest = (view = 'test') => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCatalog = () => {
    setActiveView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteTest = (answers) => {
    const profile = calculateProfileAndRecommendations(answers);
    setResultData(profile);
    setActiveView('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToRecs = () => {
    const recSection = document.getElementById('recommendations-section');
    if (recSection) {
      recSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--c-cream)' }}>
      {/* 1. Header Navigation in Vivid Royal Purple */}
      <Navbar 
        onStartTest={handleStartTest} 
        onOpenCatalog={handleOpenCatalog}
        activeView={activeView}
      />

      <main style={{ flex: 1 }}>
        {/* 2. Hero Landing Page + Hottest Show Showcase */}
        {activeView === 'hero' && (
          <div key="hero" className="animate-page-enter">
            <HeroSection 
              onStartTest={handleStartTest}
              onOpenCatalog={handleOpenCatalog}
            />
            <FeaturedShowcase 
              onStartTest={handleStartTest}
            />
          </div>
        )}

        {/* 3. Interactive Blind Arena (5-Round Test) */}
        {activeView === 'test' && (
          <div key="test" className="animate-page-enter">
            <BlindArena 
              onCompleteTest={handleCompleteTest}
              onExit={() => setActiveView('hero')}
            />
          </div>
        )}

        {/* 4. Test Results & Persona Profile */}
        {activeView === 'result' && resultData && (
          <div key="result" className="animate-page-enter">
            <ResultProfile 
              resultData={resultData}
              onRetest={() => handleStartTest('test')}
              onScrollToRecs={handleScrollToRecs}
            />
            <RecommendationList 
              recommendations={resultData.recommendations}
              userVector={resultData.userVector}
            />
          </div>
        )}

        {/* 5. Standalone Catalog View */}
        {activeView === 'catalog' && (
          <div key="catalog" className="animate-page-enter" style={{ paddingTop: '30px' }}>
            <div className="container" style={{ textAlign: 'center', marginBottom: '20px' }}>


              <div style={{
                background: 'var(--c-yellow)',
                border: '3px solid #0E0F14',
                borderRadius: '24px',
                boxShadow: '6px 6px 0px #0E0F14',
                padding: '24px 32px',
                maxWidth: '780px',
                margin: '0 auto 30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
                textAlign: 'left'
              }}>
                <div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 900, marginBottom: '4px' }}>
                    Mau rekomendasi yang paling pas untukmu?
                  </h3>
                  <p style={{ color: '#262626', fontSize: '0.92rem', fontWeight: 600 }}>
                    Ikuti 5 ronde A/B Blind Test untuk mengetahui karakter suara yang benar-benar kamu sukai.
                  </p>
                </div>
                <button
                  onClick={() => handleStartTest('test')}
                  className="btn-neo btn-neo-purple"
                  style={{ padding: '12px 24px', fontSize: '0.92rem' }}
                >
                  <Headphones size={18} />
                  <span>Mulai Test</span>
                </button>
              </div>
            </div>

            <RecommendationList 
              recommendations={defaultCatalogData.recommendations}
              userVector={defaultCatalogData.userVector}
            />
          </div>
        )}
      </main>

      {/* Modern Pop Neo-Brutalism Footer */}
      <footer style={{
        background: '#0E0F14',
        borderTop: '3px solid #0E0F14',
        padding: '36px 0',
        color: '#FFFFFF',
        marginTop: 'auto'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <KupingTuneLogo showText={true} size={36} textColor="#FFFFFF" onClick={() => handleStartTest('hero')} />

          <div style={{ fontSize: '0.85rem', color: '#9CA3AF', fontWeight: 600 }}>
            RizkiKurni@2026
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
