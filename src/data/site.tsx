import {sortBy} from '@site/src/utils/jsUtils';

export type TagType =
  | 'favorite'
  | 'comprehensive'
  | 'academic'
  | 'competition'
  | 'opensource'
  | 'tutorial'
  | 'tool'
  | 'resource'
  | 'test'
  | 'personal'
  | 'video'
  | 'game'
  | 'digital'
  | 'community'
  | 'shop'
  | 'news'
  | 'social'
  | 'technology'
  | 'other';

export type User = {
  title: string;
  description: string;
  preview: string | null; // null = use our serverless screenshot service
  website: string;
  source: string | null;
  tags: TagType[];
};

export type Tag = {
  label: string;
  description: string;
  color: string;
};

const Users: User[] = [
  {
    title: 'lailai\'s home',
    description: 'This website.',
    preview: '/img/site/Home.png',
    website: 'https://www.lailai.one',
    source: 'https://github.com/lailai0916/lailai0916.github.io',
    tags: ['favorite', 'personal', 'opensource'],
  },
  {
    title: 'Google',
    description: 'Search engine.',
    preview: '/img/site/Google.png',
    website: 'https://www.google.com',
    source: null,
    tags: ['favorite', 'comprehensive'],
  },
  {
    title: '百度',
    description: 'Search engine.',
    preview: '/img/site/Baidu.png',
    website: 'https://www.baidu.com',
    source: null,
    tags: ['comprehensive'],
  },
  {
    title: '维基百科',
    description: '自由的百科全书。',
    preview: '/img/site/Wikipedia.png',
    website: 'https://zh.wikipedia.org/wiki/Wikipedia:首页',
    source: null,
    tags: ['favorite', 'comprehensive', 'resource'],
  },
  {
    title: 'ChatGPT',
    description: '人工智能。',
    preview: '/img/site/ChatGPT.png',
    website: 'https://chatgpt.com',
    source: null,
    tags: ['favorite', 'tool'],
  },
  {
    title: 'GitHub',
    description: '人工智能。',
    preview: null,
    website: 'https://github.com',
    source: null,
    tags: ['favorite', 'academic', 'tool'],
  },
  {
    title: 'Desmos',
    description: '免费使用的精美数学工具组。',
    preview: '/img/site/Desmos.png',
    website: 'https://www.desmos.com',
    source: null,
    tags: ['academic', 'tool'],
  },
  {
    title: 'GeoGebra',
    description: 'the world’s favorite, free math tools used by over 100 million students and teachers.',
    preview: '/img/site/GeoGebra.png',
    website: 'https://www.geogebra.org',
    source: null,
    tags: ['academic', 'tool'],
  },
  {
    title: 'OEIS',
    description: '整数序列联机百科全书。',
    preview: null,
    website: 'https://oeis.org/?language=chineseT',
    source: null,
    tags: ['academic', 'resource'],
  },
  {
    title: '在线LaTeX公式编辑器',
    description: '在线LaTeX公式编辑器。',
    preview: '/img/site/latexlive.png',
    website: 'https://www.latexlive.com',
    source: null,
    tags: ['academic', 'tool'],
  },
  {
    title: 'OI Wiki',
    description: '咕',
    preview: '/img/site/OI-Wiki.png',
    website: 'https://oi-wiki.org',
    source: 'https://github.com/OI-wiki/OI-wiki',
    tags: ['competition', 'tutorial', 'opensource'],
  },
  {
    title: 'OIerDb NG',
    description: '咕',
    preview: '/img/site/OIerDb-NG.png',
    website: 'https://www.信息学.com',
    source: 'https://github.com/OIerDb-ng/OIerDb-data-generator',
    tags: ['competition', 'resource', 'opensource'],
  },
  {
    title: 'Graph Editor',
    description: '咕',
    preview: '/img/site/GraphEditor.png',
    website: 'https://csacademy.com/app/graph_editor/',
    source: null,
    tags: ['competition', 'tool'],
  },
  {
    title: '洛谷',
    description: '咕',
    preview: null,
    website: 'https://www.luogu.com.cn',
    source: null,
    tags: ['competition', 'tool', 'test'],
  },
  {
    title: 'Codeforces',
    description: '咕',
    preview: '/img/site/Codeforces.png',
    website: 'https://codeforces.com',
    source: null,
    tags: ['competition', 'tool', 'test'],
  },
  {
    title: 'AtCoder',
    description: '咕',
    preview: '/img/site/AtCoder.png',
    website: 'https://atcoder.jp',
    source: null,
    tags: ['competition', 'tool', 'test'],
  },
  {
    title: 'Virtual Judge',
    description: '咕',
    preview: '/img/site/Vjudge.png',
    website: 'https://vjudge.net',
    source: null,
    tags: ['competition', 'tool', 'test'],
  },
  {
    title: '原题机',
    description: '咕',
    preview: '/img/site/yuantiji.png',
    website: 'http://yuantiji.ac/zh/',
    source: null,
    tags: ['competition', 'tool'],
  },
  {
    title: 'Code Golf',
    description: '咕',
    preview: '/img/site/CodeGolf.png',
    website: 'https://code.golf',
    source: null,
    tags: ['competition', 'tool', 'test'],
  },
  {
    title: 'Apple',
    description: '咕',
    preview: '/img/site/Apple.png',
    website: 'https://www.apple.com',
    source: null,
    tags: ['favorite', 'digital'],
  },
  {
    title: 'Apple 苹果产品参数中心',
    description: '咕',
    preview: null,
    website: 'https://hubweb.cn',
    source: null,
    tags: ['digital', 'resource'],
  },
  {
    title: 'SOCPK-极客湾移动芯片排行',
    description: '咕',
    preview: null,
    website: 'https://socpk.com',
    source: null,
    tags: ['digital', 'resource'],
  },
  {
    title: '数码荔枝',
    description: '咕',
    preview: null,
    website: 'https://lizhi.shop',
    source: null,
    tags: ['digital', 'tool'],
  },
  {
    title: 'YouTube',
    description: '咕',
    preview: null,
    website: 'https://www.youtube.com',
    source: null,
    tags: ['video'],
  },
  {
    title: 'bilibili',
    description: '咕',
    preview: null,
    website: 'https://www.bilibili.com',
    source: null,
    tags: ['video'],
  },
  {
    title: '能不能好好说话？',
    description: '咕',
    preview: null,
    website: 'https://lab.magiconch.com/nbnhhsh/',
    source: null,
    tags: ['tool'],
  },
  {
    title: 'Colorable',
    description: '咕',
    preview: null,
    website: 'https://colorable.jxnblk.com',
    source: null,
    tags: ['tool'],
  },
  {
    title: 'CPS测试',
    description: '咕',
    preview: null,
    website: 'https://www.arealme.com/click-speed-test/cn/',
    source: null,
    tags: ['test'],
  },
  {
    title: 'Password Strength Meter',
    description: '咕',
    preview: null,
    website: 'https://www.passwordmonster.com',
    source: null,
    tags: ['test'],
  },
  {
    title: '政治倾向测试',
    description: '咕',
    preview: null,
    website: 'https://luckyfuy.top/compass/',
    source: null,
    tags: ['test'],
  },
  {
    title: 'volumeshader_bm',
    description: '毒蘑菇测试',
    preview: null,
    website: 'https://cznull.github.io/vsbm',
    source: null,
    tags: ['digital', 'test'],
  },
];

