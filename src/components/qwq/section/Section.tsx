import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  background?: 'default' | 'alt' | null;
}

export default function Section({ children, background = null }: SectionProps) {
  const containerClass = 'mx-auto flex flex-col w-full';

  const containerStyle = {
    contain: 'content' as const,
  };

  // 根据 background 属性应用不同的背景样式
  const getBackgroundClass = () => {
    switch (background) {
      case 'alt':
        return 'bg-gray-50 dark:bg-neutral-900/50';
      case 'default':
        return 'bg-white dark:bg-neutral-900';
      default:
        return '';
    }
  };

  return (
    <div className={`${containerClass} ${getBackgroundClass()}`} style={containerStyle}>
      <div className="flex-col gap-2 flex grow w-full my-16 mx-auto items-center">
        {children}
      </div>
    </div>
  );
}
