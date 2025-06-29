# TODO List

## 🔧 代码质量改进

### 待完成的TODO标记
- [ ] **SiteCard组件**: 使可配置化 (src/pages/sites/_components/SiteCard/index.tsx:54)
  ```typescript
  // TODO make it configurable
  ```
- [ ] **操作按钮**: 添加翻译支持 (src/pages/sites/_components/OperatorButton/index.tsx:16)
  ```typescript
  // TODO add translations
  ```
- [ ] **清除按钮**: 添加翻译支持 (src/pages/sites/_components/ClearAllButton/index.tsx:12)
  ```typescript
  // TODO translate
  ```

### 调试代码清理
- [x] **资源页面**: 移除调试用的console.error (src/pages/resources/index.tsx:18) ✅
- [x] **状态徽章**: 移除console.warn (src/pages/_components/common/StatusBadge.tsx:25) ✅
- [x] **博客组件**: 移除多个console.warn (src/pages/_components/Blog/index.tsx:49,54) ✅
- [x] **倒计时组件**: 清理多个console.error (src/pages/_components/Countdown/index.tsx:113,148,166,315,333) ✅
- [x] **博客数据工具**: 移除console.log和console.warn (src/utils/blogData.ts:44,47) ✅
- [x] **设置卡片**: 移除console.error (src/pages/settings/_components/SettingCards.tsx:36,47) ✅
- [x] **题目组件**: 移除多个console.warn和console.error (src/components/Problem/index.tsx:66,110,128,157) ✅

### 代码规范工具
- [ ] **ESLint配置**: 添加ESLint配置文件提升代码质量
- [ ] **Prettier配置**: 添加Prettier配置统一代码格式
- [ ] **pre-commit钩子**: 添加Git pre-commit钩子确保代码质量

## 🌐 国际化完善

### 缺失的翻译
- [ ] **主页组件**: 完善中文翻译
  - HeroBanner组件的翻译
  - 各个section组件的翻译
- [ ] **设置页面**: 添加设置页面的中文翻译
- [ ] **网站收藏页面**: 完善Sites页面的中文翻译
- [ ] **错误信息**: 为所有错误信息添加国际化支持

## ⚙️ 配置优化

### Docusaurus配置
- [ ] **注释掉的功能**: 决定是否启用以下被注释的功能
  ```typescript
  // showLastUpdateAuthor: true,
  // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
  // autoCollapseCategories: true,
  // announcementBar: {
  //   id: 'announcement',
  //   content: '🎊 Hello, 2025! 🎊',
  // },
  ```
- [ ] **主题配置**: 决定是否使用备选的主题配置
  ```typescript
  // theme: prismThemes.oneLight,
  // darkTheme: prismThemes.oneDark,
  ```

### 依赖管理
- [ ] **过时依赖**: 检查并更新package-lock.json中标记为deprecated的包
  - rimraf: 升级到v4+
  - glob: 升级到v9+
  - sourcemap-codec: 迁移到@jridgewell/sourcemap-codec
- [ ] **依赖审计**: 运行npm audit检查安全漏洞

## 🚀 功能完善

### 友链和网站收藏
- [ ] **友链提交**: 完善友链提交功能，当前SUBMIT_URL指向GitHub主页
- [ ] **网站提交**: 完善网站收藏提交功能

### 组件功能
- [ ] **调试模式**: 完善设置页面的调试模式功能
- [ ] **网站截图**: 优化SiteCard组件的截图功能和可配置性
- [ ] **搜索功能**: 确保Algolia搜索配置正常工作

### 数据管理
- [ ] **博客数据**: 优化博客数据加载的错误处理
- [ ] **题目数据**: 完善题目组件的KaTeX渲染错误处理

## 📱 用户体验

### 性能优化
- [ ] **图片优化**: 压缩static/img目录下的图片文件
- [ ] **代码分割**: 检查并优化代码分割策略
- [ ] **懒加载**: 为图片和组件添加懒加载

### 可访问性
- [ ] **无障碍性**: 检查和改进网站的可访问性
- [ ] **键盘导航**: 确保所有交互元素支持键盘导航
- [ ] **屏幕阅读器**: 添加更多aria-label和alt文本

## 🔒 安全性

### 外部链接
- [ ] **链接检查**: 验证所有外部链接的有效性
- [ ] **rel属性**: 为外部链接添加适当的rel属性（noopener, noreferrer）
- [ ] **CSP配置**: 考虑添加内容安全策略

## 📝 文档和内容

### 文档完善
- [ ] **README更新**: 根据最新功能更新README文档
- [ ] **API文档**: 为自定义组件添加使用文档
- [ ] **部署文档**: 完善部署和开发环境搭建文档

### 内容维护
- [ ] **链接有效性**: 定期检查博客和文档中的外部链接
- [ ] **内容更新**: 更新过时的技术内容和教程

## 🧪 测试

### 测试覆盖
- [ ] **单元测试**: 为核心组件添加单元测试
- [ ] **集成测试**: 添加页面级别的集成测试
- [ ] **端到端测试**: 考虑添加关键用户流程的E2E测试

## 🔄 持续集成

### GitHub Actions
- [ ] **自动化测试**: 添加自动化测试流水线
- [ ] **依赖更新**: 设置Dependabot自动更新依赖
- [ ] **代码质量检查**: 在CI中集成代码质量检查

---

## 优先级说明

🔴 **高优先级**: 调试代码清理、安全性问题
🟡 **中优先级**: 功能完善、国际化、配置优化
🟢 **低优先级**: 测试覆盖、文档完善、性能优化

---

*最后更新: 2025-01-17*
