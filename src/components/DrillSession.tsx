import { ChevronLeft, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NoteRing } from "@/components/NoteRing";
import { StaffLine } from "@/components/StaffLine";
import { playMidi, playWrong } from "@/lib/audio";
import { NOTES_PER_DRILL, type Drill } from "@/lib/curriculum";
import { addMiss, buildSequence, type Miss, type SequenceItem } from "@/lib/sequence";
import {
  answerFor,
  keyBlurb,
  KEYS,
  midiOf,
  noteTitle,
  type Accidental,
  type Clef,
  type KeyId,
  type Letter,
} from "@/lib/theory";

const MUTE_KEY = "clefring.mute";

function formatTime(ms: number) {
  const total = Math.max(0, Math.round(ms / 1000));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

function reducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function DrillSession({
  drill,
  chapterLabel,
  onExit,
  onComplete,
}: {
  drill: Drill;
  chapterLabel: string;
  onExit: () => void;
  onComplete: (accuracy: number, ms: number) => void;
}) {
  const [items, setItems] = useState<SequenceItem[] | null>(null);
  const [index, setIndex] = useState(0);
  const [tries, setTries] = useState(0);
  const [firstHits, setFirstHits] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [misses, setMisses] = useState<Miss[]>([]);
  const [locked, setLocked] = useState(false);
  const [wrongId, setWrongId] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [done, setDone] = useState(false);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [muted, setMuted] = useState(false);
  const [streak, setStreak] = useState(0);
  const gen = useRef(0);
  const saved = useRef(false);

  useEffect(() => {
    setItems(buildSequence(drill));
    setMuted(localStorage.getItem(MUTE_KEY) === "1");
  }, [drill]);

  useEffect(() => {
    if (!startedAt || done) return;
    const id = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(id);
  }, [startedAt, done]);

  const current = items?.[index];
  const waitingOnChange = current?.kind === "change";

  useEffect(() => {
    if (!items || !waitingOnChange || done) return;
    const wait = reducedMotion() ? 0 : 680;
    const id = window.setTimeout(() => {
      setIndex((value) => Math.min(items.length - 1, value + 1));
    }, wait);
    return () => window.clearTimeout(id);
  }, [items, index, waitingOnChange, done]);

  useEffect(() => {
    if (!done || saved.current || !startedAt) return;
    saved.current = true;
    const accuracy = answered === 0 ? 0 : Math.round((firstHits / answered) * 100);
    onComplete(accuracy, Date.now() - startedAt);
  }, [done, startedAt, answered, firstHits, onComplete]);

  function toggleMute() {
    setMuted((value) => {
      localStorage.setItem(MUTE_KEY, value ? "0" : "1");
      return !value;
    });
  }

  function restart() {
    gen.current += 1;
    saved.current = false;
    setItems(buildSequence(drill));
    setIndex(0);
    setTries(0);
    setFirstHits(0);
    setAnswered(0);
    setMisses([]);
    setLocked(false);
    setWrongId(null);
    setShowHint(false);
    setDone(false);
    setStartedAt(null);
    setStreak(0);
    setNow(Date.now());
  }

  function pick(letter: Letter, acc: Accidental) {
    if (!items || locked || done || !current || current.kind !== "note") return;
    if (!startedAt) {
      setStartedAt(Date.now());
      setNow(Date.now());
    }
    const want = answerFor(current.clef, current.position, current.key);
    if (letter !== want.letter || acc !== want.acc) {
      if (tries === 0) {
        setMisses((prev) =>
          addMiss(prev, { clef: current.clef, position: current.position, key: current.key }),
        );
        setStreak(0);
      }
      setTries((value) => value + 1);
      if (tries + 1 >= 2) setShowHint(true);
      setWrongId(`${letter}:${acc}`);
      if (!muted) playWrong();
      const stamp = gen.current;
      window.setTimeout(() => {
        if (gen.current === stamp) setWrongId(null);
      }, 420);
      return;
    }

    if (tries === 0) {
      setFirstHits((value) => value + 1);
      setStreak((value) => value + 1);
    } else {
      setStreak(0);
    }
    setAnswered((value) => value + 1);
    if (!muted) playMidi(midiOf(current.clef, current.position, want.acc));
    setLocked(true);
    setShowHint(false);
    setTries(0);
    setWrongId(null);
    const stamp = gen.current;
    const wait = reducedMotion() ? 40 : 280;
    window.setTimeout(() => {
      if (gen.current !== stamp) return;
      const next = index + 1;
      if (!items[next]) setDone(true);
      else setIndex(next);
      setLocked(false);
    }, wait);
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey || event.repeat) return;
      const key = event.key.toUpperCase();
      if (key.length !== 1 || !"CDEFGAB".includes(key)) return;
      event.preventDefault();
      const fifths = current && "key" in current ? KEYS[current.key].fifths : 0;
      let acc: Accidental = "natural";
      if (event.shiftKey && fifths > 0) acc = "sharp";
      else if (event.shiftKey && fifths < 0) acc = "flat";
      else if (event.shiftKey) return;
      pick(key as Letter, acc);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const bounds = boundsOf(drill);
  const activeKey = current?.key ?? drill.keys[0] ?? "C";
  const hint =
    showHint && current?.kind === "note" ? answerFor(current.clef, current.position, current.key) : null;
  const accuracy = answered === 0 ? 0 : Math.round((firstHits / answered) * 100);
  const elapsed = startedAt ? (done ? now : now) - startedAt : 0;
  const shownElapsed = startedAt ? (done ? Date.now() : now) - startedAt : 0;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-4 sm:px-6 sm:py-6">
      <header className="flex items-start gap-2">
        <button
          type="button"
          onClick={onExit}
          className="tap mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-full text-ink"
          aria-label="Back to chapters"
        >
          <ChevronLeft className="size-6" />
        </button>
        <div className="min-w-0 flex-1 pt-1">
          <p className="text-xs tracking-wide text-muted">
            {chapterLabel} · {drill.code}
          </p>
          <h1 className="font-display text-xl leading-snug font-medium text-ink sm:text-2xl">{drill.title}</h1>
        </div>
        <button
          type="button"
          onClick={toggleMute}
          className="tap mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-full text-ink"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
        </button>
      </header>

      <StaffLine
        items={items ?? []}
        index={index}
        minPos={bounds.min}
        maxPos={bounds.max}
        clefs={bounds.clefs}
      />

      <div className="flex items-center gap-3 px-1">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink/10">
          <div
            className="h-full rounded-full bg-accent"
            style={{ width: `${(answered / NOTES_PER_DRILL) * 100}%` }}
          />
        </div>
        <p className="nums text-sm text-muted">
          {answered}/{NOTES_PER_DRILL}
          <span className="px-2 text-ink/30">·</span>
          {formatTime(shownElapsed)}
          {streak >= 3 ? <span className="text-accent"> · {streak}</span> : null}
        </p>
      </div>

      <p className="min-h-6 px-1 text-center text-sm text-muted" aria-live="polite">
        {done
          ? "Line complete."
          : waitingOnChange && current.kind === "change"
            ? changeCaption(current.clef, current.key, current.clefChanged, current.keyChanged)
            : showHint
              ? "The right letter is lit. Tap it."
              : wrongId
                ? "Not that one. The note is still waiting."
                : "Name the letter. The octave does not change the answer."}
      </p>

      {done ? (
        <Result
          accuracy={accuracy}
          elapsed={elapsed || shownElapsed}
          misses={misses}
          onAgain={restart}
          onExit={onExit}
        />
      ) : (
        <>
          <NoteRing
            keyId={activeKey}
            disabled={!current || current.kind !== "note" || locked}
            wrongId={wrongId}
            hint={hint}
            onPick={pick}
          />
          {activeKey !== "C" ? (
            <p className="hidden text-center text-sm text-muted md:block">
              Letter keys work. Hold Shift for {KEYS[activeKey].fifths > 0 ? "sharps" : "flats"}.
            </p>
          ) : (
            <p className="hidden text-center text-sm text-muted md:block">Letter keys C through B work too.</p>
          )}
        </>
      )}
    </div>
  );
}

