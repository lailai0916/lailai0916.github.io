interface MomentItem {
  date: string;
  content: string;
  images?: string[];
}

export const MOMENT_LIST: MomentItem[] = [
  {
    date: '2026-03-07T14:30',
    content:
      '时过境迁，小 B 回到了他梦寐以求，却又折戟沉沙的省选赛场。但他关于算法竞赛的记忆还有多少呢？其中又有多少最为珍贵的记忆值得去珍惜呢？小 B 是一个对算法竞赛充满热情，乐于探索的人。而对他来说，最珍贵的记忆便是学习算法时对其进行各种修改、实验，尝试得到一些新成果的日子吧。',
  },
  {
    date: '2026-01-22T10:30',
    content: 'Hello, World!',
  },
  {
    date: '2025-10-17T00:00',
    content: "Website's 1st Anniversary! 🎉",
  },
  {
    date: '2025-09-16T00:00',
    content: '16th Birthday! 🎉',
    images: ['https://cloud.lailai.one/f/r4HM/birthday-16.png'],
  },
];
