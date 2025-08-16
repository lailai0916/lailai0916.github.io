import React, { useMemo } from 'react';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useColorMode } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import Giscus from '@giscus/react';
import { COMMUNITY_LIST } from '@site/src/data/community';
import { SKILL_LIST } from '@site/src/data/skills';
import { DEVICE_LIST } from '@site/src/data/devices';
import IconText from '@site/src/components/laikit/widget/IconText';
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

export const Skills = () => {
  const skills = SKILL_LIST.map((skill) => skill.icon).join(',');
  const url = `https://skillicons.dev/icons?i=${skills}&perline=12`;
  return (
    <>
      <img src={`${url}&theme=light#gh-light-mode-only`} />
      <img src={`${url}&theme=dark#gh-dark-mode-only`} />
    </>
  );
};

export const Devices = () => {
  const columns = useMemo(() => {
    return [
      DEVICE_LIST.filter((_, i) => i % 2 === 0),
      DEVICE_LIST.filter((_, i) => i % 2 === 1),
    ];
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
    return [
      COMMUNITY_LIST.filter((_, i) => i % 2 === 0),
      COMMUNITY_LIST.filter((_, i) => i % 2 === 1),
    ];
  }, []);

  return (
    <div className={styles.twoColumnContainer}>
      {columns.map((columnItems, index) => (
        <div key={index} className={styles.column}>
          {columnItems.map((item) => (
            <div key={item.title} className={styles.listItem}>
              <IconText icon={item.icon} colorMode="monochrome">
                <Link to={item.href} style={{ color: 'inherit' }}>
                  {item.text}
                </Link>
              </IconText>
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
