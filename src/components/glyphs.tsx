import { signaturePositions, type Clef, type KeyId } from "@/lib/theory";

const TREBLE_D =
  "m12.049 3.5296c0.305 3.1263-2.019 5.6563-4.0772 7.7014-0.9349 0.897-0.155 0.148-0.6437 0.594-0.1022-0.479-0.2986-1.731-0.2802-2.11 0.1304-2.6939 2.3198-6.5875 4.2381-8.0236 0.309 0.5767 0.563 0.6231 0.763 1.8382zm0.651 16.142c-1.232-0.906-2.85-1.144-4.3336-0.885-0.1913-1.255-0.3827-2.51-0.574-3.764 2.3506-2.329 4.9066-5.0322 5.0406-8.5394 0.059-2.232-0.276-4.6714-1.678-6.4836-1.7004 0.12823-2.8995 2.156-3.8019 3.4165-1.4889 2.6705-1.1414 5.9169-0.57 8.7965-0.8094 0.952-1.9296 1.743-2.7274 2.734-2.3561 2.308-4.4085 5.43-4.0046 8.878 0.18332 3.334 2.5894 6.434 5.8702 7.227 1.2457 0.315 2.5639 0.346 3.8241 0.099 0.2199 2.25 1.0266 4.629 0.0925 6.813-0.7007 1.598-2.7875 3.004-4.3325 2.192-0.5994-0.316-0.1137-0.051-0.478-0.252 1.0698-0.257 1.9996-1.036 2.26-1.565 0.8378-1.464-0.3998-3.639-2.1554-3.358-2.262 0.046-3.1904 3.14-1.7356 4.685 1.3468 1.52 3.833 1.312 5.4301 0.318 1.8125-1.18 2.0395-3.544 1.8325-5.562-0.07-0.678-0.403-2.67-0.444-3.387 0.697-0.249 0.209-0.059 1.193-0.449 2.66-1.053 4.357-4.259 3.594-7.122-0.318-1.469-1.044-2.914-2.302-3.792zm0.561 5.757c0.214 1.991-1.053 4.321-3.079 4.96-0.136-0.795-0.172-1.011-0.2626-1.475-0.4822-2.46-0.744-4.987-1.116-7.481 1.6246-0.168 3.4576 0.543 4.0226 2.184 0.244 0.577 0.343 1.197 0.435 1.812zm-5.1486 5.196c-2.5441 0.141-4.9995-1.595-5.6343-4.081-0.749-2.153-0.5283-4.63 0.8207-6.504 1.1151-1.702 2.6065-3.105 4.0286-4.543 0.183 1.127 0.366 2.254 0.549 3.382-2.9906 0.782-5.0046 4.725-3.215 7.451 0.5324 0.764 1.9765 2.223 2.7655 1.634-1.102-0.683-2.0033-1.859-1.8095-3.227-0.0821-1.282 1.3699-2.911 2.6513-3.198 0.4384 2.869 0.9413 6.073 1.3797 8.943-0.5054 0.1-1.0211 0.143-1.536 0.143z";

const TREBLE = { w: 15.186, h: 40.768, anchorX: 8.55, anchorY: 24.6 };
const BASS = { w: 17.45, h: 20.15, anchorX: 16.02, anchorY: 6.065, dotGap: 5.843 };

const BASS_DOT_A =
  "M 17.305 3.142 C 17.313 3.512 17.156 3.881 16.874 4.122 C 16.514 4.451 15.965 4.518 15.516 4.351 C 15.071 4.179 14.742 3.739 14.717 3.261 C 14.683 2.887 14.802 2.495 15.073 2.229 C 15.328 1.957 15.708 1.824 16.077 1.847 C 16.457 1.855 16.823 2.046 17.05 2.35 C 17.225 2.575 17.308 2.86 17.305 3.142 z";
