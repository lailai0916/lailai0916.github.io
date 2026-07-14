import Color from 'color';
import { createStorageSlot } from '@docusaurus/theme-common';

export interface ColorState {
  baseColor: string;
  background: string;
  shades: Shades;
}

interface Shades {
  [cssVar: string]: {
    adjustment: number;
    adjustmentInput: string;
    displayOrder: number;
    codeOrder: number;
  };
}

export const COLOR_SHADES: Shades = {
  '--ifm-color-primary': {
    adjustment: 0,
    adjustmentInput: '0',
    displayOrder: 3,
    codeOrder: 0,
  },
  '--ifm-color-primary-dark': {
    adjustment: 0.1,
    adjustmentInput: '10',
    displayOrder: 4,
    codeOrder: 1,
  },
  '--ifm-color-primary-darker': {
    adjustment: 0.15,
    adjustmentInput: '15',
    displayOrder: 5,
    codeOrder: 2,
  },
  '--ifm-color-primary-darkest': {
    adjustment: 0.3,
    adjustmentInput: '30',
    displayOrder: 6,
    codeOrder: 3,
  },
  '--ifm-color-primary-light': {
    adjustment: -0.1,
    adjustmentInput: '-10',
    displayOrder: 2,
    codeOrder: 4,
  },
  '--ifm-color-primary-lighter': {
    adjustment: -0.15,
    adjustmentInput: '-15',
    displayOrder: 1,
    codeOrder: 5,
  },
  '--ifm-color-primary-lightest': {
    adjustment: -0.3,
    adjustmentInput: '-30',
    displayOrder: 0,
    codeOrder: 6,
  },
};

const THEME_CONFIG = {
  light: {
    primary: '#1d9bf0',
    background: '#ffffff',
  },
  dark: {
    primary: '#1d9bf0',
    background: '#181920',
  },
} as const;

// sessionStorage so customizations reset the next time users visit the site.
// Light and dark mode share a single accent color, so they share storage too.
export const themeStorage = createStorageSlot('ifm-theme-colors', {
  persistence: 'sessionStorage',
});

export function getThemeDefaults(isDarkTheme: boolean) {
  const theme = isDarkTheme ? 'dark' : 'light';
  return THEME_CONFIG[theme];
}

function getAdjustedColors(
  shades: Shades,
  baseColor: string
): (Shades[string] & { variableName: string; hex: string })[] {
  return Object.keys(shades).map((shade) => ({
    ...shades[shade]!,
    variableName: shade,
    hex: Color(baseColor).darken(shades[shade]!.adjustment).hex().toLowerCase(),
  }));
}

// Written as inline custom properties on :root rather than as an injected
// stylesheet rule: the rule-injection variant had to locate the hashed
// stylesheet in document.styleSheets, which is only reliable once the sheet has
// loaded — so it could not run from a client module before first paint.
export function updateDOMColors(
  { shades, baseColor, background }: ColorState,
  isDarkTheme: boolean
): void {
  const root = document.documentElement;

  for (const { variableName, hex } of getAdjustedColors(shades, baseColor)) {
    root.style.setProperty(variableName, hex);
  }

  // Keep --ifm-color-primary-rgb in sync so rgba() consumers follow the theme color.
  const rgb = Color(baseColor).rgb().array();
  root.style.setProperty(
    '--ifm-color-primary-rgb',
    `${Math.round(rgb[0]!)}, ${Math.round(rgb[1]!)}, ${Math.round(rgb[2]!)}`
  );

  // Only override the background when it actually differs from the theme default.
  if (background !== getThemeDefaults(isDarkTheme).background) {
    root.style.setProperty('--ifm-background-color', background);
  } else {
    root.style.removeProperty('--ifm-background-color');
  }
}

// Build color state from the shared storage slot, falling back to theme
// defaults. Background is theme-specific (white in light, dark in dark) and
// not user-configurable, so it's always derived from the active theme.
export function readStoredColorState(isDarkTheme: boolean): ColorState {
  const defaults = getThemeDefaults(isDarkTheme);
  if (typeof window === 'undefined') {
    return {
      baseColor: defaults.primary,
      background: defaults.background,
      shades: COLOR_SHADES,
    };
  }
  let stored: Partial<ColorState> = {};
  try {
    stored = JSON.parse(themeStorage.get() ?? '{}') as Partial<ColorState>;
  } catch {
    // A corrupted slot falls back to the defaults rather than breaking the page.
  }
  return {
    baseColor: stored.baseColor ?? defaults.primary,
    background: defaults.background,
    shades: stored.shades ?? COLOR_SHADES,
  };
}

// Replays a stored accent color onto :root. Without this the color would only
// apply while the settings page — the sole caller of useThemeColors — is mounted.
// A visitor who never picked one keeps the stylesheet defaults untouched.
export function applyStoredColors(): void {
  if (themeStorage.get() === null) return;
  const isDarkTheme = document.documentElement.dataset.theme === 'dark';
  updateDOMColors(readStoredColorState(isDarkTheme), isDarkTheme);
}
