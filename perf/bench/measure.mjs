import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { argumentsMap, isolateExternal, openSearch, scenarios, themeSelector } from './common.mjs';

const options = argumentsMap();
const require = createRequire(resolve(options.repo ?? process.cwd(), 'package.json'));
const { chromium } = require('playwright');
const runs = Number(options.runs ?? 10);
const width = Number(options.width ?? 1440);
const cpu = Number(options.cpu ?? 1);
const urls = { A: options.a ?? 'http://127.0.0.1:5200', ...(options.b ? { B: options.b } : {}) };
const selected = (options.cases ?? Object.keys(scenarios).join(',')).split(',');
const locale = options.locale ?? 'en';
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH ?? '/usr/bin/chromium',
  args: ['--no-sandbox'],
});
const result = {
  started: new Date().toISOString(),
  profile: {
    network: 'Fast 4G',
    latencyMs: 20,
    downBytesPerSecond: 524288,
    upBytesPerSecond: 393216,
    cpu,
    width,
    height: 900,
    locale,
    runs,
    cache: 'Disabled; new context for every observation',
    endpoint:
      'Theme changes on click; then fonts settle, contest code opens if applicable, and DocSearch accepts text',
    externalServices: 'Iconify JSON fixture; Algolia empty results fixture; analytics blocked',
  },
  paired: Boolean(options.b),
  results: {},
};

function percentile(values, p) {
  const sorted = values.toSorted((a, b) => a - b);
  if (!sorted.length) return null;
  const index = (sorted.length - 1) * p;
  const low = Math.floor(index);
  return (
    Math.round((sorted[low] + (sorted[Math.ceil(index)] - sorted[low]) * (index - low)) * 10) / 10
  );
}

async function measure(baseUrl, pathname) {
  const context = await browser.newContext({
    viewport: { width, height: 900 },
    locale: 'en-US',
    colorScheme: 'light',
  });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const cdp = await context.newCDPSession(page);
  await cdp.send('Network.enable');
  await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
  await cdp.send('Network.emulateNetworkConditions', {
    offline: false,
    latency: 20,
    downloadThroughput: 524288,
    uploadThroughput: 393216,
  });
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: cpu });
  await isolateExternal(page);
  await page.addInitScript((selector) => {
    window.__perf = {
      mounted: null,
      themeUsable: null,
      menuUsable: null,
      lcp: null,
      longtasks: [],
      shifts: [],
      clicks: 0,
    };
    for (const [type, key] of [
      ['largest-contentful-paint', 'lcp'],
      ['longtask', 'longtasks'],
      ['layout-shift', 'shifts'],
    ]) {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (key === 'lcp') window.__perf.lcp = entry.startTime;
          else if (key === 'longtasks') window.__perf.longtasks.push(entry.duration);
          else if (!entry.hadRecentInput) window.__perf.shifts.push(entry.value);
        }
      }).observe({ type, buffered: true });
    }
    let originalTheme;
    const probe = () => {
      const heading = document.querySelector('h1');
      if (window.__perf.mounted === null && heading?.getBoundingClientRect().height > 0) {
        window.__perf.mounted = performance.now();
      }
      const button = [...document.querySelectorAll(selector)].find((element) => {
        const rect = element.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        return (
          rect.width > 0 &&
          rect.height > 0 &&
          x >= 0 &&
          x < innerWidth &&
          y >= 0 &&
          y < innerHeight &&
          element.contains(document.elementFromPoint(x, y))
        );
      });
      const menu = document.querySelector('.navbar__toggle');
      if (menu?.getAttribute('aria-expanded') === 'true')
        window.__perf.menuUsable ??= performance.now();
      if (!button) {
        if (menu?.getBoundingClientRect().height > 0 && !menu.disabled) {
          if (menu.getAttribute('aria-expanded') !== 'true') menu.click();
        }
      }
      if (button && !button.disabled) {
        originalTheme ??= document.documentElement.dataset.theme;
        if (document.documentElement.dataset.theme !== originalTheme) {
          window.__perf.themeUsable = performance.now();
          return;
        }
        button.click();
        window.__perf.clicks++;
      }
      requestAnimationFrame(probe);
    };
    requestAnimationFrame(probe);
  }, themeSelector);
  const observation = { ok: true };
  try {
    const path = locale === 'zh-Hans' ? `/zh-Hans${pathname}` : pathname;
    const response = await page.goto(`${baseUrl}${path}`, { waitUntil: 'commit', timeout: 30000 });
    if (response.status() !== 200) throw new Error(`Unexpected HTTP ${response.status()}`);
    await page.waitForFunction(() => window.__perf.themeUsable !== null);
    const closeMenu = page.locator('.navbar-sidebar__close');
    if (await closeMenu.isVisible()) await closeMenu.click();
    observation.fontsReady = await page.evaluate(async () => {
      await document.fonts.ready;
      return performance.now();
    });
    if (pathname === scenarios.trie) {
      await page.getByRole('tab').last().click();
      await page.waitForFunction(() =>
        [...document.querySelectorAll('pre')].some((element) =>
          element.textContent.includes('#include')
        )
      );
      observation.problemUsable = await page.evaluate(() => performance.now());
    }
    await openSearch(page);
    observation.searchUsable = await page.evaluate(() => performance.now());
    await page.waitForTimeout(200);
    Object.assign(
      observation,
      await page.evaluate(() => {
        const navigation = performance.getEntriesByType('navigation')[0];
        const sameOrigin = performance
          .getEntriesByType('resource')
          .filter((entry) => new URL(entry.name).origin === location.origin);
        return {
          mounted: window.__perf.mounted,
          themeUsable: window.__perf.themeUsable,
          menuUsable: window.__perf.menuUsable,
          themeProbeClicks: window.__perf.clicks,
          lcp: window.__perf.lcp,
          longtaskMs: window.__perf.longtasks.reduce((sum, duration) => sum + duration, 0),
          cls: window.__perf.shifts.reduce((sum, value) => sum + value, 0),
          ttfb: navigation.responseStart,
          resourceEntries: sameOrigin.length + 1,
          transferBytes: sameOrigin.reduce(
            (sum, entry) => sum + entry.transferSize,
            navigation.transferSize
          ),
          jsBytes: sameOrigin
            .filter((entry) => new URL(entry.name).pathname.endsWith('.js'))
            .reduce((sum, entry) => sum + entry.encodedBodySize, 0),
          resources: sameOrigin.map((entry) => ({
            path: new URL(entry.name).pathname,
            bytes: entry.encodedBodySize,
            start: Math.round(entry.startTime),
            end: Math.round(entry.responseEnd),
          })),
        };
      })
    );
    if (width < 996 && !Number.isFinite(observation.menuUsable))
      throw new Error('Mobile menu endpoint was not observed');
    if (errors.length) throw new Error(errors.join('; '));
  } catch (error) {
    observation.ok = false;
    observation.error = String(error);
  } finally {
    await context.close();
  }
  return observation;
}

