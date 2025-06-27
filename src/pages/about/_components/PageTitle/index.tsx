import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

export default function PageTitle() {
  return (
    <section className="margin-top--lg margin-bottom--lg text--center">
      <Heading as="h1">
        {'🎉\xa0'}
        <span className={styles.titleText}>
          <Link to="/">{'Hello,\xa0I\'m\xa0lailai'}</Link>
        </span>
        {'\xa0🥳'}
      </Heading>
    </section>
  );
}
