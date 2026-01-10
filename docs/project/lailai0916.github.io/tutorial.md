# 搭建教程

## 说明

此教程写于 2025 年 1 月，当前版本为 Docusaurus v3.8。

使用 macOS Sequoia 15.5 系统的 MacBook Pro (M3 Max) 演示。

## 安装

安装时有两个选择：JavaScript 和 TypeScript。

推荐使用 TypeScript，因为它是 JavaScript 的严格超集，提供了更多功能。

### 创建

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

### 启动

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

### 预览

等待一段时间，会自动打开浏览器 [`http://localhost:3000`](http://localhost:3000) 本地地址。

此时你能看到 Docusaurus 网站的默认页面。

<ImageWindow url="http://localhost:3000">

![](https://cloud.lailai.one/f/RojUX/lailai0916.github.io-my-website-light.png#gh-light-mode-only)![](https://cloud.lailai.one/f/3XYFE/lailai0916.github.io-my-website-dark.png#gh-dark-mode-only)

</ImageWindow>

## 结构

## 部署

### GitHub Pages

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
