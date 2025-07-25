import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocCardList from '@theme/DocCardList';

import BrowserWindow from '@site/src/components/BrowserWindow';
import IframeWindow from '@site/src/components/BrowserWindow/IframeWindow';
import ImageWindow from '@site/src/components/BrowserWindow/ImageWindow';

import Desmos from '@site/src/components/Desmos';
import Notation from '@site/src/components/Notation';
import Problem from '@site/src/components/Problem';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // Map tags to our components
  Tabs,
  TabItem,
  DocCardList,
  BrowserWindow,
  IframeWindow,
  ImageWindow,
  Desmos,
  Notation,
  Problem,
};