function changeCaption(clef: Clef, key: KeyId, clefChanged: boolean, keyChanged: boolean) {
  const bits: string[] = [];
  if (clefChanged) bits.push(clef === "treble" ? "Treble clef" : "Bass clef");
  if (keyChanged) bits.push(`${KEYS[key].name}, ${keyBlurb(key)}`);
  return bits.join(" · ");
}

function boundsOf(drill: Drill) {
  let min = 0;
  let max = 8;
  const clefs = new Set<Clef>();
  for (const note of drill.notes) {
    clefs.add(note.clef);
    min = Math.min(min, note.position);
    max = Math.max(max, note.position);
  }
  for (const key of drill.keys) {
    if (key === "C") continue;
  }
  return { min, max, clefs: [...clefs] };
}

function Result({
  accuracy,
  elapsed,
  misses,
  onAgain,
  onExit,
}: {
  accuracy: number;
  elapsed: number;
  misses: Miss[];
  onAgain: () => void;
  onExit: () => void;
}) {
  const headline =
    accuracy === 100
      ? "Perfect page."
      : accuracy >= 85
        ? "Solid. The line is starting to sit."
        : accuracy >= 60
          ? "You can read this. A second pass will settle it."
          : "Stay with this drill. Find the landmark, then the neighbor.";
  const top = [...misses].sort((a, b) => b.count - a.count).slice(0, 5);
  return (
    <section className="sheet px-5 py-6 sm:px-8">
      <p className="text-sm tracking-wide text-muted">First-try names</p>
      <p className="font-display nums text-5xl leading-none font-medium text-ink">{accuracy}%</p>
      <p className="mt-3 text-pretty text-ink">{headline}</p>
      <p className="nums mt-1 text-sm text-muted">{formatTime(elapsed)}</p>
      {top.length > 0 ? (
        <ul className="mt-5 space-y-1.5 text-sm text-ink">
          {top.map((miss) => {
            const want = answerFor(miss.clef, miss.position, miss.key);
            return (
              <li key={`${miss.clef}-${miss.position}-${miss.key}`} className="flex justify-between gap-3">
                <span>{noteTitle(miss.clef, miss.position, want.acc)}</span>
                <span className="nums text-muted">{miss.count}</span>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="mt-5 text-sm text-muted">Nothing missed on the first try.</p>
      )}
      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <button type="button" onClick={onAgain} className="btn-ink tap inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 font-medium">
          <RotateCcw className="size-4" />
          Same drill, new line
        </button>
        <button type="button" onClick={onExit} className="btn-ghost tap h-12 rounded-full px-5 font-medium">
          Back to chapters
        </button>
      </div>
    </section>
  );
}
