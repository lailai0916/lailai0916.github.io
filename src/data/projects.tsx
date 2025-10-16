import { STATUS_COLORS } from '@site/src/components/laikit/section/constants';
import { translate } from '@docusaurus/Translate';

export interface ProjectItem {
  title: string;
  description: string;
  href: string;
  tech: string;
  status: { text: string; color: string };
}

export const PROJECT_LIST: ProjectItem[] = [
  {
    title: 'Luogu Saver',
    description: translate({
      id: 'data.project.p1.description',
      message:
        'A reliable platform for saving Luogu columns and clipboards, permanently free and ad-free.',
    }),
    href: 'https://www.luogu.me',
    tech: 'Node.js · MySQL',
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
    href: '/docs/project/terminal/igame',
    tech: 'C++ · Terminal',
    status: {
      text: translate({
        id: 'data.project.p2.status',
        message: 'In Development',
      }),
      color: STATUS_COLORS.CYAN,
    },
  },
  {
    title: 'laikit-UI',
    description: translate({
      id: 'data.project.p3.description',
      message:
        'A unified, simple, and modern UI component library for building clean interface experiences.',
    }),
    href: '',
    tech: 'TypeScript · React',
    status: {
      text: translate({ id: 'data.project.p3.status', message: 'Stay Tuned' }),
      color: STATUS_COLORS.ROSE,
    },
  },
];
