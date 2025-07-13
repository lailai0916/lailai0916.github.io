import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import clsx from 'clsx';
import { Icon } from '@iconify/react';

import IconText from '@site/src/components/IconText';
import styles from './styles.module.css';
import {
  ThemeSettings,
  FontSettings,
  NotificationSettings,
  ExperimentalFeatures,
  QuickActions,
  ColorGenerator,
} from './_components/SettingCards';

const TITLE = '设置';
const DESCRIPTION = '个性化您的体验，自定义网站功能和偏好设置';

// 统计数据
const STATS = {
  totalSettings: 6,
  categories: 3,
  activeFeatures: 4,
};

// 现代化的头部区域 - 仿照 resources 页面
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
          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div className={styles.statNumber}>{STATS.totalSettings}</div>
              <div className={styles.statLabel}>
                <IconText icon="lucide:settings" colorMode="monochrome">
                  项设置
                </IconText>
              </div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div className={styles.statNumber}>{STATS.categories}</div>
              <div className={styles.statLabel}>
                <IconText icon="lucide:layers" colorMode="monochrome">
                  个分类
                </IconText>
              </div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div className={styles.statNumber}>{STATS.activeFeatures}</div>
              <div className={styles.statLabel}>
                <IconText icon="lucide:zap" colorMode="monochrome">
                  项功能
                </IconText>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 现代化的设置分区组件
function SettingsSection({
  title,
  description,
  icon,
  children,
}: {
  title: string;
  description: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <section className={styles.settingsSection}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitleGroup}>
          <h2 className={styles.sectionTitle}>
            <IconText icon={icon}>{title}</IconText>
          </h2>
          <p className={styles.sectionDescription}>{description}</p>
        </div>
      </div>
      <div className={styles.settingsGrid}>{children}</div>
    </section>
  );
}

export default function SettingsPage() {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main className={styles.main}>
        <SettingsHeader />

        <div className={styles.container}>
          <div className={styles.content}>
            <SettingsSection
              title="基础设置"
              description="外观主题、字体大小等基本个性化选项"
              icon="lucide:palette"
            >
              <div className={styles.gridItem}>
                <ThemeSettings />
              </div>
              <div className={styles.gridItem}>
                <FontSettings />
              </div>
            </SettingsSection>

            <SettingsSection
              title="偏好设置"
              description="通知推送、实验功能等个性化体验"
              icon="lucide:bell"
            >
              <div className={styles.gridItem}>
                <NotificationSettings />
              </div>
              <div className={styles.gridItem}>
                <ExperimentalFeatures />
              </div>
            </SettingsSection>

            <SettingsSection
              title="高级工具"
              description="主题定制、管理工具等高级功能"
              icon="lucide:rocket"
            >
              <div className={clsx(styles.gridItem, styles.gridItemLarge)}>
                <ColorGenerator />
              </div>
              <div className={styles.gridItem}>
                <QuickActions />
              </div>
            </SettingsSection>
          </div>
        </div>
      </main>
    </Layout>
  );
}
