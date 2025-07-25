import React from 'react';
import Switch from '@site/src/components/laiKit/widget/Switch';
import SettingCard from '@site/src/components/laiKit/widget/SettingCard';
import { usePersistentState } from '../../../../hooks/usePersistentState';
import styles from '../../styles.module.css';

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
          detail: { key, checked, newState }
        });
        window.dispatchEvent(event);
      }
      
      return newState;
    });
  };

  return (
    <SettingCard
      title="实验性功能"
      subtitle="尝试即将推出的新功能，可能不稳定"
      icon="lucide:flask-conical"
    >
      <ul className={styles.toggleList}>
        <li>
          <span>新版布局</span>
          <Switch
            checked={toggles.newLayout}
            onChange={(checked) => handleToggle('newLayout', checked)}
          />
        </li>
        <li>
          <span>调试模式</span>
          <Switch
            checked={toggles.debugMode}
            onChange={(checked) => handleToggle('debugMode', checked)}
          />
        </li>
      </ul>
    </SettingCard>
  );
}
