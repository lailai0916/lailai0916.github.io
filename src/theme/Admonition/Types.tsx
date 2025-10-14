import React from 'react';
import DefaultAdmonitionTypes from '@theme-original/Admonition/Types';

const AdmonitionTypeInfo = DefaultAdmonitionTypes.info;

const admonitionTypes = {
  ...DefaultAdmonitionTypes,
  example: (props) => <AdmonitionTypeInfo title="Example" {...props} />,
};

export default admonitionTypes;
