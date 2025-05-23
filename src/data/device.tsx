export type Device = {
  icon: string;
  name: string;
  imgSrc: string;
  type: 'computer' | 'tablet' | 'phone' | 'watch' | 'audio';
};

export const DEVICES: Device[] = [
  {
    icon: 'macbook',
    name: 'MacBook Pro (M3 Max)',
    imgSrc: '/img/device/macbook.svg',
    type: 'computer'
  },
  {
    icon: 'ipad',
    name: 'iPad Pro (M1)',
    imgSrc: '/img/device/ipad.svg',
    type: 'tablet'
  },
  {
    icon: 'iphone',
    name: 'iPhone 13',
    imgSrc: '/img/device/iphone.svg',
    type: 'phone'
  },
  {
    icon: 'applewatch',
    name: 'Apple Watch Series 10',
    imgSrc: '/img/device/applewatch.svg',
    type: 'watch'
  },
  {
    icon: 'airpodspro',
    name: 'AirPods Pro 2',
    imgSrc: '/img/device/airpods.pro.svg',
    type: 'audio'
  },
  {
    icon: 'airpodsmax',
    name: 'AirPods Max',
    imgSrc: '/img/device/airpods.max.svg',
    type: 'audio'
  }
];

// 按类型分组导出
export const COMPUTERS = DEVICES.filter(device => device.type === 'computer');
export const TABLETS = DEVICES.filter(device => device.type === 'tablet');
export const PHONES = DEVICES.filter(device => device.type === 'phone');
export const WATCHES = DEVICES.filter(device => device.type === 'watch');
export const AUDIO_DEVICES = DEVICES.filter(device => device.type === 'audio');
