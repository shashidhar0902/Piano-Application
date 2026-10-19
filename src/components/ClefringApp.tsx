import { App } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";
import { ChevronDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ClefGlyph } from "@/components/glyphs";
import { DrillSession } from "@/components/DrillSession";
import { allDrills, chapters, findDrill } from "@/lib/curriculum";
import { clearProgress, loadProgress, recordFinish, type ProgressMap } from "@/lib/progress";

const PASS = 85;

export function ClefringApp() {
  const [progress, setProgress] = useState<ProgressMap>({});
  const [open, setOpen] = useState("1.1");
  const [drillId, setDrillId] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    let active = true;
    const listener = App.addListener("backButton", () => {
      if (!active) return;
      if (confirmReset) {
        setConfirmReset(false);
      } else if (drillId) {
        setDrillId(null);
      } else {
        App.exitApp();
      }
    });
    return () => {
      active = false;
      void listener.then((handle) => handle.remove());
    };
  }, [confirmReset, drillId]);

  const next = useMemo(() => {
    const drills = allDrills();
    return (
      drills.find((drill) => !progress[drill.id]?.finishes) ??
      drills.reduce((weakest, drill) =>
        (progress[drill.id]?.best ?? 0) < (progress[weakest.id]?.best ?? 0) ? drill : weakest,
      )
    );
  }, [progress]);

  const active = drillId ? findDrill(drillId) : undefined;

  if (active) {
    return (
      <DrillSession
        drill={active.drill}
        chapterLabel={`${active.chapter.kicker} · ${active.chapter.title}`}
        onExit={() => {
          setOpen(active.chapter.id);
          setDrillId(null);
        }}
        onComplete={(accuracy, ms) => {
          setProgress((prev) => recordFinish(prev, active.drill.id, accuracy, ms));
        }}
      />
    );
  }

  const cleared = allDrills().filter((drill) => progress[drill.id]?.finishes).length;
  const total = allDrills().length;

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-10">
      <header className="flex items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <Logo />
            <p className="text-sm tracking-wide text-muted">Levels 1–3 · Seven clefs</p>
          </div>
          <h1 className="mt-3 font-display text-4xl leading-tight font-medium text-ink sm:text-5xl">
            Read the staff.
          </h1>
          <p className="mt-2 max-w-xl text-pretty text-muted">
            A line of notes waits. Tap the letter on the ring — naturals outside, sharps or flats inside — and the line moves on.
          </p>
        </div>
      </header>

      <button
        type="button"
        className="btn-ink tap flex h-14 items-center justify-between rounded-full px-5 text-left"
        onClick={() => setDrillId(next.id)}
      >
        <span>
          <span className="block text-xs tracking-wide text-paper/70">
            {progress[next.id]?.finishes ? "Weakest line" : "Continue"}
          </span>
          <span className="font-display text-lg">
            {next.code} · {next.title}
          </span>
        </span>
        <span className="nums text-sm text-paper/80">
          {cleared}/{total}
        </span>
      </button>

      <div className="flex flex-col gap-3">
        {chapters.map((chapter) => {
          const done = chapter.drills.filter((drill) => progress[drill.id]?.finishes).length;
          const solid = chapter.drills.filter((drill) => (progress[drill.id]?.best ?? 0) >= PASS).length;
          const isOpen = open === chapter.id;
          return (
            <section key={chapter.id} className="sheet overflow-hidden">
              <button
                type="button"
                className="flex w-full items-center gap-3 px-4 py-4 text-left sm:px-5"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? "" : chapter.id)}
              >
                <span className="nums w-10 shrink-0 font-display text-lg text-accent">{chapter.code}</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-lg leading-tight font-medium text-ink">
                    <span className="italic font-normal text-muted">{chapter.kicker}</span>
                    <span className="px-2 text-ink/25">/</span>
                    {chapter.title}
                  </span>
                  <span className="mt-0.5 block text-sm text-pretty text-muted">{chapter.summary}</span>
                </span>
                <span className="nums hidden text-sm text-muted sm:block">
                  {solid}/{chapter.drills.length} solid
                </span>
                <ChevronDown className={`size-5 shrink-0 text-muted transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen ? (
                <ul className="border-t border-ink/10">
                  {chapter.drills.map((drill) => {
                    const record = progress[drill.id];
                    return (
                      <li key={drill.id} className="border-t border-ink/8 first:border-t-0">
                        <button
                          type="button"
                          className="flex w-full items-center gap-3 px-4 py-3 text-left sm:px-5"
                          onClick={() => setDrillId(drill.id)}
                        >
                          <span className="nums w-10 shrink-0 text-sm text-muted">{drill.code}</span>
                          <span className="min-w-0 flex-1 text-pretty text-ink">{drill.title}</span>
                          <span className="nums shrink-0 text-sm text-muted">
                            {record ? `${record.best}%` : "—"}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="nums border-t border-ink/10 px-4 py-2 text-xs text-muted sm:hidden">
                  {done}/{chapter.drills.length} tried · {solid} solid
                </p>
              )}
            </section>
          );
        })}
      </div>

      <footer className="flex items-center justify-between gap-3 pb-4 text-sm text-muted">
        <p>Solid means {PASS}% named on the first try.</p>
        <button
          type="button"
          className="tap underline-offset-2 hover:underline"
          onClick={() => {
            if (!confirmReset) {
              setConfirmReset(true);
              return;
            }
            setProgress(clearProgress());
            setConfirmReset(false);
          }}
        >
          {confirmReset ? "Tap again to reset" : "Reset progress"}
        </button>
      </footer>
    </main>
  );
}

function Logo() {
  const gap = 9;
  const height = 46;
  const y = (position: number) => 8 + (8 - position) * (gap / 2);
  return (
    <svg width={28} height={height} aria-hidden="true">
      {[0, 2, 4, 6, 8].map((position) => (
        <line
          key={position}
          x1={0}
          x2={28}
          y1={y(position)}
          y2={y(position)}
          stroke="var(--color-ink)"
          strokeWidth={1}
          opacity={0.35}
        />
      ))}
      <ClefGlyph clef="treble" x={16} yRef={y(2)} gap={gap} />
    </svg>
  );
}
