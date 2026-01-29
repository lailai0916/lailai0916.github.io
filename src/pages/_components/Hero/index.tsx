import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { Icon } from '@iconify/react';
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

const SOCIALS = [
  {
    icon: 'simple-icons:github',
    href: 'https://github.com/lailai0916',
    label: 'GitHub',
  },
  { icon: 'simple-icons:x', href: 'https://x.com/lailai0x394', label: 'X' },
  {
    icon: 'simple-icons:linkedin',
    href: 'https://www.linkedin.com/in/lailai0916',
    label: 'LinkedIn',
  },
  { icon: 'lucide:mail', href: 'mailto:lailai0x394@gmail.com', label: 'Email' },
];

export default function Hero() {
  const logoUrl = useBaseUrl('/img/logo.svg');

  return (
    <section className={styles.hero}>
      <div className={styles.bento}>
        {/* Main intro card */}
        <div className={`${styles.card} ${styles.cardMain}`}>
          <div className={styles.cardMainInner}>
            <img src={logoUrl} alt="lailai" className={styles.avatar} />
            <div className={styles.intro}>
              <h1 className={styles.name}>lailai</h1>
              <p className={styles.role}>Student & Developer</p>
            </div>
          </div>
          <p className={styles.bio}>
            Building things for the web. Interested in algorithms and crafting
            delightful experiences.
          </p>
        </div>

        {/* Navigation cards */}
        {NAV_ITEMS.map((item, index) => (
          <Link
            key={item.title}
            to={item.href}
            className={`${styles.card} ${styles.cardNav} ${styles[`cardNav${index + 1}`]}`}
          >
            <Icon icon={item.icon} className={styles.cardNavIcon} />
            <span className={styles.cardNavTitle}>{item.title}</span>
            <Icon
              icon="lucide:arrow-up-right"
              className={styles.cardNavArrow}
            />
          </Link>
        ))}

        {/* Social card */}
        <div className={`${styles.card} ${styles.cardSocial}`}>
          <span className={styles.cardSocialLabel}>Connect</span>
          <div className={styles.socialLinks}>
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={social.label}
              >
                <Icon icon={social.icon} width={20} height={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Location card */}
        <div className={`${styles.card} ${styles.cardLocation}`}>
          <Icon icon="lucide:map-pin" className={styles.locationIcon} />
          <span className={styles.locationText}>Hangzhou, China</span>
        </div>

        {/* Status card */}
        <div className={`${styles.card} ${styles.cardStatus}`}>
          <span className={styles.statusDot} />
          <span className={styles.statusText}>Open to opportunities</span>
        </div>
      </div>
    </section>
  );
}
