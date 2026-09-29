import { useEffect, useMemo, useRef, useState } from 'react';
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
const IMAGES_LABEL = translate({
  id: 'pages.moments.images.ariaLabel',
  message: 'Moment images',
});
const PREVIOUS_IMAGE_LABEL = translate({
  id: 'pages.moments.images.prev',
  message: 'Previous image',
});
const NEXT_IMAGE_LABEL = translate({
  id: 'pages.moments.images.next',
  message: 'Next image',
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

function MomentGallery({ images }: { images: string[] }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollable, setScrollable] = useState({ prev: false, next: false });
  const multiple = images.length > 1;

  useEffect(() => {
    if (!multiple) return;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const update = () => {
      const maxScroll = viewport.scrollWidth - viewport.clientWidth;
      const prev = viewport.scrollLeft > 1;
      const next = viewport.scrollLeft < maxScroll - 1;
      setScrollable((current) =>
        current.prev === prev && current.next === next ? current : { prev, next }
      );
    };
    const observer = new ResizeObserver(update);
    observer.observe(viewport);
    observer.observe(track);
    viewport.addEventListener('scroll', update, { passive: true });
    update();

    return () => {
      observer.disconnect();
      viewport.removeEventListener('scroll', update);
    };
  }, [multiple]);

  const scrollImage = (direction: -1 | 1) => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const items = Array.from(track.children) as HTMLElement[];
    const center = viewport.scrollLeft + viewport.clientWidth / 2;
    const currentIndex = items.reduce((closest, item, index) => {
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const closestCenter = items[closest].offsetLeft + items[closest].offsetWidth / 2;
      return Math.abs(itemCenter - center) < Math.abs(closestCenter - center) ? index : closest;
    }, 0);
    const targetIndex = currentIndex + direction;
    const target = items[targetIndex];
    const edge = direction === 1 ? viewport.scrollWidth - viewport.clientWidth : 0;
    const left =
      !target || targetIndex === 0 || targetIndex === items.length - 1
        ? edge
        : target.offsetLeft + target.offsetWidth / 2 - viewport.clientWidth / 2;

    viewport.scrollTo({
      left,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  };

  return (
    <div className={styles.momentImages} data-count={images.length}>
      <div
        ref={viewportRef}
        className={styles.momentImageViewport}
        role={multiple ? 'group' : undefined}
        aria-label={multiple ? IMAGES_LABEL : undefined}
        tabIndex={multiple ? 0 : undefined}
      >
        <div ref={trackRef} className={styles.momentImageTrack}>
          {images.map((image) => (
            <MomentImage key={image} src={image} />
          ))}
        </div>
      </div>
      {multiple && scrollable.prev && (
        <button
          type="button"
          className={clsx(styles.imageArrow, styles.imageArrowPrev)}
          aria-label={PREVIOUS_IMAGE_LABEL}
          onClick={() => scrollImage(-1)}
        >
          <Icon icon="lucide:chevron-left" />
        </button>
      )}
      {multiple && scrollable.next && (
        <button
          type="button"
          className={clsx(styles.imageArrow, styles.imageArrowNext)}
          aria-label={NEXT_IMAGE_LABEL}
          onClick={() => scrollImage(1)}
        >
          <Icon icon="lucide:chevron-right" />
        </button>
      )}
    </div>
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
            {moment.images && moment.images.length > 0 && <MomentGallery images={moment.images} />}
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
