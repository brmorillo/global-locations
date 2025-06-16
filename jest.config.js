module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  projects: [
    {
      displayName: 'unit',
      testMatch: ['<rootDir>/tests/unit/**/*.spec.ts'],
      testEnvironment: 'node',
      transform: {
        '^.+\\.ts$': 'ts-jest',
      },
    },
    {
      displayName: 'integration',
      testMatch: ['<rootDir>/tests/integration/**/*.int-spec.ts'],
      testEnvironment: 'node',
      transform: {
        '^.+\\.ts$': 'ts-jest',
      },
    },
    {
      displayName: 'benchmark',
      testMatch: ['<rootDir>/tests/benchmark/**/*.bench.ts'],
      testEnvironment: 'node',
      transform: {
        '^.+\\.ts$': 'ts-jest',
      },
    }
  ],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};