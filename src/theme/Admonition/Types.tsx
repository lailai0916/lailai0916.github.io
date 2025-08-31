import React from 'react';
import DefaultAdmonitionTypes from '@theme-original/Admonition/Types';
import Translate from '@docusaurus/Translate';

function ExampleAdmonition(props: any) {
  const Note = (DefaultAdmonitionTypes as any).note;
  return (
    <Note
      {...props}
      type="note"
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
