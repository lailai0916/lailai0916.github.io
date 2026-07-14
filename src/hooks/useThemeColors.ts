import { useState, useEffect, useCallback } from 'react';
import Color from 'color';
import type { ColorState } from '@site/src/utils/colorUtils';
import {
  COLOR_SHADES,
  getThemeDefaults,
  readStoredColorState,
  themeStorage,
  updateDOMColors,
} from '@site/src/utils/colorUtils';

export function useThemeColors(isDarkTheme: boolean) {
  const [colorState, setColorState] = useState<ColorState>(() => readStoredColorState(isDarkTheme));

  const [inputColor, setInputColor] = useState(colorState.baseColor);

  useEffect(() => {
    const newState = readStoredColorState(isDarkTheme);
    setColorState(newState);
    setInputColor(newState.baseColor);
  }, [isDarkTheme]);

  useEffect(() => {
    updateDOMColors(colorState, isDarkTheme);
    themeStorage.set(JSON.stringify(colorState));
  }, [colorState, isDarkTheme]);

  const updateColor = useCallback((colorValue: string) => {
    const newColor = colorValue.replace(/^(?=[^#])/, '#');
    setInputColor(newColor);
    let hex: string;
    try {
      hex = Color(newColor).hex().toLowerCase();
    } catch {
      // An incomplete/invalid value mid-typing is left un-applied and silent;
      // commitColor reconciles it on blur.
      return;
    }
    setColorState((prev) => ({ ...prev, baseColor: hex }));
  }, []);

  // On blur, reconcile the field to the applied color: reverts a still-invalid
  // entry and canonicalizes valid shorthand (e.g. #FFF → #ffffff).
  const commitColor = useCallback(() => {
    setInputColor(colorState.baseColor);
  }, [colorState.baseColor]);

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
    commitColor,
    resetColors,
  };
}
