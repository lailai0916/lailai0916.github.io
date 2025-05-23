import React from 'react';
import clsx from 'clsx';
import globalStyles from '../../styles.module.css';
import localStyles from './styles.module.css';
import DeviceList from '../../about/_components/DeviceList';

export default function MyDevicesSection() {
  // 将样式类传递给 DeviceList 组件
  const customStyle = {
    container: localStyles.deviceContainer,
    card: localStyles.deviceCard
  };

  return (
    <div className={globalStyles.section}>
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>我的设备</h2>
          </div>
        </div>
        <div className="row">
          <div className="col col--12">
            <DeviceList layout="grid" showIcons={true} customStyles={customStyle} />
          </div>
        </div>
      </div>
    </div>
  );
}
