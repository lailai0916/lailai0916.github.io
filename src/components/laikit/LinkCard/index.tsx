import React, { useEffect, useRef, useState } from 'react';
import Card from '@site/src/components/laikit/Card';
import IconBlock from '@site/src/components/laikit/IconBlock';
import styles from './styles.module.css';

const IMAGE_LOAD_TIMEOUT_MS = 3000;

type LinkCardLinkProps =
  | { to: string; href?: never }
  | { href: string; to?: never };

type LinkCardProps = LinkCardLinkProps & {
  title: string;
  description?: string;
  image?: string;
  fallbackIcon?: string;
  /** 'icon' = small centered glyph (e.g. favicon); 'avatar' = fills the block (e.g. profile photo). */
  imageVariant?: 'icon' | 'avatar';
};

const ICON_BOX_SIZE = 48;
const FALLBACK_ICON_SIZE = 24;

export default function LinkCard({
  title,
  description,
  image,
  fallbackIcon,
  imageVariant = 'icon',
  ...linkProps
}: LinkCardProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [imageStatus, setImageStatus] = useState<
    'loading' | 'loaded' | 'error'
  >(image ? 'loading' : 'error');

  useEffect(() => {
    if (!image) {
      setImageStatus('error');
      return;
    }
    // If the browser already finished loading the image before React attached
    // its handlers (common on SSR + fast cache hits), onLoad/onError will
    // never fire — sync state from the DOM here.
    const img = imgRef.current;
    if (img && img.complete) {
      setImageStatus(img.naturalWidth > 0 ? 'loaded' : 'error');
      return;
    }
    setImageStatus('loading');
    const timer = window.setTimeout(() => {
      setImageStatus((status) => (status === 'loading' ? 'error' : status));
    }, IMAGE_LOAD_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [image]);

  const showImage = !!image && imageStatus !== 'error';

  return (
    <Card
      {...linkProps}
      className={styles.linkCard}
      wrapperClassName={styles.linkCardWrap}
      title={title}
    >
      {showImage ? (
        <IconBlock variant="muted" size={ICON_BOX_SIZE}>
          <img
            ref={imgRef}
            src={image}
            alt={title}
            className={
              imageVariant === 'avatar' ? styles.imageAvatar : styles.image
            }
            onLoad={() => setImageStatus('loaded')}
            onError={() => setImageStatus('error')}
          />
        </IconBlock>
      ) : (
        <IconBlock
          icon={fallbackIcon}
          variant="muted"
          size={ICON_BOX_SIZE}
          iconSize={FALLBACK_ICON_SIZE}
        />
      )}
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </Card>
  );
}
