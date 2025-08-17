import React from 'react';
import { translate } from '@docusaurus/Translate';
import { PROJECT_LIST } from '@site/src/data/projects';
import IconText from '@site/src/components/laikit/widget/IconText';
import BaseCard from '@site/src/components/laikit/section/BaseCard';
import SectionContainer from '@site/src/components/laikit/section/SectionContainer1';
import SectionHeader from '@site/src/components/laikit/section/SectionHeader';
import StatusBadge from '@site/src/components/laikit/section/StatusBadge';
import GridLayout, {
  GridConfigs,
} from '@site/src/components/laikit/section/GridLayout';
import { TEXT_COLORS } from '@site/src/components/laikit/section/constants';

// 文本行数控制样式 - 保证卡片高度一致性
const TEXT_CLAMP_STYLES = {
  // 标题：1行高度，超出截断
  title: {
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: '1.375',
    minHeight: '1.375em', // 确保始终占据一行高度
  } as React.CSSProperties,

  // 描述：2行高度，超出截断
  description: {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: '1.5',
    minHeight: '3em', // 确保始终占据两行高度：1.5 × 2 = 3em
  } as React.CSSProperties,

  // 技术栈：1行高度，超出截断
  tech: {
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: '1.25',
    minHeight: '1.25em', // 确保始终占据一行高度
  } as React.CSSProperties,
} as const;

// 样式类名配置 - 学习Blog的语义化命名机制
const CARD_STYLE_CLASSES = {
  titleContainer:
    '--tw-flex --tw-items-baseline --tw-justify-between --tw-gap-3',
  title:
    '--tw-font-semibold --tw-text-xl --tw-leading-snug group-hover:--tw-text-[var(--ifm-color-primary)] --tw-transition-colors --tw-duration-200',
  footer: '--tw-flex --tw-items-center --tw-gap-2 --tw-text-sm',
} as const;

/**
 * 项目卡片组件 - 采用统一的布局机制
 */
function ProjectCard({
  title,
  description,
  href,
  tech,
  status,
}: {
  title: string;
  description: string;
  href: string;
  tech: string;
  status: { text: string; color: string };
}) {
  return (
    <BaseCard href={href} className="--tw-p-6 --tw-group">
      <div className="--tw-flex-1 --tw-space-y-6">
        <header className="--tw-space-y-3">
          <div className={`${CARD_STYLE_CLASSES.titleContainer}`}>
            <h3
              className={`${CARD_STYLE_CLASSES.title} ${TEXT_COLORS.PRIMARY}`}
              style={TEXT_CLAMP_STYLES.title}
            >
              {title}
            </h3>
            <StatusBadge status={status} />
          </div>
          <p
            className={`${TEXT_COLORS.SECONDARY}`}
            style={TEXT_CLAMP_STYLES.description}
          >
            {description}
          </p>
        </header>
        <footer>
          <div
            className={`${CARD_STYLE_CLASSES.footer} ${TEXT_COLORS.SECONDARY}`}
          >
            <IconText icon="lucide:layers" colorMode="monochrome">
              <span style={TEXT_CLAMP_STYLES.tech}>{tech}</span>
            </IconText>
          </div>
        </footer>
      </div>
    </BaseCard>
  );
}

/**
 * 项目展示组件
 */
export default function Project() {
  return (
    <SectionContainer>
      <div className="--tw-max-w-7xl --tw-mx-auto --tw-flex --tw-flex-col --tw-px-5">
        <SectionHeader
          title={translate({
            id: 'home.project.title',
            message: 'My Projects',
          })}
          description={translate({
            id: 'home.project.description',
            message:
              'Turning ideas into reality through practice — every project is a product of technological exploration and innovative thinking.',
          })}
        />

        <GridLayout columns={GridConfigs.projects}>
          {PROJECT_LIST.map((project, idx) => (
            <div key={idx}>
              <ProjectCard {...project} />
            </div>
          ))}
        </GridLayout>
      </div>
    </SectionContainer>
  );
}
