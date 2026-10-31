import assert from 'node:assert/strict';
import test from 'node:test';
import { fetchMetricItems } from './umamiMetrics.ts';

test('complete distributions retain the long tail across API pages', async () => {
  const source = Array.from({ length: 503 }, (_, index) => ({
    x: `category-${index}`,
    y: index + 1,
  }));
  const requests = [];
  const result = await fetchMetricItems(async (limit, offset) => {
    requests.push({ limit, offset });
    return source.slice(offset, offset + limit);
  }, 'all');
  assert.deepEqual(result, source);
  assert.deepEqual(requests, [
    { limit: 500, offset: 0 },
    { limit: 500, offset: 500 },
  ]);
  assert.equal(
    result.reduce((sum, item) => sum + item.y, 0),
    126756
  );
});

test('rankings retain their requested limit without extra requests', async () => {
  const requests = [];
  const result = await fetchMetricItems(async (limit, offset) => {
    requests.push({ limit, offset });
    return Array.from({ length: limit }, (_, index) => ({ x: String(index), y: 1 }));
  }, 8);
  assert.equal(result.length, 8);
  assert.deepEqual(requests, [{ limit: 8, offset: 0 }]);
});

test('a failed tail page rejects the distribution instead of returning partial percentages', async () => {
  await assert.rejects(
    fetchMetricItems(async (limit, offset) => {
      if (offset > 0) throw new Error('Unavailable');
      return Array.from({ length: limit }, (_, index) => ({ x: String(index), y: 1 }));
    }, 'all'),
    /Unavailable/
  );
});
