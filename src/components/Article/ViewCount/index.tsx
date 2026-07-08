import { translate } from '@docusaurus/Translate';
import { usePluralForm } from '@docusaurus/theme-common';
import { Icon } from '@iconify/react';
import { useAnalytics } from '@site/src/hooks/useAnalytics';
import shared from '../styles.module.css';

// Umami pageview count for the current article path, styled like the other
// article-chrome meta items. Renders nothing until the fetch succeeds, so the
// count never flashes a placeholder (mirrors the blog meta bar's behaviour).
export default function ViewCount({ path }: { path: string }) {
  const { analytics, status } = useAnalytics(path);
  const { selectMessage } = usePluralForm();

  if (status !== 'success') return null;

  const count = analytics.pageviews ?? 0;
  return (
    <span className={shared.metaItem}>
      <Icon icon="lucide:eye" width={14} height={14} />
      {selectMessage(
        count,
        translate(
          {
            id: 'components.article.viewCount',
            message: '{viewCount} view|{viewCount} views',
          },
          { viewCount: count }
        )
      )}
    </span>
  );
}
