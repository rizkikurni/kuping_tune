import React, { useState, useEffect } from 'react';
import { ROUND_DEFINITIONS } from '../audio/roundFilters';
import { audioEngine } from '../audio/audioEngine';
import WaveformVisualizer from './WaveformVisualizer';
import AudioControls from './AudioControls';
import { ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react';

export default function BlindArena({ onCompleteTest, onExit }) {
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSample, setActiveSample] = useState('A');
  const [answers, setAnswers] = useState({});
  const [selectedChoice, setSelectedChoice] = useState(null);

  const currentRound = ROUND_DEFINITIONS[currentRoundIndex];
  const totalRounds = ROUND_DEFINITIONS.length;
  const progressPercent = ((currentRoundIndex + 1) / totalRounds) * 100;

  useEffect(() => {
    audioEngine.setRound(currentRoundIndex);
    setSelectedChoice(answers[currentRound.id] || null);

    if (!audioEngine.isPlaying) {
      audioEngine.play();
    }
  }, [currentRoundIndex]);

  // Sync state directly with audioEngine singleton
  useEffect(() => {
    const unsubscribe = audioEngine.subscribe((state) => {
      if (typeof state.isPlaying === 'boolean') {
        setIsPlaying(state.isPlaying);
      }
      if (state.activeSample) {
        setActiveSample(state.activeSample);
      }
    });

    return () => {
      unsubscribe();
      audioEngine.pause();
    };
  }, []);

  const handleSelectChoice = (choice) => {
    setSelectedChoice(choice);
    setAnswers(prev => ({
      ...prev,
      [currentRound.id]: choice
    }));
  };

  const handleNextRound = () => {
    if (!selectedChoice) return;

    if (currentRoundIndex < totalRounds - 1) {
      setCurrentRoundIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      audioEngine.pause();
      setIsPlaying(false);
      onCompleteTest(answers);
    }
  };

  const handlePrevRound = () => {
    if (currentRoundIndex > 0) {
      setCurrentRoundIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      audioEngine.pause();
      onExit();
    }
  };

  return (
    <section style={{ padding: '40px 0 80px', background: 'var(--c-cream)' }}>
      <div className="container" style={{ maxWidth: '880px' }}>
        
        {/* Top Navigation & Progress Bar */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '14px'
          }}>
            <button
              onClick={handlePrevRound}
              className="btn-neo btn-neo-white"
              style={{
                padding: '8px 18px',
                fontSize: '0.85rem'
              }}
            >
              <ArrowLeft size={16} />
              <span>{currentRoundIndex === 0 ? 'Keluar' : 'Ronde Sebelumnya'}</span>
            </button>

            {/* Pink Progress Badge */}
            <div style={{
              background: 'var(--c-pink)',
              border: '2px solid #0E0F14',
              borderRadius: '999px',
              padding: '6px 16px',
              fontWeight: 900,
              fontSize: '0.85rem',
              boxShadow: '2px 2px 0px #0E0F14'
            }}>
              Ronde {currentRoundIndex + 1} dari {totalRounds}
            </div>
          </div>

          {/* Progress Bar with Neo-Brutalist border */}
          <div style={{
            width: '100%',
            height: '10px',
            background: '#FFFFFF',
            border: '2px solid #0E0F14',
            borderRadius: '999px',
            overflow: 'hidden',
            boxShadow: '2px 2px 0px #0E0F14'
          }}>
            <div style={{
              width: `${progressPercent}%`,
              height: '100%',
              background: 'var(--c-orange)',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>

        {/* The Main Arena Card in Neo-Brutalist Pop Style */}
        <div style={{
          background: '#FFFFFF',
          border: '3px solid #0E0F14',
          borderRadius: '28px',
          boxShadow: '8px 8px 0px #0E0F14',
          padding: '36px',
          position: 'relative',
          marginBottom: '32px'
        }}>
          
          {/* Starburst Round Number Badge matching screenshot */}
          <div style={{
            position: 'absolute',
            top: '-18px',
            left: '-18px',
            width: '54px',
            height: '54px',
            background: 'var(--c-orange)',
            border: '2.5px solid #0E0F14',
            borderRadius: '16px',
            boxShadow: '3px 3px 0px #0E0F14',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
            fontSize: '1.25rem',
            color: '#FFFFFF',
            transform: 'rotate(-6deg)',
            zIndex: 10
          }}>
            #{currentRound.id}
          </div>

          {/* Round Header & Instructions */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{
              display: 'inline-block',
              background: 'var(--c-yellow)',
              border: '2px solid #0E0F14',
              borderRadius: '999px',
              padding: '4px 14px',
              fontWeight: 800,
              fontSize: '0.78rem',
              boxShadow: '2px 2px 0px #0E0F14',
              marginBottom: '12px'
            }}>
              FOKUS UJI: {currentRound.dimension}
            </div>

            <h2 style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.3rem)', fontWeight: 900, marginBottom: '8px' }}>
              {currentRound.title}
            </h2>
            <p style={{ color: '#4B5563', fontSize: '1rem', maxWidth: '600px', margin: '0 auto', fontWeight: 500 }}>
              {currentRound.subtitle}
            </p>
          </div>

          {/* Spectrum Analyzer Box */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '8px',
              fontSize: '0.78rem',
              fontWeight: 800
            }}>
              <span style={{ color: 'var(--c-text-muted)' }}>LIVE AUDIO SPECTRUM</span>
              <span style={{
                background: activeSample === 'A' ? 'var(--c-yellow)' : 'var(--c-pink)',
                border: '1.5px solid #0E0F14',
                padding: '2px 8px',
                borderRadius: '6px'
              }}>
                MENDENGARKAN: SAMPLE {activeSample}
              </span>
            </div>

            <WaveformVisualizer isPlaying={isPlaying} activeSample={activeSample} />
          </div>

          {/* Audio Controls */}
          <div style={{ marginBottom: '36px' }}>
            <AudioControls
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              activeSample={activeSample}
              setActiveSample={setActiveSample}
            />
          </div>

          {/* Decision Section */}
          <div style={{
            borderTop: '2px solid #0E0F14',
            paddingTop: '28px',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 900, marginBottom: '6px' }}>
              {currentRound.description}
            </h3>
            <p style={{ color: 'var(--c-text-muted)', fontSize: '0.88rem', marginBottom: '24px' }}>
              Dengarkan baik-baik, lalu pilih mana yang paling nyaman di telingamu.
            </p>

            {/* 3 Choice Cards in Neo-Brutal Style */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
              marginBottom: '32px'
            }}>
              {/* Option A (Yellow card) */}
              <button
                id="choice-sample-a"
                type="button"
                onClick={() => handleSelectChoice('A')}
                style={{
                  padding: '20px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  borderRadius: '18px',
                  border: '2.5px solid #0E0F14',
                  background: selectedChoice === 'A' ? 'var(--c-yellow)' : '#FFFFFF',
                  boxShadow: selectedChoice === 'A' ? '6px 6px 0px #0E0F14' : '3px 3px 0px #0E0F14',
                  transform: selectedChoice === 'A' ? 'translate(-2px, -2px)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: '#0E0F14',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900
                  }}>
                    A
                  </span>
                  {selectedChoice === 'A' && (
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: '#0E0F14',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Check size={16} color="#FFFFFF" strokeWidth={3} />
                    </div>
                  )}
                </div>
                <div style={{ fontWeight: 900, fontSize: '1.1rem', marginBottom: '4px' }}>
                  Lebih Suka Sample A
                </div>
                <div style={{ fontSize: '0.82rem', color: '#4B5563', fontWeight: 600 }}>
                  Karakter suara A terasa lebih enak dan pas di telingamu.
                </div>
              </button>

              {/* Option B (Pink card) */}
              <button
                id="choice-sample-b"
                type="button"
                onClick={() => handleSelectChoice('B')}
                style={{
                  padding: '20px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  borderRadius: '18px',
                  border: '2.5px solid #0E0F14',
                  background: selectedChoice === 'B' ? 'var(--c-pink)' : '#FFFFFF',
                  boxShadow: selectedChoice === 'B' ? '6px 6px 0px #0E0F14' : '3px 3px 0px #0E0F14',
                  transform: selectedChoice === 'B' ? 'translate(-2px, -2px)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: '#0E0F14',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900
                  }}>
                    B
                  </span>
                  {selectedChoice === 'B' && (
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: '#0E0F14',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Check size={16} color="#FFFFFF" strokeWidth={3} />
                    </div>
                  )}
                </div>
                <div style={{ fontWeight: 900, fontSize: '1.1rem', marginBottom: '4px' }}>
                  Lebih Suka Sample B
                </div>
                <div style={{ fontSize: '0.82rem', color: '#4B5563', fontWeight: 600 }}>
                  Karakter suara B terasa lebih memuaskan untuk lagunya.
                </div>
              </button>

              {/* Option Indifferent (White/Cream card) */}
              <button
                id="choice-sample-indifferent"
                type="button"
                onClick={() => handleSelectChoice('indifferent')}
                style={{
                  padding: '20px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  borderRadius: '18px',
                  border: '2.5px solid #0E0F14',
                  background: selectedChoice === 'indifferent' ? '#E5E7EB' : '#FFFFFF',
                  boxShadow: selectedChoice === 'indifferent' ? '6px 6px 0px #0E0F14' : '3px 3px 0px #0E0F14',
                  transform: selectedChoice === 'indifferent' ? 'translate(-2px, -2px)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: '#0E0F14',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900
                  }}>
                    ≈
                  </span>
                  {selectedChoice === 'indifferent' && (
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: '#0E0F14',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Check size={16} color="#FFFFFF" strokeWidth={3} />
                    </div>
                  )}
                </div>
                <div style={{ fontWeight: 900, fontSize: '1.1rem', marginBottom: '4px' }}>
                  Tidak Bisa Membedakan
                </div>
                <div style={{ fontSize: '0.82rem', color: '#4B5563', fontWeight: 600 }}>
                  Kedua sampel terdengar sama atau bedanya sangat tipis.
                </div>
              </button>
            </div>

            {/* Next Round Button */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                id="btn-next-round"
                type="button"
                onClick={handleNextRound}
                disabled={!selectedChoice}
                className="btn-neo btn-neo-yellow"
                style={{
                  padding: '16px 42px',
                  fontSize: '1.05rem',
                  opacity: selectedChoice ? 1 : 0.4,
                  cursor: selectedChoice ? 'pointer' : 'not-allowed'
                }}
              >
                <span>{currentRoundIndex < totalRounds - 1 ? 'Lanjut ke Ronde Berikutnya' : 'Selesai & Lihat Profil Suaramu'}</span>
                {currentRoundIndex < totalRounds - 1 ? <ArrowRight size={20} /> : <Sparkles size={20} />}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
