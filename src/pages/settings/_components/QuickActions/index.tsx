import React from 'react';
import clsx from 'clsx';
import confetti from 'canvas-confetti';
import IconText from '@site/src/components/laiKit/widget/IconText';
import SettingCard from '../shared/SettingCard';
import styles from '../../styles.module.css';

export default function QuickActions() {
  const handleReset = () => {
    if (confirm('确定要重置所有设置吗？此操作不可逆。')) {
      localStorage.removeItem('theme');
      localStorage.removeItem('global-font-size');
      // also clear settings from usePersistentState
      localStorage.removeItem('settings-notifications');
      localStorage.removeItem('settings-experimental');
      window.location.reload();
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
    });
  };

  return (
    <SettingCard title="快捷操作" subtitle="管理工具" icon="lucide:zap">
      <p className={styles.cardDescription}>快速管理您的个性化配置。</p>
      <div className={clsx(styles.buttonGroup, styles.verticalButtonGroup)}>
        <button
          className={clsx(styles.button, styles.buttonSecondary)}
          onClick={triggerConfetti}
        >
          <IconText icon="lucide:sparkles">给我惊喜</IconText>
        </button>
        <button
          className={clsx(styles.button, styles.buttonDanger)}
          onClick={handleReset}
        >
          <IconText icon="lucide:rotate-ccw">重置所有设置</IconText>
        </button>
      </div>
    </SettingCard>
  );
}
