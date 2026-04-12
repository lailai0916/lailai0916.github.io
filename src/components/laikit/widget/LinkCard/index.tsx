import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import Card from '@site/src/components/laikit/widget/Card';
import styles from './styles.module.css';

type LinkCardProps = Omit<
  React.ComponentProps<typeof Link>,
  'children' | 'className'
> & {
  children: React.ReactNode;
  padding?: React.CSSProperties['padding'];
  style?: React.CSSProperties;
  className?: string;
  linkClassName?: string;
};

export default function LinkCard({
  children,
  padding,
  style,
  className,
  linkClassName,
  ...linkProps
}: LinkCardProps) {
  return (
    <Link {...linkProps} className={clsx(styles.linkCard, linkClassName)}>
      <Card
        className={clsx(styles.surface, className)}
        padding={padding}
        style={style}
      >
        {children}
      </Card>
    </Link>
  );
}
