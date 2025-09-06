import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from '@site/src/pages/_components/TopBanner/styles.module.css';

export function MDTitle({ title, description }) {
  return (
    <section className="margin-top--lg margin-bottom--lg text--center">
      <Heading as="h1">
        {title === 'About' ? (
          <>
            {'🎉\xa0'}
            <Link className={styles.topBannerTitleText} to="/">
              {"Hello,\xa0I'm\xa0lailai"}
            </Link>
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
