import { translate } from '@docusaurus/Translate';
import RetryButton from '../RetryButton';
import styles from './styles.module.css';

export default function RefreshNotice({ onRetry }: { onRetry: () => void }) {
  return (
    <div className={styles.notice} role="status">
      <span>
        {translate({
          id: 'pages.insights.refreshError',
          message: 'Update failed. Showing previous data.',
        })}
      </span>
      <RetryButton onClick={onRetry} />
    </div>
  );
}
