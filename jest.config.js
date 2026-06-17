const isCI = process.env.CI === 'true';

const tsJest = ['ts-jest', { tsconfig: 'tsconfig.spec.json' }];

/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  projects: [
    {
      displayName: 'unit',
      testMatch: ['<rootDir>/tests/unit/**/*.spec.ts'],
      testEnvironment: 'node',
      transform: { '^.+\\.ts$': tsJest },
    },
    {
      displayName: 'integration',
      testMatch: ['<rootDir>/tests/integration/**/*.int-spec.ts'],
      testEnvironment: 'node',
      transform: { '^.+\\.ts$': tsJest },
    },
    ...(isCI
      ? []
      : [
          {
            displayName: 'benchmark',
            testMatch: ['<rootDir>/tests/benchmark/**/*.bench.ts'],
            testEnvironment: 'node',
            transform: { '^.+\\.ts$': tsJest },
          },
        ]),
  ],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  coverageThreshold: {
    global: {
      statements: 95,
      functions: 95,
      lines: 95,
      branches: 88,
    },
  },
};
