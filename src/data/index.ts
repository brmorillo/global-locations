import * as countriesJson from './countries.json';
import { LocationData } from '../services/countries.interface';

/**
 * Location data loaded from the JSON file
 *
 * @type {LocationData}
 */
export const countriesData: LocationData =
  countriesJson as unknown as LocationData;
