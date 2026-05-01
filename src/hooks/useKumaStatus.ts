import { useEffect, useState } from 'react';
import {
  getStatusPage,
  getHeartbeats,
  type KumaStatusPageData,
  type KumaHeartbeatData,
} from '@site/src/utils/kuma';
import type { FetchStatus } from './useUmamiStats';

export interface KumaCombined {
  page: KumaStatusPageData;
  heartbeats: KumaHeartbeatData;
}

export function useKumaStatus() {
  const [data, setData] = useState<KumaCombined | null>(null);
  const [status, setStatus] = useState<FetchStatus>('loading');

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setStatus('loading');
      try {
        const [page, heartbeats] = await Promise.all([
          getStatusPage(),
          getHeartbeats(),
        ]);
        if (cancelled) return;
        setData({ page, heartbeats });
        setStatus('success');
      } catch (error) {
        if (cancelled) return;
        console.error(error);
        setStatus('error');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, status };
}
