import { Fragment, useState, useEffect, useRef, type CSSProperties } from 'react';
import clsx from 'clsx';

import BrowserOnly from '@docusaurus/BrowserOnly';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import Giscus from '@giscus/react';
import Icon from '@lailai0916/ui/Icon';
import Card from '@lailai0916/ui/Card';
import { useColorMode, usePluralForm } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';

import { DEVICE_LIST } from '@site/src/data/devices';
import { COMMUNITY_LIST } from '@site/src/data/community';
import { useImageStatus } from '@lailai0916/ui';
import { fireConfetti } from '@site/src/utils/confetti';
import { parseInstant } from '@site/src/utils/dateTime';
import styles from './styles.module.css';

const SKILLS_ARIA_LABEL = translate({
  id: 'pages.about.skills.ariaLabel',
  message: 'Tech stack icons',
});

export function AboutTitle() {
  return (
    <section className={styles.title}>
      <Heading as="h1">
        {'🎉\xa0'}
        <span className={styles.titleText}>
          <Translate id="pages.about.greeting">{"Hello,\xa0I'm\xa0lailai"}</Translate>
        </span>
        {'\xa0🥳'}
      </Heading>
    </section>
  );
}

// The birthday follows the owner's Asia/Shanghai calendar, so every visitor
// enters and leaves the celebration at the same instant.
const BIRTHDAY_YEAR = 2009;
const BIRTHDAY_MONTH = 9;
const BIRTHDAY_DAY = 16;
const BIRTHDAY_DATE = [BIRTHDAY_MONTH, BIRTHDAY_DAY].map((part) => String(part).padStart(2, '0'));
const BEIJING_OFFSET_MS = 8 * 60 * 60 * 1000;

const FINAL = translate({
  id: 'pages.about.countdown.final',
  message: 'Happy Birthday!',
});

type CountdownUnitKey = 'days' | 'hours' | 'minutes' | 'seconds';

const TIME_UNITS: Array<{ key: CountdownUnitKey; label: string }> = [
  {
    key: 'days',
    label: translate({ id: 'pages.about.countdown.unit.days', message: 'day|days' }),
  },
  {
    key: 'hours',
    label: translate({ id: 'pages.about.countdown.unit.hours', message: 'hour|hours' }),
  },
  {
    key: 'minutes',
    label: translate({ id: 'pages.about.countdown.unit.minutes', message: 'minute|minutes' }),
  },
  {
    key: 'seconds',
    label: translate({ id: 'pages.about.countdown.unit.seconds', message: 'second|seconds' }),
  },
];

interface CountdownState {
  age: number | null;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isBirthday: boolean;
}

const INITIAL_STATE: CountdownState = {
  age: null,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  isBirthday: false,
};

function birthdayMs(year: number): number {
  return parseInstant(`${year}-${BIRTHDAY_DATE.join('-')}T00:00:00+08:00`).getTime();
}

function calculateState(now: number): CountdownState {
  // Shifting by the offset lets the UTC getters read Beijing wall-clock parts.
  const beijing = new Date(now + BEIJING_OFFSET_MS);
  const year = beijing.getUTCFullYear();
  if (beijing.getUTCMonth() + 1 === BIRTHDAY_MONTH && beijing.getUTCDate() === BIRTHDAY_DAY) {
    return { ...INITIAL_STATE, age: year - BIRTHDAY_YEAR, isBirthday: true };
  }
  const targetYear = now < birthdayMs(year) ? year : year + 1;
  const target = birthdayMs(targetYear);
  const distance = target - now;
  return {
    age: targetYear - BIRTHDAY_YEAR,
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor(distance / 3_600_000) % 24,
    minutes: Math.floor(distance / 60_000) % 60,
    seconds: Math.floor(distance / 1000) % 60,
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
    <span className={styles.countdownDigit} aria-hidden="true">
      {prev !== digit && (
        <span key={`out-${prev}`} className={styles.countdownDigitOut}>
          {prev}
        </span>
      )}
      <span key={`in-${digit}`} className={styles.countdownDigitIn}>
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

// The birthday greeting: FINAL rendered one candy glyph at a time — fill and tilt cycle
// every six via :nth-child, letters stagger in on --i, and the whole word is announced
// once through the wrapper's aria-label. Candy-lettering look inspired by
// https://x.com/Pusheen/status/1821577239168692577
function Greeting({ exiting, onExited }: { exiting: boolean; onExited: () => void }) {
  return (
    <div className={styles.countdownCard} role="img" aria-label={FINAL}>
      <p className={styles.countdownWordmark} aria-hidden="true">
        {[...FINAL].map((char, i) =>
          char === ' ' ? (
            ' '
          ) : (
            <span
              key={i}
              className={clsx(styles.countdownLetter, exiting && styles.countdownLetterExiting)}
              style={{ '--i': i } as CSSProperties}
              onAnimationEnd={exiting && i === FINAL.length - 1 ? onExited : undefined}
            >
              {char}
            </span>
          )
        )}
      </p>
    </div>
  );
}

export function Countdown() {
  const { selectMessage } = usePluralForm();
  const [state, setState] = useState<CountdownState>(INITIAL_STATE);
  const [greetingPresent, setGreetingPresent] = useState(false);
  const celebrated = useRef(false);
  const birthdayVisible = state.isBirthday || greetingPresent;

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
    if (state.isBirthday) setGreetingPresent(true);
  }, [state.isBirthday]);

  useEffect(() => {
    if (!state.isBirthday || celebrated.current) return;
    celebrated.current = true;
    fireConfetti();
  }, [state.isBirthday]);

  function finishBirthdayExit() {
    if (!state.isBirthday) setGreetingPresent(false);
  }

  return (
    <div className={styles.countdownPanel}>
      <div className={styles.countdownBody}>
        <div
          className={clsx(styles.countdownText, birthdayVisible && styles.countdownHidden)}
          role="timer"
          aria-hidden={birthdayVisible || undefined}
        >
          <Translate
            id="pages.about.countdown.description"
            values={{
              birthday: (
                <strong>
                  <Translate
                    id="pages.about.countdown.birthday"
                    values={{
                      age: <span className={styles.countdownAge}>{state.age ?? '…'}</span>,
                    }}
                  >
                    {'I turn {age}'}
                  </Translate>
                </strong>
              ),
            }}
          >
            {'Until {birthday}'}
          </Translate>{' '}
          {TIME_UNITS.map(({ key, label }, index) => (
            <Fragment key={key}>
              <span className={styles.countdownUnit}>
                <span className={styles.countdownNumber}>
                  <RollingNumber value={String(state[key]).padStart(key === 'days' ? 3 : 2, '0')} />
                  <span className={styles.countdownSrOnly}>{state[key]}</span>
                </span>{' '}
                {selectMessage(state[key], label)}
              </span>
              {index < TIME_UNITS.length - 1 && ' '}
            </Fragment>
          ))}
          <Translate id="pages.about.countdown.sentenceEnd">{'.'}</Translate>
        </div>
        {birthdayVisible && <Greeting exiting={!state.isBirthday} onExited={finishBirthdayExit} />}
      </div>
    </div>
  );
}

