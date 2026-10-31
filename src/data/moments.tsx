import { getAllBlogItems } from '@site/src/utils/blogData';
import { compareInstantsDescending } from '@site/src/utils/dateTime';
import type { ShareCardProps } from '@lailai0916/ui/ShareCard';

export interface MomentPost {
  title: string;
  permalink: string;
}

export interface MomentImage {
  src: string;
  width: number;
  height: number;
}

interface MomentItem {
  date: string;
  content?: string;
  post?: MomentPost;
  event?: string;
  location?: string;
  images?: MomentImage[];
  share?: ShareCardProps;
}

const STATIC_MOMENTS: MomentItem[] = [
  {
    date: '2026-10-19T01:00:00+08:00',
    content: '2nd Anniversary!',
    images: [
      {
        src: 'https://cloud.lailai.one/f/KZqsJ/lailai-home-devices.png',
        width: 4543,
        height: 2791,
      },
    ],
  },
  {
    date: '2026-09-19T12:35:00+08:00',
    images: [{ src: 'https://cloud.lailai.one/f/LqntV/2501.png', width: 1254, height: 1254 }],
  },
  {
    date: '2026-09-16T00:00:00+08:00',
    content: '17th Birthday!',
    images: [{ src: 'https://cloud.lailai.one/f/AdNtA/wordcloud.svg', width: 2618, height: 952 }],
  },
  {
    date: '2026-08-17T14:01:00+08:00',
    content: '征集眼前一亮的 idea',
    images: [{ src: 'https://cloud.lailai.one/f/NRotg/IMG_5577.PNG', width: 872, height: 1804 }],
  },
  {
    date: '2026-08-12T23:58:00+08:00',
    content: '「Attention is All You Need」 3.0',
    share: {
      url: 'https://www.zhihu.com/question/2060410811798102294/answer/2071019787996619857',
      title: '如何证明e^x>19/48+41x/37+43x^2/40，x>0? - 知乎',
      description: 'Answer',
    },
    images: [
      { src: 'https://cloud.lailai.one/f/Prnuy/attention1.png', width: 1388, height: 1300 },
      { src: 'https://cloud.lailai.one/f/Y8RsA/attention2.png', width: 3242, height: 2192 },
    ],
  },
  {
    date: '2026-08-04T20:00:00+08:00',
    content: '使用 GPT-5.6 Sol (xhigh) 证明了饱和 Sperner 系统的稳定值 sat(6)=30 和 sat(7)=55',
    images: [
      {
        src: 'https://cloud.lailai.one/f/e3Ehw/P0054-sat6-sat7-manuscript-v1.1.2-page-1-600dpi.png',
        width: 4961,
        height: 7016,
      },
    ],
  },
  {
    date: '2026-07-23T15:41:00+08:00',
    content: '「Code is cheap. Show me the talk.」 — Linus Torvalds',
  },
  {
    date: '2026-07-10T23:00:00+08:00',
    content: '「一个到中午还没有用尽他的 Codex 限额的人，浪费了他的上午。」——苏格拉底',
  },
  {
    date: '2026-06-30T18:55:00+08:00',
    share: {
      url: 'https://www.reddit.com/r/ClaudeAI/comments/1ujila1/comment/ouo17nd/',
      title: 'Anthropic embedded spyware in Claude Code — and attempted to hide it from you',
      description: 'Comment',
    },
    images: [
      { src: 'https://cloud.lailai.one/f/MEQfy/claude_suspended.png', width: 1546, height: 2060 },
    ],
  },
  {
    date: '2026-06-26T18:04:00+08:00',
    content: '「现在是负摩尔定律时代，每过 18 个月，价格翻倍，性能和容量减半。」',
  },
  {
    date: '2026-06-13T16:55:00+08:00',
    share: {
      url: 'https://www.anthropic.com/news/fable-mythos-access',
      title: 'Statement on the US government directive to suspend access to Fable 5 and Mythos 5',
      description: 'Announcements',
    },
  },
  {
    date: '2026-06-10T01:30:00+08:00',
    share: {
      url: 'https://www.anthropic.com/news/claude-fable-5-mythos-5',
      title: 'Claude Fable 5 and Claude Mythos 5',
      description: 'Announcements',
    },
  },
  {
    date: '2026-06-09T07:40:00+08:00',
    content: 'Goodbye, macOS 26!',
    images: [
      { src: 'https://cloud.lailai.one/f/eOLuw/macos26-dock.png', width: 3344, height: 238 },
    ],
  },
  {
    date: '2026-06-02T12:00:00+08:00',
    content: '「宇宙中随机出现一部 iPhone 的概率极低，但已经发生过了。」',
  },
  {
    date: '2026-05-31T15:55:00+08:00',
    share: {
      url: 'https://www.bilibili.com/video/BV1mkVn63EYQ',
      title: '信息学奥林匹克竞赛学校排名变迁动画',
      description: 'lailai0916',
    },
  },
  {
    date: '2026-03-30T18:30:00+08:00',
    content: 'bilibili LV6!',
    share: {
      url: 'https://space.bilibili.com/1796257032',
      title: 'lailai0916 的个人主页',
      description: 'lailai0916',
    },
  },
  {
    date: '2026-03-07T14:30:00+08:00',
    content:
      '时过境迁，小 B 回到了他梦寐以求，却又折戟沉沙的省选赛场。但他关于算法竞赛的记忆还有多少呢？其中又有多少最为珍贵的记忆值得去珍惜呢？小 B 是一个对算法竞赛充满热情，乐于探索的人。而对他来说，最珍贵的记忆便是学习算法时对其进行各种修改、实验，尝试得到一些新成果的日子吧。',
    event: '联合省选 2026',
    location: '杭州师范大学（仓前校区）',
  },
  {
    date: '2026-03-08T15:33:00+08:00',
    event: '联合省选 2026',
    images: [
      { src: 'https://cloud.lailai.one/f/rjAcM/67f706e91a0d0a8dba.jpg', width: 1440, height: 719 },
    ],
  },
  {
    date: '2026-03-06T09:33:00+08:00',
    content: '「这个时代不用闲鱼买东西，你几乎一定在溢价。」——孙宇晨',
  },
  {
    date: '2026-02-21T19:49:00+08:00',
    event: 'LGS Paintboard 2026',
    share: {
      url: 'https://www.bilibili.com/video/BV1R4fnBhELd',
      title: 'LGS Paintboard 2026 延时动画',
      description: 'lailai0916',
    },
  },
  {
    date: '2026-01-22T10:30:00+08:00',
    content: 'Hello, World!',
  },
  {
    date: '2026-01-11T05:01:00+08:00',
    content: 'USACO Platinum',
    images: [
      { src: 'https://cloud.lailai.one/f/wyAUg/usaco-platinum.png', width: 1800, height: 1776 },
    ],
  },
  {
    date: '2025-12-26T23:23:00+08:00',
    content: 'ChatGPT 2025',
    event: 'Your Year with ChatGPT',
    images: [
      { src: 'https://cloud.lailai.one/f/PVyuy/chatgpt-2025.png', width: 1800, height: 1800 },
    ],
  },
  {
    date: '2025-12-26T23:23:00+08:00',
    content: 'AFO | 2020.12-2025.12',
    share: {
      url: 'https://mp.weixin.qq.com/s/zuJJ0-D-Ekc-FRWFzp10Jg',
      title: '杭州二中学子勇夺NOIP满分，2人成功晋级国家队预备队',
      description: '浙江省杭州第二中学',
    },
  },
  {
    date: '2025-10-17T21:03:00+08:00',
    content: '杭州高中分布地图',
    images: [
      {
        src: 'https://cloud.lailai.one/f/nMdSq/hangzhou-highschool-map.png',
        width: 9531,
        height: 5884,
      },
    ],
  },
  {
    date: '2025-10-17T20:30:00+08:00',
    content: '1st Anniversary!',
  },
  {
    date: '2025-10-16T19:50:00+08:00',
    content: '图灵测试',
    images: [
      { src: 'https://cloud.lailai.one/f/YvpHA/certificate.png', width: 3451, height: 2440 },
    ],
  },
  {
    date: '2025-10-05T19:45:00+08:00',
    content: 'GIMPS | Lucas–Lehmer Primality Test',
    images: [{ src: 'https://cloud.lailai.one/f/wrhg/gimps.png', width: 3456, height: 2234 }],
  },
  {
    date: '2025-09-16T00:00:00+08:00',
    content: '16th Birthday!',
    images: [{ src: 'https://cloud.lailai.one/f/r4HM/birthday-16.png', width: 3952, height: 2704 }],
  },
  {
    date: '2025-05-23T22:22:00+08:00',
    content: 'Java 30th!',
  },
];

function getBlogMoments(locale?: string): MomentItem[] {
  return getAllBlogItems(locale).map(
    ({ date, title, permalink }): MomentItem => ({
      date,
      post: { title, permalink },
    })
  );
}

export function getMomentList(locale?: string): MomentItem[] {
  return [...STATIC_MOMENTS, ...getBlogMoments(locale)].sort((a, b) =>
    compareInstantsDescending(a.date, b.date)
  );
}
