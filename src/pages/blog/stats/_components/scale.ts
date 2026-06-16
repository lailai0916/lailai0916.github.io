// Pick a "nice" gridline step (~4 lines) sized to the data, plus the
// rounded-up axis max. Keeps few, round gridlines whether the peak is ~15
// (monthly) or ~160 (cumulative).
function niceStep(max: number): number {
  if (max <= 0) return 5;
  const raw = max / 4;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const norm = raw / mag;
  const mult = norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 5 ? 5 : 10;
  return mult * mag;
}

export function computeScale(max: number): {
  yMax: number;
  gridLines: number[];
} {
  const step = niceStep(max);
  const yMax = Math.max(step, Math.ceil(max / step) * step);
  const gridLines = Array.from(
    { length: Math.round(yMax / step) },
    (_, i) => (i + 1) * step
  );
  return { yMax, gridLines };
}
