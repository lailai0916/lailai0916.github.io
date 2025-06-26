import React from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import { Icon } from '@iconify/react';
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
          <Link to="about" className={styles.ctaCard}>
            <div className={styles.ctaCardContent}>
              <Icon icon="lucide:user-circle" width={24} height={24} className={styles.ctaCardIcon} />
              关于
            </div>
          </Link>
          <Link to="blog" className={styles.ctaCard}>
            <div className={styles.ctaCardContent}>
              <Icon icon="lucide:feather" width={24} height={24} className={styles.ctaCardIcon} />
              博客
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
