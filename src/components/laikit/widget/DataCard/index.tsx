import { Icon } from '@iconify/react';
import styles from './styles.module.css';

interface DataCardProps {
  value: number;
  label: string;
  icon: string;
}

export default function DataCard(props: DataCardProps | DataCardProps[]) {
  if (Array.isArray(props)) {
    return (
      <div className={styles.statsGrid}>
        {props.map((item, index) => (
          <DataCard key={index} {...item} />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.statCard}>
      <div className={styles.statIcon}>
        <Icon icon={props.icon} width={20} height={20} />
      </div>
      <div className={styles.statContent}>
        <div className={styles.statNumber}>{props.value}</div>
        <div className={styles.statLabel}>{props.label}</div>
      </div>
    </div>
  );
}
