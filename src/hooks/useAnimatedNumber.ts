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
  const valueRef = useRef<number>(target ?? 0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (target == null || !Number.isFinite(target)) return;

    // The CSS global guard can't reach a rAF loop that writes React state, so
    // gate the count-up here: land on the final value instantly.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      valueRef.current = target;
      setValue(target);
      return;
    }

    const from = valueRef.current;
    const delta = target - from;
    if (delta === 0) {
      valueRef.current = target;
      setValue(target);
      return;
    }

    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = easeOutCubic(t);
      const next = from + delta * eased;
      valueRef.current = next;
      setValue(next);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        valueRef.current = target;
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [target, durationMs]);

  return value;
}
