# @brmorillo/global-locations

[![npm version](https://img.shields.io/npm/v/@brmorillo/global-locations?label=npm&color=cb3837)](https://www.npmjs.com/package/@brmorillo/global-locations)
[![CI](https://github.com/brmorillo/global-locations/actions/workflows/ci.yml/badge.svg)](https://github.com/brmorillo/global-locations/actions/workflows/ci.yml)
[![Downloads](https://img.shields.io/npm/dm/@brmorillo/global-locations.svg)](https://www.npmjs.com/package/@brmorillo/global-locations)
[![Bundle size](https://img.shields.io/bundlephobia/minzip/@brmorillo/global-locations?label=minzipped)](https://bundlephobia.com/package/@brmorillo/global-locations)
[![Node.js](https://img.shields.io/node/v/@brmorillo/global-locations?color=339933)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178c6.svg)](https://www.typescriptlang.org/)
[![License: LGPL-3.0](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)

> Countries, states and cities — one type-safe API, batteries (and data) included.

A production-ready library for **global location data**. It bundles a complete dataset of countries → states → cities and exposes it behind a single, consistent, type-safe service. No network calls, no API keys — the data ships with the package and is queried in-memory.

- 🌍 **Complete dataset** — countries, their states/provinces and cities, bundled in the package
- 🎯 **Type-safe** — full TypeScript types, ships its own declarations
- 📦 **Dual build** — CommonJS **and** ESM
- 🧩 **Consistent API** — one static service, predictable single-object arguments
- 🔌 **Offline** — no HTTP, no keys; everything resolves locally
- 🧪 **Well tested** — 92 unit/integration tests, 100% coverage, validated via a real CJS+ESM consumer

## Installation

```bash
bun add @brmorillo/global-locations
# or
npm install @brmorillo/global-locations
# or
pnpm add @brmorillo/global-locations
# or
yarn add @brmorillo/global-locations
```

Requires **Node.js >= 18**.

## Quick start

```typescript
import { GlobalLocations, Countries } from '@brmorillo/global-locations';

// via the facade…
const countries = GlobalLocations.Countries.getAllCountries();

// …or the class directly
const brazil = Countries.getCountryBy({
  property: 'id',
  value: 'BR',
  selectStates: true,
});

const states = Countries.getStatesByCountryId('BR');          // State[]
const cities = Countries.getCitiesByStateId({                 // string[]
  countryId: 'BR',
  stateId: '35',
});

// search & filter
Countries.searchCitiesByName('paulo');                        // [{ city, state, country }, …]
Countries.getCountriesByContinent('South America');           // Country[]
Countries.getCountriesByEconomicGroup('Mercosul');            // Country[]
```

Both `require` (CJS) and `import` (ESM) are supported — the package exposes the
right entry point for each via its `exports` map.

## Data model

The dataset is a tree of `Country → State → City`:

```ts
interface City    { id: number; stateId: number; name: string; extra?: object }
interface State   { id: number; name: string; acronym: string; cities: City[] }
interface Country {
  id: string;            // ISO code, e.g. "BR"
  name: string;          // "Brasil"
  acronym: string;
  capital: string;
  coin: string;
  coinCode: string;      // "BRL"
  regionGroup: string;
  economicGroups: string[];
  continent: string;
  ddi: string;           // international dialling code, e.g. "+55"
  states: State[] | undefined;
}
```

All four interfaces are exported from the package root:

```ts
import type { Country, State, City, LocationData } from '@brmorillo/global-locations';
```

## Conventions

These rules hold across the whole API:

- **One static service.** `Countries` is a static utility class — never instantiated.
  The `GlobalLocations` facade re-exports it (`GlobalLocations.Countries === Countries`).
- **Single object argument** for multi-parameter methods
  (`getCountryBy({ property, value, selectStates })`); single-value lookups take a
  positional argument (`getStatesByCountryId(countryId)`).
- **`undefined` means "not found"** for lookups — they never throw. List methods
  return `[]` for an empty or unknown scope.
- **Read-only.** The bundled dataset is never mutated; `getCountryBy({ selectStates: true })`
  returns a deep clone.
- **Case-insensitive by default** for name/group searches (`searchCitiesByName`,
  `getCountriesByContinent`, `getCountriesByEconomicGroup`).

## API

Full reference with parameters, return values and examples lives in
**[docs/countries/README.md](./docs/countries/README.md)**.

### Country
| Method | Description |
| --- | --- |
| `findCountryByProperty(property, value)` | Find a country by an arbitrary property |
| `getAllCountriesAndData()` | All countries with complete data (incl. states) |
| `getAllCountries()` | All countries without state data |
| `getCountryBy({ property, value, selectStates })` | A single country, optionally with states |
| `getCountriesByContinent(continent, includeStates?)` | Countries on a continent (case-insensitive) |
| `getCountriesByEconomicGroup(group, includeStates?)` | Countries in an economic group (case-insensitive) |

### State
| Method | Description |
| --- | --- |
| `getAllStates()` | Every state from every country, flattened |
| `getStatesByCountryId(countryId)` | States of one country (`undefined` if unknown) |
| `getStateByParams({ countryId, params })` | A single state, by an arbitrary property |
| `isStateInCountry({ countryId, stateId })` | Whether a state belongs to a country |

### City
| Method | Description |
| --- | --- |
| `getAllCities({ countryId })` | Names of all cities in a country |
| `getCitiesByStateId({ countryId, stateId })` | Names of all cities in a state |
| `getCitiesByParams({ countryId, stateId, params })` | A single city name, by an arbitrary property |
| `getCityById(cityId)` | A city by numeric id, across all countries |
| `searchCitiesByName(name, caseSensitive?)` | Cities whose name contains `name` (partial match) |

## Examples

```typescript
import { Countries } from '@brmorillo/global-locations';

// Lightweight list (no states): great for dropdowns
Countries.getAllCountries();                       // [{ id: 'BR', name: 'Brasil', states: undefined }, …]

// Drill down from country -> state -> city
const states = Countries.getStatesByCountryId('BR');
const firstState = states[0];
Countries.getCitiesByStateId({ countryId: 'BR', stateId: String(firstState.id) });

// Find a single city by its id (searches every country)
Countries.getCityById(3550308);                    // { id: 3550308, name: 'São Paulo', stateId: 35 }

// Fuzzy-ish name search (case-insensitive by default)
Countries.searchCitiesByName('paulo')              // partial match
  .map((hit) => `${hit.city.name}, ${hit.country.name}`);

// Group by continent or economic block, optionally including states
Countries.getCountriesByContinent('south america', /* includeStates */ true);
Countries.getCountriesByEconomicGroup('Mercosul');
```

## Quality & testing

- **Dual build** — ships CommonJS (`require`) and ESM (`import`) plus its own `.d.ts`.
- **TypeScript strict** end to end.
- **92 tests** (unit + integration) on jest, **100% coverage** (statements, branches,
  functions, lines), enforced by a CI coverage gate.
- **External consumer smoke test** installs the packed tarball and exercises every
  public method via both `require` and `import` — see
  [CONTRIBUTING.md](./CONTRIBUTING.md#external-consumer-smoke-test-cjs--esm).

```bash
bun install
bun run test          # unit + integration + benchmark
bun run test:coverage # coverage report
bun run build         # CJS + ESM + d.ts
```

## Documentation

- 📚 **[Module reference](./docs/README.md)** — documentation index and data shapes
- 🗺️ **[Countries reference](./docs/countries/README.md)** — every method, parameters, returns and examples
- 🤖 **[CLAUDE.md](./CLAUDE.md)** — architecture & conventions for contributors and AI assistants
- 🤝 **[CONTRIBUTING.md](./CONTRIBUTING.md)** — how to contribute
- 🔒 **[SECURITY.md](./SECURITY.md)** — vulnerability reporting & security policy

## Development

```bash
bun install            # install dependencies (this project uses bun)
bun run build          # typecheck + build (CJS + ESM + .d.ts)
bun run type-check     # tsc --noEmit (strict)
bun run test           # unit + integration tests
bun run lint           # lint
bun run format         # format with Prettier
```

## Contributing

All contributions must follow these conventions:

- **Commit messages** — [Conventional Commits](https://www.conventionalcommits.org/):
  `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`. Breaking changes get a `!`
  suffix (`feat!:`) and a `BREAKING CHANGE:` footer.
- **Branch naming** — `feature/<short-name>`, `fix/<issue>`, `docs/<topic>`, `chore/<task>`.
- **PR process** — open a PR against `main`; the CI pipeline (type-check → lint → test with
  coverage gate → build → secret scan) must pass. The `pr-version` workflow automatically
  commits the version bump (`chore(release): vX.Y.Z`) to your branch before merge.
- **Public surface** — when you add/rename/remove a public method, update both
  `docs/countries/README.md` and `tests/unit/public-surface.spec.ts` (it asserts the exact
  method set).
- **English only** — all identifiers, comments, doc strings and test descriptions in English.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full guide, including the external
consumer smoke test.

## Dependency policy

All runtime and development dependencies are pinned to **exact versions** (no `^`, `~`, or
`latest`) for fully reproducible installs. The single runtime dependency is
[`@brmorillo/utils`](https://www.npmjs.com/package/@brmorillo/utils).

Because the package ships dual CJS + ESM, every runtime dependency must provide a CommonJS
(`require`) build. Before bumping a runtime dependency major, verify it still ships one and
re-run the consumer smoke test:

```bash
node -p "Object.keys(require('<package>/package.json').exports)"   # must include 'require'
```

## License

[LGPL-3.0-only](./LICENSE) © [Bruno Morillo](https://github.com/brmorillo)

This library is free to use in any project (including commercial ones). You may not distribute
it as a closed-source product or sell it as your own. Any modifications to the library itself
must be released under the same license.
