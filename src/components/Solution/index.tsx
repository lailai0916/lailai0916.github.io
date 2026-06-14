import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import Badge from '@site/src/components/laikit/Badge';
import styles from './styles.module.css';

const PROBLEM = translate({
  id: 'components.solution.problem',
  message: 'Problem',
});
const SOLUTION = translate({
  id: 'components.solution.label',
  message: 'Solution',
});

export default function Solution({ pid, lid }: { pid: string; lid: string }) {
  return (
    <div className={styles.solution}>
      <Link
        href={`https://www.luogu.com.cn/problem/${pid}`}
        className={styles.link}
        aria-label={`${PROBLEM} · ${pid}`}
      >
        <Badge icon="simple-icons:luogu" hoverable>
          {pid}
        </Badge>
      </Link>
      <Link
        href={`https://www.luogu.com.cn/article/${lid}`}
        className={styles.link}
        aria-label={SOLUTION}
      >
        <Badge icon="simple-icons:luogu" hoverable>
          {SOLUTION}
        </Badge>
      </Link>
    </div>
  );
}
