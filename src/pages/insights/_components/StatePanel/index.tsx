import { Icon } from '@iconify/react';
import Card from '@site/src/components/laikit/Card';
import RetryButton from '../RetryButton';
import styles from './styles.module.css';

// The page's one error surface: a section whose fetch failed renders this in
// place of its content, so a dead endpoint never reads as an endless skeleton.
export default function StatePanel({ text, onRetry }: { text: string; onRetry?: () => void }) {
  return (
    <Card padding="2rem 1.25rem" className={styles.panel}>
      <Icon icon="lucide:cloud-off" className={styles.icon} aria-hidden="true" />
      <p className={styles.text}>{text}</p>
      {onRetry && <RetryButton onClick={onRetry} />}
    </Card>
  );
}
