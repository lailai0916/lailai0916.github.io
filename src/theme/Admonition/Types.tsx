import DefaultAdmonitionTypes from '@theme-original/Admonition/Types';
import { translate } from '@docusaurus/Translate';
import type { Props as AdmonitionTypeInfoProps } from '@theme/Admonition/Type/Info';

const AdmonitionTypeInfo = DefaultAdmonitionTypes.info;
const EXAMPLE_TITLE = translate({
  id: 'components.admonition.example.title',
  message: 'Example',
});

const admonitionTypes = {
  ...DefaultAdmonitionTypes,
  example: (props: AdmonitionTypeInfoProps) => (
    <AdmonitionTypeInfo title={EXAMPLE_TITLE} {...props} />
  ),
};

export default admonitionTypes;
