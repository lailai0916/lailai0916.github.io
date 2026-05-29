import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react';
import styles from './styles.module.css';

const PROBLEM = translate({
  id: 'components.solution.problem',
  message: 'Problem',
});
const SOLUTION = translate({
  id: 'components.solution.label',
  message: 'Solution',
});

export default function Solution({ pid, aid }: { pid: string; aid: string }) {
  return (
    <div className={styles.solution}>
      <Link
        href={`https://www.luogu.com.cn/problem/${pid}`}
        className={styles.chip}
        aria-label={`${PROBLEM} · ${pid}`}
      >
        <Icon icon="simple-icons:luogu" className={styles.logo} />
        <span className={styles.label}>{pid}</span>
      </Link>
      <Link
        href={`https://www.luogu.com.cn/article/${aid}`}
        className={styles.chip}
        aria-label={SOLUTION}
      >
        <Icon icon="simple-icons:luogu" className={styles.logo} />
        <span className={styles.label}>{SOLUTION}</span>
      </Link>
    </div>
  );
}
