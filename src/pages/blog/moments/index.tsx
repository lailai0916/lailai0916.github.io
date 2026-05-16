import React from 'react';
import { Icon } from '@iconify/react';
import BlogScaffold from '@site/src/theme/BlogShared/Scaffold';
import { BlogCard } from '@site/src/theme/BlogShared/Components';
import { MOMENT_LIST } from '@site/src/data/moments';
import styles from './styles.module.css';

const TITLE = 'Moments';
const DESCRIPTION = 'Share life, anytime, anywhere';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatTime(iso: string): string | null {
  const d = new Date(iso);
  if (d.getHours() === 0 && d.getMinutes() === 0) return null;
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

type MomentGroup = {
  year: number;
  items: typeof MOMENT_LIST;
};

function groupByYear(moments: typeof MOMENT_LIST): MomentGroup[] {
  const map = new Map<number, typeof MOMENT_LIST>();
  for (const moment of moments) {
    const year = new Date(moment.date).getFullYear();
    if (!map.has(year)) map.set(year, []);
    map.get(year)!.push(moment);
  }
  return Array.from(map.entries())
    .sort((a, b) => b[0] - a[0])
    .map(([year, items]) => ({ year, items }));
}

export default function Moments() {
  const groups = groupByYear(MOMENT_LIST);

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

      {groups.map((group) => (
        <React.Fragment key={group.year}>
          <div className={styles.yearLabel}>
            <span className={styles.yearText}>{group.year}</span>
            <span className={styles.yearLine} />
            <span className={styles.yearCount}>
              {group.items.length}{' '}
              {group.items.length === 1 ? 'moment' : 'moments'}
            </span>
          </div>

          {group.items.map((moment, i) => {
            const time = formatTime(moment.date);
            return (
              <BlogCard key={`${moment.date}-${i}`}>
                <div className={styles.momentMeta}>
                  <Icon
                    icon="lucide:calendar"
                    className={styles.momentMetaIcon}
                    aria-hidden="true"
                  />
                  <span>{formatDate(moment.date)}</span>
                  {time && (
                    <>
                      <span className={styles.momentDot}>·</span>
                      <span>{time}</span>
                    </>
                  )}
                </div>
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
        </React.Fragment>
      ))}
    </BlogScaffold>
  );
}
