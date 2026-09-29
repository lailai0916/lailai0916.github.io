import { useMemo, useState } from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { translate } from '@docusaurus/Translate';
import { usePluralForm } from '@docusaurus/theme-common';
import { Icon } from '@iconify/react';
import BlogScaffold from '@site/src/theme/BlogShared/Scaffold';
import { MetaBar, type MetaBarItem } from '@site/src/theme/BlogShared/BlogUI';
import Card from '@lailai0916/ui/Card';
import IconBlock from '@lailai0916/ui/IconBlock';
import ShareCard from '@lailai0916/ui/ShareCard';
import { getMomentList } from '@site/src/data/moments';
import { useImageStatus } from '@lailai0916/ui';
import { useVisitorTimeZone } from '@site/src/hooks/useVisitorTimeZone';
import { formatLocalDate, formatLocalTime } from '@site/src/utils/dateTime';
import styles from './styles.module.css';

const PAGE_SIZE = 20;

const TITLE = translate({
  id: 'pages.moments.title',
  message: 'Moments',
});
const DESCRIPTION = translate({
  id: 'pages.moments.description',
  message: 'Share life, anytime, anywhere',
});
const COUNT_LABEL = translate({
  id: 'pages.moments.countLabel',
  message: 'moment|moments',
});
const LOAD_MORE_LABEL = translate({
  id: 'pages.moments.loadMore',
  message: 'Load more',
});
const NO_MORE_LABEL = translate({
  id: 'pages.moments.noMore',
  message: 'No more moments',
});

function MomentImage({ src }: { src: string }) {
  const { imgRef, status, onLoad, onError } = useImageStatus(src);

  if (status === 'error') {
    return (
      <span className={clsx(styles.momentImage, styles.momentImageFallback)} aria-hidden="true">
        <Icon icon="lucide:image-off" />
      </span>
    );
  }

  return (
    <img
      ref={imgRef}
      src={src}
      alt=""
      className={styles.momentImage}
      loading="lazy"
      decoding="async"
      data-zoomable
      onLoad={onLoad}
      onError={onError}
    />
  );
}

export default function Moments() {
  const {
    i18n: { currentLocale, defaultLocale },
  } = useDocusaurusContext();
  const { selectMessage } = usePluralForm();
  const timeZone = useVisitorTimeZone();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const localeKey = currentLocale === defaultLocale ? undefined : currentLocale;
  const moments = useMemo(() => getMomentList(localeKey), [localeKey]);
  const totalCount = moments.length;
  const visibleMoments = moments.slice(0, visibleCount);
  const hasMore = visibleCount < totalCount;

  return (
    <BlogScaffold title={TITLE} description={DESCRIPTION}>
      <Card>
        <div className={styles.headerCard}>
          <IconBlock icon="lucide:aperture" variant="accent" size={48} />
          <div className={styles.headerInfo}>
            <h1 className={styles.title}>{TITLE}</h1>
            <p className={styles.description}>{DESCRIPTION}</p>
          </div>
          <div className={styles.count}>
            <span className={styles.countNumber}>{moments.length}</span>
            <span className={styles.countLabel}>{selectMessage(moments.length, COUNT_LABEL)}</span>
          </div>
        </div>
      </Card>

      {visibleMoments.map((moment, i) => {
        const metaItems: MetaBarItem[] = [
          {
            icon: 'lucide:calendar',
            dateTime: moment.date,
            label: formatLocalDate(moment.date, currentLocale, timeZone),
          },
          {
            icon: 'lucide:clock',
            label: formatLocalTime(moment.date, currentLocale, timeZone),
          },
        ];
        if (moment.event) {
          metaItems.push({
            icon: 'lucide:flag',
            label: moment.event,
          });
        }
        if (moment.location) {
          metaItems.push({
            icon: 'lucide:map-pin',
            label: moment.location,
          });
        }
        return (
          <Card key={`${moment.date}-${i}`}>
            <MetaBar items={metaItems} />
            {moment.content && (
              <div
                className={styles.momentContent}
                dangerouslySetInnerHTML={{ __html: moment.content }}
              />
            )}
            {moment.share && <ShareCard {...moment.share} />}
            {moment.images && moment.images.length > 0 && (
              <div className={styles.momentImages} data-count={moment.images.length}>
                {moment.images.map((image) => (
                  <MomentImage key={image} src={image} />
                ))}
              </div>
            )}
          </Card>
        );
      })}

      <div className={styles.loadMore}>
        {hasMore ? (
          <button
            type="button"
            className={styles.loadMoreLink}
            onClick={() => setVisibleCount((c) => Math.min(c + PAGE_SIZE, totalCount))}
          >
            {LOAD_MORE_LABEL}
          </button>
        ) : (
          totalCount > PAGE_SIZE && <span className={styles.loadMoreDone}>{NO_MORE_LABEL}</span>
        )}
      </div>
    </BlogScaffold>
  );
}
