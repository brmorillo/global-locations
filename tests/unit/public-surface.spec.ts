import * as pkg from '../../src/index';
import { Countries, GlobalLocations } from '../../src/index';

/**
 * Public-surface invariants.
 *
 * Asserts that the package root keeps exposing the documented API. This catches
 * accidental removals/renames that line coverage cannot (a deleted method still
 * leaves 100% coverage on the remaining ones). Keep this list in sync with the
 * README "API" section when adding public methods.
 */
describe('public surface', () => {
  it('re-exports GlobalLocations facade with the Countries service', () => {
    expect(GlobalLocations).toBeDefined();
    expect(GlobalLocations.Countries).toBe(Countries);
  });

  it('re-exports the Countries service class', () => {
    expect(typeof Countries).toBe('function');
  });

  const EXPECTED_METHODS = [
    'findCountryByProperty',
    'getAllCountriesAndData',
    'getAllCountries',
    'getCountryBy',
    'getAllStates',
    'getStatesByCountryId',
    'getStateByParams',
    'isStateInCountry',
    'getAllCities',
    'getCitiesByStateId',
    'getCitiesByParams',
    'getCityById',
    'searchCitiesByName',
    'getCountriesByContinent',
    'getCountriesByEconomicGroup',
  ] as const;

  it.each(EXPECTED_METHODS)(
    'Countries.%s is a public static method',
    (method) => {
      expect(typeof (Countries as unknown as Record<string, unknown>)[method]).toBe(
        'function',
      );
    },
  );

  it('does not expose unexpected extra static methods', () => {
    const ownStatics = Object.getOwnPropertyNames(Countries).filter(
      (name) =>
        typeof (Countries as unknown as Record<string, unknown>)[name] ===
          'function' && !['length', 'name', 'prototype'].includes(name),
    );
    expect(ownStatics.sort()).toEqual([...EXPECTED_METHODS].sort());
  });

  it('exports the documented type-only members at runtime-safe positions', () => {
    // Types are erased at runtime; assert the value-level exports only.
    const valueExports = Object.keys(pkg).sort();
    expect(valueExports).toEqual(['Countries', 'GlobalLocations']);
  });
});
