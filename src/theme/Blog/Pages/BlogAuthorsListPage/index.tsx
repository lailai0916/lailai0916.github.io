import React from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';

import styles from '../../../BlogListPage/styles.module.css';
import BlogScaffold from '../../../BlogShared/Scaffold';
import SidebarLeft from '../../../BlogShared/SidebarLeft';
import SidebarRight from '../../../BlogShared/SidebarRight';

import { getTopTags } from '@site/src/utils/blogData';

import type { Props } from '@theme/Blog/Pages/BlogAuthorsListPage';

export default function BlogAuthorsListPage(props: Props) {
  const { authors } = props;
  return (
    <BlogScaffold
      title="Authors"
      left={<SidebarLeft />}
      right={<SidebarRight />}
    >
      <div className={styles.card}>
        <div className={styles.cardTitle}>
          <Translate id="blog.authors">Authors</Translate>
        </div>
        <div className={styles.tagList}>
          {authors.map((a: any) => (
            <Link key={a.permalink} to={a.permalink} className={styles.tagChip}>
              <span className={styles.tagDot} />
              {a.name}
              <span className={styles.tagCount}>{a.count}</span>
            </Link>
          ))}
        </div>
      </div>
    </BlogScaffold>
  );
}
