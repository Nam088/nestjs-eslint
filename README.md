# @ecom-co/eslint

Shared ESLint configuration library for e-commerce projects. This package provides reusable, customizable ESLint configurations to ensure consistent code quality across multiple projects.

## Features

- 🎯 **Multiple Presets**: Base, NestJS, and Strict configurations
- 🔧 **Highly Customizable**: Override rules, add custom patterns, and configure plugins
- 📦 **Zero Config**: Works out of the box with sensible defaults
- 🚀 **TypeScript First**: Built with TypeScript support in mind
- 🧩 **Modular**: Use individual plugin configurations as needed
- 🎨 **Advanced Sorting**: Perfectionist plugin with 4 sorting types and custom class member organization
- 🏗️ **NestJS Optimized**: Smart class member sorting for entities and services
- 📏 **Code Formatting**: Consistent spacing and formatting rules with @stylistic
- 🔒 **Type Safety**: Enhanced TypeScript rules and consistent type imports/exports

## Installation

```bash
# Install the configuration package (no extra peer deps needed)
npm install --save-dev @ecom-co/eslint
```

## Quick Start

### Basic Configuration

Create `eslint.config.mjs` in your project root:

```javascript
import { createBaseConfig } from '@ecom-co/eslint';

export default createBaseConfig();
```

### NestJS Configuration

```javascript
import { createNestJSConfig } from '@ecom-co/eslint/nestjs';

export default createNestJSConfig({
  tsconfigRootDir: import.meta.dirname,
});
```

### Strict Configuration

```javascript
import { createStrictConfig } from '@ecom-co/eslint/strict';

export default createStrictConfig({
  tsconfigRootDir: import.meta.dirname,
  jsdoc: true,
});
```

## Configuration Options

All configuration functions accept an options object with the following properties:

```typescript
interface EcomESLintOptions {
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
  
  /** Perfectionist configuration */
  perfectionist?: {
    enabled: boolean;
    type?: 'recommended-alphabetical' | 'recommended-natural' | 'recommended-line-length' | 'recommended-custom';
    partitionByComment?: boolean;
  };
  
  /** Additional ignore patterns */
  ignores?: string[];
  
  /** Additional rules to override */
  rules?: Record<string, any>;
  
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
```

## Usage Examples

### Custom Rules Override

```javascript
import { createBaseConfig } from '@ecom-co/eslint';

export default createBaseConfig({
  rules: {
    'no-console': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
  },
});
```

### Perfectionist Configuration

```javascript
import { createBaseConfig } from '@ecom-co/eslint';

export default createBaseConfig({
  perfectionist: {
    enabled: true,
    type: 'recommended-alphabetical', // alphabetical, natural, line-length, custom
    partitionByComment: true, // Add blank lines between groups
  },
});
```

### Custom Import Groups

```javascript
import { createNestJSConfig } from '@ecom-co/eslint/nestjs';

export default createNestJSConfig({
  importGroups: {
    pathGroups: [
      {
        pattern: '@company/**',
        group: 'internal',
        position: 'before',
      },
      {
        pattern: '@shared/**',
        group: 'internal',
        position: 'after',
      },
    ],
  },
});
```

### Multiple Configurations

```javascript
import { createBaseConfig, createJestConfig } from '@ecom-co/eslint';
import { mergeConfigs } from '@ecom-co/eslint';

const baseConfig = createBaseConfig({
  jest: false, // Disable Jest in base config
});

const jestConfig = createJestConfig({
  jest: true,
});

export default mergeConfigs(baseConfig, jestConfig);
```

### Example: Max Mode (use all configs)

```javascript
import {
  createBaseConfig,
  createNestJSConfig,
  createStrictConfig,
  mergeConfigs,
} from '@ecom-co/eslint';

export default mergeConfigs(
  createBaseConfig({
    perfectionist: {
      enabled: true,
      type: 'recommended-alphabetical',
      partitionByComment: true,
    },
  }),
  createNestJSConfig({
    jest: true,
    security: true,
    sonarjs: true,
    lodash: true,
    nestjs: true,
    perfectionist: {
      enabled: true,
      type: 'recommended-alphabetical',
      partitionByComment: true,
    },
  }),
  createStrictConfig({ jsdoc: true }),
);
```

### Project-Specific Overrides

```javascript
import { createNestJSConfig } from '@ecom-co/eslint/nestjs';

export default createNestJSConfig({
  tsconfigRootDir: import.meta.dirname,
  ignores: [
    'src/generated/**',
    'src/legacy/**',
  ],
  perfectionist: {
    enabled: true,
    type: 'recommended-natural', // Use natural sorting for this project
    partitionByComment: false, // Disable partition by comment
  },
  rules: {
    // Disable specific rules for this project
    'sonarjs/cognitive-complexity': 'off',
  },
});
```

## Available Presets

