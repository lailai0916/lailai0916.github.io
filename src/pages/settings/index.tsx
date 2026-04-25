import React, { useState, useEffect, type ReactNode } from 'react';
import clsx from 'clsx';
import confetti from 'canvas-confetti';
import Color from 'color';
import { translate } from '@docusaurus/Translate';
import Layout from '@theme/Layout';

import Card from '@site/src/components/laikit/Card';
import Switch from '@site/src/components/laikit/Switch';
import DataCard from '@site/src/components/laikit/DataCard';
import {
  SETTINGS_EXPERIMENTAL_DEFAULT,
  SETTINGS_PRESET_COLOR_LIST,
} from '@site/src/data/settings';
import { useColorMode } from '@docusaurus/theme-common';
import { usePersistentState } from '@site/src/hooks/usePersistentState';
import { getAdjustedColors } from '@site/src/utils/colorUtils';
import { useThemeColors } from '@site/src/hooks/useThemeColors';
import { Icon } from '@iconify/react';
import { PageTitle, PageHeader } from '@site/src/components/laikit/Page';
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

interface SettingCardProps {
  title: string;
  description: string;
  icon: string;
  children: ReactNode;
}

function SettingCard({ title, description, icon, children }: SettingCardProps) {
  return (
    <Card padding="1.5rem" className={styles.settingCard}>
      <div className={styles.cardHeader}>
        <div className={styles.cardIconWrapper}>
          <Icon icon={icon} className={styles.cardIcon} />
        </div>
        <div className={styles.cardTitleGroup}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <span className={styles.cardDescription}>{description}</span>
        </div>
      </div>
      <div className={styles.cardBody}>{children}</div>
    </Card>
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
    <SettingCard
      title={translate({
        id: 'pages.settings.item.theme.title',
        message: 'Theme',
      })}
      description={translate({
        id: 'pages.settings.item.theme.description',
        message: 'Switch between light, dark, or system',
      })}
      icon="lucide:monitor"
    >
      <div className={styles.segmented}>
        {themeOptions.map((option) => (
          <button
            key={option.key ?? 'system'}
            type="button"
            className={clsx(
              styles.segmentItem,
              colorModeChoice === option.key && styles.segmentItemActive
            )}
            onClick={() => setColorMode(option.key)}
            aria-pressed={colorModeChoice === option.key}
          >
            <Icon icon={option.icon} className={styles.segmentIcon} />
            <span className={styles.segmentLabel}>{option.label}</span>
          </button>
        ))}
      </div>
    </SettingCard>
  );
}

function AccentColor() {
  const { colorMode } = useColorMode();
  const { colorState, inputColor, updateColor, resetColors } = useThemeColors(
    colorMode === 'dark'
  );

  return (
    <SettingCard
      title={translate({
        id: 'pages.settings.item.color.title',
        message: 'Accent Color',
      })}
      description={translate({
        id: 'pages.settings.item.color.description',
        message: "Customize the site's primary color",
      })}
      icon="lucide:palette"
    >
      <div className={styles.colorGeneratorContainer}>
        <div className={styles.colorInputContainer}>
          <input
            type="text"
            value={inputColor}
            onChange={(e) => updateColor(e.target.value)}
            className={styles.textColorInput}
          />
          <input
            type="color"
            value={colorState.baseColor}
            onChange={(e) => updateColor(e.target.value)}
            className={styles.colorPickerInput}
          />
        </div>
        <div className={styles.presetColors}>
          {SETTINGS_PRESET_COLOR_LIST.map((color) => (
            <button
              key={color}
              className={styles.presetColorButton}
              style={{
                background: `linear-gradient(to right, ${color} 0 50%, ${Color(color).mix(Color('#fff'), 0.3).hex()} 50% 100%)`,
              }}
              onClick={() => updateColor(color)}
            />
          ))}
        </div>
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
            type="button"
            className={styles.resetButton}
            onClick={resetColors}
          >
            {translate({
              id: 'pages.settings.item.color.reset',
              message: 'Reset',
            })}
          </button>
        </div>
      </div>
    </SettingCard>
  );
}

