import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { formatLocalizedDate } from '@site/src/utils/format';
import { type MetaBarItem } from '../BlogUI';
import { useAnalytics } from '@site/src/hooks/useAnalytics';

// Hoisted so the literal `translate({ id: 'blog.post.pinned' })` only appears
// in one place across the codebase (i18n rule).
const pinnedMetaLabel = translate({
  id: 'blog.post.pinned',
  message: 'Pinned',
});
const originalMetaLabel = translate({
  id: 'blog.postcard.original',
  message: 'Original',
});

interface PostMetaInput {
  permalink: string;
  date: string;
  readingTime?: number;
  pinned?: boolean;
  lid?: string;
}

/**
 * Builds the standard set of meta-bar items used both by list-view post cards
 * and the full post-view header (date, word count, reading time, pageviews,
 * optional pinned chip).
 */
export function usePostMetaItems({
  permalink,
  date,
  readingTime,
  pinned,
  lid,
}: PostMetaInput): MetaBarItem[] {
  const { analytics, status } = useAnalytics(permalink);
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();

  const items: MetaBarItem[] = [
    {
      icon: 'lucide:calendar',
      dateTime: date,
      label: formatLocalizedDate(date, currentLocale),
    },
  ];
  if (readingTime) {
    items.push(
      {
        icon: 'lucide:file-text',
        label: translate(
          { id: 'blog.postcard.wordCount', message: '{word} words' },
          { word: Math.round(readingTime * 200) }
        ),
      },
      {
        icon: 'lucide:timer',
        label: translate(
          { id: 'blog.postcard.readingTime', message: '{readingTime} min' },
          { readingTime: Math.max(1, Math.round(readingTime)) }
        ),
      }
    );
  }
  if (status === 'success') {
    items.push({
      icon: 'lucide:eye',
      label: translate(
        { id: 'blog.postcard.viewCount', message: '{viewCount} views' },
        { viewCount: analytics.pageviews ?? '–' }
      ),
    });
  }
  // Luogu link for solution posts: the original column article, from `lid`.
  // Leads the meta bar (before the date) when present.
  if (lid) {
    items.unshift({
      icon: 'simple-icons:luogu',
      label: originalMetaLabel,
      href: `https://www.luogu.com.cn/article/${lid}`,
    });
  }
  if (pinned === true) {
    items.unshift({
      icon: 'lucide:pin',
      label: pinnedMetaLabel,
      pinned: true,
    });
  }
  return items;
}
