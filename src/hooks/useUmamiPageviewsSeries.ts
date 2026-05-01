import { useEffect, useState } from 'react';
import { umamiFetchJson } from '@site/src/utils/umami';
import type { InsightsRange, FetchStatus } from './useUmamiStats';

export type SeriesUnit = 'day' | 'hour' | 'month';

export interface SeriesPoint {
  x: string;
  y: number;
}

interface PageviewsResponse {
  pageviews: SeriesPoint[];
  sessions: SeriesPoint[];
}

export function useUmamiPageviewsSeries(range: InsightsRange) {
  const [data, setData] = useState<PageviewsResponse | null>(null);
  const [status, setStatus] = useState<FetchStatus>('loading');

  useEffect(() => {
    const controller = new AbortController();
    const endAt = Date.now();
    const startAt = endAt - range * 24 * 60 * 60 * 1000;
    const unit: SeriesUnit = 'day';
    const timezone =
      typeof Intl !== 'undefined'
        ? Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
        : 'UTC';

    (async () => {
      setStatus('loading');
      try {
        const result = await umamiFetchJson<PageviewsResponse>(
          '/api/websites/{id}/pageviews',
          { startAt, endAt, unit, timezone },
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
