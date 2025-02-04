import React from 'react';
import styles from './styles.module.css';

export default function ProgressCircle({ unit, total, value }) {
  return (
    <div className={styles.circle}>
      <div className={styles.dots} 
        style={{ transform: `rotateZ(${ 360 * value / total }deg)` }}
      />
      <svg>
        <circle cx="70" cy="70" r="70" />
        <circle 
          cx="70" 
          cy="70" 
          r="70" 
          style={{ strokeDashoffset: 440 - 440 * value / total }}
        />
      </svg>
      <div>
        {value}
        <br />
        <span>{unit}</span>
      </div>
    </div>
  );
}
