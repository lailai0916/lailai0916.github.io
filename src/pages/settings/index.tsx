import React, { type ReactNode } from 'react';
import Layout from '@theme/Layout';

import {
  PageTitle,
  PageMain,
  PageHeader,
} from '@site/src/components/laikit/page';
import DataCard from '@site/src/components/laikit/widget/DataCard';
import styles from './styles.module.css';
import {
  ThemeSettings,
  FontSettings,
  ExperimentalFeatures,
  QuickActions,
  ColorGenerator,
} from './_components';

const TITLE = '设置';
const DESCRIPTION = '个性化您的体验，自定义网站功能和偏好设置';

function SettingsHeader() {
  return (
    <PageHeader>
      <PageTitle description={DESCRIPTION}>
        个性化<b>设置</b>
      </PageTitle>
      <DataCard value={5} label="项设置" icon="lucide:settings" />
    </PageHeader>
  );
}

export default function Settings(): ReactNode {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <PageMain>
        <SettingsHeader />
        <div className={styles.container}>
          <ThemeSettings />
          <ColorGenerator />
          <FontSettings />
          <ExperimentalFeatures />
          <QuickActions />
        </div>
      </PageMain>
    </Layout>
  );
}
