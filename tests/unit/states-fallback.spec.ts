import { Countries } from '../../src/services/countries.service';

/**
 * Branch-coverage tests for the `states` null/undefined fallbacks
 * (`country.states || []` and `country.states ?? []`).
 *
 * The real `countries.json` always ships `states` as an array, so these
 * defensive branches are never exercised by the integration suite. Here we
 * mock countries where `states` is omitted (undefined) and explicitly `null`
 * to drive the fallbacks and the default `selectStates` argument.
 */
jest.mock('../../src/data', () => ({
  countriesData: {
    countries: [
      {
        // `states` intentionally omitted -> undefined
        id: 'NS',
        name: 'No States Land',
        acronym: 'NS',
        capital: 'Nowhere',
        coin: 'Credit',
        coinCode: 'CRD',
        regionGroup: 'Test',
        economicGroups: ['TestGroup'],
        continent: 'Testland',
        ddi: '+0',
      },
      {
        // `states` present but null
        id: 'NL',
        name: 'Null States Land',
        acronym: 'NL',
        capital: 'Void',
        coin: 'Credit',
        coinCode: 'CRD',
        regionGroup: 'Test',
        economicGroups: ['TestGroup'],
        continent: 'Testland',
        ddi: '+0',
        states: null,
      },
    ],
  },
}));

describe('Countries - states null/undefined fallbacks', () => {
  it('getAllStates() returns [] when every country has no states (|| [])', () => {
    expect(Countries.getAllStates()).toEqual([]);
  });

  it('isStateInCountry() returns false when states is null (?? [])', () => {
    // 'NL' has the `states` key (passes the `in` guard) but it is null,
    // so the `?? []` fallback at the .some() call is exercised.
    expect(Countries.isStateInCountry({ countryId: 'NL', stateId: '1' })).toBe(
      false,
    );
  });

  it('getCityById() returns undefined when no country has states (?? [])', () => {
    expect(Countries.getCityById(123)).toBeUndefined();
  });

  it('searchCitiesByName() returns [] when no country has states (?? [])', () => {
    expect(Countries.searchCitiesByName('Anything')).toEqual([]);
  });

  it('getCountryBy() defaults selectStates to false when omitted', () => {
    const country = Countries.getCountryBy({
      property: 'id',
      value: 'NS',
      // selectStates omitted on purpose to cover the default-argument branch
    } as { property: 'id'; value: string; selectStates: boolean });

    expect(country).toBeDefined();
    expect(country?.states).toBeUndefined();
  });
});
