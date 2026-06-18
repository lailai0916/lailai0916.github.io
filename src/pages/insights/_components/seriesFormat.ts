import { type ChartDatum } from '@site/src/components/laikit/Chart';
import type { SeriesPoint } from '@site/src/hooks/useUmamiPageviewsSeries';

// Bucket width of each Umami series point, used to format ticks/tooltips.
export type SeriesUnit = 'hour' | '6h' | 'day' | 'week';

function parseDate(iso: string): Date {
  return new Date(iso.replace(' ', 'T'));
}

function formatHM(d: Date, locale: string): string {
  return d.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

function formatMD(d: Date, locale: string): string {
  return d.toLocaleDateString(locale, { month: 'short', day: 'numeric' });
}

function formatYMD(d: Date, locale: string): string {
  return d.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function formatTick(
  iso: string,
  unit: SeriesUnit,
  spanDays: number,
  locale: string
): string {
  const d = parseDate(iso);
  if (Number.isNaN(d.getTime())) return iso;
  if (unit === 'hour' && spanDays <= 1.5) return formatHM(d, locale);
  return formatMD(d, locale);
}

function formatTooltipDate(
  iso: string,
  unit: SeriesUnit,
  locale: string
): string {
  const d = parseDate(iso);
  if (Number.isNaN(d.getTime())) return iso;
  if (unit === 'hour') {
    const end = new Date(d);
    end.setHours(end.getHours() + 1);
    return `${formatMD(d, locale)} ${formatHM(d, locale)} – ${formatHM(end, locale)}`;
  }
  if (unit === '6h') {
    const end = new Date(d);
    end.setHours(end.getHours() + 6);
    const sameDay =
      d.getFullYear() === end.getFullYear() &&
      d.getMonth() === end.getMonth() &&
      d.getDate() === end.getDate();
    const endLabel = sameDay
      ? formatHM(end, locale)
      : `${formatMD(end, locale)} ${formatHM(end, locale)}`;
    return `${formatMD(d, locale)} ${formatHM(d, locale)} – ${endLabel}`;
  }
  if (unit === 'week') {
    const end = new Date(d);
    end.setDate(end.getDate() + 6);
    return `${formatMD(d, locale)} – ${formatYMD(end, locale)}`;
  }
  return formatYMD(d, locale);
}

// Map a Umami pageviews series into Chart data: every point gets a tooltip,
// and only the first / middle / last get an X-axis tick (matching the old
// 3-tick sparkline).
export function toPageviewsData(
  series: SeriesPoint[],
  unit: SeriesUnit,
  locale: string
): ChartDatum[] {
  const lastIndex = series.length - 1;
  const tickIdxs =
    series.length <= 3
      ? series.map((_, i) => i)
      : [0, Math.floor(lastIndex / 2), lastIndex];
  const spanDays =
    series.length > 1
      ? (parseDate(series[lastIndex].x).getTime() -
          parseDate(series[0].x).getTime()) /
        86400000
      : 0;

  return series.map((p, i) => ({
    key: p.x,
    value: p.y,
    tooltipLabel: formatTooltipDate(p.x, unit, locale),
    axisLabel: tickIdxs.includes(i)
      ? formatTick(p.x, unit, spanDays, locale)
      : undefined,
  }));
}
