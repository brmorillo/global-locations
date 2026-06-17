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

## License

MIT