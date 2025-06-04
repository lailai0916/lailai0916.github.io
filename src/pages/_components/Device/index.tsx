import React from 'react';
import clsx from 'clsx';
import styles from '../../styles.module.css';
import localStyles from './styles.module.css';
import { DEVICES } from '@site/src/data/device';

export default function Device() {
  return (
    <div className={styles.section}>
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <h2 className={styles.centerTitle}>我的设备</h2>
          </div>
        </div>
        <div className="row">
          <div className="col col--12">
            {/* 直接使用网格布局展示设备 */}
            <div className={localStyles.deviceContainer}>
              {DEVICES.map((device, index) => (
                <div key={index} className={clsx('card', 'card--S', 'shadow--md', localStyles.deviceCard)}>
                  <img src={device.icon} alt={device.name} />
                  <h4 className={styles.noMargin}>{device.name}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
