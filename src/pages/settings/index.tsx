import React, { useState, useEffect, type ReactNode } from 'react';
import clsx from 'clsx';
import confetti from 'canvas-confetti';
import { translate } from '@docusaurus/Translate';

import IconText from '@site/src/components/laikit/widget/IconText';
import Switch from '@site/src/components/laikit/widget/Switch';
import DataCard from '@site/src/components/laikit/widget/DataCard';
import { useColorMode } from '@docusaurus/theme-common';
import { usePersistentState } from '@site/src/hooks/usePersistentState';
import { getAdjustedColors } from '@site/src/utils/colorUtils';
import { useThemeColors } from '@site/src/hooks/useThemeColors';
import { Icon } from '@iconify/react';
import {
  DebugLayout,
  PageTitle,
  PageHeader,
} from '@site/src/components/laikit/page';
import styles from './styles.module.css';

const TITLE = translate({
  id: 'pages.settings.title',
  message: 'Settings',
});
const DESCRIPTION = translate({
  id: 'pages.settings.description',
  message: 'Customize website features and preferences',
});
const MODIFICATION = translate({
  id: 'pages.settings.modification',
  message: 'Personalized <b>Settings</b>',
});

function Card({ title, description, icon, children }) {
  return (
    <div className={styles.settingCard}>
      <div className={styles.cardHeader}>
        <Icon icon={icon} className={styles.cardIcon} />
        <div className={styles.cardTitleGroup}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <span className={styles.cardDescription}>{description}</span>
        </div>
      </div>
      <div className={styles.cardBody}>{children}</div>
    </div>
  );
}

function ThemeSettings() {
  const themeOptions = [
    {
      key: null,
      label: translate({
        id: 'pages.settings.item.theme.option.system',
        message: 'System Mode',
      }),
      icon: 'lucide:monitor',
    },
    {
      key: 'light' as const,
      label: translate({
        id: 'pages.settings.item.theme.option.light',
        message: 'Light Mode',
      }),
      icon: 'lucide:sun',
    },
    {
      key: 'dark' as const,
      label: translate({
        id: 'pages.settings.item.theme.option.dark',
        message: 'Dark Mode',
      }),
      icon: 'lucide:moon',
    },
  ];
  const { colorModeChoice, setColorMode } = useColorMode();

  return (
    <Card
      title={translate({
        id: 'pages.settings.item.theme.title',
        message: 'Theme',
      })}
      description={translate({
        id: 'pages.settings.item.theme.description',
        message: 'Select a theme mode that suits you',
      })}
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
    </Card>
  );
}

function ColorGenerator() {
  const presetColors = [
    '#1d9bf0',
    '#7856ff',
    '#f91880',
    '#ff7a00',
    '#ffd400',
    '#00ba7c',
  ];
  const { colorMode } = useColorMode();
  const { colorState, inputColor, updateColor, resetColors } = useThemeColors(
    colorMode === 'dark'
  );

  return (
    <Card
      title={translate({
        id: 'pages.settings.item.color.title',
        message: 'Color Generator',
      })}
      description={translate({
        id: 'pages.settings.item.color.description',
        message:
          'Customize the main color of the website, preview the effect in real time',
      })}
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
        <button className={styles.resetButton} onClick={resetColors}>
          <Icon icon="lucide:refresh-ccw" />
        </button>
      </div>
    </Card>
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
    <Card
      title={translate({
        id: 'pages.settings.item.font.title',
        message: 'Font Size',
      })}
      description={translate({
        id: 'pages.settings.item.font.description',
        message: 'Adjust the interface font to get the best reading experience',
      })}
      icon="lucide:type"
    >
      <div className={styles.sliderContainer}>
        <span className={styles.sliderLabel}>
          {translate(
            {
              id: 'pages.settings.item.font.current',
              message: 'Current: {size}px',
            },
            { size: fontSize }
          )}
        </span>
        <input
          type="range"
          min={12}
          max={20}
          step={1}
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
    </Card>
  );
}

function ExperimentalFeatures() {
  const buttonOptions = [
    {
      key: 'originalLayout' as const,
      label: translate({
        id: 'pages.settings.item.experimental.option.originalLayout',
        message: 'Original Layout',
      }),
    },
    {
      key: 'debugMode' as const,
      label: translate({
        id: 'pages.settings.item.experimental.option.debugMode',
        message: 'Debug Mode',
      }),
    },
  ];
  const [toggles, setToggles] = usePersistentState('settings-experimental', {
    originalLayout: false,
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
    <Card
      title={translate({
        id: 'pages.settings.item.experimental.title',
        message: 'Experimental Content',
      })}
      description={translate({
        id: 'pages.settings.item.experimental.description',
        message: 'Try new features that are still under development',
      })}
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
    </Card>
  );
}

function QuickActions() {
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
      key: 'surprise' as const,
      label: translate({
        id: 'pages.settings.item.quickactions.option.confetti',
        message: 'Surprise Me',
      }),
      icon: 'lucide:sparkles',
      onClick: Confetti,
    },
    {
      key: 'reset' as const,
      label: translate({
        id: 'pages.settings.item.quickactions.option.reset',
        message: 'Reset Settings',
      }),
      icon: 'lucide:rotate-ccw',
      onClick: handleReset,
    },
  ];

  return (
    <Card
      title={translate({
        id: 'pages.settings.item.quickactions.title',
        message: 'Quick Actions',
      })}
      description={translate({
        id: 'pages.settings.item.quickactions.description',
        message: 'Quickly manage your personalized configuration',
      })}
      icon="lucide:zap"
    >
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
    </Card>
  );
}

function SettingsHeader() {
  return (
    <PageHeader>
      <PageTitle title={MODIFICATION} description={DESCRIPTION} />
      <DataCard
        value={5}
        label={translate({
          id: 'pages.settings.datacard.label',
          message: 'Settings',
        })}
        icon="lucide:settings"
      />
    </PageHeader>
  );
}

function SettingsContainer() {
  return (
    <div className={styles.container}>
      <ThemeSettings />
      <ColorGenerator />
      <FontSettings />
      <ExperimentalFeatures />
      <QuickActions />
    </div>
  );
}

export default function Settings(): ReactNode {
  return (
    <DebugLayout title={TITLE} description={DESCRIPTION}>
      <SettingsHeader />
      <SettingsContainer />
    </DebugLayout>
  );
}
