import React, { type ReactNode } from 'react';
import Layout from '@theme/Layout';

import {
  PageTitle,
  PageMain,
  PageHeader,
} from '@site/src/components/laikit/page';
import DataCard from '@site/src/components/laikit/widget/DataCard';

const TITLE = '地图';
const DESCRIPTION = 'lailai\'s Home 网站地图';

function MapHeader() {
  return (
    <PageHeader>
      <PageTitle description={DESCRIPTION}>
        网站<b>地图</b>
      </PageTitle>
      <DataCard value={1} label="个页面" icon="lucide:map" />
    </PageHeader>
  );
}

function MapContent() {
  return (
    <div>
      <h3>Map</h3>
    </div>
  );
}

export default function Map(): ReactNode {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <PageMain>
        <MapHeader />
        <MapContent />
      </PageMain>
    </Layout>
  );
}
