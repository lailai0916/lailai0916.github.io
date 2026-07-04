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

export default function DataCard(
  props: DataCardProps | { items: DataCardProps[] }
) {
  const { selectMessage } = usePluralForm();

  if ('items' in props) {
    return (
      <div className={styles.statsGrid}>
        {props.items.map((item, index) => (
          <DataCard key={index} {...item} />
        ))}
      </div>
    );
  }

  const label = selectMessage(props.value, props.label);

  return (
    <Card padding="1.5rem">
      <div className={styles.statCard}>
        <IconBlock icon={props.icon} variant="muted" />
        <div className={styles.statContent}>
          <div className={styles.statNumber}>
            {props.format ? props.format(props.value) : props.value}
          </div>
          <div className={styles.statLabel}>{label}</div>
        </div>
      </div>
    </Card>
  );
}
