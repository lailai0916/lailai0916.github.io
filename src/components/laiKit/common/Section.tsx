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

  return (
    <div className={containerClass} style={containerStyle}>
      <div className="flex-col gap-2 flex grow w-full my-16 mx-auto items-center">
        {children}
      </div>
    </div>
  );
}
