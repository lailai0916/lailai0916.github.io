import React from 'react';
import { Icon } from '@iconify/react';
import styles from '../../styles.module.css';

interface SettingCardProps {
  title: string;
  subtitle?: string;
  icon: string;
  children: React.ReactNode;
}

export default function SettingCard({
  title,
  subtitle,
  icon,
  children,
}: SettingCardProps) {
  return (
    <div className={styles.settingCard}>
      <div className={styles.cardHeader}>
        <Icon icon={icon} className={styles.cardIcon} />
        <div className={styles.cardTitleGroup}>
          <h3 className={styles.cardTitle}>{title}</h3>
          {subtitle && <span className={styles.cardSubtitle}>{subtitle}</span>}
        </div>
      </div>
      <div className={styles.cardBody}>{children}</div>
    </div>
  );
}
