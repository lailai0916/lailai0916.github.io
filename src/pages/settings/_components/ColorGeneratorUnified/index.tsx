import React, { useEffect, useState } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import Color from 'color';
import type { ColorState } from '@site/src/utils/colorUtils';
import {
  COLOR_SHADES,
  LIGHT_PRIMARY_COLOR,
  DARK_PRIMARY_COLOR,
  LIGHT_BACKGROUND_COLOR,
  DARK_BACKGROUND_COLOR,
  getAdjustedColors,
  lightStorage,
  darkStorage,
  updateDOMColors,
} from '@site/src/utils/colorUtils';
import SettingCard from '../hooks/SettingCard';
import styles from '../../styles.module.css';

export default function ColorGenerator() {
  const { colorMode } = useColorMode();
  const isDarkTheme = colorMode === 'dark';

  const [inputColor, setInputColor] = useState(
    isDarkTheme ? DARK_PRIMARY_COLOR : LIGHT_PRIMARY_COLOR
  );
  const [baseColor, setBaseColor] = useState(
    isDarkTheme ? DARK_PRIMARY_COLOR : LIGHT_PRIMARY_COLOR
  );
  const [background, setBackground] = useState(
    isDarkTheme ? DARK_BACKGROUND_COLOR : LIGHT_BACKGROUND_COLOR
  );
  const [shades, setShades] = useState(COLOR_SHADES);
  const [storage, setStorage] = useState(
    isDarkTheme ? darkStorage : lightStorage
  );

  const presetColors = [
    '#1d9bf0',
    '#ffd400',
    '#f91880',
    '#7856ff',
    '#ff7a00',
    '#00ba7c',
  ];

  useEffect(() => {
    setStorage(isDarkTheme ? darkStorage : lightStorage);
  }, [isDarkTheme]);

  useEffect(() => {
    const DEFAULT_PRIMARY_COLOR = isDarkTheme
      ? DARK_PRIMARY_COLOR
      : LIGHT_PRIMARY_COLOR;
    const DEFAULT_BACKGROUND_COLOR = isDarkTheme
      ? DARK_BACKGROUND_COLOR
      : LIGHT_BACKGROUND_COLOR;
    const storedValues = JSON.parse(
      storage.get() ?? '{}'
    ) as Partial<ColorState>;
    setInputColor(storedValues.baseColor ?? DEFAULT_PRIMARY_COLOR);
    setBaseColor(storedValues.baseColor ?? DEFAULT_PRIMARY_COLOR);
    setBackground(storedValues.background ?? DEFAULT_BACKGROUND_COLOR);
    setShades(storedValues.shades ?? COLOR_SHADES);
  }, [storage, isDarkTheme]);

  useEffect(() => {
    updateDOMColors({ baseColor, background, shades }, isDarkTheme);
    storage.set(JSON.stringify({ baseColor, background, shades }));
  }, [baseColor, background, shades, storage, isDarkTheme]);

  function handleColorUpdate(colorValue: string) {
    const newColor = colorValue.replace(/^(?=[^#])/, '#');
    setInputColor(newColor);
    try {
      setBaseColor(Color(newColor).hex());
    } catch {
      // 忽略无效颜色
    }
  }

  return (
    <SettingCard title="主题色生成器" subtitle="主题定制" icon="lucide:palette">
      <p className={styles.cardDescription}>
        自定义网站的主色调，实时预览效果。
      </p>

      {/* 颜色输入 */}
      <div className={styles.colorInputContainer}>
        <input
          type="text"
          value={inputColor}
          onChange={(e) => handleColorUpdate(e.target.value)}
          className={styles.textcolorInput}
        />
        <input
          type="color"
          value={baseColor}
          onChange={(e) => handleColorUpdate(e.target.value)}
          className={styles.colorPickerInput}
        />
      </div>

      {/* 预设颜色 */}
      <div className={styles.presetColors}>
        {presetColors.map((color) => (
          <button
            key={color}
            className={styles.presetColorButton}
            style={{ backgroundColor: color }}
            onClick={() => handleColorUpdate(color)}
            aria-label={`Set color to ${color}`}
          />
        ))}
      </div>

      {/* 色阶预览 */}
      <div
        className={styles.colorPreview}
        style={{
          background: `linear-gradient(to right, ${getAdjustedColors(
            shades,
            baseColor
          )
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .map((value) => value.hex)
            .join(', ')})`,
        }}
      />
    </SettingCard>
  );
}
