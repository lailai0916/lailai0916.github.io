// 统一的排版样式常量（仅保留实际使用的）

// 通用的文本颜色样式
export const TEXT_COLORS = {
  PRIMARY: 'text-gray-900 dark:text-neutral-100',
  SECONDARY: 'text-gray-600 dark:text-neutral-400',
  MUTED: 'text-gray-500 dark:text-neutral-400',
} as const;

// 状态标签颜色
export const STATUS_COLORS = {
  GREEN: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20',
  ORANGE:
    'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20',
  BLUE: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20',
  PURPLE:
    'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20',
  GRAY: 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20',
  RED: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20',
  YELLOW:
    'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20',
  PINK: 'text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/20',
  INDIGO:
    'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20',
  CYAN: 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20',
  EMERALD:
    'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20',
  ROSE: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20',
  TEAL: 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20',
  LIME: 'text-lime-600 dark:text-lime-400 bg-lime-50 dark:bg-lime-900/20',
  AMBER: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20',
  VIOLET:
    'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20',
  SLATE: 'text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20',
  STONE: 'text-stone-600 dark:text-stone-400 bg-stone-50 dark:bg-stone-900/20',
} as const;

// Countdown组件专用样式（仅在该组件中使用）
export const COUNTDOWN_STYLES = {
  MAIN_TITLE:
    'font-bold text-4xl text-gray-900 dark:text-neutral-100 leading-tight mb-4',
  SUCCESS_TEXT: 'text-2xl font-medium text-gray-700 dark:text-neutral-300',
  CIRCLE_VALUE: 'absolute text-center font-medium text-[2.5rem] select-none',
  CIRCLE_UNIT:
    'absolute text-[0.75rem] font-light -translate-x-1/2 -translate-y-[12px] select-none whitespace-nowrap',
  CIRCLE_TRANSITION: 'transition-all duration-500 linear',
  DOT_TRANSITION: 'transition-all duration-500 linear',
} as const;
