import { useEffect, useRef, useState } from "react";
import { KEYS, LETTERS, keyBlurb, type Accidental, type KeyId, type Letter } from "@/lib/theory";

type Props = {
  keyId: KeyId;
  disabled: boolean;
  wrongId: string | null;
  hint: { letter: Letter; acc: Accidental } | null;
  onPick: (letter: Letter, acc: Accidental) => void;
};

function useWidth() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(320);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setWidth(el.clientWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, width };
}

function polar(index: number, radius: number) {
  const angle = -Math.PI / 2 + (index / LETTERS.length) * Math.PI * 2;
  return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius };
}

export function NoteRing({ keyId, disabled, wrongId, hint, onPick }: Props) {
  const { ref, width } = useWidth();
  const fifths = KEYS[keyId].fifths;
  const innerAcc: Accidental | null = fifths > 0 ? "sharp" : fifths < 0 ? "flat" : null;
  const outer = innerAcc ? 48 : 56;
  const inner = 44;
  const outerR = width / 2 - outer / 2 - 2;
  const innerR = innerAcc ? outerR - outer / 2 - inner / 2 - 12 : 0;
  const center = width / 2;

  return (
    <div ref={ref} className="relative mx-auto aspect-square w-full max-w-sm select-none">
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        <circle
          cx={center}
          cy={center}
          r={outerR}
          fill="none"
          stroke="var(--color-ink)"
          strokeOpacity={0.16}
        />
        {innerAcc ? (
          <circle
            cx={center}
            cy={center}
            r={innerR}
            fill="none"
            stroke="var(--color-accent)"
            strokeOpacity={0.35}
          />
        ) : null}
      </svg>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="font-display text-4xl leading-none text-ink">
            {innerAcc === "sharp" ? "♯" : innerAcc === "flat" ? "♭" : "♮"}
          </div>
          <div className="mt-1 text-sm text-muted">{KEYS[keyId].name}</div>
          <div className="text-xs tracking-wide text-muted">{keyBlurb(keyId)}</div>
        </div>
      </div>

      {LETTERS.map((letter, index) => {
        const point = polar(index, outerR);
        return (
          <KeyButton
            key={letter}
            letter={letter}
            acc="natural"
            x={center + point.x}
            y={center + point.y}
            size={outer}
            disabled={disabled}
            wrong={wrongId === `${letter}:natural`}
            hint={hint?.letter === letter && hint.acc === "natural"}
            onPick={onPick}
          />
        );
      })}

      {innerAcc
        ? LETTERS.map((letter, index) => {
            const point = polar(index, innerR);
            return (
              <KeyButton
                key={`${letter}-acc`}
                letter={letter}
                acc={innerAcc}
                x={center + point.x}
                y={center + point.y}
                size={inner}
                inner
                disabled={disabled}
                wrong={wrongId === `${letter}:${innerAcc}`}
                hint={hint?.letter === letter && hint.acc === innerAcc}
                onPick={onPick}
              />
            );
          })
        : null}
    </div>
  );
}

function KeyButton({
  letter,
  acc,
  x,
  y,
  size,
  inner,
  disabled,
  wrong,
  hint,
  onPick,
}: {
  letter: Letter;
  acc: Accidental;
  x: number;
  y: number;
  size: number;
  inner?: boolean;
  disabled: boolean;
  wrong: boolean;
  hint: boolean;
  onPick: (letter: Letter, acc: Accidental) => void;
}) {
  const mark = acc === "sharp" ? "♯" : acc === "flat" ? "♭" : "";
  const label = acc === "natural" ? letter : `${letter} ${acc}`;
  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={label}
      className={`ring-key tap ${inner ? "inner" : ""} ${wrong ? "is-wrong" : ""} ${hint ? "is-hint" : ""}`}
      style={{ left: x - size / 2, top: y - size / 2, width: size, height: size }}
      onClick={() => onPick(letter, acc)}
    >
      <span className={inner ? "text-base" : "text-xl"}>
        {letter}
        {mark ? <span className="text-sm">{mark}</span> : null}
      </span>
    </button>
  );
}
