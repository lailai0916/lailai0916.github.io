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
        desc: '全球领先搜索引擎，信息检索首选',
        logo: 'https://www.google.com/favicon.ico',
        href: 'https://www.google.com',
      },
      {
        name: 'Microsoft Bing',
        desc: '微软智能搜索，AI 功能加持',
        logo: 'https://www.bing.com/favicon.ico',
        href: 'https://www.bing.com',
      },
      {
        name: '百度',
        desc: '中国最大中文搜索引擎',
        logo: 'https://www.baidu.com/favicon.ico',
        href: 'https://www.baidu.com',
      },
    ],
  },
  {
    name: '🤖 AI 与智能工具',
    resources: [
      {
        name: 'ChatGPT',
        desc: 'OpenAI 大语言模型，智能对话与内容生成',
        logo: 'https://chatgpt.com/favicon.ico',
        href: 'https://chatgpt.com/',
      },
      {
        name: 'Sora',
        desc: 'OpenAI 文本生成视频模型，创意无限',
        logo: 'https://sora.com/favicon.ico',
        href: 'https://sora.com',
      },
      {
        name: 'Hugging Face',
        desc: '开源 AI 模型社区，机器学习的 GitHub',
        logo: 'https://huggingface.co/favicon.ico',
        href: 'https://huggingface.co/',
      },
      {
        name: 'Google DeepMind',
        desc: 'Google AI 研究前沿，推动 AGI 发展',
        logo: 'https://deepmind.google/favicon.ico',
        href: 'https://deepmind.com/',
      },
      {
        name: 'DeepLearning.AI',
        desc: '吴恩达 AI 教育平台，专业课程体系',
        logo: 'https://www.deeplearning.ai/favicon.ico',
        href: 'https://deeplearning.ai/',
      },
      {
        name: 'Meta AI',
        desc: 'Meta 人工智能研究部门',
        logo: 'https://ai.facebook.com/favicon.ico',
        href: 'https://ai.facebook.com/',
      },
      {
        name: 'Google AI',
        desc: 'Google AI 研究和产品部门',
        logo: 'https://ai.google/favicon.ico',
        href: 'https://ai.google/',
      },
      {
        name: 'Microsoft AI',
        desc: '微软人工智能研究开发',
        logo: 'https://www.microsoft.com/favicon.ico',
        href: 'https://www.microsoft.com/ai',
      },
      {
        name: 'Keras',
        desc: '高级神经网络 API，简化深度学习',
        logo: 'https://keras.io/favicon.ico',
        href: 'https://keras.io/',
      },
      {
        name: 'NumPy',
        desc: 'Python 科学计算基础包',
        logo: 'https://numpy.org/favicon.ico',
        href: 'https://numpy.org/',
      },
      {
        name: 'PyTorch',
        desc: 'Facebook 开源深度学习框架',
        logo: 'https://pytorch.org/favicon.ico',
        href: 'https://pytorch.org/',
      },
      {
        name: 'PyCharm',
        desc: 'JetBrains 专业 Python IDE',
        logo: 'https://resources.jetbrains.com/storage/products/company/brand/logos/PyCharm_icon.svg',
        href: 'https://www.jetbrains.com/pycharm/',
      },
      {
        name: 'Jupyter',
        desc: '交互式计算数据科学平台',
        logo: 'https://jupyter.org/favicon.ico',
        href: 'https://jupyter.org/',
      },
    ],
  },
  {
    name: '💻 开发与编程',
    resources: [
      {
        name: 'GitHub',
        desc: '全球最大代码托管平台，开源项目大本营',
        logo: 'https://github.githubassets.com/favicons/favicon.svg',
        href: 'https://github.com',
      },
      {
        name: 'GitLab',
        desc: '企业级 DevOps 平台，完整开发生命周期',
        logo: 'https://about.gitlab.com/favicon.ico',
        href: 'https://gitlab.com',
      },
      {
        name: 'GitStar 排行榜',
        desc: 'GitHub 用户仓库 Star 数排行榜',
        logo: 'https://gitstar-ranking.com/favicon.ico',
        href: 'https://gitstar-ranking.com/',
      },
      {
        name: 'Committers Top',
        desc: '各国最活跃 GitHub 用户榜单',
        logo: 'https://committers.top/images/favicon.ico',
        href: 'https://committers.top/',
      },
      {
        name: 'GitHub Metrics',
        desc: 'GitHub 账号信息图生成器',
        logo: 'https://github.githubassets.com/images/icons/emoji/unicode/1f4ca.png',
        href: 'https://github.com/lowlighter/metrics',
      },
      {
        name: 'GitHub Stats',
        desc: 'GitHub 个人资料统计图像生成',
        logo: 'https://raw.githubusercontent.com/jstrieb/github-stats/master/generated/overview.svg',
        href: 'https://github.com/jstrieb/github-stats',
      },
      {
        name: 'GitHub Profile README Generator',
        desc: '精美 GitHub 个人资料 README 生成',
        logo: 'https://rahuldkjain.github.io/gh-profile-readme-generator/static/mdg-040f54e2f6c858e0a3dcf568c3f2b6f1.png',
        href: 'https://rahuldkjain.github.io/gh-profile-readme-generator/',
      },
      {
        name: 'GitHub Codespaces',
        desc: '云端开发环境，随时随地编程',
        logo: 'https://github.githubassets.com/favicons/favicon.svg',
        href: 'https://github.com/codespaces',
      },
      {
        name: 'Gitpod',
        desc: '云开发环境，加速软件开发',
        logo: 'https://www.gitpod.io/favicon192.png',
        href: 'https://www.gitpod.io/',
      },
      {
        name: 'CodeSandbox',
        desc: '云端代码编辑器，协作开发利器',
        logo: 'https://codesandbox.io/favicon.ico',
        href: 'https://codesandbox.io/',
      },
      {
        name: 'CodePen',
        desc: '前端开发在线编辑器',
        logo: 'https://codepen.io/favicon.ico',
        href: 'https://codepen.io/',
      },
      {
        name: 'StackBlitz',
        desc: '极速在线 IDE，现代前端框架支持',
        logo: 'https://stackblitz.com/_astro/favicon.svg',
        href: 'https://stackblitz.com/',
      },
      {
        name: 'vscode.dev',
        desc: 'VS Code 浏览器版，轻量云端开发',
        logo: 'https://vscode.dev/static/stable/favicon.ico',
        href: 'https://vscode.dev/',
      },
      {
        name: 'Sandpack',
        desc: 'CodeSandbox 嵌入式代码编辑组件',
        logo: 'https://sandpack.codesandbox.io/favicon.ico',
        href: 'https://sandpack.codesandbox.io/',
      },
      {
        name: 'OnlineGDB',
        desc: '在线编译运行调试多种编程语言',
        logo: 'https://www.onlinegdb.com/favicon.ico',
        href: 'https://www.onlinegdb.com/online_python_compiler',
      },
      {
        name: 'Compiler Explorer',
        desc: '在线编译器，汇编代码分析神器',
        logo: 'https://godbolt.org/favicon.ico',
        href: 'https://godbolt.org',
      },
      {
        name: 'React',
        desc: 'Facebook 开源 UI 库，构建现代界面',
        logo: 'https://react.dev/favicon.ico',
        href: 'https://react.dev',
      },
      {
        name: '电子教室终结者',
        desc: '解除电子教室软件控制工具',
        logo: 'https://dzjszjz.nkxingxh.top/favicon.ico',
        href: 'https://dzjszjz.nkxingxh.top',
      },
      {
        name: '清华大学开源软件镜像站',
        desc: '开源软件包管理器镜像服务',
        logo: 'https://mirrors.tuna.tsinghua.edu.cn/static/img/logo-small@2x.png',
        href: 'https://mirrors.tuna.tsinghua.edu.cn',
      },
    ],
  },
  {
    name: '📚 学术研究',
    resources: [
      {
        name: 'Google Scholar',
        desc: '学术文献搜索，站在巨人肩膀上',
        logo: 'https://scholar.google.com/favicon.ico',
        href: 'https://scholar.google.com/',
      },
      {
        name: 'Science',
        desc: '顶级科学期刊，突破性研究发布',
        logo: 'https://www.science.org/favicon.ico',
        href: 'https://www.science.org/journal/science',
      },
      {
        name: 'Nature',
        desc: '权威多学科期刊，科学发现推动者',
        logo: 'https://www.nature.com/favicon.ico',
        href: 'https://www.nature.com/',
      },
      {
        name: 'arXiv',
        desc: '开放预印本论文库，前沿研究抢先看',
        logo: 'https://arxiv.org/favicon.ico',
        href: 'https://arxiv.org/',
      },
    ],
  },
  {
    name: '🎓 在线学习',
    resources: [
      {
        name: 'Coursera',
        desc: '顶尖大学合作，高质量在线课程',
        logo: 'https://d3njjcbhbojbot.cloudfront.net/web/images/favicons/apple-touch-icon-v2-180x180.png',
        href: 'https://www.coursera.org/',
      },
      {
        name: 'edX',
        desc: '哈佛 MIT 创立，开放式课程平台',
        logo: 'https://www.edx.org/images/logos/edx-logo-elm.svg',
        href: 'https://www.edx.org/',
      },
      {
        name: 'MIT OpenCourseWare',
        desc: 'MIT 免费课程资源，知识无界限',
        logo: 'https://ocw.mit.edu/static_shared/images/ocw_logo_orange.png',
        href: 'https://ocw.mit.edu/',
      },
      {
        name: 'Class Central',
        desc: '全球课程搜索比较，学习路径规划',
        logo: 'https://www.classcentral.com/safari-pinned-tab.svg',
        href: 'https://www.classcentral.com/',
      },
    ],
  },
  {
    name: '🏆 编程竞赛',
    resources: [
      {
        name: 'Codeforces',
        desc: '全球最受欢迎编程竞赛平台',
        logo: 'https://codeforces.org/s/126/favicon.ico',
        href: 'https://codeforces.com',
      },
      {
        name: '洛谷',
        desc: '国内领先编程学习竞赛平台',
        logo: 'https://www.luogu.com.cn/favicon.ico',
        href: 'https://www.luogu.com.cn',
      },
      {
        name: 'AtCoder',
        desc: '日本高质量编程竞赛平台',
        logo: 'https://atcoder.jp/favicon.ico',
        href: 'https://atcoder.jp',
      },
      {
        name: 'OI Wiki',
        desc: '信息学竞赛知识整合站点',
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
        name: 'Virtual Judge',
        desc: '聚合多平台的虚拟判题系统',
        logo: 'https://vjudge.net/favicon.ico',
        href: 'https://vjudge.net',
      },
      {
        name: 'Code Golf',
        desc: '最短代码挑战，极限编程艺术',
        logo: 'https://code.golf/favicon.ico',
        href: 'https://code.golf',
      },
    ],
  },
  {
    name: '📐 数学与计算',
    resources: [
      {
        name: 'Desmos',
        desc: '强大在线图形计算器，数学探索利器',
        logo: 'https://www.desmos.com/favicon.ico',
        href: 'https://www.desmos.com',
      },
      {
        name: 'Wolfram Alpha',
        desc: '计算型知识引擎，科学问题解答',
        logo: 'https://www.wolframalpha.com/favicon.ico',
        href: 'https://www.wolframalpha.com',
      },
      {
        name: 'GeoGebra',
        desc: '交互式数学软件，几何代数统计',
        logo: 'https://www.geogebra.org/favicon.ico',
        href: 'https://www.geogebra.org',
      },
      {
        name: 'LaTeX 公式编辑器',
        desc: '实时预览数学公式编辑工具',
        logo: 'https://www.latexlive.com/favicon.ico',
        href: 'https://www.latexlive.com',
      },
      {
        name: 'OEIS',
        desc: '整数序列百科全书，数学研究宝库',
        logo: 'https://oeis.org/favicon.ico',
        href: 'https://oeis.org/',
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
        desc: 'Vue 驱动的静态网站生成器，专注文档',
        logo: 'https://vuepress.vuejs.org/images/hero.png',
        href: 'https://vuepress.vuejs.org',
      },
      {
        name: 'Docusaurus',
        desc: 'Facebook 开源文档网站构建工具',
        logo: 'https://docusaurus.io/img/docusaurus.svg',
        href: 'https://docusaurus.io',
      },
      {
        name: 'Hexo',
        desc: '快速简洁高效的博客框架',
        logo: 'https://hexo.io/favicon.ico',
        href: 'https://hexo.io',
      },
      {
        name: 'WordPress',
        desc: '全球最受欢迎开源内容管理系统',
        logo: 'https://s1.wp.com/i/favicon.ico',
        href: 'https://wordpress.org/',
      },
    ],
  },
  {
    name: '🛠️ 实用工具',
    resources: [
      {
        name: 'Speedtest',
        desc: '全球领先网络速度测试',
        logo: 'https://www.speedtest.net/favicon.ico',
        href: 'https://www.speedtest.net',
      },
      {
        name: '能不能好好说话？',
        desc: '拼音首字母缩写翻译神器',
        logo: 'https://lab.magiconch.com/favicon.ico',
        href: 'https://lab.magiconch.com/nbnhhsh/',
      },
      {
        name: 'Password Monster',
        desc: '密码强度检测生成工具',
        logo: 'https://passwordmonster.com/favicon.ico',
        href: 'https://passwordmonster.com/',
      },
      {
        name: 'Colorable',
        desc: '颜色对比度无障碍检测',
        logo: 'https://colorable.jxnblk.com/favicon.ico',
        href: 'https://colorable.jxnblk.com',
      },
      {
        name: 'Diff Tool',
        desc: '在线代码差异比较',
        logo: 'https://csacademy.com/favicon.ico',
        href: 'https://csacademy.com/app/diffing_tool/',
      },
      {
        name: 'Graph Editor',
        desc: '图论可视化编辑工具',
        logo: 'https://csacademy.com/favicon.ico',
        href: 'https://csacademy.com/app/graph_editor/',
      },
      {
        name: '原题机',
        desc: '编程竞赛题目溯源工具',
        logo: 'http://yuantiji.ac/favicon.ico',
        href: 'http://yuantiji.ac/zh/',
      },
      {
        name: 'CPS 测试',
        desc: '在线鼠标点击速度测试',
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
    name: '📖 知识百科',
    resources: [
      {
        name: '维基百科',
        desc: '全球最大多语言自由百科全书',
        logo: 'https://zh.wikipedia.org/static/favicon/wikipedia.ico',
        href: 'https://zh.wikipedia.org/',
      },
      {
        name: 'cppreference',
        desc: 'C++ 标准库权威参考文档',
        logo: 'https://en.cppreference.com/favicon.ico',
        href: 'https://en.cppreference.com/w/',
      },
      {
        name: 'Passport Index',
        desc: '全球护照实力免签国家排名',
        logo: 'https://www.passportindex.org/favicon.ico',
        href: 'https://www.passportindex.org/',
      },
    ],
  },
  {
    name: '📱 数码设备',
    resources: [
      {
        name: 'Apple',
        desc: '苹果公司官网，最新产品技术',
        logo: 'https://www.apple.com/favicon.ico',
        href: 'https://www.apple.com',
      },
      {
        name: 'Apple 产品参数中心',
        desc: '苹果产品技术规格参数对比',
        logo: 'https://www.apple.com/favicon.ico',
        href: 'https://hubweb.cn',
      },
      {
        name: 'SOCPK',
        desc: '移动处理器性能排行对比',
        logo: 'https://socpk.com/favicon.ico',
        href: 'https://socpk.com',
      },
      {
        name: '数码荔枝',
        desc: '正版软件商店，优质数字产品',
        logo: 'https://lizhi.shop/favicon.ico',
        href: 'https://lizhi.shop',
      },
    ],
  },
  {
    name: '☁️ 云服务平台',
    resources: [
      {
        name: 'Amazon Web Services',
        desc: '全球领先云计算平台，服务全面',
        logo: 'https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_179x109.png',
        href: 'https://aws.amazon.com',
      },
      {
        name: 'Microsoft Azure',
        desc: '微软云服务平台，企业级解决方案',
        logo: 'https://azure.microsoft.com/favicon.ico',
        href: 'https://azure.microsoft.com',
      },
      {
        name: 'Cloudflare',
        desc: '网络安全性能优化，全球加速',
        logo: 'https://www.cloudflare.com/favicon.ico',
        href: 'https://www.cloudflare.com',
      },
    ],
  },
  {
    name: '🎨 设计创意',
    resources: [
      {
        name: 'Apple 设计资源',
        desc: 'Apple 官方设计素材指南',
        logo: 'https://www.apple.com/favicon.ico',
        href: 'https://developer.apple.com/design/resources/#product-bezels',
      },
      {
        name: 'Skill Icons',
        desc: '开发者技能图标生成工具',
        logo: 'https://skillicons.dev/icons?i=skillicons',
        href: 'https://skillicons.dev',
      },
      {
        name: 'BrandColors',
        desc: '品牌官方配色方案收集',
        logo: 'https://brandcolors.net/assets/img/logo.svg',
        href: 'https://brandcolors.net',
      },
      {
        name: 'Maker World',
        desc: '丰富设计资源创意工具',
        logo: 'https://makerworld.com.cn/favicon.ico',
        href: 'https://makerworld.com.cn',
      },
      {
        name: 'amCharts Pixel Map',
        desc: '在线创建编辑像素地图',
        logo: 'https://pixelmap.amcharts.com/favicon.ico',
        href: 'https://pixelmap.amcharts.com',
      },
    ],
  },
  {
    name: '🎬 视频媒体',
    resources: [
      {
        name: 'YouTube',
        desc: '全球最大视频分享观看平台',
        logo: 'https://www.youtube.com/favicon.ico',
        href: 'https://www.youtube.com',
      },
      {
        name: 'bilibili',
        desc: '中国领先年轻人文化社区',
        logo: 'https://www.bilibili.com/favicon.ico',
        href: 'https://www.bilibili.com',
      },
    ],
  },
  {
    name: '📱 社交网络',
    resources: [
      {
        name: 'X (Twitter)',
        desc: '全球实时信息社交网络平台',
        logo: 'https://abs.twimg.com/favicons/twitter.3.ico',
        href: 'https://x.com',
      },
      {
        name: 'Facebook',
        desc: '全球最大社交网络平台',
        logo: 'https://static.xx.fbcdn.net/rsrc.php/yo/r/iRmz9lCMBD2.ico',
        href: 'https://www.facebook.com',
      },
      {
        name: 'Telegram Web',
        desc: 'Telegram 即时通讯网页版',
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
        desc: '实时多人策略游戏，征服领土',
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
        desc: '塔防资源管理策略游戏',
        logo: 'https://yorg.io/favicon.ico',
        href: 'https://yorg.io',
      },
      {
        name: 'Bloxd.io',
        desc: '在线沙盒游戏集合平台',
        logo: 'https://bloxd.io/favicon.ico',
        href: 'https://bloxd.io',
      },
      {
        name: '名字竞技场',
        desc: '文本对战游戏，输入名字对战',
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
        desc: '科学上网指南网络自由访问',
        logo: 'https://www.wallmama.com/wp-content/uploads/2020/01/wmmfavicon-120x120.png',
        href: 'https://www.wallmama.com',
      },
      {
        name: 'NordVPN',
        desc: '领先 VPN 服务，保障网络隐私',
        logo: 'https://nordvpn.com/favicon.ico',
        href: 'https://nordvpn.com/',
      },
    ],
  },
];

