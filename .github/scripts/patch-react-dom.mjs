import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

const require = createRequire(import.meta.url);
const packagePath = require.resolve('react-dom/package.json');
const { version } = JSON.parse(readFileSync(packagePath, 'utf8'));

if (version !== '18.3.1') {
  throw new Error(
    `React DOM SSR patch requires 18.3.1; found ${version}. Review the upstream fix.`
  );
}

// React 18 flushes unwritten NUL bytes when a UTF-8 character crosses a chunk boundary.
// Backport https://github.com/react/react/pull/26228; see https://github.com/react/react/issues/31134.
const patches = [
  {
    file: 'react-dom-server.node.production.min.js',
    before: 'd<b.length&&(t(a,k),k=new Uint8Array(2048)',
    after: 'd<b.length&&(t(a,k.subarray(0,l)),k=new Uint8Array(2048)',
  },
  {
    file: 'react-dom-server.node.development.js',
    before:
      'if (read < stringChunk.length) {\n    writeToDestination(destination, currentView);\n    currentView = new Uint8Array(VIEW_SIZE);',
    after:
      'if (read < stringChunk.length) {\n    writeToDestination(destination, currentView.subarray(0, writtenBytes));\n    currentView = new Uint8Array(VIEW_SIZE);',
  },
].map(({ file, before, after }) => {
  const path = join(dirname(packagePath), 'cjs', file);
  const source = readFileSync(path, 'utf8');
  const beforeCount = source.split(before).length - 1;
  const afterCount = source.split(after).length - 1;

  if (beforeCount === 1 && afterCount === 0) {
    return { path, file, source: source.replace(before, after), changed: true };
  }
  if (beforeCount === 0 && afterCount === 1) {
    return { path, file, source, changed: false };
  }
  throw new Error(
    `React DOM SSR patch context mismatch in ${file}: ${beforeCount} original, ${afterCount} patched. No files were changed.`
  );
});

for (const { path, file, source, changed } of patches) {
  if (changed) writeFileSync(path, source);
  console.log(`React DOM SSR patch: ${file} ${changed ? 'applied' : 'already applied'}.`);
}
