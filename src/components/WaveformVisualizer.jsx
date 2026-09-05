import React, { useEffect, useRef } from 'react';
import { audioEngine } from '../audio/audioEngine';

export default function WaveformVisualizer({ isPlaying, activeSample }) {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const isPlayingRef = useRef(isPlaying);
  const activeSampleRef = useRef(activeSample);

  // Keep refs up-to-date with latest props
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    activeSampleRef.current = activeSample;
  }, [activeSample]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    let idlePhase = 0;

    const render = () => {
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // Subtle horizontal dotted grid lines
      ctx.strokeStyle = '#E5E7EB';
      ctx.lineWidth = 1;
      for (let y = 14; y < height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const numBars = 42;
      const barWidth = (width / numBars) - 3;
      const currentlyPlaying = isPlayingRef.current || audioEngine.isPlaying;

      if (currentlyPlaying) {
        const freqData = audioEngine.getByteFrequencyData();
        const step = Math.floor(freqData.length / numBars) || 1;
        const currentSample = activeSampleRef.current || 'A';

        for (let i = 0; i < numBars; i++) {
          const rawVal = freqData[i * step] || 0;
          const percent = rawVal / 255;
          // Calculate dynamic bar height with minimum active bounce
          const activeBounce = Math.sin(idlePhase * 4 + i * 0.4) * 4;
          const barHeight = Math.max(8, percent * (height - 14) + activeBounce);
          const x = i * (barWidth + 3);
          const y = height - barHeight;

          // Color based on active sample: Yellow for A, Pink for B
          ctx.fillStyle = currentSample === 'A' ? '#FFDF34' : '#FFAEF0';
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0]);
          ctx.fill();

          ctx.strokeStyle = '#0E0F14';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
        idlePhase += 0.05;
      } else {
        // Idle gentle waveform when paused
        for (let i = 0; i < numBars; i++) {
          const x = i * (barWidth + 3);
          const idleHeight = 6;
          ctx.fillStyle = '#E5E7EB';
          ctx.beginPath();
          ctx.roundRect(x, height - idleHeight, barWidth, idleHeight, [3, 3, 0, 0]);
          ctx.fill();

          ctx.strokeStyle = '#0E0F14';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []); // Run once on mount, continuously checks live ref and audioEngine.isPlaying

  return (
    <div style={{
      width: '100%',
      height: '84px',
      background: '#FFFFFF',
      border: '2px solid #0E0F14',
      borderRadius: '14px',
      padding: '8px 12px',
      overflow: 'hidden',
      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.06)'
    }}>
      <canvas 
        ref={canvasRef} 
        style={{ width: '100%', height: '100%', display: 'block' }} 
      />
    </div>
  );
}
