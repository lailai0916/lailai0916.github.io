import clsx from 'clsx';
import Card from '@site/src/components/laikit/Card';
import IconBlock from '@site/src/components/laikit/IconBlock';
import { Icon } from '@iconify/react';
import { useImageStatus } from '@site/src/hooks/useImageStatus';
import styles from './styles.module.css';

type LinkCardLinkProps = { to: string; href?: never } | { href: string; to?: never };

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
  const { imgRef, status, onLoad, onError } = useImageStatus(image);
  const shouldLoadImage = !!image && status !== 'error';
  const imageLoaded = status === 'loaded';

  return (
    <Card
      {...linkProps}
      className={styles.linkCard}
      wrapperClassName={styles.linkCardWrap}
      title={title}
    >
      <IconBlock variant="muted" size={ICON_BOX_SIZE} className={styles.imageBlock}>
        {fallbackIcon && (
          <Icon
            icon={fallbackIcon}
            width={FALLBACK_ICON_SIZE}
            height={FALLBACK_ICON_SIZE}
            className={imageLoaded ? styles.fallbackIconHidden : styles.fallbackIcon}
            aria-hidden="true"
          />
        )}
        {shouldLoadImage && (
          <img
            ref={imgRef}
            src={image}
            alt={title}
            className={clsx(
              imageVariant === 'avatar' ? styles.imageAvatar : styles.image,
              imageLoaded ? styles.imageLoaded : styles.imageLoading
            )}
            loading="lazy"
            decoding="async"
            onLoad={onLoad}
            onError={onError}
          />
        )}
      </IconBlock>
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </Card>
  );
}
