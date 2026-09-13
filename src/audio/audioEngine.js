/**
 * Audiophile Web Audio API DSP Engine
 * Provides dual-DSP filter chains, instant seamless crossfading between A and B,
 * real-time frequency analysis for canvas visualization, and master volume control.
 */

import { generateReferenceTrackAsync, PRESET_TRACKS } from './demoTrackGenerator';
import { ROUND_DEFINITIONS } from './roundFilters';

class AudioEngine {
  constructor() {
    this.audioCtx = null;
    this.audioBuffer = null;
    this.sourceNode = null;
    this.isPlaying = false;
    this.activeSample = 'A'; // 'A' or 'B'
    this.currentRoundIndex = 0;
    this.playbackStartTime = 0;
    this.pauseOffset = 0;
    this.volume = 0.8;

    // Loading & readiness state
    this.isLoading = false;
    this.isReady = false;
    this.pendingInit = null;

    // Node references
    this.masterGain = null;
    this.analyser = null;
    this.gainA = null;
    this.gainB = null;
    this.chainANodes = [];
    this.chainBNodes = [];

    // Per-round trim gains (Loudness Matching)
    this.trimA = 1.0;
    this.trimB = 1.0;

    // Track information
    this.currentTrack = {
      id: 'allrounder',
      title: 'Studio Multi-Stem Groove',
      isCustom: false,
      fileName: ''
    };

    // Listeners for UI state syncing
    this.listeners = new Set();
    this.onStateChange = null;
  }

  /**
   * Subscribes to engine state changes (isPlaying, activeSample, currentTrack, isLoading, isReady)
   */
  subscribe(callback) {
    this.listeners.add(callback);
    // Push current state immediately
    callback({
      isPlaying: this.isPlaying,
      activeSample: this.activeSample,
      currentTrack: this.currentTrack,
      isLoading: this.isLoading,
      isReady: this.isReady
    });
    return () => this.listeners.delete(callback);
  }

  notify(state) {
    this.listeners.forEach(cb => {
      try { cb(state); } catch (err) { console.error('AudioEngine listener error:', err); }
    });
    if (this.onStateChange) this.onStateChange(state);
  }

