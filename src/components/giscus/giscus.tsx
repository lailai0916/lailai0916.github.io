// import React from "react";
import Giscus from "@giscus/react";
import { useColorMode } from "@docusaurus/theme-common";


// <script src="https://giscus.app/client.js"
//         data-repo="lailai0916/giscus"
//         data-repo-id="R_kgDONHUoXA"
//         data-category="General"
//         data-category-id="DIC_kwDONHUoXM4Cjx_-"
//         data-mapping="pathname"
//         data-strict="0"
//         data-reactions-enabled="1"
//         data-emit-metadata="0"
//         data-input-position="bottom"
//         data-theme="preferred_color_scheme"
//         data-lang="zh-CN"
//         crossOrigin="anonymous"
//         async>
// </script>


// https://zhuanlan.zhihu.com/p/687041162
export default function GiscusComponent() {
    const { colorMode } = useColorMode();

    return (
        <Giscus
            repo="lailai0916/giscus" // 需要修改
            repoId="R_kgDONHUoXA" // 需要修改
            category="General"
            categoryId="DIC_kwDONHUoXM4Cjx_" // 需要修改
            mapping="pathname"
            term="Welcome to @giscus/react component!"
            strict="0"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="bottom"
            theme={colorMode}
            lang="zh-CN"
            loading="lazy"
            // crossorigin="anonymous"
        />
    );
}
