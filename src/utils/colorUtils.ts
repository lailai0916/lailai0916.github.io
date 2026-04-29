import Color from 'color';
import { createStorageSlot } from '@docusaurus/theme-common';

export interface ColorState {
  baseColor: string;
  background: string;
  shades: Shades;
}

export interface Shades {
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
const themeStorage = createStorageSlot('ifm-theme-colors', {
  persistence: 'sessionStorage',
});

export function getThemeDefaults(isDarkTheme: boolean) {
  const theme = isDarkTheme ? 'dark' : 'light';
  return THEME_CONFIG[theme];
}

export function getThemeStorage() {
  return themeStorage;
}

export function getAdjustedColors(
  shades: Shades,
  baseColor: string
): (Shades[string] & { variableName: string; hex: string })[] {
  return Object.keys(shades).map((shade) => ({
    ...shades[shade]!,
    variableName: shade,
    hex: Color(baseColor).darken(shades[shade]!.adjustment).hex().toLowerCase(),
  }));
}

export function updateDOMColors(
  { shades, baseColor, background }: ColorState,
  isDarkTheme: boolean
): void {
  const styleSheet = Array.from(document.styleSheets).find((item) =>
    item.href?.match(/styles(?:\.[\da-f]+)?\.css/)
  )!;
  const rules = Array.from(styleSheet.cssRules) as CSSStyleRule[];
  // The rule that looks the most like definition for custom theme colors
  const ruleToDelete = rules.findIndex(
    (rule) =>
      rule.selectorText ===
        (isDarkTheme ? '[data-theme="dark"]' : '[data-theme="light"]') &&
      Array.from(rule.style).includes('--ifm-color-primary') &&
      rule.style.length < 15
  );
  if (ruleToDelete >= 0) {
    styleSheet.deleteRule(ruleToDelete);
  }

  const defaultBackground = getThemeDefaults(isDarkTheme).background;

  // Only emit a background override when it actually differs from the theme default.
  const backgroundRule =
    background !== defaultBackground
      ? `\n  --ifm-background-color: ${background};`
      : '';

  // Keep --ifm-color-primary-rgb in sync so rgba() consumers follow the theme color.
  const rgb = Color(baseColor).rgb().array();
  const rgbRule = `\n  --ifm-color-primary-rgb: ${Math.round(rgb[0]!)}, ${Math.round(rgb[1]!)}, ${Math.round(rgb[2]!)};`;

  const overrideStyle = `${
    isDarkTheme ? '[data-theme="dark"]' : '[data-theme="light"]'
  } {
  ${getAdjustedColors(shades, baseColor)
    .map((value) => `  ${value.variableName}: ${value.hex};`)
    .join('\n')}${rgbRule}${backgroundRule}
}`;
  styleSheet.insertRule(overrideStyle, styleSheet.cssRules.length - 1);
}
