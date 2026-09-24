import type { ReactNode } from 'react';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import styles from './styles.module.css';

export default function DocTopRow({ children }: { children?: ReactNode }): ReactNode {
  return (
    <div className={styles.topRow}>
      <DocBreadcrumbs />
      {children}
    </div>
  );
}
