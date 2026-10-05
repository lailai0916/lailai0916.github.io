import Hint from '@lailai0916/ui/Hint';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import Icon from '@lailai0916/ui/Icon';
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
      <Hint label={printLabel}>
        <button
          type="button"
          onClick={() => window.print()}
          aria-label={printLabel}
          className={clsx(shared.metaItem, shared.metaLink, shared.iconBtn, styles.printButton)}
        >
          <Icon icon="lucide:printer" width={16} height={16} />
        </button>
      </Hint>
      {editUrl && (
        <Hint label={editLabel}>
          <Link
            href={editUrl}
            aria-label={editLabel}
            className={clsx(shared.metaItem, shared.metaLink, shared.iconBtn)}
          >
            <Icon icon="lucide:pencil" width={16} height={16} />
          </Link>
        </Hint>
      )}
    </div>
  );
}
