import { useEffect, useState } from 'react';
import Card from '@site/src/components/laikit/Card';
import { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';

interface DeadlineItem {
  label: string;
  date: string;
  approx?: boolean;
}

const UNIT = translate({ id: 'components.deadlines.unit', message: 'Days' });
const ENDED = translate({ id: 'components.deadlines.ended', message: 'Ended' });
const ABOUT = translate({
  id: 'components.deadlines.approximate',
  message: 'About',
});

export default function Deadlines({ items }: { items: DeadlineItem[] }) {
  const [nowMs, setNowMs] = useState<number | null>(null);

  useEffect(() => {
    setNowMs(Date.now());
  }, []);

  return (
    <Card padding="0" className={styles.card}>
      <ul className={styles.list}>
        {items.map(({ label, date, approx }) => {
          const days =
            nowMs == null
              ? null
              : Math.ceil(
                  (new Date(`${date}T00:00:00`).getTime() - nowMs) / 86400000
                );
          const ended = days != null && days < 0;

          return (
            <li className={styles.row} key={`${label}-${date}`}>
              <div className={styles.event}>
                <span className={styles.name}>{label}</span>
                <span className={styles.date}>{date}</span>
              </div>
              {ended ? (
                <span className={styles.ended}>{ENDED}</span>
              ) : (
                <span className={styles.remain}>
                  {approx && days != null && (
                    <span className={styles.approx}>{ABOUT}</span>
                  )}
                  <span className={styles.num}>
                    {days == null ? '–' : days}
                  </span>
                  <span className={styles.unit}>{UNIT}</span>
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
