import React from 'react';
import { Icon } from '@iconify/react';
import { COMMUNITY_LIST } from '@site/src/data/community';
import {
  BaseCard,
  Section,
  SectionHeader,
  GridLayout,
  GridConfigs,
  IconWrapper,
  TEXT_COLORS,
} from '@site/src/components/laikit/section';
import { translate } from '@docusaurus/Translate';

function CommunityCard({
  href,
  title,
  icon,
}: {
  href: string;
  title: string;
  icon: string;
}) {
  return (
    <BaseCard
      href={href}
      isExternalLink
      className="p-6 items-center justify-center"
    >
      <div className="flex flex-col items-center space-y-3">
        <IconWrapper>
          <Icon
            icon={icon}
            width="40"
            height="40"
            className="text-black dark:text-white group-hover:text-[var(--ifm-color-primary)] transition-colors duration-200"
          />
        </IconWrapper>
        <h3
          className={`font-medium text-sm ${TEXT_COLORS.PRIMARY} text-center leading-snug`}
        >
          {title}
        </h3>
      </div>
    </BaseCard>
  );
}

export default function Community() {
  return (
    <Section>
      <div className="max-w-7xl mx-auto flex flex-col px-5">
        <SectionHeader
          title={translate({
            id: 'home.community.title',
            message: 'My Community',
          })}
          description={translate({
            id: 'home.community.description',
            message:
              'Building connections in the digital world, sharing knowledge and experiences, and growing together.',
          })}
        />

        <GridLayout
          columns={GridConfigs.community}
          gap="gap-5"
          className="max-w-6xl mx-auto"
        >
          {COMMUNITY_LIST.map((link, idx) => (
            <div key={idx} className="h-full">
              <CommunityCard {...link} />
            </div>
          ))}
        </GridLayout>
      </div>
    </Section>
  );
}
