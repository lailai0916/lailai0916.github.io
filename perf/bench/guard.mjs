import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import {
  argumentsMap,
  isolateExternal,
  openSearch,
  paint,
  scenarios,
  themeSelector,
} from './common.mjs';

const options = argumentsMap();
const require = createRequire(resolve(options.repo ?? process.cwd(), 'package.json'));
const { chromium } = require('playwright');
const directory = resolve(options.out ?? 'perf/results/guard');
const versions = {
  A: options.baseline ?? 'http://127.0.0.1:5200',
  ...(options.candidate ? { B: options.candidate } : {}),
};
const configurations = [
  { id: 'desktop-en-light', locale: 'en', theme: 'light', width: 1440, height: 1000 },
  { id: 'mobile-en-dark', locale: 'en', theme: 'dark', width: 390, height: 844 },
  { id: 'desktop-zh-dark', locale: 'zh-Hans', theme: 'dark', width: 1440, height: 1000 },
  { id: 'mobile-zh-light', locale: 'zh-Hans', theme: 'light', width: 390, height: 844 },
];
const routes = { ...scenarios, trie: '/docs/contest/string/trie' };
const report = {
  description: 'Functional, screenshot and SSR SEO guards; no timing claims.',
  screenshotTolerance: { maximumChannelDelta: 2, maximumChangedFraction: 0.005 },
  versions: {},
  comparisons: [],
  failures: [],
};
const hash = (value) => createHash('sha256').update(value).digest('hex');
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH ?? '/usr/bin/chromium',
  args: ['--no-sandbox'],
});
await mkdir(directory, { recursive: true });

async function check(label, name, operation) {
  try {
    await operation();
    report.versions[label].checks.push(name);
  } catch (error) {
    const failure = { version: label, name, error: String(error) };
    report.failures.push(failure);
    console.error(`FAIL ${label} ${name}: ${failure.error}`);
  }
}

async function screenshot(label, page, key) {
  await page.mouse.move(0, 0);
  await page.evaluate(() => document.activeElement?.blur());
  await page.evaluate(() => document.fonts.ready);
  await paint(page);
  const buffer = await page.screenshot({ animations: 'disabled' });
  await writeFile(join(directory, label, `${key}.png`), buffer);
  report.versions[label].screenshots[key] = hash(buffer);
  if (label === 'B') {
    const baseline = await readFile(join(directory, 'A', `${key}.png`));
    const byteIdentical = baseline.equals(buffer);
    const difference = byteIdentical
      ? { changedPixels: 0, changedFraction: 0, maximumChannelDelta: 0, bounds: null }
      : await page.evaluate(
          async ({ a, b }) => {
            const decode = async (base64) => {
              const bytes = Uint8Array.from(atob(base64), (character) => character.charCodeAt(0));
              return createImageBitmap(new Blob([bytes], { type: 'image/png' }));
            };
            const [first, second] = await Promise.all([decode(a), decode(b)]);
            if (first.width !== second.width || first.height !== second.height) {
              first.close();
              second.close();
              return {
                changedPixels: null,
                changedFraction: 1,
                maximumChannelDelta: 255,
                bounds: null,
              };
            }
            const canvas = new OffscreenCanvas(first.width, first.height);
            const context = canvas.getContext('2d', { willReadFrequently: true });
            context.drawImage(first, 0, 0);
            const firstPixels = context.getImageData(0, 0, first.width, first.height).data;
            context.clearRect(0, 0, first.width, first.height);
            context.drawImage(second, 0, 0);
            const secondPixels = context.getImageData(0, 0, second.width, second.height).data;
            let changedPixels = 0;
            let maximumChannelDelta = 0;
            const bounds = { left: first.width, top: first.height, right: 0, bottom: 0 };
            for (let index = 0; index < firstPixels.length; index += 4) {
              let changed = false;
              for (let channel = 0; channel < 4; channel++) {
                const delta = Math.abs(
                  firstPixels[index + channel] - secondPixels[index + channel]
                );
                if (delta) changed = true;
                maximumChannelDelta = Math.max(maximumChannelDelta, delta);
              }
              if (changed) {
                changedPixels++;
                const x = (index / 4) % first.width;
                const y = Math.floor(index / 4 / first.width);
                bounds.left = Math.min(bounds.left, x);
                bounds.top = Math.min(bounds.top, y);
                bounds.right = Math.max(bounds.right, x);
                bounds.bottom = Math.max(bounds.bottom, y);
              }
            }
            const changedFraction = changedPixels / first.width / first.height;
            first.close();
            second.close();
            return {
              changedPixels,
              changedFraction,
              maximumChannelDelta,
              bounds: changedPixels ? bounds : null,
            };
          },
          { a: baseline.toString('base64'), b: buffer.toString('base64') }
        );
    // Identical-build controls show tiny Chromium SVG/blur raster variation.
    const equal =
      difference.maximumChannelDelta <= report.screenshotTolerance.maximumChannelDelta &&
      difference.changedFraction <= report.screenshotTolerance.maximumChangedFraction;
    report.comparisons.push({ key, equal, byteIdentical, ...difference });
    assert.ok(equal, `${key}: screenshot pixels changed; inspect saved A/B PNGs`);
  }
}

