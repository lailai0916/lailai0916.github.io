export interface MomentItem {
  date: string;
  content: string;
  images?: string[];
}

export const MOMENT_LIST: MomentItem[] = [
  {
    date: '2025-01-15T10:30:00',
    content: 'This is a moment.',
  },
];
