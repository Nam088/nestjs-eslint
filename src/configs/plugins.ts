import jestPlugin from 'eslint-plugin-jest';
import jsdocPlugin from 'eslint-plugin-jsdoc';
// @ts-expect-error - No types available
import lodashPlugin from 'eslint-plugin-lodash';
// @ts-expect-error - No types available
import securityPlugin from 'eslint-plugin-security';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
// @ts-expect-error - No types available
import sortClassMembersPlugin from 'eslint-plugin-sort-class-members';
import tseslint from 'typescript-eslint';

import type { EcomESLintOptions, ESLintConfigArray } from '../types.js';

/**
 * Jest testing configuration
 */
export const createJestConfig = (options: EcomESLintOptions = {}): ESLintConfigArray => {
  if (!options.jest) return [];
  return tseslint.config({
    plugins: { jest: jestPlugin as any },
    rules: {
      'jest/no-identical-title': 'error',
      'jest/valid-expect': 'error',
      'jest/expect-expect': ['warn', { assertFunctionNames: ['expect', 'request.**.expect'] }],
    },
  });
};

/** JSDoc configuration */
export const createJSDocConfig = (options: EcomESLintOptions = {}): ESLintConfigArray => {
  if (!options.jsdoc) return [];
  return tseslint.config({
    plugins: { jsdoc: jsdocPlugin as any },
    rules: {
      'jsdoc/check-alignment': 'warn',
      'jsdoc/check-param-names': 'warn',
      'jsdoc/check-types': 'warn',
      'jsdoc/require-jsdoc': 'warn',
      'jsdoc/require-param': 'warn',
      'jsdoc/require-param-description': 'warn',
      'jsdoc/require-returns': 'warn',
      'jsdoc/require-returns-description': 'warn',
    },
  });
};

/** Security rules */
export const createSecurityConfig = (options: EcomESLintOptions = {}): ESLintConfigArray => {
  if (!options.security) return [];
  return tseslint.config({
    plugins: { security: securityPlugin as any },
    rules: {
      'security/detect-object-injection': 'error',
      'security/detect-non-literal-regexp': 'warn',
      'security/detect-possible-timing-attacks': 'warn',
    },
  });
};

/** SonarJS code quality */
export const createSonarJSConfig = (options: EcomESLintOptions = {}): ESLintConfigArray => {
  if (!options.sonarjs) return [];
  return tseslint.config({
    plugins: { sonarjs: sonarjsPlugin as any },
    rules: {
      'sonarjs/no-identical-functions': 'error',
      'sonarjs/no-duplicate-string': 'off',
      'sonarjs/cognitive-complexity': ['error', 15],
      'sonarjs/no-nested-template-literals': 'warn',
      'sonarjs/prefer-immediate-return': 'error',
    },
  });
};

/** Lodash optimization */
export const createLodashConfig = (options: EcomESLintOptions = {}): ESLintConfigArray => {
  if (!options.lodash) return [];
  return tseslint.config({
    plugins: { lodash: lodashPlugin as any },
    rules: {
      'lodash/prefer-lodash-method': [
        'error',
        {
          except: ['find', 'map', 'filter'],
          ignoreMethods: ['find', 'findOne', 'save', 'create', 'update', 'delete'],
          ignoreObjects: ['repository', 'Repository', 'QueryBuilder', 'bluebird', 'Bluebird', 'BPromise'],
        },
      ],
      'lodash/prefer-get': 'error',
      'lodash/identity-shorthand': ['error', 'always'],
    },
  });
};

/** Class member organization (Nest-friendly) */
export const createClassMemberConfig = (options: EcomESLintOptions = {}): ESLintConfigArray => {
  if (!options.nestjs) return [];
  return tseslint.config({
    plugins: { 'sort-class-members': sortClassMembersPlugin as any },
    rules: {
      'sort-class-members/sort-class-members': [
        'error',
        {
          order: [
            '[static-properties]',
            '[properties]',
            '[conventional-private-properties]',
            'constructor',
            '[static-methods]',
            '[methods]',
            '[conventional-private-methods]',
          ],
          accessorPairPositioning: 'getThenSet',
          stopAfterFirstProblem: false,
        },
      ],
    },
  });
};
