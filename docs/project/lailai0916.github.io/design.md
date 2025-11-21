# lailai's Design Style

基于"统一、简约、现代"的设计理念，我对整个网站进行了全面的设计系统改进，确保各个页面在视觉风格、布局和样式上保持高度一致性。

## 参考资料

- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Apple Design Resources](https://developer.apple.com/design/resources/)

## 设计理念

理念：统一 · 简约 · 现代（Unified · Simple · Modern）

## 改进概述

### 1. 创建统一的设计系统

#### 设计令牌（Design Tokens）

创建了 `src/theme/design-system/tokens.ts`，定义了所有的设计变量：

- **颜色系统**：品牌色、中性色、功能色
- **间距系统**：基于 4px 网格的统一间距
- **字体系统**：字体家族、大小、字重
- **圆角系统**：从小到大的圆角规范
- **阴影系统**：不同层级的阴影效果
- **动画系统**：统一的过渡时长和缓动函数

#### 样式系统

创建了 `src/theme/design-system/styles.ts`，提供预定义的样式类：

- **文本样式**：标题、正文、颜色
- **布局样式**：容器、区块、网格
- **组件样式**：卡片、按钮、徽章
- **动画样式**：悬停、过渡、聚焦效果

### 2. 构建组件库

#### 布局组件

- **Container**：统一的容器宽度和内边距
- **Section**：统一的页面区块间距
- **Grid**：响应式网格系统
- **Stack**：垂直堆叠布局
- **Flex**：灵活的弹性布局

#### 内容组件

- **Card**：统一的卡片样式和交互
- **Heading**：统一的标题层级
- **Text**：统一的文本样式
- **Code**：内联代码样式

#### 交互组件

- **Button**：统一的按钮样式和变体
- **Badge**：状态标签组件
- **Icon**：图标组件封装
- **IconButton**：图标按钮组件

### 3. 页面组件重构

使用新的设计系统重构了主页的所有组件：

#### HeroBanner

- 使用 `Section` 和 `Container` 布局
- 统一的动画效果
- 现代化的按钮样式

#### Docs

- 统一的卡片布局
- 响应式网格系统
- 一致的悬停效果

#### Project

- 使用 `Badge` 显示项目状态
- 统一的卡片高度和间距
- 清晰的信息层级

#### Skills

- 简洁的技能展示卡片
- 统一的图标大小和间距
- 响应式的 6 列网格

#### Blog

- 左右分栏的现代布局
- 统一的文章卡片样式
- 清晰的时间显示

#### Quotes

- 优雅的引用卡片
- 统一的作者信息展示
- 响应式的 3 列布局

### 4. 全局样式优化

在 `src/css/custom.css` 中添加了全局样式：

- **平滑滚动**：提升用户体验
- **统一过渡**：所有元素使用相同的动画时长
- **聚焦样式**：统一的键盘导航体验
- **滚动条美化**：自定义滚动条样式
- **响应式优化**：移动端点击区域优化

## 设计理念体现

### 统一性

- 所有组件使用相同的设计令牌
- 一致的间距、圆角、阴影系统
- 统一的交互模式和动画效果

### 简约性

- 去除不必要的视觉装饰
- 清晰的信息层级
- 充足的留白空间

### 现代性

- 采用最新的 CSS 特性
- 流畅的过渡动画
- 响应式设计优先

## 使用方法

```tsx
// 导入设计系统
import {
  Section,
  Container,
  Grid,
  Card,
  Heading,
  Text,
  Button,
  Badge,
} from '@site/src/theme/design-system';

// 使用组件构建页面
<SectionContainer background="alt">
  <Container>
    <Heading level={2}>标题</Heading>
    <Grid cols={3}>
      <Card>内容</Card>
    </Grid>
  </Container>
</SectionContainer>;
```

## 后续建议

1. **继续完善组件库**：根据需要添加更多组件
2. **建立设计规范文档**：详细记录每个组件的使用场景
3. **定期审查一致性**：确保新增内容符合设计系统
4. **性能优化**：监控和优化组件渲染性能

通过这次改进，网站的整体视觉一致性和用户体验得到了显著提升，为后续的内容扩展奠定了坚实的基础。
