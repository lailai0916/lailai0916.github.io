# 组件

在 `src/components` 目录可以添加自定义组件。

## BrowserWindow

这是一个模拟浏览器窗口的容器组件。它通常不直接使用，而是作为其他组件（如 `IframeWindow` 和 `ImageWindow`）的基础。

- **用途**：创建一个带有 macOS 风格窗口控件和地址栏的浏览器外壳。
- **属性**：
  - `children`: `ReactNode` - 窗口中显示的内容。
  - `url`: `string` - 地址栏中显示的 URL。
  - `minHeight`: `number` - 窗口的最小高度。
  - `style`: `CSSProperties` - 应用于窗口容器的自定义样式。
  - `bodyStyle`: `CSSProperties` - 应用于窗口内容区域的自定义样式。

## IframeWindow

该组件使用 `BrowserWindow` 来包裹一个 `iframe`，用于在页面中嵌入另一个网页。

- **用途**：在模拟的浏览器窗口中显示一个在线的网页。
- **属性**：
  - `url`: `string` (必需) - 需要嵌入的网页 URL。
- **示例**：

  ```jsx
  import IframeWindow from '@site/src/components/BrowserWindow/IframeWindow';

  <IframeWindow url="https://www.bing.com" />;
  ```

## ImageWindow

该组件使用 `BrowserWindow` 来展示一张图片，使其看起来像是在一个浏览器窗口中打开的。

- **用途**：在模拟的浏览器窗口中展示图片。
- **属性**：
  - `children`: `ReactNode` (必需) - 通常是一个 `<img>` 标签。
  - `url`: `string` - 地址栏中显示的 URL。
- **示例**：

  ```jsx
  import ImageWindow from '@site/src/components/BrowserWindow/ImageWindow';

  <ImageWindow url="https://lailai.co/img/photo.png">
    <img src="/img/logo.svg" alt="图片" />
  </ImageWindow>;
  ```

  > `<img>` 的 `src` 路径是相对于 `static` 目录的。

## Notation

这是一个对 `rough-notation` 库的封装，可以为文本添加手绘风格的动画标注。

- **用途**：突出显示文本内容，增加页面的趣味性。
- **属性**：
  - `children`: `ReactNode` (必需) - 需要标注的文本。
  - `type`: `string` - 标注类型，如 `underline`, `box`, `circle`, `highlight` 等。默认为 `underline`。
  - `color`: `string` - 标注颜色。默认为 `red`。
  - `show`: `boolean` - 是否显示标注。默认为 `true`。
- **示例**：

  ```jsx
  import Notation from '@site/src/components/Notation';

  <Notation type="highlight" color="#ffc300">
    这是一段需要高亮的文字。
  </Notation>;
  ```

## Problem

该组件用于动态加载和渲染 `src/problems/` 目录下的题目文档（MDX 文件），并支持使用 KaTeX 来渲染数学公式。

- **用途**：在页面中嵌入格式化好的题目。
- **属性**：
  - `id`: `string` (必需) - 对应 `src/problems/` 目录下的文件名（不含 `.md` 后缀）。
- **示例**：

  ```jsx
  import Problem from '@site/src/components/Problem';

  <Problem id="P1177" />;
  ```

  这将会加载并渲染 `src/problems/P1177.md` 文件。你可以在 MDX 文件中自由使用 Markdown、JSX 和 LaTeX 数学公式（如 `$E=mc^2$` 或 `$$ \sum_{i=1}^n i = \frac{n(n+1)}{2} $$`）。

## Desmos

此组件用于在页面中嵌入 Desmos 图形计算器。

- **用途**：展示交互式的函数图像或几何图形。
- **属性**：
  - `url`: `string` (必需) - Desmos 图形的 ID（即 `desmos.com/calculator/` 后面的部分）。
- **示例**：

  ```jsx
  import Desmos from '@site/src/components/Desmos';

  <Desmos url="w3srdj1pde" />;
  ```
