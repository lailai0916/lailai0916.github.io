import React from 'react';
import clsx from 'clsx';
import globalStyles from '../../styles.module.css';
import localStyles from './styles.module.css';

const devices = [
  { name: 'MacBook Pro', imgSrc: '/img/device/macbook.svg' },
  { name: 'iPad Pro', imgSrc: '/img/device/ipad.svg' },
  { name: 'iPhone 13', imgSrc: '/img/device/iphone.svg' },
  { name: 'Apple Watch S10', imgSrc: '/img/device/applewatch.svg' },
  { name: 'AirPods Pro 2', imgSrc: '/img/device/airpods.pro.svg' },
  { name: 'AirPods Max', imgSrc: '/img/device/airpods.max.svg' },
];

export default function MyDevicesSection() {
  return (
    <div className={globalStyles.section}>
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>我的设备</h2>
          </div>
        </div>
        <div className="row" style={{ justifyContent: 'center' }}>
          {devices.map((device, idx) => (
            <div key={idx} className={clsx('col', 'col--2', localStyles.item)}>
              <div className={clsx("card", "card--S", "shadow--md", localStyles.deviceCard)}>
                <img src={device.imgSrc} alt={device.name} />
                <h4>{device.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
