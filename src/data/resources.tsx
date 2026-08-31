import { translate } from '@docusaurus/Translate';

interface ResourceDefinition {
  title: string;
  href: string;
  description: string;
}

const RESOURCE_CATALOG = {
  google: {
    title: translate({
      id: 'data.resources.site.google.title',
      message: 'Google',
    }),
    href: 'https://www.google.com',
    description: translate({
      id: 'data.resources.site.google.description',
      message: 'General-purpose web search engine',
    }),
  },
  bing: {
    title: translate({
      id: 'data.resources.site.bing.title',
      message: 'Microsoft Bing',
    }),
    href: 'https://www.bing.com',
    description: translate({
      id: 'data.resources.site.bing.description',
      message: "Microsoft's web search and discovery engine",
    }),
  },
  baidu: {
    title: translate({
      id: 'data.resources.site.baidu.title',
      message: 'Baidu',
    }),
    href: 'https://www.baidu.com',
    description: translate({
      id: 'data.resources.site.baidu.description',
      message: 'Chinese-language search and internet services platform',
    }),
  },
  wikipedia: {
    title: translate({
      id: 'data.resources.site.wikipedia.title',
      message: 'Wikipedia',
    }),
    href: 'https://zh.wikipedia.org',
    description: translate({
      id: 'data.resources.site.wikipedia.description',
      message: 'Collaborative, multilingual online encyclopedia',
    }),
  },
  chatgpt: {
    title: translate({
      id: 'data.resources.site.chatgpt.title',
      message: 'ChatGPT',
    }),
    href: 'https://chatgpt.com',
    description: translate({
      id: 'data.resources.site.chatgpt.description',
      message: 'OpenAI assistant for conversation, research, and creation',
    }),
  },
  gemini: {
    title: translate({
      id: 'data.resources.site.gemini.title',
      message: 'Gemini',
    }),
    href: 'https://gemini.google.com',
    description: translate({
      id: 'data.resources.site.gemini.description',
      message: "Google's multimodal AI assistant",
    }),
  },
  claude: {
    title: translate({
      id: 'data.resources.site.claude.title',
      message: 'Claude',
    }),
    href: 'https://claude.ai',
    description: translate({
      id: 'data.resources.site.claude.description',
      message: "Anthropic's AI assistant for analysis and creation",
    }),
  },
  grok: {
    title: translate({
      id: 'data.resources.site.grok.title',
      message: 'Grok',
    }),
    href: 'https://grok.com',
    description: translate({
      id: 'data.resources.site.grok.description',
      message: 'AI assistant with real-time web and X access',
    }),
  },
  deepseek: {
    title: translate({
      id: 'data.resources.site.deepseek.title',
      message: 'DeepSeek',
    }),
    href: 'https://www.deepseek.com',
    description: translate({
      id: 'data.resources.site.deepseek.description',
      message: 'AI assistant and model platform by DeepSeek',
    }),
  },
  kimi: {
    title: translate({
      id: 'data.resources.site.kimi.title',
      message: 'Kimi',
    }),
    href: 'https://www.kimi.com',
    description: translate({
      id: 'data.resources.site.kimi.description',
      message: 'Moonshot AI assistant for coding and knowledge work',
    }),
  },
  googleDeepmind: {
    title: translate({
      id: 'data.resources.site.googleDeepmind.title',
      message: 'Google DeepMind',
    }),
    href: 'https://deepmind.google',
    description: translate({
      id: 'data.resources.site.googleDeepmind.description',
      message: "Google's AI research laboratory and model portfolio",
    }),
  },
  metaAi: {
    title: translate({
      id: 'data.resources.site.metaAi.title',
      message: 'Meta AI',
    }),
    href: 'https://ai.meta.com',
    description: translate({
      id: 'data.resources.site.metaAi.description',
      message: "Meta's AI products, models, and research",
    }),
  },
  microsoftAi: {
    title: translate({
      id: 'data.resources.site.microsoftAi.title',
      message: 'Microsoft AI',
    }),
    href: 'https://www.microsoft.com/ai',
    description: translate({
      id: 'data.resources.site.microsoftAi.description',
      message: "Microsoft's AI products, research, and business solutions",
    }),
  },
  huggingFace: {
    title: translate({
      id: 'data.resources.site.huggingFace.title',
      message: 'Hugging Face',
    }),
    href: 'https://huggingface.co',
    description: translate({
      id: 'data.resources.site.huggingFace.description',
      message: 'Open-source hub for models, datasets, and AI applications',
    }),
  },
  arena: {
    title: translate({
      id: 'data.resources.site.arena.title',
      message: 'Arena',
    }),
    href: 'https://arena.ai',
    description: translate({
      id: 'data.resources.site.arena.description',
      message: 'Community evaluation and leaderboards for AI models',
    }),
  },
  googleAiStudio: {
    title: translate({
      id: 'data.resources.site.googleAiStudio.title',
      message: 'Google AI Studio',
    }),
    href: 'https://aistudio.google.com',
    description: translate({
      id: 'data.resources.site.googleAiStudio.description',
      message: 'Browser workspace for building with Gemini models',
    }),
  },
  pytorch: {
    title: translate({
      id: 'data.resources.site.pytorch.title',
      message: 'PyTorch',
    }),
    href: 'https://pytorch.org',
    description: translate({
      id: 'data.resources.site.pytorch.description',
      message: 'Open-source framework for machine learning and deep learning',
    }),
  },
  keras: {
    title: translate({
      id: 'data.resources.site.keras.title',
      message: 'Keras',
    }),
    href: 'https://keras.io',
    description: translate({
      id: 'data.resources.site.keras.description',
      message: 'High-level deep learning API for multiple backends',
    }),
  },
  gptzero: {
    title: translate({
      id: 'data.resources.site.gptzero.title',
      message: 'GPTZero',
    }),
    href: 'https://gptzero.me',
    description: translate({
      id: 'data.resources.site.gptzero.description',
      message: 'AI-generated text detection and authorship analysis',
    }),
  },
  notByAi: {
    title: translate({
      id: 'data.resources.site.notByAi.title',
      message: 'Not By AI',
    }),
    href: 'https://notbyai.fyi',
    description: translate({
      id: 'data.resources.site.notByAi.description',
      message: 'Badges for identifying human-created content',
    }),
  },
  cloudflare: {
    title: translate({
      id: 'data.resources.site.cloudflare.title',
      message: 'Cloudflare',
    }),
    href: 'https://www.cloudflare.com',
    description: translate({
      id: 'data.resources.site.cloudflare.description',
      message: 'Connectivity, security, and edge application platform',
    }),
  },
  aws: {
    title: translate({
      id: 'data.resources.site.aws.title',
      message: 'Amazon Web Services',
    }),
    href: 'https://aws.amazon.com',
    description: translate({
      id: 'data.resources.site.aws.description',
      message: 'Cloud computing platform by Amazon',
    }),
  },
  azure: {
    title: translate({
      id: 'data.resources.site.azure.title',
      message: 'Microsoft Azure',
    }),
    href: 'https://azure.microsoft.com',
    description: translate({
      id: 'data.resources.site.azure.description',
      message: 'Cloud computing platform by Microsoft',
    }),
  },
  godaddy: {
    title: translate({
      id: 'data.resources.site.godaddy.title',
      message: 'GoDaddy',
    }),
    href: 'https://www.godaddy.com',
    description: translate({
      id: 'data.resources.site.godaddy.description',
      message: 'Domain registration, hosting, and website services',
    }),
  },
  namecheap: {
    title: translate({
      id: 'data.resources.site.namecheap.title',
      message: 'Namecheap',
    }),
    href: 'https://www.namecheap.com',
    description: translate({
      id: 'data.resources.site.namecheap.description',
      message: 'Domain registration, hosting, and web security services',
    }),
  },
  namesilo: {
    title: translate({
      id: 'data.resources.site.namesilo.title',
      message: 'NameSilo',
    }),
    href: 'https://www.namesilo.com',
    description: translate({
      id: 'data.resources.site.namesilo.description',
      message: 'Domain registration and portfolio management service',
    }),
  },
  expressvpn: {
    title: translate({
      id: 'data.resources.site.expressvpn.title',
      message: 'ExpressVPN',
    }),
    href: 'https://www.expressvpn.com',
    description: translate({
      id: 'data.resources.site.expressvpn.description',
      message: 'Commercial VPN service for encrypted network access',
    }),
  },
  nordvpn: {
    title: translate({
      id: 'data.resources.site.nordvpn.title',
      message: 'NordVPN',
    }),
    href: 'https://nordvpn.com',
    description: translate({
      id: 'data.resources.site.nordvpn.description',
      message: 'Commercial VPN service for privacy and secure access',
    }),
  },
  astrill: {
    title: translate({
      id: 'data.resources.site.astrill.title',
      message: 'Astrill VPN',
    }),
    href: 'https://www.astrill.com',
    description: translate({
      id: 'data.resources.site.astrill.description',
      message: 'Commercial VPN service with multi-protocol clients',
    }),
  },
  rainyun: {
    title: translate({
      id: 'data.resources.site.rainyun.title',
      message: 'RainYun',
    }),
    href: 'https://www.rainyun.com',
    description: translate({
      id: 'data.resources.site.rainyun.description',
      message: 'Chinese cloud hosting and infrastructure provider',
    }),
  },
  nexitally: {
    title: translate({
      id: 'data.resources.site.nexitally.title',
      message: 'Nexitally',
    }),
    href: 'https://nxonearth.com',
    description: translate({
      id: 'data.resources.site.nexitally.description',
      message: 'Subscription service for multi-region network proxy access',
    }),
  },
  taishanNet: {
    title: translate({
      id: 'data.resources.site.taishanNet.title',
      message: 'TaiShan Net',
    }),
    href: 'https://taishan.pro',
    description: translate({
      id: 'data.resources.site.taishanNet.description',
      message: 'Network proxy service focused on cross-region connectivity',
    }),
  },
  github: {
    title: translate({
      id: 'data.resources.site.github.title',
      message: 'GitHub',
    }),
    href: 'https://github.com',
    description: translate({
      id: 'data.resources.site.github.description',
      message: 'Platform for Git repositories and collaborative development',
    }),
  },
  githubCodespaces: {
    title: translate({
      id: 'data.resources.site.githubCodespaces.title',
      message: 'GitHub Codespaces',
    }),
    href: 'https://github.com/codespaces',
    description: translate({
      id: 'data.resources.site.githubCodespaces.description',
      message: 'Cloud development environments integrated with GitHub',
    }),
  },
  stackblitz: {
    title: translate({
      id: 'data.resources.site.stackblitz.title',
      message: 'StackBlitz',
    }),
    href: 'https://stackblitz.com',
    description: translate({
      id: 'data.resources.site.stackblitz.description',
      message: 'Browser-based IDE and instant web development environments',
    }),
  },
  vscodeWeb: {
    title: translate({
      id: 'data.resources.site.vscodeWeb.title',
      message: 'Visual Studio Code for the Web',
    }),
    href: 'https://vscode.dev',
    description: translate({
      id: 'data.resources.site.vscodeWeb.description',
      message: 'Browser edition of Visual Studio Code',
    }),
  },
  sandpack: {
    title: translate({
      id: 'data.resources.site.sandpack.title',
      message: 'Sandpack',
    }),
    href: 'https://sandpack.codesandbox.io',
    description: translate({
      id: 'data.resources.site.sandpack.description',
      message: 'React toolkit for embeddable live code editors',
    }),
  },
  compilerExplorer: {
    title: translate({
      id: 'data.resources.site.compilerExplorer.title',
      message: 'Compiler Explorer',
    }),
    href: 'https://godbolt.org',
    description: translate({
      id: 'data.resources.site.compilerExplorer.description',
      message: 'Interactive compiler explorer with assembly output',
    }),
  },
  onlinegdb: {
    title: translate({
      id: 'data.resources.site.onlinegdb.title',
      message: 'OnlineGDB',
    }),
    href: 'https://www.onlinegdb.com/online_python_compiler',
    description: translate({
      id: 'data.resources.site.onlinegdb.description',
      message: 'Browser-based Python editor and compiler',
    }),
  },
  pycharm: {
    title: translate({
      id: 'data.resources.site.pycharm.title',
      message: 'PyCharm',
    }),
    href: 'https://www.jetbrains.com/pycharm',
    description: translate({
      id: 'data.resources.site.pycharm.description',
      message: 'JetBrains IDE for Python development',
    }),
  },
  jupyter: {
    title: translate({
      id: 'data.resources.site.jupyter.title',
      message: 'Project Jupyter',
    }),
    href: 'https://jupyter.org',
    description: translate({
      id: 'data.resources.site.jupyter.description',
      message: 'Interactive notebooks and computing environment',
    }),
  },
  cppreference: {
    title: translate({
      id: 'data.resources.site.cppreference.title',
      message: 'cppreference',
    }),
    href: 'https://cppreference.com',
    description: translate({
      id: 'data.resources.site.cppreference.description',
      message: 'Reference for C, C++, and their standard libraries',
    }),
  },
  shields: {
    title: translate({
      id: 'data.resources.site.shields.title',
      message: 'Shields.io',
    }),
    href: 'https://shields.io',
    description: translate({
      id: 'data.resources.site.shields.description',
      message: 'Service for concise and consistent project badges',
    }),
  },
  tsinghuaMirror: {
    title: translate({
      id: 'data.resources.site.tsinghuaMirror.title',
      message: 'Tsinghua Open Source Mirror',
    }),
    href: 'https://mirrors.tuna.tsinghua.edu.cn',
    description: translate({
      id: 'data.resources.site.tsinghuaMirror.description',
      message: 'Open-source software and Linux distribution mirror',
    }),
  },
  gitstarRanking: {
    title: translate({
      id: 'data.resources.site.gitstarRanking.title',
      message: 'Gitstar Ranking',
    }),
    href: 'https://gitstar-ranking.com',
    description: translate({
      id: 'data.resources.site.gitstarRanking.description',
      message: 'Rankings of GitHub users, organizations, and repositories',
    }),
  },
  committersTop: {
    title: translate({
      id: 'data.resources.site.committersTop.title',
      message: 'committers.top',
    }),
    href: 'https://committers.top',
    description: translate({
      id: 'data.resources.site.committersTop.description',
      message: 'Rankings of active GitHub contributors by location',
    }),
  },
  react: {
    title: translate({
      id: 'data.resources.site.react.title',
      message: 'React',
    }),
    href: 'https://react.dev',
    description: translate({
      id: 'data.resources.site.react.description',
      message: 'Library for web and native user interfaces',
    }),
  },
  wordpress: {
    title: translate({
      id: 'data.resources.site.wordpress.title',
      message: 'WordPress',
    }),
    href: 'https://wordpress.org',
    description: translate({
      id: 'data.resources.site.wordpress.description',
      message: 'Open-source publishing platform and content management system',
    }),
  },
  docusaurus: {
    title: translate({
      id: 'data.resources.site.docusaurus.title',
      message: 'Docusaurus',
    }),
    href: 'https://docusaurus.io',
    description: translate({
      id: 'data.resources.site.docusaurus.description',
      message: 'React-based static site generator for documentation',
    }),
  },
  vitepress: {
    title: translate({
      id: 'data.resources.site.vitepress.title',
      message: 'VitePress',
    }),
    href: 'https://vitepress.dev',
    description: translate({
      id: 'data.resources.site.vitepress.description',
      message: 'Vite and Vue powered static site generator',
    }),
  },
  vuepress: {
    title: translate({
      id: 'data.resources.site.vuepress.title',
      message: 'VuePress',
    }),
    href: 'https://vuepress.vuejs.org',
    description: translate({
      id: 'data.resources.site.vuepress.description',
      message: 'Vue-powered static site generator',
    }),
  },
  materialMkdocs: {
    title: translate({
      id: 'data.resources.site.materialMkdocs.title',
      message: 'Material for MkDocs',
    }),
    href: 'https://squidfunk.github.io/mkdocs-material',
    description: translate({
      id: 'data.resources.site.materialMkdocs.description',
      message: 'Material Design documentation theme for MkDocs',
    }),
  },
  hexo: {
    title: translate({
      id: 'data.resources.site.hexo.title',
      message: 'Hexo',
    }),
    href: 'https://hexo.io',
    description: translate({
      id: 'data.resources.site.hexo.description',
      message: 'Node.js framework for fast static blogs',
    }),
  },
  arxiv: {
    title: translate({
      id: 'data.resources.site.arxiv.title',
      message: 'arXiv',
    }),
    href: 'https://arxiv.org',
    description: translate({
      id: 'data.resources.site.arxiv.description',
      message: 'Open-access repository for scholarly preprints',
    }),
  },
  googleScholar: {
    title: translate({
      id: 'data.resources.site.googleScholar.title',
      message: 'Google Scholar',
    }),
    href: 'https://scholar.google.com',
    description: translate({
      id: 'data.resources.site.googleScholar.description',
      message: 'Search engine for scholarly literature',
    }),
  },
  nature: {
    title: translate({
      id: 'data.resources.site.nature.title',
      message: 'Nature',
    }),
    href: 'https://www.nature.com',
    description: translate({
      id: 'data.resources.site.nature.description',
      message: 'Multidisciplinary peer-reviewed science journal',
    }),
  },
  science: {
    title: translate({
      id: 'data.resources.site.science.title',
      message: 'Science',
    }),
    href: 'https://www.science.org/journal/science',
    description: translate({
      id: 'data.resources.site.science.description',
      message: 'Multidisciplinary peer-reviewed journal from AAAS',
    }),
  },
  overleaf: {
    title: translate({
      id: 'data.resources.site.overleaf.title',
      message: 'Overleaf',
    }),
    href: 'https://www.overleaf.com',
    description: translate({
      id: 'data.resources.site.overleaf.description',
      message: 'Collaborative online LaTeX writing environment',
    }),
  },
  mitOcw: {
    title: translate({
      id: 'data.resources.site.mitOcw.title',
      message: 'MIT OpenCourseWare',
    }),
    href: 'https://ocw.mit.edu',
    description: translate({
      id: 'data.resources.site.mitOcw.description',
      message: 'Free course materials published by MIT',
    }),
  },
  coursera: {
    title: translate({
      id: 'data.resources.site.coursera.title',
      message: 'Coursera',
    }),
    href: 'https://www.coursera.org',
    description: translate({
      id: 'data.resources.site.coursera.description',
      message: 'Online courses, certificates, and degrees from institutions',
    }),
  },
  edx: {
    title: translate({
      id: 'data.resources.site.edx.title',
      message: 'edX',
    }),
    href: 'https://www.edx.org',
    description: translate({
      id: 'data.resources.site.edx.description',
      message: 'Online courses and credentials from universities and organizations',
    }),
  },
  deeplearningAi: {
    title: translate({
      id: 'data.resources.site.deeplearningAi.title',
      message: 'DeepLearning.AI',
    }),
    href: 'https://www.deeplearning.ai',
    description: translate({
      id: 'data.resources.site.deeplearningAi.description',
      message: 'Courses and educational programs for artificial intelligence',
    }),
  },
  classCentral: {
    title: translate({
      id: 'data.resources.site.classCentral.title',
      message: 'Class Central',
    }),
    href: 'https://www.classcentral.com',
    description: translate({
      id: 'data.resources.site.classCentral.description',
      message: 'Search and review platform for online courses',
    }),
  },
  codeforces: {
    title: translate({
      id: 'data.resources.site.codeforces.title',
      message: 'Codeforces',
    }),
    href: 'https://codeforces.com',
    description: translate({
      id: 'data.resources.site.codeforces.description',
      message: 'Competitive programming contests, problems, and ratings',
    }),
  },
  atcoder: {
    title: translate({
      id: 'data.resources.site.atcoder.title',
      message: 'AtCoder',
    }),
    href: 'https://atcoder.jp',
    description: translate({
      id: 'data.resources.site.atcoder.description',
      message: 'Online programming contests for all skill levels',
    }),
  },
  virtualJudge: {
    title: translate({
      id: 'data.resources.site.virtualJudge.title',
      message: 'Virtual Judge',
    }),
    href: 'https://vjudge.net',
    description: translate({
      id: 'data.resources.site.virtualJudge.description',
      message: 'Virtual judge aggregating problems from multiple platforms',
    }),
  },
  codeGolf: {
    title: translate({
      id: 'data.resources.site.codeGolf.title',
      message: 'Code Golf',
    }),
    href: 'https://code.golf',
    description: translate({
      id: 'data.resources.site.codeGolf.description',
      message: 'Programming challenges focused on the shortest solutions',
    }),
  },
  bigOCheatSheet: {
    title: translate({
      id: 'data.resources.site.bigOCheatSheet.title',
      message: 'Big-O Algorithm Complexity Cheat Sheet',
    }),
    href: 'https://www.bigocheatsheet.com',
    description: translate({
      id: 'data.resources.site.bigOCheatSheet.description',
      message: 'Reference for common data-structure and algorithm complexities',
    }),
  },
  luogu: {
    title: translate({
      id: 'data.resources.site.luogu.title',
      message: 'Luogu',
    }),
    href: 'https://www.luogu.com.cn',
    description: translate({
      id: 'data.resources.site.luogu.description',
      message: 'Chinese competitive programming platform and problem archive',
    }),
  },
  oiWiki: {
    title: translate({
      id: 'data.resources.site.oiWiki.title',
      message: 'OI Wiki',
    }),
    href: 'https://oi-wiki.org',
    description: translate({
      id: 'data.resources.site.oiWiki.description',
      message: 'Open knowledge base for competitive programming',
    }),
  },
  oierdb: {
    title: translate({
      id: 'data.resources.site.oierdb.title',
      message: 'OIerDb NG',
    }),
    href: 'https://oier.baoshuo.dev',
    description: translate({
      id: 'data.resources.site.oierdb.description',
      message: 'Database of Chinese informatics competition participants',
    }),
  },
  originalProblemChecker: {
    title: translate({
      id: 'data.resources.site.originalProblemChecker.title',
      message: 'Original Problem Checker',
    }),
    href: 'https://yuantiji.ac/?lang=zh',
    description: translate({
      id: 'data.resources.site.originalProblemChecker.description',
      message: 'Tool for checking whether a contest problem is original',
    }),
  },
  luoguSaver: {
    title: translate({
      id: 'data.resources.site.luoguSaver.title',
      message: 'Luogu Saver',
    }),
    href: 'https://www.luogu.me',
    description: translate({
      id: 'data.resources.site.luoguSaver.description',
      message: 'Archive for preserved Luogu problems and solutions',
    }),
  },
  algorithmDuels: {
    title: translate({
      id: 'data.resources.site.algorithmDuels.title',
      message: 'Algorithm Duels Online',
    }),
    href: 'https://algorithm-duels.online',
    description: translate({
      id: 'data.resources.site.algorithmDuels.description',
      message: 'Team-based head-to-head contests using Codeforces problems',
    }),
  },
  solutionFormatter: {
    title: translate({
      id: 'data.resources.site.solutionFormatter.title',
      message: 'Solution Formatter',
    }),
    href: 'https://tj.imken.dev',
    description: translate({
      id: 'data.resources.site.solutionFormatter.description',
      message: 'Formatter for Luogu solution articles and source code',
    }),
  },
  csacademyDiff: {
    title: translate({
      id: 'data.resources.site.csacademyDiff.title',
      message: 'CS Academy Diff Tool',
    }),
    href: 'https://csacademy.com/app/diffing_tool/',
    description: translate({
      id: 'data.resources.site.csacademyDiff.description',
      message: 'Browser tool for comparing text outputs',
    }),
  },
  csacademyGraph: {
    title: translate({
      id: 'data.resources.site.csacademyGraph.title',
      message: 'CS Academy Graph Editor',
    }),
    href: 'https://csacademy.com/app/graph_editor/',
    description: translate({
      id: 'data.resources.site.csacademyGraph.description',
      message: 'Interactive editor for creating and exporting graphs',
    }),
  },
  wolframAlpha: {
    title: translate({
      id: 'data.resources.site.wolframAlpha.title',
      message: 'Wolfram|Alpha',
    }),
    href: 'https://www.wolframalpha.com',
    description: translate({
      id: 'data.resources.site.wolframAlpha.description',
      message: 'Computational knowledge engine for mathematics and science',
    }),
  },
  desmos: {
    title: translate({
      id: 'data.resources.site.desmos.title',
      message: 'Desmos',
    }),
    href: 'https://www.desmos.com',
    description: translate({
      id: 'data.resources.site.desmos.description',
      message: 'Interactive graphing, geometry, and scientific calculators',
    }),
  },
  geogebra: {
    title: translate({
      id: 'data.resources.site.geogebra.title',
      message: 'GeoGebra',
    }),
    href: 'https://www.geogebra.org',
    description: translate({
      id: 'data.resources.site.geogebra.description',
      message: 'Interactive tools for geometry, algebra, and calculus',
    }),
  },
  numpy: {
    title: translate({
      id: 'data.resources.site.numpy.title',
      message: 'NumPy',
    }),
    href: 'https://numpy.org',
    description: translate({
      id: 'data.resources.site.numpy.description',
      message: 'Core Python library for numerical array computing',
    }),
  },
  oeis: {
    title: translate({
      id: 'data.resources.site.oeis.title',
      message: 'OEIS',
    }),
    href: 'https://oeis.org',
    description: translate({
      id: 'data.resources.site.oeis.description',
      message: 'Searchable encyclopedia of integer sequences',
    }),
  },
  latexLive: {
    title: translate({
      id: 'data.resources.site.latexLive.title',
      message: 'LaTeXLive',
    }),
    href: 'https://www.latexlive.com',
    description: translate({
      id: 'data.resources.site.latexLive.description',
      message: 'Online LaTeX formula editor with recognition and export',
    }),
  },
  recraft: {
    title: translate({
      id: 'data.resources.site.recraft.title',
      message: 'Recraft',
    }),
    href: 'https://www.recraft.ai',
    description: translate({
      id: 'data.resources.site.recraft.description',
      message: 'AI design platform for raster and vector image generation',
    }),
  },
  quiverAi: {
    title: translate({
      id: 'data.resources.site.quiverAi.title',
      message: 'QuiverAI',
    }),
    href: 'https://quiver.ai',
    description: translate({
      id: 'data.resources.site.quiverAi.description',
      message: 'AI workspace for editable SVG creation and animation',
    }),
  },
  openCut: {
    title: translate({
      id: 'data.resources.site.openCut.title',
      message: 'OpenCut',
    }),
    href: 'https://opencut.app',
    description: translate({
      id: 'data.resources.site.openCut.description',
      message: 'Open-source browser-based video editor',
    }),
  },
  multDev: {
    title: translate({
      id: 'data.resources.site.multDev.title',
      message: 'Mult.dev',
    }),
    href: 'https://mult.dev',
    description: translate({
      id: 'data.resources.site.multDev.description',
      message: 'Tool for animated travel maps and route videos',
    }),
  },
  codeSnap: {
    title: translate({
      id: 'data.resources.site.codeSnap.title',
      message: 'CodeSnap',
    }),
    href: 'https://codesnap.dev',
    description: translate({
      id: 'data.resources.site.codeSnap.description',
      message: 'Editor for creating shareable code images',
    }),
  },
  colorable: {
    title: translate({
      id: 'data.resources.site.colorable.title',
      message: 'Colorable',
    }),
    href: 'https://colorable.jxnblk.com',
    description: translate({
      id: 'data.resources.site.colorable.description',
      message: 'Tool for checking and tuning color contrast',
    }),
  },
  skillIcons: {
    title: translate({
      id: 'data.resources.site.skillIcons.title',
      message: 'Skill Icons',
    }),
    href: 'https://skillicons.dev',
    description: translate({
      id: 'data.resources.site.skillIcons.description',
      message: 'Embeddable icons for programming languages and tools',
    }),
  },
  brandColors: {
    title: translate({
      id: 'data.resources.site.brandColors.title',
      message: 'BrandColors',
    }),
    href: 'https://brandcolors.net',
    description: translate({
      id: 'data.resources.site.brandColors.description',
      message: 'Reference library of official brand color codes',
    }),
  },
  pixelMap: {
    title: translate({
      id: 'data.resources.site.pixelMap.title',
      message: 'Pixel Map Generator',
    }),
    href: 'https://pixelmap.amcharts.com',
    description: translate({
      id: 'data.resources.site.pixelMap.description',
      message: 'Generator for pixel-style maps and multiple export formats',
    }),
  },
  bentoGrids: {
    title: translate({
      id: 'data.resources.site.bentoGrids.title',
      message: 'BentoGrids',
    }),
    href: 'https://bentogrids.com',
    description: translate({
      id: 'data.resources.site.bentoGrids.description',
      message: 'Curated gallery of bento-style interface designs',
    }),
  },
  makerworld: {
    title: translate({
      id: 'data.resources.site.makerworld.title',
      message: 'MakerWorld',
    }),
    href: 'https://makerworld.com.cn',
    description: translate({
      id: 'data.resources.site.makerworld.description',
      message: 'Community platform for 3D printing models',
    }),
  },
  speedtest: {
    title: translate({
      id: 'data.resources.site.speedtest.title',
      message: 'Speedtest by Ookla',
    }),
    href: 'https://www.speedtest.net',
    description: translate({
      id: 'data.resources.site.speedtest.description',
      message: 'Internet connection speed measurement by Ookla',
    }),
  },
  netCoffee: {
    title: translate({
      id: 'data.resources.site.netCoffee.title',
      message: 'Net.Coffee',
    }),
    href: 'https://ip.net.coffee',
    description: translate({
      id: 'data.resources.site.netCoffee.description',
      message: 'IP address, routing, and connectivity diagnostics',
    }),
  },
  passwordMonster: {
    title: translate({
      id: 'data.resources.site.passwordMonster.title',
      message: 'Password Monster',
    }),
    href: 'https://passwordmonster.com',
    description: translate({
      id: 'data.resources.site.passwordMonster.description',
      message: 'Browser tool for estimating password strength',
    }),
  },
  volumeshader: {
    title: translate({
      id: 'data.resources.site.volumeshader.title',
      message: 'volumeshader_bm',
    }),
    href: 'https://cznull.github.io/vsbm',
    description: translate({
      id: 'data.resources.site.volumeshader.description',
      message: 'WebGL volumetric shader performance benchmark',
    }),
  },
  fishBowl: {
    title: translate({
      id: 'data.resources.site.fishBowl.title',
      message: 'HTML5 Fish Bowl',
    }),
    href: 'https://eucscore.com/demos/HTML5-Fishbowl/index.html',
    description: translate({
      id: 'data.resources.site.fishBowl.description',
      message: 'HTML5 graphics benchmark with animated fish',
    }),
  },
  webglAquarium: {
    title: translate({
      id: 'data.resources.site.webglAquarium.title',
      message: 'WebGL Aquarium',
    }),
    href: 'https://webglsamples.org/aquarium/aquarium.html',
    description: translate({
      id: 'data.resources.site.webglAquarium.description',
      message: 'WebGL rendering benchmark with an animated aquarium',
    }),
  },
  aRealMe: {
    title: translate({
      id: 'data.resources.site.aRealMe.title',
      message: 'A Real Me',
    }),
    href: 'https://www.arealme.com',
    description: translate({
      id: 'data.resources.site.aRealMe.description',
      message: 'Collection of personality, ability, and knowledge tests',
    }),
  },
  politicalOrientation: {
    title: translate({
      id: 'data.resources.site.politicalOrientation.title',
      message: 'Political Orientation Test',
    }),
    href: 'https://luckyfuy.top/compass/',
    description: translate({
      id: 'data.resources.site.politicalOrientation.description',
      message: 'Questionnaire for exploring political orientation',
    }),
  },
  youtube: {
    title: translate({
      id: 'data.resources.site.youtube.title',
      message: 'YouTube',
    }),
    href: 'https://www.youtube.com',
    description: translate({
      id: 'data.resources.site.youtube.description',
      message: 'Video hosting, streaming, and creator platform',
    }),
  },
  x: {
    title: translate({
      id: 'data.resources.site.x.title',
      message: 'X',
    }),
    href: 'https://x.com',
    description: translate({
      id: 'data.resources.site.x.description',
      message: 'Real-time social network for public conversations',
    }),
  },
  facebook: {
    title: translate({
      id: 'data.resources.site.facebook.title',
      message: 'Facebook',
    }),
    href: 'https://www.facebook.com',
    description: translate({
      id: 'data.resources.site.facebook.description',
      message: 'Social network for people, groups, and organizations',
    }),
  },
  telegramWeb: {
    title: translate({
      id: 'data.resources.site.telegramWeb.title',
      message: 'Telegram Web',
    }),
    href: 'https://web.telegram.org',
    description: translate({
      id: 'data.resources.site.telegramWeb.description',
      message: 'Browser client for Telegram messaging',
    }),
  },
  polymarket: {
    title: translate({
      id: 'data.resources.site.polymarket.title',
      message: 'Polymarket',
    }),
    href: 'https://polymarket.com',
    description: translate({
      id: 'data.resources.site.polymarket.description',
      message: 'Prediction market based on tradable event contracts',
    }),
  },
  bilibili: {
    title: translate({
      id: 'data.resources.site.bilibili.title',
      message: 'bilibili',
    }),
    href: 'https://www.bilibili.com',
    description: translate({
      id: 'data.resources.site.bilibili.description',
      message: 'Chinese video platform and interest-based community',
    }),
  },
  crazygames: {
    title: translate({
      id: 'data.resources.site.crazygames.title',
      message: 'CrazyGames',
    }),
    href: 'https://www.crazygames.com',
    description: translate({
      id: 'data.resources.site.crazygames.description',
      message: 'Catalog of free browser games',
    }),
  },
  freeFocusGames: {
    title: translate({
      id: 'data.resources.site.freeFocusGames.title',
      message: 'FreeFocusGames',
    }),
    href: 'https://www.freefocusgames.com',
    description: translate({
      id: 'data.resources.site.freeFocusGames.description',
      message: 'Browser games for attention and memory practice',
    }),
  },
  ioGames: {
    title: translate({
      id: 'data.resources.site.ioGames.title',
      message: '.io Games',
    }),
    href: 'https://iogames.space',
    description: translate({
      id: 'data.resources.site.ioGames.description',
      message: 'Directory of multiplayer .io browser games',
    }),
  },
  nealFun: {
    title: translate({
      id: 'data.resources.site.nealFun.title',
      message: 'Neal.fun',
    }),
    href: 'https://neal.fun',
    description: translate({
      id: 'data.resources.site.nealFun.description',
      message: 'Collection of interactive web games and visual experiments',
    }),
  },
  lichess: {
    title: translate({
      id: 'data.resources.site.lichess.title',
      message: 'Lichess',
    }),
    href: 'https://lichess.org',
    description: translate({
      id: 'data.resources.site.lichess.description',
      message: 'Free and open-source online chess platform',
    }),
  },
  generalsIo: {
    title: translate({
      id: 'data.resources.site.generalsIo.title',
      message: 'generals.io',
    }),
    href: 'https://generals.io',
    description: translate({
      id: 'data.resources.site.generalsIo.description',
      message: 'Multiplayer territory-control strategy game',
    }),
  },
  florrIo: {
    title: translate({
      id: 'data.resources.site.florrIo.title',
      message: 'florr.io',
    }),
    href: 'https://florr.io',
    description: translate({
      id: 'data.resources.site.florrIo.description',
      message: 'Multiplayer survival game built around flowers and petals',
    }),
  },
  tilemanIo: {
    title: translate({
      id: 'data.resources.site.tilemanIo.title',
      message: 'TileMan.io',
    }),
    href: 'https://tileman.io',
    description: translate({
      id: 'data.resources.site.tilemanIo.description',
      message: 'Multiplayer territory-capture game',
    }),
  },
  yorgIo: {
    title: translate({
      id: 'data.resources.site.yorgIo.title',
      message: 'YORG.io',
    }),
    href: 'https://yorg.io',
    description: translate({
      id: 'data.resources.site.yorgIo.description',
      message: 'Supply-chain tower defense game against zombies',
    }),
  },
  bloxdIo: {
    title: translate({
      id: 'data.resources.site.bloxdIo.title',
      message: 'Bloxd.io',
    }),
    href: 'https://bloxd.io',
    description: translate({
      id: 'data.resources.site.bloxdIo.description',
      message: 'Multiplayer block-building and minigame platform',
    }),
  },
  wplace: {
    title: translate({
      id: 'data.resources.site.wplace.title',
      message: 'Wplace',
    }),
    href: 'https://wplace.live',
    description: translate({
      id: 'data.resources.site.wplace.description',
      message: 'Collaborative pixel canvas on a world map',
    }),
  },
  sandspiel: {
    title: translate({
      id: 'data.resources.site.sandspiel.title',
      message: 'sandspiel',
    }),
    href: 'https://sandspiel.club',
    description: translate({
      id: 'data.resources.site.sandspiel.description',
      message: 'Falling-sand simulation and creative sandbox',
    }),
  },
  kiomet: {
    title: translate({
      id: 'data.resources.site.kiomet.title',
      message: 'Kiomet',
    }),
    href: 'https://kiomet.com',
    description: translate({
      id: 'data.resources.site.kiomet.description',
      message: 'Multiplayer real-time territory strategy game',
    }),
  },
  linkr: {
    title: translate({
      id: 'data.resources.site.linkr.title',
      message: 'LINKR',
    }),
    href: 'https://www.playlinkr.net',
    description: translate({
      id: 'data.resources.site.linkr.description',
      message: 'Daily puzzle for connecting all points',
    }),
  },
  diepIo: {
    title: translate({
      id: 'data.resources.site.diepIo.title',
      message: 'diep.io',
    }),
    href: 'https://diep.io',
    description: translate({
      id: 'data.resources.site.diepIo.description',
      message: 'Multiplayer tank arena game',
    }),
  },
  gridspech: {
    title: translate({
      id: 'data.resources.site.gridspech.title',
      message: 'Gridspech',
    }),
    href: 'https://gridspech.baublejar.com',
    description: translate({
      id: 'data.resources.site.gridspech.description',
      message: 'Rule-discovery puzzle with grids and symbols',
    }),
  },
  evolutionOfTrust: {
    title: translate({
      id: 'data.resources.site.evolutionOfTrust.title',
      message: 'The Evolution of Trust',
    }),
    href: 'https://dccxi.com/trust/',
    description: translate({
      id: 'data.resources.site.evolutionOfTrust.description',
      message: 'Interactive game-theory explainer about trust',
    }),
  },
  tuxun: {
    title: translate({
      id: 'data.resources.site.tuxun.title',
      message: 'Tuxun',
    }),
    href: 'https://tuxun.fun',
    description: translate({
      id: 'data.resources.site.tuxun.description',
      message: 'Photo-based geography guessing game',
    }),
  },
  guessSalt: {
    title: translate({
      id: 'data.resources.site.guessSalt.title',
      message: 'Guess Salt',
    }),
    href: 'https://xiaoce.fun',
    description: translate({
      id: 'data.resources.site.guessSalt.description',
      message: 'Collection of daily, quiz, and multiplayer guessing games',
    }),
  },
  nameArena: {
    title: translate({
      id: 'data.resources.site.nameArena.title',
      message: 'Name Arena',
    }),
    href: 'https://namerena.github.io',
    description: translate({
      id: 'data.resources.site.nameArena.description',
      message: 'Deterministic text battles generated from names',
    }),
  },
  boardGameCollection: {
    title: translate({
      id: 'data.resources.site.boardGameCollection.title',
      message: 'Board Game Collection',
    }),
    href: 'https://game.hullqin.cn',
    description: translate({
      id: 'data.resources.site.boardGameCollection.description',
      message: 'Collection of multiplayer digital board games',
    }),
  },
  apple: {
    title: translate({
      id: 'data.resources.site.apple.title',
      message: 'Apple',
    }),
    href: 'https://www.apple.com',
    description: translate({
      id: 'data.resources.site.apple.description',
      message: 'Consumer technology products, services, and support',
    }),
  },
  appleSpecs: {
    title: translate({
      id: 'data.resources.site.appleSpecs.title',
      message: 'Apple Product Specs Hub',
    }),
    href: 'https://hubweb.cn',
    description: translate({
      id: 'data.resources.site.appleSpecs.description',
      message: 'Reference for Apple device and chip specifications',
    }),
  },
  socpk: {
    title: translate({
      id: 'data.resources.site.socpk.title',
      message: 'SOCPK',
    }),
    href: 'https://socpk.com',
    description: translate({
      id: 'data.resources.site.socpk.description',
      message: 'Rankings and comparisons for mobile system-on-chip performance',
    }),
  },
  digitalLychee: {
    title: translate({
      id: 'data.resources.site.digitalLychee.title',
      message: 'Digital Lychee',
    }),
    href: 'https://lizhi.shop',
    description: translate({
      id: 'data.resources.site.digitalLychee.description',
      message: 'Chinese storefront for licensed desktop and mobile software',
    }),
  },
  classWidgets: {
    title: translate({
      id: 'data.resources.site.classWidgets.title',
      message: 'Class Widgets 2',
    }),
    href: 'https://github.com/RinLit-233-shiroko/Class-Widgets-2',
    description: translate({
      id: 'data.resources.site.classWidgets.description',
      message: 'Next-generation open-source desktop timetable application',
    }),
  },
  eClassroomTerminator: {
    title: translate({
      id: 'data.resources.site.eClassroomTerminator.title',
      message: 'E-Classroom Terminator',
    }),
    href: 'https://dzjszjz.nkxingxh.top',
    description: translate({
      id: 'data.resources.site.eClassroomTerminator.description',
      message: 'Windows utility for inspecting and lifting classroom-computer restrictions',
    }),
  },
  googleTranslate: {
    title: translate({
      id: 'data.resources.site.googleTranslate.title',
      message: 'Google Translate',
    }),
    href: 'https://translate.google.com',
    description: translate({
      id: 'data.resources.site.googleTranslate.description',
      message: 'Translation service for text, documents, images, and websites',
    }),
  },
  ilovepdf: {
    title: translate({
      id: 'data.resources.site.ilovepdf.title',
      message: 'iLovePDF',
    }),
    href: 'https://www.ilovepdf.com',
    description: translate({
      id: 'data.resources.site.ilovepdf.description',
      message: 'Online toolkit for editing and converting PDF files',
    }),
  },
  qrCodeGenerator: {
    title: translate({
      id: 'data.resources.site.qrCodeGenerator.title',
      message: 'QR Code Generator',
    }),
    href: 'https://www.qr-code-generator.com',
    description: translate({
      id: 'data.resources.site.qrCodeGenerator.description',
      message: 'Customizable QR code creation and export tool',
    }),
  },
  forensically: {
    title: translate({
      id: 'data.resources.site.forensically.title',
      message: 'Forensically',
    }),
    href: 'https://29a.ch/photo-forensics',
    description: translate({
      id: 'data.resources.site.forensically.description',
      message: 'Browser suite for digital image forensics',
    }),
  },
  passportIndex: {
    title: translate({
      id: 'data.resources.site.passportIndex.title',
      message: 'Passport Index',
    }),
    href: 'https://www.passportindex.org',
    description: translate({
      id: 'data.resources.site.passportIndex.description',
      message: 'Interactive passport rankings and visa-access reference',
    }),
  },
  noteMs: {
    title: translate({
      id: 'data.resources.site.noteMs.title',
      message: 'Note.ms',
    }),
    href: 'https://note.ms',
    description: translate({
      id: 'data.resources.site.noteMs.description',
      message: 'URL-addressed browser notes for quick sharing',
    }),
  },
  normalSpeech: {
    title: translate({
      id: 'data.resources.site.normalSpeech.title',
      message: 'Can You Speak Normally?',
    }),
    href: 'https://lab.magiconch.com/nbnhhsh/',
    description: translate({
      id: 'data.resources.site.normalSpeech.description',
      message: 'Decoder for Chinese initial-letter abbreviations',
    }),
  },
  dazidazi: {
    title: translate({
      id: 'data.resources.site.dazidazi.title',
      message: 'dazidazi',
    }),
    href: 'https://dazidazi.com',
    description: translate({
      id: 'data.resources.site.dazidazi.description',
      message: 'Online typing practice for Chinese, English, and code',
    }),
  },
  wildAi: {
    title: translate({
      id: 'data.resources.site.wildAi.title',
      message: 'WildAI',
    }),
    href: 'https://bewild.ai',
    description: translate({
      id: 'data.resources.site.wildAi.description',
      message: 'Third-party subscription service for international AI accounts',
    }),
  },
  lubanSms: {
    title: translate({
      id: 'data.resources.site.lubanSms.title',
      message: 'Luban SMS',
    }),
    href: 'https://lubansms.com',
    description: translate({
      id: 'data.resources.site.lubanSms.description',
      message: 'Virtual number and SMS messaging service',
    }),
  },
  lailaiTools: {
    title: translate({
      id: 'data.resources.site.lailaiTools.title',
      message: "lailai's Tools",
    }),
    href: 'https://tools.lailai.one',
    description: translate({
      id: 'data.resources.site.lailaiTools.description',
      message: 'Privacy-friendly developer tools that run locally in the browser',
    }),
  },
  lailaiAcademy: {
    title: translate({
      id: 'data.resources.site.lailaiAcademy.title',
      message: "lailai's Academy",
    }),
    href: 'https://academy.lailai.one',
    description: translate({
      id: 'data.resources.site.lailaiAcademy.description',
      message: 'Personalized self-study platform for high school students',
    }),
  },
  lailaiCloud: {
    title: translate({
      id: 'data.resources.site.lailaiCloud.title',
      message: "lailai's Cloud",
    }),
    href: 'https://cloud.lailai.one',
    description: translate({
      id: 'data.resources.site.lailaiCloud.description',
      message: 'Personal file storage and resource hosting service',
    }),
  },
} satisfies Record<string, ResourceDefinition>;

