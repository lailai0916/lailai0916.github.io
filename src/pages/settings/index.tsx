import { Input, InputGroup } from '@lailai0916/ui/Field';
import { useState, useEffect, useRef, useCallback, type ReactNode } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Skeleton from '@lailai0916/ui/Skeleton';
import { translate } from '@docusaurus/Translate';
import Layout from '@theme/Layout';

import TitleCard from '@lailai0916/ui/TitleCard';
import Segmented, { type SegmentedItem } from '@lailai0916/ui/Segmented';
import Switch from '@lailai0916/ui/Switch';
import Slider from '@lailai0916/ui/Slider';
import Button from '@lailai0916/ui/Button';
import { useColorMode } from '@docusaurus/theme-common';
import { usePersistentState } from '@site/src/hooks/usePersistentState';
import {
  EXPERIMENTAL_STORAGE_KEY,
  EXPERIMENTAL_EVENT,
  SETTINGS_EXPERIMENTAL_DEFAULT,
  isExperimentalSettings,
  type ExperimentalSettings,
} from '@site/src/hooks/useExperimentalFlag';
import { useThemeColors } from '@site/src/hooks/useThemeColors';
import { getThemeDefaults, readStoredColorState, themeStorage } from '@site/src/utils/colorUtils';
import { trackEvent } from '@site/src/utils/analytics';
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
  readFontFamily,
  readFontSize,
  readLineHeight,
  writeFontSize,
  writeLineHeight,
  type FontFamilyChoice,
} from '@site/src/utils/preferences';
import { fireConfetti } from '@site/src/utils/confetti';
import Icon from '@lailai0916/ui/Icon';
import { PageTitle, PageHeader, PageContent } from '@lailai0916/ui/Page';
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
        onChange={(value) => {
          setColorMode(value);
          if (value !== colorModeChoice) {
            trackEvent('preference_change', {
              surface: 'settings',
              preference: 'theme',
              value: value ?? 'system',
            });
          }
        }}
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
  const pickerRef = useRef<HTMLInputElement>(null);
  const committedColor = useRef(colorState.baseColor.toLowerCase());
  const recordColor = useCallback((value: string) => {
    const next = value.toLowerCase();
    if (next === committedColor.current) return;
    committedColor.current = next;
    trackEvent('preference_change', {
      surface: 'settings',
      preference: 'accent_color',
      value: next,
    });
  }, []);
  const commitInputColor = () => {
    commitColor();
    recordColor(colorState.baseColor);
  };

  useEffect(() => {
    const picker = pickerRef.current;
    // React's color onChange also fires for previews; native change marks a committed selection.
    const handleCommit = () => {
      if (picker) recordColor(picker.value);
    };
    picker?.addEventListener('change', handleCommit);
    return () => picker?.removeEventListener('change', handleCommit);
  }, [recordColor]);

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
          <InputGroup className={styles.colorField}>
            <input
              ref={pickerRef}
              type="color"
              value={colorState.baseColor}
              onChange={(e) => updateColor(e.target.value)}
              onBlur={commitInputColor}
              className={styles.colorPickerInput}
              aria-label={translate({
                id: 'pages.settings.item.color.picker',
                message: 'Pick color',
              })}
            />
            <Input
              type="text"
              monospace
              value={inputColor}
              onChange={(e) => updateColor(e.target.value)}
              onBlur={commitInputColor}
              onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
              style={{ minWidth: '7ch' }}
              size={8}
              aria-label={translate({
                id: 'pages.settings.item.color.hex',
                message: 'Hex color value',
              })}
            />
          </InputGroup>
          <Button
            variant="secondary"
            size="sm"
            className={styles.resetButton}
            onClick={() => {
              resetColors();
              recordColor(getThemeDefaults(colorMode === 'dark').primary);
            }}
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
                background: color,
              }}
              aria-pressed={colorState.baseColor.toLowerCase() === color.toLowerCase()}
              onClick={() => {
                updateColor(color);
                recordColor(color);
              }}
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

function isFontFamilyChoice(value: unknown): value is FontFamilyChoice {
  return value === 'system' || value === 'sans' || value === 'serif';
}

