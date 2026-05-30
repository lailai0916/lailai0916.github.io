import { useEffect, useState, useRef } from 'react';
import SectionContainer from '@site/src/components/laikit/Section';
import Card from '@site/src/components/laikit/Card';
import { translate } from '@docusaurus/Translate';
import useIsBrowser from '@docusaurus/useIsBrowser';
import styles from './styles.module.css';

const TARGET = '2027-01-01T00:00:00';
const ORIGIN = '2026-01-01T00:00:00';

const TARGET_MS = new Date(TARGET).getTime();
const ORIGIN_MS = new Date(ORIGIN).getTime();
const SPAN_MS = TARGET_MS - ORIGIN_MS;

const EVENT = translate({ id: 'components.countdown.event', message: '2027' });
const FINAL = translate({
  id: 'components.countdown.final',
  message: 'Happy New Year!',
});

const DESCRIPTION = translate(
  {
    id: 'components.countdown.description',
    message: 'Time left until {event}',
  },
  { event: EVENT }
);

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

  return {
    days: Math.floor(distance / (24 * 60 * 60 * 1000)),
    hours: Math.floor((distance / (60 * 60 * 1000)) % 24),
    minutes: Math.floor((distance / (60 * 1000)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
    progress: Math.min(Math.max(elapsed / SPAN_MS, 0), 1),
    isTimeUp: distance <= 0,
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
    <SectionContainer>
      <p className={styles.caption}>{state.isTimeUp ? FINAL : DESCRIPTION}</p>
      {!state.isTimeUp && (
        <Card className={styles.panel} padding="0">
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
      )}
    </SectionContainer>
  );
}