export type ResourceId = keyof typeof RESOURCE_CATALOG;

export interface ResourceItem extends ResourceDefinition {
  id: ResourceId;
}

export interface ResourceCategoryItem {
  id: string;
  title: string;
  icon: string;
  resources: ResourceItem[];
}

function resources(...ids: ResourceId[]): ResourceItem[] {
  return ids.map((id) => ({ id, ...RESOURCE_CATALOG[id] }));
}

export const RESOURCE_LIST: ResourceCategoryItem[] = [
  {
    id: 'searchKnowledge',
    title: translate({
      id: 'data.resources.category.searchKnowledge.title',
      message: 'Search & Knowledge',
    }),
    icon: 'lucide:search',
    resources: resources('google', 'bing', 'baidu', 'wikipedia'),
  },
  {
    id: 'aiAssistants',
    title: translate({
      id: 'data.resources.category.aiAssistants.title',
      message: 'AI Assistants',
    }),
    icon: 'lucide:bot',
    resources: resources('chatgpt', 'gemini', 'claude', 'grok', 'deepseek', 'kimi'),
  },
  {
    id: 'aiEcosystem',
    title: translate({
      id: 'data.resources.category.aiEcosystem.title',
      message: 'AI Platforms & Ecosystem',
    }),
    icon: 'lucide:brain-circuit',
    resources: resources(
      'googleDeepmind',
      'metaAi',
      'microsoftAi',
      'huggingFace',
      'arena',
      'googleAiStudio',
      'pytorch',
      'keras',
      'gptzero',
      'notByAi'
    ),
  },
  {
    id: 'cloudNetwork',
    title: translate({
      id: 'data.resources.category.cloudNetwork.title',
      message: 'Cloud & Network',
    }),
    icon: 'lucide:cloud',
    resources: resources(
      'cloudflare',
      'aws',
      'azure',
      'godaddy',
      'namecheap',
      'namesilo',
      'expressvpn',
      'nordvpn',
      'astrill',
      'rainyun',
      'nexitally',
      'taishanNet'
    ),
  },
  {
    id: 'developerTools',
    title: translate({
      id: 'data.resources.category.developerTools.title',
      message: 'Developer Tools',
    }),
    icon: 'lucide:terminal',
    resources: resources(
      'github',
      'githubCodespaces',
      'stackblitz',
      'vscodeWeb',
      'sandpack',
      'compilerExplorer',
      'onlinegdb',
      'pycharm',
      'jupyter',
      'cppreference',
      'shields',
      'tsinghuaMirror',
      'gitstarRanking',
      'committersTop'
    ),
  },
  {
    id: 'webPublishing',
    title: translate({
      id: 'data.resources.category.webPublishing.title',
      message: 'Web Development & Publishing',
    }),
    icon: 'lucide:layout-template',
    resources: resources(
      'react',
      'wordpress',
      'docusaurus',
      'vitepress',
      'vuepress',
      'materialMkdocs',
      'hexo'
    ),
  },
  {
    id: 'researchPublishing',
    title: translate({
      id: 'data.resources.category.researchPublishing.title',
      message: 'Research & Publishing',
    }),
    icon: 'lucide:microscope',
    resources: resources('arxiv', 'googleScholar', 'nature', 'science', 'overleaf'),
  },
  {
    id: 'learningCourses',
    title: translate({
      id: 'data.resources.category.learningCourses.title',
      message: 'Learning & Courses',
    }),
    icon: 'lucide:graduation-cap',
    resources: resources('mitOcw', 'coursera', 'edx', 'deeplearningAi', 'classCentral'),
  },
  {
    id: 'competitiveProgramming',
    title: translate({
      id: 'data.resources.category.competitiveProgramming.title',
      message: 'Competitive Programming',
    }),
    icon: 'lucide:trophy',
    resources: resources(
      'codeforces',
      'atcoder',
      'virtualJudge',
      'codeGolf',
      'bigOCheatSheet',
      'luogu',
      'oiWiki',
      'oierdb',
      'originalProblemChecker',
      'luoguSaver',
      'algorithmDuels',
      'solutionFormatter',
      'csacademyDiff',
      'csacademyGraph'
    ),
  },
  {
    id: 'mathComputing',
    title: translate({
      id: 'data.resources.category.mathComputing.title',
      message: 'Mathematics & Computing',
    }),
    icon: 'lucide:calculator',
    resources: resources('wolframAlpha', 'desmos', 'geogebra', 'numpy', 'oeis', 'latexLive'),
  },
  {
    id: 'designCreation',
    title: translate({
      id: 'data.resources.category.designCreation.title',
      message: 'Design & Creation',
    }),
    icon: 'lucide:palette',
    resources: resources(
      'recraft',
      'quiverAi',
      'openCut',
      'multDev',
      'codeSnap',
      'colorable',
      'skillIcons',
      'brandColors',
      'pixelMap',
      'bentoGrids',
      'makerworld'
    ),
  },
  {
    id: 'testingBenchmarks',
    title: translate({
      id: 'data.resources.category.testingBenchmarks.title',
      message: 'Tests & Benchmarks',
    }),
    icon: 'lucide:gauge',
    resources: resources(
      'speedtest',
      'netCoffee',
      'passwordMonster',
      'volumeshader',
      'fishBowl',
      'webglAquarium',
      'aRealMe',
      'politicalOrientation'
    ),
  },
  {
    id: 'mediaCommunities',
    title: translate({
      id: 'data.resources.category.mediaCommunities.title',
      message: 'Media & Communities',
    }),
    icon: 'lucide:users',
    resources: resources('youtube', 'x', 'facebook', 'telegramWeb', 'bilibili'),
  },
  {
    id: 'browserGames',
    title: translate({
      id: 'data.resources.category.browserGames.title',
      message: 'Browser Games',
    }),
    icon: 'lucide:gamepad-2',
    resources: resources(
      'crazygames',
      'freeFocusGames',
      'ioGames',
      'nealFun',
      'lichess',
      'generalsIo',
      'florrIo',
      'tilemanIo',
      'yorgIo',
      'bloxdIo',
      'wplace',
      'sandspiel',
      'kiomet',
      'linkr',
      'diepIo',
      'gridspech',
      'evolutionOfTrust',
      'tuxun',
      'guessSalt',
      'nameArena',
      'boardGameCollection'
    ),
  },
  {
    id: 'softwareDevices',
    title: translate({
      id: 'data.resources.category.softwareDevices.title',
      message: 'Software & Devices',
    }),
    icon: 'lucide:monitor-smartphone',
    resources: resources(
      'apple',
      'appleSpecs',
      'socpk',
      'digitalLychee',
      'classWidgets',
      'eClassroomTerminator'
    ),
  },
  {
    id: 'onlineServices',
    title: translate({
      id: 'data.resources.category.onlineServices.title',
      message: 'Online Services & Utilities',
    }),
    icon: 'lucide:wrench',
    resources: resources(
      'googleTranslate',
      'polymarket',
      'passportIndex',
      'ilovepdf',
      'qrCodeGenerator',
      'forensically',
      'noteMs',
      'normalSpeech',
      'dazidazi',
      'wildAi',
      'lubanSms'
    ),
  },
  {
    id: 'personalProjects',
    title: translate({
      id: 'data.resources.category.personalProjects.title',
      message: 'Personal Projects',
    }),
    icon: 'lucide:blocks',
    resources: resources('lailaiTools', 'lailaiAcademy', 'lailaiCloud'),
  },
];
