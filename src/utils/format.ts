export function formatCompact(
  n: number,
  locale: string = 'en',
  significantDigits: number = 3
): string {
  if (!Number.isFinite(n)) return '–';
  // Three significant figures across magnitudes: 123, 1.23K, 12.3K, 123K, 1.23M.
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    maximumSignificantDigits: significantDigits,
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
  const formatted = n >= 100 ? Math.round(n).toString() : n.toFixed(n >= 10 ? 1 : 2);
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

export function formatLocalizedDate(date: Date | string | number, locale: string): string {
  return new Date(date).toLocaleDateString(locale, {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatLocalizedTime(date: Date | string | number, locale: string): string {
  return new Date(date).toLocaleTimeString(locale, {
    timeZone: 'Asia/Shanghai',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}
