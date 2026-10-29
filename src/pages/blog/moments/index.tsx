import { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import { usePluralForm } from '@docusaurus/theme-common';
import Icon from '@lailai0916/ui/Icon';
import BlogScaffold from '@site/src/theme/BlogShared/Scaffold';
import { MetaBar, type MetaBarItem } from '@site/src/theme/BlogShared/BlogUI';
import ShareCard from '@lailai0916/ui/ShareCard';
import { getMomentList, type MomentPost } from '@site/src/data/moments';
import { useImageStatus } from '@lailai0916/ui';
import { useVisitorTimeZone } from '@site/src/hooks/useVisitorTimeZone';
import { formatLocalDate, formatLocalTime } from '@site/src/utils/dateTime';
import styles from './styles.module.css';

const PAGE_SIZE = 15;

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

const POST_PUBLISHED_LABEL = translate({
  id: 'pages.moments.postPublished',
  message: 'Published a new post',
});

function MomentPostPreview({ post }: { post: MomentPost }) {
  return (
    <div className={styles.postPreview}>
      <p className={styles.postPublished}>{POST_PUBLISHED_LABEL}</p>
      <h2 className={styles.postTitle}>
        <Link to={post.permalink} className={styles.postLink}>
          {post.title}
        </Link>
      </h2>
    </div>
  );
}

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
  const avatarUrl = useBaseUrl('/img/logo.svg');
  const timeZone = useVisitorTimeZone();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const localeKey = currentLocale === defaultLocale ? undefined : currentLocale;
  const moments = useMemo(() => getMomentList(localeKey), [localeKey]);
  const totalCount = moments.length;
  const visibleMoments = moments.slice(0, visibleCount);
  const hasMore = visibleCount < totalCount;

  useEffect(() => {
    const footer = loadMoreRef.current;
    if (!footer || !hasMore || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        observer.disconnect();
        setVisibleCount((count) => Math.min(count + PAGE_SIZE, totalCount));
      },
      { rootMargin: '200px 0px' }
    );
    observer.observe(footer);

    return () => observer.disconnect();
  }, [hasMore, totalCount, visibleCount]);

  return (
    <BlogScaffold title={TITLE} description={DESCRIPTION}>
      <div className={styles.page}>
        <header className={styles.header}>
          <div className={styles.headerInfo}>
            <h1 className={styles.title}>{TITLE}</h1>
            <p className={styles.description}>{DESCRIPTION}</p>
          </div>
          <span className={styles.count}>
            {totalCount} {selectMessage(totalCount, COUNT_LABEL)}
          </span>
        </header>

        <section className={styles.feed} aria-label={TITLE}>
          {visibleMoments.map((moment, i) => {
            const metaItems: MetaBarItem[] = [];
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
            const timeId = `moment-time-${i}`;
            return (
              <article
                key={`${moment.date}-${i}`}
                className={styles.moment}
                aria-labelledby={timeId}
              >
                <img src={avatarUrl} alt="" width={40} height={40} className={styles.avatar} />
                <div className={styles.momentBody}>
                  <header className={styles.momentHeader}>
                    <span className={styles.author}>lailai</span>
                    <time id={timeId} className={styles.date} dateTime={moment.date}>
                      {formatLocalDate(moment.date, currentLocale, timeZone)}
                      <span aria-hidden="true"> · </span>
                      {formatLocalTime(moment.date, currentLocale, timeZone)}
                    </time>
                  </header>
                  <div className={styles.momentMain}>
                    {moment.post && <MomentPostPreview post={moment.post} />}
                    {moment.content && (
                      <div
                        className={styles.momentContent}
                        dangerouslySetInnerHTML={{ __html: moment.content }}
                      />
                    )}
                    {moment.share && (
                      <div className={styles.attachment}>
                        <ShareCard {...moment.share} />
                      </div>
                    )}
                    {moment.images && moment.images.length > 0 && (
                      <MomentGallery images={moment.images} />
                    )}
                  </div>
                  {metaItems.length > 0 && (
                    <footer className={styles.momentDetails}>
                      <MetaBar items={metaItems} />
                    </footer>
                  )}
                </div>
              </article>
            );
          })}
        </section>

        {hasMore && (
          <div ref={loadMoreRef} className={styles.loadMore}>
            <button
              type="button"
              className={styles.loadMoreLink}
              onClick={() => setVisibleCount((c) => Math.min(c + PAGE_SIZE, totalCount))}
            >
              {LOAD_MORE_LABEL}
            </button>
          </div>
        )}
      </div>
    </BlogScaffold>
  );
}
