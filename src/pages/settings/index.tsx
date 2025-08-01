import React, { type ReactNode } from 'react';
import Layout from '@theme/Layout';

import {
  PageTitle,
  PageMain,
  PageHeader,
} from '@site/src/components/laikit/page';
import DataCard from '@site/src/components/laikit/widget/DataCard';
import styles from './styles.module.css';

import { useColorMode } from '@docusaurus/theme-common';
import clsx from 'clsx';
import IconText from '@site/src/components/laikit/widget/IconText';
import SettingCard from '@site/src/components/laikit/widget/SettingCard';

import ColorGenerator from './_components/ColorGenerator';
import FontSettings from './_components/FontSettings';
import ExperimentalFeatures from './_components/ExperimentalFeatures';
import QuickActions from './_components/QuickActions';

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

const themeOptions = [
  { key: null, label: '跟随系统', icon: 'lucide:monitor' },
  { key: 'light' as const, label: '浅色模式', icon: 'lucide:sun' },
  { key: 'dark' as const, label: '深色模式', icon: 'lucide:moon' },
];

function ThemeSettings() {
  const { colorModeChoice, setColorMode } = useColorMode();

  return (
    <SettingCard
      title="外观主题"
      subtitle="选择一个适合您的主题模式"
      icon="lucide:monitor"
    >
      <div className={styles.buttonGroup}>
        {themeOptions.map((option) => (
          <button
            key={option.key}
            className={clsx(
              styles.button,
              colorModeChoice === option.key && styles.buttonActive
            )}
            onClick={() => setColorMode(option.key)}
          >
            <IconText icon={option.icon} colorMode="monochrome">
              {option.label}
            </IconText>
          </button>
        ))}
      </div>
    </SettingCard>
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
