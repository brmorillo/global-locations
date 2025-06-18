import { countriesData } from '../data';
import { City, Country, State } from './countries.interface';
import { ArrayUtils, ObjectUtils, StringUtils } from '@brmorillo/utils';

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
    property: keyof Country | undefined,
    value: string | null | undefined,
  ): Country | undefined {
    if (property === undefined || value === undefined || value === null)
      return undefined;

    // Using ArrayUtils.findSubset to find a country where the property matches the value
    const result = ArrayUtils.findSubset({
      array: this.countries,
      subset: { [property]: value },
    });

    // Ensure we return undefined instead of null for consistency with tests
    return result || undefined;
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
    // Using ObjectUtils.deepClone to return a deep copy of the countries array
    return ObjectUtils.deepClone({ obj: this.countries });
  }

  /**
   * Returns all countries without the 'states' property.
   *
   * @returns {Omit<Country, 'states'>[]} List of countries without state data
   * @example
   * // Get all countries without state data
   * const countries = Countries.getAllCountries();
   */
  public static getAllCountries(): (Omit<Country, 'states'> & {
    states: undefined;
  })[] {
    // Using ObjectUtils.omit to remove the states property from each country
    return this.countries.map((country) => ({
      ...ObjectUtils.omit({ obj: country, keys: ['states'] }),
      states: undefined,
    }));
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
    value: string | undefined;
    selectStates: boolean;
  }): Country | undefined {
    if (value === undefined || value === null) return undefined;

    const country = this.findCountryByProperty(property, value);
    if (!country) return undefined;

    if (selectStates) {
      // Return a deep clone of the country to avoid modifying the original data
      return ObjectUtils.deepClone({ obj: country });
    } else {
      // Using ObjectUtils.omit to remove the states property
      const countryWithoutStates = ObjectUtils.omit({
        obj: country,
        keys: ['states'],
      });
      return { ...countryWithoutStates, states: undefined };
    }
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
    // Using ArrayUtils.flatten to flatten the array of states from all countries
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
      // Return a deep clone of the states array to avoid modifying the original data
      return ObjectUtils.deepClone({ obj: country.states });
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

    // Using ArrayUtils.findSubset to find a state where the property matches the value
    const result = statesList
      ? ArrayUtils.findSubset({
          array: statesList,
          subset: { [params.property]: params.value },
        })
      : undefined;

    // Ensure we return undefined instead of null for consistency with tests
    return result || undefined;
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

    // Using ArrayUtils.findSubset to check if any state has the matching ID
    return country.states.some((state) => state.id === Number(stateId));
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

    // Using ArrayUtils.flatten to flatten the array of city names from all states
    return statesList
      ? ArrayUtils.flatten({
          array: statesList.map((state) =>
            state.cities.map((city) => city.name),
          ),
        })
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

    // Using ArrayUtils.findSubset to find the state with the matching ID
    const state = statesList
      ? ArrayUtils.findSubset({
          array: statesList,
          subset: { id: Number(stateId) },
        })
      : undefined;

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

    // Using ArrayUtils.findSubset to find the state with the matching ID
    const state = statesList
      ? ArrayUtils.findSubset({
          array: statesList,
          subset: { id: Number(stateId) },
        })
      : undefined;

    if (!state) return undefined;

    // Comparação correta para propriedades numéricas como 'id'
    if (params.property === 'id') {
      const city = state.cities.find(
        (city) => String(city[params.property]) === params.value,
      );
      return city?.name;
    }

    // Using ArrayUtils.findSubset to find the city with the matching property
    const city = ArrayUtils.findSubset({
      array: state.cities,
      subset: { [params.property]: params.value },
    });

    return city?.name;
  }

  /**
   * Gets a city by its ID across all countries and states.
   *
   * @param {number} cityId - The ID of the city to find
   * @returns {City | undefined} - The city object if found, undefined otherwise
   * @example
   * // Find a city with ID 3550308 (São Paulo)
   * const city = Countries.getCityById(3550308);
   */
  public static getCityById(cityId: number): City | undefined {
    // Using a more functional approach with flatMap and find
    const allCities = this.countries.flatMap((country) =>
      country.states.flatMap((state) =>
        state.cities.map((city) => ({ city, state, country })),
      ),
    );

    const result = allCities.find((item) => item.city.id === cityId);
    return result?.city;
  }

  /**
   * Searches for cities by name with partial matching across all countries.
   *
   * @param {string} name - The name or partial name to search for
   * @param {boolean} caseSensitive - Whether the search should be case sensitive (default: false)
   * @returns {Array<{city: City, state: State, country: Country}>} - Array of matching cities with their state and country
   * @example
   * // Search for cities containing "São" in their name
   * const cities = Countries.searchCitiesByName("São");
   */
  public static searchCitiesByName(
    name: string,
    caseSensitive: boolean = false,
  ): Array<{ city: City; state: State; country: Country }> {
    const results: Array<{ city: City; state: State; country: Country }> = [];
    const searchTerm = caseSensitive ? name : name.toLowerCase();

    // Using a more functional approach with flatMap and filter
    this.countries.forEach((country) => {
      country.states.forEach((state) => {
        state.cities.forEach((city) => {
          const cityName = caseSensitive ? city.name : city.name.toLowerCase();

          // Using StringUtils.countOccurrences to check if the city name contains the search term
          if (
            StringUtils.countOccurrences({
              input: cityName,
              substring: searchTerm,
            }) > 0
          ) {
            results.push({ city, state, country });
          }
        });
      });
    });

    return results;
  }

  /**
   * Gets countries by continent.
   *
   * @param {string} continent - The continent name
   * @param {boolean} includeStates - Whether to include states in the results (default: false)
   * @returns {Country[]} - Array of countries in the specified continent
   * @example
   * // Get all countries in South America
   * const southAmericanCountries = Countries.getCountriesByContinent("South America");
   */
  public static getCountriesByContinent(
    continent: string,
    includeStates: boolean = false,
  ): Country[] {
    // Using ArrayUtils.findSubset with a custom comparison function for case-insensitive matching
    const countries = this.countries.filter(
      (country) => country.continent.toLowerCase() === continent.toLowerCase(),
    );

    if (!includeStates) {
      // Using ObjectUtils.omit to remove the states property from each country
      return countries.map((country) => ({
        ...ObjectUtils.omit({ obj: country, keys: ['states'] }),
        states: undefined,
      })) as unknown as Country[];
    }

    // Return deep clones of the countries to avoid modifying the original data
    return ObjectUtils.deepClone({ obj: countries });
  }

  /**
   * Gets countries by economic group.
   *
   * @param {string} economicGroup - The economic group name (e.g., "Mercosul", "EU")
   * @param {boolean} includeStates - Whether to include states in the results (default: false)
   * @returns {Country[]} - Array of countries in the specified economic group
   * @example
   * // Get all countries in Mercosul
   * const mercosulCountries = Countries.getCountriesByEconomicGroup("Mercosul");
   */
  public static getCountriesByEconomicGroup(
    economicGroup: string,
    includeStates: boolean = false,
  ): Country[] {
    const countries = this.countries.filter((country) =>
      country.economicGroups.some(
        (group) => group.toLowerCase() === economicGroup.toLowerCase(),
      ),
    );

    if (!includeStates) {
      // Using ObjectUtils.omit to remove the states property from each country
      return countries.map((country) => ({
        ...ObjectUtils.omit({ obj: country, keys: ['states'] }),
        states: undefined,
      })) as unknown as Country[];
    }

    // Return deep clones of the countries to avoid modifying the original data
    return ObjectUtils.deepClone({ obj: countries });
  }
}
