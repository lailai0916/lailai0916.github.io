import { type ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import PrivacyContentEn from './_content.mdx';
import PrivacyContentZhHans from './_content.zh-Hans.mdx';
import { PrivacyPage } from './_components';

export default function Privacy(): ReactNode {
  const { i18n } = useDocusaurusContext();
  const PrivacyContent = i18n.currentLocale === 'zh-Hans' ? PrivacyContentZhHans : PrivacyContentEn;

  return (
    <PrivacyPage>
      <PrivacyContent />
    </PrivacyPage>
  );
}
