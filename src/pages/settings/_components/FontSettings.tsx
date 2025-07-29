import React, { useEffect, useState } from 'react';
import SettingCard from '@site/src/components/laikit/widget/SettingCard';
import styles from '../styles.module.css';

export default function FontSettings() {
  const [fontSize, setFontSize] = useState<number>(16);

  useEffect(() => {
    const root = document.documentElement;
    const savedSize = localStorage.getItem('global-font-size');
    const initialSize = savedSize ? parseInt(savedSize, 10) : 16;
    setFontSize(initialSize);
    root.style.setProperty('--global-font-size', `${initialSize}px`);
  }, []);

  const handleSizeChange = (size: number) => {
    setFontSize(size);
    document.documentElement.style.setProperty(
      '--global-font-size',
      `${size}px`
    );
    localStorage.setItem('global-font-size', size.toString());
  };

  return (
    <SettingCard
      title="字体大小"
      subtitle="调整界面字体以获得最佳阅读体验"
      icon="lucide:type"
    >
      <div className={styles.sliderContainer}>
        <span className={styles.sliderLabel}>{fontSize}px</span>
        <input
          type="range"
          min="12"
          max="20"
          step="1"
          value={fontSize}
          onChange={(e) => handleSizeChange(parseInt(e.target.value, 10))}
          className={styles.slider}
        />
        <div className={styles.sliderTicks}>
          <span>12px</span>
          <span>16px</span>
          <span>20px</span>
        </div>
      </div>
    </SettingCard>
  );
}
