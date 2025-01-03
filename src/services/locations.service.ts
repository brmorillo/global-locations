import { locations } from '../data/json';
import {
  City,
  Country,
  LocationData,
  State,
} from '../interfaces/locations.interface';

export class Locations {
  private static data: LocationData = locations;

  /**
   * !Attention: The return is big.
   * Get all countries and their states and cities.
   * @returns Country[]
   * @example
   * ```typescript
   * Locations.getData();
   * ```
   */
  public static getData(): Country[] {
    return this.data.countries;
  }

  /**
   * Get country by a specific field (id, name, acronym).
   * @param field string - The field to search by (id, name, acronym).
   * @param value string - The value to match.
   * @returns Country | undefined
   * @example
   * ```typescript
   * Locations.getCountryBy('id', 'US');
   * Locations.getCountryBy('name', 'United States');
   * Locations.getCountryBy('acronym', 'US');
   * ```
   */
  public static getCountryBy(
    field: 'id' | 'name' | 'acronym',
    value: string,
  ): Country | undefined {
    return this.getData().find((country) => country[field] === value);
  }

  /**
   * Get states of a country by a specific field (id, name, acronym).
   * @param field string - The field to search by (id, name, acronym).
   * @param value string - The value to match.
   * @returns State[] | undefined - Returns the states of the country or undefined if not found.
   * @example
   * ```typescript
   * Locations.getStatesByCountry('id', 'BR');
   * Locations.getStatesByCountry('name', 'Brazil');
   * Locations.getStatesByCountry('acronym', 'BR');
   * ```
   */
  public static getStatesByCountry(
    field: 'id' | 'name' | 'acronym',
    value: string,
  ): State[] | undefined {
    const country = this.getData().find((c) => c[field] === value);
    return country?.states;
  }

  /**
   * Get cities of a state by a specific field (id, name, acronym).
   * @param countryId string - The ID of the country to search in.
   * @param field string - The field to search by (id, name, acronym) for the state.
   * @param value string | number - The value to match for the state.
   * @returns City[] | undefined - Returns the list of cities of the state or undefined if not found.
   * @example
   * ```typescript
   * Locations.getCitiesByState('BR', 'id', 12);
   * Locations.getCitiesByState('BR', 'name', 'Acre');
   * Locations.getCitiesByState('BR', 'acronym', 'AC');
   * ```
   */
  public static getCitiesByState(
    countryId: string,
    field: 'id' | 'name' | 'acronym',
    value: string | number,
  ): City[] | undefined {
    const country = this.getData().find((c) => c.id === countryId);
    const state = country?.states.find((s) => s[field] === value);
    return state?.cities;
  }

  /* public static search(
    level: 'countries' | 'states' | 'cities',
    field: string,
    value: string | number
  ): any {
    const data = this.getData();
    if (level === 'countries') {
      return data.find((country) => country[field] === value);
    }
    if (level === 'states') {
      return data.flatMap((country) => country.states).find((state) => state[field] === value);
    }
    if (level === 'cities') {
      return data
        .flatMap((country) => country.states)
        .flatMap((state) => state.cities)
        .find((city) => city[field] === value);
    }
    throw new Error('Invalid level');
  } */
}
