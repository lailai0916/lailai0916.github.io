import React from 'react';
import { BaseCard, Section, SectionHeader, StatusBadge, GridLayout, GridConfigs, TEXT_COLORS } from '../common';
import { favoriteQuotes } from '@site/src/data/quotes';

function QuoteCard({ quote, author, context, category }: { quote: string; author: string; context: string; category: { text: string; color: string } }) {
  return (
    <BaseCard isClickable={false} className="p-6 justify-between">
      <div className="flex-1 flex flex-col justify-between space-y-4">
        <header className="space-y-4">
          <div className="flex justify-start">
            <StatusBadge status={category} />
          </div>
          <blockquote className="relative" style={{ borderLeft: 'none' }}>
            <svg className="absolute -top-2 -left-2 w-8 h-8 text-gray-200 dark:text-neutral-700" fill="currentColor" viewBox="0 0 32 32">
              <path d="M10 8C6.691 8 4 10.691 4 14v10c0 3.309 2.691 6 6 6h6v-8h-6v-6h6V8h-6zM26 8c-3.309 0-6 2.691-6 6v10c0 3.309 2.691 6 6 6h6v-8h-6v-6h6V8h-6z" />
            </svg>
            <p className={`relative text-lg lg:text-xl font-medium ${TEXT_COLORS.PRIMARY} leading-relaxed pl-6`}>{quote}</p>
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
    <Section>
      <div className="max-w-7xl mx-auto flex flex-col px-5">
        <SectionHeader title="思想启迪" description="智者的话语如明灯，照亮前行的道路。这些箴言见证着思想的力量" />

        <GridLayout columns={GridConfigs.quotes}>
          {favoriteQuotes.map((item) => (
            <div key={`${item.author}-${item.quote.slice(0, 10)}`} className="h-full">
              <QuoteCard {...item} />
            </div>
          ))}
        </GridLayout>
      </div>
    </Section>
  );
}
