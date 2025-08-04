import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import confetti from 'canvas-confetti';

import IconText from '@site/src/components/laikit/widget/IconText';
import Switch from '@site/src/components/laikit/widget/Switch';
import { useColorMode } from '@docusaurus/theme-common';
import { usePersistentState } from '@site/src/hooks/usePersistentState';
import { getAdjustedColors } from '@site/src/utils/colorUtils';
import { useThemeColors } from '@site/src/hooks/useThemeColors';
import styles from './styles.module.css';

export function ThemeSettings() {
  const themeOptions = [
    { key: null, label: '跟随系统', icon: 'lucide:monitor' },
    { key: 'light' as const, label: '浅色模式', icon: 'lucide:sun' },
    { key: 'dark' as const, label: '深色模式', icon: 'lucide:moon' },
  ];
  const { colorModeChoice, setColorMode } = useColorMode();

  return (
    <div className={styles.buttonGroup}>
      {themeOptions.map((option) => (
        <button
          key={option.key}
          className={clsx(
            styles.button,
            colorModeChoice === option.key && styles.buttonActive
          )}
          onClick={() => setColorMode(option.key)}
        >
          <IconText icon={option.icon} colorMode="monochrome">
            {option.label}
          </IconText>
        </button>
      ))}
    </div>
  );
}

export function ColorGenerator() {
  const presetColors = [
    '#1d9bf0',
    '#ffd400',
    '#f91880',
    '#7856ff',
    '#ff7a00',
    '#00ba7c',
  ];
  const { colorMode } = useColorMode();
  const { colorState, inputColor, updateColor, resetColors } = useThemeColors(
    colorMode === 'dark'
  );

  return (
    <>
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
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor =
                'var(--ifm-color-emphasis-300)';
            }}
            aria-label={`Set color to ${color}`}
          />
        ))}
      </div>

      {/* 色阶预览与重置按钮 */}
      <div className={styles.colorPreviewContainer}>
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
        <button
          onClick={resetColors}
          className={styles.resetButton}
          title="重置为默认颜色"
        >
          重置
        </button>
      </div>
    </>
  );
}

export function FontSettings() {
  const [fontSize, setFontSize] = useState<number>(16);

  useEffect(() => {
    const root = document.documentElement;
    const savedSize = localStorage.getItem('global-font-size');
    const initialSize = savedSize ? parseInt(savedSize, 10) : 16;
    setFontSize(initialSize);
    root.style.setProperty('--global-font-size', `${initialSize}px`);
  }, []);

  const handleSizeChange = (size: number) => {
    setFontSize(size);
    document.documentElement.style.setProperty(
      '--global-font-size',
      `${size}px`
    );
    localStorage.setItem('global-font-size', size.toString());
  };

  return (
    <div className={styles.sliderContainer}>
      <span className={styles.sliderLabel}>Now: {fontSize}px</span>
      <input
        type="range"
        min="12"
        max="20"
        step="1"
        value={fontSize}
        onChange={(e) => handleSizeChange(parseInt(e.target.value, 10))}
        className={styles.slider}
      />
      <div className={styles.sliderTicks}>
        <span>12px</span>
        <span>16px</span>
        <span>20px</span>
      </div>
    </div>
  );
}

export function ExperimentalFeatures() {
  const buttonOptions = [
    { key: 'newLayout' as const, label: '新版布局' },
    { key: 'debugMode' as const, label: '调试模式' },
  ];
  const [toggles, setToggles] = usePersistentState('settings-experimental', {
    newLayout: false,
    debugMode: false,
  });

  const handleToggle = (key: keyof typeof toggles, checked: boolean) => {
    setToggles((prev) => {
      const newState = { ...prev, [key]: checked };

      // 触发自定义事件通知状态变化
      if (typeof window !== 'undefined') {
        const event = new CustomEvent('experimentalSettingsChanged', {
          detail: { key, checked, newState },
        });
        window.dispatchEvent(event);
      }

      return newState;
    });
  };

  return (
    <div className={styles.buttonGroup}>
      {buttonOptions.map((option) => (
        <div key={option.key} className={styles.toggleItem}>
          <span>{option.label}</span>
          <Switch
            checked={toggles[option.key]}
            onChange={(checked) => handleToggle(option.key, checked)}
          />
        </div>
      ))}
    </div>
  );
}

export function QuickActions() {
  function Confetti() {
    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }

  function handleReset() {
    localStorage.removeItem('theme');
    localStorage.removeItem('global-font-size');
    localStorage.removeItem('settings-notifications');
    localStorage.removeItem('settings-experimental');
    window.location.reload();
  }

  const quickActionOptions = [
    {
      key: 'confetti' as const,
      label: '给我惊喜',
      icon: 'lucide:sparkles',
      onClick: Confetti,
    },
    {
      key: 'reset' as const,
      label: '重置设置',
      icon: 'lucide:rotate-ccw',
      onClick: handleReset,
    },
  ];

  return (
    <div className={styles.buttonGroup}>
      {quickActionOptions.map((option) => (
        <button
          key={option.key}
          className={styles.button}
          onClick={option.onClick}
        >
          <IconText icon={option.icon} colorMode="monochrome">
            {option.label}
          </IconText>
        </button>
      ))}
    </div>
  );
}
