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

export function formatBeijingDate(
  date: Date | string | number,
  locale: string = 'en-CA',
  options: Intl.DateTimeFormatOptions = {}
): string {
  return new Date(date).toLocaleDateString(locale, {
    timeZone: 'Asia/Shanghai',
    ...options,
  });
}
