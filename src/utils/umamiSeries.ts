export interface SeriesPoint {
  x: string;
  y: number;
}

export type ChartUnit = 'hour' | '6h' | 'day' | 'week';

export interface ChartSeriesPoint extends SeriesPoint {
  startAt: number;
  endAt: number;
  partial: boolean;
}

interface SeriesWindow {
  startAt: number;
  endAt: number;
}

export function splitPageviewWindow(startAt: number, endAt: number): SeriesWindow[] {
  const boundary = new Date(startAt + (endAt - startAt) / 2);
  // The request uses this same browser timezone; never split one local day across requests.
  boundary.setHours(0, 0, 0, 0);
  const splitAt = boundary.getTime();
  if (splitAt <= startAt || splitAt >= endAt) return [{ startAt, endAt }];
  return [
    { startAt, endAt: splitAt },
    { startAt: splitAt, endAt },
  ];
}

export function mergeSeries(parts: SeriesPoint[][]): SeriesPoint[] {
  const seen = new Map<string, SeriesPoint>();
  for (const arr of parts) {
    for (const point of arr) {
      // Umami's literal Z marks an already-local bucket, not a UTC instant.
      const x = point.x.replace(/^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})(?:\.\d+)?Z$/, '$1 $2');
      seen.set(x, { x, y: point.y });
    }
  }
  return [...seen.values()].sort((a, b) => a.x.localeCompare(b.x));
}

function bucketStart(value: Date, unit: ChartUnit): Date {
  const date = new Date(value);
  if (unit === 'hour' || unit === '6h') {
    const hour = unit === '6h' ? Math.floor(date.getHours() / 6) * 6 : date.getHours();
    date.setHours(hour, 0, 0, 0);
  } else {
    date.setHours(0, 0, 0, 0);
    if (unit === 'week') date.setDate(date.getDate() - date.getDay());
  }
  return date;
}

function nextBucket(value: Date, unit: ChartUnit): Date {
  const date = new Date(value);
  if (unit === 'hour' || unit === '6h') {
    const nextHour =
      unit === '6h' ? (Math.floor(date.getHours() / 6) + 1) * 6 : date.getHours() + 1;
    date.setHours(nextHour, 0, 0, 0);
  } else {
    date.setDate(date.getDate() + (unit === 'week' ? 7 : 1));
    date.setHours(0, 0, 0, 0);
  }
  return date;
}

function bucketKey(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:00:00`;
}

export function aggregateSeries(
  series: SeriesPoint[],
  unit: ChartUnit,
  startAt: number,
  endAt: number
): ChartSeriesPoint[] {
  if (!Number.isFinite(startAt) || !Number.isFinite(endAt) || startAt >= endAt) return [];

  const sourceUnit = unit === 'hour' || unit === '6h' ? 'hour' : 'day';
  const totals = new Map<string, number>();
  for (const point of series) {
    const date = new Date(point.x.replace(' ', 'T'));
    if (Number.isNaN(date.getTime())) continue;
    const sourceStart = bucketStart(date, sourceUnit);
    if (
      sourceStart.getTime() >= endAt ||
      nextBucket(sourceStart, sourceUnit).getTime() <= startAt
    ) {
      continue;
    }
    const key = bucketKey(bucketStart(date, unit));
    totals.set(key, (totals.get(key) ?? 0) + point.y);
  }

  const out: ChartSeriesPoint[] = [];
  for (let start = bucketStart(new Date(startAt), unit); start.getTime() < endAt; ) {
    const end = nextBucket(start, unit);
    const coveredStart = Math.max(start.getTime(), startAt);
    const coveredEnd = Math.min(end.getTime(), endAt);
    const x = bucketKey(start);
    out.push({
      x,
      y: totals.get(x) ?? 0,
      startAt: coveredStart,
      endAt: coveredEnd,
      partial: coveredStart !== start.getTime() || coveredEnd !== end.getTime(),
    });
    start = end;
  }
  return out;
}
