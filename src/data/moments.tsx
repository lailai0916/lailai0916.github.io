import { translate } from '@docusaurus/Translate';
import { getAllBlogItems } from '@site/src/utils/blogData';
import type { ShareCardProps } from '@site/src/components/laikit/ShareCard';

interface MomentItem {
  date: string;
  content?: string;
  event?: string;
  location?: string;
  images?: string[];
  share?: ShareCardProps;
}

const STATIC_MOMENTS: MomentItem[] = [
  {
    date: '2026-06-26T18:04:00+08:00',
    content: '「现在是负摩尔定律时代，每过 18 个月，价格翻倍，性能和容量减半。」',
  },
  {
    date: '2026-06-13T16:55:00+08:00',
    share: {
      url: 'https://www.anthropic.com/news/fable-mythos-access',
      title:
        'Statement on the US government directive to suspend access to Fable 5 and Mythos 5',
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
    images: ['https://cloud.lailai.one/f/eOLuw/macos26-dock.png'],
  },
  {
    date: '2026-06-02T12:00:00+08:00',
    content: '「宇宙中随机出现一部 iPhone 的概率极低——但却已经发生了。」',
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
    date: '2025-12-26T23:23:00+08:00',
    content: 'ChatGPT 2025',
    event: 'Your Year with ChatGPT',
    images: ['https://cloud.lailai.one/f/PVyuy/chatgpt-2025.png'],
  },
  {
    date: '2025-10-17T00:00:00+08:00',
    content: "Website's 1st Anniversary! 🎉",
  },
  {
    date: '2025-10-16T19:50:00+08:00',
    content: '图灵测试',
    images: ['https://cloud.lailai.one/f/YvpHA/certificate.png'],
  },
  {
    date: '2025-10-05T19:45:00+08:00',
    content: 'GIMPS | Lucas–Lehmer Primality Test',
    images: ['https://cloud.lailai.one/f/wrhg/gimps.png'],
  },
  {
    date: '2025-09-16T00:00:00+08:00',
    content: '16th Birthday! 🎉',
    images: ['https://cloud.lailai.one/f/r4HM/birthday-16.png'],
  },
  {
    date: '2025-05-23T22:22:00+08:00',
    content: 'Java 30th!',
  },
];

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getBlogMoments(): MomentItem[] {
  return getAllBlogItems()
    .map((it): MomentItem | null => {
      const title = it.title ?? it.metadata?.title;
      const date = it.date ?? it.metadata?.date;
      const permalink = it.permalink ?? it.metadata?.permalink;
      if (!title || !date || !permalink) return null;
      const content = translate(
        {
          id: 'data.moments.blogPublished',
          message: 'Published a new post <a href="{permalink}">{title}</a>',
        },
        { permalink: escapeHtml(permalink), title: escapeHtml(title) }
      );
      return { date, content };
    })
    .filter((x): x is MomentItem => x !== null);
}

export const MOMENT_LIST: MomentItem[] = [
  ...STATIC_MOMENTS,
  ...getBlogMoments(),
].sort((a, b) => (a.date < b.date ? 1 : -1));
