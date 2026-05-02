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

function rangeUnit(range: InsightsRange): SeriesUnit {
  if (range === 1 || range === 7) return 'hour';
  return 'day';
}

function mergeSeries(parts: SeriesPoint[][]): SeriesPoint[] {
  const seen = new Map<string, SeriesPoint>();
  for (const arr of parts) {
    for (const pt of arr) {
      seen.set(pt.x, pt);
    }
  }
  return [...seen.values()].sort((a, b) => a.x.localeCompare(b.x));
}

function pad2(n: number) {
  return n.toString().padStart(2, '0');
}

function bucketKey(d: Date, unit: SeriesUnit): string {
  const date = `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
  if (unit === 'hour') return `${date} ${pad2(d.getHours())}:00:00`;
  return `${date} 00:00:00`;
}

function nextBucket(d: Date, unit: SeriesUnit): Date {
  const c = new Date(d);
  if (unit === 'hour') c.setHours(c.getHours() + 1);
  else c.setDate(c.getDate() + 1);
  return c;
}

function downsample(arr: SeriesPoint[], windowSize: number): SeriesPoint[] {
  if (windowSize <= 1) return arr;
  const out: SeriesPoint[] = [];
  for (let i = 0; i < arr.length; i += windowSize) {
    const slice = arr.slice(i, i + windowSize);
    if (slice.length === 0) continue;
    out.push({
      x: slice[0].x,
      y: slice.reduce((s, p) => s + p.y, 0),
    });
  }
  return out;
}

function weekKey(iso: string): string {
  const d = new Date(iso.replace(' ', 'T'));
  const offset = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - offset);
  return bucketKey(d, 'day');
}

function aggregateByWeek(arr: SeriesPoint[]): SeriesPoint[] {
  const buckets = new Map<string, number>();
  for (const p of arr) {
    const k = weekKey(p.x);
    buckets.set(k, (buckets.get(k) ?? 0) + p.y);
  }
  return [...buckets.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([x, y]) => ({ x, y }));
}

function fillSeries(
  arr: SeriesPoint[],
  unit: SeriesUnit,
  startAt?: number,
  endAt?: number
): SeriesPoint[] {
  if (unit === 'month') return arr;
  let start: Date;
  let end: Date;
  if (startAt != null && endAt != null) {
    start = new Date(startAt);
    end = new Date(endAt - 1);
    if (unit === 'hour') {
      start.setMinutes(0, 0, 0);
      end.setMinutes(0, 0, 0);
    } else {
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);
    }
  } else if (arr.length >= 2) {
    start = new Date(arr[0].x.replace(' ', 'T'));
    end = new Date(arr[arr.length - 1].x.replace(' ', 'T'));
  } else {
    return arr;
  }
  const have = new Map(arr.map((p) => [p.x, p.y]));
  const out: SeriesPoint[] = [];
  for (let d = start; d.getTime() <= end.getTime(); d = nextBucket(d, unit)) {
    const x = bucketKey(d, unit);
    out.push({ x, y: have.get(x) ?? 0 });
  }
  return out;
}

export function useUmamiPageviewsSeries(range: InsightsRange) {
  const [data, setData] = useState<PageviewsResponse | null>(null);
  const [status, setStatus] = useState<FetchStatus>('loading');

  useEffect(() => {
    const controller = new AbortController();
    const endAt =
      range === 1 ? Math.ceil(Date.now() / 3600_000) * 3600_000 : Date.now();
    const startAt = endAt - range * 24 * 60 * 60 * 1000;
    const unit = rangeUnit(range);
    const timezone =
      typeof Intl !== 'undefined'
        ? Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
        : 'UTC';

    const fetchSeg = (segStart: number, segEnd: number) =>
      umamiFetchJson<PageviewsResponse>(
        '/api/websites/{id}/pageviews',
        { startAt: segStart, endAt: segEnd, unit, timezone },
        { signal: controller.signal }
      );

    (async () => {
      setStatus('loading');
      try {
        // Umami caps day-resolution at ~200 days; chunk longer ranges in two.
        const needsChunk = range > 200 && unit === 'day';
        const parts: PageviewsResponse[] = needsChunk
          ? await Promise.all([
              fetchSeg(startAt, startAt + (endAt - startAt) / 2),
              fetchSeg(startAt + (endAt - startAt) / 2 + 1, endAt),
            ])
          : [await fetchSeg(startAt, endAt)];
        if (controller.signal.aborted) return;
        const reduce = (merged: SeriesPoint[]) => {
          const filled = fillSeries(merged, unit, startAt, endAt);
          if (range === 7) return downsample(filled, 6);
          if (range === 365) return aggregateByWeek(filled);
          return filled;
        };
        setData({
          pageviews: reduce(mergeSeries(parts.map((p) => p.pageviews))),
          sessions: reduce(mergeSeries(parts.map((p) => p.sessions))),
        });
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
