import React from 'react';
import Layout from '@theme/Layout';

import DataCard from '@site/src/components/laiKit/DataCard';
import PageTitle from '@site/src/components/laiKit/PageTitle';
import styles from './styles.module.css';
import {
  ThemeSettings,
  FontSettings,
  ExperimentalFeatures,
  QuickActions,
  ColorGenerator,
} from './_components/SettingCards';

const TITLE = '设置';
const DESCRIPTION = '个性化您的体验，自定义网站功能和偏好设置';

function SettingsHeader() {
  return (
    <div className={styles.headerSection}>
      <div className={styles.headerInner}>
        <PageTitle
          title={
            <>
              个性化<b>设置</b>
            </>
          }
          description={DESCRIPTION}
        />
        <DataCard value={5} label="项设置" icon="lucide:settings" />
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main className={styles.main}>
        <SettingsHeader />
        <div className={styles.container}>
          <div className={styles.settingsGrid}>
            <div className={styles.gridItem}>
              <ThemeSettings />
            </div>
            <div className={styles.gridItemLarge}>
              <ColorGenerator />
            </div>
            <div className={styles.gridItem}>
              <FontSettings />
            </div>
            <div className={styles.gridItem}>
              <ExperimentalFeatures />
            </div>
            <div className={styles.gridItem}>
              <QuickActions />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
