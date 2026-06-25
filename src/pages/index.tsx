import { useEffect, useState, type ReactNode } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { Icon } from '@iconify/react';
import { COMMUNITY_LIST } from '@site/src/data/community';
import Badge from '@site/src/components/laikit/Badge';
import Card from '@site/src/components/laikit/Card';
import styles from './styles.module.css';

function useTypewriter(words: string[]) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const currentWord = words[index % words.length];

  useEffect(() => {
    const current = words[index % words.length];
    let timer: ReturnType<typeof setTimeout>;

    if (!deleting && text.length < current.length) {
      timer = setTimeout(() => {
        setText(current.slice(0, text.length + 1));
      }, 140);
    } else if (!deleting && text.length === current.length) {
      timer = setTimeout(() => {
        setDeleting(true);
      }, 1200);
    } else if (deleting && text.length > 0) {
      timer = setTimeout(() => {
        setText(current.slice(0, text.length - 1));
      }, 80);
    } else {
      timer = setTimeout(() => {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      }, 300);
    }

    return () => clearTimeout(timer);
  }, [deleting, index, text, words]);

  return { text, currentWord };
}

// Resolve the clock on the client only; rendering `new Date()` during SSR
// produces a build-time string that never matches the visitor's local time.
function useLocalTime() {
  const [time, setTime] = useState('--:--');
  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Shanghai',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(new Date())
      );
    update();
    const timer = setInterval(update, 60000);
    return () => clearInterval(timer);
  }, []);
  return time;
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

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
      icon: 'lucide:map-pin',
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
  const localTime = useLocalTime();
  const infoItems = [
    {
      key: 'location',
      value: translate({
        id: 'pages.home.location',
        message: 'Hangzhou, China',
      }),
      icon: 'lucide:map-pin',
      href: 'https://maps.app.goo.gl/pjqPSMzrVqRcEM6J8',
    },
    {
      key: 'time',
      value: `${localTime} (UTC+08:00)`,
      icon: 'lucide:clock',
      href: 'https://time.is/UTC+8',
    },
    {
      key: 'fingerprint',
      value: '91A7 EF5A 1391 223E',
      icon: 'lucide:key-round',
      href: 'https://github.com/lailai0916.gpg',
    },
  ];

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline} noFooter>
      <section className={styles.hero}>
        <div className={styles.bento}>
          <Link to="/about" className={styles.cardMainLink}>
            <Card className={styles.cardMain} padding="1.75rem">
              <Icon
                icon="lucide:arrow-up-right"
                className={styles.cardMainArrow}
              />
              <div className={styles.cardMainInner}>
                <img
                  src={useBaseUrl('/img/logo.svg')}
                  alt="lailai"
                  className={styles.avatar}
                />
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
          </Link>
          {navItems.map((item, index) => (
            <Card
              key={item.href}
              to={item.href}
              className={clsx(styles.cardNav, styles[`cardNav${index + 1}`])}
              padding="1.25rem"
            >
              <Icon icon={item.icon} className={styles.cardNavIcon} />
              <span className={styles.cardNavTitle}>{item.title}</span>
              <Icon
                icon="lucide:arrow-up-right"
                className={styles.cardNavArrow}
              />
            </Card>
          ))}
          <Card className={styles.cardInfo} padding="1.25rem">
            <ul className={styles.infoList}>
              {infoItems.map((item) => (
                <li key={item.key} className={styles.infoRow}>
                  <Icon icon={item.icon} className={styles.infoRowIcon} />
                  <Link href={item.href} className={styles.infoRowValue}>
                    {item.value}
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
          <Card className={styles.cardSocial} padding="1.25rem">
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
      </section>
    </Layout>
  );
}
