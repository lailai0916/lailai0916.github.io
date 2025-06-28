import React from "react";
import BrowserOnly from '@docusaurus/BrowserOnly';
import Giscus from "@giscus/react";
import { useColorMode } from "@docusaurus/theme-common";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// Reference: https://zhuanlan.zhihu.com/p/687041162

export default function Comment() {
  const { colorMode } = useColorMode();
  const { i18n } = useDocusaurusContext();

  return (
    <BrowserOnly fallback={<div>Loading comments...</div>}>
      {() => (
        <Giscus
          repo="lailai0916/giscus"
          repoId="R_kgDONHUoXA"
          category="Announcements"
          categoryId="DIC_kwDONHUoXM4Cjx_9"
          inputPosition="top"
          theme={colorMode}
          lang={i18n.currentLocale}
        />
      )}
    </BrowserOnly>
  );
}
