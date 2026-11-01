import { translate } from '@docusaurus/Translate';

interface CommunityItem {
  id: string;
  title: string;
  text: string;
  icon: string;
  href: string;
  contact?: boolean;
}

export const COMMUNITY_LIST: CommunityItem[] = [
  {
    id: 'phone',
    contact: true,
    title: translate({
      id: 'data.community.phone',
      message: 'Phone',
    }),
    text: '+86 17757102577',
    icon: 'tabler:phone-filled',
    href: 'tel:+86 17757102577',
  },
  {
    id: 'email',
    contact: true,
    title: translate({
      id: 'data.community.email',
      message: 'Email',
    }),
    text: 'lailai0x394@gmail.com',
    icon: 'tabler:mail-filled',
    href: 'mailto:lailai0x394@gmail.com',
  },
  {
    id: 'x',
    title: translate({
      id: 'data.community.x',
      message: 'X (Twitter)',
    }),
    text: 'lailai0x394',
    icon: 'simple-icons:x',
    href: 'https://x.com/lailai0x394',
  },
  {
    id: 'telegram',
    contact: true,
    title: translate({
      id: 'data.community.telegram',
      message: 'Telegram',
    }),
    text: 'lailai0916',
    icon: 'simple-icons:telegram',
    href: 'https://t.me/lailai0916',
  },
  {
    id: 'linkedin',
    title: translate({
      id: 'data.community.linkedin',
      message: 'LinkedIn',
    }),
    text: 'lailai0916',
    icon: 'simple-icons:linkedin',
    href: 'https://www.linkedin.com/in/lailai0916',
  },
  {
    id: 'github',
    title: translate({
      id: 'data.community.github',
      message: 'GitHub',
    }),
    text: 'lailai0916',
    icon: 'simple-icons:github',
    href: 'https://github.com/lailai0916',
  },
  {
    id: 'qq',
    contact: true,
    title: translate({
      id: 'data.community.qq',
      message: 'QQ',
    }),
    text: '11548585',
    icon: 'simple-icons:qq',
    href: 'https://qm.qq.com/q/aREQfS97PO',
  },
  {
    id: 'wechat',
    contact: true,
    title: translate({
      id: 'data.community.wechat',
      message: 'WeChat',
    }),
    text: 'lailai0x394',
    icon: 'simple-icons:wechat',
    href: 'https://cloud.lailai.one/f/6dzs5/community-wechat.jpg',
  },
  {
    id: 'bilibili',
    title: translate({
      id: 'data.community.bilibili',
      message: 'bilibili',
    }),
    text: 'lailai0916',
    icon: 'simple-icons:bilibili',
    href: 'https://space.bilibili.com/1796257032',
  },
  {
    id: 'luogu',
    title: translate({
      id: 'data.community.luogu',
      message: 'Luogu',
    }),
    text: 'lailai0916',
    icon: 'simple-icons:luogu',
    href: 'https://www.luogu.com.cn/user/455474',
  },
];
