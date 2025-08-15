import React from 'react';

interface IconWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function IconWrapper({
  children,
  className = '',
}: IconWrapperProps) {
  return (
    <div
      className={`group-hover:tw-scale-110 tw-transition-transform tw-duration-200 ${className}`}
    >
      {children}
    </div>
  );
}
