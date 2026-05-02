export function formatCompact(
  n: number,
  locale: string = 'en',
  precision: number = 2
): string {
  if (!Number.isFinite(n)) return '–';
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    maximumFractionDigits: precision,
  }).format(n);
}
