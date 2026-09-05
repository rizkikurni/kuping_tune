/**
 * Audiophile Web Audio API DSP Engine
 * Provides dual-DSP filter chains, instant seamless crossfading between A and B,
 * real-time frequency analysis for canvas visualization, and master volume control.
 */

import { generateReferenceTrack } from './demoTrackGenerator';
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

    // Listeners for UI state syncing
    this.listeners = new Set();
    this.onStateChange = null;
  }

  /**
   * Subscribes to engine state changes (isPlaying, activeSample)
   */
  subscribe(callback) {
    this.listeners.add(callback);
    // Push current state immediately
    callback({ isPlaying: this.isPlaying, activeSample: this.activeSample });
    return () => this.listeners.delete(callback);
  }

  notify(state) {
    this.listeners.forEach(cb => {
      try { cb(state); } catch (err) { console.error('AudioEngine listener error:', err); }
    });
    if (this.onStateChange) this.onStateChange(state);
  }

  /**
   * Initializes AudioContext on user interaction
   */
  async init() {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
    }

    if (this.audioCtx.state === 'suspended') {
      await this.audioCtx.resume();
    }

    if (!this.audioBuffer) {
      // Synthesize high-fidelity reference audio loop
      this.audioBuffer = generateReferenceTrack(this.audioCtx);
    }

    this.setupBaseGraph();
    this.applyRoundFilters(ROUND_DEFINITIONS[this.currentRoundIndex]);
  }

  /**
   * Sets up static nodes: Master Gain, Analyser, and A/B Gain nodes
   */
  setupBaseGraph() {
    if (this.masterGain) return;

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
  }

  /**
   * Disconnects previous filter chain nodes and builds new filters for the current round
   */
  applyRoundFilters(roundDef) {
    if (!this.audioCtx) return;

    this.trimA = roundDef.sampleA.trimGain || 1.0;
    this.trimB = roundDef.sampleB.trimGain || 1.0;

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
      const nodes = [];
      let prevNode = null;

      filterConfigs.forEach(conf => {
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
      });

      // Connect end of chain to gain node
      if (nodes.length > 0) {
        nodes[nodes.length - 1].connect(destinationGain);
      }
      return nodes;
    };

    this.chainANodes = buildChain(roundDef.sampleA.filters || [], this.gainA);
    this.chainBNodes = buildChain(roundDef.sampleB.filters || [], this.gainB);

    // Update active gain value to match new trim
    const now = this.audioCtx.currentTime;
    if (this.activeSample === 'A') {
      this.gainA.gain.setTargetAtTime(this.trimA, now, 0.015);
      this.gainB.gain.setTargetAtTime(0, now, 0.015);
    } else {
      this.gainA.gain.setTargetAtTime(0, now, 0.015);
      this.gainB.gain.setTargetAtTime(this.trimB, now, 0.015);
    }

    // Reconnect source node if playing
    if (this.isPlaying && this.sourceNode) {
      this.reconnectSource();
    }
  }

  /**
   * Connects the running source node to the start of both DSP chains
   */
  reconnectSource() {
    if (!this.sourceNode) return;

    try {
      this.sourceNode.disconnect();
    } catch (e) {}

    // Input to Chain A
    if (this.chainANodes.length > 0) {
      this.sourceNode.connect(this.chainANodes[0]);
    } else {
      this.sourceNode.connect(this.gainA);
    }

    // Input to Chain B
    if (this.chainBNodes.length > 0) {
      this.sourceNode.connect(this.chainBNodes[0]);
    } else {
      this.sourceNode.connect(this.gainB);
    }
  }

  /**
   * Starts or resumes playback
   */
  async play() {
    await this.init();

    if (this.isPlaying) return true;

    // Create new buffer source
    this.sourceNode = this.audioCtx.createBufferSource();
    this.sourceNode.buffer = this.audioBuffer;
    this.sourceNode.loop = true;

    this.reconnectSource();

    // Start playing at current offset
    this.playbackStartTime = this.audioCtx.currentTime - this.pauseOffset;
    this.sourceNode.start(0, this.pauseOffset % this.audioBuffer.duration);
    this.isPlaying = true;

    this.notify({ isPlaying: true });
    return true;
  }

  /**
   * Pauses playback and remembers current offset
   */
  pause() {
    if (!this.isPlaying) return false;

    if (this.audioCtx && this.sourceNode) {
      const elapsed = this.audioCtx.currentTime - this.playbackStartTime;
      this.pauseOffset = elapsed % this.audioBuffer.duration;

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
    if (this.isPlaying) {
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
