// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import perfectionistPlugin from 'eslint-plugin-perfectionist';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import type { EcomESLintOptions, ESLintConfigArray } from '../types.js';
import { applyOverrides } from '../utils/merge-configs.js';

/**
 * Base ESLint configuration with essential rules
 */
export const createBaseConfig = (options: EcomESLintOptions = {}): ESLintConfigArray => {
  const {
    tsconfigRootDir = process.cwd(),
    project = './tsconfig.json',
    ignores = [],
    rules = {},
    importGroups,
  } = options;

  const defaultIgnores = [
    'eslint.config.mjs',
    'eslint.config.js',
    'migrations/**',
    'dist/**',
    'build/**',
    'node_modules/**',
    '*.min.js',
    'coverage/**',
    ...ignores,
  ];

  const defaultImportGroups = {
    groups: [["builtin", "external"], "internal", ["parent", "sibling", "index"]],
    pathGroups: [
      { pattern: '@nestjs/**', group: 'external', position: 'before' },
      { pattern: '@*/**', group: 'internal', position: 'after' },
    ],
    ...(importGroups || {}),
  } as NonNullable<EcomESLintOptions['importGroups']>;

  return tseslint.config(
    // Ignores
    { ignores: defaultIgnores },

    // Base configurations
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    eslintPluginPrettierRecommended,

    // Language options
    {
      languageOptions: {
        globals: { ...globals.node, ...globals.jest },
        sourceType: 'module',
        parserOptions: {
          projectService: true,
          tsconfigRootDir,
          project,
          extraFileExtensions: ['.json'],
        },
      },
    },

    // Import sorting (Perfectionist) & Unused Imports
    {
      plugins: {
        'unused-imports': unusedImportsPlugin as any,
        perfectionist: perfectionistPlugin as any,
      },
      settings: {},
      rules: {
        // Import-x disabled in favor of perfectionist
        'perfectionist/sort-imports': [
          'error',
          {
            type: 'alphabetical',
            order: 'asc',
            fallbackSort: { type: 'unsorted' },
            ignoreCase: true,
            specialCharacters: 'keep',
            internalPattern: ['^~/.+', '^@/.+'],
            partitionByComment: false,
            partitionByNewLine: false,
            newlinesBetween: 1,
            maxLineLength: undefined,
            groups: [
              'type-import',
              ['value-builtin', 'value-external'],
              'type-internal',
              'value-internal',
              ['type-parent', 'type-sibling', 'type-index'],
              ['value-parent', 'value-sibling', 'value-index'],
              'ts-equals-import',
              'unknown',
            ],
            customGroups: [],
            environment: 'node',
          },
        ],
        // Keep import hygiene via perfectionist/newlinesBetween and unused-imports
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
          'warn',
          {
            vars: 'all',
            varsIgnorePattern: '^_.*',
            args: 'after-used',
            argsIgnorePattern: '^_.*',
          },
        ],
      },
    },

    // TypeScript Specific
    {
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-floating-promises': 'warn',
        '@typescript-eslint/no-unsafe-argument': 'warn',
        '@typescript-eslint/method-signature-style': ['error', 'property'],
        '@typescript-eslint/no-unnecessary-condition': 'off',
      },
    },

    // Performance & Best Practices
    {
      rules: {
        'no-unused-vars': 'off',
        'no-console': 'warn',
        'prefer-const': 'error',
        'no-var': 'error',
        'no-param-reassign': 'warn',
        'array-callback-return': 'error',
        'max-nested-callbacks': ['warn', 3],
        'no-unneeded-ternary': 'warn',
        'no-nested-ternary': 'warn',
        'prefer-destructuring': 'warn',
        'prefer-template': 'warn',
        'no-else-return': 'warn',
        'arrow-body-style': ['error', 'as-needed'],
      },
    },

    // Code Style & Formatting
    {
      rules: {
        'key-spacing': ['error', { beforeColon: false, afterColon: true }],
        'keyword-spacing': ['error', { before: true, after: true }],
        'object-curly-spacing': ['error', 'always'],
        'array-bracket-spacing': ['error', 'never'],
        'space-in-parens': ['error', 'never'],
        'space-before-blocks': ['error', 'always'],
        quotes: ['error', 'single', { avoidEscape: true }],
        semi: ['error', 'always'],
        'comma-dangle': ['error', 'always-multiline'],
      },
    },

    // Function Style
    {
      rules: {
        'func-style': ['error', 'expression'],
        'arrow-parens': ['error', 'always'],
        'no-restricted-syntax': [
          'error',
          {
            selector: 'FunctionDeclaration:not(ClassBody FunctionDeclaration)',
            message: 'Use arrow functions outside of classes instead of function declarations',
          },
        ],
      },
    },

    // Custom rules override
    applyOverrides({}, { rules }),
  );
};

export default createBaseConfig;


