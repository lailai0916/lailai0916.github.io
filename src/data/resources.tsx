export interface Resource {
  name: string
  logo: string
  desc: string
  href: string
}

export interface ResourceCategory {
  name: string
  resources: Resource[]
}

export const resourceData: ResourceCategory[] = [
  {
    name: '🔍 搜索引擎',
    resources: [
      {
        name: 'Google',
        desc: '全球领先的搜索引擎，提供准确快速的搜索服务',
        logo: 'https://www.google.com/favicon.ico',
        href: 'https://www.google.com',
      },
      {
        name: 'Microsoft Bing',
        desc: '微软开发的搜索引擎，集成 AI 功能',
        logo: 'https://www.bing.com/favicon.ico',
        href: 'https://www.bing.com',
      },
      {
        name: '百度',
        desc: '中国最大的中文搜索引擎',
        logo: 'https://www.baidu.com/favicon.ico',
        href: 'https://www.baidu.com',
      },
    ],
  },
  {
    name: '☁️ 云计算与认证',
    resources: [
      {
        name: 'Amazon Web Services',
        desc: '全球领先的云计算平台，提供全面的云服务',
        logo: 'https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_179x109.png',
        href: 'https://aws.amazon.com',
      },
      {
        name: 'Microsoft Azure',
        desc: '全球第二大云计算平台，提供丰富的云服务和解决方案',
        logo: 'https://azure.microsoft.com/favicon.ico',
        href: 'https://azure.microsoft.com',
      },
      {
        name: 'Cloudflare',
        desc: '全球领先的网络安全和性能优化平台',
        logo: 'https://www.cloudflare.com/favicon.ico',
        href: 'https://www.cloudflare.com',
      },
    ],
  },
  {
    name: '🎓 MOOC 平台',
    resources: [
      {
        name: 'Class Central',
        desc: '全球在线课程搜索和比较平台',
        logo: 'https://www.classcentral.com/safari-pinned-tab.svg',
        href: 'https://www.classcentral.com/',
      },
      {
        name: 'Coursera',
        desc: '与顶尖大学和公司合作的在线学习平台',
        logo: 'https://d3njjcbhbojbot.cloudfront.net/web/images/favicons/apple-touch-icon-v2-180x180.png',
        href: 'https://www.coursera.org/',
      },
      {
        name: 'edX',
        desc: '由哈佛和MIT创立的开放式在线课程平台',
        logo: 'https://www.edx.org/images/logos/edx-logo-elm.svg',
        href: 'https://www.edx.org/',
      },
      {
        name: 'MIT OpenCourseWare',
        desc: 'MIT 提供的免费在线课程材料',
        logo: 'https://ocw.mit.edu/static_shared/images/ocw_logo_orange.png',
        href: 'https://ocw.mit.edu/',
      },
    ],
  },
  {
    name: '🚀 代码托管与部署',
    resources: [
      {
        name: 'GitHub',
        desc: '全球最大的代码托管平台，开源项目的大本营',
        logo: 'https://github.githubassets.com/favicons/favicon.svg',
        href: 'https://github.com',
      },
      {
        name: 'GitLab',
        desc: '企业级 DevOps 平台，支持完整的软件开发生命周期',
        logo: 'https://about.gitlab.com/favicon.ico',
        href: 'https://gitlab.com',
      },
    ],
  },
  {
    name: '📊 GitHub 生态工具',
    resources: [
      {
        name: 'GitStar 排行榜',
        desc: '非官方 GitHub 用户、组织与仓库 Star 数排行榜',
        logo: 'https://gitstar-ranking.com/favicon.ico',
        href: 'https://gitstar-ranking.com/',
      },
      {
        name: 'Committers Top',
        desc: '不同国家/地区最活跃 GitHub 用户榜单',
        logo: 'https://committers.top/images/favicon.ico',
        href: 'https://committers.top/',
      },
      {
        name: 'GitHub Metrics',
        desc: '30+ 插件、300+ 选项的 GitHub 账号信息图生成器',
        logo: 'https://github.githubassets.com/images/icons/emoji/unicode/1f4ca.png',
        href: 'https://github.com/lowlighter/metrics',
      },
      {
        name: 'GitHub Stats',
        desc: '为 GitHub 个人资料生成统计图像，支持私有仓库统计',
        logo: 'https://raw.githubusercontent.com/jstrieb/github-stats/master/generated/overview.svg',
        href: 'https://github.com/jstrieb/github-stats',
      },
      {
        name: 'GitHub Profile README Generator',
        desc: '轻松创建精美的 GitHub 个人资料 README',
        logo: 'https://rahuldkjain.github.io/gh-profile-readme-generator/static/mdg-040f54e2f6c858e0a3dcf568c3f2b6f1.png',
        href: 'https://rahuldkjain.github.io/gh-profile-readme-generator/',
      },
    ],
  },
  {
    name: '💻 在线开发工具',
    resources: [
      {
        name: 'GitHub Codespaces',
        desc: 'GitHub 提供的云端开发环境，即开即用',
        logo: 'https://github.githubassets.com/favicons/favicon.svg',
        href: 'https://github.com/codespaces',
      },
      {
        name: 'Gitpod',
        desc: '云开发环境，加速软件开发流程',
        logo: 'https://www.gitpod.io/favicon192.png',
        href: 'https://www.gitpod.io/',
      },
      {
        name: 'CodeSandbox',
        desc: '云端代码编辑器和协作开发平台',
        logo: 'https://codesandbox.io/favicon.ico',
        href: 'https://codesandbox.io/',
      },
      {
        name: 'CodePen',
        desc: '前端开发的在线编辑器，构建、测试和展示代码',
        logo: 'https://codepen.io/favicon.ico',
        href: 'https://codepen.io/',
      },
      {
        name: 'StackBlitz',
        desc: '极速在线 IDE，支持 Angular、React、Vue 等现代框架',
        logo: 'https://stackblitz.com/_astro/favicon.svg',
        href: 'https://stackblitz.com/',
      },
      {
        name: 'vscode.dev',
        desc: 'VS Code 官方浏览器版本，轻量级云端开发',
        logo: 'https://vscode.dev/static/stable/favicon.ico',
        href: 'https://vscode.dev/',
      },
      {
        name: 'Sandpack',
        desc: 'CodeSandbox 出品的嵌入式代码编辑组件',
        logo: 'https://sandpack.codesandbox.io/favicon.ico',
        href: 'https://sandpack.codesandbox.io/',
      },
      {
        name: 'OnlineGDB',
        desc: '在线编译、运行、调试多种编程语言',
        logo: 'https://www.onlinegdb.com/favicon.ico',
        href: 'https://www.onlinegdb.com/online_python_compiler',
      },
    ],
  },
  {
    name: '📖 静态站点生成',
    resources: [
      {
        name: 'VitePress',
        desc: '基于 Vite 和 Vue 的现代静态网站生成器',
        logo: 'https://vitepress.dev/vitepress-logo-mini.svg',
        href: 'https://vitepress.vuejs.org',
      },
      {
        name: 'VuePress',
        desc: 'Vue 驱动的静态网站生成器，专注于文档',
        logo: 'https://vuepress.vuejs.org/images/hero.png',
        href: 'https://vuepress.vuejs.org',
      },
      {
        name: 'Docusaurus',
        desc: 'Facebook 开源的文档网站构建工具',
        logo: 'https://docusaurus.io/img/docusaurus.svg',
        href: 'https://docusaurus.io',
      },
      {
        name: 'Hexo',
        desc: '快速、简洁且高效的博客框架',
        logo: 'https://hexo.io/favicon.ico',
        href: 'https://hexo.io',
      },
      {
        name: 'WordPress',
        desc: '全球最受欢迎的开源内容管理系统',
        logo: 'https://s1.wp.com/i/favicon.ico',
        href: 'https://wordpress.org/',
      },
    ],
  },
  {
    name: '🎯 在线工具',
    resources: [
      {
        name: '能不能好好说话？',
        desc: '拼音首字母缩写翻译工具',
        logo: 'https://lab.magiconch.com/favicon.ico',
        href: 'https://lab.magiconch.com/nbnhhsh/',
      },
      {
        name: 'Colorable',
        desc: '检测文本与背景颜色对比度的无障碍工具',
        logo: 'https://colorable.jxnblk.com/favicon.ico',
        href: 'https://colorable.jxnblk.com',
      },
      {
        name: 'Diff Tool',
        desc: '在线代码差异比较工具',
        logo: 'https://csacademy.com/favicon.ico',
        href: 'https://csacademy.com/app/diffing_tool/',
      },
      {
        name: 'Graph Editor',
        desc: '在线图论可视化和编辑工具',
        logo: 'https://csacademy.com/favicon.ico',
        href: 'https://csacademy.com/app/graph_editor/',
      },
      {
        name: 'Password Monster',
        desc: '密码强度检测和生成工具',
        logo: 'https://passwordmonster.com/favicon.ico',
        href: 'https://passwordmonster.com/',
      },
      {
        name: '原题机',
        desc: '编程竞赛题目溯源工具',
        logo: 'http://yuantiji.ac/favicon.ico',
        href: 'http://yuantiji.ac/zh/',
      },
      {
        name: 'Speedtest',
        desc: '全球领先的网络速度测试工具',
        logo: 'https://www.speedtest.net/favicon.ico',
        href: 'https://www.speedtest.net',
      },
    ],
  },
  {
    name: '🎯 在线测试',
    resources: [
      {
        name: 'CPS 测试',
        desc: '在线鼠标点击速度测试工具',
        logo: 'https://clickspeedtest.com/favicon.ico',
        href: 'https://clickspeedtest.com/',
      },
      {
        name: '政治倾向测试',
        desc: '基于 8Values 的政治倾向分析',
        logo: '',
        href: 'https://luckyfuy.top/compass/',
      },
      {
        name: '毒蘑菇测试',
        desc: 'GPU 图形渲染性能基准测试',
        logo: '',
        href: 'https://cznull.github.io/vsbm',
      },
    ],
  },
  {
    name: '📚 学术研究',
    resources: [
      {
        name: 'Science',
        desc: '全球顶级同行评审科学期刊，发布突破性研究成果',
        logo: 'https://www.science.org/favicon.ico',
        href: 'https://www.science.org/journal/science',
      },
      {
        name: 'Nature',
        desc: '自 1869 年以来推动科学发现的权威多学科期刊',
        logo: 'https://www.nature.com/favicon.ico',
        href: 'https://www.nature.com/',
      },
      {
        name: 'Google Scholar',
        desc: '学术文献搜索引擎，站在学术巨人的肩膀上',
        logo: 'https://scholar.google.com/favicon.ico',
        href: 'https://scholar.google.com/',
      },
      {
        name: 'arXiv',
        desc: '开放获取的预印本论文库，涵盖多个学科领域',
        logo: 'https://arxiv.org/favicon.ico',
        href: 'https://arxiv.org/',
      },
    ],
  },
  {
    name: '🤖 人工智能平台',
    resources: [
      {
        name: 'ChatGPT',
        desc: 'OpenAI 开发的大型语言模型，支持对话和文本生成',
        logo: 'https://chatgpt.com/favicon.ico',
        href: 'https://chatgpt.com/',
      },
      {
        name: 'Sora',
        desc: 'OpenAI 开发的文本到视频生成模型',
        logo: 'https://sora.com/favicon.ico',
        href: 'https://sora.com',
      },
      {
        name: 'Hugging Face',
        desc: '开源 AI 模型和数据集社区，机器学习的 GitHub',
        logo: 'https://huggingface.co/favicon.ico',
        href: 'https://huggingface.co/',
      },
      {
        name: 'Google DeepMind',
        desc: 'Google 的 AI 研究实验室，推动 AGI 发展',
        logo: 'https://deepmind.google/favicon.ico',
        href: 'https://deepmind.com/',
      },
      {
        name: 'DeepLearning.AI',
        desc: '吴恩达创立的 AI 教育平台，提供专业 AI 课程',
        logo: 'https://www.deeplearning.ai/favicon.ico',
        href: 'https://deeplearning.ai/',
      },
      {
        name: 'Meta AI',
        desc: 'Meta（Facebook）的人工智能研究部门',
        logo: 'https://ai.facebook.com/favicon.ico',
        href: 'https://ai.facebook.com/',
      },
      {
        name: 'Google AI',
        desc: 'Google 的 AI 研究和产品部门',
        logo: 'https://ai.google/favicon.ico',
        href: 'https://ai.google/',
      },
      {
        name: 'Microsoft AI',
        desc: '微软的人工智能研究和开发',
        logo: 'https://www.microsoft.com/favicon.ico',
        href: 'https://www.microsoft.com/ai',
      },
    ],
  },
  {
    name: '🛠️ AI 开发工具',
    resources: [
      {
        name: 'Keras',
        desc: '高级神经网络 API，简化深度学习开发',
        logo: 'https://keras.io/favicon.ico',
        href: 'https://keras.io/',
      },
      {
        name: 'NumPy',
        desc: 'Python 科学计算的基础包，支持大型多维数组',
        logo: 'https://numpy.org/favicon.ico',
        href: 'https://numpy.org/',
      },
      {
        name: 'PyTorch',
        desc: 'Facebook 开源的深度学习框架',
        logo: 'https://pytorch.org/favicon.ico',
        href: 'https://pytorch.org/',
      },
      {
        name: 'PyCharm',
        desc: 'JetBrains 开发的专业 Python IDE',
        logo: 'https://resources.jetbrains.com/storage/products/company/brand/logos/PyCharm_icon.svg',
        href: 'https://www.jetbrains.com/pycharm/',
      },
      {
        name: 'Jupyter',
        desc: '交互式计算和数据科学的开源平台',
        logo: 'https://jupyter.org/favicon.ico',
        href: 'https://jupyter.org/',
      },
    ],
  },
  {
    name: '📖 百科与参考',
    resources: [
      {
        name: '维基百科',
        desc: '全球最大的多语言自由百科全书',
        logo: 'https://zh.wikipedia.org/static/favicon/wikipedia.ico',
        href: 'https://zh.wikipedia.org/',
      },
      {
        name: 'OEIS',
        desc: '在线整数序列百科全书，数学研究的重要资源',
        logo: 'https://oeis.org/favicon.ico',
        href: 'https://oeis.org/',
      },
      {
        name: 'cppreference',
        desc: 'C++ 标准库参考文档',
        logo: 'https://en.cppreference.com/favicon.ico',
        href: 'https://en.cppreference.com/w/',
      },
      {
        name: 'Passport Index',
        desc: '全球护照实力和免签国家排名',
        logo: 'https://www.passportindex.org/favicon.ico',
        href: 'https://www.passportindex.org/',
      },
    ],
  },
  {
    name: '📐 数学与计算工具',
    resources: [
      {
        name: 'Desmos',
        desc: '强大的在线图形计算器和数学探索工具',
        logo: 'https://www.desmos.com/favicon.ico',
        href: 'https://www.desmos.com',
      },
      {
        name: 'GeoGebra',
        desc: '交互式数学软件，支持几何、代数、统计等',
        logo: 'https://www.geogebra.org/favicon.ico',
        href: 'https://www.geogebra.org',
      },
      {
        name: 'LaTeX 公式编辑器',
        desc: '实时预览的 LaTeX 数学公式编辑工具',
        logo: 'https://www.latexlive.com/favicon.ico',
        href: 'https://www.latexlive.com',
      },
      {
        name: 'Wolfram Alpha',
        desc: '计算型知识引擎，解答数学和科学问题',
        logo: 'https://www.wolframalpha.com/favicon.ico',
        href: 'https://www.wolframalpha.com',
      },
    ],
  },
  {
    name: '🏆 编程竞赛平台',
    resources: [
      {
        name: 'OI Wiki',
        desc: '信息学奥林匹克竞赛知识整合站点',
        logo: 'https://oi-wiki.org/favicon.ico',
        href: 'https://oi-wiki.org',
      },
      {
        name: 'OIerDb',
        desc: '信息学竞赛获奖记录数据库',
        logo: 'https://oierdb.com/favicon.ico',
        href: 'https://oierdb.com',
      },
      {
        name: '洛谷',
        desc: '国内领先的编程学习和竞赛平台',
        logo: 'https://www.luogu.com.cn/favicon.ico',
        href: 'https://www.luogu.com.cn',
      },
      {
        name: 'Codeforces',
        desc: '全球最受欢迎的编程竞赛平台',
        logo: 'https://codeforces.org/s/126/favicon.ico',
        href: 'https://codeforces.com',
      },
      {
        name: 'AtCoder',
        desc: '日本高质量编程竞赛平台',
        logo: 'https://atcoder.jp/favicon.ico',
        href: 'https://atcoder.jp',
      },
      {
        name: 'Virtual Judge',
        desc: '聚合多个在线判题系统的虚拟平台',
        logo: 'https://vjudge.net/favicon.ico',
        href: 'https://vjudge.net',
      },
      {
        name: 'Code Golf',
        desc: '追求最短代码的编程挑战平台',
        logo: 'https://code.golf/favicon.ico',
        href: 'https://code.golf',
      },
    ],
  },
  {
    name: '🛠️ 开发辅助工具',
    resources: [
      {
        name: 'Compiler Explorer',
        desc: '在线编译器和汇编代码分析工具',
        logo: 'https://godbolt.org/favicon.ico',
        href: 'https://godbolt.org',
      },
      {
        name: '电子教室终结者',
        desc: '解除电子教室软件控制的实用工具',
        logo: 'https://dzjszjz.nkxingxh.top/favicon.ico',
        href: 'https://dzjszjz.nkxingxh.top',
      },
      {
        name: 'React',
        desc: 'Facebook 开发的 JavaScript 库，用于构建用户界面',
        logo: 'https://react.dev/favicon.ico',
        href: 'https://react.dev',
      },
      {
        name: '清华大学开源软件镜像站',
        desc: '提供各种开源软件和包管理器的镜像服务',
        logo: 'https://mirrors.tuna.tsinghua.edu.cn/static/img/logo-small@2x.png',
        href: 'https://mirrors.tuna.tsinghua.edu.cn',
      },
    ],
  },
  {
    name: '📱 数码设备资源',
    resources: [
      {
        name: 'Apple',
        desc: '苹果公司官方网站，了解最新产品和技术',
        logo: 'https://www.apple.com/favicon.ico',
        href: 'https://www.apple.com',
      },
      {
        name: 'Apple 产品参数中心',
        desc: '详细展示苹果产品技术规格和参数对比',
        logo: 'https://www.apple.com/favicon.ico',
        href: 'https://hubweb.cn',
      },
      {
        name: 'SOCPK',
        desc: '移动处理器性能排行和对比平台',
        logo: 'https://socpk.com/favicon.ico',
        href: 'https://socpk.com',
      },
      {
        name: '数码荔枝',
        desc: '正版软件商店，提供优质数字产品',
        logo: 'https://lizhi.shop/favicon.ico',
        href: 'https://lizhi.shop',
      },
    ],
  },
  {
    name: '🎬 视频与媒体',
    resources: [
      {
        name: 'YouTube',
        desc: '全球最大的视频分享和观看平台',
        logo: 'https://www.youtube.com/favicon.ico',
        href: 'https://www.youtube.com',
      },
      {
        name: 'bilibili',
        desc: '中国领先的年轻人文化社区和视频平台',
        logo: 'https://www.bilibili.com/favicon.ico',
        href: 'https://www.bilibili.com',
      },
    ],
  },
  {
    name: '🎨 设计与创意资源',
    resources: [
      {
        name: 'Apple 设计资源',
        desc: 'Apple 官方提供的产品设计素材和指南',
        logo: 'https://www.apple.com/favicon.ico',
        href: 'https://developer.apple.com/design/resources/#product-bezels',
      },
      {
        name: 'Skill Icons',
        desc: '为开发者项目生成技能图标的在线工具',
        logo: 'https://skillicons.dev/icons?i=skillicons',
        href: 'https://skillicons.dev',
      },
      {
        name: 'BrandColors',
        desc: '收集各大品牌官方配色方案的设计资源',
        logo: 'https://brandcolors.net/assets/img/logo.svg',
        href: 'https://brandcolors.net',
      },
      {
        name: 'Maker World',
        desc: '提供丰富的设计资源和创意工具',
        logo: 'https://makerworld.com.cn/favicon.ico',
        href: 'https://makerworld.com.cn',
      },
      {
        name: 'amCharts Pixel Map',
        desc: '在线创建和编辑像素地图的工具',
        logo: 'https://pixelmap.amcharts.com/favicon.ico',
        href: 'https://pixelmap.amcharts.com',
      },
    ],
  },
  {
    name: '📱 社交网络',
    resources: [
      {
        name: 'X (Twitter)',
        desc: '全球实时信息和社交网络平台',
        logo: 'https://abs.twimg.com/favicons/twitter.3.ico',
        href: 'https://x.com',
      },
      {
        name: 'Facebook',
        desc: '全球最大的社交网络平台',
        logo: 'https://static.xx.fbcdn.net/rsrc.php/yo/r/iRmz9lCMBD2.ico',
        href: 'https://www.facebook.com',
      },
      {
        name: 'Telegram Web',
        desc: 'Telegram 即时通讯的网页版客户端',
        logo: 'https://web.telegram.org/favicon.ico',
        href: 'https://web.telegram.org/k/',
      },
    ],
  },
  {
    name: '🎮 在线游戏',
    resources: [
      {
        name: 'generals.io',
        desc: '实时多人策略游戏，征服领土扩张版图',
        logo: 'https://generals.io/favicon.ico',
        href: 'https://generals.io',
      },
      {
        name: 'TileMan.io',
        desc: '多人在线领土争夺策略游戏',
        logo: 'https://tileman.io/favicon.ico',
        href: 'https://tileman.io',
      },
      {
        name: 'YORG.io',
        desc: '塔防与资源管理相结合的策略游戏',
        logo: 'https://yorg.io/favicon.ico',
        href: 'https://yorg.io',
      },
      {
        name: 'Bloxd.io',
        desc: '在线沙盒游戏集合平台，类似 Minecraft',
        logo: 'https://bloxd.io/favicon.ico',
        href: 'https://bloxd.io',
      },
      {
        name: '名字竞技场',
        desc: '一个文本对战游戏，玩家通过输入名字进行对战',
        logo: 'https://namerena.github.io/favicon.ico',
        href: 'https://namerena.github.io',
      },
    ],
  },
  {
    name: '🔓 网络工具',
    resources: [
      {
        name: '墙妈妈',
        desc: '科学上网指南和网络自由访问教程',
        logo: 'https://www.wallmama.com/wp-content/uploads/2020/01/wmmfavicon-120x120.png',
        href: 'https://www.wallmama.com',
      },
      {
        name: 'NordVPN',
        desc: '领先的 VPN 服务提供商，保障网络隐私安全',
        logo: 'https://nordvpn.com/favicon.ico',
        href: 'https://nordvpn.com/',
      },
    ],
  },
];
