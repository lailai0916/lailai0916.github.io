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

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  let n = bytes / 1024;
  let unit = 'KB';
  if (n >= 1024) {
    n /= 1024;
    unit = 'MB';
  }
  const formatted =
    n >= 100 ? Math.round(n).toString() : n.toFixed(n >= 10 ? 1 : 2);
  return `${formatted} ${unit}`;
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

export function formatLocalizedDate(
  date: Date | string | number,
  locale: string
): string {
  return new Date(date).toLocaleDateString(locale, {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatLocalizedTime(
  date: Date | string | number,
  locale: string
): string {
  return new Date(date).toLocaleTimeString(locale, {
    timeZone: 'Asia/Shanghai',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}
