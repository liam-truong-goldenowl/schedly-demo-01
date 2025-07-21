// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { FlatCompat } from '@eslint/eslintrc';
import perfectionist from 'eslint-plugin-perfectionist';

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const eslintConfig = [...compat.config({
  extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
}), {
  plugins: { perfectionist },
  rules: {
    'perfectionist/sort-imports': [
      'error',
      {
        type: 'line-length',
        order: 'asc',
        internalPattern: ['^@/.+'],
        groups: [
          'value-builtin',
          'type-builtin',

          'value-external',
          'type-external',

          'value-internal',
          'type-internal',

          'value-parent',
          'type-parent',

          'value-sibling',
          'type-sibling',

          'value-index',
          'type-index',

          ['value-side-effect-style', 'value-style', 'import', 'unknown'],
        ],
      },
    ],
    'perfectionist/sort-named-imports': [
      'error',
      {
        type: 'line-length',
        order: 'asc',
      },
    ],
  },
}, ...storybook.configs["flat/recommended"]];

export default eslintConfig;
