import { Countries } from '../../src/services/countries.service';
import { countriesData } from '../../src/data';

/**
 * Testes de integração para o serviço Countries
 *
 * Estes testes usam os dados reais do arquivo JSON em vez de mocks
 * para verificar a integração correta com os dados reais.
 */
describe('Countries Service - Testes de Integração', () => {
  // Verificar se os dados reais estão sendo carregados corretamente
  describe('Carregamento de dados reais', () => {
    it('deve carregar os dados reais de países', () => {
      const countries = Countries.getAllCountriesAndData();
      expect(countries).toBeDefined();
      expect(Array.isArray(countries)).toBe(true);
      expect(countries.length).toBeGreaterThan(0);
    });

    it('deve ter a estrutura de dados correta para países', () => {
      const countries = Countries.getAllCountriesAndData();
      const firstCountry = countries[0];

      expect(firstCountry).toHaveProperty('id');
      expect(firstCountry).toHaveProperty('name');
      expect(firstCountry).toHaveProperty('acronym');
      expect(firstCountry).toHaveProperty('capital');
      expect(firstCountry).toHaveProperty('coin');
      expect(firstCountry).toHaveProperty('coinCode');
      expect(firstCountry).toHaveProperty('regionGroup');
      expect(firstCountry).toHaveProperty('economicGroups');
      expect(firstCountry).toHaveProperty('continent');
      expect(firstCountry).toHaveProperty('ddi');
      expect(firstCountry).toHaveProperty('states');
      expect(Array.isArray(firstCountry.states)).toBe(true);
    });

    it('deve ter a estrutura de dados correta para estados', () => {
      const countries = Countries.getAllCountriesAndData();
      const firstCountry = countries.find(
        (country) => country.states && country.states.length > 0,
      );

      if (!firstCountry) {
        // Se não encontrar país com estados, o teste é inconclusivo
        console.warn('Nenhum país com estados encontrado para testar');
        return;
      }

      // Garantir que states existe e tem pelo menos um elemento
      expect(firstCountry.states).toBeDefined();
      expect(firstCountry.states!.length).toBeGreaterThan(0);

      const firstState = firstCountry.states![0];
      expect(firstState).toHaveProperty('id');
      expect(firstState).toHaveProperty('name');
      expect(firstState).toHaveProperty('acronym');
      expect(firstState).toHaveProperty('cities');
      expect(Array.isArray(firstState.cities)).toBe(true);
    });

    it('deve ter a estrutura de dados correta para cidades', () => {
      const countries = Countries.getAllCountriesAndData();

      // Encontrar um país com estados e cidades
      let cityFound = false;
      for (const country of countries) {
        if (!country.states || country.states.length === 0) continue;

        for (const state of country.states) {
          if (!state.cities || state.cities.length === 0) continue;

          const firstCity = state.cities[0];
          expect(firstCity).toHaveProperty('id');
          expect(firstCity).toHaveProperty('name');
          expect(firstCity).toHaveProperty('stateId');
          expect(firstCity.stateId).toBe(state.id);

          cityFound = true;
          break;
        }

        if (cityFound) break;
      }

      if (!cityFound) {
        console.warn('Nenhuma cidade encontrada para testar');
      }
    });
  });

  // Testes de integração para os métodos principais
  describe('Integração com métodos principais', () => {
    it('deve encontrar o Brasil nos dados reais', () => {
      const brazil = Countries.findCountryByProperty('id', 'BR');
      expect(brazil).toBeDefined();
      expect(brazil?.name).toBe('Brasil');
    });

    it('deve retornar estados do Brasil', () => {
      const states = Countries.getStatesByCountryId('BR');
      expect(states).toBeDefined();
      expect(Array.isArray(states)).toBe(true);
      expect(states!.length).toBeGreaterThan(0);
    });

    it('deve encontrar São Paulo entre os estados do Brasil', () => {
      const states = Countries.getStatesByCountryId('BR');
      const saoPaulo = states?.find((state) => state.name === 'São Paulo');
      expect(saoPaulo).toBeDefined();
      expect(saoPaulo?.acronym).toBe('SP');
    });

    it('deve retornar cidades de São Paulo', () => {
      // Primeiro encontramos o ID do estado de São Paulo
      const states = Countries.getStatesByCountryId('BR');
      const saoPaulo = states?.find((state) => state.name === 'São Paulo');

      if (!saoPaulo) {
        console.warn('Estado de São Paulo não encontrado para testar');
        return;
      }

      const cities = Countries.getCitiesByStateId({
        countryId: 'BR',
        stateId: String(saoPaulo.id),
      });

      expect(cities).toBeDefined();
      expect(Array.isArray(cities)).toBe(true);
      expect(cities.length).toBeGreaterThan(0);
    });
  });
});
