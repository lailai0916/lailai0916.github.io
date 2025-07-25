import React from 'react';
import clsx from 'clsx';
import confetti from 'canvas-confetti';
import IconText from '@site/src/components/laiKit/widget/IconText';
import SettingCard from '@site/src/components/laiKit/widget/SettingCard';
import styles from '../../styles.module.css';

export default function QuickActions() {
  const handleReset = () => {
    localStorage.removeItem('theme');
    localStorage.removeItem('global-font-size');
    // also clear settings from usePersistentState
    localStorage.removeItem('settings-notifications');
    localStorage.removeItem('settings-experimental');
    window.location.reload();
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
    });
  };

  return (
    <SettingCard
      title="快捷操作"
      subtitle="快速管理您的个性化配置"
      icon="lucide:zap"
    >
      <div className={clsx(styles.buttonGroup, styles.verticalButtonGroup)}>
        <button
          className={styles.button}
          onClick={triggerConfetti}
        >
          <IconText icon="lucide:sparkles" colorMode='monochrome'>给我惊喜</IconText>
        </button>
        <button
          className={clsx(styles.button, styles.buttonDanger)}
          onClick={handleReset}
        >
          <IconText icon="lucide:rotate-ccw" colorMode='monochrome'>重置设置</IconText>
        </button>
      </div>
    </SettingCard>
  );
}
