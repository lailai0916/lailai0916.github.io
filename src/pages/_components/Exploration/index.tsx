import React from 'react';
import { Icon } from '@iconify/react';
import {
  BaseCard,
  Section,
  SectionHeader,
  StatusBadge,
  IconWrapper,
  GridLayout,
  GridConfigs,
  TEXT_COLORS,
} from '../../../components/laiKit/common';
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
  title: 'font-semibold text-xl',
  skillTag:
    'inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-neutral-300',
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
    <BaseCard isClickable={false} className="p-6">
      <div className="flex-1 space-y-4">
        <header className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <IconWrapper>
                <Icon
                  icon={icon}
                  width={32}
                  height={32}
                  className="text-gray-700 dark:text-neutral-300"
                />
              </IconWrapper>
              <div>
                <h3
                  className={`${CARD_STYLE_CLASSES.title} ${TEXT_COLORS.PRIMARY} leading-snug`}
                >
                  {title}
                </h3>
              </div>
            </div>
            <StatusBadge status={status} />
          </div>
          <p
            className={`${TEXT_COLORS.SECONDARY} leading-relaxed`}
            style={TEXT_CLAMP_STYLES.description}
          >
            {description}
          </p>
        </header>
        <footer className="pt-2">
          <div className="flex flex-wrap gap-2">
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
    <Section>
      <div className="max-w-7xl mx-auto flex flex-col px-5">
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
            <div key={idx} className="h-full">
              <ExplorationCard {...item} />
            </div>
          ))}
        </GridLayout>
      </div>
    </Section>
  );
}
