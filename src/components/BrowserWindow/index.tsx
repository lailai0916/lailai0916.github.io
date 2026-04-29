import React, { type CSSProperties, type ReactNode } from 'react';
import clsx from 'clsx';

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
    <div className={styles.browserWindow} style={{ ...style, minHeight }}>
      <div className={styles.browserWindowHeader}>
        <div className={styles.buttons}>
          <span className={styles.dot} style={{ background: '#ff5f57' }} />
          <span className={styles.dot} style={{ background: '#febc2e' }} />
          <span className={styles.dot} style={{ background: '#28c840' }} />
        </div>
        <div className={clsx(styles.browserWindowAddressBar, 'text--truncate')}>
          {url}
        </div>
        <span className={styles.browserWindowSpacer} aria-hidden />
      </div>

      <div className={styles.browserWindowBody} style={bodyStyle}>
        {children}
      </div>
    </div>
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
    <div>
      <BrowserWindow url={url} bodyStyle={{ padding: 0 }}>
        {children}
      </BrowserWindow>
    </div>
  );
}
