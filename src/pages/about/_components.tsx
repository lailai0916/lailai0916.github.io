import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import { useColorMode } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import Giscus from '@giscus/react';
import { Icon } from '@iconify/react';

import { COMMUNITY_LIST } from '@site/src/data/community';
import { DEVICE_LIST } from '@site/src/data/device';
import styles from './styles.module.css';

export const Title = () => (
  <section className="margin-top--lg margin-bottom--lg text--center">
    <Heading as="h1">
      {'🎉\xa0'}
      <span className={styles.titleText}>
        <Link to="/">Hello, I'm lailai</Link>
      </span>
      {'\xa0🥳'}
    </Heading>
  </section>
);

export const Device = () => (
  <div className={styles.listContainer}>
    {DEVICE_LIST.map((device) => (
      <div key={device.name} className={styles.listItem}>
        <img src={device.icon} alt={device.name} className={styles.deviceIcon} />
        <span>{device.name}</span>
      </div>
    ))}
  </div>
);

export const Community = () => (
  <div className={styles.listContainer}>
    {COMMUNITY_LIST.map((link) => (
      <div key={link.text} className={styles.listItem}>
        <Icon icon={link.icon} width="1.25rem" height="1.25rem" />
        <Link to={link.href}>{link.text}</Link>
      </div>
    ))}
  </div>
);

export const Comment = () => {
  const { colorMode } = useColorMode();
  const { i18n } = useDocusaurusContext();

  return <BrowserOnly fallback={<div>Loading comments...</div>}>{() => <Giscus repo="lailai0916/giscus" repoId="R_kgDONHUoXA" category="Announcements" categoryId="DIC_kwDONHUoXM4Cjx_9" mapping="specific" term="about" inputPosition="top" theme={colorMode} lang={i18n.currentLocale} />}</BrowserOnly>;
};
