import { useEffect, useRef, useState, type ReactNode } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import clsx from 'clsx';
import Icon from '@lailai0916/ui/Icon';
import { getTimes } from 'suncalc';
import { COMMUNITY_LIST } from '@site/src/data/community';
import {
  formatLocalTime,
  getDateKey,
  parseInstant,
  SHANGHAI_TIME_ZONE,
} from '@site/src/utils/dateTime';
import Badge from '@lailai0916/ui/Badge';
import Card from '@lailai0916/ui/Card';
import SpringAvatar from './_components/SpringAvatar';
import styles from './styles.module.css';

function useTypewriter(words: string[]) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const currentWord = words[index % words.length];

  useEffect(() => {
    // Reduced-motion users get the role fully typed, no cycling animation.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (text !== currentWord) setText(currentWord);
      return;
    }

    let timer: ReturnType<typeof setTimeout>;

    if (!deleting && text.length < currentWord.length) {
      timer = setTimeout(() => {
        setText(currentWord.slice(0, text.length + 1));
      }, 140);
    } else if (!deleting && text.length === currentWord.length) {
      timer = setTimeout(() => {
        setDeleting(true);
      }, 1200);
    } else if (deleting && text.length > 0) {
      timer = setTimeout(() => {
        setText(currentWord.slice(0, text.length - 1));
      }, 80);
    } else {
      timer = setTimeout(() => {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      }, 300);
    }

    return () => clearTimeout(timer);
  }, [deleting, text, words, currentWord]);

  return { text, currentWord };
}

// Resolve on the client so build-time clock values cannot cause a hydration mismatch.
function useLocalTime() {
  const [state, setState] = useState({ time: '--:--', icon: 'lucide:clock' });
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let solarDay: {
      dateKey: string;
      transitions: { time: number; icon: string }[];
    };

    const update = () => {
      clearTimeout(timer);
      if (document.hidden) return;

      const now = new Date();
      const timestamp = now.getTime();
      const dateKey = getDateKey(now, SHANGHAI_TIME_ZONE);
      if (solarDay?.dateKey !== dateKey) {
        // Hangzhou noon anchors the calculation to the correct day, including before sunrise.
        const { dawn, sunrise, sunset, dusk } = getTimes(
          parseInstant(`${dateKey}T12:00:00+08:00`),
          30.2741,
          120.1551
        );
        solarDay = {
          dateKey,
          transitions: [
            { time: dawn, icon: 'lucide:sunrise' },
            { time: sunrise, icon: 'lucide:sun' },
            { time: sunset, icon: 'lucide:sunset' },
            { time: dusk, icon: 'lucide:moon' },
          ].flatMap(({ time, icon }) => (time ? [{ time: time.getTime(), icon }] : [])),
        };
      }

      let icon = 'lucide:moon';
      let nextUpdate = timestamp + (60000 - (timestamp % 60000));
      for (const transition of solarDay.transitions) {
        if (transition.time > timestamp) {
          nextUpdate = Math.min(nextUpdate, transition.time);
          break;
        }
        icon = transition.icon;
      }

      const time = formatLocalTime(now, 'en-GB', SHANGHAI_TIME_ZONE);
      setState((previous) =>
        previous.time === time && previous.icon === icon ? previous : { time, icon }
      );
      timer = setTimeout(update, Math.max(1, nextUpdate - Date.now()));
    };

    update();
    document.addEventListener('visibilitychange', update);
    window.addEventListener('pageshow', update);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('visibilitychange', update);
      window.removeEventListener('pageshow', update);
    };
  }, []);
  return state;
}

