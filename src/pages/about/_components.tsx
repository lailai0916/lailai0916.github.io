import React from 'react';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

import { Icon } from '@iconify/react';
import { DEVICES } from '@site/src/data/device';
import { COMMUNITY_LINKS } from '@site/src/data/community';

import Giscus from "@giscus/react";
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useColorMode } from "@docusaurus/theme-common";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export const Title = () => {
  return (
    <section className="margin-top--lg margin-bottom--lg text--center">
      <Heading as="h1">
        {'🎉\xa0'}
        <span className={styles.titleText}>
          <Link to="/">{'Hello,\xa0I\'m\xa0lailai'}</Link>
        </span>
        {'\xa0🥳'}
      </Heading>
    </section>
  );
};

export const Device = () => {
  return (
    <div className={styles.listContainer}>
      {DEVICES.map((device) => (
        <div key={device.name} className={styles.listItem}>
          <img src={device.icon} alt={device.name} className={styles.deviceIcon} />
          <span>{device.name}</span>
        </div>
      ))}
    </div>
  );
};

export const Community = () => {
  return (
    <div className={styles.listContainer}>
      {COMMUNITY_LINKS.map((link) => (
        <div key={link.text} className={styles.listItem}>
          <Icon icon={link.icon} width="1.25rem" height="1.25rem" />
          <Link to={link.href}>{link.text}</Link>
        </div>
      ))}
    </div>
  );
};

export const Comment = () => {
  const { colorMode } = useColorMode();
  const { i18n } = useDocusaurusContext();
  
  return (
    <BrowserOnly fallback={<div>Loading comments...</div>}>
      {() => (
        <Giscus
        repo="lailai0916/giscus"
        repoId="R_kgDONHUoXA"
        category="Announcements"
        categoryId="DIC_kwDONHUoXM4Cjx_9"
        mapping="specific"
        term="about"
        inputPosition="top"
        theme={colorMode}
        lang={i18n.currentLocale}
        />
      )}
    </BrowserOnly>
  );
};
