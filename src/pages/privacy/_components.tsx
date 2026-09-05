import { Icon } from '@iconify/react';
import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Card from '@site/src/components/laikit/Card';
import { formatCalendarDate } from '@site/src/utils/dateTime';
import styles from './styles.module.css';

const LAST_UPDATED_DATE = '2026-08-22';
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

export function PrivacyLastUpdated() {
  const { i18n } = useDocusaurusContext();

  return (
    <div className={styles.lastUpdated}>
      <span>{LAST_UPDATED_LABEL}</span>
      <time dateTime={LAST_UPDATED_DATE}>
        {formatCalendarDate(LAST_UPDATED_DATE, i18n.currentLocale)}
      </time>
    </div>
  );
}

export function PrivacySummary() {
  return (
    <aside className={styles.summary}>
      <Card padding="1.25rem">
        <span className={styles.summaryEyebrow}>
          {translate({
            id: 'pages.privacy.summary.title',
            message: 'Privacy at a glance',
          })}
        </span>
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
        <a className={styles.contactLink} href="mailto:lailai0x394@gmail.com">
          {translate({
            id: 'pages.privacy.summary.contact',
            message: 'Contact about privacy',
          })}
          <Icon icon="lucide:arrow-up-right" aria-hidden />
        </a>
      </Card>
    </aside>
  );
}
