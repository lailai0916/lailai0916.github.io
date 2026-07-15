import { umamiFetchJson } from '@site/src/utils/umami';
import { useFetch } from './useFetch';
import { rangeWindow, type InsightsRange } from './useUmamiStats';

type MetricType = 'path' | 'referrer' | 'country' | 'device' | 'browser' | 'os';

interface MetricItem {
  x: string;
  y: number;
}

export function useUmamiMetric(type: MetricType, range: InsightsRange, limit: number = 8) {
  const { data: items, status } = useFetch<MetricItem[]>(
    async (signal) => {
      const { startAt, endAt } = rangeWindow(range);
      const result = await umamiFetchJson<MetricItem[]>(
        '/api/websites/{id}/metrics',
        { startAt, endAt, type, limit },
        { signal }
      );
      return Array.isArray(result) ? result : [];
    },
    [type, range, limit],
    []
  );

  return { items, status };
}
