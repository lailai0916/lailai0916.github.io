import { type ReactNode } from 'react';
import { Icon } from '@iconify/react';
import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { usePluginData } from '@docusaurus/useGlobalData';
import Layout from '@theme/Layout';
import MDXContent from '@theme/MDXContent';
import Button from '@site/src/components/laikit/Button';
import Card from '@site/src/components/laikit/Card';
import { PageContent, PageHeader, PageTitle } from '@site/src/components/laikit/Page';
import { formatCalendarDate, getDateKey, SHANGHAI_TIME_ZONE } from '@site/src/utils/dateTime';
import styles from './styles.module.css';

type PrivacyLastUpdateData = Record<string, number | null>;

const LAST_UPDATED_FALLBACK_DATE = '2026-08-22';
const TITLE = translate({
  id: 'pages.privacy.title',
  message: 'Privacy Policy',
});
const DESCRIPTION = translate({
  id: 'pages.privacy.description',
  message: "How lailai's Home handles your information",
});
const MODIFICATION = translate({
  id: 'pages.privacy.modification',
  message: 'Privacy <b>Policy</b>',
});
const LAST_UPDATED_LABEL = translate({
  id: 'pages.privacy.lastUpdated',
  message: 'Last updated',
});

const HIGHLIGHTS = [
  {
    icon: 'lucide:user-round-x',
    title: translate({
      id: 'pages.privacy.summary.account.title',
      message: 'No account required',
    }),
    description: translate({
      id: 'pages.privacy.summary.account.description',
      message: 'Browse the site without registering or signing in.',
    }),
  },
  {
    icon: 'lucide:badge-dollar-sign',
    title: translate({
      id: 'pages.privacy.summary.advertising.title',
      message: 'No targeted advertising',
    }),
    description: translate({
      id: 'pages.privacy.summary.advertising.description',
      message: 'Site data is not sold or used to build advertising profiles.',
    }),
  },
  {
    icon: 'lucide:sliders-horizontal',
    title: translate({
      id: 'pages.privacy.summary.control.title',
      message: 'Browser-level control',
    }),
    description: translate({
      id: 'pages.privacy.summary.control.description',
      message: 'You can clear preferences or block optional requests at any time.',
    }),
  },
];
const SUMMARY_LABEL = translate({
  id: 'pages.privacy.summary.title',
  message: 'Privacy at a glance',
});
const CONTACT_LABEL = translate({
  id: 'pages.privacy.contact.label',
  message: 'Contact about privacy',
});
const CONTACT_SUBJECT = translate({
  id: 'pages.privacy.contact.subject',
  message: "Privacy Request — lailai's Home",
});
const CONTACT_TEMPLATE = translate({
  id: 'pages.privacy.contact.template',
  message: 'Request type:\nRelated page or service:\nDetails:',
});
const CONTACT_EMAIL = `mailto:lailai0x394@gmail.com?subject=${encodeURIComponent(
  CONTACT_SUBJECT
)}&body=${encodeURIComponent(CONTACT_TEMPLATE)}`;

function PrivacyLastUpdated() {
  const { i18n } = useDocusaurusContext();
  const lastUpdateData = usePluginData('privacy-last-update') as PrivacyLastUpdateData | undefined;
  const lastUpdatedAt = lastUpdateData?.[i18n.currentLocale];
  const lastUpdatedDate =
    typeof lastUpdatedAt === 'number'
      ? getDateKey(lastUpdatedAt, SHANGHAI_TIME_ZONE)
      : LAST_UPDATED_FALLBACK_DATE;

  return (
    <div className={styles.lastUpdated}>
      <Icon icon="lucide:calendar-clock" className={styles.lastUpdatedIcon} aria-hidden />
      <div className={styles.lastUpdatedText}>
        <span>{LAST_UPDATED_LABEL}</span>
        <time dateTime={lastUpdatedDate}>
          {formatCalendarDate(lastUpdatedDate, i18n.currentLocale)}
        </time>
      </div>
    </div>
  );
}

function PrivacySummary() {
  return (
    <aside className={styles.summary} aria-label={SUMMARY_LABEL}>
      <Card padding="1.25rem">
        <ul className={styles.summaryList}>
          {HIGHLIGHTS.map((item) => (
            <li className={styles.summaryItem} key={item.title}>
              <Icon icon={item.icon} className={styles.summaryIcon} aria-hidden />
              <div>
                <strong>{item.title}</strong>
                <span>{item.description}</span>
              </div>
            </li>
          ))}
        </ul>
        <PrivacyLastUpdated />
      </Card>
    </aside>
  );
}

function PrivacyContact() {
  return (
    <Button
      variant="secondary"
      leftIcon={<Icon icon="lucide:mail" width={16} height={16} />}
      onClick={() => {
        window.location.href = CONTACT_EMAIL;
      }}
    >
      {CONTACT_LABEL}
    </Button>
  );
}

export function PrivacyPage({ children }: { children: ReactNode }): ReactNode {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <PageHeader>
        <PageTitle title={MODIFICATION} description={DESCRIPTION} />
        <PrivacyContact />
      </PageHeader>
      <PageContent className={styles.policyLayout}>
        <PrivacySummary />
        <div className="markdown">
          <MDXContent>{children}</MDXContent>
        </div>
      </PageContent>
    </Layout>
  );
}
