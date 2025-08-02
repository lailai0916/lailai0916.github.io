import React from 'react';
import Switch from '@site/src/components/laikit/widget/Switch';
import SettingCard from '@site/src/pages/settings/_components/SettingCard';
import { usePersistentState } from '@site/src/hooks/usePersistentState';
import styles from '../styles.module.css';

const buttonOptions = [
  { key: 'newLayout' as const, label: '新版布局' },
  { key: 'debugMode' as const, label: '调试模式' },
];

export default function ExperimentalFeatures() {
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
