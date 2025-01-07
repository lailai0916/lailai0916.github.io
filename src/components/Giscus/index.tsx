import React from "react";
import Giscus from "@giscus/react";
import { useColorMode } from "@docusaurus/theme-common";

// https://zhuanlan.zhihu.com/p/687041162
export default function GiscusComponent() {
    const { colorMode } = useColorMode();

    return (
        <Giscus
            repo="lailai0916/giscus"
            repoId="R_kgDONHUoXA"
            category="Announcements"
            categoryId="DIC_kwDONHUoXM4Cjx_9"
            mapping="pathname"
            strict="0"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="bottom"
            theme={colorMode}
            lang="zh-CN"
            crossorigin="anonymous"
        />
    );
}
