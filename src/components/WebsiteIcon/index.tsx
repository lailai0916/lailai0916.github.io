import clsx from 'clsx';
import GlobeIcon from 'lucide-static/icons/globe.svg';
import PointerIcon from 'lucide-static/icons/mouse-pointer-2.svg';
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
  const FallbackIcon =
    fallbackIcon === 'lucide:globe'
      ? GlobeIcon
      : fallbackIcon === 'lucide:mouse-pointer-2'
        ? PointerIcon
        : undefined;
  const fallbackClassName = clsx(styles.fallback, status === 'loaded' && styles.fallbackHidden);

  return (
    <span className={clsx(styles.icon, className)} aria-hidden="true">
      {FallbackIcon ? (
        <FallbackIcon className={fallbackClassName} />
      ) : (
        <Icon icon={fallbackIcon} width="1em" height="1em" className={fallbackClassName} />
      )}
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
