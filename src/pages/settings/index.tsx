import React, { useState, useEffect, type ReactNode } from 'react';
import confetti from 'canvas-confetti';
import Color from 'color';
import { translate } from '@docusaurus/Translate';
import Layout from '@theme/Layout';

import IconCard from '@site/src/components/laikit/IconCard';
import Segmented, {
  type SegmentedItem,
} from '@site/src/components/laikit/Segmented';
import Switch from '@site/src/components/laikit/Switch';
import Slider from '@site/src/components/laikit/Slider';
import DataCard from '@site/src/components/laikit/DataCard';
import Button from '@site/src/components/laikit/Button';
import {
  SETTINGS_EXPERIMENTAL_DEFAULT,
  SETTINGS_PRESET_COLOR_LIST,
} from '@site/src/data/settings';
import { useColorMode } from '@docusaurus/theme-common';
import { useAlternatePageUtils } from '@docusaurus/theme-common/internal';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { usePersistentState } from '@site/src/hooks/usePersistentState';
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

type ThemeChoice = 'light' | 'dark' | null;

function ThemeSettings() {
  const themeOptions: SegmentedItem<ThemeChoice>[] = [
    {
      value: null,
      label: translate({
        id: 'pages.settings.item.theme.option.system',
        message: 'System Mode',
      }),
      icon: 'lucide:monitor',
    },
    {
      value: 'light',
      label: translate({
        id: 'pages.settings.item.theme.option.light',
        message: 'Light Mode',
      }),
      icon: 'lucide:sun',
    },
    {
      value: 'dark',
      label: translate({
        id: 'pages.settings.item.theme.option.dark',
        message: 'Dark Mode',
      }),
      icon: 'lucide:moon',
    },
  ];
  const { colorModeChoice, setColorMode } = useColorMode();

  return (
    <IconCard
      icon="lucide:monitor"
      title={translate({
        id: 'pages.settings.item.theme.title',
        message: 'Theme',
      })}
      description={translate({
        id: 'pages.settings.item.theme.description',
        message: 'Switch between light, dark, or system',
      })}
      bodyAlign="bottom"
    >
      <Segmented<ThemeChoice>
        value={colorModeChoice as ThemeChoice}
        items={themeOptions}
        onChange={(v) => setColorMode(v)}
      />
    </IconCard>
  );
}

function AccentColor() {
  const { colorMode } = useColorMode();
  const { colorState, inputColor, updateColor, resetColors } = useThemeColors(
    colorMode === 'dark'
  );

  return (
    <IconCard
      title={translate({
        id: 'pages.settings.item.color.title',
        message: 'Accent Color',
      })}
      description={translate({
        id: 'pages.settings.item.color.description',
        message: "Customize the site's primary color",
      })}
      icon="lucide:palette"
      bodyAlign="bottom"
    >
      <div className={styles.colorGeneratorContainer}>
        <div className={styles.colorInputContainer}>
          <label className={styles.colorField}>
            <input
              type="color"
              value={colorState.baseColor}
              onChange={(e) => updateColor(e.target.value)}
              className={styles.colorPickerInput}
              aria-label={translate({
                id: 'pages.settings.item.color.picker',
                message: 'Pick color',
              })}
            />
            <input
              type="text"
              value={inputColor}
              onChange={(e) => updateColor(e.target.value)}
              className={styles.textColorInput}
              size={8}
            />
          </label>
          <Button
            variant="secondary"
            size="sm"
            className={styles.resetButton}
            onClick={resetColors}
          >
            {translate({
              id: 'pages.settings.item.color.reset',
              message: 'Reset',
            })}
          </Button>
        </div>
        <div className={styles.presetColors}>
          {SETTINGS_PRESET_COLOR_LIST.map((color) => (
            <Button
              key={color}
              variant="ghost"
              rounded
              aria-label={color}
              className={styles.presetColorButton}
              style={{
                background: `linear-gradient(to right, ${color} 0 50%, ${Color(color).mix(Color('#fff'), 0.3).hex()} 50% 100%)`,
              }}
              onClick={() => updateColor(color)}
            />
          ))}
        </div>
      </div>
    </IconCard>
  );
}

