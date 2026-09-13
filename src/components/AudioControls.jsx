import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { audioEngine } from '../audio/audioEngine';

export default function AudioControls({ isPlaying, setIsPlaying, activeSample, setActiveSample }) {
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [isEngineLoading, setIsEngineLoading] = useState(audioEngine.isLoading);

  // Subscribe directly to audioEngine state to ensure UI is ALWAYS 100% in sync
  useEffect(() => {
    const unsubscribe = audioEngine.subscribe((state) => {
      if (typeof state.isPlaying === 'boolean') {
        setIsPlaying(state.isPlaying);
      }
      if (state.activeSample) {
        setActiveSample(state.activeSample);
      }
      if (typeof state.isLoading === 'boolean') {
        setIsEngineLoading(state.isLoading);
      }
    });

    return unsubscribe;
  }, [setIsPlaying, setActiveSample]);

  const handleTogglePlay = async (e) => {
    if (e && e.currentTarget && typeof e.currentTarget.blur === 'function') {
      e.currentTarget.blur();
    }
    await audioEngine.togglePlay();
  };

  const handleSwitchSample = (target) => {
    audioEngine.switchSample(target);
    setActiveSample(target);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;

      if (e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        handleSwitchSample('A');
      } else if (e.key === 'b' || e.key === 'B') {
        e.preventDefault();
        handleSwitchSample('B');
      } else if (e.code === 'Space') {
        e.preventDefault();
        audioEngine.togglePlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleVolumeChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setVolume(val);
    setIsMuted(val === 0);
    audioEngine.setVolume(val / 100);
  };

  const handleToggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      audioEngine.setVolume(volume / 100);
    } else {
      setIsMuted(true);
      audioEngine.setVolume(0);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      alignItems: 'center',
      width: '100%'
    }}>
      {/* Big Tactile A / B Switch Group in Neo-Brutalism Style */}
      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontSize: '0.8rem',
          color: '#0E0F14',
          marginBottom: '12px',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '0.04em'
        }}>
          Ganti Sampel Instan (Bisa tekan tombol keyboard [A] atau [B])
        </div>

        <div style={{
          display: 'inline-flex',
          padding: '8px',
          background: '#FFFFFF',
          border: '2.5px solid #0E0F14',
          borderRadius: '999px',
          boxShadow: '4px 4px 0px #0E0F14',
          gap: '12px'
        }}>
          {/* Sample A Button */}
          <button
            id="switch-sample-a"
            type="button"
            onClick={() => handleSwitchSample('A')}
            style={{
              padding: '12px 32px',
              borderRadius: '999px',
              fontWeight: 900,
              fontSize: '1.1rem',
              border: activeSample === 'A' ? '2.5px solid #0E0F14' : '2px solid transparent',
              background: activeSample === 'A' ? 'var(--c-yellow)' : 'transparent',
              color: '#0E0F14',
              boxShadow: activeSample === 'A' ? '2px 2px 0px #0E0F14' : 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.15s ease'
            }}
          >
            <span style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              background: '#0E0F14',
              color: '#FFFFFF',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '0.85rem'
            }}>
              A
            </span>
            <span>SAMPLE A</span>
          </button>

          {/* Sample B Button */}
          <button
            id="switch-sample-b"
            type="button"
            onClick={() => handleSwitchSample('B')}
            style={{
              padding: '12px 32px',
              borderRadius: '999px',
              fontWeight: 900,
              fontSize: '1.1rem',
              border: activeSample === 'B' ? '2.5px solid #0E0F14' : '2px solid transparent',
              background: activeSample === 'B' ? 'var(--c-pink)' : 'transparent',
              color: '#0E0F14',
              boxShadow: activeSample === 'B' ? '2px 2px 0px #0E0F14' : 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.15s ease'
            }}
          >
            <span style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              background: '#0E0F14',
              color: '#FFFFFF',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '0.85rem'
            }}>
              B
            </span>
            <span>SAMPLE B</span>
          </button>
        </div>
      </div>

      {/* Floating Neo-Brutalist Player Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '560px',
        padding: '14px 24px',
        background: '#FFFFFF',
        border: '2.5px solid #0E0F14',
        borderRadius: '20px',
        boxShadow: '4px 4px 0px #0E0F14',
        gap: '16px',
        flexWrap: 'wrap'
      }}>
        {/* Play/Pause Button - dynamically adapts between || and ▶ */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            id="audio-play-toggle"
            type="button"
            onClick={handleTogglePlay}
            onKeyDown={(e) => { if (e.code === 'Space') e.preventDefault(); }}
            disabled={isEngineLoading}
            style={{
              width: '48px',
              height: '48px',
              padding: 0,
              borderRadius: '50%',
              background: isPlaying ? 'var(--c-purple)' : 'var(--c-orange)',
              border: '2.5px solid #0E0F14',
              boxShadow: '2.5px 2.5px 0px #0E0F14',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: isEngineLoading ? 'wait' : 'pointer',
              opacity: isEngineLoading ? 0.6 : 1,
              transition: 'all 0.15s ease'
            }}
            title={isPlaying ? 'Pause Musik (||)' : 'Putar Musik (▶)'}
          >
            {isPlaying ? (
              // Pause Icon (||)
              <Pause size={22} color="#FFFFFF" strokeWidth={3.5} />
            ) : (
              // Play Icon (▶ Triangle)
              <Play size={22} fill="#FFFFFF" color="#FFFFFF" strokeWidth={2} style={{ marginLeft: '3px' }} />
            )}
          </button>

          <div>
            <div style={{ fontSize: '0.92rem', fontWeight: 900, color: '#0E0F14' }}>
              {isEngineLoading ? 'Memproses Audio...' : isPlaying ? 'Sedang Diputar (|| Pause)' : 'Dijeda (▶ Putar)'}
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--c-text-muted)' }}>
              16-Bar Multi-Stem Loop • Tekan Spasi
            </div>
          </div>
        </div>

        {/* Volume Slider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            type="button"
            onClick={handleToggleMute}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#0E0F14',
              display: 'flex',
              alignItems: 'center'
            }}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          <input
            id="audio-volume-slider"
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            style={{
              width: '90px',
              accentColor: '#FF7728',
              cursor: 'pointer'
            }}
          />
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0E0F14', minWidth: '32px' }}>
            {isMuted ? '0%' : `${volume}%`}
          </span>
        </div>
      </div>
    </div>
  );
}
