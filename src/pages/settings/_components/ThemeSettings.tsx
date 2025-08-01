import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import clsx from 'clsx';
import IconText from '@site/src/components/laikit/widget/IconText';
import SettingCard from '@site/src/components/laikit/widget/SettingCard';
import styles from '../styles.module.css';

const themeOptions = [
  { key: 'auto' as const, label: '跟随系统', icon: 'lucide:monitor' },
  { key: 'light' as const, label: '浅色模式', icon: 'lucide:sun' },
  { key: 'dark' as const, label: '深色模式', icon: 'lucide:moon' },
];

export default function ThemeSettings() {
  const { colorModeChoice, setColorMode } = useColorMode();
  const currentChoice = colorModeChoice === null ? 'auto' : colorModeChoice;

  return (
    <SettingCard
      title="外观主题"
      subtitle="选择一个适合您的主题模式"
      icon="lucide:monitor"
    >
      <div className={clsx(styles.buttonGroup, styles.verticalButtonGroup)}>
        {themeOptions.map((option) => (
          <button
            key={option.key}
            className={clsx(
              styles.button,
              currentChoice === option.key && styles.buttonActive
            )}
            onClick={() =>
              setColorMode(option.key === 'auto' ? null : option.key)
            }
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
