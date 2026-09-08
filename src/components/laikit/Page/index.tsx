import { type ElementType, type ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

export function PageTitle({ title, description }: { title: string; description: string }) {
  return (
    <div className={styles.headerContent}>
      <Heading as="h1" className={styles.mainTitle} dangerouslySetInnerHTML={{ __html: title }} />
      <p className={styles.mainDescription}>{description}</p>
    </div>
  );
}

export function PageHeader({ children, aside }: { children: ReactNode; aside?: ReactNode }) {
  return (
    <div className={styles.headerSection}>
      <div className={styles.headerInner}>
        {children}
        {aside != null && <div className={styles.headerAside}>{aside}</div>}
      </div>
    </div>
  );
}

export function PageContent({
  as: Tag = 'main',
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={clsx(styles.pageContent, className)}>{children}</Tag>;
}
