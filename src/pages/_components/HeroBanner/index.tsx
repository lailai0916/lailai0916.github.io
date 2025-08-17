import React, { useState, useEffect } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import { translate } from '@docusaurus/Translate';
import IconText from '@site/src/components/laikit/widget/IconText';

import styles from './styles.module.css';

const TITLE = translate({
  id: 'home.herobanner.title',
  message: "<b>Welcome</b> to lailai's <b>Home</b>!",
});

const BUTTONS = [
  {
    href: '/about',
    label: translate({ id: 'home.herobanner.b1', message: 'About' }),
    icon: 'lucide:user-circle',
  },
  {
    href: '/blog',
    label: translate({ id: 'home.herobanner.b2', message: 'Blog' }),
    icon: 'lucide:book-open',
  },
];

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
          <span
            className={styles.heroTitleTextHtml}
            dangerouslySetInnerHTML={{ __html: TITLE }}
          />
        </Heading>
        <div className={styles.indexCtas}>
          {BUTTONS.map((button) => (
            <Link to={button.href} className={styles.ctaCard}>
              <div className={styles.ctaCardContent}>
                <IconText icon={button.icon}>{button.label}</IconText>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
