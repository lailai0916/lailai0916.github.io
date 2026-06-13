import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Icon } from '@iconify/react';
import Badge from '@site/src/components/laikit/Badge';
import { formatLocalizedDate } from '@site/src/utils/format';
import styles from './styles.module.css';
import shared from '../styles.module.css';

// Bottom-of-article meta shared by blog posts and docs: tag chips on the left,
// the "last updated on …" line pushed to the right.
interface MetaFooterProps {
  tags: { to: string; label: string }[];
  lastUpdatedAt?: number | string | null;
}

export default function MetaFooter({ tags, lastUpdatedAt }: MetaFooterProps) {
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();

  const hasTags = tags.length > 0;
  const hasUpdated = lastUpdatedAt != null;
  if (!hasTags && !hasUpdated) return null;

  return (
    <footer className={styles.footer}>
      <div className={styles.meta}>
        {hasTags && (
          <div className={styles.tagList}>
            {tags.map((tag) => (
              <Link key={tag.to} to={tag.to} className={styles.tagChipLink}>
                <Badge hoverable>{tag.label}</Badge>
              </Link>
            ))}
          </div>
        )}
        {hasUpdated && (
          <span className={clsx(shared.metaItem, styles.updated)}>
            <Icon icon="lucide:history" width={14} height={14} />
            <time dateTime={new Date(lastUpdatedAt!).toISOString()}>
              {translate(
                {
                  id: 'components.article.lastUpdated',
                  message: 'Last updated on {date}',
                },
                {
                  date: formatLocalizedDate(
                    new Date(lastUpdatedAt!).toISOString(),
                    currentLocale
                  ),
                }
              )}
            </time>
          </span>
        )}
      </div>
    </footer>
  );
}