export function Skills() {
  const [perline, setPerline] = useState(12);

  useEffect(() => {
    const handleResize = () => {
      const breakpoints = [
        [668, 12],
        [448, 9],
        [336, 6],
        [224, 4],
        [168, 3],
        [112, 2],
      ];
      setPerline(breakpoints.find(([minWidth]) => window.innerWidth >= minWidth)?.[1] || 1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const skills =
    'cpp,c,python,java,javascript,typescript,html,css,nodejs,react,nextjs,tailwindcss,vite,mysql,markdown,latex,mermaid,git,github,playwright,linux,bash,docker,nginx,cloudflare,vercel,tor,macos,apple,cursor,chatgpt,claude,mcp,figma,photoshop,blender';
  const skillsUrl = `https://go-skill-icons.vercel.app/api/icons?i=${skills}&perline=${perline}`;
  const { imgRef, status, onLoad, onError } = useImageStatus(skillsUrl);

  return (
    <div className={styles.skillsFrame}>
      {status === 'error' ? (
        <div
          className={clsx(styles.skillsImage, styles.imageFallback)}
          role="img"
          aria-label={SKILLS_ARIA_LABEL}
        >
          <Icon icon="lucide:blocks" aria-hidden="true" />
        </div>
      ) : (
        <img
          ref={imgRef}
          src={skillsUrl}
          alt={SKILLS_ARIA_LABEL}
          width={666}
          height={160}
          loading="lazy"
          decoding="async"
          className={styles.skillsImage}
          onLoad={onLoad}
          onError={onError}
        />
      )}
    </div>
  );
}

function DeviceImage({ src, alt }: { src: string; alt: string }) {
  const { imgRef, status, onLoad, onError } = useImageStatus(src);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    const setAr = () => {
      if (img.naturalWidth) {
        img.style.setProperty('--ar', String(img.naturalWidth / img.naturalHeight));
      }
    };
    if (img.complete) {
      setAr();
      return;
    }
    img.addEventListener('load', setAr);
    return () => img.removeEventListener('load', setAr);
  }, [imgRef]);

  if (status === 'error') {
    return (
      <Icon icon="lucide:image-off" className={styles.deviceImageFallback} aria-hidden="true" />
    );
  }

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={styles.deviceImage}
      loading="lazy"
      decoding="async"
      onLoad={onLoad}
      onError={onError}
    />
  );
}

export function Devices() {
  return (
    <div className={styles.deviceGrid}>
      {DEVICE_LIST.map((item) => (
        <Card key={item.title} padding="0" className={styles.deviceCard}>
          <div className={styles.deviceCardBody}>
            <div className={styles.deviceName}>{item.title}</div>
            <div className={styles.deviceSpec}>{item.spec}</div>
          </div>
          <DeviceImage src={item.image} alt={item.title} />
        </Card>
      ))}
    </div>
  );
}

function CommunityDetails({ item }: { item: (typeof COMMUNITY_LIST)[number] }) {
  return (
    <>
      <span className={styles.communityIcon} aria-hidden="true">
        <Icon icon={item.icon} />
      </span>
      <span className={styles.communityCardBody}>
        <span className={styles.communityName}>{item.title}</span>
        <span className={styles.communitySpec}>{item.text}</span>
      </span>
      <span className={styles.communityArrow} aria-hidden="true">
        <Icon icon="lucide:arrow-up-right" />
      </span>
    </>
  );
}

export function Community() {
  return (
    <Card padding="0" className={styles.community}>
      <ul className={styles.communityGrid} role="list">
        {COMMUNITY_LIST.map((item) => (
          <li key={item.title} className={styles.communityItem}>
            <Link href={item.href} className={styles.communityLink}>
              <CommunityDetails item={item} />
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export function Comments() {
  const { colorMode } = useColorMode();
  const { i18n } = useDocusaurusContext();

  return (
    <BrowserOnly>
      {() => (
        <Giscus
          repo="lailai0916/giscus"
          repoId="R_kgDONHUoXA"
          category="Announcements"
          categoryId="DIC_kwDONHUoXM4Cjx_9"
          mapping="specific"
          term="about"
          inputPosition="top"
          theme={colorMode}
          lang={i18n.currentLocale}
          loading="lazy"
        />
      )}
    </BrowserOnly>
  );
}
