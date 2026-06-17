# CLAUDE.md

Context guide for AI assistants and developers working in this repository. Read this first, then `docs/README.md` for the per-module reference.

## What this is

`@brmorillo/global-locations` — a production-ready library for global location data: **countries, states and cities** behind one consistent, type-safe API. One npm package, one service surface (`GlobalLocations.Countries`), backed by a bundled dataset.

- **Language:** TypeScript, compiled to **CommonJS + ESM** (dual) via `tsup`; ships its own `.d.ts`.
- **Package manager:** **bun** (`bun.lock` is authoritative). Use `bun install` / `bun add`. `bun.lock` is the only committed lockfile — `package-lock.json`/`pnpm-lock.yaml`/`yarn.lock` are gitignored. `npm` is used only for `npm pack` / `npm publish` (provenance).
- **Node:** >= 18 (`package.json` `engines`).
- **Data:** a large bundled `src/data/countries.json` (~15 MB) imported at load time and cast to `LocationData`. The compiled `dist/index.{js,mjs}` inline this data (~12 MB each) — this is expected.

## Mental model

The public surface is intentionally small:

1. **`GlobalLocations`** — the facade object. Today it exposes a single service: `GlobalLocations.Countries`.
2. **`Countries`** — a **static utility class** (never instantiated). All 15 methods are static. It reads the bundled dataset and returns plain data.
3. **Types** — `Country`, `State`, `City`, `LocationData` are exported interfaces (erased at runtime).

```ts
import { GlobalLocations, Countries } from '@brmorillo/global-locations';
GlobalLocations.Countries === Countries; // true
```

## Repository layout

```
src/
  index.ts                       # public surface: GlobalLocations facade + re-exports
  data/
    index.ts                     # loads countries.json -> countriesData: LocationData
    countries.json               # the bundled dataset (~15 MB)
  services/
    countries.service.ts         # the Countries static class (15 methods)
    countries.interface.ts       # Country / State / City / LocationData
tests/
  unit/                          # *.spec.ts        (run in CI)
  integration/                   # *.int-spec.ts    (run in CI, real dataset)
  benchmark/                     # *.bench.ts       (local only; perf thresholds, not in CI)
docs/                            # per-module docs: docs/<module>/README.md (+ docs/README.md index)
usage-example.js                 # runnable CJS smoke against the source/build
```

