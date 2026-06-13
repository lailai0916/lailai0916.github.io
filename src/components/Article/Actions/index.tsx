import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react';
import CopyMarkdownButton from '../CopyMarkdownButton';
import styles from './styles.module.css';
import shared from '../styles.module.css';

// Top-right article actions shared by blog posts and docs: a "Copy Markdown"
// button and an "Edit this page" link, both rendered as small icon buttons.
interface ActionsProps {
  source?: string;
  editUrl?: string;
}

const editLabel = translate({
  id: 'components.article.editPage',
  message: 'Edit this page',
});

export default function Actions({ source, editUrl }: ActionsProps) {
  if (!source && !editUrl) return null;
  return (
    <div className={styles.actions}>
      {source && <CopyMarkdownButton source={source} />}
      {editUrl && (
        <Link
          href={editUrl}
          aria-label={editLabel}
          title={editLabel}
          className={clsx(shared.metaItem, shared.metaLink, shared.iconBtn)}
        >
          <Icon icon="lucide:pencil" width={16} height={16} />
        </Link>
      )}
    </div>
  );
}
