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
  
  // 统一的状态管理
  const [colorState, setColorState] = useState<ColorState>(() => {
    const storedValues = JSON.parse(storage.get() ?? '{}') as Partial<ColorState>;
    return {
      baseColor: storedValues.baseColor ?? defaults.primary,
      background: storedValues.background ?? defaults.background,
      shades: storedValues.shades ?? COLOR_SHADES,
    };
  });
  
  const [inputColor, setInputColor] = useState(colorState.baseColor);

  // 当主题切换时重新加载数据
  useEffect(() => {
    const newStorage = getThemeStorage(isDarkTheme);
    const newDefaults = getThemeDefaults(isDarkTheme);
    const storedValues = JSON.parse(newStorage.get() ?? '{}') as Partial<ColorState>;
    
    const newState = {
      baseColor: storedValues.baseColor ?? newDefaults.primary,
      background: storedValues.background ?? newDefaults.background,
      shades: storedValues.shades ?? COLOR_SHADES,
    };
    
    setColorState(newState);
    setInputColor(newState.baseColor);
  }, [isDarkTheme]);

  // 应用颜色变化并保存
  useEffect(() => {
    updateDOMColors(colorState, isDarkTheme);
    const storage = getThemeStorage(isDarkTheme);
    storage.set(JSON.stringify(colorState));
  }, [colorState, isDarkTheme]);

  // 更新颜色的回调函数
  const updateColor = useCallback((colorValue: string) => {
    const newColor = colorValue.replace(/^(?=[^#])/, '#');
    setInputColor(newColor);
    
    try {
      const validColor = Color(newColor).hex();
      setColorState(prev => ({
        ...prev,
        baseColor: validColor,
      }));
    } catch {
      // 忽略无效颜色
    }
  }, []);

  // 重置到默认颜色
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
