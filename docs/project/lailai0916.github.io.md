---
title: lailai's Home
---

我的个人网站项目和搭建教程。

## 说明

我以前使用 [CSDN](https://www.csdn.net) 和 [博客园](https://www.cnblogs.com) 等现成的博客平台，但自由度低、功能受限，而且经常有广告，无法满足我的需求。

2023 年暑假，我尝试了 [WordPress](https://wordpress.org) 和 [Hexo](https://hexo.io) 等博客框架，但整体效果始终不够满意。主要原因是，我在学习算法竞赛的过程中，需要整理知识点和模板。而传统博客的时间线结构不方便检索与归档；相比之下，我更偏好文档式的树状结构。

2024 年 3 月，我发现了一个由 Facebook 开发的 [Docusaurus](https://docusaurus.io) 静态网站生成器，它简洁美观、易于使用、扩展性强。

我从 2024 年 10 月开始搭建，但 Docusaurus 在国内互联网比较冷门，相关的资料和教程并不多，我花费了不少时间研究。在此之前，我没有系统学习过 HTML、CSS 和 JavaScript；但凭借 C++ 和 Python 等语言的基础，在搭建网站的过程中逐渐掌握了这些语言的基本语法。

此外 [Material for MkDocs](https://squidfunk.github.io/mkdocs-material) 和 [VitePress](https://vitepress.dev) 也是不错的选择，例如 [OI Wiki](https://oi-wiki.org) 就是基于前者搭建的。

## 项目链接

<GitHub repo="lailai0916/lailai0916.github.io" />

## 待办事项

- [ ] 统一各页面风格
- [ ] 统一各组件代码
- [ ] 添加主页「lailai」拖动交互效果
- [ ] 添加文章描述
- [ ] 添加文章 AI 总结
- [ ] 优化响应式布局
- [ ] 优化无障碍功能
- [ ] 优化网站资源性能
- [ ] 添加 Status 组件
- [ ] 添加 Analytics 组件
- [ ] 添加 React 图片展示组件
- [ ] 弃用 Tailwind CSS

## 提示词

```text title="通用"
1. 使用简体中文回复内容。
2. 语言简洁、自然、专业。
3. 翻译准确、通顺、优美。
4. 设计统一、简约、现代。
```

```text title="初始化"
这是我的个人网站源代码，请先熟悉一下。
```

```text title="代码优化"
请检查 XX 页面中 XX 组件，参考最佳实践，优化冗余或不规范代码，确保结构简洁、规范、高效。
```

```text title="设计优化"
我的个人网站在视觉风格和布局样式上缺乏统一。请根据我的设计理念优化代码，增强页面的一致性与现代感。
```

```text title="随机检查"
请检查我的个人网站中的任意内容（包括文章、笔记、题解、项目等），从逻辑、排版、语言和表述等方面，指出 10 个明显错误，无需修改。
```

```text title="修改检查"
请仔细检查你的修改是否有误，如果给出的代码有 bug，我将抽打我手里的这只小猫。
```

## 搭建教程

本教程写于 2025 年 1 月，演示版本为 Docusaurus v3.8，演示环境为 macOS Sequoia 15.5 系统的 MacBook Pro (M3 Max)。

### 安装

安装 Docusaurus 时有两个选择：JavaScript 和 TypeScript。

推荐使用 TypeScript，因为它是 JavaScript 的严格超集，提供了更多功能。

#### 创建

打开终端并运行此命令，它将创建一个包含脚手架文件的新目录。你可以将 `my-website` 修改为任意名称。

<Tabs>
<TabItem value="TypeScript">

```bash npm2yarn
npx create-docusaurus@latest my-website classic --typescript
```

</TabItem>
<TabItem value="JavaScript">

```bash npm2yarn
npx create-docusaurus@latest my-website classic --javascript
```

</TabItem>
</Tabs>

```bash
lailai@lailais-MacBook-Pro GitHub % npx create-docusaurus@latest my-website classic --typescript
[INFO] Creating new Docusaurus project...
[INFO] Installing dependencies with npm...
[SUCCESS] Created my-website.
[INFO] Inside that directory, you can run several commands:

  `npm start`
    Starts the development server.

  `npm run build`
    Bundles your website into static files for production.

  `npm run serve`
    Serves the built website locally.

  `npm run deploy`
    Publishes the website to GitHub pages.

We recommend that you begin by typing:

  `cd my-website`
  `npm start`

Happy building awesome websites!
```

#### 启动

等待创建完成后，切换到项目目录，并启动本地服务器。

```bash npm2yarn
cd my-website
npm start
```

```bash
lailai@lailais-MacBook-Pro GitHub % cd my-website
npm start

> my-website@0.0.0 start
> docusaurus start

[INFO] Starting the development server...
[SUCCESS] Docusaurus website is running at: http://localhost:3000/

✔ Client
  Compiled successfully in 471.56ms

client (webpack 5.99.9) compiled successfully
```

#### 预览

等待一段时间，会自动打开浏览器 [`http://localhost:3000`](http://localhost:3000) 本地地址。

此时你能看到 Docusaurus 网站的默认页面。

<ImageWindow url="http://localhost:3000">

![](https://cloud.lailai.one/f/RojUX/lailai0916.github.io-my-website-light.png#gh-light-mode-only)![](https://cloud.lailai.one/f/3XYFE/lailai0916.github.io-my-website-dark.png#gh-dark-mode-only)

</ImageWindow>

### 结构

### 部署

- 确保你已经安装了 Git，并且在 GitHub 上创建了一个新的仓库。
- 在本地项目根目录下运行以下命令，将项目推送到 GitHub 仓库：

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/my-website.git
git push -u origin main
```

- 在 `docusaurus.config.js` 文件中，配置 `url` 和 `baseUrl`：

```js
module.exports = {
  // ...existing code...
  url: 'https://username.github.io',
  baseUrl: '/my-website/',
  // ...existing code...
};
```

- 安装 `gh-pages` 依赖：

```bash npm2yarn
npm install --save-dev gh-pages
```

- 在 `package.json` 文件中，添加部署脚本：

```json
"scripts": {
  // ...existing code...
  "deploy": "docusaurus deploy"
}
```

- 运行以下命令，部署到 GitHub Pages：

```bash npm2yarn
npm run deploy
```

- 部署完成后，可以通过 `https://username.github.io/my-website/` 访问你的网站。

## 插件

在配置文件 `docusaurus.config.ts` 中，`plugins` 部分列出了所有插件及其设置。

- 📦 [plugin-ideal-image](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-ideal-image)：生成响应式、懒加载及低像素占位图的图像插件。
- 📦 [plugin-client-redirects](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-client-redirects)：在客户端生成页面重定向。
- 📦 [plugin-google-gtag](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-google-gtag)：在网站中集成 [Google Analytics](https://analytics.google.com)，提供详细的流量分析。
- 📦 [plugin-pwa](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-pwa)：创建支持离线模式和应用安装的 PWA 文档站点。如果你的浏览器支持，可以把网站当作应用安装。
- 📦 [remark-plugin-npm2yarn](https://github.com/facebook/docusaurus/blob/main/packages/docusaurus-remark-plugin-npm2yarn/README.md)：将 Markdown 中标记为 `bash npm2yarn` 的代码块中的 npm 命令转换为 Docusaurus 选项卡形式，展示多种包管理工具（如 npm、yarn、pnpm 等）的等效命令。

## 参考资料

这是一些我认为比较优秀的个人网站，可供参考。

- [峰华前端工程师](https://zxuqian.cn)
- [愧怍](https://kuizuo.cn)
- [老车的个人网站](https://cheyujie.art)
- [JIEJOE](https://www.jiejoe.com)
- [AcoFork Blog](https://2x.nz)
- [Sukka (@sukkaw)](https://skk.moe)
- [Alan Wang](https://www.alanwang.site)
- [Baoshuo (@renbaoshuo)](https://baoshuo.ren)
