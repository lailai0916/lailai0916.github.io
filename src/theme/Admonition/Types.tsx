import React from 'react';
import DefaultAdmonitionTypes from '@theme-original/Admonition/Types';

function ExampleAdmonition(props: any) {
  const Info = DefaultAdmonitionTypes.info;
  return <Info {...props} type="info" title={props.title ?? 'Example'} />;
}

const AdmonitionTypes = {
  ...DefaultAdmonitionTypes,
  example: ExampleAdmonition,
};

export default AdmonitionTypes;
