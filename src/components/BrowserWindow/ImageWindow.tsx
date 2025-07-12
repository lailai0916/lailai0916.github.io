import React, { type ReactNode } from 'react';
import BrowserWindow from './index';

interface Props {
  children: ReactNode;
  url: string;
}

export default function ImageWindow({
  children,
  url = 'http://localhost:3000',
}: Props) {
  return (
    <div>
      <BrowserWindow url={url} bodyStyle={{ padding: 0 }}>
        {children}
      </BrowserWindow>
    </div>
  );
}
