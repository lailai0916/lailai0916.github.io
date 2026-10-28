import Icon from '@lailai0916/ui/Icon';
import { useImageStatus } from '@lailai0916/ui';
import { getFaviconUrl } from '@site/src/utils/favicon';
import styles from './styles.module.css';

export default function ReferrerIcon({ referrer }: { referrer: string }) {
  const image = referrer
    ? getFaviconUrl(/^https?:\/\//.test(referrer) ? referrer : `https://${referrer}`)
    : undefined;
  const { imgRef, status, onLoad, onError } = useImageStatus(image);

  return image && status !== 'error' ? (
    <img
      ref={imgRef}
      src={image}
      alt=""
      width={16}
      height={16}
      className={styles.icon}
      decoding="async"
      onLoad={onLoad}
      onError={onError}
    />
  ) : (
    <Icon
      icon={referrer ? 'lucide:globe' : 'lucide:mouse-pointer-2'}
      className={styles.icon}
      aria-hidden="true"
    />
  );
}
