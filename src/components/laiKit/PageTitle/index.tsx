import Heading from '@theme/Heading';
import styles from './styles.module.css';

interface PageTitleProps {
  title: React.ReactNode;
  description: string;
}

export default function PageTitle({ title, description }: PageTitleProps) {
  return (
    <div className={styles.headerContent}>
      <Heading as="h1" className={styles.mainTitle}>
        {title}
      </Heading>
      <p className={styles.mainDescription}>{description}</p>
    </div>
  );
}
