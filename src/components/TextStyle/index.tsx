import React from 'react';
import styles from './styles.module.css';

export function Holiday({ text }: { text: string }): JSX.Element {
  return (
    <span className={styles.holidayTextStyle}>
      {text}
    </span>
  );
}

export function Vip({ text }: { text: string }): JSX.Element {
  return (
    <span className={styles.vipTextStyle}>
      {text}
    </span>
  );
}
