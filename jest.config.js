const isCI = process.env.CI === 'true';

/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  projects: [
    {
      displayName: 'unit',
      testMatch: ['<rootDir>/tests/unit/**/*.spec.ts'],
      testEnvironment: 'node',
      transform: { '^.+\\.ts$': 'ts-jest' },
    },
    {
      displayName: 'integration',
      testMatch: ['<rootDir>/tests/integration/**/*.int-spec.ts'],
      testEnvironment: 'node',
      transform: { '^.+\\.ts$': 'ts-jest' },
    },
    ...(isCI
      ? []
      : [
          {
            displayName: 'benchmark',
            testMatch: ['<rootDir>/tests/benchmark/**/*.bench.ts'],
            testEnvironment: 'node',
            transform: { '^.+\\.ts$': 'ts-jest' },
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
