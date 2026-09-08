import { usePluralForm } from '@docusaurus/theme-common';
import Card from '@site/src/components/laikit/Card';
import IconBlock from '@site/src/components/laikit/IconBlock';
import styles from './styles.module.css';

interface DataCardProps {
  value: number;
  label: string;
  icon: string;
  // Optional display formatter (e.g. compact "88.8K"); defaults to the raw value.
  format?: (value: number) => string;
}

export default function DataCard({ value, label, icon, format }: DataCardProps) {
  const { selectMessage } = usePluralForm();
  const displayLabel = selectMessage(value, label);

  return (
    <Card padding="1.5rem">
      <div className={styles.statCard}>
        <IconBlock icon={icon} variant="muted" />
        <div className={styles.statContent}>
          <div className={styles.statNumber}>{format ? format(value) : value}</div>
          <div className={styles.statLabel}>{displayLabel}</div>
        </div>
      </div>
    </Card>
  );
}
