import { Icon } from '@iconify/react';
import styles from './styles.module.css';

interface DataCardProps {
  value: number;
  label: string;
  icon: string;
}

export default function DataCard({ value, label, icon }: DataCardProps) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statIcon}>
        <Icon icon={icon} width={20} height={20} />
      </div>
      <div className={styles.statContent}>
        <div className={styles.statNumber}>{value}</div>
        <div className={styles.statLabel}>{label}</div>
      </div>
    </div>
  );
}
