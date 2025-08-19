import type { TSESLint } from '@typescript-eslint/utils';

export interface EcomESLintOptions {
  /** Project root directory for TypeScript configuration */
  tsconfigRootDir?: string;

  /** Path to TypeScript configuration file */
  project?: string | string[];

  /** Enable strict mode rules */
  strict?: boolean;

  /** Enable NestJS specific rules */
  nestjs?: boolean;

  /** Enable Jest testing rules */
  jest?: boolean;

  /** Enable JSDoc documentation rules */
  jsdoc?: boolean;

  /** Enable security rules */
  security?: boolean;

  /** Enable SonarJS code quality rules */
  sonarjs?: boolean;

  /** Enable Lodash optimization rules */
  lodash?: boolean;

  /** Enable Perfectionist sorting rules */
  perfectionist?: {
    enabled: boolean;
    type?: 'recommended-alphabetical' | 'recommended-natural' | 'recommended-line-length' | 'recommended-custom';
    partitionByComment?: boolean;
  };

  /** Additional ignore patterns */
  ignores?: string[];

  /** Additional rules to override */
  rules?: TSESLint.Linter.RulesRecord;

  /** Custom import order groups */
  importGroups?: {
    groups?: Array<string | string[]>;
    pathGroups?: Array<{
      pattern: string;
      group: string;
      position?: 'before' | 'after';
    }>;
  };
}

export type ESLintConfig = TSESLint.FlatConfig.Config;
export type ESLintConfigArray = TSESLint.FlatConfig.ConfigArray;


