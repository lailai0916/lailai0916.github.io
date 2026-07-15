import { useState, useEffect, type ReactNode } from 'react';
import Color from 'color';
import { translate } from '@docusaurus/Translate';
import Layout from '@theme/Layout';

import TitleCard from '@site/src/components/laikit/TitleCard';
import Segmented, { type SegmentedItem } from '@site/src/components/laikit/Segmented';
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
import { themeStorage } from '@site/src/utils/colorUtils';
import {
  FONT_FAMILY_KEY,
  FONT_FAMILY_DEFAULT,
  FONT_SIZE_KEY,
  FONT_SIZE_DEFAULT,
  FONT_SIZE_MIN,
  FONT_SIZE_MAX,
  FONT_STACKS,
  LINE_HEIGHT_KEY,
  LINE_HEIGHT_DEFAULT,
  LINE_HEIGHT_MIN,
  LINE_HEIGHT_MAX,
  applyFontFamily,
  applyFontSize,
  applyLineHeight,
  readFontSize,
  readLineHeight,
  writeFontSize,
  writeLineHeight,
  type FontFamilyChoice,
} from '@site/src/utils/preferences';
import { fireConfetti } from '@site/src/utils/confetti';
import { Icon } from '@iconify/react';
import { PageTitle, PageHeader, PageContent } from '@site/src/components/laikit/Page';
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
  const title = translate({
    id: 'pages.settings.item.theme.title',
    message: 'Theme',
  });

  return (
    <TitleCard
      icon="lucide:monitor"
      title={title}
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
        ariaLabel={title}
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
  const { colorState, inputColor, updateColor, commitColor, resetColors } = useThemeColors(
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
              onBlur={commitColor}
              onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
              className={styles.textColorInput}
              size={8}
              aria-label={translate({
                id: 'pages.settings.item.color.hex',
                message: 'Hex color value',
              })}
            />
          </label>
          <Button
            variant="secondary"
            size="sm"
            className={styles.resetButton}
            onClick={resetColors}
          >
            {translate({
              id: 'pages.settings.item.color.default',
              message: 'Default',
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
              aria-label={translate(
                {
                  id: 'pages.settings.item.color.ariaLabel',
                  message: 'Use color {color}',
                },
                { color }
              )}
            />
          ))}
        </div>
      </div>
    </TitleCard>
  );
}

function FontFamily() {
  const [choice, setChoice] = usePersistentState<FontFamilyChoice>(
    FONT_FAMILY_KEY,
    FONT_FAMILY_DEFAULT
  );

  useEffect(() => {
    applyFontFamily(choice);
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

  const title = translate({
    id: 'pages.settings.item.fontFamily.title',
    message: 'Font Family',
  });

  return (
    <TitleCard
      title={title}
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
        ariaLabel={title}
      />
    </TitleCard>
  );
}

function Typography() {
  // Seeded straight from storage: the previous shape read it in an effect, so a
  // saved size rendered as the default for a frame before snapping. Nothing is
  // applied on mount — `applyPreferences` already put it on :root at boot.
  const [fontSize, setFontSize] = useState(() => readFontSize() ?? FONT_SIZE_DEFAULT);
  const [lineHeight, setLineHeight] = useState(() => readLineHeight() ?? LINE_HEIGHT_DEFAULT);

  // Applied on release rather than per drag frame: --global-font-size reflows the
  // whole document, so following the thumb would stutter under the cursor.
  const commitSize = (size: number) => {
    applyFontSize(size);
    writeFontSize(size);
  };

  const commitLineHeight = (value: number) => {
    const rounded = Math.round(value * 20) / 20;
    applyLineHeight(rounded);
    writeLineHeight(rounded);
  };

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
        <Slider
          label={translate({
            id: 'pages.settings.item.font.size.label',
            message: 'Font Size',
          })}
          valueLabel={translate(
            {
              id: 'pages.settings.item.font.size.value',
              message: '{size}px',
            },
            { size: fontSize }
          )}
          value={fontSize}
          min={FONT_SIZE_MIN}
          max={FONT_SIZE_MAX}
          step={1}
          onChange={setFontSize}
          onCommit={commitSize}
        />
        <Slider
          label={translate({
            id: 'pages.settings.item.font.lineHeight.label',
            message: 'Line Height',
          })}
          valueLabel={lineHeight.toFixed(2)}
          value={lineHeight}
          min={LINE_HEIGHT_MIN}
          max={LINE_HEIGHT_MAX}
          step={0.05}
          onChange={(v) => setLineHeight(Math.round(v * 20) / 20)}
          onCommit={commitLineHeight}
        />
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
              aria-label={option.label}
            />
          </li>
        ))}
      </ul>
    </TitleCard>
  );
}

function QuickActions() {
  function handleReset() {
    localStorage.removeItem('theme');
    themeStorage.del();
    localStorage.removeItem(FONT_FAMILY_KEY);
    localStorage.removeItem(FONT_SIZE_KEY);
    localStorage.removeItem(LINE_HEIGHT_KEY);
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
      onClick: fireConfetti,
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
              leftIcon={<Icon icon={option.icon} className={styles.actionItemIcon} />}
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
  // Order is the a1..a6 grid-area sequence in styles.module.css; the DataCard
  // count derives from it so the two can never drift.
  const tiles = [
    <ThemeSettings key="theme" />,
    <AccentColor key="color" />,
    <FontFamily key="fontFamily" />,
    <Typography key="typography" />,
    <ExperimentalFeatures key="experimental" />,
    <QuickActions key="quickActions" />,
  ];

  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <PageHeader>
        <PageTitle title={MODIFICATION} description={DESCRIPTION} />
        <DataCard
          value={tiles.length}
          label={translate({
            id: 'pages.settings.datacard.label',
            message: 'Setting|Settings',
          })}
          icon="lucide:settings"
        />
      </PageHeader>
      <PageContent className={styles.layout}>{tiles}</PageContent>
    </Layout>
  );
}
