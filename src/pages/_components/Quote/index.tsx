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
    <BaseCard isClickable={false} className="tw-p-6 tw-justify-between">
      <div className="tw-flex-1 tw-flex tw-flex-col tw-justify-between tw-space-y-4">
        <header className="tw-space-y-4">
          <div className="tw-flex tw-justify-start">
            <StatusBadge status={status} />
          </div>
          <blockquote className="tw-relative" style={{ borderLeft: 'none' }}>
            <svg
              className="tw-absolute -tw-top-2 -tw-left-2 tw-w-8 tw-h-8 tw-text-gray-200 dark:tw-text-neutral-700"
              fill="currentColor"
              viewBox="0 0 32 32"
            >
              <path d="M10 8C6.691 8 4 10.691 4 14v10c0 3.309 2.691 6 6 6h6v-8h-6v-6h6V8h-6zM26 8c-3.309 0-6 2.691-6 6v10c0 3.309 2.691 6 6 6h6v-8h-6v-6h6V8h-6z" />
            </svg>
            <p
              className={`tw-relative tw-text-lg lg:tw-text-xl tw-font-medium ${TEXT_COLORS.PRIMARY} tw-leading-relaxed tw-pl-6`}
            >
              {quote}
            </p>
          </blockquote>
        </header>
        <footer className="tw-space-y-2 tw-pt-4 tw-border-t tw-border-gray-100 dark:tw-border-neutral-800">
          <div className="tw-text-right">
            <p className={`tw-font-semibold ${TEXT_COLORS.PRIMARY}`}>
              — {author}
            </p>
            <p className={`tw-text-sm ${TEXT_COLORS.SECONDARY}`}>{context}</p>
          </div>
        </footer>
      </div>
    </BaseCard>
  );
}

export default function Quote() {
  return (
    <SectionContainer>
      <div className="tw-max-w-7xl tw-mx-auto tw-flex tw-flex-col tw-px-5">
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
              className="tw-h-full"
            >
              <QuoteCard {...item} />
            </div>
          ))}
        </GridLayout>
      </div>
    </SectionContainer>
  );
}
