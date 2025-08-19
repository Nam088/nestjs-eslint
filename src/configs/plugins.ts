import jestPlugin from 'eslint-plugin-jest';
import jsdocPlugin from 'eslint-plugin-jsdoc';
// @ts-expect-error - No types available
import lodashPlugin from 'eslint-plugin-lodash';
// @ts-expect-error - No types available
import securityPlugin from 'eslint-plugin-security';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import perfectionistPlugin from 'eslint-plugin-perfectionist';
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
    plugins: { perfectionist: perfectionistPlugin as any },
    rules: {
      'perfectionist/sort-classes': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          groups: [
            'index-signature',
            'static-property',
            'static-block',
            ['property', 'accessor-property'],
            ['protected-property', 'protected-accessor-property'],
            ['private-property', 'private-accessor-property'],
            'constructor',
            'static-method',
            'method',
            'protected-method',
            'private-method',
            ['get-method', 'set-method'],
            'unknown',
          ],
          partitionByNewLine: false,
          newlinesBetween: 'ignore',
        },
      ],
    },
  });
};

/** Perfectionist - enable broad sorting rules */
export const createPerfectionistConfig = (options: EcomESLintOptions = {}): ESLintConfigArray => {
  if (!options.perfectionist) return [];
  return tseslint.config({
    plugins: { perfectionist: perfectionistPlugin as any },
    rules: {
      'perfectionist/sort-array-includes': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          fallbackSort: { type: 'unsorted' },
          ignoreCase: true,
          specialCharacters: 'keep',
          groupKind: 'literals-first',
          partitionByNewLine: false,
          newlinesBetween: 'ignore',
          useConfigurationIf: {},
          groups: [],
          customGroups: [],
        },
      ],

      'perfectionist/sort-classes': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          fallbackSort: { type: 'unsorted' },
          ignoreCase: true,
          specialCharacters: 'keep',
          partitionByComment: false,
          partitionByNewLine: false,
          newlinesBetween: 'ignore',
          ignoreCallbackDependenciesPatterns: [],
          groups: [
            'index-signature',
            ['static-property', 'static-accessor-property'],
            ['static-get-method', 'static-set-method'],
            ['protected-static-property', 'protected-static-accessor-property'],
            ['protected-static-get-method', 'protected-static-set-method'],
            ['private-static-property', 'private-static-accessor-property'],
            ['private-static-get-method', 'private-static-set-method'],
            'static-block',
            ['property', 'accessor-property'],
            ['get-method', 'set-method'],
            ['protected-property', 'protected-accessor-property'],
            ['protected-get-method', 'protected-set-method'],
            ['private-property', 'private-accessor-property'],
            ['private-get-method', 'private-set-method'],
            'constructor',
            ['static-method', 'static-function-property'],
            ['protected-static-method', 'protected-static-function-property'],
            ['private-static-method', 'private-static-function-property'],
            ['method', 'function-property'],
            ['protected-method', 'protected-function-property'],
            ['private-method', 'private-function-property'],
            'unknown',
          ],
          customGroups: [],
        },
      ],

      'perfectionist/sort-decorators': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          fallbackSort: { type: 'unsorted' },
          ignoreCase: true,
          specialCharacters: 'keep',
          groups: [],
          customGroups: {},
          sortOnClasses: true,
          sortOnMethods: true,
          sortOnAccessors: true,
          sortOnProperties: true,
          sortOnParameters: true,
        },
      ],

      'perfectionist/sort-enums': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          fallbackSort: { type: 'unsorted' },
          ignoreCase: true,
          specialCharacters: 'keep',
          partitionByComment: false,
          partitionByNewLine: false,
          newlinesBetween: 'ignore',
          sortByValue: false,
          forceNumericSort: false,
          groups: [],
          customGroups: [],
        },
      ],

      'perfectionist/sort-exports': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          fallbackSort: { type: 'unsorted' },
          ignoreCase: true,
          specialCharacters: 'keep',
          partitionByComment: false,
          partitionByNewLine: false,
          newlinesBetween: 'ignore',
          groupKind: 'mixed',
          groups: [],
          customGroups: [],
        },
      ],

      'perfectionist/sort-heritage-clauses': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          fallbackSort: { type: 'unsorted' },
          ignoreCase: true,
          specialCharacters: 'keep',
          groups: [],
          customGroups: {},
        },
      ],

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

      'perfectionist/sort-interfaces': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          fallbackSort: { type: 'unsorted' },
          ignoreCase: true,
          specialCharacters: 'keep',
          sortBy: 'name',
          ignorePattern: [],
          partitionByComment: false,
          partitionByNewLine: false,
          newlinesBetween: 'ignore',
          useConfigurationIf: {},
          groupKind: 'mixed',
          groups: [],
          customGroups: [],
        },
      ],

      'perfectionist/sort-intersection-types': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          fallbackSort: { type: 'unsorted' },
          ignoreCase: true,
          specialCharacters: 'keep',
          partitionByComment: false,
          partitionByNewLine: false,
          newlinesBetween: 'ignore',
          groups: [],
          customGroups: [],
        },
      ],

      // Not provided with explicit options in the docs snippet; enable with defaults
      'perfectionist/sort-jsx-props': 'error',

      'perfectionist/sort-maps': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          fallbackSort: { type: 'unsorted' },
          ignoreCase: true,
          specialCharacters: 'keep',
          partitionByNewLine: false,
          partitionByComment: false,
          newlinesBetween: 'ignore',
          useConfigurationIf: {},
          groups: [],
          customGroups: [],
        },
      ],

      'perfectionist/sort-modules': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          fallbackSort: { type: 'unsorted' },
          ignoreCase: true,
          specialCharacters: 'keep',
          partitionByComment: false,
          partitionByNewLine: false,
          newlinesBetween: 'ignore',
          groups: [
            'declare-enum',
            'export-enum',
            'enum',
            ['declare-interface', 'declare-type'],
            ['export-interface', 'export-type'],
            ['interface', 'type'],
            'declare-class',
            'class',
            'export-class',
            'declare-function',
            'export-function',
            'function',
          ],
          customGroups: [],
        },
      ],

      'perfectionist/sort-named-exports': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          fallbackSort: { type: 'unsorted' },
          ignoreAlias: false,
          ignoreCase: true,
          specialCharacters: 'keep',
          groupKind: 'mixed',
          partitionByNewLine: false,
          partitionByComment: false,
          newlinesBetween: 'ignore',
          groups: [],
          customGroups: [],
        },
      ],

      // Not provided with explicit options in the docs snippet; enable with defaults
      'perfectionist/sort-named-imports': 'error',

      'perfectionist/sort-object-types': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          fallbackSort: { type: 'unsorted' },
          ignoreCase: true,
          specialCharacters: 'keep',
          sortBy: 'name',
          ignorePattern: [],
          partitionByComment: false,
          partitionByNewLine: false,
          newlinesBetween: 'ignore',
          useConfigurationIf: {},
          groups: [],
          customGroups: [],
        },
      ],

      'perfectionist/sort-objects': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          fallbackSort: { type: 'unsorted' },
          ignoreCase: true,
          specialCharacters: 'keep',
          partitionByComment: false,
          partitionByNewLine: false,
          newlinesBetween: 'ignore',
          objectDeclarations: true,
          destructuredObjects: true,
          styledComponents: true,
          ignorePattern: [],
          useConfigurationIf: {},
          groups: [],
          customGroups: [],
        },
      ],

      'perfectionist/sort-sets': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          fallbackSort: { type: 'unsorted' },
          ignoreCase: true,
          specialCharacters: 'keep',
          groupKind: 'literals-first',
          partitionByNewLine: false,
          newlinesBetween: 'ignore',
          useConfigurationIf: {},
          groups: [],
          customGroups: [],
        },
      ],

      'perfectionist/sort-switch-case': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          fallbackSort: { type: 'unsorted' },
          ignoreCase: true,
          specialCharacters: 'keep',
        },
      ],

      'perfectionist/sort-union-types': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          fallbackSort: { type: 'unsorted' },
          ignoreCase: true,
          specialCharacters: 'keep',
          partitionByComment: false,
          partitionByNewLine: false,
          newlinesBetween: 'ignore',
          groups: [],
          customGroups: [],
        },
      ],

      'perfectionist/sort-variable-declarations': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          fallbackSort: { type: 'unsorted' },
          ignoreCase: true,
          specialCharacters: 'keep',
          partitionByNewLine: false,
          partitionByComment: false,
          newlinesBetween: 'ignore',
          groups: [],
          customGroups: [],
        },
      ],

      // Disable potentially conflicting rules in favor of perfectionist
      'sort-imports': 'off',
      'react/jsx-sort-props': 'off',
      'sort-keys': 'off',
      '@typescript-eslint/adjacent-overload-signatures': 'off',
      '@typescript-eslint/sort-type-constituents': 'off',
    },
  });
};