### Base Configuration (`@ecom-co/eslint`)
- Essential TypeScript rules
- Import organization with `import-x`
- Code formatting with `@stylistic`
- Performance optimizations
- Basic security rules
- Perfectionist sorting (optional)

### NestJS Configuration (`@ecom-co/eslint/nestjs`)
- All base rules
- NestJS-specific patterns
- **Advanced Class Member Organization**:
  - Entity properties: `id` → `name` → `identifier` → `status` → regular properties → foreign keys → relations → user tracking → timestamps
  - Service methods: Lifecycle hooks → CRUD methods (Create → Read → Update → Delete) → Business logic → Utility methods
  - `@Module` decorator sorting: `imports` → `controllers` → `providers` → `exports`
- Decorator support
- Testing configuration

### Strict Configuration (`@ecom-co/eslint/strict`)
- All base rules
- Strict TypeScript checking
- Mandatory JSDoc
- Complexity limits
- Enhanced security rules

## Perfectionist Features

### Sorting Types
- **`recommended-alphabetical`**: Sort alphabetically (default)
- **`recommended-natural`**: Natural sorting (handles numbers correctly)
- **`recommended-line-length`**: Sort by line length
- **`recommended-custom`**: Custom sorting patterns

### Class Member Organization (NestJS)

**Entity Classes:**
```typescript
class User {
  // Core properties (first)
  id: number;
  name: string;
  email: string;
  status: string;
  
  // Regular properties
  avatar: string;
  bio: string;
  
  // Foreign keys & relations
  roleId: number;
  @OneToMany(() => Post, post => post.author)
  posts: Post[];
  
  // User tracking
  createdBy: number;
  updatedBy: number;
  
  // Timestamps (last)
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
```

**Service Classes:**
```typescript
class UserService {
  // Lifecycle hooks
  onModuleInit() {}
  
  // CRUD methods (Create → Read → Update → Delete)
  create() {}
  find() {}
  get() {}
  list() {}
  update() {}
  delete() {}
  remove() {}
  
  // Business logic
  activate() {}
  deactivate() {}
  
  // Utility methods
  format() {}
  validate() {}
}
```

## Code Quality Features

### Spacing & Formatting
- **Class member spacing**: Blank lines between class methods
- **Statement spacing**: Blank lines around control flow statements (if, for, while, try, etc.)
- **Import/Export spacing**: Consistent spacing around imports and exports

### Type Safety
- **Consistent type imports**: Enforce `import type` for type-only imports
- **Consistent type exports**: Enforce `export type` for type-only exports
- **Strict TypeScript**: Enhanced type checking rules

### Performance & Best Practices
- **Magic numbers**: Prevent hardcoded numbers without explanation
- **Object spread**: Prefer object spread over Object.assign
- **Async/await**: Enforce proper async/await usage
- **Promise handling**: Prevent common promise anti-patterns

## Individual Plugin Configurations

You can also use individual plugin configurations:

```javascript
import { 
  createBaseConfig,
  createJestConfig,
  createSecurityConfig,
  mergeConfigs 
} from '@ecom-co/eslint';

export default mergeConfigs(
  createBaseConfig({ jest: false, security: false }),
  createJestConfig({ jest: true }),
  createSecurityConfig({ security: true }),
);
```

## Migration from Existing ESLint Config

If you're migrating from an existing ESLint configuration:

1. **Backup your current config**: Save your existing `eslint.config.mjs` or `.eslintrc.*`
2. **Install the package**: Follow the installation instructions above
3. **Start with base config**: Begin with `createBaseConfig()`
4. **Gradually add features**: Enable plugins and rules as needed
5. **Override specific rules**: Use the `rules` option to maintain your current preferences

### Migration Example

```javascript
// Old .eslintrc.js
module.exports = {
  extends: ['@typescript-eslint/recommended'],
  rules: {
    'no-console': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
  },
};

// New eslint.config.mjs
import { createBaseConfig } from '@ecom-co/eslint';

export default createBaseConfig({
  rules: {
    'no-console': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
  },
});
```

## Contributing

When contributing to this package:

1. **Test your changes**: Ensure configurations work across different project types
2. **Update documentation**: Keep README and JSDoc comments up to date
3. **Follow semver**: Use appropriate version bumps for changes
4. **Add examples**: Include usage examples for new features

## Troubleshooting

### Common Issues

**"Cannot resolve dependency" errors**
- Ensure all peer dependencies are installed
- Check that TypeScript configuration path is correct

**"Rules not applying" issues**
- Verify the configuration is being exported correctly
- Check for conflicting rules in multiple configurations

**Performance issues**
- Use `project` option to limit TypeScript parsing scope
- Consider disabling expensive rules for large codebases

### Getting Help

1. Check the [troubleshooting section](#troubleshooting)
2. Review configuration examples above
3. Check peer dependency versions
4. Create an issue with your configuration and error details

## License

MIT
