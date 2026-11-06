import { type ChartDatum } from '@lailai0916/ui/Chart';
import { translate } from '@docusaurus/Translate';
import { formatInTimeZone, getDateKey } from '@site/src/utils/dateTime';
import type { ChartSeriesPoint, ChartUnit } from '@site/src/utils/umamiSeries';

export type SeriesUnit = ChartUnit;

function parseDate(iso: string): Date {
  return new Date(iso.replace(' ', 'T'));
}

function formatHM(d: Date, locale: string, timeZone: string): string {
  return formatInTimeZone(d, locale, timeZone, {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  });
}

function formatMD(d: Date, locale: string, timeZone: string): string {
  return formatInTimeZone(d, locale, timeZone, { month: 'short', day: 'numeric' });
}

function formatYMD(d: Date, locale: string, timeZone: string): string {
  return formatInTimeZone(d, locale, timeZone, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function formatTick(
  iso: string,
  unit: SeriesUnit,
  spanDays: number,
  locale: string,
  compact: boolean,
  timeZone: string
): string {
  const d = parseDate(iso);
  if (Number.isNaN(d.getTime())) return iso;
  if (unit === 'hour' && spanDays <= 1.5) {
    const time = formatHM(d, locale, timeZone);
    return compact ? time.slice(0, 2) : time;
  }
  if (compact) {
    return formatInTimeZone(d, locale, timeZone, { month: 'numeric', day: 'numeric' });
  }
  return formatMD(d, locale, timeZone);
}

function formatTooltipDate(
  point: ChartSeriesPoint,
  unit: SeriesUnit,
  locale: string,
  timeZone: string
): string {
  const start = new Date(point.startAt);
  const end = new Date(point.endAt);
  if (unit === 'day' && !point.partial) return formatYMD(start, locale, timeZone);
  if (unit === 'week' && !point.partial) {
    return `${formatMD(start, locale, timeZone)} – ${formatYMD(new Date(point.endAt - 1), locale, timeZone)}`;
  }
  const sameDay = getDateKey(start, timeZone) === getDateKey(end, timeZone);
  const endLabel = sameDay
    ? formatHM(end, locale, timeZone)
    : `${formatYMD(end, locale, timeZone)} ${formatHM(end, locale, timeZone)}`;
  const period = `${formatYMD(start, locale, timeZone)} ${formatHM(start, locale, timeZone)} – ${endLabel}`;
  return point.partial
    ? translate(
        {
          id: 'pages.insights.chart.partialPeriod',
          message: '{period} (Partial Period)',
        },
        { period }
      )
    : period;
}

// Keep every data point while spacing axis labels across the available range.
export function toPageviewsData(
  series: ChartSeriesPoint[],
  unit: SeriesUnit,
  locale: string,
  tickCount: 3 | 5 = 3,
  compactTicks = false,
  timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
): ChartDatum[] {
  const lastIndex = series.length - 1;
  const tickIdxs =
    series.length <= tickCount
      ? series.map((_, i) => i)
      : Array.from({ length: tickCount }, (_, i) => Math.floor((i * lastIndex) / (tickCount - 1)));
  const spanDays = series.length > 1 ? (series[lastIndex].endAt - series[0].startAt) / 86400000 : 0;

  return series.map((p, i) => ({
    key: p.x,
    value: p.y,
    tooltipLabel: formatTooltipDate(p, unit, locale, timeZone),
    axisLabel: tickIdxs.includes(i)
      ? formatTick(p.x, unit, spanDays, locale, compactTicks, timeZone)
      : undefined,
  }));
}
