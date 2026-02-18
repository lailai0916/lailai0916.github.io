import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  sidebar1: [
    'contest/index',
    {
      type: 'category',
      label: '个人',
      link: {
        type: 'generated-index',
        description:
          '本章记录我在 OI 中的个人经验，包括风格规范、对拍工具、常用模板库以及实用技巧等。',
      },
      items: ['contest/personal/common-templates', 'contest/personal/luogu'],
    },
    {
      type: 'category',
      label: '比赛相关',
      link: {
        type: 'generated-index',
        description:
          '本章介绍计算机编程比赛直接相关的知识，包括各种赛事、赛制、题型，以及赛场上常见的坑点与技巧。',
      },
      items: [
        'contest/contest/events',
        'contest/contest/noi-syllabus',
        'contest/contest/noi-written',
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
          '本章介绍编程相关的知识，包括 C++ 从入门到进阶教程和一些其他语言的简介。',
      },
      items: [
        'contest/lang/helloworld',
        'contest/lang/var',
        'contest/lang/op',
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
        'contest/search/heuristic',
      ],
    },
    {
      type: 'category',
      label: '动态规划',
      link: {
        type: 'generated-index',
        description:
          '动态规划是一种通过把原问题分解为相对简单的子问题的方式求解复杂问题的方法。',
      },
      items: [
        'contest/dp/basic',
        'contest/dp/knapsack',
        'contest/dp/interval',
        'contest/dp/tree',
        'contest/dp/state',
        'contest/dp/number',
        'contest/dp/probability',
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
        'contest/string/z-func',
        'contest/string/ac-automaton',
        'contest/string/manacher',
        'contest/string/minimal-string',
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
        'contest/math/bignum',
        'contest/math/binary-exponentiation',
        'contest/math/permutation',
        {
          type: 'category',
          label: '数论',
          link: {
            type: 'generated-index',
            description: '数论是纯粹数学的一个分支，主要研究整数的性质。',
          },
          items: [
            'contest/math/number-theory/prime',
            'contest/math/number-theory/gcd',
            'contest/math/number-theory/euler-totient',
            'contest/math/number-theory/sieve',
            'contest/math/number-theory/pollard-rho',
            'contest/math/number-theory/inverse',
            'contest/math/number-theory/crt',
            'contest/math/number-theory/primitive-root',
            'contest/math/number-theory/sqrt-decomposition',
            'contest/math/number-theory/du',
            'contest/math/number-theory/min-25',
            'contest/math/number-theory/stern-brocot',
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
            'contest/math/poly/ntt',
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
            'contest/math/combinatorics/polya',
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
        'contest/math/linear-programming',
        {
          type: 'category',
          label: '数值分析',
          link: {
            type: 'generated-index',
            description:
              '数值分析是指用计算机对数学问题进行近似数值计算的方法。',
          },
          items: [
            'contest/math/numerical/interp',
            'contest/math/numerical/integral',
            'contest/math/numerical/elimination',
          ],
        },
        'contest/math/game-theory',
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
        'contest/ds/hash',
        'contest/ds/dsu',
        'contest/ds/heap',
        'contest/ds/block',
        'contest/ds/monotonous-stack',
        'contest/ds/monotonous-queue',
        'contest/ds/sparse-table',
        'contest/ds/fenwick',
        'contest/ds/seg',
        'contest/ds/bst',
        'contest/ds/persistent',
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
        'contest/graph/topo',
        'contest/graph/shortest-path',
        'contest/graph/spanning-tree',
        'contest/graph/connectivity',
        'contest/graph/rings-count',
        'contest/graph/min-cycle',
        'contest/graph/euler',
        'contest/graph/bi-graph',
        'contest/graph/flow',
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
        'contest/geometry/distance',
        'contest/geometry/convex-hull',
        'contest/geometry/scanning',
        'contest/geometry/rotating-calipers',
      ],
    },
    {
      type: 'category',
      label: '杂项',
      link: {
        type: 'generated-index',
        description: '本章介绍的是一些难以分类的算法及 OI 相关知识。',
      },
      items: [
        'contest/misc/two-pointer',
        'contest/misc/cdq-divide',
        'contest/misc/mo-algo',
        'contest/misc/expression',
        'contest/misc/main-element',
        'contest/misc/kahan-summation',
        'contest/misc/odt',
      ],
    },
  ],
  sidebar2: [
    'note/index',
    {
      type: 'category',
      label: '推荐',
      link: {
        type: 'doc',
        id: 'note/recommend/index',
      },
      items: ['note/recommend/bilibili', 'note/recommend/software'],
    },
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
            id: 'note/math/highschool/index',
          },
          items: [
            {
              type: 'category',
              label: '基础与杂项',
              items: [
                'note/math/highschool/basic/transition',
                'note/math/highschool/basic/set',
                'note/math/highschool/basic/logic',
                'note/math/highschool/basic/inequality',
                'note/math/highschool/basic/vector',
                'note/math/highschool/basic/complex',
                'note/math/highschool/basic/counting',
              ],
            },
            {
              type: 'category',
              label: '代数与函数',
              items: [
                'note/math/highschool/function/func',
                'note/math/highschool/function/trigonometric',
                'note/math/highschool/function/sequence',
                'note/math/highschool/function/derivative',
              ],
            },
            {
              type: 'category',
              label: '几何与解析',
              items: [
                'note/math/highschool/geometry/triangle',
                'note/math/highschool/geometry/solid',
                'note/math/highschool/geometry/line-and-circle',
                'note/math/highschool/geometry/conic',
              ],
            },
            {
              type: 'category',
              label: '统计与概率',
              items: [
                'note/math/highschool/probability/statistics',
                'note/math/highschool/probability/probability',
                'note/math/highschool/probability/distribution',
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
              items: [],
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
          items: ['note/english/vocabulary/ncee'],
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
                  '本章介绍英语各种词性的用法，包括名词、冠词、代词、数词、形容词、副词、介词、连词和叹词。',
              },
              items: [
                'note/english/grammar/parts-of-speech/nouns',
                'note/english/grammar/parts-of-speech/articles',
                'note/english/grammar/parts-of-speech/pronouns',
                'note/english/grammar/parts-of-speech/numerals',
                'note/english/grammar/parts-of-speech/adjectives',
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
              label: '杂项',
              link: {
                type: 'generated-index',
                description:
                  '本章介绍其他英语语法相关知识，包括构词法和标点符号。',
              },
              items: [
                'note/english/grammar/misc/word-formation',
                'note/english/grammar/misc/punctuation',
              ],
            },
          ],
        },
      ],
    },
  ],
  sidebar3: [
    'project/index',
    {
      type: 'category',
      label: "lailai's Home",
      link: {
        type: 'doc',
        id: 'project/lailai0916.github.io/index',
      },
      items: [
        'project/lailai0916.github.io/tutorial',
        'project/lailai0916.github.io/tailwind',
      ],
    },
    'project/lailai0916',
    'project/code-comparator',
    'project/hangzhou-highschool-map',
    'project/sun-path-atlas',
    {
      type: 'category',
      label: '指南',
      link: {
        type: 'generated-index',
        description: '本章收录各种实用的文档指南。',
      },
      items: [
        'project/guides/text-format',
        'project/guides/code-style',
        'project/guides/design-style',
        'project/guides/markdown',
        'project/guides/latex',
        'project/guides/mermaid',
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
        'project/terminal/tutorial',
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
          label: '艺术',
          items: ['project/desmos/art/iclock'],
        },
        {
          type: 'category',
          label: '图形',
          items: [
            'project/desmos/calculator/france-flag',
            'project/desmos/calculator/usa-flag',
            'project/desmos/calculator/cell-membrane-fusion',
            'project/desmos/calculator/convex-lens-model',
          ],
        },
        {
          type: 'category',
          label: '几何',
          items: [
            'project/desmos/geometry/heptadecagon',
            'project/desmos/geometry/three-circle-tangent',
            'project/desmos/geometry/apple-logo',
            'project/desmos/geometry/china-flag',
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
        'project/other/devices',
        'project/other/edc',
        'project/other/desk-setup',
      ],
    },
  ],
};

export default sidebars;
