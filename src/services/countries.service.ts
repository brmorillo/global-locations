import { countriesData } from '../data';
import { Country, State } from './countries.interface';

export class Countries {
  // Tornando os dados estáticos para serem acessados pelos métodos estáticos
  private static countries: Country[] = countriesData.countries;

  /**
   * !Attention: This method returns all countries and their data, including states.
   * @returns {Country[]} - All countries and their data
   */
  public static getAllCountriesAndData(): Country[] {
    return this.countries;
  }

  /**
   * This method returns all countries without the 'states' property.
   * The 'states' property is omitted to return only the basic country data.
   * @returns {Omit<Country, 'states'>[]} - All countries without states
   */
  public static getAllCountries(): Omit<Country, 'states'>[] {
    return this.countries.map(({ states, ...countryData }) => countryData);
  }

  /**
   * This method searches for a country by a specific property (id, name, etc.) and its value.
   * @param {Object} params - Object containing the property and value to search by.
   * @param {string} params.property - Property of the country to compare (id, name, etc.).
   * @param {string} params.value - Value to compare with the country property.
   * @returns {Omit<Country, 'states'> | undefined} - The country found without 'states' or 'undefined' if no match is found.
   */
  public static getCountryBy({
    property,
    value,
    selectStates = false,
  }: {
    property:
      | 'id'
      | 'name'
      | 'acronym'
      | 'capital'
      | 'coin'
      | 'coinCode'
      | 'regionGroup'
      | 'continent'
      | 'ddi';
    value: string;
    selectStates: boolean;
  }): Country | Omit<Country, 'states'> | undefined {
    // Find the country based on the property and value
    const country = this.countries.find(
      (country) => country[property] === value,
    );

    // If the country is found, return it without the 'states' property
    if (!country) return undefined;

    if (selectStates) {
      return country;
    }

    const { states, ...countryData } = country;
    return countryData;
  }

  /**
   * !Attention: This method returns all states from all countries.
   * @returns {State[]} - All states from all countries.
   */
  public static getAllStates(): State[] {
    return this.countries.flatMap((country) => country.states);
  }

  /**
   * This method searches for a country by its ID and returns the country with its states.
   * @param countryId - The ID of the country to search for.
   * @returns {State[] | undefined} - The states of the country or 'undefined' if no match is found.
   */
  public static getStatesByCountryId({
    countryId,
  }: {
    countryId: string;
  }): State[] | undefined {
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
   * This method searches for a specific state by a property (id, name, etc.) and its value.
   * @param {Object} params - Object containing the property and value to search by.
   * @param {string} params.countryId - The ID of the country to search for the state.
   * @param {string} params.property - Property of the state to compare (id, name, etc.).
   * @param {string} params.value - Value to compare with the state property.
   * @returns {State | undefined} - The state found or 'undefined' if no match is found.
   */
  public static getStateByParams({
    countryId,
    params,
  }: {
    countryId: string;
    params: { property: 'id' | 'name' | 'acronym'; value: string };
  }): State | undefined {
    const statesList = this.getStatesByCountryId({ countryId });

    if (statesList) {
      return statesList.find(
        (state) => state[params.property] === params.value,
      );
    }

    return undefined;
  }

  /**
   * This method checks if a state is within a specific country.
   * @param {String} countryId - The ID of the country to search for the state.
   * @param {String} stateId - The ID of the state to search for.
   * @returns {Boolean} - 'true' if the state is within the country, 'false' otherwise.
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

    // Verifica se o país existe e se contém estados
    if (country && 'states' in country) {
      // Verifica se o estadoId está entre os estados do país
      const stateIds = country.states.map((state) => state.id);
      return stateIds.includes(Number(stateId));
    }

    return false;
  }

  /**
   * !Attention: This method returns all cities from all states from the countries.
   * @param {String} countryId - The ID of the country.
   * @returns {string[]} - All cities from all states from all countries.
   */
  public static getAllCities({ countryId }: { countryId: string }): string[] {
    const statesList = this.getStatesByCountryId({ countryId });

    if (statesList) {
      return statesList.flatMap((state) =>
        state.cities.map((city) => city.name),
      );
    }

    return [];
  }

  /**
   * This method searches for a specific city by a property (id, name, etc.) and its value.
   * @param {String} countryId - The ID of the country to search for the city.
   * @param {String} cityId - The ID of the city to search for.
   * @returns {String | undefined} - The city found or 'undefined' if no match is found.
   */
  public static getCitiesByStateId({
    countryId,
    stateId,
  }: {
    countryId: string;
    stateId: string;
  }): string[] {
    const statesList = this.getStatesByCountryId({ countryId });

    if (statesList) {
      const state = statesList.find((state) => state.id === Number(stateId));

      if (state) {
        return state.cities.map((city) => city.name);
      }
    }

    return [];
  }

  /**
   * This method searches for a specific city by a property (id, name, etc.) and its value.
   * @param {String} countryId - The ID of the country to search for the city.
   * @param {String} stateId - The ID of the state to search for the city.
   * @param {Object} params - Object containing the property and value to search by.
   * @param {String} params.property - Property of the city to compare (id, name, etc.).
   * @param {String} params.value - Value to compare with the city property.
   * @returns {String | undefined} - The city found or 'undefined' if no match is found.
   */
  public static getCitiesByParams({
    countryId,
    stateId,
    params,
  }: {
    countryId: string;
    stateId: string;
    params: { property: 'id' | 'name'; value: string };
  }): string | undefined {
    const statesList = this.getStatesByCountryId({ countryId });

    if (statesList) {
      // Find the state by stateId
      const state = statesList.find((state) => state.id === Number(stateId));

      if (state) {
        // Use ArrayUtils.findSubset for city search if applicable
        const city = state.cities.find(
          (city) => city[params.property] === params.value,
        );

        // Return the city's name if found
        return city?.name;
      }
    }

    return undefined;
  }
}
