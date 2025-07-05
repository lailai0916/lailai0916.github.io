export interface Resource {
  name: string;
  href: string;
  description: string;
}

export interface ResourceCategory {
  name: string;
  icon: string;
  resources: Resource[];
}

export const RESOURCE_LIST: ResourceCategory[] = [
  {
    name: '搜索引擎',
    icon: 'lucide:search',
    resources: [
      { name: 'Google', href: 'https://www.google.com', description: '全球最大搜索引擎' },
      { name: 'Microsoft Bing', href: 'https://www.bing.com', description: '微软 AI 智能搜索' },
      { name: '百度', href: 'https://www.baidu.com', description: '中国领先中文搜索' },
    ],
  },
  {
    name: 'AI 对话应用',
    icon: 'lucide:bot',
    resources: [
      { name: 'ChatGPT', href: 'https://chatgpt.com', description: 'OpenAI 大语言模型' },
      { name: 'Claude', href: 'https://claude.ai', description: 'Anthropic 安全 AI 助手' },
      { name: 'Gemini', href: 'https://gemini.google.com', description: 'Google 多模态 AI 助手' },
      { name: 'Grok', href: 'https://grok.com', description: 'xAI 实时信息 AI 助手' },
      { name: 'DeepSeek', href: 'https://deepseek.com', description: '深度求索中文 AI 模型' },
      { name: 'Sora', href: 'https://sora.com', description: 'OpenAI 文本生成视频' },
    ],
  },
  {
    name: 'AI 开发研究',
    icon: 'lucide:microscope',
    resources: [
      { name: 'Hugging Face', href: 'https://huggingface.co', description: '开源 AI 模型社区平台' },
      { name: 'LMArena', href: 'https://lmarena.ai', description: 'AI 模型对比竞技场' },
      { name: 'Google DeepMind', href: 'https://deepmind.com', description: 'Google 前沿 AI 研究' },
      { name: 'Google AI', href: 'https://ai.google', description: 'Google AI 研究部门' },
      { name: 'Meta AI', href: 'https://ai.facebook.com', description: 'Meta 人工智能研究' },
      { name: 'Microsoft AI', href: 'https://www.microsoft.com/ai', description: '微软 AI 研究开发' },
      { name: 'DeepLearning.AI', href: 'https://deeplearning.ai', description: 'Andrew Ng 创立的 AI 教育平台' },
      { name: 'PyTorch', href: 'https://pytorch.org', description: 'Facebook 深度学习框架' },
      { name: 'Keras', href: 'https://keras.io', description: '高级神经网络 API' },
      { name: 'NumPy', href: 'https://numpy.org', description: 'Python 科学计算包' },
      { name: 'PyCharm', href: 'https://www.jetbrains.com/pycharm', description: 'JetBrains Python IDE' },
      { name: 'Jupyter', href: 'https://jupyter.org', description: '交互式数据科学平台' },
    ],
  },
  {
    name: '代码托管',
    icon: 'lucide:github',
    resources: [
      { name: 'GitHub', href: 'https://github.com', description: '全球最大代码托管平台' },
      { name: 'GitStar 排行榜', href: 'https://gitstar-ranking.com', description: 'GitHub 用户 Star 排行榜' },
      { name: 'Committers Top', href: 'https://committers.top', description: '各国活跃 GitHub 用户榜' },
      { name: 'GitHub Metrics', href: 'https://github.com/lowlighter/metrics', description: 'GitHub 账号信息图生成' },
      { name: 'GitHub Stats', href: 'https://github.com/jstrieb/github-stats', description: 'GitHub 个人统计图生成' },
      { name: 'Shields.io', href: 'https://shields.io', description: '项目徽章生成服务' },
    ],
  },
  {
    name: '在线开发',
    icon: 'lucide:code',
    resources: [
      { name: 'GitHub Codespaces', href: 'https://github.com/codespaces', description: 'GitHub 云端开发环境' },
      { name: 'Gitpod', href: 'https://www.gitpod.io', description: '云端 IDE 开发环境' },
      { name: 'CodeSandbox', href: 'https://codesandbox.io', description: '在线代码编辑器' },
      { name: 'CodePen', href: 'https://codepen.io', description: '前端在线开发平台' },
      { name: 'StackBlitz', href: 'https://stackblitz.com', description: '现代前端在线 IDE' },
      { name: 'vscode.dev', href: 'https://vscode.dev', description: 'VSCode 浏览器版' },
      { name: 'Sandpack', href: 'https://sandpack.codesandbox.io', description: '嵌入式代码编辑器' },
      { name: 'OnlineGDB', href: 'https://www.onlinegdb.com/online_python_compiler', description: '多语言在线编译器' },
      { name: 'Compiler Explorer', href: 'https://godbolt.org', description: '汇编代码分析工具' },
      { name: 'React', href: 'https://react.dev', description: 'Facebook 前端 UI 框架' },
      { name: '清华大学开源软件镜像站', href: 'https://mirrors.tuna.tsinghua.edu.cn', description: '开源软件包镜像服务' },
    ],
  },
  {
    name: '学术研究',
    icon: 'lucide:book-open',
    resources: [
      { name: 'Google Scholar', href: 'https://scholar.google.com', description: '学术文献搜索引擎' },
      { name: 'Science', href: 'https://www.science.org/journal/science', description: '顶级科学期刊' },
      { name: 'Nature', href: 'https://www.nature.com', description: '权威多学科期刊' },
      { name: 'arXiv', href: 'https://arxiv.org', description: '开放预印本论文库' },
      { name: 'Overleaf', href: 'https://www.overleaf.com', description: '在线LaTeX编辑器' },
    ],
  },
  {
    name: '在线学习',
    icon: 'lucide:graduation-cap',
    resources: [
      { name: 'Coursera', href: 'https://www.coursera.org', description: '顶尖大学在线课程' },
      { name: 'edX', href: 'https://www.edx.org', description: '哈佛 MIT 开放课程' },
      { name: 'MIT OpenCourseWare', href: 'https://ocw.mit.edu', description: 'MIT 免费课程资源' },
      { name: 'Class Central', href: 'https://www.classcentral.com', description: '全球课程搜索平台' },
    ],
  },
  {
    name: '编程竞赛',
    icon: 'lucide:trophy',
    resources: [
      { name: 'Codeforces', href: 'https://codeforces.com', description: '全球编程竞赛平台' },
      { name: '洛谷', href: 'https://www.luogu.com.cn', description: '国内编程竞赛平台' },
      { name: 'AtCoder', href: 'https://atcoder.jp', description: '日本编程竞赛平台' },
      { name: 'OI Wiki', href: 'https://oi-wiki.org', description: '信息学竞赛知识站' },
      { name: 'OIerDb', href: 'https://oierdb.com', description: '信息学竞赛记录库' },
      { name: 'Virtual Judge', href: 'https://vjudge.net', description: '多平台虚拟判题系统' },
      { name: 'Code Golf', href: 'https://code.golf', description: '最短代码挑战平台' },
    ],
  },
  {
    name: '数学与计算',
    icon: 'lucide:calculator',
    resources: [
      { name: 'Desmos', href: 'https://www.desmos.com', description: '在线图形计算器' },
      { name: 'Wolfram Alpha', href: 'https://www.wolframalpha.com', description: '计算型知识引擎' },
      { name: 'GeoGebra', href: 'https://www.geogebra.org', description: '交互式数学软件' },
      { name: 'LaTeX 公式编辑器', href: 'https://www.latexlive.com', description: 'LaTeX 公式编辑器' },
      { name: 'OEIS', href: 'https://oeis.org', description: '整数序列百科全书' },
    ],
  },
  {
    name: '站点生成',
    icon: 'lucide:file-text',
    resources: [
      { name: 'Docusaurus', href: 'https://docusaurus.io', description: 'Facebook 文档网站工具' },
      { name: 'VitePress', href: 'https://vitepress.vuejs.org', description: 'Vue 静态网站生成器' },
      { name: 'VuePress', href: 'https://vuepress.vuejs.org', description: 'Vue 文档网站生成器' },
      { name: 'Material for MkDocs', href: 'https://squidfunk.github.io/mkdocs-material/', description: 'Python 文档网站生成器' },
      { name: 'Hexo', href: 'https://hexo.io', description: '快速博客框架' },
      { name: 'WordPress', href: 'https://wordpress.org', description: '开源内容管理系统' },
    ],
  },
  {
    name: '开发工具',
    icon: 'lucide:wrench',
    resources: [
      { name: 'Colorable', href: 'https://colorable.jxnblk.com', description: '颜色对比度检测工具' },
      { name: 'Diff Tool', href: 'https://csacademy.com/app/diffing_tool/', description: '在线代码差异比较' },
      { name: 'Graph Editor', href: 'https://csacademy.com/app/graph_editor/', description: '图论可视化编辑器' },
      { name: '原题机', href: 'http://yuantiji.ac/zh/', description: '编程题目溯源工具' },
      { name: '毒蘑菇测试', href: 'https://cznull.github.io/vsbm', description: 'GPU 渲染性能测试' },
    ],
  },
  {
    name: '日常工具',
    icon: 'lucide:bolt',
    resources: [
      { name: 'Google 翻译', href: 'https://translate.google.com', description: '谷歌在线翻译服务' },
      { name: 'Speedtest', href: 'https://www.speedtest.net', description: '网络速度测试工具' },
      { name: '能不能好好说话？', href: 'https://lab.magiconch.com/nbnhhsh/', description: '拼音缩写翻译工具' },
      { name: 'Password Monster', href: 'https://passwordmonster.com/', description: '密码强度检测工具' },
      { name: 'CPS 测试', href: 'https://clickspeedtest.com/', description: '鼠标点击速度测试' },
      { name: '政治倾向测试', href: 'https://luckyfuy.top/compass/', description: '政治倾向分析测试' },
      { name: 'dazidazi', href: 'https://dazidazi.com', description: '在线打字练习平台' },
      { name: 'WildCard 野卡', href: 'https://yeka.ai', description: '虚拟信用卡服务' },
      { name: 'Luban SMS', href: 'https://lubansms.com', description: '全球短信收发平台' },
      { name: 'Class Widgets', href: 'https://classwidgets.rinlit.cn', description: '桌面课表软件' },
      { name: '电子教室终结者', href: 'https://dzjszjz.nkxingxh.top', description: '电子教室软件解锁工具' },
    ],
  },
  {
    name: '知识百科',
    icon: 'lucide:library',
    resources: [
      { name: '维基百科', href: 'https://zh.wikipedia.org', description: '多语言自由百科全书' },
      { name: 'cppreference', href: 'https://cppreference.com', description: 'C++ 标准库参考文档' },
      { name: 'Passport Index', href: 'https://www.passportindex.org', description: '全球护照免签排名' },
    ],
  },
  {
    name: '数码设备',
    icon: 'lucide:smartphone',
    resources: [
      { name: 'Apple', href: 'https://www.apple.com', description: '苹果公司官方网站' },
      { name: 'Apple 产品参数中心', href: 'https://hubweb.cn', description: '苹果产品参数对比' },
      { name: 'SOCPK', href: 'https://socpk.com', description: '移动处理器性能对比' },
      { name: '数码荔枝', href: 'https://lizhi.shop', description: '正版软件商店' },
    ],
  },
  {
    name: '云服务平台',
    icon: 'lucide:cloud',
    resources: [
      { name: 'Amazon Web Services', href: 'https://aws.amazon.com', description: '亚马逊云计算平台' },
      { name: 'Microsoft Azure', href: 'https://azure.microsoft.com', description: '微软云服务平台' },
      { name: 'Cloudflare', href: 'https://www.cloudflare.com', description: '网络安全加速服务' },
    ],
  },
  {
    name: '设计创意',
    icon: 'lucide:palette',
    resources: [
      { name: 'Skill Icons', href: 'https://skillicons.dev', description: '技能图标生成工具' },
      { name: 'BrandColors', href: 'https://brandcolors.net', description: '品牌配色方案收集' },
      { name: 'Maker World', href: 'https://makerworld.com.cn', description: '设计资源创意工具' },
      { name: 'amCharts Pixel Map', href: 'https://pixelmap.amcharts.com', description: '在线像素地图编辑器' },
    ],
  },
  {
    name: '视频媒体',
    icon: 'lucide:video',
    resources: [
      { name: 'YouTube', href: 'https://www.youtube.com', description: '全球最大视频平台' },
      { name: 'bilibili', href: 'https://www.bilibili.com', description: '中国年轻人文化社区' },
    ],
  },
  {
    name: '社交网络',
    icon: 'lucide:smartphone',
    resources: [
      { name: 'X (Twitter)', href: 'https://x.com', description: '实时信息社交平台' },
      { name: 'Facebook', href: 'https://www.facebook.com', description: '全球最大社交平台' },
      { name: 'Telegram Web', href: 'https://web.telegram.org', description: 'Telegram 网页版' },
    ],
  },
  {
    name: '在线游戏',
    icon: 'lucide:gamepad',
    resources: [
      { name: 'generals.io', href: 'https://generals.io', description: '实时多人策略游戏' },
      { name: 'TileMan.io', href: 'https://tileman.io', description: '领土争夺策略游戏' },
      { name: 'YORG.io', href: 'https://yorg.io', description: '塔防资源管理游戏' },
      { name: 'Bloxd.io', href: 'https://bloxd.io', description: '在线沙盒游戏平台' },
      { name: '名字竞技场', href: 'https://namerena.github.io', description: '文本对战游戏' },
      { name: '图寻', href: 'https://tuxun.fun', description: '地理位置猜测游戏' },
    ],
  },
  {
    name: '科学上网',
    icon: 'lucide:globe',
    resources: [
      { name: '墙妈妈', href: 'https://www.wallmama.com', description: '科学上网指南' },
      { name: 'NordVPN', href: 'https://nordvpn.com', description: '专业 VPN 服务' },
      { name: 'Taishan Net', href: 'https://taishan.pro', description: '多协议科学上网服务' },
    ],
  },
];
