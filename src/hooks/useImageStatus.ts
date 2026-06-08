import { useEffect, useRef, useState } from 'react';

const IMAGE_LOAD_TIMEOUT_MS = 3000;

export type ImageStatus = 'loading' | 'loaded' | 'error';

/**
 * Track an `<img>`'s load state with a timeout fallback to `error`.
 *
 * If the browser finished loading before React attached its handlers (common on
 * SSR + fast cache hits), `onLoad`/`onError` never fire — so we sync from the
 * DOM via the ref, and time out stuck `loading` states. Attach `imgRef` to the
 * image and wire `onLoad`/`onError` to its handlers.
 */
export function useImageStatus(image?: string) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [status, setStatus] = useState<ImageStatus>(
    image ? 'loading' : 'error'
  );

  useEffect(() => {
    if (!image) {
      setStatus('error');
      return;
    }
    const img = imgRef.current;
    if (img?.complete) {
      setStatus(img.naturalWidth > 0 ? 'loaded' : 'error');
      return;
    }
    setStatus('loading');
    const timer = window.setTimeout(() => {
      setStatus((s) => (s === 'loading' ? 'error' : s));
    }, IMAGE_LOAD_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [image]);

  return {
    imgRef,
    status,
    onLoad: () => setStatus('loaded'),
    onError: () => setStatus('error'),
  };
}
