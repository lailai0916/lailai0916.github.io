import React from 'react';

export default function SectionContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="--tw-mx-auto --tw-flex --tw-flex-col --tw-w-full"
      style={{ contain: 'content' as const }}
    >
      <div className="--tw-flex-col --tw-gap-2 --tw-flex --tw-grow --tw-w-full --tw-my-16 --tw-mx-auto --tw-items-center --tw-px-4">
        {children}
      </div>
    </div>
  );
}
