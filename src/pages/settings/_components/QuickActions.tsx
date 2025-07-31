import React from 'react';
import IconText from '@site/src/components/laikit/widget/IconText';
import SettingCard from '@site/src/components/laikit/widget/SettingCard';
import clsx from 'clsx';
import confetti from 'canvas-confetti';
import styles from '../styles.module.css';

function Confetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

function handleReset() {
  localStorage.removeItem('theme');
  localStorage.removeItem('global-font-size');
  // also clear settings from usePersistentState
  localStorage.removeItem('settings-notifications');
  localStorage.removeItem('settings-experimental');
  window.location.reload();
};

export default function QuickActions() {
  return (
    <SettingCard
      title="快捷操作"
      subtitle="快速管理您的个性化配置"
      icon="lucide:zap"
    >
      <div className={clsx(styles.buttonGroup, styles.verticalButtonGroup)}>
        <button className={styles.button} onClick={Confetti}>
          <IconText icon="lucide:sparkles" colorMode="monochrome">
            给我惊喜
          </IconText>
        </button>
        <button
          className={clsx(styles.button, styles.buttonDanger)}
          onClick={handleReset}
        >
          <IconText icon="lucide:rotate-ccw" colorMode="monochrome">
            重置设置
          </IconText>
        </button>
      </div>
    </SettingCard>
  );
}
