import { type ReactNode } from 'react';
import clsx from 'clsx';
import Card from '@site/src/components/laikit/Card';
import styles from './styles.module.css';

// Playground demos frame themselves in a laikit Card by default. When embedded
// in a container that already supplies the window chrome (the project page's
// Playground panel), pass `bare` to swap the Card for a light hairline frame, so
// the demo keeps a visible boundary without sitting in a card inside a window.
export default function Surface({
  bare = false,
  className,
  children,
}: {
  bare?: boolean;
  className?: string;
  children: ReactNode;
}) {
  if (bare) {
    return <div className={clsx(styles.frame, className)}>{children}</div>;
  }
  return (
    <Card padding="0" className={className}>
      {children}
    </Card>
  );
}
