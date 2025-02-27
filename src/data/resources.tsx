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
        name: 'Developer Roadmap',
        desc: 'Guides and other educational content to help guide developers.',
        logo: 'https://roadmap.sh/manifest/favicon.ico',
        href: 'https://roadmap.sh/',
      },
      {
        name: 'Google Cloud Skill Boost',
        desc: 'Choose your learning path, build your skills, and validate your knowledge.',
        logo: 'https://www.cloudskillsboost.google/favicon.ico',
        href: 'https://www.cloudskillsboost.google/',
      },
      {
        name: 'AWS Skill Builder',
        desc: 'Your learning center to build in-demand cloud skills.',
        logo: 'https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_179x109.png',
        href: 'https://explore.skillbuilder.aws/learn',
      },
      {
        name: 'Azure Cloud Skills',
        desc: 'Sharpen your cloud skills to accelerate your career and business results',
        logo: 'https://azure.microsoft.com/favicon.ico',
        href: 'https://azure.microsoft.com/en-us/resources/training-and-certifications/',
      },
      {
        name: 'Red Hat Training',
        desc: 'Accelerate your cloud adoption and manage continuous change with Oracle Guided Learning',
        logo: 'https://www.redhat.com/favicon.ico',
        href: 'https://www.redhat.com/en/services/training-and-certification',
      },
      {
        name: 'Linux Foundation Training',
        desc: 'Building, maintaining, and managing IT infrastructures of companies',
        logo: 'https://www.linuxfoundation.org/favicon.ico',
        href: 'https://training.linuxfoundation.org/',
      },
      {
        name: 'Docker',
        desc: 'Build images, run containers, use volumes to persist data and mount in source code',
        logo: 'https://www.docker.com/favicon.ico',
        href: 'https://www.docker.com/101-tutorial/',
      },
      {
        name: 'Kubernetes Training',
        desc: 'Accelerate your cloud adoption and manage continuous change with Oracle Guided Learning',
        logo: 'https://kubernetes.io/images/kubernetes.png  ',
        href: 'https://kubernetes.io/training/',
      },
      {
        name: 'Cloud Native Computing Foundation',
        desc: 'CNCF is a vendor-neutral organization fostering cloud native computing, promoting its widespread adoption.',
        logo: 'https://www.cncf.io/wp-content/themes/cncf-twenty-two/images/favicon.svg',
        href: 'https://www.cncf.io/',
      },
      {
        name: 'Nginx Training',
        desc: 'Fundamentals to advanced load balancing, advanced caching, security, and more.',
        logo: 'https://nginx.org/favicon.ico',
        href: 'https://www.nginx.com/learn/nginx-training/',
      },
    ],
  },
  {
    name: 'Infrastructure as a Code (IaaC)',
    resources: [
        {
          name: 'Terraform',
          desc: 'Infrastructure automation to provision and manage resources in any cloud or data center.',
          logo: 'https://www.terraform.io/favicon.ico',
          href: 'https://www.terraform.io/',
          tags: ['IaaC'],
        },
        {
          name: 'Vault',
          desc: 'Manage Secrets & Protect Sensitive Data',
          logo: 'https://www.datocms-assets.com/2885/1676497447-vault-favicon-color.png?h=192&w=192',
          href: 'https://www.vaultproject.io/',
          tags: ['IaaC'],
        },
        {
          name: 'Packer',
          desc: 'Standardize image workflows across cloud providers',
          logo: 'https://www.datocms-assets.com/58478/1638283616-packer.svg?auto=format&fit=max&w=1200',
          href: 'https://www.hashicorp.com/products/packer',
          tags: ['IaaC'],
        },
        {
          name: 'Jenkins',
          desc: 'Automate the parts of software development related to building, testing, and deploying, CI/CD ',
          logo: 'https://www.jenkins.io/apple-touch-icon.png',
          href: 'https://www.jenkins.io/',
          tags: ['IaaC'],
        },
        {
          name: 'Infracost',
          desc: 'Cloud cost estimates for Terraform in pull requests',
          logo: 'https://www.infracost.io/wp-content/uploads/2023/10/Icon.jpeg',
          href: 'https://www.infracost.io/',
          tags: ['IaaC'],
        },
        {
          name: 'Aqua Tfsec',
          desc: 'Security scanner for your Terraform code',
          logo: 'https://aquasecurity.github.io/trivy/v0.54/imgs/logo.png',
          href: 'https://github.com/aquasecurity/tfsec',
          tags: ['IaaC'],
        },
        {
          name: 'Webhook.site',
          desc: 'Lets you easily inspect, test and automate any incoming HTTP request or e-mail.',
          logo: 'https://cdn.webhook.site/assets/icons/apple-touch-icon.png',
          href: 'https://webhook.site/',
          tags: ['IaaC'],
        },
        {
          name: 'Checkov',
          desc: 'Policy as a code .',
          logo: 'https://www.checkov.io/assets/img/favicon.png',
          href: 'https://www.checkov.io/',
          tags: ['IaaC'],
        },
        {
          name: 'Open Policy Agent',
          desc: 'Policy-based control for cloud native environments',
          logo: 'https://www.openpolicyagent.org/img/logo.png',
          href: 'https://www.openpolicyagent.org/',
          tags: ['IaaC'],
        },
        {
          name: 'Pulumi',
          desc: 'Build infrastructure intuitively on any cloud using familiar languages.',
          logo: 'https://www.pulumi.com/images/favicon.ico',
          href: 'https://www.pulumi.com/',
          tags: ['IaaC'],
        },
        {
          name: 'Ansible',
          desc: 'Build infrastructure intuitively on any cloud using familiar languages.',
          logo: 'https://docs.ansible.com/static/images/community_logo.svg',
          href: 'https://www.ansible.com/',
          tags: ['IaaC'],
        },
      ],
    },
    {
      name: 'Kubernetes Tools',
      resources: [
        {
          name: 'K8slens',
          desc: 'IDE for Kubernetes. The only system you\'ll ever need to take control of your Kubernetes clusters.',
          logo: 'https://k8slens.dev/favicon.ico',
          href: 'https://k8slens.dev/',
          tags: ['Kubernetes Tools'],
        },
        {
          name: 'Helm',
          desc: 'The package manager for Kubernetes',
          logo: 'https://helm.sh/img/helm.svg',
          href: 'https://bitnami.com/stacks/helm',
          tags: ['Kubernetes Tools'],
        },
        {
          name: 'Bitnami',
          desc: 'Provides pre-configured stacks for easy deployment and management of open-source applications',
          logo: 'https://bitnami.com/apple-touch-icon-144x144.png',
          href: 'https://bitnami.com/',
          tags: ['Kubernetes Tools'],
        },
        {
          name: 'ArtifactHub',
          desc: 'Find, install and publish kubernetes packages',
          logo: 'https://artifacthub.io/static/media/logo192_v2.png',
          href: 'https://artifacthub.io/',
          tags: ['Kubernetes Tools'],
        },
        {
          name: 'K9scli',
          desc: 'Kubernetes CLI To Manage Your Clusters In Style!',
          logo: 'https://k9scli.io/assets/k9s.png',
          href: 'https://k9scli.io/',
          tags: ['Kubernetes Tools'],
        },
        {
          name: 'Kubecolor',
          desc: 'Colorizes kubectl output!',
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
          name: 'The Python Package Index (PyPI)',
          desc: 'The world\'s largest software project hosting platform, discover high-quality open-source projects.',
          logo: 'https://pypi.org/static/images/logo-small.8998e9d1.svg',
          href: 'https://pypi.org/',
          tags: ['Python']
        },
        {
          name: 'Psutil',
          desc: 'Cross-platform lib for process and system monitoring in Python.',
          logo: 'https://raw.githubusercontent.com/giampaolo/psutil/master/docs/_static/psutil-logo.png',
          href: 'https://pypi.org/project/psutil/',
          tags: ['Python']
        },
        {
          name: 'Scapy',
          desc: 'An Interactive packet manipulation program and library',
          logo: 'https://scapy.net/favicon.ico',
          href: 'https://pypi.org/project/scapy/',
          tags: ['Python']
        },
        {
          name: 'Requests',
          desc: 'A simple, yet elegant, HTTP library',
          logo: 'https://requests.readthedocs.io/en/latest/_static/requests-sidebar.png',
          href: 'https://pypi.org/project/requests/',
          tags: ['Python']
        },
        {
          name: 'Urllib3',
          desc: 'A powerful, user-friendly HTTP client for Python',
          logo: 'https://urllib3.readthedocs.io/en/stable/_static/banner.svg',
          href: 'https://pypi.org/project/urllib3/',
          tags: ['Python']
        },
        {
          name: 'Fabric',
          desc: 'High level SSH command execution',
          logo: 'https://docs.fabfile.org/en/latest/_static/logo.png',
          href: 'https://docs.fabfile.org/en/latest/  ',
          tags: ['Python']
        },
        {
          name: 'PyTest',
          desc: 'simple powerful testing with Python',
          logo: 'https://docs.pytest.org/en/stable/_static/pytest1.png',
          href: 'https://docs.pytest.org/en/stable/',
          tags: ['Python']
        },
      ],
    },
    {
      name: 'Scripting & Config ',
      resources: [
        {
          name: 'Bash',
          desc: 'Bash is the GNU Project\'s shell—the Bourne Again SHell.',
          logo: 'https://bashlogo.com/img/symbol/svg/full_colored_dark.svg',
          href: 'https://www.gnu.org/software/bash/',
          tags: ['Scripting'],
        },
        {
          name: 'Powershell',
          desc: 'Microsoft-built framework for Windows task automation and configuration management.',
          logo: 'https://learn.microsoft.com/en-us/media/logos/logo-powershell.png',
          href: 'https://www.gnu.org/software/bash/',
          tags: ['Scripting'],
        },
        {
          name: 'Go',
          desc: 'An open-source programming language supported by Google.',
          logo: 'https://go.dev/images/favicon-gopher.png',
          href: 'https://go.dev/',
          tags: ['Scripting'],
        },
        {
          name: 'Lua',
          desc: 'Is a powerful, efficient, lightweight, embeddable scripting language.',
          logo: 'https://www.lua.org/images/luaa.gif',
          href: 'https://www.gnu.org/software/bash/',
          tags: ['Scripting'],
        },
        {
          name: 'YAML',
          desc: 'A human-friendly data serialization language for all programming languages',
          logo: 'https://yaml.org/favicon.svg',
          href: 'https://yaml.org/',
          tags: ['Config'],
        },
        {
          name: 'JSON',
          desc: 'JavaScript Object Notation is a lightweight data-interchange format.',
          logo: 'https://www.json.org/favicon.png',
          href: 'https://www.json.org/ ',
          tags: ['Config'],
        },
        {
          name: 'Rust',
          desc: 'A language empowering everyone to build reliable and efficient software.',
          logo: 'https://www.rust-lang.org/static/images/favicon.svg',
          href: 'https://www.rust-lang.org/',
          tags: ['Config'],
        },
      ],
    },
    {
      name: 'Educational Resources',
      resources: [
        {
          name: 'Open Up The Cloud',
          desc: 'GET YOUR START, AND GROW YOUR CAREER IN CLOUD.',
          logo: 'https://openupthecloud.com/wp-content/uploads/2021/04/Screenshot-2021-04-03-at-07.48.45.ico',
          href: 'https://openupthecloud.com/',
          tags: ['Educational Resources'],
        },
        {
          name: 'Learn to the Cloud',
          desc: 'GET YOUR START, AND GROW YOUR CAREER IN CLOUD.',
          logo: 'https://learntocloud.guide/img/favicon.ico',
          href: 'https://learntocloud.guide/',
          tags: ['Educational Resources'],
        },
        {
          name: 'Cloud Resume Challenge',
          desc: 'A proven way to advance your cloud career.',
          logo: 'https://cloudresumechallenge.dev/images/logo.svg',
          href: 'https://cloudresumechallenge.dev/',
          tags: ['Educational Resources'],
        },
        {
          name: 'ACloudGuru',
          desc: 'A Plurasight company.',
          logo: 'https://www.pluralsight.com/favicon.ico',
          href: 'https://acloudguru.com/',
          tags: ['Educational Resources'],
        },
      ],
    },
    {
      name: 'Code Hosting',
      resources: [
        {
          name: 'GitHub',
          desc: 'The world\'s largest software project hosting platform, discover high-quality open-source projects.',
          logo: 'https://github.githubassets.com/favicons/favicon.svg',
          href: 'https://github.com/',
          tags: ['GitHub', 'Code Hosting'],
        },
        {
          name: 'Gitlab',
          desc: 'Deliver secure code more quickly, deploy to any cloud, and drive business results.',
          logo: 'https://gitlab.com/uploads/-/system/group/avatar/6543/logo-extra-whitespace.png?width=64',
          href: 'https://gitlab.com/',
          tags: ['Code Hosting'],
        },
        {
          name: 'Bitbucket',
          desc: 'Bitbucket Cloud is the native Git tool in Atlassian\'s Open DevOps solution.',
          logo: 'https://bitbucket.org/favicon.ico',
          href: 'https://bitbucket.org/',
          tags: ['Code Hosting'],
        },
      ],
    },
  {
  name: 'Website Hosting',
    resources: [
      {
        name: 'Vercel',
        desc: 'Vercel combines the best developer experience with a strong focus on end-user performance',
        logo: 'https://assets.vercel.com/image/upload/q_auto/front/favicon/vercel/57x57.png',
        href: 'https://vercel.com',
        tags: ['Website Hosting'],
      },
      {
        name: 'Netlify',
        desc: 'Netlify is a cloud platform for hosting static websites, supporting automatic code retrieval from Github, GitLab, Bitbucket, and other repositories for project packaging and deployment',
        logo: 'https://www.netlify.com/favicon.ico',
        href: 'https://www.netlify.com',
        tags: ['Website Hosting'],
      },
      {
        name: 'GitHub Codespace',
        desc: 'The world\'s largest software project hosting platform, discover high-quality open-source projects',
        logo: 'https://github.githubassets.com/favicons/favicon.svg',
        href: 'https://github.com/codespaces',
        tags: ['Website Hosting'],
      },
      {
        name: 'Railway',
        desc: 'Bring your code, leave the rest to us',
        logo: 'https://railway.app/favicon.ico',
        href: 'https://railway.app/',
        tags: ['Website Hosting'],
      },
      {
        name: 'Supabase',
        desc: 'Supabase is an open-source Backend-as-a-Service (BaaS) platform that helps developers quickly build applications without writing backend code.',
        logo: 'https://supabase.com/favicon/favicon-196x196.png',
        href: 'https://supabase.com/',
        tags: ['BaaS'],
      },
      {
        name: 'Gitpod',
        desc: 'Cloud development environments are the fastest,and more secure way, to ship code.',
        logo: 'https://www.gitpod.io/favicon192.png',
        href: 'https://www.gitpod.io/',
        tags: ['Website Hosting'],
      },
    ],
  },
  {
    name: 'Live Coding',
    resources: [
      {
        name: 'CodesandBox',
        desc: 'CodeSandbox is an online code editor and prototyping tool that allows you to create and share web applications faster',
        logo: 'https://codesandbox.io/favicon.ico',
        href: 'https://codesandbox.io/',
        tags: ['Live Coding'],
      },
      {
        name: 'CodePen',
        desc: 'The best place to build, test, and discover front-end code',
        logo: 'https://cpwebassets.codepen.io/assets/favicon/favicon-aec34940fbc1a6e787974dcd360f2c6b63348d4b1f4e06c77743096d55480f33.ico',
        href: 'https://codepen.io/',
        tags: ['Live Coding'],
      },
      {
        name: 'Stackblitz',
        desc: 'Stackblitz maintains an instant development experience throughout the process. No more local storage/pull/installation hours - just click and start coding',
        logo: 'https://stackblitz.com/_astro/favicon.svg',
        href: 'https://stackblitz.com/',
        tags: ['Live Coding'],
      },
      {
        name: 'vscode.dev',
        desc: 'Online Web version of VSCode provided by the official VSCode team',
        logo: 'https://vscode.dev/static/stable/favicon.ico',
        href: 'https://vscode.dev/',
        tags: ['Live Coding'],
      },
      {
        name: 'Sandpack',
        desc: 'For creating live running code editing experiences',
        logo: 'https://sandpack.codesandbox.io/favicon.ico',
        href: 'https://sandpack.codesandbox.io/',
        tags: ['Live Coding'],
      },
      {
      name: 'onlineGBD',
        desc: 'Code. compile. run. debug. share.',
        logo: 'https://www.onlinegdb.com/favicon.ico',
        href: 'https://www.onlinegdb.com/online_python_compiler',
        tags: ['Live Coding'],
      },
    ],
  },
  {
    name: 'Site Generation',
    resources: [
      {
      name: 'VitePress',
      desc: 'A static site generator driven by Vue and built with Vite',
      logo: 'https://vitepress.dev/vitepress-logo-mini.svg',
      href: 'https://vitepress.vuejs.org',
      tags: ['frontend', 'Vue', 'static site'],
      },
      {
      name: 'VuePress',
      desc: 'A static site generator driven by Vue',
      logo: 'https://vuepress.vuejs.org/images/hero.png',
      href: 'https://vuepress.vuejs.org',
      tags: ['frontend', 'Vue', 'static site'],
      },
      {
      name: 'Docusaurus',
      desc: 'Quickly build content-centric best websites',
      logo: 'https://docusaurus.io/img/docusaurus.svg',
      href: 'https://docusaurus.io',
      tags: ['frontend', 'React', 'static site'],
      },
      {
      name: 'Hexo',
      desc: 'A fast, simple, and efficient blogging framework',
      logo: 'https://hexo.io/favicon.ico',
      href: 'https://hexo.io',
      tags: ['frontend', 'static site'],
      },
      {
      name: 'GitBook',
      desc: 'GitBook helps you publish beautiful documentation for your users and centralize your team\'s knowledge for advanced collaboration',
      logo: 'https://framerusercontent.com/images/93a6peqhbHQaWP67zttmrKDazq4.png',
      href: 'https://www.gitbook.com/',
      tags: ['frontend', 'static site'],
      },
      {
      name: 'Docsify',
      desc: 'docsify can quickly help you generate documentation websites',
      logo: 'https://docsify.js.org/_media/icon.svg',
      href: 'https://docsify.js.org',
      tags: ['frontend', 'static site'],
      },
      {
        name: 'WordPress',
        desc: 'WordPress is open-source software that enables you to create excellent websites, blogs, or applications',
        logo: 'https://s1.wp.com/i/favicon.ico?v=1713425267',
        href: 'https://cn.wordpress.org/',
        tags: ['frontend', 'site'],
        },
      {
        name: 'Nextra',
        desc: 'Simple, powerful and flexible site generation framework',
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
        name: 'Gitstar Ranking',
        desc: 'Unofficial GitHub star rankings for users, organizations, and repositories',
        logo: 'https://gitstar-ranking.com/favicon.ico',
        href: 'https://gitstar-ranking.com/',
        tags: [],
      },
      {
        name: 'Commiters Top',
        desc: 'A list of most active GitHub users in different countries/regions.',
        logo: 'https://committers.top/images/favicon.ico',
        href: 'https://committers.top/',
        tags: [],
      },
      {
        name: 'Metrics',
        desc: 'An infographics generator with 30+ plugins and 300+ options to display stats about your GitHub account and render them as SVG, Markdown, PDF or JSON!',
        logo: 'https://github.githubassets.com/images/icons/emoji/unicode/1f4ca.png',
        href: 'https://github.com/lowlighter/metrics',
        tags: [],
      },
      {
        name: 'Github Stats',
        desc: 'Better GitHub statistics images for your profile, with stats from private repos too',
        logo: 'https://raw.githubusercontent.com/jstrieb/github-stats/master/generated/overview.svg',
        href: 'https://github.com/jstrieb/github-stats',
        tags: [],
      },
      {
        name: 'GitHub Profile README Generator',
        desc: 'Generate GitHub profile README easily with the latest add-ons like visitors count, GitHub stats, etc using minimal UI',
        logo: 'https://rahuldkjain.github.io/gh-profile-readme-generator/static/mdg-040f54e2f6c858e0a3dcf568c3f2b6f1.png',
        href: 'https://rahuldkjain.github.io/gh-profile-readme-generator/',
        tags: [],
      },
    ],
  },
  {
    name: 'Tools',
    resources: [
      {
        name: 'Bitwarden',
        desc: 'Password manager.',
        logo: 'https://bitwarden.com/icons/icon-256x256.png?v=1abf57d1154002a9fac426a2c5c04d85',
        href: 'https://bitwarden.com/',
        tags: ['Tools'],
      },
      {
        name: 'Raindrop',
        desc: 'All-in-one bookmark manager.',
        logo: 'https://raindrop.io/favicon.ico',
        href: 'https://raindrop.io/',
        tags: ['Tools'],
      },
      {
        name: 'NordVPN',
        desc: 'Stay safe online with the leading VPN service.',
        logo: 'https://s1.nordcdn.com/nordvpn/media/1.2234.0/images/global/favicon/apple-touch-icon-180x180.png',
        href: 'https://nordvpn.com/',
        tags: ['Tools'],
      },
      {
        name: 'Workona',
        desc: 'The essential work organizer for the browser.',
        logo: 'https://workona.com/_next/static/media/workona-logo-updated-mark.c7961e2e.png',
        href: 'https://workona.com/',
        tags: ['Tools'],
      },
      {
        name: 'ClickUp',
        desc: 'Manage Teams & Tasks ',
        logo: 'https://clickup.com/favicons/apple-touch-icon.png',
        href: 'https://clickup.com',
        tags: ['Tools'],
      },
      {
        name: 'IFTTT',
        desc: 'Connect Your Apps ',
        logo: 'https://ifttt.com/favicon.ico',
        href: 'https://ifttt.com/',
        tags: ['Tools'],
      },
      {
        name: 'Buffer',
        desc: 'Grow your audience on social and beyond',
        logo: 'https://buffer.com/static/icons/favicon.svg',
        href: 'https://buffer.com/',
        tags: ['Tools'],
      },
      {
        name: 'Zapier',
        desc: 'Grow your audience on social and beyond',
        logo: 'https://cdn.zapier.com/zapier/images/favicon.ico',
        href: 'https://zapier.com/',
        tags: ['Tools'],
      },
    ],
  },
  {
    name: 'E-Learning',
    resources: [
      {
        name: 'ClassCentral',
        desc: 'Find the best courses, wherever they exist.',
        logo: 'https://www.classcentral.com/safari-pinned-tab.svg',
        href: 'https://www.classcentral.com/',
        tags: ['E-Learning'],
      },
      {
        name: 'Coursera',
        desc: 'Learn without limits.',
        logo: 'https://d3njjcbhbojbot.cloudfront.net/web/images/favicons/apple-touch-icon-v2-180x180.png',
        href: 'https://discord.gg/2PTwAth',
        tags: ['E-Learning'],
      },
      {
        name: 'Edx',
        desc: 'Learning is what you make of it. Make it yours at edX.',
        logo: 'https://www.edx.org/images/logos/edx-logo-elm.svg',
        href: 'https://www.edx.org/',
        tags: ['E-Learning'],
      },
      {
        name: 'MIT',
        desc: 'MIT OpenCourseWare is a web based publication of virtually all MIT course content.',
        logo: 'https://ocw.mit.edu/static_shared/images/ocw_logo_orange.png',
        href: 'https://ocw.mit.edu/',
        tags: ['E-Learning'],
      },
      {
        name: 'O\'Reilly Learning',
        desc: 'Provides individuals, teams, and businesses with expert-created.',
        logo: 'https://www.oreilly.com/favicon.ico',
        href: 'https://www.oreilly.com/online-learning/',
        tags: ['E-Learning'],
      },
      {
        name: 'Anki',
        desc: 'Powerful, intelligent flash cards. ',
        logo: 'https://apps.ankiweb.net/favicon.ico',
        href: 'https://apps.ankiweb.net/',
        tags: ['Tools, E-Learning'],
      },
    ],
  },
  {
    name: 'Academic Papers',
    resources: [
      {
        name: 'Science',
        desc: 'A global journal for peer-reviewed research and scientific breakthroughs.',
        logo: 'https://www.science.org/favicon.ico',
        href: 'https://www.science.org/journal/science',
        tags: ['Academic Papers'],
      },
      {
        name: 'Nature',
        desc: 'A leading multidisciplinary science journal driving groundbreaking discovery since 1869.',
        logo: 'https://www.nature.com/static/images/favicons/nature/apple-touch-icon-f39cb19454.png',
        href: 'https://www.nature.com/',
        tags: ['Academic Papers'],
      },
      {
        name: 'Google Scholar',
        desc: 'Stand on the shoulders of giants.',
        logo: 'https://scholar.google.com/favicon.ico',
        href: 'https://scholar.google.com/',
        tags: ['Academic Papers'],
      },
      {
        name: 'Arvix',
        desc: 'Comprehensive open-access archive for scholarly articles in various scientific and quantitative disciplines.',
        logo: 'https://arxiv.org/static/browse/0.3.4/images/icons/apple-touch-icon.png',
        href: 'https://arxiv.org/',
        tags: ['Academic Papers'],
      },
    ],
  },
  {
    name: 'AI',
    resources: [
      {
        name: 'ChatGPT',
        desc: 'Generative pre-trained transformer.',
        logo: 'https://cdn.oaistatic.com/_next/static/media/apple-touch-icon.82af6fe1.png',
        href: 'https://chatgpt.com/',
        tags: ['AI'],
      },
      {
        name: 'Copilot',
        desc: 'AI-powered search engine owned and operated by Microsoft.',
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
        desc: 'The AI community building the future.',
        logo: 'https://huggingface.co/front/assets/huggingface_logo-noborder.svg',
        href: 'https://huggingface.co/',
        tags: ['MLOps'],
      },
      {
        name: 'DeepMind',
        desc: 'Interesting challenges in AI.',
        logo: 'https://deepmind.google/static/icons/google_deepmind_48dp.5b470587fe7d.svg',
        href: 'https://www.deepmind.com/',
        tags: ['MLOps'],
      },
      {
        name: 'Deep Learning AI',
        desc: 'Build your AI career.',
        logo: 'https://www.deeplearning.ai/static/favicons/favicon.ico',
        href: 'https://www.deeplearning.ai/',
        tags: ['MLOps'],
      },
      {
        name: 'Meta AI',
        desc: 'Build your AI career.',
        logo: 'https://static.xx.fbcdn.net/rsrc.php/v3/y4/r/WUJbsVI4ruF.png',
        href: 'https://ai.facebook.com/',
        tags: ['MLOps'],
      },
      {
        name: 'Google AI',
        desc: 'Advancing AI for everyone.',
        logo: 'https://ai.google/static/images/share.png',
        href: 'https://ai.google/',
        tags: ['MLOps'],
      },
      {
        name: 'Microsoft AI',
        desc: 'Embrace the future of productivity and limitless innovation.',
        logo: 'https://www.microsoft.com/favicon.ico?v2',
        href: 'https://www.microsoft.com/en-us/ai',
        tags: ['MLOps'],
      },
      {
        name: 'Keras',
        desc: 'Simple. Flexible. Powerful.',
        logo: 'https://keras.io/img/logo.png ',
        href: 'https://keras.io/',
        tags: ['MLOps'],
      },
      {
        name: 'Numpy',
        desc: 'The fundamental package for scientific computing with Python.',
        logo: 'https://numpy.org/images/logo.svg',
        href: 'https://numpy.org/',
        tags: ['MLOps'],
      },
      {
        name: 'PyTorch',
        desc: 'The fundamental package for scientific computing with Python.',
        logo: 'https://pytorch.org/assets/images/logo-icon.svg',
        href: 'https://pytorch.org/',
        tags: ['MLOps'],
      },
      {
        name: 'PyCharm',
        desc: 'The Python IDE for Professional Developers.',
        logo: 'https://resources.jetbrains.com/storage/products/company/brand/logos/PyCharm_icon.svg ',
        href: 'https://numpy.org/',
        tags: ['MLOps'],
      },
      {
        name: 'Jupiter',
        desc: 'Free software, open standards, and web services for interactive computing across all programming languages.',
        logo: 'https://jupyter.org/favicon.ico',
        href: 'https://jupyter.org/',
        tags: ['MLOps'],
      },
    ],
  },
]
