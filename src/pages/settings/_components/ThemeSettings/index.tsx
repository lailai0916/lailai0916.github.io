import React from 'react';
import clsx from 'clsx';
import { useColorMode } from '@docusaurus/theme-common';
import IconText from '@site/src/components/laiKit/widget/IconText';
import SettingCard from '../shared/SettingCard';
import styles from '../../styles.module.css';

export default function ThemeSettings() {
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
