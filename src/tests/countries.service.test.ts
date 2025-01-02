import { Locations } from '../services/locations.service';

// Mocking data for testing
jest.mock('../data/countries_states_cities.json', () => ({
  countries: [
    {
      id: 'BR',
      name: 'Brazil',
      acronym: 'BR',
      capital: 'Brasília',
      coin: 'Real',
      coinCode: 'BRL',
      regionGroup: 'Americas',
      economicGroups: ['Mercosul', 'UNASUL'],
      continent: 'South America',
      ddi: '+55',
      states: [
        {
          id: 12,
          name: 'Acre',
          acronym: 'AC',
          cities: [
            { stateId: 12, name: 'Acrelândia', code: 1200013 },
            { stateId: 12, name: 'Rio Branco', code: 1200401 },
          ],
        },
      ],
    },
    {
      id: 'US',
      name: 'United States',
      acronym: 'US',
      capital: 'Washington, D.C.',
      coin: 'Dollar',
      coinCode: 'USD',
      regionGroup: 'Americas',
      economicGroups: ['NAFTA'],
      continent: 'North America',
      ddi: '+1',
      states: [
        {
          id: 1,
          name: 'California',
          acronym: 'CA',
          cities: [
            { stateId: 1, name: 'Los Angeles', code: 90001 },
            { stateId: 1, name: 'San Francisco', code: 94101 },
          ],
        },
      ],
    },
  ],
}));

describe('Locations Service', () => {
  describe('getData', () => {
    it('should return all countries', () => {
      const countries = Locations.getData();
      expect(countries.length).toBe(2);
      expect(countries[0].name).toBe('Brazil');
    });
  });

  describe('getCountryBy', () => {
    it('should return a country by ID', () => {
      const country = Locations.getCountryBy('id', 'BR');
      expect(country).toBeDefined();
      expect(country?.name).toBe('Brazil');
    });

    it('should return a country by name', () => {
      const country = Locations.getCountryBy('name', 'United States');
      expect(country).toBeDefined();
      expect(country?.acronym).toBe('US');
    });

    it('should return undefined for non-existent country', () => {
      const country = Locations.getCountryBy('id', 'ZZ');
      expect(country).toBeUndefined();
    });
  });

  describe('getStatesByCountry', () => {
    it('should return states for a country by ID', () => {
      const states = Locations.getStatesByCountry('id', 'BR');
      expect(states).toBeDefined();
      expect(states?.length).toBe(1);
      expect(states?.[0].name).toBe('Acre');
    });

    it('should return undefined for non-existent country', () => {
      const states = Locations.getStatesByCountry('id', 'ZZ');
      expect(states).toBeUndefined();
    });
  });

  describe('getCitiesByState', () => {
    it('should return cities for a state by name', () => {
      const cities = Locations.getCitiesByState('BR', 'name', 'Acre');
      expect(cities).toBeDefined();
      expect(cities?.length).toBe(2);
      expect(cities?.[0].name).toBe('Acrelândia');
    });

    it('should return undefined for non-existent state', () => {
      const cities = Locations.getCitiesByState(
        'BR',
        'name',
        'NonExistentState',
      );
      expect(cities).toBeUndefined();
    });

    it('should return undefined for non-existent country', () => {
      const cities = Locations.getCitiesByState('ZZ', 'name', 'Acre');
      expect(cities).toBeUndefined();
    });
  });
});
