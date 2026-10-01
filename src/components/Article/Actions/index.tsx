import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react';
import CopyMarkdownButton from '../CopyMarkdownButton';
import styles from './styles.module.css';
import shared from '../styles.module.css';

interface ActionsProps {
  source?: string;
  editUrl?: string;
}

const editLabel = translate({
  id: 'components.article.editPage',
  message: 'Edit this page',
});
const printLabel = translate({
  id: 'components.article.print',
  message: 'Print this page',
});

export default function Actions({ source, editUrl }: ActionsProps) {
  return (
    <div className={styles.actions}>
      {source && <CopyMarkdownButton source={source} />}
      <button
        type="button"
        onClick={() => window.print()}
        aria-label={printLabel}
        title={printLabel}
        className={clsx(shared.metaItem, shared.metaLink, shared.iconBtn, styles.printButton)}
      >
        <Icon icon="lucide:printer" width={16} height={16} />
      </button>
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
