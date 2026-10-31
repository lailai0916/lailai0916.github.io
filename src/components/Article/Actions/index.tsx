import Hint from '@lailai0916/ui/Hint';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import Icon from '@lailai0916/ui/Icon';
import IconButton from '@lailai0916/ui/IconButton';
import CopyMarkdownButton from '../CopyMarkdownButton';
import styles from './styles.module.css';

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
      <IconButton size="xs" label={printLabel} onClick={() => window.print()}>
        <Icon icon="lucide:printer" width={16} height={16} aria-hidden />
      </IconButton>
      {editUrl && (
        <Hint label={editLabel}>
          <Link href={editUrl} aria-label={editLabel} data-lk-icon-button="xs">
            <Icon icon="lucide:pencil" width={16} height={16} aria-hidden />
          </Link>
        </Hint>
      )}
    </div>
  );
}
