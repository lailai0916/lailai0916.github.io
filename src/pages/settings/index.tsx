import React, { type ReactNode } from 'react';

import {
  DebugLayout,
  PageTitle,
  PageHeader,
} from '@site/src/components/laikit/page';
import DataCard from '@site/src/components/laikit/widget/DataCard';
import { Icon } from '@iconify/react';
import {
  ThemeSettings,
  ColorGenerator,
  FontSettings,
  ExperimentalFeatures,
  QuickActions,
} from './_components';
import { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';

const TITLE = translate({
  id: 'pages.settings.title',
  message: 'Settings',
});
const DESCRIPTION = translate({
  id: 'pages.settings.description',
  message: 'Customize website features and preferences',
});
const MODIFICATION = translate({
  id: 'pages.settings.modification',
  message: 'Personalized <b>Settings</b>',
});

function SettingsHeader() {
  return (
    <PageHeader>
      <PageTitle title={MODIFICATION} description={DESCRIPTION} />
      <DataCard
        value={SettingItems.length}
        label={translate({
          id: 'pages.settings.datacard.label',
          message: 'Settings',
        })}
        icon="lucide:settings"
      />
    </PageHeader>
  );
}

const SettingItems = [
  {
    title: translate({
      id: 'pages.settings.item.theme.title',
      message: 'Theme',
    }),
    subtitle: translate({
      id: 'pages.settings.item.theme.subtitle',
      message: 'Select a theme mode that suits you',
    }),
    icon: 'lucide:monitor',
    component: ThemeSettings,
  },
  {
    title: translate({
      id: 'pages.settings.item.color.title',
      message: 'Color Generator',
    }),
    subtitle: translate({
      id: 'pages.settings.item.color.subtitle',
      message:
        'Customize the main color of the website, preview the effect in real time',
    }),
    icon: 'lucide:palette',
    component: ColorGenerator,
  },
  {
    title: translate({
      id: 'pages.settings.item.font.title',
      message: 'Font Size',
    }),
    subtitle: translate({
      id: 'pages.settings.item.font.subtitle',
      message: 'Adjust the interface font to get the best reading experience',
    }),
    icon: 'lucide:type',
    component: FontSettings,
  },
  {
    title: translate({
      id: 'pages.settings.item.experimental.title',
      message: 'Experimental Content',
    }),
    subtitle: translate({
      id: 'pages.settings.item.experimental.subtitle',
      message: 'Try new features that are still under development',
    }),
    icon: 'lucide:flask-conical',
    component: ExperimentalFeatures,
  },
  {
    title: translate({
      id: 'pages.settings.item.quickactions.title',
      message: 'Quick Actions',
    }),
    subtitle: translate({
      id: 'pages.settings.item.quickactions.subtitle',
      message: 'Quickly manage your personalized configuration',
    }),
    icon: 'lucide:zap',
    component: QuickActions,
  },
];

function Card({ title, subtitle, icon, children }) {
  return (
    <div className={styles.settingCard}>
      <div className={styles.cardHeader}>
        <Icon icon={icon} className={styles.cardIcon} />
        <div className={styles.cardTitleGroup}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <span className={styles.cardSubtitle}>{subtitle}</span>
        </div>
      </div>
      <div className={styles.cardBody}>{children}</div>
    </div>
  );
}

function SettingsContainer() {
  return (
    <div className={styles.container}>
      {SettingItems.map((item) => (
        <Card
          key={item.title}
          title={item.title}
          subtitle={item.subtitle}
          icon={item.icon}
        >
          <item.component />
        </Card>
      ))}
    </div>
  );
}

export default function Settings(): ReactNode {
  return (
    <DebugLayout title={TITLE} description={DESCRIPTION}>
      <SettingsHeader />
      <SettingsContainer />
    </DebugLayout>
  );
}
