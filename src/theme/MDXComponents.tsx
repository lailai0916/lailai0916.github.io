import MDXComponents from '@theme-original/MDXComponents';
import DocCardList from '@theme/DocCardList';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import BrowserWindow from '@site/src/components/BrowserWindow';
import IframeWindow from '@site/src/components/BrowserWindow/IframeWindow';
import ImageWindow from '@site/src/components/BrowserWindow/ImageWindow';

import Notation from '@site/src/components/Notation';
import Desmos from '@site/src/components/Desmos';
import Problem from '@site/src/components/Problem';
import GithubCard from '@site/src/components/GithubCard';

export default {
  ...MDXComponents,
  DocCardList,
  Tabs,
  TabItem,
  BrowserWindow,
  IframeWindow,
  ImageWindow,
  Notation,
  Desmos,
  Problem,
  GithubCard,
};