export const Tags: {[type in TagType]: Tag} = {
  favorite: {
    label: '喜爱',
    description: '我最喜欢的网站',
    color: '#e9669e',
  },
  comprehensive: {
    label: '综合',
    description: 'Docusaurus sites associated to a commercial product!',
    color: '#df1f1f',
  },
  academic: {
    label: '学术',
    description: 'Beautiful Docusaurus sites, polished and standing out from the initial template!',
    color: '#df5f1f',
  },
  competition: {
    label: '竞赛',
    description: 'Translated Docusaurus sites using the internationalization support with more than 1 locale.',
    color: '#df9f1f',
  },
  opensource: {
    label: '开源',
    description: 'Open-Source Docusaurus sites can be useful for inspiration!',
    color: '#dfdf1f',
  },
  tutorial: {
    label: '教程',
    description: 'Docusaurus sites using the versioning feature of the docs plugin to manage multiple versions.',
    color: '#9fdf1f',
  },
  tool: {
    label: '工具',
    description: 'Very large Docusaurus sites, including many more pages than the average!',
    color: '#5fdf1f',
  },
  resource: {
    label: '资源',
    description: 'Docusaurus sites of Meta (formerly Facebook) projects',
    color: '#1fdf1f',
  },
  test: {
    label: '测试',
    description: 'Personal websites, blogs and digital gardens built with Docusaurus',
    color: '#1fdf5f',
  },
  personal: {
    label: '个人',
    description: 'Docusaurus sites using the right-to-left reading direction support.',
    color: '#1fdf9f',
  },
  video: {
    label: '影音',
    description: 'Docusaurus sites using the right-to-left reading direction support.',
    color: '#1fdfdf',
  },
  game: {
    label: '游戏',
    description: 'Docusaurus sites using the right-to-left reading direction support.',
    color: '#1f9fdf',
  },
  digital: {
    label: '数码',
    description: 'Docusaurus sites using the right-to-left reading direction support.',
    color: '#1f5fdf',
  },
  community: {
    label: '社区',
    description: 'Docusaurus sites using the right-to-left reading direction support.',
    color: '#1f1fdf',
  },
  shop: {
    label: '商店',
    description: 'Docusaurus sites using the right-to-left reading direction support.',
    color: '#5f1fdf',
  },
  news: {
    label: '新闻',
    description: 'Docusaurus sites using the right-to-left reading direction support.',
    color: '#9f1fdf',
  },
  social: {
    label: '社交',
    description: '社交平台，用户可以在这里交流和分享。',
    color: '#df1fdf',
  },
  technology: {
    label: '科技',
    description: '科技类网站，分享最新的科技资讯和产品。',
    color: '#df1f9f',
  },
  other: {
    label: '其他',
    description: '其他网站。',
    color: '#df1f5f',
  },
};

export const TagList = Object.keys(Tags) as TagType[];
function sortUsers() {
  let result = Users;
  // Sort by site name
  result = sortBy(result, (user) => user.title.toLowerCase());
  // Sort by favorite tag, favorites first
  result = sortBy(result, (user) => !user.tags.includes('favorite'));
  return result;
}

export const sortedUsers = sortUsers();
