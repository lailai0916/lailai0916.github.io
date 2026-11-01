import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

const host = { location: new URL('https://lailai.one/zh-Hans/search?q=private&utm_source=feed') };
host.self = host;
host.top = host;
const script = new EventTarget();
let trackerPresent = true;
const document = {
  title: 'Search results for private',
  referrer: 'https://example.org/?q=private&utm_source=friend',
  querySelector: () => (trackerPresent ? script : null),
};

function loadSource(path) {
  const exports = {};
  const source = readFileSync(new URL(path, import.meta.url), 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
  });
  runInNewContext(outputText, { exports, window: host, document, URL, URLSearchParams });
  return exports;
}

const { installAnalyticsPolicy } = loadSource('../../src/utils/analyticsPolicy.ts');
const { isWebsiteHost, normalizeContentPath, trackEvent } = loadSource(
  '../../src/utils/analytics.ts'
);

installAnalyticsPolicy();
const beforeSend = host.lailaiBeforeSend;
const page = {
  url: 'https://user:password@lailai.one/zh-Hans/search?q=private&utm_source=feed#private',
  referrer: 'https://example.org/search?q=private#private',
  title: 'Search results for private',
};
const cleaned = beforeSend('event', page);
assert.equal(cleaned.url, '/zh-Hans/search?utm_source=feed');
assert.equal(cleaned.referrer, 'https://example.org/search');
assert.equal(cleaned.title, "搜索 | lailai's Home");
assert.equal(JSON.stringify(cleaned).includes('private'), false);
assert.equal(beforeSend('event', { ...page, url: '/zh-Hans/search?q=another' }), null);
assert.notEqual(beforeSend('event', { ...page, name: 'search_completed' }), null);
assert.notEqual(beforeSend('performance', page), null);
assert.notEqual(beforeSend('event', { url: '/zh-Hans/about' }), null);
assert.notEqual(beforeSend('event', page), null);
host.top = {};
assert.equal(beforeSend('event', { ...page, name: 'search_completed' }), null);
host.top = host;

assert.equal(normalizeContentPath('/zh-Hans/blog/example/?q=private#title'), '/blog/example');
assert.equal(normalizeContentPath('/zh-Hans/'), '/');
assert.equal(isWebsiteHost('lailai0916.com'), true);
assert.equal(isWebsiteHost('cloud.lailai.one'), false);
assert.equal(isWebsiteHost('lailai.one.example.org'), false);

// Deferred loading must retain the source page, without buffering the input or clipboard.
trackEvent('search_completed', { surface: 'search_page', result_count: 0, result_kind: 'records' });
host.location = new URL('https://lailai.one/about');
document.title = 'About';
document.referrer = 'https://lailai.one/blog';
const events = [];
host.umami = {
  track: (callback) => {
    events.push(callback({ website: 'check' }));
  },
};
script.dispatchEvent(new Event('load'));
assert.equal(events.length, 1);
assert.equal(events[0].url, '/zh-Hans/search?utm_source=feed');
assert.equal(events[0].data.locale, 'zh-Hans');
assert.equal(events[0].data.content_path, '/search');
assert.equal(events[0].referrer, 'https://example.org/?utm_source=friend');
assert.equal(JSON.stringify(events).includes('private'), false);
trackEvent('copy_success', { surface: 'article', format: 'code' });
trackEvent('copy_success', {
  surface: 'article',
  format: 'code',
  clipboard: 'private',
  locale: 'fake',
});
assert.equal(events.length, 3);
assert.equal(events[1].name, 'copy_success');
assert.equal('clipboard' in events[2].data, false);
assert.equal(events[2].data.locale, 'en');
trackEvent('preference_change', { surface: 'settings', preference: 'gray_mode', value: false });
trackEvent('filter_change', { surface: 'insights', filter: 'time_range', value: 7 });
trackEvent('feature_use', {
  surface: 'travel',
  feature: 'globe',
  action: 'toggle_rotation',
  value: false,
  pointer: { x: 1, y: 2 },
});
assert.equal(events[3].data.value, false);
assert.equal(events[4].data.value, 7);
assert.equal(events[5].data.value, false);
assert.equal('pointer' in events[5].data, false);
trackerPresent = false;
trackEvent('feed_click', { surface: 'footer', format: 'rss' });
assert.equal(events.length, 6);
trackerPresent = true;
host.umami = {
  track: () => {
    throw new Error('Unavailable tracker');
  },
};
assert.doesNotThrow(() => trackEvent('feed_click', { surface: 'footer', format: 'rss' }));
console.log('Analytics policy, source attribution, and nonblocking event checks passed.');
