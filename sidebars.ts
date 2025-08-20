import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  sidebar1: [
    'contest/index',
    {
      type: 'category',
      label: '个人',
      link: {
        type: 'doc',
        id: 'contest/personal/index',
      },
      items: [
        'contest/personal/code-style',
        'contest/personal/code-comparator',
        'contest/personal/common-templates/index',
        'contest/personal/solution-template',
        'contest/personal/problem-transfer',
      ],
    },
    {
      type: 'category',
      label: '比赛相关',
      link: {
        type: 'doc',
        id: 'contest/contest/index',
      },
      items: [
        'contest/contest/events',
        'contest/contest/problems',
        'contest/contest/outline',
        'contest/contest/io',
        'contest/contest/tricks',
      ],
    },
    {
      type: 'category',
      label: '语言基础',
      link: {
        type: 'generated-index',
        description:
          '本章将会介绍编程相关的知识，包括 C++ 从入门到进阶教程和一些其它语言的简介。',
      },
      items: [
        'contest/lang/helloworld',
        'contest/lang/op',
        'contest/lang/ascii/index',
        'contest/lang/csl',
      ],
    },
    {
      type: 'category',
      label: '算法基础',
      link: {
        type: 'generated-index',
        description: '本章介绍一些基础算法。',
      },
      items: [
        'contest/basic/complexity',
        'contest/basic/enumerate',
        'contest/basic/simulate',
        'contest/basic/divide-and-conquer',
        'contest/basic/greedy',
        'contest/basic/sort',
        'contest/basic/prefix-sum',
        'contest/basic/binary',
        'contest/basic/binary-lifting',
        'contest/basic/construction',
      ],
    },
    {
      type: 'category',
      label: '搜索',
      link: {
        type: 'generated-index',
        description:
          '搜索，也就是对状态空间进行枚举，通过穷尽所有的可能来找到最优解，或者统计合法解的个数。',
      },
      items: [
        'contest/search/dfs',
        'contest/search/bfs',
        'contest/search/bidirectional',
      ],
    },
    {
      type: 'category',
      label: '动态规划',
      link: {
        type: 'doc',
        id: 'contest/dp/index',
      },
      items: [
        'contest/dp/basic',
        'contest/dp/knapsack',
        'contest/dp/tree',
        'contest/dp/state',
        'contest/dp/number',
      ],
    },
    {
      type: 'category',
      label: '字符串',
      link: {
        type: 'generated-index',
        description: '字符串，就是由字符连接而成的序列。',
      },
      items: [
        'contest/string/match',
        'contest/string/hash',
        'contest/string/trie',
        'contest/string/manacher',
      ],
    },
    {
      type: 'category',
      label: '数学',
      link: {
        type: 'generated-index',
        description: '本章介绍 OI 中可能会用到的数学知识。',
      },
      items: [
        'contest/math/binary-exponentiation',
        'contest/math/permutation',
        {
          type: 'category',
          label: '数论',
          link: {
            type: 'generated-index',
            description: '数论是纯粹数学的分支之一，主要研究整数的性质。',
          },
          items: [
            'contest/math/number-theory/prime',
            'contest/math/number-theory/gcd',
            'contest/math/number-theory/sqrt-decomposition',
            'contest/math/number-theory/euler-totient',
            'contest/math/number-theory/sieve',
            'contest/math/number-theory/pollard-rho',
            'contest/math/number-theory/inverse',
            'contest/math/number-theory/du',
          ],
        },
        {
          type: 'category',
          label: '多项式与生成函数',
          link: {
            type: 'generated-index',
            description: '本章介绍多项式与生成函数。',
          },
          items: [
            'contest/math/poly/fft',
            'contest/math/poly/fwt',
            'contest/math/poly/ogf',
          ],
        },
        {
          type: 'category',
          label: '组合数学',
          link: {
            type: 'generated-index',
            description: '本章介绍组合数学。',
          },
          items: [
            'contest/math/combinatorics/permutation-and-combination',
            'contest/math/combinatorics/drawer-principle',
            'contest/math/combinatorics/inclusion-exclusion-principle',
            'contest/math/combinatorics/vandermonde-convolution',
          ],
        },
        {
          type: 'category',
          label: '线性代数',
          link: {
            type: 'generated-index',
            description: '本章介绍线性代数。',
          },
          items: [
            'contest/math/linear-algebra/matrix',
            'contest/math/linear-algebra/basis',
          ],
        },
        {
          type: 'category',
          label: '数值算法',
          link: {
            type: 'generated-index',
            description:
              '数值算法是指用计算机对数学问题进行近似数值计算的方法。',
          },
          items: [
            'contest/math/numerical/interp',
            'contest/math/numerical/integral',
            'contest/math/numerical/elimination',
            'contest/math/numerical/approximation',
          ],
        },
        'contest/math/game-theory',
        {
          type: 'category',
          label: '模板',
          link: {
            type: 'generated-index',
            description: '本章记录 OI 中封装的通用数学模板。',
          },
          items: [
            'contest/math/math-templates/fraction',
            'contest/math/math-templates/function',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '数据结构',
      link: {
        type: 'generated-index',
        description: '数据结构是在计算机中存储、组织数据的方式。',
      },
      items: [
        'contest/ds/dsu',
        'contest/ds/heap',
        'contest/ds/block',
        'contest/ds/monotonous-stack',
        'contest/ds/sparse-table',
        'contest/ds/fenwick',
        'contest/ds/seg',
        'contest/ds/bst',
        'contest/ds/persistent-seg',
      ],
    },
    {
      type: 'category',
      label: '图论',
      link: {
        type: 'generated-index',
        description: '图论是数学的一个分支，图是图论的主要研究对象。',
      },
      items: [
        'contest/graph/topo',
        'contest/graph/shortest-path',
        'contest/graph/mst',
        'contest/graph/2sat',
        'contest/graph/flow',
        {
          type: 'category',
          label: '树上问题',
          link: {
            type: 'generated-index',
            description: '树是一类特殊的图，即无环连通图。',
          },
          items: [
            'contest/graph/tree/diameter',
            'contest/graph/tree/centroid',
            'contest/graph/tree/lca',
            'contest/graph/tree/difference',
            'contest/graph/tree/hld',
            'contest/graph/tree/virtual-tree',
          ],
        },
        {
          type: 'category',
          label: '连通性',
          link: {
            type: 'generated-index',
            description: '图论是数学的一个分支，图是图论的主要研究对象。',
          },
          items: [
            'contest/graph/connectivity/scc',
            'contest/graph/connectivity/bcc',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '计算几何',
      link: {
        type: 'generated-index',
        description: '利用计算机建立数学模型解决几何问题。',
      },
      items: [
        'contest/geometry/2d',
        'contest/geometry/3d',
        'contest/geometry/convex-hull',
        'contest/geometry/scanning',
        'contest/geometry/rotating-calipers',
        'contest/geometry/geometry-templates',
      ],
    },
    {
      type: 'category',
      label: '杂项',
      link: {
        type: 'generated-index',
        description: '这个板块主要介绍的是一些难以分类的算法及 OI 相关知识。',
      },
      items: [
        'contest/misc/two-pointer',
        'contest/misc/cdq-divide',
        'contest/misc/kahan-summation',
        'contest/misc/odt',
      ],
    },
  ],
  sidebar2: [
    'note/index',
    {
      type: 'category',
      label: '数学',
      link: {
        type: 'generated-index',
        description: '本章记录我的数学笔记。',
      },
      collapsed: false,
      items: [
        {
          type: 'category',
          label: '高中数学',
          link: {
            type: 'doc',
            id: 'note/math/high-school/index',
          },
          items: [
            {
              type: 'category',
              label: '基础与杂项',
              items: [
                'note/math/high-school/misc/transition/index',
                'note/math/high-school/misc/set-and-logic/index',
                'note/math/high-school/misc/inequality',
                'note/math/high-school/misc/vector',
                'note/math/high-school/misc/complex/index',
                'note/math/high-school/misc/permutation-and-combination',
                'note/math/high-school/misc/binomial',
              ],
            },
            {
              type: 'category',
              label: '代数与函数',
              items: [
                'note/math/high-school/function/function/index',
                'note/math/high-school/function/trigonometric-function/index',
                'note/math/high-school/function/sequence',
                'note/math/high-school/function/derivative/index',
              ],
            },
            {
              type: 'category',
              label: '几何与解析',
              items: [
                'note/math/high-school/geometry/triangle-solving/index',
                'note/math/high-school/geometry/solid-geometry',
                'note/math/high-school/geometry/conic',
              ],
            },
            {
              type: 'category',
              label: '统计与概率',
              items: [
                'note/math/high-school/probability/statistics',
                'note/math/high-school/probability/probability',
                'note/math/high-school/probability/distribution',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: '高等数学',
          link: {
            type: 'doc',
            id: 'note/math/advanced/index',
          },
          items: [
            {
              type: 'category',
              label: '《微积分》',
              link: {
                type: 'doc',
                id: 'note/math/advanced/calculus/index',
              },
              items: [],
            },
            {
              type: 'category',
              label: '《线性代数》',
              link: {
                type: 'doc',
                id: 'note/math/advanced/linear-algebra/index',
              },
              items: [
                'note/math/advanced/linear-algebra/l1',
                'note/math/advanced/linear-algebra/l2',
                'note/math/advanced/linear-algebra/l3',
                'note/math/advanced/linear-algebra/l4',
                'note/math/advanced/linear-algebra/l5',
                'note/math/advanced/linear-algebra/l6',
                'note/math/advanced/linear-algebra/l7',
                'note/math/advanced/linear-algebra/l8',
              ],
            },
            {
              type: 'category',
              label: '《概率论与数理统计》',
              link: {
                type: 'doc',
                id: 'note/math/advanced/probability-statistics/index',
              },
              items: [],
            },
            {
              type: 'category',
              label: '《离散数学》',
              link: {
                type: 'doc',
                id: 'note/math/advanced/discrete-math/index',
              },
              items: [],
            },
            {
              type: 'category',
              label: '《初等数论》',
              link: {
                type: 'doc',
                id: 'note/math/advanced/elementary-number-theory/index',
              },
              items: [],
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '英语',
      link: {
        type: 'generated-index',
        description: '本章记录我的英语笔记。',
      },
      collapsed: false,
      items: [
        {
          type: 'category',
          label: '英语语音',
          link: {
            type: 'doc',
            id: 'note/english/pronunciation/index',
          },
          items: ['note/english/pronunciation/phonics'],
        },
        {
          type: 'category',
          label: '英语词汇',
          link: {
            type: 'doc',
            id: 'note/english/vocabulary/index',
          },
          items: [],
        },
        {
          type: 'category',
          label: '英语语法',
          link: {
            type: 'doc',
            id: 'note/english/grammar/index',
          },
          items: [
            {
              type: 'category',
              label: '动词',
              link: {
                type: 'generated-index',
                description:
                  '本章介绍英语动词的相关知识，包括动词分类、时态、语气等。',
              },
              items: [
                'note/english/grammar/verbs/verb-classification',
                'note/english/grammar/verbs/verb-tenses',
                'note/english/grammar/verbs/verb-moods',
                'note/english/grammar/verbs/non-finite-verbs',
                'note/english/grammar/verbs/auxiliary-modal-verbs',
                'note/english/grammar/verbs/linking-verbs',
                'note/english/grammar/verbs/causative-verbs',
              ],
            },
            {
              type: 'category',
              label: '词性',
              link: {
                type: 'generated-index',
                description:
                  '本章介绍英语各种词性的用法，包括名词、代词、形容词等。',
              },
              items: [
                'note/english/grammar/parts-of-speech/nouns',
                'note/english/grammar/parts-of-speech/articles',
                'note/english/grammar/parts-of-speech/pronouns',
                'note/english/grammar/parts-of-speech/adjectives',
                'note/english/grammar/parts-of-speech/numerals',
                'note/english/grammar/parts-of-speech/adverbs',
                'note/english/grammar/parts-of-speech/prepositions',
                'note/english/grammar/parts-of-speech/conjunctions',
                'note/english/grammar/parts-of-speech/interjections',
              ],
            },
            {
              type: 'category',
              label: '句子',
              link: {
                type: 'generated-index',
                description:
                  '本章介绍英语句子结构，包括句子分类、从句、语态等。',
              },
              items: [
                'note/english/grammar/sentences/sentence-types',
                'note/english/grammar/sentences/clauses',
                'note/english/grammar/sentences/absolute-constructions',
                'note/english/grammar/sentences/subject-verb-agreement',
                'note/english/grammar/sentences/passive-voice',
                'note/english/grammar/sentences/inversion',
                'note/english/grammar/sentences/emphasis',
                'note/english/grammar/sentences/ellipsis',
              ],
            },
            {
              type: 'category',
              label: '其他',
              link: {
                type: 'generated-index',
                description:
                  '本章介绍其他英语语法相关知识，包括构词法和标点符号。',
              },
              items: [
                'note/english/grammar/miscellaneous/word-formation',
                'note/english/grammar/miscellaneous/punctuation',
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '推荐',
      link: {
        type: 'doc',
        id: 'note/recommend/index',
      },
      items: ['note/recommend/bilibili/index'],
    },
  ],
  sidebar3: [
    'project/index',
    {
      type: 'category',
      label: 'GitHub',
      link: {
        type: 'generated-index',
        description: '本章记录 GitHub 相关的项目和经验。',
      },
      items: [
        'project/github/lailai0916/index',
        {
          type: 'category',
          label: "lailai's Home",
          link: {
            type: 'doc',
            id: 'project/github/lailais-home/index',
          },
          items: [
            'project/github/lailais-home/setup/index',
            'project/github/lailais-home/plugins',
            'project/github/lailais-home/components',
            'project/github/lailais-home/design',
          ],
        },
        'project/github/achievements',
      ],
    },
    {
      type: 'category',
      label: '指南',
      link: {
        type: 'generated-index',
        description: '本章收录各种实用的文档指南。',
      },
      items: [
        'project/guides/format',
        'project/guides/markdown',
        'project/guides/latex',
        'project/guides/mermaid',
      ],
    },
    {
      type: 'category',
      label: '工具',
      link: {
        type: 'generated-index',
        description: '本章展示各种实用的小工具和计算器项目。',
      },
      items: [
        'project/tools/ascii-art',
        'project/tools/id-checker',
        'project/tools/resistor-calculator',
        'project/tools/polynomial-calculator',
        'project/tools/afk-script',
      ],
    },
    {
      type: 'category',
      label: '终端',
      link: {
        type: 'generated-index',
        description: '本章展示基于终端的项目和教程。',
      },
      items: [
        'project/terminal/igame',
        'project/terminal/map-generator',
        'project/terminal/image-processor',
        {
          type: 'category',
          label: '教程',
          link: {
            type: 'generated-index',
            description: '终端编程相关教程和工具函数。',
          },
          items: [
            'project/terminal/tutorial/maze-game',
            'project/terminal/tutorial/utils',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Desmos',
      link: {
        type: 'generated-index',
        description: '本章展示使用 Desmos 图形计算器创作的各种项目。',
      },
      items: [
        {
          type: 'category',
          label: '艺术博览会',
          items: ['project/desmos/art-expo/iclock'],
        },
        {
          type: 'category',
          label: '尺规作图',
          items: [
            'project/desmos/geometric-construction/heptadecagon',
            'project/desmos/geometric-construction/three-circle-tangent',
            'project/desmos/geometric-construction/apple-logo',
            'project/desmos/geometric-construction/china-flag',
          ],
        },
        {
          type: 'category',
          label: '图形',
          items: [
            'project/desmos/drawing/france-flag',
            'project/desmos/drawing/usa-flag',
            'project/desmos/drawing/cell-membrane-fusion',
            'project/desmos/drawing/convex-lens-model',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '其他',
      link: {
        type: 'generated-index',
        description: '其他分类的项目和分享。',
      },
      items: [
        {
          type: 'category',
          label: '硬件',
          link: {
            type: 'generated-index',
            description: '数码硬件产品相关的分享和展示。',
          },
          items: [
            'project/other/hardware/devices/index',
            'project/other/hardware/edc/index',
            'project/other/hardware/desk-setup',
          ],
        },
        {
          type: 'category',
          label: '软件',
          link: {
            type: 'generated-index',
            description: '软件推荐和配置分享。',
          },
          items: [
            'project/other/software/general',
            'project/other/software/macos',
            'project/other/software/ios',
            {
              type: 'category',
              label: '配置',
              link: {
                type: 'generated-index',
                description: '各种开发工具的配置分享。',
              },
              items: [
                'project/other/software/config/vscode',
                'project/other/software/config/cursor',
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default sidebars;
