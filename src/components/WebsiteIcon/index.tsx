import clsx from 'clsx';
import GlobeIcon from 'lucide-static/icons/globe.svg';
import PointerIcon from 'lucide-static/icons/mouse-pointer-2.svg';
import Icon from '@lailai0916/ui/Icon';
import FallbackImage from '@lailai0916/ui/FallbackImage';
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
  const FallbackIcon =
    fallbackIcon === 'lucide:globe'
      ? GlobeIcon
      : fallbackIcon === 'lucide:mouse-pointer-2'
        ? PointerIcon
        : undefined;
  return (
    <FallbackImage
      src={src}
      fit="contain"
      loading={loading}
      className={clsx(styles.icon, className)}
      imageProps={{ 'data-link-icon': true }}
      fallback={
        FallbackIcon ? <FallbackIcon /> : <Icon icon={fallbackIcon} width="1em" height="1em" />
      }
    />
  );
}