  /**
   * Ensures AudioContext exists and base graph (gainA, gainB, masterGain, analyser) is created
   */
  ensureContext() {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
    }
    this.setupBaseGraph();
    return this.audioCtx;
  }

  /**
   * Preloads audio in the background during idle time
   */
  async preload() {
    if (this.isReady || this.isLoading || this.audioBuffer) return;
    try {
      await this.init();
    } catch (e) {
      console.warn('Audio preloading error:', e);
    }
  }

  /**
   * Initializes AudioContext and asynchronously prepares the audio buffer without blocking the main UI thread
   */
  async init() {
    if (this.isReady && this.audioBuffer) return;
    if (this.pendingInit) return await this.pendingInit;

    this.pendingInit = (async () => {
      this.isLoading = true;
      this.notify({ isLoading: true, isReady: false });

      try {
        this.ensureContext();

        // Try resuming AudioContext asynchronously without blocking buffer creation
        if (this.audioCtx.state === 'suspended') {
          this.audioCtx.resume().catch(() => {});
        }

        // Apply filters early because base graph (gainA, gainB) is guaranteed to exist
        this.applyRoundFilters(ROUND_DEFINITIONS[this.currentRoundIndex]);

        if (!this.audioBuffer) {
          // Asynchronously synthesize reference audio loop without UI freeze
          this.audioBuffer = await generateReferenceTrackAsync(this.audioCtx, this.currentTrack.id || 'allrounder');
        }

        this.isReady = true;
        this.isLoading = false;
        this.notify({ isLoading: false, isReady: true });
      } catch (err) {
        this.isLoading = false;
        this.notify({ isLoading: false, isReady: false });
        console.error('AudioEngine init error:', err);
      } finally {
        this.pendingInit = null;
      }
    })();

    return await this.pendingInit;
  }

  /**
   * Sets up static nodes: Master Gain, Analyser, and A/B Gain nodes
   */
  setupBaseGraph() {
    if (!this.audioCtx || this.masterGain) return;

    try {
      // Analyser Node for Visualizer
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 128;
      this.analyser.smoothingTimeConstant = 0.82;

      // Master Gain
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);

      // Gain A & B
      this.gainA = this.audioCtx.createGain();
      this.gainB = this.audioCtx.createGain();

      // Initial state: Sample A active, Sample B muted
      const now = this.audioCtx.currentTime;
      this.gainA.gain.setValueAtTime(this.activeSample === 'A' ? this.trimA : 0, now);
      this.gainB.gain.setValueAtTime(this.activeSample === 'B' ? this.trimB : 0, now);

      // Connect to Analyser then Master to Speakers
      this.gainA.connect(this.masterGain);
      this.gainB.connect(this.masterGain);
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.audioCtx.destination);
    } catch (err) {
      console.warn('setupBaseGraph connect warning:', err);
    }
  }

  /**
   * Disconnects previous filter chain nodes and builds new filters for the current round
   */
  applyRoundFilters(roundDef) {
    if (!this.audioCtx || !roundDef) return;
    this.setupBaseGraph();
    if (!this.gainA || !this.gainB) return;

    this.trimA = roundDef.sampleA?.trimGain || 1.0;
    this.trimB = roundDef.sampleB?.trimGain || 1.0;

    // Tear down previous chains
    this.chainANodes.forEach(node => {
      try { node.disconnect(); } catch (e) {}
    });
    this.chainBNodes.forEach(node => {
      try { node.disconnect(); } catch (e) {}
    });
    this.chainANodes = [];
    this.chainBNodes = [];

    // Helper to build a chain from filter config array
    const buildChain = (filterConfigs, destinationGain) => {
      if (!destinationGain || !filterConfigs || !Array.isArray(filterConfigs)) return [];
      const nodes = [];
      let prevNode = null;

      filterConfigs.forEach(conf => {
        try {
          const filter = this.audioCtx.createBiquadFilter();
          filter.type = conf.type;
          filter.frequency.setValueAtTime(conf.frequency, this.audioCtx.currentTime);
          if (conf.gain !== undefined) {
            filter.gain.setValueAtTime(conf.gain, this.audioCtx.currentTime);
          }
          if (conf.Q !== undefined) {
            filter.Q.setValueAtTime(conf.Q, this.audioCtx.currentTime);
          }

          if (prevNode) {
            prevNode.connect(filter);
          }
          nodes.push(filter);
          prevNode = filter;
        } catch (err) {
          console.warn('Filter creation warning:', err);
        }
      });

      // Connect end of chain to gain node ONLY if destinationGain is a valid AudioNode
      if (nodes.length > 0 && destinationGain instanceof AudioNode) {
        try {
          nodes[nodes.length - 1].connect(destinationGain);
        } catch (err) {
          console.warn('Filter chain connect warning:', err);
        }
      }
      return nodes;
    };

    this.chainANodes = buildChain(roundDef.sampleA?.filters || [], this.gainA);
    this.chainBNodes = buildChain(roundDef.sampleB?.filters || [], this.gainB);

    // Update active gain value to match new trim
    const now = this.audioCtx.currentTime;
    try {
      if (this.activeSample === 'A') {
        this.gainA.gain.setTargetAtTime(this.trimA, now, 0.015);
        this.gainB.gain.setTargetAtTime(0, now, 0.015);
      } else {
        this.gainA.gain.setTargetAtTime(0, now, 0.015);
        this.gainB.gain.setTargetAtTime(this.trimB, now, 0.015);
      }
    } catch (e) {}

    // Reconnect source node if playing
    if (this.isPlaying && this.sourceNode) {
      this.reconnectSource();
    }
  }

  /**
   * Connects the running source node to the start of both DSP chains
   */
  reconnectSource() {
    if (!this.sourceNode || !this.audioCtx) return;

    try {
      this.sourceNode.disconnect();
    } catch (e) {}

    // Input to Chain A
    try {
      if (this.chainANodes.length > 0 && this.chainANodes[0] instanceof AudioNode) {
        this.sourceNode.connect(this.chainANodes[0]);
      } else if (this.gainA instanceof AudioNode) {
        this.sourceNode.connect(this.gainA);
      }
    } catch (e) {
      console.warn('Source connect A error:', e);
    }

    // Input to Chain B
    try {
      if (this.chainBNodes.length > 0 && this.chainBNodes[0] instanceof AudioNode) {
        this.sourceNode.connect(this.chainBNodes[0]);
      } else if (this.gainB instanceof AudioNode) {
        this.sourceNode.connect(this.gainB);
      }
    } catch (e) {
      console.warn('Source connect B error:', e);
    }
  }

  /**
   * Starts or resumes playback
   */
  async play() {
    if (this.isPlaying || this.isStarting) return true;
    this.isStarting = true;

    try {
      await this.init();

      // Check if user called pause() while waiting for init
      if (!this.isStarting) {
        return false;
      }

      if (!this.audioBuffer || !this.audioCtx) {
        return false;
      }

      if (this.audioCtx.state === 'suspended') {
        await this.audioCtx.resume();
      }

      // Check again after resume
      if (!this.isStarting) {
        return false;
      }

      // Safeguard: explicitly stop and disconnect any existing sourceNode
      if (this.sourceNode) {
        try {
          this.sourceNode.stop();
          this.sourceNode.disconnect();
        } catch (e) {}
        this.sourceNode = null;
      }

      // Create new buffer source
      this.sourceNode = this.audioCtx.createBufferSource();
      this.sourceNode.buffer = this.audioBuffer;
      this.sourceNode.loop = true;

      this.reconnectSource();

      // Ensure safe non-negative start offset within buffer duration
      const duration = this.audioBuffer.duration || 1;
      const safeOffset = (isFinite(this.pauseOffset) && this.pauseOffset >= 0)
        ? (this.pauseOffset % duration)
        : 0;

      this.playbackStartTime = this.audioCtx.currentTime - safeOffset;
      this.sourceNode.start(0, safeOffset);
      this.isPlaying = true;

      this.notify({ isPlaying: true });
      return true;
    } catch (err) {
      console.warn('Playback start error:', err);
      return false;
    } finally {
      this.isStarting = false;
    }
  }

  /**
   * Pauses playback and remembers current offset
   */
  pause() {
    this.isStarting = false;

    if (this.audioCtx && this.sourceNode && this.audioBuffer) {
      const elapsed = Math.max(0, this.audioCtx.currentTime - this.playbackStartTime);
      const duration = this.audioBuffer.duration || 1;
      this.pauseOffset = isFinite(elapsed) ? (elapsed % duration) : 0;

      try {
        this.sourceNode.stop();
        this.sourceNode.disconnect();
      } catch (e) {}
    }

    this.sourceNode = null;
    this.isPlaying = false;

    this.notify({ isPlaying: false });
    return false;
  }

  /**
   * Toggles playback
   */
  async togglePlay() {
    if (this.isPlaying || this.isStarting) {
      return this.pause();
    } else {
      return await this.play();
    }
  }

  /**
   * Instant seamless A/B crossfade (15ms micro-ramp)
   */
  switchSample(target) { // 'A' or 'B'
    this.activeSample = target;
    if (!this.audioCtx || !this.gainA || !this.gainB) return;

    const now = this.audioCtx.currentTime;
    const rampTime = 0.015; // 15 milliseconds

    if (target === 'A') {
      this.gainA.gain.setTargetAtTime(this.trimA, now, rampTime);
      this.gainB.gain.setTargetAtTime(0, now, rampTime);
    } else {
      this.gainA.gain.setTargetAtTime(0, now, rampTime);
      this.gainB.gain.setTargetAtTime(this.trimB, now, rampTime);
    }

    this.notify({ activeSample: target });
  }

  /**
   * Changes current test round (0 to 4)
   */
  setRound(index) {
    if (index < 0 || index >= ROUND_DEFINITIONS.length) return;
    this.currentRoundIndex = index;
    this.applyRoundFilters(ROUND_DEFINITIONS[index]);
  }

  /**
   * Sets master volume (0.0 - 1.0)
   */
  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.audioCtx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
    }
  }

  /**
   * Retrieves live frequency data for canvas visualizer
   */
  getByteFrequencyData() {
    if (!this.analyser) return new Uint8Array(0);
    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(dataArray);
    return dataArray;
  }

  /**
   * Loads a built-in curated preset track ('allrounder', 'acoustic', 'synthwave')
   */
  async loadPresetTrack(presetId) {
    await this.init();

    const preset = PRESET_TRACKS.find(p => p.id === presetId) || PRESET_TRACKS[0];
    const wasPlaying = this.isPlaying;

    this.isLoading = true;
    this.notify({ isLoading: true });

    try {
      // Generate selected preset buffer asynchronously without UI freeze
      this.audioBuffer = await generateReferenceTrackAsync(this.audioCtx, preset.id);
      this.pauseOffset = 0;
      this.currentTrack = {
        id: preset.id,
        title: preset.title,
        isCustom: false,
        fileName: '',
        genre: preset.genre,
        bpm: preset.bpm
      };

      this.isLoading = false;
      this.notify({ isLoading: false, currentTrack: this.currentTrack });

      if (wasPlaying) {
        this.pause();
        await this.play();
      }

      return this.currentTrack;
    } catch (err) {
      this.isLoading = false;
      this.notify({ isLoading: false });
      throw err;
    }
  }

  /**
   * Loads a user's custom audio file locally (100% Client-Side In-Memory)
   * Decodes file.arrayBuffer() directly into an AudioBuffer with ZERO server upload!
   */
  async loadCustomAudioFile(file) {
    await this.init();

    if (!file) throw new Error('File tidak valid.');

    const wasPlaying = this.isPlaying;
    this.isLoading = true;
    this.notify({ isLoading: true });

    try {
      const arrayBuffer = await file.arrayBuffer();

      // Decode audio data directly in browser memory
      const decodedBuffer = await this.audioCtx.decodeAudioData(arrayBuffer);

      this.audioBuffer = decodedBuffer;
      this.pauseOffset = 0;
      this.currentTrack = {
        id: 'custom',
        title: file.name.replace(/\.[^/.]+$/, ''), // remove extension for clean title
        isCustom: true,
        fileName: file.name,
        fileSizeFormatted: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        duration: Math.round(decodedBuffer.duration)
      };

      this.isLoading = false;
      this.notify({ isLoading: false, currentTrack: this.currentTrack });

      if (wasPlaying) {
        this.pause();
        await this.play();
      }

      return this.currentTrack;
    } catch (err) {
      this.isLoading = false;
      this.notify({ isLoading: false });
      throw err;
    }
  }

  /**
   * Cleanup
   */
  destroy() {
    this.pause();
    if (this.audioCtx) {
      this.audioCtx.close();
      this.audioCtx = null;
    }
  }
}

// Global singleton instance
export const audioEngine = new AudioEngine();
