import React, { useState } from 'react';
import Card from '@site/src/components/laikit/Card';
import IconBlock from '@site/src/components/laikit/IconBlock';
import styles from './styles.module.css';

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
  const [imageError, setImageError] = useState(false);
  const showImage = !!image && !imageError;

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
            src={image}
            alt={title}
            className={
              imageVariant === 'avatar' ? styles.imageAvatar : styles.image
            }
            onError={() => setImageError(true)}
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
