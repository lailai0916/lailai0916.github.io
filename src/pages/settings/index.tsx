import { useState, useEffect, type ReactNode } from 'react';
import confetti from 'canvas-confetti';
import Color from 'color';
import { translate } from '@docusaurus/Translate';
import Layout from '@theme/Layout';

import TitleCard from '@site/src/components/laikit/TitleCard';
import Segmented, {
  type SegmentedItem,
} from '@site/src/components/laikit/Segmented';
import Switch from '@site/src/components/laikit/Switch';
import Slider from '@site/src/components/laikit/Slider';
import DataCard from '@site/src/components/laikit/DataCard';
import Button from '@site/src/components/laikit/Button';
import { useColorMode } from '@docusaurus/theme-common';
import { usePersistentState } from '@site/src/hooks/usePersistentState';
import {
  EXPERIMENTAL_STORAGE_KEY,
  EXPERIMENTAL_EVENT,
  SETTINGS_EXPERIMENTAL_DEFAULT,
  type ExperimentalSettings,
} from '@site/src/hooks/useExperimentalFlag';
import { useThemeColors } from '@site/src/hooks/useThemeColors';
import { getThemeStorage } from '@site/src/utils/colorUtils';
import { Icon } from '@iconify/react';
import {
  PageTitle,
  PageHeader,
  PageContent,
} from '@site/src/components/laikit/Page';
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
    <TitleCard
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
    </TitleCard>
  );
}

const SETTINGS_PRESET_COLOR_LIST = [
  '#1d9bf0', // blue
  '#6366f1', // indigo
  '#a855f7', // purple
  '#d946ef', // fuchsia
  '#ec4899', // pink
  '#ef4444', // red
  '#f97316', // orange
  '#eab308', // yellow
  '#84cc16', // lime
  '#22c55e', // green
  '#14b8a6', // teal
  '#06b6d4', // cyan
];

function AccentColor() {
  const { colorMode } = useColorMode();
  const { colorState, inputColor, updateColor, resetColors } = useThemeColors(
    colorMode === 'dark'
  );

  return (
    <TitleCard
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
      </div>
    </TitleCard>
  );
}

type FontFamilyChoice = 'system' | 'sans' | 'serif';

const FONT_STACKS: Record<FontFamilyChoice, string> = {
  system:
    "-apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', system-ui, 'Segoe UI', Roboto, sans-serif",
  sans: "'Inter', -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', 'Source Han Sans SC', 'Noto Sans CJK SC', system-ui, 'Segoe UI', Roboto, sans-serif",
  serif:
    "Georgia, 'Times New Roman', 'Songti SC', 'Source Han Serif SC', 'Noto Serif CJK SC', SimSun, serif",
};

function FontFamily() {
  const [choice, setChoice] = usePersistentState<FontFamilyChoice>(
    'font-family',
    'system'
  );

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--ifm-font-family-base',
      FONT_STACKS[choice]
    );
  }, [choice]);

  const items: SegmentedItem<FontFamilyChoice>[] = [
    {
      value: 'system',
      label: translate({
        id: 'pages.settings.item.fontFamily.option.system',
        message: 'System',
      }),
      style: { fontFamily: FONT_STACKS.system },
    },
    {
      value: 'sans',
      label: translate({
        id: 'pages.settings.item.fontFamily.option.sans',
        message: 'Sans',
      }),
      style: { fontFamily: FONT_STACKS.sans },
    },
    {
      value: 'serif',
      label: translate({
        id: 'pages.settings.item.fontFamily.option.serif',
        message: 'Serif',
      }),
      style: { fontFamily: FONT_STACKS.serif },
    },
  ];

  return (
    <TitleCard
      title={translate({
        id: 'pages.settings.item.fontFamily.title',
        message: 'Font Family',
      })}
      description={translate({
        id: 'pages.settings.item.fontFamily.description',
        message: 'Choose between system, sans, or serif',
      })}
      icon="lucide:case-sensitive"
      bodyAlign="bottom"
    >
      <Segmented<FontFamilyChoice>
        value={choice}
        items={items}
        onChange={setChoice}
      />
    </TitleCard>
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
    <TitleCard
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
                id: 'pages.settings.item.font.lineHeight.current',
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
    </TitleCard>
  );
}

function ExperimentalFeatures() {
  const buttonOptions = [
    {
      key: 'classicDesign' as const,
      label: translate({
        id: 'pages.settings.item.experimental.option.classicDesign',
        message: 'Classic Design',
      }),
      icon: 'lucide:paintbrush',
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
  const [toggles, setToggles] = usePersistentState<ExperimentalSettings>(
    EXPERIMENTAL_STORAGE_KEY,
    SETTINGS_EXPERIMENTAL_DEFAULT
  );

  const handleToggle = (key: keyof ExperimentalSettings, checked: boolean) => {
    setToggles((prev) => {
      const newState = { ...prev, [key]: checked };

      // Notify same-tab listeners; cross-tab updates flow through the `storage` event.
      const event = new CustomEvent(EXPERIMENTAL_EVENT, {
        detail: { key, checked },
      });
      window.dispatchEvent(event);

      return newState;
    });
  };

  return (
    <TitleCard
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
    </TitleCard>
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
    getThemeStorage().del();
    localStorage.removeItem('font-family');
    localStorage.removeItem('global-font-size');
    localStorage.removeItem('global-line-height');
    localStorage.removeItem(EXPERIMENTAL_STORAGE_KEY);
    window.location.reload();
  }

  const quickActionOptions = [
    {
      key: 'surprise' as const,
      label: translate({
        id: 'pages.settings.item.quickActions.option.confetti',
        message: 'Surprise Me',
      }),
      icon: 'lucide:sparkles',
      onClick: Confetti,
    },
    {
      key: 'reset' as const,
      label: translate({
        id: 'pages.settings.item.quickActions.option.reset',
        message: 'Reset Settings',
      }),
      icon: 'lucide:rotate-ccw',
      onClick: handleReset,
    },
  ];

  return (
    <TitleCard
      title={translate({
        id: 'pages.settings.item.quickActions.title',
        message: 'Quick Actions',
      })}
      description={translate({
        id: 'pages.settings.item.quickActions.description',
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
    </TitleCard>
  );
}

export default function Settings(): ReactNode {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
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
      <PageContent className={styles.layout}>
        <ThemeSettings />
        <AccentColor />
        <FontFamily />
        <Typography />
        <ExperimentalFeatures />
        <QuickActions />
      </PageContent>
    </Layout>
  );
}
