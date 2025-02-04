import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import clsx from 'clsx';
import { resourceData } from '@site/src/data/resources';
import ResourceCard from './_components/ResourceCard';
import styles from './styles.module.css';

const TITLE = '网站';
const DESCRIPTION = '有趣与实用的优质网站导航';

function PageHeader() {
  return (
    <section className="margin-top--lg margin-bottom--lg text--center">
      <Heading as="h1">{TITLE}</Heading>
      <p>{DESCRIPTION}</p>
    </section>
  )
}

function CategorySidebar() {
  const sidebar = {
    title: '',
    items: resourceData.map(w => ({ title: w.name, permalink: `#${w.name}` })),
  }

  return (
    <nav className={clsx(styles.sidebar, 'thin-scrollbar')}>
      <div className={clsx(styles.sidebarItemTitle, 'margin-bottom--md')}>{sidebar.title}</div>
      <ul className={clsx(styles.sidebarItemList, 'clean-list')}>
        {sidebar.items.map(item => (
          <li key={item.permalink} className={styles.sidebarItem}>
            <Link
              isNavLink
              to={item.permalink}
              className={styles.sidebarItemLink}
              activeClassName={styles.sidebarItemLinkActive}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function CategoryList() {
  return (
    <div className={styles.category}>
      {resourceData.map(cate => (
        <div key={cate.name}>
          <div className={styles.cateHeader}>
            <h2 id={cate.name} className="anchor">
              {cate.name}
            </h2>
          </div>
          <section>
            <ul className={styles.resourceList}>
              {cate.resources.map(resource => (
                <ResourceCard key={resource.name} resource={resource} />
              ))}
            </ul>
          </section>
        </div>
      ))}
    </div>
  )
}

export default function resourcesPage() {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main className="margin-vert--lg">
        <PageHeader />
        <div className="container">
          <div className="row">
            <aside className="col col--2">
              <CategorySidebar />
            </aside>
            <main className="col col--10">
              <CategoryList />
            </main>
          </div>
        </div>
      </main>
    </Layout>
  )
}
