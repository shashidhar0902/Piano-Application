import type { Clef, KeyId } from "@/lib/theory";

export const NOTES_PER_DRILL = 48;

export type StaffNote = { clef: Clef; position: number };

export type Drill = {
  id: string;
  code: string;
  title: string;
  notes: StaffNote[];
  /** Newly introduced pitches — they show up more often. */
  focus: StaffNote[];
  /** Share of generated notes reserved for newly introduced pitches. */
  focusWeight?: number;
  keys: KeyId[];
  /** How many notes before the key signature changes. */
  keyEvery: number;
  clefMode: "fixed" | "groups";
  clef?: Clef;
  /** How many notes before the clef flips, when clefMode is groups. */
  clefGroup: number;
  /** Optional cycle used by mixed-clef drills. */
  clefOrder?: Clef[];
  /** Choose a clef independently for each note. */
  randomClef?: boolean;
};

export type Chapter = {
  id: string;
  code: string;
  kicker: string;
  title: string;
  summary: string;
  drills: Drill[];
};

function notes(clef: Clef, positions: number[]): StaffNote[] {
  return positions.map((position) => ({ clef, position }));
}

function span(from: number, to: number): number[] {
  const out: number[] = [];
  for (let i = from; i <= to; i++) out.push(i);
  return out;
}

function fixedDrill(
  code: string,
  title: string,
  clef: Clef,
  positions: number[],
  focus: number[],
  keys: KeyId[] = ["C"],
  keyEvery = NOTES_PER_DRILL,
): Drill {
  return {
    id: code,
    code,
    title,
    notes: notes(clef, positions),
    focus: notes(clef, focus),
    focusWeight: focus.length > 0 ? 0.65 : 0,
    keys,
    keyEvery,
    clefMode: "fixed",
    clef,
    clefGroup: NOTES_PER_DRILL,
  };
}

function ladder(
  chapter: string,
  clef: Clef,
  steps: { add: number[]; title: string }[],
  reviewTitle: string,
): Drill[] {
  const learned: number[] = [];
  const drills = steps.map((step, i) => {
    learned.push(...step.add);
    return fixedDrill(
      `${chapter}.${i + 1}`,
      step.title,
      clef,
      [...learned],
      step.add,
    );
  });
  drills.push(
    fixedDrill(`${chapter}.${steps.length + 1}`, reviewTitle, clef, [...learned], []),
  );
  return drills;
}

const KEY_STEPS: { id: KeyId; title: string }[] = [
  { id: "G", title: "G major · one sharp" },
  { id: "D", title: "D major · two sharps" },
  { id: "A", title: "A major · three sharps" },
  { id: "E", title: "E major · four sharps" },
  { id: "F", title: "F major · one flat" },
  { id: "Bb", title: "B♭ major · two flats" },
  { id: "Eb", title: "E♭ major · three flats" },
  { id: "Ab", title: "A♭ major · four flats" },
];

function keyChapter(chapter: string, clef: Clef, positions: number[]): Drill[] {
  const drills = KEY_STEPS.map((step, i) =>
    fixedDrill(`${chapter}.${i + 1}`, step.title, clef, positions, [], [step.id]),
  );
  drills.push(
    fixedDrill(
      `${chapter}.${KEY_STEPS.length + 1}`,
      "All eight keys, changing every eight notes",
      clef,
      positions,
      [],
      KEY_STEPS.map((step) => step.id),
      8,
    ),
  );
  return drills;
}

function ledgerDrills(): Drill[] {
  const bands: { min: number; max: number; title: string }[] = [
    { min: -2, max: 10, title: "One ledger line above and below" },
    { min: -4, max: 12, title: "Two ledger lines" },
    { min: -6, max: 14, title: "Three ledger lines" },
    { min: -8, max: 16, title: "Four ledger lines" },
    { min: -10, max: 18, title: "Five ledger lines" },
  ];
  let prevMin = 0;
  let prevMax = 8;
  const drills = bands.map((band, i) => {
    const positions = span(band.min, band.max);
    const focus = positions.filter((position) => position < prevMin || position > prevMax);
    prevMin = band.min;
    prevMax = band.max;
    return fixedDrill(`1.4.${i + 1}`, band.title, "treble", positions, focus);
  });
  drills.push(
    fixedDrill("1.4.6", "Every note out to five ledger lines", "treble", span(-10, 18), []),
  );
  return drills;
}

