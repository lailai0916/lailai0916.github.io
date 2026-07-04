import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { usePluralForm } from '@docusaurus/theme-common';
import { formatCompact, formatLocalizedDate } from '@site/src/utils/format';
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
  const { selectMessage } = usePluralForm();

  const items: MetaBarItem[] = [
    {
      icon: 'lucide:calendar',
      dateTime: date,
      label: formatLocalizedDate(date, currentLocale),
    },
  ];
  if (readingTime) {
    const wordCount = Math.round(readingTime * 200);
    const readingMinutes = Math.max(1, Math.round(readingTime));
    items.push(
      {
        icon: 'lucide:file-text',
        label: selectMessage(
          wordCount,
          translate(
            { id: 'blog.postcard.wordCount', message: '{word} word|{word} words' },
            { word: formatCompact(wordCount, currentLocale) }
          )
        ),
      },
      {
        icon: 'lucide:timer',
        label: translate(
          { id: 'blog.postcard.readingTime', message: '{readingTime} min' },
          { readingTime: readingMinutes }
        ),
      }
    );
  }
  if (status === 'success') {
    const pageviews = analytics.pageviews ?? 0;
    items.push({
      icon: 'lucide:eye',
      label: selectMessage(
        pageviews,
        translate(
          { id: 'blog.postcard.viewCount', message: '{viewCount} view|{viewCount} views' },
          { viewCount: analytics.pageviews ?? '–' }
        )
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
