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
  | 'develop'
  | 'design';

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
    description: 'lailai 的个人网站，分享技术笔记、项目经验和学习心得。',
    preview: '/img/site/Home.png',
    website: 'https://www.lailai.one',
    source: 'https://github.com/lailai0916/lailai0916.github.io',
    tags: ['favorite', 'personal', 'opensource'],
  },
  {
    title: 'Google',
    description: '全球领先的搜索引擎，提供强大的信息检索和多种在线服务。',
    preview: '/img/site/Google.png',
    website: 'https://www.google.com',
    source: null,
    tags: ['favorite', 'comprehensive'],
  },
  {
    title: '百度',
    description: '中国最大的搜索引擎，提供搜索、地图、百科等多种互联网服务。',
    preview: '/img/site/Baidu.png',
    website: 'https://www.baidu.com',
    source: null,
    tags: ['comprehensive'],
  },
  {
    title: '维基百科',
    description: '一个自由的网络百科全书，由全球用户协作编辑，提供多语言知识内容。',
    preview: '/img/site/Wikipedia.png',
    website: 'https://zh.wikipedia.org/wiki/Wikipedia:首页',
    source: null,
    tags: ['favorite', 'comprehensive', 'resource'],
  },
  {
    title: 'ChatGPT',
    description: 'OpenAI 提供的聊天 AI 服务网站，用户可以通过它与 ChatGPT 进行智能交互。',
    preview: '/img/site/ChatGPT.png',
    website: 'https://chatgpt.com',
    source: null,
    tags: ['favorite', 'tool'],
  },
  {
    title: 'Sora',
    description: 'OpenAI 推出的视频生成模型，用户可通过输入文本、图像或视频，生成新的视频内容。',
    preview: '/img/site/Sora.png',
    website: 'https://sora.com',
    source: null,
    tags: ['favorite', 'tool'],
  },
  {
    title: 'GitHub',
    description: '代码托管平台，支持版本控制与协作开发。',
    preview: null,
    website: 'https://github.com',
    source: null,
    tags: ['favorite', 'develop', 'tool'],
  },
  {
    title: 'Desmos',
    description: '一个提供免费在线数学工具的网站，帮助用户探索和学习数学。',
    preview: '/img/site/Desmos.png',
    website: 'https://www.desmos.com',
    source: null,
    tags: ['academic', 'tool'],
  },
  {
    title: 'GeoGebra',
    description: '一款免费开源的动态数学软件，广泛应用于各级教育领域。',
    preview: '/img/site/GeoGebra.png',
    website: 'https://www.geogebra.org',
    source: null,
    tags: ['academic', 'tool'],
  },
  {
    title: 'OEIS',
    description: '一个专注于数学整数数列的在线数据库。',
    preview: null,
    website: 'https://oeis.org/?language=chineseT',
    source: null,
    tags: ['academic', 'resource'],
  },
  {
    title: '在线LaTeX公式编辑器',
    description: '一款免费在线 LaTeX 公式编辑器。',
    preview: '/img/site/latexlive.png',
    website: 'https://www.latexlive.com',
    source: null,
    tags: ['academic', 'tool'],
  },
  {
    title: 'OI Wiki',
    description: '一个免费开放且持续更新的编程竞赛知识整合站点。',
    preview: '/img/site/OI-Wiki.png',
    website: 'https://oi-wiki.org',
    source: 'https://github.com/OI-wiki/OI-wiki',
    tags: ['competition', 'resource', 'opensource'],
  },
  {
    title: 'OIerDb',
    description: '一个信息学竞赛选手获奖记录并对学校进行排名的数据库。',
    preview: '/img/site/OIerDb.png',
    website: 'https://www.信息学.com',
    source: 'https://github.com/OIerDb-ng/OIerDb-data-generator',
    tags: ['competition', 'resource', 'opensource'],
  },
  {
    title: 'Graph Editor',
    description: '一个在线图论绘制工具。',
    preview: '/img/site/GraphEditor.png',
    website: 'https://csacademy.com/app/graph_editor/',
    source: null,
    tags: ['competition', 'tool'],
  },
  {
    title: 'Diff Tool',
    description: '一个在线代码差异工具。',
    preview: '/img/site/DiffTool.png',
    website: 'https://csacademy.com/app/diffing_tool/',
    source: null,
    tags: ['competition', 'tool'],
  },
  {
    title: '洛谷',
    description: '一个面向编程竞赛爱好者的在线平台。',
    preview: null,
    website: 'https://www.luogu.com.cn',
    source: null,
    tags: ['competition', 'test'],
  },
  {
    title: 'Codeforces',
    description: '一个俄罗斯的在线编程竞赛平台。',
    preview: '/img/site/Codeforces.png',
    website: 'https://codeforces.com',
    source: null,
    tags: ['competition', 'test'],
  },
  {
    title: 'AtCoder',
    description: '一个日本的在线编程竞赛平台。',
    preview: '/img/site/AtCoder.png',
    website: 'https://atcoder.jp',
    source: null,
    tags: ['competition', 'test'],
  },
  {
    title: 'Virtual Judge',
    description: '一个支持多平台在线判题的工具。',
    preview: '/img/site/Vjudge.png',
    website: 'https://vjudge.net',
    source: null,
    tags: ['competition', 'test'],
  },
  {
    title: '原题机',
    description: '一款帮助用户查找编程题目原始出处的工具。',
    preview: '/img/site/yuantiji.png',
    website: 'http://yuantiji.ac/zh/',
    source: null,
    tags: ['competition', 'tool'],
  },
  {
    title: 'Code Golf',
    description: '一个在线编程挑战平台，鼓励开发者以最少的字符数编写代码来解决特定问题。',
    preview: '/img/site/CodeGolf.png',
    website: 'https://code.golf',
    source: null,
    tags: ['competition', 'test'],
  },
  {
    title: 'Apple',
    description: '苹果公司的官方网站，提供产品信息、技术支持和在线商店服务。',
    preview: '/img/site/Apple.png',
    website: 'https://www.apple.com',
    source: null,
    tags: ['favorite', 'digital', 'shop'],
  },
  {
    title: 'Apple 苹果产品参数中心',
    description: '一个专注于收集和展示苹果公司各类产品详细参数的网站。',
    preview: null,
    website: 'https://hubweb.cn',
    source: null,
    tags: ['digital', 'resource'],
  },
  {
    title: 'SOCPK',
    description: '极客湾移动芯片排行。',
    preview: null,
    website: 'https://socpk.com',
    source: null,
    tags: ['digital', 'resource'],
  },
  {
    title: '数码荔枝',
    description: '一家专注于分享最新优秀正版软件的商店。',
    preview: null,
    website: 'https://lizhi.shop',
    source: null,
    tags: ['digital', 'shop'],
  },
  {
    title: 'YouTube',
    description: '全球最大的视频分享平台，用户可以上传、观看、分享和评论各类视频内容。',
    preview: '/img/site/YouTube.png',
    website: 'https://www.youtube.com',
    source: null,
    tags: ['favorite', 'video'],
  },
  {
    title: 'bilibili',
    description: '国内知名的弹幕视频分享网站，用户可在此观看动画、游戏、音乐等多元化内容。',
    preview: null,
    website: 'https://www.bilibili.com',
    source: null,
    tags: ['video'],
  },
  {
    title: '能不能好好说话？',
    description: '一个拼音首字母缩写翻译工具，帮助用户理解这些缩写的含义。',
    preview: null,
    website: 'https://lab.magiconch.com/nbnhhsh/',
    source: 'https://github.com/itorr/nbnhhsh',
    tags: ['tool', 'opensource'],
  },
  {
    title: 'Colorable',
    description: '一个在线的文本与背景颜色对比度测试工具。',
    preview: null,
    website: 'https://colorable.jxnblk.com',
    source: null,
    tags: ['design', 'tool'],
  },
  {
    title: 'CPS测试',
    description: '一个在线的鼠标点击速度测量工具。',
    preview: null,
    website: 'https://www.arealme.com/click-speed-test/cn/',
    source: null,
    tags: ['test'],
  },
  {
    title: 'Password Strength Meter',
    description: '一个在线密码强度测试工具，帮助用户评估密码的安全性。',
    preview: null,
    website: 'https://www.passwordmonster.com',
    source: null,
    tags: ['test'],
  },
  {
    title: '政治倾向测试',
    description: '基于 8Values 的在线政治倾向测试。',
    preview: null,
    website: 'https://luckyfuy.top/compass/',
    source: null,
    tags: ['test'],
  },
  {
    title: '毒蘑菇测试',
    description: '知名的 GPU 渲染性能测试。',
    preview: null,
    website: 'https://cznull.github.io/vsbm',
    source: 'https://github.com/cznull/cznull.github.io',
    tags: ['digital', 'test', 'opensource'],
  },
  {
    title: 'Microsoft Bing',
    description: '微软推出的搜索引擎，支持快速获取信息、图片搜索、翻译等多种功能。',
    preview: null,
    website: 'https://www.bing.com',
    source: null,
    tags: ['comprehensive'],
  },
  {
    title: 'Compiler Explorer',
    description: '一个在线代码编译器和分析工具，支持多种编程语言，实时显示编译后的汇编代码。',
    preview: null,
    website: 'https://godbolt.org',
    source: null,
    tags: ['tool', 'develop'],
  },
  {
    title: 'cppreference.com',
    description: '一个面向 C 和 C++ 程序员的在线参考手册。',
    preview: null,
    website: 'https://zh.cppreference.com/w/首页',
    source: null,
    tags: ['develop', 'resource'],
  },
  {
    title: 'Passport Index 2024',
    description: '一个全球护照排名和信息平台。',
    preview: null,
    website: 'https://www.passportindex.org',
    source: null,
    tags: ['resource'],
  },
  {
    title: 'WolframAlpha',
    description: '一个强大的计算知识引擎，可以回答复杂的数学、科学、工程、经济等领域的问题。',
    preview: null,
    website: 'https://www.wolframalpha.com',
    source: null,
    tags: ['academic', 'tool'],
  },
  {
    title: 'Apple 设计资源',
    description: '提供 Apple 产品边框设计素材。',
    preview: null,
    website: 'https://developer.apple.com/cn/design/resources/#product-bezels',
    source: null,
    tags: ['design', 'develop', 'resource'],
  },
  {
    title: 'Skill Icons',
    description: '一个生成技能图标的工具，支持个性化定制。',
    preview: null,
    website: 'https://skillicons.dev',
    source: 'https://github.com/tandpfun/skill-icons',
    tags: ['design', 'tool', 'opensource'],
  },
  {
    title: '清华大学开源软件镜像站',
    description: '提供多种开源软件和 Linux 发行版镜像，支持快速下载与同步更新。',
    preview: null,
    website: 'https://mirrors.tuna.tsinghua.edu.cn',
    source: null,
    tags: ['develop', 'tool'],
  },
  {
    title: 'X',
    description: 'Twitter 平台的新域名，支持全球实时社交、信息分享与多媒体互动。',
    preview: null,
    website: 'https://x.com',
    source: null,
    tags: ['social'],
  },
  {
    title: 'Facebook',
    description: '全球领先的社交网络平台，用户可以连接朋友、分享动态并参与群组互动。',
    preview: null,
    website: 'https://www.facebook.com',
    source: null,
    tags: ['social'],
  },
  {
    title: 'Telegram Web',
    description: 'Telegram 的网页版客户端，支持即时通讯、文件共享和群组聊天功能。',
    preview: null,
    website: 'https://web.telegram.org/k/',
    source: null,
    tags: ['social'],
  },
  {
    title: 'BrandColors',
    description: '一个收录品牌官方配色的在线工具。',
    preview: null,
    website: 'https://brandcolors.net',
    source: null,
    tags: ['design', 'resource'],
  },
  {
    title: 'generals.io',
    description: '一款多人策略游戏，玩家通过占领领土和击败对手争夺胜利。',
    preview: null,
    website: 'https://generals.io',
    source: null,
    tags: ['game'],
  },
  {
    title: 'TileMan.io',
    description: '一款多人策略游戏，玩家通过占领网格上的区域扩展领地，同时与其他玩家竞争地盘。',
    preview: null,
    website: 'https://tileman.io',
    source: null,
    tags: ['game'],
  },
  {
    title: 'YORG.io',
    description: '一款塔防与资源管理相结合的策略游戏。',
    preview: null,
    website: 'https://yorg.io',
    source: null,
    tags: ['game'],
  },
  {
    title: 'Bloxd.io',
    description: '一款在线沙盒游戏集合平台，提供多种小游戏模式。',
    preview: null,
    website: 'https://bloxd.io',
    source: null,
    tags: ['game'],
  },
  {
    title: '电子教室终结者',
    description: '一款用于解除电子教室和学生机房管理助手控制的工具。',
    preview: null,
    website: 'https://dzjszjz.nkxingxh.top',
    source: null,
    tags: ['tool'],
  },
  {
    title: '墙妈妈',
    description: '翻墙与科学上网指南，提供关于 VPN 等技术的评测和教程。',
    preview: null,
    website: 'https://www.wallmama.com',
    source: null,
    tags: ['tutorial'],
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
  develop: {
    label: '开发',
    description: '科技类网站，分享最新的科技资讯和产品。',
    color: '#df1f9f',
  },
  design: {
    label: '设计',
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
