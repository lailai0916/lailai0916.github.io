import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import clsx from 'clsx';

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

const STATS = [
  { value: 6, label: '项设置', icon: 'lucide:settings' },
  { value: 3, label: '个分类', icon: 'lucide:layers' },
  { value: 4, label: '项功能', icon: 'lucide:zap' },
];

const SECTIONS = [
  {
    title: '基础设置',
    description: '外观主题、字体大小等基本个性化选项',
    icon: 'lucide:palette',
    items: [
      { Comp: ThemeSettings },
      { Comp: FontSettings },
    ],
  },
  {
    title: '偏好设置',
    description: '通知推送、实验功能等个性化体验',
    icon: 'lucide:bell',
    items: [
      { Comp: NotificationSettings },
      { Comp: ExperimentalFeatures },
    ],
  },
  {
    title: '高级工具',
    description: '主题定制、管理工具等高级功能',
    icon: 'lucide:rocket',
    items: [
      { Comp: ColorGenerator, large: true },
      { Comp: QuickActions },
    ],
  },
];

function StatCard({ value, label, icon }: typeof STATS[number]) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statContent}>
        <div className={styles.statNumber}>{value}</div>
        <div className={styles.statLabel}>
          <IconText icon={icon} colorMode="monochrome">
            {label}
          </IconText>
        </div>
      </div>
    </div>
  );
}

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
          {STATS.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SettingsSection({
  title,
  description,
  icon,
  items,
}: {
  title: string;
  description: string;
  icon: string;
  items: { Comp: React.ComponentType; large?: boolean }[];
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
      <div className={styles.settingsGrid}>
        {items.map(({ Comp, large }, i) => (
          <div
            key={i}
            className={clsx(styles.gridItem, large && styles.gridItemLarge)}
          >
            <Comp />
          </div>
        ))}
      </div>
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
            {SECTIONS.map((sec) => (
              <SettingsSection key={sec.title} {...sec} />
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}
