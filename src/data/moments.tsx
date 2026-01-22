export interface MomentItem {
  date: string;
  content: string;
  images?: string[];
}

export const MOMENT_LIST: MomentItem[] = [
  {
    date: '2026-01-22T10:30',
    content: 'Hello, World!',
  },
  {
    date: '2025-09-16T00:00',
    content: '16th Birthday! 🎉',
    images: ['https://cloud.lailai.one/f/r4HM/birthday-16.png'],
  },
];
