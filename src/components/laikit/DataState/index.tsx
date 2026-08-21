import { type ReactNode } from 'react';
import styles from './styles.module.css';

interface DataStateProps {
  message: string;
  action?: ReactNode;
}

export default function DataState({ message, action }: DataStateProps) {
  return (
    <div className={styles.state}>
      <p className={styles.message}>{message}</p>
      {action}
    </div>
  );
}
