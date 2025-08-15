import React from 'react';
import {
  BaseCard,
  SectionContainer,
  SectionHeader,
  StatusBadge,
  GridLayout,
  GridConfigs,
  TEXT_COLORS,
} from '@site/src/components/laikit/section';
import { QUOTE_LIST } from '@site/src/data/quotes';
import { translate } from '@docusaurus/Translate';

function QuoteCard({
  quote,
  author,
  context,
  status,
}: {
  quote: string;
  author: string;
  context: string;
  status: { text: string; color: string };
}) {
  return (
    <BaseCard isClickable={false} className="p-6 justify-between">
      <div className="flex-1 flex flex-col justify-between space-y-4">
        <header className="space-y-4">
          <div className="flex justify-start">
            <StatusBadge status={status} />
          </div>
          <blockquote className="relative" style={{ borderLeft: 'none' }}>
            <svg
              className="absolute -top-2 -left-2 w-8 h-8 text-gray-200 dark:text-neutral-700"
              fill="currentColor"
              viewBox="0 0 32 32"
            >
              <path d="M10 8C6.691 8 4 10.691 4 14v10c0 3.309 2.691 6 6 6h6v-8h-6v-6h6V8h-6zM26 8c-3.309 0-6 2.691-6 6v10c0 3.309 2.691 6 6 6h6v-8h-6v-6h6V8h-6z" />
            </svg>
            <p
              className={`relative text-lg lg:text-xl font-medium ${TEXT_COLORS.PRIMARY} leading-relaxed pl-6`}
            >
              {quote}
            </p>
          </blockquote>
        </header>
        <footer className="space-y-2 pt-4 border-t border-gray-100 dark:border-neutral-800">
          <div className="text-right">
            <p className={`font-semibold ${TEXT_COLORS.PRIMARY}`}>— {author}</p>
            <p className={`text-sm ${TEXT_COLORS.SECONDARY}`}>{context}</p>
          </div>
        </footer>
      </div>
    </BaseCard>
  );
}

export default function Quote() {
  return (
    <SectionContainer>
      <div className="max-w-7xl mx-auto flex flex-col px-5">
        <SectionHeader
          title={translate({
            id: 'home.quote.title',
            message: 'Inspiring Thoughts',
          })}
          description={translate({
            id: 'home.quote.description',
            message:
              'The words of the wise are like guiding lights, illuminating the path ahead. These quotes embody the power of thought.',
          })}
        />

        <GridLayout columns={GridConfigs.quotes}>
          {QUOTE_LIST.map((item) => (
            <div
              key={`${item.author}-${item.quote.slice(0, 10)}`}
              className="h-full"
            >
              <QuoteCard {...item} />
            </div>
          ))}
        </GridLayout>
      </div>
    </SectionContainer>
  );
}
