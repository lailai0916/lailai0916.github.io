import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Translate, { translate } from '@docusaurus/Translate';
import Card from '@site/src/components/laikit/Card';
import styles from './styles.module.css';

// The birthday recurs yearly: the countdown always targets the next occurrence
// (pinned to Beijing time like every date on the site), celebrates on the day
// itself, and rolls over at the following midnight — no yearly manual edit.
const BIRTHDAY_MONTH = 9;
const BIRTHDAY_DAY = 16;
const BEIJING_OFFSET_MS = 8 * 60 * 60 * 1000;

const EVENT = translate({
  id: 'components.countdown.event',
  message: 'My Birthday',
});
const FINAL = translate({
  id: 'components.countdown.final',
  message: 'Happy Birthday!',
});

type CountdownUnitKey = 'days' | 'hours' | 'minutes' | 'seconds';

const TIME_UNITS: Array<{ key: CountdownUnitKey; label: string }> = [
  {
    key: 'days',
    label: translate({ id: 'components.countdown.unit.days', message: 'Days' }),
  },
  {
    key: 'hours',
    label: translate({ id: 'components.countdown.unit.hours', message: 'Hours' }),
  },
  {
    key: 'minutes',
    label: translate({ id: 'components.countdown.unit.minutes', message: 'Minutes' }),
  },
  {
    key: 'seconds',
    label: translate({ id: 'components.countdown.unit.seconds', message: 'Seconds' }),
  },
];

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  progress: number;
  isBirthday: boolean;
}

const INITIAL_STATE: CountdownState = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  progress: 0,
  isBirthday: false,
};

function birthdayMs(year: number): number {
  const month = String(BIRTHDAY_MONTH).padStart(2, '0');
  const day = String(BIRTHDAY_DAY).padStart(2, '0');
  return Date.parse(`${year}-${month}-${day}T00:00:00+08:00`);
}

function calculateState(now: number): CountdownState {
  // Shifting by the offset lets the UTC getters read Beijing wall-clock parts.
  const beijing = new Date(now + BEIJING_OFFSET_MS);
  const year = beijing.getUTCFullYear();
  if (beijing.getUTCMonth() + 1 === BIRTHDAY_MONTH && beijing.getUTCDate() === BIRTHDAY_DAY) {
    return { ...INITIAL_STATE, progress: 1, isBirthday: true };
  }
  const targetYear = now < birthdayMs(year) ? year : year + 1;
  const target = birthdayMs(targetYear);
  const origin = birthdayMs(targetYear - 1);
  const distance = target - now;
  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor(distance / 3_600_000) % 24,
    minutes: Math.floor(distance / 60_000) % 60,
    seconds: Math.floor(distance / 1000) % 60,
    progress: (now - origin) / (target - origin),
    isBirthday: false,
  };
}

export default function Countdown() {
  const [state, setState] = useState<CountdownState>(INITIAL_STATE);

  useEffect(() => {
    let timer: number;
    const tick = () => {
      const now = Date.now();
      setState(calculateState(now));
      timer = window.setTimeout(tick, 1000 - (now % 1000));
    };
    tick();
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <Card className={styles.panel} padding="0">
      <div className={styles.body}>
        <p className={clsx(styles.caption, state.isBirthday && styles.captionFinal)}>
          {state.isBirthday ? (
            FINAL
          ) : (
            <Translate
              id="components.countdown.description"
              values={{
                event: <span className={styles.event}>{EVENT}</span>,
              }}
            >
              {'Time left until {event}'}
            </Translate>
          )}
        </p>
        <div className={styles.clock} role="timer">
          {TIME_UNITS.map(({ key, label }) => (
            <div className={styles.unit} key={key}>
              <span className={styles.value}>{String(state[key]).padStart(2, '0')}</span>
              <span className={styles.label}>{label}</span>
            </div>
          ))}
        </div>
      </div>
      <div
        className={styles.progress}
        role="progressbar"
        aria-label={translate({ id: 'components.countdown.progress', message: 'Year progress' })}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(state.progress * 100)}
      >
        <span className={styles.bar} style={{ transform: `scaleX(${state.progress})` }} />
      </div>
    </Card>
  );
}
