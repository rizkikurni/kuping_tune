/**
 * Synthesizes a high-fidelity 16-bar reference demo track directly into an AudioBuffer.
 * Contains full-range audio: punchy sub-bass, kick, crisp hi-hats, warm chords, and lead melodies.
 * Zero network dependencies, instant load, no buffering delay.
 */

export function generateReferenceTrack(audioCtx) {
  const sampleRate = audioCtx.sampleRate || 44100;
  const bpm = 112;
  const beatsPerSecond = bpm / 60;
  const totalBeats = 32; // 8 bars (2 repetitions of 4-bar progression)
  const duration = totalBeats / beatsPerSecond; // ~17.14 seconds
  const totalSamples = Math.floor(sampleRate * duration);

  const buffer = audioCtx.createBuffer(2, totalSamples, sampleRate);
  const left = buffer.getChannelData(0);
  const right = buffer.getChannelData(1);

  // Helper for note frequency
  const noteToFreq = (note) => 440 * Math.pow(2, (note - 69) / 12);

  // Musical Progression: D minor -> Bb Major -> F Major -> C Major
  // MIDI root notes: D2 (38), Bb1 (34), F1 (29), C2 (36)
  const bassNotes = [38, 38, 38, 41, 34, 34, 34, 36, 29, 29, 29, 31, 36, 36, 36, 38];
  
  // Chord frequencies: [D-F-A], [Bb-D-F], [F-A-C], [C-E-G]
  const chords = [
    [50, 53, 57, 62], // Dm7
    [46, 50, 53, 58], // BbMaj7
    [41, 45, 48, 53], // Fmaj
    [48, 52, 55, 60]  // Cmaj
  ];

  // Melodic Lead notes (Vocal-like formant range)
  const leadNotes = [
    62, 65, 67, 69, 67, 65, 62, 60,
    58, 62, 65, 67, 65, 62, 58, 57,
    65, 67, 69, 72, 69, 67, 65, 64,
    60, 64, 67, 69, 67, 64, 62, 62
  ];

  // Render loop
  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    const currentBeat = t * beatsPerSecond;
    const bar = Math.floor(currentBeat / 4) % 4;
    const beatInBar = currentBeat % 4;
    const eighthNote = Math.floor(currentBeat * 2) % 16;
    const sixteenthNote = Math.floor(currentBeat * 4) % 32;

    let sampleL = 0;
    let sampleR = 0;

    // --- 1. KICK DRUM (Every quarter note + occasional syncopation) ---
    const kickTrigger = (beatInBar % 1.0);
    const isKick = kickTrigger < 0.25 && (Math.floor(beatInBar) === 0 || Math.floor(beatInBar) === 2 || (beatInBar > 2.5 && beatInBar < 2.75));
    if (isKick) {
      const kTime = kickTrigger / beatsPerSecond;
      const kFreq = 130 * Math.exp(-kTime * 35) + 45; // Pitch drop
      const kEnv = Math.exp(-kTime * 14);
      const kickWave = Math.sin(2 * Math.PI * kFreq * kTime) * kEnv * 0.45;
      sampleL += kickWave;
      sampleR += kickWave;
    }

    // --- 2. SNARE / CLAP (Beats 2 and 4) ---
    const isSnareBeat = beatInBar >= 1.0 && beatInBar < 1.35 || beatInBar >= 3.0 && beatInBar < 3.35;
    if (isSnareBeat) {
      const sTime = (beatInBar % 2.0 - 1.0) / beatsPerSecond;
      if (sTime >= 0 && sTime < 0.25) {
        const sNoise = (Math.random() * 2 - 1) * Math.exp(-sTime * 22);
        const sTone = Math.sin(2 * Math.PI * 185 * sTime) * Math.exp(-sTime * 18) * 0.2;
        const snare = (sNoise * 0.25 + sTone) * 0.35;
        sampleL += snare;
        sampleR += snare;
      }
    }

    // --- 3. CRISP HI-HATS (16th notes with subtle groove velocity & stereo spread) ---
    const hatTime = (currentBeat * 4 % 1.0) / (beatsPerSecond * 4);
    if (hatTime < 0.08) {
      const isAccent = sixteenthNote % 2 === 0;
      const hatVelocity = isAccent ? 0.20 : 0.12;
      const hatNoise = (Math.random() * 2 - 1) * Math.exp(-hatTime * 85) * hatVelocity;
      // High-pass metallic character
      const hatTone = Math.sin(2 * Math.PI * 8500 * hatTime) * 0.04;
      sampleL += (hatNoise + hatTone) * 0.85;
      sampleR += (hatNoise - hatTone) * 1.15; // subtle stereo panning
    }

    // --- 4. BASSLINE (Punchy Sub + Warm 2nd Harmonic) ---
    const bassIdx = Math.floor(currentBeat * 2) % bassNotes.length;
    const bassNote = bassNotes[bassIdx];
    const bassFreq = noteToFreq(bassNote);
    const bassPhase = (t * bassFreq) % 1;
    const bassWave1 = Math.sin(2 * Math.PI * bassPhase);
    const bassWave2 = Math.sin(4 * Math.PI * bassPhase) * 0.4;
    const bassEnv = Math.exp(-((currentBeat * 2) % 1.0) * 2.8);
    const bassTotal = (bassWave1 + bassWave2) * bassEnv * 0.32;
    sampleL += bassTotal;
    sampleR += bassTotal;

    // --- 5. WARM STEREO SYNTH CHORDS (Electric Keys vibe) ---
    const currentChord = chords[bar];
    let chordL = 0;
    let chordR = 0;
    for (let c = 0; c < currentChord.length; c++) {
      const cFreq = noteToFreq(currentChord[c]);
      const osc = Math.sin(2 * Math.PI * cFreq * t) + Math.sin(4 * Math.PI * cFreq * t) * 0.2;
      const pan = (c / (currentChord.length - 1)) * 0.6 - 0.3; // Stereo spread
      chordL += osc * (0.5 - pan);
      chordR += osc * (0.5 + pan);
    }
    const chordPulse = (0.7 + 0.3 * Math.sin(2 * Math.PI * currentBeat * 2));
    sampleL += chordL * 0.035 * chordPulse;
    sampleR += chordR * 0.035 * chordPulse;

    // --- 6. LEAD VOCAL/MELODY SYNTH (Smooth Formant Lead) ---
    const leadIdx = Math.floor(currentBeat) % leadNotes.length;
    const leadFreq = noteToFreq(leadNotes[leadIdx]);
    const leadPhase = (t * leadFreq) % 1;
    // Formant-like timbre (rich odd harmonics)
    const leadWave = (Math.sin(2 * Math.PI * leadPhase) + 
                      Math.sin(6 * Math.PI * leadPhase) * 0.3 + 
                      Math.sin(10 * Math.PI * leadPhase) * 0.15);
    const leadEnv = Math.sin(Math.min(Math.PI, (currentBeat % 1.0) * Math.PI * 1.05));
    const leadSignal = leadWave * leadEnv * 0.12;
    sampleL += leadSignal * 0.95;
    sampleR += leadSignal * 1.05;

    // Soft limiter / Headroom protection
    left[i] = Math.tanh(sampleL * 0.9);
    right[i] = Math.tanh(sampleR * 0.9);
  }

  return buffer;
}
