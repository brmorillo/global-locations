/**
 * Interface representing a city
 *
 * @interface City
 */
export interface City {
  /**
   * Unique identifier of the city
   */
  id: number;

  /**
   * Identifier of the state to which the city belongs
   */
  stateId: number;

  /**
   * Name of the city
   */
  name: string;

  /**
   * Optional additional city data
   */
  extra?: Object;
}

/**
 * Interface representing a state or province
 *
 * @interface State
 */
export interface State {
  /**
   * Unique identifier of the state
   */
  id: number;

  /**
   * Full name of the state
   */
  name: string;

  /**
   * Acronym or abbreviation of the state
   */
  acronym: string;

  /**
   * List of cities belonging to the state
   */
  cities: City[];
}

/**
 * Interface representing a country
 *
 * @interface Country
 */
export interface Country {
  /**
   * Unique identifier of the country (usually ISO code)
   */
  id: string;

  /**
   * Full name of the country
   */
  name: string;

  /**
   * Acronym or abbreviation of the country
   */
  acronym: string;

  /**
   * Name of the country's capital
   */
  capital: string;

  /**
   * Name of the currency used in the country
   */
  coin: string;

  /**
   * Currency code used in the country
   */
  coinCode: string;

  /**
   * Regional group to which the country belongs
   */
  regionGroup: string;

  /**
   * Economic groups to which the country belongs
   */
  economicGroups: string[];

  /**
   * Continent where the country is located
   */
  continent: string;

  /**
   * International direct dialing code of the country
   */
  ddi: string;

  /**
   * List of states or provinces of the country
   */
  states: State[];
}

/**
 * Interface representing the complete set of location data
 *
 * @interface LocationData
 */
export interface LocationData {
  /**
   * List of all available countries
   */
  countries: Country[];
}
