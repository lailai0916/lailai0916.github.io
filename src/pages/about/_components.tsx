import React, { useMemo } from 'react';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import BrowserOnly from '@docusaurus/BrowserOnly';
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
      <Link className={styles.titleText} to="/">
        {"Hello,\xa0I'm\xa0lailai"}
      </Link>
      {'\xa0🥳'}
    </Heading>
  </section>
);

export const Device = () => {
  const columns = useMemo(() => {
    const midIndex = Math.ceil(DEVICE_LIST.length / 2);
    return [DEVICE_LIST.slice(0, midIndex), DEVICE_LIST.slice(midIndex)];
  }, []);

  return (
    <div className={styles.twoColumnContainer}>
      {columns.map((columnItems, index) => (
        <div key={index} className={styles.column}>
          {columnItems.map((item) => (
            <div key={item.title} className={styles.listItem}>
              <img
                src={item.icon}
                alt={item.title}
                className={styles.deviceIcon}
              />
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export const Community = () => {
  const columns = useMemo(() => {
    const midIndex = Math.ceil(COMMUNITY_LIST.length / 2);
    return [COMMUNITY_LIST.slice(0, midIndex), COMMUNITY_LIST.slice(midIndex)];
  }, []);

  return (
    <div className={styles.twoColumnContainer}>
      {columns.map((columnItems, index) => (
        <div key={index} className={styles.column}>
          {columnItems.map((item) => (
            <div key={item.title} className={styles.listItem}>
              <Icon icon={item.icon} width="1.25rem" height="1.25rem" />
              <Link to={item.href} style={{ color: 'inherit' }}>
                {item.text}
              </Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export const Comment = () => {
  const { colorMode } = useColorMode();
  const { i18n } = useDocusaurusContext();
  return (
    <BrowserOnly>
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
