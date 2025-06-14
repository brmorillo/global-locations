import { countriesData } from '../data';
import { City, Country, State } from './countries.interface';

/**
 * Classe que fornece métodos para acessar e manipular dados de localização global
 * como países, estados e cidades.
 *
 * @class Countries
 */
export class Countries {
  /**
   * Dados estáticos de países carregados do arquivo de dados
   * @private
   */
  private static countries: Country[] = countriesData.countries;

  /**
   * Função auxiliar para buscar um país por uma propriedade específica
   *
   * @param {keyof Country} property - Propriedade do país a ser usada na busca
   * @param {string} value - Valor da propriedade para comparação
   * @returns {Country | undefined} País encontrado ou undefined se não encontrado
   */
  public static findCountryByProperty(
    property: keyof Country,
    value: string,
  ): Country | undefined {
    return this.countries.find((country) => country[property] === value);
  }

  /**
   * Retorna todos os países com seus dados completos (incluindo estados).
   *
   * @returns {Country[]} Todos os países e seus dados completos
   * @example
   * // Obter todos os países com dados completos
   * const allCountries = Countries.getAllCountriesAndData();
   */
  public static getAllCountriesAndData(): Country[] {
    return this.countries;
  }

  /**
   * Retorna todos os países sem a propriedade 'states'.
   *
   * @returns {Omit<Country, 'states'>[]} Lista de países sem os dados de estados
   * @example
   * // Obter todos os países sem os dados de estados
   * const countries = Countries.getAllCountries();
   */
  public static getAllCountries(): Omit<Country, 'states'>[] {
    return this.countries.map(({ states, ...countryData }) => countryData);
  }

  /**
   * Retorna um país pelo valor de uma propriedade específica (id, nome, etc.).
   *
   * @param {Object} params - Parâmetros de busca
   * @param {keyof Country} params.property - Propriedade do país para buscar
   * @param {string} params.value - Valor da propriedade para a busca
   * @param {boolean} params.selectStates - Indica se deve incluir estados no resultado
   * @returns {Omit<Country, 'states'> | Country | undefined} País encontrado ou undefined se não encontrado
   * @example
   * // Buscar país pelo ID sem incluir estados
   * const brazil = Countries.getCountryBy({
   *   property: 'id',
   *   value: 'BR',
   *   selectStates: false
   * });
   */
  public static getCountryBy({
    property,
    value,
    selectStates = false,
  }: {
    property: keyof Country;
    value: string;
    selectStates: boolean;
  }): Omit<Country, 'states'> | Country | undefined {
    const country = this.findCountryByProperty(property, value);
    if (!country) return undefined;

    return selectStates ? country : { ...country, states: undefined };
  }

  /**
   * Retorna todos os estados de todos os países.
   *
   * @returns {State[]} Lista com todos os estados de todos os países
   * @example
   * // Obter todos os estados de todos os países
   * const allStates = Countries.getAllStates();
   */
  public static getAllStates(): State[] {
    return this.countries.flatMap((country) => country.states || []);
  }

  /**
   * Retorna os estados de um país específico.
   *
   * @param {string} countryId - ID do país
   * @returns {State[] | undefined} Estados do país ou undefined se o país não for encontrado
   * @example
   * // Obter todos os estados do Brasil
   * const brazilStates = Countries.getStatesByCountryId('BR');
   */
  public static getStatesByCountryId(countryId: string): State[] | undefined {
    const country = this.getCountryBy({
      property: 'id',
      value: countryId,
      selectStates: true,
    });

    if (country && 'states' in country) {
      return country.states;
    }

    return undefined;
  }

