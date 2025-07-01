import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  sidebar1: [
    'contest/index',
    {
      type: 'category',
      label: '个人',
      link:
      {
        type: 'generated-index',
        description: "本章主要记录我在 OI 中的个人经验，包括风格规范、对拍工具、常用模板库以及实用技巧等。",
      },
      items: [
        'contest/personal/code-style',
        'contest/personal/code-checker',
        'contest/personal/common-templates',
        'contest/personal/problem-transfer',
      ],
    },
    {
      type: 'category',
      label: '比赛相关',
      link:
      {
        type: 'generated-index',
        description: "本章主要介绍计算机编程比赛直接相关的知识，包括各种赛事、赛制、题型，以及赛场上常见的坑点与技巧。",
      },
      items: [
        'contest/contest/noi',
        'contest/contest/problems',
        'contest/contest/tricks',
      ],
    },
    {
      type: 'category',
      label: '语言基础',
      link:
      {
        type: 'generated-index',
        description: "本章将会介绍编程相关的知识，包括 C++ 从入门到进阶教程和一些其它语言的简介。",
      },
      items: [
        'contest/lang/io',
        'contest/lang/op',
        'contest/lang/ascii',
        'contest/lang/csl',
      ],
    },
    {
      type: 'category',
      label: '算法基础',
      link:
      {
        type: 'generated-index',
        description: "本章介绍一些基础算法。",
      },
      items: [
        'contest/basic/binary',
        'contest/basic/divide-and-conquer',
        'contest/basic/sort',
      ],
    },
    {
      type: 'category',
      label: '搜索',
      link:
      {
        type: 'generated-index',
        description: "搜索，也就是对状态空间进行枚举，通过穷尽所有的可能来找到最优解，或者统计合法解的个数。",
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
      link:
      {
        type: 'generated-index',
        description: "动态规划是一种通过把原问题分解为相对简单的子问题的方式求解复杂问题的方法。",
      },
      items: [
        'contest/dp/knapsack',
        'contest/dp/tree',
        'contest/dp/state',
      ],
    },
    {
      type: 'category',
      label: '字符串',
      link:
      {
        type: 'generated-index',
        description: "字符串，就是由字符连接而成的序列。",
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
      link:
      {
        type: 'generated-index',
        description: "本章介绍 OI 中可能会用到的数学知识。",
      },
      items: [
        'contest/math/binary-exponentiation',
        {
          type: 'category',
          label: '数论',
          link:
          {
            type: 'generated-index',
            description: "数论是纯粹数学的分支之一，主要研究整数的性质。",
          },
          items: [
            'contest/math/number-theory/prime',
            'contest/math/number-theory/gcd',
            'contest/math/number-theory/sqrt-decomposition',
            'contest/math/number-theory/euler-totient',
            'contest/math/number-theory/sieve',
            'contest/math/number-theory/inverse',
            'contest/math/number-theory/du',
          ],
        },
        {
          type: 'category',
          label: '组合数学',
          link:
          {
            type: 'generated-index',
            description: "本章介绍组合数学。",
          },
          items: [
            'contest/math/combinatorics/combination',
            'contest/math/combinatorics/inclusion-exclusion-principle',
          ],
        },
        {
          type: 'category',
          label: '多项式与生成函数',
          link:
          {
            type: 'generated-index',
            description: "本章介绍多项式与生成函数。",
          },
          items: [
            'contest/math/poly/fft',
          ],
        },
        {
          type: 'category',
          label: '数值算法',
          link:
          {
            type: 'generated-index',
            description: "数值算法是指用计算机对数学问题进行近似数值计算的方法。",
          },
          items: [
            'contest/math/numerical/interp',
            'contest/math/numerical/integral',
            'contest/math/numerical/elimination',
          ],
        },
        {
          type: 'category',
          label: '杂项',
          link:
          {
            type: 'generated-index',
            description: "本章介绍的是一些难以分类的数学算法。",
          },
          items: [
            'contest/math/misc/approximation',
            'contest/math/misc/cantor-expansion',
          ],
        },
        {
          type: 'category',
          label: '模板',
          link:
          {
            type: 'generated-index',
            description: "本章记录 OI 中封装的通用数学模板。",
          },
          items: [
            'contest/math/math-templates/matrix',
            'contest/math/math-templates/complex',
            'contest/math/math-templates/fraction',
            'contest/math/math-templates/function',
            'contest/math/math-templates/constant',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '数据结构',
      link:
      {
        type: 'generated-index',
        description: "数据结构是在计算机中存储、组织数据的方式。",
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
      link:
      {
        type: 'generated-index',
        description: "图论是数学的一个分支，图是图论的主要研究对象。",
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
          link:
          {
            type: 'generated-index',
            description: "树是一类特殊的图，即无环连通图。",
          },
          items: [
            'contest/graph/tree/diameter',
            'contest/graph/tree/lca',
            'contest/graph/tree/difference',
            'contest/graph/tree/hld',
            'contest/graph/tree/virtual-tree',
          ],
        },
        {
          type: 'category',
          label: '连通性',
          link:
          {
            type: 'generated-index',
            description: "图论是数学的一个分支，图是图论的主要研究对象。",
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
      link:
      {
        type: 'generated-index',
        description: "利用计算机建立数学模型解决几何问题。",
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
      link:
      {
        type: 'generated-index',
        description: "这个板块主要介绍的是一些难以分类的算法及 OI 相关知识。",
      },
      items: [
        'contest/misc/cdq-divide',
        'contest/misc/kahan-summation',
        'contest/misc/odt',
      ],
    },
    {
      type: 'category',
      label: '专题',
      link:
      {
        type: 'generated-index',
        description: "这个板块主要介绍的是一些特定问题的解法。",
      },
      items: [
        'contest/topic/lis',
      ],
    },
  ],
  sidebar2: [
    {
      type: 'autogenerated',
      dirName: 'note',
    },
  ],
  sidebar3: [
    {
      type: 'autogenerated',
      dirName: 'project',
    },
  ],
};

export default sidebars;
