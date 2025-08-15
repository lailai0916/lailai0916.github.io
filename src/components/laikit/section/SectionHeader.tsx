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
  const alignClass = align === 'center' ? 'tw-text-center' : 'tw-text-left';
  const maxWidthClass =
    align === 'center' ? 'tw-max-w-3xl tw-mx-auto' : 'tw-max-w-3xl';

  return (
    <div className={`${alignClass} tw-mb-12`}>
      <h2
        className={`tw-font-bold tw-text-4xl ${TEXT_COLORS.PRIMARY} tw-leading-tight tw-mb-4`}
      >
        {title}
      </h2>
      <p
        className={`tw-text-lg lg:tw-text-xl tw-text-gray-700 dark:tw-text-neutral-300 tw-leading-relaxed ${maxWidthClass}`}
      >
        {description}
      </p>
    </div>
  );
}
