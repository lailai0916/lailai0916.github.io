import assert from 'node:assert/strict';
import { compile, run } from '@mdx-js/mdx';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as jsxRuntime from 'react/jsx-runtime';
import remarkProblem from '../../src/remark/remarkProblem.ts';

const problemSource = '@site/src/components/Problem';
const fixtures = [
  { name: 'ordinary document', mdx: '# Ordinary page', imports: 0, rendered: [] },
  { name: 'block JSX', mdx: '<Problem id="P8306" />', imports: 1, rendered: ['P8306'] },
  {
    name: 'inline JSX',
    mdx: 'Read <Problem id="P8306" /> here.',
    imports: 1,
    rendered: ['P8306'],
  },
  {
    name: 'multiple instances',
    mdx: '<Problem id="P8306" />\n\n<Problem id="P1001" />',
    imports: 1,
    rendered: ['P8306', 'P1001'],
  },
  {
    name: 'conditional JSX',
    mdx: '{true && <Problem id="P8306" />}',
    imports: 1,
    rendered: ['P8306'],
  },
  {
    name: 'inactive conditional JSX',
    mdx: '{false && <Problem id="P8306" />}',
    imports: 1,
    rendered: [],
  },
  {
    name: 'exported JSX helper',
    mdx: 'export function Demo() { return <Problem id="P8306" />; }\n\n<Demo />',
    imports: 1,
    rendered: ['P8306'],
  },
  {
    name: 'JSX property',
    mdx: '<Card content={<Problem id="P8306" />} />',
    imports: 1,
    rendered: ['P8306'],
  },
  {
    name: 'explicit default import',
    mdx: 'import Problem from \'./custom\';\n\n<Problem id="P8306" />',
    imports: 0,
    rendered: [],
    explicit: true,
  },
  {
    name: 'explicit named import',
    mdx: 'import { Custom as Problem } from \'./custom\';\n\n<Problem id="P8306" />',
    imports: 0,
    rendered: [],
    explicit: true,
  },
  {
    name: 'fenced example',
    mdx: '```mdx\n<Problem id="P8306" />\n```',
    imports: 0,
    rendered: [],
  },
  {
    name: 'expression containing only text',
    mdx: '{\'<Problem id="P8306" />\'}',
    imports: 0,
    rendered: [],
  },
];

function visit(value, callback) {
  if (value === null || typeof value !== 'object') return;
  callback(value);
  for (const child of Object.values(value)) visit(child, callback);
}

function importedStub(marker) {
  return `data:text/javascript,${encodeURIComponent(
    `export function Custom({ id }) { return ${JSON.stringify(marker)} + id; }
export default Custom;`
  )}`;
}

function linkImports(imports) {
  return () => (tree) => {
    visit(tree, (node) => {
      if (node.type !== 'ImportExpression') return;
      const source = node.source.type === 'Literal' ? node.source : node.source.arguments?.[0];
      assert.equal(source?.type, 'Literal', 'The compiler must expose a static module import');
      imports.push(source.value);
      assert.ok(
        source.value === problemSource || source.value === './custom',
        `Unexpected module ${source.value}`
      );
      source.value = importedStub(source.value === problemSource ? 'actual:' : 'explicit:');
      delete source.raw;
    });
  };
}

for (const fixture of fixtures) {
  const imports = [];
  const compiled = await compile(fixture.mdx, {
    outputFormat: 'function-body',
    remarkPlugins: [remarkProblem, () => remarkProblem()],
    recmaPlugins: [linkImports(imports)],
  });
  assert.equal(
    imports.filter((source) => source === problemSource).length,
    fixture.imports,
    `${fixture.name}: injected import count after two distinct plugin passes`
  );
  const { default: Content } = await run(compiled, {
    ...jsxRuntime,
    baseUrl: import.meta.url,
  });
  const html = renderToStaticMarkup(
    createElement(Content, {
      components: {
        Problem() {
          throw new Error(`${fixture.name}: Problem incorrectly used the global MDX mapping`);
        },
        Card: ({ content }) => createElement('div', null, content),
      },
    })
  );
  assert.deepEqual(
    [...html.matchAll(/actual:([A-Za-z0-9]+)/g)].map((match) => match[1]),
    fixture.rendered,
    `${fixture.name}: the compiled lexical component must render the requested IDs`
  );
  if (fixture.explicit) {
    assert.deepEqual(imports, ['./custom'], `${fixture.name}: preserve the author's import`);
    assert.ok(html.includes('explicit:P8306'), `${fixture.name}: use the author's component`);
  }
}

console.log(`Remark Problem contract: ${fixtures.length} compiler/render cases passed.`);
