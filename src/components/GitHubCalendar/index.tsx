import BrowserOnly from '@docusaurus/BrowserOnly';
import { GitHubCalendar as GitHubActivityCalendar } from 'react-github-calendar';
import Skeleton from '@lailai0916/ui/Skeleton';
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
