import { translate } from '@docusaurus/Translate';

interface DeviceItem {
  title: string;
  spec: string;
  image: string;
}

export const DEVICE_LIST: DeviceItem[] = [
  {
    title: 'MacBook Pro (M3 Max)',
    spec: translate({
      id: 'data.devices.macbook-pro.spec',
      message: '16-inch / Silver / 14 CPU / 30 GPU / 36GB / 1TB',
    }),
    image: '/img/devices/macbook-pro.png',
  },
  {
    title: 'iPad Pro (M1)',
    spec: translate({
      id: 'data.devices.ipad-pro.spec',
      message: '11-inch / Space Gray / 256GB',
    }),
    image: '/img/devices/ipad-pro.png',
  },
  {
    title: 'iPhone 13',
    spec: translate({
      id: 'data.devices.iphone.spec',
      message: 'Starlight / A15 / 256GB',
    }),
    image: '/img/devices/iphone.png',
  },
  {
    title: 'Apple Watch Series 10',
    spec: translate({
      id: 'data.devices.apple-watch.spec',
      message: 'Titanium / Slate / 46mm / S10',
    }),
    image: '/img/devices/apple-watch.png',
  },
  {
    title: 'AirPods Pro 2',
    spec: translate({
      id: 'data.devices.airpods-pro.spec',
      message: 'USB-C / H2 / U1',
    }),
    image: '/img/devices/airpods-pro.png',
  },
  {
    title: 'AirPods Max 1',
    spec: translate({
      id: 'data.devices.airpods-max.spec',
      message: 'USB-C / Midnight / H1',
    }),
    image: '/img/devices/airpods-max.png',
  },
  {
    title: 'Powerbeats Pro 2',
    spec: translate({
      id: 'data.devices.powerbeats-pro.spec',
      message: 'Jet Black / H2',
    }),
    image: '/img/devices/powerbeats-pro.png',
  },
];
