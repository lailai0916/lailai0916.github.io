import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(path.resolve(process.cwd(), 'package.json'));
const { parseDocument, DomUtils } = require('htmlparser2');
const [baseline = 'baseline-build', candidate = 'build', output = 'perf/results/ssr-parity.json'] =
  process.argv.slice(2);
const hash = (value) => createHash('sha256').update(value).digest('hex');
const hasClass = (node, token) => node.attribs?.class?.split(/\s+/).includes(token);

function htmlFiles(root, directory = root) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory()
      ? htmlFiles(root, file)
      : entry.name.endsWith('.html')
        ? [path.relative(root, file)]
        : [];
  });
}

function inspect(file) {
  const document = parseDocument(fs.readFileSync(file, 'utf8'));
  const elements = DomUtils.findAll(
    (node) => node.type === 'tag' || node.type === 'script' || node.type === 'style',
    document.children
  );
  const markdown = elements.filter((node) => {
    if (!hasClass(node, 'markdown')) return false;
    for (let parent = node.parent; parent; parent = parent.parent)
      if (hasClass(parent, 'markdown')) return false;
    return true;
  });
  const headings = elements
    .filter((node) => /^h[1-6]$/.test(node.name))
    .map((node) => ({
      tag: node.name,
      id: node.attribs.id ?? '',
      text: DomUtils.textContent(node),
    }));
  const head = elements.find((node) => node.name === 'head');
  assert(head, `Head missing: ${file}`);
  const headElements = DomUtils.findAll((node) => node.type === 'tag', head.children);
  const seo = {
    title: headElements.filter((node) => node.name === 'title').map(DomUtils.textContent),
    description: headElements
      .filter((node) => node.name === 'meta' && node.attribs.name === 'description')
      .map((node) => node.attribs.content),
    canonical: headElements
      .filter((node) => node.name === 'link' && node.attribs.rel === 'canonical')
      .map((node) => node.attribs.href),
  };
  return {
    markdown: markdown.map((node) => DomUtils.textContent(node)),
    headings,
    seo,
    problemPanels: elements.filter((node) =>
      node.attribs?.class?.split(/\s+/).some((token) => token.startsWith('problemPanel_'))
    ).length,
  };
}

function difference(before, after) {
  const a = typeof before === 'string' ? before : JSON.stringify(before);
  const b = typeof after === 'string' ? after : JSON.stringify(after);
  let index = 0;
  while (index < Math.min(a.length, b.length) && a[index] === b[index]) index++;
  return {
    index,
    beforeLength: a.length,
    afterLength: b.length,
    before: a.slice(Math.max(0, index - 80), index + 180),
    after: b.slice(Math.max(0, index - 80), index + 180),
  };
}

const beforeFiles = new Set(htmlFiles(baseline)),
  afterFiles = new Set(htmlFiles(candidate));
const report = {
  baseline,
  candidate,
  compared: 0,
  pagesWithMarkdown: 0,
  pagesWithoutMarkdown: 0,
  problemPages: 0,
  problemPanels: 0,
  missing: [...beforeFiles].filter((file) => !afterFiles.has(file)),
  added: [...afterFiles].filter((file) => !beforeFiles.has(file)),
  mismatches: [],
  pages: [],
};
for (const file of [...beforeFiles].sort()) {
  if (!afterFiles.has(file)) continue;
  const before = inspect(path.join(baseline, file)),
    after = inspect(path.join(candidate, file));
  const mismatches = {};
  for (const key of ['markdown', 'headings', 'seo', 'problemPanels']) {
    if (JSON.stringify(before[key]) !== JSON.stringify(after[key]))
      mismatches[key] = difference(before[key], after[key]);
  }
  if (Object.keys(mismatches).length) report.mismatches.push({ file, mismatches });
  report.compared++;
  if (before.markdown.length) report.pagesWithMarkdown++;
  else report.pagesWithoutMarkdown++;
  if (before.problemPanels) report.problemPages++;
  report.problemPanels += before.problemPanels;
  report.pages.push({
    file,
    markdownRoots: before.markdown.length,
    markdownSha256: hash(JSON.stringify(before.markdown)),
    headingsSha256: hash(JSON.stringify(before.headings)),
    seoSha256: hash(JSON.stringify(before.seo)),
    problemPanels: before.problemPanels,
  });
}
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
const { pages, ...summary } = report;
console.log(JSON.stringify(summary, null, 2));
if (report.missing.length || report.added.length || report.mismatches.length) process.exitCode = 1;
