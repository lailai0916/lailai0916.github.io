import type { Root } from 'mdast';
import type { MdxjsEsm } from 'mdast-util-mdx';

type Node = {
  type?: string;
  name?: string | { type?: string; name?: string };
};

function usesProblem(value: unknown): boolean {
  if (value === null || typeof value !== 'object') return false;
  const node = value as Node;
  return (
    ((node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') &&
      node.name === 'Problem') ||
    (node.type === 'JSXOpeningElement' &&
      typeof node.name === 'object' &&
      node.name?.type === 'JSXIdentifier' &&
      node.name.name === 'Problem') ||
    Object.values(value).some(usesProblem)
  );
}

export default function remarkProblem() {
  return (tree: Root) => {
    if (!usesProblem(tree)) return;
    const alreadyImported = tree.children.some(
      (node) =>
        node.type === 'mdxjsEsm' &&
        (node as MdxjsEsm).data?.estree?.body.some(
          (statement) =>
            statement.type === 'ImportDeclaration' &&
            statement.specifiers.some((specifier) => specifier.local.name === 'Problem')
        )
    );
    if (alreadyImported) return;

    // Route preload resolves this import before React hydrates the server-rendered problem.
    tree.children.unshift({
      type: 'mdxjsEsm',
      value: "import Problem from '@site/src/components/Problem';",
      data: {
        estree: {
          type: 'Program',
          sourceType: 'module',
          body: [
            {
              type: 'ImportDeclaration',
              specifiers: [
                {
                  type: 'ImportDefaultSpecifier',
                  local: { type: 'Identifier', name: 'Problem' },
                },
              ],
              source: { type: 'Literal', value: '@site/src/components/Problem' },
              attributes: [],
            },
          ],
        },
      },
    });
  };
}
