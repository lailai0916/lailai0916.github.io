import { umamiFetchJson } from '@site/src/utils/umami';
import { useFetch } from './useFetch';
import { useUmamiWindow, type InsightsRange, type InsightsWindow } from './useUmamiWindow';

export type { FetchStatus } from './useFetch';
export { rangeWindow, type InsightsRange } from './useUmamiWindow';

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

interface StatsResult extends UmamiStatsResponse {
  window: InsightsWindow;
}

export function useUmamiStats(range: InsightsRange) {
  const getWindow = useUmamiWindow();
  return useFetch<StatsResult | null>(
    async (signal) => {
      const { startAt, endAt } = getWindow(range);
      const data = await umamiFetchJson<UmamiStatsResponse>(
        '/api/websites/{id}/stats',
        { startAt, endAt: endAt - 1 },
        { signal }
      );
      return { ...data, window: { startAt, endAt } };
    },
    [range],
    null,
    60_000
  );
}
