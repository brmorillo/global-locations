import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  outExtension: ({ format }) => ({
    js: format === 'cjs' ? '.js' : '.mjs',
  }),
  dts: true, // Generate TypeScript types
  clean: true, // Clean dist folder before building
  sourcemap: true, // Generate source maps
});