async function ready(page) {
  await page.locator('h1').first().waitFor();
  await page.waitForFunction(
    (selector) => [...document.querySelectorAll(selector)].some((button) => !button.disabled),
    themeSelector
  );
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() =>
    [...document.querySelectorAll('svg.iconify')].every((icon) => icon.children.length > 0)
  );
  await paint(page);
}

async function themeChanges(page) {
  let button = page.locator(themeSelector).filter({ visible: true }).first();
  if (!(await button.count())) {
    await page.locator('.navbar__toggle').click();
    button = page.locator(themeSelector).filter({ visible: true }).first();
  }
  const original = await page.locator('html').getAttribute('data-theme');
  for (let i = 0; i < 3; i++) {
    await button.click();
    await paint(page);
    if ((await page.locator('html').getAttribute('data-theme')) !== original) break;
  }
  assert.notEqual(await page.locator('html').getAttribute('data-theme'), original);
  if (await page.locator('.navbar-sidebar--show').count()) {
    await page.locator('.navbar-sidebar__close').click();
  }
}

try {
  for (const [label, baseUrl] of Object.entries(versions)) {
    report.versions[label] = { baseUrl, checks: [], screenshots: {}, seo: {} };
    await mkdir(join(directory, label), { recursive: true });
    for (const configuration of configurations) {
      const context = await browser.newContext({
        viewport: { width: configuration.width, height: configuration.height },
        colorScheme: configuration.theme,
        reducedMotion: 'reduce',
        locale: 'en-US',
        permissions: ['clipboard-read', 'clipboard-write'],
      });
      const page = await context.newPage();
      page.setDefaultTimeout(10000);
      await isolateExternal(page);
      await page.addInitScript(() => {
        localStorage.clear();
        const NativeDate = Date;
        const fixed = Date.parse('2026-10-06T08:00:00.000Z');
        window.Date = class extends NativeDate {
          constructor(...args) {
            super(...(args.length ? args : [fixed]));
          }
          static now() {
            return fixed;
          }
        };
        window.__printCalls = 0;
        window.print = () => {
          window.__printCalls++;
        };
        window.__clipboard = null;
        Object.defineProperty(navigator, 'clipboard', {
          value: {
            writeText: async (text) => {
              window.__clipboard = text;
            },
          },
        });
      });
      for (const [key, route] of Object.entries(routes)) {
        const name = `${configuration.id}-${key}`;
        const pathname = configuration.locale === 'zh-Hans' ? `/zh-Hans${route}` : route;
        const errors = [];
        const onError = (error) => errors.push(error.message);
        const onConsole = (message) => {
          if (
            message.type() === 'error' &&
            /hydration|onRecoverableError|Suspense boundary|Minified React error|server rendered HTML/i.test(
              message.text()
            )
          )
            errors.push(message.text());
        };
        page.on('pageerror', onError);
        page.on('console', onConsole);
        await check(label, `${name}: HTTP, SEO, content and no hydration errors`, async () => {
          const response = await page.goto(`${baseUrl}${pathname}`, {
            waitUntil: 'domcontentloaded',
          });
          assert.equal(response.status(), 200);
          const html = await response.text();
          assert.ok(/<h1(?:\s|>)/.test(html));
          assert.ok(/<link[^>]*rel=canonical[^>]*>/.test(html));
          assert.ok(/<meta[^>]*name=description[^>]*>/.test(html));
          if (key === 'trie') {
            assert.ok(html.includes('P8306'));
            assert.ok(html.includes('【模板】字典树'));
            assert.ok(html.includes('查询'));
          }
          await ready(page);
          const seo = await page.evaluate(() => ({
            title: document.title,
            description: document.querySelector('meta[name="description"]')?.content,
            canonical: document.querySelector('link[rel="canonical"]')?.href,
            headings: [...document.querySelectorAll('h1,h2,h3')].map(
              (element) => element.textContent
            ),
            body: document.querySelector('.markdown')?.textContent,
            lang: document.documentElement.lang,
          }));
          assert.equal(seo.lang, configuration.locale);
          assert.equal(await page.locator('html').getAttribute('data-theme'), configuration.theme);
          assert.equal(errors.length, 0, errors.join('; '));
          report.versions[label].seo[name] = seo;
          if (label === 'B') assert.deepEqual(seo, report.versions.A.seo[name]);
          assert.ok(
            await page.evaluate(
              () => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1
            )
          );
        });
        await check(label, `${name}: unchanged initial layout`, () =>
          screenshot(label, page, name)
        );
        await check(label, `${name}: live theme button`, () => themeChanges(page));
        if (key === 'home') {
          await check(label, `${name}: search dialog accepts input`, async () => {
            try {
              await openSearch(page);
              await screenshot(label, page, `${name}-search`);
            } finally {
              if (await page.locator('.DocSearch-Input').isVisible()) {
                await page.keyboard.press('Escape');
                await page.locator('.DocSearch-Input').waitFor({ state: 'hidden' });
              }
            }
          });
          await check(label, `${name}: avatar drag and release`, async () => {
            const avatar = page.locator('button:has(img[alt="lailai"])');
            const box = await avatar.boundingBox();
            await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
            await page.mouse.down();
            await page.mouse.move(box.x + box.width / 2 + 36, box.y + box.height / 2 + 28);
            assert.equal(await avatar.getAttribute('data-dragging'), 'true');
            await page.mouse.up();
            assert.equal(await avatar.getAttribute('data-dragging'), null);
          });
        } else {
          await check(label, `${name}: copy original Markdown and print`, async () => {
            const copy = page.getByRole('button', {
              name: configuration.locale === 'en' ? 'Copy Markdown' : '复制 Markdown',
              exact: true,
            });
            await copy.click();
            await page.waitForFunction(() => typeof window.__clipboard === 'string');
            const sourcePath =
              configuration.locale === 'en'
                ? `docs${route.replace('/docs', '')}.mdx`
                : `i18n/zh-Hans/docusaurus-plugin-content-docs/current${route.replace('/docs', '')}.mdx`;
            let original;
            try {
              original = await readFile(resolve(options.repo ?? process.cwd(), sourcePath), 'utf8');
            } catch {
              original = await readFile(
                resolve(options.repo ?? process.cwd(), `docs${route.replace('/docs', '')}.mdx`),
                'utf8'
              );
            }
            assert.equal(await page.evaluate(() => window.__clipboard), original);
            await page
              .getByRole('button', {
                name: configuration.locale === 'en' ? 'Print this page' : '打印此页面',
                exact: true,
              })
              .click();
            assert.equal(await page.evaluate(() => window.__printCalls), 1);
          });
          if (key === 'trie')
            await check(label, `${name}: Problem statement, code tab and print`, async () => {
              const statement = page.getByRole('tab', {
                name: configuration.locale === 'en' ? 'Problem' : '题面',
                exact: true,
              });
              await page
                .getByRole('link', { name: '洛谷 P8306 【模板】字典树', exact: true })
                .waitFor();
              await statement.click();
              assert.equal(await statement.getAttribute('aria-selected'), 'false');
              await statement.click();
              await page
                .getByRole('link', { name: '洛谷 P8306 【模板】字典树', exact: true })
                .waitFor();
              const tabs = page.getByRole('tab');
              assert.ok((await tabs.count()) >= 2);
              await tabs.last().click();
              assert.ok((await page.locator('pre').last().textContent()).includes('#include'));
              await page.emulateMedia({ media: 'print' });
              assert.ok(await page.locator('pre').last().isVisible());
              await page.emulateMedia({ media: 'screen' });
            });
        }
        page.off('pageerror', onError);
        page.off('console', onConsole);
        console.log(`${label} ${name}: complete`);
      }
      await context.close();
    }
  }
} finally {
  await browser.close();
  await writeFile(join(directory, 'report.json'), JSON.stringify(report, null, 2) + '\n');
}
console.log(
  `Guard ${report.failures.length ? 'FAILED' : 'passed'}; ${report.failures.length} failures; ${directory}`
);
if (report.failures.length) process.exitCode = 1;
