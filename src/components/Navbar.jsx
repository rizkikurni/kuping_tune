import React from 'react';
import KupingTuneLogo from './KupingTuneLogo';
import { Sparkles, Headphones } from 'lucide-react';

export default function Navbar({ onStartTest, onOpenCatalog, activeView }) {
  const isHeroActive = activeView === 'hero';
  const isTestActive = activeView === 'test' || activeView === 'result';
  const isCatalogActive = activeView === 'catalog';

  return (
    <nav style={{
      background: 'var(--c-purple)',
      padding: '16px 0',
      color: '#FFFFFF',
      borderBottom: '3px solid #0E0F14',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 4px 0px rgba(14, 15, 20, 0.15)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Brand Logo with KupingTune Custom Iconic Badge */}
        <KupingTuneLogo onClick={() => onStartTest('hero')} />

        {/* Center Menu with Yellow Indicator for the Active Page */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: 700,
          fontSize: '0.92rem'
        }} className="nav-links-desktop">
          {/* Beranda / Home Link */}
          <button
            type="button"
            onClick={() => onStartTest('hero')}
            className={isHeroActive ? 'nav-pill-active' : ''}
            style={{
              background: isHeroActive ? 'var(--c-yellow)' : 'transparent',
              color: isHeroActive ? '#0E0F14' : '#FFFFFF',
              border: isHeroActive ? '2px solid #0E0F14' : '2px solid transparent',
              borderRadius: '999px',
              padding: '7px 18px',
              cursor: 'pointer',
              fontSize: '0.92rem',
              fontWeight: isHeroActive ? 900 : 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.18s ease'
            }}
          >
            {isHeroActive && <span className="live-pulse-dot" style={{ background: 'var(--c-orange)' }} />}
            <span>Beranda</span>
          </button>


          {/* Blind Test Link (Highlighted in Yellow when active!) */}
          <button
            type="button"
            onClick={() => onStartTest('test')}
            className={isTestActive ? 'nav-pill-active' : ''}
            style={{
              background: isTestActive ? 'var(--c-yellow)' : 'transparent',
              color: isTestActive ? '#0E0F14' : '#FFFFFF',
              border: isTestActive ? '2px solid #0E0F14' : '2px solid transparent',
              borderRadius: '999px',
              padding: '7px 18px',
              cursor: 'pointer',
              fontSize: '0.92rem',
              fontWeight: isTestActive ? 900 : 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.18s ease'
            }}
          >
            {isTestActive && <span className="live-pulse-dot" />}
            <span>Blind Test</span>
          </button>


          {/* Katalog IEM Link (Highlighted in Yellow when active!) */}
          <button
            type="button"
            onClick={onOpenCatalog}
            className={isCatalogActive ? 'nav-pill-active' : ''}
            style={{
              background: isCatalogActive ? 'var(--c-yellow)' : 'transparent',
              color: isCatalogActive ? '#0E0F14' : '#FFFFFF',
              border: isCatalogActive ? '2px solid #0E0F14' : '2px solid transparent',
              borderRadius: '999px',
              padding: '7px 18px',
              cursor: 'pointer',
              fontSize: '0.92rem',
              fontWeight: isCatalogActive ? 900 : 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.18s ease'
            }}
          >
            {isCatalogActive && <span className="live-pulse-dot" style={{ background: 'var(--c-purple)' }} />}
            <span>Katalog IEM</span>
          </button>
        </div>

        {/* Right Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Home Button */}
          <button
            type="button"
            onClick={() => onStartTest('hero')}
            style={{
              background: isHeroActive ? 'var(--c-yellow)' : 'transparent',
              border: isHeroActive ? '2px solid #0E0F14' : '1.5px solid rgba(255, 255, 255, 0.45)',
              color: isHeroActive ? '#0E0F14' : '#FFFFFF',
              boxShadow: isHeroActive ? '2px 2px 0px #0E0F14' : 'none',
              borderRadius: 'var(--radius-pill)',
              padding: '8px 20px',
              fontSize: '0.88rem',
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            Home
          </button>

          {/* Start Test / Active Session Button */}
          <button
            type="button"
            onClick={() => onStartTest('test')}
            className={isTestActive ? "btn-neo btn-neo-yellow" : "btn-neo btn-neo-white"}
            style={{
              padding: '8px 22px',
              fontSize: '0.88rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {isTestActive ? (
              <>
                <span className="live-pulse-dot" />
                <span>Sesi Aktif</span>
              </>
            ) : (
              <>
                <Headphones size={15} />
                <span>Mulai Test</span>
              </>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
