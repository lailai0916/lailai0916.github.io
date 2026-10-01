import Icon from '@lailai0916/ui/Icon';
import { translate } from '@docusaurus/Translate';
import Button from '@lailai0916/ui/Button';

const RETRY_LABEL = translate({
  id: 'pages.insights.retry',
  message: 'Retry',
});

export default function RetryButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      size="sm"
      variant="secondary"
      leftIcon={<Icon icon="lucide:refresh-cw" aria-hidden="true" />}
      onClick={onClick}
    >
      {RETRY_LABEL}
    </Button>
  );
}
