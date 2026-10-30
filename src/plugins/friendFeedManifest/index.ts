import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { LoadContext, Plugin } from '@docusaurus/types';
import { getFriendFeedSources, type FriendFeedSource } from './sources';

export default function friendFeedManifestPlugin({
  siteDir,
}: LoadContext): Plugin<FriendFeedSource[]> {
  return {
    name: 'friend-feed-manifest',
    async loadContent() {
      const source = await readFile(path.join(siteDir, 'src', 'data', 'friends.tsx'), 'utf8');
      return getFriendFeedSources(source);
    },
    async postBuild({ outDir, content }) {
      await writeFile(
        path.join(outDir, 'friend-feeds.json'),
        `${JSON.stringify(content, null, 2)}\n`
      );
    },
  };
}
