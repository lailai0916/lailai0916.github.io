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
  
  // 统一的状态管理 - 在SSR时使用默认值
  const [colorState, setColorState] = useState<ColorState>(() => {
    // 在服务端渲染时，直接返回默认值
    if (typeof window === 'undefined') {
      return {
        baseColor: defaults.primary,
        background: defaults.background,
        shades: COLOR_SHADES,
      };
    }
    
    // 在客户端时，尝试从storage加载
    try {
      const storedValues = JSON.parse(storage.get() ?? '{}') as Partial<ColorState>;
      return {
        baseColor: storedValues.baseColor ?? defaults.primary,
        background: storedValues.background ?? defaults.background,
        shades: storedValues.shades ?? COLOR_SHADES,
      };
    } catch {
      return {
        baseColor: defaults.primary,
        background: defaults.background,
        shades: COLOR_SHADES,
      };
    }
  });
  
  const [inputColor, setInputColor] = useState(colorState.baseColor);

  // 当主题切换时重新加载数据
  useEffect(() => {
    // 只在客户端执行
    if (typeof window === 'undefined') return;
    
    try {
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
    } catch {
      // 如果出错，使用默认值
      const newDefaults = getThemeDefaults(isDarkTheme);
      const newState = {
        baseColor: newDefaults.primary,
        background: newDefaults.background,
        shades: COLOR_SHADES,
      };
      setColorState(newState);
      setInputColor(newState.baseColor);
    }
  }, [isDarkTheme]);

  // 应用颜色变化并保存
  useEffect(() => {
    // 只在客户端执行
    if (typeof window === 'undefined') return;
    
    try {
      updateDOMColors(colorState, isDarkTheme);
      const storage = getThemeStorage(isDarkTheme);
      storage.set(JSON.stringify(colorState));
    } catch {
      // 如果出错，静默处理
    }
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
