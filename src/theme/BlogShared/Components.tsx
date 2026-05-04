import React from 'react';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Badge from '@site/src/components/laikit/Badge';
import Card from '@site/src/components/laikit/Card';
import styles from './styles.module.css';

export { useAnalytics } from '@site/src/hooks/useAnalytics';
export type {
  AnalyticsData,
  AnalyticsStatus,
} from '@site/src/hooks/useAnalytics';

export function BlogCard({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      {title && <div className={styles.cardTitle}>{title}</div>}
      {children}
    </Card>
  );
}

export type ChipItem = {
  to: string;
  label: string;
  count?: number;
  active?: boolean;
};

export function TagChip({ item }: { item: ChipItem }) {
  return (
    <Link to={item.to} className={styles.tagChipLink}>
      <Badge active={item.active} hoverable={!item.active} count={item.count}>
        {item.label}
      </Badge>
    </Link>
  );
}

export function TagChipList({ items }: { items: ChipItem[] }) {
  return (
    <div className={styles.tagList}>
      {items.map((item) => (
        <TagChip key={item.to} item={item} />
      ))}
    </div>
  );
}

export function BlogMenu() {
  const items = [
    {
      to: useBaseUrl('/blog'),
      label: translate({ id: 'blog.menu.blog', message: 'Blog' }),
    },
    {
      to: useBaseUrl('/blog/moments'),
      label: translate({ id: 'blog.menu.moments', message: 'Moments' }),
    },
    {
      to: useBaseUrl('/blog/archive'),
      label: translate({ id: 'blog.menu.archive', message: 'Archive' }),
    },
    {
      to: useBaseUrl('/blog/tags'),
      label: translate({ id: 'blog.menu.tags', message: 'Tags' }),
    },
    {
      to: useBaseUrl('/blog/authors'),
      label: translate({ id: 'blog.menu.authors', message: 'Authors' }),
    },
  ];

  return (
    <Card padding="0.55rem 0.65rem">
      <nav className={styles.blogMenu}>
        {items.map((item) => (
          <Link key={item.to} to={item.to} className={styles.blogMenuItem}>
            {item.label}
          </Link>
        ))}
      </nav>
    </Card>
  );
}
