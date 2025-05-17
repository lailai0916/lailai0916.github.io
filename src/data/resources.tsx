export interface Resource {
  name: string
  logo: string
  desc: string
  href: string
  tags?: string[]
}

export interface ResourceCategory {
  name: string
  resources: Resource[]
}

export const resourceData: ResourceCategory[] = [
  {
    name: '个人网站',
    resources: [
      {
        name: "lailai's home",
        desc: 'lailai 的个人网站，分享技术笔记、项目经验和学习心得。✨',
        logo: '/img/site/Home.png',
        href: 'https://www.lailai.one',
      },
      {
        name: '开发者路线图',
        desc: '为开发者提供学习指引和教育内容。',
        logo: 'https://roadmap.sh/manifest/favicon.ico',
        href: 'https://roadmap.sh/',
      },
      {
        name: 'Google Cloud 技能提升',
        desc: '选择您的学习路径，提升技能并验证您的知识。',
        logo: 'https://www.cloudskillsboost.google/favicon.ico',
        href: 'https://www.cloudskillsboost.google/',
      },
      {
        name: 'AWS 技能构建者',
        desc: '您的学习中心，帮助您构建云端热门技能。',
        logo: 'https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_179x109.png',
        href: 'https://explore.skillbuilder.aws/learn',
      },
      {
        name: 'Azure 云技能',
        desc: '提升您的云技能，加速职业发展和业务成果。',
        logo: 'https://azure.microsoft.com/favicon.ico',
        href: 'https://azure.microsoft.com/en-us/resources/training-and-certifications/',
      },
      {
        name: '红帽培训',
        desc: '加速您的云采用，并通过 Oracle 指导学习管理持续变革。',
        logo: 'https://www.redhat.com/favicon.ico',
        href: 'https://www.redhat.com/en/services/training-and-certification',
      },
      {
        name: 'Linux 基金会培训',
        desc: '为企业构建、维护和管理 IT 基础设施。',
        logo: 'https://www.linuxfoundation.org/favicon.ico',
        href: 'https://training.linuxfoundation.org/',
      },
      {
        name: 'Docker',
        desc: '构建镜像、运行容器，使用卷持久化数据并挂载源代码。',
        logo: 'https://www.docker.com/favicon.ico',
        href: 'https://www.docker.com/101-tutorial/',
      },
      {
        name: 'Kubernetes 培训',
        desc: '加速您的云采用，并通过 Oracle 指导学习管理持续变革。',
        logo: 'https://kubernetes.io/images/kubernetes.png  ',
        href: 'https://kubernetes.io/training/',
      },
      {
        name: '云原生计算基金会',
        desc: 'CNCF 是一个促进云原生计算的中立组织，推动其广泛采用。',
        logo: 'https://www.cncf.io/wp-content/themes/cncf-twenty-two/images/favicon.svg',
        href: 'https://www.cncf.io/',
      },
      {
        name: 'Nginx 培训',
        desc: '从基础到高级负载均衡、高级缓存、安全等全方位课程。',
        logo: 'https://nginx.org/favicon.ico',
        href: 'https://www.nginx.com/learn/nginx-training/',
      },
    ],
  },
  {
    name: '基础设施即代码（IaaC）',
    resources: [
        {
          name: 'Terraform',
          desc: '用于在任何云或数据中心自动化配置和管理资源的基础设施工具。',
          logo: 'https://www.terraform.io/favicon.ico',
          href: 'https://www.terraform.io/',
          tags: ['IaaC'],
        },
        {
          name: 'Vault',
          desc: '管理密钥与保护敏感数据的工具。',
          logo: 'https://www.datocms-assets.com/2885/1676497447-vault-favicon-color.png?h=192&w=192',
          href: 'https://www.vaultproject.io/',
          tags: ['IaaC'],
        },
        {
          name: 'Packer',
          desc: '跨云厂商标准化镜像工作流的工具。',
          logo: 'https://www.datocms-assets.com/58478/1638283616-packer.svg?auto=format&fit=max&w=1200',
          href: 'https://www.hashicorp.com/products/packer',
          tags: ['IaaC'],
        },
        {
          name: 'Jenkins',
          desc: '自动化软件开发中构建、测试和部署等流程，支持 CI/CD。',
          logo: 'https://www.jenkins.io/apple-touch-icon.png',
          href: 'https://www.jenkins.io/',
          tags: ['IaaC'],
        },
        {
          name: 'Infracost',
          desc: '在 Pull Request 中为 Terraform 提供云成本预估。',
          logo: 'https://www.infracost.io/wp-content/uploads/2023/10/Icon.jpeg',
          href: 'https://www.infracost.io/',
          tags: ['IaaC'],
        },
        {
          name: 'Aqua Tfsec',
          desc: '为 Terraform 代码提供安全扫描。',
          logo: 'https://aquasecurity.github.io/trivy/v0.54/imgs/logo.png',
          href: 'https://github.com/aquasecurity/tfsec',
          tags: ['IaaC'],
        },
        {
          name: 'Webhook.site',
          desc: '轻松检查、测试和自动化任何传入的 HTTP 请求或邮件。',
          logo: 'https://cdn.webhook.site/assets/icons/apple-touch-icon.png',
          href: 'https://webhook.site/',
          tags: ['IaaC'],
        },
        {
          name: 'Checkov',
          desc: '代码即策略（Policy as Code）工具。',
          logo: 'https://www.checkov.io/assets/img/favicon.png',
          href: 'https://www.checkov.io/',
          tags: ['IaaC'],
        },
        {
          name: 'Open Policy Agent',
          desc: '为云原生环境提供基于策略的控制。',
          logo: 'https://www.openpolicyagent.org/img/logo.png',
          href: 'https://www.openpolicyagent.org/',
          tags: ['IaaC'],
        },
        {
          name: 'Pulumi',
          desc: '用熟悉的编程语言直观地构建任意云上的基础设施。',
          logo: 'https://www.pulumi.com/images/favicon.ico',
          href: 'https://www.pulumi.com/',
          tags: ['IaaC'],
        },
        {
          name: 'Ansible',
          desc: '用熟悉的编程语言直观地构建任意云上的基础设施。',
          logo: 'https://docs.ansible.com/static/images/community_logo.svg',
          href: 'https://www.ansible.com/',
          tags: ['IaaC'],
        },
      ],
    },
    {
      name: 'Kubernetes 工具',
      resources: [
        {
          name: 'K8slens',
          desc: 'Kubernetes 的集成开发环境，全面管理集群的唯一系统。',
          logo: 'https://k8slens.dev/favicon.ico',
          href: 'https://k8slens.dev/',
          tags: ['Kubernetes Tools'],
        },
        {
          name: 'Helm',
          desc: 'Kubernetes 的包管理器。',
          logo: 'https://helm.sh/img/helm.svg',
          href: 'https://bitnami.com/stacks/helm',
          tags: ['Kubernetes Tools'],
        },
        {
          name: 'Bitnami',
          desc: '提供预配置的应用栈，便于开源应用的快速部署和管理。',
          logo: 'https://bitnami.com/apple-touch-icon-144x144.png',
          href: 'https://bitnami.com/',
          tags: ['Kubernetes Tools'],
        },
        {
          name: 'ArtifactHub',
          desc: '查找、安装和发布 Kubernetes 包的中心。',
          logo: 'https://artifacthub.io/static/media/logo192_v2.png',
          href: 'https://artifacthub.io/',
          tags: ['Kubernetes Tools'],
        },
        {
          name: 'K9scli',
          desc: '酷炫的 Kubernetes 命令行集群管理工具。',
          logo: 'https://k9scli.io/assets/k9s.png',
          href: 'https://k9scli.io/',
          tags: ['Kubernetes Tools'],
        },
        {
          name: 'Kubecolor',
          desc: '为 kubectl 输出添加彩色高亮！',
          logo: 'https://kubecolor.github.io/favicon.svg',
          href: 'https://kubecolor.github.io/',
          tags: ['Kubernetes Tools'],
        },
        
      ],
    },
    {
      name: 'Python 🐍',
      resources: [
        {
          name: 'Python 包索引（PyPI）',
          desc: '全球最大的 Python 软件包仓库，发现高质量的开源项目。',
          logo: 'https://pypi.org/static/images/logo-small.8998e9d1.svg',
          href: 'https://pypi.org/',
          tags: ['Python']
        },
        {
          name: 'Psutil',
          desc: 'Python 跨平台进程和系统监控库。',
          logo: 'https://raw.githubusercontent.com/giampaolo/psutil/master/docs/_static/psutil-logo.png',
          href: 'https://pypi.org/project/psutil/',
          tags: ['Python']
        },
        {
          name: 'Scapy',
          desc: '交互式数据包操作程序和库。',
          logo: 'https://scapy.net/favicon.ico',
          href: 'https://pypi.org/project/scapy/',
          tags: ['Python']
        },
        {
          name: 'Requests',
          desc: '简洁优雅的 HTTP 库。',
          logo: 'https://requests.readthedocs.io/en/latest/_static/requests-sidebar.png',
          href: 'https://pypi.org/project/requests/',
          tags: ['Python']
        },
        {
          name: 'Urllib3',
          desc: '功能强大、用户友好的 Python HTTP 客户端。',
          logo: 'https://urllib3.readthedocs.io/en/stable/_static/banner.svg',
          href: 'https://pypi.org/project/urllib3/',
          tags: ['Python']
        },
        {
          name: 'Fabric',
          desc: '高级 SSH 命令执行工具。',
          logo: 'https://docs.fabfile.org/en/latest/_static/logo.png',
          href: 'https://docs.fabfile.org/en/latest/  ',
          tags: ['Python']
        },
        {
          name: 'PyTest',
          desc: '简单而强大的 Python 测试框架。',
          logo: 'https://docs.pytest.org/en/stable/_static/pytest1.png',
          href: 'https://docs.pytest.org/en/stable/',
          tags: ['Python']
        },
      ],
    },
    {
      name: '脚本与配置',
      resources: [
        {
          name: 'Bash',
          desc: 'GNU 项目的 Shell——Bourne Again Shell。',
          logo: 'https://bashlogo.com/img/symbol/svg/full_colored_dark.svg',
          href: 'https://www.gnu.org/software/bash/',
          tags: ['Scripting'],
        },
        {
          name: 'Powershell',
          desc: '微软推出的 Windows 任务自动化与配置管理框架。',
          logo: 'https://learn.microsoft.com/en-us/media/logos/logo-powershell.png',
          href: 'https://www.gnu.org/software/bash/',
          tags: ['Scripting'],
        },
        {
          name: 'Go',
          desc: '由 Google 支持的开源编程语言。',
          logo: 'https://go.dev/images/favicon-gopher.png',
          href: 'https://go.dev/',
          tags: ['Scripting'],
        },
        {
          name: 'Lua',
          desc: '高效、轻量、可嵌入的强大脚本语言。',
          logo: 'https://www.lua.org/images/luaa.gif',
          href: 'https://www.gnu.org/software/bash/',
          tags: ['Scripting'],
        },
        {
          name: 'YAML',
          desc: '适用于所有编程语言的人性化数据序列化语言。',
          logo: 'https://yaml.org/favicon.svg',
          href: 'https://yaml.org/',
          tags: ['Config'],
        },
        {
          name: 'JSON',
          desc: '轻量级的数据交换格式（JavaScript 对象表示法）。',
          logo: 'https://www.json.org/favicon.png',
          href: 'https://www.json.org/ ',
          tags: ['Config'],
        },
        {
          name: 'Rust',
          desc: '让每个人都能构建可靠高效软件的编程语言。',
          logo: 'https://www.rust-lang.org/static/images/favicon.svg',
          href: 'https://www.rust-lang.org/',
          tags: ['Config'],
        },
      ],
    },
    {
      name: '教育资源',
      resources: [
        {
          name: 'Open Up The Cloud',
          desc: '开启云计算之路，发展您的云端职业。',
          logo: 'https://openupthecloud.com/wp-content/uploads/2021/04/Screenshot-2021-04-03-at-07.48.45.ico',
          href: 'https://openupthecloud.com/',
          tags: ['Educational Resources'],
        },
        {
          name: 'Learn to the Cloud',
          desc: '开启云计算之路，发展您的云端职业。',
          logo: 'https://learntocloud.guide/img/favicon.ico',
          href: 'https://learntocloud.guide/',
          tags: ['Educational Resources'],
        },
        {
          name: '云简历挑战',
          desc: '通过实践提升您的云计算职业生涯的有效方式。',
          logo: 'https://cloudresumechallenge.dev/images/logo.svg',
          href: 'https://cloudresumechallenge.dev/',
          tags: ['Educational Resources'],
        },
        {
          name: 'ACloudGuru',
          desc: 'Pluralsight 旗下公司，专注云学习。',
          logo: 'https://www.pluralsight.com/favicon.ico',
          href: 'https://acloudguru.com/',
          tags: ['Educational Resources'],
        },
      ],
    },
    {
      name: '代码托管',
      resources: [
        {
          name: 'GitHub',
          desc: '全球最大的开源项目托管平台，发现高质量开源项目。',
          logo: 'https://github.githubassets.com/favicons/favicon.svg',
          href: 'https://github.com/',
          tags: ['GitHub', 'Code Hosting'],
        },
        {
          name: 'Gitlab',
          desc: '更快交付安全代码，支持多云部署，助力业务发展。',
          logo: 'https://gitlab.com/uploads/-/system/group/avatar/6543/logo-extra-whitespace.png?width=64',
          href: 'https://gitlab.com/',
          tags: ['Code Hosting'],
        },
        {
          name: 'Bitbucket',
          desc: 'Atlassian DevOps 方案中原生的 Git 工具。',
          logo: 'https://bitbucket.org/favicon.ico',
          href: 'https://bitbucket.org/',
          tags: ['Code Hosting'],
        },
      ],
    },
  {
  name: '网站托管',
    resources: [
      {
        name: 'Vercel',
        desc: 'Vercel 为开发者提供极致开发体验并注重终端用户性能。',
        logo: 'https://assets.vercel.com/image/upload/q_auto/front/favicon/vercel/57x57.png',
        href: 'https://vercel.com',
        tags: ['Website Hosting'],
      },
      {
        name: 'Netlify',
        desc: 'Netlify 是用于托管静态网站的云平台，支持从 Github、GitLab、Bitbucket 等自动拉取代码并打包部署。',
        logo: 'https://www.netlify.com/favicon.ico',
        href: 'https://www.netlify.com',
        tags: ['Website Hosting'],
      },
      {
        name: 'GitHub Codespace',
        desc: '全球最大的开源项目托管平台，发现高质量开源项目。',
        logo: 'https://github.githubassets.com/favicons/favicon.svg',
        href: 'https://github.com/codespaces',
        tags: ['Website Hosting'],
      },
      {
        name: 'Railway',
        desc: '带上你的代码，其余交给我们。',
        logo: 'https://railway.app/favicon.ico',
        href: 'https://railway.app/',
        tags: ['Website Hosting'],
      },
      {
        name: 'Supabase',
        desc: 'Supabase 是一款开源 BaaS 平台，帮助开发者无需编写后端代码即可快速构建应用。',
        logo: 'https://supabase.com/favicon/favicon-196x196.png',
        href: 'https://supabase.com/',
        tags: ['BaaS'],
      },
      {
        name: 'Gitpod',
        desc: '云开发环境是最快且更安全的代码交付方式。',
        logo: 'https://www.gitpod.io/favicon192.png',
        href: 'https://www.gitpod.io/',
        tags: ['Website Hosting'],
      },
    ],
  },
  {
    name: '在线编程',
    resources: [
      {
        name: 'CodesandBox',
        desc: 'CodeSandbox 是一个在线代码编辑和原型工具，助你更快创建和分享 Web 应用。',
        logo: 'https://codesandbox.io/favicon.ico',
        href: 'https://codesandbox.io/',
        tags: ['Live Coding'],
      },
      {
        name: 'CodePen',
        desc: '构建、测试和发现前端代码的最佳场所。',
        logo: 'https://cpwebassets.codepen.io/assets/favicon/favicon-aec34940fbc1a6e787974dcd360f2c6b63348d4b1f4e06c77743096d55480f33.ico',
        href: 'https://codepen.io/',
        tags: ['Live Coding'],
      },
      {
        name: 'Stackblitz',
        desc: 'Stackblitz 全程保持即时开发体验，无需本地存储/拉取/安装，只需点击即可开始编码。',
        logo: 'https://stackblitz.com/_astro/favicon.svg',
        href: 'https://stackblitz.com/',
        tags: ['Live Coding'],
      },
      {
        name: 'vscode.dev',
        desc: 'VSCode 官方提供的在线 Web 版本。',
        logo: 'https://vscode.dev/static/stable/favicon.ico',
        href: 'https://vscode.dev/',
        tags: ['Live Coding'],
      },
      {
        name: 'Sandpack',
        desc: '用于创建实时运行的代码编辑体验。',
        logo: 'https://sandpack.codesandbox.io/favicon.ico',
        href: 'https://sandpack.codesandbox.io/',
        tags: ['Live Coding'],
      },
      {
      name: 'onlineGBD',
        desc: '在线编写、编译、运行、调试和分享代码。',
        logo: 'https://www.onlinegdb.com/favicon.ico',
        href: 'https://www.onlinegdb.com/online_python_compiler',
        tags: ['Live Coding'],
      },
    ],
  },
  {
    name: '网站生成',
    resources: [
      {
      name: 'VitePress',
      desc: '基于 Vue 和 Vite 构建的静态网站生成器',
      logo: 'https://vitepress.dev/vitepress-logo-mini.svg',
      href: 'https://vitepress.vuejs.org',
      tags: ['frontend', 'Vue', 'static site'],
      },
      {
      name: 'VuePress',
      desc: '基于 Vue 的静态网站生成器',
      logo: 'https://vuepress.vuejs.org/images/hero.png',
      href: 'https://vuepress.vuejs.org',
      tags: ['frontend', 'Vue', 'static site'],
      },
      {
      name: 'Docusaurus',
      desc: '快速构建内容为核心的优质网站',
      logo: 'https://docusaurus.io/img/docusaurus.svg',
      href: 'https://docusaurus.io',
      tags: ['frontend', 'React', 'static site'],
      },
      {
      name: 'Hexo',
      desc: '快速、简单、高效的博客框架',
      logo: 'https://hexo.io/favicon.ico',
      href: 'https://hexo.io',
      tags: ['frontend', 'static site'],
      },
      {
      name: 'GitBook',
      desc: 'GitBook 帮助你发布美观的文档，并集中团队知识以实现高级协作',
      logo: 'https://framerusercontent.com/images/93a6peqhbHQaWP67zttmrKDazq4.png',
      href: 'https://www.gitbook.com/',
      tags: ['frontend', 'static site'],
      },
      {
      name: 'Docsify',
      desc: 'docsify 可快速帮助你生成文档网站',
      logo: 'https://docsify.js.org/_media/icon.svg',
      href: 'https://docsify.js.org',
      tags: ['frontend', 'static site'],
      },
      {
        name: 'WordPress',
        desc: 'WordPress 是开源软件，助你创建出色的网站、博客或应用',
        logo: 'https://s1.wp.com/i/favicon.ico?v=1713425267',
        href: 'https://cn.wordpress.org/',
        tags: ['frontend', 'site'],
        },
      {
        name: 'Nextra',
        desc: '简单、强大且灵活的网站生成框架',
        logo: 'https://nextra.site/favicon.svg',
        href: 'https://nextra.site/docs',
        tags: ['frontend', 'site'],
        },
    ],
  },
  {
  name: 'Github',
  resources: [
      {
        name: 'Gitstar 排行榜',
        desc: '非官方 GitHub 用户、组织与仓库 Star 数排行榜',
        logo: 'https://gitstar-ranking.com/favicon.ico',
        href: 'https://gitstar-ranking.com/',
        tags: [],
      },
      {
        name: 'Commiters Top',
        desc: '不同国家/地区最活跃 GitHub 用户榜单。',
        logo: 'https://committers.top/images/favicon.ico',
        href: 'https://committers.top/',
        tags: [],
      },
      {
        name: 'Metrics',
        desc: '30+ 插件、300+ 选项的 GitHub 账号信息图生成器，支持 SVG、Markdown、PDF、JSON 等格式！',
        logo: 'https://github.githubassets.com/images/icons/emoji/unicode/1f4ca.png',
        href: 'https://github.com/lowlighter/metrics',
        tags: [],
      },
      {
        name: 'Github Stats',
        desc: '为你的个人资料生成更优美的 GitHub 统计图像，支持私有仓库统计。',
        logo: 'https://raw.githubusercontent.com/jstrieb/github-stats/master/generated/overview.svg',
        href: 'https://github.com/jstrieb/github-stats',
        tags: [],
      },
      {
        name: 'GitHub Profile README Generator',
        desc: '轻松生成 GitHub 个人资料 README，支持访问量、统计图等最新插件，界面简洁。',
        logo: 'https://rahuldkjain.github.io/gh-profile-readme-generator/static/mdg-040f54e2f6c858e0a3dcf568c3f2b6f1.png',
        href: 'https://rahuldkjain.github.io/gh-profile-readme-generator/',
        tags: [],
      },
    ],
  },
    {
      name: '工具',
    resources: [
      {
        name: 'Bitwarden',
        desc: '密码管理器。',
        logo: 'https://bitwarden.com/icons/icon-256x256.png?v=1abf57d1154002a9fac426a2c5c04d85',
        href: 'https://bitwarden.com/',
        tags: ['Tools'],
      },
      {
        name: 'Raindrop',
        desc: '一体化书签管理工具。',
        logo: 'https://raindrop.io/favicon.ico',
        href: 'https://raindrop.io/',
        tags: ['Tools'],
      },
      {
        name: 'NordVPN',
        desc: '领先的 VPN 服务，保障您的网络安全。',
        logo: 'https://s1.nordcdn.com/nordvpn/media/1.2234.0/images/global/favicon/apple-touch-icon-180x180.png',
        href: 'https://nordvpn.com/',
        tags: ['Tools'],
      },
      {
        name: 'Workona',
        desc: '浏览器中的高效工作组织工具。',
        logo: 'https://workona.com/_next/static/media/workona-logo-updated-mark.c7961e2e.png',
        href: 'https://workona.com/',
        tags: ['Tools'],
      },
      {
        name: 'ClickUp',
        desc: '团队与任务管理工具。',
        logo: 'https://clickup.com/favicons/apple-touch-icon.png',
        href: 'https://clickup.com',
        tags: ['Tools'],
      },
      {
        name: 'IFTTT',
        desc: '连接你的应用，实现自动化。',
        logo: 'https://ifttt.com/favicon.ico',
        href: 'https://ifttt.com/',
        tags: ['Tools'],
      },
      {
        name: 'Buffer',
        desc: '助你在社交媒体及更多领域扩大影响力。',
        logo: 'https://buffer.com/static/icons/favicon.svg',
        href: 'https://buffer.com/',
        tags: ['Tools'],
      },
      {
        name: 'Zapier',
        desc: '助你在社交媒体及更多领域扩大影响力。',
        logo: 'https://cdn.zapier.com/zapier/images/favicon.ico',
        href: 'https://zapier.com/',
        tags: ['Tools'],
      },
    ],
  },
  {
    name: '在线学习',
    resources: [
      {
        name: 'ClassCentral',
        desc: '发现全球最优质的课程。',
        logo: 'https://www.classcentral.com/safari-pinned-tab.svg',
        href: 'https://www.classcentral.com/',
        tags: ['E-Learning'],
      },
      {
        name: 'Coursera',
        desc: '无限学习，无限可能。',
        logo: 'https://d3njjcbhbojbot.cloudfront.net/web/images/favicons/apple-touch-icon-v2-180x180.png',
        href: 'https://discord.gg/2PTwAth',
        tags: ['E-Learning'],
      },
      {
        name: 'Edx',
        desc: '学习由你定义，edX 助你成就自我。',
        logo: 'https://www.edx.org/images/logos/edx-logo-elm.svg',
        href: 'https://www.edx.org/',
        tags: ['E-Learning'],
      },
      {
        name: 'MIT',
        desc: 'MIT OpenCourseWare 提供几乎所有 MIT 课程内容的网络公开版。',
        logo: 'https://ocw.mit.edu/static_shared/images/ocw_logo_orange.png',
        href: 'https://ocw.mit.edu/',
        tags: ['E-Learning'],
      },
      {
        name: 'O\'Reilly Learning',
        desc: '为个人、团队和企业提供专家创作的学习资源。',
        logo: 'https://www.oreilly.com/favicon.ico',
        href: 'https://www.oreilly.com/online-learning/',
        tags: ['E-Learning'],
      },
      {
        name: 'Anki',
        desc: '强大智能的记忆卡片工具。',
        logo: 'https://apps.ankiweb.net/favicon.ico',
        href: 'https://apps.ankiweb.net/',
        tags: ['Tools, E-Learning'],
      },
    ],
  },
  {
    name: '学术论文',
    resources: [
      {
        name: 'Science',
        desc: '全球性的同行评审研究与科学突破期刊。',
        logo: 'https://www.science.org/favicon.ico',
        href: 'https://www.science.org/journal/science',
        tags: ['Academic Papers'],
      },
      {
        name: 'Nature',
        desc: '自 1869 年起推动突破性发现的顶级多学科科学期刊。',
        logo: 'https://www.nature.com/static/images/favicons/nature/apple-touch-icon-f39cb19454.png',
        href: 'https://www.nature.com/',
        tags: ['Academic Papers'],
      },
      {
        name: 'Google Scholar',
        desc: '站在巨人的肩膀上。',
        logo: 'https://scholar.google.com/favicon.ico',
        href: 'https://scholar.google.com/',
        tags: ['Academic Papers'],
      },
      {
        name: 'Arvix',
        desc: '涵盖各类科学与数量学科的综合性开放获取学术论文库。',
        logo: 'https://arxiv.org/static/browse/0.3.4/images/icons/apple-touch-icon.png',
        href: 'https://arxiv.org/',
        tags: ['Academic Papers'],
      },
    ],
  },
  {
    name: '人工智能',
    resources: [
      {
        name: 'ChatGPT',
        desc: '生成式预训练变换模型（GPT）。',
        logo: 'https://cdn.oaistatic.com/_next/static/media/apple-touch-icon.82af6fe1.png',
        href: 'https://chatgpt.com/',
        tags: ['AI'],
      },
      {
        name: 'Copilot',
        desc: '微软运营的 AI 搜索引擎。',
        logo: 'https://copilot.microsoft.com/sa/simg/favicon-cplt.ico',
        href: 'https://copilot.microsoft.com/',
        tags: ['AI'],
      },
    ],
  },
  {
    name: 'MLOps',
    resources: [
      {
        name: 'Hugging Face',
        desc: '构建未来的 AI 社区。',
        logo: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg',
        href: 'https://huggingface.co/',
        tags: ['MLOps'],
      },
      {
        name: 'DeepMind',
        desc: 'AI 领域的有趣挑战。',
        logo: 'https://deepmind.google/static/icons/google_deepmind_48dp.5b470587fe7d.svg',
        href: 'https://www.deepmind.com/',
        tags: ['MLOps'],
      },
      {
        name: 'Deep Learning AI',
        desc: '开启你的 AI 职业生涯。',
        logo: 'https://www.deeplearning.ai/static/favicons/favicon.ico',
        href: 'https://www.deeplearning.ai/',
        tags: ['MLOps'],
      },
      {
        name: 'Meta AI',
        desc: '开启你的 AI 职业生涯。',
        logo: 'https://static.xx.fbcdn.net/rsrc.php/v3/y4/r/WUJbsVI4ruF.png',
        href: 'https://ai.facebook.com/',
        tags: ['MLOps'],
      },
      {
        name: 'Google AI',
        desc: '让 AI 惠及每个人。',
        logo: 'https://ai.google/static/images/share.png',
        href: 'https://ai.google/',
        tags: ['MLOps'],
      },
      {
        name: 'Microsoft AI',
        desc: '拥抱未来生产力与无限创新。',
        logo: 'https://www.microsoft.com/favicon.ico?v2',
        href: 'https://www.microsoft.com/en-us/ai',
        tags: ['MLOps'],
      },
      {
        name: 'Keras',
        desc: '简单、灵活、强大的深度学习框架。',
        logo: 'https://keras.io/img/logo.png ',
        href: 'https://keras.io/',
        tags: ['MLOps'],
      },
      {
        name: 'Numpy',
        desc: 'Python 科学计算的基础包。',
        logo: 'https://numpy.org/images/logo.svg',
        href: 'https://numpy.org/',
        tags: ['MLOps'],
      },
      {
        name: 'PyTorch',
        desc: 'Python 科学计算的基础包。',
        logo: 'https://pytorch.org/assets/images/logo-icon.svg',
        href: 'https://pytorch.org/',
        tags: ['MLOps'],
      },
      {
        name: 'PyCharm',
        desc: '专业开发者的 Python IDE。',
        logo: 'https://resources.jetbrains.com/storage/products/company/brand/logos/PyCharm_icon.svg ',
        href: 'https://numpy.org/',
        tags: ['MLOps'],
      },
      {
        name: 'Jupiter',
        desc: '跨所有编程语言的交互式计算免费软件、开放标准和 Web 服务。',
        logo: 'https://jupyter.org/favicon.ico',
        href: 'https://jupyter.org/',
        tags: ['MLOps'],
      },
    ],
  },
  // 综合搜索
  ,
  {
    name: '综合搜索',
    resources: [
      {
        name: 'Google',
        desc: '全球领先的搜索引擎，提供强大的信息检索和多种在线服务。',
        logo: '/img/site/Google.png',
        href: 'https://www.google.com',
      },
      {
        name: '百度',
        desc: '中国最大的搜索引擎，提供搜索、地图、百科等多种互联网服务。',
        logo: '/img/site/Baidu.png',
        href: 'https://www.baidu.com',
      },
      {
        name: 'Microsoft Bing',
        desc: '微软推出的搜索引擎，支持快速获取信息、图片搜索、翻译等多种功能。',
        logo: '',
        href: 'https://www.bing.com',
      },
    ],
  },
  // 百科与参考
  {
    name: '百科与参考',
    resources: [
      {
        name: '维基百科',
        desc: '一个自由的网络百科全书，由全球用户协作编辑，提供多语言知识内容。',
        logo: '/img/site/Wikipedia.png',
        href: 'https://zh.wikipedia.org/wiki/Wikipedia:首页',
      },
      {
        name: 'OEIS',
        desc: '一个专注于数学整数数列的在线数据库。',
        logo: '',
        href: 'https://oeis.org/?language=chineseT',
      },
      {
        name: 'cppreference.com',
        desc: '一个面向 C 和 C++ 程序员的在线参考手册。',
        logo: '',
        href: 'https://zh.cppreference.com/w/首页',
      },
      {
        name: 'Passport Index 2024',
        desc: '一个全球护照排名和信息平台。',
        logo: '',
        href: 'https://www.passportindex.org',
      },
    ],
  },
  // AI 工具
  {
    name: 'AI 工具',
    resources: [
      {
        name: 'ChatGPT',
        desc: 'OpenAI 提供的聊天 AI 服务网站，用户可以通过它与 ChatGPT 进行智能交互。',
        logo: '/img/site/ChatGPT.png',
        href: 'https://chatgpt.com',
      },
      {
        name: 'Sora',
        desc: 'OpenAI 推出的视频生成模型，用户可通过输入文本、图像或视频，生成新的视频内容。',
        logo: '/img/site/Sora.png',
        href: 'https://sora.com',
      },
    ],
  },
  // 数学工具
  {
    name: '数学工具',
    resources: [
      {
        name: 'Desmos',
        desc: '一个提供免费在线数学工具的网站，帮助用户探索和学习数学。',
        logo: '/img/site/Desmos.png',
        href: 'https://www.desmos.com',
      },
      {
        name: 'GeoGebra',
        desc: '一款免费开源的动态数学软件，广泛应用于各级教育领域。',
        logo: '/img/site/GeoGebra.png',
        href: 'https://www.geogebra.org',
      },
      {
        name: '在线LaTeX公式编辑器',
        desc: '一款免费在线 LaTeX 公式编辑器。',
        logo: '/img/site/latexlive.png',
        href: 'https://www.latexlive.com',
      },
      {
        name: 'WolframAlpha',
        desc: '一个强大的计算知识引擎，可以回答复杂的数学、科学、工程、经济等领域的问题。',
        logo: '',
        href: 'https://www.wolframalpha.com',
      },
    ],
  },
  // 编程竞赛平台
  ,
  {
    name: '编程竞赛平台',
    resources: [
      {
        name: 'OI Wiki',
        desc: '一个免费开放且持续更新的编程竞赛知识整合站点。',
        logo: '/img/site/OI-Wiki.png',
        href: 'https://oi-wiki.org',
      },
      {
        name: 'OIerDb',
        desc: '一个信息学竞赛选手获奖记录并对学校进行排名的数据库。',
        logo: '/img/site/OIerDb.png',
        href: 'https://www.信息学.com',
      },
      {
        name: '洛谷',
        desc: '一个面向编程竞赛爱好者的在线平台。',
        logo: '',
        href: 'https://www.luogu.com.cn',
      },
      {
        name: 'Codeforces',
        desc: '一个俄罗斯的在线编程竞赛平台。',
        logo: '/img/site/Codeforces.png',
        href: 'https://codeforces.com',
      },
      {
        name: 'AtCoder',
        desc: '一个日本的在线编程竞赛平台。',
        logo: '/img/site/AtCoder.png',
        href: 'https://atcoder.jp',
      },
      {
        name: 'Virtual Judge',
        desc: '一个支持多平台在线判题的工具。',
        logo: '/img/site/Vjudge.png',
        href: 'https://vjudge.net',
      },
      {
        name: 'Code Golf',
        desc: '一个在线编程挑战平台，鼓励开发者以最少的字符数编写代码来解决特定问题。',
        logo: '/img/site/CodeGolf.png',
        href: 'https://code.golf',
      },
    ],
  },
  // 开发辅助工具
  {
    name: '开发辅助工具',
    resources: [
      {
        name: 'GitHub',
        desc: '代码托管平台，支持版本控制与协作开发。',
        logo: '',
        href: 'https://github.com',
      },
      {
        name: 'Compiler Explorer',
        desc: '一个在线代码编译器和分析工具，支持多种编程语言，实时显示编译后的汇编代码。',
        logo: '',
        href: 'https://godbolt.org',
      },
      {
        name: '清华大学开源软件镜像站',
        desc: '提供多种开源软件和 Linux 发行版镜像，支持快速下载与同步更新。',
        logo: '',
        href: 'https://mirrors.tuna.tsinghua.edu.cn',
      },
      {
        name: '电子教室终结者',
        desc: '一款用于解除电子教室和学生机房管理助手控制的工具。',
        logo: '',
        href: 'https://dzjszjz.nkxingxh.top',
      },
    ],
  },
  // 数码与设备资源
  {
    name: '数码与设备资源',
    resources: [
      {
        name: 'Apple',
        desc: '苹果公司的官方网站，提供产品信息、技术支持和在线商店服务。',
        logo: '/img/site/Apple.png',
        href: 'https://www.apple.com',
      },
      {
        name: 'Apple 苹果产品参数中心',
        desc: '一个专注于收集和展示苹果公司各类产品详细参数的网站。',
        logo: '',
        href: 'https://hubweb.cn',
      },
      {
        name: 'SOCPK',
        desc: '极客湾移动芯片排行。',
        logo: '',
        href: 'https://socpk.com',
      },
      {
        name: '数码荔枝',
        desc: '一家专注于分享最新优秀正版软件的商店。',
        logo: '',
        href: 'https://lizhi.shop',
      },
    ],
  },
  // 视频网站
  {
    name: '视频网站',
    resources: [
      {
        name: 'YouTube',
        desc: '全球最大的视频分享平台，用户可以上传、观看、分享和评论各类视频内容。',
        logo: '/img/site/YouTube.png',
        href: 'https://www.youtube.com',
      },
      {
        name: 'bilibili',
        desc: '国内知名的弹幕视频分享网站，用户可在此观看动画、游戏、音乐等多元化内容。',
        logo: '',
        href: 'https://www.bilibili.com',
      },
    ],
  },
  // 实用在线工具
  {
    name: '实用在线工具',
    resources: [
      {
        name: '能不能好好说话？',
        desc: '一个拼音首字母缩写翻译工具，帮助用户理解这些缩写的含义。',
        logo: '',
        href: 'https://lab.magiconch.com/nbnhhsh/',
      },
      {
        name: 'Colorable',
        desc: '一个在线的文本与背景颜色对比度测试工具。',
        logo: '',
        href: 'https://colorable.jxnblk.com',
      },
      {
        name: '原题机',
        desc: '一款帮助用户查找编程题目原始出处的工具。',
        logo: '/img/site/yuantiji.png',
        href: 'http://yuantiji.ac/zh/',
      },
      {
        name: 'Diff Tool',
        desc: '一个在线代码差异工具。',
        logo: '/img/site/DiffTool.png',
        href: 'https://csacademy.com/app/diffing_tool/',
      },
      {
        name: 'Graph Editor',
        desc: '一个在线图论绘制工具。',
        logo: '/img/site/GraphEditor.png',
        href: 'https://csacademy.com/app/graph_editor/',
      },
    ],
  },
  // 测评与测试
  {
    name: '测评与测试',
    resources: [
      {
        name: 'CPS测试',
        desc: '一个在线的鼠标点击速度测量工具。',
        logo: '',
        href: 'https://www.arealme.com/click-speed-test/cn/',
      },
      {
        name: 'Password Strength Meter',
        desc: '一个在线密码强度测试工具，帮助用户评估密码的安全性。',
        logo: '',
        href: 'https://www.passwordmonster.com',
      },
      {
        name: '政治倾向测试',
        desc: '基于 8Values 的在线政治倾向测试。',
        logo: '',
        href: 'https://luckyfuy.top/compass/',
      },
      {
        name: '毒蘑菇测试',
        desc: '知名的 GPU 渲染性能测试。',
        logo: '',
        href: 'https://cznull.github.io/vsbm',
      },
    ],
  },
  // 设计资源
  {
    name: '设计资源',
    resources: [
      {
        name: 'Apple 设计资源',
        desc: '提供 Apple 产品边框设计素材。',
        logo: '',
        href: 'https://developer.apple.com/cn/design/resources/#product-bezels',
      },
      {
        name: 'Skill Icons',
        desc: '一个生成技能图标的工具，支持个性化定制。',
        logo: '',
        href: 'https://skillicons.dev',
      },
      {
        name: 'BrandColors',
        desc: '一个收录品牌官方配色的在线工具。',
        logo: '',
        href: 'https://brandcolors.net',
      },
    ],
  },
  // 社交平台
  {
    name: '社交平台',
    resources: [
      {
        name: 'X',
        desc: 'Twitter 平台的新域名，支持全球实时社交、信息分享与多媒体互动。',
        logo: '',
        href: 'https://x.com',
      },
      {
        name: 'Facebook',
        desc: '全球领先的社交网络平台，用户可以连接朋友、分享动态并参与群组互动。',
        logo: '',
        href: 'https://www.facebook.com',
      },
      {
        name: 'Telegram Web',
        desc: 'Telegram 的网页版客户端，支持即时通讯、文件共享和群组聊天功能。',
        logo: '',
        href: 'https://web.telegram.org/k/',
      },
    ],
  },
  // 在线小游戏
  {
    name: '在线小游戏',
    resources: [
      {
        name: 'generals.io',
        desc: '一款多人策略游戏，玩家通过占领领土和击败对手争夺胜利。',
        logo: '',
        href: 'https://generals.io',
      },
      {
        name: 'TileMan.io',
        desc: '一款多人策略游戏，玩家通过占领网格上的区域扩展领地，同时与其他玩家竞争地盘。',
        logo: '',
        href: 'https://tileman.io',
      },
      {
        name: 'YORG.io',
        desc: '一款塔防与资源管理相结合的策略游戏。',
        logo: '',
        href: 'https://yorg.io',
      },
      {
        name: 'Bloxd.io',
        desc: '一款在线沙盒游戏集合平台，提供多种小游戏模式。',
        logo: '',
        href: 'https://bloxd.io',
      },
    ],
  },
  // 翻墙与网络
  {
    name: '翻墙与网络',
    resources: [
      {
        name: '墙妈妈',
        desc: '翻墙与科学上网指南，提供关于 VPN 等技术的评测和教程。',
        logo: '',
        href: 'https://www.wallmama.com',
      },
    ],
  }
]
