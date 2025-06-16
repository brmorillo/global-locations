import { Countries } from '../../src/services/countries.service';
import { countriesData } from '../../src/data';
import { City, Country, State } from '../../src/services/countries.interface';

/**
 * Testes unitários para o serviço Countries
 *
 * Estes testes verificam o comportamento de cada método da classe Countries
 * usando dados mockados para isolar os testes da implementação real.
 */

// Mock do módulo de dados para controlar os testes
jest.mock('../../src/data', () => {
  // Dados de teste simplificados
  const mockData = {
    countries: [
      {
        id: 'BR',
        name: 'Brasil',
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
            id: 35,
            name: 'São Paulo',
            acronym: 'SP',
            cities: [
              {
                stateId: 35,
                name: 'São Paulo',
                id: 3550308,
              },
              {
                stateId: 35,
                name: 'Campinas',
                id: 3509502,
              },
            ],
          },
          {
            id: 33,
            name: 'Rio de Janeiro',
            acronym: 'RJ',
            cities: [
              {
                stateId: 33,
                name: 'Rio de Janeiro',
                id: 3304557,
              },
              {
                stateId: 33,
                name: 'Niterói',
                id: 3303302,
              },
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
        economicGroups: ['NAFTA', 'G7'],
        continent: 'North America',
        ddi: '+1',
        states: [
          {
            id: 36,
            name: 'New York',
            acronym: 'NY',
            cities: [
              {
                stateId: 36,
                name: 'New York City',
                id: 3651000,
              },
              {
                stateId: 36,
                name: 'Buffalo',
                id: 3610000,
              },
            ],
          },
        ],
      },
      {
        id: 'AR',
        name: 'Argentina',
        acronym: 'AR',
        capital: 'Buenos Aires',
        coin: 'Peso',
        coinCode: 'ARS',
        regionGroup: 'Americas',
        economicGroups: ['Mercosul', 'UNASUL'],
        continent: 'South America',
        ddi: '+54',
        states: [
          {
            id: 1,
            name: 'Buenos Aires',
            acronym: 'BA',
            cities: [
              {
                stateId: 1,
                name: 'Buenos Aires',
                id: 1001,
              },
            ],
          },
        ],
      },
      {
        id: 'CA',
        name: 'Canada',
        acronym: 'CA',
        capital: 'Ottawa',
        coin: 'Dollar',
        coinCode: 'CAD',
        regionGroup: 'Americas',
        economicGroups: ['NAFTA', 'G7'],
        continent: 'North America',
        ddi: '+1',
        states: [],
      },
    ],
  };
  return { countriesData: mockData };
});

describe('Countries Service', () => {
  // SEÇÃO 1: MÉTODOS BÁSICOS DE BUSCA DE PAÍSES

  describe('findCountryByProperty', () => {
    it('deve encontrar um país pelo ID', () => {
      const country = Countries.findCountryByProperty('id', 'BR');
      expect(country).toBeDefined();
      expect(country?.name).toBe('Brasil');
    });

    it('deve encontrar um país pelo nome', () => {
      const country = Countries.findCountryByProperty('name', 'United States');
      expect(country).toBeDefined();
      expect(country?.id).toBe('US');
    });

    it('deve retornar undefined para um país que não existe', () => {
      const country = Countries.findCountryByProperty('id', 'XX');
      expect(country).toBeUndefined();
    });

    it('deve retornar undefined para uma propriedade inválida', () => {
      const country = Countries.findCountryByProperty('name', '');
      expect(country).toBeUndefined();
    });

    it('deve lidar com valores undefined nos parâmetros', () => {
      // @ts-ignore - Testando comportamento com parâmetros inválidos
      const country = Countries.findCountryByProperty(undefined, 'BR');
      expect(country).toBeUndefined();
    });

    it('deve lidar com valores null nos parâmetros', () => {
      // @ts-ignore - Testando comportamento com parâmetros inválidos
      const country = Countries.findCountryByProperty('id', null);
      expect(country).toBeUndefined();
    });
  });

  // SEÇÃO 2: MÉTODOS DE LISTAGEM DE PAÍSES

  describe('getAllCountriesAndData', () => {
    it('deve retornar todos os países com dados completos', () => {
      const countries = Countries.getAllCountriesAndData();
      expect(countries).toHaveLength(4);
      expect(countries[0].states).toBeDefined();
      expect(countries[0].states?.length).toBe(2);
      expect(countries[1].states).toBeDefined();
      expect(countries[1].states?.length).toBe(1);
    });
  });

  describe('getAllCountries', () => {
    it('deve retornar todos os países sem os estados', () => {
      const countries = Countries.getAllCountries();
      expect(countries).toHaveLength(4);
      expect(countries[0].states).toBeUndefined();
      expect(countries[1].states).toBeUndefined();
    });
  });

  describe('getCountryBy', () => {
    it('deve retornar um país com estados quando selectStates é true', () => {
      const country = Countries.getCountryBy({
        property: 'id',
        value: 'BR',
        selectStates: true,
      });
      expect(country).toBeDefined();
      expect(country?.name).toBe('Brasil');
      expect(country?.states).toBeDefined();
      expect(country?.states?.length).toBe(2);
    });

    it('deve retornar um país sem estados quando selectStates é false', () => {
      const country = Countries.getCountryBy({
        property: 'id',
        value: 'BR',
        selectStates: false,
      });
      expect(country).toBeDefined();
      expect(country?.name).toBe('Brasil');
      expect(country?.states).toBeUndefined();
    });

    it('deve retornar undefined para um país que não existe', () => {
      const country = Countries.getCountryBy({
        property: 'id',
        value: 'XX',
        selectStates: true,
      });
      expect(country).toBeUndefined();
    });

    it('deve lidar com valores undefined nos parâmetros', () => {
      // @ts-ignore - Testando comportamento com parâmetros inválidos
      const result = Countries.getCountryBy({
        property: 'id',
        value: undefined,
        selectStates: true,
      });
      expect(result).toBeUndefined();
    });

    it('deve lidar com países sem estados', () => {
      const country = Countries.getCountryBy({
        property: 'id',
        value: 'CA',
        selectStates: true,
      });
      expect(country).toBeDefined();
      expect(country?.name).toBe('Canada');
      expect(country?.states).toEqual([]);
    });
  });

  // SEÇÃO 3: MÉTODOS DE BUSCA POR CONTINENTE E GRUPO ECONÔMICO

  describe('getCountriesByContinent', () => {
    it('deve encontrar países por continente', () => {
      const countries = Countries.getCountriesByContinent('South America');
      expect(countries).toHaveLength(2);
      expect(countries[0].name).toBe('Brasil');
      expect(countries[1].name).toBe('Argentina');
    });

    it('deve retornar países sem estados quando includeStates é false', () => {
      const countries = Countries.getCountriesByContinent(
        'South America',
        false,
      );
      expect(countries).toHaveLength(2);
      expect(countries[0].states).toBeUndefined();
      expect(countries[1].states).toBeUndefined();
    });

    it('deve retornar países com estados quando includeStates é true', () => {
      const countries = Countries.getCountriesByContinent(
        'South America',
        true,
      );
      expect(countries).toHaveLength(2);
      expect(countries[0].states).toBeDefined();
      expect(countries[0].states?.length).toBe(2);
      expect(countries[1].states).toBeDefined();
      expect(countries[1].states?.length).toBe(1);
    });

    it('deve ignorar maiúsculas/minúsculas na busca por continente', () => {
      const countries = Countries.getCountriesByContinent('south america');
      expect(countries).toHaveLength(2);
    });

    it('deve retornar array vazio quando nenhum país corresponde', () => {
      const countries = Countries.getCountriesByContinent('Antarctica');
      expect(countries).toEqual([]);
    });
  });

  describe('getCountriesByEconomicGroup', () => {
    it('deve encontrar países por grupo econômico', () => {
      const countries = Countries.getCountriesByEconomicGroup('Mercosul');
      expect(countries).toHaveLength(2);
      expect(countries[0].name).toBe('Brasil');
      expect(countries[1].name).toBe('Argentina');
    });

    it('deve retornar países sem estados quando includeStates é false', () => {
      const countries = Countries.getCountriesByEconomicGroup(
        'Mercosul',
        false,
      );
      expect(countries).toHaveLength(2);
      expect(countries[0].states).toBeUndefined();
      expect(countries[1].states).toBeUndefined();
    });

    it('deve retornar países com estados quando includeStates é true', () => {
      const countries = Countries.getCountriesByEconomicGroup('Mercosul', true);
      expect(countries).toHaveLength(2);
      expect(countries[0].states).toBeDefined();
      expect(countries[1].states).toBeDefined();
    });

    it('deve ignorar maiúsculas/minúsculas na busca por grupo econômico', () => {
      const countries = Countries.getCountriesByEconomicGroup('mercosul');
      expect(countries).toHaveLength(2);
    });

    it('deve retornar array vazio quando nenhum país corresponde', () => {
      const countries = Countries.getCountriesByEconomicGroup('União Europeia');
      expect(countries).toEqual([]);
    });

    it('deve encontrar países em grupos econômicos diferentes', () => {
      const countries = Countries.getCountriesByEconomicGroup('G7');
      expect(countries).toHaveLength(2);
      expect(countries.some((c) => c.name === 'United States')).toBe(true);
      expect(countries.some((c) => c.name === 'Canada')).toBe(true);
    });
  });

  // SEÇÃO 4: MÉTODOS DE ESTADOS

  describe('getAllStates', () => {
    it('deve retornar todos os estados de todos os países', () => {
      const states = Countries.getAllStates();
      expect(states.length).toBeGreaterThan(0);
      expect(states.some((s) => s.name === 'São Paulo')).toBe(true);
      expect(states.some((s) => s.name === 'Rio de Janeiro')).toBe(true);
      expect(states.some((s) => s.name === 'New York')).toBe(true);
    });
  });

  describe('getStatesByCountryId', () => {
    it('deve retornar os estados de um país específico', () => {
      const states = Countries.getStatesByCountryId('BR');
      expect(states).toBeDefined();
      expect(states?.length).toBe(2);
      expect(states?.[0].name).toBe('São Paulo');
      expect(states?.[1].name).toBe('Rio de Janeiro');
    });

    it('deve retornar undefined para um país que não existe', () => {
      const states = Countries.getStatesByCountryId('XX');
      expect(states).toBeUndefined();
    });

    it('deve retornar array vazio para um país sem estados', () => {
      const states = Countries.getStatesByCountryId('CA');
      expect(states).toEqual([]);
    });

    it('deve lidar com valores null nos parâmetros', () => {
      // @ts-ignore - Testando comportamento com parâmetros inválidos
      const result = Countries.getStatesByCountryId(null);
      expect(result).toBeUndefined();
    });
  });

  describe('getStateByParams', () => {
    it('deve encontrar um estado pelo nome', () => {
      const state = Countries.getStateByParams({
        countryId: 'BR',
        params: { property: 'name', value: 'São Paulo' },
      });
      expect(state).toBeDefined();
      expect(state?.id).toBe(35);
      expect(state?.acronym).toBe('SP');
    });

    it('deve encontrar um estado pela sigla', () => {
      const state = Countries.getStateByParams({
        countryId: 'BR',
        params: { property: 'acronym', value: 'RJ' },
      });
      expect(state).toBeDefined();
      expect(state?.id).toBe(33);
      expect(state?.name).toBe('Rio de Janeiro');
    });

    it('deve retornar undefined para um estado que não existe', () => {
      const state = Countries.getStateByParams({
        countryId: 'BR',
        params: { property: 'name', value: 'Amazonas' },
      });
      expect(state).toBeUndefined();
    });

    it('deve retornar undefined para um país que não existe', () => {
      const state = Countries.getStateByParams({
        countryId: 'XX',
        params: { property: 'name', value: 'São Paulo' },
      });
      expect(state).toBeUndefined();
    });
  });

  describe('isStateInCountry', () => {
    it('deve retornar true quando o estado pertence ao país', () => {
      const result = Countries.isStateInCountry({
        countryId: 'BR',
        stateId: '35',
      });
      expect(result).toBe(true);
    });

    it('deve retornar false quando o estado não pertence ao país', () => {
      const result = Countries.isStateInCountry({
        countryId: 'BR',
        stateId: '99',
      });
      expect(result).toBe(false);
    });

    it('deve retornar false para um país que não existe', () => {
      const result = Countries.isStateInCountry({
        countryId: 'XX',
        stateId: '35',
      });
      expect(result).toBe(false);
    });

    it('deve retornar false para um stateId inválido', () => {
      const result = Countries.isStateInCountry({
        countryId: 'BR',
        stateId: 'abc',
      });
      expect(result).toBe(false);
    });
  });

  // SEÇÃO 5: MÉTODOS DE CIDADES

  describe('getAllCities', () => {
    it('deve retornar todas as cidades de um país', () => {
      const cities = Countries.getAllCities({ countryId: 'BR' });
      expect(cities).toHaveLength(4);
      expect(cities).toContain('São Paulo');
      expect(cities).toContain('Campinas');
      expect(cities).toContain('Rio de Janeiro');
      expect(cities).toContain('Niterói');
    });

    it('deve retornar um array vazio para um país que não existe', () => {
      const cities = Countries.getAllCities({ countryId: 'XX' });
      expect(cities).toEqual([]);
    });

    it('deve retornar array vazio para um país sem estados', () => {
      const cities = Countries.getAllCities({ countryId: 'CA' });
      expect(cities).toEqual([]);
    });
  });

  describe('getCitiesByStateId', () => {
    it('deve retornar todas as cidades de um estado específico', () => {
      const cities = Countries.getCitiesByStateId({
        countryId: 'BR',
        stateId: '35',
      });
      expect(cities).toHaveLength(2);
      expect(cities).toContain('São Paulo');
      expect(cities).toContain('Campinas');
    });

    it('deve retornar um array vazio para um estado que não existe', () => {
      const cities = Countries.getCitiesByStateId({
        countryId: 'BR',
        stateId: '99',
      });
      expect(cities).toEqual([]);
    });

    it('deve retornar um array vazio para um país que não existe', () => {
      const cities = Countries.getCitiesByStateId({
        countryId: 'XX',
        stateId: '35',
      });
      expect(cities).toEqual([]);
    });

    it('deve retornar um array vazio para um stateId inválido', () => {
      const cities = Countries.getCitiesByStateId({
        countryId: 'BR',
        stateId: 'abc',
      });
      expect(cities).toEqual([]);
    });
  });

  describe('getCitiesByParams', () => {
    it('deve encontrar uma cidade pelo ID', () => {
      const city = Countries.getCitiesByParams({
        countryId: 'BR',
        stateId: '35',
        params: { property: 'id', value: '3550308' },
      });
      expect(city).toBe('São Paulo');
    });

    it('deve encontrar uma cidade pelo nome', () => {
      const city = Countries.getCitiesByParams({
        countryId: 'BR',
        stateId: '35',
        params: { property: 'name', value: 'Campinas' },
      });
      expect(city).toBe('Campinas');
    });

    it('deve retornar undefined para uma cidade que não existe', () => {
      const city = Countries.getCitiesByParams({
        countryId: 'BR',
        stateId: '35',
        params: { property: 'name', value: 'Santos' },
      });
      expect(city).toBeUndefined();
    });

    it('deve retornar undefined para um estado que não existe', () => {
      const city = Countries.getCitiesByParams({
        countryId: 'BR',
        stateId: '99',
        params: { property: 'name', value: 'São Paulo' },
      });
      expect(city).toBeUndefined();
    });

    it('deve retornar undefined para um país que não existe', () => {
      const city = Countries.getCitiesByParams({
        countryId: 'XX',
        stateId: '35',
        params: { property: 'name', value: 'São Paulo' },
      });
      expect(city).toBeUndefined();
    });
  });

  // SEÇÃO 6: MÉTODOS AVANÇADOS DE BUSCA DE CIDADES

  describe('getCityById', () => {
    it('deve encontrar uma cidade pelo ID', () => {
      const city = Countries.getCityById(3550308);
      expect(city).toBeDefined();
      expect(city?.name).toBe('São Paulo');
      expect(city?.stateId).toBe(35);
    });

    it('deve retornar undefined para uma cidade que não existe', () => {
      const city = Countries.getCityById(9999999);
      expect(city).toBeUndefined();
    });

    it('deve encontrar uma cidade em qualquer país', () => {
      const city = Countries.getCityById(3651000);
      expect(city).toBeDefined();
      expect(city?.name).toBe('New York City');
      expect(city?.stateId).toBe(36);
    });
  });

  describe('searchCitiesByName', () => {
    it('deve encontrar cidades pelo nome exato', () => {
      const results = Countries.searchCitiesByName('São Paulo');
      expect(results).toHaveLength(1);
      expect(results[0].city.name).toBe('São Paulo');
      expect(results[0].state.name).toBe('São Paulo');
      expect(results[0].country.name).toBe('Brasil');
    });

    it('deve encontrar cidades por parte do nome', () => {
      const results = Countries.searchCitiesByName('São');
      expect(results).toHaveLength(1);
      expect(results[0].city.name).toBe('São Paulo');
    });

    it('deve encontrar cidades ignorando maiúsculas/minúsculas por padrão', () => {
      const results = Countries.searchCitiesByName('são');
      expect(results).toHaveLength(1);
      expect(results[0].city.name).toBe('São Paulo');
    });

    it('deve respeitar maiúsculas/minúsculas quando caseSensitive é true', () => {
      const results = Countries.searchCitiesByName('são', true);
      expect(results).toHaveLength(0);
    });

    it('deve retornar array vazio quando nenhuma cidade corresponde', () => {
      const results = Countries.searchCitiesByName('Cidade Inexistente');
      expect(results).toEqual([]);
    });

    it('deve encontrar múltiplas cidades quando há correspondências', () => {
      const results = Countries.searchCitiesByName('New');
      expect(results).toHaveLength(1);
      expect(results[0].city.name).toBe('New York City');
    });
  });

  // SEÇÃO 7: TESTES DE CASOS ESPECIAIS

  describe('Casos especiais e caracteres especiais', () => {
    it('deve lidar com caracteres especiais nos nomes', () => {
      // Simulando um país com caracteres especiais
      const mockCountry = {
        id: 'TEST',
        name: 'Tést Cóuntry with Spécial Chàrs',
        acronym: 'TC',
        capital: 'Tést City',
        coin: 'Test Coin',
        coinCode: 'TST',
        regionGroup: 'Test Region',
        economicGroups: ['Test Group'],
        continent: 'Test Continent',
        ddi: '+999',
        states: [],
      };

      // Adicionando temporariamente ao array de países
      const originalCountries = [...Countries['countries']];
      Countries['countries'] = [...originalCountries, mockCountry];

      // Testando a busca
      const country = Countries.findCountryByProperty(
        'name',
        'Tést Cóuntry with Spécial Chàrs',
      );
      expect(country).toBeDefined();
      expect(country?.id).toBe('TEST');

      // Restaurando o array original
      Countries['countries'] = originalCountries;
    });
  });

  describe('Testes de casos extremos', () => {
    it('deve lidar com um grande número de estados', () => {
      // Simulando um país com muitos estados
      const mockCountry = {
        id: 'BIG',
        name: 'Big Country',
        acronym: 'BG',
        capital: 'Big Capital',
        coin: 'Big Coin',
        coinCode: 'BGC',
        regionGroup: 'Test Region',
        economicGroups: ['Test Group'],
        continent: 'Test Continent',
        ddi: '+888',
        states: Array(100)
          .fill(null)
          .map((_, index) => ({
            id: 1000 + index,
            name: `State ${index}`,
            acronym: `S${index}`,
            cities: [
              {
                stateId: 1000 + index,
                name: `City ${index}`,
                id: 10000 + index,
              },
            ],
          })),
      };

      // Adicionando temporariamente ao array de países
      const originalCountries = [...Countries['countries']];
      Countries['countries'] = [...originalCountries, mockCountry];

      // Testando a busca de estados
      const states = Countries.getStatesByCountryId('BIG');
      expect(states).toBeDefined();
      expect(states?.length).toBe(100);

      // Testando a busca de todas as cidades
      const cities = Countries.getAllCities({ countryId: 'BIG' });
      expect(cities).toBeDefined();
      expect(cities.length).toBe(100);

      // Restaurando o array original
      Countries['countries'] = originalCountries;
    });
  });
});
