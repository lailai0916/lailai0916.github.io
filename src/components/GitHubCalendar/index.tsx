import BrowserOnly from '@docusaurus/BrowserOnly';
import { GitHubCalendar as GitHubActivityCalendar } from 'react-github-calendar';
import Skeleton from '@site/src/components/laikit/Skeleton';
import styles from './styles.module.css';

export default function GitHubCalendar() {
  return (
    <div className={styles.calendar}>
      <BrowserOnly fallback={<Skeleton height={163} radius={8} />}>
        {() => <GitHubActivityCalendar username="lailai0916" />}
      </BrowserOnly>
    </div>
  );
}
