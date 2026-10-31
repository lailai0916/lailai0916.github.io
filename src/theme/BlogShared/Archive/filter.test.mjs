import assert from 'node:assert/strict';
import test from 'node:test';
import { getDateKey } from '../../../utils/dateTime.ts';
import { scopeArchivePosts, searchArchivePosts } from './filter.ts';

const posts = [
  { title: 'Shared title', date: '2024-06-01T00:00:00+08:00', tags: ['Design'], author: 'One' },
  { title: 'Shared title', date: '2025-06-01T00:00:00+08:00', tags: ['Code'], author: 'Two' },
  { title: 'A new year', date: '2026-01-01T00:30:00+08:00', tags: ['Design'], author: 'Two' },
];
const values = (post) => [post.title, ...post.tags, post.author];
const getYear = (post) => Number(getDateKey(post.date, 'Asia/Shanghai').slice(0, 4));

test('search intersects the active year and clearing it retains that scope', () => {
  const scope = scopeArchivePosts(posts, undefined, 2025, getYear);
  assert.deepEqual(searchArchivePosts(scope, ' shared ', 'en', values), [posts[1]]);
  assert.deepEqual(searchArchivePosts(scope, '', 'en', values), [posts[1]]);
  assert.deepEqual(searchArchivePosts(scope, 'Design', 'en', values), []);
});

test('tag and author selections cannot leak matching posts from the full archive', () => {
  const tagPosts = posts.filter((post) => post.tags.includes('Design'));
  const tagScope = scopeArchivePosts(posts, tagPosts, null, getYear);
  assert.deepEqual(searchArchivePosts(tagScope, 'shared', 'en', values), [posts[0]]);
  const authorPosts = posts.filter((post) => post.author === 'Two');
  const authorScope = scopeArchivePosts(posts, authorPosts, null, getYear);
  assert.deepEqual(searchArchivePosts(authorScope, 'shared', 'en', values), [posts[1]]);
  assert.deepEqual(searchArchivePosts(authorScope, 'one', 'en', values), []);
});

test('year filtering uses the same visitor calendar as the archive grouping', () => {
  const scope = scopeArchivePosts(posts, undefined, 2025, (post) =>
    Number(getDateKey(post.date, 'America/Los_Angeles').slice(0, 4))
  );
  assert.deepEqual(searchArchivePosts(scope, 'new year', 'en', values), [posts[2]]);
});
