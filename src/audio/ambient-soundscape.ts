// Procedural Web Audio API soundscape generator for Ofrenda Viva AI
// Zero external MP3 files - 100% offline and browser native

class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private currentMode: 'ofrenda' | 'ghost' = 'ofrenda';

  // Ofrenda nodes
  private candleNoiseNode: AudioBufferSourceNode | null = null;
  private candleGain: GainNode | null = null;

  // Ghost nodes
  private crtOsc: OscillatorNode | null = null;
  private crtGain: GainNode | null = null;
  private staticNode: AudioBufferSourceNode | null = null;
  private staticGain: GainNode | null = null;

  private masterGain: GainNode | null = null;

  constructor() {}

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.initContext();
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopAll();
    } else {
      if (this.currentMode === 'ofrenda') {
        this.startOfrendaAmbience();
      } else {
        this.startGhostAmbience();
      }
    }
    return !this.isMuted;
  }

  public getIsPlaying(): boolean {
    return !this.isMuted;
  }

  public setMode(mode: 'ofrenda' | 'ghost') {
    this.currentMode = mode;
    if (!this.isMuted) {
      this.stopAll();
      if (mode === 'ofrenda') {
        this.startOfrendaAmbience();
      } else {
        this.startGhostAmbience();
      }
    }
  }

  // --- DÍA DE LOS MUERTOS PROCEDURAL AUDIO ---

  private startOfrendaAmbience() {
    if (!this.ctx || !this.masterGain) return;

    // Gentle candle crackle
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      // Pink noise + random pops
      const isPop = Math.random() < 0.002;
      output[i] = isPop ? (Math.random() - 0.5) * 0.8 : (Math.random() - 0.5) * 0.05;
    }

    this.candleNoiseNode = this.ctx.createBufferSource();
    this.candleNoiseNode.buffer = noiseBuffer;
    this.candleNoiseNode.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(950, this.ctx.currentTime);
    filter.Q.setValueAtTime(2.5, this.ctx.currentTime);

    this.candleGain = this.ctx.createGain();
    this.candleGain.gain.setValueAtTime(0.12, this.ctx.currentTime);

    this.candleNoiseNode.connect(filter);
    filter.connect(this.candleGain);
    this.candleGain.connect(this.masterGain);
    this.candleNoiseNode.start();
  }

  // Plucked Spanish Nylon Guitar Note (Karplus-Strong approximation)
  public playGuitarPluck(freq: number = 220) {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Warm triangle-sine blend
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.22, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.8);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1800, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 1.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 2.0);
    } catch {
      // AudioContext interrupted
    }
  }

  // Sanctuary Bell Toll
  public playSanctuaryBell() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      const freqs = [440, 882, 1324, 1770];
      const gains = [0.25, 0.15, 0.08, 0.03];

      freqs.forEach((freq, i) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(gains[i], now);
        gain.gain.exponentialRampToValueAtTime(0.00001, now + 3.5);

        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 3.8);
      });
    } catch {
      // Pass
    }
  }

  // --- GHOST IN THE MACHINE PROCEDURAL AUDIO ---

  private startGhostAmbience() {
    if (!this.ctx || !this.masterGain) return;

    // 50Hz CRT Transformer Hum
    this.crtOsc = this.ctx.createOscillator();
    this.crtOsc.type = 'sawtooth';
    this.crtOsc.frequency.setValueAtTime(55, this.ctx.currentTime);

    const crtFilter = this.ctx.createBiquadFilter();
    crtFilter.type = 'lowpass';
    crtFilter.frequency.setValueAtTime(140, this.ctx.currentTime);

    this.crtGain = this.ctx.createGain();
    this.crtGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

    this.crtOsc.connect(crtFilter);
    crtFilter.connect(this.crtGain);
    this.crtGain.connect(this.masterGain);
    this.crtOsc.start();

    // Eerie Radio Static Whisper
    const bufferSize = this.ctx.sampleRate * 2;
    const staticBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = staticBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() - 0.5) * 0.04;
    }

    this.staticNode = this.ctx.createBufferSource();
    this.staticNode.buffer = staticBuffer;
    this.staticNode.loop = true;

    const bandFilter = this.ctx.createBiquadFilter();
    bandFilter.type = 'bandpass';
    bandFilter.frequency.setValueAtTime(2200, this.ctx.currentTime);
    bandFilter.Q.setValueAtTime(4.0, this.ctx.currentTime);

    this.staticGain = this.ctx.createGain();
    this.staticGain.gain.setValueAtTime(0.06, this.ctx.currentTime);

    this.staticNode.connect(bandFilter);
    bandFilter.connect(this.staticGain);
    this.staticGain.connect(this.masterGain);
    this.staticNode.start();
  }

  // Mechanical Keystroke Ping
  public playKeystroke() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(800 + Math.random() * 400, now);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // Pass
    }
  }

  // Spectral Séance Manifestation
  public playSpiritManifest() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(620, now + 0.8);
      osc.frequency.exponentialRampToValueAtTime(110, now + 2.2);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.7);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.3);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 2.4);
    } catch {
      // Pass
    }
  }

  private stopAll() {
    try {
      if (this.candleNoiseNode) {
        this.candleNoiseNode.stop();
        this.candleNoiseNode.disconnect();
        this.candleNoiseNode = null;
      }
      if (this.crtOsc) {
        this.crtOsc.stop();
        this.crtOsc.disconnect();
        this.crtOsc = null;
      }
      if (this.staticNode) {
        this.staticNode.stop();
        this.staticNode.disconnect();
        this.staticNode = null;
      }
    } catch {
      // Handled
    }
  }
}

export const ambientSound = new AmbientSoundEngine();
