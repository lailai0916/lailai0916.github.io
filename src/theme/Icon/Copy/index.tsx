import { type ReactNode } from 'react';
import ClipboardIcon from 'lucide-static/icons/clipboard.svg';
import type { Props } from '@theme/Icon/Copy';

export default function IconCopy({ style, ...props }: Props): ReactNode {
  // The framework's copy-animation classes otherwise fill outlined SVGs.
  return <ClipboardIcon {...props} style={{ fill: 'none', ...style }} />;
}
