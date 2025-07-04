import { STATUS_COLORS } from '@site/src/pages/_components/common/constants';

export const exploringItems = [
  {
    name: '算法竞赛',
    icon: 'lucide:trophy',
    description: '参与算法竞赛，深入学习数据结构与算法，提升逻辑思维能力与问题解决技巧。',
    progress: { text: '进行中', color: STATUS_COLORS.ORANGE },
    skills: ['数据结构', '算法优化', '竞赛策略'],
  },
  {
    name: 'Docusaurus',
    icon: 'lucide:book-open',
    description: '使用 Docusaurus 构建统一、简约、现代的个人网站，探索文档工程化的最佳实践。',
    progress: { text: '深化中', color: STATUS_COLORS.PURPLE },
    skills: ['React', 'TypeScript', 'MDX'],
  },
  {
    name: 'AI 模型',
    icon: 'lucide:bot',
    description: '深入探索人工智能模型的工作原理，实践机器学习技术在实际场景中的应用。',
    progress: { text: '探索中', color: STATUS_COLORS.BLUE },
    skills: ['机器学习', '深度学习', '模型部署'],
  },
  {
    name: '英语语法',
    icon: 'lucide:pencil',
    description: '系统学习英语语法规则，掌握语言结构逻辑，提升技术文档阅读与写作能力。',
    progress: { text: '学习中', color: STATUS_COLORS.GREEN },
    skills: ['语法结构', '技术写作', '学术阅读'],
  },
];
