import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { gzipSync } from 'node:zlib';

const variant = process.env.BENCH_VARIANT;
const resultsDir = process.env.RUNNER_TEMP || '/tmp';
const outputDir = path.join(resultsDir, `benchmark-${variant}`);
mkdirSync(outputDir, { recursive: true });
const args = ['run', 'build'];
if (process.env.BENCH_LOCALE) args.push('--', '--locale', process.env.BENCH_LOCALE);
const startedAt = Date.now();
const markers = [];
let output = '';
let pending = '';
const child = spawn('/usr/bin/time', ['-v', 'npm', ...args], {
  env: {
    ...process.env,
    DOCUSAURUS_PERF_LOGGER: 'true',
    NODE_OPTIONS: `${process.env.NODE_OPTIONS || ''} --require=${path.resolve('scripts/ci/trace-exit.cjs')}`,
  },
  stdio: ['ignore', 'pipe', 'pipe'],
});
function receive(data) {
  const text = data.toString();
  output += text;
  process.stdout.write(text);
  pending += text;
  const lines = pending.split('\n');
  pending = lines.pop();
  for (const line of lines) {
    if (
      /Creating an optimized production build|Generated static files|test your build locally/.test(
        line
      )
    ) {
      markers.push({
        elapsedMs: Date.now() - startedAt,
        line: line.replace(/\x1b\[[0-9;]*m/g, ''),
      });
    }
  }
}
child.stdout.on('data', receive);
child.stderr.on('data', receive);
const exitCode = await new Promise((resolve) => child.on('close', resolve));
const wallMs = Date.now() - startedAt;
writeFileSync(path.join(outputDir, 'build.log'), output);
function files(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? files(file) : [file];
  });
}
const result = { variant, attempt: process.env.GITHUB_RUN_ATTEMPT, exitCode, wallMs, markers };
if (exitCode === 0) {
  const locales = process.env.BENCH_LOCALE ? [process.env.BENCH_LOCALE] : ['en', 'zh-Hans'];
  result.locales = locales.map((locale) => {
    const root = process.env.BENCH_LOCALE || locale === 'en' ? 'build' : 'build/zh-Hans';
    const prefix = locale === 'en' ? '' : '/zh-Hans';
    const sitemap = readFileSync(`${root}/sitemap.xml`, 'utf8');
    const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
    if (urls.length !== 546) throw new Error(`Unexpected ${locale} sitemap size: ${urls.length}`);
    const routes = [
      '',
      '/about',
      '/travel',
      '/resources',
      '/settings',
      '/insights',
      '/privacy',
      '/blog',
      '/blog/archive',
      '/blog/overview',
      '/docs/project/ui',
    ];
    for (const route of routes) {
      const file = route ? `${root}${route}.html` : `${root}/index.html`;
      if (!existsSync(file)) throw new Error(`Missing route ${file}`);
      const html = readFileSync(file, 'utf8');
      if (!html.includes(`https://lailai.one${prefix}${route || '/'}`))
        throw new Error(`Incorrect URL in ${file}`);
      if (!html.includes('apple-touch-icon')) throw new Error(`Missing icon in ${file}`);
    }
    return { locale, sitemapUrls: urls.length, routesChecked: routes.length };
  });
  const builtFiles = files('build');
  const scripts = builtFiles.filter((file) => file.endsWith('.js'));
  const htmlManifest = builtFiles
    .filter((file) => file.endsWith('.html'))
    .map((file) => {
      const html = readFileSync(file, 'utf8');
      return {
        file: file.slice(6),
        title: html.match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1],
        canonical: html.match(/<link[^>]*rel=["']canonical["'][^>]*>/)?.[0],
        headings: [...html.matchAll(/<h[1-6]\b[^>]*>([\s\S]*?)<\/h[1-6]>/g)].map((match) =>
          match[1].replace(/<[^>]*>/g, '')
        ),
      };
    })
    .sort((a, b) => a.file.localeCompare(b.file));
  const manifest = JSON.stringify(htmlManifest);
  writeFileSync(path.join(outputDir, 'html-manifest.json'), `${manifest}\n`);
  result.htmlManifestSha256 = createHash('sha256').update(manifest).digest('hex');
  result.output = {
    files: builtFiles.length,
    bytes: builtFiles.reduce((sum, file) => sum + statSync(file).size, 0),
    jsBytes: scripts.reduce((sum, file) => sum + statSync(file).size, 0),
    jsGzipBytes: scripts.reduce((sum, file) => sum + gzipSync(readFileSync(file)).length, 0),
  };
}
writeFileSync(path.join(outputDir, 'result.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log('[BENCH-20260918]', JSON.stringify(result));
process.exitCode = exitCode;
