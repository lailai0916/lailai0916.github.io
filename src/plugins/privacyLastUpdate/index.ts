import path from 'node:path';
import type { LoadContext, Plugin } from '@docusaurus/types';
import { FileNotTrackedError, getFileCommitDate, GitNotFoundError } from '@docusaurus/utils';

type PrivacyLastUpdateData = Record<'en' | 'zh-Hans', number | null>;

async function getLastUpdateTimestamp(filePath: string): Promise<number | null> {
  try {
    const { timestamp } = await getFileCommitDate(filePath, { age: 'newest' });
    return timestamp;
  } catch (error) {
    if (error instanceof GitNotFoundError || error instanceof FileNotTrackedError) return null;
    throw error;
  }
}

export default function privacyLastUpdatePlugin({
  siteDir,
}: LoadContext): Plugin<PrivacyLastUpdateData> {
  const contentPath = (fileName: string) => path.join(siteDir, 'src', 'pages', 'privacy', fileName);

  return {
    name: 'privacy-last-update',
    async loadContent() {
      const [english, chinese] = await Promise.all([
        getLastUpdateTimestamp(contentPath('_content.mdx')),
        getLastUpdateTimestamp(contentPath('_content.zh-Hans.mdx')),
      ]);
      return { en: english, 'zh-Hans': chinese };
    },
    contentLoaded({ content, actions }) {
      actions.setGlobalData(content);
    },
  };
}
