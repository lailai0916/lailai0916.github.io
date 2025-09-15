import React from 'react';
import DefaultAdmonitionTypes from '@theme-original/Admonition/Types';
import Translate from '@docusaurus/Translate';

function ExampleAdmonition(props: any) {
  const Info = (DefaultAdmonitionTypes as any).info;
  return (
    <Info
      {...props}
      type="info"
      title={
        props.title ?? (
          <Translate
            id="theme.admonition.example"
            description="The default label used for the Example admonition (:::example)"
          >
            Example
          </Translate>
        )
      }
    />
  );
}

const AdmonitionTypes = {
  ...DefaultAdmonitionTypes,
  example: ExampleAdmonition,
};

export default AdmonitionTypes;
