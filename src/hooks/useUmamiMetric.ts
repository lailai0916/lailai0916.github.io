import { umamiFetchJson } from '@site/src/utils/umami';
import { fetchMetricItems, type MetricItem, type MetricLimit } from '@site/src/utils/umamiMetrics';
import { useFetch } from './useFetch';
import { rangeWindow, type InsightsRange } from './useUmamiStats';

type MetricType = 'path' | 'referrer' | 'country' | 'device' | 'browser' | 'os';

export function useUmamiMetric(type: MetricType, range: InsightsRange, limit: MetricLimit = 8) {
  const {
    data: items,
    status,
    isInitialLoading,
    isRefreshError,
    isFetching,
    retry,
  } = useFetch<MetricItem[]>(
    async (signal) => {
      const { startAt, endAt } = rangeWindow(range);
      return fetchMetricItems(async (pageLimit, offset) => {
        const result = await umamiFetchJson<MetricItem[]>(
          '/api/websites/{id}/metrics',
          { startAt, endAt, type, limit: pageLimit, offset },
          { signal }
        );
        if (!Array.isArray(result)) throw new Error('Invalid Umami metrics response');
        return result;
      }, limit);
    },
    [type, range, limit],
    [],
    60_000
  );

  return { items, status, isInitialLoading, isRefreshError, isFetching, retry };
}
