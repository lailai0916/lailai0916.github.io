import styles from './styles.module.css';

interface PageHeaderProps {
  children: React.ReactNode;
}

export default function PageHeader({ children }: PageHeaderProps) {
  return (
    <div className={styles.headerSection}>
      <div className={styles.headerInner}>{children}</div>
    </div>
  );
}
