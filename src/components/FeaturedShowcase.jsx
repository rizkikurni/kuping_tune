import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Play, ExternalLink, Sparkles, Mic, DollarSign, Headphones } from 'lucide-react';
import { BUDGET_IEMS } from '../data/iemDatabase';

export default function FeaturedShowcase({ onStartTest }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const featuredList = [
    {
      id: 'tangzu-waner',
      rank: '#1',
      title: "Tangzu Wan'er S.G (The Vocal Specialist)",
      tagline: "Paling direkomendasikan untuk pecinta vokal hangat dan lagu pop santai.",
      description: "Dengan driver PET 10mm dan tuning bergaya Warm Neutral, Wan'er menghadirkan suara penyanyi yang intim di depan telingamu tanpa desis tajam.",
      driver: '10mm Dynamic Driver',
      price: 'Rp 260.000',
      tags: ['Vokal Intim', 'Non-Fatiguing', 'Best Seller']
    },
    {
      id: 'moondrop-chu-2',
      rank: '#2',
      title: "Moondrop Chu II (The Detail Master)",
      tagline: "Bodi full metal kokoh dengan kilau treble dan resolusi tinggi.",
      description: "Diafragma DLC (Diamond-Like Carbon) memberikan kecepatan respons dan detail petikan senar yang sangat renyah. Pilihan favorit untuk anime & J-Pop.",
      driver: '10mm DLC Dynamic Driver',
      price: 'Rp 320.000',
      tags: ['Treble Sparkle', 'Bodi Metal', 'Kabel Detachable']
    },
    {
      id: '7hz-zero-2',
      rank: '#3',
      title: "7Hz x Crinacle Zero: 2 (The All-Rounder)",
      tagline: "Hasil kolaborasi tuning Crinacle dengan bass punchy dan vokal bersih.",
      description: "Upgrade signifikan dari seri pertama dengan bass yang lebih berdaging namun midrange tetap jernih. Sangat ramah untuk pemula di segala genre.",
      driver: '10mm Dual Cavity PU+Metal',
      price: 'Rp 375.000',
      tags: ['Warm Harman', 'Bass Punchy', 'All-Rounder']
    }
  ];

  const current = featuredList[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredList.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredList.length) % featuredList.length);
  };

  return (
    <section style={{ padding: '60px 0 80px', background: 'var(--c-cream)' }}>
      <div className="container">
        
        {/* Section Heading matching screenshot "Hottest Show" */}
        <h2 style={{
          textAlign: 'center',
          fontSize: 'clamp(2rem, 4vw, 2.8rem)',
          fontWeight: 900,
          letterSpacing: '-0.035em',
          marginBottom: '40px',
          color: '#0E0F14'
        }}>
          Hottest IEM Showcase
        </h2>

        {/* Carousel Container with Arrows matching screenshot */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          maxWidth: '960px',
          margin: '0 auto'
        }}>
          
          {/* Left Arrow Button matching screenshot */}
          <button
            onClick={handlePrev}
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: '#FFFFFF',
              border: '2.5px solid #0E0F14',
              boxShadow: '3px 3px 0px #0E0F14',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'all 0.15s ease'
            }}
          >
            <ArrowLeft size={20} color="#0E0F14" strokeWidth={2.8} />
          </button>

          {/* Big Featured Yellow Card matching screenshot */}
          <div style={{
            background: 'var(--c-yellow)',
            border: '3px solid #0E0F14',
            borderRadius: '28px',
            boxShadow: '8px 8px 0px #0E0F14',
            padding: '32px',
            width: '100%',
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '32px',
            alignItems: 'center'
          }}>
            
            {/* Starburst Rank Badge on Top Left matching screenshot */}
            <div style={{
              position: 'absolute',
              top: '-16px',
              left: '-16px',
              width: '52px',
              height: '52px',
              background: 'var(--c-orange)',
              border: '2.5px solid #0E0F14',
              borderRadius: '14px',
              boxShadow: '3px 3px 0px #0E0F14',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '1.25rem',
              color: '#FFFFFF',
              transform: 'rotate(-8deg)',
              zIndex: 10
            }}>
              {current.rank}
            </div>

            {/* Left Graphic: Wavy Pattern with Character matching screenshot */}
            <div style={{
              width: '100%',
              height: '240px',
              borderRadius: '20px',
              border: '2.5px solid #0E0F14',
              boxShadow: '3px 3px 0px #0E0F14',
              overflow: 'hidden',
              background: 'var(--c-purple)',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Graphic wavy pattern in background */}
              <svg viewBox="0 0 280 240" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
                <path d="M0 40 Q70 10 140 40 T280 40 L280 0 L0 0 Z" fill="#FFDF34" />
                <path d="M0 100 Q70 70 140 100 T280 100 L280 60 Q210 30 140 60 T0 60 Z" fill="#FFDF34" />
                <path d="M0 160 Q70 130 140 160 T280 160 L280 120 Q210 90 140 120 T0 120 Z" fill="#FFDF34" />
                <path d="M0 220 Q70 190 140 220 T280 220 L280 180 Q210 150 140 180 T0 180 Z" fill="#FFDF34" />
              </svg>

              {/* Character listening */}
              <div style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <div style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  border: '2.5px solid #0E0F14',
                  boxShadow: '3px 3px 0px #0E0F14',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Headphones size={48} color="#6949FE" strokeWidth={2.4} />
                </div>
                <div style={{
                  marginTop: '10px',
                  background: 'var(--c-pink)',
                  border: '2px solid #0E0F14',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  fontWeight: 800
                }}>
                  Audition Pick
                </div>
              </div>
            </div>

            {/* Right Details matching screenshot */}
            <div>
              <h3 style={{
                fontSize: '1.65rem',
                fontWeight: 900,
                color: '#0E0F14',
                marginBottom: '8px',
                lineHeight: 1.2
              }}>
                {current.title}
              </h3>

              <p style={{
                fontSize: '0.92rem',
                color: '#262626',
                lineHeight: 1.5,
                marginBottom: '16px',
                fontWeight: 500
              }}>
                {current.description}
              </p>

              {/* Specs info */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#0E0F14',
                marginBottom: '18px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mic size={16} color="#6949FE" />
                  <span>{current.driver}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <DollarSign size={16} color="#FF7728" />
                  <span>Estimasi Harga: {current.price}</span>
                </div>
              </div>

              {/* Tag Pills matching screenshot */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                {current.tags.map((tag, i) => (
                  <span
                    key={i}
                    style={{
                      background: '#FFFFFF',
                      border: '2px solid #0E0F14',
                      padding: '4px 12px',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      boxShadow: '2px 2px 0px #0E0F14'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Purple Circular Play Button on Bottom Right matching screenshot */}
            <div
              onClick={() => onStartTest('test')}
              style={{
                position: 'absolute',
                bottom: '-16px',
                right: '-16px',
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                background: 'var(--c-purple)',
                border: '2.5px solid #0E0F14',
                boxShadow: '3px 3px 0px #0E0F14',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
                transition: 'transform 0.15s ease'
              }}
              title="Mulai Blind Test untuk IEM ini"
            >
              <Play size={20} fill="#FFFFFF" color="#FFFFFF" style={{ marginLeft: '3px' }} />
            </div>

          </div>

          {/* Right Arrow Button matching screenshot */}
          <button
            onClick={handleNext}
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'var(--c-pink)',
              border: '2.5px solid #0E0F14',
              boxShadow: '3px 3px 0px #0E0F14',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'all 0.15s ease'
            }}
          >
            <ArrowRight size={20} color="#0E0F14" strokeWidth={2.8} />
          </button>

        </div>

      </div>
    </section>
  );
}
