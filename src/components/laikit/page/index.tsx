import { useDebugMode } from '@site/src/hooks/useDebugMode';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

export function PageMain({ children }: { children: React.ReactNode }) {
  const debugMode = useDebugMode();
  return <main className={debugMode && styles.debug}>{children}</main>;
}

export function PageTitle({
  description,
  children,
}: {
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.headerContent}>
      <Heading as="h1" className={styles.mainTitle}>
        {children}
      </Heading>
      <p className={styles.mainDescription}>{description}</p>
    </div>
  );
}

export function PageHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.headerSection}>
      <div className={styles.headerInner}>{children}</div>
    </div>
  );
}

export function PageFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.pageFooter}>
      <div className={styles.footerContent}>{children}</div>
    </div>
  );
}
