import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const themeSelector =
  'nav button[aria-label^="Switch between"], nav button[aria-label^="切换浅色"]';
export const scenarios = {
  home: '/',
  logic: '/docs/note/math/basic/logic',
  ui: '/docs/project/ui/application',
  trie: '/docs/contest/string/trie',
};

export function argumentsMap() {
  const result = {};
  for (let i = 2; i < process.argv.length; i += 2) {
    if (!process.argv[i].startsWith('--')) throw new Error(`Unexpected ${process.argv[i]}`);
    result[process.argv[i].slice(2)] = process.argv[i + 1];
  }
  return result;
}

const fixtureDirectory = join(dirname(fileURLToPath(import.meta.url)), 'fixtures');
const fixtures = Object.fromEntries(
  await Promise.all(
    ['lucide', 'simple-icons', 'tabler'].map(async (prefix) => [
      prefix,
      JSON.parse(await readFile(join(fixtureDirectory, `${prefix}.json`), 'utf8')),
    ])
  )
);

export async function isolateExternal(page) {
  await page.route('https://analytics.lailai.one/**', (route) => route.abort());
  await page.route(
    /^https:\/\/(api\.iconify\.design|api\.simplesvg\.com|api\.unisvg\.com)\//,
    async (route) => {
      const prefix = new URL(route.request().url()).pathname.slice(1).split('.')[0];
      if (!fixtures[prefix]) return route.abort();
      await route.fulfill({
        contentType: 'application/json',
        headers: { 'access-control-allow-origin': '*' },
        body: JSON.stringify(fixtures[prefix]),
      });
    }
  );
  await page.route(/^https:\/\/[^/]+\.algolia(net|\.net|\.io|\.com)\//, async (route) => {
    const body = route.request().postDataJSON();
    await route.fulfill({
      contentType: 'application/json',
      headers: { 'access-control-allow-origin': '*' },
      body: JSON.stringify({
        results: (body?.requests ?? [{}]).map(() => ({
          hits: [],
          nbHits: 0,
          page: 0,
          nbPages: 0,
          hitsPerPage: 20,
          processingTimeMS: 0,
        })),
      }),
    });
  });
}

export async function openSearch(page) {
  await page.locator('.DocSearch-Button').click();
  const input = page.locator('.DocSearch-Input');
  await input.waitFor({ state: 'visible' });
  await input.fill('logic');
  await page.waitForFunction(() => document.querySelector('.DocSearch-Input')?.value === 'logic');
  return input;
}

export async function paint(page) {
  await page.evaluate(
    () => new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done)))
  );
}
