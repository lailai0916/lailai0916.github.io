import React from 'react';
import DefaultAdmonitionTypes from '@theme-original/Admonition/Types';
import type { Props as AdmonitionTypeInfoProps } from '@theme/Admonition/Type/Info';

const AdmonitionTypeInfo = DefaultAdmonitionTypes.info;

const admonitionTypes = {
  ...DefaultAdmonitionTypes,
  example: (props: AdmonitionTypeInfoProps) => (
    <AdmonitionTypeInfo title="Example" {...props} />
  ),
};

export default admonitionTypes;
