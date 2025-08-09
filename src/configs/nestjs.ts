import tseslint from 'typescript-eslint';

import type { EcomESLintOptions, ESLintConfigArray } from '../types.js';
import { createBaseConfig } from './base.js';
import {
  createClassMemberConfig,
  createJSDocConfig,
  createJestConfig,
  createLodashConfig,
  createSecurityConfig,
  createSonarJSConfig,
} from './plugins.js';

/**
 * NestJS optimized ESLint configuration
 */
export const createNestJSConfig = (options: EcomESLintOptions = {}): ESLintConfigArray => {
  const nestjsOptions: EcomESLintOptions = {
    nestjs: true,
    jest: true,
    security: true,
    sonarjs: true,
    lodash: true,
    jsdoc: false,
    ...options,
  };

  const configs: ESLintConfigArray = [
    ...createBaseConfig(nestjsOptions),
    ...createJestConfig(nestjsOptions),
    ...createJSDocConfig(nestjsOptions),
    ...createSecurityConfig(nestjsOptions),
    ...createSonarJSConfig(nestjsOptions),
    ...createLodashConfig(nestjsOptions),
    ...createClassMemberConfig(nestjsOptions),
  ];

  const nestjsSpecificRules = tseslint.config({
    rules: {
      // Allow decorators
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',

      // NestJS patterns
      'class-methods-use-this': 'off',
      '@typescript-eslint/no-empty-function': ['error', { allow: ['constructors'] }],

      // Allow parameter properties
      '@typescript-eslint/parameter-properties': 'off',

      // Custom decorators and metadata
      '@typescript-eslint/no-unsafe-return': 'warn',

      // Override any custom rules
      ...(nestjsOptions.rules || {}),
    },
  });

  return [...configs, ...nestjsSpecificRules];
};

export default createNestJSConfig;
