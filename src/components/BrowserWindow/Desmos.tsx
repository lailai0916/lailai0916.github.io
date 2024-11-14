/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import BrowserWindow from './index';

// Quick and dirty component, to improve later if needed
export default function Desmos({url}: {url: string}): JSX.Element {
  return (
    <div>
      <iframe
        src={url}
        title={url}
        style={{
            border: '1px solid #ccc',
            width: '100%',
            maxWidth: '400px',
            height: 'auto',
            aspectRatio: '1 / 1',
            maxHeight: '400px',
        }}
      />
    </div>
  );
}
