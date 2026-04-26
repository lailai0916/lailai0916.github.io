import React, { useState, useEffect, useRef } from 'react';

import BrowserOnly from '@docusaurus/BrowserOnly';
import Giscus from '@giscus/react';
import { Icon } from '@iconify/react';
import Card from '@site/src/components/laikit/Card';
import { useColorMode } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

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

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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

function DeviceImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = ref.current;
    if (!img) return;
    const setAr = () => {
      if (img.naturalWidth) {
        img.style.setProperty(
          '--ar',
          String(img.naturalWidth / img.naturalHeight)
        );
      }
    };
    if (img.complete) {
      setAr();
      return;
    }
    img.addEventListener('load', setAr);
    return () => img.removeEventListener('load', setAr);
  }, []);

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={styles.deviceImage}
      loading="lazy"
    />
  );
}

export function Devices() {
  return (
    <div className={styles.deviceGrid}>
      {DEVICE_LIST.map((item) => (
        <Card key={item.title} padding="0" className={styles.deviceCard}>
          <div className={styles.deviceCardBody}>
            <div className={styles.deviceName}>{item.title}</div>
            <div className={styles.deviceSpec}>{item.spec}</div>
          </div>
          <DeviceImage src={item.image} alt={item.title} />
        </Card>
      ))}
    </div>
  );
}

export function Community() {
  return (
    <div className={styles.communityGrid}>
      {COMMUNITY_LIST.map((item) => (
        <Card
          key={item.title}
          href={item.href}
          padding="0.75rem"
          className={styles.communityCard}
          wrapperClassName={styles.communityCardWrapper}
        >
          <div className={styles.communityCardBody}>
            <div className={styles.communityName}>{item.title}</div>
            <div className={styles.communitySpec}>{item.text}</div>
          </div>
          <Icon icon={item.icon} className={styles.communityIcon} />
        </Card>
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
