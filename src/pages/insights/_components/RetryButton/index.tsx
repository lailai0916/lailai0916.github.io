import { Icon } from '@iconify/react';
import { translate } from '@docusaurus/Translate';
import Button from '@site/src/components/laikit/Button';

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
