// 统一的排版样式常量
export const TYPOGRAPHY = {
  // 标题样式
  MAIN_TITLE: 'font-bold text-4xl text-gray-900 dark:text-neutral-100 leading-tight mb-4',
  SECTION_TITLE: 'font-bold text-4xl lg:text-5xl text-gray-900 dark:text-neutral-100 leading-tight mb-6',
  CARD_TITLE: 'font-bold text-xl text-gray-900 dark:text-neutral-100 leading-tight',
  
  // 描述文本样式
  MAIN_DESCRIPTION: 'text-lg lg:text-xl text-gray-700 dark:text-neutral-300 leading-relaxed',
  SECTION_DESCRIPTION: 'text-lg lg:text-xl text-gray-700 dark:text-neutral-300 leading-relaxed max-w-3xl mx-auto',
  CARD_DESCRIPTION: 'text-gray-600 dark:text-neutral-400 text-sm line-clamp-2',
  
  // 小标签文本
  LABEL_TEXT: 'uppercase tracking-wide font-bold text-sm text-gray-600 dark:text-neutral-400',
  
  // 链接文本
  LINK_TEXT: 'text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-neutral-100 transition-colors'
} as const;

// 统一的布局样式常量
export const LAYOUT = {
  // 容器样式
  CONTAINER: 'max-w-7xl mx-auto flex flex-col px-5',
  SECTION_SPACING: 'my-16 lg:my-24',
  CONTENT_SPACING: 'mb-12',
  
  // 卡片间距
  CARD_PADDING: 'p-6',
  CARD_SPACING: 'space-y-4',
  
  // 网格间距
  GRID_GAP: 'gap-6',
  GRID_GAP_SMALL: 'gap-4',
  GRID_GAP_LARGE: 'gap-8'
} as const;

// 统一的颜色类名常量
export const COLORS = {
  // 状态颜色
  SUCCESS: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20',
  WARNING: 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20',
  INFO: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20',
  PURPLE: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20',
  DEFAULT: 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20'
} as const;

// 统一的动画类名常量
export const ANIMATIONS = {
  TRANSITION: 'transition-all duration-200 ease-out',
  HOVER_SCALE: 'hover:scale-110 transition-transform duration-200',
  FADE_IN: 'opacity-0 animate-fade-in',
  SLIDE_UP: 'translate-y-4 animate-slide-up'
} as const;

// 常用的组合样式
export const COMMON_STYLES = {
  // 卡片基础样式（与BaseCard保持一致）
  CARD_BASE: 'relative overflow-hidden w-full h-full flex flex-col bg-white dark:bg-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-800/50 rounded-2xl transition-all duration-200 ease-out shadow-sm hover:shadow-lg dark:shadow-none border border-gray-200 dark:border-neutral-700 hover:border-gray-300 dark:hover:border-neutral-600',
  
  // 按钮基础样式
  BUTTON_BASE: 'inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200',
  
  // 输入框基础样式
  INPUT_BASE: 'px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-gray-900 dark:text-neutral-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
} as const; 
