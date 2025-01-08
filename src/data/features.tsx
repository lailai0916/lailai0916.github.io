export type FeatureItem = {
  title: string;
  url: string;
  image: {
    src: string;
    width: number;
    height: number;
  };
  text: JSX.Element;
};

export const FEATURES: FeatureItem[] = [
  {
    title: '竞赛',
    url: '/docs/contest',
    image: {
      src: '/img/undraw_typewriter.svg',
      width: 1009.54,
      height: 717.96,
    },
    text: (
      <div>
        信息学奥林匹克竞赛（OI）在中国起源于 1984 年，是五大高中学科竞赛之一。
        国际大学生程序设计竞赛（ICPC）由 ICPC 基金会举办，是最具影响力的大学生计算机竞赛。
      </div>
    ),
  },
  {
    title: '笔记',
    url: '/docs/note',
    image: {
      src: '/img/undraw_react.svg',
      width: 1108,
      height: 731.18,
    },
    text: (
      <div>
        笔记（Note）板块记录了多个学科的学习成果与心得，包括数学、科学、外语等。
        这里汇聚了丰富的知识点和实践经验，为多领域的学习与应用提供了系统支持，是你探索新知的可靠伙伴。
      </div>
    ),
  },
  {
    title: '项目',
    url: '/docs/project',
    image: {
      src: '/img/undraw_version_control.svg',
      width: 1038.23,
      height: 693.31,
    },
    text: (
      <div>
        项目（Project）板块汇集了丰富的资源和实践成果，包括实用的模板工具，以及各类编程项目和学习资料。
        无论是学习还是开发，这里都能为你提供灵感和支持，助你在不同领域中高效前行。
      </div>
    ),
  },
];

export default FEATURES;
