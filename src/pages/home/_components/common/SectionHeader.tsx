import React from 'react';
import { TEXT_COLORS } from './constants';

interface SectionHeaderProps {
  title: string;
  description: string;
  align?: 'left' | 'center';
}

export default function SectionHeader({
  title,
  description,
  align = 'center',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left';
  const maxWidthClass = align === 'center' ? 'max-w-3xl mx-auto' : 'max-w-3xl';

  return (
    <div className={`${alignClass} mb-12`}>
      <h2
        className={`font-bold text-4xl ${TEXT_COLORS.PRIMARY} leading-tight mb-4`}
      >
        {title}
      </h2>
      <p
        className={`text-lg lg:text-xl text-gray-700 dark:text-neutral-300 leading-relaxed ${maxWidthClass}`}
      >
        {description}
      </p>
    </div>
  );
}
