import { useCallback, useEffect, useRef, useState, type DependencyList } from 'react';
import { withTimeout } from '@site/src/utils/withTimeout';

export type FetchStatus = 'loading' | 'success' | 'error';

const FETCH_TIMEOUT_MS = 15000;

/**
 * Fetches a dataset identified by `deps`. Optional polling aligns to clock
 * boundaries and pauses while hidden. Refreshes retain successful data;
 * dependency changes reset it so another range cannot appear under a new label.
 */
export function useFetch<T>(
  fetcher: (signal: AbortSignal) => Promise<T>,
  deps: DependencyList,
  initial: T,
  refreshInterval = 0
): {
  data: T;
  status: FetchStatus;
  isInitialLoading: boolean;
  isRefreshError: boolean;
  retry: () => void;
} {
  const [data, setData] = useState<T>(initial);
  const [status, setStatus] = useState<FetchStatus>('loading');
  const [hasSucceeded, setHasSucceeded] = useState(false);
  const retryRef = useRef<() => void>(() => {});

  const retry = useCallback(() => retryRef.current(), []);

  useEffect(() => {
    const controller = new AbortController();
    let inFlight = false;
    let hasData = false;
    let timer = 0;
    setData(initial);
    setHasSucceeded(false);
    setStatus('loading');

    const fetchOnce = async () => {
      if (inFlight || controller.signal.aborted) return;
      inFlight = true;
      if (!hasData) setStatus('loading');
      try {
        const result = await withTimeout(fetcher, controller.signal, FETCH_TIMEOUT_MS);
        if (controller.signal.aborted) return;
        hasData = true;
        setData(result);
        setHasSucceeded(true);
        setStatus('success');
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error(error);
        setStatus('error');
      } finally {
        inFlight = false;
      }
    };
    retryRef.current = fetchOnce;

    const poll = () => {
      if (document.hidden) return;
      void fetchOnce();
      timer = window.setTimeout(poll, refreshInterval - (Date.now() % refreshInterval));
    };
    const onVisibility = () => {
      window.clearTimeout(timer);
      if (!document.hidden) poll();
    };

    if (refreshInterval > 0) {
      poll();
      document.addEventListener('visibilitychange', onVisibility);
    } else {
      void fetchOnce();
    }

    return () => {
      controller.abort();
      window.clearTimeout(timer);
      document.removeEventListener('visibilitychange', onVisibility);
      retryRef.current = () => {};
    };
    // The caller's dependencies identify the dataset, not inline function/array identities.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, refreshInterval]);

  return {
    data,
    status,
    isInitialLoading: status === 'loading' && !hasSucceeded,
    isRefreshError: status === 'error' && hasSucceeded,
    retry,
  };
}
