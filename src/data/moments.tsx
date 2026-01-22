export interface MomentItem {
  date: string;
  content: string;
  images?: string[];
}

export const MOMENT_LIST: MomentItem[] = [
  {
    date: '2026-01-22T10:30:00',
    content: 'Hello, World!',
  },
];
