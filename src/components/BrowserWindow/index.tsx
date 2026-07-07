import { type CSSProperties, type ReactNode } from 'react';
import clsx from 'clsx';
import Card from '@site/src/components/laikit/Card';
import WindowBar from '@site/src/components/laikit/WindowBar';

import styles from './styles.module.css';

interface Props {
  children: ReactNode;
  minHeight?: number;
  url?: string;
  style?: CSSProperties;
  bodyStyle?: CSSProperties;
}

export default function BrowserWindow({
  children,
  minHeight,
  url = 'http://localhost:3000',
  style,
  bodyStyle,
}: Props) {
  return (
    <Card
      padding={0}
      className={styles.browserWindow}
      style={{ ...style, minHeight }}
    >
      <WindowBar className={styles.browserWindowHeader}>
        <div className={clsx(styles.browserWindowAddressBar, 'text--truncate')}>
          {url}
        </div>
      </WindowBar>

      <div className={styles.browserWindowBody} style={bodyStyle}>
        {children}
      </div>
    </Card>
  );
}

export function IframeWindow({ url }: { url: string }) {
  return (
    <div>
      <BrowserWindow
        url={url}
        style={{
          minWidth: 'min(100%,45vw)',
          maxWidth: '100%',
          overflow: 'hidden',
        }}
        bodyStyle={{ padding: 0 }}
      >
        <iframe
          src={url}
          title={url}
          style={{ display: 'block', width: '100%', height: 600 }}
        />
      </BrowserWindow>
    </div>
  );
}

interface ImageWindowProps {
  children: ReactNode;
  url: string;
}

export function ImageWindow({
  children,
  url = 'http://localhost:3000',
}: ImageWindowProps) {
  return (
    <div className={styles.imageWindow}>
      <BrowserWindow url={url} bodyStyle={{ padding: 0 }}>
        {children}
      </BrowserWindow>
    </div>
  );
}
