import type { KumaHeartbeat } from '@site/src/utils/kuma';

interface HeartbeatBucket {
  first: KumaHeartbeat | null;
  last: KumaHeartbeat | null;
  representative: KumaHeartbeat | null;
  count: number;
}

const STATUS_PRIORITY: Record<KumaHeartbeat['status'], number> = { 0: 3, 2: 2, 3: 1, 1: 0 };

export function getHeartbeatBuckets(
  beats: KumaHeartbeat[],
  historySlots: number,
  visibleSlots: number
): HeartbeatBucket[] {
  const recent = beats.slice(-historySlots);
  const offset = historySlots - recent.length;
  const bucketCount = Math.min(historySlots, visibleSlots);

  return Array.from({ length: bucketCount }, (_, index) => {
    const start = Math.floor((index * historySlots) / bucketCount);
    const end = Math.floor(((index + 1) * historySlots) / bucketCount);
    const bucket: HeartbeatBucket = { first: null, last: null, representative: null, count: 0 };

    for (let position = start; position < end; position++) {
      const beat = recent[position - offset];
      if (!beat) continue;
      bucket.first ??= beat;
      bucket.last = beat;
      bucket.count++;
      // A brief failure must remain visible when several checks share one cell.
      if (
        !bucket.representative ||
        STATUS_PRIORITY[beat.status] >= STATUS_PRIORITY[bucket.representative.status]
      ) {
        bucket.representative = beat;
      }
    }

    return bucket;
  });
}
