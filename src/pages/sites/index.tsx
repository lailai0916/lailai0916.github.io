/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import SiteSearchBar from '@site/src/pages/sites/_components/SiteSearchBar';
import SiteCards from './_components/SiteCards';
import SiteFilters from './_components/SiteFilters';

const TITLE = '网站';
const DESCRIPTION = '发现有趣与实用的优质网站';
const SUBMIT_URL = 'https://github.com';

function PageHeader() {
  return (
    <section className="margin-top--lg margin-bottom--lg text--center">
      <Heading as="h1">{TITLE}</Heading>
      <p>{DESCRIPTION}</p>
      {/* <Link className="button button--primary" to={SUBMIT_URL}>
        🙏 请添加你的网站
      </Link> */}
    </section>
  );
}

export default function sitePage(): JSX.Element {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main className="margin-vert--lg">
        <PageHeader />
        <SiteFilters />
        <div
          style={{display: 'flex', marginLeft: 'auto'}}
          className="container">
          <SiteSearchBar />
        </div>
        <SiteCards />
      </main>
    </Layout>
  );
}
