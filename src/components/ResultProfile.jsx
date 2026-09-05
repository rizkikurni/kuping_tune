import React from 'react';
import RadarChart from './RadarChart';
import { RotateCcw, ArrowDown, Award, Sparkles, Music, CheckCircle2 } from 'lucide-react';

export default function ResultProfile({ resultData, onRetest, onScrollToRecs }) {
  const { userVector, archetype, labels, recommendations } = resultData;
  const topMatch = recommendations[0];

  return (
    <section style={{ padding: '50px 0 80px', background: 'var(--c-cream)' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        
        {/* Header Badge & Title */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            display: 'inline-block',
            background: 'var(--c-pink)',
            border: '2px solid #0E0F14',
            borderRadius: '999px',
            padding: '6px 18px',
            fontWeight: 900,
            fontSize: '0.85rem',
            boxShadow: '3px 3px 0px #0E0F14',
            marginBottom: '16px'
          }}>
            🎉 HASIL BLIND TEST LENGKAP
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontWeight: 900, marginBottom: '12px' }}>
            Personal Sound Profile-mu
          </h1>
          <p style={{ color: 'var(--c-text-muted)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto', fontWeight: 600 }}>
            Hasil murni dari preferensi kupingmu sendiri setelah melewati 5 ronde uji pendengaran objektif.
          </p>
        </div>

        {/* Persona & Radar Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '28px',
          marginBottom: '40px'
        }}>
          
          {/* Left Panel: Big Yellow Persona Card (from screenshot style) */}
          <div style={{
            background: 'var(--c-yellow)',
            border: '3px solid #0E0F14',
            borderRadius: '28px',
            boxShadow: '8px 8px 0px #0E0F14',
            padding: '36px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            {/* Top Starburst Badge with Emoji */}
            <div style={{
              position: 'absolute',
              top: '-18px',
              left: '-18px',
              width: '56px',
              height: '56px',
              background: 'var(--c-orange)',
              border: '2.5px solid #0E0F14',
              borderRadius: '16px',
              boxShadow: '3px 3px 0px #0E0F14',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.6rem',
              transform: 'rotate(-8deg)'
            }}>
              {archetype.emoji}
            </div>

            <div>
              <div style={{
                display: 'inline-block',
                background: '#FFFFFF',
                border: '2px solid #0E0F14',
                padding: '4px 12px',
                borderRadius: '999px',
                fontWeight: 900,
                fontSize: '0.78rem',
                boxShadow: '2px 2px 0px #0E0F14',
                marginBottom: '16px',
                marginTop: '10px'
              }}>
                AUDIO PERSONA ARCHETYPE
              </div>

              <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '6px', lineHeight: 1.15 }}>
                {archetype.name}
              </h2>
              <p style={{ fontWeight: 800, fontSize: '1rem', color: '#6949FE', marginBottom: '18px' }}>
                "{archetype.tagline}"
              </p>

              <p style={{ fontSize: '0.96rem', color: '#1F2937', lineHeight: 1.6, marginBottom: '24px', fontWeight: 600 }}>
                {archetype.description}
              </p>

              {/* Genre Pills */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0E0F14', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Genre Paling Cocok:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {archetype.preferredGenres.map((genre, idx) => (
                    <span key={idx} style={{
                      background: '#FFFFFF',
                      border: '2px solid #0E0F14',
                      padding: '4px 12px',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      boxShadow: '2px 2px 0px #0E0F14'
                    }}>
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Match Preview */}
            {topMatch && (
              <div style={{
                background: '#FFFFFF',
                border: '2.5px solid #0E0F14',
                borderRadius: '16px',
                padding: '16px 20px',
                boxShadow: '4px 4px 0px #0E0F14',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--c-text-muted)' }}>
                    TOP REKOMENDASI IEM
                  </div>
                  <div style={{ fontWeight: 900, fontSize: '1.15rem' }}>
                    {topMatch.name}
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#FF7728' }}>
                    {topMatch.priceFormatted}
                  </div>
                </div>

                <div style={{
                  background: 'var(--c-yellow)',
                  border: '2px solid #0E0F14',
                  borderRadius: '12px',
                  padding: '8px 14px',
                  fontWeight: 900,
                  fontSize: '1.1rem',
                  boxShadow: '2px 2px 0px #0E0F14'
                }}>
                  {topMatch.matchScore}%
                </div>
              </div>
            )}

          </div>

          {/* Right Panel: Radar Chart */}
          <div style={{
            background: 'var(--c-purple)',
            border: '3px solid #0E0F14',
            borderRadius: '28px',
            boxShadow: '8px 8px 0px #0E0F14',
            padding: '36px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '16px', color: '#FFFFFF' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.08em' }}>
                SPIDER ACOUSTIC GRAPH
              </div>
              <div style={{ fontSize: '1.3rem', fontWeight: 900 }}>
                Peta Preferensi Suara
              </div>
            </div>

            <RadarChart vector={userVector} size={320} />
          </div>

        </div>

        {/* 5 Specific Preference Cards */}
        <div style={{
          background: '#FFFFFF',
          border: '3px solid #0E0F14',
          borderRadius: '24px',
          boxShadow: '6px 6px 0px #0E0F14',
          padding: '32px',
          marginBottom: '40px'
        }}>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 900, marginBottom: '20px', textAlign: 'center' }}>
            Rincian 5 Parameter Telingamu
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '16px'
          }}>
            {/* Bass */}
            <div style={{
              background: 'var(--c-yellow)',
              border: '2px solid #0E0F14',
              borderRadius: '16px',
              padding: '16px',
              boxShadow: '3px 3px 0px #0E0F14',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0E0F14' }}>BASS PREFERENCE</div>
              <div style={{ fontWeight: 900, fontSize: '1.05rem', marginTop: '4px' }}>{labels.bass}</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, marginTop: '4px' }}>{userVector.bass}% Power</div>
            </div>

            {/* Mid */}
            <div style={{
              background: 'var(--c-pink)',
              border: '2px solid #0E0F14',
              borderRadius: '16px',
              padding: '16px',
              boxShadow: '3px 3px 0px #0E0F14',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0E0F14' }}>MID PREFERENCE</div>
              <div style={{ fontWeight: 900, fontSize: '1.05rem', marginTop: '4px' }}>{labels.mid}</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, marginTop: '4px' }}>{userVector.mid}% Clarity</div>
            </div>

            {/* Treble */}
            <div style={{
              background: '#E9D5FF',
              border: '2px solid #0E0F14',
              borderRadius: '16px',
              padding: '16px',
              boxShadow: '3px 3px 0px #0E0F14',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0E0F14' }}>TREBLE PREFERENCE</div>
              <div style={{ fontWeight: 900, fontSize: '1.05rem', marginTop: '4px' }}>{labels.treble}</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, marginTop: '4px' }}>{userVector.treble}% Sparkle</div>
            </div>

            {/* Stage */}
            <div style={{
              background: '#BAE6FD',
              border: '2px solid #0E0F14',
              borderRadius: '16px',
              padding: '16px',
              boxShadow: '3px 3px 0px #0E0F14',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0E0F14' }}>STAGE PREFERENCE</div>
              <div style={{ fontWeight: 900, fontSize: '1.05rem', marginTop: '4px' }}>{labels.stage}</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, marginTop: '4px' }}>{userVector.stage}% Width</div>
            </div>

            {/* Detail */}
            <div style={{
              background: '#BBF7D0',
              border: '2px solid #0E0F14',
              borderRadius: '16px',
              padding: '16px',
              boxShadow: '3px 3px 0px #0E0F14',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0E0F14' }}>DETAIL PREFERENCE</div>
              <div style={{ fontWeight: 900, fontSize: '1.05rem', marginTop: '4px' }}>{labels.detail}</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, marginTop: '4px' }}>{userVector.detail}% Resolution</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={onScrollToRecs}
            className="btn-neo btn-neo-yellow"
            style={{ padding: '16px 36px', fontSize: '1.05rem' }}
          >
            <Sparkles size={18} />
            <span>Lihat Semua Rekomendasi IEM Tepat Untukmu</span>
            <ArrowDown size={18} />
          </button>

          <button
            onClick={onRetest}
            className="btn-neo btn-neo-white"
            style={{ padding: '16px 28px', fontSize: '1rem' }}
          >
            <RotateCcw size={16} />
            <span>Ulangi Blind Test</span>
          </button>
        </div>

      </div>
    </section>
  );
}
