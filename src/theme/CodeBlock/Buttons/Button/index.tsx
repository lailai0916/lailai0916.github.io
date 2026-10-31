import { type ReactNode } from 'react';
import IconButton from '@lailai0916/ui/IconButton';
import type { Props } from '@theme/CodeBlock/Buttons/Button';

export default function CodeBlockButton({ className, title, ...props }: Props): ReactNode {
  return (
    <IconButton
      {...props}
      size="sm"
      label={props['aria-label'] ?? title ?? ''}
      title={title}
      className={className}
    />
  );
}
