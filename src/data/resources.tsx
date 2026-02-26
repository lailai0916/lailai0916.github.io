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
    title: '搜索与导航',
    icon: 'lucide:search',
    resources: [
      {
        title: 'Google',
        href: 'https://www.google.com',
        description: '通用网页搜索引擎',
      },
      {
        title: 'Microsoft Bing',
        href: 'https://www.bing.com',
        description: '微软搜索引擎与 AI 入口',
      },
      {
        title: '百度',
        href: 'https://www.baidu.com',
        description: '中文网页搜索引擎',
      },
    ],
  },
  {
    title: 'AI 助手与生成',
    icon: 'lucide:bot',
    resources: [
      {
        title: 'ChatGPT',
        href: 'https://chatgpt.com',
        description: '对话式大语言模型助手',
      },
      {
        title: 'Gemini',
        href: 'https://gemini.google.com',
        description: '多模态 AI 助手',
      },
      {
        title: 'Grok',
        href: 'https://grok.com',
        description: '实时信息检索型 AI 助手',
      },
      {
        title: 'Claude',
        href: 'https://claude.ai',
        description: '通用对话式 AI 助手',
      },
      {
        title: 'DeepSeek',
        href: 'https://deepseek.com',
        description: '中文友好大模型与 API',
      },
      {
        title: 'Sora',
        href: 'https://sora.com',
        description: '文本到视频生成模型',
      },
    ],
  },
  {
    title: 'AI 研发与生态',
    icon: 'lucide:microscope',
    resources: [
      {
        title: 'Hugging Face',
        href: 'https://huggingface.co',
        description: '开源模型与数据集社区',
      },
      {
        title: 'LMArena',
        href: 'https://lmarena.ai',
        description: '大模型对战评测平台',
      },
      {
        title: 'GPTZero',
        href: 'https://gptzero.me',
        description: 'AI 生成文本检测工具',
      },
      {
        title: 'Google DeepMind',
        href: 'https://deepmind.com',
        description: 'AI 研究实验室与成果',
      },
      {
        title: 'Google AI Studio',
        href: 'https://aistudio.google.com',
        description: 'Gemini API 调试与开发平台',
      },
      {
        title: 'Meta AI',
        href: 'https://ai.facebook.com',
        description: 'AI 研究与开源模型发布',
      },
      {
        title: 'Microsoft AI',
        href: 'https://www.microsoft.com/ai',
        description: 'AI 产品与研究入口页',
      },
      {
        title: 'DeepLearning.AI',
        href: 'https://deeplearning.ai',
        description: 'AI 课程与学习资源平台',
      },
      {
        title: 'PyTorch',
        href: 'https://pytorch.org',
        description: '深度学习训练与推理框架',
      },
      {
        title: 'Keras',
        href: 'https://keras.io',
        description: '深度学习高层 API 框架',
      },
    ],
  },
  {
    title: '云与网络',
    icon: 'lucide:cloud',
    resources: [
      {
        title: 'Amazon Web Services',
        href: 'https://aws.amazon.com',
        description: '云计算与托管服务平台',
      },
      {
        title: 'Microsoft Azure',
        href: 'https://azure.microsoft.com',
        description: '企业级云计算服务平台',
      },
      {
        title: 'Cloudflare',
        href: 'https://www.cloudflare.com',
        description: 'CDN、DNS 与边缘安全网络',
      },
      {
        title: 'Namecheap',
        href: 'https://www.namecheap.com',
        description: '域名注册与管理平台',
      },
      {
        title: 'Namesilo',
        href: 'https://www.namesilo.com',
        description: '域名注册与管理平台',
      },
    ],
  },
  {
    title: '代码托管与统计',
    icon: 'lucide:github',
    resources: [
      {
        title: 'GitHub',
        href: 'https://github.com',
        description: '代码托管与协作平台',
      },
      {
        title: 'GitStar 排行榜',
        href: 'https://gitstar-ranking.com',
        description: 'GitHub Star 排行榜',
      },
      {
        title: 'Committers Top',
        href: 'https://committers.top',
        description: 'GitHub 活跃贡献榜单',
      },
      {
        title: 'GitHub Metrics',
        href: 'https://github.com/lowlighter/metrics',
        description: 'GitHub 账号信息图生成器',
      },
      {
        title: 'GitHub Stats',
        href: 'https://github.com/jstrieb/github-stats',
        description: 'GitHub 个人统计卡片生成器',
      },
      {
        title: 'Shields.io',
        href: 'https://shields.io',
        description: '徽章（Badge）生成服务',
      },
    ],
  },
  {
    title: '在线 IDE 与沙盒',
    icon: 'lucide:terminal',
    resources: [
      {
        title: 'GitHub Codespaces',
        href: 'https://github.com/codespaces',
        description: '云端开发环境（VS Code）',
      },
      {
        title: 'Gitpod',
        href: 'https://www.gitpod.io',
        description: '云端 IDE 与开发环境',
      },
      {
        title: 'CodeSandbox',
        href: 'https://codesandbox.io',
        description: '在线代码沙盒与协作编辑',
      },
      {
        title: 'CodePen',
        href: 'https://codepen.io',
        description: '前端代码演示与分享平台',
      },
      {
        title: 'StackBlitz',
        href: 'https://stackblitz.com',
        description: '浏览器内前端 IDE',
      },
      {
        title: 'vscode.dev',
        href: 'https://vscode.dev',
        description: 'VS Code 网页版编辑器',
      },
      {
        title: 'Sandpack',
        href: 'https://sandpack.codesandbox.io',
        description: '可嵌入代码编辑器组件',
      },
    ],
  },
  {
    title: '编译与调试',
    icon: 'lucide:bug',
    resources: [
      {
        title: 'OnlineGDB',
        href: 'https://www.onlinegdb.com/online_python_compiler',
        description: '多语言在线编译与运行',
      },
      {
        title: 'Compiler Explorer',
        href: 'https://godbolt.org',
        description: '编译结果与汇编对照分析',
      },
      {
        title: 'Diff Tool',
        href: 'https://csacademy.com/app/diffing_tool/',
        description: '在线文本与代码差异对比',
      },
      {
        title: 'Graph Editor',
        href: 'https://csacademy.com/app/graph_editor/',
        description: '图论结构可视化编辑器',
      },
    ],
  },
  {
    title: '开发工具与 IDE',
    icon: 'lucide:code-2',
    resources: [
      {
        title: 'PyCharm',
        href: 'https://www.jetbrains.com/pycharm',
        description: 'Python 桌面 IDE',
      },
      {
        title: 'Jupyter',
        href: 'https://jupyter.org',
        description: '交互式 Notebook 环境',
      },
    ],
  },
  {
    title: '学术与论文',
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
        description: '科学期刊与论文平台',
      },
      {
        title: 'Nature',
        href: 'https://www.nature.com',
        description: '多学科期刊与论文平台',
      },
      {
        title: 'arXiv',
        href: 'https://arxiv.org',
        description: '开放预印本论文库',
      },
      {
        title: 'Overleaf',
        href: 'https://www.overleaf.com',
        description: '在线 LaTeX 写作与协作',
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
        description: '在线课程与证书平台',
      },
      {
        title: 'edX',
        href: 'https://www.edx.org',
        description: '高校在线课程平台',
      },
      {
        title: 'MIT OpenCourseWare',
        href: 'https://ocw.mit.edu',
        description: 'MIT 公开课程资源库',
      },
      {
        title: 'Class Central',
        href: 'https://www.classcentral.com',
        description: '在线课程聚合与搜索',
      },
    ],
  },
  {
    title: '算法与竞赛',
    icon: 'lucide:trophy',
    resources: [
      {
        title: '洛谷',
        href: 'https://www.luogu.com.cn',
        description: '算法竞赛训练与社区平台',
      },
      {
        title: 'Codeforces',
        href: 'https://codeforces.com',
        description: '算法竞赛平台与题库',
      },
      {
        title: 'AtCoder',
        href: 'https://atcoder.jp',
        description: '算法竞赛平台与题库',
      },
      {
        title: 'Virtual Judge',
        href: 'https://vjudge.net',
        description: '多平台题目聚合与判题',
      },
      {
        title: '洛谷保存站',
        href: 'https://www.luogu.me',
        description: '洛谷专栏与剪贴板备份',
      },
      {
        title: 'Algorithm Duels Online',
        href: 'https://algorithm-duels.online',
        description: '组队算法对战平台',
      },
      {
        title: 'Solution Formatter',
        href: 'https://tj.imken.dev',
        description: '洛谷题解格式化工具',
      },
      {
        title: 'Code Golf',
        href: 'https://code.golf',
        description: '最短代码挑战平台',
      },
      {
        title: 'OI Wiki',
        href: 'https://oi-wiki.org',
        description: '信息学竞赛知识库',
      },
      {
        title: 'OIerDb',
        href: 'https://oier.baoshuo.dev',
        description: '信息学竞赛记录数据库',
      },
      {
        title: '原题机',
        href: 'https://yuantiji.ac/zh/',
        description: '题目来源溯源与检索',
      },
      {
        title: 'Big-O Algorithm Complexity Cheat Sheet',
        href: 'https://www.bigocheatsheet.com',
        description: '算法复杂度速查表',
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
        description: '交互式数学与几何工具',
      },
      {
        title: 'NumPy',
        href: 'https://numpy.org',
        description: 'Python 科学计算库',
      },
      {
        title: 'LaTeX 公式编辑器',
        href: 'https://www.latexlive.com',
        description: 'LaTeX 公式在线编辑器',
      },
      {
        title: 'OEIS',
        href: 'https://oeis.org',
        description: '整数序列在线数据库',
      },
    ],
  },
  {
    title: '前端与站点构建',
    icon: 'lucide:layout-template',
    resources: [
      {
        title: 'React',
        href: 'https://react.dev',
        description: '前端 UI 框架',
      },
      {
        title: 'Docusaurus',
        href: 'https://docusaurus.io',
        description: 'React 文档站点生成器',
      },
      {
        title: 'VitePress',
        href: 'https://vitepress.vuejs.org',
        description: 'Vite 驱动的文档站点生成器',
      },
      {
        title: 'VuePress',
        href: 'https://vuepress.vuejs.org',
        description: 'Vue 文档站点生成器',
      },
      {
        title: 'Material for MkDocs',
        href: 'https://squidfunk.github.io/mkdocs-material',
        description: 'MkDocs 主题与文档站点框架',
      },
      {
        title: 'Hexo',
        href: 'https://hexo.io',
        description: '静态博客生成框架',
      },
      {
        title: 'WordPress',
        href: 'https://wordpress.org',
        description: '开源内容管理系统（CMS）',
      },
    ],
  },
  {
    title: '实用工具',
    icon: 'lucide:bolt',
    resources: [
      {
        title: 'Google 翻译',
        href: 'https://translate.google.com',
        description: '在线翻译与语音输入',
      },
      {
        title: '清华大学开源软件镜像站',
        href: 'https://mirrors.tuna.tsinghua.edu.cn',
        description: '开源软件镜像下载站',
      },
      {
        title: '能不能好好说话？',
        href: 'https://lab.magiconch.com/nbnhhsh/',
        description: '缩写与黑话解释工具',
      },
      {
        title: 'dazidazi',
        href: 'https://dazidazi.com',
        description: '在线打字练习平台',
      },
      {
        title: 'WildCard',
        href: 'https://bewildcard.com',
        description: '订阅与支付辅助服务',
      },
      {
        title: 'Luban SMS',
        href: 'https://lubansms.com',
        description: '短信接码与验证平台',
      },
      {
        title: 'Class Widgets',
        href: 'https://classwidgets.rinlit.cn',
        description: '桌面课表与小组件工具',
      },
      {
        title: '电子教室终结者',
        href: 'https://dzjszjz.nkxingxh.top',
        description: '电子教室限制绕过工具',
      },
      {
        title: 'Note.ms',
        href: 'https://note.ms',
        description: '公共剪贴板与临时笔记',
      },
      {
        title: 'QR Code Generator',
        href: 'https://www.qr-code-generator.com',
        description: '二维码在线生成工具',
      },
    ],
  },
  {
    title: '测试与分析',
    icon: 'lucide:bar-chart-2',
    resources: [
      {
        title: 'Speedtest',
        href: 'https://www.speedtest.net',
        description: '网络测速与延迟测试',
      },
      {
        title: 'Password Monster',
        href: 'https://passwordmonster.com',
        description: '密码强度评估工具',
      },
      {
        title: 'A Real Me',
        href: 'https://www.arealme.com',
        description: '趣味测试与量表集合',
      },
      {
        title: 'CPS 测试',
        href: 'https://clickspeedtest.com',
        description: '鼠标点击速度测试',
      },
      {
        title: '政治倾向测试',
        href: 'https://luckyfuy.top/compass/',
        description: '政治立场光谱测试',
      },
    ],
  },
  {
    title: '知识与参考',
    icon: 'lucide:library',
    resources: [
      {
        title: '维基百科',
        href: 'https://zh.wikipedia.org',
        description: '自由百科与知识条目',
      },
      {
        title: 'cppreference',
        href: 'https://cppreference.com',
        description: 'C++ 标准库参考文档',
      },
      {
        title: 'Passport Index',
        href: 'https://www.passportindex.org',
        description: '护照免签与通行排名',
      },
    ],
  },
  {
    title: '数码与硬件',
    icon: 'lucide:smartphone',
    resources: [
      {
        title: 'Apple',
        href: 'https://www.apple.com',
        description: 'Apple 官方网站与产品页',
      },
      {
        title: 'Apple 产品参数中心',
        href: 'https://hubweb.cn',
        description: 'Apple 参数对比与检索',
      },
      {
        title: 'SOCPK',
        href: 'https://socpk.com',
        description: '移动芯片参数与性能对比',
      },
      {
        title: '数码荔枝',
        href: 'https://lizhi.shop',
        description: '正版软件购买平台',
      },
      {
        title: 'volumeshader_bm',
        href: 'https://cznull.github.io/vsbm',
        description: 'GPU 压力测试（毒蘑菇）',
      },
      {
        title: 'HTML5 Fish Bowl',
        href: 'https://eucscore.com/demos/HTML5-Fishbowl/index.html',
        description: 'Canvas/GPU 渲染测试',
      },
      {
        title: 'WebGL Aquarium',
        href: 'https://webglsamples.org/aquarium/aquarium.html',
        description: 'WebGL 渲染性能测试',
      },
    ],
  },
  {
    title: '设计与可视化',
    icon: 'lucide:palette',
    resources: [
      {
        title: 'Colorable',
        href: 'https://colorable.jxnblk.com',
        description: '颜色对比度与可读性检测',
      },
      {
        title: 'Skill Icons',
        href: 'https://skillicons.dev',
        description: '技能图标生成服务',
      },
      {
        title: 'BrandColors',
        href: 'https://brandcolors.net',
        description: '品牌配色与色值库',
      },
      {
        title: 'Maker World',
        href: 'https://makerworld.com.cn',
        description: '设计资源与创意社区',
      },
      {
        title: 'amCharts Pixel Map',
        href: 'https://pixelmap.amcharts.com',
        description: '像素地图在线编辑器',
      },
      {
        title: 'Recraft',
        href: 'https://www.recraft.ai',
        description: 'AI 矢量图生成工具',
      },
      {
        title: 'Mult',
        href: 'https://mult.dev',
        description: '路线动画与视频生成工具',
      },
      {
        title: 'OpenCut',
        href: 'https://opencut.app',
        description: '开源视频剪辑工具',
      },
      {
        title: 'CodeSnap',
        href: 'https://codesnap.dev',
        description: '代码截图与排版美化工具',
      },
      {
        title: 'Bento Grids',
        href: 'https://bentogrids.com',
        description: 'Bento 网格布局灵感库',
      },
    ],
  },
  {
    title: '媒体与社区',
    icon: 'lucide:users',
    resources: [
      {
        title: 'X (Twitter)',
        href: 'https://x.com',
        description: '实时信息与社交平台',
      },
      {
        title: 'Facebook',
        href: 'https://www.facebook.com',
        description: '社交网络平台',
      },
      {
        title: 'Telegram Web',
        href: 'https://web.telegram.org',
        description: 'Telegram 网页版客户端',
      },
      {
        title: 'YouTube',
        href: 'https://www.youtube.com',
        description: '视频平台与创作者生态',
      },
      {
        title: 'bilibili',
        href: 'https://www.bilibili.com',
        description: '视频社区与弹幕平台',
      },
      {
        title: 'Polymarket',
        description: '预测市场与事件赔率平台',
        href: 'https://polymarket.com',
      },
    ],
  },
  {
    title: '在线娱乐',
    icon: 'lucide:gamepad',
    resources: [
      {
        title: 'CrazyGames',
        href: 'https://www.crazygames.com',
        description: '网页小游戏平台',
      },
      {
        title: '.io Games',
        href: 'https://iogames.space',
        description: '.io 游戏索引与导航',
      },
      {
        title: 'generals.io',
        href: 'https://generals.io',
        description: '实时多人策略对战',
      },
      {
        title: 'TileMan.io',
        href: 'https://tileman.io',
        description: '领土扩张策略游戏',
      },
      {
        title: 'YORG.io',
        href: 'https://yorg.io',
        description: '塔防与资源管理游戏',
      },
      {
        title: 'Bloxd.io',
        href: 'https://bloxd.io',
        description: '在线沙盒与跑酷对战',
      },
      {
        title: '名字竞技场',
        href: 'https://namerena.github.io',
        description: '文本对战小游戏',
      },
      {
        title: '图寻',
        href: 'https://tuxun.fun',
        description: '地理位置猜测游戏',
      },
      {
        title: '猜盐',
        href: 'https://xiaoce.fun',
        description: '趣味问答与挑战平台',
      },
      {
        title: 'WPlace',
        href: 'https://wplace.live',
        description: '多人协作像素画布',
      },
      {
        title: 'sandspiel',
        href: 'https://sandspiel.club',
        description: '粒子沙盒模拟器',
      },
      {
        title: 'HullQin Game',
        href: 'https://game.hullqin.cn',
        description: '在线桌游合集平台',
      },
      {
        title: 'Neal.fun',
        href: 'https://neal.fun',
        description: '互动网页小游戏合集',
      },
      {
        title: 'Kiomet',
        href: 'https://kiomet.com',
        description: '在线即时战略游戏',
      },
      {
        title: 'LINKR',
        href: 'https://www.playlinkr.net',
        description: '每日连线挑战游戏',
      },
      {
        title: 'diep.io',
        description: '多人坦克射击对战',
        href: 'https://diep.io',
      },
      {
        title: '信任的进化',
        description: '互动游戏：信任与博弈',
        href: 'https://dccxi.com/trust/',
      },
    ],
  },
  {
    title: '网络与访问',
    icon: 'lucide:globe',
    resources: [
      {
        title: '墙妈妈',
        href: 'https://www.wallmama.com',
        description: '网络访问与工具导航',
      },
      {
        title: 'ExpressVPN',
        href: 'https://www.expressvpn.com',
        description: 'VPN 服务提供商',
      },
      {
        title: 'NordVPN',
        href: 'https://nordvpn.com',
        description: 'VPN 服务提供商',
      },
      {
        title: 'AstrillVPN',
        href: 'https://www.astrill.com',
        description: 'VPN 服务提供商',
      },
      {
        title: 'Taishan Net',
        href: 'https://taishan.pro',
        description: '多协议网络代理服务',
      },
    ],
  },
];
