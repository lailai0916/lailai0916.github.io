import React from 'react';

export default function SectionMain({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="mx-auto flex flex-col w-full"
      style={{ contain: 'content' as const }}
    >
      <div className="flex-col gap-2 flex grow w-full my-16 mx-auto items-center px-4">
        {children}
      </div>
    </div>
  );
}
