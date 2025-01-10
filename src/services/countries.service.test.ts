// Mock de dados para testar a classe Countries
const mockCountries = [
  {
    id: '1',
    name: 'Country 1',
    acronym: 'C1',
    capital: 'Capital 1',
    coin: 'Coin 1',
    coinCode: 'C1C',
    regionGroup: 'Region 1',
    continent: 'Continent 1',
    ddi: '+1',
    states: [
      { id: '1-1', name: 'State 1', acronym: 'S1' },
      { id: '1-2', name: 'State 2', acronym: 'S2' },
    ],
  },
  {
    id: '2',
    name: 'Country 2',
    acronym: 'C2',
    capital: 'Capital 2',
    coin: 'Coin 2',
    coinCode: 'C2C',
    regionGroup: 'Region 2',
    continent: 'Continent 2',
    ddi: '+2',
    states: [{ id: '2-1', name: 'State 1', acronym: 'S1' }],
  },
];

// Configurando o mock para retornar diretamente os dados
jest.mock('../data', () => ({
  countriesData: {
    countries: mockCountries, // Dados diretamente atribuídos
  },
}));

import { Countries } from './countries.service'; // Importa a classe Countries

describe('Countries Class', () => {
  describe('getAllCountriesAndData', () => {
    it('should return all countries with their states', () => {
      const result = Countries.getAllCountriesAndData();
      expect(result).toEqual(mockCountries);
    });
  });

  describe('getAllCountries', () => {
    it('should return all countries without states', () => {
      const result = Countries.getAllCountries();
      expect(result).toEqual([
        {
          id: '1',
          name: 'Country 1',
          acronym: 'C1',
          capital: 'Capital 1',
          coin: 'Coin 1',
          coinCode: 'C1C',
          regionGroup: 'Region 1',
          continent: 'Continent 1',
          ddi: '+1',
        },
        {
          id: '2',
          name: 'Country 2',
          acronym: 'C2',
          capital: 'Capital 2',
          coin: 'Coin 2',
          coinCode: 'C2C',
          regionGroup: 'Region 2',
          continent: 'Continent 2',
          ddi: '+2',
        },
      ]);
    });
  });

  describe('getCountryBy', () => {
    it('should return the country by a specific property and value', () => {
      const result = Countries.getCountryBy({
        property: 'id',
        value: '1',
        selectStates: false,
      });
      expect(result).toEqual({
        id: '1',
        name: 'Country 1',
        acronym: 'C1',
        capital: 'Capital 1',
        coin: 'Coin 1',
        coinCode: 'C1C',
        regionGroup: 'Region 1',
        continent: 'Continent 1',
        ddi: '+1',
      });
    });

    it('should return the country with states if selectStates is true', () => {
      const result = Countries.getCountryBy({
        property: 'id',
        value: '1',
        selectStates: true,
      });
      expect(result).toEqual(mockCountries[0]);
    });

    it('should return undefined if no country is found', () => {
      const result = Countries.getCountryBy({
        property: 'id',
        value: '3',
        selectStates: false,
      });
      expect(result).toBeUndefined();
    });

    it('should return undefined if the property is invalid', () => {
      const result = Countries.getCountryBy({
        property: 'invalid' as any, // Propriedade inválida
        value: '1',
        selectStates: false,
      });
      expect(result).toBeUndefined();
    });

    it('should return undefined if the value is undefined', () => {
      const result = Countries.getCountryBy({
        property: 'id',
        value: undefined as any, // Valor indefinido
        selectStates: false,
      });
      expect(result).toBeUndefined();
    });
  });

  describe('getAllStates', () => {
    it('should return all states from all countries', () => {
      const result = Countries.getAllStates();
      expect(result).toEqual([
        { id: '1-1', name: 'State 1', acronym: 'S1' },
        { id: '1-2', name: 'State 2', acronym: 'S2' },
        { id: '2-1', name: 'State 1', acronym: 'S1' },
      ]);
    });
  });

  describe('getStatesByCountryId', () => {
    it('should return the states of a country by its ID', () => {
      const result = Countries.getStatesByCountryId({ countryId: '1' });
      expect(result).toEqual([
        { id: '1-1', name: 'State 1', acronym: 'S1' },
        { id: '1-2', name: 'State 2', acronym: 'S2' },
      ]);
    });

    it('should return undefined if no country is found by ID', () => {
      const result = Countries.getStatesByCountryId({ countryId: '3' });
      expect(result).toBeUndefined();
    });
  });

  describe('getStateByParams', () => {
    it('should return the state by property and value', () => {
      const result = Countries.getStateByParams({
        countryId: '1',
        params: { property: 'id', value: '1-1' },
      });
      expect(result).toEqual({ id: '1-1', name: 'State 1', acronym: 'S1' });
    });

    it('should return undefined if no state is found', () => {
      const result = Countries.getStateByParams({
        countryId: '1',
        params: { property: 'id', value: '3-1' },
      });
      expect(result).toBeUndefined();
    });
  });

  describe('isStateInCountry', () => {
    it('should return true if the state exists in the country', () => {
      const result = Countries.isStateInCountry({
        countryId: '1',
        stateId: '1-1',
      });
      expect(result).toBe(true);
    });

    it('should return false if the state does not exist in the country', () => {
      const result = Countries.isStateInCountry({
        countryId: '1',
        stateId: '3-1',
      });
      expect(result).toBe(false);
    });

    it('should return false if the country does not exist', () => {
      const result = Countries.isStateInCountry({
        countryId: '3',
        stateId: '1-1',
      });
      expect(result).toBe(false);
    });
  });

  describe('getAllCities', () => {
    it('should return all city names from a country', () => {
      const mockState = {
        id: 1,
        name: 'State Name',
        acronym: 'ST',
        cities: [
          { id: 1, stateId: 1, name: 'City A', code: 101 },
          { id: 2, stateId: 1, name: 'City B', code: 102 },
        ],
      };

      jest
        .spyOn(Countries, 'getStatesByCountryId')
        .mockReturnValueOnce([mockState]);

      const result = Countries.getAllCities({ countryId: '1' });
      expect(result).toEqual(['City A', 'City B']);
    });

    it('should return an empty array if the country has no states', () => {
      jest.spyOn(Countries, 'getStatesByCountryId').mockReturnValueOnce([]);

      const result = Countries.getAllCities({ countryId: '1' });
      expect(result).toEqual([]);
    });
  });

  describe('getCitiesByStateId', () => {
    it('should return all cities of a state in a country', () => {
      const mockState = {
        id: 1,
        name: 'State Name',
        acronym: 'ST',
        cities: [
          { id: 1, stateId: 1, name: 'City A', code: 101 },
          { id: 2, stateId: 1, name: 'City B', code: 102 },
        ],
      };

      jest
        .spyOn(Countries, 'getStatesByCountryId')
        .mockReturnValueOnce([mockState]);

      const result = Countries.getCitiesByStateId({
        countryId: '1',
        stateId: '1',
      });
      expect(result).toEqual(['City A', 'City B']);
    });

    it('should return an empty array if the state does not exist', () => {
      jest.spyOn(Countries, 'getStatesByCountryId').mockReturnValueOnce([]);

      const result = Countries.getCitiesByStateId({
        countryId: '1',
        stateId: '2',
      });
      expect(result).toEqual([]);
    });
  });

  describe('getCitiesByParams', () => {
    it('should return the city name if a city matches the parameters', () => {
      const mockState = {
        id: 1,
        name: 'State Name',
        acronym: 'ST',
        cities: [
          { id: 1, stateId: 1, name: 'City A', code: 101 },
          { id: 2, stateId: 1, name: 'City B', code: 102 },
        ],
      };

      jest
        .spyOn(Countries, 'getStatesByCountryId')
        .mockReturnValueOnce([mockState]);

      const result = Countries.getCitiesByParams({
        countryId: '1',
        stateId: '1',
        params: { property: 'name', value: 'City A' },
      });

      expect(result).toBe('City A');
    });

    it('should return undefined if no city matches the parameters', () => {
      const mockState = {
        id: 1,
        name: 'State Name',
        acronym: 'ST',
        cities: [
          { id: 1, stateId: 1, name: 'City A', code: 101 },
          { id: 2, stateId: 1, name: 'City B', code: 102 },
        ],
      };

      jest
        .spyOn(Countries, 'getStatesByCountryId')
        .mockReturnValueOnce([mockState]);

      const result = Countries.getCitiesByParams({
        countryId: '1',
        stateId: '1',
        params: { property: 'name', value: 'City C' },
      });

      expect(result).toBeUndefined();
    });

    it('should return undefined if the state does not exist', () => {
      jest.spyOn(Countries, 'getStatesByCountryId').mockReturnValueOnce([]);

      const result = Countries.getCitiesByParams({
        countryId: '1',
        stateId: '1',
        params: { property: 'name', value: 'City A' },
      });

      expect(result).toBeUndefined();
    });
  });
});
