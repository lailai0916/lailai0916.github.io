export const SHANGHAI_TIME_ZONE = 'Asia/Shanghai';

export type DateTimeInput = Date | string | number;

const SHANGHAI_OFFSET_MS = 8 * 60 * 60 * 1000;
const EXPLICIT_OFFSET = /(?:Z|[+-]\d{2}:\d{2})$/i;
const formatterCache = new Map<string, Intl.DateTimeFormat>();

function getFormatter(
  locale: string,
  timeZone: string,
  options: Intl.DateTimeFormatOptions
): Intl.DateTimeFormat {
  const key = JSON.stringify([locale, timeZone, options]);
  const cached = formatterCache.get(key);
  if (cached) return cached;

  const formatter = new Intl.DateTimeFormat(locale, { timeZone, ...options });
  formatterCache.set(key, formatter);
  return formatter;
}

function requireInstant(value: DateTimeInput): Date {
  const date = parseInstant(value);
  if (Number.isNaN(date.getTime())) {
    throw new RangeError(`Invalid instant: ${String(value)}`);
  }
  return date;
}

function fallback(value: DateTimeInput): string {
  return typeof value === 'string' ? value : '–';
}

export function parseInstant(value: DateTimeInput): Date {
  if (value instanceof Date) return new Date(value.getTime());
  if (typeof value === 'string' && !EXPLICIT_OFFSET.test(value.trim())) {
    return new Date(Number.NaN);
  }
  return new Date(value);
}

export function parseUtcDateTime(value: string): Date {
  const normalized = value.trim().replace(' ', 'T');
  return new Date(EXPLICIT_OFFSET.test(normalized) ? normalized : `${normalized}Z`);
}

export function toShanghaiDateTimeString(value: DateTimeInput): string {
  const shifted = new Date(requireInstant(value).getTime() + SHANGHAI_OFFSET_MS);
  return `${shifted.toISOString().slice(0, 19)}+08:00`;
}

export function formatInTimeZone(
  value: DateTimeInput,
  locale: string,
  timeZone: string,
  options: Intl.DateTimeFormatOptions
): string {
  const date = parseInstant(value);
  if (Number.isNaN(date.getTime())) return fallback(value);
  return getFormatter(locale, timeZone, options).format(date);
}

export function formatLocalDate(value: DateTimeInput, locale: string, timeZone: string): string {
  return formatInTimeZone(value, locale, timeZone, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatLocalTime(value: DateTimeInput, locale: string, timeZone: string): string {
  return formatInTimeZone(value, locale, timeZone, {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  });
}

export function getDateKey(value: DateTimeInput, timeZone: string): string {
  const parts = getFormatter('en-US-u-ca-gregory-nu-latn', timeZone, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(requireInstant(value));
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((item) => item.type === type)?.value ?? '';
  return `${part('year')}-${part('month')}-${part('day')}`;
}

export function getMonthKey(value: DateTimeInput, timeZone: string): string {
  return getDateKey(value, timeZone).slice(0, 7);
}

export function compareInstantsDescending(a: DateTimeInput, b: DateTimeInput): number {
  return requireInstant(b).getTime() - requireInstant(a).getTime();
}

export function formatCalendarMonth(value: string, locale: string): string {
  const match = /^(\d{4})-(0[1-9]|1[0-2])$/.exec(value);
  if (!match) return value;
  const [, year, month] = match;
  return getFormatter(locale, 'UTC', {
    year: 'numeric',
    month: 'long',
  }).format(new Date(Date.UTC(Number(year), Number(month) - 1, 1)));
}

export function formatCalendarMonthName(value: string, locale: string): string {
  const match = /^(\d{4})-(0[1-9]|1[0-2])$/.exec(value);
  if (!match) return value;
  const [, year, month] = match;
  return getFormatter(locale, 'UTC', {
    month: 'long',
  }).format(new Date(Date.UTC(Number(year), Number(month) - 1, 1)));
}
