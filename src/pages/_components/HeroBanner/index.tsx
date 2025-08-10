import React, { useState, useEffect } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import Translate from '@docusaurus/Translate';
import IconText from '@site/src/components/laikit/widget/IconText';
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
            src={useBaseUrl('/img/logo.svg')}
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
              <IconText icon="lucide:user-circle">
                <Translate id="home.herobanner.b1">About</Translate>
              </IconText>
            </div>
          </Link>
          <Link to="/map" className={styles.ctaCard}>
            <div className={styles.ctaCardContent}>
              <IconText icon="lucide:list">
                <Translate id="home.herobanner.b2">Map</Translate>
              </IconText>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