const TREBLE_STAFF = span(0, 8);
const TREBLE_NEAR = span(-2, 11);
const BASS_STAFF = span(0, 8);
const BASS_NEAR = span(-3, 11);

function mixed(
  code: string,
  title: string,
  treble: number[],
  bass: number[],
  clefGroup: number,
  keys: KeyId[] = ["C"],
  keyEvery = NOTES_PER_DRILL,
): Drill {
  return {
    id: code,
    code,
    title,
    notes: [...notes("treble", treble), ...notes("bass", bass)],
    focus: [],
    keys,
    keyEvery,
    clefMode: "groups",
    clefGroup,
  };
}

function clefLadder(chapter: string, clef: Clef, anchor: number): Drill[] {
  const steps = [
    { add: [anchor, anchor + 4], title: "Anchor C and G above it" },
    { add: [anchor - 2], title: "F below the anchor" },
    { add: [anchor + 2], title: "A above the anchor" },
    { add: [anchor - 4], title: "E below the anchor" },
    { add: [anchor + 6], title: "B above the anchor" },
    { add: [anchor - 6], title: "D below the anchor" },
  ];
  const learned: number[] = [];
  const drills = steps.map((step, index) => {
    learned.push(...step.add);
    return fixedDrill(`${chapter}.${index + 1}`, step.title, clef, [...learned], step.add);
  });
  drills.push(
    fixedDrill(`${chapter}.7`, "All previous notes plus the remaining staff", clef, span(0, 8), []),
    fixedDrill(`${chapter}.8`, "Full staff mixed", clef, span(0, 8), []),
  );
  return drills;
}

function cClefKeyChapter(chapter: string, clef: Clef): Drill[] {
  const keys: KeyId[] = ["G", "D", "A", "F", "Bb", "Eb"];
  return [
    ...keys.map((key, index) =>
      fixedDrill(`${chapter}.${index + 1}`, `${key} major · key signature`, clef, span(0, 8), [], [key]),
    ),
    fixedDrill(`${chapter}.7`, "Mixed key signatures", clef, span(0, 8), [], keys, 8),
  ];
}

function mixedClefs(
  code: string,
  title: string,
  clefOrder: Clef[],
  positions: number[],
  keyEvery = NOTES_PER_DRILL,
): Drill {
  return {
    id: code,
    code,
    title,
    notes: clefOrder.flatMap((clef) => notes(clef, positions)),
    focus: [],
    keys: ["C"],
    keyEvery,
    clefMode: "groups",
    clefGroup: 1,
    clefOrder,
  };
}