const BASS_DOT_B =
  "M 17.305 8.985 C 17.313 9.355 17.156 9.725 16.874 9.966 C 16.514 10.295 15.965 10.362 15.516 10.195 C 15.071 10.023 14.742 9.583 14.717 9.104 C 14.682 8.73 14.809 8.343 15.072 8.073 C 15.322 7.795 15.706 7.668 16.074 7.69 C 16.558 7.703 16.997 8.033 17.197 8.465 C 17.271 8.628 17.306 8.807 17.305 8.985 z";
const BASS_BODY =
  "M 13.024 7.208 C 13.069 10.033 11.809 12.778 9.81 14.745 C 7.321 17.233 4.063 18.816 0.743 19.873 C 0.301 20.112 -0.365 19.797 0.331 19.472 C 1.669 18.863 3.059 18.341 4.291 17.521 C 7.013 15.838 9.311 13.187 9.868 9.959 C 10.193 7.994 10.103 5.948 9.61 4.019 C 9.249 2.6 8.266 1.136 6.709 0.926 C 5.296 0.71 3.794 1.199 2.786 2.221 C 2.521 2.49 2.005 3.234 2.09 4.088 C 2.692 3.615 2.651 3.668 3.144 3.447 C 4.281 2.941 5.789 3.661 6.072 4.913 C 6.374 6.063 6.141 7.527 5.006 8.14 C 3.821 8.784 2.072 8.518 1.41 7.249 C 0.315 5.294 0.917 2.622 2.687 1.266 C 4.491 -0.23 7.121 -0.289 9.245 0.479 C 11.43 1.291 12.732 3.555 12.942 5.797 C 13 6.265 13.024 6.737 13.024 7.208 z";

export function clefMetrics(clef: Clef, gap: number) {
  if (clef === "treble") {
    const scale = (gap * 4.15) / TREBLE.anchorY;
    return {
      scale,
      left: TREBLE.anchorX * scale,
      right: (TREBLE.w - TREBLE.anchorX) * scale,
      refPosition: 2,
    };
  }
  const scale = gap / BASS.dotGap;
  return {
    scale,
    left: BASS.anchorX * scale,
    right: (BASS.w - BASS.anchorX) * scale + gap * 0.15,
    refPosition: 6,
  };
}

export function ClefGlyph({
  clef,
  x,
  yRef,
  gap,
}: {
  clef: Clef;
  x: number;
  yRef: number;
  gap: number;
}) {
  const metrics = clefMetrics(clef, gap);
  if (clef === "treble") {
    return (
      <g transform={`translate(${x} ${yRef}) scale(${metrics.scale}) translate(${-TREBLE.anchorX} ${-TREBLE.anchorY})`}>
        <path d={TREBLE_D} fill="var(--color-ink)" />
      </g>
    );
  }
  return (
    <g transform={`translate(${x} ${yRef}) scale(${metrics.scale}) translate(${-BASS.anchorX} ${-BASS.anchorY})`}>
      <path d={BASS_BODY} fill="var(--color-ink)" />
      <path d={BASS_DOT_A} fill="var(--color-ink)" />
      <path d={BASS_DOT_B} fill="var(--color-ink)" />
    </g>
  );
}

export function SharpGlyph({ x, y, gap }: { x: number; y: number; gap: number }) {
  const h = gap * 2.45;
  const spread = gap * 0.34;
  const sw = Math.max(1.15, gap * 0.078);
  const bar = gap * 0.2;
  const rise = gap * 0.42;
  const barW = gap * 1.02;
  const bars = [y - gap * 0.28, y + gap * 0.38];
  return (
    <g fill="var(--color-ink)">
      {bars.map((cy) => {
        const xL = x - barW / 2;
        const xR = x + barW / 2;
        const yL = cy + rise / 2;
        const yR = cy - rise / 2;
        const points = `${xL},${yL + bar / 2} ${xR},${yR + bar / 2} ${xR},${yR - bar / 2} ${xL},${yL - bar / 2}`;
        return <polygon key={cy} points={points} />;
      })}
      <rect x={x - spread - sw / 2} y={y - h / 2} width={sw} height={h} rx={sw / 2} />
      <rect x={x + spread - sw / 2} y={y - h / 2} width={sw} height={h} rx={sw / 2} />
    </g>
  );
}

