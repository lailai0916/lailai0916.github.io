// Appearance preferences owned by the settings page. The page applies them from
// its own effects, so they only hold while it is mounted — the `applyPreferences`
// client module replays them on every page load. Keys, defaults and the CSS-var
// writes live here so both sides can never drift apart.

export type FontFamilyChoice = 'system' | 'sans' | 'serif';

export const FONT_FAMILY_KEY = 'font-family';
export const FONT_SIZE_KEY = 'global-font-size';
export const LINE_HEIGHT_KEY = 'global-line-height';

export const FONT_FAMILY_DEFAULT: FontFamilyChoice = 'system';
export const FONT_SIZE_DEFAULT = 16;
export const LINE_HEIGHT_DEFAULT = 1.65;

export const FONT_SIZE_MIN = 12;
export const FONT_SIZE_MAX = 20;
export const LINE_HEIGHT_MIN = 1.3;
export const LINE_HEIGHT_MAX = 2.0;

export const FONT_STACKS: Record<FontFamilyChoice, string> = {
  system:
    "-apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', system-ui, 'Segoe UI', Roboto, sans-serif",
  sans: "'Inter', -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', 'Source Han Sans SC', 'Noto Sans CJK SC', system-ui, 'Segoe UI', Roboto, sans-serif",
  serif:
    "Georgia, 'Times New Roman', 'Songti SC', 'Source Han Serif SC', 'Noto Serif CJK SC', SimSun, serif",
};

export function applyFontFamily(choice: FontFamilyChoice): void {
  document.documentElement.style.setProperty('--ifm-font-family-base', FONT_STACKS[choice]);
}

export function applyFontSize(px: number): void {
  document.documentElement.style.setProperty('--global-font-size', `${px}px`);
}

export function applyLineHeight(value: number): void {
  document.documentElement.style.setProperty('--global-line-height', `${value}`);
}

// Readable during SSR (the settings sliders seed their state from it) and from a
// corrupted slot: both yield null so the caller falls back to the default.
// `usePersistentState` stores JSON, so a raw string is not a valid entry.
function readJson<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? null : (JSON.parse(raw) as T);
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown): void {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function readNumber(key: string, min: number, max: number): number | null {
  const value = readJson<unknown>(key);
  if (typeof value !== 'number' || !Number.isFinite(value)) return null;
  return Math.min(max, Math.max(min, value));
}

export function readFontFamily(): FontFamilyChoice | null {
  const value = readJson<unknown>(FONT_FAMILY_KEY);
  return value === 'system' || value === 'sans' || value === 'serif' ? value : null;
}

export function readFontSize(): number | null {
  return readNumber(FONT_SIZE_KEY, FONT_SIZE_MIN, FONT_SIZE_MAX);
}

export function readLineHeight(): number | null {
  return readNumber(LINE_HEIGHT_KEY, LINE_HEIGHT_MIN, LINE_HEIGHT_MAX);
}

export function writeFontSize(px: number): void {
  writeJson(FONT_SIZE_KEY, px);
}

export function writeLineHeight(value: number): void {
  writeJson(LINE_HEIGHT_KEY, value);
}

// Only stored preferences are written to the DOM — an untouched visitor keeps
// the stylesheet defaults rather than an inline copy of them.
export function applyStoredPreferences(): void {
  const family = readFontFamily();
  if (family !== null) applyFontFamily(family);

  const size = readFontSize();
  if (size !== null) applyFontSize(size);

  const lineHeight = readLineHeight();
  if (lineHeight !== null) applyLineHeight(lineHeight);
}
