import React from 'react';
import { Headphones, Sparkles } from 'lucide-react';

export default function Navbar({ onStartTest, onOpenCatalog, activeView }) {
  return (
    <nav style={{
      background: 'var(--c-purple)',
      padding: '20px 0',
      color: '#FFFFFF'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Brand Logo matching screenshot: Orange square + PodCraze. */}
        <div 
          onClick={() => onStartTest('hero')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer'
          }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'var(--c-orange)',
            border: '2px solid #0E0F14',
            boxShadow: '2px 2px 0px #0E0F14',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Headphones size={22} color="#FFFFFF" strokeWidth={2.6} />
          </div>
          <span style={{
            fontWeight: 800,
            fontSize: '1.45rem',
            letterSpacing: '-0.03em',
            color: '#FFFFFF'
          }}>
            PodCraze<span style={{ color: 'var(--c-orange)' }}>.</span>
          </span>
        </div>

        {/* Center Menu with Orange Dot Separators (from screenshot) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          fontWeight: 600,
          fontSize: '0.92rem'
        }} className="nav-links-desktop">
          <span 
            onClick={() => onStartTest('hero')}
            style={{ cursor: 'pointer', opacity: activeView === 'hero' ? 1 : 0.85 }}
          >
            About
          </span>
          <span style={{ color: 'var(--c-orange)', fontSize: '0.8rem' }}>●</span>
          <span 
            onClick={() => onStartTest('test')}
            style={{ cursor: 'pointer', opacity: activeView === 'test' ? 1 : 0.85 }}
          >
            Blind Test
          </span>
          <span style={{ color: 'var(--c-orange)', fontSize: '0.8rem' }}>●</span>
          <span 
            onClick={onOpenCatalog}
            style={{ cursor: 'pointer', opacity: activeView === 'catalog' ? 1 : 0.85 }}
          >
            Katalog IEM
          </span>
          <span style={{ color: 'var(--c-orange)', fontSize: '0.8rem' }}>●</span>
          <span style={{ opacity: 0.85, cursor: 'pointer' }}>FAQ</span>
          <span style={{ color: 'var(--c-orange)', fontSize: '0.8rem' }}>●</span>
          <span style={{ opacity: 0.85, cursor: 'pointer' }}>Blog</span>
        </div>

        {/* Right Auth / Action Buttons matching screenshot */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => onStartTest('hero')}
            style={{
              background: 'transparent',
              border: '1.5px solid rgba(255, 255, 255, 0.4)',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-pill)',
              padding: '8px 20px',
              fontSize: '0.88rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Home
          </button>

          <button
            onClick={() => onStartTest('test')}
            className="btn-neo btn-neo-white"
            style={{
              padding: '8px 22px',
              fontSize: '0.88rem'
            }}
          >
            <span>{activeView === 'test' ? 'Sesi Aktif' : 'Mulai Test'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
