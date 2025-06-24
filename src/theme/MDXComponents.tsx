import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import BrowserWindow from '@site/src/components/BrowserWindow';
import Notation from '@site/src/components/Notation';
import Problem from '@site/src/components/Problem';
import Desmos from '@site/src/components/BrowserWindow/Desmos';
import IframeWindow from '@site/src/components/BrowserWindow/IframeWindow';
import ImageWindow from '@site/src/components/BrowserWindow/ImageWindow';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // Map the "<BrowserWindow>" and "<Notation>" tags to our components
  Tabs,
  TabItem,
  BrowserWindow,
  Notation,
  Problem,
  Desmos,
  IframeWindow,
  ImageWindow,
}; 
