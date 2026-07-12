import { useEffect, useState } from 'react';
import { umamiFetchJson } from '@site/src/utils/umami';
import { rangeWindow, type InsightsRange, type FetchStatus } from './useUmamiStats';

type MetricType = 'path' | 'referrer' | 'country' | 'device' | 'browser' | 'os';

interface MetricItem {
  x: string;
  y: number;
}

export function useUmamiMetric(type: MetricType, range: InsightsRange, limit: number = 8) {
  const [items, setItems] = useState<MetricItem[]>([]);
  const [status, setStatus] = useState<FetchStatus>('loading');

  useEffect(() => {
    const controller = new AbortController();
    const { startAt, endAt } = rangeWindow(range);

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
