import { translate } from '@docusaurus/Translate';
import Card from '@lailai0916/ui/Card';
import styles from './styles.module.css';

export default function Desmos({ id }: { id: string }) {
  const url = `https://www.desmos.com/calculator/${id}`;

  return (
    <Card padding={0} className={styles.frame}>
      <iframe
        src={`${url}?embed`}
        title={translate({
          id: 'components.desmos.frameTitle',
          message: 'Desmos graphing calculator',
        })}
        className={styles.embed}
        loading="lazy"
      />
      <a href={url} className={styles.printLink}>
        {url}
      </a>
    </Card>
  );
}
