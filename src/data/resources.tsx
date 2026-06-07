interface ResourceItem {
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
    title: '搜索与百科',
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
        description: '微软网页搜索引擎',
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
        description: 'OpenAI 通用对话助手',
      },
      {
        title: 'Gemini',
        href: 'https://gemini.google.com',
        description: '谷歌多模态对话助手',
      },
      {
        title: 'Claude',
        href: 'https://claude.ai',
        description: 'Anthropic 对话助手',
      },
      {
        title: 'Grok',
        href: 'https://grok.com',
        description: 'xAI 对话助手',
      },
      {
        title: 'DeepSeek',
        href: 'https://deepseek.com',
        description: '深度求索开源大模型',
      },
      {
        title: 'Sora',
        href: 'https://sora.com',
        description: 'OpenAI 文本生成视频工具',
      },
    ],
  },
  {
    title: 'AI 平台与生态',
    icon: 'lucide:microscope',
    resources: [
      {
        title: 'Hugging Face',
        href: 'https://huggingface.co',
        description: '开源模型与数据集社区',
      },
      {
        title: 'Arena',
        href: 'https://arena.ai',
        description: '大模型对战排行榜',
      },
      {
        title: 'GPTZero',
        href: 'https://gptzero.me',
        description: 'AI 生成文本检测工具',
      },
      {
        title: 'Not By AI',
        href: 'https://notbyai.fyi',
        description: '人类原创内容标识徽章',
      },
      {
        title: 'Google DeepMind',
        href: 'https://deepmind.com',
        description: '谷歌人工智能研究机构',
      },
      {
        title: 'Google AI Studio',
        href: 'https://aistudio.google.com',
        description: 'Gemini 模型开发平台',
      },
      {
        title: 'Meta AI',
        href: 'https://ai.facebook.com',
        description: 'Meta 人工智能研究门户',
      },
      {
        title: 'Microsoft AI',
        href: 'https://www.microsoft.com/ai',
        description: '微软人工智能产品门户',
      },
      {
        title: 'DeepLearning.AI',
        href: 'https://deeplearning.ai',
        description: '吴恩达深度学习课程',
      },
      {
        title: 'PyTorch',
        href: 'https://pytorch.org',
        description: '深度学习框架',
      },
      {
        title: 'Keras',
        href: 'https://keras.io',
        description: '高层神经网络 API',
      },
      {
        title: 'TensorFlow',
        href: 'https://www.tensorflow.org',
        description: '谷歌机器学习框架',
      },
    ],
  },
  {
    title: '云、网络与代理',
    icon: 'lucide:cloud',
    resources: [
      {
        title: 'Cloudflare',
        href: 'https://www.cloudflare.com',
        description: 'CDN 与网络安全服务',
      },
      {
        title: 'Amazon Web Services',
        href: 'https://aws.amazon.com',
        description: '亚马逊云计算平台',
      },
      {
        title: 'Microsoft Azure',
        href: 'https://azure.microsoft.com',
        description: '微软云计算平台',
      },
      {
        title: '雨云',
        href: 'https://www.rainyun.com',
        description: '国内云服务器与游戏托管',
      },
      {
        title: 'GoDaddy',
        href: 'https://www.godaddy.com',
        description: '老牌域名注册与建站商',
      },
      {
        title: 'Namecheap',
        href: 'https://www.namecheap.com',
        description: '低价域名与隐私保护',
      },
      {
        title: 'NameSilo',
        href: 'https://www.namesilo.com',
        description: '免费隐私保护域名注册',
      },
      {
        title: 'Nexitally',
        href: 'https://nxonearth.com',
        description: '优质全球网络加速服务',
      },
      {
        title: 'ExpressVPN',
        href: 'https://www.expressvpn.com',
        description: '英属维京群岛高速 VPN',
      },
      {
        title: 'NordVPN',
        href: 'https://nordvpn.com',
        description: '巴拿马多协议 VPN',
      },
      {
        title: 'AstrillVPN',
        href: 'https://www.astrill.com',
        description: '塞舌尔抗封锁 VPN',
      },
      {
        title: 'Taishan Net',
        href: 'https://taishan.pro',
        description: '多协议网络代理服务',
      },
    ],
  },
  {
    title: '开发工具与平台',
    icon: 'lucide:terminal',
    resources: [
      {
        title: 'GitHub',
        href: 'https://github.com',
        description: '代码托管与协作平台',
      },
      {
        title: 'GitStar 排行榜',
        href: 'https://gitstar-ranking.com',
        description: 'GitHub 用户与仓库星标榜',
      },
      {
        title: 'Committers Top',
        href: 'https://committers.top',
        description: 'GitHub 贡献者活跃度排行',
      },
      {
        title: 'GitHub Metrics',
        href: 'https://github.com/lowlighter/metrics',
        description: 'GitHub 个人数据可视化生成器',
      },
      {
        title: 'GitHub Stats',
        href: 'https://github.com/jstrieb/github-stats',
        description: 'GitHub 账号统计图表生成',
      },
      {
        title: 'Shields.io',
        href: 'https://shields.io',
        description: '项目徽章生成服务',
      },
      {
        title: 'GitHub Codespaces',
        href: 'https://github.com/codespaces',
        description: 'GitHub 官方云端开发环境',
      },
      {
        title: 'Gitpod',
        href: 'https://www.gitpod.io',
        description: '云端按需开发工作区',
      },
      {
        title: 'CodeSandbox',
        href: 'https://codesandbox.io',
        description: '在线前端项目沙盒',
      },
      {
        title: 'CodePen',
        href: 'https://codepen.io',
        description: '前端代码片段分享社区',
      },
      {
        title: 'StackBlitz',
        href: 'https://stackblitz.com',
        description: '浏览器内运行的全栈 IDE',
      },
      {
        title: 'vscode.dev',
        href: 'https://vscode.dev',
        description: 'VS Code 网页版编辑器',
      },
      {
        title: 'Sandpack',
        href: 'https://sandpack.codesandbox.io',
        description: '可嵌入的代码沙盒组件库',
      },
      {
        title: 'OnlineGDB',
        href: 'https://www.onlinegdb.com/online_python_compiler',
        description: '在线编译器与调试器',
      },
      {
        title: 'Compiler Explorer',
        href: 'https://godbolt.org',
        description: '在线汇编输出查看工具',
      },
      {
        title: 'PyCharm',
        href: 'https://www.jetbrains.com/pycharm',
        description: 'JetBrains Python 集成开发环境',
      },
      {
        title: 'Jupyter',
        href: 'https://jupyter.org',
        description: '交互式笔记本计算环境',
      },
    ],
  },
  {
    title: '前端与文档站',
    icon: 'lucide:layout-template',
    resources: [
      {
        title: 'React',
        href: 'https://react.dev',
        description: '前端用户界面构建库',
      },
      {
        title: 'Docusaurus',
        href: 'https://docusaurus.io',
        description: 'React 文档站点生成器',
      },
      {
        title: 'VitePress',
        href: 'https://vitepress.vuejs.org',
        description: '基于 Vite 的 Vue 文档框架',
      },
      {
        title: 'VuePress',
        href: 'https://vuepress.vuejs.org',
        description: 'Vue 官方文档站点框架',
      },
      {
        title: 'Material for MkDocs',
        href: 'https://squidfunk.github.io/mkdocs-material',
        description: 'MkDocs 的 Material 设计主题',
      },
      {
        title: 'Hexo',
        href: 'https://hexo.io',
        description: 'Node.js 静态博客生成器',
      },
      {
        title: 'WordPress',
        href: 'https://wordpress.org',
        description: '开源博客与内容管理系统',
      },
    ],
  },
  {
    title: '学术与学习',
    icon: 'lucide:graduation-cap',
    resources: [
      {
        title: 'Google Scholar',
        href: 'https://scholar.google.com',
        description: '学术文献搜索引擎',
      },
      {
        title: 'Science',
        href: 'https://www.science.org/journal/science',
        description: '《科学》期刊官网',
      },
      {
        title: 'Nature',
        href: 'https://www.nature.com',
        description: '《自然》期刊官网',
      },
      {
        title: 'arXiv',
        href: 'https://arxiv.org',
        description: '学术论文预印本仓库',
      },
      {
        title: 'Overleaf',
        href: 'https://www.overleaf.com',
        description: '在线 LaTeX 协作编辑器',
      },
      {
        title: 'Coursera',
        href: 'https://www.coursera.org',
        description: '高校在线课程平台',
      },
      {
        title: 'edX',
        href: 'https://www.edx.org',
        description: '高校公开课学习平台',
      },
      {
        title: 'MIT OpenCourseWare',
        href: 'https://ocw.mit.edu',
        description: '麻省理工开放课程',
      },
      {
        title: 'Class Central',
        href: 'https://www.classcentral.com',
        description: '在线课程聚合检索',
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
        description: '中文信息学竞赛 OJ',
      },
      {
        title: 'Codeforces',
        href: 'https://codeforces.com',
        description: '俄罗斯算法竞赛平台',
      },
      {
        title: 'AtCoder',
        href: 'https://atcoder.jp',
        description: '日本算法竞赛平台',
      },
      {
        title: 'Virtual Judge',
        href: 'https://vjudge.net',
        description: '跨 OJ 题目聚合提交',
      },
      {
        title: '洛谷保存站',
        href: 'https://www.luogu.me',
        description: '洛谷题目社区镜像',
      },
      {
        title: 'Algorithm Duels Online',
        href: 'https://algorithm-duels.online',
        description: '算法题在线对战',
      },
      {
        title: 'Solution Formatter',
        href: 'https://tj.imken.dev',
        description: '洛谷题解格式化工具',
      },
      {
        title: 'Code Golf',
        href: 'https://code.golf',
        description: '最短代码挑战游戏',
      },
      {
        title: 'OI Wiki',
        href: 'https://oi-wiki.org',
        description: '信息学竞赛知识库',
      },
      {
        title: 'OIerDb',
        href: 'https://oier.baoshuo.dev',
        description: 'OI 选手获奖数据库',
      },
      {
        title: '原题机',
        href: 'https://yuantiji.ac/zh/',
        description: '竞赛原题相似度检索',
      },
      {
        title: 'Big-O Algorithm Complexity Cheat Sheet',
        href: 'https://www.bigocheatsheet.com',
        description: '算法复杂度速查表',
      },
      {
        title: 'Diff Tool',
        href: 'https://csacademy.com/app/diffing_tool/',
        description: '在线文本差异比对',
      },
      {
        title: 'Graph Editor',
        href: 'https://csacademy.com/app/graph_editor/',
        description: '在线图论可视化编辑',
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
        description: '在线函数图像计算器',
      },
      {
        title: 'Wolfram Alpha',
        href: 'https://www.wolframalpha.com',
        description: '计算知识引擎',
      },
      {
        title: 'GeoGebra',
        href: 'https://www.geogebra.org',
        description: '动态数学几何软件',
      },
      {
        title: 'NumPy',
        href: 'https://numpy.org',
        description: 'Python 科学计算库',
      },
      {
        title: 'LaTeX 公式编辑器',
        href: 'https://www.latexlive.com',
        description: '在线 LaTeX 公式编辑',
      },
      {
        title: 'OEIS',
        href: 'https://oeis.org',
        description: '整数数列在线百科',
      },
      {
        title: 'cppreference',
        href: 'https://cppreference.com',
        description: 'C++ 标准库参考文档',
      },
    ],
  },
  {
    title: '设计与创意',
    icon: 'lucide:palette',
    resources: [
      {
        title: 'Colorable',
        href: 'https://colorable.jxnblk.com',
        description: '配色对比度可访问性检测工具',
      },
      {
        title: 'Skill Icons',
        href: 'https://skillicons.dev',
        description: '开发技能图标生成服务',
      },
      {
        title: 'BrandColors',
        href: 'https://brandcolors.net',
        description: '知名品牌官方配色查询库',
      },
      {
        title: 'Maker World',
        href: 'https://makerworld.com.cn',
        description: '拓竹 3D 打印模型分享社区',
      },
      {
        title: 'amCharts Pixel Map',
        href: 'https://pixelmap.amcharts.com',
        description: '像素风世界地图在线编辑器',
      },
      {
        title: 'Recraft',
        href: 'https://www.recraft.ai',
        description: 'AI 矢量图与插画生成',
      },
      {
        title: 'Quiver AI',
        href: 'https://quiver.ai',
        description: 'AI 矢量图生成与动效平台',
      },
      {
        title: 'Mult',
        href: 'https://mult.dev',
        description: '旅行路线动画地图制作',
      },
      {
        title: 'OpenCut',
        href: 'https://opencut.app',
        description: '开源在线视频剪辑工具',
      },
      {
        title: 'CodeSnap',
        href: 'https://codesnap.dev',
        description: '代码截图美化生成工具',
      },
      {
        title: 'Bento Grids',
        href: 'https://bentogrids.com',
        description: '便当网格布局设计灵感集',
      },
    ],
  },
  {
    title: '测试与基准',
    icon: 'lucide:bar-chart-2',
    resources: [
      {
        title: 'Speedtest',
        href: 'https://www.speedtest.net',
        description: '网络带宽速度测试',
      },
      {
        title: 'Net.Coffee',
        href: 'https://ip.net.coffee',
        description: 'IP 归属与网络分流检测',
      },
      {
        title: 'Password Monster',
        href: 'https://passwordmonster.com',
        description: '密码强度评估工具',
      },
      {
        title: 'A Real Me',
        href: 'https://www.arealme.com',
        description: '综合趣味在线测试合集',
      },
      {
        title: 'CPS 测试',
        href: 'https://clickspeedtest.com',
        description: '鼠标点击速度测试',
      },
      {
        title: '政治倾向测试',
        href: 'https://luckyfuy.top/compass/',
        description: '基于 8Values 的政治倾向测验',
      },
      {
        title: 'volumeshader_bm',
        href: 'https://cznull.github.io/vsbm',
        description: 'WebGL 体积着色器性能基准',
      },
      {
        title: 'HTML5 Fish Bowl',
        href: 'https://eucscore.com/demos/HTML5-Fishbowl/index.html',
        description: 'HTML5 鱼缸渲染性能演示',
      },
      {
        title: 'WebGL Aquarium',
        href: 'https://webglsamples.org/aquarium/aquarium.html',
        description: 'WebGL 水族馆图形性能演示',
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
        description: 'X 社交媒体平台',
      },
      {
        title: 'Facebook',
        href: 'https://www.facebook.com',
        description: 'Facebook 社交网络',
      },
      {
        title: 'Telegram Web',
        href: 'https://web.telegram.org',
        description: 'Telegram 即时通讯网页版',
      },
      {
        title: 'YouTube',
        href: 'https://www.youtube.com',
        description: '全球视频分享平台',
      },
      {
        title: 'bilibili',
        href: 'https://www.bilibili.com',
        description: '国内弹幕视频社区',
      },
      {
        title: 'Polymarket',
        href: 'https://polymarket.com',
        description: '链上事件预测交易市场',
      },
    ],
  },
  {
    title: '网页游戏',
    icon: 'lucide:gamepad',
    resources: [
      {
        title: 'CrazyGames',
        href: 'https://www.crazygames.com',
        description: '免下载浏览器小游戏平台',
      },
      {
        title: '.io Games',
        href: 'https://iogames.space',
        description: 'io 多人网页游戏聚合站',
      },
      {
        title: 'generals.io',
        href: 'https://generals.io',
        description: '回合制占领将军格战棋',
      },
      {
        title: 'florr.io',
        href: 'https://florr.io',
        description: '花朵养成多人对战',
      },
      {
        title: 'TileMan.io',
        href: 'https://tileman.io',
        description: '方格占地盘多人对战',
      },
      {
        title: 'YORG.io',
        href: 'https://yorg.io',
        description: '僵尸塔防与资源管理',
      },
      {
        title: 'Bloxd.io',
        href: 'https://bloxd.io',
        description: '类 Minecraft 多人沙盒',
      },
      {
        title: '名字竞技场',
        href: 'https://namerena.github.io',
        description: '给名字加后缀的文本对战',
      },
      {
        title: '图寻',
        href: 'https://tuxun.fun',
        description: '中文街景猜位置游戏',
      },
      {
        title: '猜盐',
        href: 'https://xiaoce.fun',
        description: '互动答题小测平台',
      },
      {
        title: 'WPlace',
        href: 'https://wplace.live',
        description: '多人协作像素绘制画布',
      },
      {
        title: 'sandspiel',
        href: 'https://sandspiel.club',
        description: '元素粒子物理沙盒',
      },
      {
        title: 'HullQin Game',
        href: 'https://game.hullqin.cn',
        description: '五子棋四国军棋桌游合集',
      },
      {
        title: 'Lichess',
        href: 'https://lichess.org',
        description: '免费开源国际象棋平台',
      },
      {
        title: 'Neal.fun',
        href: 'https://neal.fun',
        description: 'Neal Agarwal 互动实验合集',
      },
      {
        title: 'Kiomet',
        href: 'https://kiomet.com',
        description: '实时多人策略对战',
      },
      {
        title: 'LINKR',
        href: 'https://www.playlinkr.net',
        description: '每日字词连线解谜',
      },
      {
        title: 'diep.io',
        href: 'https://diep.io',
        description: '多人坦克升级射击',
      },
      {
        title: '信任的进化',
        href: 'https://dccxi.com/trust/',
        description: '博弈论交互叙事',
      },
      {
        title: 'Gridspech',
        href: 'https://gridspech.baublejar.com',
        description: '格子染色益智解谜',
      },
    ],
  },
  {
    title: '实用工具',
    icon: 'lucide:bolt',
    resources: [
      {
        title: '维基百科',
        href: 'https://zh.wikipedia.org',
        description: '自由协作的多语言在线百科',
      },
      {
        title: 'Apple',
        href: 'https://www.apple.com',
        description: '苹果公司官方网站',
      },
      {
        title: 'Apple 产品参数中心',
        href: 'https://hubweb.cn',
        description: '苹果产品规格查询与对比',
      },
      {
        title: 'SOCPK',
        href: 'https://socpk.com',
        description: '手机芯片性能跑分对比',
      },
      {
        title: '数码荔枝',
        href: 'https://lizhi.shop',
        description: '国内正版软件零售平台',
      },
      {
        title: 'Passport Index',
        href: 'https://www.passportindex.org',
        description: '全球护照免签排名与比较',
      },
      {
        title: 'Google 翻译',
        href: 'https://translate.google.com',
        description: '谷歌多语言在线翻译',
      },
      {
        title: '清华大学开源软件镜像站',
        href: 'https://mirrors.tuna.tsinghua.edu.cn',
        description: '开源软件与系统镜像源',
      },
      {
        title: '能不能好好说话？',
        href: 'https://lab.magiconch.com/nbnhhsh/',
        description: '中文网络拼音缩写还原',
      },
      {
        title: 'dazidazi',
        href: 'https://dazidazi.com',
        description: '在线打字练习平台',
      },
      {
        title: 'WildAI',
        href: 'https://bewild.ai',
        description: '海外订阅虚拟信用卡服务',
      },
      {
        title: 'Luban SMS',
        href: 'https://lubansms.com',
        description: '短信接码与验证平台',
      },
      {
        title: 'Class Widgets',
        href: 'https://classwidgets.rinlit.cn',
        description: 'Windows 桌面课程表小组件',
      },
      {
        title: '电子教室终结者',
        href: 'https://dzjszjz.nkxingxh.top',
        description: '反极域电子教室控制工具',
      },
      {
        title: 'Note.ms',
        href: 'https://note.ms',
        description: '公共剪贴板与临时笔记',
      },
      {
        title: 'QR Code Generator',
        href: 'https://www.qr-code-generator.com',
        description: '在线二维码生成工具',
      },
      {
        title: 'iLovePDF',
        href: 'https://www.ilovepdf.com',
        description: '在线 PDF 转换与编辑工具',
      },
      {
        title: 'Forensically',
        href: 'https://29a.ch/photo-forensics',
        description: '在线图片篡改取证分析工具',
      },
    ],
  },
];
