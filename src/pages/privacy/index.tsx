import { type ReactNode } from 'react';
import PrivacyContent from './_content.mdx';
import { PrivacyPage } from './_components';

export default function Privacy(): ReactNode {
  return (
    <PrivacyPage>
      <PrivacyContent />
    </PrivacyPage>
  );
}
