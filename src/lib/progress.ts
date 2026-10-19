export type DrillRecord = {
  finishes: number;
  best: number;
  last: number;
  bestMs: number;
};

export type ProgressMap = Record<string, DrillRecord>;

const KEY = "clefring.v1";

export function loadProgress(): ProgressMap {
  if (typeof localStorage === "undefined") return {};
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as ProgressMap;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function saveProgress(map: ProgressMap) {
  localStorage.setItem(KEY, JSON.stringify(map));
}

export function recordFinish(map: ProgressMap, id: string, accuracy: number, ms: number): ProgressMap {
  const prev = map[id];
  let best = accuracy;
  let bestMs = ms;
  if (prev) {
    if (accuracy > prev.best) {
      best = accuracy;
      bestMs = ms;
    } else if (accuracy === prev.best) {
      best = prev.best;
      bestMs = Math.min(prev.bestMs, ms);
    } else {
      best = prev.best;
      bestMs = prev.bestMs;
    }
  }
  const next: ProgressMap = {
    ...map,
    [id]: {
      finishes: (prev?.finishes ?? 0) + 1,
      best,
      last: accuracy,
      bestMs,
    },
  };
  saveProgress(next);
  return next;
}

export function clearProgress(): ProgressMap {
  saveProgress({});
  return {};
}
