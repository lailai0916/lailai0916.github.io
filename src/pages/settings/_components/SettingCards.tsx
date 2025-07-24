import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useColorMode } from '@docusaurus/theme-common';
import { Icon } from '@iconify/react';
import confetti from 'canvas-confetti';

import IconText from '@site/src/components/laiKit/widget/IconText';
import styles from '../styles.module.css';
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
import Color from 'color';
import Switch from '@site/src/components/laiKit/widget/Switch';

// --- 通用组件 ---

// 自定义 Hook，用于将状态持久化到 localStorage
function usePersistentState<T>(
  key: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    // 仅在客户端尝试从 localStorage 读取
    if (typeof window !== 'undefined') {
      try {
        const storedValue = window.localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : defaultValue;
      } catch (error) {
        // 静默处理localStorage读取错误
        return defaultValue;
      }
    }
    return defaultValue;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      // 静默处理localStorage写入错误
    }
  }, [key, state]);

  return [state, setState];
}

// 设置卡片包裹组件
function SettingCard({
  title,
  subtitle,
  icon,
  children,
}: {
  title: string;
  subtitle?: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.settingCard}>
      <div className={styles.cardHeader}>
        <Icon icon={icon} className={styles.cardIcon} />
        <div className={styles.cardTitleGroup}>
          <h3 className={styles.cardTitle}>{title}</h3>
          {subtitle && <span className={styles.cardSubtitle}>{subtitle}</span>}
        </div>
      </div>
      <div className={styles.cardBody}>{children}</div>
    </div>
  );
}

// --- 设置卡片具体实现 ---

// 主题设置
export function ThemeSettings() {
  const { colorMode, colorModeChoice, setColorMode } = useColorMode();

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'auto') => {
    if (newTheme === 'auto') {
      // 跟随系统：设置为 null
      setColorMode(null);
    } else {
      // 设置具体的主题
      setColorMode(newTheme);
    }
  };

  // 获取当前的用户选择状态
  const getCurrentChoice = () => {
    if (colorModeChoice === null) return 'auto';
    return colorModeChoice;
  };

  const currentChoice = getCurrentChoice();

  return (
    <SettingCard title="外观主题" subtitle="显示偏好" icon="lucide:monitor">
      <p className={styles.cardDescription}>选择一个适合您的主题模式。</p>
      <div className={clsx(styles.buttonGroup, styles.verticalButtonGroup)}>
        <button
          className={clsx(
            styles.button,
            currentChoice === 'light' && styles.buttonActive
          )}
          onClick={() => handleThemeChange('light')}
        >
          <IconText icon="lucide:sun">浅色模式</IconText>
        </button>
        <button
          className={clsx(
            styles.button,
            currentChoice === 'dark' && styles.buttonActive
          )}
          onClick={() => handleThemeChange('dark')}
        >
          <IconText icon="lucide:moon">深色模式</IconText>
        </button>
        <button
          className={clsx(
            styles.button,
            currentChoice === 'auto' && styles.buttonActive
          )}
          onClick={() => handleThemeChange('auto')}
        >
          <IconText icon="lucide:monitor">跟随系统</IconText>
        </button>
      </div>
    </SettingCard>
  );
}

// 字体设置
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
    <SettingCard title="字体大小" subtitle="阅读体验" icon="lucide:type">
      <p className={styles.cardDescription}>调整界面字体以获得最佳阅读体验。</p>
      <div className={styles.sliderContainer}>
        <span className={styles.sliderLabel}>{fontSize}px</span>
        <input
          type="range"
          min="14"
          max="18"
          step="1"
          value={fontSize}
          onChange={(e) => handleSizeChange(parseInt(e.target.value, 10))}
          className={styles.slider}
        />
        <div className={styles.sliderTicks}>
          <span>小</span>
          <span>标准</span>
          <span>大</span>
        </div>
      </div>
    </SettingCard>
  );
}

// 实验性功能
export function ExperimentalFeatures() {
  const [toggles, setToggles] = usePersistentState('settings-experimental', {
    newLayout: false,
    debugMode: false,
  });

  const handleToggle = (key: keyof typeof toggles, checked: boolean) => {
    setToggles((prev) => ({ ...prev, [key]: checked }));
  };

  return (
    <SettingCard
      title="实验性功能"
      subtitle="测试版本"
      icon="lucide:flask-conical"
    >
      <p className={styles.cardDescription}>
        尝试即将推出的新功能，可能不稳定。
      </p>
      <ul className={styles.toggleList}>
        <li>
          <span>新版布局</span>
          <Switch
            checked={toggles.newLayout}
            onChange={(checked) => handleToggle('newLayout', checked)}
          />
        </li>
        <li>
          <span>调试模式</span>
          <Switch
            checked={toggles.debugMode}
            onChange={(checked) => handleToggle('debugMode', checked)}
          />
        </li>
      </ul>
    </SettingCard>
  );
}

// 快捷操作
export function QuickActions() {
  const handleReset = () => {
    if (confirm('确定要重置所有设置吗？此操作不可逆。')) {
      localStorage.removeItem('theme');
      localStorage.removeItem('global-font-size');
      // also clear settings from usePersistentState
      localStorage.removeItem('settings-notifications');
      localStorage.removeItem('settings-experimental');
      window.location.reload();
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
    });
  };

  return (
    <SettingCard title="快捷操作" subtitle="管理工具" icon="lucide:zap">
      <p className={styles.cardDescription}>快速管理您的个性化配置。</p>
      <div className={clsx(styles.buttonGroup, styles.verticalButtonGroup)}>
        <button
          className={clsx(styles.button, styles.buttonSecondary)}
          onClick={triggerConfetti}
        >
          <IconText icon="lucide:sparkles">给我惊喜</IconText>
        </button>
        <button
          className={clsx(styles.button, styles.buttonDanger)}
          onClick={handleReset}
        >
          <IconText icon="lucide:rotate-ccw">重置所有设置</IconText>
        </button>
      </div>
    </SettingCard>
  );
}

// 颜色生成器
export function ColorGenerator() {
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
