import { STATUS_COLORS } from '@site/src/components/laikit/section/constants';
import { translate } from '@docusaurus/Translate';

export type ExplorationItem = {
  title: string;
  icon: string;
  description: string;
  status: { text: string; color: string };
  skills: string[];
};

export const EXPLORATION_LIST: ExplorationItem[] = [
  {
    title: translate({
      id: 'data.exploration.p1.name',
      message: 'Algorithm Competitions',
    }),
    icon: 'lucide:trophy',
    description: translate({
      id: 'data.exploration.p1.description',
      message:
        'Participating in algorithm competitions to deepen my understanding of data structures and algorithms, while improving logical thinking and problem-solving skills.',
    }),
    status: {
      text: translate({
        id: 'data.exploration.p1.progress',
        message: 'In Progress',
      }),
      color: STATUS_COLORS.ORANGE,
    },
    skills: [
      translate({
        id: 'data.exploration.p1.skill1',
        message: 'Data Structures',
      }),
      translate({
        id: 'data.exploration.p1.skill2',
        message: 'Algorithm Optimization',
      }),
      translate({
        id: 'data.exploration.p1.skill3',
        message: 'Competition Strategies',
      }),
    ],
  },
  {
    title: translate({ id: 'data.exploration.p2.name', message: 'Docusaurus' }),
    icon: 'lucide:book-open',
    description: translate({
      id: 'data.exploration.p2.description',
      message:
        'Building a unified, simple, and modern personal website with Docusaurus, exploring best practices for documentation engineering.',
    }),
    status: {
      text: translate({
        id: 'data.exploration.p2.progress',
        message: 'Deepening',
      }),
      color: STATUS_COLORS.VIOLET,
    },
    skills: [
      translate({ id: 'data.exploration.p2.skill1', message: 'React' }),
      translate({ id: 'data.exploration.p2.skill2', message: 'TypeScript' }),
      translate({ id: 'data.exploration.p2.skill3', message: 'MDX' }),
    ],
  },
  {
    title: translate({ id: 'data.exploration.p3.name', message: 'AI Models' }),
    icon: 'lucide:bot',
    description: translate({
      id: 'data.exploration.p3.description',
      message:
        'Exploring the inner workings of AI models and applying machine learning techniques to real-world scenarios.',
    }),
    status: {
      text: translate({
        id: 'data.exploration.p3.progress',
        message: 'Exploring',
      }),
      color: STATUS_COLORS.BLUE,
    },
    skills: [
      translate({
        id: 'data.exploration.p3.skill1',
        message: 'Machine Learning',
      }),
      translate({ id: 'data.exploration.p3.skill2', message: 'Deep Learning' }),
      translate({
        id: 'data.exploration.p3.skill3',
        message: 'Model Deployment',
      }),
    ],
  },
  {
    title: translate({
      id: 'data.exploration.p4.name',
      message: 'English Grammar',
    }),
    icon: 'lucide:pencil',
    description: translate({
      id: 'data.exploration.p4.description',
      message:
        'Systematically learning English grammar rules to master language structure and improve technical documentation reading and writing skills.',
    }),
    status: {
      text: translate({
        id: 'data.exploration.p4.progress',
        message: 'Learning',
      }),
      color: STATUS_COLORS.TEAL,
    },
    skills: [
      translate({
        id: 'data.exploration.p4.skill1',
        message: 'Grammar Structure',
      }),
      translate({
        id: 'data.exploration.p4.skill2',
        message: 'Technical Writing',
      }),
      translate({
        id: 'data.exploration.p4.skill3',
        message: 'Academic Reading',
      }),
    ],
  },
];
