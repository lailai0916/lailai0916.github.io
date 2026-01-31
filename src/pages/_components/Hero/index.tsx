import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { Icon } from '@iconify/react';
import { COMMUNITY_LIST } from '@site/src/data/community';
import Card from '@site/src/components/laikit/widget/Card';
import styles from './styles.module.css';

const NAV_ITEMS = [
  {
    title: 'Contest',
    href: '/docs/contest',
    icon: 'lucide:trophy',
  },
  {
    title: 'Note',
    href: '/docs/note',
    icon: 'lucide:book-open',
  },
  {
    title: 'Project',
    href: '/docs/project',
    icon: 'lucide:folder-code',
  },
  {
    title: 'Blog',
    href: '/blog',
    icon: 'lucide:pen-line',
  },
];

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.bento}>
        <Card className={styles.cardMain} padding="1.25rem">
          <div className={styles.cardMainInner}>
            <img
              src={useBaseUrl('/img/logo.svg')}
              alt="lailai"
              className={styles.avatar}
            />
            <div className={styles.intro}>
              <h1 className={styles.name}>lailai</h1>
              <p className={styles.role}>Student & Developer</p>
            </div>
          </div>
          <p className={styles.bio}>
            Building things for the web. Interested in algorithms and crafting
            delightful experiences.
          </p>
        </Card>
        {NAV_ITEMS.map((item, index) => (
          <Link key={item.title} to={item.href} className={styles.cardNavLink}>
            <Card
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
          </Link>
        ))}
        <Card className={styles.cardSocial} padding="1.25rem">
          <span className={styles.cardSocialLabel}>Connect</span>
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
        <Card className={styles.cardTemp} padding="1.25rem">
          <></>
        </Card>
        <Card className={styles.cardStatus} padding="1.25rem">
          <span className={styles.statusDot} />
          <span className={styles.statusText}>Available</span>
        </Card>
        <Card className={styles.cardLocation} padding="1.25rem">
          <Icon icon="lucide:map-pin" className={styles.locationIcon} />
          <span className={styles.locationText}>Hangzhou, China</span>
        </Card>
      </div>
    </section>
  );
}
