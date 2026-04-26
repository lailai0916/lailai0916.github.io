import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.css';

interface MDTitleProps {
  title: string;
  description?: string;
}

export function MDTitle({ title, description }: MDTitleProps) {
  return (
    <section className="margin-top--lg margin-bottom--lg text--center">
      <Heading as="h1">
        {title === 'About' ? (
          <>
            {'🎉\xa0'}
            <span className={styles.titleText}>
              <Translate id="home.topbanner.title">
                {"Hello,\xa0I'm\xa0lailai"}
              </Translate>
            </span>
            {'\xa0🥳'}
          </>
        ) : (
          title
        )}
      </Heading>
      {description && <p>{description}</p>}
    </section>
  );
}
