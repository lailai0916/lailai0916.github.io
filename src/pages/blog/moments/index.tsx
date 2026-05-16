import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import BlogScaffold from '@site/src/theme/BlogShared/Scaffold';
import {
  BlogCard,
  MetaBar,
  type MetaBarItem,
} from '@site/src/theme/BlogShared/Components';
import IconBlock from '@site/src/components/laikit/IconBlock';
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
          <IconBlock icon="lucide:sparkles" variant="accent" size={48} />
          <div className={styles.headerInfo}>
            <h1 className={styles.title}>{TITLE}</h1>
            <p className={styles.description}>{DESCRIPTION}</p>
          </div>
          <div className={styles.count}>
            <span className={styles.countNumber}>{MOMENT_LIST.length}</span>
            <span className={styles.countLabel}>moments</span>
          </div>
        </div>
      </BlogCard>

      {MOMENT_LIST.map((moment, i) => {
        const metaItems: MetaBarItem[] = [
          {
            icon: 'lucide:calendar',
            dateTime: moment.date,
            label: formatLocalizedDate(moment.date, currentLocale),
          },
          {
            icon: 'lucide:clock',
            label: formatLocalizedTime(moment.date, currentLocale),
          },
        ];
        if (moment.location) {
          metaItems.push({
            icon: 'lucide:map-pin',
            label: moment.location,
          });
        }
        return (
          <BlogCard key={`${moment.date}-${i}`}>
            <MetaBar items={metaItems} />
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
        );
      })}
    </BlogScaffold>
  );
}
