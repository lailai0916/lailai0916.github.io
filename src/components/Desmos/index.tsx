import React from 'react';
import styles from './styles.module.css';

export default function Desmos({url}: {url: string}): JSX.Element {
  return (
    <div>
      <iframe
        src={url}
        title={url}
        className={styles.container}
      />
    </div>
  );
}
