// ESLint flat config (eslint.org/docs/latest/use/configure/configuration-files).
import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.js'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: { ...globals.node } },
    rules: {
      'prefer-const': 'warn', // const by default: yellow on any let that is never reassigned
      'no-var': 'error', // var is legacy: recognise it, never write it
      'no-throw-literal': 'error', // throw Error objects, never strings or numbers
      'array-callback-return': 'error', // map/filter/find callbacks must return a value
    },
  },
  {
    // Broken on purpose: these teach Node's own error messages.
    ignores: [
      'week-3/day2_errors/**',
      'week-3/day3_errors/**',
      'week-3/exit_day2/**',
      'week-4/day4_errors/**',
      'week-4/day7_errors/**',
    ],
  },
]);
