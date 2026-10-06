import { createServer } from 'node:http';
import { readFile, readdir } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';
import { gzipSync } from 'node:zlib';

const root = resolve(process.argv[2]);
const port = Number(process.argv[3] ?? 5200);
const files = new Map();
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

async function collect(directory, prefix = '') {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const relative = `${prefix}/${entry.name}`;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await collect(path, relative);
    else {
      const body = await readFile(path);
      files.set(relative, { body, gzip: gzipSync(body, { level: 9 }), type: types[extname(path)] });
    }
  }
}

await collect(root);
createServer((request, response) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  } catch {
    response.writeHead(400).end();
    return;
  }
  const key = pathname.endsWith('/') ? `${pathname}index.html` : pathname;
  const asset =
    files.get(key) ??
    (!extname(key) ? (files.get(`${key}.html`) ?? files.get(`${key}/index.html`)) : undefined);
  const result = asset ?? files.get('/404.html');
  if (!result) {
    response.writeHead(404).end();
    return;
  }
  const compressed = /\bgzip\b/.test(request.headers['accept-encoding'] ?? '');
  const body = compressed ? result.gzip : result.body;
  response.writeHead(asset ? 200 : 404, {
    'Content-Type': result.type ?? 'application/octet-stream',
    'Content-Length': body.length,
    'Cache-Control': 'no-store',
    Vary: 'Accept-Encoding',
    ...(compressed ? { 'Content-Encoding': 'gzip' } : {}),
  });
  response.end(request.method === 'HEAD' ? undefined : body);
}).listen(port, '127.0.0.1', () => console.log(`Serving ${root} at http://127.0.0.1:${port}`));
