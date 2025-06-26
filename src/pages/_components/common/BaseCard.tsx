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

const CARD_BASE_STYLES = "relative overflow-hidden cursor-pointer w-full h-full flex flex-col bg-white dark:bg-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-800/50 rounded-2xl transition-all duration-200 ease-out shadow-sm hover:shadow-lg dark:shadow-none border border-gray-200 dark:border-neutral-700 hover:border-gray-300 dark:hover:border-neutral-600";

const LINK_STYLES = "group block h-full w-full rounded-2xl outline-none focus:outline-none no-underline hover:no-underline";

const FOCUS_STYLES = {
  textDecoration: 'none',
  '--focus-ring-color': 'var(--ifm-color-primary)'
} as React.CSSProperties;

function CardContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <article className={`${CARD_BASE_STYLES} ${className}`}>
      {children}
    </article>
  );
}

// 统一的焦点处理函数
const handleFocus = (e: React.FocusEvent<HTMLElement>) => {
  e.currentTarget.style.boxShadow = '0 0 0 2px var(--ifm-color-primary)';
};

const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
  e.currentTarget.style.boxShadow = 'none';
};

export default function BaseCard({ 
  children, 
  href, 
  className = "", 
  isClickable = true,
  isExternalLink = false,
  onClick 
}: BaseCardProps) {

  // 如果有链接，渲染为链接
  if (href && isClickable) {
    if (isExternalLink) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={LINK_STYLES}
          style={FOCUS_STYLES}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          <CardContent className={className}>
            {children}
          </CardContent>
        </a>
      );
    } else {
      return (
        <Link
          to={href}
          className={LINK_STYLES}
          style={FOCUS_STYLES}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          <CardContent className={className}>
            {children}
          </CardContent>
        </Link>
      );
    }
  }

  // 如果有onClick，渲染为按钮
  if (onClick && isClickable) {
    return (
      <button
        onClick={onClick}
        className={`${LINK_STYLES} cursor-pointer`}
        style={FOCUS_STYLES}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <CardContent className={className}>
          {children}
        </CardContent>
      </button>
    );
  }

  // 普通卡片
  return (
    <CardContent className={className}>
      {children}
    </CardContent>
  );
} 
