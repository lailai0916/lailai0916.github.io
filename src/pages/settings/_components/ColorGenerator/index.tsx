import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import { getAdjustedColors } from '@site/src/utils/colorUtils';
import { useThemeColors } from '@site/src/pages/settings/_components/shared/useThemeColors';
import SettingCard from '@site/src/components/laiKit/widget/SettingCard';
import styles from '../../styles.module.css';

export default function ColorGenerator() {
  const { colorMode } = useColorMode();
  const isDarkTheme = colorMode === 'dark';
  
  const { colorState, inputColor, updateColor, resetColors } = useThemeColors(isDarkTheme);

  const presetColors = [
    '#1d9bf0',
    '#ffd400',
    '#f91880',
    '#7856ff',
    '#ff7a00',
    '#00ba7c',
  ];

  return (
    <SettingCard
      title="主题色生成器"
      subtitle="自定义网站的主色调，实时预览效果"
      icon="lucide:palette"
    >
      {/* 颜色输入 */}
      <div className={styles.colorInputContainer}>
        <input
          type="text"
          value={inputColor}
          onChange={(e) => updateColor(e.target.value)}
          className={styles.textcolorInput}
        />
        <input
          type="color"
          value={colorState.baseColor}
          onChange={(e) => updateColor(e.target.value)}
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
            onClick={() => updateColor(color)}
            aria-label={`Set color to ${color}`}
          />
        ))}
      </div>

      {/* 色阶预览 */}
      <div
        className={styles.colorPreview}
        style={{
          background: `linear-gradient(to right, ${getAdjustedColors(
            colorState.shades,
            colorState.baseColor
          )
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .map((value) => value.hex)
            .join(', ')})`,
        }}
      />
      
      {/* 重置按钮 */}
      <button 
        onClick={resetColors}
        className={styles.resetButton}
        title="重置为默认颜色"
      >
        重置
      </button>
    </SettingCard>
  );
}
