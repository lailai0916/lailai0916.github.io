import { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import Card from '@site/src/components/laikit/Card';
import Translate, { translate } from '@docusaurus/Translate';
import useIsBrowser from '@docusaurus/useIsBrowser';
import styles from './styles.module.css';

const TARGET = '2026-09-16T00:00:00';

const TARGET_MS = new Date(TARGET).getTime();
// Progress starts on the same day one year before the target (year − 1,
// regardless of leap/common-year length).
const ORIGIN_DATE = new Date(TARGET);
ORIGIN_DATE.setFullYear(ORIGIN_DATE.getFullYear() - 1);
const ORIGIN_MS = ORIGIN_DATE.getTime();
const SPAN_MS = TARGET_MS - ORIGIN_MS;

const EVENT = translate({
  id: 'components.countdown.event',
  message: 'My Birthday',
});
const FINAL = translate({
  id: 'components.countdown.final',
  message: 'Happy Birthday!',
});

type CountdownUnitKey = 'days' | 'hours' | 'minutes' | 'seconds';

const TIME_UNITS: Array<{
  key: CountdownUnitKey;
  pad: number;
  label: string;
}> = [
  {
    key: 'days',
    pad: 2,
    label: translate({ id: 'components.countdown.unit.days', message: 'Days' }),
  },
  {
    key: 'hours',
    pad: 2,
    label: translate({
      id: 'components.countdown.unit.hours',
      message: 'Hours',
    }),
  },
  {
    key: 'minutes',
    pad: 2,
    label: translate({
      id: 'components.countdown.unit.minutes',
      message: 'Minutes',
    }),
  },
  {
    key: 'seconds',
    pad: 2,
    label: translate({
      id: 'components.countdown.unit.seconds',
      message: 'Seconds',
    }),
  },
];

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  progress: number;
  isTimeUp: boolean;
}

const INITIAL_STATE: CountdownState = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  progress: 0,
  isTimeUp: false,
};

function calculateTimeLeft(): CountdownState {
  const now = Date.now();
  const distance = TARGET_MS - now;
  const elapsed = now - ORIGIN_MS;
  const isTimeUp = distance <= 0;

  return {
    days: isTimeUp ? 0 : Math.floor(distance / (24 * 60 * 60 * 1000)),
    hours: isTimeUp ? 0 : Math.floor((distance / (60 * 60 * 1000)) % 24),
    minutes: isTimeUp ? 0 : Math.floor((distance / (60 * 1000)) % 60),
    seconds: isTimeUp ? 0 : Math.floor((distance / 1000) % 60),
    progress: isTimeUp ? 1 : Math.min(Math.max(elapsed / SPAN_MS, 0), 1),
    isTimeUp,
  };
}

export default function Countdown() {
  const isBrowser = useIsBrowser();
  const [state, setState] = useState<CountdownState>(INITIAL_STATE);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isBrowser) {
      return undefined;
    }

    let cancelled = false;

    const tick = () => {
      if (cancelled) {
        return;
      }

      const result = calculateTimeLeft();
      setState(result);

      if (result.isTimeUp) {
        timerRef.current = null;
        return;
      }

      const now = Date.now();
      const nextSecond = Math.ceil(now / 1000) * 1000;
      const delay = nextSecond - now;

      timerRef.current = setTimeout(tick, delay);
    };

    tick();

    return () => {
      cancelled = true;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isBrowser]);

  return (
    <Card className={styles.panel} padding="0">
      <div className={styles.body}>
        <p
          className={clsx(
            styles.caption,
            state.isTimeUp && styles.captionFinal
          )}
        >
          {state.isTimeUp ? (
            FINAL
          ) : (
            <Translate
              id="components.countdown.description"
              values={{
                event: <span className={styles.year}>{EVENT}</span>,
              }}
            >
              {'Time left until {event}'}
            </Translate>
          )}
        </p>
        <div className={styles.clock}>
          {TIME_UNITS.map(({ key, pad, label }) => (
            <div className={styles.unit} key={key}>
              <span className={styles.value}>
                {String(state[key]).padStart(pad, '0')}
              </span>
              <span className={styles.label}>{label}</span>
            </div>
          ))}
        </div>
      </div>
      <div
        className={styles.progress}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(state.progress * 100)}
      >
        <span
          className={styles.bar}
          style={{ transform: `scaleX(${state.progress})` }}
        />
      </div>
    </Card>
  );
}
