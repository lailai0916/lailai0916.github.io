import React from 'react';
import { DEVICES } from '@site/src/data/device';
import styles from './styles.module.css';

export default function Device() {
  return (
    <div className={styles.item}>
      {DEVICES.map((device, index) => (
        <div key={index}>
          <img src={device.icon} alt={device.name} />
          <span>{device.name}</span>
        </div>
      ))}
    </div>
  );
}
