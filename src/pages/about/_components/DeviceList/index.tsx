import React from 'react';
import clsx from 'clsx';
import { DEVICES } from '@site/src/data/device';

interface DeviceListProps {
  layout?: 'grid' | 'list';
  className?: string;
  showIcons?: boolean;
  customStyles?: {
    container?: string;
    card?: string;
  };
}

export default function DeviceList({ 
  layout = 'list', 
  className = '',
  showIcons = true,
  customStyles = {}
}: DeviceListProps) {
  if (layout === 'list') {
    // 列表布局 (适用于关于页面)
    return (
      <div className={className}>
        {DEVICES.map((device, index) => (
          <div key={index}>
            {showIcons && <img src={device.imgSrc} alt={device.name} />}
            <span>{device.name}</span>
          </div>
        ))}
      </div>
    );
  } else {
    // 网格布局 (适用于主页的卡片展示)
    return (
      <div className={clsx(className, customStyles.container)} style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center',
        gap: '1rem',
        width: '100%'
      }}>
        {DEVICES.map((device, index) => (
          <div key={index} className={clsx('card', 'card--S', 'shadow--md', customStyles.card)} style={{ 
            padding: '1rem', 
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: '200px',
            flex: '1 1 30%',
            maxWidth: '300px'
          }}>
            {showIcons && <img src={device.imgSrc} alt={device.name} style={{ marginBottom: '0.5rem' }} />}
            <h4 style={{ margin: 0 }}>{device.name}</h4>
          </div>
        ))}
      </div>
    );
  }
}
