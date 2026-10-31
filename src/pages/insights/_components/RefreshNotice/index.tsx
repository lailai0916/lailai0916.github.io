import { translate } from '@docusaurus/Translate';
import RetryButton from '../RetryButton';
import styles from './styles.module.css';

export default function RefreshNotice({
  onRetry,
  busy = false,
}: {
  onRetry: () => void;
  busy?: boolean;
}) {
  return (
    <div className={styles.notice} role="status">
      <span>
        {translate({
          id: 'pages.insights.refreshError',
          message: 'Update failed. Showing previous data.',
        })}
      </span>
      <RetryButton onClick={onRetry} busy={busy} />
    </div>
  );
}
