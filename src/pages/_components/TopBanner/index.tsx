import React from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.css';

export default function TopBanner() {
  return (
    <div className={styles.topBanner}>
      <div className={styles.topBannerTitle}>
        {'🎉\xa0'}
        <Link to="/about" className={styles.topBannerTitleText}>
          <Translate id="home.topbanner.title">
            {"Hello,\xa0I'm\xa0lailai"}
          </Translate>
        </Link>
        {'\xa0🥳'}
      </div>
    </div>
  );
}
