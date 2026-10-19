export const LETTERS = ["C", "D", "E", "F", "G", "A", "B"] as const;
export type Letter = (typeof LETTERS)[number];
export type Clef = "treble" | "bass";
export type Accidental = "natural" | "sharp" | "flat";
export type KeyId = "C" | "G" | "D" | "A" | "E" | "F" | "Bb" | "Eb" | "Ab";

export const SHARP_LETTERS: readonly Letter[] = ["F", "C", "G", "D", "A", "E", "B"];
export const FLAT_LETTERS: readonly Letter[] = ["B", "E", "A", "D", "G", "C", "F"];

export type KeyInfo = {
  id: KeyId;
  name: string;
  /** Positive sharps, negative flats, zero for C major. */
  fifths: number;
};

export const KEYS: Record<KeyId, KeyInfo> = {
  C: { id: "C", name: "C major", fifths: 0 },
  G: { id: "G", name: "G major", fifths: 1 },
  D: { id: "D", name: "D major", fifths: 2 },
  A: { id: "A", name: "A major", fifths: 3 },
  E: { id: "E", name: "E major", fifths: 4 },
  F: { id: "F", name: "F major", fifths: -1 },
  Bb: { id: "Bb", name: "B♭ major", fifths: -2 },
  Eb: { id: "Eb", name: "E♭ major", fifths: -3 },
  Ab: { id: "Ab", name: "A♭ major", fifths: -4 },
};

/**
 * Staff position of each signature accidental, in order.
 * 0 is the bottom line; +1 is the space above it.
 * Matches standard engraving (bass is the treble signature shifted down a line).
 */
export const SIG_POS: Record<Clef, { sharp: number[]; flat: number[] }> = {
  treble: {
    sharp: [8, 5, 9, 6, 3, 7, 4],
    flat: [4, 7, 3, 6, 2, 5, 1],
  },
  bass: {
    sharp: [6, 3, 7, 4, 1, 5, 2],
    flat: [2, 5, 1, 4, 0, 3, -1],
  },
};

const TREBLE_FROM_BOTTOM = ["E", "F", "G", "A", "B", "C", "D"] as const;
const BASS_FROM_BOTTOM = ["G", "A", "B", "C", "D", "E", "F"] as const;
const SEMI: Record<Letter, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

export function letterAt(clef: Clef, position: number): Letter {
  const scale = clef === "treble" ? TREBLE_FROM_BOTTOM : BASS_FROM_BOTTOM;
  const idx = ((position % 7) + 7) % 7;
  return scale[idx];
}

export function octaveAt(clef: Clef, position: number): number {
  if (clef === "treble") return 4 + Math.floor((position + 2) / 7);
  return 2 + Math.floor((position + 4) / 7);
}

export function accidentalFor(letter: Letter, key: KeyId): Accidental {
  const fifths = KEYS[key].fifths;
  if (fifths > 0 && SHARP_LETTERS.slice(0, fifths).includes(letter)) return "sharp";
  if (fifths < 0 && FLAT_LETTERS.slice(0, -fifths).includes(letter)) return "flat";
  return "natural";
}

export function spell(letter: Letter, acc: Accidental): string {
  if (acc === "sharp") return `${letter}♯`;
  if (acc === "flat") return `${letter}♭`;
  return letter;
}

export function answerFor(clef: Clef, position: number, key: KeyId): { letter: Letter; acc: Accidental } {
  const letter = letterAt(clef, position);
  return { letter, acc: accidentalFor(letter, key) };
}

export function midiOf(clef: Clef, position: number, acc: Accidental): number {
  const letter = letterAt(clef, position);
  const oct = octaveAt(clef, position);
  let semi = SEMI[letter];
  if (acc === "sharp") semi += 1;
  if (acc === "flat") semi -= 1;
  return (oct + 1) * 12 + semi;
}

const ORDS = ["", "1st", "2nd", "3rd", "4th", "5th"];

export function placeName(position: number): string {
  if (position >= 0 && position <= 8) {
    const n = Math.floor(position / 2) + 1;
    return position % 2 === 0 ? `${ORDS[n]} line` : `${ORDS[n]} space`;
  }
  if (position > 8) {
    const above = position - 8;
    if (above % 2 === 0) {
      const ledger = above / 2;
      return ledger === 1 ? "1 ledger line above" : `${ledger} ledger lines above`;
    }
    const ledger = Math.floor(above / 2);
    if (ledger === 0) return "space above the staff";
    return ledger === 1 ? "space above 1 ledger line" : `space above ${ledger} ledger lines`;
  }
  const below = -position;
  if (below % 2 === 0) {
    const ledger = below / 2;
    return ledger === 1 ? "1 ledger line below" : `${ledger} ledger lines below`;
  }
  const ledger = Math.floor(below / 2);
  if (ledger === 0) return "space below the staff";
  return ledger === 1 ? "space below 1 ledger line" : `space below ${ledger} ledger lines`;
}

export function noteTitle(clef: Clef, position: number, acc: Accidental): string {
  const name = spell(letterAt(clef, position), acc);
  const middle =
    (clef === "treble" && position === -2) || (clef === "bass" && position === 10);
  const where = middle ? "middle C" : `${clef} · ${placeName(position)}`;
  return middle && acc === "natural" ? "Middle C" : `${name} · ${where}`;
}

export function keyBlurb(key: KeyId): string {
  const fifths = KEYS[key].fifths;
  if (fifths === 0) return "no sharps or flats";
  if (fifths === 1) return "1 sharp";
  if (fifths === -1) return "1 flat";
  if (fifths > 0) return `${fifths} sharps`;
  return `${-fifths} flats`;
}

export function signaturePositions(clef: Clef, key: KeyId): { acc: "sharp" | "flat"; position: number }[] {
  const fifths = KEYS[key].fifths;
  if (fifths === 0) return [];
  const acc = fifths > 0 ? "sharp" : "flat";
  return SIG_POS[clef][acc].slice(0, Math.abs(fifths)).map((position) => ({ acc, position }));
}
