import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import { Icon } from '@iconify/react';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.css';

export default function HeroBanner() {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    setHasAnimated(true);
  }, []);

  return (
    <div className={styles.hero}>
      <div className={styles.heroInner}>
        <Heading as="h1" className={styles.heroProjectTagline}>
          <img
            alt="lailai's Logo"
            className={`${styles.heroLogo} ${hasAnimated ? styles.heroLogoAnimated : ''}`}
            src="/img/logo.svg"
            width="200"
            height="200"
          />
          <span className={styles.heroTitleTextHtml}>
            <b>Welcome</b> to lailai's <b>Home</b>!
          </span>
        </Heading>
        <div className={styles.indexCtas}>
          <Link to="/about" className={styles.ctaCard}>
            <div className={styles.ctaCardContent}>
              <Icon
                icon="lucide:user-circle"
                width={24}
                height={24}
                className={styles.ctaCardIcon}
              />
              <Translate id="home.herobanner.about">About</Translate>
            </div>
          </Link>
          <Link to="/blog" className={styles.ctaCard}>
            <div className={styles.ctaCardContent}>
              <Icon
                icon="lucide:book-open"
                width={24}
                height={24}
                className={styles.ctaCardIcon}
              />
              <Translate id="home.herobanner.blog">Blog</Translate>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
