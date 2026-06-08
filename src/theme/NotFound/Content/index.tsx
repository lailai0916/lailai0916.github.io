import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Translate, { translate } from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import { Icon } from '@iconify/react';
import styles from './styles.module.css';

type Props = {
  className?: string;
};

// Swizzled 404 content. The framework default ends on an awkward "contact the
// owner of the site" line — on a personal site the owner is the reader's only
// way here. Replaced with a quiet typographic 404 and a single home action,
// built from laikit tokens. `theme.NotFound.*` are this component's own
// framework strings (kept); the button label is project-owned.
export default function NotFoundContent({ className }: Props) {
  const homeHref = useBaseUrl('/');

  return (
    <main className={clsx(styles.notFound, className)}>
      <div className={styles.inner}>
        <div className={styles.code} aria-hidden="true">
          404
        </div>
        <Heading as="h1" className={styles.title}>
          <Translate
            id="theme.NotFound.title"
            description="The title of the 404 page"
          >
            Page Not Found
          </Translate>
        </Heading>
        <p className={styles.description}>
          <Translate
            id="theme.NotFound.p1"
            description="The first paragraph of the 404 page"
          >
            We could not find what you were looking for.
          </Translate>
        </p>
        <Link to={homeHref} className={styles.homeButton}>
          <Icon icon="lucide:house" width={16} height={16} />
          <span>
            {translate({
              id: 'components.notFound.backToHome',
              message: 'Back to home',
            })}
          </span>
        </Link>
      </div>
    </main>
  );
}
