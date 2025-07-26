import React, { type ReactNode } from 'react';
import Layout from '@theme/Layout';
import { useDebugMode } from '@site/src/hooks/useDebugMode';

import DataCard from '@site/src/components/laiKit/widget/DataCard';
import PageTitle from '@site/src/components/laiKit/page/PageTitle';
import PageHeader from '@site/src/components/laiKit/page/PageHeader';
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
      <PageTitle
        title={
          <>
            个性化<b>设置</b>
          </>
        }
        description={DESCRIPTION}
      />
      <DataCard value={5} label="项设置" icon="lucide:settings" />
    </PageHeader>
  );
}

export default function Settings(): ReactNode {
  const debugMode = useDebugMode();
  return (
    <Layout
      title={TITLE}
      description={DESCRIPTION}
      wrapperClassName={debugMode && 'debug'}
    >
      <main>
        <SettingsHeader />
        <div className={styles.container}>
          <ThemeSettings />
          <ColorGenerator />
          <FontSettings />
          <ExperimentalFeatures />
          <QuickActions />
        </div>
      </main>
    </Layout>
  );
}