export function FlatGlyph({ x, y, gap }: { x: number; y: number; gap: number }) {
  const stemW = Math.max(1.2, gap * 0.085);
  const stemX = x - gap * 0.02;
  const stemTop = y - gap * 1.72;
  const stemBot = y + gap * 0.62;
  const bowl = `M ${stemX + stemW * 0.4} ${y - gap * 0.48}
    C ${stemX + gap * 0.92} ${y - gap * 0.78}, ${stemX + gap * 1.02} ${y + gap * 0.05}, ${stemX + stemW} ${stemBot - gap * 0.02}
    C ${stemX + gap * 0.62} ${y + gap * 0.22}, ${stemX + gap * 0.28} ${y - gap * 0.02}, ${stemX + stemW * 0.2} ${y - gap * 0.18}
    Z`;
  return (
    <g fill="var(--color-ink)">
      <rect x={stemX} y={stemTop} width={stemW} height={stemBot - stemTop} rx={stemW / 2} />
      <path d={bowl} />
    </g>
  );
}

export function signatureStep(gap: number) {
  return gap * 0.92;
}

export function signatureWidth(clef: Clef, key: KeyId, gap: number) {
  const count = signaturePositions(clef, key).length;
  if (count === 0) return 0;
  return count * signatureStep(gap) + gap * 0.15;
}

export function Signature({
  clef,
  keyId,
  x,
  yAt,
  gap,
}: {
  clef: Clef;
  keyId: KeyId;
  x: number;
  yAt: (position: number) => number;
  gap: number;
}) {
  const marks = signaturePositions(clef, keyId);
  const step = signatureStep(gap);
  return (
    <g>
      {marks.map((mark, index) =>
        mark.acc === "sharp" ? (
          <SharpGlyph key={index} x={x + index * step} y={yAt(mark.position)} gap={gap} />
        ) : (
          <FlatGlyph key={index} x={x + index * step - gap * 0.12} y={yAt(mark.position)} gap={gap} />
        ),
      )}
    </g>
  );
}

export function NoteHead({
  x,
  y,
  gap,
  stemUp,
}: {
  x: number;
  y: number;
  gap: number;
  stemUp: boolean;
}) {
  const rx = gap * 0.58;
  const ry = gap * 0.4;
  const stemLen = gap * 3.15;
  const stemW = Math.max(1.15, gap * 0.085);
  const stemX = stemUp ? x + rx * 0.82 : x - rx * 0.82 - stemW;
  const stemY = stemUp ? y - stemLen : y - ry * 0.15;
  const stemH = stemUp ? stemLen + ry * 0.2 : stemLen + ry * 0.35;
  return (
    <g fill="var(--color-ink)">
      <rect x={stemX} y={stemY} width={stemW} height={stemH} />
      <ellipse cx={x} cy={y} rx={rx} ry={ry} transform={`rotate(-18 ${x} ${y})`} />
    </g>
  );
}

export function LedgerLines({
  x,
  position,
  yAt,
  gap,
}: {
  x: number;
  position: number;
  yAt: (position: number) => number;
  gap: number;
}) {
  const lines: number[] = [];
  if (position >= 10) {
    const last = position % 2 === 0 ? position : position - 1;
    for (let lp = 10; lp <= last; lp += 2) lines.push(lp);
  } else if (position <= -2) {
    const last = position % 2 === 0 ? position : position + 1;
    for (let lp = -2; lp >= last; lp -= 2) lines.push(lp);
  }
  const half = gap * 1.15;
  return (
    <g stroke="var(--color-ink)" strokeWidth={1.15} strokeLinecap="butt">
      {lines.map((lp) => (
        <line key={lp} x1={x - half} x2={x + half} y1={yAt(lp)} y2={yAt(lp)} />
      ))}
    </g>
  );
}
