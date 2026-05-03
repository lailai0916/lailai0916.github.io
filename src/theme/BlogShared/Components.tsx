import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import { translate } from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { Icon } from '@iconify/react';
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
    <Link
      to={item.to}
      className={clsx(styles.tagChip, {
        [styles.tagChipActive]: item.active,
      })}
    >
      <span className={styles.tagDot} />
      {item.label}
      {item.count !== undefined && <span>{item.count}</span>}
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
  const { pathname } = useLocation();
  const blogBase = useBaseUrl('/blog');
  const archiveBase = useBaseUrl('/blog/archive');
  const tagsBase = useBaseUrl('/blog/tags');
  const authorsBase = useBaseUrl('/blog/authors');

  const items = [
    {
      to: blogBase,
      label: translate({ id: 'blog.menu.latest', message: 'Latest' }),
      icon: 'lucide:newspaper',
      active:
        pathname === blogBase ||
        pathname === `${blogBase}/` ||
        pathname.startsWith(`${blogBase}/page/`),
    },
    {
      to: archiveBase,
      label: translate({ id: 'blog.menu.archive', message: 'Archive' }),
      icon: 'lucide:archive',
      active: pathname.startsWith(archiveBase),
    },
    {
      to: tagsBase,
      label: translate({ id: 'blog.menu.tags', message: 'Tags' }),
      icon: 'lucide:tag',
      active: pathname.startsWith(tagsBase),
    },
    {
      to: authorsBase,
      label: translate({ id: 'blog.menu.authors', message: 'Authors' }),
      icon: 'lucide:users-round',
      active: pathname.startsWith(authorsBase),
    },
  ];

  return (
    <Card>
      <nav className={styles.blogMenu}>
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={clsx(styles.blogMenuItem, {
              [styles.blogMenuItemActive]: item.active,
            })}
          >
            <Icon icon={item.icon} width="1em" height="1em" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </Card>
  );
}
