import React from 'react';
import { Icon } from '@iconify/react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import BlogScaffold from '@site/src/theme/BlogShared/Scaffold';
import {
  BlogCard,
  MetaBar,
  type MetaBarItem,
} from '@site/src/theme/BlogShared/Components';
import { MOMENT_LIST } from '@site/src/data/moments';
import {
  formatLocalizedDate,
  formatLocalizedTime,
} from '@site/src/utils/format';
import styles from './styles.module.css';

const TITLE = 'Moments';
const DESCRIPTION = 'Share life, anytime, anywhere';

export default function Moments() {
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();

  return (
    <BlogScaffold title={TITLE} description={DESCRIPTION}>
      <BlogCard>
        <div className={styles.headerCard}>
          <div className={styles.headerInfo}>
            <h1 className={styles.title}>
              <Icon
                icon="lucide:sparkles"
                className={styles.titleIcon}
                aria-hidden="true"
              />
              {TITLE}
            </h1>
            <p className={styles.description}>{DESCRIPTION}</p>
          </div>
          <div className={styles.count}>
            <span className={styles.countNumber}>{MOMENT_LIST.length}</span>
            <span className={styles.countLabel}>moments</span>
          </div>
        </div>
      </BlogCard>

      {MOMENT_LIST.map((moment, i) => (
        <BlogCard key={`${moment.date}-${i}`}>
          <MetaBar
            items={
              [
                {
                  icon: 'lucide:calendar',
                  dateTime: moment.date,
                  label: formatLocalizedDate(moment.date, currentLocale),
                },
                {
                  icon: 'lucide:clock',
                  label: formatLocalizedTime(moment.date, currentLocale),
                },
              ] satisfies MetaBarItem[]
            }
          />
          <div
            className={styles.momentContent}
            dangerouslySetInnerHTML={{ __html: moment.content }}
          />
          {moment.images && moment.images.length > 0 && (
            <div
              className={styles.momentImages}
              data-count={moment.images.length}
            >
              {moment.images.map((image) => (
                <img
                  key={image}
                  src={image}
                  alt=""
                  className={styles.momentImage}
                  loading="lazy"
                />
              ))}
            </div>
          )}
        </BlogCard>
      ))}
    </BlogScaffold>
  );
}
