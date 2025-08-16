import React from 'react';
import Translate, { translate } from '@docusaurus/Translate';

export interface DocsItem {
  title: string;
  url: string;
  icon: string;
  image: {
    src: string;
    width: number;
    height: number;
  };
  text: React.ReactNode;
}

export const DOCS_LIST: DocsItem[] = [
  {
    title: translate({ id: 'data.docs.p1.title', message: 'Contest' }),
    url: 'docs/contest',
    icon: 'lucide:trophy',
    image: {
      src: '/img/undraw_typewriter.svg',
      width: 1009.54,
      height: 717.96,
    },
    text: (
      <Translate id="data.docs.p1.text">
        The Contest section covers fundamental knowledge, common problem types,
        solution ideas, code templates, and competition experience related to
        Olympiad in Informatics. It focuses on real contest environments,
        emphasizing algorithmic skills, programming practice, and overall
        competitive ability.
      </Translate>
    ),
  },
  {
    title: translate({ id: 'data.docs.p2.title', message: 'Note' }),
    url: 'docs/note',
    icon: 'lucide:notebook-pen',
    image: {
      src: '/img/undraw_react.svg',
      width: 1108,
      height: 731.18,
    },
    text: (
      <Translate id="data.docs.p2.text">
        The Note section organizes learning notes, knowledge summaries, and
        personal insights across multiple disciplines, including mathematics,
        programming, technology, and languages. It systematically presents key
        concepts and practical skills, reflecting the learning and understanding
        process.
      </Translate>
    ),
  },
  {
    title: translate({ id: 'data.docs.p3.title', message: 'Project' }),
    url: 'docs/project',
    icon: 'lucide:code-2',
    image: {
      src: '/img/undraw_version_control.svg',
      width: 1038.23,
      height: 693.31,
    },
    text: (
      <Translate id="data.docs.p3.text">
        The Project section showcases various project outcomes from personal
        programming and technical practice, providing practical templates,
        tools, and relevant resources. It emphasizes real-world applications and
        exploration, combining technical learning, development practice, and
        experience accumulation.
      </Translate>
    ),
  },
];
