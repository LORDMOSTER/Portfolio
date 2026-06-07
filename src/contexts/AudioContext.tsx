import React, { createContext, useContext, useState, useCallback } from 'react';

/* ─────────────────────────────────────────────────────────────────
   AUDIO ENGINE — low-decibel mechanical UI sounds
   Uses Web Audio API. Singleton AudioContext created lazily on
   first user interaction (browser policy compliance).
───────────────────────────────────────────────────────────────── */

let _ctx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!_ctx) {
    _ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return _ctx;
}

/**
 * Soft mechanical "tick" — for tech tag hover.
 * Frequency: ~1200Hz triangle, very short, low gain.
 */
export function playTick(): void {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.06);

    gain.gain.setValueAtTime(0.0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.035, ctx.currentTime + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.07);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.07);
  } catch {
    // Silently fail — audio is non-critical
  }
}

/**
 * Low-frequency "thud/hum" — for opening tier-1 project cards.
 * Sub-bass sine at ~80Hz with short decay.
 */
export function playThud(): void {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(120, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.2);
  } catch {
    // Silently fail
  }
}

/**
 * Terminal keypress click — subtle for command input.
 */
export function playKeyClick(): void {
  try {
    const ctx = getAudioContext();
    const bufferSize = ctx.sampleRate * 0.04;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize) * 0.08;
    }
    const source = ctx.createBufferSource();
    const gain = ctx.createGain();
    source.buffer = buffer;
    source.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    source.start();
  } catch {
    // Silently fail
  }
}

/* ─────────────────────────────────────────────────────────────────
   AUDIO STATE CONTEXT
───────────────────────────────────────────────────────────────── */
interface AudioContextValue {
  audioEnabled: boolean;
  toggleAudio: () => void;
  tick: () => void;
  thud: () => void;
  keyClick: () => void;
}

const AudioCtx = createContext<AudioContextValue>({
  audioEnabled: false,
  toggleAudio: () => {},
  tick: () => {},
  thud: () => {},
  keyClick: () => {},
});

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [audioEnabled, setAudioEnabled] = useState(false);

  const toggleAudio = useCallback(() => {
    setAudioEnabled(prev => {
      // Resume AudioContext on first enable (browser policy)
      if (!prev && _ctx?.state === 'suspended') {
        _ctx.resume();
      }
      return !prev;
    });
  }, []);

  const tick      = useCallback(() => { if (audioEnabled) playTick(); }, [audioEnabled]);
  const thud      = useCallback(() => { if (audioEnabled) playThud(); }, [audioEnabled]);
  const keyClick  = useCallback(() => { if (audioEnabled) playKeyClick(); }, [audioEnabled]);

  return (
    <AudioCtx.Provider value={{ audioEnabled, toggleAudio, tick, thud, keyClick }}>
      {children}
    </AudioCtx.Provider>
  );
};

export const useAudio = (): AudioContextValue => useContext(AudioCtx);
