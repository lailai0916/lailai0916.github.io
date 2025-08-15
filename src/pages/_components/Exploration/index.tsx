import React from 'react';
import { Icon } from '@iconify/react';
import {
  BaseCard,
  SectionContainer,
  SectionHeader,
  StatusBadge,
  IconWrapper,
  GridLayout,
  GridConfigs,
  TEXT_COLORS,
} from '@site/src/components/laikit/section';
import { translate } from '@docusaurus/Translate';
import { EXPLORATION_LIST } from '@site/src/data/explorations';

// 文本截断样式
const TEXT_CLAMP_STYLES = {
  description: {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: '1.625',
    minHeight: '3.25em', // 1.625 * 2
  } as React.CSSProperties,
};

// 样式类名配置
const CARD_STYLE_CLASSES = {
  title: 'tw-font-semibold tw-text-xl',
  skillTag:
    'tw-inline-flex tw-items-center tw-px-2 tw-py-1 tw-rounded-md tw-text-xs tw-font-medium tw-bg-gray-100 dark:tw-bg-neutral-800 tw-text-gray-700 dark:tw-text-neutral-300',
};

function ExplorationCard({
  title,
  icon,
  description,
  status,
  skills,
}: {
  title: string;
  icon: string;
  description: string;
  status: { text: string; color: string };
  skills: string[];
}) {
  return (
    <BaseCard isClickable={false} className="tw-p-6">
      <div className="tw-flex-1 tw-space-y-4">
        <header className="tw-space-y-3">
          <div className="tw-flex tw-items-center tw-justify-between">
            <div className="tw-flex tw-items-center tw-gap-3">
              <IconWrapper>
                <Icon
                  icon={icon}
                  width={32}
                  height={32}
                  className="tw-text-gray-700 dark:tw-text-neutral-300"
                />
              </IconWrapper>
              <div>
                <h3
                  className={`${CARD_STYLE_CLASSES.title} ${TEXT_COLORS.PRIMARY} tw-leading-snug`}
                >
                  {title}
                </h3>
              </div>
            </div>
            <StatusBadge status={status} />
          </div>
          <p
            className={`${TEXT_COLORS.SECONDARY} tw-leading-relaxed`}
            style={TEXT_CLAMP_STYLES.description}
          >
            {description}
          </p>
        </header>
        <footer className="tw-pt-2">
          <div className="tw-flex tw-flex-wrap tw-gap-2">
            {skills.map((skill) => (
              <span key={skill} className={CARD_STYLE_CLASSES.skillTag}>
                {skill}
              </span>
            ))}
          </div>
        </footer>
      </div>
    </BaseCard>
  );
}

export default function Exploration() {
  return (
    <SectionContainer>
      <div className="tw-max-w-7xl tw-mx-auto tw-flex tw-flex-col tw-px-5">
        <SectionHeader
          title={translate({
            id: 'home.exploration.title',
            message: 'Current Exploration',
          })}
          description={translate({
            id: 'home.exploration.description',
            message:
              'Stay curious and keep exploring new fields — every learning journey is a bold step into the unknown.',
          })}
        />
        <GridLayout columns={GridConfigs.exploration}>
          {EXPLORATION_LIST.map((item, idx) => (
            <div key={idx} className="tw-h-full">
              <ExplorationCard {...item} />
            </div>
          ))}
        </GridLayout>
      </div>
    </SectionContainer>
  );
}
