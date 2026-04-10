---
title: Tailwind CSS 弃用计划
---

## 📅 计划概览

本项目目前正处于从 Tailwind CSS 转向 **CSS Modules + Vanilla CSS** 的中期阶段。为了提高样式的可维护性、减小构建体积并符合 Docusaurus 的原生工程实践，我们将彻底移除 Tailwind CSS 依赖。

- **当前状态**：进行中（已完成 `travel` 页面，全项目已启用 `--tw-` 前缀隔离）。
- **目标**：100% 移除 Tailwind 依赖，卸载 `tailwindcss` 及相关 PostCSS 插件。
- **技术栈**：CSS Modules (`.module.css`), Docusaurus Infima Variables.

---

## 📊 现状审计 (2025年Q1)

经过全面代码扫描，Tailwind 的使用情况如下：

- **类名总数**：约 **351** 个原子类名。
- **前缀隔离**：所有类名均已使用 `--tw-` 前缀（由 `tailwind.config.ts` 配置）。
- **分布核心**：
  - **常量定义 (62%)**：`src/components/laikit/section/constants.tsx` 承担了主要的颜色状态映射。
  - **复杂组件 (38%)**：`Blog`、`Countdown`、`BaseCard` 等组件直接内联了大量类名。

### 核心重灾区清单

| 文件路径 | 类名统计 | 复杂度 | 状态 |
| :--- | :--- | :--- | :--- |
| `src/components/laikit/section/constants.tsx` | 70 次 | ⭐⭐⭐⭐⭐ | 待重构为 CSS 变量 |
| `src/pages/_components/Blog/index.tsx` | 69 次 | ⭐⭐⭐⭐⭐ | 待迁移至 CSS Modules |
| `src/pages/_components/Countdown/index.tsx` | 35 次 | ⭐⭐⭐⭐ | 待迁移至 CSS Modules |
| `src/components/laikit/section/BaseCard.tsx` | 32 次 | ⭐⭐⭐⭐ | 待迁移至 CSS Modules |
| `src/pages/_components/Exploration/index.tsx` | 24 次 | ⭐⭐⭐ | 待迁移 |

---

## 🛠️ 迁移策略

### 1. 样式抽象化 (Constants -> CSS Variables)
不再在 JS 常量中直接定义 Tailwind 类名，而是定义语义化的 CSS 变量或类名。

**Before (`constants.tsx`):**
```tsx
export const STATUS_COLORS = {
  GREEN: '--tw-text-green-600 dark:--tw-text-green-400 --tw-bg-green-50 ...',
};
```

**After (推荐):**
在 `custom.css` 中定义：
```css
.status-badge-green {
  color: var(--ifm-color-success);
  background: var(--ifm-color-success-lightest);
}
```

### 2. 组件样式隔离 (Inline -> CSS Modules)
对于复杂组件，建立对应的 `.module.css` 文件，将原子类合并为语义化的类名。

**Before:**
```tsx
<div className="--tw-flex --tw-items-center --tw-gap-3 --tw-p-4">...</div>
```

**After:**
```css
/* Component.module.css */
.container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
}
```

---

## 📝 执行路线图 (Roadmap)

### 第一阶段：核心颜色系统重构 (Priority: High)
- [ ] 重写 `src/components/laikit/section/constants.tsx`。
- [ ] 在 `src/css/custom.css` 中提取状态颜色（Green, Orange, Violet 等）的语义类。
- [ ] 确保 `STATUS_COLORS` 的调用方（如 `quotes.tsx`, `projects.tsx`）在不修改代码的情况下完成视觉迁移。

### 第二阶段：高频复杂组件迁移
- [ ] **Blog**: 提取所有卡片和列表样式。
- [ ] **Countdown**: 转换环形进度条和文字排版样式。
- [ ] **BaseCard**: 统一 Laikit 的基础交互样式。

### 第三阶段：全组件扫尾
- [ ] 迁移 `Exploration`, `GridLayout`, `Quote`, `Project`, `SectionHeader` 等。
- [ ] 处理动画效果：将 `tailwind.config.ts` 中的 `marquee` 动画转为 CSS `@keyframes`。

### 第四阶段：环境清理 (Final Step)
- [ ] 移除 `src/css/custom.css` 中的 `@tailwind` 指令。
- [ ] 删除 `tailwind.config.ts`。
- [ ] 在 `docusaurus.config.ts` 中移除 Tailwind 插件配置。
- [ ] 执行 `npm uninstall tailwindcss autoprefixer postcss @tailwindcss/typography`。

---

## ⚠️ 注意事项
1. **深色模式适配**：Tailwind 的 `dark:` 前缀需转换为 CSS Modules 中的 `[data-theme='dark'] .className`。
2. **Infima 变量优先**：优先使用 `var(--ifm-*)` 变量以保持站点视觉一致性。
3. **响应式断点**：
   - `md:` -> `@media (max-width: 996px)` (Docusaurus 标准断点)
   - `lg:` -> `@media (max-width: 1280px)`

---

_文档更新时间：2026年4月_
