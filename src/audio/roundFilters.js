/**
 * Preset filter configurations for 5 Rounds of A/B Blind Testing
 * Designed with Equal Perceived Loudness (Pre-gain compensation)
 */

export const ROUND_DEFINITIONS = [
  {
    id: 1,
    dimension: 'Bass (Low-End)',
    title: 'Ronde 1: Karakter Bass & Low-End',
    subtitle: 'Dengarkan ketukan bass drum dan dengung bassline.',
    description: 'Manakah karakter bass yang terasa paling pas dan menyenangkan di telingamu?',
    sampleA: {
      name: 'Sample A',
      label: 'Karakter A',
      type: 'warm',
      badge: 'Warm & Punchy',
      detail: 'Bass tebal, berbobot, memberi kehangatan pada musik.',
      // Filters applied to Chain A:
      filters: [
        { type: 'lowshelf', frequency: 120, gain: 4.5, Q: 0.8 },
        { type: 'peaking', frequency: 250, gain: 1.5, Q: 1.0 }
      ],
      // Gain compensation so boost doesn't sound louder overall
      trimGain: 0.82
    },
    sampleB: {
      name: 'Sample B',
      label: 'Karakter B',
      type: 'clean',
      badge: 'Clean & Sub-focused',
      detail: 'Bass lebih ramping, fokus di sub-bass dalam, tidak menumpuk ke instrumen lain.',
      filters: [
        { type: 'highpass', frequency: 35, Q: 0.7 },
        { type: 'peaking', frequency: 50, gain: 3.0, Q: 1.2 },
        { type: 'peaking', frequency: 180, gain: -2.5, Q: 1.0 }
      ],
      trimGain: 0.95
    }
  },
  {
    id: 2,
    dimension: 'Midrange (Vocal)',
    title: 'Ronde 2: Kejernihan Vokal & Midrange',
    subtitle: 'Dengarkan posisi suara vokal penyanyi dan instrumen melodi.',
    description: 'Bagaimana posisi vokal penyanyi yang lebih kamu sukai?',
    sampleA: {
      name: 'Sample A',
      label: 'Karakter A',
      type: 'forward',
      badge: 'Vocal-Forward / Intimate',
      detail: 'Vokal terasa maju, jelas di depan, artikulasi lirik terdengar sangat intim.',
      filters: [
        { type: 'peaking', frequency: 1200, gain: 2.0, Q: 1.0 },
        { type: 'peaking', frequency: 2800, gain: 4.0, Q: 1.2 }
      ],
      trimGain: 0.80
    },
    sampleB: {
      name: 'Sample B',
      label: 'Karakter B',
      type: 'recessed',
      badge: 'Relaxed / V-Shape Mids',
      detail: 'Vokal sedikit mundur ke dalam panggung, memberi ruang luas untuk instrumen dan bass.',
      filters: [
        { type: 'peaking', frequency: 2200, gain: -3.5, Q: 1.1 },
        { type: 'peaking', frequency: 1000, gain: -1.5, Q: 0.9 }
      ],
      trimGain: 0.98
    }
  },
  {
    id: 3,
    dimension: 'Treble (Highs & Air)',
    title: 'Ronde 3: Kilau Treble & Resonansi Air',
    subtitle: 'Fokuskan pendengaran pada suara desis cymbal, ketukan hi-hat, dan petikan senar gitar.',
    description: 'Karakter treble mana yang lebih nyaman untuk didengarkan berlama-lama?',
    sampleA: {
      name: 'Sample A',
      label: 'Karakter A',
      type: 'smooth',
      badge: 'Smooth & Fatigue-Free',
      detail: 'Treble lembut, tidak menusuk kuping, aman dari rasa lelah atau sibilance (desis tajam).',
      filters: [
        { type: 'peaking', frequency: 6500, gain: -3.0, Q: 1.5 },
        { type: 'highshelf', frequency: 9000, gain: -4.0, Q: 0.8 }
      ],
      trimGain: 0.98
    },
    sampleB: {
      name: 'Sample B',
      label: 'Karakter B',
      type: 'sparkle',
      badge: 'Crisp, Airy & Sparkle',
      detail: 'Treble jernih berkilau, suara cymbal gemerincing tajam dengan nuansa mikro-detail tinggi.',
      filters: [
        { type: 'peaking', frequency: 7500, gain: 3.5, Q: 1.4 },
        { type: 'highshelf', frequency: 11000, gain: 4.5, Q: 0.9 }
      ],
      trimGain: 0.84
    }
  },
  {
    id: 4,
    dimension: 'Soundstage (Spatial Width)',
    title: 'Ronde 4: Keluasan Panggung & Separasi',
    subtitle: 'Pejamkan mata dan rasakan seberapa lebar sebaran instrumen kiri dan kanan.',
    description: 'Apakah kamu menyukai instrumen yang berkumpul intim atau menyebar luas?',
    sampleA: {
      name: 'Sample A',
      label: 'Karakter A',
      type: 'intimate',
      badge: 'Intimate & Centered',
      detail: 'Semua instrumen berfokus padat di tengah, memberikan pengalaman mendengar yang solid.',
      filters: [
        { type: 'peaking', frequency: 500, gain: 1.5, Q: 0.7 }
      ],
      isSpatialWidened: false,
      trimGain: 0.92
    },
    sampleB: {
      name: 'Sample B',
      label: 'Karakter B',
      type: 'wide',
      badge: 'Wide & Holographic',
      detail: 'Instrumen terasa menjauh ke samping kiri dan kanan telinga, panggung musik terasa lebih megah.',
      filters: [
        { type: 'highshelf', frequency: 8000, gain: 2.0, Q: 0.7 }
      ],
      isSpatialWidened: true,
      trimGain: 0.90
    }
  },
  {
    id: 5,
    dimension: 'Tonal Signature (Overall)',
    title: 'Ronde 5: Harmoni Keseluruhan (Tuning Signature)',
    subtitle: 'Ronde penentu: Dengarkan keseluruhan lagu secara menyeluruh.',
    description: 'Tuning karakter mana yang secara intuitif paling membuatmu ingin bergoyang menikmati musik?',
    sampleA: {
      name: 'Sample A',
      label: 'Karakter A',
      type: 'warm_musical',
      badge: 'Warm Musical & Rich',
      detail: 'Bass tebal bertenaga, vokal hangat, treble santai. Enak untuk pop, lo-fi, dan dengar santai.',
      filters: [
        { type: 'lowshelf', frequency: 140, gain: 4.0, Q: 0.8 },
        { type: 'peaking', frequency: 400, gain: 1.5, Q: 0.9 },
        { type: 'highshelf', frequency: 7000, gain: -2.5, Q: 0.7 }
      ],
      trimGain: 0.82
    },
    sampleB: {
      name: 'Sample B',
      label: 'Karakter B',
      type: 'harman_neutral',
      badge: 'Harman Balanced & Engaging',
      detail: 'Sub-bass punchy bersih, vokal pas di porsinya, treble jernih terdefinisi. All-rounder seimbang.',
      filters: [
        { type: 'peaking', frequency: 45, gain: 3.5, Q: 1.2 },
        { type: 'peaking', frequency: 2800, gain: 3.0, Q: 1.1 },
        { type: 'highshelf', frequency: 10000, gain: 2.0, Q: 0.8 }
      ],
      trimGain: 0.84
    }
  }
];
