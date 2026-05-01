import { useEffect, useState } from 'react';
import { umamiFetchJson } from '@site/src/utils/umami';

export type InsightsRange = 7 | 30 | 365;

export interface UmamiStats {
  pageviews: number;
  visitors: number;
  visits: number;
  bounces: number;
  totaltime: number;
}

export type FetchStatus = 'loading' | 'success' | 'error';

interface UmamiStatsResponse extends UmamiStats {
  comparison?: UmamiStats;
}

export function useUmamiStats(range: InsightsRange) {
  const [data, setData] = useState<UmamiStatsResponse | null>(null);
  const [status, setStatus] = useState<FetchStatus>('loading');

  useEffect(() => {
    const controller = new AbortController();
    const endAt = Date.now();
    const startAt = endAt - range * 24 * 60 * 60 * 1000;

    (async () => {
      setStatus('loading');
      try {
        const result = await umamiFetchJson<UmamiStatsResponse>(
          '/api/websites/{id}/stats',
          { startAt, endAt },
          { signal: controller.signal }
        );
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
  }, [range]);

  return { data, status };
}
