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
      className={`group-hover:scale-110 transition-transform duration-200 ${className}`}
    >
      {children}
    </div>
  );
}
