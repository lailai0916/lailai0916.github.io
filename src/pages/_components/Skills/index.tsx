import React from 'react';
import { SKILL_LIST } from '@site/src/data/skills';
import BaseCard from '@site/src/components/laikit/section/BaseCard';
import SectionContainer from '@site/src/components/laikit/section/SectionContainer1';
import SectionHeader from '@site/src/components/laikit/section/SectionHeader';
import GridLayout, {
  GridConfigs,
} from '@site/src/components/laikit/section/GridLayout';
import IconWrapper from '@site/src/components/laikit/section/IconWrapper';
import { TEXT_COLORS } from '@site/src/components/laikit/section/constants';
import { translate } from '@docusaurus/Translate';

function SkillCard({ title, icon }: { title: string; icon: string }) {
  return (
    <BaseCard
      isClickable={false}
      className="--tw-p-6 --tw-items-center --tw-justify-center"
    >
      <div className="--tw-flex --tw-flex-col --tw-items-center --tw-text-center --tw-space-y-4">
        <div className="--tw-flex --tw-justify-center --tw-items-center --tw-h-12 --tw-w-12">
          <IconWrapper>
            <img
              src={`https://skillicons.dev/icons?i=${icon}&theme=light#gh-light-mode-only`}
              alt={title}
              className="--tw-w-12 --tw-h-12 --tw-object-contain"
            />
            <img
              src={`https://skillicons.dev/icons?i=${icon}&theme=dark#gh-dark-mode-only`}
              alt={title}
              className="--tw-w-12 --tw-h-12 --tw-object-contain"
            />
          </IconWrapper>
        </div>
        <h3
          className={`--tw-font-semibold --tw-text-lg ${TEXT_COLORS.PRIMARY} --tw-leading-snug`}
        >
          {title}
        </h3>
      </div>
    </BaseCard>
  );
}

export default function Skills() {
  return (
    <SectionContainer>
      <div className="--tw-max-w-7xl --tw-mx-auto --tw-flex --tw-flex-col --tw-px-5">
        <SectionHeader
          title={translate({
            id: 'home.skills.title',
            message: 'My Skills',
          })}
          description={translate({
            id: 'home.skills.description',
            message:
              'Building technical skills is a continuous journey — every skill is a practical tool for solving problems.',
          })}
        />

        <GridLayout columns={GridConfigs.skills} gap="--tw-gap-4">
          {SKILL_LIST.filter((skill) => skill.show).map((tech, idx) => (
            <div key={idx} className="--tw-h-full">
              <SkillCard {...tech} />
            </div>
          ))}
        </GridLayout>
      </div>
    </SectionContainer>
  );
}
