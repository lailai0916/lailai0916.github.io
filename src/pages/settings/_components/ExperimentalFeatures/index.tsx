import React from 'react';
import Switch from '@site/src/components/laiKit/widget/Switch';
import SettingCard from '../shared/SettingCard';
import { usePersistentState } from '../shared/usePersistentState';
import styles from '../../styles.module.css';

export default function ExperimentalFeatures() {
  const [toggles, setToggles] = usePersistentState('settings-experimental', {
    newLayout: false,
    debugMode: false,
  });

  const handleToggle = (key: keyof typeof toggles, checked: boolean) => {
    setToggles((prev) => ({ ...prev, [key]: checked }));
  };

  return (
    <SettingCard
      title="实验性功能"
      subtitle="测试版本"
      icon="lucide:flask-conical"
    >
      <p className={styles.cardDescription}>
        尝试即将推出的新功能，可能不稳定。
      </p>
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