try {
  for (const key of selected) {
    if (!scenarios[key]) throw new Error(`Unknown scenario ${key}`);
    const observations = Object.fromEntries(Object.keys(urls).map((variant) => [variant, []]));
    for (let iteration = 0; iteration < runs; iteration++) {
      const order = iteration % 2 ? Object.keys(urls).reverse() : Object.keys(urls);
      for (const variant of order) {
        const observation = await measure(urls[variant], scenarios[key]);
        observations[variant].push(observation);
        console.log(
          `${key} ${iteration + 1}/${runs} ${variant}: ${
            observation.ok
              ? `theme ${Math.round(observation.themeUsable)}ms; search ${Math.round(observation.searchUsable)}ms`
              : observation.error
          }`
        );
      }
    }
    result.results[key] = Object.fromEntries(
      Object.entries(observations).map(([variant, samples]) => [
        variant,
        {
          url: `${urls[variant]}${locale === 'zh-Hans' ? '/zh-Hans' : ''}${scenarios[key]}`,
          summary: Object.fromEntries(
            [
              'mounted',
              'themeUsable',
              ...(width < 996 ? ['menuUsable'] : []),
              'fontsReady',
              ...(key === 'trie' ? ['problemUsable'] : []),
              'searchUsable',
              'lcp',
              'longtaskMs',
              'cls',
              'resourceEntries',
              'transferBytes',
              'jsBytes',
            ].map((metric) => [
              metric,
              Object.fromEntries(
                [
                  ['p50', 0.5],
                  ['p75', 0.75],
                  ['p95', 0.95],
                ].map(([label, p]) => [
                  label,
                  percentile(
                    samples
                      .filter((item) => item.ok && Number.isFinite(item[metric]))
                      .map((item) => item[metric]),
                    p
                  ),
                ])
              ),
            ])
          ),
          observations: samples,
        },
      ])
    );
  }
} finally {
  await browser.close();
  const output = resolve(options.output ?? 'perf/results/measurements.json');
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, JSON.stringify(result, null, 2) + '\n');
  console.log(`Saved ${output}`);
}
if (
  Object.values(result.results).some((variants) =>
    Object.values(variants).some((variant) => variant.observations.some((item) => !item.ok))
  )
)
  process.exitCode = 1;