function Typography() {
  const [fontSize, setFontSize] = useState<number>(16);
  const [lineHeight, setLineHeight] = useState<number>(1.65);

  useEffect(() => {
    const root = document.documentElement;
    const savedSize = localStorage.getItem('global-font-size');
    const initialSize = savedSize ? parseInt(savedSize, 10) : 16;
    setFontSize(initialSize);
    root.style.setProperty('--global-font-size', `${initialSize}px`);

    const savedLineHeight = localStorage.getItem('global-line-height');
    const initialLineHeight = savedLineHeight
      ? parseFloat(savedLineHeight)
      : 1.65;
    setLineHeight(initialLineHeight);
    root.style.setProperty('--global-line-height', `${initialLineHeight}`);
  }, []);

  const commitSize = (size: number) => {
    document.documentElement.style.setProperty(
      '--global-font-size',
      `${size}px`
    );
    localStorage.setItem('global-font-size', size.toString());
  };

  const commitLineHeight = (value: number) => {
    const rounded = Math.round(value * 20) / 20;
    document.documentElement.style.setProperty(
      '--global-line-height',
      `${rounded}`
    );
    localStorage.setItem('global-line-height', rounded.toString());
  };

  const sizeMin = 12;
  const sizeMax = 20;
  const lineHeightMin = 1.3;
  const lineHeightMax = 2.0;

  return (
    <IconCard
      title={translate({
        id: 'pages.settings.item.font.title',
        message: 'Typography',
      })}
      description={translate({
        id: 'pages.settings.item.font.description',
        message: 'Adjust text size and line spacing',
      })}
      icon="lucide:type"
      bodyAlign="bottom"
    >
      <div className={styles.sliderGroup}>
        <div className={styles.sliderContainer}>
          <span className={styles.sliderLabel}>
            {translate(
              {
                id: 'pages.settings.item.font.size.current',
                message: 'Font Size: {size}px',
              },
              { size: fontSize }
            )}
          </span>
          <Slider
            value={fontSize}
            min={sizeMin}
            max={sizeMax}
            step={1}
            onChange={setFontSize}
            onCommit={commitSize}
            ticks={[
              { value: 12, label: '12px' },
              { value: 16, label: '16px' },
              { value: 20, label: '20px' },
            ]}
          />
        </div>
        <div className={styles.sliderContainer}>
          <span className={styles.sliderLabel}>
            {translate(
              {
                id: 'pages.settings.item.font.lineheight.current',
                message: 'Line Height: {value}',
              },
              { value: lineHeight.toFixed(2) }
            )}
          </span>
          <Slider
            value={lineHeight}
            min={lineHeightMin}
            max={lineHeightMax}
            step={0.05}
            onChange={(v) => setLineHeight(Math.round(v * 20) / 20)}
            onCommit={commitLineHeight}
            ticks={[
              { value: 1.3, label: '1.30' },
              { value: 1.65, label: '1.65' },
              { value: 2.0, label: '2.00' },
            ]}
          />
        </div>
      </div>
    </IconCard>
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

      // Notify same-tab listeners; cross-tab updates flow through the `storage` event.
      const event = new CustomEvent('experimentalSettingsChanged', {
        detail: { key, checked, newState },
      });
      window.dispatchEvent(event);

      return newState;
    });
  };

  return (
    <IconCard
      title={translate({
        id: 'pages.settings.item.experimental.title',
        message: 'Experimental Features',
      })}
      description={translate({
        id: 'pages.settings.item.experimental.description',
        message: 'Try features still in development',
      })}
      icon="lucide:flask-conical"
      bodyAlign="bottom"
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
    </IconCard>
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
    localStorage.removeItem('global-line-height');
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
    <IconCard
      title={translate({
        id: 'pages.settings.item.quickactions.title',
        message: 'Quick Actions',
      })}
      description={translate({
        id: 'pages.settings.item.quickactions.description',
        message: 'Run common actions instantly',
      })}
      icon="lucide:zap"
      bodyAlign="bottom"
    >
      <ul className={styles.actionList}>
        {quickActionOptions.map((option) => (
          <li key={option.key}>
            <Button
              variant="secondary"
              fullWidth
              className={styles.actionItem}
              leftIcon={
                <Icon icon={option.icon} className={styles.actionItemIcon} />
              }
              onClick={option.onClick}
            >
              {option.label}
            </Button>
          </li>
        ))}
      </ul>
    </IconCard>
  );
}

function SettingsHeader() {
  return (
    <PageHeader>
      <PageTitle title={MODIFICATION} description={DESCRIPTION} />
      <DataCard
        value={6}
        label={translate({
          id: 'pages.settings.datacard.label',
          message: 'Settings',
        })}
        icon="lucide:settings"
      />
    </PageHeader>
  );
}

function LanguageSettings() {
  const {
    i18n: { currentLocale, locales, localeConfigs },
  } = useDocusaurusContext();
  const alternatePageUtils = useAlternatePageUtils();

  const items: SegmentedItem<string>[] = locales.map((locale) => ({
    value: locale,
    label: localeConfigs[locale].label,
    icon: 'lucide:languages',
  }));

  return (
    <IconCard
      title={translate({
        id: 'pages.settings.item.language.title',
        message: 'Language',
      })}
      description={translate({
        id: 'pages.settings.item.language.description',
        message: 'Switch the interface language',
      })}
      icon="lucide:languages"
      bodyAlign="bottom"
    >
      <Segmented<string>
        value={currentLocale}
        items={items}
        onChange={(locale) => {
          if (locale === currentLocale) return;
          window.location.href = alternatePageUtils.createUrl({
            locale,
            fullyQualified: false,
          });
        }}
      />
    </IconCard>
  );
}

function SettingsContainer() {
  return (
    <div className={styles.container}>
      <ThemeSettings />
      <LanguageSettings />
      <AccentColor />
      <Typography />
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
