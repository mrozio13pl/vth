import eslintJs from '@eslint/js';
import eslintReact from '@eslint-react/eslint-plugin';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import { globalIgnores } from 'eslint/config';

export default tseslint.config([
    globalIgnores(['**/node_modules/**', '**/dist/**', '**/coverage/**', '**/tsconfig.json']),
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs', '**/*.cts', '**/*.mts'],
        rules: {
            'prefer-const': 'error',
            '@eslint-react/dom/no-missing-button-type': 'off',
            '@eslint-react/no-array-index-key': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-empty-object-type': 'off',
            '@eslint-react/dom/no-dangerously-set-innerhtml': 'off',
            '@eslint-react/no-nested-component-definitions': 'off',
            '@stylistic/jsx-one-expression-per-line': 'off',
            '@stylistic/no-tabs': 'off',
            '@stylistic/multiline-ternary': 'off',
        },
        extends: [
            eslintJs.configs.recommended,
            eslintReact.configs['recommended-typescript'],
            tseslint.configs.recommended,
            reactRefresh.configs.vite,
            stylistic.configs.customize({
                indent: 4,
                quotes: 'single',
                quoteProps: 'as-needed',
                arrowParens: true,
                semi: true,
            }),
        ],
    },
]);
