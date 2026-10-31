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
    for (const point of arr) seen.set(point.x, point);
  }
  return [...seen.values()].sort((a, b) => a.x.localeCompare(b.x));
}
