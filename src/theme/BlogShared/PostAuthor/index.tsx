import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

import type { Props as BlogPostPageProps } from '@theme/BlogPostPage';
import styles from './styles.module.css';

type PostAuthor = BlogPostPageProps['content']['metadata']['authors'][number];

export default function Author({ author }: { author: PostAuthor }) {
  const avatarUrl = useBaseUrl(author.imageURL);
  // Match Docusaurus's official link-resolution priority chain:
  // page (auto-generated author archive) → url → mailto:email → no link.
  const link =
    author.page?.permalink || author.url || (author.email ? `mailto:${author.email}` : undefined);

  const inner = (
    <>
      {avatarUrl && (
        <img
          src={avatarUrl}
          alt=""
          className={styles.articleAuthorAvatar}
          width={36}
          height={36}
          loading="lazy"
        />
      )}
      <span className={styles.articleAuthorMeta}>
        <span className={styles.articleAuthorName}>{author.name}</span>
        {author.title && <span className={styles.articleAuthorTitle}>{author.title}</span>}
      </span>
    </>
  );

  return link ? (
    <Link href={link} className={clsx(styles.articleAuthor, styles.articleAuthorLink)}>
      {inner}
    </Link>
  ) : (
    <span className={styles.articleAuthor}>{inner}</span>
  );
}
