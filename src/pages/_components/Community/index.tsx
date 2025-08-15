import React from 'react';
import { Icon } from '@iconify/react';
import { COMMUNITY_LIST } from '@site/src/data/community';
import {
  BaseCard,
  SectionContainer,
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
      className="tw-p-6 tw-items-center tw-justify-center"
    >
      <div className="tw-flex tw-flex-col tw-items-center tw-space-y-3">
        <IconWrapper>
          <Icon
            icon={icon}
            width="40"
            height="40"
            className="tw-text-black dark:tw-text-white group-hover:tw-text-[var(--ifm-color-primary)] tw-transition-colors tw-duration-200"
          />
        </IconWrapper>
        <h3
          className={`tw-font-medium tw-text-sm ${TEXT_COLORS.PRIMARY} tw-text-center tw-leading-snug`}
        >
          {title}
        </h3>
      </div>
    </BaseCard>
  );
}

export default function Community() {
  return (
    <SectionContainer>
      <div className="tw-max-w-7xl tw-mx-auto tw-flex tw-flex-col tw-px-5">
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
          gap="tw-gap-5"
          className="tw-max-w-6xl tw-mx-auto"
        >
          {COMMUNITY_LIST.map((link, idx) => (
            <div key={idx} className="tw-h-full">
              <CommunityCard {...link} />
            </div>
          ))}
        </GridLayout>
      </div>
    </SectionContainer>
  );
}
