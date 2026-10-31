import Icon from '@lailai0916/ui/Icon';
import { translate } from '@docusaurus/Translate';
import Button from '@lailai0916/ui/Button';

const RETRY_LABEL = translate({
  id: 'pages.insights.retry',
  message: 'Retry',
});
const RETRYING_LABEL = translate({
  id: 'pages.insights.retrying',
  message: 'Retrying…',
});

export default function RetryButton({
  onClick,
  busy = false,
}: {
  onClick: () => void;
  busy?: boolean;
}) {
  return (
    <Button
      size="sm"
      variant="secondary"
      leftIcon={<Icon icon="lucide:refresh-cw" aria-hidden="true" />}
      onClick={onClick}
      disabled={busy}
      aria-busy={busy}
    >
      {busy ? RETRYING_LABEL : RETRY_LABEL}
    </Button>
  );
}
