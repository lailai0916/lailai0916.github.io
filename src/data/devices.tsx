import { translate } from '@docusaurus/Translate';

interface DeviceItem {
  title: string;
  icon: string;
  spec: string;
  image: string;
}

export const DEVICE_LIST: DeviceItem[] = [
  {
    title: 'MacBook Pro (M3 Max)',
    icon: '/icons/devices/macbook.svg',
    spec: translate({
      id: 'data.devices.macbook-pro.spec',
      message: '16-inch / Silver / 14 CPU / 30 GPU / 36GB / 1TB',
    }),
    image: '/img/devices/macbook-pro.png',
  },
  {
    title: 'iPad Pro (M1)',
    icon: '/icons/devices/ipad.svg',
    spec: translate({
      id: 'data.devices.ipad-pro.spec',
      message: '11-inch / Space Gray / 256GB',
    }),
    image: '/img/devices/ipad-pro.png',
  },
  {
    title: 'iPhone 13',
    icon: '/icons/devices/iphone.svg',
    spec: translate({
      id: 'data.devices.iphone.spec',
      message: 'Starlight / A15 / 256GB',
    }),
    image: '/img/devices/iphone.png',
  },
  {
    title: 'Apple Watch S10',
    icon: '/icons/devices/applewatch.svg',
    spec: translate({
      id: 'data.devices.apple-watch.spec',
      message: 'Titanium / Slate / 46mm',
    }),
    image: '/img/devices/apple-watch.png',
  },
  {
    title: 'AirPods Pro 2',
    icon: '/icons/devices/airpods.pro.svg',
    spec: translate({
      id: 'data.devices.airpods-pro.spec',
      message: 'USB-C / H2 / U1',
    }),
    image: '/img/devices/airpods-pro.png',
  },
  {
    title: 'AirPods Max 1',
    icon: '/icons/devices/airpods.max.svg',
    spec: translate({
      id: 'data.devices.airpods-max.spec',
      message: 'USB-C / Midnight / H1',
    }),
    image: '/img/devices/airpods-max.png',
  },
  {
    title: 'Powerbeats Pro 2',
    icon: '/icons/devices/beats.powerbeats.pro.svg',
    spec: translate({
      id: 'data.devices.powerbeats-pro.spec',
      message: 'Jet Black / H2',
    }),
    image: '/img/devices/powerbeats-pro.png',
  },
];
