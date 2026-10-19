import { useMemo } from "react";
import {
  ClefGlyph,
  LedgerLines,
  NoteHead,
  Signature,
  clefMetrics,
  signatureWidth,
} from "@/components/glyphs";
import type { SequenceItem } from "@/lib/sequence";
import { KEYS, type Clef, type KeyId } from "@/lib/theory";

const PLAY = 42;
const SPACING = 64;

export function staffGap(minPos: number, maxPos: number) {
  const span = maxPos - minPos;
  if (span <= 10) return 16;
  if (span <= 16) return 14;
  if (span <= 22) return 12;
  return 11;
}

function changeWidth(item: Extract<SequenceItem, { kind: "change" }>, gap: number) {
  let width = gap * 1.05;
  if (item.clefChanged) width += clefMetrics(item.clef, gap).left + clefMetrics(item.clef, gap).right + gap * 0.45;
  const fifths = Math.abs(KEYS[item.key].fifths);
  if (fifths > 0 && (item.keyChanged || item.clefChanged)) width += signatureWidth(item.clef, item.key, gap) + gap * 0.2;
  return width;
}

type Placed = SequenceItem & { x: number; slot: number };

function placeItems(items: SequenceItem[], gap: number): Placed[] {
  let cursor = PLAY;
  return items.map((item) => {
    if (item.kind === "note") {
      const placed = { ...item, x: cursor, slot: SPACING };
      cursor += SPACING;
      return placed;
    }
    const slot = changeWidth(item, gap);
    const placed = { ...item, x: cursor + slot / 2, slot };
    cursor += slot;
    return placed;
  });
}

export function StaffLine({
  items,
  index,
  minPos,
  maxPos,
  clefs,
}: {
  items: SequenceItem[];
  index: number;
  minPos: number;
  maxPos: number;
  clefs: Clef[];
}) {
  const gap = staffGap(minPos, maxPos);
  const half = gap / 2;
  const hasTreble = clefs.includes("treble");
  const topPad = Math.max(gap * 1.35, (maxPos - 8) * half + gap * 1.15);
  const bottomPad = Math.max(hasTreble ? gap * 2.9 : gap * 1.55, (0 - minPos) * half + gap * 1.15);
  const height = topPad + (maxPos - minPos) * half + bottomPad;
  const yAt = (position: number) => topPad + (maxPos - position) * half;

  const placed = useMemo(() => placeItems(items, gap), [items, gap]);
  const current = placed[index];
  const tx = current ? -(current.x - PLAY) : 0;
  const total = (placed[placed.length - 1]?.x ?? PLAY) + 120;

  const system: { clef: Clef; key: KeyId } = current
    ? { clef: current.clef, key: current.key }
    : { clef: clefs[0] ?? "treble", key: "C" };

  const metrics = clefMetrics(system.clef, gap);
  const clefX = 8 + metrics.left;
  const sigX = clefX + metrics.right + gap * 0.45;
  const sigW = signatureWidth(system.clef, system.key, gap);
  const barX = sigX + sigW + (sigW > 0 ? gap * 0.35 : gap * 0.15);
  const pinned = Math.max(barX + 12, gap * 4.2);

  const yTop = yAt(8);
  const yBot = yAt(0);

  return (
    <div className="sheet relative overflow-hidden" style={{ height }}>
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        {[0, 2, 4, 6, 8].map((position) => (
          <line
            key={position}
            x1={0}
            x2="100%"
            y1={yAt(position)}
            y2={yAt(position)}
            stroke="var(--color-ink)"
            strokeWidth={1.2}
          />
        ))}
      </svg>

      <svg className="clef-in absolute top-0 left-0" width={pinned} height={height} key={`${system.clef}-${system.key}`}>
        <ClefGlyph clef={system.clef} x={clefX} yRef={yAt(metrics.refPosition)} gap={gap} />
        <Signature clef={system.clef} keyId={system.key} x={sigX} yAt={yAt} gap={gap} />
        <line x1={barX} x2={barX} y1={yTop} y2={yBot} stroke="var(--color-ink)" strokeWidth={1.3} />
      </svg>

      <div className="notes-mask absolute top-0 right-0 bottom-0" style={{ left: pinned }}>
        <svg
          className="note-scroll absolute top-0"
          height={height}
          width={total}
          style={{ transform: `translateX(${tx}px)` }}
        >
          {placed.map((item, itemIndex) => {
            if (item.kind === "change") {
              return (
                <ChangeMark key={`c-${itemIndex}`} item={item} yAt={yAt} yTop={yTop} yBot={yBot} gap={gap} />
              );
            }
            const past = itemIndex < index;
            return (
              <g key={`n-${itemIndex}`} opacity={past ? 0.28 : 1}>
                <LedgerLines x={item.x} position={item.position} yAt={yAt} gap={gap} />
                <NoteHead
                  x={item.x}
                  y={yAt(item.position)}
                  gap={gap}
                  stemUp={item.position < 4}
                />
              </g>
            );
          })}
        </svg>
        <svg className="pointer-events-none absolute inset-0 h-full w-full">
          <rect
            x={PLAY - 16}
            y={yTop - 8}
            width={32}
            height={yBot - yTop + 16}
            rx={10}
            fill="var(--color-accent)"
            opacity={0.12}
          />
        </svg>
      </div>
    </div>
  );
}

function ChangeMark({
  item,
  yAt,
  yTop,
  yBot,
  gap,
}: {
  item: Extract<Placed, { kind: "change" }>;
  yAt: (position: number) => number;
  yTop: number;
  yBot: number;
  gap: number;
}) {
  const width = item.slot;
  let x = item.x - width / 2 + 2;
  const metrics = clefMetrics(item.clef, gap);
  const drawSig = Math.abs(KEYS[item.key].fifths) > 0 && (item.keyChanged || item.clefChanged);
  return (
    <g>
      <line x1={x} x2={x} y1={yTop} y2={yBot} stroke="var(--color-ink)" strokeWidth={1.15} />
      <line x1={x + 4} x2={x + 4} y1={yTop} y2={yBot} stroke="var(--color-ink)" strokeWidth={2.3} />
      {item.clefChanged ? (
        <ClefGlyph
          clef={item.clef}
          x={x + gap * 0.7 + metrics.left}
          yRef={yAt(metrics.refPosition)}
          gap={gap}
        />
      ) : null}
      {drawSig ? (
        <Signature
          clef={item.clef}
          keyId={item.key}
          x={
            x +
            gap * 0.85 +
            (item.clefChanged ? metrics.left + metrics.right + gap * 0.35 : gap * 0.55)
          }
          yAt={yAt}
          gap={gap}
        />
      ) : null}
    </g>
  );
}
