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
  'relative overflow-hidden cursor-pointer w-full h-full flex flex-col',
  'bg-white dark:bg-neutral-900',
  'hover:bg-gray-50 dark:hover:bg-neutral-800/50',
  'rounded-2xl transition-all duration-200 ease-out',
  'shadow-sm hover:shadow-lg dark:shadow-none',
  'border border-gray-200 dark:border-neutral-700',
  'hover:border-gray-300 dark:hover:border-neutral-600',
].join(' ');

const LINK_STYLES =
  'group block h-full w-full rounded-2xl outline-none focus:outline-none no-underline hover:no-underline';

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
        className={`${LINK_STYLES} cursor-pointer`}
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
