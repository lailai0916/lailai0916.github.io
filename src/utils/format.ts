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
