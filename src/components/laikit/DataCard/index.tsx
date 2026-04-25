import Card from '@site/src/components/laikit/Card';
import IconBlock from '@site/src/components/laikit/IconBlock';
import styles from './styles.module.css';

interface DataCardProps {
  value: number;
  label: string;
  icon: string;
}

export default function DataCard(
  props: DataCardProps | { items: DataCardProps[] }
) {
  if ('items' in props) {
    return (
      <div className={styles.statsGrid}>
        {props.items.map((item, index) => (
          <DataCard key={index} {...item} />
        ))}
      </div>
    );
  }

  return (
    <Card padding="1.5rem">
      <div className={styles.statCard}>
        <IconBlock icon={props.icon} variant="muted" />
        <div className={styles.statContent}>
          <div className={styles.statNumber}>{props.value}</div>
          <div className={styles.statLabel}>{props.label}</div>
        </div>
      </div>
    </Card>
  );
}
