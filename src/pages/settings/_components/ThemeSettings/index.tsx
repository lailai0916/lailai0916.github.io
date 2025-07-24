import React from 'react';
import clsx from 'clsx';
import { useColorMode } from '@docusaurus/theme-common';
import IconText from '@site/src/components/laiKit/widget/IconText';
import SettingCard from '../shared/SettingCard';
import styles from '../../styles.module.css';

const themeOptions = [
  {
    key: 'auto' as const,
    label: '跟随系统',
    icon: 'lucide:monitor',
  },
  {
    key: 'light' as const,
    label: '浅色模式',
    icon: 'lucide:sun',
  },
  {
    key: 'dark' as const,
    label: '深色模式',
    icon: 'lucide:moon',
  },
];

export default function ThemeSettings() {
  const { colorModeChoice, setColorMode } = useColorMode();

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
        {themeOptions.map((option) => (
          <button
            key={option.key}
            className={clsx(
              styles.button,
              currentChoice === option.key && styles.buttonActive
            )}
            onClick={() => handleThemeChange(option.key)}
          >
            <IconText icon={option.icon}>{option.label}</IconText>
          </button>
        ))}
      </div>
    </SettingCard>
  );
}
