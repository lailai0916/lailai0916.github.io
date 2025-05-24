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
        name: 'Google Cloud 技能提升',
        desc: '选择您的学习路径，提升技能并验证您的知识',
        logo: 'https://www.cloudskillsboost.google/favicon.ico',
        href: 'https://www.cloudskillsboost.google/',
      },
      {
        name: 'AWS 技能构建者',
        desc: '您的学习中心，帮助您构建云端热门技能',
        logo: 'https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_179x109.png',
        href: 'https://explore.skillbuilder.aws/learn',
      },
      {
        name: 'Azure 云技能',
        desc: '提升您的云技能，加速职业发展和业务成果',
        logo: 'https://azure.microsoft.com/favicon.ico',
        href: 'https://azure.microsoft.com/en-us/resources/training-and-certifications/',
      },
      {
        name: '红帽培训',
        desc: '企业级 Linux 和开源技术培训认证',
        logo: 'https://www.redhat.com/favicon.ico',
        href: 'https://www.redhat.com/en/services/training-and-certification',
      },
      {
        name: 'Linux 基金会培训',
        desc: '为企业构建、维护和管理 IT 基础设施',
        logo: 'https://www.linuxfoundation.org/favicon.ico',
        href: 'https://training.linuxfoundation.org/',
      },
    ],
  },
  {
    name: '🐳 容器与编排',
    resources: [
      {
        name: 'Docker',
        desc: '构建镜像、运行容器，使用卷持久化数据并挂载源代码',
        logo: 'https://www.docker.com/favicon.ico',
        href: 'https://www.docker.com/101-tutorial/',
      },
      {
        name: 'Kubernetes 培训',
        desc: '容器编排技术学习和最佳实践',
        logo: 'https://kubernetes.io/images/kubernetes.png',
        href: 'https://kubernetes.io/training/',
      },
      {
        name: '云原生计算基金会',
        desc: 'CNCF 是一个促进云原生计算的中立组织，推动其广泛采用',
        logo: 'https://www.cncf.io/wp-content/themes/cncf-twenty-two/images/favicon.svg',
        href: 'https://www.cncf.io/',
      },
      {
        name: 'Nginx 培训',
        desc: '从基础到高级负载均衡、高级缓存、安全等全方位课程',
        logo: 'https://nginx.org/favicon.ico',
        href: 'https://www.nginx.com/learn/nginx-training/',
      },
    ],
  },
  {
    name: '🏗️ 基础设施即代码',
    resources: [
      {
        name: 'Terraform',
        desc: '用于在任何云或数据中心自动化配置和管理资源的基础设施工具',
        logo: 'https://developer.hashicorp.com/favicon.ico',
        href: 'https://www.terraform.io/',
      },
      {
        name: 'Vault',
        desc: 'HashiCorp 开发的密钥管理与敏感数据保护工具',
        logo: 'https://www.datocms-assets.com/2885/1676497447-vault-favicon-color.png?h=192&w=192',
        href: 'https://www.vaultproject.io/',
      },
      {
        name: 'Packer',
        desc: '跨云厂商标准化镜像构建工具，支持多平台镜像打包',
        logo: 'https://www.hashicorp.com/favicon.ico',
        href: 'https://www.hashicorp.com/products/packer',
      },
      {
        name: 'Pulumi',
        desc: '使用熟悉的编程语言构建云基础设施的现代化工具',
        logo: 'https://www.pulumi.com/images/favicon.ico',
        href: 'https://www.pulumi.com/',
      },
      {
        name: 'Ansible',
        desc: '简单强大的自动化运维工具，支持配置管理和应用部署',
        logo: 'https://docs.ansible.com/static/images/community_logo.svg',
        href: 'https://www.ansible.com/',
      },
      {
        name: 'Infracost',
        desc: '在 Pull Request 中为 Terraform 提供云成本预估和优化建议',
        logo: 'https://www.infracost.io/wp-content/uploads/2023/10/Icon.jpeg',
        href: 'https://www.infracost.io/',
      },
    ],
  },
  {
    name: '🔒 安全与策略',
    resources: [
      {
        name: 'Aqua Trivy',
        desc: '容器镜像和基础设施代码的全面安全扫描工具',
        logo: 'https://aquasecurity.github.io/trivy/v0.54/imgs/logo.png',
        href: 'https://github.com/aquasecurity/tfsec',
      },
      {
        name: 'Checkov',
        desc: '静态代码分析工具，实现基础设施即策略（Policy as Code）',
        logo: 'https://www.checkov.io/assets/img/favicon.png',
        href: 'https://www.checkov.io/',
      },
      {
        name: 'Open Policy Agent',
        desc: '云原生环境下统一的策略引擎和框架',
        logo: 'https://www.openpolicyagent.org/img/logo.png',
        href: 'https://www.openpolicyagent.org/',
      },
      {
        name: 'Webhook.site',
        desc: '在线测试和调试 HTTP 请求与邮件的便捷工具',
        logo: 'https://cdn.webhook.site/assets/icons/apple-touch-icon.png',
        href: 'https://webhook.site/',
      },
    ],
  },
  {
    name: '⚙️ CI/CD 与自动化',
    resources: [
      {
        name: 'Jenkins',
        desc: '开源自动化服务器，支持构建、测试和部署的完整 CI/CD 流程',
        logo: 'https://www.jenkins.io/apple-touch-icon.png',
        href: 'https://www.jenkins.io/',
      },
    ],
  },
  {
    name: '☸️ Kubernetes 生态',
    resources: [
      {
        name: 'K8slens',
        desc: 'Kubernetes 的可视化 IDE，提供集群管理的完整解决方案',
        logo: 'https://k8slens.dev/favicon.ico',
        href: 'https://k8slens.dev/',
      },
      {
        name: 'Helm',
        desc: 'Kubernetes 应用包管理器，简化应用部署和版本管理',
        logo: 'https://helm.sh/img/helm.svg',
        href: 'https://helm.sh/',
      },
      {
        name: 'Bitnami',
        desc: '提供预配置的云原生应用栈，加速容器化应用部署',
        logo: 'https://bitnami.com/apple-touch-icon-144x144.png',
        href: 'https://bitnami.com/',
      },
      {
        name: 'Artifact Hub',
        desc: 'CNCF 官方包仓库，查找和发布 Kubernetes 应用包',
        logo: 'https://artifacthub.io/static/media/logo192_v2.png',
        href: 'https://artifacthub.io/',
      },
      {
        name: 'K9s',
        desc: '强大的 Kubernetes 命令行管理工具，提供直观的终端界面',
        logo: 'https://k9scli.io/assets/k9s.png',
        href: 'https://k9scli.io/',
      },
      {
        name: 'Kubecolor',
        desc: '为 kubectl 命令输出添加语法高亮和颜色支持',
        logo: 'https://kubecolor.github.io/favicon.svg',
        href: 'https://kubecolor.github.io/',
      },
    ],
  },
  {
    name: '🐍 Python 生态',
    resources: [
      {
        name: 'PyPI - Python 包索引',
        desc: '全球最大的 Python 软件包仓库，发现和安装优质开源项目',
        logo: 'https://pypi.org/static/images/logo-small.8998e9d1.svg',
        href: 'https://pypi.org/',
      },
      {
        name: 'Psutil',
        desc: '跨平台系统和进程监控库，获取系统信息和资源使用情况',
        logo: 'https://raw.githubusercontent.com/giampaolo/psutil/master/docs/_static/psutil-logo.png',
        href: 'https://pypi.org/project/psutil/',
      },
      {
        name: 'Scapy',
        desc: '强大的交互式数据包操作程序和网络库',
        logo: 'https://scapy.net/favicon.ico',
        href: 'https://pypi.org/project/scapy/',
      },
      {
        name: 'Requests',
        desc: '简洁优雅的 HTTP 库，人性化的 HTTP 请求处理',
        logo: 'https://requests.readthedocs.io/en/latest/_static/requests-sidebar.png',
        href: 'https://pypi.org/project/requests/',
      },
      {
        name: 'Urllib3',
        desc: '功能强大、用户友好的 Python HTTP 客户端',
        logo: 'https://urllib3.readthedocs.io/en/stable/_static/banner.svg',
        href: 'https://pypi.org/project/urllib3/',
      },
      {
        name: 'Fabric',
        desc: '高级 SSH 命令执行和部署工具，简化远程操作',
        logo: 'https://docs.fabfile.org/en/latest/_static/logo.png',
        href: 'https://docs.fabfile.org/en/latest/',
      },
      {
        name: 'PyTest',
        desc: '简单而强大的 Python 测试框架，让测试变得轻松',
        logo: 'https://docs.pytest.org/en/stable/_static/pytest1.png',
        href: 'https://docs.pytest.org/en/stable/',
      },
    ],
  },
  {
    name: '💻 编程语言与脚本',
    resources: [
      {
        name: 'Bash',
        desc: 'GNU 项目的 Shell——Bourne Again Shell，Unix/Linux 默认 Shell',
        logo: 'https://bashlogo.com/img/symbol/svg/full_colored_dark.svg',
        href: 'https://www.gnu.org/software/bash/',
      },
      {
        name: 'PowerShell',
        desc: '微软开发的任务自动化与配置管理框架',
        logo: 'https://learn.microsoft.com/en-us/media/logos/logo-powershell.png',
        href: 'https://learn.microsoft.com/powershell/',
      },
      {
        name: 'Go',
        desc: 'Google 开发的高效、简洁、并发的编程语言',
        logo: 'https://go.dev/images/favicon-gopher.png',
        href: 'https://go.dev/',
      },
      {
        name: 'Lua',
        desc: '高效、轻量、可嵌入的强大脚本语言',
        logo: 'https://www.lua.org/images/luaa.gif',
        href: 'https://www.lua.org/',
      },
      {
        name: 'Rust',
        desc: '内存安全的系统编程语言，让每个人都能构建可靠高效软件',
        logo: 'https://www.rust-lang.org/static/images/favicon.svg',
        href: 'https://www.rust-lang.org/',
      },
    ],
  },
  {
    name: '📋 数据格式与配置',
    resources: [
      {
        name: 'YAML',
        desc: '适用于所有编程语言的人性化数据序列化语言',
        logo: 'https://yaml.org/favicon.svg',
        href: 'https://yaml.org/',
      },
      {
        name: 'JSON',
        desc: '轻量级的数据交换格式（JavaScript 对象表示法）',
        logo: 'https://www.json.org/favicon.png',
        href: 'https://www.json.org/',
      },
    ],
  },
  {
    name: '📚 在线学习与教育',
    resources: [
      {
        name: 'Open Up The Cloud',
        desc: '专注云计算职业发展的学习平台',
        logo: 'https://openupthecloud.com/wp-content/uploads/2021/04/Screenshot-2021-04-03-at-07.48.45.ico',
        href: 'https://openupthecloud.com/',
      },
      {
        name: 'Learn to the Cloud',
        desc: '云计算学习指南，助力云端职业发展',
        logo: 'https://learntocloud.guide/img/favicon.ico',
        href: 'https://learntocloud.guide/',
      },
      {
        name: '云简历挑战',
        desc: '通过实践项目提升云计算技能的挑战',
        logo: 'https://cloudresumechallenge.dev/images/logo.svg',
        href: 'https://cloudresumechallenge.dev/',
      },
      {
        name: 'A Cloud Guru',
        desc: 'Pluralsight 旗下专业云学习平台',
        logo: 'https://www.pluralsight.com/favicon.ico',
        href: 'https://acloudguru.com/',
      },
      {
        name: "O'Reilly Learning",
        desc: '为个人、团队和企业提供专家创作的技术学习资源',
        logo: 'https://www.oreilly.com/favicon.ico',
        href: 'https://www.oreilly.com/online-learning/',
      },
      {
        name: 'Anki',
        desc: '基于间隔重复算法的智能记忆卡片工具',
        logo: 'https://apps.ankiweb.net/favicon.ico',
        href: 'https://apps.ankiweb.net/',
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
        href: 'https://github.com/',
      },
      {
        name: 'GitLab',
        desc: '企业级 DevOps 平台，支持完整的软件开发生命周期',
        logo: 'https://gitlab.com/uploads/-/system/group/avatar/6543/logo-extra-whitespace.png?width=64',
        href: 'https://gitlab.com/',
      },
      {
        name: 'Bitbucket',
        desc: 'Atlassian 生态中的 Git 解决方案',
        logo: 'https://bitbucket.org/favicon.ico',
        href: 'https://bitbucket.org/',
      },
      {
        name: 'Vercel',
        desc: '前端云平台，提供极致的开发和部署体验',
        logo: 'https://assets.vercel.com/image/upload/q_auto/front/favicon/vercel/57x57.png',
        href: 'https://vercel.com',
      },
      {
        name: 'Netlify',
        desc: '现代 Web 开发平台，专注于 Jamstack 部署',
        logo: 'https://www.netlify.com/favicon.ico',
        href: 'https://www.netlify.com',
      },
      {
        name: 'Railway',
        desc: '简化的云部署平台，专注开发者体验',
        logo: 'https://railway.app/favicon.ico',
        href: 'https://railway.app/',
      },
      {
        name: 'Supabase',
        desc: '开源的 Firebase 替代方案，后端即服务平台',
        logo: 'https://supabase.com/favicon/favicon-196x196.png',
        href: 'https://supabase.com/',
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
    name: '☁️ 云端开发环境',
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
    ],
  },
  {
    name: '💻 在线开发工具',
    resources: [
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
    ],
  },
  {
    name: '📝 文档与内容管理',
    resources: [
      {
        name: 'GitBook',
        desc: '现代化的文档平台，支持团队协作',
        logo: 'https://www.gitbook.com/favicons/favicon-32x32.png',
        href: 'https://www.gitbook.com/',
      },
      {
        name: 'Docsify',
        desc: '无需构建的文档网站生成器',
        logo: 'https://docsify.js.org/_media/icon.svg',
        href: 'https://docsify.js.org',
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
    name: '🛠️ 效率与实用工具',
    resources: [
      {
        name: 'Bitwarden',
        desc: '开源的跨平台密码管理器',
        logo: 'https://bitwarden.com/icons/icon-256x256.png',
        href: 'https://bitwarden.com/',
      },
      {
        name: 'Raindrop',
        desc: '智能书签管理工具，支持多平台同步',
        logo: 'https://raindrop.io/favicon.ico',
        href: 'https://raindrop.io/',
      },
      {
        name: 'Workona',
        desc: '浏览器工作空间管理工具，提升工作效率',
        logo: 'https://workona.com/favicon.ico',
        href: 'https://workona.com/',
      },
      {
        name: 'ClickUp',
        desc: '一体化项目管理和团队协作平台',
        logo: 'https://clickup.com/favicon.ico',
        href: 'https://clickup.com',
      },
    ],
  },
  {
    name: '🔄 自动化与集成',
    resources: [
      {
        name: 'IFTTT',
        desc: '连接不同应用和服务的自动化平台',
        logo: 'https://ifttt.com/favicon.ico',
        href: 'https://ifttt.com/',
      },
      {
        name: 'Buffer',
        desc: '社交媒体管理和排程工具',
        logo: 'https://buffer.com/favicon.ico',
        href: 'https://buffer.com/',
      },
      {
        name: 'Zapier',
        desc: '无代码自动化平台，连接数千种应用',
        logo: 'https://zapier.com/favicon.ico',
        href: 'https://zapier.com/',
      },
    ],
  },
  {
    name: '🎯 在线测试与工具',
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
        logo: '/img/site/DiffTool.png',
        href: 'https://csacademy.com/app/diffing_tool/',
      },
      {
        name: 'Graph Editor',
        desc: '在线图论可视化和编辑工具',
        logo: '/img/site/GraphEditor.png',
        href: 'https://csacademy.com/app/graph_editor/',
      },
      {
        name: 'CPS 测试',
        desc: '在线鼠标点击速度测试工具',
        logo: 'https://clickspeedtest.com/favicon.ico',
        href: 'https://clickspeedtest.com/',
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
        logo: '/img/site/yuantiji.png',
        href: 'http://yuantiji.ac/zh/',
      },
      {
        name: '政治倾向测试',
        desc: '基于 8Values 的政治倾向分析',
        logo: '/img/site/compass.svg',
        href: 'https://luckyfuy.top/compass/',
      },
      {
        name: '毒蘑菇测试',
        desc: 'GPU 图形渲染性能基准测试',
        logo: '/img/site/vsbm.svg',
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
        name: 'Microsoft Copilot',
        desc: '微软的 AI 助手，集成到各种产品和服务中',
        logo: 'https://copilot.microsoft.com/favicon.ico',
        href: 'https://copilot.microsoft.com/',
      },
      {
        name: 'Sora',
        desc: 'OpenAI 开发的文本到视频生成模型',
        logo: '/img/site/Sora.png',
        href: 'https://sora.com',
      },
    ],
  },
  {
    name: '🔬 AI 研究与开发',
    resources: [
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
        logo: '/img/site/Wikipedia.png',
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
        logo: '/img/site/Desmos.png',
        href: 'https://www.desmos.com',
      },
      {
        name: 'GeoGebra',
        desc: '交互式数学软件，支持几何、代数、统计等',
        logo: '/img/site/GeoGebra.png',
        href: 'https://www.geogebra.org',
      },
      {
        name: '在线 LaTeX 公式编辑器',
        desc: '实时预览的 LaTeX 数学公式编辑工具',
        logo: '/img/site/latexlive.png',
        href: 'https://www.latexlive.com',
      },
      {
        name: 'Wolfram Alpha',
        desc: '计算型知识引擎，解答数学和科学问题',
        logo: '/img/site/wolfram.svg',
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
        logo: '/img/site/OI-Wiki.png',
        href: 'https://oi-wiki.org',
      },
      {
        name: 'OIerDb',
        desc: '信息学竞赛获奖记录数据库',
        logo: '/img/site/OIerDb.png',
        href: 'https://www.信息学.com',
      },
      {
        name: '洛谷',
        desc: '国内领先的编程学习和竞赛平台',
        logo: '/img/site/luogu.svg',
        href: 'https://www.luogu.com.cn',
      },
      {
        name: 'Codeforces',
        desc: '全球最受欢迎的编程竞赛平台',
        logo: '/img/site/Codeforces.png',
        href: 'https://codeforces.com',
      },
      {
        name: 'AtCoder',
        desc: '日本高质量编程竞赛平台',
        logo: '/img/site/AtCoder.png',
        href: 'https://atcoder.jp',
      },
      {
        name: 'Virtual Judge',
        desc: '聚合多个在线判题系统的虚拟平台',
        logo: '/img/site/Vjudge.png',
        href: 'https://vjudge.net',
      },
      {
        name: 'Code Golf',
        desc: '追求最短代码的编程挑战平台',
        logo: '/img/site/CodeGolf.png',
        href: 'https://code.golf',
      },
    ],
  },
  {
    name: '🛠️ 开发辅助工具',
    resources: [
      {
        name: 'GitHub',
        desc: '全球最大的代码托管和协作平台',
        logo: 'https://github.githubassets.com/favicons/favicon.svg',
        href: 'https://github.com',
      },
      {
        name: 'Compiler Explorer',
        desc: '在线编译器和汇编代码分析工具',
        logo: '/img/site/godbolt.png',
        href: 'https://godbolt.org',
      },
      {
        name: '清华大学开源软件镜像站',
        desc: '提供各种开源软件和包管理器的镜像服务',
        logo: '/img/site/tuna.png',
        href: 'https://mirrors.tuna.tsinghua.edu.cn',
      },
      {
        name: '电子教室终结者',
        desc: '解除电子教室软件控制的实用工具',
        logo: '/img/site/dzjszjz.png',
        href: 'https://dzjszjz.nkxingxh.top',
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
        logo: '/img/site/hubweb.png',
        href: 'https://hubweb.cn',
      },
      {
        name: 'SOCPK',
        desc: '移动处理器性能排行和对比平台',
        logo: '/img/site/socpk.png',
        href: 'https://socpk.com',
      },
      {
        name: '数码荔枝',
        desc: '正版软件商店，提供优质数字产品',
        logo: '/img/site/lizhi.png',
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
        logo: '/img/site/YouTube.png',
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
        logo: '/img/site/telegram.png',
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
        logo: '/img/site/generals.png',
        href: 'https://generals.io',
      },
      {
        name: 'TileMan.io',
        desc: '多人在线领土争夺策略游戏',
        logo: '/img/site/tileman.png',
        href: 'https://tileman.io',
      },
      {
        name: 'YORG.io',
        desc: '塔防与资源管理相结合的策略游戏',
        logo: '/img/site/yorg.png',
        href: 'https://yorg.io',
      },
      {
        name: 'Bloxd.io',
        desc: '在线沙盒游戏集合平台，类似 Minecraft',
        logo: '/img/site/bloxd.png',
        href: 'https://bloxd.io',
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
