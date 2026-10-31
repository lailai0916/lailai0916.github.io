import assert from 'node:assert/strict';
import test from 'node:test';
import { mergeSeries, splitPageviewWindow } from './umamiSeries.ts';

for (const timeZone of [
  'Asia/Shanghai',
  'America/New_York',
  'Asia/Kathmandu',
  'Australia/Adelaide',
]) {
  test(`year requests keep local day buckets intact in ${timeZone}`, () => {
    const previousTimeZone = process.env.TZ;
    process.env.TZ = timeZone;
    try {
      const endAt = Date.parse('2026-10-31T17:00:00+08:00');
      const startAt = endAt - 365 * 86_400_000;
      const [first, second] = splitPageviewWindow(startAt, endAt);
      assert.equal(first.startAt, startAt);
      assert.equal(second.endAt, endAt);
      assert.equal(first.endAt + 1, second.startAt);
      const boundary = new Date(second.startAt);
      assert.deepEqual(
        [
          boundary.getHours(),
          boundary.getMinutes(),
          boundary.getSeconds(),
          boundary.getMilliseconds(),
        ],
        [0, 0, 0, 0]
      );
      assert.notEqual(new Date(first.endAt).toDateString(), boundary.toDateString());
      assert.ok(first.endAt - first.startAt < 200 * 86_400_000);
      assert.ok(second.endAt - second.startAt < 200 * 86_400_000);
    } finally {
      if (previousTimeZone === undefined) delete process.env.TZ;
      else process.env.TZ = previousTimeZone;
    }
  });

  test(`Umami bucket labels retain their clock time in ${timeZone}`, () => {
    const previousTimeZone = process.env.TZ;
    process.env.TZ = timeZone;
    try {
      const legacy = [
        { x: '2026-10-31 23:00:00', y: 156 },
        { x: '2026-11-01 00:00:00', y: 42 },
      ];
      assert.deepEqual(
        mergeSeries([
          [
            { x: '2026-10-31T23:00:00Z', y: 156 },
            { x: '2026-11-01T00:00:00.000Z', y: 42 },
          ],
        ]),
        legacy
      );
      assert.deepEqual(mergeSeries([legacy]), legacy);
      assert.deepEqual(mergeSeries([legacy, [{ x: '2026-11-01T00:00:00Z', y: 42 }]]), legacy);
    } finally {
      if (previousTimeZone === undefined) delete process.env.TZ;
      else process.env.TZ = previousTimeZone;
    }
  });
}

test('a DST boundary keeps every view without double-counting a daily visitor', () => {
  const previousTimeZone = process.env.TZ;
  process.env.TZ = 'America/New_York';
  try {
    const startAt = Date.parse('2026-03-06T12:00:00-05:00');
    const endAt = Date.parse('2026-03-10T13:00:00-04:00');
    const events = [
      { at: Date.parse('2026-03-07T23:59:59-05:00'), visitor: 'one' },
      { at: Date.parse('2026-03-08T00:00:00-05:00'), visitor: 'two' },
      { at: Date.parse('2026-03-08T03:01:00-04:00'), visitor: 'two' },
      { at: Date.parse('2026-03-08T18:00:00-04:00'), visitor: 'three' },
    ];
    const parts = splitPageviewWindow(startAt, endAt).map((range) => {
      const days = new Map();
      for (const event of events) {
        if (event.at < range.startAt || event.at > range.endAt) continue;
        const key = new Date(event.at).toDateString();
        const bucket = days.get(key) ?? { views: 0, visitors: new Set() };
        bucket.views += 1;
        bucket.visitors.add(event.visitor);
        days.set(key, bucket);
      }
      return {
        pageviews: [...days].map(([x, bucket]) => ({ x, y: bucket.views })),
        sessions: [...days].map(([x, bucket]) => ({ x, y: bucket.visitors.size })),
      };
    });
    const pageviews = mergeSeries(parts.map((part) => part.pageviews));
    const sessions = mergeSeries(parts.map((part) => part.sessions));
    assert.equal(
      pageviews.reduce((sum, point) => sum + point.y, 0),
      4
    );
    assert.equal(
      sessions.reduce((sum, point) => sum + point.y, 0),
      3
    );
    assert.equal(parts[0].pageviews.at(-1).y, 1);
    assert.equal(parts[1].pageviews[0].y, 3);
  } finally {
    if (previousTimeZone === undefined) delete process.env.TZ;
    else process.env.TZ = previousTimeZone;
  }
});
