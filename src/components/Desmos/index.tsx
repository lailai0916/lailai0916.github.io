import { translate } from '@docusaurus/Translate';
import Card from '@site/src/components/laikit/Card';
import styles from './styles.module.css';

export default function Desmos({ id }: { id: string }) {
  const url = `https://www.desmos.com/calculator/${id}?embed`;

  return (
    <Card padding={0} className={styles.frame}>
      <iframe
        src={url}
        title={translate({
          id: 'components.desmos.frameTitle',
          message: 'Desmos graphing calculator',
        })}
        className={styles.embed}
        loading="lazy"
      />
    </Card>
  );
}
