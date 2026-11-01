import type { Plugin } from '@docusaurus/types';
import { installAnalyticsPolicy } from '../../utils/analyticsPolicy';

export default function analyticsPlugin(): Plugin {
  return {
    name: 'site-analytics',
    injectHtmlTags() {
      if (process.env.NODE_ENV !== 'production') return {};
      return {
        headTags: [
          {
            tagName: 'script',
            attributes: {},
            innerHTML: `(${installAnalyticsPolicy.toString()})();`,
          },
          {
            tagName: 'script',
            attributes: {
              src: 'https://analytics.lailai.one/script.js',
              defer: true,
              'data-website-id': '69d3b7de-90e4-4be4-a355-633620ecefdb',
              'data-performance': 'true',
              'data-before-send': 'lailaiBeforeSend',
            },
          },
        ],
      };
    },
  };
}
