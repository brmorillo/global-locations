import { countriesData } from '../data';
import { City, Country, State } from './countries.interface';

export class Countries {
  // Dados estáticos de países
  private static countries: Country[] = countriesData.countries;

  // Função auxiliar para buscar um país
  public static findCountryByProperty(
    property: keyof Country,
    value: string,
  ): Country | undefined {
    return this.countries.find((country) => country[property] === value);
  }

  /**
   * Retorna todos os países com seus dados completos (incluindo estados).
   * @returns {Country[]} - Todos os países e seus dados.
   */
  public static getAllCountriesAndData(): Country[] {
    return this.countries;
  }

  /**
   * Retorna todos os países sem a propriedade 'states'.
   * @returns {Omit<Country, 'states'>[]} - Países sem estados.
   */
  public static getAllCountries(): Omit<Country, 'states'>[] {
    return this.countries.map(({ states, ...countryData }) => countryData);
  }

  /**
   * Retorna um país pelo valor de uma propriedade (id, nome, etc.).
   * @param {Object} params - Parâmetros de busca (propriedade e valor).
   * @param {string} params.property - Propriedade do país para buscar.
   * @param {string} params.value - Valor da propriedade para a busca.
   * @param {boolean} params.selectStates - Indica se deve incluir estados.
   * @returns {Omit<Country, 'states'> | Country | undefined} - País encontrado ou 'undefined' se não encontrado.
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
   * @returns {State[]} - Todos os estados de todos os países.
   */
  public static getAllStates(): State[] {
    return this.countries.flatMap((country) => country.states || []);
  }

  /**
   * Retorna os estados de um país específico.
   * @param {string} countryId - ID do país.
   * @returns {State[] | undefined} - Estados do país ou 'undefined' se não encontrado.
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
   * Busca um estado de um país com base em um parâmetro (id, nome, etc.).
   * @param {string} countryId - ID do país.
   * @param {object} params - Parâmetros para busca do estado (id, nome, etc.).
   * @returns {State | undefined} - Estado encontrado ou 'undefined'.
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
   * @param {string} countryId - ID do país.
   * @param {string} stateId - ID do estado.
   * @returns {boolean} - 'true' se o estado pertencer ao país, 'false' caso contrário.
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
   * @param {string} countryId - ID do país.
   * @returns {string[]} - Lista de nomes de todas as cidades.
   */
  public static getAllCities({ countryId }: { countryId: string }): string[] {
    const statesList = this.getStatesByCountryId(countryId);
    return statesList
      ? statesList.flatMap((state) => state.cities.map((city) => city.name))
      : [];
  }

  /**
   * Retorna todas as cidades de um estado específico dentro de um país.
   * @param {string} countryId - ID do país.
   * @param {string} stateId - ID do estado.
   * @returns {string[]} - Lista de nomes de cidades do estado.
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
   * @param {string} countryId - ID do país.
   * @param {string} stateId - ID do estado.
   * @param {object} params - Parâmetros de busca da cidade (id, nome, etc.).
   * @returns {string | undefined} - Nome da cidade ou 'undefined' se não encontrada.
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
