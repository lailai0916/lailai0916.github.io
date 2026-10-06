import type { Plugin } from '@docusaurus/types';

export default function externalFontsPlugin(): Plugin {
  return {
    name: 'external-fonts',
    configureWebpack(config) {
      const fontRule = config.module?.rules?.find(
        (rule) =>
          typeof rule === 'object' &&
          rule !== null &&
          rule.test instanceof RegExp &&
          rule.test.test('font.woff2')
      );
      const loader =
        typeof fontRule === 'object' && fontRule !== null && Array.isArray(fontRule.use)
          ? fontRule.use.find(
              (entry) =>
                typeof entry === 'object' &&
                entry !== null &&
                entry.loader === require.resolve('url-loader')
            )
          : undefined;
      if (
        typeof loader !== 'object' ||
        loader === null ||
        typeof loader.options !== 'object' ||
        loader.options === null
      ) {
        throw new Error('The Docusaurus font loader could not be configured.');
      }

      // Inline fonts make every page download unused subsets and fallback formats.
      loader.options = { ...loader.options, limit: 0 };
    },
  };
}
