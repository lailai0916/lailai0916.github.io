import WebsiteIcon from '@site/src/components/WebsiteIcon';
import { getFaviconUrl } from '@site/src/utils/favicon';
import styles from './styles.module.css';

export default function ReferrerIcon({ referrer }: { referrer: string }) {
  const image = referrer
    ? getFaviconUrl(/^https?:\/\//.test(referrer) ? referrer : `https://${referrer}`)
    : undefined;
  return (
    <WebsiteIcon
      src={image}
      fallbackIcon={referrer ? 'lucide:globe' : 'lucide:mouse-pointer-2'}
      loading="eager"
      className={styles.icon}
    />
  );
}
