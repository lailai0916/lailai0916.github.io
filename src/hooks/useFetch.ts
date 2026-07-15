import { useEffect, useState, type DependencyList } from 'react';

export type FetchStatus = 'loading' | 'success' | 'error';

/**
 * One-shot data fetch shared by the analytics/status hooks. Runs `fetcher` when
 * `deps` change, tracking loading / success / error, and aborts the in-flight
 * request on the next change or on unmount (so a late response can't set state
 * after the component is gone). `data` is seeded by `initial` and kept across
 * reloads — a refetch shows the previous value under the `loading` flag rather
 * than flashing empty, matching what the callers relied on before.
 */
export function useFetch<T>(
  fetcher: (signal: AbortSignal) => Promise<T>,
  deps: DependencyList,
  initial: T
): { data: T; status: FetchStatus } {
  const [data, setData] = useState<T>(initial);
  const [status, setStatus] = useState<FetchStatus>('loading');

  useEffect(() => {
    const controller = new AbortController();
    setStatus('loading');

    (async () => {
      try {
        const result = await fetcher(controller.signal);
        if (controller.signal.aborted) return;
        setData(result);
        setStatus('success');
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error(error);
        setStatus('error');
      }
    })();

    return () => controller.abort();
    // `fetcher` is intentionally recreated each render; the caller's `deps` are
    // the real trigger, mirroring the hand-written effects this replaced.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, status };
}
