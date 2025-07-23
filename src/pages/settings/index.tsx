import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import clsx from 'clsx';

import DataCard from '@site/src/components/laiKit/DataCard';
import IconText from '@site/src/components/laiKit/IconText';
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
        <div className={styles.headerContent}>
          <Heading as="h1" className={styles.mainTitle}>
            个性化<span className={styles.highlight}>设置</span>
          </Heading>
          <p className={styles.mainDescription}>
            定制您的专属体验，享受个性化的网站功能
          </p>
        </div>
        <div className={styles.statsGrid}>
          <DataCard value={6} label="项设置" icon="lucide:settings" />
        </div>
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
            <div className={styles.gridItem}><ThemeSettings /></div>
            <div className={styles.gridItemLarge}><ColorGenerator /></div>
            <div className={styles.gridItem}><FontSettings /></div>
            <div className={styles.gridItem}><ExperimentalFeatures /></div>
            <div className={styles.gridItem}><QuickActions /></div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
