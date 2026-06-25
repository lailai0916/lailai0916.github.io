import { Icon } from '@iconify/react';
import Card from '@site/src/components/laikit/Card';
import { useImageStatus } from '@site/src/hooks/useImageStatus';
import styles from './styles.module.css';

interface ShareSource {
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
  {
    test: /(?:^|\.)(?:x\.com|twitter\.com|t\.co)$/i,
    label: 'X',
    icon: 'simple-icons:x',
  },
  {
    test: /(?:^|\.)github\.com$/i,
    label: 'GitHub',
    icon: 'simple-icons:github',
  },
  {
    test: /(?:^|\.)(?:youtube\.com|youtu\.be)$/i,
    label: 'YouTube',
    icon: 'simple-icons:youtube',
  },
  {
    test: /(?:^|\.)(?:reddit\.com|redd\.it)$/i,
    label: 'Reddit',
    icon: 'simple-icons:reddit',
  },
  { test: /(?:^|\.)apple\.com$/i, label: 'Apple', icon: 'simple-icons:apple' },
  {
    test: /(?:^|\.)anthropic\.com$/i,
    label: 'Anthropic',
    icon: 'simple-icons:anthropic',
  },
  {
    test: /(?:^|\.)spotify\.com$/i,
    label: 'Spotify',
    icon: 'simple-icons:spotify',
  },
  {
    test: /(?:^|\.)bilibili\.com$|^b23\.tv$/i,
    label: 'bilibili',
    icon: 'simple-icons:bilibili',
  },
  {
    test: /(?:^|\.)zhihu\.com$|^zhuanlan\.zhihu\.com$/i,
    label: '知乎',
    icon: 'simple-icons:zhihu',
  },
  {
    test: /(?:^|\.)luogu\.com\.cn$/i,
    label: '洛谷',
    icon: 'simple-icons:luogu',
  },
  {
    test: /(?:^|\.)codeforces\.com$/i,
    label: 'Codeforces',
    icon: 'simple-icons:codeforces',
  },
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
  const { imgRef, status, onLoad, onError } = useImageStatus(image);
  const resolvedSource = source ?? inferSource(url);
  const showImage = !!image && status !== 'error';

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
            onLoad={onLoad}
            onError={onError}
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
        <div className={styles.meta}>
          <span className={styles.sourceLabel}>{resolvedSource.label}</span>
          {description && (
            <>
              <span className={styles.metaDot} aria-hidden />
              <span className={styles.description}>{description}</span>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
