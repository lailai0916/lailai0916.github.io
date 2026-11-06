import { umamiFetchJson } from '@site/src/utils/umami';
import {
  aggregateSeries,
  mergeSeries,
  splitPageviewWindow,
  type ChartSeriesPoint,
  type ChartUnit,
  type SeriesPoint,
} from '@site/src/utils/umamiSeries';
import { useFetch } from './useFetch';
import { useUmamiWindow, type InsightsRange } from './useUmamiWindow';

type SeriesUnit = 'day' | 'hour';

export type { ChartSeriesPoint, SeriesPoint } from '@site/src/utils/umamiSeries';

interface UmamiPageviewsResponse {
  pageviews: SeriesPoint[];
  sessions: SeriesPoint[];
}

interface PageviewsResponse {
  pageviews: ChartSeriesPoint[];
  sessions: ChartSeriesPoint[];
  unit: ChartUnit;
}

function rangeUnit(range: InsightsRange): SeriesUnit {
  if (range === 1 || range === 7) return 'hour';
  return 'day';
}

function chartUnit(range: InsightsRange): ChartUnit {
  if (range === 1) return 'hour';
  if (range === 7) return '6h';
  if (range === 30) return 'day';
  return 'week';
}

export function useUmamiPageviewsSeries(range: InsightsRange) {
  const getWindow = useUmamiWindow();
  return useFetch<PageviewsResponse | null>(
    async (signal) => {
      const { startAt, endAt } = getWindow(range);
      const unit = rangeUnit(range);
      const timezone =
        typeof Intl !== 'undefined'
          ? Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
          : 'UTC';

      const fetchSeg = (segStart: number, segEnd: number) =>
        umamiFetchJson<UmamiPageviewsResponse>(
          '/api/websites/{id}/pageviews',
          { startAt: segStart, endAt: segEnd - 1, unit, timezone },
          { signal }
        );

      // Umami caps day-resolution at ~200 days; chunk longer ranges in two.
      const needsChunk = range > 200 && unit === 'day';
      const parts: UmamiPageviewsResponse[] = needsChunk
        ? await Promise.all(
            splitPageviewWindow(startAt, endAt).map((part) => fetchSeg(part.startAt, part.endAt))
          )
        : [await fetchSeg(startAt, endAt)];
      const reduce = (merged: SeriesPoint[]) =>
        aggregateSeries(merged, chartUnit(range), startAt, endAt);
      return {
        pageviews: reduce(mergeSeries(parts.map((p) => p.pageviews))),
        sessions: reduce(mergeSeries(parts.map((p) => p.sessions))),
        unit: chartUnit(range),
      };
    },
    [range],
    null,
    60_000
  );
}
