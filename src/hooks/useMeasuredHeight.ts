import { useEffect, useRef, useState } from 'react';

/**
 * Measure a content element's height, re-measuring whenever `key` changes (e.g.
 * a tab switch) and whenever the element resizes. Drive a fixed-height wrapper
 * from the returned value with a CSS `height` transition, so collapse/expand and
 * content swaps animate smoothly to the real content height instead of snapping
 * or reserving dead space. Attach `ref` to the content element; `height` is
 * `undefined` until the first measurement.
 */
export function useMeasuredHeight<T extends HTMLElement>(key: unknown) {
  const ref = useRef<T>(null);
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const measure = () => setHeight(el.scrollHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [key]);

  return [ref, height] as const;
}
