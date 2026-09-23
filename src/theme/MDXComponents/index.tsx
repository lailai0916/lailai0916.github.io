import MDXComponents from '@theme-original/MDXComponents';
import DocCardList from '@theme/DocCardList';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import BrowserWindow, { IframeWindow, ImageWindow } from '@site/src/components/BrowserWindow';

import Notation from '@site/src/components/Notation';
import GitHub from '@lailai0916/ui/GitHub';
import Quote from '@lailai0916/ui/Quote';
import Desmos from '@site/src/components/Desmos';
import Problem from '@site/src/components/Problem';
import MarkdownLink from '@site/src/components/MarkdownLink';

export default {
  ...MDXComponents,
  a: MarkdownLink,
  DocCardList,
  Tabs,
  TabItem,
  BrowserWindow,
  IframeWindow,
  ImageWindow,
  Notation,
  GitHub,
  Quote,
  Desmos,
  Problem,
};
