import assert from 'node:assert/strict';
import test from 'node:test';
import { getFriendFeedSources } from './sources.ts';

test('exports only explicit subscriptions without executing translations', () => {
  const source = `export const FRIEND_LIST = [
    {title: translate({id: 'x', message: 'Friend'}), href: 'https://one.example', rss: 'https://one.example/rss.xml'},
    {href: 'https://two.example'},
    {href: 'https://three.example', rss: 'https://feeds.example/three?format=rss&limit=10'},
  ];`;
  assert.deepEqual(getFriendFeedSources(source), [
    { siteUrl: 'https://one.example', feedUrl: 'https://one.example/rss.xml' },
    {
      siteUrl: 'https://three.example',
      feedUrl: 'https://feeds.example/three?format=rss&limit=10',
    },
  ]);
});

test('rejects ambiguous or executable subscription configuration', () => {
  const invalid = [
    'const FRIEND_LIST = anotherList;',
    "const FRIEND_LIST = [{href: 'https://one.example', rss: getFeed()}];",
    "const FRIEND_LIST = [{href: 'https://one.example', ...more}];",
    "const FRIEND_LIST = [{href: 'https://one.example', ['rss']: 'https://one.example/rss'}];",
    "const FRIEND_LIST = [{rss: 'https://one.example/rss'}];",
    "const FRIEND_LIST = [{href: 'https://one.example', rss: 'javascript:alert(1)'}];",
    "const FRIEND_LIST = [{href: 'https://one.example', rss: ' https://one.example/rss'}];",
    "const FRIEND_LIST = [{href: 'https://one.example', rss: 'https://one.example/rss\\t'}];",
    "const FRIEND_LIST = [{href: 'https://one.example', rss: 'https://user:password@one.example/rss'}];",
    "const FRIEND_LIST = [{href: 'https://one.example', rss: 'https://one.example/rss', rss: 'https://one.example/feed'}];",
    "const FRIEND_LIST = [{href: 'https://one.example'}, {href: 'https://one.example/'}];",
    "const FRIEND_LIST = [{href: 'https://one.example', rss: 'https://feeds.example/rss'}, {href: 'https://two.example', rss: 'https://feeds.example/rss'}];",
  ];
  for (const source of invalid) assert.throws(() => getFriendFeedSources(source));
});

test('omitting rss produces no subscription', () => {
  assert.deepEqual(
    getFriendFeedSources("const FRIEND_LIST = [{href: 'https://one.example'}];"),
    []
  );
});
