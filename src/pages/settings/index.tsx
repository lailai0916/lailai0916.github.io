import React, { type ReactNode, useEffect, useState } from 'react';
import Layout from '@theme/Layout';

import {
  PageTitle,
  PageMain,
  PageHeader,
} from '@site/src/components/laikit/page';
import DataCard from '@site/src/components/laikit/widget/DataCard';
import styles from './styles.module.css';

import { useColorMode } from '@docusaurus/theme-common';
import clsx from 'clsx';
import IconText from '@site/src/components/laikit/widget/IconText';
import confetti from 'canvas-confetti';
import { Icon } from '@iconify/react';

import Switch from '@site/src/components/laikit/widget/Switch';
import { usePersistentState } from '@site/src/hooks/usePersistentState';

import { getAdjustedColors } from '@site/src/utils/colorUtils';
import { useThemeColors } from '@site/src/hooks/useThemeColors';

const TITLE = '设置';
const DESCRIPTION = '个性化您的体验，自定义网站功能和偏好设置';

interface SettingCardProps {
  title: string;
  subtitle: string;
  icon: string;
  children: React.ReactNode;
}

function SettingCard({ title, subtitle, icon, children }: SettingCardProps) {
  return (
    <div className={styles.settingCard}>
      <div className={styles.cardHeader}>
        <Icon icon={icon} className={styles.cardIcon} />
        <div className={styles.cardTitleGroup}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <span className={styles.cardSubtitle}>{subtitle}</span>
        </div>
      </div>
      <div className={styles.cardBody}>{children}</div>
    </div>
  );
}

function FontSettings() {
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
    <SettingCard
      title="字体大小"
      subtitle="调整界面字体以获得最佳阅读体验"
      icon="lucide:type"
    >
      <div className={styles.sliderContainer}>
        <span className={styles.sliderLabel}>{fontSize}px</span>
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
    </SettingCard>
  );
}

const buttonOptions = [
  { key: 'newLayout' as const, label: '新版布局' },
  { key: 'debugMode' as const, label: '调试模式' },
];

function ExperimentalFeatures() {
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
    <SettingCard
      title="实验性内容"
      subtitle="尝试仍在开发的新功能"
      icon="lucide:flask-conical"
    >
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
    </SettingCard>
  );
}

function SettingsHeader() {
  return (
    <PageHeader>
      <PageTitle description={DESCRIPTION}>
        个性化<b>设置</b>
      </PageTitle>
      <DataCard value={5} label="项设置" icon="lucide:settings" />
    </PageHeader>
  );
}

function ColorGenerator() {
  const { colorMode } = useColorMode();
  const isDarkTheme = colorMode === 'dark';

  const { colorState, inputColor, updateColor, resetColors } =
    useThemeColors(isDarkTheme);

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
    </SettingCard>
  );
}

const themeOptions = [
  { key: null, label: '跟随系统', icon: 'lucide:monitor' },
  { key: 'light' as const, label: '浅色模式', icon: 'lucide:sun' },
  { key: 'dark' as const, label: '深色模式', icon: 'lucide:moon' },
];

function ThemeSettings() {
  const { colorModeChoice, setColorMode } = useColorMode();

  return (
    <SettingCard
      title="外观主题"
      subtitle="选择一个适合您的主题模式"
      icon="lucide:monitor"
    >
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
    </SettingCard>
  );
}

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
    className: styles.button,
  },
  {
    key: 'reset' as const,
    label: '重置设置',
    icon: 'lucide:rotate-ccw',
    onClick: handleReset,
    className: clsx(styles.button, styles.buttonDanger),
  },
];

function QuickActions() {
  return (
    <SettingCard
      title="快捷操作"
      subtitle="快速管理您的个性化配置"
      icon="lucide:zap"
    >
      <div className={styles.buttonGroup}>
        {quickActionOptions.map((option) => (
          <button
            key={option.key}
            className={option.className}
            onClick={option.onClick}
          >
            <IconText icon={option.icon} colorMode="monochrome">
              {option.label}
            </IconText>
          </button>
        ))}
      </div>
    </SettingCard>
  );
}

export default function Settings(): ReactNode {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <PageMain>
        <SettingsHeader />
        <div className={styles.container}>
          <ThemeSettings />
          <ColorGenerator />
          <FontSettings />
          <ExperimentalFeatures />
          <QuickActions />
        </div>
      </PageMain>
    </Layout>
  );
}
