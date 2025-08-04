import React, { type ReactNode } from 'react';
import Layout from '@theme/Layout';

import {
  PageTitle,
  PageMain,
  PageHeader,
} from '@site/src/components/laikit/page';
import DataCard from '@site/src/components/laikit/widget/DataCard';
import { Icon } from '@iconify/react';
import styles from './styles.module.css';

import {
  QuickActions,
  ThemeSettings,
  FontSettings,
  ExperimentalFeatures,
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
      <DataCard
        value={SettingItems.length}
        label="项设置"
        icon="lucide:settings"
      />
    </PageHeader>
  );
}

const SettingItems = [
  {
    title: '外观主题',
    subtitle: '选择一个适合您的主题模式',
    icon: 'lucide:monitor',
    component: ThemeSettings,
  },
  {
    title: '主题色生成器',
    subtitle: '自定义网站的主色调，实时预览效果',
    icon: 'lucide:palette',
    component: ColorGenerator,
  },
  {
    title: '字体大小',
    subtitle: '调整界面字体以获得最佳阅读体验',
    icon: 'lucide:type',
    component: FontSettings,
  },
  {
    title: '实验性内容',
    subtitle: '尝试仍在开发的新功能',
    icon: 'lucide:flask-conical',
    component: ExperimentalFeatures,
  },
  {
    title: '快捷操作',
    subtitle: '快速管理您的个性化配置',
    icon: 'lucide:zap',
    component: QuickActions,
  },
];

function SettingsContainer() {
  return (
    <div className={styles.container}>
      {SettingItems.map((item) => (
        <div className={styles.settingCard}>
          <div className={styles.cardHeader}>
            <Icon icon={item.icon} className={styles.cardIcon} />
            <div className={styles.cardTitleGroup}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <span className={styles.cardSubtitle}>{item.subtitle}</span>
            </div>
          </div>
          <div className={styles.cardBody}>
            <item.component key={item.title} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Settings(): ReactNode {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <PageMain>
        <SettingsHeader />
        <SettingsContainer />
      </PageMain>
    </Layout>
  );
}
