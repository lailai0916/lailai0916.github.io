// 统一的排版样式常量（仅保留实际使用的）
export const TYPOGRAPHY = {
  // Countdown组件特有样式
  MAIN_TITLE: 'font-bold text-4xl text-gray-900 dark:text-neutral-100 leading-tight mb-4',
  SUCCESS_TEXT: 'text-2xl font-medium text-gray-700 dark:text-neutral-300',
  CIRCLE_VALUE: 'absolute text-center font-medium text-[2.5rem] select-none',
  CIRCLE_UNIT: 'absolute text-[0.75rem] font-light -translate-x-1/2 -translate-y-[12px] select-none whitespace-nowrap'
} as const;

// 通用的文本颜色样式
export const TEXT_COLORS = {
  PRIMARY: 'text-gray-900 dark:text-neutral-100',
  SECONDARY: 'text-gray-600 dark:text-neutral-400',
  MUTED: 'text-gray-500 dark:text-neutral-400'
} as const;

// 状态标签颜色
export const STATUS_COLORS = {
  GREEN: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20',
  ORANGE: 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20',
  BLUE: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20',
  PURPLE: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20',
  GRAY: 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20'
} as const;

// Countdown组件专用样式（仅在该组件中使用）
export const COUNTDOWN_STYLES = {
  MAIN_TITLE: 'font-bold text-4xl text-gray-900 dark:text-neutral-100 leading-tight mb-4',
  SUCCESS_TEXT: 'text-2xl font-medium text-gray-700 dark:text-neutral-300',
  CIRCLE_VALUE: 'absolute text-center font-medium text-[2.5rem] select-none',
  CIRCLE_UNIT: 'absolute text-[0.75rem] font-light -translate-x-1/2 -translate-y-[12px] select-none whitespace-nowrap',
  CIRCLE_TRANSITION: 'transition-all duration-500 linear',
  DOT_TRANSITION: 'transition-all duration-500 linear'
} as const; 
