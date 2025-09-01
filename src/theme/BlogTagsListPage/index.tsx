import React from 'react';
import BlogScaffold from '../BlogShared/Scaffold';
import SidebarLeft from '../BlogShared/SidebarLeft';
import SidebarRight from '../BlogShared/SidebarRight';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
//

import styles from '../BlogListPage/styles.module.css';

// shared sidebars handle their own data; no direct utils here

type Props = any;

// removed page-local sidebars/cards; using shared ones

export default function BlogTagsListPage(props: Props) {
  const { tags } = props;
  return (
    <BlogScaffold title="Tags" left={<SidebarLeft />} right={<SidebarRight />}>
      <div className={styles.card}>
        <div className={styles.cardTitle}>
          <Translate id="blog.tags.list">All Tags</Translate>
        </div>
        <div className={styles.tagList}>
          {tags.map((t: any) => (
            <Link key={t.permalink} to={t.permalink} className={styles.tagChip}>
              <span className={styles.tagDot} />
              {t.label}
              <span className={styles.tagCount}>{t.count}</span>
            </Link>
          ))}
        </div>
      </div>
    </BlogScaffold>
  );
}
