import { useCallback, useEffect, useState, type DependencyList } from 'react';

export type FetchStatus = 'loading' | 'success' | 'error';

/**
 * Abortable data fetch shared by the analytics/status hooks. Runs `fetcher` when
 * `deps` change, tracking loading / success / error, and aborts the in-flight
 * request on the next change or on unmount (so a late response can't set state
 * after the component is gone). `data` is seeded by `initial` and kept across
 * reloads. `isInitialLoading` distinguishes the first request from a refetch so
 * callers can keep successful data visible while its replacement is loading;
 * `retry` repeats a failed request without remounting the caller.
 */
export function useFetch<T>(
  fetcher: (signal: AbortSignal) => Promise<T>,
  deps: DependencyList,
  initial: T
): { data: T; status: FetchStatus; isInitialLoading: boolean; retry: () => void } {
  const [data, setData] = useState<T>(initial);
  const [status, setStatus] = useState<FetchStatus>('loading');
  const [hasSucceeded, setHasSucceeded] = useState(false);
  const [attempt, setAttempt] = useState(0);

  const retry = useCallback(() => {
    setStatus('loading');
    setAttempt((value) => value + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setStatus('loading');

    (async () => {
      try {
        const result = await fetcher(controller.signal);
        if (controller.signal.aborted) return;
        setData(result);
        setHasSucceeded(true);
        setStatus('success');
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error(error);
        setStatus('error');
      }
    })();

    return () => controller.abort();
    // `fetcher` is intentionally recreated each render; the caller's `deps` and
    // explicit retry attempts are the real triggers.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, attempt]);

  return { data, status, isInitialLoading: status === 'loading' && !hasSucceeded, retry };
}
