import { type ReactNode } from 'react';
import { PrivacyPage } from '@site/src/pages/privacy/_components';
import PrivacyContent from './_content.mdx';

export default function Privacy(): ReactNode {
  return (
    <PrivacyPage>
      <PrivacyContent />
    </PrivacyPage>
  );
}
