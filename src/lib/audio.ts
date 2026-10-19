let ctx: AudioContext | null = null;

function context(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor = window.AudioContext ?? window.webkitAudioContext;
  if (!Ctor) return null;
  if (!ctx) ctx = new Ctor();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

export function playMidi(midi: number) {
  const audio = context();
  if (!audio) return;
  const t = audio.currentTime;
  const freq = 440 * 2 ** ((midi - 69) / 12);
  const master = audio.createGain();
  master.gain.setValueAtTime(0.9, t);
  master.connect(audio.destination);

  const partials: { type: OscillatorType; mul: number; gain: number }[] = [
    { type: "sine", mul: 1, gain: 0.11 },
    { type: "triangle", mul: 2, gain: 0.035 },
  ];
  for (const partial of partials) {
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.type = partial.type;
    osc.frequency.setValueAtTime(freq * partial.mul, t);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(partial.gain, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);
    osc.connect(gain);
    gain.connect(master);
    osc.start(t);
    osc.stop(t + 0.72);
  }
}

export function playWrong() {
  const audio = context();
  if (!audio) return;
  const t = audio.currentTime;
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(196, t);
  osc.frequency.exponentialRampToValueAtTime(140, t + 0.12);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(0.05, t + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
  osc.connect(gain);
  gain.connect(audio.destination);
  osc.start(t);
  osc.stop(t + 0.18);
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}
