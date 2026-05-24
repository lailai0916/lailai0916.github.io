import type { ReactNode } from 'react';
import clsx from 'clsx';
import { Icon } from '@iconify/react';
import styles from './styles.module.css';

interface QuoteProps {
  /** Quoted body text or rich nodes. */
  children: ReactNode;
  /** Person being quoted; rendered after an em-dash. */
  author?: string;
  /** Optional source / event / publication, appended after a middot. */
  source?: string;
  className?: string;
}

/**
 * A restrained pull-quote primitive. Use it for short, deliberate quotations
 * (an epigraph, a tagline, a remembered line) — not as a substitute for the
 * regular Markdown blockquote.
 *
 *     <Quote author="Steve Jobs" source="Stanford, 2005">
 *       Stay hungry, stay foolish.
 *     </Quote>
 */
export default function Quote({
  children,
  author,
  source,
  className,
}: QuoteProps) {
  const hasAttribution = !!(author || source);
  return (
    <figure className={clsx(styles.quote, className)}>
      <Icon
        icon="lucide:quote"
        width={22}
        height={22}
        className={styles.icon}
        aria-hidden="true"
      />
      <blockquote className={styles.body}>{children}</blockquote>
      {hasAttribution && (
        <figcaption className={styles.attribution}>
          {author && <span className={styles.author}>{author}</span>}
          {author && source && <span className={styles.separator}>·</span>}
          {source && <span className={styles.source}>{source}</span>}
        </figcaption>
      )}
    </figure>
  );
}
