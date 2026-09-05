import React from 'react';
import { Play, Repeat, SkipBack, SkipForward, Shuffle } from 'lucide-react';

export default function HeroSection({ onStartTest, onOpenCatalog }) {
  return (
    <section style={{
      background: 'var(--c-purple)',
      padding: '40px 0 60px',
      color: '#FFFFFF',
      position: 'relative'
    }}>
      <div className="container">
        
        {/* Main Hero Row: Left Copy & Right Big Yellow Card */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '48px',
          alignItems: 'center',
          marginBottom: '50px'
        }}>
          
          {/* Left Column: Headline & Action Buttons */}
          <div style={{ maxWidth: '540px' }}>
            <h1 style={{
              fontSize: 'clamp(2.6rem, 5.2vw, 4.2rem)',
              color: '#FFFFFF',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.035em',
              marginBottom: '24px'
            }}>
              Tune In to Your True Hearing Profile
            </h1>

            <p style={{
              fontSize: '1.12rem',
              color: 'rgba(255, 255, 255, 0.9)',
              lineHeight: 1.6,
              marginBottom: '36px',
              fontWeight: 500
            }}>
              Uji preferensi karakter bass, vokal, dan treble secara objektif melalui <strong>A/B Blind Test</strong> interaktif tanpa pengaruh merek atau harga.
            </p>

            {/* Two Buttons matching screenshot: Yellow Pill + White How It Works Pill */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => onStartTest('test')}
                className="btn-neo btn-neo-yellow"
                style={{ padding: '14px 32px', fontSize: '1.02rem' }}
              >
                <span>Mulai Blind Test</span>
              </button>

              <button
                onClick={onOpenCatalog}
                className="btn-neo btn-neo-white"
                style={{ padding: '14px 28px', fontSize: '1.02rem' }}
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: '#0E0F14',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Play size={12} fill="#FFFFFF" color="#FFFFFF" style={{ marginLeft: '2px' }} />
                </div>
                <span>Katalog IEM Murah</span>
              </button>
            </div>
          </div>

          {/* Right Column: Big Yellow Card with Character & Floating Audio Player (From Screenshot) */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            
            {/* The Main Yellow Card */}
            <div style={{
              background: 'var(--c-yellow)',
              border: '3px solid #0E0F14',
              borderRadius: '32px',
              boxShadow: '8px 8px 0px #0E0F14',
              width: '100%',
              maxWidth: '440px',
              height: '420px',
              position: 'relative',
              overflow: 'visible',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center'
            }}>

              {/* Floating Orange Starburst Badge with Waveform (From Screenshot) */}
              <div style={{
                position: 'absolute',
                top: '-18px',
                left: '-18px',
                width: '64px',
                height: '64px',
                background: 'var(--c-orange)',
                border: '2.5px solid #0E0F14',
                borderRadius: '18px',
                boxShadow: '3px 3px 0px #0E0F14',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'rotate(-8deg)',
                zIndex: 10
              }}>
                {/* Simulated Waveform Icon in Starburst */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <div style={{ width: '4px', height: '14px', background: '#FFFFFF', borderRadius: '2px' }} />
                  <div style={{ width: '4px', height: '24px', background: '#FFFFFF', borderRadius: '2px' }} />
                  <div style={{ width: '4px', height: '18px', background: '#FFFFFF', borderRadius: '2px' }} />
                  <div style={{ width: '4px', height: '28px', background: '#FFFFFF', borderRadius: '2px' }} />
                  <div style={{ width: '4px', height: '16px', background: '#FFFFFF', borderRadius: '2px' }} />
                </div>
              </div>

              {/* Stylized SVG Illustration of Character with Headphones */}
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: '40px'
              }}>
                <svg viewBox="0 0 360 360" style={{ width: '85%', height: '85%' }}>
                  {/* Decorative backdrop shapes */}
                  <circle cx="180" cy="170" r="110" fill="#FFE765" />
                  <circle cx="180" cy="170" r="85" fill="#FFAEF0" stroke="#0E0F14" strokeWidth="3" />
                  
                  {/* Headphone arc */}
                  <path d="M120 150 C120 90, 240 90, 240 150" fill="none" stroke="#6949FE" strokeWidth="12" strokeLinecap="round" />
                  <path d="M120 150 C120 90, 240 90, 240 150" fill="none" stroke="#0E0F14" strokeWidth="4" />
                  
                  {/* Earcups */}
                  <rect x="108" y="140" width="24" height="42" rx="10" fill="#3CE0E5" stroke="#0E0F14" strokeWidth="3" />
                  <rect x="228" y="140" width="24" height="42" rx="10" fill="#3CE0E5" stroke="#0E0F14" strokeWidth="3" />

                  {/* Stylized Character Face */}
                  <circle cx="180" cy="165" r="48" fill="#FFDFC4" stroke="#0E0F14" strokeWidth="3" />
                  
                  {/* Hair */}
                  <path d="M140 150 C140 120, 220 120, 220 150 C210 135, 150 135, 140 150 Z" fill="#845EC2" stroke="#0E0F14" strokeWidth="3" />
                  
                  {/* Eyes (vibing with closed happy eyes) */}
                  <path d="M162 165 Q168 172 174 165" fill="none" stroke="#0E0F14" strokeWidth="3" strokeLinecap="round" />
                  <path d="M186 165 Q192 172 198 165" fill="none" stroke="#0E0F14" strokeWidth="3" strokeLinecap="round" />

                  {/* Smile */}
                  <path d="M174 184 Q180 192 186 184" fill="none" stroke="#0E0F14" strokeWidth="3" strokeLinecap="round" />

                  {/* Colorful Jacket (Purplish pink & turquoise like in the screenshot) */}
                  <path d="M135 210 Q180 230 225 210 L245 280 L115 280 Z" fill="#6949FE" stroke="#0E0F14" strokeWidth="3" />
                  <path d="M155 215 L180 280 L205 215" fill="#FFAEF0" stroke="#0E0F14" strokeWidth="3" />
                  <rect x="120" y="250" width="25" height="30" fill="#3CE0E5" stroke="#0E0F14" strokeWidth="3" />
                  <rect x="215" y="250" width="25" height="30" fill="#3CE0E5" stroke="#0E0F14" strokeWidth="3" />
                </svg>
              </div>

              {/* Floating Audio Player Card (From Screenshot) */}
              <div style={{
                position: 'absolute',
                bottom: '-28px',
                width: '92%',
                background: '#FFFFFF',
                border: '2.5px solid #0E0F14',
                borderRadius: '18px',
                boxShadow: '4px 4px 0px #0E0F14',
                padding: '12px 18px',
                color: '#0E0F14',
                zIndex: 20
              }}>
                {/* Scrubber Bar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.68rem', fontWeight: 800, color: 'var(--c-text-muted)', marginBottom: '4px' }}>
                  <span>10:32</span>
                  <span>26:50</span>
                </div>
                
                {/* Progress line with orange thumb */}
                <div style={{
                  width: '100%',
                  height: '6px',
                  background: '#E5E7EB',
                  borderRadius: '999px',
                  position: 'relative',
                  marginBottom: '10px'
                }}>
                  <div style={{
                    width: '65%',
                    height: '100%',
                    background: 'var(--c-orange)',
                    borderRadius: '999px',
                    position: 'relative'
                  }}>
                    <div style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: 'var(--c-orange)',
                      border: '2px solid #FFFFFF',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
                      position: 'absolute',
                      right: '-6px',
                      top: '-3px'
                    }} />
                  </div>
                </div>

                {/* Player Controls matching screenshot */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Repeat size={14} color="#9CA3AF" />
                  <SkipBack size={15} color="#0E0F14" fill="#0E0F14" />
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: 'var(--c-orange)',
                    border: '1.5px solid #0E0F14',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}>
                    <Play size={13} fill="#FFFFFF" color="#FFFFFF" style={{ marginLeft: '2px' }} />
                  </div>
                  <SkipForward size={15} color="#0E0F14" fill="#0E0F14" />
                  <Shuffle size={14} color="#9CA3AF" />
                </div>

                {/* Playful Pink Dot on Left and Orange Starburst on Right */}
                <div style={{
                  position: 'absolute',
                  top: '-8px',
                  left: '-8px',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: 'var(--c-pink)',
                  border: '2px solid #0E0F14'
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: '-8px',
                  right: '-8px',
                  width: '18px',
                  height: '18px',
                  borderRadius: '6px',
                  background: 'var(--c-orange)',
                  border: '2px solid #0E0F14',
                  transform: 'rotate(15deg)'
                }} />
              </div>

            </div>
          </div>

        </div>

        {/* The Pink Stats Box (Directly from Screenshot) */}
        <div style={{
          background: 'var(--c-pink)',
          border: '2.5px solid #0E0F14',
          borderRadius: '24px',
          boxShadow: '6px 6px 0px #0E0F14',
          padding: '24px 32px',
          color: '#0E0F14',
          marginTop: '60px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            
            {/* Stat 1 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
              {/* White dual pill speaker icon from screenshot */}
              <div style={{
                width: '44px',
                height: '32px',
                background: '#FFFFFF',
                border: '2px solid #0E0F14',
                borderRadius: '999px',
                boxShadow: '2px 2px 0px #0E0F14',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '3px'
              }}>
                <div style={{ width: '4px', height: '16px', background: '#0E0F14', borderRadius: '2px' }} />
                <div style={{ width: '4px', height: '10px', background: '#0E0F14', borderRadius: '2px' }} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '1.75rem', fontWeight: 900, lineHeight: 1 }}>5 Ronde</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'rgba(14, 15, 20, 0.75)' }}>A/B Blind Test Akustik</div>
              </div>
            </div>

            {/* Stat 2 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
              <div style={{
                width: '44px',
                height: '32px',
                background: '#FFFFFF',
                border: '2px solid #0E0F14',
                borderRadius: '999px',
                boxShadow: '2px 2px 0px #0E0F14',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '3px'
              }}>
                <div style={{ width: '4px', height: '12px', background: '#0E0F14', borderRadius: '2px' }} />
                <div style={{ width: '4px', height: '18px', background: '#0E0F14', borderRadius: '2px' }} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '1.75rem', fontWeight: 900, lineHeight: 1 }}>100% Netral</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'rgba(14, 15, 20, 0.75)' }}>Equal Loudness DSP</div>
              </div>
            </div>

            {/* Stat 3 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
              <div style={{
                width: '44px',
                height: '32px',
                background: '#FFFFFF',
                border: '2px solid #0E0F14',
                borderRadius: '999px',
                boxShadow: '2px 2px 0px #0E0F14',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '3px'
              }}>
                <div style={{ width: '4px', height: '18px', background: '#0E0F14', borderRadius: '2px' }} />
                <div style={{ width: '4px', height: '14px', background: '#0E0F14', borderRadius: '2px' }} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '1.75rem', fontWeight: 900, lineHeight: 1 }}>8+ IEM Pilihan</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'rgba(14, 15, 20, 0.75)' }}>Katalog Budget Juara</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
