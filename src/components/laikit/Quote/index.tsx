import type { ReactNode } from 'react';
import clsx from 'clsx';
import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react';
import styles from './styles.module.css';

const ATTRIBUTION_DASH = translate({
  id: 'components.quote.attributionDash',
  message: '— ',
});

interface QuoteProps {
  /** Quoted body text or rich nodes. */
  children: ReactNode;
  /** Person being quoted; rendered after an em-dash. */
  author?: string;
  /** Optional source / event / publication, appended after a middot. */
  source?: string;
  className?: string;
}

export default function Quote({ children, author, source, className }: QuoteProps) {
  const hasAttribution = !!(author || source);
  return (
    <figure className={clsx(styles.quote, className)}>
      <Icon icon="lucide:quote" width={22} height={22} className={styles.icon} aria-hidden="true" />
      <blockquote className={styles.body}>{children}</blockquote>
      {hasAttribution && (
        <figcaption className={styles.attribution}>
          <span aria-hidden="true">{ATTRIBUTION_DASH}</span>
          {author && <span className={styles.author}>{author}</span>}
          {author && source && (
            <span className={styles.separator} aria-hidden="true">
              ·
            </span>
          )}
          {source && <span className={styles.source}>{source}</span>}
        </figcaption>
      )}
    </figure>
  );
}
