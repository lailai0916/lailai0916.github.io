import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import Card from '@site/src/components/laikit/Card';
import styles from './styles.module.css';

const IMAGE_LOAD_TIMEOUT_MS = 3000;

export interface ShareSource {
  label: string;
  icon?: string;
}

export interface ShareCardProps {
  url: string;
  title: string;
  description?: string;
  image?: string;
  source?: ShareSource;
}

const SOURCE_RULES: Array<{ test: RegExp; label: string; icon: string }> = [
  { test: /(?:^|\.)bilibili\.com$|^b23\.tv$/i, label: 'bilibili', icon: 'simple-icons:bilibili' },
  { test: /(?:^|\.)zhihu\.com$|^zhuanlan\.zhihu\.com$/i, label: '知乎', icon: 'simple-icons:zhihu' },
  { test: /(?:^|\.)(?:x\.com|twitter\.com|t\.co)$/i, label: 'X', icon: 'simple-icons:x' },
  { test: /(?:^|\.)github\.com$/i, label: 'GitHub', icon: 'simple-icons:github' },
  { test: /(?:^|\.)(?:youtube\.com|youtu\.be)$/i, label: 'YouTube', icon: 'simple-icons:youtube' },
  { test: /(?:^|\.)(?:weibo\.com|weibo\.cn)$/i, label: '微博', icon: 'simple-icons:sinaweibo' },
  { test: /(?:^|\.)xiaohongshu\.com$|^xhslink\.com$/i, label: '小红书', icon: 'simple-icons:xiaohongshu' },
  { test: /(?:^|\.)juejin\.cn$/i, label: '掘金', icon: 'simple-icons:juejin' },
  { test: /(?:^|\.)douyin\.com$/i, label: '抖音', icon: 'simple-icons:tiktok' },
  { test: /(?:^|\.)(?:reddit\.com|redd\.it)$/i, label: 'Reddit', icon: 'simple-icons:reddit' },
  { test: /(?:^|\.)(?:medium\.com)$/i, label: 'Medium', icon: 'simple-icons:medium' },
  { test: /(?:^|\.)(?:notion\.so|notion\.site)$/i, label: 'Notion', icon: 'simple-icons:notion' },
  { test: /(?:^|\.)spotify\.com$/i, label: 'Spotify', icon: 'simple-icons:spotify' },
  { test: /(?:^|\.)apple\.com$/i, label: 'Apple', icon: 'simple-icons:apple' },
  { test: /(?:^|\.)luogu\.com\.cn$/i, label: '洛谷', icon: 'lucide:code' },
  { test: /(?:^|\.)codeforces\.com$/i, label: 'Codeforces', icon: 'simple-icons:codeforces' },
];

function inferSource(url: string): ShareSource {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    const match = SOURCE_RULES.find((r) => r.test.test(host));
    if (match) return { label: match.label, icon: match.icon };
    return { label: host, icon: 'lucide:link' };
  } catch {
    return { label: url, icon: 'lucide:link' };
  }
}

export default function ShareCard({
  url,
  title,
  description,
  image,
  source,
}: ShareCardProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [imageStatus, setImageStatus] = useState<'loading' | 'loaded' | 'error'>(
    image ? 'loading' : 'error'
  );

  useEffect(() => {
    if (!image) {
      setImageStatus('error');
      return;
    }
    const img = imgRef.current;
    if (img && img.complete) {
      setImageStatus(img.naturalWidth > 0 ? 'loaded' : 'error');
      return;
    }
    setImageStatus('loading');
    const timer = window.setTimeout(() => {
      setImageStatus((s) => (s === 'loading' ? 'error' : s));
    }, IMAGE_LOAD_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [image]);

  const resolvedSource = source ?? inferSource(url);
  const showImage = !!image && imageStatus !== 'error';

  return (
    <Card
      href={url}
      className={styles.shareCard}
      wrapperClassName={styles.shareCardWrap}
      title={title}
    >
      <div className={styles.thumb} data-empty={showImage ? undefined : ''}>
        {showImage ? (
          <img
            ref={imgRef}
            src={image}
            alt=""
            className={styles.thumbImage}
            loading="lazy"
            onLoad={() => setImageStatus('loaded')}
            onError={() => setImageStatus('error')}
          />
        ) : (
          <Icon
            icon={resolvedSource.icon ?? 'lucide:link'}
            className={styles.thumbFallback}
            aria-hidden
          />
        )}
      </div>
      <div className={styles.body}>
        <h4 className={styles.title}>{title}</h4>
        {description && <p className={styles.description}>{description}</p>}
        <div className={styles.source}>
          {resolvedSource.icon && (
            <Icon
              icon={resolvedSource.icon}
              className={styles.sourceIcon}
              aria-hidden
            />
          )}
          <span className={styles.sourceLabel}>{resolvedSource.label}</span>
        </div>
      </div>
    </Card>
  );
}
