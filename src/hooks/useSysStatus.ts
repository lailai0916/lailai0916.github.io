import { useEffect, useRef, useState } from 'react';
import type { FetchStatus } from './useUmamiStats';

export interface SysStatus {
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
const POLL_MS = 8000;

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
      } catch (err) {
        if (controller.signal.aborted) return;
        if (!aliveRef.current) return;
        setStatus('error');
      }
    };

    fetchOnce();
    const id = window.setInterval(fetchOnce, POLL_MS);
    return () => {
      aliveRef.current = false;
      controller.abort();
      window.clearInterval(id);
    };
  }, []);

  return { data, status };
}
