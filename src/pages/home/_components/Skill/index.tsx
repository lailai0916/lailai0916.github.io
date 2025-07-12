import React from 'react';
import { SKILL_LIST } from '@site/src/data/skills';
import {
  BaseCard,
  Section,
  SectionHeader,
  GridLayout,
  GridConfigs,
  IconWrapper,
  TEXT_COLORS,
} from '../common';
import { translate } from '@docusaurus/Translate';

function SkillCard({ title, icon }: { title: string; icon: string }) {
  return (
    <BaseCard isClickable={false} className="p-6 items-center justify-center">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="flex justify-center items-center h-12 w-12">
          <IconWrapper>
            <img
              src={`https://skillicons.dev/icons?i=${icon}&theme=light#gh-light-mode-only`}
              alt={title}
              className="w-12 h-12 object-contain"
            />
            <img
              src={`https://skillicons.dev/icons?i=${icon}&theme=dark#gh-dark-mode-only`}
              alt={title}
              className="w-12 h-12 object-contain"
            />
          </IconWrapper>
        </div>
        <h3
          className={`font-semibold text-lg ${TEXT_COLORS.PRIMARY} leading-snug`}
        >
          {title}
        </h3>
      </div>
    </BaseCard>
  );
}

export default function Skill() {
  return (
    <Section>
      <div className="max-w-7xl mx-auto flex flex-col px-5">
        <SectionHeader
          title={translate({
            id: 'home.skill.title',
            message: 'My Skills',
          })}
          description={translate({
            id: 'home.skill.description',
            message:
              'Building technical skills is a continuous journey — every skill is a practical tool for solving problems.',
          })}
        />

        <GridLayout columns={GridConfigs.skills} gap="gap-4">
          {SKILL_LIST.map((tech, idx) => (
            <div key={idx} className="h-full">
              <SkillCard {...tech} />
            </div>
          ))}
        </GridLayout>
      </div>
    </Section>
  );
}
