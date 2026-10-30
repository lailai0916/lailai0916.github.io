import MDXComponents from '@theme-original/MDXComponents';
import DocCardList from '@theme/DocCardList';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { type ComponentProps } from 'react';
import clsx from 'clsx';

import BrowserWindow, { IframeWindow, ImageWindow } from '@site/src/components/BrowserWindow';

import Notation from '@site/src/components/Notation';
import GitHub from '@lailai0916/ui/GitHub';
import Quote from '@lailai0916/ui/Quote';
import Divider from '@lailai0916/ui/Divider';
import Desmos from '@site/src/components/Desmos';
import EnglishExamples from '@site/src/components/EnglishExamples';
import MarkdownLink from '@site/src/components/MarkdownLink';
import styles from './styles.module.css';

function MarkdownDivider({ className, ...props }: ComponentProps<typeof Divider>) {
  return <Divider {...props} className={clsx(styles.divider, className)} />;
}

export default {
  ...MDXComponents,
  a: MarkdownLink,
  hr: MarkdownDivider,
  DocCardList,
  Tabs,
  TabItem,
  BrowserWindow,
  IframeWindow,
  ImageWindow,
  Notation,
  GitHub,
  Quote,
  Divider,
  Desmos,
  EnglishExamples,
};
