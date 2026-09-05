import React from 'react';

/**
 * Neo-Brutalist SVG Radar Chart
 * 5-Axis Acoustic Preference with Bold Black Strokes and High Contrast Pop Fills
 */
export default function RadarChart({ vector, size = 320 }) {
  const center = size / 2;
  const radius = size * 0.36;

  const axes = [
    { key: 'bass', label: 'Bass Impact', angle: -Math.PI / 2 },
    { key: 'mid', label: 'Vocal / Mid', angle: -Math.PI / 2 + (2 * Math.PI / 5) * 1 },
    { key: 'treble', label: 'Treble Sparkle', angle: -Math.PI / 2 + (2 * Math.PI / 5) * 2 },
    { key: 'stage', label: 'Soundstage', angle: -Math.PI / 2 + (2 * Math.PI / 5) * 3 },
    { key: 'detail', label: 'Resolution', angle: -Math.PI / 2 + (2 * Math.PI / 5) * 4 }
  ];

  const getCoordinates = (value, angle) => {
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  const levels = [0.25, 0.5, 0.75, 1.0];

  const polygonPoints = axes.map(axis => {
    const val = vector[axis.key] || 50;
    const pt = getCoordinates(val, axis.angle);
    return `${pt.x},${pt.y}`;
  }).join(' ');

  return (
    <div style={{
      width: size,
      height: size,
      margin: '0 auto',
      background: '#FFFFFF',
      border: '2.5px solid #0E0F14',
      borderRadius: '24px',
      boxShadow: '4px 4px 0px #0E0F14',
      padding: '8px'
    }}>
      <svg width={size - 16} height={size - 16} viewBox={`0 0 ${size} ${size}`}>
        {/* Concentric grid polygons */}
        {levels.map((lvl, idx) => {
          const pts = axes.map(axis => {
            const pt = getCoordinates(lvl * 100, axis.angle);
            return `${pt.x},${pt.y}`;
          }).join(' ');
          return (
            <polygon
              key={idx}
              points={pts}
              fill={idx % 2 === 0 ? '#FAF8F4' : '#FFFFFF'}
              stroke="#0E0F14"
              strokeWidth="1.5"
              strokeDasharray={idx === levels.length - 1 ? 'none' : '3 3'}
            />
          );
        })}

        {/* Axis Spokes */}
        {axes.map((axis, idx) => {
          const pt = getCoordinates(100, axis.angle);
          return (
            <line
              key={idx}
              x1={center}
              y1={center}
              x2={pt.x}
              y2={pt.y}
              stroke="#0E0F14"
              strokeWidth="1.5"
            />
          );
        })}

        {/* User Sound Profile Polygon with Yellow/Pink Fill and Thick Black Stroke */}
        <polygon
          points={polygonPoints}
          fill="rgba(255, 223, 52, 0.65)"
          stroke="#0E0F14"
          strokeWidth="3"
        />

        {/* Vertex Dots */}
        {axes.map((axis, idx) => {
          const val = vector[axis.key] || 50;
          const pt = getCoordinates(val, axis.angle);
          return (
            <circle
              key={idx}
              cx={pt.x}
              cy={pt.y}
              r="6"
              fill="#FF7728"
              stroke="#0E0F14"
              strokeWidth="2.5"
            />
          );
        })}

        {/* Axis Labels */}
        {axes.map((axis, idx) => {
          const labelPt = getCoordinates(120, axis.angle);
          const isTop = Math.abs(axis.angle - (-Math.PI / 2)) < 0.1;
          const isBottom = axis.angle > 0;
          return (
            <text
              key={idx}
              x={labelPt.x}
              y={labelPt.y + (isTop ? -2 : isBottom ? 8 : 4)}
              textAnchor="middle"
              fill="#0E0F14"
              fontSize="11"
              fontWeight="900"
              fontFamily="var(--font-main)"
            >
              {axis.label} ({vector[axis.key]}%)
            </text>
          );
        })}
      </svg>
    </div>
  );
}
