import { umamiFetchJson } from '@site/src/utils/umami';
import { useFetch } from './useFetch';

export type { FetchStatus } from './useFetch';

export type InsightsRange = 1 | 7 | 30 | 365;

// The [startAt, endAt] query window for a range. The 1-day view aligns the end
// to the current hour so the live hourly bucket doesn't jitter every render.
export function rangeWindow(range: InsightsRange): { startAt: number; endAt: number } {
  const endAt = range === 1 ? Math.ceil(Date.now() / 3600_000) * 3600_000 : Date.now();
  const startAt = endAt - range * 24 * 60 * 60 * 1000;
  return { startAt, endAt };
}

export interface UmamiStats {
  pageviews: number;
  visitors: number;
  visits: number;
  bounces: number;
  totaltime: number;
}

interface UmamiStatsResponse extends UmamiStats {
  comparison?: UmamiStats;
}

export function useUmamiStats(range: InsightsRange) {
  return useFetch<UmamiStatsResponse | null>(
    (signal) => {
      const { startAt, endAt } = rangeWindow(range);
      return umamiFetchJson<UmamiStatsResponse>(
        '/api/websites/{id}/stats',
        { startAt, endAt },
        { signal }
      );
    },
    [range],
    null
  );
}
