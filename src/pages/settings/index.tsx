import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import clsx from 'clsx';
import { Icon } from '@iconify/react';

import styles from './styles.module.css';
import { ThemeSettings, FontSettings, NotificationSettings, ExperimentalFeatures, QuickActions, ColorGenerator } from './_components/SettingCards';

const TITLE = '设置';
const DESCRIPTION = '个性化您的体验，自定义网站功能和偏好设置';

// Hero 区域 - 模仿 travel 页面的 Hero 布局
function SettingsHero() {
  return (
    <div className={clsx('container', styles.heroContainer)}>
      <div className={styles.heroInner}>
        <div className={styles.heroIcon}>
          <Icon icon="lucide:settings" />
        </div>
        <Heading as="h1" className={styles.heroTitle}>
          {TITLE}
        </Heading>
        <p className={styles.heroSubtitle}>{DESCRIPTION}</p>
      </div>
    </div>
  );
}

// 设置区域 Section 组件
function SettingsSection({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <section className={clsx('container', styles.settingsSection)}>
      <div className={styles.sectionHeader}>
        <Icon icon={icon} className={styles.sectionIcon} />
        <Heading as="h2" className={styles.sectionTitle}>
          {title}
        </Heading>
      </div>
      <div className={styles.settingsGrid}>{children}</div>
    </section>
  );
}

export default function SettingsPage() {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main className={styles.main}>
        <SettingsHero />

        <SettingsSection title="基础设置" icon="lucide:palette">
          <div className={styles.gridItem}>
            <ThemeSettings />
          </div>
          <div className={styles.gridItem}>
            <FontSettings />
          </div>
        </SettingsSection>

        <SettingsSection title="偏好设置" icon="lucide:bell">
          <div className={styles.gridItem}>
            <NotificationSettings />
          </div>
          <div className={styles.gridItem}>
            <ExperimentalFeatures />
          </div>
        </SettingsSection>

        <SettingsSection title="高级工具" icon="lucide:rocket">
          <div className={clsx(styles.gridItem, styles.gridItemLarge)}>
            <ColorGenerator />
          </div>
          <div className={styles.gridItem}>
            <QuickActions />
          </div>
        </SettingsSection>
      </main>
    </Layout>
  );
}
