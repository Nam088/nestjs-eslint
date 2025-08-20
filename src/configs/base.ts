// @ts-check
import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';

import { importX } from 'eslint-plugin-import-x';
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
    functionStyle = 'both',
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
    groups: [
      'builtin',
      'external',
      'internal',
      'parent',
      'sibling',
      'index',
    ],
    pathGroups: [
      // NestJS core modules
      { pattern: '@nestjs/**', group: 'external', position: 'before' },
      // Project internal modules (common patterns)
      { pattern: '@/*', group: 'internal', position: 'after' },
      { pattern: '~/', group: 'internal', position: 'after' },
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

    // Import-x flat configs
    importX.flatConfigs.recommended,
    importX.flatConfigs.typescript,
    
    // Custom import sorting & Unused Imports
    {
      plugins: {
        'unused-imports': unusedImportsPlugin as any,
        perfectionist: perfectionistPlugin as any,
        '@stylistic': stylistic as any,
      },
      rules: {
        'import-x/order': [
          'error',
          {
            'newlines-between': 'always',
            alphabetize: { order: 'asc', caseInsensitive: true },
            groups: defaultImportGroups.groups,
            pathGroups: defaultImportGroups.pathGroups,
            pathGroupsExcludedImportTypes: ['builtin'],
          },
        ],
        'import-x/no-duplicates': 'error',
        'import-x/newline-after-import': 'error',
        'import-x/namespace': 'off', // Disable namespace rule to avoid bodyParser issues
        // Disable perfectionist sort-imports in favor of import-x
        'perfectionist/sort-imports': 'off',
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
        '@typescript-eslint/consistent-type-imports': [
          'error',
          {
            prefer: 'type-imports',
            disallowTypeAnnotations: false,
            fixStyle: 'separate-type-imports',
          },
        ],
        '@typescript-eslint/consistent-type-exports': [
          'error',
          {
            fixMixedExportsWithInlineTypeSpecifier: true,
          },
        ],
        '@stylistic/lines-between-class-members': [
          'error',
          'always',
          {
            exceptAfterSingleLine: true,
            exceptAfterOverload: true,
          },
        ],
        'padding-line-between-statements': [
          'error',
          // Control flow statements
          { blankLine: 'always', prev: 'if', next: '*' },
          { blankLine: 'always', prev: '*', next: 'if' },
          { blankLine: 'always', prev: 'for', next: '*' },
          { blankLine: 'always', prev: '*', next: 'for' },
          { blankLine: 'always', prev: 'while', next: '*' },
          { blankLine: 'always', prev: '*', next: 'while' },
          { blankLine: 'always', prev: 'switch', next: '*' },
          { blankLine: 'always', prev: '*', next: 'switch' },
          { blankLine: 'always', prev: 'try', next: '*' },
          { blankLine: 'always', prev: '*', next: 'try' },
          
          // Variable declarations
          { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
          { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] }, // Allow multiple variables together
          
          // Return statements
          { blankLine: 'always', prev: '*', next: 'return' },
          
          // Exports
          { blankLine: 'always', prev: '*', next: 'export' },
          
          // Functions and classes
          { blankLine: 'always', prev: '*', next: ['function', 'class'] },
          { blankLine: 'always', prev: ['function', 'class'], next: '*' },
          
          // Switch cases
          { blankLine: 'always', prev: 'case', next: '*' },
          { blankLine: 'always', prev: '*', next: 'case' },
          { blankLine: 'always', prev: 'default', next: '*' },
          { blankLine: 'always', prev: '*', next: 'default' },
          
          // Block-like statements
          { blankLine: 'always', prev: 'block-like', next: '*' },
          { blankLine: 'always', prev: '*', next: 'block-like' },
        ],
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
    (() => {
      if (functionStyle === 'arrow') {
        return {
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
        };
      }
      if (functionStyle === 'declaration') {
        return {
          rules: {
            'func-style': ['error', 'declaration', { allowArrowFunctions: false }],
            // In declaration mode, do not force arrow-only patterns
            'arrow-parens': ['error', 'always'],
            'no-restricted-syntax': 'off',
          },
        };
      }
      // both: allow both forms, keep only neutral formatting around arrows
      return {
        rules: {
          'func-style': 'off',
          'arrow-parens': ['error', 'always'],
          'no-restricted-syntax': 'off',
        },
      };
    })(),

    // Custom rules override
    applyOverrides({}, { rules }),
  );
};

export default createBaseConfig;


