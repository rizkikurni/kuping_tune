import React, { useState, useEffect } from 'react';
import { ROUND_DEFINITIONS } from '../audio/roundFilters';
import { audioEngine } from '../audio/audioEngine';
import WaveformVisualizer from './WaveformVisualizer';
import AudioControls from './AudioControls';
import TrackSelectorModal from './TrackSelectorModal';
import { ArrowLeft, ArrowRight, Check, Sparkles, Music, Sliders } from 'lucide-react';

export default function BlindArena({ onCompleteTest, onExit }) {
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSample, setActiveSample] = useState('A');
  const [answers, setAnswers] = useState({});
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(audioEngine.currentTrack);
  const [isAudioLoading, setIsAudioLoading] = useState(!audioEngine.isReady);

  const currentRound = ROUND_DEFINITIONS[currentRoundIndex];
  const totalRounds = ROUND_DEFINITIONS.length;
  const progressPercent = ((currentRoundIndex + 1) / totalRounds) * 100;

  const hasAutoStartedRef = React.useRef(false);

  useEffect(() => {
    audioEngine.setRound(currentRoundIndex);
    setSelectedChoice(answers[currentRound.id] || null);

    // If already playing, keep playing new round filters. If initial mount and ready, play.
    if (!hasAutoStartedRef.current && audioEngine.isReady && !audioEngine.isPlaying) {
      hasAutoStartedRef.current = true;
      audioEngine.play().catch(() => {});
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
      if (state.currentTrack) {
        setCurrentTrack(state.currentTrack);
      }
      if (typeof state.isLoading === 'boolean') {
        setIsAudioLoading(state.isLoading);
      }
      if (typeof state.isReady === 'boolean') {
        setIsAudioLoading(!state.isReady);
        if (state.isReady && !audioEngine.isPlaying && !hasAutoStartedRef.current) {
          hasAutoStartedRef.current = true;
          audioEngine.play().catch(() => {});
        }
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
        <div className="animate-enter-fade-down" style={{ marginBottom: '32px' }}>
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
        <div 
          key={currentRound.id}
          className="animate-enter-scale-up"
          style={{
            background: '#FFFFFF',
            border: '3px solid #0E0F14',
            borderRadius: '28px',
            boxShadow: '8px 8px 0px #0E0F14',
            padding: '36px',
            position: 'relative',
            marginBottom: '32px'
          }}
        >
          
          {/* Starburst Round Number Badge matching screenshot */}
          <div className="animate-enter-pop delay-100" style={{
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
          <div className="animate-enter-fade-down delay-100" style={{ textAlign: 'center', marginBottom: '28px' }}>
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

          {/* Hybrid Track Selector Trigger Bar */}
          <div className="animate-enter-fade-up delay-150" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#FFFFFF',
            border: '2px solid #0E0F14',
            borderRadius: '16px',
            padding: '10px 16px',
            boxShadow: '3px 3px 0px #0E0F14',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: currentTrack?.isCustom ? 'var(--c-pink)' : 'var(--c-yellow)',
                border: '1.5px solid #0E0F14',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Music size={16} color="#0E0F14" />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--c-text-muted)' }}>
                  {currentTrack?.isCustom ? 'FILE LOKAL AKTIF' : 'PRESET AUDIO AKTIF'}
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#0E0F14' }}>
                  {currentTrack?.title || 'Studio Multi-Stem Groove'}
                </div>
              </div>
            </div>

            <button
              id="btn-choose-track"
              type="button"
              onClick={() => setIsTrackModalOpen(true)}
              className="btn-neo btn-neo-white"
              style={{
                padding: '6px 16px',
                fontSize: '0.82rem'
              }}
            >
              <span>Ganti / Upload Lagu</span>
              <Sliders size={14} />
            </button>
          </div>

          {/* Visualizer & Controls or Neo-Brutalism Loading State */}
          {isAudioLoading ? (
            <div style={{
              background: '#FFFFFF',
              border: '2.5px solid #0E0F14',
              borderRadius: '24px',
              boxShadow: '4px 4px 0px #0E0F14',
              padding: '36px 24px',
              textAlign: 'center',
              marginBottom: '32px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Animated Top Shimmer Rainbow Bar */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '6px',
                background: 'linear-gradient(90deg, #6949FE, #FFDF34, #FFAEF0, #FF7728, #6949FE)',
                backgroundSize: '200% 100%',
                animation: 'neoShimmerBar 2s linear infinite'
              }} />

              {/* Bouncing Equalizer Bars with Pop Colors */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                gap: '8px',
                height: '52px',
                marginBottom: '18px'
              }}>
                <div className="neo-eq-bar" style={{ background: 'var(--c-purple)', animationDelay: '0.0s' }} />
                <div className="neo-eq-bar" style={{ background: 'var(--c-yellow)', animationDelay: '0.18s' }} />
                <div className="neo-eq-bar" style={{ background: 'var(--c-pink)', animationDelay: '0.36s' }} />
                <div className="neo-eq-bar" style={{ background: 'var(--c-orange)', animationDelay: '0.54s' }} />
                <div className="neo-eq-bar" style={{ background: 'var(--c-purple)', animationDelay: '0.24s' }} />
                <div className="neo-eq-bar" style={{ background: 'var(--c-yellow)', animationDelay: '0.42s' }} />
                <div className="neo-eq-bar" style={{ background: 'var(--c-pink)', animationDelay: '0.12s' }} />
              </div>

              {/* Status Pill Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'var(--c-yellow)',
                border: '2px solid #0E0F14',
                borderRadius: '999px',
                padding: '4px 16px',
                fontWeight: 900,
                fontSize: '0.78rem',
                boxShadow: '2px 2px 0px #0E0F14',
                marginBottom: '10px'
              }}>
                <Sparkles size={14} color="#0E0F14" />
                <span>MEMPROSES AUDIO DI MEMORI LOKAL BROWSER</span>
              </div>

              <h3 style={{ fontSize: '1.22rem', fontWeight: 900, color: '#0E0F14', marginBottom: '6px' }}>
                Menyiapkan Mesin Audio DSP 44.1kHz...
              </h3>
              <p style={{ color: 'var(--c-text-muted)', fontSize: '0.85rem', fontWeight: 600, maxWidth: '460px', margin: '0 auto' }}>
                Merender sampel referensi lossless dan konfigurasi Biquad filter di background thread. Pemutar musik akan langsung aktif otomatis.
              </p>
            </div>
          ) : (
            <>
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
            </>
          )}

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
                className="animate-enter-fade-up delay-200"
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
                className="animate-enter-fade-up delay-250"
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
                className="animate-enter-fade-up delay-300"
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
            <div className="animate-enter-scale-up delay-350" style={{ display: 'flex', justifyContent: 'center' }}>
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

        {/* Track Selector Modal */}
        <TrackSelectorModal
          isOpen={isTrackModalOpen}
          onClose={() => setIsTrackModalOpen(false)}
          currentTrack={currentTrack}
        />

      </div>
    </section>
  );
}
