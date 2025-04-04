import React from "react";
import BrowserOnly from '@docusaurus/BrowserOnly';
import Giscus from "@giscus/react";
import { useColorMode } from "@docusaurus/theme-common";

// https://zhuanlan.zhihu.com/p/687041162

export default function Comment() {
  const { colorMode } = useColorMode();

  return (
    <BrowserOnly fallback={<div>Loading Comment...</div>}>
      {() => (
        <Giscus
          repo="lailai0916/giscus"
          repoId="R_kgDONHUoXA"
          category="Announcements"
          categoryId="DIC_kwDONHUoXM4Cjx_9"
          mapping="pathname"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme={colorMode}
          lang="zh-CN"
        />
      )}
    </BrowserOnly>
  );
}
