import { translate } from '@docusaurus/Translate';
import { STATUS_COLORS } from '@site/src/pages/_components/common/constants';

export const projects = [
  {
    title: "lailai's Home",
    description: translate({ id: 'data.project.p1.description', message: 'My personal website for sharing technical notes, project experience, and learning insights.' }),
    link: 'https://github.com/lailai0916/lailai0916.github.io',
    tech: 'TypeScript • Docusaurus',
    status: { text: '维护中', color: STATUS_COLORS.ORANGE },
  },
  {
    title: 'iGame',
    description: translate({ id: 'data.project.p2.description', message: 'A collection of terminal mini-games developed in C++, featuring a variety of classic gameplay.' }),
    link: '/docs/project/terminal/iGame',
    tech: 'C++ • Terminal',
    status: { text: '更新中', color: STATUS_COLORS.GREEN },
  },
  {
    title: 'laiKit',
    description: translate({ id: 'data.project.p3.description', message: 'A unified, simple, and modern UI component library for building clean interface experiences.' }),
    link: '',
    tech: 'TypeScript • React',
    status: { text: '敬请期待', color: STATUS_COLORS.BLUE },
  },
];
