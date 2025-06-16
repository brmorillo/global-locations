import { Countries } from '../../src/services/countries.service';

/**
 * Testes de benchmark/performance para o serviço Countries
 *
 * Estes testes medem o desempenho dos métodos principais da classe Countries
 * para garantir que eles tenham performance aceitável mesmo com grandes volumes de dados.
 */
describe('Countries Service - Testes de Performance', () => {
  describe('Desempenho com dados reais', () => {
    it('deve ter desempenho aceitável ao buscar todos os países', () => {
      const startTime = performance.now();
      Countries.getAllCountriesAndData();
      const endTime = performance.now();
      const executionTime = endTime - startTime;

      // O tempo de execução deve ser menor que 100ms (ajuste conforme necessário)
      expect(executionTime).toBeLessThan(100);
      console.log(`getAllCountriesAndData: ${executionTime.toFixed(2)}ms`);
    });

    it('deve ter desempenho aceitável ao buscar todos os estados', () => {
      const startTime = performance.now();
      Countries.getAllStates();
      const endTime = performance.now();
      const executionTime = endTime - startTime;

      // O tempo de execução deve ser menor que 100ms (ajuste conforme necessário)
      expect(executionTime).toBeLessThan(100);
      console.log(`getAllStates: ${executionTime.toFixed(2)}ms`);
    });

    it('deve ter desempenho aceitável ao buscar todas as cidades de um país', () => {
      const startTime = performance.now();
      Countries.getAllCities({ countryId: 'BR' });
      const endTime = performance.now();
      const executionTime = endTime - startTime;

      // O tempo de execução deve ser menor que 200ms (ajuste conforme necessário)
      expect(executionTime).toBeLessThan(200);
      console.log(`getAllCities: ${executionTime.toFixed(2)}ms`);
    });

    it('deve ter desempenho aceitável ao buscar cidades por nome', () => {
      const startTime = performance.now();
      Countries.searchCitiesByName('São');
      const endTime = performance.now();
      const executionTime = endTime - startTime;

      // O tempo de execução deve ser menor que 200ms (ajuste conforme necessário)
      expect(executionTime).toBeLessThan(200);
      console.log(`searchCitiesByName: ${executionTime.toFixed(2)}ms`);
    });
  });

  describe('Desempenho com grandes volumes de dados', () => {
    // Variável para armazenar os países originais
    let originalCountries: any[];

    // Simulando um país com muitos estados e cidades para teste de performance
    beforeAll(() => {
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
        states: Array(500)
          .fill(null)
          .map((_, stateIndex) => ({
            id: 1000 + stateIndex,
            name: `State ${stateIndex}`,
            acronym: `S${stateIndex}`,
            cities: Array(20)
              .fill(null)
              .map((_, cityIndex) => ({
                stateId: 1000 + stateIndex,
                name: `City ${stateIndex}-${cityIndex}`,
                id: 100000 + stateIndex * 100 + cityIndex,
              })),
          })),
      };

      // Adicionando temporariamente ao array de países
      originalCountries = [...Countries['countries']];
      Countries['countries'] = [...originalCountries, mockCountry];
    });

    afterAll(() => {
      // Restaurando o array original
      Countries['countries'] = originalCountries;
    });

    it('deve ter desempenho aceitável com grande volume de estados', () => {
      const startTime = performance.now();
      const states = Countries.getStatesByCountryId('BIG');
      const endTime = performance.now();
      const executionTime = endTime - startTime;

      expect(states).toBeDefined();
      expect(states?.length).toBe(500);
      expect(executionTime).toBeLessThan(200);
      console.log(
        `getStatesByCountryId (500 estados): ${executionTime.toFixed(2)}ms`,
      );
    });

    it('deve ter desempenho aceitável com grande volume de cidades', () => {
      const startTime = performance.now();
      const cities = Countries.getAllCities({ countryId: 'BIG' });
      const endTime = performance.now();
      const executionTime = endTime - startTime;

      expect(cities).toBeDefined();
      expect(cities.length).toBe(500 * 20); // 500 estados com 20 cidades cada = 10.000 cidades
      expect(executionTime).toBeLessThan(500);
      console.log(
        `getAllCities (10.000 cidades): ${executionTime.toFixed(2)}ms`,
      );
    });

    it('deve ter desempenho aceitável ao buscar cidades por nome em grande volume', () => {
      const startTime = performance.now();
      const results = Countries.searchCitiesByName('City 100-');
      const endTime = performance.now();
      const executionTime = endTime - startTime;

      expect(results.length).toBeGreaterThan(0);
      expect(executionTime).toBeLessThan(500);
      console.log(
        `searchCitiesByName (10.000 cidades): ${executionTime.toFixed(2)}ms`,
      );
    });
  });
});
