import clsx from 'clsx';
import Icon from '@lailai0916/ui/Icon';
import { useImageStatus } from '@lailai0916/ui';
import styles from './styles.module.css';

interface Props {
  src?: string;
  fallbackIcon?: string;
  loading?: 'eager' | 'lazy';
  className?: string;
}

export default function WebsiteIcon({
  src,
  fallbackIcon = 'lucide:globe',
  loading = 'lazy',
  className,
}: Props) {
  const { imgRef, status, onLoad, onError } = useImageStatus(src);

  return (
    <span className={clsx(styles.icon, className)} aria-hidden="true">
      <Icon
        icon={fallbackIcon}
        width="1em"
        height="1em"
        className={clsx(styles.fallback, status === 'loaded' && styles.fallbackHidden)}
      />
      {src && status !== 'error' && (
        <img
          ref={imgRef}
          src={src}
          alt=""
          className={clsx(styles.image, status === 'loaded' && styles.imageLoaded)}
          loading={loading}
          decoding="async"
          data-link-icon
          onLoad={onLoad}
          onError={onError}
        />
      )}
    </span>
  );
}
