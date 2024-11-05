export type FeatureItem = {
  title: string;
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
    image: {
      src: '/img/undraw_typewriter.svg',
      width: 200,
      height: 200,
    },
    text: (
      <div>
        信息学奥林匹克竞赛（OI）在中国起源于 1984 年，是五大高中学科竞赛之一。
        国际大学生程序设计竞赛（ICPC）由 ICPC 基金会举办，是最具影响力的大学生计算机竞赛。
      </div>
    ),
  },
  {
    title: '数学',
    image: {
      src: '/img/undraw_react.svg',
      width: 200,
      height: 200,
    },
    text: (
      <div>
        数学（Mathematics）是研究数量、结构以及空间等概念及其变化的一门学科，属于形式科学的一种。
        数学利用抽象化和逻辑推理，从计数、计算、量度、对物体形状及运动的观察发展而成。
      </div>
    ),
  },
  {
    title: '项目',
    image: {
      src: '/img/undraw_version_control.svg',
      width: 200,
      height: 200,
    },
    text: (
      <div>
        项目板块汇集了丰富的资源和实践成果，包括实用的模板，全面的网站索引，以及各类编程项目和学习资料。
        无论是学习还是开发，这里都能为你提供灵感和支持，助你在不同领域中高效前行。
      </div>
    ),
  },
];

export default FEATURES;
