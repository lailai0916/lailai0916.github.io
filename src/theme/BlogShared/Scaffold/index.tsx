import { type ReactNode } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useLocation } from '@docusaurus/router';
import Layout from '@theme/Layout';
import type { TOCItem } from '@docusaurus/mdx-loader';

import { translate } from '@docusaurus/Translate';
import Segmented from '@lailai0916/ui/Segmented';
import TableOfContents from '@site/src/components/Article/TableOfContents';
import styles from './styles.module.css';

type BlogNavKey = 'blog' | 'moments' | 'archive' | 'overview';

function useActiveBlogNav(): BlogNavKey {
  const { pathname } = useLocation();
  const momentsBase = useBaseUrl('/blog/moments');
  const archiveBase = useBaseUrl('/blog/archive');
  const tagsBase = useBaseUrl('/blog/tags');
  const authorsBase = useBaseUrl('/blog/authors');
  const overviewBase = useBaseUrl('/blog/overview');

  const startsWith = (base: string) =>
    pathname === base || pathname === `${base}/` || pathname.startsWith(`${base}/`);

  if (startsWith(momentsBase)) return 'moments';
  if (startsWith(overviewBase)) return 'overview';
  if (startsWith(archiveBase) || startsWith(tagsBase) || startsWith(authorsBase)) return 'archive';
  return 'blog';
}

function BlogSectionNav() {
  const active = useActiveBlogNav();
  const blogHref = useBaseUrl('/blog');
  const momentsHref = useBaseUrl('/blog/moments');
  const archiveHref = useBaseUrl('/blog/archive');
  const overviewHref = useBaseUrl('/blog/overview');

  return (
    <nav
      aria-label={translate({
        id: 'blog.menu.sectionsAriaLabel',
        message: 'Blog sections',
      })}
    >
      <Segmented<BlogNavKey>
        className={styles.sectionNav}
        value={active}
        orientation="horizontal"
        stackAt={360}
        items={[
          {
            value: 'blog',
            label: translate({ id: 'blog.menu.blog', message: 'Blog' }),
            href: blogHref,
          },
          {
            value: 'moments',
            label: translate({ id: 'blog.menu.moments', message: 'Moments' }),
            href: momentsHref,
          },
          {
            value: 'archive',
            label: translate({ id: 'blog.menu.archive', message: 'Archive' }),
            href: archiveHref,
          },
          {
            value: 'overview',
            label: translate({ id: 'blog.menu.overview', message: 'Overview' }),
            href: overviewHref,
          },
        ]}
      />
    </nav>
  );
}

type Props = {
  title?: string;
  description?: string;
  children: ReactNode;
  toc?: readonly TOCItem[];
};

export default function BlogScaffold({ title, description, children, toc }: Props) {
  const hasToc = toc && toc.length > 0;

  return (
    <Layout title={title} description={description}>
      <div className={styles.container}>
        <main className={styles.main}>
          <BlogSectionNav />
          {hasToc && (
            <div className={styles.postTocInline}>
              <TableOfContents toc={toc} withCard={false} collapsible />
            </div>
          )}
          {children}
        </main>
        {hasToc && (
          <aside className={styles.postTocDesktop}>
            <TableOfContents toc={toc} withCard={false} />
          </aside>
        )}
      </div>
    </Layout>
  );
}
