import { Fragment, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Translate, { translate } from '@docusaurus/Translate';
import Card from '@site/src/components/laikit/Card';
import { fireConfetti } from '@site/src/utils/confetti';
import styles from './styles.module.css';

// The birthday recurs yearly: the countdown always targets the next occurrence
// (pinned to Beijing time like every date on the site), celebrates on the day
// itself, and rolls over at the following midnight — no yearly manual edit.
const BIRTHDAY_MONTH = 9;
const BIRTHDAY_DAY = 16;
const BEIJING_OFFSET_MS = 8 * 60 * 60 * 1000;

// One track segment ≈ one twelfth of the birthday-to-birthday year.
const TRACK_SEGMENTS = 12;

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

// One digit slot: on change the old numeral rolls out below while the new one
// drops in from above, so only the slots that actually change ever move.
function RollingDigit({ digit }: { digit: string }) {
  const prevRef = useRef(digit);
  const prev = prevRef.current;
  useEffect(() => {
    prevRef.current = digit;
  });
  return (
    <span className={styles.digit} aria-hidden="true">
      {prev !== digit && (
        <span key={`out-${prev}`} className={styles.digitOut}>
          {prev}
        </span>
      )}
      <span key={`in-${digit}`} className={styles.digitIn}>
        {digit}
      </span>
    </span>
  );
}

// Keyed from the right so the ones/tens slots stay put when the day count
// gains or loses a digit.
function RollingNumber({ value }: { value: string }) {
  return (
    <>
      {[...value].map((digit, i) => (
        <RollingDigit key={value.length - i} digit={digit} />
      ))}
    </>
  );
}

export default function Countdown() {
  const [state, setState] = useState<CountdownState>(INITIAL_STATE);
  const celebrated = useRef(false);

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

  useEffect(() => {
    if (!state.isBirthday || celebrated.current) return;
    celebrated.current = true;
    fireConfetti();
  }, [state.isBirthday]);

  const percent = Math.round(state.progress * 100);

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
          {TIME_UNITS.map(({ key, label }, i) => {
            // Days get a fixed three-digit register (they are three digits for
            // most of the year); the cyclic units keep the clock-style two.
            const display = String(state[key]).padStart(key === 'days' ? 3 : 2, '0');
            return (
              <Fragment key={key}>
                {i > 0 && (
                  <span className={styles.colon} aria-hidden="true">
                    :
                  </span>
                )}
                <div className={styles.unit}>
                  <span className={styles.value}>
                    <RollingNumber value={display} />
                    <span className={styles.srOnly}>{String(state[key])}</span>
                  </span>
                  <span className={styles.label}>{label}</span>
                </div>
              </Fragment>
            );
          })}
        </div>
        <div
          className={styles.track}
          role="progressbar"
          aria-label={translate({ id: 'components.countdown.progress', message: 'Year progress' })}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          title={`${percent}%`}
        >
          {Array.from({ length: TRACK_SEGMENTS }, (_, i) => (
            <span key={i} className={styles.segment}>
              <span
                className={styles.segmentFill}
                style={{
                  transform: `scaleX(${Math.min(Math.max(state.progress * TRACK_SEGMENTS - i, 0), 1)})`,
                }}
              />
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}
