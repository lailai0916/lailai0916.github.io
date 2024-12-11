import {sortBy} from '@site/src/utils/jsUtils';

export type TagType =
  | 'favorite'
  | 'opensource'
  | 'product'
  | 'design'
  | 'i18n'
  | 'versioning'
  | 'large'
  | 'meta'
  | 'personal'
  | 'rtl';

export type User = {
  title: string;
  description: string;
  preview: string | null; // null = use our serverless screenshot service
  website: string;
  source: string | null;
  tags: TagType[];
};

export type Tag = {
  label: string;
  description: string;
  color: string;
};

const Users: User[] = [
  {
    title: 'lailai\'s home',
    description: 'This website.',
    preview: null,
    website: 'https://www.lailai.one/',
    source: 'https://github.com/lailai0916/lailai0916.github.io',
    tags: ['favorite', 'personal', 'opensource'],
  },
  {
    title: 'Google',
    description: 'Search engine.',
    preview: '/img/site/Google.png',
    website: 'https://www.google.com/',
    source: null,
    tags: ['favorite'],
  },
  {
    title: 'Blogasaurus',
    description: 'A blog written using Docasaurus.',
    preview: '/img/site/test.png',
    website: 'https://blog.palashsh.me/',
    source: 'https://github.com/BattleOfPlassey/blogasaurus',
    tags: ['personal', 'opensource'],
  },
];

export const Tags: {[type in TagType]: Tag} = {
  favorite: {
    label: '喜爱',
    description: 'Our favorite Docusaurus sites that you must absolutely check out!',
    color: '#e9669e',
  },
  opensource: {
    label: '开源',
    description: 'Open-Source Docusaurus sites can be useful for inspiration!',
    color: '#39ca30',
  },
  product: {
    label: '产品',
    description: 'Docusaurus sites associated to a commercial product!',
    color: '#dfd545',
  },
  design: {
    label: '设计',
    description: 'Beautiful Docusaurus sites, polished and standing out from the initial template!',
    color: '#a44fb7',
  },
  i18n: {
    label: '国际化',
    description: 'Translated Docusaurus sites using the internationalization support with more than 1 locale.',
    color: '#127f82',
  },
  versioning: {
    label: '分版',
    description: 'Docusaurus sites using the versioning feature of the docs plugin to manage multiple versions.',
    color: '#fe6829',
  },
  large: {
    label: '大型',
    description: 'Very large Docusaurus sites, including many more pages than the average!',
    color: '#8c2f00',
  },
  meta: {
    label: 'Meta',
    description: 'Docusaurus sites of Meta (formerly Facebook) projects',
    color: '#4267b2', // Facebook blue
  },
  personal: {
    label: '个人',
    description: 'Personal websites, blogs and digital gardens built with Docusaurus',
    color: '#14cfc3',
  },
  rtl: {
    label: 'RTL 方向',
    description: 'Docusaurus sites using the right-to-left reading direction support.',
    color: '#ffcfc3',
  },
};

export const TagList = Object.keys(Tags) as TagType[];
function sortUsers() {
  let result = Users;
  // Sort by site name
  result = sortBy(result, (user) => user.title.toLowerCase());
  // Sort by favorite tag, favorites first
  result = sortBy(result, (user) => !user.tags.includes('favorite'));
  return result;
}

export const sortedUsers = sortUsers();
