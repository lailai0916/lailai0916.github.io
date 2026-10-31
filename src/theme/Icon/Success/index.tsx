import { type ReactNode } from 'react';
import CheckIcon from 'lucide-static/icons/check.svg';
import type { Props } from '@theme/Icon/Success';

export default function IconSuccess({ style, ...props }: Props): ReactNode {
  return <CheckIcon {...props} style={{ fill: 'none', ...style }} />;
}
