import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

// Lean lint layer: catches what Prettier (format) and tsc (types) can't —
// mainly React Hooks dependency bugs and unused bindings. Formatting is left
// entirely to Prettier, so no stylistic rules live here.
export default tseslint.config(
  {
    ignores: ['build', '.docusaurus', 'node_modules', 'static', 'i18n'],
  },
  {
    files: ['src/**/*.{ts,tsx,js,jsx,mjs}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      // Only the two classic Hooks rules — not react-hooks v7's `recommended-latest`,
      // whose React-Compiler rules (set-state-in-effect, refs, immutability) flag
      // legitimate patterns and would drown the signal.
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // Unused bindings are noise tsc doesn't flag; allow the _-prefixed escape hatch.
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      // require() / require.context are deliberate webpack features here (dynamic-path
      // MDX, lazy client-only globe libs) that ESM imports can't express.
      '@typescript-eslint/no-require-imports': 'off',
    },
  }
);
