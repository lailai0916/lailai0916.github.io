import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { argumentsMap, isolateExternal, paint, themeSelector } from './common.mjs';

const options = argumentsMap();
assert.ok(options.chunk, '--chunk must identify the candidate Problem JavaScript URL');
const require = createRequire(resolve(options.repo ?? process.cwd(), 'package.json'));
const { chromium } = require('playwright');
const baseUrl = options.url ?? 'http://127.0.0.1:5201';
const delayMs = Number(options.delay ?? 2000);
const preloaded = options.preloaded !== 'false';
const chunkPattern = new RegExp(options.chunk);
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH ?? '/usr/bin/chromium',
  args: ['--no-sandbox'],
});
const report = {
  description: 'Delayed JavaScript hydration guard; no performance comparison.',
  baseUrl,
  delayMs,
  preloaded,
  cases: [],
};
const titleSelector = '[role="tabpanel"] a[href="https://www.luogu.com.cn/problem/P8306"]';

async function problemWorks(page, locale) {
  const tab = page.getByRole('tab', { name: locale === 'en' ? 'Problem' : '题面', exact: true });
  await tab.waitFor();
  if ((await tab.getAttribute('aria-selected')) !== 'true') await tab.click();
  await page.locator(titleSelector).waitFor({ state: 'visible' });
  await tab.click();
  assert.equal(await tab.getAttribute('aria-selected'), 'false');
  await tab.click();
  assert.equal(await tab.getAttribute('aria-selected'), 'true');
  await page.getByRole('tab').last().click();
  assert.ok((await page.locator('pre').last().textContent()).includes('#include'));
  await page.emulateMedia({ media: 'print' });
  assert.ok(await page.locator('pre').last().isVisible());
  await page.emulateMedia({ media: 'screen' });
}

try {
  for (const locale of ['en', 'zh-Hans']) {
    const prefix = locale === 'en' ? '' : '/zh-Hans';
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    page.setDefaultTimeout(20000);
    const cdp = await context.newCDPSession(page);
    await cdp.send('Network.enable');
    await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: Number(options.cpu ?? 4) });
    const errors = [];
    const delayed = [];
    let resolveHeldRequest;
    const heldRequest = new Promise((done) => {
      resolveHeldRequest = done;
    });
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
      if (
        message.type() === 'error' &&
        /hydration|onRecoverableError|Suspense boundary|Minified React error|server rendered HTML/i.test(
          message.text()
        )
      )
        errors.push(message.text());
    });
    await isolateExternal(page);
    await page.route(`${baseUrl}/**`, async (route) => {
      if (chunkPattern.test(new URL(route.request().url()).pathname)) {
        const item = { url: route.request().url(), started: Date.now(), resumed: null };
        delayed.push(item);
        resolveHeldRequest(item);
        await new Promise((done) => setTimeout(done, delayMs));
        item.resumed = Date.now();
      }
      await route.continue();
    });
    await page.addInitScript((selector) => {
      window.__problemContinuity = { observed: false, disappeared: false, samples: 0 };
      const sample = () => {
        const element = document.querySelector(selector);
        const visible =
          element?.getBoundingClientRect().height > 0 && !element.closest('[aria-hidden="true"]');
        if (visible) window.__problemContinuity.observed = true;
        else if (window.__problemContinuity.observed) window.__problemContinuity.disappeared = true;
        window.__problemContinuity.samples++;
        requestAnimationFrame(sample);
      };
      requestAnimationFrame(sample);
    }, titleSelector);
    const observation = { locale, ok: true };
    try {
      const response = await page.goto(`${baseUrl}${prefix}/docs/contest/string/trie`, {
        waitUntil: 'commit',
      });
      assert.equal(response.status(), 200);
      await page.waitForFunction(() => window.__problemContinuity.observed);
      let requestTimeout;
      try {
        await Promise.race([
          heldRequest,
          new Promise((_, reject) => {
            requestTimeout = setTimeout(
              () => reject(new Error('No matching Problem request')),
              20000
            );
          }),
        ]);
      } finally {
        clearTimeout(requestTimeout);
      }
      assert.ok(delayed.length, 'No matching JavaScript request was delayed');
      const button = page.locator(themeSelector).filter({ visible: true }).first();
      const summary = page.getByRole('button', {
        name: locale === 'en' ? 'Summary' : '概述',
        exact: true,
      });
      if (preloaded) {
        assert.ok(
          delayed.some((item) => item.resumed === null),
          'The chunk finished before the preload guard'
        );
        assert.equal(
          await button.isDisabled(),
          true,
          'Route hydrated before its required Problem chunk'
        );
        const originalTheme = await page.locator('html').getAttribute('data-theme');
        await button.evaluate((element) => element.click());
        await summary.evaluate((element) => element.click());
        await paint(page);
        assert.equal(await button.isDisabled(), true);
        assert.equal(await page.locator('html').getAttribute('data-theme'), originalTheme);
        assert.equal(await summary.getAttribute('aria-expanded'), 'false');
        observation.pendingControls =
          'SSR controls stayed inert until required route JavaScript loaded';
      }
      await page.waitForFunction(
        (selector) => [...document.querySelectorAll(selector)].some((element) => !element.disabled),
        themeSelector
      );
      if (!preloaded)
        assert.ok(
          delayed.some((item) => item.resumed === null),
          'The chunk finished before the early interaction'
        );
      const theme = await page.locator('html').getAttribute('data-theme');
      for (
        let i = 0;
        i < 3 && (await page.locator('html').getAttribute('data-theme')) === theme;
        i++
      ) {
        await button.click();
        await paint(page);
      }
      await summary.click();
      assert.equal(await summary.getAttribute('aria-expanded'), 'true');
      await page.waitForTimeout(delayMs + 300);
      const continuity = await page.evaluate(() => window.__problemContinuity);
      assert.ok(continuity.observed);
      assert.equal(
        continuity.disappeared,
        false,
        'Server-rendered Problem disappeared during delayed hydration'
      );
      assert.equal(errors.length, 0, errors.join('; '));
      await problemWorks(page, locale);
      observation.continuity = continuity;
      observation.delayed = delayed;
      await page.goto(`${baseUrl}${prefix}/docs/note/math/basic/logic`, {
        waitUntil: 'domcontentloaded',
      });
      const navigationOrigin = await page.evaluate(() => performance.timeOrigin);
      await page.locator(`nav a[href="${prefix}/docs/contest"]`).first().click();
      await page.locator(`a[href="${prefix}/docs/category/字符串"]`).first().click();
      await page.locator(`main a[href="${prefix}/docs/contest/string/trie"]`).first().click();
      await page.waitForURL(`${baseUrl}${prefix}/docs/contest/string/trie`);
      await problemWorks(page, locale);
      assert.equal(
        await page.evaluate(() => performance.timeOrigin),
        navigationOrigin,
        'Navigation performed a hard reload'
      );
      assert.equal(errors.length, 0, errors.join('; '));
      observation.spaNavigation = true;
    } catch (error) {
      observation.ok = false;
      observation.error = String(error);
      observation.errors = errors;
      observation.delayed = delayed;
      observation.continuity = await page
        .evaluate(() => window.__problemContinuity)
        .catch(() => null);
      console.error(`${locale}: ${observation.error}`);
    }
    report.cases.push(observation);
    await context.close();
  }
} finally {
  await browser.close();
  const output = resolve(options.output ?? 'perf/results/slow-problem.json');
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, JSON.stringify(report, null, 2) + '\n');
}
if (report.cases.some((item) => !item.ok)) process.exitCode = 1;
