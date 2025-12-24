import React, { useMemo, useState, useEffect } from 'react';

import BrowserOnly from '@docusaurus/BrowserOnly';
import Link from '@docusaurus/Link';
import Giscus from '@giscus/react';
import IconText from '@site/src/components/laikit/widget/IconText';
import { useColorMode } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import GithubSlugger from 'github-slugger';

import { SKILL_LIST } from '@site/src/data/skills';
import { DEVICE_LIST } from '@site/src/data/devices';
import { COMMUNITY_LIST } from '@site/src/data/community';
import styles from './styles.module.css';

export function Skills() {
  const [perline, setPerline] = useState(12);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      const breakpoints = [
        [668, 12],
        [448, 8],
        [336, 6],
        [224, 4],
        [168, 3],
        [112, 2],
      ];

      const newPerline =
        breakpoints.find(([minWidth]) => width >= minWidth)?.[1] || 1;
      setPerline(newPerline);
    };

    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const skills = SKILL_LIST.map((skill) => skill.icon).join(',');
  const url = `https://skillicons.dev/icons?i=${skills}&perline=${perline}`;

  return (
    <BrowserOnly>
      {() => (
        <>
          <img src={`${url}&theme=light#gh-light-mode-only`} />
          <img src={`${url}&theme=dark#gh-dark-mode-only`} />
        </>
      )}
    </BrowserOnly>
  );
}

export function Devices() {
  const slugger = new GithubSlugger();
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
              <Link
                to={`/docs/project/other/devices#${slugger.slug(item.title)}`}
                style={{ color: 'inherit' }}
              >
                {item.title}
              </Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function Community() {
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
}

export function Comments() {
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
          loading="lazy"
        />
      )}
    </BrowserOnly>
  );
}
