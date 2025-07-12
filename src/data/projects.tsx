import { STATUS_COLORS } from '@site/src/pages/home/_components/common/constants';
import { translate } from '@docusaurus/Translate';

export type ProjectItem = {
  title: string;
  description: string;
  href: string;
  tech: string;
  status: { text: string; color: string };
};

export const PROJECT_LIST: ProjectItem[] = [
  {
    title: "lailai's Home",
    description: translate({
      id: 'data.project.p1.description',
      message:
        'My personal website for sharing technical notes, project experience, and learning insights.',
    }),
    href: 'https://github.com/lailai0916/lailai0916.github.io',
    tech: 'TypeScript • Docusaurus',
    status: {
      text: translate({
        id: 'data.project.p1.status',
        message: 'Under Maintenance',
      }),
      color: STATUS_COLORS.EMERALD,
    },
  },
  {
    title: 'iGame',
    description: translate({
      id: 'data.project.p2.description',
      message:
        'A collection of terminal mini-games developed in C++, featuring a variety of classic gameplay.',
    }),
    href: '/docs/project/terminal/iGame',
    tech: 'C++ • Terminal',
    status: {
      text: translate({
        id: 'data.project.p2.status',
        message: 'In Development',
      }),
      color: STATUS_COLORS.CYAN,
    },
  },
  {
    title: 'laiKit',
    description: translate({
      id: 'data.project.p3.description',
      message:
        'A unified, simple, and modern UI component library for building clean interface experiences.',
    }),
    href: '',
    tech: 'TypeScript • React',
    status: {
      text: translate({ id: 'data.project.p3.status', message: 'Stay Tuned' }),
      color: STATUS_COLORS.ROSE,
    },
  },
];
