import { countriesData } from '../data';
import { City, Country, State } from './countries.interface';

/**
 * Class that provides methods to access and manipulate global location data
 * such as countries, states, and cities.
 *
 * @class Countries
 */
export class Countries {
  /**
   * Static country data loaded from the data file
   * @private
   */
  private static countries: Country[] = countriesData.countries;

  /**
   * Helper function to find a country by a specific property
   *
   * @param {keyof Country} property - Country property to be used in the search
   * @param {string} value - Property value for comparison
   * @returns {Country | undefined} Found country or undefined if not found
   */
  public static findCountryByProperty(
    property: keyof Country,
    value: string,
  ): Country | undefined {
    return this.countries.find((country) => country[property] === value);
  }

  /**
   * Returns all countries with their complete data (including states).
   *
   * @returns {Country[]} All countries and their complete data
   * @example
   * // Get all countries with complete data
   * const allCountries = Countries.getAllCountriesAndData();
   */
  public static getAllCountriesAndData(): Country[] {
    return this.countries;
  }

  /**
   * Returns all countries without the 'states' property.
   *
   * @returns {Omit<Country, 'states'>[]} List of countries without state data
   * @example
   * // Get all countries without state data
   * const countries = Countries.getAllCountries();
   */
  public static getAllCountries(): Omit<Country, 'states'>[] {
    return this.countries.map(({ states, ...countryData }) => countryData);
  }

  /**
   * Returns a country by the value of a specific property (id, name, etc.).
   *
   * @param {Object} params - Search parameters
   * @param {keyof Country} params.property - Country property to search for
   * @param {string} params.value - Property value for the search
   * @param {boolean} params.selectStates - Indicates whether to include states in the result
   * @returns {Omit<Country, 'states'> | Country | undefined} Found country or undefined if not found
   * @example
   * // Search for a country by ID without including states
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
   * Returns all states from all countries.
   *
   * @returns {State[]} List with all states from all countries
   * @example
   * // Get all states from all countries
   * const allStates = Countries.getAllStates();
   */
  public static getAllStates(): State[] {
    return this.countries.flatMap((country) => country.states || []);
  }

  /**
   * Returns the states of a specific country.
   *
   * @param {string} countryId - Country ID
   * @returns {State[] | undefined} States of the country or undefined if the country is not found
   * @example
   * // Get all states of Brazil
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
   * Searches for a state in a country based on a specific parameter (id, name, etc.).
   *
   * @param {Object} options - Search options
   * @param {string} options.countryId - Country ID
   * @param {Object} options.params - Parameters for state search
   * @param {keyof State} options.params.property - State property to search for
   * @param {string} options.params.value - Property value for the search
   * @returns {State | undefined} Found state or undefined if not found
   * @example
   * // Search for the state of São Paulo in Brazil
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
   * Checks if a state belongs to a specific country.
   *
   * @param {Object} options - Verification options
   * @param {string} options.countryId - Country ID
   * @param {string} options.stateId - State ID
   * @returns {boolean} true if the state belongs to the country, false otherwise
   * @example
   * // Check if the state with ID 35 belongs to Brazil
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
   * Returns all cities from all states of a country.
   *
   * @param {Object} options - Search options
   * @param {string} options.countryId - Country ID
   * @returns {string[]} List of names of all cities in the country
   * @example
   * // Get all cities in Brazil
   * const brazilCities = Countries.getAllCities({ countryId: 'BR' });
   */
  public static getAllCities({ countryId }: { countryId: string }): string[] {
    const statesList = this.getStatesByCountryId(countryId);
    return statesList
      ? statesList.flatMap((state) => state.cities.map((city) => city.name))
      : [];
  }

  /**
   * Returns all cities of a specific state within a country.
   *
   * @param {Object} options - Search options
   * @param {string} options.countryId - Country ID
   * @param {string} options.stateId - State ID
   * @returns {string[]} List of city names in the state
   * @example
   * // Get all cities in the state of São Paulo (ID 35) in Brazil
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
   * Searches for a specific city by parameter within a state and country.
   *
   * @param {Object} options - Search options
   * @param {string} options.countryId - Country ID
   * @param {string} options.stateId - State ID
   * @param {Object} options.params - City search parameters
   * @param {keyof City} options.params.property - City property to search for
   * @param {string} options.params.value - Property value for the search
   * @returns {string | undefined} City name or undefined if not found
   * @example
   * // Search for the city with ID 3550308 in the state of São Paulo (ID 35) in Brazil
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
