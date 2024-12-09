import React from 'react';
import styles from './styles.module.css';

export default function Holiday({text}: {text: string}): JSX.Element {
  return (
    <span className={styles.holidayText}>
      {text}
    </span>
  );
}
