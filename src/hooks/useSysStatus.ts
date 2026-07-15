import { useEffect, useRef, useState } from 'react';
import type { FetchStatus } from './useUmamiStats';

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

export function useSysStatus() {
  const [data, setData] = useState<SysStatus | null>(null);
  const [status, setStatus] = useState<FetchStatus>('loading');
  const aliveRef = useRef(true);

  useEffect(() => {
    aliveRef.current = true;
    const controller = new AbortController();

    const fetchOnce = async () => {
      try {
        const res = await fetch(ENDPOINT, {
          cache: 'no-store',
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(String(res.status));
        const json = (await res.json()) as SysStatus;
        if (!aliveRef.current) return;
        setData(json);
        setStatus('success');
      } catch {
        if (controller.signal.aborted) return;
        if (!aliveRef.current) return;
        setStatus('error');
      }
    };

    // Poll only while the tab is visible — a backgrounded Insights page was
    // hitting the endpoint every 2s indefinitely for numbers no one could see.
    let id = 0;
    const start = () => {
      fetchOnce();
      id = window.setInterval(fetchOnce, POLL_MS);
    };
    const stop = () => window.clearInterval(id);
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
