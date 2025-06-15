export interface Resource {
  name: string
  href: string
  description: string
}

export interface ResourceCategory {
  name: string
  resources: Resource[]
}

export const resourceData: ResourceCategory[] = [
  {
    name: '🔍 搜索引擎',
    resources: [
      { name: 'Google', href: 'https://www.google.com', description: '全球领先搜索引擎，信息检索首选' },
      { name: 'Microsoft Bing', href: 'https://www.bing.com', description: '微软智能搜索，AI 功能加持' },
      { name: '百度', href: 'https://www.baidu.com', description: '中国最大中文搜索引擎' },
    ],
  },
  {
    name: '🤖 AI 对话应用',
    resources: [
      { name: 'ChatGPT', href: 'https://chatgpt.com', description: 'OpenAI 大语言模型，智能对话与内容生成' },
      { name: 'Claude', href: 'https://claude.ai', description: 'Anthropic 开发的AI助手，安全可靠的对话体验' },
      { name: 'Grok', href: 'https://grok.com', description: 'xAI 开发的AI助手，实时信息获取与分析' },
      { name: 'DeepSeek', href: 'https://deepseek.com', description: '深度求索大语言模型，中文AI对话助手' },
      { name: 'Sora', href: 'https://sora.com', description: 'OpenAI 文本生成视频模型，创意无限' },
      { name: 'Hugging Face', href: 'https://huggingface.co', description: '开源 AI 模型社区，机器学习的 GitHub' },
    ],
  },
  {
    name: '🔬 AI 开发研究',
    resources: [
      { name: 'Google DeepMind', href: 'https://deepmind.com', description: 'Google AI 研究前沿，推动 AGI 发展' },
      { name: 'Meta AI', href: 'https://ai.facebook.com', description: 'Meta 人工智能研究部门' },
      { name: 'Google AI', href: 'https://ai.google', description: 'Google AI 研究和产品部门' },
      { name: 'Microsoft AI', href: 'https://www.microsoft.com/ai', description: '微软人工智能研究开发' },
      { name: 'DeepLearning.AI', href: 'https://deeplearning.ai', description: '吴恩达 AI 教育平台，专业课程体系' },
      { name: 'PyTorch', href: 'https://pytorch.org', description: 'Facebook 开源深度学习框架' },
      { name: 'Keras', href: 'https://keras.io', description: '高级神经网络 API，简化深度学习' },
      { name: 'NumPy', href: 'https://numpy.org', description: 'Python 科学计算基础包' },
      { name: 'PyCharm', href: 'https://www.jetbrains.com/pycharm', description: 'JetBrains 专业 Python IDE' },
      { name: 'Jupyter', href: 'https://jupyter.org', description: '交互式计算数据科学平台' },
      { name: 'LMArena', href: 'https://lmarena.ai', description: 'AI模型对比竞技场，实时比较不同AI聊天机器人性能' },
    ],
  },
  {
    name: '💻 开发与编程',
    resources: [
      { name: 'GitHub', href: 'https://github.com', description: '全球最大代码托管平台，开源项目大本营' },
      { name: 'GitLab', href: 'https://gitlab.com', description: '企业级 DevOps 平台，完整开发生命周期' },
      { name: 'GitStar 排行榜', href: 'https://gitstar-ranking.com', description: 'GitHub 用户仓库 Star 数排行榜' },
      { name: 'Committers Top', href: 'https://committers.top', description: '各国最活跃 GitHub 用户榜单' },
      { name: 'GitHub Metrics', href: 'https://github.com/lowlighter/metrics', description: 'GitHub 账号信息图生成器' },
      { name: 'GitHub Stats', href: 'https://github.com/jstrieb/github-stats', description: 'GitHub 个人资料统计图像生成' },
      { name: 'GitHub Profile README Generator', href: 'https://rahuldkjain.github.io/gh-profile-readme-generator', description: '精美 GitHub 个人资料 README 生成' },
      { name: 'GitHub Codespaces', href: 'https://github.com/codespaces', description: '云端开发环境，随时随地编程' },
      { name: 'Gitpod', href: 'https://www.gitpod.io', description: '云开发环境，加速软件开发' },
      { name: 'CodeSandbox', href: 'https://codesandbox.io', description: '云端代码编辑器，协作开发利器' },
      { name: 'CodePen', href: 'https://codepen.io', description: '前端开发在线编辑器' },
      { name: 'StackBlitz', href: 'https://stackblitz.com', description: '极速在线 IDE，现代前端框架支持' },
      { name: 'vscode.dev', href: 'https://vscode.dev', description: 'VS Code 浏览器版，轻量云端开发' },
      { name: 'Sandpack', href: 'https://sandpack.codesandbox.io', description: 'CodeSandbox 嵌入式代码编辑组件' },
      { name: 'OnlineGDB', href: 'https://www.onlinegdb.com/online_python_compiler', description: '在线编译运行调试多种编程语言' },
      { name: 'Compiler Explorer', href: 'https://godbolt.org', description: '在线编译器，汇编代码分析神器' },
      { name: 'React', href: 'https://react.dev', description: 'Facebook 开源 UI 库，构建现代界面' },
      { name: '电子教室终结者', href: 'https://dzjszjz.nkxingxh.top', description: '解除电子教室软件控制工具' },
      { name: '清华大学开源软件镜像站', href: 'https://mirrors.tuna.tsinghua.edu.cn', description: '开源软件包管理器镜像服务' },
    ],
  },
  {
    name: '📚 学术研究',
    resources: [
      { name: 'Google Scholar', href: 'https://scholar.google.com', description: '学术文献搜索，站在巨人肩膀上' },
      { name: 'Science', href: 'https://www.science.org/journal/science', description: '顶级科学期刊，突破性研究发布' },
      { name: 'Nature', href: 'https://www.nature.com', description: '权威多学科期刊，科学发现推动者' },
      { name: 'arXiv', href: 'https://arxiv.org', description: '开放预印本论文库，前沿研究抢先看' },
      { name: 'Overleaf', href: 'https://www.overleaf.com', description: '在线 LaTeX 编辑器，协作学术写作平台' },
    ],
  },
  {
    name: '🎓 在线学习',
    resources: [
      { name: 'Coursera', href: 'https://www.coursera.org', description: '顶尖大学合作，高质量在线课程' },
      { name: 'edX', href: 'https://www.edx.org', description: '哈佛 MIT 创立，开放式课程平台' },
      { name: 'MIT OpenCourseWare', href: 'https://ocw.mit.edu', description: 'MIT 免费课程资源，知识无界限' },
      { name: 'Class Central', href: 'https://www.classcentral.com', description: '全球课程搜索比较，学习路径规划' },
    ],
  },
  {
    name: '🏆 编程竞赛',
    resources: [
      { name: 'Codeforces', href: 'https://codeforces.com', description: '全球最受欢迎编程竞赛平台' },
      { name: '洛谷', href: 'https://www.luogu.com.cn', description: '国内领先编程学习竞赛平台' },
      { name: 'AtCoder', href: 'https://atcoder.jp', description: '日本高质量编程竞赛平台' },
      { name: 'OI Wiki', href: 'https://oi-wiki.org', description: '信息学竞赛知识整合站点' },
      { name: 'OIerDb', href: 'https://oierdb.com', description: '信息学竞赛获奖记录数据库' },
      { name: 'Virtual Judge', href: 'https://vjudge.net', description: '聚合多平台的虚拟判题系统' },
      { name: 'Code Golf', href: 'https://code.golf', description: '最短代码挑战，极限编程艺术' },
    ],
  },
  {
    name: '📐 数学与计算',
    resources: [
      { name: 'Desmos', href: 'https://www.desmos.com', description: '强大在线图形计算器，数学探索利器' },
      { name: 'Wolfram Alpha', href: 'https://www.wolframalpha.com', description: '计算型知识引擎，科学问题解答' },
      { name: 'GeoGebra', href: 'https://www.geogebra.org', description: '交互式数学软件，几何代数统计' },
      { name: 'LaTeX 公式编辑器', href: 'https://www.latexlive.com', description: '实时预览数学公式编辑工具' },
      { name: 'OEIS', href: 'https://oeis.org', description: '整数序列百科全书，数学研究宝库' },
    ],
  },
  {
    name: '📖 静态站点生成',
    resources: [
      { name: 'VitePress', href: 'https://vitepress.vuejs.org', description: '基于 Vite 和 Vue 的现代静态网站生成器' },
      { name: 'VuePress', href: 'https://vuepress.vuejs.org', description: 'Vue 驱动的静态网站生成器，专注文档' },
      { name: 'Docusaurus', href: 'https://docusaurus.io', description: 'Facebook 开源文档网站构建工具' },
      { name: 'Hexo', href: 'https://hexo.io', description: '快速简洁高效的博客框架' },
      { name: 'WordPress', href: 'https://wordpress.org', description: '全球最受欢迎开源内容管理系统' },
    ],
  },
  {
    name: '🔧 开发工具',
    resources: [
      { name: 'Colorable', href: 'https://colorable.jxnblk.com', description: '颜色对比度无障碍检测' },
      { name: 'Diff Tool', href: 'https://csacademy.com/app/diffing_tool/', description: '在线代码差异比较' },
      { name: 'Graph Editor', href: 'https://csacademy.com/app/graph_editor/', description: '图论可视化编辑工具' },
      { name: '原题机', href: 'http://yuantiji.ac/zh/', description: '编程竞赛题目溯源工具' },
      { name: '毒蘑菇测试', href: 'https://cznull.github.io/vsbm', description: 'GPU 图形渲染性能基准测试' },
    ],
  },
  {
    name: '🛠️ 日常工具',
    resources: [
      { name: 'Speedtest', href: 'https://www.speedtest.net', description: '全球领先网络速度测试' },
      { name: '能不能好好说话？', href: 'https://lab.magiconch.com/nbnhhsh/', description: '拼音首字母缩写翻译神器' },
      { name: 'Password Monster', href: 'https://passwordmonster.com/', description: '密码强度检测生成工具' },
      { name: 'CPS 测试', href: 'https://clickspeedtest.com/', description: '在线鼠标点击速度测试' },
      { name: 'dazidazi', href: 'https://dazidazi.com', description: '在线打字练习网站，标准指法训练，提高打字速度' },
      { name: 'WildCard 野卡', href: 'https://yeka.ai', description: '虚拟信用卡注册服务，在线支付解决方案' },
      { name: '政治倾向测试', href: 'https://luckyfuy.top/compass/', description: '基于 8Values 的政治倾向分析' },
      { name: 'Luban SMS', href: 'https://lubansms.com', description: '全球短信收发服务平台，支持多国号码和API接口' },
    ],
  },
  {
    name: '📖 知识百科',
    resources: [
      { name: '维基百科', href: 'https://zh.wikipedia.org', description: '全球最大多语言自由百科全书' },
      { name: 'cppreference', href: 'https://cppreference.com', description: 'C++ 标准库权威参考文档' },
      { name: 'Passport Index', href: 'https://www.passportindex.org', description: '全球护照实力免签国家排名' },
    ],
  },
  {
    name: '📱 数码设备',
    resources: [
      { name: 'Apple', href: 'https://www.apple.com', description: '苹果公司官网，最新产品技术' },
      { name: 'Apple 产品参数中心', href: 'https://hubweb.cn', description: '苹果产品技术规格参数对比' },
      { name: 'SOCPK', href: 'https://socpk.com', description: '移动处理器性能排行对比' },
      { name: '数码荔枝', href: 'https://lizhi.shop', description: '正版软件商店，优质数字产品' },
    ],
  },
  {
    name: '☁️ 云服务平台',
    resources: [
      { name: 'Amazon Web Services', href: 'https://aws.amazon.com', description: '全球领先云计算平台，服务全面' },
      { name: 'Microsoft Azure', href: 'https://azure.microsoft.com', description: '微软云服务平台，企业级解决方案' },
      { name: 'Cloudflare', href: 'https://www.cloudflare.com', description: '网络安全性能优化，全球加速' },
    ],
  },
  {
    name: '🎨 设计创意',
    resources: [
      { name: 'Apple Design Resources', href: 'https://developer.apple.com/design/resources', description: 'Apple 官方设计素材指南' },
      { name: 'Skill Icons', href: 'https://skillicons.dev', description: '开发者技能图标生成工具' },
      { name: 'BrandColors', href: 'https://brandcolors.net', description: '品牌官方配色方案收集' },
      { name: 'Maker World', href: 'https://makerworld.com.cn', description: '丰富设计资源创意工具' },
      { name: 'amCharts Pixel Map', href: 'https://pixelmap.amcharts.com', description: '在线创建编辑像素地图' },
    ],
  },
  {
    name: '🎬 视频媒体',
    resources: [
      { name: 'YouTube', href: 'https://www.youtube.com', description: '全球最大视频分享观看平台' },
      { name: 'bilibili', href: 'https://www.bilibili.com', description: '中国领先年轻人文化社区' },
    ],
  },
  {
    name: '📱 社交网络',
    resources: [
      { name: 'X (Twitter)', href: 'https://x.com', description: '全球实时信息社交网络平台' },
      { name: 'Facebook', href: 'https://www.facebook.com', description: '全球最大社交网络平台' },
      { name: 'Telegram Web', href: 'https://web.telegram.org', description: 'Telegram 即时通讯网页版' },
    ],
  },
  {
    name: '🎮 在线游戏',
    resources: [
      { name: 'generals.io', href: 'https://generals.io', description: '实时多人策略游戏，征服领土' },
      { name: 'TileMan.io', href: 'https://tileman.io', description: '多人在线领土争夺策略游戏' },
      { name: 'YORG.io', href: 'https://yorg.io', description: '塔防资源管理策略游戏' },
      { name: 'Bloxd.io', href: 'https://bloxd.io', description: '在线沙盒游戏集合平台' },
      { name: '名字竞技场', href: 'https://namerena.github.io', description: '文本对战游戏，输入名字对战' },
    ],
  },
  {
    name: '🔓 网络工具',
    resources: [
      { name: '墙妈妈', href: 'https://www.wallmama.com', description: '科学上网指南网络自由访问' },
      { name: 'NordVPN', href: 'https://nordvpn.com', description: '领先 VPN 服务，保障网络隐私' },
      { name: 'Taishan Net', href: 'https://taishan.pro', description: '提供多协议科学上网服务，支持全球节点和流媒体解锁' },
    ],
  },
];
