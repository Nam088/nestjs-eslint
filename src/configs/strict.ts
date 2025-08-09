import tseslint from 'typescript-eslint';

import type { EcomESLintOptions, ESLintConfigArray } from '../types.js';
import { createBaseConfig } from './base.js';
import {
  createJestConfig,
  createJSDocConfig,
  createLodashConfig,
  createSecurityConfig,
  createSonarJSConfig,
} from './plugins.js';

/**
 * Strict ESLint configuration with all rules enabled
 */
export const createStrictConfig = (options: EcomESLintOptions = {}): ESLintConfigArray => {
  const strictOptions: EcomESLintOptions = {
    strict: true,
    jest: true,
    jsdoc: true,
    security: true,
    sonarjs: true,
    lodash: true,
    nestjs: false,
    ...options,
  };

  const configs: ESLintConfigArray = [
    ...createBaseConfig(strictOptions),
    ...createJestConfig(strictOptions),
    ...createJSDocConfig(strictOptions),
    ...createSecurityConfig(strictOptions),
    ...createSonarJSConfig(strictOptions),
    ...createLodashConfig(strictOptions),
  ];

  const strictRules = tseslint.config({
    rules: {
      // TypeScript strict rules
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/strict-boolean-expressions': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',

      // Strict code quality
      'no-console': 'error',
      'no-debugger': 'error',
      'no-alert': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-script-url': 'error',

      // Complexity limits
      complexity: ['error', 10],
      'max-depth': ['error', 4],
      'max-lines': ['error', 500],
      'max-lines-per-function': ['error', 100],
      'max-params': ['error', 4],

      // Documentation requirements
      'jsdoc/require-jsdoc': [
        'error',
        {
          require: {
            FunctionDeclaration: true,
            MethodDefinition: true,
            ClassDeclaration: true,
            ArrowFunctionExpression: true,
          },
        },
      ],

      // Override any custom rules
      ...(strictOptions.rules || {}),
    },
  });

  return [...configs, ...strictRules];
};

export default createStrictConfig;
