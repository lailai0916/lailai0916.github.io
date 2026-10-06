import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { gzipSync, inflateSync } from 'node:zlib';

const require = createRequire(path.resolve(process.cwd(), 'package.json'));
const { parseDocument, DomUtils } = require('htmlparser2');
const { decodeXML } = require('entities');
const args = Object.fromEntries(
  process.argv.slice(2).reduce((pairs, value, index, values) => {
    if (value.startsWith('--')) pairs.push([value.slice(2), values[index + 1]]);
    return pairs;
  }, [])
);
assert(args.a && args.b, 'Usage: node assets.mjs --a baseline --b candidate');
const roots = { a: path.resolve(args.a), b: path.resolve(args.b) };
const digest = (bytes) => createHash('sha256').update(bytes).digest('hex');
const size = (bytes) => ({ raw: bytes.length, gzip: gzipSync(bytes, { level: 9 }).length });
const read = (root, url) =>
  fs.readFileSync(path.join(root, new URL(url, 'https://lailai.one').pathname));
const isFont = (url) => /\.(?:woff2?|ttf|eot|otf)(?:[?#]|$)/i.test(url);
const fontBytes = (root, url) =>
  url.startsWith('data:') ? Buffer.from(url.split(',')[1], 'base64') : read(root, url);
const faces = (root, css) =>
  [...css.matchAll(/@font-face\{[^}]+\}/g)].map(([rule]) =>
    rule.replace(
      /url\(["']?([^\)"']+)["']?\)/g,
      (_match, url) => `url(sha256:${digest(fontBytes(root, url))})`
    )
  );

function entries(root, locale) {
  const html = fs.readFileSync(
    path.join(root, locale ? 'zh-Hans/index.html' : 'index.html'),
    'utf8'
  );
  const nodes = DomUtils.findAll(
    (node) => node.type === 'tag' || node.type === 'script',
    parseDocument(html).children
  );
  return nodes.flatMap(({ name, attribs }) => {
    if (name === 'link' && attribs.rel === 'stylesheet')
      return [{ kind: 'css', url: attribs.href }];
    if (name === 'script' && attribs.src && !/^https?:/.test(attribs.src))
      return [{ kind: 'js', url: attribs.src }];
    return [];
  });
}

function fontFiles(root) {
  const found = new Map();
  for (const dir of ['assets/fonts', 'zh-Hans/assets/fonts']) {
    const base = path.join(root, dir);
    if (!fs.existsSync(base)) continue;
    for (const file of fs.readdirSync(base).filter(isFont)) {
      const bytes = fs.readFileSync(path.join(base, file));
      found.set(digest(bytes), bytes);
    }
  }
  return found;
}

function png(svg) {
  const source = svg.toString();
  const match = /data:image\/png;base64,([^"']*)/.exec(source);
  assert(match, 'Logo must contain its embedded PNG');
  const bytes = Buffer.from(decodeXML(match[1]), 'base64');
  assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
  const chunks = [],
    data = [];
  for (let offset = 8; offset < bytes.length; ) {
    const length = bytes.readUInt32BE(offset);
    assert(offset + 12 + length <= bytes.length, 'Truncated PNG chunk');
    const kind = bytes.subarray(offset + 4, offset + 8).toString();
    if (kind === 'IDAT') data.push(bytes.subarray(offset + 8, offset + 8 + length));
    else chunks.push(bytes.subarray(offset, offset + 12 + length));
    offset += 12 + length;
  }
  return {
    outer: source.slice(0, match.index) + source.slice(match.index + match[0].length),
    chunks: Buffer.concat(chunks),
    scanlines: inflateSync(Buffer.concat(data)),
    png: bytes.length,
  };
}

const candidateFonts = fontFiles(roots.b);
const result = { locales: {}, fontData: {}, logo: {} };
for (const locale of ['', 'zh-Hans']) {
  const before = entries(roots.a, locale),
    after = entries(roots.b, locale);
  const summary = (root, assets) =>
    assets.map(({ kind, url }) => ({ kind, url, ...size(read(root, url)) }));
  result.locales[locale || 'en'] = { a: summary(roots.a, before), b: summary(roots.b, after) };
  let embedded = 0,
    external = 0,
    decodedBytes = 0;
  const baselineFaces = [];
  for (const asset of before.filter(({ kind }) => kind === 'css')) {
    const css = read(roots.a, asset.url).toString();
    baselineFaces.push(...faces(roots.a, css));
    for (const match of css.matchAll(
      /url\(["']?(data:font\/[^;]+;base64,([A-Za-z0-9+/=]+))["']?\)/g
    )) {
      const bytes = Buffer.from(match[2], 'base64');
      assert(
        candidateFonts.has(digest(bytes)),
        'Embedded baseline font is missing from candidate assets'
      );
      assert.deepEqual(candidateFonts.get(digest(bytes)), bytes);
      embedded++;
      decodedBytes += bytes.length;
    }
    for (const match of css.matchAll(/url\(["']?([^\)"']+)["']?\)/g)) {
      if (!isFont(match[1]) || match[1].startsWith('data:')) continue;
      const bytes = read(roots.a, match[1]);
      assert.deepEqual(
        candidateFonts.get(digest(bytes)),
        bytes,
        'Previously external font changed or is missing'
      );
      external++;
    }
  }
  const candidateCss = after
    .filter(({ kind }) => kind === 'css')
    .map(({ url }) => read(roots.b, url).toString())
    .join('');
  assert(!/data:font\//.test(candidateCss), 'Candidate still embeds font data');
  assert.deepEqual(
    faces(roots.b, candidateCss),
    baselineFaces,
    'Font faces or their referenced bytes changed'
  );
  result.fontData[locale || 'en'] = {
    faces: baselineFaces.length,
    embedded,
    external,
    decodedBytes,
    uniqueCandidateFontHashes: candidateFonts.size,
  };
}

const logos = Object.fromEntries(
  Object.entries(roots).map(([key, root]) => [
    key,
    fs.readFileSync(path.join(root, 'img/logo.svg')),
  ])
);
const a = png(logos.a),
  b = png(logos.b);
assert.equal(a.outer, b.outer, 'SVG outer markup changed');
assert.deepEqual(a.chunks, b.chunks, 'PNG metadata changed');
assert.deepEqual(a.scanlines, b.scanlines, 'PNG decoded scanlines changed');
result.logo = {
  a: { ...size(logos.a), png: a.png },
  b: { ...size(logos.b), png: b.png },
  scanlines: a.scanlines.length,
  sha256: digest(a.scanlines),
};
console.log(JSON.stringify(result, null, 2));