  /**
   * Busca um estado de um país com base em um parâmetro específico (id, nome, etc.).
   *
   * @param {Object} options - Opções de busca
   * @param {string} options.countryId - ID do país
   * @param {Object} options.params - Parâmetros para busca do estado
   * @param {keyof State} options.params.property - Propriedade do estado para buscar
   * @param {string} options.params.value - Valor da propriedade para a busca
   * @returns {State | undefined} Estado encontrado ou undefined se não encontrado
   * @example
   * // Buscar o estado de São Paulo no Brasil
   * const saoPaulo = Countries.getStateByParams({
   *   countryId: 'BR',
   *   params: { property: 'acronym', value: 'SP' }
   * });
   */
  public static getStateByParams({
    countryId,
    params,
  }: {
    countryId: string;
    params: { property: keyof State; value: string };
  }): State | undefined {
    const statesList = this.getStatesByCountryId(countryId);
    return statesList?.find((state) => state[params.property] === params.value);
  }

  /**
   * Verifica se um estado pertence a um país específico.
   *
   * @param {Object} options - Opções de verificação
   * @param {string} options.countryId - ID do país
   * @param {string} options.stateId - ID do estado
   * @returns {boolean} true se o estado pertencer ao país, false caso contrário
   * @example
   * // Verificar se o estado com ID 35 pertence ao Brasil
   * const belongs = Countries.isStateInCountry({
   *   countryId: 'BR',
   *   stateId: '35'
   * });
   */
  public static isStateInCountry({
    countryId,
    stateId,
  }: {
    countryId: string;
    stateId: string;
  }): boolean {
    const country = this.getCountryBy({
      property: 'id',
      value: countryId,
      selectStates: true,
    });

    if (!country || !('states' in country)) return false;

    return (
      country?.states?.some((state) => state.id === Number(stateId)) ?? false
    );
  }

  /**
   * Retorna todas as cidades de todos os estados de um país.
   *
   * @param {Object} options - Opções de busca
   * @param {string} options.countryId - ID do país
   * @returns {string[]} Lista de nomes de todas as cidades do país
   * @example
   * // Obter todas as cidades do Brasil
   * const brazilCities = Countries.getAllCities({ countryId: 'BR' });
   */
  public static getAllCities({ countryId }: { countryId: string }): string[] {
    const statesList = this.getStatesByCountryId(countryId);
    return statesList
      ? statesList.flatMap((state) => state.cities.map((city) => city.name))
      : [];
  }

  /**
   * Retorna todas as cidades de um estado específico dentro de um país.
   *
   * @param {Object} options - Opções de busca
   * @param {string} options.countryId - ID do país
   * @param {string} options.stateId - ID do estado
   * @returns {string[]} Lista de nomes de cidades do estado
   * @example
   * // Obter todas as cidades do estado de São Paulo (ID 35) no Brasil
   * const spCities = Countries.getCitiesByStateId({
   *   countryId: 'BR',
   *   stateId: '35'
   * });
   */
  public static getCitiesByStateId({
    countryId,
    stateId,
  }: {
    countryId: string;
    stateId: string;
  }): string[] {
    const statesList = this.getStatesByCountryId(countryId);
    const state = statesList?.find((state) => state.id === Number(stateId));
    return state?.cities.map((city) => city.name) ?? [];
  }

  /**
   * Busca uma cidade específica por parâmetro dentro de um estado e país.
   *
   * @param {Object} options - Opções de busca
   * @param {string} options.countryId - ID do país
   * @param {string} options.stateId - ID do estado
   * @param {Object} options.params - Parâmetros de busca da cidade
   * @param {keyof City} options.params.property - Propriedade da cidade para buscar
   * @param {string} options.params.value - Valor da propriedade para a busca
   * @returns {string | undefined} Nome da cidade ou undefined se não encontrada
   * @example
   * // Buscar a cidade com ID 3550308 no estado de São Paulo (ID 35) no Brasil
   * const saoPauloCity = Countries.getCitiesByParams({
   *   countryId: 'BR',
   *   stateId: '35',
   *   params: { property: 'id', value: '3550308' }
   * });
   */
  public static getCitiesByParams({
    countryId,
    stateId,
    params,
  }: {
    countryId: string;
    stateId: string;
    params: { property: keyof City; value: string };
  }): string | undefined {
    const statesList = this.getStatesByCountryId(countryId);
    const state = statesList?.find((state) => state.id === Number(stateId));

    return state?.cities.find((city) => city[params.property] === params.value)
      ?.name;
  }
}
