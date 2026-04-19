import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './styles.module.css';

type BaseCardProps = {
  children: React.ReactNode;
  padding?: React.CSSProperties['padding'];
  style?: React.CSSProperties;
  className?: string;
  wrapperClassName?: string;
};

type StaticCardProps = BaseCardProps & {
  to?: never;
  href?: never;
};

type LinkedCardProps = BaseCardProps &
  Omit<React.ComponentProps<typeof Link>, 'children' | 'className' | 'style'> &
  (
    | {
        to: string;
        href?: never;
      }
    | {
        href: string;
        to?: never;
      }
  );

type CardProps = StaticCardProps | LinkedCardProps;

function CardSurface({
  children,
  padding,
  style,
  className,
}: Pick<CardProps, 'children' | 'padding' | 'style' | 'className'>) {
  return (
    <div
      className={clsx(styles.card, className)}
      style={
        padding == null
          ? style
          : ({
              ...style,
              '--card-padding': padding,
            } as React.CSSProperties)
      }
    >
      {children}
    </div>
  );
}

export default function Card({
  children,
  padding,
  style,
  className,
  wrapperClassName,
  ...linkProps
}: CardProps) {
  if (!('to' in linkProps) && !('href' in linkProps)) {
    return (
      <CardSurface className={className} padding={padding} style={style}>
        {children}
      </CardSurface>
    );
  }

  return (
    <Link {...linkProps} className={clsx(styles.linkCard, wrapperClassName)}>
      <CardSurface className={className} padding={padding} style={style}>
        {children}
      </CardSurface>
    </Link>
  );
}
