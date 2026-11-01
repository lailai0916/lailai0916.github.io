import { useCallback, useEffect, type ReactNode } from 'react';
import clsx from 'clsx';
import { useClipboard } from '@lailai0916/ui';
import { trackEvent } from '@site/src/utils/analytics';
import { translate } from '@docusaurus/Translate';
import { useCodeBlockContext } from '@docusaurus/theme-common/internal';
import Button from '@theme/CodeBlock/Buttons/Button';
import type { Props } from '@theme/CodeBlock/Buttons/CopyButton';
import IconCopy from '@theme/Icon/Copy';
import IconSuccess from '@theme/Icon/Success';

import styles from './styles.module.css';

function title() {
  return translate({
    id: 'theme.CodeBlock.copy',
    message: 'Copy',
    description: 'The copy button label on code blocks',
  });
}

function ariaLabel(isCopied: boolean) {
  return isCopied
    ? translate({
        id: 'theme.CodeBlock.copied',
        message: 'Copied',
        description: 'The copied button label on code blocks',
      })
    : translate({
        id: 'theme.CodeBlock.copyButtonAriaLabel',
        message: 'Copy code to clipboard',
        description: 'The ARIA label for copy code blocks button',
      });
}

function useCopyButton() {
  const {
    metadata: { code, language },
  } = useCodeBlockContext();
  const { status, copy, reset } = useClipboard({ resetAfter: 1000 });

  useEffect(() => reset(), [code, reset]);

  const copyCode = useCallback(() => {
    void copy(code).then((result) => {
      if (result.copied) {
        trackEvent('copy_success', { surface: 'article', format: 'code', language });
      }
    });
  }, [code, language, copy]);

  return { copyCode, isCopied: status === 'copied' };
}

export default function CopyButton({ className }: Props): ReactNode {
  const { copyCode, isCopied } = useCopyButton();

  return (
    <Button
      aria-label={ariaLabel(isCopied)}
      title={title()}
      className={clsx(className, isCopied && styles.copyButtonCopied)}
      onClick={copyCode}
    >
      <span className={styles.copyButtonIcons} aria-hidden="true">
        <IconCopy className={styles.copyButtonIcon} />
        <IconSuccess className={styles.copyButtonSuccessIcon} />
      </span>
    </Button>
  );
}
