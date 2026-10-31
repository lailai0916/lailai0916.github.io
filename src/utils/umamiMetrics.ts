export interface MetricItem {
  x: string;
  y: number;
}

export type MetricLimit = number | 'all';

const PAGE_SIZE = 500;

export async function fetchMetricItems(
  fetchPage: (limit: number, offset: number) => Promise<MetricItem[]>,
  limit: MetricLimit
): Promise<MetricItem[]> {
  if (limit !== 'all') return fetchPage(limit, 0);

  const items: MetricItem[] = [];
  while (true) {
    const page = await fetchPage(PAGE_SIZE, items.length);
    items.push(...page);
    if (page.length < PAGE_SIZE) return items;
  }
}
