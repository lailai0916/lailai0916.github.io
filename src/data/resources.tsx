export interface ResourceItem {
  title: string;
  href: string;
  description: string;
}

export interface ResourceCategoryItem {
  title: string;
  icon: string;
  resources: ResourceItem[];
}

export const RESOURCE_LIST: ResourceCategoryItem[] = [
  {
    title: '搜索引擎',
    icon: 'lucide:search',
    resources: [
      {
        title: 'Google',
        href: 'https://www.google.com',
        description: '全球最大搜索引擎',
      },
      {
        title: 'Microsoft Bing',
        href: 'https://www.bing.com',
        description: '微软 AI 智能搜索',
      },
      {
        title: '百度',
        href: 'https://www.baidu.com',
        description: '中国领先中文搜索',
      },
    ],
  },
  {
    title: 'AI 对话应用',
    icon: 'lucide:bot',
    resources: [
      {
        title: 'ChatGPT',
        href: 'https://chatgpt.com',
        description: 'OpenAI 大语言模型',
      },
      {
        title: 'Claude',
        href: 'https://claude.ai',
        description: 'Anthropic 安全 AI 助手',
      },
      {
        title: 'Gemini',
        href: 'https://gemini.google.com',
        description: 'Google 多模态 AI 助手',
      },
      {
        title: 'Grok',
        href: 'https://grok.com',
        description: 'xAI 实时信息 AI 助手',
      },
      {
        title: 'DeepSeek',
        href: 'https://deepseek.com',
        description: '深度求索中文 AI 模型',
      },
      {
        title: 'Sora',
        href: 'https://sora.com',
        description: 'OpenAI 文本生成视频',
      },
    ],
  },
  {
    title: 'AI 开发研究',
    icon: 'lucide:microscope',
    resources: [
      {
        title: 'Hugging Face',
        href: 'https://huggingface.co',
        description: '开源 AI 模型社区平台',
      },
      {
        title: 'LMArena',
        href: 'https://lmarena.ai',
        description: 'AI 模型对比竞技场',
      },
      {
        title: 'Google DeepMind',
        href: 'https://deepmind.com',
        description: 'Google 前沿 AI 研究',
      },
      {
        title: 'Google AI',
        href: 'https://ai.google',
        description: 'Google AI 研究部门',
      },
      {
        title: 'Meta AI',
        href: 'https://ai.facebook.com',
        description: 'Meta 人工智能研究',
      },
      {
        title: 'Microsoft AI',
        href: 'https://www.microsoft.com/ai',
        description: '微软 AI 研究开发',
      },
      {
        title: 'DeepLearning.AI',
        href: 'https://deeplearning.ai',
        description: 'Andrew Ng 创立的 AI 教育平台',
      },
      {
        title: 'PyTorch',
        href: 'https://pytorch.org',
        description: 'Facebook 深度学习框架',
      },
      {
        title: 'Keras',
        href: 'https://keras.io',
        description: '高级神经网络 API',
      },
      {
        title: 'NumPy',
        href: 'https://numpy.org',
        description: 'Python 科学计算包',
      },
      {
        title: 'PyCharm',
        href: 'https://www.jetbrains.com/pycharm',
        description: 'JetBrains Python IDE',
      },
      {
        title: 'Jupyter',
        href: 'https://jupyter.org',
        description: '交互式数据科学平台',
      },
    ],
  },
  {
    title: '云服务平台',
    icon: 'lucide:cloud',
    resources: [
      {
        title: 'Amazon Web Services',
        href: 'https://aws.amazon.com',
        description: '亚马逊云计算平台',
      },
      {
        title: 'Microsoft Azure',
        href: 'https://azure.microsoft.com',
        description: '微软云服务平台',
      },
      {
        title: 'Cloudflare',
        href: 'https://www.cloudflare.com',
        description: '网络安全加速服务',
      },
      {
        title: 'Namecheap',
        href: 'https://www.namecheap.com',
        description: '域名注册服务',
      },
      {
        title: 'Namesilo',
        href: 'https://www.namesilo.com',
        description: '域名注册服务',
      },
    ],
  },
  {
    title: '代码托管',
    icon: 'lucide:github',
    resources: [
      {
        title: 'GitHub',
        href: 'https://github.com',
        description: '全球最大代码托管平台',
      },
      {
        title: 'GitStar 排行榜',
        href: 'https://gitstar-ranking.com',
        description: 'GitHub 用户 Star 排行榜',
      },
      {
        title: 'Committers Top',
        href: 'https://committers.top',
        description: '各国活跃 GitHub 用户榜',
      },
      {
        title: 'GitHub Metrics',
        href: 'https://github.com/lowlighter/metrics',
        description: 'GitHub 账号信息图生成',
      },
      {
        title: 'GitHub Stats',
        href: 'https://github.com/jstrieb/github-stats',
        description: 'GitHub 个人统计图生成',
      },
      {
        title: 'Shields.io',
        href: 'https://shields.io',
        description: '项目徽章生成服务',
      },
    ],
  },
  {
    title: '在线开发',
    icon: 'lucide:code',
    resources: [
      {
        title: 'GitHub Codespaces',
        href: 'https://github.com/codespaces',
        description: 'GitHub 云端开发环境',
      },
      {
        title: 'Gitpod',
        href: 'https://www.gitpod.io',
        description: '云端 IDE 开发环境',
      },
      {
        title: 'CodeSandbox',
        href: 'https://codesandbox.io',
        description: '在线代码编辑器',
      },
      {
        title: 'CodePen',
        href: 'https://codepen.io',
        description: '前端在线开发平台',
      },
      {
        title: 'StackBlitz',
        href: 'https://stackblitz.com',
        description: '现代前端在线 IDE',
      },
      {
        title: 'vscode.dev',
        href: 'https://vscode.dev',
        description: 'VSCode 浏览器版',
      },
      {
        title: 'Sandpack',
        href: 'https://sandpack.codesandbox.io',
        description: '嵌入式代码编辑器',
      },
      {
        title: 'OnlineGDB',
        href: 'https://www.onlinegdb.com/online_python_compiler',
        description: '多语言在线编译器',
      },
      {
        title: 'Compiler Explorer',
        href: 'https://godbolt.org',
        description: '汇编代码分析工具',
      },
      {
        title: 'React',
        href: 'https://react.dev',
        description: 'Facebook 前端 UI 框架',
      },
      {
        title: '清华大学开源软件镜像站',
        href: 'https://mirrors.tuna.tsinghua.edu.cn',
        description: '开源软件包镜像服务',
      },
    ],
  },
  {
    title: '学术研究',
    icon: 'lucide:book-open',
    resources: [
      {
        title: 'Google Scholar',
        href: 'https://scholar.google.com',
        description: '学术文献搜索引擎',
      },
      {
        title: 'Science',
        href: 'https://www.science.org/journal/science',
        description: '顶级科学期刊',
      },
      {
        title: 'Nature',
        href: 'https://www.nature.com',
        description: '权威多学科期刊',
      },
      {
        title: 'arXiv',
        href: 'https://arxiv.org',
        description: '开放预印本论文库',
      },
      {
        title: 'Overleaf',
        href: 'https://www.overleaf.com',
        description: '在线LaTeX编辑器',
      },
    ],
  },
  {
    title: '在线学习',
    icon: 'lucide:graduation-cap',
    resources: [
      {
        title: 'Coursera',
        href: 'https://www.coursera.org',
        description: '顶尖大学在线课程',
      },
      {
        title: 'edX',
        href: 'https://www.edx.org',
        description: '哈佛 MIT 开放课程',
      },
      {
        title: 'MIT OpenCourseWare',
        href: 'https://ocw.mit.edu',
        description: 'MIT 免费课程资源',
      },
      {
        title: 'Class Central',
        href: 'https://www.classcentral.com',
        description: '全球课程搜索平台',
      },
    ],
  },
  {
    title: '算法竞赛',
    icon: 'lucide:trophy',
    resources: [
      {
        title: '洛谷',
        href: 'https://www.luogu.com.cn',
        description: '国内编程竞赛平台',
      },
      {
        title: 'Codeforces',
        href: 'https://codeforces.com',
        description: '全球编程竞赛平台',
      },
      {
        title: 'AtCoder',
        href: 'https://atcoder.jp',
        description: '日本编程竞赛平台',
      },
      {
        title: 'Virtual Judge',
        href: 'https://vjudge.net',
        description: '多平台虚拟判题系统',
      },
      {
        title: 'Algorithm Duels Online',
        href: 'https://algorithm-duels.online',
        description: '组队算法对决平台',
      },
      {
        title: 'Code Golf',
        href: 'https://code.golf',
        description: '最短代码挑战平台',
      },
      {
        title: 'OI Wiki',
        href: 'https://oi-wiki.org',
        description: '信息学竞赛知识站',
      },
      {
        title: 'OIerDb',
        href: 'https://oierdb.com',
        description: '信息学竞赛记录库',
      },
      {
        title: '原题机',
        href: 'http://yuantiji.ac/zh/',
        description: '编程题目溯源工具',
      },
      {
        title: 'Diff Tool',
        href: 'https://csacademy.com/app/diffing_tool/',
        description: '在线代码差异比较',
      },
      {
        title: 'Graph Editor',
        href: 'https://csacademy.com/app/graph_editor/',
        description: '图论可视化编辑器',
      },
    ],
  },
  {
    title: '数学与计算',
    icon: 'lucide:calculator',
    resources: [
      {
        title: 'Desmos',
        href: 'https://www.desmos.com',
        description: '在线图形计算器',
      },
      {
        title: 'Wolfram Alpha',
        href: 'https://www.wolframalpha.com',
        description: '计算型知识引擎',
      },
      {
        title: 'GeoGebra',
        href: 'https://www.geogebra.org',
        description: '交互式数学软件',
      },
      {
        title: 'LaTeX 公式编辑器',
        href: 'https://www.latexlive.com',
        description: 'LaTeX 公式编辑器',
      },
      {
        title: 'OEIS',
        href: 'https://oeis.org',
        description: '整数序列百科全书',
      },
    ],
  },
  {
    title: '站点生成',
    icon: 'lucide:file-text',
    resources: [
      {
        title: 'Docusaurus',
        href: 'https://docusaurus.io',
        description: 'Facebook 文档网站工具',
      },
      {
        title: 'VitePress',
        href: 'https://vitepress.vuejs.org',
        description: 'Vue 静态网站生成器',
      },
      {
        title: 'VuePress',
        href: 'https://vuepress.vuejs.org',
        description: 'Vue 文档网站生成器',
      },
      {
        title: 'Material for MkDocs',
        href: 'https://squidfunk.github.io/mkdocs-material/',
        description: 'Python 文档网站生成器',
      },
      { title: 'Hexo', href: 'https://hexo.io', description: '快速博客框架' },
      {
        title: 'WordPress',
        href: 'https://wordpress.org',
        description: '开源内容管理系统',
      },
    ],
  },
  {
    title: '日常工具',
    icon: 'lucide:bolt',
    resources: [
      {
        title: 'Google 翻译',
        href: 'https://translate.google.com',
        description: '谷歌在线翻译服务',
      },
      {
        title: 'Speedtest',
        href: 'https://www.speedtest.net',
        description: '网络速度测试工具',
      },
      {
        title: '毒蘑菇测试',
        href: 'https://cznull.github.io/vsbm',
        description: 'GPU 渲染性能测试',
      },
      {
        title: '能不能好好说话？',
        href: 'https://lab.magiconch.com/nbnhhsh/',
        description: '拼音缩写翻译工具',
      },
      {
        title: 'Password Monster',
        href: 'https://passwordmonster.com/',
        description: '密码强度检测工具',
      },
      {
        title: 'CPS 测试',
        href: 'https://clickspeedtest.com/',
        description: '鼠标点击速度测试',
      },
      {
        title: '政治倾向测试',
        href: 'https://luckyfuy.top/compass/',
        description: '政治倾向分析测试',
      },
      {
        title: 'dazidazi',
        href: 'https://dazidazi.com',
        description: '在线打字练习平台',
      },
      {
        title: 'WildCard 野卡',
        href: 'https://yeka.ai',
        description: '虚拟信用卡服务',
      },
      {
        title: 'Luban SMS',
        href: 'https://lubansms.com',
        description: '全球短信收发平台',
      },
      {
        title: 'Class Widgets',
        href: 'https://classwidgets.rinlit.cn',
        description: '桌面课表软件',
      },
      {
        title: '电子教室终结者',
        href: 'https://dzjszjz.nkxingxh.top',
        description: '电子教室软件解锁工具',
      },
      {
        title: 'Recraft',
        href: 'https://www.recraft.ai',
        description: 'AI 图片生成工具',
      },
    ],
  },
  {
    title: '知识百科',
    icon: 'lucide:library',
    resources: [
      {
        title: '维基百科',
        href: 'https://zh.wikipedia.org',
        description: '多语言自由百科全书',
      },
      {
        title: 'cppreference',
        href: 'https://cppreference.com',
        description: 'C++ 标准库参考文档',
      },
      {
        title: 'Passport Index',
        href: 'https://www.passportindex.org',
        description: '全球护照免签排名',
      },
    ],
  },
  {
    title: '数码设备',
    icon: 'lucide:smartphone',
    resources: [
      {
        title: 'Apple',
        href: 'https://www.apple.com',
        description: '苹果公司官方网站',
      },
      {
        title: 'Apple 产品参数中心',
        href: 'https://hubweb.cn',
        description: '苹果产品参数对比',
      },
      {
        title: 'SOCPK',
        href: 'https://socpk.com',
        description: '移动处理器性能对比',
      },
      {
        title: '数码荔枝',
        href: 'https://lizhi.shop',
        description: '正版软件商店',
      },
    ],
  },
  {
    title: '设计创意',
    icon: 'lucide:palette',
    resources: [
      {
        title: 'Colorable',
        href: 'https://colorable.jxnblk.com',
        description: '颜色对比度检测工具',
      },
      {
        title: 'Skill Icons',
        href: 'https://skillicons.dev',
        description: '技能图标生成工具',
      },
      {
        title: 'BrandColors',
        href: 'https://brandcolors.net',
        description: '品牌配色方案收集',
      },
      {
        title: 'Maker World',
        href: 'https://makerworld.com.cn',
        description: '设计资源创意工具',
      },
      {
        title: 'amCharts Pixel Map',
        href: 'https://pixelmap.amcharts.com',
        description: '在线像素地图编辑器',
      },
    ],
  },
  {
    title: '视频媒体',
    icon: 'lucide:video',
    resources: [
      {
        title: 'YouTube',
        href: 'https://www.youtube.com',
        description: '全球最大视频平台',
      },
      {
        title: 'bilibili',
        href: 'https://www.bilibili.com',
        description: '中国年轻人文化社区',
      },
    ],
  },
  {
    title: '社交网络',
    icon: 'lucide:smartphone',
    resources: [
      {
        title: 'X (Twitter)',
        href: 'https://x.com',
        description: '实时信息社交平台',
      },
      {
        title: 'Facebook',
        href: 'https://www.facebook.com',
        description: '全球最大社交平台',
      },
      {
        title: 'Telegram Web',
        href: 'https://web.telegram.org',
        description: 'Telegram 网页版',
      },
    ],
  },
  {
    title: '在线娱乐',
    icon: 'lucide:gamepad',
    resources: [
      {
        title: 'generals.io',
        href: 'https://generals.io',
        description: '实时多人策略游戏',
      },
      {
        title: 'TileMan.io',
        href: 'https://tileman.io',
        description: '领土争夺策略游戏',
      },
      {
        title: 'YORG.io',
        href: 'https://yorg.io',
        description: '塔防资源管理游戏',
      },
      {
        title: 'Bloxd.io',
        href: 'https://bloxd.io',
        description: '在线沙盒游戏平台',
      },
      {
        title: '名字竞技场',
        href: 'https://namerena.github.io',
        description: '文本对战游戏',
      },
      {
        title: '图寻',
        href: 'https://tuxun.fun',
        description: '地理位置猜测游戏',
      },
      {
        title: '猜盐',
        href: 'https://xiaoce.fun',
        description: '趣味问答平台',
      },
    ],
  },
  {
    title: '科学上网',
    icon: 'lucide:globe',
    resources: [
      {
        title: '墙妈妈',
        href: 'https://www.wallmama.com',
        description: '科学上网指南',
      },
      {
        title: 'ExpressVPN',
        href: 'https://www.expressvpn.com',
        description: '专业 VPN 服务',
      },
      {
        title: 'NordVPN',
        href: 'https://nordvpn.com',
        description: '专业 VPN 服务',
      },
      {
        title: 'AstrillVPN',
        href: 'https://www.astrill.com',
        description: '专业 VPN 服务',
      },
      {
        title: 'Taishan Net',
        href: 'https://taishan.pro',
        description: '多协议科学上网服务',
      },
    ],
  },
];