The external consumer smoke project lives **outside** this repo at `../global-locations-dumb` (see [Testing & quality](#testing--quality)).

## Data model

| Interface | Key fields |
| --- | --- |
| `Country` | `id` (ISO code, string), `name`, `acronym`, `capital`, `coin`, `coinCode`, `regionGroup`, `economicGroups: string[]`, `continent`, `ddi`, `states: State[] \| undefined` |
| `State` | `id` (number), `name`, `acronym`, `cities: City[]` |
| `City` | `id` (number), `stateId` (number), `name`, `extra?` |
| `LocationData` | `{ countries: Country[] }` |

Note `Country.states` is `State[] | undefined`. The shipped data always provides an array, but the service code defends against `null`/`undefined` with `?? []` / `|| []`. Those defensive branches are covered by `tests/unit/states-fallback.spec.ts` (real data never triggers them).

## Conventions (follow these)

- **Single object argument** for multi-param methods: `Countries.getCountryBy({ property, value, selectStates })`, `Countries.getCitiesByStateId({ countryId, stateId })`. Single-value lookups take a positional arg: `Countries.getStatesByCountryId(countryId)`, `Countries.getCityById(cityId)`.
- **Non-mutating / read-only.** The service never mutates the bundled dataset. `getCountryBy({ selectStates: true })` returns a **deep clone** so callers can't corrupt the shared data; the `selectStates: false` path returns a shallow copy with `states: undefined`.
- **Predicate naming.** Boolean checks use `is*` (`isStateInCountry`).
- **`undefined` for "not found"**, never `throw`, for lookup methods (`findCountryByProperty`, `getCountryBy`, `getStateByParams`, `getCitiesByParams`, `getCityById`). List methods return `[]` for an empty/unknown scope (`getAllCities`, `getCitiesByStateId`); `getStatesByCountryId` returns `undefined` for an unknown country.
- **Case-insensitive by default** for name/group searches (`searchCitiesByName`, `getCountriesByContinent`, `getCountriesByEconomicGroup`); `searchCitiesByName` accepts an optional `caseSensitive` flag.
- Comments, identifiers, docs and test descriptions are in **English** (test bodies may keep Portuguese descriptions as-is — match the surrounding file).
- Match the surrounding style; run Prettier (`bun run format`) before committing.

## Public API (15 methods on `Countries`)

Country: `findCountryByProperty`, `getAllCountriesAndData`, `getAllCountries`, `getCountryBy`, `getCountriesByContinent`, `getCountriesByEconomicGroup`.
State: `getAllStates`, `getStatesByCountryId`, `getStateByParams`, `isStateInCountry`.
City: `getAllCities`, `getCitiesByStateId`, `getCitiesByParams`, `getCityById`, `searchCitiesByName`.

Full reference with parameters, return values and examples: `docs/countries/README.md`. When you add/rename/remove a public method, update **both** `docs/countries/README.md` and `tests/unit/public-surface.spec.ts` (it asserts the exact method set).

## Dependency constraints (important)

This package ships dual CJS + ESM and depends on `@brmorillo/utils` at runtime, so **every runtime dependency must provide a CJS (`require`) build**. An ESM-only dependency breaks `require('@brmorillo/global-locations')` consumers and the build.

- Pin every dependency to an **exact** version (no `^` / `~`).
- Before bumping a runtime dependency major, check its `package.json` `exports` has a `require`/`node.require` entry, then re-run the external consumer smoke (below).

## Testing & quality

Test layers (`jest`, ts-jest; test types via `tsconfig.spec.json`):

- `tests/unit/*.spec.ts` and `tests/integration/*.int-spec.ts` — run in CI.
- `tests/benchmark/*.bench.ts` — local only (machine-dependent perf thresholds; excluded when `CI=true` via `jest.config.js`).

Cross-cutting **invariant guards** (keep these green):

- `tests/unit/public-surface.spec.ts` — asserts the exact set of public methods stays exported and no unexpected static leaks in.
- `tests/unit/states-fallback.spec.ts` — drives the `?? []` / `|| []` defensive branches (states null/undefined) that the real dataset never triggers, keeping branch coverage at 100%.
- `tests/integration/countries.service.int-spec.ts` — exercises the real `countries.json` end to end.

Coverage thresholds (enforced in `jest.config.js`): **95%** statements / functions / lines, **88%** branches. The suite currently sits at **100%** on all four — don't regress it.

**External consumer test** (`../global-locations-dumb`, a sibling project, not committed here): installs the packed tarball and exercises every method via both `require` (CJS) and `import` (ESM, named + namespace). Use it to validate the actual published artifact — packaging/export/ESM-dep problems the in-repo suite can't see:

```bash
cd ../global-locations && bun run build && npm pack          # produce brmorillo-global-locations-<v>.tgz
mv brmorillo-global-locations-*.tgz ../global-locations-dumb/ && cd ../global-locations-dumb
npm install ./brmorillo-global-locations-*.tgz
npm run smoke                                                # node smoke.cjs && node smoke.mjs
```

## Development workflow

```bash
bun install            # install deps (NOT npm)
bun run build          # tsc typecheck + tsup build (CJS + ESM + d.ts)
bun run type-check     # tsc --noEmit (strict mode)
CI=true bun run test:ci  # unit + integration (jest); benchmarks excluded in CI
bun run test:coverage  # coverage report
bun run lint           # eslint (flat config: eslint.config.js)
bun run format         # prettier --write src
```

Notes:
- `tsconfig.json` is `strict: true`, `moduleResolution: "bundler"`, with `ignoreDeprecations: "6.0"` (TypeScript 6 — `tsup`'s dts pipeline still emits a deprecated `baseUrl`).
- `.prettierrc` uses `endOfLine: "auto"` so lint passes on both LF (CI) and CRLF (Windows checkout).

## CI/CD (`.github/workflows/`)

- **`ci.yml`** — on PRs to `main` and pushes to `main`: setup-bun, `bun install --frozen-lockfile`, `type-check`, `lint:ci`, `test:ci` (coverage gate), `build`, and a **gitleaks** secret scan (`.gitleaks.toml`, `useDefault = true`; tests/examples/docs allowlisted).
- **`pr-version.yml`** — on PR open/synchronize/reopen to `main`: computes the next version from the PR's conventional commits with `commit-and-tag-version`, updates `package.json` + `CHANGELOG.md`, and commits `chore(release): vX.Y.Z` **back to the PR branch** (no tag). Same-repo PRs only.
- **`release.yml`** — on push to `main`: if `package.json`'s version isn't tagged yet, it `git tag`s `vX.Y.Z`, **publishes to npm** (`npm publish --provenance --access public`, needs the `NPM_TOKEN` secret), and creates a GitHub release.

Release flow: open a PR → `pr-version` bumps the version on the PR → merge → `release` tags + publishes. Node 24-compatible actions throughout (`checkout@v6`, `setup-node@v6`, `setup-bun@v2`, `action-gh-release@v3`).

Required repo settings: **Actions → Workflow permissions → Read and write**, and an **`NPM_TOKEN`** Actions secret for publishing.

## Where to look

- Public API & exports: `src/index.ts`
- Service implementation: `src/services/countries.service.ts`
- Per-module reference docs: `docs/countries/README.md` (index at `docs/README.md`)
- Project overview & usage: root `README.md`
- Contributor guidance: `CONTRIBUTING.md`; security policy: `SECURITY.md`
- Architecture/conventions (this file): `CLAUDE.md`
