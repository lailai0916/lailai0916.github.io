import { useState, useEffect } from 'react';
import clsx from 'clsx';

import BrowserOnly from '@docusaurus/BrowserOnly';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import Giscus from '@giscus/react';
import { Icon } from '@iconify/react';
import Card from '@lailai0916/ui/Card';
import { useColorMode } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import { DEVICE_LIST } from '@site/src/data/devices';
import { COMMUNITY_LIST } from '@site/src/data/community';
import { useImageStatus } from '@lailai0916/ui';
import styles from './styles.module.css';

const SKILLS_ARIA_LABEL = translate({
  id: 'pages.about.skills.ariaLabel',
  message: 'Tech stack icons',
});

export function Skills() {
  const [perline, setPerline] = useState(12);

  useEffect(() => {
    const handleResize = () => {
      const breakpoints = [
        [668, 12],
        [448, 8],
        [336, 6],
        [224, 4],
        [168, 3],
        [112, 2],
      ];
      setPerline(breakpoints.find(([minWidth]) => window.innerWidth >= minWidth)?.[1] || 1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const skills =
    'cpp,c,python,java,javascript,typescript,html,css,nodejs,react,nextjs,tailwindcss,vite,mysql,markdown,latex,mermaid,git,github,playwright,linux,bash,docker,nginx,cloudflare,vercel,tor,macos,apple,cursor,chatgpt,claude,mcp,figma,photoshop,blender';
  const skillsUrl = `https://go-skill-icons.vercel.app/api/icons?i=${skills}&perline=${perline}`;
  const { imgRef, status, onLoad, onError } = useImageStatus(skillsUrl);

  return (
    <div className={styles.skillsFrame}>
      {status === 'error' ? (
        <div
          className={clsx(styles.skillsImage, styles.imageFallback)}
          role="img"
          aria-label={SKILLS_ARIA_LABEL}
        >
          <Icon icon="lucide:blocks" aria-hidden="true" />
        </div>
      ) : (
        <img
          ref={imgRef}
          src={skillsUrl}
          alt={SKILLS_ARIA_LABEL}
          width={666}
          height={160}
          loading="lazy"
          decoding="async"
          className={styles.skillsImage}
          onLoad={onLoad}
          onError={onError}
        />
      )}
    </div>
  );
}

function DeviceImage({ src, alt }: { src: string; alt: string }) {
  const { imgRef, status, onLoad, onError } = useImageStatus(src);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    const setAr = () => {
      if (img.naturalWidth) {
        img.style.setProperty('--ar', String(img.naturalWidth / img.naturalHeight));
      }
    };
    if (img.complete) {
      setAr();
      return;
    }
    img.addEventListener('load', setAr);
    return () => img.removeEventListener('load', setAr);
  }, [imgRef]);

  if (status === 'error') {
    return (
      <Icon icon="lucide:image-off" className={styles.deviceImageFallback} aria-hidden="true" />
    );
  }

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={styles.deviceImage}
      loading="lazy"
      decoding="async"
      onLoad={onLoad}
      onError={onError}
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

function CommunityDetails({ item }: { item: (typeof COMMUNITY_LIST)[number] }) {
  return (
    <>
      <span className={styles.communityIcon} aria-hidden="true">
        <Icon icon={item.icon} />
      </span>
      <span className={styles.communityCardBody}>
        <span className={styles.communityName}>{item.title}</span>
        <span className={styles.communitySpec}>{item.text}</span>
      </span>
      <span className={styles.communityArrow} aria-hidden="true">
        <Icon icon="lucide:arrow-up-right" />
      </span>
    </>
  );
}

export function Community() {
  return (
    <Card padding="0" className={styles.community}>
      <ul className={styles.communityGrid} role="list">
        {COMMUNITY_LIST.map((item) => (
          <li key={item.title} className={styles.communityItem}>
            <Link href={item.href} className={styles.communityLink}>
              <CommunityDetails item={item} />
            </Link>
          </li>
        ))}
      </ul>
    </Card>
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