function useMascotMotion(visible: boolean) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const retargetRef = useRef<((target: number) => void) | null>(null);

  useEffect(() => {
    const button = buttonRef.current!;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const frequency = 18;
    let position = 1;
    let velocity = 0;
    let target = 1;
    let frame = 0;
    let previous = 0;

    const paint = () => {
      button.style.transform = `translateY(${position * 104}%) rotate(${-position * 5}deg) scale(${1 - position * 0.04})`;
    };
    const settle = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      position = target;
      velocity = 0;
      paint();
    };
    const advance = (now: number) => {
      const dt = (now - previous) / 1000;
      previous = now;
      const offset = position - target;
      const momentum = velocity + frequency * offset;
      const decay = Math.exp(-frequency * dt);
      // The exact spring step preserves velocity when a click reverses its target.
      position = target + (offset + momentum * dt) * decay;
      velocity = (velocity - frequency * momentum * dt) * decay;
    };
    const tick = () => {
      frame = 0;
      advance(performance.now());
      if (Math.abs(position - target) < 0.0005 && Math.abs(velocity) < 0.005) {
        settle();
      } else {
        paint();
        frame = requestAnimationFrame(tick);
      }
    };
    const update = () => {
      if (motion.matches || document.hidden) {
        settle();
      } else if (!frame && (position !== target || velocity !== 0)) {
        previous = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };

    retargetRef.current = (next) => {
      if (frame) advance(performance.now());
      target = next;
      update();
    };
    paint();
    motion.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    return () => {
      retargetRef.current = null;
      cancelAnimationFrame(frame);
      motion.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  useEffect(() => {
    retargetRef.current?.(visible ? 0 : 1);
  }, [visible]);

  return buttonRef;
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const mascotSrc = useBaseUrl('/img/mascot.webp');
  const [mascotVisible, setMascotVisible] = useState(false);
  const mascotButtonRef = useMascotMotion(mascotVisible);
  const mascotTriggerRef = useRef<HTMLElement | null>(null);

  function toggleMascot() {
    mascotTriggerRef.current = document.activeElement as HTMLElement | null;
    setMascotVisible((visible) => !visible);
  }

  useEffect(() => {
    const reset = (event: PageTransitionEvent) => {
      if (event.persisted) setMascotVisible(false);
    };
    window.addEventListener('pageshow', reset);
    return () => window.removeEventListener('pageshow', reset);
  }, []);

  const navItems = [
    {
      title: translate({
        id: 'pages.home.nav.contest',
        message: 'Contest',
      }),
      href: '/docs/contest',
      icon: 'lucide:trophy',
    },
    {
      title: translate({
        id: 'pages.home.nav.note',
        message: 'Note',
      }),
      href: '/docs/note',
      icon: 'lucide:book-open',
    },
    {
      title: translate({
        id: 'pages.home.nav.project',
        message: 'Project',
      }),
      href: '/docs/project',
      icon: 'lucide:folder-code',
    },
    {
      title: translate({
        id: 'pages.home.nav.blog',
        message: 'Blog',
      }),
      href: '/blog',
      icon: 'lucide:pen-line',
    },
  ];
  const profileTags = [
    {
      label: translate({
        id: 'pages.home.tag.china',
        message: 'China',
      }),
      icon: 'lucide:flag',
    },
    {
      label: translate({
        id: 'pages.home.tag.school',
        message: 'Hangzhou No.2 High School',
      }),
      icon: 'lucide:graduation-cap',
    },
    {
      label: translate({
        id: 'pages.home.tag.languages',
        message: 'Chinese & English',
      }),
      icon: 'lucide:languages',
    },
    {
      label: translate({
        id: 'pages.home.tag.pronouns',
        message: 'He/Him',
      }),
      icon: 'lucide:user-round',
    },
    {
      label: translate({
        id: 'pages.home.tag.mbti',
        message: 'INTJ',
      }),
      icon: 'lucide:cpu',
    },
  ];
  const identities = [
    translate({
      id: 'pages.home.identity.student',
      message: 'Student',
    }),
    translate({
      id: 'pages.home.identity.developer',
      message: 'Developer',
    }),
    translate({
      id: 'pages.home.identity.researcher',
      message: 'Researcher',
    }),
    translate({
      id: 'pages.home.identity.designer',
      message: 'Designer',
    }),
    translate({
      id: 'pages.home.identity.oier',
      message: 'OIer',
    }),
  ];
  const { text: identity, currentWord } = useTypewriter(identities);
  const roleArticle = /^[aeiou]/i.test(currentWord) ? 'an' : 'a';
  const rolePrefix = translate(
    {
      id: 'pages.home.rolePrefix',
      message: "I'm {article} ",
    },
    { article: roleArticle }
  );
  const { time: localTime, icon: timeIcon } = useLocalTime();
  const infoItems = [
    {
      key: 'time',
      value: `${localTime} (UTC+08:00)`,
      icon: timeIcon,
    },
    {
      key: 'orcid',
      value: '0009-0008-9790-9881',
      icon: 'simple-icons:orcid',
      href: 'https://orcid.org/0009-0008-9790-9881',
    },
    {
      key: 'fingerprint',
      value: '91A7 EF5A 1391 223E',
      icon: 'lucide:key-round',
      href: 'https://github.com/lailai0916.gpg',
    },
  ];

  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}
      wrapperClassName={styles.home}
      noFooter
    >
      <section className={styles.hero}>
        <div className={styles.bento}>
          <Card className={styles.cardMain}>
            <div className={styles.cardMainInner}>
              <SpringAvatar onToggleMascot={toggleMascot} />
              <div className={styles.intro}>
                <h1 className={styles.name}>lailai</h1>
                <p className={styles.role}>
                  {rolePrefix}
                  <span className={styles.roleTyping}>{identity}</span>
                  <span className={styles.roleCursor} aria-hidden="true" />
                </p>
              </div>
            </div>
            <div className={styles.profileTags}>
              {profileTags.map((tag) => (
                <Badge key={tag.label} icon={tag.icon}>
                  {tag.label}
                </Badge>
              ))}
            </div>
          </Card>
          {navItems.map((item, index) => (
            <Card
              key={item.href}
              to={item.href}
              className={clsx(styles.cardNav, styles[`cardNav${index + 1}`])}
              padding="1.25rem"
            >
              <Icon icon={item.icon} className={styles.cardNavIcon} />
              <span className={styles.cardNavTitle}>{item.title}</span>
              <Icon icon="lucide:arrow-up-right" className={styles.cardNavArrow} />
            </Card>
          ))}
          <div className={styles.details}>
            <Card>
              <ul className={styles.infoList}>
                {infoItems.map((item) => (
                  <li key={item.key} className={styles.infoRow}>
                    <Icon icon={item.icon} className={styles.infoRowIcon} />
                    {item.href ? (
                      <Link href={item.href} className={styles.infoRowValue}>
                        {item.value}
                      </Link>
                    ) : (
                      <span className={styles.infoRowValue}>{item.value}</span>
                    )}
                  </li>
                ))}
              </ul>
            </Card>
            <Card className={styles.cardSocial}>
              <span className={styles.cardSocialLabel}>
                {translate({
                  id: 'pages.home.connect',
                  message: 'Connect',
                })}
              </span>
              <div className={styles.socialLinks}>
                {COMMUNITY_LIST.map((social) => (
                  <Link
                    key={social.title}
                    href={social.href}
                    className={styles.socialLink}
                    aria-label={social.title}
                  >
                    <Icon icon={social.icon} width={20} height={20} />
                  </Link>
                ))}
              </div>
            </Card>
          </div>
        </div>
        <div
          className={styles.mascot}
          data-visible={mascotVisible || undefined}
          aria-hidden={!mascotVisible}
        >
          <button
            ref={mascotButtonRef}
            type="button"
            className={styles.mascotButton}
            disabled={!mascotVisible}
            aria-label={translate({
              id: 'pages.home.mascot.hide',
              message: 'Hide mascot',
            })}
            onClick={(event) => {
              setMascotVisible(false);
              if (event.detail === 0 && mascotTriggerRef.current?.isConnected) {
                mascotTriggerRef.current.focus({ preventScroll: true });
              }
            }}
          >
            <img src={mascotSrc} width={336} height={336} alt="" draggable={false} />
          </button>
        </div>
      </section>
    </Layout>
  );
}
