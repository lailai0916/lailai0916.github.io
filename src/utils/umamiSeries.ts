export interface SeriesPoint {
  x: string;
  y: number;
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
  if (splitAt <= startAt || splitAt > endAt) return [{ startAt, endAt }];
  return [
    { startAt, endAt: splitAt - 1 },
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
