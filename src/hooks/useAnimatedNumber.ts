import { useEffect, useRef, useState } from 'react';

const DEFAULT_DURATION_MS = 900;

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function useAnimatedNumber(
  target: number | null | undefined,
  durationMs: number = DEFAULT_DURATION_MS
): number {
  const [value, setValue] = useState<number>(target ?? 0);
  const fromRef = useRef<number>(target ?? 0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (target == null || !Number.isFinite(target)) return;

    if (typeof window === 'undefined') {
      setValue(target);
      return;
    }

    const from = fromRef.current;
    const delta = target - from;
    if (delta === 0) {
      setValue(target);
      return;
    }

    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = easeOutCubic(t);
      const next = from + delta * eased;
      setValue(next);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = target;
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      fromRef.current = value;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, durationMs]);

  return value;
}
