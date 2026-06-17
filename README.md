# @brmorillo/global-locations

[![npm version](https://img.shields.io/npm/v/@brmorillo/global-locations?label=npm&color=cb3837)](https://www.npmjs.com/package/@brmorillo/global-locations)
[![CI](https://github.com/brmorillo/global-locations/actions/workflows/ci.yml/badge.svg)](https://github.com/brmorillo/global-locations/actions/workflows/ci.yml)
[![Downloads](https://img.shields.io/npm/dm/@brmorillo/global-locations.svg)](https://www.npmjs.com/package/@brmorillo/global-locations)
[![Bundle size](https://img.shields.io/bundlephobia/minzip/@brmorillo/global-locations?label=minzipped)](https://bundlephobia.com/package/@brmorillo/global-locations)
[![Node.js](https://img.shields.io/node/v/@brmorillo/global-locations?color=339933)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178c6.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Library for accessing global location data such as countries, states, and cities.

## Installation

```bash
npm install @brmorillo/global-locations
```

## Usage

```typescript
import { GlobalLocations } from '@brmorillo/global-locations';

// Get all countries
const countries = GlobalLocations.Countries.getAllCountries();

// Get a specific country by ID
const brazil = GlobalLocations.Countries.getCountryBy({
  property: 'id',
  value: 'BR',
  selectStates: true
});

// Get states of a country
const brazilStates = GlobalLocations.Countries.getStatesByCountryId('BR');

// Get cities of a state
const saoPauloCities = GlobalLocations.Countries.getCitiesByStateId({
  countryId: 'BR',
  stateId: '35'
});
```

## API

### Countries

- `findCountryByProperty(property, value)`: Finds a country by an arbitrary property
- `getAllCountriesAndData()`: Returns all countries with complete data
- `getAllCountries()`: Returns all countries without state data
- `getCountryBy({ property, value, selectStates })`: Returns a specific country
- `getAllStates()`: Returns all states from all countries
- `getStatesByCountryId(countryId)`: Returns states of a specific country
- `getStateByParams({ countryId, params })`: Searches for a specific state
- `isStateInCountry({ countryId, stateId })`: Checks if a state belongs to a country
- `getAllCities({ countryId })`: Returns all cities of a country
- `getCitiesByStateId({ countryId, stateId })`: Returns cities of a specific state
- `getCitiesByParams({ countryId, stateId, params })`: Searches for a specific city
- `getCityById(cityId)`: Finds a city by its numeric id across all countries
- `searchCitiesByName(name, caseSensitive?)`: Searches cities by (partial) name
- `getCountriesByContinent(continent, includeStates?)`: Filters countries by continent
- `getCountriesByEconomicGroup(group, includeStates?)`: Filters countries by economic group

## Quality & testing

- **Dual build**: ships CommonJS (`require`) and ESM (`import`) plus its own `.d.ts`.
- **TypeScript strict** end to end.
- **92 tests** (unit + integration) on jest, **100% coverage** (statements,
  branches, functions, lines).
- **External consumer smoke test** validates the published artifact via both
  `require` and `import` — see [CONTRIBUTING.md](./CONTRIBUTING.md#external-consumer-smoke-test-cjs--esm).

```bash
bun install
bun run test          # unit + integration + benchmark
bun run test:coverage # coverage report
bun run build         # CJS + ESM + d.ts
```

## Documentation

- [docs/README.md](./docs/README.md) — documentation index and data shapes.
- [docs/countries/README.md](./docs/countries/README.md) — full `Countries` reference: every method, parameters, return values and examples.

## Contributing & security

- [CONTRIBUTING.md](./CONTRIBUTING.md) — setup, workflow, testing, release flow.
- [SECURITY.md](./SECURITY.md) — supported versions and how to report a vulnerability.
- [CLAUDE.md](./CLAUDE.md) — architecture, conventions and context for contributors/AI assistants.

## License

MIT