/**
 * @ecom-co/eslint - Shared ESLint configuration for e-commerce projects
 */
export { createBaseConfig } from './configs/base.js';
export { createNestJSConfig } from './configs/nestjs.js';
export { createStrictConfig } from './configs/strict.js';

export {
  createJestConfig,
  createJSDocConfig,
  createSecurityConfig,
  createSonarJSConfig,
  createLodashConfig,
  createClassMemberConfig,
  createPerfectionistConfig,
} from './configs/plugins.js';

export { mergeConfigs, applyOverrides } from './utils/merge-configs.js';
export type { EcomESLintOptions, ESLintConfig, ESLintConfigArray } from './types.js';

export { createBaseConfig as default } from './configs/base.js';
