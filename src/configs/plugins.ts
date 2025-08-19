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
          fallbackSort: { type: 'unsorted' },
          ignoreCase: true,
          specialCharacters: 'keep',
          partitionByComment: true,
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
            
            // Entity: Core properties theo thứ tự ưu tiên
            'id-property',
            'name-property',
            'identifier-property',
            'status-property',
            
            // Regular properties
            ['property', 'accessor-property'],
            ['get-method', 'set-method'],
            ['protected-property', 'protected-accessor-property'],
            ['protected-get-method', 'protected-set-method'],
            ['private-property', 'private-accessor-property'],
            ['private-get-method', 'private-set-method'],
            
            // Entity: References và relationships
            'foreign-key-property',
            'relation-property',
            
            // Entity: User tracking properties (Create → Upload → Update → Delete)
            'create-user-tracking-property',
            'upload-user-tracking-property',
            'update-user-tracking-property',
            'delete-user-tracking-property',

            // Entity: CRUD timestamps (Create → Update → Delete)
            'create-timestamp-property',
            'update-timestamp-property',
            'delete-timestamp-property',
            
            // Entity: Other timestamps
            'other-timestamp-property',
            
            'constructor',
            
            // Static methods
            ['static-method', 'static-function-property'],
            ['protected-static-method', 'protected-static-function-property'],
            ['private-static-method', 'private-static-function-property'],
            
            // Lifecycle hooks
            'lifecycle-hook',
            
            // Service: CRUD methods theo thứ tự logic
            'create-method',
            'read-method',
            'update-method',
            'delete-method',
            
            // Business logic methods
            'business-method',
            'utility-method',
            
            // Regular methods
            ['method', 'function-property'],
            ['protected-method', 'protected-function-property'],
            ['private-method', 'private-function-property'],
            
            'unknown',
          ],
          customGroups: [
            // Entity: Core properties
            {
              groupName: 'id-property',
              selector: 'property',
              elementNamePattern: '^id$',
            },
            {
              groupName: 'name-property',
              selector: 'property',
              elementNamePattern: '^(name|title)$',
            },
            {
              groupName: 'identifier-property',
              selector: 'property',
              elementNamePattern: '^(uuid|code|slug|email|username|phone|sku)$',
            },
            {
              groupName: 'status-property',
              selector: 'property',
              elementNamePattern: '^(status|state|type|isActive|isEnabled|isDeleted|isPublished|isVisible)$',
            },
            
            // Entity: References
            {
              groupName: 'foreign-key-property',
              selector: 'property',
              elementNamePattern: '.*Id$',
            },
            {
              groupName: 'relation-property',
              selector: 'property',
              decoratorNamePattern: '^(OneToOne|OneToMany|ManyToOne|ManyToMany|JoinColumn|JoinTable)$',
            },
            
            // Entity: CRUD timestamps (Create → Update → Delete)
            {
              groupName: 'create-timestamp-property',
              selector: 'property',
              elementNamePattern: '^createdAt$',
            },
            {
              groupName: 'update-timestamp-property',
              selector: 'property',
              elementNamePattern: '^updatedAt$',
            },
            {
              groupName: 'delete-timestamp-property',
              selector: 'property',
              elementNamePattern: '^deletedAt$',
            },
            
            // Entity: User tracking (Create → Upload → Update → Delete)
            {
              groupName: 'create-user-tracking-property',
              selector: 'property',
              elementNamePattern: '^createdBy$',
            },
            {
              groupName: 'upload-user-tracking-property',
              selector: 'property',
              elementNamePattern: '^uploadBy$',
            },
            {
              groupName: 'update-user-tracking-property',
              selector: 'property',
              elementNamePattern: '^updatedBy$',
            },
            {
              groupName: 'delete-user-tracking-property',
              selector: 'property',
              elementNamePattern: '^deletedBy$',
            },
            
            // Entity: Other timestamps
            {
              groupName: 'other-timestamp-property',
              selector: 'property',
              elementNamePattern: '^(?!createdAt$|updatedAt$|deletedAt$).*At$',
            },
            
            // Lifecycle hooks
            {
              groupName: 'lifecycle-hook',
              selector: 'method',
              elementNamePattern: '^(onModuleInit|onModuleDestroy|onApplicationBootstrap|onApplicationShutdown|beforeInsert|beforeUpdate|beforeRemove|afterInsert|afterUpdate|afterRemove|afterLoad)$',
            },
            
            // Service: CRUD methods
            {
              groupName: 'create-method',
              selector: 'method',
              elementNamePattern: '^(create|save|insert|add|build|bulkCreate|bulkInsert)',
            },
            {
              groupName: 'read-method',
              selector: 'method',
              elementNamePattern: '^(find|get|read|list|search|query|count|exists|check|load)',
            },
            {
              groupName: 'update-method',
              selector: 'method',
              elementNamePattern: '^(update|patch|edit|modify|set|upsert|bulkUpdate)',
            },
            {
              groupName: 'delete-method',
              selector: 'method',
              elementNamePattern: '^(delete|remove|destroy|clear|softDelete|hardDelete|restore|bulkDelete|bulkRemove)',
            },
            
            // Business logic
            {
              groupName: 'business-method',
              selector: 'method',
              elementNamePattern: '^(calculate|compute|process|validate|verify|approve|reject|activate|deactivate|enable|disable|publish|unpublish|confirm|cancel)',
            },
            {
              groupName: 'utility-method',
              selector: 'method',
              elementNamePattern: '^(format|transform|convert|parse|serialize|deserialize|sanitize|normalize|map|filter|sort)',
            },
          ],
        },
      ],
    },
  });
};
/** Perfectionist - enable broad sorting rules */
export const createPerfectionistConfig = (options: EcomESLintOptions = {}): ESLintConfigArray => {
  if (!options.perfectionist?.enabled) return [];
  
  const type = options.perfectionist.type || 'recommended-alphabetical';
  const partitionByComment = options.perfectionist.partitionByComment ?? true; // Default to true
  
  // Base options based on type
  const getBaseOptions = () => {
    switch (type) {
      case 'recommended-natural':
        return {
          type: 'natural' as const,
          order: 'asc' as const,
          fallbackSort: { type: 'unsorted' as const },
          ignoreCase: true,
          specialCharacters: 'keep' as const,
          partitionByComment,
          partitionByNewLine: false,
          newlinesBetween: 'ignore' as const,
        };
      case 'recommended-line-length':
        return {
          type: 'line-length' as const,
          order: 'asc' as const,
          fallbackSort: { type: 'unsorted' as const },
          ignoreCase: true,
          specialCharacters: 'keep' as const,
          partitionByComment,
          partitionByNewLine: false,
          newlinesBetween: 'ignore' as const,
        };
      case 'recommended-custom':
        return {
          type: 'alphabetical' as const,
          order: 'asc' as const,
          fallbackSort: { type: 'unsorted' as const },
          ignoreCase: true,
          specialCharacters: 'keep' as const,
          partitionByComment,
          partitionByNewLine: false,
          newlinesBetween: 'ignore' as const,
        };
      default: // recommended-alphabetical
        return {
          type: 'alphabetical' as const,
          order: 'asc' as const,
          fallbackSort: { type: 'unsorted' as const },
          ignoreCase: true,
          specialCharacters: 'keep' as const,
          partitionByComment,
          partitionByNewLine: false,
          newlinesBetween: 'ignore' as const,
        };
    }
  };
  
  const baseOptions = getBaseOptions();
  
  return tseslint.config({
    plugins: { perfectionist: perfectionistPlugin as any },
    rules: {
      'perfectionist/sort-array-includes': [
        'error',
        {
          ...baseOptions,
          groupKind: 'literals-first',
          useConfigurationIf: {},
          groups: [],
          customGroups: [],
        },
      ],

      'perfectionist/sort-classes': [
        'error',
        {
          ...baseOptions,
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
          type: baseOptions.type,
          order: baseOptions.order,
          fallbackSort: baseOptions.fallbackSort,
          ignoreCase: baseOptions.ignoreCase,
          specialCharacters: baseOptions.specialCharacters,
          partitionByComment: baseOptions.partitionByComment,
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
          ...baseOptions,
          sortByValue: false,
          forceNumericSort: false,
          groups: [],
          customGroups: [],
        },
      ],

      'perfectionist/sort-exports': [
        'error',
        {
          ...baseOptions,
          groupKind: 'mixed',
          groups: [],
          customGroups: [],
        },
      ],

      'perfectionist/sort-heritage-clauses': [
        'error',
        {
          type: baseOptions.type,
          order: baseOptions.order,
          fallbackSort: baseOptions.fallbackSort,
          ignoreCase: baseOptions.ignoreCase,
          specialCharacters: baseOptions.specialCharacters,
          groups: [],
          customGroups: {},
        },
      ],

      'perfectionist/sort-interfaces': [
        'error',
        {
          ...baseOptions,
          sortBy: 'name',
          ignorePattern: [],
          groupKind: 'mixed',
          groups: [],
          customGroups: [],
        },
      ],

      'perfectionist/sort-intersection-types': [
        'error',
        {
          ...baseOptions,
          groups: [],
          customGroups: [],
        },
      ],

      'perfectionist/sort-jsx-props': 'error',

      'perfectionist/sort-maps': [
        'error',
        {
          ...baseOptions,
          useConfigurationIf: {},
          groups: [],
          customGroups: [],
        },
      ],

      'perfectionist/sort-modules': [
        'error',
        {
          ...baseOptions,
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
          ...baseOptions,
          ignoreAlias: false,
          groupKind: 'mixed',
          groups: [],
          customGroups: [],
        },
      ],

      'perfectionist/sort-named-imports': 'error',

      'perfectionist/sort-object-types': [
        'error',
        {
          ...baseOptions,
          sortBy: 'name',
          ignorePattern: [],
          groups: [],
          customGroups: [],
        },
      ],

      'perfectionist/sort-objects': [
        'error',
        {
          ...baseOptions,
          objectDeclarations: true,
          destructuredObjects: true,
          styledComponents: true,
          ignorePattern: [],
          // Core properties first, then regular properties, then references, then tracking
                    groups: [
            // Core properties
            'id-property',
            'name-property', 
            'identifier-property',
            'status-property',
            
            'imports',
            'controllers', 
            'providers',
            'exports',
            
            // Regular properties
            'regular-property',
            
            // References & relationships
            'foreign-key-property',
            'relation-property',
            
            // User tracking properties (Create → Upload → Update → Delete)
            'create-user-tracking-property',
            'upload-user-tracking-property',
            'update-user-tracking-property',
            'delete-user-tracking-property',
            
            // CRUD timestamps (Create → Update → Delete)
            'create-timestamp-property',
            'update-timestamp-property',
            'delete-timestamp-property',
            
            // Other timestamps
            'other-timestamp-property',
            
            // Unknown properties
            'unknown',
          ],
          customGroups: {
            // Core properties
            'id-property': '^id$',
            'name-property': '^(name|title)$',
            'identifier-property': '^(uuid|code|slug|email|username|phone|sku)$',
            'status-property': '^(status|state|type|isActive|isEnabled|isDeleted|isPublished|isVisible)$',
            
            // CRUD timestamps (Create → Update → Delete)
            'create-timestamp-property': '^createdAt$',
            'update-timestamp-property': '^updatedAt$',
            'delete-timestamp-property': '^deletedAt$',
            
            // Regular properties (alphabetical)
            'regular-property': '^(?!id$|name$|title$|uuid$|code$|slug$|email$|username$|phone$|sku$|status$|state$|type$|isActive$|isEnabled$|isDeleted$|isPublished$|isVisible$|createdAt$|updatedAt$|deletedAt$|createdBy$|uploadBy$|updatedBy$|deletedBy$|.*Id$|imports$|controllers$|providers$|exports$).*$',
            
            // Foreign keys & relations
            'foreign-key-property': '.*Id$',
            'relation-property': '^(relation|relationship|ref|reference)$',
            
            // User tracking (Create → Upload → Update → Delete)
            'create-user-tracking-property': '^createdBy$',
            'upload-user-tracking-property': '^uploadBy$',
            'update-user-tracking-property': '^updatedBy$',
            'delete-user-tracking-property': '^deletedBy$',
            
            // Other timestamps (not CRUD)
            'other-timestamp-property': '^(?!createdAt$|updatedAt$|deletedAt$).*At$',
            
            // NestJS Module
            'imports': '^imports$',
            'controllers': '^controllers$', 
            'providers': '^providers$',
            'exports': '^exports$',
          },
        },
      ],

      'perfectionist/sort-sets': [
        'error',
        {
          ...baseOptions,
          groupKind: 'literals-first',
          groups: [],
          customGroups: [],
        },
      ],

      'perfectionist/sort-switch-case': [
        'error',
        {
          type: baseOptions.type,
          order: baseOptions.order,
          fallbackSort: baseOptions.fallbackSort,
          ignoreCase: baseOptions.ignoreCase,
          specialCharacters: baseOptions.specialCharacters,
        },
      ],

      'perfectionist/sort-union-types': [
        'error',
        {
          ...baseOptions,
          groups: [],
          customGroups: [],
        },
      ],

      'perfectionist/sort-variable-declarations': [
        'error',
        {
          ...baseOptions,
          groups: [],
          customGroups: [],
        },
      ],

      // Disable potentially conflicting rules
      'sort-imports': 'off',
      'react/jsx-sort-props': 'off',
      'sort-keys': 'off',
      '@typescript-eslint/adjacent-overload-signatures': 'off',
      '@typescript-eslint/sort-type-constituents': 'off',
      'perfectionist/sort-imports': 'off', // Prefer import-x/order
    },
  });
};
