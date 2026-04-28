import { useState, useEffect, useCallback } from 'react';
import Color from 'color';
import type { ColorState } from '@site/src/utils/colorUtils';
import {
  COLOR_SHADES,
  getThemeDefaults,
  getThemeStorage,
  updateDOMColors,
} from '@site/src/utils/colorUtils';

export function useThemeColors(isDarkTheme: boolean) {
  const storage = getThemeStorage(isDarkTheme);
  const defaults = getThemeDefaults(isDarkTheme);

  const [colorState, setColorState] = useState<ColorState>(() => {
    if (typeof window === 'undefined') {
      return {
        baseColor: defaults.primary,
        background: defaults.background,
        shades: COLOR_SHADES,
      };
    }
    const storedValues = JSON.parse(
      storage.get() ?? '{}'
    ) as Partial<ColorState>;
    return {
      baseColor: storedValues.baseColor ?? defaults.primary,
      background: storedValues.background ?? defaults.background,
      shades: storedValues.shades ?? COLOR_SHADES,
    };
  });

  const [inputColor, setInputColor] = useState(colorState.baseColor);

  useEffect(() => {
    const newStorage = getThemeStorage(isDarkTheme);
    const newDefaults = getThemeDefaults(isDarkTheme);
    const storedValues = JSON.parse(
      newStorage.get() ?? '{}'
    ) as Partial<ColorState>;
    const newState = {
      baseColor: storedValues.baseColor ?? newDefaults.primary,
      background: storedValues.background ?? newDefaults.background,
      shades: storedValues.shades ?? COLOR_SHADES,
    };
    setColorState(newState);
    setInputColor(newState.baseColor);
  }, [isDarkTheme]);

  useEffect(() => {
    updateDOMColors(colorState, isDarkTheme);
    const storage = getThemeStorage(isDarkTheme);
    storage.set(JSON.stringify(colorState));
  }, [colorState, isDarkTheme]);

  const updateColor = useCallback((colorValue: string) => {
    const newColor = colorValue.replace(/^(?=[^#])/, '#');
    setInputColor(newColor);
    let hex: string;
    try {
      hex = Color(newColor).hex().toLowerCase();
    } catch {
      // user is still typing an incomplete or invalid color string
      return;
    }
    setColorState((prev) => ({ ...prev, baseColor: hex }));
  }, []);

  const resetColors = useCallback(() => {
    const defaults = getThemeDefaults(isDarkTheme);
    const newState = {
      baseColor: defaults.primary,
      background: defaults.background,
      shades: COLOR_SHADES,
    };

    setColorState(newState);
    setInputColor(newState.baseColor);
  }, [isDarkTheme]);

  return {
    colorState,
    inputColor,
    updateColor,
    resetColors,
  };
}