function FontSize() {
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

  const min = 12;
  const max = 20;
  const progress = ((fontSize - min) / (max - min)) * 100;

  return (
    <SettingCard
      title={translate({
        id: 'pages.settings.item.font.title',
        message: 'Font Size',
      })}
      description={translate({
        id: 'pages.settings.item.font.description',
        message: 'Adjust interface text size',
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
          min={min}
          max={max}
          step={1}
          value={fontSize}
          onChange={(e) => handleSizeChange(parseInt(e.target.value, 10))}
          className={styles.slider}
          style={{ '--slider-progress': `${progress}%` } as React.CSSProperties}
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

function ExperimentalFeatures() {
  const buttonOptions = [
    {
      key: 'originalLayout' as const,
      label: translate({
        id: 'pages.settings.item.experimental.option.originalLayout',
        message: 'Original Layout',
      }),
      icon: 'lucide:layout-dashboard',
    },
    {
      key: 'debugMode' as const,
      label: translate({
        id: 'pages.settings.item.experimental.option.debugMode',
        message: 'Debug Mode',
      }),
      icon: 'lucide:terminal',
    },
    {
      key: 'grayMode' as const,
      label: translate({
        id: 'pages.settings.item.experimental.option.grayMode',
        message: 'Gray Mode',
      }),
      icon: 'lucide:contrast',
    },
  ];
  const [toggles, setToggles] = usePersistentState<
    typeof SETTINGS_EXPERIMENTAL_DEFAULT
  >('settings-experimental', SETTINGS_EXPERIMENTAL_DEFAULT);

  const handleToggle = (
    key: keyof typeof SETTINGS_EXPERIMENTAL_DEFAULT,
    checked: boolean
  ) => {
    setToggles((prev) => {
      const newState = { ...prev, [key]: checked };

      // 触发自定义事件通知状态变化
      const event = new CustomEvent('experimentalSettingsChanged', {
        detail: { key, checked, newState },
      });
      window.dispatchEvent(event);

      return newState;
    });
  };

  return (
    <SettingCard
      title={translate({
        id: 'pages.settings.item.experimental.title',
        message: 'Experimental Features',
      })}
      description={translate({
        id: 'pages.settings.item.experimental.description',
        message: 'Try features still in development',
      })}
      icon="lucide:flask-conical"
    >
      <ul className={styles.toggleList}>
        {buttonOptions.map((option) => (
          <li key={option.key} className={styles.toggleItem}>
            <span className={styles.toggleItemLabel}>
              <Icon icon={option.icon} className={styles.toggleItemIcon} />
              <span>{option.label}</span>
            </span>
            <Switch
              checked={toggles[option.key]}
              onChange={(checked) => handleToggle(option.key, checked)}
            />
          </li>
        ))}
      </ul>
    </SettingCard>
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
    <SettingCard
      title={translate({
        id: 'pages.settings.item.quickactions.title',
        message: 'Quick Actions',
      })}
      description={translate({
        id: 'pages.settings.item.quickactions.description',
        message: 'Run common actions instantly',
      })}
      icon="lucide:zap"
    >
      <ul className={styles.actionList}>
        {quickActionOptions.map((option) => (
          <li key={option.key}>
            <button
              type="button"
              className={styles.actionItem}
              onClick={option.onClick}
            >
              <Icon icon={option.icon} className={styles.actionItemIcon} />
              <span>{option.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </SettingCard>
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
      <AccentColor />
      <FontSize />
      <ExperimentalFeatures />
      <QuickActions />
    </div>
  );
}

export default function Settings(): ReactNode {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <SettingsHeader />
      <SettingsContainer />
    </Layout>
  );
}
