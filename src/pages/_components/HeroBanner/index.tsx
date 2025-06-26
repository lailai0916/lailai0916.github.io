import React from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

export default function HeroBanner() {
  return (
    <div className={styles.hero}>
      <div className={styles.heroInner}>
        <Heading as="h1" className={styles.heroProjectTagline}>
          <img
            alt="lailai's Logo"
            className={styles.heroLogo}
            src="/img/logo.svg"
            width="200"
            height="200"
          />
          <span
            className={styles.heroTitleTextHtml}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: '<b>Welcome</b> to lailai\'s <b>Home</b>!',
            }}
          />
        </Heading>
        <div className={styles.indexCtas}>
          <Link to="blog" className={styles.ctaCard}>
            <div className={styles.ctaCardContent}>
              博客
            </div>
          </Link>
          <Link to="about" className={styles.ctaCard}>
            <div className={styles.ctaCardContent}>
              关于
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
