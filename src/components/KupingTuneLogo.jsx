import React, { useState } from 'react';

/**
 * KupingTune Iconic Logo Component
 * A custom Neo-Brutalism badge fusing an Ear silhouette with live soundwave tuning bars.
 */
export default function KupingTuneLogo({ size = 42, showText = true, textColor = '#FFFFFF', onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '12px',
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none'
      }}
      title="KupingTune — Laboratorium Blind Test & Rekomendasi IEM"
    >
      {/* Neo-Brutalist Tactile Logo Badge */}
      <div style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '14px',
        background: 'var(--c-orange)',
        border: '2.5px solid #0E0F14',
        boxShadow: isHovered ? '4px 4px 0px #0E0F14' : '2.5px 2.5px 0px #0E0F14',
        transform: isHovered ? 'translate(-1.5px, -1.5px) rotate(-3deg)' : 'rotate(0deg)',
        transition: 'all 0.35s cubic-bezier(0.34, 1.4, 0.64, 1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Stylized Ear + Tuning Wave Vector SVG */}
        <svg
          width={size * 0.72}
          height={size * 0.72}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ear Outer Silhouette */}
          <path
            d="M9 13C9 7.47715 13.4772 3 19 3C23.4183 3 27 6.58172 27 11C27 14.866 24.2386 18.0874 20.5 18.8256C19.0667 19.1086 18 20.3541 18 21.8122V24C18 26.7614 15.7614 29 13 29C10.2386 29 8 26.7614 8 24C8 22.8954 8.89543 22 10 22C11.1046 22 12 22.8954 12 24C12 24.5523 12.4477 25 13 25C13.5523 25 14 24.5523 14 24V21.8122C14 18.4239 16.4889 15.5276 19.8242 14.8698C21.6706 14.5056 23 12.8937 23 11C23 8.79086 21.2091 7 19 7C15.6863 7 13 9.68629 13 13V14H9V13Z"
            fill="#FFFFFF"
          />

          {/* 3 Animated Sound Tuning Equalizer Sliders inside Ear */}
          <rect
            x="4"
            y={isHovered ? "9" : "11"}
            width="3"
            height={isHovered ? "14" : "10"}
            rx="1.5"
            fill="#FFDF34"
            stroke="#0E0F14"
            strokeWidth="1.2"
            style={{ transition: 'all 0.35s ease' }}
          />
          <rect
            x="8.5"
            y={isHovered ? "6" : "8"}
            width="3"
            height={isHovered ? "18" : "14"}
            rx="1.5"
            fill="#FFAEF0"
            stroke="#0E0F14"
            strokeWidth="1.2"
            style={{ transition: 'all 0.35s ease 0.08s' }}
          />
          <rect
            x="13"
            y={isHovered ? "10" : "12"}
            width="3"
            height={isHovered ? "12" : "8"}
            rx="1.5"
            fill="#FFDF34"
            stroke="#0E0F14"
            strokeWidth="1.2"
            style={{ transition: 'all 0.35s ease 0.16s' }}
          />

          {/* Ear canal inner acoustic dot */}
          <circle cx="13" cy="19" r="2" fill="#0E0F14" />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <span style={{
          fontWeight: 900,
          fontSize: '1.45rem',
          letterSpacing: '-0.035em',
          color: textColor,
          display: 'inline-flex',
          alignItems: 'baseline'
        }}>
          <span>Kuping</span>
          <span style={{ color: 'var(--c-yellow)' }}>Tune</span>
          <span style={{ color: 'var(--c-orange)', fontSize: '1.6rem', lineHeight: 0.5 }}>.</span>
        </span>
      )}
    </div>
  );
}
