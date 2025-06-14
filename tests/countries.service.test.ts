import { Countries } from '../src/services/countries.service';

describe('Countries Service', () => {
  describe('getAllCountriesAndData', () => {
    it('should return all countries with complete data', () => {
      const countries = Countries.getAllCountriesAndData();
      expect(countries).toBeDefined();
      expect(Array.isArray(countries)).toBe(true);
      expect(countries.length).toBeGreaterThan(0);
      expect(countries[0].states).toBeDefined();
    });
  });

  describe('getAllCountries', () => {
    it('should return all countries without states data', () => {
      const countries = Countries.getAllCountries();
      expect(countries).toBeDefined();
      expect(Array.isArray(countries)).toBe(true);
      expect(countries.length).toBeGreaterThan(0);
      expect(countries[0].states).toBeUndefined();
    });
  });

  describe('getCountryBy', () => {
    it('should return a country by id without states', () => {
      const country = Countries.getCountryBy({
        property: 'id',
        value: 'BR',
        selectStates: false,
      });
      expect(country).toBeDefined();
      expect(country?.id).toBe('BR');
      expect(country?.states).toBeUndefined();
    });

    it('should return a country by id with states', () => {
      const country = Countries.getCountryBy({
        property: 'id',
        value: 'BR',
        selectStates: true,
      });
      expect(country).toBeDefined();
      expect(country?.id).toBe('BR');
      expect(country?.states).toBeDefined();
      expect(Array.isArray(country?.states)).toBe(true);
    });

    it('should return undefined for non-existent country', () => {
      const country = Countries.getCountryBy({
        property: 'id',
        value: 'XX',
        selectStates: false,
      });
      expect(country).toBeUndefined();
    });
  });

  describe('getAllStates', () => {
    it('should return all states from all countries', () => {
      const states = Countries.getAllStates();
      expect(states).toBeDefined();
      expect(Array.isArray(states)).toBe(true);
      expect(states.length).toBeGreaterThan(0);
    });
  });

  describe('getStatesByCountryId', () => {
    it('should return states for a valid country id', () => {
      const states = Countries.getStatesByCountryId('BR');
      expect(states).toBeDefined();
      expect(Array.isArray(states)).toBe(true);
      expect(states?.length).toBeGreaterThan(0);
    });

    it('should return undefined for an invalid country id', () => {
      const states = Countries.getStatesByCountryId('XX');
      expect(states).toBeUndefined();
    });
  });
});
