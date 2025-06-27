import React from 'react';
import { Icon } from '@iconify/react';
import { COMMUNITY_LINKS } from '../../../data/community';
import { BaseCard, Section, SectionHeader, GridLayout, GridConfigs, IconWrapper, TEXT_COLORS } from '../common';

function CommunityCard({ href, label, icon }: {
  href: string;
  label: string;
  icon: string;
}) {
  return (
    <BaseCard href={href} isExternalLink className="p-6 items-center justify-center">
      <div className="flex flex-col items-center space-y-3">
        <IconWrapper>
          <Icon 
            icon={icon} 
            width="40" 
            height="40" 
            className="text-black dark:text-white group-hover:text-[var(--ifm-color-primary)] transition-colors duration-200"
          />
        </IconWrapper>
        <h3 className={`font-medium text-sm ${TEXT_COLORS.PRIMARY} text-center leading-snug`}>
          {label}
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
          title="我的社区"
          description="在数字世界中建立连接，分享知识与经验，共同成长与进步"
        />
        
        <GridLayout columns={GridConfigs.community} gap="gap-5" className="max-w-6xl mx-auto">
          {COMMUNITY_LINKS.map((link, idx) => (
            <div key={idx} className="h-full">
              <CommunityCard {...link} />
            </div>
          ))}
        </GridLayout>
      </div>
    </Section>
  );
}
