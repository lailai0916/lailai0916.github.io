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
    title: 'Search & Navigation',
    icon: 'lucide:search',
    resources: [
      {
        title: 'Google',
        href: 'https://www.google.com',
        description: "The world's largest search engine",
      },
      {
        title: 'Microsoft Bing',
        href: 'https://www.bing.com',
        description: "Microsoft's AI-powered search",
      },
      {
        title: 'Baidu',
        href: 'https://www.baidu.com',
        description: "China's leading Chinese search engine",
      },
    ],
  },
  {
    title: 'AI Assistants & Generation',
    icon: 'lucide:bot',
    resources: [
      {
        title: 'ChatGPT',
        href: 'https://chatgpt.com',
        description: "OpenAI's large language model",
      },
      {
        title: 'Claude',
        href: 'https://claude.ai',
        description: "Anthropic's safe AI assistant",
      },
      {
        title: 'Gemini',
        href: 'https://gemini.google.com',
        description: "Google's multimodal AI assistant",
      },
      {
        title: 'Grok',
        href: 'https://grok.com',
        description: "xAI's real-time information AI assistant",
      },
      {
        title: 'DeepSeek',
        href: 'https://deepseek.com',
        description: "DeepSeek's Chinese AI model",
      },
      {
        title: 'Sora',
        href: 'https://sora.com',
        description: "OpenAI's text-to-video generator",
      },
    ],
  },
  {
    title: 'AI R&D & Ecosystem',
    icon: 'lucide:microscope',
    resources: [
      {
        title: 'Hugging Face',
        href: 'https://huggingface.co',
        description: 'Open-source AI model community platform',
      },
      {
        title: 'LMArena',
        href: 'https://lmarena.ai',
        description: 'AI model comparison arena',
      },
      {
        title: 'Google DeepMind',
        href: 'https://deepmind.com',
        description: "Google's cutting-edge AI research",
      },
      {
        title: 'Google AI',
        href: 'https://ai.google',
        description: 'Google AI research projects',
      },
      {
        title: 'Meta AI',
        href: 'https://ai.facebook.com',
        description: "Meta's artificial intelligence research",
      },
      {
        title: 'Microsoft AI',
        href: 'https://www.microsoft.com/ai',
        description: "Microsoft's AI research and development",
      },
      {
        title: 'DeepLearning.AI',
        href: 'https://deeplearning.ai',
        description: 'AI education platform founded by Andrew Ng',
      },
      {
        title: 'PyTorch',
        href: 'https://pytorch.org',
        description: 'A deep learning framework',
      },
      {
        title: 'Keras',
        href: 'https://keras.io',
        description: 'High-level API for deep learning',
      },
    ],
  },
  {
    title: 'Cloud & CDN',
    icon: 'lucide:cloud',
    resources: [
      {
        title: 'Amazon Web Services',
        href: 'https://aws.amazon.com',
        description: "Amazon's cloud computing platform",
      },
      {
        title: 'Microsoft Azure',
        href: 'https://azure.microsoft.com',
        description: "Microsoft's cloud services platform",
      },
      {
        title: 'Cloudflare',
        href: 'https://www.cloudflare.com',
        description: 'CDN and edge security network',
      },
    ],
  },
  {
    title: 'Domains & DNS',
    icon: 'lucide:globe-2',
    resources: [
      {
        title: 'Namecheap',
        href: 'https://www.namecheap.com',
        description: 'Domain registration and management service',
      },
      {
        title: 'Namesilo',
        href: 'https://www.namesilo.com',
        description: 'Domain registration and management service',
      },
    ],
  },
  {
    title: 'Code Hosting & Statistics',
    icon: 'lucide:github',
    resources: [
      {
        title: 'GitHub',
        href: 'https://github.com',
        description: "The world's largest code hosting platform",
      },
      {
        title: 'GitStar Ranking',
        href: 'https://gitstar-ranking.com',
        description: 'GitHub user star rankings',
      },
      {
        title: 'Committers Top',
        href: 'https://committers.top',
        description: 'List of active GitHub users by country',
      },
      {
        title: 'GitHub Metrics',
        href: 'https://github.com/lowlighter/metrics',
        description: 'Generate infographics for your GitHub account',
      },
      {
        title: 'GitHub Stats',
        href: 'https://github.com/jstrieb/github-stats',
        description: 'Generate personal GitHub statistics graph',
      },
      {
        title: 'Shields.io',
        href: 'https://shields.io',
        description: 'Service for generating project badges',
      },
    ],
  },
  {
    title: 'Online IDEs & Sandboxes',
    icon: 'lucide:terminal',
    resources: [
      {
        title: 'GitHub Codespaces',
        href: 'https://github.com/codespaces',
        description: "GitHub's cloud development environment",
      },
      {
        title: 'Gitpod',
        href: 'https://www.gitpod.io',
        description: 'Cloud IDE development environment',
      },
      {
        title: 'CodeSandbox',
        href: 'https://codesandbox.io',
        description: 'Online code editor',
      },
      {
        title: 'CodePen',
        href: 'https://codepen.io',
        description: 'Online front-end development platform',
      },
      {
        title: 'StackBlitz',
        href: 'https://stackblitz.com',
        description: 'Modern front-end online IDE',
      },
      {
        title: 'vscode.dev',
        href: 'https://vscode.dev',
        description: 'VSCode for the browser',
      },
      {
        title: 'Sandpack',
        href: 'https://sandpack.codesandbox.io',
        description: 'Embeddable code editor',
      },
    ],
  },
  {
    title: 'Compiling & Debugging',
    icon: 'lucide:bug',
    resources: [
      {
        title: 'OnlineGDB',
        href: 'https://www.onlinegdb.com/online_python_compiler',
        description: 'Multi-language online compiler',
      },
      {
        title: 'Compiler Explorer',
        href: 'https://godbolt.org',
        description: 'Assembly and compiler analysis tool',
      },
      {
        title: 'Diff Tool',
        href: 'https://csacademy.com/app/diffing_tool/',
        description: 'Online code difference comparison',
      },
      {
        title: 'Graph Editor',
        href: 'https://csacademy.com/app/graph_editor/',
        description: 'Graph structure visualization editor',
      },
    ],
  },
  {
    title: 'Development Tools & IDEs',
    icon: 'lucide:code-2',
    resources: [
      {
        title: 'PyCharm',
        href: 'https://www.jetbrains.com/pycharm',
        description: 'JetBrains Python IDE',
      },
      {
        title: 'Jupyter',
        href: 'https://jupyter.org',
        description: 'Notebook and data science environment',
      },
    ],
  },
  {
    title: 'Academia & Papers',
    icon: 'lucide:book-open',
    resources: [
      {
        title: 'Google Scholar',
        href: 'https://scholar.google.com',
        description: 'Academic literature search engine',
      },
      {
        title: 'Science',
        href: 'https://www.science.org/journal/science',
        description: 'Top-tier scientific journal',
      },
      {
        title: 'Nature',
        href: 'https://www.nature.com',
        description: 'Authoritative multidisciplinary journal',
      },
      {
        title: 'arXiv',
        href: 'https://arxiv.org',
        description: 'Open-access preprint repository',
      },
      {
        title: 'Overleaf',
        href: 'https://www.overleaf.com',
        description: 'Online LaTeX editor',
      },
    ],
  },
  {
    title: 'Online Learning',
    icon: 'lucide:graduation-cap',
    resources: [
      {
        title: 'Coursera',
        href: 'https://www.coursera.org',
        description: 'Online courses from top universities',
      },
      {
        title: 'edX',
        href: 'https://www.edx.org',
        description: 'Open courses from Harvard and MIT',
      },
      {
        title: 'MIT OpenCourseWare',
        href: 'https://ocw.mit.edu',
        description: 'Free MIT course resources',
      },
      {
        title: 'Class Central',
        href: 'https://www.classcentral.com',
        description: 'Global course search platform',
      },
    ],
  },
  {
    title: 'Algorithms & Competitions',
    icon: 'lucide:trophy',
    resources: [
      {
        title: 'Luogu',
        href: 'https://www.luogu.com.cn',
        description: 'Chinese programming competition platform',
      },
      {
        title: 'Codeforces',
        href: 'https://codeforces.com',
        description: 'Global programming competition platform',
      },
      {
        title: 'AtCoder',
        href: 'https://atcoder.jp',
        description: 'Japanese programming competition platform',
      },
      {
        title: 'Virtual Judge',
        href: 'https://vjudge.net',
        description: 'Multi-platform virtual judging system',
      },
      {
        title: 'Algorithm Duels Online',
        href: 'https://algorithm-duels.online',
        description: 'Team-based algorithm duel platform',
      },
      {
        title: 'Code Golf',
        href: 'https://code.golf',
        description: 'Shortest code challenge platform',
      },
      {
        title: 'OI Wiki',
        href: 'https://oi-wiki.org',
        description: 'Informatics competition knowledge base',
      },
      {
        title: 'OIerDb',
        href: 'https://oierdb.com',
        description: 'Informatics competition records database',
      },
      {
        title: 'YuanTiJi',
        href: 'http://yuantiji.ac/zh/',
        description: 'Programming problem source tracing tool',
      },
    ],
  },
  {
    title: 'Math & Computation',
    icon: 'lucide:calculator',
    resources: [
      {
        title: 'Desmos',
        href: 'https://www.desmos.com',
        description: 'Online graphing calculator',
      },
      {
        title: 'Wolfram Alpha',
        href: 'https://www.wolframalpha.com',
        description: 'Computational knowledge engine',
      },
      {
        title: 'GeoGebra',
        href: 'https://www.geogebra.org',
        description: 'Interactive mathematics software',
      },
      {
        title: 'NumPy',
        href: 'https://numpy.org',
        description: 'Python scientific computing package',
      },
      {
        title: 'LaTeX Equation Editor',
        href: 'https://www.latexlive.com',
        description: 'LaTeX equation editor',
      },
      {
        title: 'OEIS',
        href: 'https://oeis.org',
        description: 'On-Line Encyclopedia of Integer Sequences',
      },
    ],
  },
  {
    title: 'Frontend & Site Building',
    icon: 'lucide:layout-template',
    resources: [
      {
        title: 'React',
        href: 'https://react.dev',
        description: 'Modern front-end framework',
      },
      {
        title: 'Docusaurus',
        href: 'https://docusaurus.io',
        description: 'React documentation site generator',
      },
      {
        title: 'VitePress',
        href: 'https://vitepress.vuejs.org',
        description: 'Vue static site generator',
      },
      {
        title: 'VuePress',
        href: 'https://vuepress.vuejs.org',
        description: 'Vue documentation site generator',
      },
      {
        title: 'Material for MkDocs',
        href: 'https://squidfunk.github.io/mkdocs-material/',
        description: 'Python documentation site generator',
      },
      {
        title: 'Hexo',
        href: 'https://hexo.io',
        description: 'Fast blog framework',
      },
      {
        title: 'WordPress',
        href: 'https://wordpress.org',
        description: 'Open-source content management system',
      },
    ],
  },
  {
    title: 'Utilities',
    icon: 'lucide:bolt',
    resources: [
      {
        title: 'Google Translate',
        href: 'https://translate.google.com',
        description: "Google's online translation service",
      },
      {
        title: 'Tsinghua University Open Source Software Mirror',
        href: 'https://mirrors.tuna.tsinghua.edu.cn',
        description: 'Open-source software mirror and download',
      },
      {
        title: 'Speedtest',
        href: 'https://www.speedtest.net',
        description: 'Internet speed test tool',
      },
      {
        title: 'Poisonous Mushroom Test',
        href: 'https://cznull.github.io/vsbm',
        description: 'GPU rendering performance test',
      },
      {
        title: 'Can you speak properly?',
        href: 'https://lab.magiconch.com/nbnhhsh/',
        description: 'Pinyin acronym translation tool',
      },
      {
        title: 'Password Monster',
        href: 'https://passwordmonster.com/',
        description: 'Password strength checking tool',
      },
      {
        title: 'CPS Test',
        href: 'https://clickspeedtest.com/',
        description: 'Mouse click speed test',
      },
      {
        title: 'Political Compass Test',
        href: 'https://luckyfuy.top/compass/',
        description: 'Political leaning analysis test',
      },
      {
        title: 'dazidazi',
        href: 'https://dazidazi.com',
        description: 'Online typing practice platform',
      },
      {
        title: 'WildCard',
        href: 'https://yeka.ai',
        description: 'Virtual credit card service',
      },
      {
        title: 'Luban SMS',
        href: 'https://lubansms.com',
        description: 'Global SMS sending and receiving platform',
      },
      {
        title: 'Class Widgets',
        href: 'https://classwidgets.rinlit.cn',
        description: 'Desktop class schedule software',
      },
      {
        title: 'E-Classroom Terminator',
        href: 'https://dzjszjz.nkxingxh.top',
        description: 'Unlocking tool for e-classroom software',
      },
      {
        title: 'Note.ms',
        href: 'https://note.ms',
        description: 'Public clipboard service',
      },
      {
        title: 'QR Code Generator',
        href: 'https://www.qr-code-generator.com',
        description: 'Online QR code generation tool',
      },
    ],
  },
  {
    title: 'Knowledge & Reference',
    icon: 'lucide:library',
    resources: [
      {
        title: 'Wikipedia',
        href: 'https://zh.wikipedia.org',
        description: 'Multilingual free encyclopedia',
      },
      {
        title: 'cppreference',
        href: 'https://cppreference.com',
        description: 'C++ standard library reference documentation',
      },
      {
        title: 'Passport Index',
        href: 'https://www.passportindex.org',
        description: 'Global passport visa-free ranking',
      },
    ],
  },
  {
    title: 'Digital & Hardware',
    icon: 'lucide:smartphone',
    resources: [
      {
        title: 'Apple',
        href: 'https://www.apple.com',
        description: 'Apple Inc. official website',
      },
      {
        title: 'Apple Product Specs Center',
        href: 'https://hubweb.cn',
        description: 'Apple product parameter comparison',
      },
      {
        title: 'SOCPK',
        href: 'https://socpk.com',
        description: 'Mobile processor performance comparison',
      },
      {
        title: 'Lizhi Software',
        href: 'https://lizhi.shop',
        description: 'Genuine software store',
      },
    ],
  },
  {
    title: 'Design & Visualization',
    icon: 'lucide:palette',
    resources: [
      {
        title: 'Colorable',
        href: 'https://colorable.jxnblk.com',
        description: 'Color contrast checking tool',
      },
      {
        title: 'Skill Icons',
        href: 'https://skillicons.dev',
        description: 'Skill icon generation tool',
      },
      {
        title: 'BrandColors',
        href: 'https://brandcolors.net',
        description: 'Collection of brand color schemes',
      },
      {
        title: 'Maker World',
        href: 'https://makerworld.com.cn',
        description: 'Creative tool for design resources',
      },
      {
        title: 'amCharts Pixel Map',
        href: 'https://pixelmap.amcharts.com',
        description: 'Online pixel map editor',
      },
      {
        title: 'Recraft',
        href: 'https://www.recraft.ai',
        description: 'AI vector graphics generation tool',
      },
      {
        title: 'Mult',
        href: 'https://mult.dev',
        description: 'Map route animation and video generation tool',
      },
      {
        title: 'CodeSnap',
        href: 'https://codesnap.dev',
        description: 'Code beautification and screenshot tool for developers',
      },
      {
        title: 'Bento Grids',
        href: 'https://bentogrids.com',
        description: 'Responsive grid layout generator',
      },
    ],
  },
  {
    title: 'Video & Media',
    icon: 'lucide:video',
    resources: [
      {
        title: 'YouTube',
        href: 'https://www.youtube.com',
        description: "The world's largest video platform",
      },
      {
        title: 'bilibili',
        href: 'https://www.bilibili.com',
        description: 'A cultural community for young people in China',
      },
    ],
  },
  {
    title: 'Social & Community',
    icon: 'lucide:users',
    resources: [
      {
        title: 'X (Twitter)',
        href: 'https://x.com',
        description: 'Real-time information social platform',
      },
      {
        title: 'Facebook',
        href: 'https://www.facebook.com',
        description: "The world's largest social platform",
      },
      {
        title: 'Telegram Web',
        href: 'https://web.telegram.org',
        description: 'Web version of Telegram',
      },
      {
        title: 'CrazyGames',
        href: 'https://www.crazygames.com',
        description: 'Online web games platform',
      },
      {
        title: '.io Games',
        href: 'https://iogames.space',
        description: 'Index website for IO games',
      },
      {
        title: 'generals.io',
        href: 'https://generals.io',
        description: 'Real-time multiplayer strategy game',
      },
      {
        title: 'TileMan.io',
        href: 'https://tileman.io',
        description: 'Territory conquest strategy game',
      },
      {
        title: 'YORG.io',
        href: 'https://yorg.io',
        description: 'Tower defense resource management game',
      },
      {
        title: 'Bloxd.io',
        href: 'https://bloxd.io',
        description: 'Online sandbox game platform',
      },
      {
        title: 'Name Arena',
        href: 'https://namerena.github.io',
        description: 'Text-based battle game',
      },
      {
        title: 'GeoGuessr',
        href: 'https://tuxun.fun',
        description: 'Geography location guessing game',
      },
      {
        title: 'Guess Salt',
        href: 'https://xiaoce.fun',
        description: 'Fun quiz platform',
      },
      {
        title: 'WPlace',
        href: 'https://wplace.live',
        description: 'A giant real-time pixel canvas',
      },
      {
        title: 'sandspiel',
        href: 'https://sandspiel.club',
        description: 'Web-based sandbox simulator',
      },
      {
        title: 'HullQin Game',
        href: 'https://game.hullqin.cn',
        description: 'Online board game collection',
      },
      {
        title: 'Neal.fun',
        href: 'https://neal.fun',
        description: 'A collection of games by Neal',
      },
      {
        title: 'Wall Mama',
        href: 'https://www.wallmama.com',
        description: 'Guide to bypassing internet censorship',
      },
      {
        title: 'ExpressVPN',
        href: 'https://www.expressvpn.com',
        description: 'Professional VPN service',
      },
      {
        title: 'NordVPN',
        href: 'https://nordvpn.com',
        description: 'Professional VPN service',
      },
      {
        title: 'AstrillVPN',
        href: 'https://www.astrill.com',
        description: 'Professional VPN service',
      },
      {
        title: 'Taishan Net',
        href: 'https://taishan.pro',
        description: 'Multi-protocol internet access service',
      },
    ],
  },
];
