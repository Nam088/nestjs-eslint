import type { ESLintConfig, ESLintConfigArray } from '../types.js';

const deepMerge = (target: any, source: any): any => {
  if (Array.isArray(target) && Array.isArray(source)) {
    return [...target, ...source];
  }
  if (typeof target === 'object' && target !== null && typeof source === 'object' && source !== null) {
    const result: Record<string, any> = { ...target };
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        result[key] = deepMerge((target as any)?.[key], (source as any)[key]);
      }
    }
    return result;
  }
  return source !== undefined ? source : target;
};

export const mergeConfigs = (...configs: Array<ESLintConfig | ESLintConfigArray>): ESLintConfigArray => {
  const flattened = configs.flat() as ESLintConfigArray;
  if (flattened.length === 0) return [];
  if (flattened.length === 1) return Array.isArray(flattened[0]) ? (flattened[0] as ESLintConfigArray) : [flattened[0]];
  return flattened;
};

export const applyOverrides = (config: ESLintConfig, overrides: Partial<ESLintConfig>): ESLintConfig => {
  const result: ESLintConfig = { ...(config as any) };
  if ((overrides as any).rules) {
    (result as any).rules = { ...(result as any).rules, ...(overrides as any).rules };
  }
  if ((overrides as any).ignores) {
    (result as any).ignores = [
      ...(((result as any).ignores as string[]) || []),
      ...(((overrides as any).ignores as string[]) || []),
    ];
  }
  for (const key of Object.keys(overrides as object)) {
    if (key !== 'rules' && key !== 'ignores') {
      (result as any)[key] = deepMerge((result as any)[key], (overrides as any)[key]);
    }
  }
  return result;
};


