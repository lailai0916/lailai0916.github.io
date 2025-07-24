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

interface DataCardListProps {
  items: DataCardProps[];
}

export function DataCardList({ items }: DataCardListProps) {
  return (
    <div className={styles.statsGrid}>
      {items.map((item, index) => (
        <DataCard
          key={index}
          value={item.value}
          label={item.label}
          icon={item.icon}
        />
      ))}
    </div>
  );
}
