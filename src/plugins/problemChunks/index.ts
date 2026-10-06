import type { Plugin } from '@docusaurus/types';
import type { Module } from 'webpack';

// Context module identifiers use a pipe after the catalog directory.
const problemModules =
  /[\\/](?:src[\\/]components[\\/]Problem|docs[\\/]contest[\\/]_problems|blog[\\/]solution)(?:[\\/]|\|)/;

export default function problemChunksPlugin(): Plugin {
  return {
    name: 'problem-chunks',
    configureWebpack(_config, isServer) {
      if (isServer) return;

      return {
        optimization: {
          splitChunks: {
            cacheGroups: {
              problem: {
                name: 'problem',
                chunks: 'all',
                enforce: true,
                priority: 45,
                reuseExistingChunk: true,
                test: (module: Module) =>
                  !module.type.startsWith('css') && problemModules.test(module.identifier()),
              },
            },
          },
        },
      };
    },
  };
}
