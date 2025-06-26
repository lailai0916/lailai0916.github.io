import React from 'react';

export type FeatureItem = {
  title: string;
  url: string;
  icon: string;
  image: {
    src: string;
    width: number;
    height: number;
  };
  text: React.JSX.Element;
};

export const FEATURES: FeatureItem[] = [
  {
    title: '竞赛',
    url: 'docs/contest',
    icon: 'lucide:trophy',
    image: {
      src: '/img/undraw_typewriter.svg',
      width: 1009.54,
      height: 717.96,
    },
    text: (
      <div>
        竞赛（Contest）板块涵盖信息学奥林匹克竞赛相关的基础知识、常见题型、解题思路，以及代码模板和参赛经验。
        内容聚焦实际竞赛环境，强调算法技巧、编程实践和竞赛能力的综合提升。
      </div>
    ),
  },
  {
    title: '笔记',
    url: 'docs/note',
    icon: 'lucide:notebook-pen',
    image: {
      src: '/img/undraw_react.svg',
      width: 1108,
      height: 731.18,
    },
    text: (
      <div>
        笔记（Note）板块整理了数学、编程、技术、外语等多个学科的学习笔记、知识梳理与个人的思考总结。
        内容涵盖不同学科的核心知识点与实用技巧，系统反映个人学习与理解过程。
      </div>
    ),
  },
  {
    title: '项目',
    url: 'docs/project',
    icon: 'lucide:folder-code',
    image: {
      src: '/img/undraw_version_control.svg',
      width: 1038.23,
      height: 693.31,
    },
    text: (
      <div>
        项目（Project）板块集合了个人在编程和技术实践中的各类项目成果，提供实用的模板、工具以及相关技术资料。
        项目内容关注具体场景的应用与探索，兼顾技术学习、实践开发和经验积累。
      </div>
    ),
  },
];

export default FEATURES;
