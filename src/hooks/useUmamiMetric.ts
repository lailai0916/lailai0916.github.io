import { useEffect, useState } from 'react';
import { umamiFetchJson } from '@site/src/utils/umami';
import type { InsightsRange, FetchStatus } from './useUmamiStats';

export type MetricType = 'path' | 'referrer' | 'country' | 'device' | 'browser';

export interface MetricItem {
  x: string;
  y: number;
}

export function useUmamiMetric(
  type: MetricType,
  range: InsightsRange,
  limit: number = 8
) {
  const [items, setItems] = useState<MetricItem[]>([]);
  const [status, setStatus] = useState<FetchStatus>('loading');

  useEffect(() => {
    const controller = new AbortController();
    const endAt =
      range === 1
        ? Math.ceil(Date.now() / 3600_000) * 3600_000
        : Date.now();
    const startAt = endAt - range * 24 * 60 * 60 * 1000;

    (async () => {
      setStatus('loading');
      try {
        const result = await umamiFetchJson<MetricItem[]>(
          '/api/websites/{id}/metrics',
          { startAt, endAt, type, limit },
          { signal: controller.signal }
        );
        if (controller.signal.aborted) return;
        setItems(Array.isArray(result) ? result : []);
        setStatus('success');
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error(error);
        setStatus('error');
      }
    })();

    return () => controller.abort();
  }, [type, range, limit]);

  return { items, status };
}
