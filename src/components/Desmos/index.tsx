import { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';

export default function Desmos({ id }: { id: string }) {
  const url = `https://www.desmos.com/calculator/${id}?embed`;

  return (
    <iframe
      src={url}
      title={translate({
        id: 'components.desmos.frameTitle',
        message: 'Desmos graphing calculator',
      })}
      className={styles.frame}
      loading="lazy"
    />
  );
}
