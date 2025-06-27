import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function TopBanner() {
  return (
    <div className={styles.topBanner}>
      <div className={styles.topBannerTitle}>
        {'🎉\xa0'}
        <Link className={styles.topBannerTitleText} to="about">
          {'Hello,\xa0I\'m\xa0lailai'}
        </Link>
        {'\xa0🥳'}
      </div>
    </div>
  );
}
