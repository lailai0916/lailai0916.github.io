import { type ReactNode } from 'react';
import styles from './styles.module.css';

interface SectionContainerProps {
  children: ReactNode;
}

export default function SectionContainer({ children }: SectionContainerProps) {
  return (
    <div className={styles.sectionOuter}>
      <div className={styles.sectionInner}>{children}</div>
    </div>
  );
}
