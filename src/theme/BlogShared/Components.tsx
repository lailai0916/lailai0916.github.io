import React from 'react';
import styles from './styles.module.css';

export function Card({ title, children }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>{title}</div>
      {children}
    </div>
  );
}
