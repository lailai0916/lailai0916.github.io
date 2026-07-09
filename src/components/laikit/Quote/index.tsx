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
  /**
   * Visual variant.
   * - `centered` (default): short, epigraph-style. Decorative quote icon on top.
   * - `block`: longer multi-line passages. Left-aligned with a primary-colored
   *   left rule; no icon. Use this whenever the quote runs to 3+ lines so the
   *   text doesn't end up double-ragged.
   */
  variant?: 'centered' | 'block';
  className?: string;
}

export default function Quote({
  children,
  author,
  source,
  variant = 'centered',
  className,
}: QuoteProps) {
  const hasAttribution = !!(author || source);
  return (
    <figure
      className={clsx(
        styles.quote,
        variant === 'block' ? styles.variantBlock : styles.variantCentered,
        className
      )}
    >
      {variant === 'centered' && (
        <Icon
          icon="lucide:quote"
          width={22}
          height={22}
          className={styles.icon}
          aria-hidden="true"
        />
      )}
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