export const chapters: Chapter[] = [
  {
    id: "1.1",
    code: "1.1",
    kicker: "Treble clef",
    title: "Part one",
    summary: "The nine notes that sit on the staff. Landmarks first, then the neighbors.",
    drills: ladder(
      "1.1",
      "treble",
      [
        { add: [2, 5], title: "G on the 2nd line and C on the 3rd space" },
        { add: [4], title: "B on the 3rd line" },
        { add: [3], title: "A on the 2nd space" },
        { add: [1], title: "F on the 1st space" },
        { add: [0], title: "E on the 1st line" },
        { add: [6], title: "D on the 4th line" },
        { add: [7], title: "E on the 4th space" },
        { add: [8], title: "F on the 5th line" },
      ],
      "All the notes on the staff",
    ),
  },
  {
    id: "1.2",
    code: "1.2",
    kicker: "Treble clef",
    title: "Part two",
    summary: "Middle C, and the notes that sit just off the staff.",
    drills: ladder(
      "1.2",
      "treble",
      [
        { add: [-2], title: "Middle C, one ledger line below" },
        { add: [-1], title: "D in the space below the staff" },
        { add: [9], title: "G in the space above the staff" },
        { add: [10], title: "A on one ledger line above" },
        { add: [11], title: "B in the space above that ledger" },
      ],
      "Every treble note so far",
    ).map((drill, index) =>
      index === 0
        ? drill
        : {
            ...drill,
            notes: notes("treble", [...TREBLE_STAFF, ...drill.notes.map((note) => note.position).filter((p) => p < 0 || p > 8)]),
          },
    ),
  },
  {
    id: "1.3",
    code: "1.3",
    kicker: "Treble clef",
    title: "Key signatures",
    summary: "The signature sits beside the clef. Name the note it makes — in every octave.",
    drills: keyChapter("1.3", "treble", TREBLE_NEAR),
  },
  {
    id: "1.4",
    code: "1.4",
    kicker: "Treble clef",
    title: "Ledger lines",
    summary: "Out past the staff, one layer at a time, up to five ledger lines.",
    drills: ledgerDrills(),
  },
  {
    id: "1.5",
    code: "1.5",
    kicker: "Bass clef",
    title: "Part one",
    summary: "The bass staff. F on the fourth line is home, the way G is home in treble.",
    drills: ladder(
      "1.5",
      "bass",
      [
        { add: [6, 3], title: "F on the 4th line and C on the 2nd space" },
        { add: [4], title: "D on the 3rd line" },
        { add: [5], title: "E on the 3rd space" },
        { add: [2], title: "B on the 2nd line" },
        { add: [1], title: "A on the 1st space" },
        { add: [0], title: "G on the 1st line" },
        { add: [7], title: "G on the 4th space" },
        { add: [8], title: "A on the 5th line" },
      ],
      "All the notes on the staff",
    ),
  },
  {
    id: "1.6",
    code: "1.6",
    kicker: "Bass clef",
    title: "Part two",
    summary: "Middle C from below, and the notes just off the bass staff.",
    drills: [
      fixedDrill("1.6.1", "Middle C, one ledger line above", "bass", [8, 10], [10]),
      fixedDrill("1.6.2", "B in the space above the staff", "bass", [...BASS_STAFF, 9, 10], [9]),
      fixedDrill("1.6.3", "D in the space above middle C", "bass", [...BASS_STAFF, 9, 10, 11], [11]),
      fixedDrill("1.6.4", "F in the space below the staff", "bass", [-1, ...BASS_STAFF, 9, 10, 11], [-1]),
      fixedDrill("1.6.5", "E on one ledger line below", "bass", [-2, -1, ...BASS_STAFF, 9, 10, 11], [-2]),
      fixedDrill(
        "1.6.6",
        "D in the space below that ledger",
        "bass",
        [-3, -2, -1, ...BASS_STAFF, 9, 10, 11],
        [-3],
      ),
      fixedDrill("1.6.7", "Every bass note so far", "bass", BASS_NEAR, []),
    ],
  },
  {
    id: "1.7",
    code: "1.7",
    kicker: "Bass clef",
    title: "Key signatures",
    summary: "The same keys, now read under the bass clef.",
    drills: keyChapter("1.7", "bass", BASS_NEAR),
  },
  {
    id: "1.8",
    code: "1.8",
    kicker: "Both clefs",
    title: "Treble and bass",
    summary: "The clef can change. Read it before you name the note.",
    drills: [
      mixed("1.8.1", "Staff notes, clef changes every four", TREBLE_STAFF, BASS_STAFF, 4),
      mixed("1.8.2", "With middle C, clef changes every four", TREBLE_NEAR, BASS_NEAR, 4),
      mixed("1.8.3", "Same range, clef changes every two notes", TREBLE_NEAR, BASS_NEAR, 2),
      mixed("1.8.4", "Clef changes on every note", TREBLE_NEAR, BASS_NEAR, 1),
      mixed(
        "1.8.5",
        "G major and F major, both clefs",
        TREBLE_NEAR,
        BASS_NEAR,
        4,
        ["G", "F"],
        8,
      ),
      mixed(
        "1.8.6",
        "Keys and clefs together",
        span(-4, 12),
        span(-4, 12),
        4,
        KEY_STEPS.map((step) => step.id),
        8,
      ),
    ],
  },
  {
    id: "2.1",
    code: "2.1",
    kicker: "Alto clef",
    title: "Part one",
    summary: "C on the middle line, then the neighboring notes in a careful ladder.",
    drills: clefLadder("2.1", "alto", 4),
  },
  {
    id: "2.2",
    code: "2.2",
    kicker: "Alto clef",
    title: "Part two",
    summary: "Ledger lines above and below the alto staff.",
    drills: [
      fixedDrill("2.2.1", "One ledger line above", "alto", span(0, 10), [10]),
      fixedDrill("2.2.2", "One ledger line below", "alto", span(-2, 8), [-2]),
      fixedDrill("2.2.3", "Two ledger lines both ways", "alto", span(-4, 12), [-4, 12]),
      fixedDrill("2.2.4", "Alto staff and ledger lines mixed", "alto", span(-4, 12), []),
    ],
  },
  {
    id: "2.3",
    code: "2.3",
    kicker: "Alto clef",
    title: "Key signatures",
    summary: "Read the same signatures from the center of the alto staff.",
    drills: cClefKeyChapter("2.3", "alto"),
  },
  {
    id: "2.4",
    code: "2.4",
    kicker: "Tenor clef",
    title: "Part one",
    summary: "C on the fourth line, introduced one neighboring note at a time.",
    drills: clefLadder("2.4", "tenor", 6),
  },
  {
    id: "2.5",
    code: "2.5",
    kicker: "Tenor clef",
    title: "Part two",
    summary: "Extend tenor reading beyond the staff.",
    drills: [
      fixedDrill("2.5.1", "One ledger line above", "tenor", span(0, 10), [10]),
      fixedDrill("2.5.2", "One ledger line below", "tenor", span(-2, 8), [-2]),
      fixedDrill("2.5.3", "Two ledger lines both ways", "tenor", span(-4, 12), [-4, 12]),
      fixedDrill("2.5.4", "Tenor staff and ledger lines mixed", "tenor", span(-4, 12), []),
    ],
  },
  {
    id: "2.6",
    code: "2.6",
    kicker: "Tenor clef",
    title: "Key signatures",
    summary: "Make tenor clef fluent across changing signatures.",
    drills: cClefKeyChapter("2.6", "tenor"),
  },
  {
    id: "2.7",
    code: "2.7",
    kicker: "C-clefs",
    title: "Alto and tenor",
    summary: "Switch between the two C-clefs before adding the familiar clefs back in.",
    drills: [
      mixedClefs("2.7.1", "Alto and tenor, four notes each", ["alto", "tenor"], span(0, 8), 4),
      mixedClefs("2.7.2", "Alto and tenor, every note", ["alto", "tenor"], span(0, 8)),
    ],
  },
  {
    id: "2.8",
    code: "2.8",
    kicker: "Four clefs",
    title: "Full Level 2 mix",
    summary: "Treble, bass, alto, and tenor in one reading line.",
    drills: [
      mixedClefs("2.8.1", "Four clefs, four notes each", ["treble", "bass", "alto", "tenor"], span(0, 8), 4),
      mixedClefs("2.8.2", "Four clefs, every note", ["treble", "bass", "alto", "tenor"], span(-2, 10)),
      {
        ...mixedClefs("2.8.3", "Four clefs and changing keys", ["treble", "bass", "alto", "tenor"], span(-4, 12), 8),
        keys: ["C", "G", "F", "Bb"],
      },
    ],
  },
  {
    id: "3.1",
    code: "3.1",
    kicker: "Soprano clef",
    title: "C on the first line",
    summary: "Build soprano clef recognition from its anchor note outward.",
    drills: clefLadder("3.1", "soprano", 0),
  },
  {
    id: "3.2",
    code: "3.2",
    kicker: "Mezzo-soprano clef",
    title: "C on the second line",
    summary: "A second C-clef position, learned without skipping the basics.",
    drills: clefLadder("3.2", "mezzo", 2),
  },
  {
    id: "3.3",
    code: "3.3",
    kicker: "Baritone clef",
    title: "C on the fifth line",
    summary: "The high C-clef position used for baritone writing.",
    drills: clefLadder("3.3", "baritone", 8),
  },
  {
    id: "3.4",
    code: "3.4",
    kicker: "Rare C-clefs",
    title: "Soprano, mezzo, baritone",
    summary: "Switch among the three less familiar C-clef positions.",
    drills: [
      mixedClefs("3.4.1", "Three C-clefs, four notes each", ["soprano", "mezzo", "baritone"], span(0, 8), 4),
      mixedClefs("3.4.2", "Three C-clefs, every note", ["soprano", "mezzo", "baritone"], span(-2, 10)),
    ],
  },
  {
    id: "3.5",
    code: "3.5",
    kicker: "All seven clefs",
    title: "Basic fluency",
    summary: "Every standard clef, with a focused range before the final challenges.",
    drills: [
      mixedClefs("3.5.1", "Seven clefs, four notes each", ["treble", "bass", "alto", "tenor", "soprano", "mezzo", "baritone"], span(0, 8), 4),
      mixedClefs("3.5.2", "Seven clefs, every note", ["treble", "bass", "alto", "tenor", "soprano", "mezzo", "baritone"], span(-2, 10)),
    ],
  },
  {
    id: "3.6",
    code: "3.6",
    kicker: "All seven clefs",
    title: "Advanced fluency",
    summary: "Ledger lines and signatures across the complete clef family.",
    drills: [
      {
        ...mixedClefs("3.6.1", "Seven clefs with ledger lines", ["treble", "bass", "alto", "tenor", "soprano", "mezzo", "baritone"], span(-4, 12), 4),
        keys: ["C", "G", "F", "Bb", "D"],
      },
      {
        ...mixedClefs("3.6.2", "All signatures and ledger lines", ["treble", "bass", "alto", "tenor", "soprano", "mezzo", "baritone"], span(-6, 14), 4),
        keys: ["C", "G", "D", "A", "F", "Bb", "Eb"],
      },
    ],
  },
  {
    id: "3.7",
    code: "3.7",
    kicker: "Challenge",
    title: "Speed and accuracy",
    summary: "A new clef on every note. Read the symbol first, then the pitch.",
    drills: [
      {
        ...mixedClefs("3.7.1", "Random clef every note", ["treble", "bass", "alto", "tenor", "soprano", "mezzo", "baritone"], span(-4, 12)),
        randomClef: true,
      },
    ],
  },
  {
    id: "3.8",
    code: "3.8",
    kicker: "Final boss",
    title: "The complete reader",
    summary: "Full range, all seven clefs, every supported key signature.",
    drills: [
      {
        ...mixedClefs("3.8.1", "Full range, all clefs, all keys", ["treble", "bass", "alto", "tenor", "soprano", "mezzo", "baritone"], span(-10, 18), 1),
        keys: ["C", "G", "D", "A", "E", "F", "Bb", "Eb", "Ab"],
      },
    ],
  },
];

export function allDrills(): Drill[] {
  return chapters.flatMap((chapter) => chapter.drills);
}

export function findDrill(id: string): { chapter: Chapter; drill: Drill } | undefined {
  for (const chapter of chapters) {
    const drill = chapter.drills.find((item) => item.id === id);
    if (drill) return { chapter, drill };
  }
  return undefined;
}

/**
 * Part two should keep the notes already learned on the staff, not only the new ledger notes.
 * The ladder helper only accumulates positions it was given, so patch 1.2 after the first step.
 */
function withStaff(drill: Drill, staff: number[], clef: Clef): Drill {
  const extra = drill.notes.map((note) => note.position);
  const positions = [...new Set([...staff, ...extra])].sort((a, b) => a - b);
  return { ...drill, notes: notes(clef, positions) };
}

chapters[1].drills = chapters[1].drills.map((drill, index) =>
  index === 0 ? { ...drill, notes: notes("treble", [0, -2]), focus: notes("treble", [-2]) } : withStaff(drill, TREBLE_STAFF, "treble"),
);
