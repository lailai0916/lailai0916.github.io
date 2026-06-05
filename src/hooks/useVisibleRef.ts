import { useEffect, useRef, type RefObject } from 'react';

/**
 * Tracks whether an element is near the viewport, exposed as a ref so animation
 * loops can skip work while offscreen without restarting (state is preserved).
 * Many canvas playgrounds share one page; this keeps idle ones from burning CPU.
 */
export function useVisibleRef(
  target: RefObject<HTMLElement | null>,
  rootMargin = '200px'
): RefObject<boolean> {
  const visible = useRef(false);

  useEffect(() => {
    const el = target.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      visible.current = true;
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting;
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, rootMargin]);

  return visible;
}
