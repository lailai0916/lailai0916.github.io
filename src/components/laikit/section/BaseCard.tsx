import React from 'react';
import Link from '@docusaurus/Link';

interface BaseCardProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  isClickable?: boolean;
  isExternalLink?: boolean;
  onClick?: () => void;
}

// 统一的卡片样式
const CARD_BASE_STYLES = [
  'tw-relative tw-overflow-hidden tw-cursor-pointer tw-w-full tw-h-full tw-flex tw-flex-col',
  'tw-bg-white dark:tw-bg-neutral-900',
  'hover:tw-bg-gray-50 dark:hover:tw-bg-neutral-800/50',
  'tw-rounded-2xl tw-transition-all tw-duration-200 tw-ease-out',
  'tw-shadow-sm hover:tw-shadow-lg dark:tw-shadow-none',
  'tw-border tw-border-gray-200 dark:tw-border-neutral-700',
  'hover:tw-border-gray-300 dark:hover:tw-border-neutral-600',
].join(' ');

const LINK_STYLES =
  'tw-group tw-block tw-h-full tw-w-full tw-rounded-2xl tw-outline-none focus:tw-outline-none tw-no-underline hover:tw-no-underline';

const FOCUS_STYLES: React.CSSProperties = {
  textDecoration: 'none',
};

// 统一的焦点处理
const focusHandlers = {
  onFocus: (e: React.FocusEvent<HTMLElement>) => {
    e.currentTarget.style.boxShadow = '0 0 0 2px var(--ifm-color-primary)';
  },
  onBlur: (e: React.FocusEvent<HTMLElement>) => {
    e.currentTarget.style.boxShadow = 'none';
  },
};

// 卡片内容组件
function CardContent({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article className={`${CARD_BASE_STYLES} ${className}`}>{children}</article>
  );
}

export default function BaseCard({
  children,
  href,
  className = '',
  isClickable = true,
  isExternalLink = false,
  onClick,
}: BaseCardProps) {
  // 非交互式卡片
  if (!isClickable) {
    return <CardContent className={className}>{children}</CardContent>;
  }

  // 带链接的卡片
  if (href) {
    const LinkComponent = isExternalLink ? 'a' : Link;
    const linkProps = isExternalLink
      ? { href, target: '_blank', rel: 'noopener noreferrer' }
      : { to: href };

    return (
      <LinkComponent
        {...linkProps}
        className={LINK_STYLES}
        style={FOCUS_STYLES}
        {...focusHandlers}
      >
        <CardContent className={className}>{children}</CardContent>
      </LinkComponent>
    );
  }

  // 带点击事件的卡片
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`${LINK_STYLES} tw-cursor-pointer`}
        style={FOCUS_STYLES}
        {...focusHandlers}
      >
        <CardContent className={className}>{children}</CardContent>
      </button>
    );
  }

  // 默认情况（不应该到达这里）
  return <CardContent className={className}>{children}</CardContent>;
}
