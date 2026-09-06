import { useState, useEffect } from 'react';

import BrowserOnly from '@docusaurus/BrowserOnly';
import { translate } from '@docusaurus/Translate';
import Giscus from '@giscus/react';
import { Icon } from '@iconify/react';
import Card from '@site/src/components/laikit/Card';
import { useColorMode } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import { DEVICE_LIST } from '@site/src/data/devices';
import { COMMUNITY_LIST } from '@site/src/data/community';
import { useImageStatus } from '@site/src/hooks/useImageStatus';
import styles from './styles.module.css';

const WORD_CLOUD_URL = 'https://cloud.lailai.one/f/AdNtA/wordcloud.svg';
const SKILLS_ARIA_LABEL = translate({
  id: 'pages.about.skills.ariaLabel',
  message: 'Tech stack icons',
});

export function WordCloud() {
  const { imgRef, status, onLoad, onError } = useImageStatus(WORD_CLOUD_URL);

  return (
    <Card className={styles.wordCloud} padding="clamp(1.25rem, 4vw, 2.25rem)">
      <div className={styles.wordCloudFrame}>
        {status === 'error' ? (
          <div className={styles.imageFallback} aria-hidden="true">
            <Icon icon="lucide:image-off" />
          </div>
        ) : (
          <img
            ref={imgRef}
            src={WORD_CLOUD_URL}
            alt=""
            width={2819}
            height={924}
            decoding="async"
            onLoad={onLoad}
            onError={onError}
          />
        )}
      </div>
    </Card>
  );
}

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
          className={`${styles.skillsImage} ${styles.imageFallback}`}
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
