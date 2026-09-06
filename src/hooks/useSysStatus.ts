import { useEffect, useRef, useState } from 'react';
import type { FetchStatus } from './useUmamiStats';
import { withTimeout } from '@site/src/utils/withTimeout';

interface SysStatus {
  cpu: number | null;
  mem: number | null;
  mem_used_mb?: number;
  mem_total_mb?: number;
  uptime?: number;
  load?: number[];
  cores?: number;
  disk?: number | null;
  swap?: number | null;
  last_deploy?: number | null;
  tls_expires_in?: number | null;
  ip?: string | null;
  ts?: number;
}

const ENDPOINT = 'https://lailai.one/api/sys';
const POLL_MS = 2000;
const REQUEST_TIMEOUT_MS = 10000;

export function useSysStatus() {
  const [data, setData] = useState<SysStatus | null>(null);
  const [status, setStatus] = useState<FetchStatus>('loading');
  const aliveRef = useRef(true);
  const inFlightRef = useRef(false);

  useEffect(() => {
    aliveRef.current = true;
    const controller = new AbortController();

    const fetchOnce = async () => {
      if (inFlightRef.current || controller.signal.aborted) return;
      inFlightRef.current = true;
      try {
        const json = await withTimeout(
          async (signal) => {
            const res = await fetch(ENDPOINT, {
              cache: 'no-store',
              signal,
            });
            if (!res.ok) throw new Error(String(res.status));
            return (await res.json()) as SysStatus;
          },
          controller.signal,
          REQUEST_TIMEOUT_MS
        );
        if (!aliveRef.current) return;
        setData(json);
        setStatus('success');
      } catch {
        if (controller.signal.aborted) return;
        if (!aliveRef.current) return;
        setStatus('error');
      } finally {
        inFlightRef.current = false;
      }
    };

    let id = 0;
    const stop = () => {
      window.clearInterval(id);
      id = 0;
    };
    const start = () => {
      stop();
      void fetchOnce();
      id = window.setInterval(() => void fetchOnce(), POLL_MS);
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    if (!document.hidden) start();
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      aliveRef.current = false;
      controller.abort();
      stop();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return { data, status };
}