function FontFamily() {
  const [choice, setChoice] = usePersistentState<FontFamilyChoice>(
    FONT_FAMILY_KEY,
    FONT_FAMILY_DEFAULT,
    isFontFamilyChoice
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
        onChange={(value) => {
          setChoice(value);
          if (value !== choice) {
            trackEvent('preference_change', {
              surface: 'settings',
              preference: 'font_family',
              value,
            });
          }
        }}
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
  const committedSize = useRef(fontSize);
  const committedLineHeight = useRef(lineHeight);

  // Applied on release rather than per drag frame: --global-font-size reflows the
  // whole document, so following the thumb would stutter under the cursor.
  const commitSize = (size: number) => {
    applyFontSize(size);
    writeFontSize(size);
    if (size !== committedSize.current) {
      committedSize.current = size;
      trackEvent('preference_change', {
        surface: 'settings',
        preference: 'font_size',
        value: size,
      });
    }
  };

  const commitLineHeight = (value: number) => {
    const rounded = Math.round(value * 20) / 20;
    applyLineHeight(rounded);
    writeLineHeight(rounded);
    if (rounded !== committedLineHeight.current) {
      committedLineHeight.current = rounded;
      trackEvent('preference_change', {
        surface: 'settings',
        preference: 'line_height',
        value: rounded,
      });
    }
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
      key: 'grayMode' as const,
      label: translate({
        id: 'pages.settings.item.experimental.option.grayMode',
        message: 'Gray Mode',
      }),
      icon: 'lucide:contrast',
    },
    {
      key: 'debugMode' as const,
      label: translate({
        id: 'pages.settings.item.experimental.option.debugMode',
        message: 'Debug Mode',
      }),
      icon: 'lucide:terminal',
    },
  ];
  const [toggles, setToggles] = usePersistentState<ExperimentalSettings>(
    EXPERIMENTAL_STORAGE_KEY,
    SETTINGS_EXPERIMENTAL_DEFAULT,
    isExperimentalSettings
  );

  const handleToggle = (key: keyof ExperimentalSettings, checked: boolean) => {
    if (toggles[key] === checked) return;
    setToggles((prev) => ({ ...prev, [key]: checked }));

    // Notify same-tab listeners; cross-tab updates flow through the `storage` event.
    window.dispatchEvent(
      new CustomEvent(EXPERIMENTAL_EVENT, {
        detail: { key, checked },
      })
    );
    const preference = (
      {
        classicDesign: 'classic_design',
        grayMode: 'gray_mode',
        debugMode: 'debug_mode',
      } as const
    )[key];
    trackEvent('preference_change', { surface: 'settings', preference, value: checked });
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
  const { colorMode, colorModeChoice, setColorMode } = useColorMode();

  function handleReset() {
    let experimentalChanged = false;
    try {
      const settings: unknown = JSON.parse(
        localStorage.getItem(EXPERIMENTAL_STORAGE_KEY) ?? 'null'
      );
      experimentalChanged =
        isExperimentalSettings(settings) && Object.values(settings).some(Boolean);
    } catch {
      // Invalid stored values already resolve to the default settings.
    }
    const changed =
      colorModeChoice !== null ||
      readStoredColorState(colorMode === 'dark').baseColor !==
        getThemeDefaults(colorMode === 'dark').primary ||
      (readFontFamily() ?? FONT_FAMILY_DEFAULT) !== FONT_FAMILY_DEFAULT ||
      (readFontSize() ?? FONT_SIZE_DEFAULT) !== FONT_SIZE_DEFAULT ||
      (readLineHeight() ?? LINE_HEIGHT_DEFAULT) !== LINE_HEIGHT_DEFAULT ||
      experimentalChanged;
    setColorMode(null);
    // Keep an explicit default so another locale's legacy color cannot return.
    themeStorage.set('{}');
    localStorage.removeItem(FONT_FAMILY_KEY);
    localStorage.removeItem(FONT_SIZE_KEY);
    localStorage.removeItem(LINE_HEIGHT_KEY);
    localStorage.removeItem(EXPERIMENTAL_STORAGE_KEY);
    if (changed) {
      trackEvent('preference_change', {
        surface: 'settings',
        preference: 'reset',
        value: 'defaults',
      });
    }
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
      onClick: () => {
        fireConfetti();
        trackEvent('feature_use', {
          surface: 'settings',
          feature: 'confetti',
          action: 'activate',
        });
      },
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
                <span className={styles.actionItemIcon}>
                  <Icon icon={option.icon} />
                </span>
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
      </PageHeader>
      <PageContent className="site-page-content">
        <BrowserOnly
          fallback={
            <div
              className={styles.layout}
              role="status"
              aria-label={translate({ id: 'pages.settings.loading', message: 'Loading settings…' })}
            >
              {tiles.map((tile) => (
                <Skeleton key={tile.key} height={250} radius={16} />
              ))}
            </div>
          }
        >
          {() => <div className={styles.layout}>{tiles}</div>}
        </BrowserOnly>
      </PageContent>
    </Layout>
  );
}
