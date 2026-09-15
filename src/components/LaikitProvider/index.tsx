import type { ReactNode } from 'react';
import DocusaurusLink from '@docusaurus/Link';
import DocusaurusHeading from '@theme/Heading';
import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { usePluralForm } from '@docusaurus/theme-common';
import { LaikitProvider as Provider, type HeadingProps, type LinkProps } from '@lailai0916/ui';

const messages = {
  quoteAttributionDash: translate({
    id: 'components.laikitProvider.quoteAttributionDash',
    message: '— ',
  }),
  githubError: translate({
    id: 'components.laikitProvider.githubError',
    message: 'Failed to load GitHub data',
  }),
  githubNoDescription: translate({
    id: 'components.laikitProvider.githubNoDescription',
    message: 'No description provided',
  }),
  githubStars: translate({
    id: 'components.laikitProvider.githubStars',
    message: 'Stars',
  }),
  githubForks: translate({
    id: 'components.laikitProvider.githubForks',
    message: 'Forks',
  }),
  githubLicense: translate({
    id: 'components.laikitProvider.githubLicense',
    message: 'License',
  }),
  githubLanguage: translate({
    id: 'components.laikitProvider.githubLanguage',
    message: 'Primary language',
  }),
  other: translate({
    id: 'components.laikitProvider.other',
    message: 'Other',
  }),
};

function Link(props: LinkProps) {
  return <DocusaurusLink {...props} />;
}

function Heading(props: HeadingProps) {
  return <DocusaurusHeading {...props} />;
}

export default function LaikitProvider({ children }: { children: ReactNode }) {
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();
  const { selectMessage } = usePluralForm();
  return (
    <Provider
      locale={currentLocale}
      messages={messages}
      linkComponent={Link}
      headingComponent={Heading}
      selectMessage={selectMessage}
    >
      {children}
    </Provider>
  );
}
