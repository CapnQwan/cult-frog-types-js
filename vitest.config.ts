import { baseVitestConfig } from '@cult-frog/tooling/vitest/base';

export default baseVitestConfig({
  aliasName: '@cult-frog/types',
  testOverrides: {
    // This package ships types only, so there is no runtime code to exercise.
    // All of its tests are *type* tests, collected by `typecheck` below.
    passWithNoTests: true,
    typecheck: {
      enabled: true,
      only: true,
      include: ['src/**/*.test-d.ts'],
      tsconfig: './tsconfig.json',
    },
  },
});
