# Contributing to @brmorillo/global-locations

Thanks for your interest in contributing! These guidelines keep the library
consistent, type-safe and safe to publish.

## Development setup

This project uses **bun** as its package manager (`bun.lock` is authoritative).

```bash
bun install        # install dependencies
bun run build      # tsup build (CJS + ESM + d.ts)
```

> Node.js >= 18 is required (`package.json` `engines`).

## Development workflow

```bash
bun run type-check   # tsc --noEmit (strict mode)
bun run lint         # eslint --fix
bun run format       # prettier --write
bun run test         # full jest suite (unit + integration + benchmark)
CI=true bun run test:ci   # what CI runs: unit + integration + coverage gate
```

1. Create a `feat/…`, `fix/…` or `chore/…` branch off `main`.
2. Make your changes and add tests.
3. Make sure `type-check`, `lint:ci`, `test:ci` and `build` are all green.
4. Commit with Conventional Commits (use `bun run commit` for a guided prompt).
5. Push and open a pull request — the PR template checklist must pass.

## Testing

Tests live under `tests/` and run with **jest + ts-jest** (config in
`jest.config.js`, types via `tsconfig.spec.json`):

| Layer | Glob | Runs in CI | Purpose |
|-------|------|-----------|---------|
| **unit** | `tests/unit/*.spec.ts` | yes | per-method behavior against mocked data |
| **integration** | `tests/integration/*.int-spec.ts` | yes | real `countries.json` end to end |
| **benchmark** | `tests/benchmark/*.bench.ts` | no (machine-dependent thresholds) | performance guardrails |

Cross-cutting invariant guards (keep these green):

- `tests/unit/public-surface.spec.ts` — asserts every documented public method
  stays exported and that no unexpected static leaks in.
- `tests/unit/states-fallback.spec.ts` — drives the defensive `?? []` / `|| []`
  branches that real data never triggers (keeps branch coverage at 100%).

Coverage thresholds are enforced (`jest.config.js`): **95%** statements /
functions / lines, **88%** branches. The suite currently sits at **100%** on
all four — please don't regress it.

```bash
bun run test:coverage   # local coverage report
```

## External consumer smoke test (CJS + ESM)

The in-repo jest suite can't see packaging problems — a broken `exports` map,
a `.d.ts` that doesn't resolve, or an ESM-only dependency leaking in. A sibling
project **`../global-locations-dumb`** (not committed here) installs the packed
tarball and exercises the public API via both `require` (CJS) and `import`
(ESM, named + namespace).

To validate the real artifact after a change:

```bash
# 1. build + pack the library
cd ../global-locations && bun run build && npm pack
mv brmorillo-global-locations-*.tgz ../global-locations-dumb/

# 2. install the tarball and run both smokes
cd ../global-locations-dumb
npm install ./brmorillo-global-locations-*.tgz
npm run smoke      # node smoke.cjs && node smoke.mjs
```

Both must print `OK` with all assertions passing. Run this before any change
that touches `package.json` exports, `tsup.config.ts`, `tsconfig.json`, or
runtime dependencies.

## Dependency policy

- Pin every dependency to an **exact** version (no `^` / `~`).
- The package ships dual CJS + ESM, so every runtime dependency must provide a
  `require` (CJS) build — verify `exports.require` before bumping a major, then
  re-run the consumer smoke test above.

## Release process

Releases are automated with **commit-and-tag-version** + GitHub Actions:

1. Open a PR → `pr-version` computes and commits the next version on the branch.
2. Merge → `release` tags `vX.Y.Z`, publishes to npm with provenance, and cuts
   a GitHub release.

Maintainers own the release; do not hand-edit the version in `package.json`.

## License

By contributing you agree your contributions are licensed under the project's
MIT license.
