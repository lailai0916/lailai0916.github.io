import React from 'react';
import type { KumaHeartbeat } from '@site/src/utils/kuma';
import styles from './HeartbeatBar.module.css';

interface HeartbeatBarProps {
  beats: KumaHeartbeat[];
  slots?: number;
}

function statusClass(status: number | undefined): string {
  switch (status) {
    case 1:
      return styles.up;
    case 0:
      return styles.down;
    case 2:
      return styles.pending;
    case 3:
      return styles.maintenance;
    default:
      return styles.empty;
  }
}

function formatTime(iso: string): string {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export default function HeartbeatBar({ beats, slots = 60 }: HeartbeatBarProps) {
  const padded: (KumaHeartbeat | null)[] = [];
  const start = Math.max(0, beats.length - slots);
  const recent = beats.slice(start);
  const empty = slots - recent.length;
  for (let i = 0; i < empty; i++) padded.push(null);
  for (const b of recent) padded.push(b);

  return (
    <div className={styles.bar} role="img" aria-label="Recent heartbeat status">
      {padded.map((beat, i) => {
        if (!beat) {
          return <span key={i} className={`${styles.cell} ${styles.empty}`} />;
        }
        const tooltip =
          `${formatTime(beat.time)}` +
          (typeof beat.ping === 'number' ? ` · ${beat.ping}ms` : '') +
          (beat.msg ? ` · ${beat.msg}` : '');
        return (
          <span
            key={i}
            className={`${styles.cell} ${statusClass(beat.status)}`}
            title={tooltip}
          />
        );
      })}
    </div>
  );
}
