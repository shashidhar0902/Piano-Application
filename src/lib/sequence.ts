import { NOTES_PER_DRILL, type Drill } from "@/lib/curriculum";
import { accidentalFor, letterAt, type Clef, type KeyId } from "@/lib/theory";

export type NoteItem = { kind: "note"; clef: Clef; position: number; key: KeyId };
export type ChangeItem = {
  kind: "change";
  clef: Clef;
  key: KeyId;
  clefChanged: boolean;
  keyChanged: boolean;
};
export type SequenceItem = NoteItem | ChangeItem;

function pickPosition(
  pool: number[],
  focus: number[],
  clef: Clef,
  key: KeyId,
  rng: () => number,
  last: string | null,
): number {
  if (pool.length === 0) throw new Error("Drill has no notes for this clef.");
  const altered =
    key === "C" ? [] : pool.filter((position) => accidentalFor(letterAt(clef, position), key) !== "natural");
  const roll = rng();
  let source = pool;
  if (focus.length > 0 && roll < 0.5) source = focus;
  else if (altered.length > 0 && roll < 0.8) source = altered;
  const choose = (items: number[]) => items[Math.floor(rng() * items.length)] ?? items[0];
  let position = choose(source);
  if (pool.length > 1 && last === `${clef}:${position}`) {
    const alt = source.filter((item) => `${clef}:${item}` !== last);
    if (alt.length > 0) position = choose(alt);
  }
  return position;
}

export function buildSequence(drill: Drill, rng: () => number = Math.random): SequenceItem[] {
  const items: SequenceItem[] = [];
  let clef: Clef = drill.clefMode === "fixed" ? (drill.clef ?? "treble") : "treble";
  let keyIndex = 0;
  let key = drill.keys[keyIndex] ?? "C";
  let inGroup = 0;
  let inKey = 0;
  let last: string | null = null;

  for (let n = 0; n < NOTES_PER_DRILL; n++) {
    if (drill.clefMode === "groups" && inGroup >= drill.clefGroup) {
      clef = clef === "treble" ? "bass" : "treble";
      inGroup = 0;
    }
    if (inKey >= drill.keyEvery && drill.keys.length > 1) {
      keyIndex = (keyIndex + 1) % drill.keys.length;
      key = drill.keys[keyIndex] ?? "C";
      inKey = 0;
    }

    const pool = drill.notes.filter((note) => note.clef === clef).map((note) => note.position);
    const focus = drill.focus.filter((note) => note.clef === clef).map((note) => note.position);
    const position = pickPosition(pool, focus, clef, key, rng, last);
    last = `${clef}:${position}`;

    const prev = [...items].reverse().find((item) => item.kind === "note");
    if (prev && prev.kind === "note" && (prev.clef !== clef || prev.key !== key)) {
      items.push({
        kind: "change",
        clef,
        key,
        clefChanged: prev.clef !== clef,
        keyChanged: prev.key !== key,
      });
    }
    items.push({ kind: "note", clef, position, key });
    inGroup += 1;
    inKey += 1;
  }
  return items;
}

export type Miss = {
  clef: Clef;
  position: number;
  key: KeyId;
  count: number;
};

export function addMiss(misses: Miss[], miss: Omit<Miss, "count">): Miss[] {
  const found = misses.find(
    (item) => item.clef === miss.clef && item.position === miss.position && item.key === miss.key,
  );
  if (!found) return [...misses, { ...miss, count: 1 }];
  return misses.map((item) => (item === found ? { ...item, count: item.count + 1 } : item));
}
